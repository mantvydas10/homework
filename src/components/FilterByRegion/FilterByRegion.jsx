import React from "react";
import "./FilterByRegion.css";

const FilterByRegion = ({ onSelect }) => {
  return (
    <select onChange={(e) => onSelect(e.target.value)} default="default">
      <option value="default" className="option">
        Filter by region:
      </option>
      <option className="option" value="oceania">
        Oceania
      </option>
    </select>
  );
};

export default FilterByRegion;
