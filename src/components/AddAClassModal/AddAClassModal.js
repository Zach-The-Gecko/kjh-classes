import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AddAClassModal.css";

const AddAClassModal = ({ isModalOpen, submitNewClass }) => {
  const navigate = useNavigate();
  const [classToAdd, setClassToAdd] = useState("");
  const [teacherToAdd, setTeacherToAdd] = useState("");
  const teacherOnChangeHandler = (e) => {
    setTeacherToAdd(e.target.value);
  };
  const classOnChangeHandler = (e) => {
    setClassToAdd(e.target.value);
  };
  const submitClass = async () => {
    if (teacherToAdd && classToAdd) {
      await submitNewClass(teacherToAdd, classToAdd);
      navigate("/change-classes");
    }
  };
  return (
    <div className={`AddAClassModal isModalOpen-${isModalOpen}`}>
      <span className="InputLabel">Class:</span>
      <input
        onChange={classOnChangeHandler}
        value={classToAdd}
        type="text"
        placeholder="Class"
        className="AddAClassModalInput"
      />
      <span className="InputLabel">Teacher:</span>
      <input
        type="text"
        placeholder="Teacher"
        onChange={teacherOnChangeHandler}
        value={teacherToAdd}
        className="AddAClassModalInput"
      />
      <span className="Button" onClick={submitClass}>
        Add Class
      </span>
      <div className="AddAClassModalBody">
        <span>
          Before you add this class, make sure that you cannot find it in the
          box below!!
        </span>
      </div>
    </div>
  );
};

export default AddAClassModal;
