import React, { useState } from "react";
import {
  BrowserRouter as Router,
  withRouter,
  Route,
  Switch,
} from "react-router-dom";
import { MantineProvider } from "@mantine/core";
import GlobalStyles from "./Global.styles";
import useStyles from "./App.styles";
import localForage from "localforage";

import MetaTags from "react-meta-tags";
import Header from "../Header/Header";
import Footer from "../Footer";

import Home from "../../pages/Home";
import Workouts from "../../pages/Workouts";
import EditWorkout from "../EditWorkout";
import Create from "../../pages/Create";
import ActiveWorkout from "../ActiveWorkout";
import Login from "../../pages/Login";

// ! Uncomment to clear localForage for testing
// localForage.clear();

const jsonstring = `'{"title":"title"}'`;

console.log(jsonstring);

localForage.getItem("myWorkouts").then((data) => {
  console.log("myWorkouts: ", JSON.parse(data));
});

localForage.getItem("mySessions").then((data) => {
  console.log("mySessions: ", JSON.parse(data));
});

localForage.getItem("mySessions").then((data) => {
  console.log("mySessions Raw: ", data);
});

function App() {
  // import classes from styles
  const { classes } = useStyles();

  return (
    <Router>
      <MetaTags>
        <title>FlexLog</title>
        {/* Add favicon link here */}
        {/* Add manifest link here */}
      </MetaTags>
      <GlobalStyles />

      <div className={classes.wrapper}>
        <Header />
        <div className={classes.content}>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/create" component={Create} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/workouts" component={Workouts} />
            <Route exact path="/workouts/active" component={ActiveWorkout} />
            <Route exact path="/workouts/edit" component={EditWorkout} />
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

function WithProvider() {
  return (
    <MantineProvider theme={useStyles} withGlobalStyles withNormalizeCSS>
      <App />
    </MantineProvider>
  );
}

export default WithProvider;
