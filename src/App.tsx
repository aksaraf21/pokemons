import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { Container } from "@mui/system";
import PokimonList from "./pages/Pokimon-List/PokimonList";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import PokemonDetailsPage from "./pages/Pokemon-details/PokemonDetails";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <PokimonList />,
    },
    {
      path: "/pokimon",
      element: <PokemonDetailsPage />,
    },
  ]);
  return (
    <Container fixed>
        <RouterProvider router={router} />
    </Container>
  );
}

export default App;
