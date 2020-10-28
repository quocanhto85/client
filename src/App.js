import React, { Component } from "react";
import Header from "./components/Header";
import Sorting from "./components/Graph/Sorting";
import Login from "./components/Login";
import Register from "./components/Register";

import {
  BrowserRouter as Router,
  Route,
} from "react-router-dom";

class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <Router>
          <Route exact path="/" component={Login} />
          <Route exact path="/register" component={Register}/>
          <Route exact path="/sort" component={Sorting} /> 
        </Router>
      </div>
    );
  }
}

export default App;
