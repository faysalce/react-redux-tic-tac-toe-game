import React from 'react';
import Button from '@mui/material/Button';

const Square = (props: any) => (

  <div className="btn-item">
    <Button
      sx={{
        width: "100%",
        fontSize: "2rem"
      }}
      size="large"
      variant="contained" className={`${props.winnerClass} square `} onClick={props.onClick} > {props.value}</Button>
  </div>
);

export default Square;