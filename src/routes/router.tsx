import { createBrowserRouter } from 'react-router-dom'
import Home from '../components/Home'
import Navbar from '../components/Navbar'
import Geojournal from '../components/Geojournal'
import History from '../components/History'
import ErrorPage from '../components/ErrorPage'

const router = createBrowserRouter([
  {
    element: <Navbar />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/geojournal',
        element: <Geojournal />,
      },
      {
        path: '/history',
        element: <History />,
      }
    ]
  }
])

export default router

