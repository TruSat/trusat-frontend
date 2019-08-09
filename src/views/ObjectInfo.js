import React from "react";

export default function ObjectInfo(props) {
  return <div>This is an Object page for {props.match.params.number}</div>;
}
