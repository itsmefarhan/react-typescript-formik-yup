import React from "react";
import "./App.css";
import Signup from "./components/Signup";
import Home from "./components/Home";
import { BrowserRouter, Switch, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Signup} />
        <Route exact path="/home" component={Home} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
