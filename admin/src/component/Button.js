import * as React from 'react';
import Button from '@mui/material/Button';

export default function Buttons({ text, callback, color, textcolor }) {
  
  return (
    
          <Button variant="contained" sx={{color:`${textcolor}`}}  size='small' color={color} onClick={callback} >{text}</Button>
    
  );
}