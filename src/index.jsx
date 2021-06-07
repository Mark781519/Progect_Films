import React from "react";
import ReactDOM from "react-dom";
import { AppProviders } from "contexts";
import App from "App";
import "semantic-ui-css/semantic.min.css";

ReactDOM.render(
  <React.StrictMode>
    <AppProviders>
      <App />
    </AppProviders>
  </React.StrictMode>,
  document.getElementById("root")
);
