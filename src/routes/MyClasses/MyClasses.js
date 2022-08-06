import React, { useContext } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import ClassCard from "../../components/ClassCard/ClassCard";

import { UserContext } from "../../contexts/user.context";
import { getUserClasses } from "../../utils/firebase";

import "./MyClasses.css";

const MyClasses = () => {
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
    <div className="MyClasses Page">
      {!currentUser && <Navigate to="/sign-in" />}
      {[...Array(10)].map((_item, ind) => {
        return (
          classes[ind] && (
            <Link to={`/my-class/${ind + 1}`} key={ind}>
              <ClassCard period={classes[ind]} periodNum={ind} />
            </Link>
          )
        );
      })}
    </div>
  );
};

export default MyClasses;
