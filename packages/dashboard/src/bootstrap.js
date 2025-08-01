import Dashboard from "./components/Dashboard.vue";
import { createApp } from "vue";

const mount = (el) => {
  const app = createApp(Dashboard);

  app.mount(el);
};

// If we are in development and in isolation,
// call mount immediately
if (process.env.NODE_ENV === "development") {
  const devRoot = document.getElementById("_dashboard-dev-root");

  if (devRoot) {
    mount(devRoot);
  }
}

export { mount };
