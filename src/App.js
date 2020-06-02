import React from 'react';
// import {Switch, Route} from "react-router-dom";
import Admin from "./components/Admin/Admin";
import Public from "./components/Public/Public";
import Ministry from "./components/Ministry/Ministry";


function App() {
  return (
    <div>
      <Public />
      <Admin />
      <Ministry />
      {/* <Route component={() => (<div>404 Not found </div>)} /> */}
    </div>
  )
}

export default App;
