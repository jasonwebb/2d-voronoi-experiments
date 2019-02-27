import {Delaunay} from "d3-delaunay";

const sketch = function (p5) {
  /*
    Setup
    =====
  */
  p5.setup = function () {
    p5.createCanvas(window.innerWidth, window.innerHeight);

    let spoints = [];

    for(let i = 0; i<100; i++) {
      spoints.push([
        p5.random(window.innerWidth),
        p5.random(window.innerHeight)
      ]);
    }

    const d = Delaunay.from(spoints);
    const v = d.voronoi([0, 0, window.innerWidth, window.innerHeight]);

    const {points, halfedges, triangles} = d;
    
    for (let i = 0, n = halfedges.length; i < n; ++i) {
      const j = halfedges[i];
      if (j < i) continue;
      const ti = triangles[i];
      const tj = triangles[j];
      p5.line(points[ti * 2], points[ti * 2 + 1], points[tj * 2], points[tj * 2 + 1]);
    }
  }
  
  /*
    Draw
    ====
  */
  p5.draw = function () {
  }


  /*
    Key released handler
    ====================
  */
  p5.keyReleased = function () {
  }
}

// Launch the sketch using p5js in instantiated mode
new p5(sketch);