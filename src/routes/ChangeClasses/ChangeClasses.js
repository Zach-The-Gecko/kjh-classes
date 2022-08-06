import React, { useContext, useState } from "react";
import { UserContext } from "../../contexts/user.context";
import { Link, Navigate } from "react-router-dom";
import "./ChangeClasses.css";
import { getUserClasses } from "../../utils/firebase";
import { useEffect } from "react";
import ClassCard from "../../components/ClassCard/ClassCard";

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
    <div className="ChangeClasses Page">
      <div className="ChangeClassHeading">
        <span>
          Click on a class to change its subject, or copy and paste your classes
          from MyDSD by pressing the button below.
        </span>
        <span className="ButtonChangeClassHeading">Copy Classes</span>
      </div>
      {!currentUser ? (
        <Navigate to={`/sign-in?redirect=${window.location.pathname}`} />
      ) : (
        [...Array(10)].map((_item, ind) => {
          return (
            <Link to={`/change-period/${ind + 1}`} key={ind}>
              <ClassCard period={classes[ind]} periodNum={ind} />
            </Link>
          );
        })
      )}
    </div>
  );
};

export default ChangeClasses;
