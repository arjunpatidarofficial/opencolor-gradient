import React from "react";

const Radial = (props) => {
  const { primaryColor, secondaryColor } = props;

  return (
    <>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 210 210">
        <g id="a" />
        <g id="b">
          <g id="c">
            <circle
              stroke={primaryColor}
              fill="none"
              stroke-miterlimit="10"
              stroke-width="17px"
              class="e"
              cx="105"
              cy="105"
              r="96.5"
            />
            <circle
              stroke={secondaryColor}
              fill="none"
              stroke-miterlimit="10"
              stroke-width="17px"
              cx="105"
              cy="105"
              r="54.5"
            />
          </g>
        </g>
      </svg>
    </>
  );
};

export default Radial;
