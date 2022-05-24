import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Badge, Button } from "@mantine/core";
import localForage from "localforage";

import useStyles from "./Workouts.styles";

import ActiveWorkout from "../../components/ActiveWorkout";

function Workouts() {
  const { classes } = useStyles();

  const [activeWorkout, setActiveWorkout] = useState({
    active: false,
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
      return JSON.parse(value);
    }

    getWorkouts()
      .then((value) => {
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
      active: true,
      workout: workoutData[target],
    });
  }

  // TODO: passes a workout through to edit page/component
  function editWorkout(e) {
    console.log(
      `Edit Workout ${
        workoutData[e.target.getAttribute("data-id")].title
      } clicked`
    );
  }

  // TODO: opens a modal/alert to confirm, then deletes
  function deleteWorkout(e) {
    console.log(
      `Delete Workout ${
        workoutData[e.target.getAttribute("data-id")].title
      } clicked`
    );
  }

  // log workoutData
  // console.log(workoutData);

  return (
    <>
      {!activeWorkout.active ? (
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
                      <Button color="gray" data-id={i} onClick={editWorkout}>
                        Edit
                      </Button>
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
      ) : (
        <ActiveWorkout
          activeWorkout={activeWorkout}
          setActiveWorkout={setActiveWorkout}
        />
      )}
    </>
  );
}

export default Workouts;
