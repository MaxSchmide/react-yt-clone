/* eslint-disable no-unused-expressions */
import React, { useState } from "react";
import "./_categoriesBar.scss";
import { useDispatch, useSelector } from "react-redux";
import { getPopularVideos, getVideosByCategory } from "../../utils";
const keywords = [
  "All",
  "React",
  "Redux",
  "React.JS",
  "Movies",
  "Music",
  "Games",
  "Volleyball",
  "Sport",
  "Football",
  "Live stream",
  "Nature",
  "Anime",
  "Moto",
  "Formula 1",
];
const CategoriesBar = () => {
  const dispatch = useDispatch();
  const { nextPageToken } = useSelector((state) => state.homeVideos);
  const [activeElement, setActiveElement] = useState("All");

  const handleActiveElement = (value) => {
    setActiveElement(value);
    if (value === "All") {
      dispatch(getPopularVideos(nextPageToken));
    } else {
      dispatch(getVideosByCategory(value, nextPageToken));
    }
  };

  return (
    <div className={`categoriesBar `}>
      {keywords.map((item, index) => (
        <span
          className={activeElement === item ? "active" : ""}
          onClick={() => handleActiveElement(item)}
          key={index}
        >
          {item}
        </span>
      ))}
    </div>
  );
};

export default CategoriesBar;
