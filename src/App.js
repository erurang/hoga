import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import router from "./router";
import Home from "./pages/home";
import Exchange from "./pages/exchange";
import ExchangeStore from "./context/exchange";
import GlobalStyles from "./styles/styles";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <GlobalStyles>
          <Route path={router.HOME} exact>
            <Home />
          </Route>
          <Route path={router.EXCHANGE}>
            <ExchangeStore>
              <Exchange />
            </ExchangeStore>
          </Route>
        </GlobalStyles>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
