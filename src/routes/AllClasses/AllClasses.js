import React from "react";
import { useContext } from "react";
import { UserContext } from "../../contexts/user.context";
import "./AllClasses.css";

const AllClasses = () => {
  const { currentUser } = useContext(UserContext);
  console.log(currentUser);
  return (
    <div className="AllClasses">
      <h1>These are ALL of my classes!</h1>
    </div>
  );
};

export default AllClasses;
