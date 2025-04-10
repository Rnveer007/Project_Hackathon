import { createBrowserRouter, RouterProvider } from "react-router-dom";

import First from "./First";
import UserProtectedRoute from "./user/pages/UserProtectedRoute";
import Login from "./user/pages/Login";
import Register from "./user/pages/Register";
import Home from "./user/pages/Home";
import UserAuthProvider from "./user/context/UserAuthProvider";

import AdminFirst from "./admin/pages/AdminFirst";
import AdminLogin from "./admin/pages/AdminLogin";
import AdminHome from "./admin/pages/AdminHome";
import AdminTest from "./admin/pages/CreateNewTest";
import AdminProtectedRoute from "./admin/pages/ProtectedRoute";
import AdminAuth from "./admin/context/Auth";
import AdminRegister from "./admin/pages/AdminRegister"
import ViewTests from "./admin/pages/ViewTests";

const router = createBrowserRouter([
  {
    path: "/",
    element: <First />,
    children: [
      {
        index: true,
        element: (
          <UserProtectedRoute>
            <Home />
          </UserProtectedRoute>
        ),
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
    ],
  },
  {
    path: "/admin",
    element: <AdminFirst />,
    children: [
      {
        path:"home",
        element: 
          <AdminProtectedRoute>
            <AdminHome />
          </AdminProtectedRoute>
      },
      {
        path: "login",
        element: <AdminLogin />,
      },
      {
        path: "register",
        element: <AdminRegister />,
      },
      {
        path: "test",
        element: (
          <AdminProtectedRoute>
            <AdminTest />
          </AdminProtectedRoute>
        ),
      },
      {
        path: "viewTest",
        element: (
          <AdminProtectedRoute>
            <ViewTests />
          </AdminProtectedRoute>
        ),
      },
    
    
      
    ],
  },
]);

function App() {
  return (
    <AdminAuth>
      <UserAuthProvider>
        <RouterProvider router={router} />
      </UserAuthProvider>
    </AdminAuth>
  );
}

export default App;
