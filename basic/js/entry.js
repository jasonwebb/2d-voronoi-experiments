import { Delaunay } from "d3-delaunay";

const sketch = function (p5) {
  /*
    Setup
    =====
  */
  p5.setup = function () {
    p5.createCanvas(window.innerWidth, window.innerHeight);

    let points = [];

    for (let i = 0; i < 100; i++) {
      points.push([
        p5.random(window.innerWidth),
        p5.random(window.innerHeight)
      ]);
    }

    drawVoronoi(points);
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
  p5.keyReleased = function () {}


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
}

// Launch the sketch using p5js in instantiated mode
new p5(sketch);