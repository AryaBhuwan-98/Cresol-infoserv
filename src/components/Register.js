import { Button, CircularProgress, Stack, TextField } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import { useSnackbar } from "notistack";
import React, { useState } from "react";
import { config } from "../App";
import Footer from "./Footer";
import Header from "./Header";
import "./Register.css";
import { useHistory, Link } from "react-router-dom";

const Register = () => {
  const { enqueueSnackbar } = useSnackbar();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmPassword:""
  });
  const history=useHistory();



  // TODO: CRIO_TASK_MODULE_REGISTER - Implement the register function
  /**
   * Definition for register handler
   * - Function to be called when the user clicks on the register button or submits the register form
   *
   * @param {{ username: string, password: string, confirmPassword: string }} formData
   *  Object with values of username, password and confirm password user entered to register
   *
   * API endpoint - "POST /auth/register"
   *
   * Example for successful response from backend for the API call:
   * HTTP 201
   * {
   *      "success": true,
   * }
   *
   * Example for failed response from backend for the API call:
   * HTTP 400
   * {
   *      "success": false,
   *      "message": "Username is already taken"
   * }
   */
   const register = async (formData) => {
    console.log(formData);
    try {
      // Make a POST request to your backend API endpoint
      const response = await axios.post(
        `${config.endpoint}/auth/register`,
        formData
      );
      console.log(response);
      // Check the response status and handle accordingly
      if (response.status === 201 && response.data.success) {
        // Registration successful, you can show a success message to the user
        enqueueSnackbar("Registration successful!", { variant: "success" });
       history.push('/login')
        // Optionally, you can redirect the user to the login page
      } else {
        // Registration failed, show an error message
        enqueueSnackbar("Registration failed. Please try again.", {
          variant: "error",
        });
      }

    } catch (error) {
      // Handle any network or server errors here
      // console.error("Registration error:", error);
      // enqueueSnackbar(
      //   "An error occurred while registering. Please try again later.",
      //   { variant: "error" }
      // );
       if(error.response.status === 400)
       {
        enqueueSnackbar(error.response.data.message,{ variant:"error"});
       }
       else
       {
        enqueueSnackbar("Cannot Reachable",{ variant:"error"});
       }

    }

    //  console.log(config.apiUrl);
  };
  const handleRegistration =  (e) => {
    e.preventDefault(); // Prevent the default form submission behavior

    // Call the register function with the form data
    
  const datavalidation  = validateInput(formData)
      if(datavalidation)
      {
        register({username:formData.username,password:formData.password});
      }
  };

  // TODO: CRIO_TASK_MODULE_REGISTER - Implement user input validation logic
  /**
   * Validate the input values so that any bad or illegal values are not passed to the backend.
   *
   * @param {{ username: string, password: string, confirmPassword: string }} data
   *  Object with values of username, password and confirm password user entered to register
   *
   * @returns {boolean}
   *    Whether validation has passed or not
   *
   * Return false if any validation condition fails, otherwise return true.
   * (NOTE: The error messages to be shown for each of these cases, are given with them)
   * -    Check that username field is not an empty value - "Username is a required field"
   * -    Check that username field is not less than 6 characters in length - "Username must be at least 6 characters"
   * -    Check that password field is not an empty value - "Password is a required field"
   * -    Check that password field is not less than 6 characters in length - "Password must be at least 6 characters"
   * -    Check that confirmPassword field has the same value as password field - Passwords do not match
   */

   const validateInput = (data) => {
    if (!data.username) {
      enqueueSnackbar("Username is a required field", { variant: "error" });
      return false;
    }
    if (data.username.length < 6) {
      enqueueSnackbar("Username must be at least 6 characters", { variant: "error" });
      return false;
    }
    if (!data.password) {
      enqueueSnackbar("Password is a required field", { variant: "error" });
      return false;
    }
    if (data.password.length < 6) {
      enqueueSnackbar("Password must be at least 6 characters", { variant: "error" });
      return false;
    }
    if (data.password !== data.confirmPassword) {
      enqueueSnackbar("Passwords do not match", { variant: "error" });
      return false;
    }
    // All validation checks passed
    return true;
  };
// useEffect(()=>{
//   console.log(formData);
// },[formData])
return (
  <Box
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      minHeight="100vh"
    >
      <Header hasHiddenAuthButtons />
      <form
        onSubmit={(e) => {
          handleRegistration(e);
        }}
      >
        <Box className="content">
          <Stack spacing={2} className="form">
            <h2 className="title">Register</h2>

            <TextField
              id="username"
              label="Username"
              variant="outlined"
              title="Username"
              name="username"
              placeholder="Enter Username"
              fullWidth
              value={formData.username}
              onChange={(e) =>
                setFormData({ ...formData, [e.target.name]: e.target.value })
              }
            />
            <TextField
              id="password"
              variant="outlined"
              label="Password"
              name="password"
              type="password"
              helperText="Password must be atleast 6 characters length"
              fullWidth
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, [e.target.name]: e.target.value })
              }
              placeholder="Enter a password with minimum 6 characters"
            />
            <TextField
              id="confirmPassword"
              variant="outlined"
              label="Confirm Password"
              name="confirmPassword"
              
              type="password"
              fullWidth
              value={formData.confirmPassword}
              onChange = {(e)=>{
                setFormData({ ...formData, [e.target.name]: e.target.value })
              }}
            />
            <Button className="button" variant="contained" type="submit">
              Register Now
            </Button>

            <p className="secondary-action">
              Already have an account?{" "}
              <a className="link" href="/login">
                Login here
              </a>
            </p>
          </Stack>
        </Box>
      </form>
      <Footer />
    </Box>
);
};


export default Register;
