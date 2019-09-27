import React from "react";
import P5Wrapper from "react-p5-wrapper";
import sketch from "../components/sketch";

export default function ObjectBadge({ noradNumber, width }) {
  return (
    <P5Wrapper
      sketch={sketch}
      noradNumber={noradNumber}
      width={width}
    ></P5Wrapper>
  );
}
