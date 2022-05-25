import React, { useState } from "react";

import { Button, TextInput, PasswordInput, Group, Box } from "@mantine/core";

import { useMutation } from '@apollo/client';
import { ADD_USER, LOGIN_USER} from '../../utils/mutations';

import Auth from '../../utils/auth';

// when either submit is pressed, console-logs form object

function Login() {

  const [addUser] = useMutation(ADD_USER);
  const [loginUser] = useMutation(LOGIN_USER);

  const [loginForm, setLoginForm] = useState({
    username: "",
    password: "",
  });

  const [signupForm, setSignupForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    const values = {
      username: loginForm.username,
      password: loginForm.password,
    };

    try {
      const { data } = await loginUser({
        variables: { ...loginForm}
      });
      console.log(data);
      Auth.login(data.loginUser.token);
    } catch (err) {
      console.log(err);
    }
    console.log("loginForm values:", values);

    // document.location.replace("/");
  };

  const handleSignupSubmit = async (e) => {
    e.preventDefault();

    const values = {
      username: signupForm.username,
      email: signupForm.email,
      password: signupForm.password,
    };
    
    console.log("signUpForm values:", values);

    try {
      const { data } = await addUser({
        variables: { ...signupForm } }
      );
      console.log(data);
      Auth.login(data.addUser.token);
    } catch (err) {
      console.log(err);
    }


    // document.location.replace("/");
  };

  return (
    <div>
      {/* TODO: login form */}
      <Box sx={{ maxWidth: 300 }} mx="auto">
        <form>
          <h2>Login</h2>
          <TextInput
            required
            label="Username"
            placeholder="e.g. flexloglover42"
            onChange={(e) =>
              setLoginForm({ ...loginForm, username: e.target.value })
            }
          /> 
          <PasswordInput
            required
            label="Password"
            placeholder="*************"
            onChange={(e) =>
              setLoginForm({ ...loginForm, password: e.target.value })
            }
          />
          <Group position="right" mt="md">
            <Button type="submit" onClick={handleLoginSubmit}>
              Submit
            </Button>
          </Group>
        </form>
      </Box>
      {/* TODO: signup form */}
      <div>
        <Box sx={{ maxWidth: 300 }} mx="auto">
          <form>
            <h2>Sign Up</h2>
            <TextInput
              required
              label="Username"
              placeholder="e.g. flexloglover42"
              onChange={(e) =>
                setSignupForm({ ...signupForm, username: e.target.value })
              }
            />
            {/* Email input*/}
          <TextInput  
            required
            label="Email"
            placeholder="e.g. flexloglove42@gmail.com"
            onChange={(e) =>
              setSignupForm({ ...signupForm, email: e.target.value })
            } />
            <PasswordInput
              required
              label="Password"
              placeholder="*************"
              onChange={(e) =>
                setSignupForm({ ...signupForm, password: e.target.value })
              }
            />
            <Group position="right" mt="md">
              <Button type="submit" onClick={handleSignupSubmit}>
                Submit
              </Button>
            </Group>
          </form>
        </Box>
      </div>
    </div>
  );
}

export default Login;
