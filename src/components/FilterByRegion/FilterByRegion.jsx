import React from "react";

const FilterByRegion = ({ onSelect }) => {
  return (
    <select onChange={(e) => onSelect(e.target.value)} default="default">
      <option value="default">Filter by region:</option>
      <option value="oceania">Oceania</option>
    </select>
  );
};

export default FilterByRegion;
