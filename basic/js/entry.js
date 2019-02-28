import { Delaunay } from "d3-delaunay";

let showPoints = false,
  invertColors = false;

const EVEN = 0,
  ODD = 1,
  ALTERNATING = 2,
  ANY = 3;
let ROW_TYPE = ALTERNATING;

let currentRowType = EVEN;

const sketch = function (p5) {
  /*
    Setup
    =====
  */
  p5.setup = function () {
    p5.createCanvas(window.innerWidth, window.innerHeight);
    generateNewShape();
  }

  /*
    Draw
    ====
  */
  p5.draw = function () {}


  /*
    Key released handler
    ====================
  */
  p5.keyReleased = function () {
    switch(p5.key) {
      case ' ':
        generateNewShape();
        break;

      case 'p':
        showPoints = !showPoints;
        generateNewShape();
        break;

      case 'i':
        invertColors = !invertColors;
        generateNewShape();
        break;

      case '1':
        ROW_TYPE = EVEN;
        generateNewShape();
        break;

      case '2':
        ROW_TYPE = ODD;
        generateNewShape();
        break;
      
      case '3':
        ROW_TYPE = ALTERNATING;
        generateNewShape();
        break;

      case '4':
        ROW_TYPE = ANY;
        generateNewShape();
        break;
    }
  }


  /*
    Custom functions
    ================
  */
  // Draw the Voronoi diagram for a set of points
  function drawVoronoi(points) {
    const delaunay = Delaunay.from(points);
    const voronoi = delaunay.voronoi([0, 0, window.innerWidth, window.innerHeight]);

    for(const polygon of voronoi.cellPolygons()) {
      p5.beginShape();

      for(const vertex of polygon) {
        p5.vertex(vertex[0], vertex[1]);
      }

      p5.endShape();
    }
  }

  // Create an array of points (coordinate pairs)
  function createPointsRing(centerX, centerY, radius, numPoints) {
    let points = [];

    for(let i = 0; i < numPoints; i++) {
      points.push([
        centerX + radius * Math.cos(p5.radians((360 / numPoints) * i)),
        centerY + radius * Math.sin(p5.radians((360 / numPoints) * i))
      ]);
    }

    return points;
  }
  
  function generateNewShape() {
    let points = [];
    let lastRadius = p5.random(10,30);

    // Generate set of points for Voronoi diagram
    for(let i = 0; i < parseInt(p5.random(5,20)); i++) {
      let numPoints, range = [];

      // Rings near the center look better with fewer points
      if(i < 3) {
        range[0] = 3;
        range[1] = 10;
      } else {
        range[0] = 20;
        range[1] = 50;
      }

      // Generate a random number of points based on selected "row type"
      switch(ROW_TYPE) {
        case EVEN:
          numPoints = getRandomEvenNumber(range[0], range[1]);
          break;

        case ODD:
          numPoints = getRandomOddNumber(range[0], range[1]);
          break;

        case ALTERNATING:
          switch(currentRowType) {
            case EVEN:
              numPoints = getRandomEvenNumber(range[0], range[1]);
              currentRowType = ODD;
              break;

            case ODD:
              numPoints = getRandomOddNumber(range[0], range[1]);
              currentRowType = EVEN;
              break;
          }

          break;

        case ANY:
          numPoints = parseInt(p5.random(range[0], range[1]));
          break;
      }

      // Generate points arranged in a ring
      let newPoints = createPointsRing(window.innerWidth/2, window.innerHeight/2, lastRadius, numPoints);
      points = points.concat(newPoints);
      
      // Ensure next radius is larger than previous radius
      lastRadius += p5.random(20,80);
    }

    // Draw the Voronoi diagram
    if(invertColors) {
      p5.background(0);
      p5.stroke(255);
    } else {
      p5.background(255);
      p5.stroke(0);
    }

    p5.noFill();
    drawVoronoi(points);

    // Draw the points
    if(showPoints) {
      p5.noStroke();

      if(invertColors) {
        p5.fill(50);
      } else {
        p5.fill(200);
      }
  
      for(let point of points) {
        p5.ellipse(point[0], point[1], 5);
      }
    }
  }

  function getRandomEvenNumber(min, max) {
    let num = parseInt(p5.random(min, max));
    
    if(num % 2 > 0) {
      if(num - 1 < min) {
        num++;
      } else {
        num--;
      }
    }

    return num;
  }

  function getRandomOddNumber(min, max) {
    let num = parseInt(p5.random(min, max));
    
    if(num % 2 == 0) {
      if(num - 1 < min) {
        num++;
      } else {
        num--;
      }
    }

    return num;
  }
}

// Launch the sketch using p5js in instantiated mode
new p5(sketch);