import React from 'react';
import { Home } from './pages/home/Home';
import {
  createBrowserRouter,
  RouterProvider,
  Outlet
} from "react-router-dom";

import { Users } from './pages/users/Users';
import { Books } from './pages/books/Books';
import { Navbar } from './components/navbar/Navbar';
import { Menu } from './components/menu/Menu';
import { Footer } from './components/footer/Footer';
import { Login } from './pages/login/Login';
import { Authors } from './pages/author/Authors';
import { Profile } from './pages/profile/Profile';

function App() {
const Layout = () => {
  return (
    <div className='main'>
      <Navbar />
      <div className="container">
        <div className="menuContainer">
        <Menu />
        </div>
        <div className="contentContainer">
          <Outlet />
        </div>
      </div>
      <Footer />
    </div>
  )
}

  const router = createBrowserRouter([
    {
      path: "/",
      element: < Layout />,
      children: [
        {
          path: "/",
          element: <Home />
        },
        {
          path: "/users",
          element: <Users />
        },
        {
          path: "/books",
          element: <Books />
        },
        {
          path: "/authors",
          element: <Authors />
        },
        {
          path: "/profile",
          element: <Profile />
        },
      ]
    },{
      path: "/login",
          element: <Login />
    }
  ]);

  
  return (
    <RouterProvider router={router} />
  );
}

export default App;