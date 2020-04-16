import React from "react";
import P5Wrapper from "react-p5-wrapper";
import SketchTrusatGlobe from "../../assets/SketchTrusatGlobe";

export default function TrusatGlobeCanvas() {
  return (
    <div id="globe-canvas-container">
      <P5Wrapper sketch={SketchTrusatGlobe}></P5Wrapper>
    </div>
  );
}
