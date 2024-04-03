import React, { useState } from "react";
import axios from "axios";
import "./Form.css";
import { Link } from "react-router-dom";

// Material UI Imports
import { Paper, TextField, Button, Chip, Alert, Stack } from "@mui/material";

// Material UI Icon Imports
import FaceRetouchingNatural from "@mui/icons-material/FaceRetouchingNatural";
import HowToRegIcon from "@mui/icons-material/HowToReg";

// Email Validation
const isEmail = (email) =>
  /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email);

const isValidPasword = (password) =>
  /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,}$/i.test(password);

const isValidPhone = (phone) => /^(?=.*[0-9]).{10}$/i.test(phone);

const SignUp = () => {
  async function registerProcess() {
    await axios
      .post(
        "http://localhost:8080/api/register",
        {
          email: emailInput,
          password: passwordInput,
          firstName: firstNameInput,
          lastName: lastNameInput,
          phone: phoneInput,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then(function (response) {
        setData(response.data);
        console.log(response);
        if (
          response.data.statusCode === "BAD_REQUEST" ||
          response.data.statusCode === 400
        ) {
          setFormValid(response.data.message);
        } else {
          setSuccess(response.data.message);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  //Inputs
  const [data, setData] = useState([]);
  const [emailInput, setEmailInput] = useState();
  const [passwordInput, setPasswordInput] = useState();
  const [confirmPasswordInput, setConfirmPasswordInput] = useState();
  const [phoneInput, setPhoneInput] = useState();
  const [firstNameInput, setFirstNameInput] = useState();
  const [lastNameInput, setLastNameInput] = useState();

  // Inputs Errors
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [confirmPasswordError, setConfirmPasswordError] = useState(false);
  const [phoneError, setPhoneError] = useState(false);
  const [firstNameError, setFirstNameError] = useState(false);
  const [lastNameError, setLastNameError] = useState(false);

  // Overall Form Validity
  const [formValid, setFormValid] = useState();
  const [success, setSuccess] = useState();

  // Validation for onBlur First Name
  const handleFirstName = () => {
    if (!firstNameInput) {
      setFirstNameError(true);
      return;
    }

    setFirstNameError(false);
  };

  // Validation for onBlur Last Name
  const handleLastName = () => {
    if (!lastNameInput) {
      setLastNameError(true);
      return;
    }

    setLastNameError(false);
  };

  // Validation for onBlur Phone
  const handlePhone = () => {
    if (!isValidPhone(phoneInput)) {
      setPhoneError(true);
      return;
    }

    setPhoneError(false);
  };

  // Validation for onBlur Email
  const handleEmail = () => {
    if (!isEmail(emailInput)) {
      setEmailError(true);
      return;
    }

    setEmailError(false);
  };

  // Validation for onBlur passowrd
  const handlePassword = () => {
    if (!isValidPasword(passwordInput)) {
      setPasswordError(true);
      return;
    }
    setPasswordError(false);
  };

  // Validation for onBlur confirm Password
  const handleConfirmPassword = () => {
    if (passwordInput !== confirmPasswordInput) {
      setConfirmPasswordError(true);
      return;
    }

    setConfirmPasswordError(false);
  };

  //handle Submittion
  const handleSubmit = () => {
    setSuccess(null);
    //First of all Check for Errors

    // IF firstName error is true
    if (firstNameError || !firstNameInput) {
      setFormValid("First Name can not be blank");
      return;
    }

    // IF lastName error is true
    if (lastNameError || !lastNameInput) {
      setFormValid("Last Name can not be blank");
      return;
    }

    // IF phone error is true
    if (phoneError || !phoneInput) {
      setFormValid("Phone is incorrect format");
      return;
    }

    // If Email error is true
    if (emailError || !emailInput) {
      setFormValid("Email is Invalid");
      return;
    }

    // If Password error is true
    if (passwordError || !passwordInput) {
      setFormValid(
        "Password must be minimum 8 characters long, one upercase, one lowercase and one number"
      );
      return;
    }

    //  If Confirm Password error is true
    if (confirmPasswordError || !confirmPasswordInput) {
      setFormValid("Confirm password does not match");
      return;
    }

    setFormValid(null);
    registerProcess();
  };

  return (
    <div id="Form">
      <Paper className="paper" elevation={10}>
        <Chip
          id="register-icon"
          icon={<FaceRetouchingNatural />}
          label="SIGN UP NEW MEMBER"
          color="primary"
          variant="outlined"
        />
        <div className="register">
          <div className="field">
            <TextField
              error={firstNameError}
              label="First Name"
              variant="standard"
              sx={{ width: "80%" }}
              size="small"
              value={firstNameInput}
              InputProps={{}}
              onChange={(event) => {
                setFirstNameInput(event.target.value);
              }}
              onBlur={handleFirstName}
            />
          </div>
          <div className="field">
            <TextField
              error={lastNameError}
              label="Last Name"
              variant="standard"
              sx={{ width: "80%" }}
              size="small"
              value={lastNameInput}
              InputProps={{}}
              onChange={(event) => {
                setLastNameInput(event.target.value);
              }}
              onBlur={handleLastName}
            />
          </div>
          <div className="field">
            <TextField
              label="Email Address"
              fullWidth
              error={emailError}
              variant="standard"
              sx={{ width: "80%" }}
              value={emailInput}
              InputProps={{}}
              size="small"
              onBlur={handleEmail}
              onChange={(event) => {
                setEmailInput(event.target.value);
              }}
            />
          </div>
          <div className="field">
            <TextField
              label="Phone Number"
              fullWidth
              error={phoneError}
              variant="standard"
              sx={{ width: "80%" }}
              value={phoneInput}
              InputProps={{}}
              size="small"
              onBlur={handlePhone}
              onChange={(event) => {
                setPhoneInput(event.target.value);
              }}
            />
          </div>
          <div className="field">
            <TextField
              error={passwordError}
              label="Passowrd"
              type="password"
              variant="standard"
              sx={{ width: "80%" }}
              size="small"
              value={passwordInput}
              InputProps={{}}
              onBlur={handlePassword}
              onChange={(event) => {
                setPasswordInput(event.target.value);
              }}
            />
          </div>
          <div className="field">
            <TextField
              error={confirmPasswordError}
              label="Confirm Passowrd"
              type="password"
              variant="standard"
              sx={{ width: "80%" }}
              size="small"
              value={confirmPasswordInput}
              InputProps={{}}
              onBlur={handleConfirmPassword}
              onChange={(event) => {
                setConfirmPasswordInput(event.target.value);
              }}
            />
          </div>
        </div>
        <div style={{ marginTop: "10px" }}>
          <Button
            className="button"
            variant="contained"
            fullWidth
            startIcon={<HowToRegIcon />}
            onClick={handleSubmit}
          >
            Sign Up
          </Button>
        </div>

        <div style={{ marginTop: "10px" }}>
          <Link style={{ textDecoration: "none" }} to="/login">
            Back to login
          </Link>
        </div>

        {/* Show Form Error if any */}
        {formValid && (
          <Stack sx={{ width: "100%", paddingTop: "10px" }} spacing={2}>
            <Alert severity="error" size="small">
              {formValid}
            </Alert>
          </Stack>
        )}

        {/* Show Success if no issues */}
        {success && (
          <Stack sx={{ width: "100%", paddingTop: "10px" }} spacing={2}>
            <Alert severity="success" size="small">
              {success}
            </Alert>
          </Stack>
        )}
      </Paper>
    </div>
  );
};

export default SignUp;
