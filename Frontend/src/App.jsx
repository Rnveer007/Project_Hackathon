import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import First from './First'
import Home from './pages/Home'
import Test from './pages/Test'
import Login from './pages/Login'
import Register from './pages/Register'
import UserProtectedRoute from './pages/UserProtectedRoute'
import UserAuthProvider from './pages/context/UserAuthProvider'
import AdminLogin from './admin/pages/AdminLogin'
import AdminHome from './admin/pages/AdminHome'
import AdminProtectedRoute from './admin/pages/ProtectedRoute'
import AdminAuth from './admin/context/Auth'
import AdminTest from './admin/pages/CreateNewTest'
import Admin from '../../Backend/models/adminLoginModel'

const router = createBrowserRouter([
  {
    path: "/",
    element: <First />,
    children: [
      {
        index: true,
        element:
          <UserProtectedRoute>
            <Home />
          </UserProtectedRoute>
      },
      {
        path: "/admin/test",
        element: 
        <AdminProtectedRoute>
        <AdminTest />
        </AdminProtectedRoute>
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
        path:"/adminregister",
        element:<Register/>
      },

      {
        path: "/adminhome",
        element:
          <AdminProtectedRoute>
            <AdminHome />
        //  </AdminProtectedRoute>
      },
    ]
  }
])

function App() {
  return (
    <>
      <AdminAuth>
        <UserAuthProvider>
          <RouterProvider router={router} />
        </UserAuthProvider>
      </AdminAuth>
    </>

  )
}

export default App