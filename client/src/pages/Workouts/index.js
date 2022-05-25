import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Badge, Button } from "@mantine/core";
import localForage from "localforage";

import useStyles from "./Workouts.styles";

import ActiveWorkout from "../../components/ActiveWorkout";
import Edit from "../../pages/Edit";

localForage.getItem("myWorkouts").then((value) => {
  console.log("myWorkouts: ", JSON.parse(value));
});

function Workouts() {
  const { classes } = useStyles();

  // `state` takes "list", "edit", "active"
  const [activeWorkout, setActiveWorkout] = useState({
    state: "list",
    index: null,
    workout: {},
  });

  // set state to pulled workout list
  const [workoutData, setWorkoutData] = useState([]);

  // check localForage for Workouts then populate userWorkouts with those
  useEffect(() => {
    async function getWorkouts() {
      const value = await localForage.getItem("myWorkouts").then((data) => {
        return data;
      });
      console.log(JSON.parse(value));
      return await JSON.parse(value);
    }

    getWorkouts()
      .then((value) => {
        if (!value) {
          return;
        }
        setWorkoutData(value);
      })
      .catch(console.error);
  }, []);

  // sets a workout to active
  function startWorkout(e) {
    let target;

    // compensate for clicking on Mantine button <span> label
    if (e.target.nodeName === "SPAN") {
      target = e.target.parentNode.parentNode.getAttribute("data-id");
    } else if (e.target.nodeName === "BUTTON") {
      target = e.target.getAttribute("data-id");
    }

    setActiveWorkout({
      state: "active",
      index: target,
      workout: workoutData[target],
    });
  }

  // TODO: passes a workout through to edit page/component
  function editWorkout(e) {
    let target;

    // compensate for clicking on Mantine button <span> label
    if (e.target.nodeName === "SPAN") {
      target = e.target.parentNode.parentNode.getAttribute("data-id");
    } else if (e.target.nodeName === "BUTTON") {
      target = e.target.getAttribute("data-id");
    }

    setActiveWorkout({
      state: "edit",
      index: target,
      workout: workoutData[target],
    });
  }

  // TODO: opens a modal/alert to confirm, then deletes
  function deleteWorkout(e) {
    let target;

    // compensate for clicking on Mantine button <span> label
    if (e.target.nodeName === "SPAN") {
      target = e.target.parentNode.parentNode.getAttribute("data-id");
    } else if (e.target.nodeName === "BUTTON") {
      target = e.target.getAttribute("data-id");
    }

    console.log(`Delete Workout ${workoutData[target].title} clicked`);
  }

  // log workoutData for testing
  // console.log("workoutData: ", workoutData);

  return (
    <>
      {activeWorkout.state === "list" && (
        <div className={classes.workoutsWrapper}>
          {/* map workouts inside here */}
          <div className={classes.workoutsContainer}>
            {" "}
            <div className={classes.workoutsHeader}>
              <h2>My Workouts</h2>
              <a href="/create">
                <Button color="green" radius="md" size="md">
                  Create
                </Button>
              </a>
            </div>
            {workoutData.map((key, i) => (
              <div className={classes.workoutCard}>
                <div className={classes.cardTitle}>
                  <h3 data-id={i} key={`title-${i}`}>
                    {key.title}
                  </h3>
                </div>

                <div className={classes.workoutCardMain}>
                  <div className={classes.subContainer}>
                    <div>
                      {key.categories.map((category, i) => (
                        <Badge className={classes.badge} variant="filled">
                          {category}
                        </Badge>
                      ))}
                    </div>
                    <div className={classes.description}>
                      <p data-id={i} key={`desc-${i}`}>
                        {key.description}
                      </p>
                    </div>
                    <div className={classes.workoutOptions}>
                      <Link to={{ pathname: "/workouts/edit" }}>
                        <Button color="gray" data-id={i} onClick={editWorkout}>
                          Edit
                        </Button>
                      </Link>
                      <Button color="red" data-id={i} onClick={deleteWorkout}>
                        Delete
                      </Button>
                    </div>
                  </div>
                  <div className={classes.subContainer}>
                    <strong>
                      <p style={{ margin: "5px" }}>Exercises: </p>
                    </strong>
                    <ul>
                      {/* map exercises */}
                      {workoutData[i].exercises.map((exercise, index) => (
                        <li key={`exercise-${exercise.name}-${index}`}>
                          {exercise.name}
                        </li>
                      ))}
                    </ul>
                    <div className={classes.workoutStart}>
                      <Link to={{ pathname: "/workouts/active" }}>
                        <Button data-id={i} onClick={startWorkout}>
                          Start
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      {activeWorkout.state === "active" && (
        <ActiveWorkout
          activeWorkout={activeWorkout}
          setActiveWorkout={setActiveWorkout}
        />
      )}
      {activeWorkout.state === "edit" && (
        <Edit
          activeWorkout={activeWorkout}
          setActiveWorkout={setActiveWorkout}
        />
      )}
    </>
  );
}

export default Workouts;
