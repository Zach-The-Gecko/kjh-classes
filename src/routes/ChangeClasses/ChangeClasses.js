import React, { useContext, useState } from "react";
import { UserContext } from "../../contexts/user.context";
import { Navigate } from "react-router-dom";
import "./ChangeClasses.css";
import { getUserClasses } from "../../utils/firebase";
import { useEffect } from "react";

const ChangeClasses = () => {
  const { currentUser } = useContext(UserContext);
  const [classes, setClasses] = useState([]);

  useEffect(() => {
    if (currentUser) {
      const getData = async () => {
        const data = await getUserClasses(currentUser.userDocRef);
        setClasses(data);
      };
      getData();
    }
  }, [currentUser]);

  return (
    <div className="ChangeClasses">
      <div className="ChangeClassHeading">
        <span>
          Click on a class to change its subject, or copy and paste your classes
          from MyDSD by pressing the button below.
        </span>
        <span className="ButtonChangeClassHeading">Copy Classes</span>
      </div>
      {!currentUser ? (
        <Navigate to="/sign-in" />
      ) : (
        [...Array(10)].map((_item, ind) => {
          return (
            <div className={`PeriodBox Is${classes[ind]}`} key={ind}>
              <span className="PeriodHeading">Period {ind + 1}</span>
              <span className="BoxContent">
                {classes[ind] ? classes[ind].class : "none"}
              </span>
              <span className="BoxContent">
                {classes[ind] ? classes[ind].teacher : "none"}
              </span>
            </div>
          );
        })
      )}
    </div>
  );
};

export default ChangeClasses;
