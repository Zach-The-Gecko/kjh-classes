import React, { useContext, useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";

import { UserContext } from "../../contexts/user.context";
import { getPeriodClasses, getUserClasses } from "../../utils/firebase";

import "./MyClass.css";

const MyClass = () => {
  const { currentUser } = useContext(UserContext);
  const [thisClass, setThisClass] = useState({
    class: "none",
    teacher: "none",
    users: [],
  });
  const period = useParams().period;

  useEffect(() => {
    const getAllUsersClasses = async () => {
      if (currentUser) {
        const usersClasses = await getUserClasses(currentUser.userDocRef);
        const allClasses = await getPeriodClasses(period);
        usersClasses[period - 1] &&
          setThisClass(allClasses[usersClasses[period - 1].index]);
      }
    };
    getAllUsersClasses();
  }, [currentUser, period]);

  return (
    <div className="MyClass Page">
      {!currentUser && <Navigate to="/sign-in" />}
      <div className="ThisClass">
        <span className="ThisClassContent">{thisClass.class}</span>
        <span className="ThisClassContent">{thisClass.teacher}</span>
      </div>
      <div className="UsersContainer">
        {thisClass.users.map((user) => {
          const uid = user.split("@SEPERATE@")[0];
          const displayName = user.split("@SEPERATE@")[1];
          return (
            <span className="user" key={uid}>
              {displayName}
              {uid === currentUser.uid ? " (You)" : ""}
            </span>
          );
        })}
      </div>
    </div>
  );
};

export default MyClass;
