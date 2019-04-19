import { toPath } from 'svg-points';
import { saveAs } from 'file-saver';

export function exportSVG(polygons) {
  // Set up <svg> element
  let svg = document.createElement('svg');
  svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
  svg.setAttribute('xmlns:xlink', 'http://www.w3.org/1999/xlink');
  svg.setAttribute('width', window.innerWidth);
  svg.setAttribute('height', window.innerHeight);
  svg.setAttribute('viewBox', '0 0 ' + window.innerWidth + ' ' + window.innerHeight);

  // Create a <path> element for each polygon
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


export function createPathElFromPoints(points) {
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