import {createBrowserRouter} from 'react-router-dom'

//PAGES
import Login from '../pages/Login/Login'
import Register from '../pages/Register/Register'
import Recover from '../pages/Recover/Recover'
import ErrorPage from '../pages/ErrorPage'
import Invitations from '../pages/Invitations/Invitations'
import AddInvitation from '../pages/Invitations/AddInvitation'

const router = createBrowserRouter([
    {
      path: "/",
      element: <Login/>,
      errorElement: <ErrorPage/>
    },
    {
      path: "/register",
      element: <Register/>,
      errorElement: <ErrorPage/>
    },
    {
      path: "/recover",
      element: <Recover/>,
      errorElement: <ErrorPage/>
    },
    {
      path: "/invitations",
      element: <Invitations/>,
      errorElement: <ErrorPage/>
    },
    {
      path: "/addInvitation",
      element: <AddInvitation/>,
      errorElement: <ErrorPage/>
    }
  ])

  export {router}