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
import { Profile } from './pages/profile/Profile';
import { Genres } from './pages/genres/Genres';
import { BookAuthors } from './pages/book_author/BookAuthors';
import { BookGenres } from './pages/bookGenres/BookGenres';
import { User } from './pages/user/User';
import { Book } from './pages/book/Book';
import { Authors } from './pages/authors/Authors';
import { Author } from './pages/author/Author';


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
          path: "/users/:id",
          element: <User />
        },
        {
          path: "/books",
          element: <Books />
        },
        {
          path: "/books/:id",
          element: <Book />
        },
        {
          path: "/authors",
          element: <Authors />
        },
        {
          path: "/authors/:id",
          element: <Author />
        },
        {
          path: "/genres",
          element: <Genres />
        },
        {
          path: "/books&authors",
          element: <BookAuthors />
        },
        {
          path: "/books&genres",
          element: <BookGenres />
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