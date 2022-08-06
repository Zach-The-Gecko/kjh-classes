import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../../contexts/user.context";
import "./AllClasses.css";

const AllClasses = () => {
  const { currentUser } = useContext(UserContext);
  return (
    <div className="AllClasses Page">
      {!currentUser && <Navigate to="/sign-in" />}
      <h1>These are ALL of my classes!</h1>
    </div>
  );
};

export default AllClasses;
