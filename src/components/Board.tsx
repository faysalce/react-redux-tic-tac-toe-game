import React from 'react';
import ButtonGroup from '@mui/material/ButtonGroup';
import Square from './Square';

const Board = (props: any) => {
    const createBoard = (row: any, col: any) => {
        const board = [];
        let cellCounter = 0;

        for (let i = 0; i < row; i += 1) {
            const columns = [];
            for (let j = 0; j < col; j += 1) {
                columns.push(renderSquare(cellCounter++));
            }
            board.push(


                <ButtonGroup key={i} sx={{

                    margin: '0px',
                    display: 'flex',
                    flexWrap: "wrap",
                    width:"100%",
                    maxWidth:"600px",
                }} variant="outlined" aria-label="outlined button group">
                    {columns}


                </ButtonGroup>


            );
        }

        return board;
    }

    const renderSquare = (i: any) => {
        const winnerClass =
            props.winnerSquares &&
                (props.winnerSquares[0] === i ||
                    props.winnerSquares[1] === i ||
                    props.winnerSquares[2] === i)
                ? 'square--green'
                : '';

        return (
            <Square
                winnerClass={winnerClass}
                key={i}
                value={props.squares[i]}
                onClick={() => props.onClick(i)}
            />
        );
    }


    return <React.Fragment>{createBoard(3, 3)}</React.Fragment>;

}

export default Board;