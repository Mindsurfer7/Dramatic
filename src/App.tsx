import css from "./styles/app.module.css";
import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./components/Home.tsx";
import Header from "./components/Header/Header.tsx";
import SingleMovie from "./components/SingleMovie/SingleMovie.tsx";
import Favorites from "./components/Favorites/Favorites.tsx";
import Footer from "./components/Footer/Footer";

function App() {
  return (
    <div className={css.wrapper}>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/SingleMovie/:ID" element={<SingleMovie />} />
        <Route path="/favorites" element={<Favorites />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
