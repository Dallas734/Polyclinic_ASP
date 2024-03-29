import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { ConfigProvider } from "antd";
import locale from "antd/locale/ru_RU";
import "dayjs/locale/ru";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "./Components/ErrorBoundary/ErrorFallback";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);


root.render(
  //<React.StrictMode>
  <ErrorBoundary FallbackComponent={ErrorFallback}>
    <ConfigProvider locale={locale}>
      <App />
    </ConfigProvider>
  </ErrorBoundary>
  //</React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
