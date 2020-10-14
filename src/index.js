import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Configuration } from 'react-md';
import Layout from './Layout';
import './index.css';
// import * as serviceWorker from './serviceWorker';
const serviceWorker = require('./serviceWorker');

const overrides = {};

ReactDOM.render(
    <BrowserRouter>
        <Configuration {...overrides}>
            <Layout />
        </Configuration>
    </BrowserRouter>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
