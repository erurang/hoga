import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import router from "./router";
import Exchange from "./pages/exchange";
import Home from "./pages/home";
import ExchangeStore from "./context/exchange";
import Timer2 from "./screens/timer2";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path={router.HOME} exact>
          <Home />
        </Route>
        <Route path={router.EXCHANGE}>
          <ExchangeStore>
            <Exchange />
            {/* <Timer2 /> */}
          </ExchangeStore>
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
