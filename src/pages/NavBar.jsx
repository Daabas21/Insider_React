import { Box, AppBar, Toolbar, IconButton, Typography, Button, Stack } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import { Link , useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const NavBar = () => {

  const navigate = useNavigate()

  const[data, setData] = useState("")

  useEffect( () => {
    fetch("http://localhost:5000/user",{credentials: "include"})
        .then(res => res.json())
        .then(data => setData(data))
  },[])

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Stack direction={"row"} spacing={3} flexGrow={1}>
          <Typography variant="h6">
            <Link to={"/"} style={{textDecoration:"none", color:"white"}}>
            Home
            </Link>
          </Typography>
          <Typography variant="h6">
          <Link to="/games" style={{textDecoration:"none", color:"white"}}>
            Games
            </Link>
          </Typography>
          <Typography variant="h6">
          <Link to="/users" style={{textDecoration:"none", color:"white"}}>
            Players
            </Link>
          </Typography>
          </Stack>
          {data? <h6 onClick={ () => navigate('/login')}>welcome {data.username}</h6> :
          <Button color="inherit" onClick={() => navigate("/login")}>Login</Button>
          }
        </Toolbar>
      </AppBar>
    </Box>
  )

}

export default NavBar;