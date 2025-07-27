const { spawn } = require("child_process");
const http = require("http");
const fs = require("fs");
const path = require("path");

// Build both applications
async function buildApps() {
  console.log("Building container app...");
  await runCommand("npm run build", "./packages/container");

  console.log("Building marketing app...");
  await runCommand("npm run build", "./packages/marketing");
}

// Run a command in a specific directory
function runCommand(command, cwd) {
  return new Promise((resolve, reject) => {
    const [cmd, ...args] = command.split(" ");
    const child = spawn(cmd, args, {
      cwd,
      stdio: "inherit",
      shell: true,
    });

    child.on("close", (code) => {
      if (code === 0) {
        resolve();
      } else {
        reject(new Error(`Command failed with code ${code}`));
      }
    });
  });
}

// Simple HTTP server to serve static files
function createServer(port, directory) {
  return http.createServer((req, res) => {
    let filePath = path.join(
      __dirname,
      directory,
      req.url === "/" ? "index.html" : req.url
    );

    // Handle the /container/latest/ and /marketing/latest/ paths
    if (req.url.startsWith("/container/latest/")) {
      filePath = path.join(
        __dirname,
        "packages/container/dist",
        req.url.replace("/container/latest/", "")
      );
    } else if (req.url.startsWith("/marketing/latest/")) {
      filePath = path.join(
        __dirname,
        "packages/marketing/dist",
        req.url.replace("/marketing/latest/", "")
      );
    }

    fs.readFile(filePath, (err, data) => {
      if (err) {
        res.writeHead(404);
        res.end("File not found");
        return;
      }

      const ext = path.extname(filePath);
      const contentType =
        {
          ".html": "text/html",
          ".js": "application/javascript",
          ".css": "text/css",
          ".json": "application/json",
          ".png": "image/png",
          ".jpg": "image/jpg",
          ".gif": "image/gif",
          ".svg": "image/svg+xml",
          ".wav": "audio/wav",
          ".mp4": "video/mp4",
          ".woff": "application/font-woff",
          ".ttf": "application/font-ttf",
          ".eot": "application/vnd.ms-fontobject",
          ".otf": "application/font-otf",
          ".wasm": "application/wasm",
        }[ext] || "application/octet-stream";

      res.writeHead(200, { "Content-Type": contentType });
      res.end(data);
    });
  });
}

// Main execution
async function main() {
  try {
    await buildApps();

    const server = createServer(8080, "packages/container/dist");
    server.listen(8080, () => {
      console.log("🚀 Production build served at: http://localhost:8080");
      console.log("📦 Container app: http://localhost:8080");
      console.log("📦 Marketing app: http://localhost:8080/pricing");
      console.log("Press Ctrl+C to stop the server");
    });
  } catch (error) {
    console.error("Error:", error.message);
    process.exit(1);
  }
}

main();
