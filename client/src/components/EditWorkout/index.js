import React, { useState, useEffect } from "react";

import localForage from "localforage";

import {
  Button,
  Container,
  Input,
  InputWrapper,
  MultiSelect,
  Textarea,
} from "@mantine/core";
import useStyles from "../../pages/Create/Create.styles";

import EditExerciseList from "./EditExerciseList";

function EditWorkout(props) {
  const { classes } = useStyles();

  const { activeWorkout, setActiveWorkout } = props;

  if (!activeWorkout || activeWorkout.state !== "edit") {
    console.log("No workout found! Returning to My Workouts...");
    document.location.replace("/workouts");
  }

  const [formData, setFormData] = useState({
    title: activeWorkout.workout.title,
    description: activeWorkout.workout.description,
    categories: activeWorkout.workout.categories,
    exercises: activeWorkout.workout.exercises,
  });

  const categoryOptions = [
    { value: "Home", label: "Home" },
    { value: "Gym", label: "Gym" },
    { value: "Office", label: "Office" },
    { value: "Yoga", label: "Yoga" },
    { value: "Cardio", label: "Cardio" },
    { value: "No Equipment", label: "No Equipment" },
    { value: "Light Equipment", label: "Light Equipment" },
    { value: "Heavy Equipment", label: "Heavy Equipment" },
  ];

  const [categorySelections, setCategorySelections] = useState(
    formData.categories
  );

  // updates formData with category MultiSelect
  useEffect(() => {
    if (categorySelections !== formData.categories) {
      setFormData({ ...formData, categories: categorySelections });
    }
  }, [formData, categorySelections]);

  const [exerciseData, setExerciseData] = useState(
    Object.assign(activeWorkout.workout.exercises)
  );

  const handleChange = function (e) {
    //   get name attribute and value from target
    const { name, value } = e.target;

    // update formData
    setFormData({ ...formData, [name]: value });

    console.log(formData);
  };

  const submitForm = async function (e) {
    e.preventDefault();

    // return new array with updated id's to equal index
    const exercises = Object.keys(exerciseData).map((key, index) => {
      return {
        id: index,
        name: exerciseData[key].name,
        icon: exerciseData[key].icon,
        settings: exerciseData[key].settings,
      };
    });

    // TODO: add 'CreatedBy' key to reference authenticated 'Me'
    const submittedFormData = {
      title: formData.title,
      description: formData.description,
      categories: formData.categories,
      exercises: exercises,
    };

    // logs to console for testing purposes
    console.log(submittedFormData);

    // make temp workouts array
    let myWorkouts = [];

    // Check for localForage database
    await localForage
      .getItem("myWorkouts")
      .then((data) => {
        console.log(data);
        myWorkouts = JSON.parse(data);
      })
      .catch((err) => {
        console.log(err);
      });

    // get index of activeWorkout and set there
    myWorkouts[activeWorkout.index] = submittedFormData;

    await localForage
      .setItem("myWorkouts", JSON.stringify(myWorkouts))
      .then(() => {
        setActiveWorkout({ state: "list", index: null, workout: {} });

        // go back to My Workouts
        document.location.replace("/workouts");
      });

    // TODO: when database is up, check for online then push there
  };

  return (
    <Container>
      <div className={classes.editFormContainer}>
        <h2>Edit Workout:</h2>
        <form id="workoutForm">
          <InputWrapper
            id="title"
            required
            label="Title:"
            className={classes.title}
          >
            <Input
              name="title"
              id="title"
              value={formData.title}
              onChange={handleChange}
            />
          </InputWrapper>

          <InputWrapper id="categories" label="Categories: ">
            <MultiSelect
              data={categoryOptions}
              name="categories"
              id="categorySelect"
              placeholder="Choose up to 3"
              className={classes.categories}
              clearable
              maxSelectedValues={3}
              values={formData.categories}
              onChange={setCategorySelections}
            />
          </InputWrapper>
          <Textarea
            name="description"
            placeholder="Enter a brief description for this workout"
            id="description"
            classname={classes.description}
            label="Description"
            value={formData.description}
            onChange={handleChange}
          ></Textarea>
          <EditExerciseList
            activeWorkout={activeWorkout}
            formData={formData}
            exerciseData={exerciseData}
            setExerciseData={setExerciseData}
          />
          <div className={classes.submit}>
            <Button type="submit" form="workout-form" onClick={submitForm}>
              Save Workout
            </Button>
          </div>
        </form>
      </div>
    </Container>
  );
}

export default EditWorkout;
