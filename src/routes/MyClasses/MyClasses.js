import React, { useContext } from "react";
import { Navigate } from "react-router-dom";

import { UserContext } from "../../contexts/user.context";

import "./MyClasses.css";

const MyClasses = () => {
  const { currentUser } = useContext(UserContext);
  return (
    <div className="MyClasses">
      {!currentUser && <Navigate to="/sign-in" />}
      <h1>These are my classes!</h1>1
    </div>
  );
};

export default MyClasses;
