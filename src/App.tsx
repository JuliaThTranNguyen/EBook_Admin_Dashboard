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
import { BookAuthors } from './pages/bookAuthors/BookAuthors';
import { BookGenres } from './pages/bookGenres/BookGenres';
import { User } from './pages/users/User';
import { Book } from './pages/books/Book';
import { Authors } from './pages/authors/Authors';
import { Author } from './pages/authors/Author';
import { Genre } from './pages/genres/Genre';
import { BookAuthor } from './pages/bookAuthors/BookAuthor';
import { BookGenre } from './pages/bookGenres/BookGenre';


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
          path: "/genres/:id",
          element: <Genre />
        },
        {
          path: "/books&authors",
          element: <BookAuthors />
        },
        {
          path: "/books&authors/:id",
          element: <BookAuthor />
        },
        {
          path: "/books&genres",
          element: <BookGenres />
        },
        {
          path: "/books&genres/:id",
          element: <BookGenre />
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