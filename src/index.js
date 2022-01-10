import React from "react";
import ReactDOM from "react-dom";
import TimeAgo from "javascript-time-ago";

import "./index.css";

import App from "./App";

import en from "javascript-time-ago/locale/en.json";
import fr from "javascript-time-ago/locale/fr.json";

TimeAgo.addDefaultLocale(en);
TimeAgo.addLocale(fr);

ReactDOM.render(<App />, document.getElementById("root"));
