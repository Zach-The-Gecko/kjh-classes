import React, { useContext, useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import SearchClasses from "../../components/SearchClasses/SearchClasses";
import { UserContext } from "../../contexts/user.context";
import { changeClass, getUserClasses } from "../../utils/firebase";
import "./ChangePeriod.css";

const ChangePeriod = () => {
  const [periodClass, setPeriodClass] = useState(null);
  const { currentUser } = useContext(UserContext);
  const { period } = useParams();

  const cardClickedHandler = (period, periodNum) => {
    changeClass(currentUser, periodClass, period, periodNum);
  };

  useEffect(() => {
    if (currentUser) {
      const getData = async () => {
        const data = await getUserClasses(currentUser.userDocRef);
        setPeriodClass(
          data[period - 1]
            ? data[period - 1]
            : { class: "none", teacher: "none" }
        );
      };
      getData();
    }
  }, [currentUser, period]);
  return (
    <div className="ChangePeriod">
      {!currentUser && <Navigate to="/sign-in" />}
      <div className="ChangePeriodHeading">
        <span>Period {period}</span>
      </div>
      <div className="ChangePeriodBody">
        <span>
          {`To change period ${period}, try to find it in the box below. Once you have found it you may click on it to change your class. If you cannot find your class, then press the button below to make a new class`}
        </span>
      </div>
      <SearchClasses period={period} cardClicked={cardClickedHandler} />
    </div>
  );
};

export default ChangePeriod;
