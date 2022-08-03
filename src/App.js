import React from "react";
import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import MyClasses from "./routes/MyClasses/MyClasses";
import ChangeClasses from "./routes/ChangeClasses/ChangeClasses";
import AllClasses from "./routes/AllClasses/AllClasses";
import Navbar from "./components/Navbar/Navbar";
import NotSignedIn from "./routes/NotSignedIn/NotSignedIn";

const App = () => {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/sign-in" element={<NotSignedIn />} />
        <Route path="/" element={<Navigate to="/my-classes" />} />
        <Route path="/my-classes" element={<MyClasses />} />
        <Route path="/all-classes" element={<AllClasses />} />
        <Route path="/change-classes" element={<ChangeClasses />} />
      </Routes>
    </div>
  );
};

export default App;
