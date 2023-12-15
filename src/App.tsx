import { Home } from "./pages/home/Home";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";

import { Users } from "./pages/users/Users";
import { Books } from "./pages/books/Books";
import { Login } from "./pages/login/Login";
import { Profile } from "./pages/profile/Profile";
import { Genres } from "./pages/genres/Genres";
import { UserDetails } from "./pages/users/UserDetails";
import { BookDetails } from "./pages/books/BookDetails";
import { Authors } from "./pages/authors/Authors";
import { AuthorDetails } from "./pages/authors/AuthorDetails";
import { GenreDetails } from "./pages/genres/GenreDetails";
import { UserLayout } from "./components/layout/UserLayout";
import ProtectedRoute from "./components/ProtectedRoute";
import { GuestLayout } from "./components/layout/GuessLayout";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Outlet />,
      children: [
        {
          path: "/",
          element: <GuestLayout />,
        },
        {
          path: "/",
          element: <UserLayout />,
          children: [
            {
              path: "/*",
              element: <ProtectedRoute path="homepage" element={<Home />} />,
            },
            {
              path: "/users/*",
              element: <ProtectedRoute path="*" element={<Users />} />,
            },
            {
              path: "/users/:id/*",
              element: <ProtectedRoute path="*" element={<UserDetails />} />,
            },
            {
              path: "/books/*",
              element: <ProtectedRoute path="*" element={<Books />} />,
            },
            {
              path: "/books/:isbn/*",
              element: <ProtectedRoute path="*" element={<BookDetails />} />,
            },
            {
              path: "/authors/*",
              element: <ProtectedRoute path="*" element={<Authors />} />,
            },
            {
              path: "/authors/:id/*",
              element: <ProtectedRoute path="*" element={<AuthorDetails />} />,
            },
            {
              path: "/genres/*",
              element: <ProtectedRoute path="*" element={<Genres />} />,
            },
            {
              path: "/genres/:id/*",
              element: <ProtectedRoute path="*" element={<GenreDetails />} />,
            },
            {
              path: "/profile/*",
              element: <ProtectedRoute path="*" element={<Profile />} />,
            },
          ],
        },
        {
          path: "/login",
          element: <Login />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
