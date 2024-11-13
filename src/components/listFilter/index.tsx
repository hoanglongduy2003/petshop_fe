import React, { FC } from "react";

type FilterCardProps = {
  name: string;
};

const FilterCard: FC<FilterCardProps> = ({ name }) => {
  return (
    <div className="home-listCate-item">
      <div className="bottom">
        <button>{name}</button>
      </div>
    </div>
  );
};

export default FilterCard;
