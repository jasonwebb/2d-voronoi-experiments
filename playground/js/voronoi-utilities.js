import {Delaunay} from "d3-delaunay";

// Build an array of polygons (arrays of [x,y] pairs) extracted from Voronoi package
export function getVoronoiPolygons(points) {
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