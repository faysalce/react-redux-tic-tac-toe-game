import React from 'react';
import Container from '@mui/material/Container';
import Pricing from './components/Pricing';
import Box from '@mui/material/Box';
import { flexbox } from '@mui/system';

import Game from "./components/Game"
function App() {
  return (
    <Container  fixed >
      <Box sx={{
      minHeight: "100vh",
      display:"flex",
    alignItems:"center",
    justifyContent:"center",
    marginRight:"220px"
    }}>
      <Game />
      </Box>
    </Container>
  );
}

export default App;
