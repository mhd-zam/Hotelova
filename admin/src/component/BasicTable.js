import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import CancelIcon from "@mui/icons-material/Cancel";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import Switch from "@mui/material/Switch";
import { Box, Button, Typography } from "@mui/material";

function Requirecomponent(key, value, id, text, color, textcolor, callback) {
  switch (key) {
    case 1:
      return value ? <Typography  >{value}</Typography> : 'not provided'

    case 2:
      return value ? (
        <CheckCircleIcon sx={{ color: "blueviolet" }} />
      ) : (
        <CancelIcon sx={{ color: "red" }} />
      );

    case 3:
      return (
        <Button
          variant="contained"
          sx={{ color: `${textcolor}`, borderRadius: 15 }}
          size="small"
          color={color}
          onClick={() => {
            callback(id);
          }}
        >
          {text}
        </Button>
      );

    case 4:
      return (
        <Switch
          checked={value}
          onChange={() => {
            callback(id);
          }}
          color="error"
        />
      );

    case 5:
      return <img width={60} height={40} src={value[0]} alt="" />;
    case 6:
      return (
        <span>
          Adult:{value.adults},Children:{value.childrens}
        </span>
      );
    case 7:
      return <span>₹{value}</span>;

    case 8:
      return (
        <Typography color={value === "Booking Confirmed" ? "green" : "red"}>
          {value}
        </Typography>
      );
    
    case 9: return value ? (
      <Button
          variant="contained"
          sx={{ color: `${textcolor}`, borderRadius: 5 }}
          size="small"
          color={color}
          onClick={() => {
              callback(id)
          }}
      >
          {text}
      </Button>
  ) : (
      ''
  )

    default:
      break;
  }
}

export default function BasicTable({ heading, data, title }) {
  return (
    <Box m={4} ml={1}>
      <Typography variant="h4" textAlign={"center"} m={2}>
        {title}
      </Typography>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              {heading
                ? heading.map((head, index) => (
                    <TableCell key={index}>{head.field}</TableCell>
                  ))
                : null}
            </TableRow>
          </TableHead>
          <TableBody>
            {data
              ? data.map((value, index) => (
                  <TableRow
                    key={index}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    {heading.map((head, index) => (
                      <TableCell component="th" key={index} scope="row">
                        {Requirecomponent(
                          head?.type,
                          value[head.field],
                          value._id,
                          head?.text,
                          head?.color,
                          head?.textcolor,
                          head?.callback
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              : null}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
