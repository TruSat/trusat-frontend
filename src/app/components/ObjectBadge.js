import React from "react";
import P5Wrapper from "react-p5-wrapper";
import SketchLarge from "../../assets/SketchLarge.js";
import SketchSmall from "../../assets/SketchSmall.js";
import SketchExtraSmall from "../../assets/SketchExtraSmall.js";

export default function ObjectBadge({ noradNumber, size, addStyles }) {
  return (
    // pass in small of large for width, see catalogTable and /object view to see difference
    <div className={`${addStyles}`}>
      <P5Wrapper
        sketch={
          size === "small"
            ? SketchSmall
            : size === "extra-small"
            ? SketchExtraSmall
            : size === "large"
            ? SketchLarge
            : null
        }
        noradNumber={noradNumber}
      ></P5Wrapper>
    </div>
  );
}
