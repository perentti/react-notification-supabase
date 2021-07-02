import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter} from 'react-router-dom';
import * as serviceWorker from "./serviceWorker";



if (document.title === 'swExample') {
  navigator.serviceWorker.register('sw.js')
  .then(function(registration) {
    ReactDOM.render(
      <React.StrictMode>
        <BrowserRouter>
        <App swRegistration={registration}/>
        </BrowserRouter>
      </React.StrictMode>,
      document.getElementById('root')
    );
  });
} else {
  ReactDOM.render(
    <React.StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </React.StrictMode>,
    document.getElementById('root')
  );
}

serviceWorker.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
