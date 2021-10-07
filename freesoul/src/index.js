import React from "react";
import ReactDOM from "react-dom";
import reportWebVitals from "./reportWebVitals";
import "./index.css";

import AdminPage from "./components/adminComponents/AdminPage";

ReactDOM.render(
  <AdminPage/>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
