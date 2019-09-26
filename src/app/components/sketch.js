import p5Svg from "p5.js-svg";

// Make a number to simulate a 5-digit Norad Sat ID
const randomFiveDigit = Math.floor(Math.random() * 50000) + 10000;
// Extract digits from NORAD ID to enable variation in shapes
const lastDigit = Number(String(randomFiveDigit).charAt(4));
const secondToLastDigit = Number(String(randomFiveDigit).charAt(3));

// Declare shape-related variables
const canvasSize = 48;
const pallette = [
  "#FC7756", // salmon
  "#004F85", // blue
  "#090914", //dark blue
  "white"
];

export default function sketch(p) {
  let canvas;

  p.setup = () => {
    canvas = p.createCanvas(canvasSize, canvasSize);
    p.noStroke();
    p.noLoop();
    //p.rectMode(CENTER);

    p.background("#FC7756");
  };

  p.draw = () => {
    //p.background(pallette[2]);

    if (randomFiveDigit < 20000) {
      p.fill("#FC7756");
    } else if (randomFiveDigit < 40000) {
      p.fill("#004F85");
    } else {
      p.fill("white");
    }
  };

  p.myCustomRedrawAccordingToNewPropsHandler = newProps => {
    if (canvas)
      //Make sure the canvas has been created
      p.fill(newProps.color);
  };
}
