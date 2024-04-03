import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../utils/axios";
import "./User.css";

import { Alert, Button, Chip, Paper, Stack, TextField } from "@mui/material";

// Material UI Icon Imports
import SmartphoneIcon from '@mui/icons-material/Smartphone';
import { useCookies } from "react-cookie";

const isValidPhone = (phone) => /^(?=.*[0-9]).{10}$/i.test(phone);

const UserChangePhone = () => {
  async function changePhone() {
    await axios
      .get("/user/change-phone", {
        headers: {
          Authorization:"Bearer "+cookies.accessToken
        },
      })
      .then(function (response) {
        if (response.data.statusCode === 400) {
          setFormValid(
            response.data.message
          );
        } else {
          setSuccess(response.data.message);
          navigate("/user/info/change-phone/confirm", {state: {phone: phoneInput}});
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
  const navigate = useNavigate();
  const [phoneInput, setPhoneInput] = useState();

  // Inputs Errors
  const [phoneError, setPhoneError] = useState(false);

  // Overall Form Validity
  const [formValid, setFormValid] = useState();
  const [success, setSuccess] = useState();


  // Validation for onBlur Phone
  const handlePhone = () => {
    if (!isValidPhone(phoneInput)) {
      setPhoneError(true);
      return;
    }

    setPhoneError(false);
  };

  function handleSubmit() {
    setSuccess(null);
    //First of all Check for Errors

    // IF phone error is true
    if (phoneError || !phoneInput) {
      setFormValid("Phone is incorrect format");
      return;
    }
    setFormValid(null);
    changePhone();
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
            Enter your new phone number and we will send you instructions to
            change your phone. 
          </p>
        </div>

        <div className="field-reset">
          <TextField
            label="New Phone Number"
            error={phoneError}
            id="outlined-input"
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

export default UserChangePhone;
