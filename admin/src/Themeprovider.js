import { createTheme, ThemeProvider } from '@mui/material'

function Themeprovider({ children }) {
    const theme = createTheme({
        palette: {
            primary: {
                main: '#575353',
            },
            secondary: {
                main: '#4e342e',
            },
            mycolor: {
                main:'#2a3eb1'
            },
            orange: {
                main:'#FFA500'
            },
            navyblue: {
                main:'#000080'
            },
            lightgreen: {
                main:'#808000'
            },
            red: {
                main:'#FF0000'
            },
            blue: {
                main:'#0000FF'
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