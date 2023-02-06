import React from "react";

const Filter2 = ({ onSelect }) => {
  return (
    <select onChange={(e) => onSelect(e.target.value)} default="default">
      <option value="default">Filter by area:</option>
      <option>Smaller than Lithuania</option>
    </select>
  );
};

export default Filter2;
