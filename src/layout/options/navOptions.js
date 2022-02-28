import { Home, Newspaper, Bookmark } from '@mui/icons-material'

const navOptions = [
  {
    name: 'Home',
    path: '/',
    icon: <Home/>
  },
  {
    name: 'Profile',
    path: `/profile`,
    icon: <Newspaper/>
  },
  {
    name: 'Saved',
    path: '/saved',
    icon: <Bookmark/>
  },
]

export default navOptions
