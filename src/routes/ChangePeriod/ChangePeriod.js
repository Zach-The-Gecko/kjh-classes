import React, { useContext, useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import SearchClasses from "../../components/SearchClasses/SearchClasses";
import { UserContext } from "../../contexts/user.context";
import { getUserClasses } from "../../utils/firebase";
import "./ChangePeriod.css";

const ChangePeriod = () => {
  // eslint-disable-next-line
  const [periodClass, setPeriodClass] = useState(null);
  const { currentUser } = useContext(UserContext);
  const { period } = useParams();
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
      <SearchClasses period={period} />
    </div>
  );
};

export default ChangePeriod;
