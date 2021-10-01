import React from "react"
import ReactDOM from "react-dom"
import store from "./store";
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import App from "./App"
import theme from "./theme";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import reportWebVitals from "./reportWebVitals"
import "./index.css"
const persistor = persistStore(store);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <PersistGate loading={null} persistor={persistor}>
          <App />
        </PersistGate>
      </ThemeProvider>
    </Provider>
  </React.StrictMode>
  ,
  document.getElementById("root"))

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
