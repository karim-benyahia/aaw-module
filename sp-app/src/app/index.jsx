import React from "react";
import ReactDOM from "react-dom";
import {BrowserRouter} from "react-router-dom";

import "./index.scss";
import App from "./component/app";
import "@fortawesome/fontawesome-free/js/all.min";
import "@fortawesome/fontawesome-free/css/all.min.css";
ReactDOM.render(
    <React.StrictMode>
        <BrowserRouter>
            <App></App>
        </BrowserRouter>
    </React.StrictMode>,
    document.getElementById('main'))


