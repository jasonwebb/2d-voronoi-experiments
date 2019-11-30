import { toPath } from 'svg-points';
import { saveAs } from 'file-saver';

export function exportSVG(polygons) {
  // Set up <svg> element
  let svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttributeNS('http://www.w3.org/2000/xmlns/', 'xmlns', 'http://www.w3.org/2000/svg');
  svg.setAttributeNS('http://www.w3.org/2000/xmlns/', 'xmlns:xlink', 'http://www.w3.org/1999/xlink');
  svg.setAttribute('width', window.innerWidth);
  svg.setAttribute('height', window.innerHeight);
  svg.setAttribute('viewBox', '0 0 ' + window.innerWidth + ' ' + window.innerHeight);

  for(let polygon of polygons) {
    svg.appendChild( createPathElFromPoints(polygon) );
  }

  // Generate the document as a Blob and force a download as a timestamped .svg file
  const svgDoctype = '<?xml version="1.0" encoding="UTF-8" standalone="no"?>';
  const serializedSvg = (new XMLSerializer()).serializeToString(svg);
  const blob = new Blob([svgDoctype, serializedSvg], { type: 'image/svg+xml;' })
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

  let pathEl = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  pathEl.setAttribute('d', d);
  pathEl.setAttribute('style', 'fill: none; stroke: black; stroke-width: 1');

  return pathEl;
}
