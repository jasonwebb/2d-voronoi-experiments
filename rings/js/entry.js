import {Delaunay} from "d3-delaunay";
import {toPath} from 'svg-points';
import {saveAs} from 'file-saver';

let showPoints = false,
  invertColors = false,
  points;

// Number of points per ring/row
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
    p5.background(0);
    generatePoints();
  }


  /*
    Draw
    ====
  */
  p5.draw = function () {
    drawVoronoi();
    drawPoints();
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

      case 'e':
        exportSVG();
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


  /*
    Custom functions
    ================
  */

  // Draw the Voronoi diagram for a set of points
  function drawVoronoi() {
    if (invertColors) {
      p5.background(0);
      p5.stroke(255);
    } else {
      p5.background(255);
      p5.stroke(0);
    }

    p5.noFill();

    const polygons = getVoronoiPolygons();

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
      p5.noStroke();

      if (invertColors) {
        p5.fill(100);
      } else {
        p5.fill(200);
      }

      for (let point of points) {
        p5.ellipse(point[0], point[1], 5);
      }
    }
  }

  // Get an array of polygons (arrays of [x,y] pairs) using Voronoi
  function getVoronoiPolygons() {
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

  function generatePoints() {
    points = [];
    let numRings = parseInt(p5.random(5, 20));
    const maxRadius = (window.innerWidth > window.innerHeight) ? window.innerHeight/2 - 10 : window.innerWidth/2 - 10;
    const minRadius = p5.random(10, 30);
    let currentRadius = maxRadius;
    const radiusStep = (maxRadius - minRadius) / numRings;

    // Generate set of points for Voronoi diagram
    for (let i = 0; i < numRings; i++) {
      let numPoints, range = [];

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

      // Generate 2D array of evenly-spaced points ([x,y]) in a circle
      for(let j = 0; j < numPoints; j++) {
        points.push([
          window.innerWidth/2 + currentRadius * Math.cos(p5.radians((360 / numPoints) * j)),
          window.innerHeight/2 + currentRadius * Math.sin(p5.radians((360 / numPoints) * j))
        ]);
      }

      // Decrease radius for next ring
      currentRadius -= radiusStep + p5.random(-radiusStep/2, radiusStep);
    }
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

  // Export an SVG file of the current geometry
  function exportSVG() {
    // Set up <svg> element
    let svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttributeNS('http://www.w3.org/2000/xmlns/', 'xmlns', 'http://www.w3.org/2000/svg');
    svg.setAttributeNS('http://www.w3.org/2000/xmlns/', 'xmlns:xlink', 'http://www.w3.org/1999/xlink');
    svg.setAttribute('width', window.innerWidth);
    svg.setAttribute('height', window.innerHeight);
    svg.setAttribute('viewBox', '0 0 ' + window.innerWidth + ' ' + window.innerHeight);

    let polygons = getVoronoiPolygons();

    for(let polygon of polygons) {
      svg.appendChild( createPathElFromPoints(polygon) );
    }

    // Generate the document as a Blob and force a download as a timestamped .svg file
    const svgDoctype = '<?xml version="1.0" encoding="UTF-8" standalone="no"?>';
    const serializedSvg = (new XMLSerializer()).serializeToString(svg);
    const blob = new Blob([svgDoctype, serializedSvg], { type: 'image/svg+xml;' })
    saveAs(blob, 'voronoi-' + Date.now() + '.svg');
  }

  function createPathElFromPoints(points) {
    let pointsString = '';

    for(let [index, point] of points.entries()) {
      pointsString += point[0] + ',' + point[1];

      if(index < points.length - 1) {
        pointsString += ' ';
      }
    }

    let d = toPath({
      type: 'polyline',
      points: pointsString
    });

    let pathEl = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    pathEl.setAttribute('d', d);
    pathEl.setAttribute('style', 'fill: none; stroke: black; stroke-width: 1');

    return pathEl;
  }
}

// Launch the sketch using p5js in instantiated mode
new p5(sketch);