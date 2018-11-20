import "./App.css";
import Header from "./Components/Header";
import Login from "./Components/Login";
import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
library.add(faPlus);

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Header />
          <Switch>
            <Route exact path="/login" component={Login} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
