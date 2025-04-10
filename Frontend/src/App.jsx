import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import First from './First'
import UserProtectedRoute from './user/pages/UserProtectedRoute'
import AdminLogin from './admin/pages/AdminLogin'
import AdminHome from './admin/pages/AdminHome'
import AdminProtectedRoute from './admin/pages/ProtectedRoute'
import AdminAuth from './admin/context/Auth'
import AdminTest from './admin/pages/CreateNewTest'
import Login from './user/pages/Login'
import UserAuthProvider from "./user/context/UserAuthProvider"
import Home from './user/pages/Home'
import Register from './user/pages/Register'

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
        path: "/adminregister",
        element: <Register />
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