import { useCallback, useEffect, useState } from "react";
import Navbar from "./Navbar";
import GoogleButtonModule from "react-google-button";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { getRedirectResult, signInWithPopup, signInWithRedirect } from "firebase/auth";
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

const GoogleButton = GoogleButtonModule.default || GoogleButtonModule;

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

function Login() {
  let history = useNavigate();

  const viteImport = import.meta.env;

  const [credentials, setCredentials] = useState({ email: "", password: "" });

  const exchangeGoogleToken = useCallback(async (idToken) => {
    if (!viteImport.VITE_APP_GOOGLE_LOGIN_API) {
      throw new Error("Google login is not configured.");
    }

    const response = await fetch(viteImport.VITE_APP_GOOGLE_LOGIN_API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ idToken }),
    });
    const json = await response.json();

    if (!response.ok || !json.success || !json.authToken) {
      throw new Error(json.message || "Google login failed.");
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
          alert(error instanceof Error ? error.message : "Google login failed.");
        }
      }
    };

    completeRedirectSignIn();
    return () => {
      active = false;
    };
  }, [exchangeGoogleToken, history]);

  // Function send the auth token to login to user
  const handleSubmit = async (e) => {
    e.preventDefault();
    const login_api = viteImport.VITE_APP_LOGIN_API;
    try {
      const response = await fetch(login_api, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
      });
      const json = await response.json();

      if (!response.ok || !json.success) {
        throw new Error(json.message || "Invalid email or password.");
      }

      localStorage.setItem("token", json.authToken);
      history("/question");
    } catch (error) {
      alert(
        error instanceof TypeError
          ? "Unable to connect to the server."
          : error.message,
      );
    }
  };

  // Update the credentials.
  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const googleSignup = async () => {
    try {
      console.log("Google signup initiated...");
      const { getGoogleAuth } = await import("./Firebase");
      const { auth, provider } = getGoogleAuth();

      console.log("Auth:", auth);
      console.log("Provider:", provider);
      const result = await signInWithPopup(auth, provider);
      console.log("Google signup result:", result.user);
      
      await exchangeGoogleToken(await result.user.getIdToken());
      alert("Successfully Logined...");
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

      alert(error instanceof Error ? error.message : "Google login failed.");
    }
  };

  return (
    <>
      <Navbar style={{ backgroundColor: "#041858" }} active4={"active"} />
      <ThemeProvider theme={defaultTheme}>
        <Grid
          container
          component="main"
          sx={{
            height: "100vh",
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
          <Grid
            item
            xs={12}
            sm={8}
            md={5}
            component={Paper}
            square
            justifyContent="center"
          >
            <Box
              sx={{
                my: 8,
                mx: 4,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Login
              </Typography>
              <Box
                component="form"
                noValidate
                onSubmit={handleSubmit}
                sx={{ mt: 1 }}
              >
                {/* <TextField
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
                                /> */}
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
                {/* <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="phone"
                                    label="Phone"
                                    type='tel'
                                    id="phone"
                                    autoComplete="phone"
                                    autoFocus
                                    value={credentials.phone}
                                    onChange={onChange}
                                /> */}
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
                <GoogleButton onClick={googleSignup}></GoogleButton>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Login
                </Button>
                <Grid container>
                  {/* <Grid item xs>
                                        <Link href="#" variant="body2">
                                            Forgot password?
                                        </Link>
                                    </Grid> */}
                  <Grid item>
                    <NavLink to="/signup" variant="body2">
                      {"Not have account? SignUp"}
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

export default Login;
