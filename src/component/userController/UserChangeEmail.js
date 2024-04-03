import React, { useState } from "react";
import { useCookies } from "react-cookie";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "../utils/axios";
import "./User.css";

import { Alert, Button, Chip, Paper, Stack, TextField } from "@mui/material";

// Material UI Icon Imports
import EmailIcon from "@mui/icons-material/Email";

const isEmail = (email) =>
  /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email);

const UserChangeEmail = () => {
  async function changeEmai() {
    await axios
      .post(
        "/user/change-email",
        {
          newEmail: emailInput,
        },
        {
          headers: {
            Authorization: "Bearer " + cookies.accessToken,
          },
        }
      )
      .then(function (response) {
        if (
          response.data.statusCode === "FORBIDDEN" ||
          response.data.statusCode === 403
        ) {
          setFormValid(response.data.message);
        } else {
          setSuccess(response.data.message);
          navigate("/user/info/change-email/confirm", {
            state: { newEmail: emailInput },
          });
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
  const location = useLocation();
  const navigate = useNavigate();
  const [emailInput, setEmailInput] = useState();

  // Inputs Errors
  const [emailError, setEmailError] = useState(false);

  // Overall Form Validity
  const [formValid, setFormValid] = useState();
  const [success, setSuccess] = useState();

  // Validation for onBlur Email
  const handleEmail = () => {
    if (!isEmail(emailInput)) {
      setEmailError(true);
      return;
    }

    setEmailError(false);
  };

  function handleSubmit() {
    setSuccess(null);
    //First of all Check for Errors

    // If Email error is true
    if (emailError || !emailInput) {
      if (!emailInput) {
        setFormValid("Email is mandatory");
        return;
      }
      if (emailError) {
        setFormValid("Email is invalid");
        return;
      }
    }
    setFormValid(null);
    changeEmai();
  }

  return (
    <div>
      <Paper className="paper" elevation={10}>
        <Chip
          id="reset-icon"
          icon={<EmailIcon />}
          label="Change Email"
          color="primary"
          variant="outlined"
        />
        <div style={{ textAlign: "center" }}>
          <p style={{ fontSize: "15 px" }}>
            Enter your new email address and we will send you instructions to
            change your email.
          </p>
        </div>

        <div className="field-reset">
          <TextField
            label="Email Address"
            error={emailError}
            id="outlined-input"
            variant="standard"
            sx={{ width: "80%" }}
            value={emailInput}
            defaultValue={location.state == null ? "" : location.state.email}
            InputProps={{}}
            size="small"
            onBlur={handleEmail}
            onChange={(event) => {
              setEmailInput(event.target.value);
            }}
          />
        </div>
        <div className="reset-button">
          <Button variant="contained" fullWidth onClick={handleSubmit}>
            CONTINUE
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

export default UserChangeEmail;
