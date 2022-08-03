import React, { useEffect, useState } from "react";
import "./SearchClasses.css";
import searchIcon from "../../assets/search.svg";
import { getPeriodClasses } from "../../utils/firebase";
import ClassCard from "../ClassCard/ClassCard";

const SearchClasses = ({ period }) => {
  const [periodClasses, setPeriodClasses] = useState([]);
  const [searchInput, setSearchInput] = useState("");

  const inputBarChangeHandler = (e) => {
    setSearchInput(e.target.value);
  };

  useEffect(() => {
    const getData = async () => {
      const res = await getPeriodClasses(period);
      setPeriodClasses(res);
    };
    getData();
  }, [period]);

  return (
    <div className="SearchClasses">
      <div className="SearchClassesSearch">
        <div className="SearchIconContainer">
          <img className="SearchIcon" src={searchIcon} alt="" />
        </div>

        <input
          type="text"
          className="SearchClassesSearchBar"
          onChange={inputBarChangeHandler}
          value={searchInput}
        />
        {periodClasses.length ? (
          periodClasses.map((periodClass, ind) => {
            const stringToFilter = Object.values(periodClass).reduce(
              (acc, currentVal) => {
                return acc + currentVal.replace(/\s/g, "");
              },
              ""
            );
            console.log(stringToFilter);
            if (stringToFilter.includes(searchInput)) {
              return (
                <ClassCard
                  period={periodClass}
                  periodNum={period - 1}
                  key={ind}
                />
              );
            } else {
              return "";
            }
          })
        ) : (
          <span>No Classes</span>
        )}
      </div>
    </div>
  );
};

export default SearchClasses;
