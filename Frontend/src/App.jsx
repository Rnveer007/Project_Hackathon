import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import First from './First'
import Home from './pages/Home'
import Test from './pages/Test'
import Login from './pages/Login'
import Register from './pages/Register'


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
    ]
  }
])

function App() {
  return (
    <RouterProvider router={router} />
  )
}

export default App