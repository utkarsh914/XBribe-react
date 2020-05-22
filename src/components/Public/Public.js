import React from 'react';
import { Switch, Route} from "react-router-dom";
import LandingPage from "./LandingPage";
import PublicPortal from "./PublicPortal";

function Public() {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={LandingPage} />
        <Route exact path="/public" component={PublicPortal} />
      </Switch>
    </div>
  )
}

export default Public;
