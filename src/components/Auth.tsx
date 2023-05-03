/* Sign in page */
import React, {useState} from 'react';
import styles from "./Auth.module.css"
import { useDispatch } from 'react-redux';
import { auth, provider, storage } from '../firebase';
import { GoogleAuthProvider } from 'firebase/auth';

import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Paper,
  Grid,
  Typography,
  makeStyles,
  Modal,
  IconButton,
  Box
} from "@mui/material"

 import { createTheme, ThemeProvider } from '@mui/material/styles';

import SendIcon from '@mui/icons-material/Send';
import CameraIcon from '@mui/icons-material/Camera';
import EmailIcon from '@mui/icons-material/Email';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';


const theme = createTheme();

const Auth: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setpassword] = useState("");
  // ログインとregisterを判別するstate
  const [isLogin, setIsLogin] = useState(true);

  const signInEmail = async () => {
    // await auth.signInWithEmailPassword(email, password);
  };

  // register時の関数
  // const signUpEmail = () async () => {
  //   await auth.createUserWithEmailAndPassword(email, password);
  // }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
  
    const signInGoogle = async () => {
      // await auth.signInWithPopup(provider).catch((err) => alert(err.message));
    }
  };
  

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1682965637063-9e77836fc393?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
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
              />
             
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              <Button 
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                // onClick={signInGoogle}
              >
                SignIn with Google
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}

export default Auth