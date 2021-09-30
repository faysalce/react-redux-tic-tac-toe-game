import React from "react"
import ReactDOM from "react-dom"
import { Provider } from "react-redux"
import { Router } from "react-router-dom"
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import store from "./store"
import App from "./App"
import theme from "./theme";
import reportWebVitals from "./reportWebVitals"
import { createBrowserHistory } from "history"
import "./index.css"
const history = createBrowserHistory();

ReactDOM.render(
  <Provider store={store}>
    <Router history={history} >
      <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <App />
      </ThemeProvider>,
    </Router>
  </Provider>
  , document.getElementById("root"))

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
