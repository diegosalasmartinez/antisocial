import { Home, Newspaper, Bookmark } from '@mui/icons-material'
import { store } from '../../services/redux/store'

const navOptions = [
  {
    name: 'Home',
    path: '/',
    icon: <Home/>
  },
  {
    name: 'Profle',
    path: `/${store.getState().auth.user.username}`,
    icon: <Newspaper/>
  },
  {
    name: 'Saved',
    path: '/saved',
    icon: <Bookmark/>
  },
]

export default navOptions
