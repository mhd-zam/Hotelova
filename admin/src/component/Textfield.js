import TextField from "@mui/material/TextField";
import React from "react";


export default function Textfield({ name, value, type,callback }) {
  return (
    <TextField
      id="demo-helper-text-aligned"
      type={type}
      label={name}
      name={name}
      color="mycolor"
      onChange={callback}
      size='medium'
    />
  );
}
