import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Logo from './Navbar/Logo';
import { useNavigate } from "react-router-dom";

const HomePageNav = () => {
  const navigate = useNavigate();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed">
        <Toolbar sx={{
          justifyContent: 'space-between',
        }}>
          <Logo fontSize="2rem"/>
          <Button color='inherit' sx={{textTransform: 'none', fontSize: '1.5rem'}} onClick={() => navigate("/login")}>Login</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default HomePageNav