import React, { useState } from "react";
import "./CopyClassesModal.css";

const CopyClassesModal = ({ isModalOpen, submitNewClasses }) => {
  const [classesToAdd, setClassesToAdd] = useState("");
  const classesOnChangeHandler = (e) => {
    setClassesToAdd(e.target.value);
  };
  const checkIfSubmitClasses = () => {
    if (classesToAdd) {
      submitNewClasses(classesToAdd);
    }
  };
  return (
    <div className={`isModalOpen-${isModalOpen}`}>
      <span className="InputLabel">Classes:</span>
      <textarea
        onChange={classesOnChangeHandler}
        value={classesToAdd}
        type="text"
        placeholder="Classes"
        className="CopyClassesModalInput"
      />
      <span className="Button" onClick={checkIfSubmitClasses}>
        Submit
      </span>
    </div>
  );
};

export default CopyClassesModal;
