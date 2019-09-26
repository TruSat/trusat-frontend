import React, { useState, Fragment } from "react";
import P5Wrapper from "react-p5-wrapper";
import sketch from "../components/sketch";

export default function ObjectBadge() {
  const [rotation, setRotation] = useState("");

  const randomRotation = () => {
    setRotation(Math.floor(Math.random() * 100) + 1);
  };

  return (
    <Fragment>
      <button style={{ margin: "1em" }} onClick={() => randomRotation()}>
        <span className="app__black-button--small">Random Rotation</span>
      </button>
      <P5Wrapper sketch={sketch} rotation={rotation}></P5Wrapper>
    </Fragment>
  );
}
