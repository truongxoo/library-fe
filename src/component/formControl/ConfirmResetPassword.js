import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "../utils/axios";
import "./Form.css";
import { Link } from "react-router-dom";

// Material UI Imports
import { TextField, Button, Alert, Stack, Chip, Paper } from "@mui/material";

// Material UI Icon Imports
import AttachEmailIcon from "@mui/icons-material/AttachEmail";

const isValidPasword = (password) =>
  /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,}$/i.test(password);

const ConfirmResetPassword = () => {

  const navigate = useNavigate();

  const location = useLocation();

  async function confirmResetPasswordProcess() {
    await axios
      .post(
        "/reset-password",
        {
          newPassword: passwordInput
        },
        {
          headers: {
            otp: otpInput,
            email: location.state.email,
          },
        }
      )
      .then(function (response) {
        console.log(response);
        setData(response.data);
        if (response.data.statusCode === 400 || response.data.statusCode === "BAD_REQUEST") {
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
  const [otpInput, setOtpInput] = useState();
  const [passwordInput, setPasswordInput] = useState();
  const [confirmPasswordInput, setConfirmPasswordInput] = useState();

  // Inputs Errors
  const [otpError, setOtpError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [confirmPasswordError, setConfirmPasswordError] = useState(false);

  // Overall Form Validity
  const [formValid, setFormValid] = useState();
  const [success, setSuccess] = useState();

  // Label for Checkbox
  const label = { inputProps: { "aria-label": "Checkbox demo" } };

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

  const handleOtp = () => {
    if (!otpInput) {
      setOtpError(true);
      return;
    }
    setOtpError(false);
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
    if (otpError || !otpInput) {
      setFormValid(" OTP is mandatory");
      return;
    }

    setFormValid(null);
    confirmResetPasswordProcess();
  };

  return (
    <div id="confirm-form">
      <Paper className="paper" elevation={10}>
        <Chip
          id="confirm-icon"
          icon={<AttachEmailIcon />}
          label="Confirm Reset Password"
          color="primary"
          variant="outlined"
        />
        <div style={{ textAlign: "center" }}>
          <h4>OTP has sent to your email address</h4>
          <p style={{ fontSize: "14px" }}>
            Enter new password and OTP to confirm password reset.
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
            // id="standard-adornment-password"
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
            label="Otp"
            error={otpError}
            id="outlined-input"
            variant="standard"
            sx={{ width: "80%" }}
            value={otpInput}
            InputProps={{}}
            size="small"
            onBlur={handleOtp}
            onChange={(event) => {
              setOtpInput(event.target.value);
            }}
          />
        </div>
        <div className="login-button">
          <Button
            variant="contained"
            fullWidth
            onClick={handleSubmit}
          >
            CONFIRM
          </Button>
        </div>
        <div className="login-button">
          <Button
            variant="contained"
            fullWidth
            onClick={()=>{
              navigate('/reset-password',{ state:{email:location.state.email}})
            }}
          >
            RESEND
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

export default ConfirmResetPassword;
