import React, { useState, useContext } from "react";
import AuthContext from "../../context/AuthProvider";
import axios from "../utils/axios";
import "./Form.css";
import { Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

// Material UI Imports
import {
  TextField,
  Button,
  Checkbox,
  Alert,
  Stack,
  Chip,
  Paper,
} from "@mui/material";

// Material UI Icon Imports
import LoginIcon from "@mui/icons-material/Login";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import KeyIcon from "@mui/icons-material/Key";
import LockIcon from "@mui/icons-material/Lock";

const isEmail = (email) =>
  /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email);

const LOGIN_URL = "/auth/login";

const Login = () => {
  //Inputs
  const   [user,setUser]  = useContext(AuthContext);
  const [cookies, setCookie] = useCookies(["user"]);
  const navigate = useNavigate();
  const [dataResponse, setDataResponse] = useState([]);
  const [emailInput, setEmailInput] = useState();
  const [passwordInput, setPasswordInput] = useState();
  const [rememberMe, setRememberMe] = useState();

  // Inputs Errors
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  // Overall Form Validity
  const [formValid, setFormValid] = useState();
  const [success, setSuccess] = useState();

  async function loginProcess() {
    await axios
      .post(
        LOGIN_URL,
        {
          email: emailInput,
          password: passwordInput,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then(function (response) {
        setDataResponse(response.data);
        if (
          response.data.statusCode === "BAD_REQUEST" ||
          response.data.statusCode === "FORBIDDEN"
        ) {
          setFormValid(response.data.message);
        } else {
          setSuccess(response.data.token);
          setCookie("accessToken", response.data.token);
          setCookie("refreshToken", response.data.refreshToken);
          setUser({userName: "UserName",isAuthenticated: true,role:"ADMIN"});
          navigate("/user");
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  // Label for Checkbox
  const label = { inputProps: { "aria-label": "Checkbox demo" } };

  // Validation for onBlur Email
  const handleEmail = () => {
    if (!isEmail(emailInput)) {
      setEmailError(true);
      return;
    }

    setEmailError(false);
  };

  // Validation for onBlur Password
  const handlePassword = () => {
    if (!passwordInput) {
      setPasswordError(true);
      return;
    }
    setPasswordError(false);
  };

  const handleSubmit = () => {
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

    // If Password error is true
    if (passwordError || !passwordInput) {
      setFormValid("Password is mandatory");
      return;
    }
    setFormValid(null);
    loginProcess();
  };

  return (
    <div id="Form">
      <Paper className="paper" elevation={10}>
        <Chip
          id="login-icon"
          icon={<LockIcon />}
          label="LOG IN"
          color="primary"
          variant="outlined"
        />
        <div className="field">
          <AccountBoxIcon style={{ padding: "5%" }} />
          <TextField
            label="Email Address"
            error={emailError}
            id="outlined-input"
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
          <KeyIcon style={{ padding: "5%" }} />
          <TextField
            error={passwordError}
            label="Passowrd"
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
        <div className="remember">
          <Checkbox
            {...label}
            size="small"
            onChange={(event) => setRememberMe(event.target.checked)}
          />
          Remember Me
        </div>

        <div className="login-button">
          <Button
            variant="contained"
            fullWidth
            startIcon={<LoginIcon />}
            onClick={handleSubmit}
          >
            LOGIN
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
        <div className="bottom-link">
          <Link to="/reset-password">Forgot Password</Link>
          <br />
          <p>
            Do you have an account ?<Link to="/register">Sign Up Now</Link>
          </p>
        </div>
      </Paper>
    </div>
  );
};

export default Login;
