import logo from "./logo.svg";
import css from "./styles/app.module.css";
import { BrowserRouter, Route, Link, Routes } from "react-router-dom";
import Home from "./components/Home";
import Header from "./components/Header";
import SingleMovie from "./components/SingleMovie";
import Favorites from "./components/Favorites";
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

// <Route path="/cart" element={<Cart />} />
// <Route path="/pizza/:ID" element={<SinglePizza />} />
