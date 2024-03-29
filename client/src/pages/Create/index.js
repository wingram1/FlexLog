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
import useStyles from "./Create.styles";

import ExerciseList from "../../components/ExerciseList";

function Create() {
  const { classes } = useStyles();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    categories: [],
    exercises: [{}],
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

  const [categorySelections, setCategorySelections] = useState([]);

  // updates formData with category MultiSelect
  useEffect(() => {
    console.log(`Selected categories: ${categorySelections}`);
    setFormData({ ...formData, categories: categorySelections });
  }, [categorySelections]);

  const [exerciseData, setExerciseData] = useState({
    0: {
      id: 0,
      name: "",
      icon: "",
      settings: {
        sets: 1,
        reps: false,
        weight: false,
        distance: false,
        timer: "",
        rest: 30,
      },
    },
  });

  const handleChange = function (e) {
    //   get name attribute and value from target
    const { name, value } = e.target;

    console.log(name, value);

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

    // TODO: add 'createdBy' key to reference authenticated 'Me'
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
        console.log(myWorkouts);
      })
      .catch((err) => {
        console.log(err);
      });

    // if no database, make an empty temp array
    if (!myWorkouts) {
      console.log("No workouts found! Creating localForage database...");
      localForage.setItem("myWorkouts", []);

      myWorkouts = [];
    }

    // push to temp array then set
    myWorkouts.push(submittedFormData);
    console.log(submittedFormData);
    console.log(myWorkouts);

    await localForage
      .setItem("myWorkouts", JSON.stringify(myWorkouts))
      .then(() => {
        // go back to My Workouts
        document.location.replace("/FlexLog/workouts");
      });

    // TODO: when database is up, check for online then push there
  };

  return (
    <Container>
      <div className={classes.createFormContainer}>
        <h2>Create Workout:</h2>
        <form id="workoutForm">
          <InputWrapper
            id="title"
            required
            label="Title:"
            className={classes.title}
          >
            <Input name="title" id="title" onChange={handleChange} />
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
              values={categorySelections}
              onChange={setCategorySelections}
            />
          </InputWrapper>
          <Textarea
            name="description"
            placeholder="Enter a brief description for this workout"
            id="description"
            classname={classes.description}
            label="Description"
            onChange={handleChange}
          ></Textarea>
          <ExerciseList
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

export default Create;
