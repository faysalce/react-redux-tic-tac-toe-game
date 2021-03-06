import React from 'react';
import Container from '@mui/material/Container';
import { Router } from "react-router-dom";
import { createBrowserHistory } from "history"
import Box from '@mui/material/Box';
import Game from "./components/Game"

import AppErrorBoundary from './common/ErrorBoundary';
const history = createBrowserHistory();
function App() {
  return (
    
      <Router history={history} >
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
              width: "100%",
              maxWidth: "300px",
              margin: "0 auto"
            }}>
              <AppErrorBoundary>
                <Game />
              </AppErrorBoundary>
            </Box>
          </Container>
        </Box>
      </Router>
  
  );
}

export default App;
