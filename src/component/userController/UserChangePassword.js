import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "../utils/axios";
import "./User.css";

// Material UI Imports
import { Alert, Button, Chip, Paper, Stack, TextField } from "@mui/material";

// Material UI Icon Imports
import PasswordIcon from '@mui/icons-material/Password';
import { Cookies, useCookies } from "react-cookie";

const isValidPasword = (password) =>
  /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,}$/i.test(password);

const UserChangePassword = () => {
  const navigate = useNavigate();

  const location = useLocation();

  async function changePassword() {
    await axios
      .post(
        "/user/change-password",
        {
          newPassword: passwordInput,
          confirmPassword: confirmPasswordInput,
          currentPassword: currentPasswordInput,
        },{
          headers:{
            Authorization:"Bearer "+cookies.accessToken
          }
        }
      )
      .then(function (response) {
        if (
          response.data.statusCode === 400 ||
          response.data.statusCode === "FORBIDDEN"
        ) {
          setFormValid(response.data.message);
        } else {
          setSuccess(response.data.message);
        }
      })
      .catch(function (error) {
        navigate("/exception", {
          state: {
            message: error.response.data.message,
            messageCode: error.response.data.messageCode,
            statusCode: error.response.data.statusCode,

          },
        });
      });
  }

  //Inputs
  const [cookies] = useCookies();
  const [passwordInput, setPasswordInput] = useState();
  const [confirmPasswordInput, setConfirmPasswordInput] = useState();
  const [currentPasswordInput, setcCurrentPasswordInput] = useState();

  // Inputs Errors
  const [passwordError, setPasswordError] = useState(false);
  const [confirmPasswordError, setConfirmPasswordError] = useState(false);
  const [currentPasswordError, setCurrentPasswordError] = useState(false);

  // Overall Form Validity
  const [formValid, setFormValid] = useState();
  const [success, setSuccess] = useState();


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

  const handleCurrentPassword = () => {
    if (!currentPasswordInput) {
      setCurrentPasswordError(true);
      return;
    }
    setCurrentPasswordError(false);
  };
  const handleSubmit = () => {
    setSuccess(null);
    //First of all Check for Errors

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

    // IF lastName error is true
    if (currentPasswordError || !currentPasswordInput) {
      setFormValid("Current password is wrong");
      return;
    }

    setFormValid(null);
    changePassword();
  };
  return (
    <div>
      <Paper className="paper" elevation={10}>
        <Chip
          id="confirm-icon"
          icon={<PasswordIcon />}
          label="Change Password"
          color="primary"
          variant="outlined"
        />
        <div style={{ textAlign: "center" }}>
          <p style={{ fontSize: "14px" }}>
            Enter new password
          </p>
        </div>
        <div className="field">
          <TextField
            error={passwordError}
            label="New Passowrd"
            id="standard-adornment-password"
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
        <div className="field">
          <TextField
            label="Current Password"
            type="password"
            error={currentPasswordError}
            id="outlined-input"
            variant="standard"
            sx={{ width: "80%" }}
            value={currentPasswordInput}
            InputProps={{}}
            size="small"
            onBlur={handleCurrentPassword}
            onChange={(event) => {
              setcCurrentPasswordInput(event.target.value);
            }}
          />
        </div>
        <div className="login-button">
          <Button variant="contained" fullWidth onClick={handleSubmit}>
            CHANGE
          </Button>
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

export default UserChangePassword;
