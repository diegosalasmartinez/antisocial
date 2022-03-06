import { Home, Newspaper, Bookmark, Category } from '@mui/icons-material'

const navOptions = [
  {
    name: 'Home',
    path: '/',
    icon: <Home/>
  },
  {
    name: 'Profile',
    path: `/user`,
    icon: <Newspaper/>
  },
  {
    name: 'Saved',
    path: '/saved',
    icon: <Bookmark/>
  },
  {
    name: 'Categories',
    path: '/categories',
    icon: <Category/>
  },
]

export default navOptions
