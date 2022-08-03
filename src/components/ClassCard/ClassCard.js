import React from "react";
import "./ClassCard.css";

const ClassCard = ({ period, periodNum, onClick }) => {
  return (
    <div className={`PeriodBox Is${period}`} onClick={onClick}>
      <span className="PeriodHeading">Period {parseInt(periodNum) + 1}</span>
      <span className="BoxContent">{period ? period.class : "none"}</span>
      <span className="BoxContent">{period ? period.teacher : "none"}</span>
    </div>
  );
};

export default ClassCard;
