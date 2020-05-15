import React from 'react';
// import {Switch, Route} from "react-router-dom";
import Admin from "./components/Admin/Admin";
import Public from "./components/Public/Public";
import Organization from "./components/Organization/Organization";


function App() {
  return (
    <div>
      <Public />
      <Admin />
      <Organization />
      {/* <Route component={() => (<div>404 Not found </div>)} /> */}
    </div>
  )
}

export default App;
