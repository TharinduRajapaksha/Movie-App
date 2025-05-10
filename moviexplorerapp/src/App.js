import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Home from "./pages/Home.js";
import MovieDetails from "./pages/MovieDetails.js";
import Favorites from "./pages/Favorites.js";
import NavBar from "./components/NavBar.js";
import { MovieProvider } from "./context/MovieContext";

const App = () => {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);
  };

  const theme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <MovieProvider>
        <Router>
          <NavBar toggleDarkMode={toggleDarkMode} darkMode={darkMode} />
          <Routes>
            <Route path="/" element={<Home infiniteScroll={true} />} />
            <Route path="/movie/:id" element={<MovieDetails />} />
            <Route path="/favorites" element={<Favorites />} />
          </Routes>
        </Router>
      </MovieProvider>
    </ThemeProvider>
  );
};

export default App;
