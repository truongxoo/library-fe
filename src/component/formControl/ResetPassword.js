import React, { useState } from "react";
import {  useNavigate,useLocation } from "react-router-dom";
import axios from "../utils/axios";
import "./Form.css";


// Material UI Imports
import { TextField, Button, Alert, Stack, Chip, Paper } from "@mui/material";

// Material UI Icon Imports
import RestartAltIcon from "@mui/icons-material/RestartAlt";

const isEmail = (email) =>
  /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email);

const ResetPassword = () => {
  
  async function resetPasswordProcess() {
    await axios
      .get("/reset-password", {
        headers: {
          "email": emailInput
        },
      })
      .then(function (response) {
        console.log(response);
        setData(response.data);
        if (response.data.statusCode === 400) {
          setFormValid(response.data.message+". Make sure you're using registered email");
        } else {
          setSuccess(response.data.message);
          navigate('/confirm-password',{ state:{email:emailInput}})
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  //Inputs
  const location = useLocation();
  const navigate = useNavigate();
  const [data, setData] = useState([]);
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
    setFormValid(null)
    resetPasswordProcess();
  }

  return (
    <div id="Form">
      <Paper className="paper" elevation={10}>
        <Chip
          id="reset-icon"
          icon={<RestartAltIcon />}
          label="Reset Password"
          color="primary"
          variant="outlined"
        />
        <div style={{ textAlign: "center" }}>
          <h4>Forgot your password?</h4>
          <p style={{ fontSize: "14px" }}>
            Enter your email address and we will send you instructions to reset
            your password.
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
            defaultValue={location.state==null ? "": location.state.email}
            InputProps={{}}
            size="small"
            onBlur={handleEmail}
            onChange={(event) => {
              setEmailInput(event.target.value);
            }}
          />
        </div>
        <div className="reset-button" >
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

export default ResetPassword;
