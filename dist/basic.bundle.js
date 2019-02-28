/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./basic/js/entry.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./basic/js/entry.js":
/*!***************************!*\
  !*** ./basic/js/entry.js ***!
  \***************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var d3_delaunay__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! d3-delaunay */ "./node_modules/d3-delaunay/src/index.js");


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
    const delaunay = d3_delaunay__WEBPACK_IMPORTED_MODULE_0__["Delaunay"].from(points);
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

/***/ }),

/***/ "./node_modules/d3-delaunay/src/delaunay.js":
/*!**************************************************!*\
  !*** ./node_modules/d3-delaunay/src/delaunay.js ***!
  \**************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Delaunay; });
/* harmony import */ var delaunator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! delaunator */ "./node_modules/delaunator/index.js");
/* harmony import */ var _path_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./path.js */ "./node_modules/d3-delaunay/src/path.js");
/* harmony import */ var _polygon_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./polygon.js */ "./node_modules/d3-delaunay/src/polygon.js");
/* harmony import */ var _voronoi_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./voronoi.js */ "./node_modules/d3-delaunay/src/voronoi.js");





const tau = 2 * Math.PI;

function pointX(p) {
  return p[0];
}

function pointY(p) {
  return p[1];
}

class Delaunay {
  constructor(points) {
    const {halfedges, hull, triangles} = new delaunator__WEBPACK_IMPORTED_MODULE_0__["default"](points);
    this.points = points;
    this.halfedges = halfedges;
    this.hull = hull;
    this.triangles = triangles;
    const inedges = this.inedges = new Int32Array(points.length / 2).fill(-1);
    const outedges = this.outedges = new Int32Array(points.length / 2).fill(-1);

    // Compute an index from each point to an (arbitrary) incoming halfedge.
    for (let e = 0, n = halfedges.length; e < n; ++e) {
      inedges[triangles[e % 3 === 2 ? e - 2 : e + 1]] = e;
    }

    // For points on the hull, index both the incoming and outgoing halfedges.
    let node0, node1 = hull;
    do {
      node0 = node1, node1 = node1.next;
      inedges[node1.i] = node0.t;
      outedges[node0.i] = node1.t;
    } while (node1 !== hull);
  }
  voronoi(bounds) {
    return new _voronoi_js__WEBPACK_IMPORTED_MODULE_3__["default"](this, bounds);
  }
  *neighbors(i) {
    const {inedges, outedges, halfedges, triangles} = this;
    const e0 = inedges[i];
    if (e0 === -1) return; // coincident point
    let e = e0;
    do {
      yield triangles[e];
      e = e % 3 === 2 ? e - 2 : e + 1;
      if (triangles[e] !== i) return; // bad triangulation
      e = halfedges[e];
      if (e === -1) return yield triangles[outedges[i]];
    } while (e !== e0);
  }
  find(x, y, i = 0) {
    if ((x = +x, x !== x) || (y = +y, y !== y)) return -1;
    let c;
    while ((c = this._step(i, x, y)) >= 0 && c !== i) i = c;
    return c;
  }
  _step(i, x, y) {
    const {inedges, points} = this;
    if (inedges[i] === -1) return -1; // coincident point
    let c = i;
    let dc = (x - points[i * 2]) ** 2 + (y - points[i * 2 + 1]) ** 2;
    for (const t of this.neighbors(i)) {
      const dt = (x - points[t * 2]) ** 2 + (y - points[t * 2 + 1]) ** 2;
      if (dt < dc) dc = dt, c = t;
    }
    return c;
  }
  render(context) {
    const buffer = context == null ? context = new _path_js__WEBPACK_IMPORTED_MODULE_1__["default"] : undefined;
    const {points, halfedges, triangles} = this;
    for (let i = 0, n = halfedges.length; i < n; ++i) {
      const j = halfedges[i];
      if (j < i) continue;
      const ti = triangles[i] * 2;
      const tj = triangles[j] * 2;
      context.moveTo(points[ti], points[ti + 1]);
      context.lineTo(points[tj], points[tj + 1]);
    }
    this.renderHull(context);
    return buffer && buffer.value();
  }
  renderPoints(context, r = 2) {
    const buffer = context == null ? context = new _path_js__WEBPACK_IMPORTED_MODULE_1__["default"] : undefined;
    const {points} = this;
    for (let i = 0, n = points.length; i < n; i += 2) {
      const x = points[i], y = points[i + 1];
      context.moveTo(x + r, y);
      context.arc(x, y, r, 0, tau);
    }
    return buffer && buffer.value();
  }
  renderHull(context) {
    const buffer = context == null ? context = new _path_js__WEBPACK_IMPORTED_MODULE_1__["default"] : undefined;
    const {hull} = this;
    let node = hull;
    context.moveTo(node.x, node.y);
    while (node = node.next, node !== hull) context.lineTo(node.x, node.y);
    context.closePath();
    return buffer && buffer.value();
  }
  hullPolygon() {
    const polygon = new _polygon_js__WEBPACK_IMPORTED_MODULE_2__["default"];
    this.renderHull(polygon);
    return polygon.value();
  }
  renderTriangle(i, context) {
    const buffer = context == null ? context = new _path_js__WEBPACK_IMPORTED_MODULE_1__["default"] : undefined;
    const {points, triangles} = this;
    const t0 = triangles[i *= 3] * 2;
    const t1 = triangles[i + 1] * 2;
    const t2 = triangles[i + 2] * 2;
    context.moveTo(points[t0], points[t0 + 1]);
    context.lineTo(points[t1], points[t1 + 1]);
    context.lineTo(points[t2], points[t2 + 1]);
    context.closePath();
    return buffer && buffer.value();
  }
  *trianglePolygons() {
    const {triangles} = this;
    for (let i = 0, n = triangles.length / 3; i < n; ++i) {
      yield this.trianglePolygon(i);
    }
  }
  trianglePolygon(i) {
    const polygon = new _polygon_js__WEBPACK_IMPORTED_MODULE_2__["default"];
    this.renderTriangle(i, polygon);
    return polygon.value();
  }
}

Delaunay.from = function(points, fx = pointX, fy = pointY, that) {
  return new Delaunay("length" in points
      ? flatArray(points, fx, fy, that)
      : Float64Array.from(flatIterable(points, fx, fy, that)));
};

function flatArray(points, fx, fy, that) {
  const n = points.length;
  const array = new Float64Array(n * 2);
  for (let i = 0; i < n; ++i) {
    const p = points[i];
    array[i * 2] = fx.call(that, p, i, points);
    array[i * 2 + 1] = fy.call(that, p, i, points);
  }
  return array;
}

function* flatIterable(points, fx, fy, that) {
  let i = 0;
  for (const p of points) {
    yield fx.call(that, p, i, points);
    yield fy.call(that, p, i, points);
    ++i;
  }
}


/***/ }),

/***/ "./node_modules/d3-delaunay/src/index.js":
/*!***********************************************!*\
  !*** ./node_modules/d3-delaunay/src/index.js ***!
  \***********************************************/
/*! exports provided: Delaunay, Voronoi */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _delaunay_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./delaunay.js */ "./node_modules/d3-delaunay/src/delaunay.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Delaunay", function() { return _delaunay_js__WEBPACK_IMPORTED_MODULE_0__["default"]; });

/* harmony import */ var _voronoi_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./voronoi.js */ "./node_modules/d3-delaunay/src/voronoi.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Voronoi", function() { return _voronoi_js__WEBPACK_IMPORTED_MODULE_1__["default"]; });





/***/ }),

/***/ "./node_modules/d3-delaunay/src/path.js":
/*!**********************************************!*\
  !*** ./node_modules/d3-delaunay/src/path.js ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Path; });
const epsilon = 1e-6;

class Path {
  constructor() {
    this._x0 = this._y0 = // start of current subpath
    this._x1 = this._y1 = null; // end of current subpath
    this._ = "";
  }
  moveTo(x, y) {
    this._ += `M${this._x0 = this._x1 = +x},${this._y0 = this._y1 = +y}`;
  }
  closePath() {
    if (this._x1 !== null) {
      this._x1 = this._x0, this._y1 = this._y0;
      this._ += "Z";
    }
  }
  lineTo(x, y) {
    this._ += `L${this._x1 = +x},${this._y1 = +y}`;
  }
  arc(x, y, r) {
    x = +x, y = +y, r = +r;
    const x0 = x + r;
    const y0 = y;
    if (r < 0) throw new Error("negative radius");
    if (this._x1 === null) this._ += `M${x0},${y0}`;
    else if (Math.abs(this._x1 - x0) > epsilon || Math.abs(this._y1 - y0) > epsilon) this._ += "L" + x0 + "," + y0;
    if (!r) return;
    this._ += `A${r},${r},0,1,1,${x - r},${y}A${r},${r},0,1,1,${this._x1 = x0},${this._y1 = y0}`;
  }
  rect(x, y, w, h) {
    this._ += `M${this._x0 = this._x1 = +x},${this._y0 = this._y1 = +y}h${+w}v${+h}h${-w}Z`;
  }
  value() {
    return this._ || null;
  }
}


/***/ }),

/***/ "./node_modules/d3-delaunay/src/polygon.js":
/*!*************************************************!*\
  !*** ./node_modules/d3-delaunay/src/polygon.js ***!
  \*************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Polygon; });
class Polygon {
  constructor() {
    this._ = [];
  }
  moveTo(x, y) {
    this._.push([x, y]);
  }
  closePath() {
    this._.push(this._[0].slice());
  }
  lineTo(x, y) {
    this._.push([x, y]);
  }
  value() {
    return this._.length ? this._ : null;
  }
}


/***/ }),

/***/ "./node_modules/d3-delaunay/src/voronoi.js":
/*!*************************************************!*\
  !*** ./node_modules/d3-delaunay/src/voronoi.js ***!
  \*************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Voronoi; });
/* harmony import */ var _path_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./path.js */ "./node_modules/d3-delaunay/src/path.js");
/* harmony import */ var _polygon_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./polygon.js */ "./node_modules/d3-delaunay/src/polygon.js");



class Voronoi {
  constructor(delaunay, [xmin, ymin, xmax, ymax] = [0, 0, 960, 500]) {
    if (!((xmax = +xmax) >= (xmin = +xmin)) || !((ymax = +ymax) >= (ymin = +ymin))) throw new Error("invalid bounds");
    const {points, hull, triangles} = this.delaunay = delaunay;
    const circumcenters = this.circumcenters = new Float64Array(triangles.length / 3 * 2);
    const vectors = this.vectors = new Float64Array(points.length * 2);
    this.xmax = xmax, this.xmin = xmin;
    this.ymax = ymax, this.ymin = ymin;

    // Compute circumcenters.
    for (let i = 0, j = 0, n = triangles.length; i < n; i += 3, j += 2) {
      const t1 = triangles[i] * 2;
      const t2 = triangles[i + 1] * 2;
      const t3 = triangles[i + 2] * 2;
      const x1 = points[t1];
      const y1 = points[t1 + 1];
      const x2 = points[t2];
      const y2 = points[t2 + 1];
      const x3 = points[t3];
      const y3 = points[t3 + 1];
      const a2 = x1 - x2;
      const a3 = x1 - x3;
      const b2 = y1 - y2;
      const b3 = y1 - y3;
      const d1 = x1 * x1 + y1 * y1;
      const d2 = d1 - x2 * x2 - y2 * y2;
      const d3 = d1 - x3 * x3 - y3 * y3;
      const ab = (a3 * b2 - a2 * b3) * 2;
      circumcenters[j] = (b2 * d3 - b3 * d2) / ab;
      circumcenters[j + 1] = (a3 * d2 - a2 * d3) / ab;
    }

    // Compute exterior cell rays.
    let node = hull;
    let p0, p1 = node.i * 4;
    let x0, x1 = node.x;
    let y0, y1 = node.y;
    do {
      node = node.next, p0 = p1, x0 = x1, y0 = y1, p1 = node.i * 4, x1 = node.x, y1 = node.y;
      vectors[p0 + 2] = vectors[p1] = y0 - y1;
      vectors[p0 + 3] = vectors[p1 + 1] = x1 - x0;
    } while (node !== hull);
  }
  render(context) {
    const buffer = context == null ? context = new _path_js__WEBPACK_IMPORTED_MODULE_0__["default"] : undefined;
    const {delaunay: {halfedges, hull}, circumcenters, vectors} = this;
    for (let i = 0, n = halfedges.length; i < n; ++i) {
      const j = halfedges[i];
      if (j < i) continue;
      const ti = Math.floor(i / 3) * 2;
      const tj = Math.floor(j / 3) * 2;
      const xi = circumcenters[ti];
      const yi = circumcenters[ti + 1];
      const xj = circumcenters[tj];
      const yj = circumcenters[tj + 1];
      this._renderSegment(xi, yi, xj, yj, context);
    }
    let node = hull;
    do {
      node = node.next;
      const t = Math.floor(node.t / 3) * 2;
      const x = circumcenters[t];
      const y = circumcenters[t + 1];
      const v = node.i * 4;
      const p = this._project(x, y, vectors[v + 2], vectors[v + 3]);
      if (p) this._renderSegment(x, y, p[0], p[1], context);
    } while (node !== hull);
    return buffer && buffer.value();
  }
  renderBounds(context) {
    const buffer = context == null ? context = new _path_js__WEBPACK_IMPORTED_MODULE_0__["default"] : undefined;
    context.rect(this.xmin, this.ymin, this.xmax - this.xmin, this.ymax - this.ymin);
    return buffer && buffer.value();
  }
  renderCell(i, context) {
    const buffer = context == null ? context = new _path_js__WEBPACK_IMPORTED_MODULE_0__["default"] : undefined;
    const points = this._clip(i);
    if (points === null) return;
    context.moveTo(points[0], points[1]);
    for (let i = 2, n = points.length; i < n; i += 2) {
      context.lineTo(points[i], points[i + 1]);
    }
    context.closePath();
    return buffer && buffer.value();
  }
  *cellPolygons() {
    const {delaunay: {points}} = this;
    for (let i = 0, n = points.length / 2; i < n; ++i) {
      const cell = this.cellPolygon(i);
      if (cell) yield cell;
    }
  }
  cellPolygon(i) {
    const polygon = new _polygon_js__WEBPACK_IMPORTED_MODULE_1__["default"];
    this.renderCell(i, polygon);
    return polygon.value();
  }
  _renderSegment(x0, y0, x1, y1, context) {
    let S;
    const c0 = this._regioncode(x0, y0);
    const c1 = this._regioncode(x1, y1);
    if (c0 === 0 && c1 === 0) {
      context.moveTo(x0, y0);
      context.lineTo(x1, y1);
    } else if (S = this._clipSegment(x0, y0, x1, y1, c0, c1)) {
      context.moveTo(S[0], S[1]);
      context.lineTo(S[2], S[3]);
    }
  }
  contains(i, x, y) {
    if ((x = +x, x !== x) || (y = +y, y !== y)) return false;
    return this.delaunay._step(i, x, y) === i;
  }
  _cell(i) {
    const {circumcenters, delaunay: {inedges, halfedges, triangles}} = this;
    const e0 = inedges[i];
    if (e0 === -1) return null; // coincident point
    const points = [];
    let e = e0;
    do {
      const t = Math.floor(e / 3);
      points.push(circumcenters[t * 2], circumcenters[t * 2 + 1]);
      e = e % 3 === 2 ? e - 2 : e + 1;
      if (triangles[e] !== i) break; // bad triangulation
      e = halfedges[e];
    } while (e !== e0 && e !== -1);
    return points;
  }
  _clip(i) {
    const points = this._cell(i);
    if (points === null) return null;
    const {vectors: V} = this;
    const v = i * 4;
    return V[v] || V[v + 1]
        ? this._clipInfinite(i, points, V[v], V[v + 1], V[v + 2], V[v + 3])
        : this._clipFinite(i, points);
  }
  _clipFinite(i, points) {
    const n = points.length;
    let P = null;
    let x0, y0, x1 = points[n - 2], y1 = points[n - 1];
    let c0, c1 = this._regioncode(x1, y1);
    let e0, e1;
    for (let j = 0; j < n; j += 2) {
      x0 = x1, y0 = y1, x1 = points[j], y1 = points[j + 1];
      c0 = c1, c1 = this._regioncode(x1, y1);
      if (c0 === 0 && c1 === 0) {
        e0 = e1, e1 = 0;
        if (P) P.push(x1, y1);
        else P = [x1, y1];
      } else {
        let S, sx0, sy0, sx1, sy1;
        if (c0 === 0) {
          if ((S = this._clipSegment(x0, y0, x1, y1, c0, c1)) === null) continue;
          [sx0, sy0, sx1, sy1] = S;
        } else {
          if ((S = this._clipSegment(x1, y1, x0, y0, c1, c0)) === null) continue;
          [sx1, sy1, sx0, sy0] = S;
          e0 = e1, e1 = this._edgecode(sx0, sy0);
          if (e0 && e1) this._edge(i, e0, e1, P, P.length);
          if (P) P.push(sx0, sy0);
          else P = [sx0, sy0];
        }
        e0 = e1, e1 = this._edgecode(sx1, sy1);
        if (e0 && e1) this._edge(i, e0, e1, P, P.length);
        if (P) P.push(sx1, sy1);
        else P = [sx1, sy1];
      }
    }
    if (P) {
      e0 = e1, e1 = this._edgecode(P[0], P[1]);
      if (e0 && e1) this._edge(i, e0, e1, P, P.length);
    } else if (this.contains(i, (this.xmin + this.xmax) / 2, (this.ymin + this.ymax) / 2)) {
      return [this.xmax, this.ymin, this.xmax, this.ymax, this.xmin, this.ymax, this.xmin, this.ymin];
    }
    return P;
  }
  _clipSegment(x0, y0, x1, y1, c0, c1) {
    while (true) {
      if (c0 === 0 && c1 === 0) return [x0, y0, x1, y1];
      if (c0 & c1) return null;
      let x, y, c = c0 || c1;
      if (c & 0b1000) x = x0 + (x1 - x0) * (this.ymax - y0) / (y1 - y0), y = this.ymax;
      else if (c & 0b0100) x = x0 + (x1 - x0) * (this.ymin - y0) / (y1 - y0), y = this.ymin;
      else if (c & 0b0010) y = y0 + (y1 - y0) * (this.xmax - x0) / (x1 - x0), x = this.xmax;
      else y = y0 + (y1 - y0) * (this.xmin - x0) / (x1 - x0), x = this.xmin;
      if (c0) x0 = x, y0 = y, c0 = this._regioncode(x0, y0);
      else x1 = x, y1 = y, c1 = this._regioncode(x1, y1);
    }
  }
  _clipInfinite(i, points, vx0, vy0, vxn, vyn) {
    let P = Array.from(points), p;
    if (p = this._project(P[0], P[1], vx0, vy0)) P.unshift(p[0], p[1]);
    if (p = this._project(P[P.length - 2], P[P.length - 1], vxn, vyn)) P.push(p[0], p[1]);
    if (P = this._clipFinite(i, P)) {
      for (let j = 0, n = P.length, c0, c1 = this._edgecode(P[n - 2], P[n - 1]); j < n; j += 2) {
        c0 = c1, c1 = this._edgecode(P[j], P[j + 1]);
        if (c0 && c1) j = this._edge(i, c0, c1, P, j), n = P.length;
      }
    } else if (this.contains(i, (this.xmin + this.xmax) / 2, (this.ymin + this.ymax) / 2)) {
      P = [this.xmin, this.ymin, this.xmax, this.ymin, this.xmax, this.ymax, this.xmin, this.ymax];
    }
    return P;
  }
  _edge(i, e0, e1, P, j) {
    while (e0 !== e1) {
      let x, y;
      switch (e0) {
        case 0b0101: e0 = 0b0100; continue; // top-left
        case 0b0100: e0 = 0b0110, x = this.xmax, y = this.ymin; break; // top
        case 0b0110: e0 = 0b0010; continue; // top-right
        case 0b0010: e0 = 0b1010, x = this.xmax, y = this.ymax; break; // right
        case 0b1010: e0 = 0b1000; continue; // bottom-right
        case 0b1000: e0 = 0b1001, x = this.xmin, y = this.ymax; break; // bottom
        case 0b1001: e0 = 0b0001; continue; // bottom-left
        case 0b0001: e0 = 0b0101, x = this.xmin, y = this.ymin; break; // left
      }
      if ((P[j] !== x || P[j + 1] !== y) && this.contains(i, x, y)) {
        P.splice(j, 0, x, y), j += 2;
      }
    }
    return j;
  }
  _project(x0, y0, vx, vy) {
    let t = Infinity, c, x, y;
    if (vy < 0) { // top
      if (y0 <= this.ymin) return null;
      if ((c = (this.ymin - y0) / vy) < t) y = this.ymin, x = x0 + (t = c) * vx;
    } else if (vy > 0) { // bottom
      if (y0 >= this.ymax) return null;
      if ((c = (this.ymax - y0) / vy) < t) y = this.ymax, x = x0 + (t = c) * vx;
    }
    if (vx > 0) { // right
      if (x0 >= this.xmax) return null;
      if ((c = (this.xmax - x0) / vx) < t) x = this.xmax, y = y0 + (t = c) * vy;
    } else if (vx < 0) { // left
      if (x0 <= this.xmin) return null;
      if ((c = (this.xmin - x0) / vx) < t) x = this.xmin, y = y0 + (t = c) * vy;
    }
    return [x, y];
  }
  _edgecode(x, y) {
    return (x === this.xmin ? 0b0001
        : x === this.xmax ? 0b0010 : 0b0000)
        | (y === this.ymin ? 0b0100
        : y === this.ymax ? 0b1000 : 0b0000);
  }
  _regioncode(x, y) {
    return (x < this.xmin ? 0b0001
        : x > this.xmax ? 0b0010 : 0b0000)
        | (y < this.ymin ? 0b0100
        : y > this.ymax ? 0b1000 : 0b0000);
  }
}


/***/ }),

/***/ "./node_modules/delaunator/index.js":
/*!******************************************!*\
  !*** ./node_modules/delaunator/index.js ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Delaunator; });

const EPSILON = Math.pow(2, -52);

class Delaunator {

    static from(points, getX, getY) {
        if (!getX) getX = defaultGetX;
        if (!getY) getY = defaultGetY;

        const n = points.length;
        const coords = new Float64Array(n * 2);

        for (let i = 0; i < n; i++) {
            const p = points[i];
            coords[2 * i] = getX(p);
            coords[2 * i + 1] = getY(p);
        }

        return new Delaunator(coords);
    }

    constructor(coords) {
        let minX = Infinity;
        let minY = Infinity;
        let maxX = -Infinity;
        let maxY = -Infinity;

        const n = coords.length >> 1;
        const ids = this.ids = new Uint32Array(n);

        if (n > 0 && typeof coords[0] !== 'number') throw new Error('Expected coords to contain numbers.');

        this.coords = coords;

        for (let i = 0; i < n; i++) {
            const x = coords[2 * i];
            const y = coords[2 * i + 1];
            if (x < minX) minX = x;
            if (y < minY) minY = y;
            if (x > maxX) maxX = x;
            if (y > maxY) maxY = y;
            ids[i] = i;
        }

        const cx = (minX + maxX) / 2;
        const cy = (minY + maxY) / 2;

        let minDist = Infinity;
        let i0, i1, i2;

        // pick a seed point close to the centroid
        for (let i = 0; i < n; i++) {
            const d = dist(cx, cy, coords[2 * i], coords[2 * i + 1]);
            if (d < minDist) {
                i0 = i;
                minDist = d;
            }
        }
        const i0x = coords[2 * i0];
        const i0y = coords[2 * i0 + 1];

        minDist = Infinity;

        // find the point closest to the seed
        for (let i = 0; i < n; i++) {
            if (i === i0) continue;
            const d = dist(i0x, i0y, coords[2 * i], coords[2 * i + 1]);
            if (d < minDist && d > 0) {
                i1 = i;
                minDist = d;
            }
        }
        let i1x = coords[2 * i1];
        let i1y = coords[2 * i1 + 1];

        let minRadius = Infinity;

        // find the third point which forms the smallest circumcircle with the first two
        for (let i = 0; i < n; i++) {
            if (i === i0 || i === i1) continue;
            const r = circumradius(i0x, i0y, i1x, i1y, coords[2 * i], coords[2 * i + 1]);
            if (r < minRadius) {
                i2 = i;
                minRadius = r;
            }
        }
        let i2x = coords[2 * i2];
        let i2y = coords[2 * i2 + 1];

        if (minRadius === Infinity) {
            throw new Error('No Delaunay triangulation exists for this input.');
        }

        // swap the order of the seed points for counter-clockwise orientation
        if (orient(i0x, i0y, i1x, i1y, i2x, i2y)) {
            const i = i1;
            const x = i1x;
            const y = i1y;
            i1 = i2;
            i1x = i2x;
            i1y = i2y;
            i2 = i;
            i2x = x;
            i2y = y;
        }

        const center = circumcenter(i0x, i0y, i1x, i1y, i2x, i2y);
        this._cx = center.x;
        this._cy = center.y;

        // sort the points by distance from the seed triangle circumcenter
        quicksort(ids, coords, 0, ids.length - 1, center.x, center.y);

        // initialize a hash table for storing edges of the advancing convex hull
        this._hashSize = Math.ceil(Math.sqrt(n));
        this._hash = new Array(this._hashSize);

        // initialize a circular doubly-linked list that will hold an advancing convex hull
        let e = this.hull = insertNode(coords, i0);
        this._hashEdge(e);
        e.t = 0;
        e = insertNode(coords, i1, e);
        this._hashEdge(e);
        e.t = 1;
        e = insertNode(coords, i2, e);
        this._hashEdge(e);
        e.t = 2;

        const maxTriangles = 2 * n - 5;
        const triangles = this.triangles = new Uint32Array(maxTriangles * 3);
        const halfedges = this.halfedges = new Int32Array(maxTriangles * 3);

        this.trianglesLen = 0;

        this._addTriangle(i0, i1, i2, -1, -1, -1);

        for (let k = 0, xp, yp; k < ids.length; k++) {
            const i = ids[k];
            const x = coords[2 * i];
            const y = coords[2 * i + 1];

            // skip near-duplicate points
            if (k > 0 && Math.abs(x - xp) <= EPSILON && Math.abs(y - yp) <= EPSILON) continue;
            xp = x;
            yp = y;

            // skip seed triangle points
            if (i === i0 || i === i1 || i === i2) continue;

            // find a visible edge on the convex hull using edge hash
            const startKey = this._hashKey(x, y);
            let key = startKey;
            let start;
            do {
                start = this._hash[key];
                key = (key + 1) % this._hashSize;
            } while ((!start || start.removed) && key !== startKey);

            start = start.prev;
            e = start;
            while (!orient(x, y, e.x, e.y, e.next.x, e.next.y)) {
                e = e.next;
                if (e === start) {
                    e = null;
                    break;
                }
            }
            // likely a near-duplicate point; skip it
            if (!e) continue;

            const walkBack = e === start;

            // add the first triangle from the point
            let t = this._addTriangle(e.i, i, e.next.i, -1, -1, e.t);

            e.t = t; // keep track of boundary triangles on the hull
            e = insertNode(coords, i, e);

            // recursively flip triangles from the point until they satisfy the Delaunay condition
            e.t = this._legalize(t + 2);

            // walk forward through the hull, adding more triangles and flipping recursively
            let q = e.next;
            while (orient(x, y, q.x, q.y, q.next.x, q.next.y)) {
                t = this._addTriangle(q.i, i, q.next.i, q.prev.t, -1, q.t);
                q.prev.t = this._legalize(t + 2);
                this.hull = removeNode(q);
                q = q.next;
            }

            if (walkBack) {
                // walk backward from the other side, adding more triangles and flipping
                q = e.prev;
                while (orient(x, y, q.prev.x, q.prev.y, q.x, q.y)) {
                    t = this._addTriangle(q.prev.i, i, q.i, -1, q.t, q.prev.t);
                    this._legalize(t + 2);
                    q.prev.t = t;
                    this.hull = removeNode(q);
                    q = q.prev;
                }
            }

            // save the two new edges in the hash table
            this._hashEdge(e);
            this._hashEdge(e.prev);
        }

        // trim typed triangle mesh arrays
        this.triangles = triangles.subarray(0, this.trianglesLen);
        this.halfedges = halfedges.subarray(0, this.trianglesLen);
    }

    _hashEdge(e) {
        this._hash[this._hashKey(e.x, e.y)] = e;
    }

    _hashKey(x, y) {
        return Math.floor(pseudoAngle(x - this._cx, y - this._cy) * this._hashSize) % this._hashSize;
    }

    _legalize(a) {
        const {triangles, coords, halfedges} = this;

        const b = halfedges[a];

        /* if the pair of triangles doesn't satisfy the Delaunay condition
         * (p1 is inside the circumcircle of [p0, pl, pr]), flip them,
         * then do the same check/flip recursively for the new pair of triangles
         *
         *           pl                    pl
         *          /||\                  /  \
         *       al/ || \bl            al/    \a
         *        /  ||  \              /      \
         *       /  a||b  \    flip    /___ar___\
         *     p0\   ||   /p1   =>   p0\---bl---/p1
         *        \  ||  /              \      /
         *       ar\ || /br             b\    /br
         *          \||/                  \  /
         *           pr                    pr
         */
        const a0 = a - a % 3;
        const b0 = b - b % 3;

        const al = a0 + (a + 1) % 3;
        const ar = a0 + (a + 2) % 3;
        const bl = b0 + (b + 2) % 3;

        if (b === -1) return ar;

        const p0 = triangles[ar];
        const pr = triangles[a];
        const pl = triangles[al];
        const p1 = triangles[bl];

        const illegal = inCircle(
            coords[2 * p0], coords[2 * p0 + 1],
            coords[2 * pr], coords[2 * pr + 1],
            coords[2 * pl], coords[2 * pl + 1],
            coords[2 * p1], coords[2 * p1 + 1]);

        if (illegal) {
            triangles[a] = p1;
            triangles[b] = p0;

            const hbl = halfedges[bl];

            // edge swapped on the other side of the hull (rare); fix the halfedge reference
            if (hbl === -1) {
                let e = this.hull;
                do {
                    if (e.t === bl) {
                        e.t = a;
                        break;
                    }
                    e = e.next;
                } while (e !== this.hull);
            }
            this._link(a, hbl);
            this._link(b, halfedges[ar]);
            this._link(ar, bl);

            const br = b0 + (b + 1) % 3;

            this._legalize(a);
            return this._legalize(br);
        }

        return ar;
    }

    _link(a, b) {
        this.halfedges[a] = b;
        if (b !== -1) this.halfedges[b] = a;
    }

    // add a new triangle given vertex indices and adjacent half-edge ids
    _addTriangle(i0, i1, i2, a, b, c) {
        const t = this.trianglesLen;

        this.triangles[t] = i0;
        this.triangles[t + 1] = i1;
        this.triangles[t + 2] = i2;

        this._link(t, a);
        this._link(t + 1, b);
        this._link(t + 2, c);

        this.trianglesLen += 3;

        return t;
    }
}

// monotonically increases with real angle, but doesn't need expensive trigonometry
function pseudoAngle(dx, dy) {
    const p = dx / (Math.abs(dx) + Math.abs(dy));
    return (dy > 0 ? 3 - p : 1 + p) / 4; // [0..1]
}

function dist(ax, ay, bx, by) {
    const dx = ax - bx;
    const dy = ay - by;
    return dx * dx + dy * dy;
}

function orient(px, py, qx, qy, rx, ry) {
    return (qy - py) * (rx - qx) - (qx - px) * (ry - qy) < 0;
}

function inCircle(ax, ay, bx, by, cx, cy, px, py) {
    const dx = ax - px;
    const dy = ay - py;
    const ex = bx - px;
    const ey = by - py;
    const fx = cx - px;
    const fy = cy - py;

    const ap = dx * dx + dy * dy;
    const bp = ex * ex + ey * ey;
    const cp = fx * fx + fy * fy;

    return dx * (ey * cp - bp * fy) -
           dy * (ex * cp - bp * fx) +
           ap * (ex * fy - ey * fx) < 0;
}

function circumradius(ax, ay, bx, by, cx, cy) {
    const dx = bx - ax;
    const dy = by - ay;
    const ex = cx - ax;
    const ey = cy - ay;

    const bl = dx * dx + dy * dy;
    const cl = ex * ex + ey * ey;
    const d = dx * ey - dy * ex;

    const x = (ey * bl - dy * cl) * 0.5 / d;
    const y = (dx * cl - ex * bl) * 0.5 / d;

    return bl && cl && d && (x * x + y * y) || Infinity;
}

function circumcenter(ax, ay, bx, by, cx, cy) {
    const dx = bx - ax;
    const dy = by - ay;
    const ex = cx - ax;
    const ey = cy - ay;

    const bl = dx * dx + dy * dy;
    const cl = ex * ex + ey * ey;
    const d = dx * ey - dy * ex;

    const x = ax + (ey * bl - dy * cl) * 0.5 / d;
    const y = ay + (dx * cl - ex * bl) * 0.5 / d;

    return {x, y};
}

// create a new node in a doubly linked list
function insertNode(coords, i, prev) {
    const node = {
        i,
        x: coords[2 * i],
        y: coords[2 * i + 1],
        t: 0,
        prev: null,
        next: null,
        removed: false
    };

    if (!prev) {
        node.prev = node;
        node.next = node;

    } else {
        node.next = prev.next;
        node.prev = prev;
        prev.next.prev = node;
        prev.next = node;
    }
    return node;
}

function removeNode(node) {
    node.prev.next = node.next;
    node.next.prev = node.prev;
    node.removed = true;
    return node.prev;
}

function quicksort(ids, coords, left, right, cx, cy) {
    let i, j, temp;

    if (right - left <= 20) {
        for (i = left + 1; i <= right; i++) {
            temp = ids[i];
            j = i - 1;
            while (j >= left && compare(coords, ids[j], temp, cx, cy) > 0) ids[j + 1] = ids[j--];
            ids[j + 1] = temp;
        }
    } else {
        const median = (left + right) >> 1;
        i = left + 1;
        j = right;
        swap(ids, median, i);
        if (compare(coords, ids[left], ids[right], cx, cy) > 0) swap(ids, left, right);
        if (compare(coords, ids[i], ids[right], cx, cy) > 0) swap(ids, i, right);
        if (compare(coords, ids[left], ids[i], cx, cy) > 0) swap(ids, left, i);

        temp = ids[i];
        while (true) {
            do i++; while (compare(coords, ids[i], temp, cx, cy) < 0);
            do j--; while (compare(coords, ids[j], temp, cx, cy) > 0);
            if (j < i) break;
            swap(ids, i, j);
        }
        ids[left + 1] = ids[j];
        ids[j] = temp;

        if (right - i + 1 >= j - left) {
            quicksort(ids, coords, i, right, cx, cy);
            quicksort(ids, coords, left, j - 1, cx, cy);
        } else {
            quicksort(ids, coords, left, j - 1, cx, cy);
            quicksort(ids, coords, i, right, cx, cy);
        }
    }
}

function compare(coords, i, j, cx, cy) {
    const d1 = dist(coords[2 * i], coords[2 * i + 1], cx, cy);
    const d2 = dist(coords[2 * j], coords[2 * j + 1], cx, cy);
    return (d1 - d2) || (coords[2 * i] - coords[2 * j]) || (coords[2 * i + 1] - coords[2 * j + 1]);
}

function swap(arr, i, j) {
    const tmp = arr[i];
    arr[i] = arr[j];
    arr[j] = tmp;
}

function defaultGetX(p) {
    return p[0];
}
function defaultGetY(p) {
    return p[1];
}


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vYmFzaWMvanMvZW50cnkuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2QzLWRlbGF1bmF5L3NyYy9kZWxhdW5heS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvZDMtZGVsYXVuYXkvc3JjL2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9kMy1kZWxhdW5heS9zcmMvcGF0aC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvZDMtZGVsYXVuYXkvc3JjL3BvbHlnb24uanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2QzLWRlbGF1bmF5L3NyYy92b3Jvbm9pLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9kZWxhdW5hdG9yL2luZGV4LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGtEQUEwQyxnQ0FBZ0M7QUFDMUU7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxnRUFBd0Qsa0JBQWtCO0FBQzFFO0FBQ0EseURBQWlELGNBQWM7QUFDL0Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlEQUF5QyxpQ0FBaUM7QUFDMUUsd0hBQWdILG1CQUFtQixFQUFFO0FBQ3JJO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7OztB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QUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUEsK0JBQStCLGdCQUFnQjtBQUMvQztBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7O0FBRWI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNkNBQTZDO0FBQzdDOztBQUVBOztBQUVBO0FBQ0E7O0FBRUEsb0JBQW9CO0FBQ3BCOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxlQUFlLDZCQUE2Qjs7QUFFNUM7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUEsaUVBQWlFO0FBQ2pFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLHdDQUF3QztBQUN4Qzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUEsWUFBWTtBQUNaOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLDBCQUEwQixZQUFZO0FBQ3RDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLG1CQUFtQjtBQUNuQixtQkFBbUI7QUFDbkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImJhc2ljLmJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vYmFzaWMvanMvZW50cnkuanNcIik7XG4iLCJpbXBvcnQgeyBEZWxhdW5heSB9IGZyb20gXCJkMy1kZWxhdW5heVwiO1xyXG5cclxubGV0IHNob3dQb2ludHMgPSBmYWxzZSxcclxuICBpbnZlcnRDb2xvcnMgPSBmYWxzZTtcclxuXHJcbmNvbnN0IHNrZXRjaCA9IGZ1bmN0aW9uIChwNSkge1xyXG4gIC8qXHJcbiAgICBTZXR1cFxyXG4gICAgPT09PT1cclxuICAqL1xyXG4gIHA1LnNldHVwID0gZnVuY3Rpb24gKCkge1xyXG4gICAgcDUuY3JlYXRlQ2FudmFzKHdpbmRvdy5pbm5lcldpZHRoLCB3aW5kb3cuaW5uZXJIZWlnaHQpO1xyXG4gICAgZ2VuZXJhdGVOZXdTaGFwZSgpO1xyXG4gIH1cclxuXHJcbiAgLypcclxuICAgIERyYXdcclxuICAgID09PT1cclxuICAqL1xyXG4gIHA1LmRyYXcgPSBmdW5jdGlvbiAoKSB7fVxyXG5cclxuXHJcbiAgLypcclxuICAgIEtleSByZWxlYXNlZCBoYW5kbGVyXHJcbiAgICA9PT09PT09PT09PT09PT09PT09PVxyXG4gICovXHJcbiAgcDUua2V5UmVsZWFzZWQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICBzd2l0Y2gocDUua2V5KSB7XHJcbiAgICAgIGNhc2UgJyAnOlxyXG4gICAgICAgIGdlbmVyYXRlTmV3U2hhcGUoKTtcclxuICAgICAgICBicmVhaztcclxuXHJcbiAgICAgIGNhc2UgJ3AnOlxyXG4gICAgICAgIHNob3dQb2ludHMgPSAhc2hvd1BvaW50cztcclxuICAgICAgICBnZW5lcmF0ZU5ld1NoYXBlKCk7XHJcbiAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICBjYXNlICdpJzpcclxuICAgICAgICBpbnZlcnRDb2xvcnMgPSAhaW52ZXJ0Q29sb3JzO1xyXG4gICAgICAgIGdlbmVyYXRlTmV3U2hhcGUoKTtcclxuICAgICAgICBicmVhaztcclxuICAgIH1cclxuICB9XHJcblxyXG5cclxuICAvKlxyXG4gICAgQ3VzdG9tIGZ1bmN0aW9uc1xyXG4gICAgPT09PT09PT09PT09PT09PVxyXG4gICovXHJcbiAgLy8gRHJhdyB0aGUgVm9yb25vaSBkaWFncmFtIGZvciBhIHNldCBvZiBwb2ludHNcclxuICBmdW5jdGlvbiBkcmF3Vm9yb25vaShwb2ludHMpIHtcclxuICAgIGNvbnN0IGRlbGF1bmF5ID0gRGVsYXVuYXkuZnJvbShwb2ludHMpO1xyXG4gICAgY29uc3Qgdm9yb25vaSA9IGRlbGF1bmF5LnZvcm9ub2koWzAsIDAsIHdpbmRvdy5pbm5lcldpZHRoLCB3aW5kb3cuaW5uZXJIZWlnaHRdKTtcclxuXHJcbiAgICBmb3IoY29uc3QgcG9seWdvbiBvZiB2b3Jvbm9pLmNlbGxQb2x5Z29ucygpKSB7XHJcbiAgICAgIHA1LmJlZ2luU2hhcGUoKTtcclxuXHJcbiAgICAgIGZvcihjb25zdCB2ZXJ0ZXggb2YgcG9seWdvbikge1xyXG4gICAgICAgIHA1LnZlcnRleCh2ZXJ0ZXhbMF0sIHZlcnRleFsxXSk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHA1LmVuZFNoYXBlKCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvLyBDcmVhdGUgYW4gYXJyYXkgb2YgcG9pbnRzIChjb29yZGluYXRlIHBhaXJzKVxyXG4gIGZ1bmN0aW9uIGNyZWF0ZVBvaW50c1JpbmcoY2VudGVyWCwgY2VudGVyWSwgcmFkaXVzLCBudW1Qb2ludHMpIHtcclxuICAgIGxldCBwb2ludHMgPSBbXTtcclxuXHJcbiAgICBmb3IobGV0IGkgPSAwOyBpIDwgbnVtUG9pbnRzOyBpKyspIHtcclxuICAgICAgcG9pbnRzLnB1c2goW1xyXG4gICAgICAgIGNlbnRlclggKyByYWRpdXMgKiBNYXRoLmNvcyhwNS5yYWRpYW5zKCgzNjAgLyBudW1Qb2ludHMpICogaSkpLFxyXG4gICAgICAgIGNlbnRlclkgKyByYWRpdXMgKiBNYXRoLnNpbihwNS5yYWRpYW5zKCgzNjAgLyBudW1Qb2ludHMpICogaSkpXHJcbiAgICAgIF0pO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBwb2ludHM7XHJcbiAgfVxyXG4gIFxyXG4gIGZ1bmN0aW9uIGdlbmVyYXRlTmV3U2hhcGUoKSB7XHJcbiAgICBsZXQgcG9pbnRzID0gW107XHJcbiAgICBsZXQgbGFzdFJhZGl1cyA9IHA1LnJhbmRvbSgxMCwzMCk7XHJcblxyXG4gICAgLy8gR2VuZXJhdGUgc2V0IG9mIHBvaW50cyBmb3IgVm9yb25vaSBkaWFncmFtXHJcbiAgICBmb3IobGV0IGkgPSAwOyBpIDwgcGFyc2VJbnQocDUucmFuZG9tKDUsMjApKTsgaSsrKSB7XHJcbiAgICAgIGxldCBudW1Qb2ludHM7XHJcbiAgICAgIGlmKGkgPCAzKSB7XHJcbiAgICAgICAgbnVtUG9pbnRzID0gcGFyc2VJbnQocDUucmFuZG9tKDMsMTApKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBudW1Qb2ludHMgPSBwYXJzZUludChwNS5yYW5kb20oMjAsNTApKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgbGV0IG5ld1BvaW50cyA9IGNyZWF0ZVBvaW50c1Jpbmcod2luZG93LmlubmVyV2lkdGgvMiwgd2luZG93LmlubmVySGVpZ2h0LzIsIGxhc3RSYWRpdXMsIG51bVBvaW50cyk7XHJcbiAgICAgIHBvaW50cyA9IHBvaW50cy5jb25jYXQobmV3UG9pbnRzKTtcclxuICAgICAgXHJcbiAgICAgIGxhc3RSYWRpdXMgKz0gcDUucmFuZG9tKDIwLDgwKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBEcmF3IHRoZSBWb3Jvbm9pIGRpYWdyYW1cclxuICAgIGlmKGludmVydENvbG9ycykge1xyXG4gICAgICBwNS5iYWNrZ3JvdW5kKDApO1xyXG4gICAgICBwNS5zdHJva2UoMjU1KTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHA1LmJhY2tncm91bmQoMjU1KTtcclxuICAgICAgcDUuc3Ryb2tlKDApO1xyXG4gICAgfVxyXG5cclxuICAgIHA1Lm5vRmlsbCgpO1xyXG4gICAgZHJhd1Zvcm9ub2kocG9pbnRzKTtcclxuXHJcbiAgICAvLyBEcmF3IHRoZSBwb2ludHNcclxuICAgIGlmKHNob3dQb2ludHMpIHtcclxuICAgICAgcDUubm9TdHJva2UoKTtcclxuXHJcbiAgICAgIGlmKGludmVydENvbG9ycykge1xyXG4gICAgICAgIHA1LmZpbGwoNTApO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHA1LmZpbGwoMjAwKTtcclxuICAgICAgfVxyXG4gIFxyXG4gICAgICBmb3IobGV0IHBvaW50IG9mIHBvaW50cykge1xyXG4gICAgICAgIHA1LmVsbGlwc2UocG9pbnRbMF0sIHBvaW50WzFdLCA1KTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxufVxyXG5cclxuLy8gTGF1bmNoIHRoZSBza2V0Y2ggdXNpbmcgcDVqcyBpbiBpbnN0YW50aWF0ZWQgbW9kZVxyXG5uZXcgcDUoc2tldGNoKTsiLCJpbXBvcnQgRGVsYXVuYXRvciBmcm9tIFwiZGVsYXVuYXRvclwiO1xuaW1wb3J0IFBhdGggZnJvbSBcIi4vcGF0aC5qc1wiO1xuaW1wb3J0IFBvbHlnb24gZnJvbSBcIi4vcG9seWdvbi5qc1wiO1xuaW1wb3J0IFZvcm9ub2kgZnJvbSBcIi4vdm9yb25vaS5qc1wiO1xuXG5jb25zdCB0YXUgPSAyICogTWF0aC5QSTtcblxuZnVuY3Rpb24gcG9pbnRYKHApIHtcbiAgcmV0dXJuIHBbMF07XG59XG5cbmZ1bmN0aW9uIHBvaW50WShwKSB7XG4gIHJldHVybiBwWzFdO1xufVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBEZWxhdW5heSB7XG4gIGNvbnN0cnVjdG9yKHBvaW50cykge1xuICAgIGNvbnN0IHtoYWxmZWRnZXMsIGh1bGwsIHRyaWFuZ2xlc30gPSBuZXcgRGVsYXVuYXRvcihwb2ludHMpO1xuICAgIHRoaXMucG9pbnRzID0gcG9pbnRzO1xuICAgIHRoaXMuaGFsZmVkZ2VzID0gaGFsZmVkZ2VzO1xuICAgIHRoaXMuaHVsbCA9IGh1bGw7XG4gICAgdGhpcy50cmlhbmdsZXMgPSB0cmlhbmdsZXM7XG4gICAgY29uc3QgaW5lZGdlcyA9IHRoaXMuaW5lZGdlcyA9IG5ldyBJbnQzMkFycmF5KHBvaW50cy5sZW5ndGggLyAyKS5maWxsKC0xKTtcbiAgICBjb25zdCBvdXRlZGdlcyA9IHRoaXMub3V0ZWRnZXMgPSBuZXcgSW50MzJBcnJheShwb2ludHMubGVuZ3RoIC8gMikuZmlsbCgtMSk7XG5cbiAgICAvLyBDb21wdXRlIGFuIGluZGV4IGZyb20gZWFjaCBwb2ludCB0byBhbiAoYXJiaXRyYXJ5KSBpbmNvbWluZyBoYWxmZWRnZS5cbiAgICBmb3IgKGxldCBlID0gMCwgbiA9IGhhbGZlZGdlcy5sZW5ndGg7IGUgPCBuOyArK2UpIHtcbiAgICAgIGluZWRnZXNbdHJpYW5nbGVzW2UgJSAzID09PSAyID8gZSAtIDIgOiBlICsgMV1dID0gZTtcbiAgICB9XG5cbiAgICAvLyBGb3IgcG9pbnRzIG9uIHRoZSBodWxsLCBpbmRleCBib3RoIHRoZSBpbmNvbWluZyBhbmQgb3V0Z29pbmcgaGFsZmVkZ2VzLlxuICAgIGxldCBub2RlMCwgbm9kZTEgPSBodWxsO1xuICAgIGRvIHtcbiAgICAgIG5vZGUwID0gbm9kZTEsIG5vZGUxID0gbm9kZTEubmV4dDtcbiAgICAgIGluZWRnZXNbbm9kZTEuaV0gPSBub2RlMC50O1xuICAgICAgb3V0ZWRnZXNbbm9kZTAuaV0gPSBub2RlMS50O1xuICAgIH0gd2hpbGUgKG5vZGUxICE9PSBodWxsKTtcbiAgfVxuICB2b3Jvbm9pKGJvdW5kcykge1xuICAgIHJldHVybiBuZXcgVm9yb25vaSh0aGlzLCBib3VuZHMpO1xuICB9XG4gICpuZWlnaGJvcnMoaSkge1xuICAgIGNvbnN0IHtpbmVkZ2VzLCBvdXRlZGdlcywgaGFsZmVkZ2VzLCB0cmlhbmdsZXN9ID0gdGhpcztcbiAgICBjb25zdCBlMCA9IGluZWRnZXNbaV07XG4gICAgaWYgKGUwID09PSAtMSkgcmV0dXJuOyAvLyBjb2luY2lkZW50IHBvaW50XG4gICAgbGV0IGUgPSBlMDtcbiAgICBkbyB7XG4gICAgICB5aWVsZCB0cmlhbmdsZXNbZV07XG4gICAgICBlID0gZSAlIDMgPT09IDIgPyBlIC0gMiA6IGUgKyAxO1xuICAgICAgaWYgKHRyaWFuZ2xlc1tlXSAhPT0gaSkgcmV0dXJuOyAvLyBiYWQgdHJpYW5ndWxhdGlvblxuICAgICAgZSA9IGhhbGZlZGdlc1tlXTtcbiAgICAgIGlmIChlID09PSAtMSkgcmV0dXJuIHlpZWxkIHRyaWFuZ2xlc1tvdXRlZGdlc1tpXV07XG4gICAgfSB3aGlsZSAoZSAhPT0gZTApO1xuICB9XG4gIGZpbmQoeCwgeSwgaSA9IDApIHtcbiAgICBpZiAoKHggPSAreCwgeCAhPT0geCkgfHwgKHkgPSAreSwgeSAhPT0geSkpIHJldHVybiAtMTtcbiAgICBsZXQgYztcbiAgICB3aGlsZSAoKGMgPSB0aGlzLl9zdGVwKGksIHgsIHkpKSA+PSAwICYmIGMgIT09IGkpIGkgPSBjO1xuICAgIHJldHVybiBjO1xuICB9XG4gIF9zdGVwKGksIHgsIHkpIHtcbiAgICBjb25zdCB7aW5lZGdlcywgcG9pbnRzfSA9IHRoaXM7XG4gICAgaWYgKGluZWRnZXNbaV0gPT09IC0xKSByZXR1cm4gLTE7IC8vIGNvaW5jaWRlbnQgcG9pbnRcbiAgICBsZXQgYyA9IGk7XG4gICAgbGV0IGRjID0gKHggLSBwb2ludHNbaSAqIDJdKSAqKiAyICsgKHkgLSBwb2ludHNbaSAqIDIgKyAxXSkgKiogMjtcbiAgICBmb3IgKGNvbnN0IHQgb2YgdGhpcy5uZWlnaGJvcnMoaSkpIHtcbiAgICAgIGNvbnN0IGR0ID0gKHggLSBwb2ludHNbdCAqIDJdKSAqKiAyICsgKHkgLSBwb2ludHNbdCAqIDIgKyAxXSkgKiogMjtcbiAgICAgIGlmIChkdCA8IGRjKSBkYyA9IGR0LCBjID0gdDtcbiAgICB9XG4gICAgcmV0dXJuIGM7XG4gIH1cbiAgcmVuZGVyKGNvbnRleHQpIHtcbiAgICBjb25zdCBidWZmZXIgPSBjb250ZXh0ID09IG51bGwgPyBjb250ZXh0ID0gbmV3IFBhdGggOiB1bmRlZmluZWQ7XG4gICAgY29uc3Qge3BvaW50cywgaGFsZmVkZ2VzLCB0cmlhbmdsZXN9ID0gdGhpcztcbiAgICBmb3IgKGxldCBpID0gMCwgbiA9IGhhbGZlZGdlcy5sZW5ndGg7IGkgPCBuOyArK2kpIHtcbiAgICAgIGNvbnN0IGogPSBoYWxmZWRnZXNbaV07XG4gICAgICBpZiAoaiA8IGkpIGNvbnRpbnVlO1xuICAgICAgY29uc3QgdGkgPSB0cmlhbmdsZXNbaV0gKiAyO1xuICAgICAgY29uc3QgdGogPSB0cmlhbmdsZXNbal0gKiAyO1xuICAgICAgY29udGV4dC5tb3ZlVG8ocG9pbnRzW3RpXSwgcG9pbnRzW3RpICsgMV0pO1xuICAgICAgY29udGV4dC5saW5lVG8ocG9pbnRzW3RqXSwgcG9pbnRzW3RqICsgMV0pO1xuICAgIH1cbiAgICB0aGlzLnJlbmRlckh1bGwoY29udGV4dCk7XG4gICAgcmV0dXJuIGJ1ZmZlciAmJiBidWZmZXIudmFsdWUoKTtcbiAgfVxuICByZW5kZXJQb2ludHMoY29udGV4dCwgciA9IDIpIHtcbiAgICBjb25zdCBidWZmZXIgPSBjb250ZXh0ID09IG51bGwgPyBjb250ZXh0ID0gbmV3IFBhdGggOiB1bmRlZmluZWQ7XG4gICAgY29uc3Qge3BvaW50c30gPSB0aGlzO1xuICAgIGZvciAobGV0IGkgPSAwLCBuID0gcG9pbnRzLmxlbmd0aDsgaSA8IG47IGkgKz0gMikge1xuICAgICAgY29uc3QgeCA9IHBvaW50c1tpXSwgeSA9IHBvaW50c1tpICsgMV07XG4gICAgICBjb250ZXh0Lm1vdmVUbyh4ICsgciwgeSk7XG4gICAgICBjb250ZXh0LmFyYyh4LCB5LCByLCAwLCB0YXUpO1xuICAgIH1cbiAgICByZXR1cm4gYnVmZmVyICYmIGJ1ZmZlci52YWx1ZSgpO1xuICB9XG4gIHJlbmRlckh1bGwoY29udGV4dCkge1xuICAgIGNvbnN0IGJ1ZmZlciA9IGNvbnRleHQgPT0gbnVsbCA/IGNvbnRleHQgPSBuZXcgUGF0aCA6IHVuZGVmaW5lZDtcbiAgICBjb25zdCB7aHVsbH0gPSB0aGlzO1xuICAgIGxldCBub2RlID0gaHVsbDtcbiAgICBjb250ZXh0Lm1vdmVUbyhub2RlLngsIG5vZGUueSk7XG4gICAgd2hpbGUgKG5vZGUgPSBub2RlLm5leHQsIG5vZGUgIT09IGh1bGwpIGNvbnRleHQubGluZVRvKG5vZGUueCwgbm9kZS55KTtcbiAgICBjb250ZXh0LmNsb3NlUGF0aCgpO1xuICAgIHJldHVybiBidWZmZXIgJiYgYnVmZmVyLnZhbHVlKCk7XG4gIH1cbiAgaHVsbFBvbHlnb24oKSB7XG4gICAgY29uc3QgcG9seWdvbiA9IG5ldyBQb2x5Z29uO1xuICAgIHRoaXMucmVuZGVySHVsbChwb2x5Z29uKTtcbiAgICByZXR1cm4gcG9seWdvbi52YWx1ZSgpO1xuICB9XG4gIHJlbmRlclRyaWFuZ2xlKGksIGNvbnRleHQpIHtcbiAgICBjb25zdCBidWZmZXIgPSBjb250ZXh0ID09IG51bGwgPyBjb250ZXh0ID0gbmV3IFBhdGggOiB1bmRlZmluZWQ7XG4gICAgY29uc3Qge3BvaW50cywgdHJpYW5nbGVzfSA9IHRoaXM7XG4gICAgY29uc3QgdDAgPSB0cmlhbmdsZXNbaSAqPSAzXSAqIDI7XG4gICAgY29uc3QgdDEgPSB0cmlhbmdsZXNbaSArIDFdICogMjtcbiAgICBjb25zdCB0MiA9IHRyaWFuZ2xlc1tpICsgMl0gKiAyO1xuICAgIGNvbnRleHQubW92ZVRvKHBvaW50c1t0MF0sIHBvaW50c1t0MCArIDFdKTtcbiAgICBjb250ZXh0LmxpbmVUbyhwb2ludHNbdDFdLCBwb2ludHNbdDEgKyAxXSk7XG4gICAgY29udGV4dC5saW5lVG8ocG9pbnRzW3QyXSwgcG9pbnRzW3QyICsgMV0pO1xuICAgIGNvbnRleHQuY2xvc2VQYXRoKCk7XG4gICAgcmV0dXJuIGJ1ZmZlciAmJiBidWZmZXIudmFsdWUoKTtcbiAgfVxuICAqdHJpYW5nbGVQb2x5Z29ucygpIHtcbiAgICBjb25zdCB7dHJpYW5nbGVzfSA9IHRoaXM7XG4gICAgZm9yIChsZXQgaSA9IDAsIG4gPSB0cmlhbmdsZXMubGVuZ3RoIC8gMzsgaSA8IG47ICsraSkge1xuICAgICAgeWllbGQgdGhpcy50cmlhbmdsZVBvbHlnb24oaSk7XG4gICAgfVxuICB9XG4gIHRyaWFuZ2xlUG9seWdvbihpKSB7XG4gICAgY29uc3QgcG9seWdvbiA9IG5ldyBQb2x5Z29uO1xuICAgIHRoaXMucmVuZGVyVHJpYW5nbGUoaSwgcG9seWdvbik7XG4gICAgcmV0dXJuIHBvbHlnb24udmFsdWUoKTtcbiAgfVxufVxuXG5EZWxhdW5heS5mcm9tID0gZnVuY3Rpb24ocG9pbnRzLCBmeCA9IHBvaW50WCwgZnkgPSBwb2ludFksIHRoYXQpIHtcbiAgcmV0dXJuIG5ldyBEZWxhdW5heShcImxlbmd0aFwiIGluIHBvaW50c1xuICAgICAgPyBmbGF0QXJyYXkocG9pbnRzLCBmeCwgZnksIHRoYXQpXG4gICAgICA6IEZsb2F0NjRBcnJheS5mcm9tKGZsYXRJdGVyYWJsZShwb2ludHMsIGZ4LCBmeSwgdGhhdCkpKTtcbn07XG5cbmZ1bmN0aW9uIGZsYXRBcnJheShwb2ludHMsIGZ4LCBmeSwgdGhhdCkge1xuICBjb25zdCBuID0gcG9pbnRzLmxlbmd0aDtcbiAgY29uc3QgYXJyYXkgPSBuZXcgRmxvYXQ2NEFycmF5KG4gKiAyKTtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBuOyArK2kpIHtcbiAgICBjb25zdCBwID0gcG9pbnRzW2ldO1xuICAgIGFycmF5W2kgKiAyXSA9IGZ4LmNhbGwodGhhdCwgcCwgaSwgcG9pbnRzKTtcbiAgICBhcnJheVtpICogMiArIDFdID0gZnkuY2FsbCh0aGF0LCBwLCBpLCBwb2ludHMpO1xuICB9XG4gIHJldHVybiBhcnJheTtcbn1cblxuZnVuY3Rpb24qIGZsYXRJdGVyYWJsZShwb2ludHMsIGZ4LCBmeSwgdGhhdCkge1xuICBsZXQgaSA9IDA7XG4gIGZvciAoY29uc3QgcCBvZiBwb2ludHMpIHtcbiAgICB5aWVsZCBmeC5jYWxsKHRoYXQsIHAsIGksIHBvaW50cyk7XG4gICAgeWllbGQgZnkuY2FsbCh0aGF0LCBwLCBpLCBwb2ludHMpO1xuICAgICsraTtcbiAgfVxufVxuIiwiZXhwb3J0IHtkZWZhdWx0IGFzIERlbGF1bmF5fSBmcm9tIFwiLi9kZWxhdW5heS5qc1wiO1xuZXhwb3J0IHtkZWZhdWx0IGFzIFZvcm9ub2l9IGZyb20gXCIuL3Zvcm9ub2kuanNcIjtcbiIsImNvbnN0IGVwc2lsb24gPSAxZS02O1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQYXRoIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5feDAgPSB0aGlzLl95MCA9IC8vIHN0YXJ0IG9mIGN1cnJlbnQgc3VicGF0aFxuICAgIHRoaXMuX3gxID0gdGhpcy5feTEgPSBudWxsOyAvLyBlbmQgb2YgY3VycmVudCBzdWJwYXRoXG4gICAgdGhpcy5fID0gXCJcIjtcbiAgfVxuICBtb3ZlVG8oeCwgeSkge1xuICAgIHRoaXMuXyArPSBgTSR7dGhpcy5feDAgPSB0aGlzLl94MSA9ICt4fSwke3RoaXMuX3kwID0gdGhpcy5feTEgPSAreX1gO1xuICB9XG4gIGNsb3NlUGF0aCgpIHtcbiAgICBpZiAodGhpcy5feDEgIT09IG51bGwpIHtcbiAgICAgIHRoaXMuX3gxID0gdGhpcy5feDAsIHRoaXMuX3kxID0gdGhpcy5feTA7XG4gICAgICB0aGlzLl8gKz0gXCJaXCI7XG4gICAgfVxuICB9XG4gIGxpbmVUbyh4LCB5KSB7XG4gICAgdGhpcy5fICs9IGBMJHt0aGlzLl94MSA9ICt4fSwke3RoaXMuX3kxID0gK3l9YDtcbiAgfVxuICBhcmMoeCwgeSwgcikge1xuICAgIHggPSAreCwgeSA9ICt5LCByID0gK3I7XG4gICAgY29uc3QgeDAgPSB4ICsgcjtcbiAgICBjb25zdCB5MCA9IHk7XG4gICAgaWYgKHIgPCAwKSB0aHJvdyBuZXcgRXJyb3IoXCJuZWdhdGl2ZSByYWRpdXNcIik7XG4gICAgaWYgKHRoaXMuX3gxID09PSBudWxsKSB0aGlzLl8gKz0gYE0ke3gwfSwke3kwfWA7XG4gICAgZWxzZSBpZiAoTWF0aC5hYnModGhpcy5feDEgLSB4MCkgPiBlcHNpbG9uIHx8IE1hdGguYWJzKHRoaXMuX3kxIC0geTApID4gZXBzaWxvbikgdGhpcy5fICs9IFwiTFwiICsgeDAgKyBcIixcIiArIHkwO1xuICAgIGlmICghcikgcmV0dXJuO1xuICAgIHRoaXMuXyArPSBgQSR7cn0sJHtyfSwwLDEsMSwke3ggLSByfSwke3l9QSR7cn0sJHtyfSwwLDEsMSwke3RoaXMuX3gxID0geDB9LCR7dGhpcy5feTEgPSB5MH1gO1xuICB9XG4gIHJlY3QoeCwgeSwgdywgaCkge1xuICAgIHRoaXMuXyArPSBgTSR7dGhpcy5feDAgPSB0aGlzLl94MSA9ICt4fSwke3RoaXMuX3kwID0gdGhpcy5feTEgPSAreX1oJHsrd312JHsraH1oJHstd31aYDtcbiAgfVxuICB2YWx1ZSgpIHtcbiAgICByZXR1cm4gdGhpcy5fIHx8IG51bGw7XG4gIH1cbn1cbiIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIFBvbHlnb24ge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLl8gPSBbXTtcbiAgfVxuICBtb3ZlVG8oeCwgeSkge1xuICAgIHRoaXMuXy5wdXNoKFt4LCB5XSk7XG4gIH1cbiAgY2xvc2VQYXRoKCkge1xuICAgIHRoaXMuXy5wdXNoKHRoaXMuX1swXS5zbGljZSgpKTtcbiAgfVxuICBsaW5lVG8oeCwgeSkge1xuICAgIHRoaXMuXy5wdXNoKFt4LCB5XSk7XG4gIH1cbiAgdmFsdWUoKSB7XG4gICAgcmV0dXJuIHRoaXMuXy5sZW5ndGggPyB0aGlzLl8gOiBudWxsO1xuICB9XG59XG4iLCJpbXBvcnQgUGF0aCBmcm9tIFwiLi9wYXRoLmpzXCI7XG5pbXBvcnQgUG9seWdvbiBmcm9tIFwiLi9wb2x5Z29uLmpzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFZvcm9ub2kge1xuICBjb25zdHJ1Y3RvcihkZWxhdW5heSwgW3htaW4sIHltaW4sIHhtYXgsIHltYXhdID0gWzAsIDAsIDk2MCwgNTAwXSkge1xuICAgIGlmICghKCh4bWF4ID0gK3htYXgpID49ICh4bWluID0gK3htaW4pKSB8fCAhKCh5bWF4ID0gK3ltYXgpID49ICh5bWluID0gK3ltaW4pKSkgdGhyb3cgbmV3IEVycm9yKFwiaW52YWxpZCBib3VuZHNcIik7XG4gICAgY29uc3Qge3BvaW50cywgaHVsbCwgdHJpYW5nbGVzfSA9IHRoaXMuZGVsYXVuYXkgPSBkZWxhdW5heTtcbiAgICBjb25zdCBjaXJjdW1jZW50ZXJzID0gdGhpcy5jaXJjdW1jZW50ZXJzID0gbmV3IEZsb2F0NjRBcnJheSh0cmlhbmdsZXMubGVuZ3RoIC8gMyAqIDIpO1xuICAgIGNvbnN0IHZlY3RvcnMgPSB0aGlzLnZlY3RvcnMgPSBuZXcgRmxvYXQ2NEFycmF5KHBvaW50cy5sZW5ndGggKiAyKTtcbiAgICB0aGlzLnhtYXggPSB4bWF4LCB0aGlzLnhtaW4gPSB4bWluO1xuICAgIHRoaXMueW1heCA9IHltYXgsIHRoaXMueW1pbiA9IHltaW47XG5cbiAgICAvLyBDb21wdXRlIGNpcmN1bWNlbnRlcnMuXG4gICAgZm9yIChsZXQgaSA9IDAsIGogPSAwLCBuID0gdHJpYW5nbGVzLmxlbmd0aDsgaSA8IG47IGkgKz0gMywgaiArPSAyKSB7XG4gICAgICBjb25zdCB0MSA9IHRyaWFuZ2xlc1tpXSAqIDI7XG4gICAgICBjb25zdCB0MiA9IHRyaWFuZ2xlc1tpICsgMV0gKiAyO1xuICAgICAgY29uc3QgdDMgPSB0cmlhbmdsZXNbaSArIDJdICogMjtcbiAgICAgIGNvbnN0IHgxID0gcG9pbnRzW3QxXTtcbiAgICAgIGNvbnN0IHkxID0gcG9pbnRzW3QxICsgMV07XG4gICAgICBjb25zdCB4MiA9IHBvaW50c1t0Ml07XG4gICAgICBjb25zdCB5MiA9IHBvaW50c1t0MiArIDFdO1xuICAgICAgY29uc3QgeDMgPSBwb2ludHNbdDNdO1xuICAgICAgY29uc3QgeTMgPSBwb2ludHNbdDMgKyAxXTtcbiAgICAgIGNvbnN0IGEyID0geDEgLSB4MjtcbiAgICAgIGNvbnN0IGEzID0geDEgLSB4MztcbiAgICAgIGNvbnN0IGIyID0geTEgLSB5MjtcbiAgICAgIGNvbnN0IGIzID0geTEgLSB5MztcbiAgICAgIGNvbnN0IGQxID0geDEgKiB4MSArIHkxICogeTE7XG4gICAgICBjb25zdCBkMiA9IGQxIC0geDIgKiB4MiAtIHkyICogeTI7XG4gICAgICBjb25zdCBkMyA9IGQxIC0geDMgKiB4MyAtIHkzICogeTM7XG4gICAgICBjb25zdCBhYiA9IChhMyAqIGIyIC0gYTIgKiBiMykgKiAyO1xuICAgICAgY2lyY3VtY2VudGVyc1tqXSA9IChiMiAqIGQzIC0gYjMgKiBkMikgLyBhYjtcbiAgICAgIGNpcmN1bWNlbnRlcnNbaiArIDFdID0gKGEzICogZDIgLSBhMiAqIGQzKSAvIGFiO1xuICAgIH1cblxuICAgIC8vIENvbXB1dGUgZXh0ZXJpb3IgY2VsbCByYXlzLlxuICAgIGxldCBub2RlID0gaHVsbDtcbiAgICBsZXQgcDAsIHAxID0gbm9kZS5pICogNDtcbiAgICBsZXQgeDAsIHgxID0gbm9kZS54O1xuICAgIGxldCB5MCwgeTEgPSBub2RlLnk7XG4gICAgZG8ge1xuICAgICAgbm9kZSA9IG5vZGUubmV4dCwgcDAgPSBwMSwgeDAgPSB4MSwgeTAgPSB5MSwgcDEgPSBub2RlLmkgKiA0LCB4MSA9IG5vZGUueCwgeTEgPSBub2RlLnk7XG4gICAgICB2ZWN0b3JzW3AwICsgMl0gPSB2ZWN0b3JzW3AxXSA9IHkwIC0geTE7XG4gICAgICB2ZWN0b3JzW3AwICsgM10gPSB2ZWN0b3JzW3AxICsgMV0gPSB4MSAtIHgwO1xuICAgIH0gd2hpbGUgKG5vZGUgIT09IGh1bGwpO1xuICB9XG4gIHJlbmRlcihjb250ZXh0KSB7XG4gICAgY29uc3QgYnVmZmVyID0gY29udGV4dCA9PSBudWxsID8gY29udGV4dCA9IG5ldyBQYXRoIDogdW5kZWZpbmVkO1xuICAgIGNvbnN0IHtkZWxhdW5heToge2hhbGZlZGdlcywgaHVsbH0sIGNpcmN1bWNlbnRlcnMsIHZlY3RvcnN9ID0gdGhpcztcbiAgICBmb3IgKGxldCBpID0gMCwgbiA9IGhhbGZlZGdlcy5sZW5ndGg7IGkgPCBuOyArK2kpIHtcbiAgICAgIGNvbnN0IGogPSBoYWxmZWRnZXNbaV07XG4gICAgICBpZiAoaiA8IGkpIGNvbnRpbnVlO1xuICAgICAgY29uc3QgdGkgPSBNYXRoLmZsb29yKGkgLyAzKSAqIDI7XG4gICAgICBjb25zdCB0aiA9IE1hdGguZmxvb3IoaiAvIDMpICogMjtcbiAgICAgIGNvbnN0IHhpID0gY2lyY3VtY2VudGVyc1t0aV07XG4gICAgICBjb25zdCB5aSA9IGNpcmN1bWNlbnRlcnNbdGkgKyAxXTtcbiAgICAgIGNvbnN0IHhqID0gY2lyY3VtY2VudGVyc1t0al07XG4gICAgICBjb25zdCB5aiA9IGNpcmN1bWNlbnRlcnNbdGogKyAxXTtcbiAgICAgIHRoaXMuX3JlbmRlclNlZ21lbnQoeGksIHlpLCB4aiwgeWosIGNvbnRleHQpO1xuICAgIH1cbiAgICBsZXQgbm9kZSA9IGh1bGw7XG4gICAgZG8ge1xuICAgICAgbm9kZSA9IG5vZGUubmV4dDtcbiAgICAgIGNvbnN0IHQgPSBNYXRoLmZsb29yKG5vZGUudCAvIDMpICogMjtcbiAgICAgIGNvbnN0IHggPSBjaXJjdW1jZW50ZXJzW3RdO1xuICAgICAgY29uc3QgeSA9IGNpcmN1bWNlbnRlcnNbdCArIDFdO1xuICAgICAgY29uc3QgdiA9IG5vZGUuaSAqIDQ7XG4gICAgICBjb25zdCBwID0gdGhpcy5fcHJvamVjdCh4LCB5LCB2ZWN0b3JzW3YgKyAyXSwgdmVjdG9yc1t2ICsgM10pO1xuICAgICAgaWYgKHApIHRoaXMuX3JlbmRlclNlZ21lbnQoeCwgeSwgcFswXSwgcFsxXSwgY29udGV4dCk7XG4gICAgfSB3aGlsZSAobm9kZSAhPT0gaHVsbCk7XG4gICAgcmV0dXJuIGJ1ZmZlciAmJiBidWZmZXIudmFsdWUoKTtcbiAgfVxuICByZW5kZXJCb3VuZHMoY29udGV4dCkge1xuICAgIGNvbnN0IGJ1ZmZlciA9IGNvbnRleHQgPT0gbnVsbCA/IGNvbnRleHQgPSBuZXcgUGF0aCA6IHVuZGVmaW5lZDtcbiAgICBjb250ZXh0LnJlY3QodGhpcy54bWluLCB0aGlzLnltaW4sIHRoaXMueG1heCAtIHRoaXMueG1pbiwgdGhpcy55bWF4IC0gdGhpcy55bWluKTtcbiAgICByZXR1cm4gYnVmZmVyICYmIGJ1ZmZlci52YWx1ZSgpO1xuICB9XG4gIHJlbmRlckNlbGwoaSwgY29udGV4dCkge1xuICAgIGNvbnN0IGJ1ZmZlciA9IGNvbnRleHQgPT0gbnVsbCA/IGNvbnRleHQgPSBuZXcgUGF0aCA6IHVuZGVmaW5lZDtcbiAgICBjb25zdCBwb2ludHMgPSB0aGlzLl9jbGlwKGkpO1xuICAgIGlmIChwb2ludHMgPT09IG51bGwpIHJldHVybjtcbiAgICBjb250ZXh0Lm1vdmVUbyhwb2ludHNbMF0sIHBvaW50c1sxXSk7XG4gICAgZm9yIChsZXQgaSA9IDIsIG4gPSBwb2ludHMubGVuZ3RoOyBpIDwgbjsgaSArPSAyKSB7XG4gICAgICBjb250ZXh0LmxpbmVUbyhwb2ludHNbaV0sIHBvaW50c1tpICsgMV0pO1xuICAgIH1cbiAgICBjb250ZXh0LmNsb3NlUGF0aCgpO1xuICAgIHJldHVybiBidWZmZXIgJiYgYnVmZmVyLnZhbHVlKCk7XG4gIH1cbiAgKmNlbGxQb2x5Z29ucygpIHtcbiAgICBjb25zdCB7ZGVsYXVuYXk6IHtwb2ludHN9fSA9IHRoaXM7XG4gICAgZm9yIChsZXQgaSA9IDAsIG4gPSBwb2ludHMubGVuZ3RoIC8gMjsgaSA8IG47ICsraSkge1xuICAgICAgY29uc3QgY2VsbCA9IHRoaXMuY2VsbFBvbHlnb24oaSk7XG4gICAgICBpZiAoY2VsbCkgeWllbGQgY2VsbDtcbiAgICB9XG4gIH1cbiAgY2VsbFBvbHlnb24oaSkge1xuICAgIGNvbnN0IHBvbHlnb24gPSBuZXcgUG9seWdvbjtcbiAgICB0aGlzLnJlbmRlckNlbGwoaSwgcG9seWdvbik7XG4gICAgcmV0dXJuIHBvbHlnb24udmFsdWUoKTtcbiAgfVxuICBfcmVuZGVyU2VnbWVudCh4MCwgeTAsIHgxLCB5MSwgY29udGV4dCkge1xuICAgIGxldCBTO1xuICAgIGNvbnN0IGMwID0gdGhpcy5fcmVnaW9uY29kZSh4MCwgeTApO1xuICAgIGNvbnN0IGMxID0gdGhpcy5fcmVnaW9uY29kZSh4MSwgeTEpO1xuICAgIGlmIChjMCA9PT0gMCAmJiBjMSA9PT0gMCkge1xuICAgICAgY29udGV4dC5tb3ZlVG8oeDAsIHkwKTtcbiAgICAgIGNvbnRleHQubGluZVRvKHgxLCB5MSk7XG4gICAgfSBlbHNlIGlmIChTID0gdGhpcy5fY2xpcFNlZ21lbnQoeDAsIHkwLCB4MSwgeTEsIGMwLCBjMSkpIHtcbiAgICAgIGNvbnRleHQubW92ZVRvKFNbMF0sIFNbMV0pO1xuICAgICAgY29udGV4dC5saW5lVG8oU1syXSwgU1szXSk7XG4gICAgfVxuICB9XG4gIGNvbnRhaW5zKGksIHgsIHkpIHtcbiAgICBpZiAoKHggPSAreCwgeCAhPT0geCkgfHwgKHkgPSAreSwgeSAhPT0geSkpIHJldHVybiBmYWxzZTtcbiAgICByZXR1cm4gdGhpcy5kZWxhdW5heS5fc3RlcChpLCB4LCB5KSA9PT0gaTtcbiAgfVxuICBfY2VsbChpKSB7XG4gICAgY29uc3Qge2NpcmN1bWNlbnRlcnMsIGRlbGF1bmF5OiB7aW5lZGdlcywgaGFsZmVkZ2VzLCB0cmlhbmdsZXN9fSA9IHRoaXM7XG4gICAgY29uc3QgZTAgPSBpbmVkZ2VzW2ldO1xuICAgIGlmIChlMCA9PT0gLTEpIHJldHVybiBudWxsOyAvLyBjb2luY2lkZW50IHBvaW50XG4gICAgY29uc3QgcG9pbnRzID0gW107XG4gICAgbGV0IGUgPSBlMDtcbiAgICBkbyB7XG4gICAgICBjb25zdCB0ID0gTWF0aC5mbG9vcihlIC8gMyk7XG4gICAgICBwb2ludHMucHVzaChjaXJjdW1jZW50ZXJzW3QgKiAyXSwgY2lyY3VtY2VudGVyc1t0ICogMiArIDFdKTtcbiAgICAgIGUgPSBlICUgMyA9PT0gMiA/IGUgLSAyIDogZSArIDE7XG4gICAgICBpZiAodHJpYW5nbGVzW2VdICE9PSBpKSBicmVhazsgLy8gYmFkIHRyaWFuZ3VsYXRpb25cbiAgICAgIGUgPSBoYWxmZWRnZXNbZV07XG4gICAgfSB3aGlsZSAoZSAhPT0gZTAgJiYgZSAhPT0gLTEpO1xuICAgIHJldHVybiBwb2ludHM7XG4gIH1cbiAgX2NsaXAoaSkge1xuICAgIGNvbnN0IHBvaW50cyA9IHRoaXMuX2NlbGwoaSk7XG4gICAgaWYgKHBvaW50cyA9PT0gbnVsbCkgcmV0dXJuIG51bGw7XG4gICAgY29uc3Qge3ZlY3RvcnM6IFZ9ID0gdGhpcztcbiAgICBjb25zdCB2ID0gaSAqIDQ7XG4gICAgcmV0dXJuIFZbdl0gfHwgVlt2ICsgMV1cbiAgICAgICAgPyB0aGlzLl9jbGlwSW5maW5pdGUoaSwgcG9pbnRzLCBWW3ZdLCBWW3YgKyAxXSwgVlt2ICsgMl0sIFZbdiArIDNdKVxuICAgICAgICA6IHRoaXMuX2NsaXBGaW5pdGUoaSwgcG9pbnRzKTtcbiAgfVxuICBfY2xpcEZpbml0ZShpLCBwb2ludHMpIHtcbiAgICBjb25zdCBuID0gcG9pbnRzLmxlbmd0aDtcbiAgICBsZXQgUCA9IG51bGw7XG4gICAgbGV0IHgwLCB5MCwgeDEgPSBwb2ludHNbbiAtIDJdLCB5MSA9IHBvaW50c1tuIC0gMV07XG4gICAgbGV0IGMwLCBjMSA9IHRoaXMuX3JlZ2lvbmNvZGUoeDEsIHkxKTtcbiAgICBsZXQgZTAsIGUxO1xuICAgIGZvciAobGV0IGogPSAwOyBqIDwgbjsgaiArPSAyKSB7XG4gICAgICB4MCA9IHgxLCB5MCA9IHkxLCB4MSA9IHBvaW50c1tqXSwgeTEgPSBwb2ludHNbaiArIDFdO1xuICAgICAgYzAgPSBjMSwgYzEgPSB0aGlzLl9yZWdpb25jb2RlKHgxLCB5MSk7XG4gICAgICBpZiAoYzAgPT09IDAgJiYgYzEgPT09IDApIHtcbiAgICAgICAgZTAgPSBlMSwgZTEgPSAwO1xuICAgICAgICBpZiAoUCkgUC5wdXNoKHgxLCB5MSk7XG4gICAgICAgIGVsc2UgUCA9IFt4MSwgeTFdO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbGV0IFMsIHN4MCwgc3kwLCBzeDEsIHN5MTtcbiAgICAgICAgaWYgKGMwID09PSAwKSB7XG4gICAgICAgICAgaWYgKChTID0gdGhpcy5fY2xpcFNlZ21lbnQoeDAsIHkwLCB4MSwgeTEsIGMwLCBjMSkpID09PSBudWxsKSBjb250aW51ZTtcbiAgICAgICAgICBbc3gwLCBzeTAsIHN4MSwgc3kxXSA9IFM7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaWYgKChTID0gdGhpcy5fY2xpcFNlZ21lbnQoeDEsIHkxLCB4MCwgeTAsIGMxLCBjMCkpID09PSBudWxsKSBjb250aW51ZTtcbiAgICAgICAgICBbc3gxLCBzeTEsIHN4MCwgc3kwXSA9IFM7XG4gICAgICAgICAgZTAgPSBlMSwgZTEgPSB0aGlzLl9lZGdlY29kZShzeDAsIHN5MCk7XG4gICAgICAgICAgaWYgKGUwICYmIGUxKSB0aGlzLl9lZGdlKGksIGUwLCBlMSwgUCwgUC5sZW5ndGgpO1xuICAgICAgICAgIGlmIChQKSBQLnB1c2goc3gwLCBzeTApO1xuICAgICAgICAgIGVsc2UgUCA9IFtzeDAsIHN5MF07XG4gICAgICAgIH1cbiAgICAgICAgZTAgPSBlMSwgZTEgPSB0aGlzLl9lZGdlY29kZShzeDEsIHN5MSk7XG4gICAgICAgIGlmIChlMCAmJiBlMSkgdGhpcy5fZWRnZShpLCBlMCwgZTEsIFAsIFAubGVuZ3RoKTtcbiAgICAgICAgaWYgKFApIFAucHVzaChzeDEsIHN5MSk7XG4gICAgICAgIGVsc2UgUCA9IFtzeDEsIHN5MV07XG4gICAgICB9XG4gICAgfVxuICAgIGlmIChQKSB7XG4gICAgICBlMCA9IGUxLCBlMSA9IHRoaXMuX2VkZ2Vjb2RlKFBbMF0sIFBbMV0pO1xuICAgICAgaWYgKGUwICYmIGUxKSB0aGlzLl9lZGdlKGksIGUwLCBlMSwgUCwgUC5sZW5ndGgpO1xuICAgIH0gZWxzZSBpZiAodGhpcy5jb250YWlucyhpLCAodGhpcy54bWluICsgdGhpcy54bWF4KSAvIDIsICh0aGlzLnltaW4gKyB0aGlzLnltYXgpIC8gMikpIHtcbiAgICAgIHJldHVybiBbdGhpcy54bWF4LCB0aGlzLnltaW4sIHRoaXMueG1heCwgdGhpcy55bWF4LCB0aGlzLnhtaW4sIHRoaXMueW1heCwgdGhpcy54bWluLCB0aGlzLnltaW5dO1xuICAgIH1cbiAgICByZXR1cm4gUDtcbiAgfVxuICBfY2xpcFNlZ21lbnQoeDAsIHkwLCB4MSwgeTEsIGMwLCBjMSkge1xuICAgIHdoaWxlICh0cnVlKSB7XG4gICAgICBpZiAoYzAgPT09IDAgJiYgYzEgPT09IDApIHJldHVybiBbeDAsIHkwLCB4MSwgeTFdO1xuICAgICAgaWYgKGMwICYgYzEpIHJldHVybiBudWxsO1xuICAgICAgbGV0IHgsIHksIGMgPSBjMCB8fCBjMTtcbiAgICAgIGlmIChjICYgMGIxMDAwKSB4ID0geDAgKyAoeDEgLSB4MCkgKiAodGhpcy55bWF4IC0geTApIC8gKHkxIC0geTApLCB5ID0gdGhpcy55bWF4O1xuICAgICAgZWxzZSBpZiAoYyAmIDBiMDEwMCkgeCA9IHgwICsgKHgxIC0geDApICogKHRoaXMueW1pbiAtIHkwKSAvICh5MSAtIHkwKSwgeSA9IHRoaXMueW1pbjtcbiAgICAgIGVsc2UgaWYgKGMgJiAwYjAwMTApIHkgPSB5MCArICh5MSAtIHkwKSAqICh0aGlzLnhtYXggLSB4MCkgLyAoeDEgLSB4MCksIHggPSB0aGlzLnhtYXg7XG4gICAgICBlbHNlIHkgPSB5MCArICh5MSAtIHkwKSAqICh0aGlzLnhtaW4gLSB4MCkgLyAoeDEgLSB4MCksIHggPSB0aGlzLnhtaW47XG4gICAgICBpZiAoYzApIHgwID0geCwgeTAgPSB5LCBjMCA9IHRoaXMuX3JlZ2lvbmNvZGUoeDAsIHkwKTtcbiAgICAgIGVsc2UgeDEgPSB4LCB5MSA9IHksIGMxID0gdGhpcy5fcmVnaW9uY29kZSh4MSwgeTEpO1xuICAgIH1cbiAgfVxuICBfY2xpcEluZmluaXRlKGksIHBvaW50cywgdngwLCB2eTAsIHZ4biwgdnluKSB7XG4gICAgbGV0IFAgPSBBcnJheS5mcm9tKHBvaW50cyksIHA7XG4gICAgaWYgKHAgPSB0aGlzLl9wcm9qZWN0KFBbMF0sIFBbMV0sIHZ4MCwgdnkwKSkgUC51bnNoaWZ0KHBbMF0sIHBbMV0pO1xuICAgIGlmIChwID0gdGhpcy5fcHJvamVjdChQW1AubGVuZ3RoIC0gMl0sIFBbUC5sZW5ndGggLSAxXSwgdnhuLCB2eW4pKSBQLnB1c2gocFswXSwgcFsxXSk7XG4gICAgaWYgKFAgPSB0aGlzLl9jbGlwRmluaXRlKGksIFApKSB7XG4gICAgICBmb3IgKGxldCBqID0gMCwgbiA9IFAubGVuZ3RoLCBjMCwgYzEgPSB0aGlzLl9lZGdlY29kZShQW24gLSAyXSwgUFtuIC0gMV0pOyBqIDwgbjsgaiArPSAyKSB7XG4gICAgICAgIGMwID0gYzEsIGMxID0gdGhpcy5fZWRnZWNvZGUoUFtqXSwgUFtqICsgMV0pO1xuICAgICAgICBpZiAoYzAgJiYgYzEpIGogPSB0aGlzLl9lZGdlKGksIGMwLCBjMSwgUCwgaiksIG4gPSBQLmxlbmd0aDtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKHRoaXMuY29udGFpbnMoaSwgKHRoaXMueG1pbiArIHRoaXMueG1heCkgLyAyLCAodGhpcy55bWluICsgdGhpcy55bWF4KSAvIDIpKSB7XG4gICAgICBQID0gW3RoaXMueG1pbiwgdGhpcy55bWluLCB0aGlzLnhtYXgsIHRoaXMueW1pbiwgdGhpcy54bWF4LCB0aGlzLnltYXgsIHRoaXMueG1pbiwgdGhpcy55bWF4XTtcbiAgICB9XG4gICAgcmV0dXJuIFA7XG4gIH1cbiAgX2VkZ2UoaSwgZTAsIGUxLCBQLCBqKSB7XG4gICAgd2hpbGUgKGUwICE9PSBlMSkge1xuICAgICAgbGV0IHgsIHk7XG4gICAgICBzd2l0Y2ggKGUwKSB7XG4gICAgICAgIGNhc2UgMGIwMTAxOiBlMCA9IDBiMDEwMDsgY29udGludWU7IC8vIHRvcC1sZWZ0XG4gICAgICAgIGNhc2UgMGIwMTAwOiBlMCA9IDBiMDExMCwgeCA9IHRoaXMueG1heCwgeSA9IHRoaXMueW1pbjsgYnJlYWs7IC8vIHRvcFxuICAgICAgICBjYXNlIDBiMDExMDogZTAgPSAwYjAwMTA7IGNvbnRpbnVlOyAvLyB0b3AtcmlnaHRcbiAgICAgICAgY2FzZSAwYjAwMTA6IGUwID0gMGIxMDEwLCB4ID0gdGhpcy54bWF4LCB5ID0gdGhpcy55bWF4OyBicmVhazsgLy8gcmlnaHRcbiAgICAgICAgY2FzZSAwYjEwMTA6IGUwID0gMGIxMDAwOyBjb250aW51ZTsgLy8gYm90dG9tLXJpZ2h0XG4gICAgICAgIGNhc2UgMGIxMDAwOiBlMCA9IDBiMTAwMSwgeCA9IHRoaXMueG1pbiwgeSA9IHRoaXMueW1heDsgYnJlYWs7IC8vIGJvdHRvbVxuICAgICAgICBjYXNlIDBiMTAwMTogZTAgPSAwYjAwMDE7IGNvbnRpbnVlOyAvLyBib3R0b20tbGVmdFxuICAgICAgICBjYXNlIDBiMDAwMTogZTAgPSAwYjAxMDEsIHggPSB0aGlzLnhtaW4sIHkgPSB0aGlzLnltaW47IGJyZWFrOyAvLyBsZWZ0XG4gICAgICB9XG4gICAgICBpZiAoKFBbal0gIT09IHggfHwgUFtqICsgMV0gIT09IHkpICYmIHRoaXMuY29udGFpbnMoaSwgeCwgeSkpIHtcbiAgICAgICAgUC5zcGxpY2UoaiwgMCwgeCwgeSksIGogKz0gMjtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGo7XG4gIH1cbiAgX3Byb2plY3QoeDAsIHkwLCB2eCwgdnkpIHtcbiAgICBsZXQgdCA9IEluZmluaXR5LCBjLCB4LCB5O1xuICAgIGlmICh2eSA8IDApIHsgLy8gdG9wXG4gICAgICBpZiAoeTAgPD0gdGhpcy55bWluKSByZXR1cm4gbnVsbDtcbiAgICAgIGlmICgoYyA9ICh0aGlzLnltaW4gLSB5MCkgLyB2eSkgPCB0KSB5ID0gdGhpcy55bWluLCB4ID0geDAgKyAodCA9IGMpICogdng7XG4gICAgfSBlbHNlIGlmICh2eSA+IDApIHsgLy8gYm90dG9tXG4gICAgICBpZiAoeTAgPj0gdGhpcy55bWF4KSByZXR1cm4gbnVsbDtcbiAgICAgIGlmICgoYyA9ICh0aGlzLnltYXggLSB5MCkgLyB2eSkgPCB0KSB5ID0gdGhpcy55bWF4LCB4ID0geDAgKyAodCA9IGMpICogdng7XG4gICAgfVxuICAgIGlmICh2eCA+IDApIHsgLy8gcmlnaHRcbiAgICAgIGlmICh4MCA+PSB0aGlzLnhtYXgpIHJldHVybiBudWxsO1xuICAgICAgaWYgKChjID0gKHRoaXMueG1heCAtIHgwKSAvIHZ4KSA8IHQpIHggPSB0aGlzLnhtYXgsIHkgPSB5MCArICh0ID0gYykgKiB2eTtcbiAgICB9IGVsc2UgaWYgKHZ4IDwgMCkgeyAvLyBsZWZ0XG4gICAgICBpZiAoeDAgPD0gdGhpcy54bWluKSByZXR1cm4gbnVsbDtcbiAgICAgIGlmICgoYyA9ICh0aGlzLnhtaW4gLSB4MCkgLyB2eCkgPCB0KSB4ID0gdGhpcy54bWluLCB5ID0geTAgKyAodCA9IGMpICogdnk7XG4gICAgfVxuICAgIHJldHVybiBbeCwgeV07XG4gIH1cbiAgX2VkZ2Vjb2RlKHgsIHkpIHtcbiAgICByZXR1cm4gKHggPT09IHRoaXMueG1pbiA/IDBiMDAwMVxuICAgICAgICA6IHggPT09IHRoaXMueG1heCA/IDBiMDAxMCA6IDBiMDAwMClcbiAgICAgICAgfCAoeSA9PT0gdGhpcy55bWluID8gMGIwMTAwXG4gICAgICAgIDogeSA9PT0gdGhpcy55bWF4ID8gMGIxMDAwIDogMGIwMDAwKTtcbiAgfVxuICBfcmVnaW9uY29kZSh4LCB5KSB7XG4gICAgcmV0dXJuICh4IDwgdGhpcy54bWluID8gMGIwMDAxXG4gICAgICAgIDogeCA+IHRoaXMueG1heCA/IDBiMDAxMCA6IDBiMDAwMClcbiAgICAgICAgfCAoeSA8IHRoaXMueW1pbiA/IDBiMDEwMFxuICAgICAgICA6IHkgPiB0aGlzLnltYXggPyAwYjEwMDAgOiAwYjAwMDApO1xuICB9XG59XG4iLCJcbmNvbnN0IEVQU0lMT04gPSBNYXRoLnBvdygyLCAtNTIpO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBEZWxhdW5hdG9yIHtcblxuICAgIHN0YXRpYyBmcm9tKHBvaW50cywgZ2V0WCwgZ2V0WSkge1xuICAgICAgICBpZiAoIWdldFgpIGdldFggPSBkZWZhdWx0R2V0WDtcbiAgICAgICAgaWYgKCFnZXRZKSBnZXRZID0gZGVmYXVsdEdldFk7XG5cbiAgICAgICAgY29uc3QgbiA9IHBvaW50cy5sZW5ndGg7XG4gICAgICAgIGNvbnN0IGNvb3JkcyA9IG5ldyBGbG9hdDY0QXJyYXkobiAqIDIpO1xuXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbjsgaSsrKSB7XG4gICAgICAgICAgICBjb25zdCBwID0gcG9pbnRzW2ldO1xuICAgICAgICAgICAgY29vcmRzWzIgKiBpXSA9IGdldFgocCk7XG4gICAgICAgICAgICBjb29yZHNbMiAqIGkgKyAxXSA9IGdldFkocCk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gbmV3IERlbGF1bmF0b3IoY29vcmRzKTtcbiAgICB9XG5cbiAgICBjb25zdHJ1Y3Rvcihjb29yZHMpIHtcbiAgICAgICAgbGV0IG1pblggPSBJbmZpbml0eTtcbiAgICAgICAgbGV0IG1pblkgPSBJbmZpbml0eTtcbiAgICAgICAgbGV0IG1heFggPSAtSW5maW5pdHk7XG4gICAgICAgIGxldCBtYXhZID0gLUluZmluaXR5O1xuXG4gICAgICAgIGNvbnN0IG4gPSBjb29yZHMubGVuZ3RoID4+IDE7XG4gICAgICAgIGNvbnN0IGlkcyA9IHRoaXMuaWRzID0gbmV3IFVpbnQzMkFycmF5KG4pO1xuXG4gICAgICAgIGlmIChuID4gMCAmJiB0eXBlb2YgY29vcmRzWzBdICE9PSAnbnVtYmVyJykgdGhyb3cgbmV3IEVycm9yKCdFeHBlY3RlZCBjb29yZHMgdG8gY29udGFpbiBudW1iZXJzLicpO1xuXG4gICAgICAgIHRoaXMuY29vcmRzID0gY29vcmRzO1xuXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbjsgaSsrKSB7XG4gICAgICAgICAgICBjb25zdCB4ID0gY29vcmRzWzIgKiBpXTtcbiAgICAgICAgICAgIGNvbnN0IHkgPSBjb29yZHNbMiAqIGkgKyAxXTtcbiAgICAgICAgICAgIGlmICh4IDwgbWluWCkgbWluWCA9IHg7XG4gICAgICAgICAgICBpZiAoeSA8IG1pblkpIG1pblkgPSB5O1xuICAgICAgICAgICAgaWYgKHggPiBtYXhYKSBtYXhYID0geDtcbiAgICAgICAgICAgIGlmICh5ID4gbWF4WSkgbWF4WSA9IHk7XG4gICAgICAgICAgICBpZHNbaV0gPSBpO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgY3ggPSAobWluWCArIG1heFgpIC8gMjtcbiAgICAgICAgY29uc3QgY3kgPSAobWluWSArIG1heFkpIC8gMjtcblxuICAgICAgICBsZXQgbWluRGlzdCA9IEluZmluaXR5O1xuICAgICAgICBsZXQgaTAsIGkxLCBpMjtcblxuICAgICAgICAvLyBwaWNrIGEgc2VlZCBwb2ludCBjbG9zZSB0byB0aGUgY2VudHJvaWRcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBuOyBpKyspIHtcbiAgICAgICAgICAgIGNvbnN0IGQgPSBkaXN0KGN4LCBjeSwgY29vcmRzWzIgKiBpXSwgY29vcmRzWzIgKiBpICsgMV0pO1xuICAgICAgICAgICAgaWYgKGQgPCBtaW5EaXN0KSB7XG4gICAgICAgICAgICAgICAgaTAgPSBpO1xuICAgICAgICAgICAgICAgIG1pbkRpc3QgPSBkO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGkweCA9IGNvb3Jkc1syICogaTBdO1xuICAgICAgICBjb25zdCBpMHkgPSBjb29yZHNbMiAqIGkwICsgMV07XG5cbiAgICAgICAgbWluRGlzdCA9IEluZmluaXR5O1xuXG4gICAgICAgIC8vIGZpbmQgdGhlIHBvaW50IGNsb3Nlc3QgdG8gdGhlIHNlZWRcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBuOyBpKyspIHtcbiAgICAgICAgICAgIGlmIChpID09PSBpMCkgY29udGludWU7XG4gICAgICAgICAgICBjb25zdCBkID0gZGlzdChpMHgsIGkweSwgY29vcmRzWzIgKiBpXSwgY29vcmRzWzIgKiBpICsgMV0pO1xuICAgICAgICAgICAgaWYgKGQgPCBtaW5EaXN0ICYmIGQgPiAwKSB7XG4gICAgICAgICAgICAgICAgaTEgPSBpO1xuICAgICAgICAgICAgICAgIG1pbkRpc3QgPSBkO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGxldCBpMXggPSBjb29yZHNbMiAqIGkxXTtcbiAgICAgICAgbGV0IGkxeSA9IGNvb3Jkc1syICogaTEgKyAxXTtcblxuICAgICAgICBsZXQgbWluUmFkaXVzID0gSW5maW5pdHk7XG5cbiAgICAgICAgLy8gZmluZCB0aGUgdGhpcmQgcG9pbnQgd2hpY2ggZm9ybXMgdGhlIHNtYWxsZXN0IGNpcmN1bWNpcmNsZSB3aXRoIHRoZSBmaXJzdCB0d29cbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBuOyBpKyspIHtcbiAgICAgICAgICAgIGlmIChpID09PSBpMCB8fCBpID09PSBpMSkgY29udGludWU7XG4gICAgICAgICAgICBjb25zdCByID0gY2lyY3VtcmFkaXVzKGkweCwgaTB5LCBpMXgsIGkxeSwgY29vcmRzWzIgKiBpXSwgY29vcmRzWzIgKiBpICsgMV0pO1xuICAgICAgICAgICAgaWYgKHIgPCBtaW5SYWRpdXMpIHtcbiAgICAgICAgICAgICAgICBpMiA9IGk7XG4gICAgICAgICAgICAgICAgbWluUmFkaXVzID0gcjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBsZXQgaTJ4ID0gY29vcmRzWzIgKiBpMl07XG4gICAgICAgIGxldCBpMnkgPSBjb29yZHNbMiAqIGkyICsgMV07XG5cbiAgICAgICAgaWYgKG1pblJhZGl1cyA9PT0gSW5maW5pdHkpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignTm8gRGVsYXVuYXkgdHJpYW5ndWxhdGlvbiBleGlzdHMgZm9yIHRoaXMgaW5wdXQuJyk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBzd2FwIHRoZSBvcmRlciBvZiB0aGUgc2VlZCBwb2ludHMgZm9yIGNvdW50ZXItY2xvY2t3aXNlIG9yaWVudGF0aW9uXG4gICAgICAgIGlmIChvcmllbnQoaTB4LCBpMHksIGkxeCwgaTF5LCBpMngsIGkyeSkpIHtcbiAgICAgICAgICAgIGNvbnN0IGkgPSBpMTtcbiAgICAgICAgICAgIGNvbnN0IHggPSBpMXg7XG4gICAgICAgICAgICBjb25zdCB5ID0gaTF5O1xuICAgICAgICAgICAgaTEgPSBpMjtcbiAgICAgICAgICAgIGkxeCA9IGkyeDtcbiAgICAgICAgICAgIGkxeSA9IGkyeTtcbiAgICAgICAgICAgIGkyID0gaTtcbiAgICAgICAgICAgIGkyeCA9IHg7XG4gICAgICAgICAgICBpMnkgPSB5O1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgY2VudGVyID0gY2lyY3VtY2VudGVyKGkweCwgaTB5LCBpMXgsIGkxeSwgaTJ4LCBpMnkpO1xuICAgICAgICB0aGlzLl9jeCA9IGNlbnRlci54O1xuICAgICAgICB0aGlzLl9jeSA9IGNlbnRlci55O1xuXG4gICAgICAgIC8vIHNvcnQgdGhlIHBvaW50cyBieSBkaXN0YW5jZSBmcm9tIHRoZSBzZWVkIHRyaWFuZ2xlIGNpcmN1bWNlbnRlclxuICAgICAgICBxdWlja3NvcnQoaWRzLCBjb29yZHMsIDAsIGlkcy5sZW5ndGggLSAxLCBjZW50ZXIueCwgY2VudGVyLnkpO1xuXG4gICAgICAgIC8vIGluaXRpYWxpemUgYSBoYXNoIHRhYmxlIGZvciBzdG9yaW5nIGVkZ2VzIG9mIHRoZSBhZHZhbmNpbmcgY29udmV4IGh1bGxcbiAgICAgICAgdGhpcy5faGFzaFNpemUgPSBNYXRoLmNlaWwoTWF0aC5zcXJ0KG4pKTtcbiAgICAgICAgdGhpcy5faGFzaCA9IG5ldyBBcnJheSh0aGlzLl9oYXNoU2l6ZSk7XG5cbiAgICAgICAgLy8gaW5pdGlhbGl6ZSBhIGNpcmN1bGFyIGRvdWJseS1saW5rZWQgbGlzdCB0aGF0IHdpbGwgaG9sZCBhbiBhZHZhbmNpbmcgY29udmV4IGh1bGxcbiAgICAgICAgbGV0IGUgPSB0aGlzLmh1bGwgPSBpbnNlcnROb2RlKGNvb3JkcywgaTApO1xuICAgICAgICB0aGlzLl9oYXNoRWRnZShlKTtcbiAgICAgICAgZS50ID0gMDtcbiAgICAgICAgZSA9IGluc2VydE5vZGUoY29vcmRzLCBpMSwgZSk7XG4gICAgICAgIHRoaXMuX2hhc2hFZGdlKGUpO1xuICAgICAgICBlLnQgPSAxO1xuICAgICAgICBlID0gaW5zZXJ0Tm9kZShjb29yZHMsIGkyLCBlKTtcbiAgICAgICAgdGhpcy5faGFzaEVkZ2UoZSk7XG4gICAgICAgIGUudCA9IDI7XG5cbiAgICAgICAgY29uc3QgbWF4VHJpYW5nbGVzID0gMiAqIG4gLSA1O1xuICAgICAgICBjb25zdCB0cmlhbmdsZXMgPSB0aGlzLnRyaWFuZ2xlcyA9IG5ldyBVaW50MzJBcnJheShtYXhUcmlhbmdsZXMgKiAzKTtcbiAgICAgICAgY29uc3QgaGFsZmVkZ2VzID0gdGhpcy5oYWxmZWRnZXMgPSBuZXcgSW50MzJBcnJheShtYXhUcmlhbmdsZXMgKiAzKTtcblxuICAgICAgICB0aGlzLnRyaWFuZ2xlc0xlbiA9IDA7XG5cbiAgICAgICAgdGhpcy5fYWRkVHJpYW5nbGUoaTAsIGkxLCBpMiwgLTEsIC0xLCAtMSk7XG5cbiAgICAgICAgZm9yIChsZXQgayA9IDAsIHhwLCB5cDsgayA8IGlkcy5sZW5ndGg7IGsrKykge1xuICAgICAgICAgICAgY29uc3QgaSA9IGlkc1trXTtcbiAgICAgICAgICAgIGNvbnN0IHggPSBjb29yZHNbMiAqIGldO1xuICAgICAgICAgICAgY29uc3QgeSA9IGNvb3Jkc1syICogaSArIDFdO1xuXG4gICAgICAgICAgICAvLyBza2lwIG5lYXItZHVwbGljYXRlIHBvaW50c1xuICAgICAgICAgICAgaWYgKGsgPiAwICYmIE1hdGguYWJzKHggLSB4cCkgPD0gRVBTSUxPTiAmJiBNYXRoLmFicyh5IC0geXApIDw9IEVQU0lMT04pIGNvbnRpbnVlO1xuICAgICAgICAgICAgeHAgPSB4O1xuICAgICAgICAgICAgeXAgPSB5O1xuXG4gICAgICAgICAgICAvLyBza2lwIHNlZWQgdHJpYW5nbGUgcG9pbnRzXG4gICAgICAgICAgICBpZiAoaSA9PT0gaTAgfHwgaSA9PT0gaTEgfHwgaSA9PT0gaTIpIGNvbnRpbnVlO1xuXG4gICAgICAgICAgICAvLyBmaW5kIGEgdmlzaWJsZSBlZGdlIG9uIHRoZSBjb252ZXggaHVsbCB1c2luZyBlZGdlIGhhc2hcbiAgICAgICAgICAgIGNvbnN0IHN0YXJ0S2V5ID0gdGhpcy5faGFzaEtleSh4LCB5KTtcbiAgICAgICAgICAgIGxldCBrZXkgPSBzdGFydEtleTtcbiAgICAgICAgICAgIGxldCBzdGFydDtcbiAgICAgICAgICAgIGRvIHtcbiAgICAgICAgICAgICAgICBzdGFydCA9IHRoaXMuX2hhc2hba2V5XTtcbiAgICAgICAgICAgICAgICBrZXkgPSAoa2V5ICsgMSkgJSB0aGlzLl9oYXNoU2l6ZTtcbiAgICAgICAgICAgIH0gd2hpbGUgKCghc3RhcnQgfHwgc3RhcnQucmVtb3ZlZCkgJiYga2V5ICE9PSBzdGFydEtleSk7XG5cbiAgICAgICAgICAgIHN0YXJ0ID0gc3RhcnQucHJldjtcbiAgICAgICAgICAgIGUgPSBzdGFydDtcbiAgICAgICAgICAgIHdoaWxlICghb3JpZW50KHgsIHksIGUueCwgZS55LCBlLm5leHQueCwgZS5uZXh0LnkpKSB7XG4gICAgICAgICAgICAgICAgZSA9IGUubmV4dDtcbiAgICAgICAgICAgICAgICBpZiAoZSA9PT0gc3RhcnQpIHtcbiAgICAgICAgICAgICAgICAgICAgZSA9IG51bGw7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIGxpa2VseSBhIG5lYXItZHVwbGljYXRlIHBvaW50OyBza2lwIGl0XG4gICAgICAgICAgICBpZiAoIWUpIGNvbnRpbnVlO1xuXG4gICAgICAgICAgICBjb25zdCB3YWxrQmFjayA9IGUgPT09IHN0YXJ0O1xuXG4gICAgICAgICAgICAvLyBhZGQgdGhlIGZpcnN0IHRyaWFuZ2xlIGZyb20gdGhlIHBvaW50XG4gICAgICAgICAgICBsZXQgdCA9IHRoaXMuX2FkZFRyaWFuZ2xlKGUuaSwgaSwgZS5uZXh0LmksIC0xLCAtMSwgZS50KTtcblxuICAgICAgICAgICAgZS50ID0gdDsgLy8ga2VlcCB0cmFjayBvZiBib3VuZGFyeSB0cmlhbmdsZXMgb24gdGhlIGh1bGxcbiAgICAgICAgICAgIGUgPSBpbnNlcnROb2RlKGNvb3JkcywgaSwgZSk7XG5cbiAgICAgICAgICAgIC8vIHJlY3Vyc2l2ZWx5IGZsaXAgdHJpYW5nbGVzIGZyb20gdGhlIHBvaW50IHVudGlsIHRoZXkgc2F0aXNmeSB0aGUgRGVsYXVuYXkgY29uZGl0aW9uXG4gICAgICAgICAgICBlLnQgPSB0aGlzLl9sZWdhbGl6ZSh0ICsgMik7XG5cbiAgICAgICAgICAgIC8vIHdhbGsgZm9yd2FyZCB0aHJvdWdoIHRoZSBodWxsLCBhZGRpbmcgbW9yZSB0cmlhbmdsZXMgYW5kIGZsaXBwaW5nIHJlY3Vyc2l2ZWx5XG4gICAgICAgICAgICBsZXQgcSA9IGUubmV4dDtcbiAgICAgICAgICAgIHdoaWxlIChvcmllbnQoeCwgeSwgcS54LCBxLnksIHEubmV4dC54LCBxLm5leHQueSkpIHtcbiAgICAgICAgICAgICAgICB0ID0gdGhpcy5fYWRkVHJpYW5nbGUocS5pLCBpLCBxLm5leHQuaSwgcS5wcmV2LnQsIC0xLCBxLnQpO1xuICAgICAgICAgICAgICAgIHEucHJldi50ID0gdGhpcy5fbGVnYWxpemUodCArIDIpO1xuICAgICAgICAgICAgICAgIHRoaXMuaHVsbCA9IHJlbW92ZU5vZGUocSk7XG4gICAgICAgICAgICAgICAgcSA9IHEubmV4dDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHdhbGtCYWNrKSB7XG4gICAgICAgICAgICAgICAgLy8gd2FsayBiYWNrd2FyZCBmcm9tIHRoZSBvdGhlciBzaWRlLCBhZGRpbmcgbW9yZSB0cmlhbmdsZXMgYW5kIGZsaXBwaW5nXG4gICAgICAgICAgICAgICAgcSA9IGUucHJldjtcbiAgICAgICAgICAgICAgICB3aGlsZSAob3JpZW50KHgsIHksIHEucHJldi54LCBxLnByZXYueSwgcS54LCBxLnkpKSB7XG4gICAgICAgICAgICAgICAgICAgIHQgPSB0aGlzLl9hZGRUcmlhbmdsZShxLnByZXYuaSwgaSwgcS5pLCAtMSwgcS50LCBxLnByZXYudCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2xlZ2FsaXplKHQgKyAyKTtcbiAgICAgICAgICAgICAgICAgICAgcS5wcmV2LnQgPSB0O1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmh1bGwgPSByZW1vdmVOb2RlKHEpO1xuICAgICAgICAgICAgICAgICAgICBxID0gcS5wcmV2O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gc2F2ZSB0aGUgdHdvIG5ldyBlZGdlcyBpbiB0aGUgaGFzaCB0YWJsZVxuICAgICAgICAgICAgdGhpcy5faGFzaEVkZ2UoZSk7XG4gICAgICAgICAgICB0aGlzLl9oYXNoRWRnZShlLnByZXYpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gdHJpbSB0eXBlZCB0cmlhbmdsZSBtZXNoIGFycmF5c1xuICAgICAgICB0aGlzLnRyaWFuZ2xlcyA9IHRyaWFuZ2xlcy5zdWJhcnJheSgwLCB0aGlzLnRyaWFuZ2xlc0xlbik7XG4gICAgICAgIHRoaXMuaGFsZmVkZ2VzID0gaGFsZmVkZ2VzLnN1YmFycmF5KDAsIHRoaXMudHJpYW5nbGVzTGVuKTtcbiAgICB9XG5cbiAgICBfaGFzaEVkZ2UoZSkge1xuICAgICAgICB0aGlzLl9oYXNoW3RoaXMuX2hhc2hLZXkoZS54LCBlLnkpXSA9IGU7XG4gICAgfVxuXG4gICAgX2hhc2hLZXkoeCwgeSkge1xuICAgICAgICByZXR1cm4gTWF0aC5mbG9vcihwc2V1ZG9BbmdsZSh4IC0gdGhpcy5fY3gsIHkgLSB0aGlzLl9jeSkgKiB0aGlzLl9oYXNoU2l6ZSkgJSB0aGlzLl9oYXNoU2l6ZTtcbiAgICB9XG5cbiAgICBfbGVnYWxpemUoYSkge1xuICAgICAgICBjb25zdCB7dHJpYW5nbGVzLCBjb29yZHMsIGhhbGZlZGdlc30gPSB0aGlzO1xuXG4gICAgICAgIGNvbnN0IGIgPSBoYWxmZWRnZXNbYV07XG5cbiAgICAgICAgLyogaWYgdGhlIHBhaXIgb2YgdHJpYW5nbGVzIGRvZXNuJ3Qgc2F0aXNmeSB0aGUgRGVsYXVuYXkgY29uZGl0aW9uXG4gICAgICAgICAqIChwMSBpcyBpbnNpZGUgdGhlIGNpcmN1bWNpcmNsZSBvZiBbcDAsIHBsLCBwcl0pLCBmbGlwIHRoZW0sXG4gICAgICAgICAqIHRoZW4gZG8gdGhlIHNhbWUgY2hlY2svZmxpcCByZWN1cnNpdmVseSBmb3IgdGhlIG5ldyBwYWlyIG9mIHRyaWFuZ2xlc1xuICAgICAgICAgKlxuICAgICAgICAgKiAgICAgICAgICAgcGwgICAgICAgICAgICAgICAgICAgIHBsXG4gICAgICAgICAqICAgICAgICAgIC98fFxcICAgICAgICAgICAgICAgICAgLyAgXFxcbiAgICAgICAgICogICAgICAgYWwvIHx8IFxcYmwgICAgICAgICAgICBhbC8gICAgXFxhXG4gICAgICAgICAqICAgICAgICAvICB8fCAgXFwgICAgICAgICAgICAgIC8gICAgICBcXFxuICAgICAgICAgKiAgICAgICAvICBhfHxiICBcXCAgICBmbGlwICAgIC9fX19hcl9fX1xcXG4gICAgICAgICAqICAgICBwMFxcICAgfHwgICAvcDEgICA9PiAgIHAwXFwtLS1ibC0tLS9wMVxuICAgICAgICAgKiAgICAgICAgXFwgIHx8ICAvICAgICAgICAgICAgICBcXCAgICAgIC9cbiAgICAgICAgICogICAgICAgYXJcXCB8fCAvYnIgICAgICAgICAgICAgYlxcICAgIC9iclxuICAgICAgICAgKiAgICAgICAgICBcXHx8LyAgICAgICAgICAgICAgICAgIFxcICAvXG4gICAgICAgICAqICAgICAgICAgICBwciAgICAgICAgICAgICAgICAgICAgcHJcbiAgICAgICAgICovXG4gICAgICAgIGNvbnN0IGEwID0gYSAtIGEgJSAzO1xuICAgICAgICBjb25zdCBiMCA9IGIgLSBiICUgMztcblxuICAgICAgICBjb25zdCBhbCA9IGEwICsgKGEgKyAxKSAlIDM7XG4gICAgICAgIGNvbnN0IGFyID0gYTAgKyAoYSArIDIpICUgMztcbiAgICAgICAgY29uc3QgYmwgPSBiMCArIChiICsgMikgJSAzO1xuXG4gICAgICAgIGlmIChiID09PSAtMSkgcmV0dXJuIGFyO1xuXG4gICAgICAgIGNvbnN0IHAwID0gdHJpYW5nbGVzW2FyXTtcbiAgICAgICAgY29uc3QgcHIgPSB0cmlhbmdsZXNbYV07XG4gICAgICAgIGNvbnN0IHBsID0gdHJpYW5nbGVzW2FsXTtcbiAgICAgICAgY29uc3QgcDEgPSB0cmlhbmdsZXNbYmxdO1xuXG4gICAgICAgIGNvbnN0IGlsbGVnYWwgPSBpbkNpcmNsZShcbiAgICAgICAgICAgIGNvb3Jkc1syICogcDBdLCBjb29yZHNbMiAqIHAwICsgMV0sXG4gICAgICAgICAgICBjb29yZHNbMiAqIHByXSwgY29vcmRzWzIgKiBwciArIDFdLFxuICAgICAgICAgICAgY29vcmRzWzIgKiBwbF0sIGNvb3Jkc1syICogcGwgKyAxXSxcbiAgICAgICAgICAgIGNvb3Jkc1syICogcDFdLCBjb29yZHNbMiAqIHAxICsgMV0pO1xuXG4gICAgICAgIGlmIChpbGxlZ2FsKSB7XG4gICAgICAgICAgICB0cmlhbmdsZXNbYV0gPSBwMTtcbiAgICAgICAgICAgIHRyaWFuZ2xlc1tiXSA9IHAwO1xuXG4gICAgICAgICAgICBjb25zdCBoYmwgPSBoYWxmZWRnZXNbYmxdO1xuXG4gICAgICAgICAgICAvLyBlZGdlIHN3YXBwZWQgb24gdGhlIG90aGVyIHNpZGUgb2YgdGhlIGh1bGwgKHJhcmUpOyBmaXggdGhlIGhhbGZlZGdlIHJlZmVyZW5jZVxuICAgICAgICAgICAgaWYgKGhibCA9PT0gLTEpIHtcbiAgICAgICAgICAgICAgICBsZXQgZSA9IHRoaXMuaHVsbDtcbiAgICAgICAgICAgICAgICBkbyB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChlLnQgPT09IGJsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBlLnQgPSBhO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZSA9IGUubmV4dDtcbiAgICAgICAgICAgICAgICB9IHdoaWxlIChlICE9PSB0aGlzLmh1bGwpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5fbGluayhhLCBoYmwpO1xuICAgICAgICAgICAgdGhpcy5fbGluayhiLCBoYWxmZWRnZXNbYXJdKTtcbiAgICAgICAgICAgIHRoaXMuX2xpbmsoYXIsIGJsKTtcblxuICAgICAgICAgICAgY29uc3QgYnIgPSBiMCArIChiICsgMSkgJSAzO1xuXG4gICAgICAgICAgICB0aGlzLl9sZWdhbGl6ZShhKTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9sZWdhbGl6ZShicik7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gYXI7XG4gICAgfVxuXG4gICAgX2xpbmsoYSwgYikge1xuICAgICAgICB0aGlzLmhhbGZlZGdlc1thXSA9IGI7XG4gICAgICAgIGlmIChiICE9PSAtMSkgdGhpcy5oYWxmZWRnZXNbYl0gPSBhO1xuICAgIH1cblxuICAgIC8vIGFkZCBhIG5ldyB0cmlhbmdsZSBnaXZlbiB2ZXJ0ZXggaW5kaWNlcyBhbmQgYWRqYWNlbnQgaGFsZi1lZGdlIGlkc1xuICAgIF9hZGRUcmlhbmdsZShpMCwgaTEsIGkyLCBhLCBiLCBjKSB7XG4gICAgICAgIGNvbnN0IHQgPSB0aGlzLnRyaWFuZ2xlc0xlbjtcblxuICAgICAgICB0aGlzLnRyaWFuZ2xlc1t0XSA9IGkwO1xuICAgICAgICB0aGlzLnRyaWFuZ2xlc1t0ICsgMV0gPSBpMTtcbiAgICAgICAgdGhpcy50cmlhbmdsZXNbdCArIDJdID0gaTI7XG5cbiAgICAgICAgdGhpcy5fbGluayh0LCBhKTtcbiAgICAgICAgdGhpcy5fbGluayh0ICsgMSwgYik7XG4gICAgICAgIHRoaXMuX2xpbmsodCArIDIsIGMpO1xuXG4gICAgICAgIHRoaXMudHJpYW5nbGVzTGVuICs9IDM7XG5cbiAgICAgICAgcmV0dXJuIHQ7XG4gICAgfVxufVxuXG4vLyBtb25vdG9uaWNhbGx5IGluY3JlYXNlcyB3aXRoIHJlYWwgYW5nbGUsIGJ1dCBkb2Vzbid0IG5lZWQgZXhwZW5zaXZlIHRyaWdvbm9tZXRyeVxuZnVuY3Rpb24gcHNldWRvQW5nbGUoZHgsIGR5KSB7XG4gICAgY29uc3QgcCA9IGR4IC8gKE1hdGguYWJzKGR4KSArIE1hdGguYWJzKGR5KSk7XG4gICAgcmV0dXJuIChkeSA+IDAgPyAzIC0gcCA6IDEgKyBwKSAvIDQ7IC8vIFswLi4xXVxufVxuXG5mdW5jdGlvbiBkaXN0KGF4LCBheSwgYngsIGJ5KSB7XG4gICAgY29uc3QgZHggPSBheCAtIGJ4O1xuICAgIGNvbnN0IGR5ID0gYXkgLSBieTtcbiAgICByZXR1cm4gZHggKiBkeCArIGR5ICogZHk7XG59XG5cbmZ1bmN0aW9uIG9yaWVudChweCwgcHksIHF4LCBxeSwgcngsIHJ5KSB7XG4gICAgcmV0dXJuIChxeSAtIHB5KSAqIChyeCAtIHF4KSAtIChxeCAtIHB4KSAqIChyeSAtIHF5KSA8IDA7XG59XG5cbmZ1bmN0aW9uIGluQ2lyY2xlKGF4LCBheSwgYngsIGJ5LCBjeCwgY3ksIHB4LCBweSkge1xuICAgIGNvbnN0IGR4ID0gYXggLSBweDtcbiAgICBjb25zdCBkeSA9IGF5IC0gcHk7XG4gICAgY29uc3QgZXggPSBieCAtIHB4O1xuICAgIGNvbnN0IGV5ID0gYnkgLSBweTtcbiAgICBjb25zdCBmeCA9IGN4IC0gcHg7XG4gICAgY29uc3QgZnkgPSBjeSAtIHB5O1xuXG4gICAgY29uc3QgYXAgPSBkeCAqIGR4ICsgZHkgKiBkeTtcbiAgICBjb25zdCBicCA9IGV4ICogZXggKyBleSAqIGV5O1xuICAgIGNvbnN0IGNwID0gZnggKiBmeCArIGZ5ICogZnk7XG5cbiAgICByZXR1cm4gZHggKiAoZXkgKiBjcCAtIGJwICogZnkpIC1cbiAgICAgICAgICAgZHkgKiAoZXggKiBjcCAtIGJwICogZngpICtcbiAgICAgICAgICAgYXAgKiAoZXggKiBmeSAtIGV5ICogZngpIDwgMDtcbn1cblxuZnVuY3Rpb24gY2lyY3VtcmFkaXVzKGF4LCBheSwgYngsIGJ5LCBjeCwgY3kpIHtcbiAgICBjb25zdCBkeCA9IGJ4IC0gYXg7XG4gICAgY29uc3QgZHkgPSBieSAtIGF5O1xuICAgIGNvbnN0IGV4ID0gY3ggLSBheDtcbiAgICBjb25zdCBleSA9IGN5IC0gYXk7XG5cbiAgICBjb25zdCBibCA9IGR4ICogZHggKyBkeSAqIGR5O1xuICAgIGNvbnN0IGNsID0gZXggKiBleCArIGV5ICogZXk7XG4gICAgY29uc3QgZCA9IGR4ICogZXkgLSBkeSAqIGV4O1xuXG4gICAgY29uc3QgeCA9IChleSAqIGJsIC0gZHkgKiBjbCkgKiAwLjUgLyBkO1xuICAgIGNvbnN0IHkgPSAoZHggKiBjbCAtIGV4ICogYmwpICogMC41IC8gZDtcblxuICAgIHJldHVybiBibCAmJiBjbCAmJiBkICYmICh4ICogeCArIHkgKiB5KSB8fCBJbmZpbml0eTtcbn1cblxuZnVuY3Rpb24gY2lyY3VtY2VudGVyKGF4LCBheSwgYngsIGJ5LCBjeCwgY3kpIHtcbiAgICBjb25zdCBkeCA9IGJ4IC0gYXg7XG4gICAgY29uc3QgZHkgPSBieSAtIGF5O1xuICAgIGNvbnN0IGV4ID0gY3ggLSBheDtcbiAgICBjb25zdCBleSA9IGN5IC0gYXk7XG5cbiAgICBjb25zdCBibCA9IGR4ICogZHggKyBkeSAqIGR5O1xuICAgIGNvbnN0IGNsID0gZXggKiBleCArIGV5ICogZXk7XG4gICAgY29uc3QgZCA9IGR4ICogZXkgLSBkeSAqIGV4O1xuXG4gICAgY29uc3QgeCA9IGF4ICsgKGV5ICogYmwgLSBkeSAqIGNsKSAqIDAuNSAvIGQ7XG4gICAgY29uc3QgeSA9IGF5ICsgKGR4ICogY2wgLSBleCAqIGJsKSAqIDAuNSAvIGQ7XG5cbiAgICByZXR1cm4ge3gsIHl9O1xufVxuXG4vLyBjcmVhdGUgYSBuZXcgbm9kZSBpbiBhIGRvdWJseSBsaW5rZWQgbGlzdFxuZnVuY3Rpb24gaW5zZXJ0Tm9kZShjb29yZHMsIGksIHByZXYpIHtcbiAgICBjb25zdCBub2RlID0ge1xuICAgICAgICBpLFxuICAgICAgICB4OiBjb29yZHNbMiAqIGldLFxuICAgICAgICB5OiBjb29yZHNbMiAqIGkgKyAxXSxcbiAgICAgICAgdDogMCxcbiAgICAgICAgcHJldjogbnVsbCxcbiAgICAgICAgbmV4dDogbnVsbCxcbiAgICAgICAgcmVtb3ZlZDogZmFsc2VcbiAgICB9O1xuXG4gICAgaWYgKCFwcmV2KSB7XG4gICAgICAgIG5vZGUucHJldiA9IG5vZGU7XG4gICAgICAgIG5vZGUubmV4dCA9IG5vZGU7XG5cbiAgICB9IGVsc2Uge1xuICAgICAgICBub2RlLm5leHQgPSBwcmV2Lm5leHQ7XG4gICAgICAgIG5vZGUucHJldiA9IHByZXY7XG4gICAgICAgIHByZXYubmV4dC5wcmV2ID0gbm9kZTtcbiAgICAgICAgcHJldi5uZXh0ID0gbm9kZTtcbiAgICB9XG4gICAgcmV0dXJuIG5vZGU7XG59XG5cbmZ1bmN0aW9uIHJlbW92ZU5vZGUobm9kZSkge1xuICAgIG5vZGUucHJldi5uZXh0ID0gbm9kZS5uZXh0O1xuICAgIG5vZGUubmV4dC5wcmV2ID0gbm9kZS5wcmV2O1xuICAgIG5vZGUucmVtb3ZlZCA9IHRydWU7XG4gICAgcmV0dXJuIG5vZGUucHJldjtcbn1cblxuZnVuY3Rpb24gcXVpY2tzb3J0KGlkcywgY29vcmRzLCBsZWZ0LCByaWdodCwgY3gsIGN5KSB7XG4gICAgbGV0IGksIGosIHRlbXA7XG5cbiAgICBpZiAocmlnaHQgLSBsZWZ0IDw9IDIwKSB7XG4gICAgICAgIGZvciAoaSA9IGxlZnQgKyAxOyBpIDw9IHJpZ2h0OyBpKyspIHtcbiAgICAgICAgICAgIHRlbXAgPSBpZHNbaV07XG4gICAgICAgICAgICBqID0gaSAtIDE7XG4gICAgICAgICAgICB3aGlsZSAoaiA+PSBsZWZ0ICYmIGNvbXBhcmUoY29vcmRzLCBpZHNbal0sIHRlbXAsIGN4LCBjeSkgPiAwKSBpZHNbaiArIDFdID0gaWRzW2otLV07XG4gICAgICAgICAgICBpZHNbaiArIDFdID0gdGVtcDtcbiAgICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnN0IG1lZGlhbiA9IChsZWZ0ICsgcmlnaHQpID4+IDE7XG4gICAgICAgIGkgPSBsZWZ0ICsgMTtcbiAgICAgICAgaiA9IHJpZ2h0O1xuICAgICAgICBzd2FwKGlkcywgbWVkaWFuLCBpKTtcbiAgICAgICAgaWYgKGNvbXBhcmUoY29vcmRzLCBpZHNbbGVmdF0sIGlkc1tyaWdodF0sIGN4LCBjeSkgPiAwKSBzd2FwKGlkcywgbGVmdCwgcmlnaHQpO1xuICAgICAgICBpZiAoY29tcGFyZShjb29yZHMsIGlkc1tpXSwgaWRzW3JpZ2h0XSwgY3gsIGN5KSA+IDApIHN3YXAoaWRzLCBpLCByaWdodCk7XG4gICAgICAgIGlmIChjb21wYXJlKGNvb3JkcywgaWRzW2xlZnRdLCBpZHNbaV0sIGN4LCBjeSkgPiAwKSBzd2FwKGlkcywgbGVmdCwgaSk7XG5cbiAgICAgICAgdGVtcCA9IGlkc1tpXTtcbiAgICAgICAgd2hpbGUgKHRydWUpIHtcbiAgICAgICAgICAgIGRvIGkrKzsgd2hpbGUgKGNvbXBhcmUoY29vcmRzLCBpZHNbaV0sIHRlbXAsIGN4LCBjeSkgPCAwKTtcbiAgICAgICAgICAgIGRvIGotLTsgd2hpbGUgKGNvbXBhcmUoY29vcmRzLCBpZHNbal0sIHRlbXAsIGN4LCBjeSkgPiAwKTtcbiAgICAgICAgICAgIGlmIChqIDwgaSkgYnJlYWs7XG4gICAgICAgICAgICBzd2FwKGlkcywgaSwgaik7XG4gICAgICAgIH1cbiAgICAgICAgaWRzW2xlZnQgKyAxXSA9IGlkc1tqXTtcbiAgICAgICAgaWRzW2pdID0gdGVtcDtcblxuICAgICAgICBpZiAocmlnaHQgLSBpICsgMSA+PSBqIC0gbGVmdCkge1xuICAgICAgICAgICAgcXVpY2tzb3J0KGlkcywgY29vcmRzLCBpLCByaWdodCwgY3gsIGN5KTtcbiAgICAgICAgICAgIHF1aWNrc29ydChpZHMsIGNvb3JkcywgbGVmdCwgaiAtIDEsIGN4LCBjeSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBxdWlja3NvcnQoaWRzLCBjb29yZHMsIGxlZnQsIGogLSAxLCBjeCwgY3kpO1xuICAgICAgICAgICAgcXVpY2tzb3J0KGlkcywgY29vcmRzLCBpLCByaWdodCwgY3gsIGN5KTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuZnVuY3Rpb24gY29tcGFyZShjb29yZHMsIGksIGosIGN4LCBjeSkge1xuICAgIGNvbnN0IGQxID0gZGlzdChjb29yZHNbMiAqIGldLCBjb29yZHNbMiAqIGkgKyAxXSwgY3gsIGN5KTtcbiAgICBjb25zdCBkMiA9IGRpc3QoY29vcmRzWzIgKiBqXSwgY29vcmRzWzIgKiBqICsgMV0sIGN4LCBjeSk7XG4gICAgcmV0dXJuIChkMSAtIGQyKSB8fCAoY29vcmRzWzIgKiBpXSAtIGNvb3Jkc1syICogal0pIHx8IChjb29yZHNbMiAqIGkgKyAxXSAtIGNvb3Jkc1syICogaiArIDFdKTtcbn1cblxuZnVuY3Rpb24gc3dhcChhcnIsIGksIGopIHtcbiAgICBjb25zdCB0bXAgPSBhcnJbaV07XG4gICAgYXJyW2ldID0gYXJyW2pdO1xuICAgIGFycltqXSA9IHRtcDtcbn1cblxuZnVuY3Rpb24gZGVmYXVsdEdldFgocCkge1xuICAgIHJldHVybiBwWzBdO1xufVxuZnVuY3Rpb24gZGVmYXVsdEdldFkocCkge1xuICAgIHJldHVybiBwWzFdO1xufVxuIl0sInNvdXJjZVJvb3QiOiIifQ==