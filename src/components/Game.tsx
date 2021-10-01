import React, { useEffect, useState, useMemo } from 'react';
import { styled } from '@mui/material/styles';
import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import Board from './Board';

import { connect, useSelector, useDispatch } from 'react-redux';
import { gameUpdate } from '../actions/game';
import { keys } from '@mui/system';
const Item = styled(Paper)(({ theme }) => ({
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));
const calculateWinner = (squares: any) => {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    for (let i = 0; i < lines.length; i += 1) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return { winner: squares[a], winnerRow: lines[i] };
        }
    }

    return { winner: null, winnerRow: null };
};

const getLocation = (move: any) => {
    const locationMap: any = {
        0: 'row: 1, col: 1',
        1: 'row: 1, col: 2',
        2: 'row: 1, col: 3',
        3: 'row: 2, col: 1',
        4: 'row: 2, col: 2',
        5: 'row: 2, col: 3',
        6: 'row: 3, col: 1',
        7: 'row: 3, col: 2',
        8: 'row: 3, col: 3',
    };

    return locationMap[move];
};
const initialState = {
    history: [
        {
            squares: Array(9).fill(null),
        },
    ],
    currentStepNumber: 0,
    xIsNext: true,
};

const Game = (props: any) => {
    const { game } = useSelector((state: any) => state.game);

    const dispatch = useDispatch();
    const [gamesData, gamesDataSet] = useState<any>(game && Object.keys(game).length > 0 ? game : initialState);

    useEffect(() => {

        gamesDataSet(game);

    }, [game])
    const handleClick = (i: any) => {

        const history = gamesData.history.slice(0, gamesData.currentStepNumber + 1);
        const current = history[history.length - 1];
        const squares = current.squares.slice();

        if (calculateWinner(squares).winner || squares[i]) {
            return;
        }
        squares[i] = gamesData.xIsNext ? 'X' : 'O';
        let dataforSession = {
            history: history.concat([
                {
                    squares,
                    currentLocation: getLocation(i),
                    stepNumber: history.length,
                },
            ]),
            xIsNext: !gamesData.xIsNext,
            currentStepNumber: history.length,
        };
        dispatch(gameUpdate(dataforSession));

    }

    const jumpTo = (step: any) => {

        let dataforSession = {
            history: gamesData.history,
            currentStepNumber: step,
            xIsNext: step % 2 === 0,
        };
        dispatch(gameUpdate(dataforSession));

    }

    const sortMoves = () => {

        let dataforSession = {
            history: gamesData.history.reverse(),
            currentStepNumber: gamesData.currentStepNumber,
            xIsNext: gamesData.xIsNext,
        };
        dispatch(gameUpdate(dataforSession));
    }

    const reset = () => {

        dispatch(gameUpdate(initialState));

    }


    const current = gamesData.history[gamesData.currentStepNumber];

    const { winner, winnerRow } = calculateWinner(current.squares);

    const moves = gamesData.history.map((step: any, move: any) => {
        const currentLocation = step.currentLocation ? `(${step.currentLocation})` : '';
        const desc = step.stepNumber ? `Go to move #${step.stepNumber}` : 'Go to game start';
        const classButton = move === gamesData.currentStepNumber ? 'button--green' : '';

        return (
            <Card className="card--move-histry move" key={move} data-testid="move" onClick={() => jumpTo(move)}>
                <CardContent>
                    <Typography variant="button" display="block">
                        {desc}
                    </Typography>
                    <Typography>{currentLocation}</Typography>
                </CardContent>
            </Card>
        );
    });

    let status;
    let nextPlayer = gamesData.xIsNext ? "X" : "O";
    if (winner) {
        status = `Winner ${winner}`;
    } else if (gamesData.history.length === 10) {
        status = 'Draw. No one won.';
    } else {
        status = `Next player: ${nextPlayer}`;
    }

    return (
        <React.Fragment>
            <Grid>

                <Board
                    squares={current.squares}
                    winnerSquares={winnerRow}
                    onClick={(i: any) => handleClick(i)}
                />

                <Box>
                    <Box data-testid="status" className="status" sx={{ textAlign: "center", padding: "1rem" }}>{status}</Box>
                    <ButtonGroup
                        variant="outlined"
                        sx={{ width: "100%", justifyContent: "center" }}
                    >
                        <Button onClick={() => sortMoves()}>
                            Sort moves
                        </Button>
                        <Button onClick={() => reset()}>
                            New game
                        </Button>
                    </ButtonGroup>
                </Box>
            </Grid>

            <Box
                sx={{
                    position: "fixed",
                    top: "0",
                    right: "0",
                    bottom: "0",
                    overflowX: "hidden",
                    overflowY: "auto",
                    width: "220px",
                    backgroundColor: "#f1f1f1",
                    padding: "1.25rem"
                }}
                className="sidebar--move-histry"
            >
                <List>
                    {moves}
                </List>
            </Box>

        </React.Fragment>


    );

}

export default Game;