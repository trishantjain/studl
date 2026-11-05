"use client";
import { useCallback, useEffect, useState } from "react";
import Navbar from "./Navbar";
import { NavLink, useNavigate } from "react-router-dom";
import Alert from "@mui/material/Alert";
import CheckIcon from "@mui/icons-material/Check";
import { GoogleButton } from "react-google-button";
import {
  getRedirectResult,
  signInWithPopup,
  signInWithRedirect,
} from "firebase/auth";

// import GoogleButton from 'react-google-button'
// import { auth, provider } from './Firebase'
// import { signInWithPopup } from 'firebase/auth'
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import {
  Avatar,
  Button,
  TextField,
  FormControlLabel,
  Checkbox,
  Link,
  Paper,
  Box,
  Grid,
  Typography,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        StudLearn
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const defaultTheme = createTheme();

async function readJsonResponse(response) {
  const body = await response.text();

  if (!body) {
    throw new Error(`Google signup failed with status ${response.status}.`);
  }

  try {
    return JSON.parse(body);
  } catch {
    throw new Error(
      `Google signup returned an invalid response (HTTP ${response.status}).`,
    );
  }
}

export default function Signup() {
  let history = useNavigate();

  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });
  const [err, setErr] = useState([]);
  // const [googleSign, setGoogleSign] = useState({ g_name: "", g_email: "", g_phone: "" })

  const viteImport = import.meta.env;

  const exchangeGoogleToken = useCallback(async (idToken) => {
    if (!viteImport.VITE_APP_GOOGLE_LOGIN_API) {
      throw new Error("Google signup is not configured.");
    }

    const response = await fetch(viteImport.VITE_APP_GOOGLE_LOGIN_API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ idToken }),
    });
    const json = await readJsonResponse(response);

    if (!response.ok || !json.success || !json.authToken) {
      throw new Error(json.message || "Google signup failed.");
    }

    localStorage.setItem("token", json.authToken);
  }, [viteImport.VITE_APP_GOOGLE_LOGIN_API]);

  useEffect(() => {
    let active = true;

    const completeRedirectSignIn = async () => {
      try {
        const { getGoogleAuth } = await import("./Firebase");
        const { auth } = getGoogleAuth();
        const result = await getRedirectResult(auth);

        if (active && result?.user) {
          await exchangeGoogleToken(await result.user.getIdToken());
          history("/question");
        }
      } catch (error) {
        if (active) {
          setErr([error.message || "Google signup failed."]);
        }
      }
    };

    completeRedirectSignIn();
    return () => {
      active = false;
    };
  }, [exchangeGoogleToken, history]);

  const googleSignup = async () => {
    try {
      if (!viteImport.VITE_APP_GOOGLE_LOGIN_API) {
        throw new Error(
          "Google signup is not configured. Set VITE_APP_GOOGLE_LOGIN_API to the backend Google login endpoint.",
        );
      }

      const { getGoogleAuth } = await import("./Firebase");
      const { auth, provider } = getGoogleAuth();
      const result = await signInWithPopup(auth, provider);
      const idToken = await result.user.getIdToken();
      await exchangeGoogleToken(idToken);
      history("/question");
    } catch (error) {
      if (
        error?.code === "auth/popup-closed-by-user" ||
        error?.code === "auth/popup-blocked"
      ) {
        const { getGoogleAuth } = await import("./Firebase");
        const { auth, provider } = getGoogleAuth();
        await signInWithRedirect(auth, provider);
        return;
      }

      console.error("Google Signup Error:", error);
      setErr([error.message || "Google signup failed."]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const signup_api = viteImport.VITE_APP_SIGNUP_API;
    try {
      const response = await fetch(signup_api, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
      });
      const json = await response.json();

      if (!response.ok || !json.success) {
        const messages = Array.isArray(json.errors)
          ? json.errors.map((error) => error.msg)
          : [json.message || "Unable to create your account."];
        setErr(messages);
        return;
      }

      localStorage.setItem("token", json.authToken);
      history("/question");
    } catch (error) {
      setErr([
        error instanceof TypeError
          ? "Unable to connect to the server."
          : error.message,
      ]);
    }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (err.length > 0) {
      const timer = setTimeout(() => {
        setErr((prevAlert) => prevAlert.slice(1)); // Clear all error from the list after 5s
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [err]);

  // const googleSignup = async () => {
  //     try {
  //         await signInWithPopup(auth, provider).then((data) => {
  //             alert("Successfully Logined...")
  //         })
  //     } catch (error) {
  //         console.log(error)
  //     }
  // }

  return (
    <>
      <Navbar style={{ backgroundColor: "#041858" }} active5={"active"} />
      <ThemeProvider theme={defaultTheme}>
        <Grid
          container
          component="main"
          sx={{
            height: "80vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {/* <CssBaseline /> */}
          {/* <Grid
                        item
                        xs={false}
                        sm={4}
                        md={7}
                        sx={{
                            backgroundImage: 'url(https://source.unsplash.com/random?wallpapers)',
                            backgroundRepeat: 'no-repeat',
                            backgroundColor: (t) =>
                                t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                        }}
                    /> */}

          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "right",
            }}
          >
            {err.length > 0 &&
              err.map((msg, index) => (
                <Alert
                  key={index}
                  icon={<CheckIcon fontSize="inherit" />}
                  severity="warning"
                >
                  {msg}
                </Alert>
              ))}
          </Box>

          <Grid item xs={12} sm={8} md={5} component={Paper} square>
            <Box
              sx={{
                my: 8,
                mx: 4,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              {/* Alert Box */}
              {/* <Box
                                sx={{
                                    my: 8,
                                    mx: 4,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'right',
                                }}
                            >
                                {err.length > 0 && (
                                    err.map((msg, index) => (
                                        <Alert key={index} icon={<CheckIcon fontSize="inherit" />} severity="warning">
                                            {msg}
                                        </Alert>
                                    ))
                                )}
                            </Box> */}

              <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Sign Up
              </Typography>
              <Box
                component="form"
                noValidate
                onSubmit={handleSubmit}
                sx={{ mt: 1 }}
              >
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="name"
                  label="Name"
                  name="name"
                  autoComplete="name"
                  autoFocus
                  value={credentials.name}
                  onChange={onChange}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="email"
                  label="Email Address"
                  type="email"
                  id="email"
                  autoComplete="email"
                  autoFocus
                  value={credentials.email}
                  onChange={onChange}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="phone"
                  label="Phone"
                  type="tel"
                  id="phone"
                  autoComplete="phone"
                  autoFocus
                  value={credentials.phone}
                  onChange={onChange}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  value={credentials.password}
                  onChange={onChange}
                />
                <FormControlLabel
                  control={<Checkbox value="remember" color="primary" />}
                  label="Remember me"
                />

                <GoogleButton
                  onClick={googleSignup}
                  label="Sign up with Google"
                  type="light"
                  style={{
                    width: "100%",
                    borderRadius: "5px",
                    marginTop: "10px",
                  }}
                />

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Sign Up
                </Button>
                <Grid container>
                  {/* <Grid item xs>
                                        <Link href="#" variant="body2">
                                            Forgot password?
                                        </Link>
                                    </Grid> */}
                  <Grid item>
                    <NavLink to="/login" variant="body2">
                      {"Have an account? Login"}
                    </NavLink>
                  </Grid>
                </Grid>
                <Copyright sx={{ mt: 5 }} />
              </Box>
            </Box>
          </Grid>
        </Grid>
      </ThemeProvider>
    </>
  );
}
