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

  // Configure processing drawing
  p.setup = () => {
    p.createCanvas(canvasSize, canvasSize, p.SVG);
    //p.noLoop();
    p.rectMode(p.CENTER);
    p.noStroke();

    // Temporary background. Remove this in real app.
    p.background(pallette[2]);
  };

  p.myCustomRedrawAccordingToNewPropsHandler = function(props) {
    if (noradNumber !== null) {
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
}
