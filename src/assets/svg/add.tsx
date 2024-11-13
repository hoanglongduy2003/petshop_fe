import React from "react";

type Props = {};

const AddIcon = (props: Props) => {
  return (
      <svg
        width="10"
        height="10"
        viewBox="0 0 10 10"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <line y1="5" x2="10" y2="5" stroke="black" strokeWidth="2" />
        <line x1="5" x2="5" y2="10" stroke="black" strokeWidth="2" />
      </svg>
  );
};

export default AddIcon;
