import React from 'react'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import CancelIcon from '@mui/icons-material/Cancel'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import { Box, Button, Typography } from '@mui/material'

function Requirecomponent(
    key,
    value,
    id,
    text,
    color,
    textcolor,
    callback,
    head
) {
    switch (key) {
        case 1:
            return value ? (
                <Typography minWidth={90}>{value}</Typography>
            ) : (
                'not provided'
            )

        case 2:
            return value ? (
                <CheckCircleIcon sx={{ color: 'blueviolet' }} />
            ) : (
                <CancelIcon sx={{ color: 'red' }} />
            )

        case 3:
            return value ? (
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

        case 4:
            return value ? (
                <Box display={'flex'} flexDirection={'row'}>
                    <Button
                        variant="contained"
                        sx={{
                            color: `${head.textcolor1}`,
                            borderRadius: 5,
                            m: 1,
                        }}
                        size="small"
                        color={head.color1}
                        onClick={() => {
                            head.callback1(id)
                        }}
                    >
                        {head.text1}
                    </Button>
                    <Button
                        variant="contained"
                        sx={{
                            color: `${head.textcolor2}`,
                            borderRadius: 5,
                            m: 1,
                        }}
                        size="small"
                        color={head.color2}
                        onClick={() => {
                            head.callback2(id)
                        }}
                    >
                        {head.text2}
                    </Button>
                </Box>
            ) : (
                ''
            )

        case 5:
            return <img width={100} height={60} src={value} alt="" />

        case 6:
            return (
                <span>
                    Adult:{value.adults},Children:{value.childrens}
                </span>
            )
        case 7:
            return <span>₹{value}</span>

        case 8:
            return (
                <Typography
                    color={value === 'Booking Confirmed' ? 'green' : 'red'}
                >
                    {value}
                </Typography>
            )
        default:
            break
    }
}

function TableComponent({ heading, data, title, hideHeading }) {
    return (
        <Box>
            <Typography variant="h4" mt={5} color={'primary'}>
                {title}
            </Typography>
            <TableContainer sx={{ marginTop: 5 }}>
                <Table aria-label="simple table">
                    <TableHead sx={{ display: hideHeading ? 'none' : '' }}>
                        <TableRow>
                            {heading
                                ? heading.map((head, index) => (
                                      <TableCell key={index}>
                                          {head.field}
                                      </TableCell>
                                  ))
                                : null}
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {data
                            ? data.map((value, index) => (
                                  <TableRow
                                      key={index}
                                      sx={{
                                          '&:last-child td, &:last-child th': {
                                              border: 0,
                                          },
                                      }}
                                  >
                                      {heading.map((head, index) => (
                                          <TableCell
                                              key={index}
                                              component="th"
                                              scope="row"
                                          >
                                              {Requirecomponent(
                                                  head?.type,
                                                  value[head.field],
                                                  value._id,
                                                  head?.text,
                                                  head?.color,
                                                  head?.textcolor,
                                                  head?.callback,
                                                  head
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
    )
}

export default TableComponent
