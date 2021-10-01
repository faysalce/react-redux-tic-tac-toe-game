import React, { useState } from 'react';
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


const Game = (props: any) => {
    const { game } = useSelector((state: any) => state.game);

    const dispatch = useDispatch();
    const [history, historySet] = useState<any>(game?.history?.length > 0 ? game.history : [
        {
            squares: Array(9).fill(null),
        },
    ]);
    const [currentStepNumber, currentStepNumberSet] = useState<any>(game?.currentLocationNumber ? game.currentLocationNumber : 0);
    const [xIsNext, xIsNextSet] = useState<any>(game?.xIsNext === undefined ? true : game.xIsNext);
    const [nextPlayer, nextPlayerSet] = useState<any>(game?.nextPlayer ? game.nextPlayer : 'X');

    const handleClick = (i: any) => {
        let historyGame: any = history.slice(0, currentStepNumber + 1);
        const current = historyGame[historyGame.length - 1];
        const squares = current.squares.slice();
        if (calculateWinner(squares).winner || squares[i]) {
            return;
        }

        squares[i] = xIsNext ? 'X' : 'O';
        nextPlayerSet(nextPlayer == "X" ? "O" : "X")
        let historySetval = historyGame.concat([
            {
                squares,
                currentLocation: getLocation(i),
                stepNumber: historyGame.length,
            },
        ]);
        historySet(historySetval)

        xIsNextSet(!xIsNext)
        currentStepNumberSet(historyGame.length)
        let dataforSession = {
            history: historySetval,
            currentLocationNumber: historyGame.length - 1,
            xIsNext: xIsNext,
            nextPlayer: nextPlayer
        }
        dispatch(gameUpdate(dataforSession));
    }

    const jumpTo = (step: any) => {
        currentStepNumberSet(step)
        xIsNextSet(step % 2 === 0)
        let dataforSession = {
            history: history,
            currentLocationNumber: step,
            xIsNext: step % 2 === 0,
            nextPlayer: nextPlayer
        }
        dispatch(gameUpdate(dataforSession));

    }

    const sortMoves = () => {
        historySet(history.reverse())
        let dataforSession = {
            history: history,
            currentLocationNumber: currentStepNumber,
            xIsNext: xIsNext,
            nextPlayer: nextPlayer
        }
        dispatch(gameUpdate(dataforSession));

    }

    const reset = () => {
        historySet([
            {
                squares: Array(9).fill(null),
            },
        ]);
        currentStepNumberSet(0)
        xIsNextSet(true);
        dispatch(gameUpdate({}));

        // this.setState(initialState);
    }

    const current = history[currentStepNumber];

    const { winner, winnerRow } = calculateWinner(current.squares);

    const moves = history.map((step: any, move: any) => {
        const currentLocation = step.currentLocation ? `(${step.currentLocation})` : '';
        const desc = step.stepNumber ? `Go to move #${step.stepNumber}` : 'Go to game start';
        const classButton = move === currentStepNumber ? 'button--green' : '';

        return (
            <Card className="card--move-histry move" key={move} data-testid="move"  onClick={() => jumpTo(move)}>
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
    if (winner) {
        status = `Winner ${winner}`;
    } else if (history.length === 10) {
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