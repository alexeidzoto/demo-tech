import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider } from "@material-ui/styles";
import { CssBaseline } from "@material-ui/core";
// import { useHistory } from "react-router-dom";

import Themes from "./themes";
import App from "./components/App";
import reportWebVitals from './reportWebVitals';
import { LayoutProvider } from "./context/LayoutContext";
import { UserProvider } from "./context/UserContext";
import { Auth0ProviderWithHistory } from "./context/AuthOContext";

ReactDOM.render(
  <React.StrictMode>
    <LayoutProvider>
      <UserProvider>
        <Auth0ProviderWithHistory>
        <ThemeProvider theme={Themes.default}>
          <CssBaseline />
          <App />
        </ThemeProvider>
        </Auth0ProviderWithHistory>
      </UserProvider>
    </LayoutProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
