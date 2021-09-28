import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import CssBaseline from '@mui/material/CssBaseline';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
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

    console.log("Game", game);
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
        console.log(i);
        let historyGame: any = history.slice(0, currentStepNumber + 1);
        const current = historyGame[historyGame.length - 1];
        const squares = current.squares.slice();
        console.log('current', current);
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
        //console.log("Hostory Details", historySetval);
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
    console.log('history 1', history);
    console.log('currentStepNumber 1', currentStepNumber);

    const current = history[currentStepNumber];

    const { winner, winnerRow } = calculateWinner(current.squares);

    const moves = history.map((step: any, move: any) => {
        const currentLocation = step.currentLocation ? `(${step.currentLocation})` : '';
        const desc = step.stepNumber ? `Go to move #${step.stepNumber}` : 'Go to game start';
        const classButton = move === currentStepNumber ? 'button--green' : '';

        return (
            <ListItem button key={move} onClick={() => jumpTo(move)}>

                <ListItemText primary={desc} secondary={currentLocation} />
            </ListItem>
            // <li key={move}>
            //     <button className={`${classButton} button`} onClick={() => jumpTo(move)}>
            //         {`${desc} ${currentLocation}`}
            //     </button>
            // </li>
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

    console.log('game', game);
    return (
        <React.Fragment>
            <Grid className="melon"  >

                <Board
                    squares={current.squares}
                    winnerSquares={winnerRow}
                    onClick={(i: any) => handleClick(i)}
                />

            </Grid>

            <Box sx={{
                position: "fixed",
                top: "0",
                right: "0",
                bottom: "0",
                overflowX: "hidden",
                overflowY: "auto",
                width: "220px",
                backgroundColor: "#f1f1f1",

            }}>
                <div>{status}</div>
                <button className="button" onClick={() => sortMoves()}>
                    Sort moves
                </button>
                <button className="button button--new-game" onClick={() => reset()}>
                    New game
                </button>
                <List>
                    <CssBaseline />

                    {moves}


                </List>

            </Box>

        </React.Fragment>


    );

}

export default Game;