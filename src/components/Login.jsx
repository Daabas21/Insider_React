import { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

export default function Login() {

    const[data, setData] = useState("")

    const[input, setInput] = useState({username:"", password: ""})

    const handleChange = (e) => {
        setInput(prev => ({...prev, [e.target.name]: e.target.value}))
    }

  const handleSubmit = async () => {
    
    await fetch('http://localhost:5000/login', {
        method: "POST",
        body: JSON.stringify(input),
        headers: {
            'Content-Type' : 'application/json'
        },
        credentials: "include"
    })

    console.log(input)
  };

  const getUser = () => {
     fetch("http://localhost:5000/user",{credentials: "include"})
        .then(res => res.json())
        .then(data => setData(data))
  }

  return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
              marginTop: 8,
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
          <Box>
            <TextField
              margin="normal"
              fullWidth
              id="username"
              label="Username"
              name="username"
              value={input.username}
              onChange={handleChange}
              />
            <TextField
              margin="normal"
              fullWidth
              value={input.password}
              name="password"
              label="Password"
              type="password"
              id="password"
              onChange={handleChange}
              />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
              />
            <Button
              onClick={handleSubmit}
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <button onClick={getUser}>submit</button>
        {data ? <h1>wlcome Back {data.username}</h1> : null}
      </Container>
  );
}