import React, { Fragment } from "react";
import P5Wrapper from "react-p5-wrapper";
import sketch from "../components/sketch";

export default function ObjectBadge({ noradNumber }) {
  return (
    <Fragment>
      <P5Wrapper sketch={sketch} noradNumber={noradNumber}></P5Wrapper>
    </Fragment>
  );
}
