import React from 'react';
import { Switch, Route} from "react-router-dom";
import LandingPage from "./LandingPage";
import PublicPortal from "./PublicPortal";
import Status from './Status';
import Report from './Report';

function Public() {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={LandingPage} />
        <Route exact path="/public" component={PublicPortal} />
        <Route exact path="/status" component={Status} />
        <Route exact path="/report" component={Report} />
      </Switch>
    </div>
  )
}

export default Public;
