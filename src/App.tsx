import React from 'react';
import Container from '@mui/material/Container';
import Pricing from './components/Pricing';
import Box from '@mui/material/Box';

import Game from "./components/Game"
function App() {
  return (
    <Box 
      sx={{
        width: "calc(100% - 220px)",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}
      className="gamebox"
    >
      <Container fixed >
        <Box sx={{
          width:"100%",
          maxWidth:"300px",
          margin:"0 auto"
        }}>
          <Game />
        </Box>
      </Container>
    </Box>
  );
}

export default App;
