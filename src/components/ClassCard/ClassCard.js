import React from "react";
import "./ClassCard.css";

const ClassCard = ({ period, periodNum }) => {
  return (
    <div className={`PeriodBox Is${period}`}>
      <span className="PeriodHeading">Period {parseInt(periodNum) + 1}</span>
      <span className="BoxContent">{period ? period.class : "none"}</span>
      <span className="BoxContent">{period ? period.teacher : "none"}</span>
    </div>
  );
};

export default ClassCard;
