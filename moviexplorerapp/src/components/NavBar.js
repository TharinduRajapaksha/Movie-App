import React from 'react';
import { AppBar, Toolbar, Typography, IconButton, Switch, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import { Brightness4, Brightness7 } from '@mui/icons-material';

const NavBar = ({ toggleDarkMode, darkMode }) => {
  return (
    <AppBar position="sticky">
      <Toolbar>
        <Box sx={{ display: 'flex', flexGrow: 1 }}>
          <Typography variant="h6" component={Link} to="/" sx={{ color: 'inherit', textDecoration: 'none' }}>
            MovieExplorer
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Link to="/favorites" style={{ color: 'inherit', textDecoration: 'none', marginRight: '16px' }}>
            <Typography variant="body1">Favorites</Typography>
          </Link>
          <Switch
            checked={darkMode}
            onChange={toggleDarkMode}
            icon={<Brightness7 />}
            checkedIcon={<Brightness4 />}
            aria-label="toggle dark mode"
          />
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
