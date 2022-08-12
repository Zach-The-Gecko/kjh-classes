import React, { useContext, useState } from "react";
import { UserContext } from "../../contexts/user.context";
import { Link, Navigate } from "react-router-dom";
import "./ChangeClasses.css";
import {
  changeClass,
  getUserClasses,
  isClassReal,
  submitClassToFB,
} from "../../utils/firebase";
import { useEffect } from "react";
import ClassCard from "../../components/ClassCard/ClassCard";
import CopyClassesModal from "../../components/CopyClassesModal/CopyClassesModal";

const ChangeClasses = () => {
  const { currentUser } = useContext(UserContext);
  const [modalOpen, setModalOpen] = useState(false);
  const [classes, setClasses] = useState([]);

  const submitClasses = (data) => {
    const classesArray = [];
    data.split("\t").reduce((acc, theClass) => {
      const splitClass = theClass.split("\n");
      if (!isNaN(splitClass[1]) || !isNaN(splitClass[2])) {
        if (!isNaN(splitClass[1])) {
          return splitClass[1];
        } else {
          return splitClass[2];
        }
      } else {
        const updatedClass = splitClass;
        updatedClass[0] = acc;
        classesArray.push(updatedClass);
        return acc;
      }
    }, []);
    console.log("submit");
    classesArray.map(async (classData) => {
      const classRealValue = await isClassReal(classData);
      console.log(!(await isClassReal(classData)));
      if (!classRealValue) {
        const index = await submitClassToFB(
          classData[0],
          classData[2],
          classData[1]
        );
        await changeClass(
          currentUser,
          classes[classData[0] - 1],
          { class: classData[1], teacher: classData[2], index },
          classData[0]
        );
      } else {
        changeClass(
          currentUser,
          classes[classData[0] - 1],
          { class: classData[1], teacher: classData[2], classRealValue },
          classData[0]
        );
      }
    });
  };

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
        <span
          className="ButtonChangeClassHeading"
          onClick={() => setModalOpen(!modalOpen)}
        >
          Copy Classes
        </span>
        <CopyClassesModal
          submitNewClasses={submitClasses}
          isModalOpen={modalOpen}
        />
      </div>
      {!currentUser ? (
        <Navigate to={`/sign-in?redirect=${window.location.pathname}`} />
      ) : (
        [...Array(11)].map((_item, ind) => {
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

// const index = await submitClassToFB(period, teacherToAdd, classToAdd);
// await changeClass(
//   currentUser,
//   periodClass,
//   {
//     teacher: teacherToAdd,
//     class: classToAdd,
//     index: index,
//   },
//   period
// );
