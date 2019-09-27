export default function sketch(p) {
  let noradNumber = 12345;
  // Extract digits from NORAD ID to enable variation in shapes
  const lastDigit = Number(String(noradNumber).charAt(4));
  const secondToLastDigit = Number(String(noradNumber).charAt(3));

  // Declare shape-related variables
  const canvasSize = 48;
  const pallette = [
    "#FC7756", // salmon
    "#004F85", // blue
    "#090914", //dark blue
    "white"
  ];

  // Polygon drawers
  function drawCircle(sizeFactor = 1) {
    p.ellipse(
      canvasSize / 2,
      canvasSize / 2,
      canvasSize * sizeFactor,
      canvasSize * sizeFactor
    );
  }

  function drawDiamond(sizeFactor = 1) {
    drawPolygon(
      canvasSize / 2,
      canvasSize / 2,
      (canvasSize / 2) * sizeFactor,
      4
    );
  }

  function drawHexagon(sizeFactor = 1) {
    drawPolygon(
      canvasSize / 2,
      canvasSize / 2,
      (canvasSize / 2) * sizeFactor,
      6
    );
  }

  function drawPolygon(x, y, radius, npoints) {
    let angle = p.TWO_PI / npoints;
    p.beginShape();
    for (let a = 0; a < p.TWO_PI; a += angle) {
      let sx = x + p.cos(a) * radius;
      let sy = y + p.sin(a) * radius;
      p.vertex(sx, sy);
    }
    p.endShape(p.CLOSE);
  }

  // Configure processing drawing
  p.setup = () => {
    p.createCanvas(canvasSize, canvasSize, p.SVG);
    p.noLoop();
    p.rectMode(p.CENTER);
    p.noStroke();

    // Temporary background. Remove this in real app.
    p.background(pallette[2]);
  };

  p.myCustomRedrawAccordingToNewPropsHandler = function(props) {
    if (props.noradNumber) {
      noradNumber = props.noradNumber;
    }
  };

  p.draw = () => {
    // Color first shape (based on Sat's age using Sat ID number range)
    if (noradNumber < 20000) {
      p.fill(pallette[0]);
    } else if (noradNumber < 40000) {
      p.fill(pallette[1]);
    } else {
      p.fill(pallette[3]);
    }

    // Draw first shape (hexagon only)
    drawHexagon();

    // Draw first shape (based arbitrarily on last digit in Sat ID)
    if (lastDigit <= 3) {
      drawHexagon();
    } else if (lastDigit <= 6) {
      drawDiamond();
    } else {
      drawCircle();
    }

    // Color second shape (based on Sat's age using Sat ID number range)
    if (noradNumber < 20000) {
      p.fill(pallette[1]);
    } else if (noradNumber < 40000) {
      p.fill(pallette[0]);
    } else {
      p.fill(pallette[2]);
    }

    // Draw second shape (based arbitrarily on second-to-last digit in Sat ID)
    if (secondToLastDigit <= 3) {
      drawHexagon(0.8);
    } else if (secondToLastDigit <= 6) {
      drawDiamond(0.8);
    } else {
      drawCircle(0.7);
    }

    // Draw number text
    p.textAlign(p.CENTER);
    p.textSize(10);
    p.fill(pallette[3]);
    p.text(noradNumber, canvasSize / 2, canvasSize / 2 + 3);
  };
}

/* ----------
MIKES CODE
---------- */
// // Make a number to simulate a 5-digit Norad Sat ID
// const randomFiveDigit = Math.floor(Math.random() * 50000) + 10000;

// // Extract digits from NORAD ID to enable variation in shapes
// const lastDigit = Number(String(randomFiveDigit).charAt(4));
// const secondToLastDigit = Number(String(randomFiveDigit).charAt(3));

// // Declare shape-related variables
// const canvasSize = 48;
// const pallette = [
//   "#FC7756", // salmon
//   "#004F85", // blue
//   "#090914", //dark blue
//   "white"
// ];

// // Configure processing drawing
// function setup() {
//   createCanvas(canvasSize, canvasSize, SVG);
//   noLoop();
//   rectMode(CENTER);
//   noStroke();

//   // Temporary background. Remove this in real app.
//   background(pallette[2]);
// }

// function draw() {
//   // Color first shape (based on Sat's age using Sat ID number range)
//   if (randomFiveDigit < 20000) {
//     fill(pallette[0]);
//   } else if (randomFiveDigit < 40000) {
//     fill(pallette[1]);
//   } else {
//     fill(pallette[3]);
//   }

//   // Draw first shape (hexagon only)
//   drawHexagon();

//   // // Draw first shape (based arbitrarily on last digit in Sat ID)
//   // if (lastDigit <= 3) {
//   // 	drawHexagon()
//   // } else if (lastDigit <= 6) {
//   // 	drawDiamond()
//   // } else {
//   // 	drawCircle()
//   // }

//   // Color second shape (based on Sat's age using Sat ID number range)
//   if (randomFiveDigit < 20000) {
//     fill(pallette[1]);
//   } else if (randomFiveDigit < 40000) {
//     fill(pallette[0]);
//   } else {
//     fill(pallette[2]);
//   }

//   // Draw second shape (based arbitrarily on second-to-last digit in Sat ID)
//   if (secondToLastDigit <= 3) {
//     drawHexagon(0.8);
//   } else if (secondToLastDigit <= 6) {
//     drawDiamond(0.8);
//   } else {
//     drawCircle(0.7);
//   }

//   // Draw number text
//   textAlign(CENTER);
//   textSize(10);
//   fill(pallette[3]);
//   text(randomFiveDigit, canvasSize / 2, canvasSize / 2 + 3);
// }

// // Polygon drawers
// function drawCircle(sizeFactor = 1) {
//   ellipse(
//     canvasSize / 2,
//     canvasSize / 2,
//     canvasSize * sizeFactor,
//     canvasSize * sizeFactor
//   );
// }

// function drawDiamond(sizeFactor = 1) {
//   drawPolygon(canvasSize / 2, canvasSize / 2, (canvasSize / 2) * sizeFactor, 4);
// }

// function drawHexagon(sizeFactor = 1) {
//   drawPolygon(canvasSize / 2, canvasSize / 2, (canvasSize / 2) * sizeFactor, 6);
// }

// function drawPolygon(x, y, radius, npoints) {
//   let angle = TWO_PI / npoints;
//   beginShape();
//   for (let a = 0; a < TWO_PI; a += angle) {
//     let sx = x + cos(a) * radius;
//     let sy = y + sin(a) * radius;
//     vertex(sx, sy);
//   }
//   endShape(CLOSE);
// }

/* ----------
ROTATING CUBE
---------- */

// let rotation = 0;

// p.setup = function() {
//   p.createCanvas(200, 200, p.WEBGL);
// };

// p.myCustomRedrawAccordingToNewPropsHandler = function(props) {
//   if (props.rotation) {
//     rotation = (props.rotation * Math.PI) / 180;
//   }
// };

// p.draw = function() {
//   p.background(100);
//   p.normalMaterial();
//   p.noStroke();
//   p.push();
//   p.rotateY(rotation);
//   p.box(100);
//   p.pop();
// };
