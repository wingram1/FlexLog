import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";

import Header from "./components/Header";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Workout from "./pages/Workout";
import Create from "./pages/Create";

function App() {
  return (
    <Router>
      <div className="flex-column justify-flex-start min-100-vh">
        <Header />
        <div className="container">
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/workout" component={Workout} />
            <Route exact path="/create" component={Create} />
            {/* UserLog Component */}
            {/* TodayLog Component */}
            <Route exact path="*">
              <p>This doesn't exist! (yet...?)</p>
            </Route>
          </Switch>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
