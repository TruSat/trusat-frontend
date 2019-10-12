import React from "react";
import P5Wrapper from "react-p5-wrapper";
import sketch from "../../assets/sketch.js";

export default function ObjectBadge({ noradNumber, width, quality }) {
  return (
    <div className="catalog-table__object-data-wrapper__badgeWrapper">
      <P5Wrapper
        sketch={sketch}
        noradNumber={noradNumber}
        width={width}
        quality={quality}
      ></P5Wrapper>
    </div>
  );
}
