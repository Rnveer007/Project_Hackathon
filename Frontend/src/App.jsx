import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import First from './First'
import Home from './pages/Home'
import Test from './pages/Test'
import Login from './pages/Login'
import Register from './pages/Register'
import AdminLogin from './Admin/AdminLogin'
import AdminHome from './Admin/AdminHome'


const router = createBrowserRouter([
  {
    path: "/",
    element: <First />,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: "/test",
        element: <Test />
      },
      {
        path: "/login",
        element: <Login />
      },
      {
        path: "/register",
        element: <Register />
      },
      {
        path: "/adminlogin",
        element: <AdminLogin />
      },
      {
        path: "/adminhome",
        element: <AdminHome />
      },
    ]
  }
])

function App() {
  return (
    <RouterProvider router={router} />
  )
}

export default App