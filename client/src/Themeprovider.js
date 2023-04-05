import { createTheme, ThemeProvider } from '@mui/material'

import React from 'react'

export const theme0 = createTheme({
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    width: '98%',
                    backgroundColor:'#3c4043',
                    ':hover': {
                        backgroundColor: '#bd1e59',
                    },
                },
            },
        },
    },
}) 
export const theme1 = createTheme({
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    color: 'black',
                    width: '90%',
                    borderColor: 'black',
                    ':hover': {
                        borderColor: 'black',
                    },
                },
            },
        },
    },
})

function Themeprovider({children}) {
    const theme = createTheme({
        palette: {
         
            primary: {
                main: '#955251',
            },
            secondary: {
                main: '#a64942',
            },
            mycolor: {
                main:'#2a3eb1'
            },
            lightwhite: {
                main:'#FFFFFF'
            },
            textcolor: {
                main:'#955251'
            },
            nav: {
                main:'#ffffff'
            }
           
           
        },
    })
    return (
        <ThemeProvider theme={theme} >
            {children}
        </ThemeProvider>
    )
}

export default Themeprovider