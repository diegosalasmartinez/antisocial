import { red } from '@mui/material/colors'
import { createTheme } from '@mui/material/styles'

const theme = createTheme({
  palette: {
    primary: {
      main: '#1B2223'
    },
    secondary: {
      main: '#19857B'
    },
    error: {
      main: red.A400
    }
  }
})

export default theme