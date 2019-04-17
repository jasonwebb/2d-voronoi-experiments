import {Delaunay} from "d3-delaunay";
import Ring from "./Ring";

let showPoints = false,
  invertColors = false,
  useBlurEffect = false,
  isPaused = false,
  points,
  rings;

const EVEN = 0,
  ODD = 1,
  ALTERNATING = 2,
  ANY = 3;
let ROW_TYPE = EVEN;

let currentRowType = EVEN;

const sketch = function (p5) {
  /*
    Setup
    =====
  */
  p5.setup = function () {
    p5.createCanvas(window.innerWidth, window.innerHeight);
    generatePoints();
  }

  /*
    Draw
    ====
  */
  p5.draw = function () {
    // Move all the rings
    if(!isPaused) {
      for(let ring of rings) {
        ring.iterate();
      }

      // Get the latest points
      points = getPoints();
  
      drawVoronoi();
      drawPoints();
    }
  }


  /*
    Custom functions
    ================
  */
 
  // Build an array of polygons (arrays of [x,y] pairs) extracted from Voronoi package
  function getVoronoiAsPolygons(points) {
    const delaunay = Delaunay.from(points);
    const voronoi = delaunay.voronoi([0, 0, window.innerWidth, window.innerHeight]);
    const simplifiedPolygons = [];

    for(let cell of voronoi.cellPolygons()) {
      let polygon = [];

      for(let vertex of cell) {
        polygon.push([vertex[0], vertex[1]]);
      }

      simplifiedPolygons.push(polygon);
    }

    return simplifiedPolygons;
  }


  // Draw the Voronoi diagram for a set of points
  function drawVoronoi() {
    // Set colors
    if (invertColors) {
      if(useBlurEffect) {
        p5.background(0, 20);
      } else {
        p5.background(0);
      }

      p5.stroke(255);
    } else {
      if(useBlurEffect) {
        p5.background(255, 25);
      } else {
        p5.background(255);
      }
      
      p5.stroke(0);
    }

    p5.noFill();

    // Extract polygons from Voronoi diagram
    const polygons = getVoronoiAsPolygons(points);

    // Draw raw polygons
    for (const polygon of polygons) {
      p5.beginShape();

      for (const vertex of polygon) {
        p5.vertex(vertex[0], vertex[1]);
      }

      p5.endShape();
    }
  }
  
  // Draw dots for each of the points
  function drawPoints() {
    if (showPoints) {
      // Set colors
      p5.noStroke();

      if (invertColors) {
        p5.fill(100);
      } else {
        p5.fill(200);
      }

      // Draw the points
      for (let point of points) {
        p5.ellipse(point[0], point[1], 5);
      }
    }
  }
  
  function generatePoints() {
    points = [], rings = [];
    let numRings = parseInt(p5.random(3,10));
    // let numRings = 3;
    const maxRadius = (window.innerWidth > window.innerHeight) ? window.innerHeight/2 - 10 : window.innerWidth/2 - 10;
    const minRadius = p5.random(10, 30);
    // let currentRadius = maxRadius;
    let currentRadius = 300;
    const radiusStep = (maxRadius - minRadius) / numRings;

    // Generate set of points for Voronoi diagram
    for (let i = 0; i < numRings; i++) {
      let numPoints, range = [], ring;

      if(i != 1) {
        // Rings near the center look better with fewer points
        if (i > 3) {
          range[0] = 5;
          range[1] = 10;
        } else {
          range[0] = 20;
          range[1] = 100;
        }

        // TODO: make range proportional to i. 

        // Generate a random number of points based on selected "row type"
        switch (ROW_TYPE) {
          case EVEN:
            numPoints = getRandomEvenNumber(range[0], range[1]);
            break;

          case ODD:
            numPoints = getRandomOddNumber(range[0], range[1]);
            break;

          case ALTERNATING:
            switch (currentRowType) {
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

        ring = new Ring(numPoints, currentRadius);

  
      // Add sub-rings to the outermost main ring
      } else {
        numPoints = parseInt(p5.random(5,12));

        ring = new Ring(numPoints, currentRadius);

        let subringPoints = parseInt(p5.random(9,50));
        let subringRadius = parseInt(p5.random(20,150));
        let subringRadiusOffsetScaler = Math.random() * (10 - -10) + -10;

        for(let point of ring.points) {
          let subring = new Ring(subringPoints, subringRadius, point[0], point[1]);
          subring.velocity = .01;
          subring.radiusOffsetScaler = subringRadiusOffsetScaler / 5;
          subring.animationMode = 'radius';

          ring.subrings.push(subring);
        }
      }

      rings.push(ring);
      currentRadius -= radiusStep + p5.random(-radiusStep/2, radiusStep);
    }

    points = getPoints();
  }

  function getPoints() {
    let pts = [];

    // Extract all points from all rings and sub-rings 
    for(let ring of rings) {
      for(let point of ring.points) {
        pts.push(point);
      }

      for(let subring of ring.subrings) {
        for(let point of subring.points) {
          pts.push(point);
        }
      }
    }

    return pts;
  }

  function getRandomEvenNumber(min, max) {
    let num = parseInt(p5.random(min, max));

    if (num % 2 > 0) {
      if (num - 1 < min) {
        num++;
      } else {
        num--;
      }
    }

    return num;
  }

  function getRandomOddNumber(min, max) {
    let num = parseInt(p5.random(min, max));

    if (num % 2 == 0) {
      if (num - 1 < min) {
        num++;
      } else {
        num--;
      }
    }

    return num;
  }
  

  /*
    Key released handler
    ====================
  */
  p5.keyReleased = function () {
    switch (p5.key) {
      case 'r':
        generatePoints();
        break;

      case 'p':
        showPoints = !showPoints;
        break;

      case 'i':
        invertColors = !invertColors;
        break;

      case 'b':
        useBlurEffect = !useBlurEffect;
        break;

      case ' ':
        isPaused = !isPaused;
        break;

      case '1':
        ROW_TYPE = EVEN;
        generatePoints();
        break;

      case '2':
        ROW_TYPE = ODD;
        generatePoints();
        break;

      case '3':
        ROW_TYPE = ALTERNATING;
        generatePoints();
        break;

      case '4':
        ROW_TYPE = ANY;
        generatePoints();
        break;
    }
  }
}

// Launch the sketch using p5js in instantiated mode
new p5(sketch);