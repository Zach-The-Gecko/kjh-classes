import React, { useContext, useEffect, useState } from "react";
import { Link, Navigate, useParams, useNavigate } from "react-router-dom";
import SearchClasses from "../../components/SearchClasses/SearchClasses";
import { UserContext } from "../../contexts/user.context";
import { changeClass, getUserClasses } from "../../utils/firebase";
import "./ChangePeriod.css";

const ChangePeriod = () => {
  const [periodClass, setPeriodClass] = useState(null);
  const navigate = useNavigate();

  const { currentUser } = useContext(UserContext);
  const { period } = useParams();

  const cardClickedHandler = async (period, periodNum) => {
    await changeClass(currentUser, periodClass, period, periodNum);
    navigate("/change-classes");
  };

  useEffect(() => {
    if (currentUser) {
      const getData = async () => {
        const data = await getUserClasses(currentUser.userDocRef, false);
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
    <div className="ChangePeriod Page">
      {!currentUser && (
        <Navigate to={`/sign-in?redirect=${window.location.pathname}`} />
      )}
      <div className="ChangePeriodHeading">
        <span>Period {period}</span>
      </div>
      <div className="ChangePeriodGoBack">
        <Link to="/change-classes">← Go Back</Link>
      </div>
      <div className="ChangePeriodBody">
        <span>
          {`To change period ${period}, try to find it in the box below. Once you have found it you may click on it to change your class. If you cannot find your class, then press the button below to make a new class`}
        </span>
      </div>
      <SearchClasses
        period={period}
        emptyMessage={`It looks like nobody has created any classes yet, be the first one to add a class by clicking the "Add Class" button Above`}
        cardClicked={cardClickedHandler}
      />
    </div>
  );
};

export default ChangePeriod;
