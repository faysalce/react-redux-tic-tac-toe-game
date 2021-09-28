import React from 'react';
import Button from '@mui/material/Button';

const Square = (props: any) => (

  <div style={{padding:"4px",width: "33.33333%",}}><Button
    sx={{
      fontSize: "2rem"
    }}
    size="large"

    variant="contained" className={`${props.winnerClass} square `} onClick={props.onClick} > {props.value}</Button>
    </div>
);

export default Square;