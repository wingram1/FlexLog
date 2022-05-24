import React, { useState } from "react";

import { Button, TextInput, PasswordInput, Group, Box } from "@mantine/core";

// TODO: visit Mantine useForm docs: https://mantine.dev/form/use-form/
// when either submit is pressed, console-logs form object

function Login() {
  const [loginForm, setLoginForm] = useState({
    username: "",
    password: "",
  });

  const [signupForm, setSignupForm] = useState({
    username: "",
    password: "",
  });

  const handleLoginSubmit = function (e) {
    e.preventDefault();

    const values = {
      username: loginForm.username,
      password: loginForm.password,
    };

    console.log("loginForm values:", values);

    // document.location.replace("/");
  };

  const handleSignupSubmit = function (e) {
    e.preventDefault();

    const values = {
      username: signupForm.username,
      password: signupForm.password,
    };

    console.log("signUpForm values:", values);

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
