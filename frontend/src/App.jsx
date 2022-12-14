import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./css/App.css";
import Create from "./Create";
import Home from "./Home";
import Navbar from "./Navbar";
import Login from "./Login";
import Profile from "./Profile";
import AllBook from "./AllBook";
import Signup from "./Signup";
import Book from "./Book";
import NotFound from "./NotFound";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="" element={<Home />} />
        <Route path="create" element={<Create />} />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
        <Route path="books" element={<AllBook />} />
        <Route path="/@:user" element={<Profile />} />
        <Route path="/book/:bookid" element={<Book />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
