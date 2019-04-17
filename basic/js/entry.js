import {Delaunay} from "d3-delaunay";
import {toPath} from 'svg-points';
import {saveAs} from 'file-saver';

let showPoints = false,
  invertColors = false,
  points;

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
    }
  }


  /*
    Custom functions
    ================
  */

  function generatePoints() {
    points = [];
    for(let i=0; i<100; i++) {
      points.push([
        p5.random(window.innerWidth),
        p5.random(window.innerHeight)
      ])
    }
  }

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

  // Draw the points
  function drawPoints() {
    if (showPoints) {
      p5.noStroke();

      if (invertColors) {
        p5.fill(50);
      } else {
        p5.fill(200);
      }

      for (let point of points) {
        p5.ellipse(point[0], point[1], 5);
      }
    }
  }

  function exportSVG() {
    // Set up <svg> element
    let svg = document.createElement('svg');
    svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
    svg.setAttribute('xmlns:xlink', 'http://www.w3.org/1999/xlink');
    svg.setAttribute('width', window.innerWidth);
    svg.setAttribute('height', window.innerHeight);
    svg.setAttribute('viewBox', '0 0 ' + window.innerWidth + ' ' + window.innerHeight);

    let polygons = getVoronoiPolygons();

    for(let polygon of polygons) {
      svg.appendChild( createPathElFromPoints(polygon) );
    }

    // Force download of .svg file based on https://jsfiddle.net/ch77e7yh/1
    let svgDocType = document.implementation.createDocumentType('svg', "-//W3C//DTD SVG 1.1//EN", "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd");
    let svgDoc = document.implementation.createDocument('http://www.w3.org/2000/svg', 'svg', svgDocType);
    svgDoc.replaceChild(svg, svgDoc.documentElement);
    let svgData = (new XMLSerializer()).serializeToString(svgDoc);

    let blob = new Blob([svgData.replace(/></g, '>\n\r<')]);
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

    let pathEl = document.createElement('path');
    pathEl.setAttribute('d', d);
    pathEl.setAttribute('style', 'fill: none; stroke: black; stroke-width: 1');

    return pathEl;
  }
}

// Launch the sketch using p5js in instantiated mode
new p5(sketch);