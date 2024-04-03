import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "../utils/axios";
import "./User.css";

import { Alert, Button, Chip, Paper, Stack, TextField } from "@mui/material";

// Material UI Icon Imports
import SmartphoneIcon from "@mui/icons-material/Smartphone";
import { useCookies } from "react-cookie";

const ChangeEmailConfirmation = () => {
  async function confirm() {
    await axios
      .post("/user/change-email/confirm",{
        newEmail: state.newEmail,

      }, {
        headers: {
          otp:otpInput,
          Authorization: "Bearer " + cookies.accessToken,
        },
      })
      .then(function (response) {
        if (response.data.statusCode === 400) {
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
  const {state} = useLocation();
  const navigate =useNavigate();
  const [otpInput, setOtpInput] = useState();

  // Inputs Errors
  const [otpError, setOtpError] = useState(false);

  // Overall Form Validity
  const [formValid, setFormValid] = useState();
  const [success, setSuccess] = useState();

  // Validation for onBlur Phone
  const handleOtp = () => {
    if (!otpInput) {
      setOtpError(true);
      return;
    }

    setOtpError(false);
  };

  function handleSubmit() {
    setSuccess(null);

    // IF phone error is true
    if (otpError || !otpInput) {
      setFormValid("OTP is required");
      return;
    }

    setFormValid(null);
    confirm();
  }
  function handleResend(){
    navigate("/user/info/change-email")
  }

  return (
    <div>
      <Paper className="paper" elevation={10}>
        <Chip
          id="reset-icon"
          icon={<SmartphoneIcon />}
          label="Change Phone"
          color="primary"
          variant="outlined"
        />
        <div style={{ textAlign: "center" }}>
          <p style={{ fontSize: "15 px" }}>
            Enter your OTP which is sent to your email.
          </p>
        </div>

        <div className="field-reset">
          <TextField
            label="Enter OTP"
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
        <div className="reset-button">
          <Button variant="contained" fullWidth onClick={handleSubmit}>
            CONFIRM
          </Button>
        </div>
        <div className="reset-button">
          <Button variant="contained" fullWidth onClick={handleResend}>
            RESEND
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

export default ChangeEmailConfirmation;
