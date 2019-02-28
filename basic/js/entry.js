import { Delaunay } from "d3-delaunay";

let showPoints = false,
  invertColors = false;

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
      let numPoints;
      if(i < 3) {
        numPoints = parseInt(p5.random(3,10));
      } else {
        numPoints = parseInt(p5.random(20,50));
      }

      let newPoints = createPointsRing(window.innerWidth/2, window.innerHeight/2, lastRadius, numPoints);
      points = points.concat(newPoints);
      
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
}

// Launch the sketch using p5js in instantiated mode
new p5(sketch);