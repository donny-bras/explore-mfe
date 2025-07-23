import App from "./App";
import React from "react";
import ReactDOM from "react-dom";

const mount = (el) => {
  ReactDOM.render(<App />, el);
};

if (process.env.NODE_ENV === "development") {
  const devRoot = document.getElementById("_marketing-dev-root");

  if (devRoot) {
    mount(devRoot);
  }
}

export { mount };
