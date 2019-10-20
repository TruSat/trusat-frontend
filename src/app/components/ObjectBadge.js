import React from "react";
import P5Wrapper from "react-p5-wrapper";
import SketchSmall from "../../assets/SketchSmall.js";
import SketchLarge from "../../assets/SketchLarge.js";

export default function ObjectBadge({ noradNumber, quality, size, addStyles }) {
  return (
    // pass in small of large for width, see catalogTable and /object view to see difference
    <div className={`${addStyles}`}>
      <P5Wrapper
        sketch={size === "small" ? SketchSmall : SketchLarge}
        noradNumber={noradNumber}
        // quality={quality}
      ></P5Wrapper>
    </div>
  );
}
