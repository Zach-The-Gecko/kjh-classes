import React from "react";

import { useContext } from "react";
import { UserContext } from "../../contexts/user.context";

import "./MyClasses.css";

const MyClasses = () => {
  const { currentUser } = useContext(UserContext);
  console.log(currentUser);
  currentUser && console.log(currentUser.classes);
  return (
    <div className="MyClasses">
      {currentUser ? (
        <div>
          <h1>Hey {currentUser.displayName}! These are your classes!</h1>
          <span></span>
        </div>
      ) : (
        <h1>Sign in to see your name!</h1>
      )}
    </div>
  );
};

export default MyClasses;
