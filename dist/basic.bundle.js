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

const EVEN = 0,
  ODD = 1,
  ALTERNATING = 2,
  ANY = 3;
let ROW_TYPE = ALTERNATING;

let currentRowType = EVEN;

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

      case '1':
        ROW_TYPE = EVEN;
        generateNewShape();
        break;

      case '2':
        ROW_TYPE = ODD;
        generateNewShape();
        break;
      
      case '3':
        ROW_TYPE = ALTERNATING;
        generateNewShape();
        break;

      case '4':
        ROW_TYPE = ANY;
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
      let numPoints, range = [];

      // Rings near the center look better with fewer points
      if(i < 3) {
        range[0] = 3;
        range[1] = 10;
      } else {
        range[0] = 20;
        range[1] = 50;
      }

      // Generate a random number of points based on selected "row type"
      switch(ROW_TYPE) {
        case EVEN:
          numPoints = getRandomEvenNumber(range[0], range[1]);
          break;

        case ODD:
          numPoints = getRandomOddNumber(range[0], range[1]);
          break;

        case ALTERNATING:
          switch(currentRowType) {
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

      // Generate points arranged in a ring
      let newPoints = createPointsRing(window.innerWidth/2, window.innerHeight/2, lastRadius, numPoints);
      points = points.concat(newPoints);
      
      // Ensure next radius is larger than previous radius
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

  function getRandomEvenNumber(min, max) {
    let num = parseInt(p5.random(min, max));
    
    if(num % 2 > 0) {
      if(num - 1 < min) {
        num++;
      } else {
        num--;
      }
    }

    return num;
  }

  function getRandomOddNumber(min, max) {
    let num = parseInt(p5.random(min, max));
    
    if(num % 2 == 0) {
      if(num - 1 < min) {
        num++;
      } else {
        num--;
      }
    }

    return num;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vYmFzaWMvanMvZW50cnkuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2QzLWRlbGF1bmF5L3NyYy9kZWxhdW5heS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvZDMtZGVsYXVuYXkvc3JjL2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9kMy1kZWxhdW5heS9zcmMvcGF0aC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvZDMtZGVsYXVuYXkvc3JjL3BvbHlnb24uanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2QzLWRlbGF1bmF5L3NyYy92b3Jvbm9pLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9kZWxhdW5hdG9yL2luZGV4LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGtEQUEwQyxnQ0FBZ0M7QUFDMUU7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxnRUFBd0Qsa0JBQWtCO0FBQzFFO0FBQ0EseURBQWlELGNBQWM7QUFDL0Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlEQUF5QyxpQ0FBaUM7QUFDMUUsd0hBQWdILG1CQUFtQixFQUFFO0FBQ3JJO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7OztBQUdBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUNsRkE7QUFBQTtBQUF1Qzs7QUFFdkM7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUIsb0RBQVE7QUFDN0I7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSxrQkFBa0IsZUFBZTtBQUNqQztBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0Esa0JBQWtCLCtCQUErQjtBQUNqRDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7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QUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0EsZUFBZSw2QkFBNkI7O0FBRTVDOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBLGlFQUFpRTtBQUNqRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSx3Q0FBd0M7QUFDeEM7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBLFlBQVk7QUFDWjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSwwQkFBMEIsWUFBWTtBQUN0QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxtQkFBbUI7QUFDbkIsbUJBQW1CO0FBQ25CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJiYXNpYy5idW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL2Jhc2ljL2pzL2VudHJ5LmpzXCIpO1xuIiwiaW1wb3J0IHsgRGVsYXVuYXkgfSBmcm9tIFwiZDMtZGVsYXVuYXlcIjtcclxuXHJcbmxldCBzaG93UG9pbnRzID0gZmFsc2UsXHJcbiAgaW52ZXJ0Q29sb3JzID0gZmFsc2U7XHJcblxyXG5jb25zdCBFVkVOID0gMCxcclxuICBPREQgPSAxLFxyXG4gIEFMVEVSTkFUSU5HID0gMixcclxuICBBTlkgPSAzO1xyXG5sZXQgUk9XX1RZUEUgPSBBTFRFUk5BVElORztcclxuXHJcbmxldCBjdXJyZW50Um93VHlwZSA9IEVWRU47XHJcblxyXG5jb25zdCBza2V0Y2ggPSBmdW5jdGlvbiAocDUpIHtcclxuICAvKlxyXG4gICAgU2V0dXBcclxuICAgID09PT09XHJcbiAgKi9cclxuICBwNS5zZXR1cCA9IGZ1bmN0aW9uICgpIHtcclxuICAgIHA1LmNyZWF0ZUNhbnZhcyh3aW5kb3cuaW5uZXJXaWR0aCwgd2luZG93LmlubmVySGVpZ2h0KTtcclxuICAgIGdlbmVyYXRlTmV3U2hhcGUoKTtcclxuICB9XHJcblxyXG4gIC8qXHJcbiAgICBEcmF3XHJcbiAgICA9PT09XHJcbiAgKi9cclxuICBwNS5kcmF3ID0gZnVuY3Rpb24gKCkge31cclxuXHJcblxyXG4gIC8qXHJcbiAgICBLZXkgcmVsZWFzZWQgaGFuZGxlclxyXG4gICAgPT09PT09PT09PT09PT09PT09PT1cclxuICAqL1xyXG4gIHA1LmtleVJlbGVhc2VkID0gZnVuY3Rpb24gKCkge1xyXG4gICAgc3dpdGNoKHA1LmtleSkge1xyXG4gICAgICBjYXNlICcgJzpcclxuICAgICAgICBnZW5lcmF0ZU5ld1NoYXBlKCk7XHJcbiAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICBjYXNlICdwJzpcclxuICAgICAgICBzaG93UG9pbnRzID0gIXNob3dQb2ludHM7XHJcbiAgICAgICAgZ2VuZXJhdGVOZXdTaGFwZSgpO1xyXG4gICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgY2FzZSAnaSc6XHJcbiAgICAgICAgaW52ZXJ0Q29sb3JzID0gIWludmVydENvbG9ycztcclxuICAgICAgICBnZW5lcmF0ZU5ld1NoYXBlKCk7XHJcbiAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICBjYXNlICcxJzpcclxuICAgICAgICBST1dfVFlQRSA9IEVWRU47XHJcbiAgICAgICAgZ2VuZXJhdGVOZXdTaGFwZSgpO1xyXG4gICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgY2FzZSAnMic6XHJcbiAgICAgICAgUk9XX1RZUEUgPSBPREQ7XHJcbiAgICAgICAgZ2VuZXJhdGVOZXdTaGFwZSgpO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBcclxuICAgICAgY2FzZSAnMyc6XHJcbiAgICAgICAgUk9XX1RZUEUgPSBBTFRFUk5BVElORztcclxuICAgICAgICBnZW5lcmF0ZU5ld1NoYXBlKCk7XHJcbiAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICBjYXNlICc0JzpcclxuICAgICAgICBST1dfVFlQRSA9IEFOWTtcclxuICAgICAgICBnZW5lcmF0ZU5ld1NoYXBlKCk7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuXHJcbiAgLypcclxuICAgIEN1c3RvbSBmdW5jdGlvbnNcclxuICAgID09PT09PT09PT09PT09PT1cclxuICAqL1xyXG4gIC8vIERyYXcgdGhlIFZvcm9ub2kgZGlhZ3JhbSBmb3IgYSBzZXQgb2YgcG9pbnRzXHJcbiAgZnVuY3Rpb24gZHJhd1Zvcm9ub2kocG9pbnRzKSB7XHJcbiAgICBjb25zdCBkZWxhdW5heSA9IERlbGF1bmF5LmZyb20ocG9pbnRzKTtcclxuICAgIGNvbnN0IHZvcm9ub2kgPSBkZWxhdW5heS52b3Jvbm9pKFswLCAwLCB3aW5kb3cuaW5uZXJXaWR0aCwgd2luZG93LmlubmVySGVpZ2h0XSk7XHJcblxyXG4gICAgZm9yKGNvbnN0IHBvbHlnb24gb2Ygdm9yb25vaS5jZWxsUG9seWdvbnMoKSkge1xyXG4gICAgICBwNS5iZWdpblNoYXBlKCk7XHJcblxyXG4gICAgICBmb3IoY29uc3QgdmVydGV4IG9mIHBvbHlnb24pIHtcclxuICAgICAgICBwNS52ZXJ0ZXgodmVydGV4WzBdLCB2ZXJ0ZXhbMV0pO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBwNS5lbmRTaGFwZSgpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLy8gQ3JlYXRlIGFuIGFycmF5IG9mIHBvaW50cyAoY29vcmRpbmF0ZSBwYWlycylcclxuICBmdW5jdGlvbiBjcmVhdGVQb2ludHNSaW5nKGNlbnRlclgsIGNlbnRlclksIHJhZGl1cywgbnVtUG9pbnRzKSB7XHJcbiAgICBsZXQgcG9pbnRzID0gW107XHJcblxyXG4gICAgZm9yKGxldCBpID0gMDsgaSA8IG51bVBvaW50czsgaSsrKSB7XHJcbiAgICAgIHBvaW50cy5wdXNoKFtcclxuICAgICAgICBjZW50ZXJYICsgcmFkaXVzICogTWF0aC5jb3MocDUucmFkaWFucygoMzYwIC8gbnVtUG9pbnRzKSAqIGkpKSxcclxuICAgICAgICBjZW50ZXJZICsgcmFkaXVzICogTWF0aC5zaW4ocDUucmFkaWFucygoMzYwIC8gbnVtUG9pbnRzKSAqIGkpKVxyXG4gICAgICBdKTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gcG9pbnRzO1xyXG4gIH1cclxuICBcclxuICBmdW5jdGlvbiBnZW5lcmF0ZU5ld1NoYXBlKCkge1xyXG4gICAgbGV0IHBvaW50cyA9IFtdO1xyXG4gICAgbGV0IGxhc3RSYWRpdXMgPSBwNS5yYW5kb20oMTAsMzApO1xyXG5cclxuICAgIC8vIEdlbmVyYXRlIHNldCBvZiBwb2ludHMgZm9yIFZvcm9ub2kgZGlhZ3JhbVxyXG4gICAgZm9yKGxldCBpID0gMDsgaSA8IHBhcnNlSW50KHA1LnJhbmRvbSg1LDIwKSk7IGkrKykge1xyXG4gICAgICBsZXQgbnVtUG9pbnRzLCByYW5nZSA9IFtdO1xyXG5cclxuICAgICAgLy8gUmluZ3MgbmVhciB0aGUgY2VudGVyIGxvb2sgYmV0dGVyIHdpdGggZmV3ZXIgcG9pbnRzXHJcbiAgICAgIGlmKGkgPCAzKSB7XHJcbiAgICAgICAgcmFuZ2VbMF0gPSAzO1xyXG4gICAgICAgIHJhbmdlWzFdID0gMTA7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgcmFuZ2VbMF0gPSAyMDtcclxuICAgICAgICByYW5nZVsxXSA9IDUwO1xyXG4gICAgICB9XHJcblxyXG4gICAgICAvLyBHZW5lcmF0ZSBhIHJhbmRvbSBudW1iZXIgb2YgcG9pbnRzIGJhc2VkIG9uIHNlbGVjdGVkIFwicm93IHR5cGVcIlxyXG4gICAgICBzd2l0Y2goUk9XX1RZUEUpIHtcclxuICAgICAgICBjYXNlIEVWRU46XHJcbiAgICAgICAgICBudW1Qb2ludHMgPSBnZXRSYW5kb21FdmVuTnVtYmVyKHJhbmdlWzBdLCByYW5nZVsxXSk7XHJcbiAgICAgICAgICBicmVhaztcclxuXHJcbiAgICAgICAgY2FzZSBPREQ6XHJcbiAgICAgICAgICBudW1Qb2ludHMgPSBnZXRSYW5kb21PZGROdW1iZXIocmFuZ2VbMF0sIHJhbmdlWzFdKTtcclxuICAgICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgICBjYXNlIEFMVEVSTkFUSU5HOlxyXG4gICAgICAgICAgc3dpdGNoKGN1cnJlbnRSb3dUeXBlKSB7XHJcbiAgICAgICAgICAgIGNhc2UgRVZFTjpcclxuICAgICAgICAgICAgICBudW1Qb2ludHMgPSBnZXRSYW5kb21FdmVuTnVtYmVyKHJhbmdlWzBdLCByYW5nZVsxXSk7XHJcbiAgICAgICAgICAgICAgY3VycmVudFJvd1R5cGUgPSBPREQ7XHJcbiAgICAgICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICAgICAgICBjYXNlIE9ERDpcclxuICAgICAgICAgICAgICBudW1Qb2ludHMgPSBnZXRSYW5kb21PZGROdW1iZXIocmFuZ2VbMF0sIHJhbmdlWzFdKTtcclxuICAgICAgICAgICAgICBjdXJyZW50Um93VHlwZSA9IEVWRU47XHJcbiAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICAgIGNhc2UgQU5ZOlxyXG4gICAgICAgICAgbnVtUG9pbnRzID0gcGFyc2VJbnQocDUucmFuZG9tKHJhbmdlWzBdLCByYW5nZVsxXSkpO1xyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC8vIEdlbmVyYXRlIHBvaW50cyBhcnJhbmdlZCBpbiBhIHJpbmdcclxuICAgICAgbGV0IG5ld1BvaW50cyA9IGNyZWF0ZVBvaW50c1Jpbmcod2luZG93LmlubmVyV2lkdGgvMiwgd2luZG93LmlubmVySGVpZ2h0LzIsIGxhc3RSYWRpdXMsIG51bVBvaW50cyk7XHJcbiAgICAgIHBvaW50cyA9IHBvaW50cy5jb25jYXQobmV3UG9pbnRzKTtcclxuICAgICAgXHJcbiAgICAgIC8vIEVuc3VyZSBuZXh0IHJhZGl1cyBpcyBsYXJnZXIgdGhhbiBwcmV2aW91cyByYWRpdXNcclxuICAgICAgbGFzdFJhZGl1cyArPSBwNS5yYW5kb20oMjAsODApO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIERyYXcgdGhlIFZvcm9ub2kgZGlhZ3JhbVxyXG4gICAgaWYoaW52ZXJ0Q29sb3JzKSB7XHJcbiAgICAgIHA1LmJhY2tncm91bmQoMCk7XHJcbiAgICAgIHA1LnN0cm9rZSgyNTUpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgcDUuYmFja2dyb3VuZCgyNTUpO1xyXG4gICAgICBwNS5zdHJva2UoMCk7XHJcbiAgICB9XHJcblxyXG4gICAgcDUubm9GaWxsKCk7XHJcbiAgICBkcmF3Vm9yb25vaShwb2ludHMpO1xyXG5cclxuICAgIC8vIERyYXcgdGhlIHBvaW50c1xyXG4gICAgaWYoc2hvd1BvaW50cykge1xyXG4gICAgICBwNS5ub1N0cm9rZSgpO1xyXG5cclxuICAgICAgaWYoaW52ZXJ0Q29sb3JzKSB7XHJcbiAgICAgICAgcDUuZmlsbCg1MCk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgcDUuZmlsbCgyMDApO1xyXG4gICAgICB9XHJcbiAgXHJcbiAgICAgIGZvcihsZXQgcG9pbnQgb2YgcG9pbnRzKSB7XHJcbiAgICAgICAgcDUuZWxsaXBzZShwb2ludFswXSwgcG9pbnRbMV0sIDUpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiBnZXRSYW5kb21FdmVuTnVtYmVyKG1pbiwgbWF4KSB7XHJcbiAgICBsZXQgbnVtID0gcGFyc2VJbnQocDUucmFuZG9tKG1pbiwgbWF4KSk7XHJcbiAgICBcclxuICAgIGlmKG51bSAlIDIgPiAwKSB7XHJcbiAgICAgIGlmKG51bSAtIDEgPCBtaW4pIHtcclxuICAgICAgICBudW0rKztcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBudW0tLTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBudW07XHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiBnZXRSYW5kb21PZGROdW1iZXIobWluLCBtYXgpIHtcclxuICAgIGxldCBudW0gPSBwYXJzZUludChwNS5yYW5kb20obWluLCBtYXgpKTtcclxuICAgIFxyXG4gICAgaWYobnVtICUgMiA9PSAwKSB7XHJcbiAgICAgIGlmKG51bSAtIDEgPCBtaW4pIHtcclxuICAgICAgICBudW0rKztcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBudW0tLTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBudW07XHJcbiAgfVxyXG59XHJcblxyXG4vLyBMYXVuY2ggdGhlIHNrZXRjaCB1c2luZyBwNWpzIGluIGluc3RhbnRpYXRlZCBtb2RlXHJcbm5ldyBwNShza2V0Y2gpOyIsImltcG9ydCBEZWxhdW5hdG9yIGZyb20gXCJkZWxhdW5hdG9yXCI7XG5pbXBvcnQgUGF0aCBmcm9tIFwiLi9wYXRoLmpzXCI7XG5pbXBvcnQgUG9seWdvbiBmcm9tIFwiLi9wb2x5Z29uLmpzXCI7XG5pbXBvcnQgVm9yb25vaSBmcm9tIFwiLi92b3Jvbm9pLmpzXCI7XG5cbmNvbnN0IHRhdSA9IDIgKiBNYXRoLlBJO1xuXG5mdW5jdGlvbiBwb2ludFgocCkge1xuICByZXR1cm4gcFswXTtcbn1cblxuZnVuY3Rpb24gcG9pbnRZKHApIHtcbiAgcmV0dXJuIHBbMV07XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIERlbGF1bmF5IHtcbiAgY29uc3RydWN0b3IocG9pbnRzKSB7XG4gICAgY29uc3Qge2hhbGZlZGdlcywgaHVsbCwgdHJpYW5nbGVzfSA9IG5ldyBEZWxhdW5hdG9yKHBvaW50cyk7XG4gICAgdGhpcy5wb2ludHMgPSBwb2ludHM7XG4gICAgdGhpcy5oYWxmZWRnZXMgPSBoYWxmZWRnZXM7XG4gICAgdGhpcy5odWxsID0gaHVsbDtcbiAgICB0aGlzLnRyaWFuZ2xlcyA9IHRyaWFuZ2xlcztcbiAgICBjb25zdCBpbmVkZ2VzID0gdGhpcy5pbmVkZ2VzID0gbmV3IEludDMyQXJyYXkocG9pbnRzLmxlbmd0aCAvIDIpLmZpbGwoLTEpO1xuICAgIGNvbnN0IG91dGVkZ2VzID0gdGhpcy5vdXRlZGdlcyA9IG5ldyBJbnQzMkFycmF5KHBvaW50cy5sZW5ndGggLyAyKS5maWxsKC0xKTtcblxuICAgIC8vIENvbXB1dGUgYW4gaW5kZXggZnJvbSBlYWNoIHBvaW50IHRvIGFuIChhcmJpdHJhcnkpIGluY29taW5nIGhhbGZlZGdlLlxuICAgIGZvciAobGV0IGUgPSAwLCBuID0gaGFsZmVkZ2VzLmxlbmd0aDsgZSA8IG47ICsrZSkge1xuICAgICAgaW5lZGdlc1t0cmlhbmdsZXNbZSAlIDMgPT09IDIgPyBlIC0gMiA6IGUgKyAxXV0gPSBlO1xuICAgIH1cblxuICAgIC8vIEZvciBwb2ludHMgb24gdGhlIGh1bGwsIGluZGV4IGJvdGggdGhlIGluY29taW5nIGFuZCBvdXRnb2luZyBoYWxmZWRnZXMuXG4gICAgbGV0IG5vZGUwLCBub2RlMSA9IGh1bGw7XG4gICAgZG8ge1xuICAgICAgbm9kZTAgPSBub2RlMSwgbm9kZTEgPSBub2RlMS5uZXh0O1xuICAgICAgaW5lZGdlc1tub2RlMS5pXSA9IG5vZGUwLnQ7XG4gICAgICBvdXRlZGdlc1tub2RlMC5pXSA9IG5vZGUxLnQ7XG4gICAgfSB3aGlsZSAobm9kZTEgIT09IGh1bGwpO1xuICB9XG4gIHZvcm9ub2koYm91bmRzKSB7XG4gICAgcmV0dXJuIG5ldyBWb3Jvbm9pKHRoaXMsIGJvdW5kcyk7XG4gIH1cbiAgKm5laWdoYm9ycyhpKSB7XG4gICAgY29uc3Qge2luZWRnZXMsIG91dGVkZ2VzLCBoYWxmZWRnZXMsIHRyaWFuZ2xlc30gPSB0aGlzO1xuICAgIGNvbnN0IGUwID0gaW5lZGdlc1tpXTtcbiAgICBpZiAoZTAgPT09IC0xKSByZXR1cm47IC8vIGNvaW5jaWRlbnQgcG9pbnRcbiAgICBsZXQgZSA9IGUwO1xuICAgIGRvIHtcbiAgICAgIHlpZWxkIHRyaWFuZ2xlc1tlXTtcbiAgICAgIGUgPSBlICUgMyA9PT0gMiA/IGUgLSAyIDogZSArIDE7XG4gICAgICBpZiAodHJpYW5nbGVzW2VdICE9PSBpKSByZXR1cm47IC8vIGJhZCB0cmlhbmd1bGF0aW9uXG4gICAgICBlID0gaGFsZmVkZ2VzW2VdO1xuICAgICAgaWYgKGUgPT09IC0xKSByZXR1cm4geWllbGQgdHJpYW5nbGVzW291dGVkZ2VzW2ldXTtcbiAgICB9IHdoaWxlIChlICE9PSBlMCk7XG4gIH1cbiAgZmluZCh4LCB5LCBpID0gMCkge1xuICAgIGlmICgoeCA9ICt4LCB4ICE9PSB4KSB8fCAoeSA9ICt5LCB5ICE9PSB5KSkgcmV0dXJuIC0xO1xuICAgIGxldCBjO1xuICAgIHdoaWxlICgoYyA9IHRoaXMuX3N0ZXAoaSwgeCwgeSkpID49IDAgJiYgYyAhPT0gaSkgaSA9IGM7XG4gICAgcmV0dXJuIGM7XG4gIH1cbiAgX3N0ZXAoaSwgeCwgeSkge1xuICAgIGNvbnN0IHtpbmVkZ2VzLCBwb2ludHN9ID0gdGhpcztcbiAgICBpZiAoaW5lZGdlc1tpXSA9PT0gLTEpIHJldHVybiAtMTsgLy8gY29pbmNpZGVudCBwb2ludFxuICAgIGxldCBjID0gaTtcbiAgICBsZXQgZGMgPSAoeCAtIHBvaW50c1tpICogMl0pICoqIDIgKyAoeSAtIHBvaW50c1tpICogMiArIDFdKSAqKiAyO1xuICAgIGZvciAoY29uc3QgdCBvZiB0aGlzLm5laWdoYm9ycyhpKSkge1xuICAgICAgY29uc3QgZHQgPSAoeCAtIHBvaW50c1t0ICogMl0pICoqIDIgKyAoeSAtIHBvaW50c1t0ICogMiArIDFdKSAqKiAyO1xuICAgICAgaWYgKGR0IDwgZGMpIGRjID0gZHQsIGMgPSB0O1xuICAgIH1cbiAgICByZXR1cm4gYztcbiAgfVxuICByZW5kZXIoY29udGV4dCkge1xuICAgIGNvbnN0IGJ1ZmZlciA9IGNvbnRleHQgPT0gbnVsbCA/IGNvbnRleHQgPSBuZXcgUGF0aCA6IHVuZGVmaW5lZDtcbiAgICBjb25zdCB7cG9pbnRzLCBoYWxmZWRnZXMsIHRyaWFuZ2xlc30gPSB0aGlzO1xuICAgIGZvciAobGV0IGkgPSAwLCBuID0gaGFsZmVkZ2VzLmxlbmd0aDsgaSA8IG47ICsraSkge1xuICAgICAgY29uc3QgaiA9IGhhbGZlZGdlc1tpXTtcbiAgICAgIGlmIChqIDwgaSkgY29udGludWU7XG4gICAgICBjb25zdCB0aSA9IHRyaWFuZ2xlc1tpXSAqIDI7XG4gICAgICBjb25zdCB0aiA9IHRyaWFuZ2xlc1tqXSAqIDI7XG4gICAgICBjb250ZXh0Lm1vdmVUbyhwb2ludHNbdGldLCBwb2ludHNbdGkgKyAxXSk7XG4gICAgICBjb250ZXh0LmxpbmVUbyhwb2ludHNbdGpdLCBwb2ludHNbdGogKyAxXSk7XG4gICAgfVxuICAgIHRoaXMucmVuZGVySHVsbChjb250ZXh0KTtcbiAgICByZXR1cm4gYnVmZmVyICYmIGJ1ZmZlci52YWx1ZSgpO1xuICB9XG4gIHJlbmRlclBvaW50cyhjb250ZXh0LCByID0gMikge1xuICAgIGNvbnN0IGJ1ZmZlciA9IGNvbnRleHQgPT0gbnVsbCA/IGNvbnRleHQgPSBuZXcgUGF0aCA6IHVuZGVmaW5lZDtcbiAgICBjb25zdCB7cG9pbnRzfSA9IHRoaXM7XG4gICAgZm9yIChsZXQgaSA9IDAsIG4gPSBwb2ludHMubGVuZ3RoOyBpIDwgbjsgaSArPSAyKSB7XG4gICAgICBjb25zdCB4ID0gcG9pbnRzW2ldLCB5ID0gcG9pbnRzW2kgKyAxXTtcbiAgICAgIGNvbnRleHQubW92ZVRvKHggKyByLCB5KTtcbiAgICAgIGNvbnRleHQuYXJjKHgsIHksIHIsIDAsIHRhdSk7XG4gICAgfVxuICAgIHJldHVybiBidWZmZXIgJiYgYnVmZmVyLnZhbHVlKCk7XG4gIH1cbiAgcmVuZGVySHVsbChjb250ZXh0KSB7XG4gICAgY29uc3QgYnVmZmVyID0gY29udGV4dCA9PSBudWxsID8gY29udGV4dCA9IG5ldyBQYXRoIDogdW5kZWZpbmVkO1xuICAgIGNvbnN0IHtodWxsfSA9IHRoaXM7XG4gICAgbGV0IG5vZGUgPSBodWxsO1xuICAgIGNvbnRleHQubW92ZVRvKG5vZGUueCwgbm9kZS55KTtcbiAgICB3aGlsZSAobm9kZSA9IG5vZGUubmV4dCwgbm9kZSAhPT0gaHVsbCkgY29udGV4dC5saW5lVG8obm9kZS54LCBub2RlLnkpO1xuICAgIGNvbnRleHQuY2xvc2VQYXRoKCk7XG4gICAgcmV0dXJuIGJ1ZmZlciAmJiBidWZmZXIudmFsdWUoKTtcbiAgfVxuICBodWxsUG9seWdvbigpIHtcbiAgICBjb25zdCBwb2x5Z29uID0gbmV3IFBvbHlnb247XG4gICAgdGhpcy5yZW5kZXJIdWxsKHBvbHlnb24pO1xuICAgIHJldHVybiBwb2x5Z29uLnZhbHVlKCk7XG4gIH1cbiAgcmVuZGVyVHJpYW5nbGUoaSwgY29udGV4dCkge1xuICAgIGNvbnN0IGJ1ZmZlciA9IGNvbnRleHQgPT0gbnVsbCA/IGNvbnRleHQgPSBuZXcgUGF0aCA6IHVuZGVmaW5lZDtcbiAgICBjb25zdCB7cG9pbnRzLCB0cmlhbmdsZXN9ID0gdGhpcztcbiAgICBjb25zdCB0MCA9IHRyaWFuZ2xlc1tpICo9IDNdICogMjtcbiAgICBjb25zdCB0MSA9IHRyaWFuZ2xlc1tpICsgMV0gKiAyO1xuICAgIGNvbnN0IHQyID0gdHJpYW5nbGVzW2kgKyAyXSAqIDI7XG4gICAgY29udGV4dC5tb3ZlVG8ocG9pbnRzW3QwXSwgcG9pbnRzW3QwICsgMV0pO1xuICAgIGNvbnRleHQubGluZVRvKHBvaW50c1t0MV0sIHBvaW50c1t0MSArIDFdKTtcbiAgICBjb250ZXh0LmxpbmVUbyhwb2ludHNbdDJdLCBwb2ludHNbdDIgKyAxXSk7XG4gICAgY29udGV4dC5jbG9zZVBhdGgoKTtcbiAgICByZXR1cm4gYnVmZmVyICYmIGJ1ZmZlci52YWx1ZSgpO1xuICB9XG4gICp0cmlhbmdsZVBvbHlnb25zKCkge1xuICAgIGNvbnN0IHt0cmlhbmdsZXN9ID0gdGhpcztcbiAgICBmb3IgKGxldCBpID0gMCwgbiA9IHRyaWFuZ2xlcy5sZW5ndGggLyAzOyBpIDwgbjsgKytpKSB7XG4gICAgICB5aWVsZCB0aGlzLnRyaWFuZ2xlUG9seWdvbihpKTtcbiAgICB9XG4gIH1cbiAgdHJpYW5nbGVQb2x5Z29uKGkpIHtcbiAgICBjb25zdCBwb2x5Z29uID0gbmV3IFBvbHlnb247XG4gICAgdGhpcy5yZW5kZXJUcmlhbmdsZShpLCBwb2x5Z29uKTtcbiAgICByZXR1cm4gcG9seWdvbi52YWx1ZSgpO1xuICB9XG59XG5cbkRlbGF1bmF5LmZyb20gPSBmdW5jdGlvbihwb2ludHMsIGZ4ID0gcG9pbnRYLCBmeSA9IHBvaW50WSwgdGhhdCkge1xuICByZXR1cm4gbmV3IERlbGF1bmF5KFwibGVuZ3RoXCIgaW4gcG9pbnRzXG4gICAgICA/IGZsYXRBcnJheShwb2ludHMsIGZ4LCBmeSwgdGhhdClcbiAgICAgIDogRmxvYXQ2NEFycmF5LmZyb20oZmxhdEl0ZXJhYmxlKHBvaW50cywgZngsIGZ5LCB0aGF0KSkpO1xufTtcblxuZnVuY3Rpb24gZmxhdEFycmF5KHBvaW50cywgZngsIGZ5LCB0aGF0KSB7XG4gIGNvbnN0IG4gPSBwb2ludHMubGVuZ3RoO1xuICBjb25zdCBhcnJheSA9IG5ldyBGbG9hdDY0QXJyYXkobiAqIDIpO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IG47ICsraSkge1xuICAgIGNvbnN0IHAgPSBwb2ludHNbaV07XG4gICAgYXJyYXlbaSAqIDJdID0gZnguY2FsbCh0aGF0LCBwLCBpLCBwb2ludHMpO1xuICAgIGFycmF5W2kgKiAyICsgMV0gPSBmeS5jYWxsKHRoYXQsIHAsIGksIHBvaW50cyk7XG4gIH1cbiAgcmV0dXJuIGFycmF5O1xufVxuXG5mdW5jdGlvbiogZmxhdEl0ZXJhYmxlKHBvaW50cywgZngsIGZ5LCB0aGF0KSB7XG4gIGxldCBpID0gMDtcbiAgZm9yIChjb25zdCBwIG9mIHBvaW50cykge1xuICAgIHlpZWxkIGZ4LmNhbGwodGhhdCwgcCwgaSwgcG9pbnRzKTtcbiAgICB5aWVsZCBmeS5jYWxsKHRoYXQsIHAsIGksIHBvaW50cyk7XG4gICAgKytpO1xuICB9XG59XG4iLCJleHBvcnQge2RlZmF1bHQgYXMgRGVsYXVuYXl9IGZyb20gXCIuL2RlbGF1bmF5LmpzXCI7XG5leHBvcnQge2RlZmF1bHQgYXMgVm9yb25vaX0gZnJvbSBcIi4vdm9yb25vaS5qc1wiO1xuIiwiY29uc3QgZXBzaWxvbiA9IDFlLTY7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFBhdGgge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLl94MCA9IHRoaXMuX3kwID0gLy8gc3RhcnQgb2YgY3VycmVudCBzdWJwYXRoXG4gICAgdGhpcy5feDEgPSB0aGlzLl95MSA9IG51bGw7IC8vIGVuZCBvZiBjdXJyZW50IHN1YnBhdGhcbiAgICB0aGlzLl8gPSBcIlwiO1xuICB9XG4gIG1vdmVUbyh4LCB5KSB7XG4gICAgdGhpcy5fICs9IGBNJHt0aGlzLl94MCA9IHRoaXMuX3gxID0gK3h9LCR7dGhpcy5feTAgPSB0aGlzLl95MSA9ICt5fWA7XG4gIH1cbiAgY2xvc2VQYXRoKCkge1xuICAgIGlmICh0aGlzLl94MSAhPT0gbnVsbCkge1xuICAgICAgdGhpcy5feDEgPSB0aGlzLl94MCwgdGhpcy5feTEgPSB0aGlzLl95MDtcbiAgICAgIHRoaXMuXyArPSBcIlpcIjtcbiAgICB9XG4gIH1cbiAgbGluZVRvKHgsIHkpIHtcbiAgICB0aGlzLl8gKz0gYEwke3RoaXMuX3gxID0gK3h9LCR7dGhpcy5feTEgPSAreX1gO1xuICB9XG4gIGFyYyh4LCB5LCByKSB7XG4gICAgeCA9ICt4LCB5ID0gK3ksIHIgPSArcjtcbiAgICBjb25zdCB4MCA9IHggKyByO1xuICAgIGNvbnN0IHkwID0geTtcbiAgICBpZiAociA8IDApIHRocm93IG5ldyBFcnJvcihcIm5lZ2F0aXZlIHJhZGl1c1wiKTtcbiAgICBpZiAodGhpcy5feDEgPT09IG51bGwpIHRoaXMuXyArPSBgTSR7eDB9LCR7eTB9YDtcbiAgICBlbHNlIGlmIChNYXRoLmFicyh0aGlzLl94MSAtIHgwKSA+IGVwc2lsb24gfHwgTWF0aC5hYnModGhpcy5feTEgLSB5MCkgPiBlcHNpbG9uKSB0aGlzLl8gKz0gXCJMXCIgKyB4MCArIFwiLFwiICsgeTA7XG4gICAgaWYgKCFyKSByZXR1cm47XG4gICAgdGhpcy5fICs9IGBBJHtyfSwke3J9LDAsMSwxLCR7eCAtIHJ9LCR7eX1BJHtyfSwke3J9LDAsMSwxLCR7dGhpcy5feDEgPSB4MH0sJHt0aGlzLl95MSA9IHkwfWA7XG4gIH1cbiAgcmVjdCh4LCB5LCB3LCBoKSB7XG4gICAgdGhpcy5fICs9IGBNJHt0aGlzLl94MCA9IHRoaXMuX3gxID0gK3h9LCR7dGhpcy5feTAgPSB0aGlzLl95MSA9ICt5fWgkeyt3fXYkeytofWgkey13fVpgO1xuICB9XG4gIHZhbHVlKCkge1xuICAgIHJldHVybiB0aGlzLl8gfHwgbnVsbDtcbiAgfVxufVxuIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgUG9seWdvbiB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMuXyA9IFtdO1xuICB9XG4gIG1vdmVUbyh4LCB5KSB7XG4gICAgdGhpcy5fLnB1c2goW3gsIHldKTtcbiAgfVxuICBjbG9zZVBhdGgoKSB7XG4gICAgdGhpcy5fLnB1c2godGhpcy5fWzBdLnNsaWNlKCkpO1xuICB9XG4gIGxpbmVUbyh4LCB5KSB7XG4gICAgdGhpcy5fLnB1c2goW3gsIHldKTtcbiAgfVxuICB2YWx1ZSgpIHtcbiAgICByZXR1cm4gdGhpcy5fLmxlbmd0aCA/IHRoaXMuXyA6IG51bGw7XG4gIH1cbn1cbiIsImltcG9ydCBQYXRoIGZyb20gXCIuL3BhdGguanNcIjtcbmltcG9ydCBQb2x5Z29uIGZyb20gXCIuL3BvbHlnb24uanNcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVm9yb25vaSB7XG4gIGNvbnN0cnVjdG9yKGRlbGF1bmF5LCBbeG1pbiwgeW1pbiwgeG1heCwgeW1heF0gPSBbMCwgMCwgOTYwLCA1MDBdKSB7XG4gICAgaWYgKCEoKHhtYXggPSAreG1heCkgPj0gKHhtaW4gPSAreG1pbikpIHx8ICEoKHltYXggPSAreW1heCkgPj0gKHltaW4gPSAreW1pbikpKSB0aHJvdyBuZXcgRXJyb3IoXCJpbnZhbGlkIGJvdW5kc1wiKTtcbiAgICBjb25zdCB7cG9pbnRzLCBodWxsLCB0cmlhbmdsZXN9ID0gdGhpcy5kZWxhdW5heSA9IGRlbGF1bmF5O1xuICAgIGNvbnN0IGNpcmN1bWNlbnRlcnMgPSB0aGlzLmNpcmN1bWNlbnRlcnMgPSBuZXcgRmxvYXQ2NEFycmF5KHRyaWFuZ2xlcy5sZW5ndGggLyAzICogMik7XG4gICAgY29uc3QgdmVjdG9ycyA9IHRoaXMudmVjdG9ycyA9IG5ldyBGbG9hdDY0QXJyYXkocG9pbnRzLmxlbmd0aCAqIDIpO1xuICAgIHRoaXMueG1heCA9IHhtYXgsIHRoaXMueG1pbiA9IHhtaW47XG4gICAgdGhpcy55bWF4ID0geW1heCwgdGhpcy55bWluID0geW1pbjtcblxuICAgIC8vIENvbXB1dGUgY2lyY3VtY2VudGVycy5cbiAgICBmb3IgKGxldCBpID0gMCwgaiA9IDAsIG4gPSB0cmlhbmdsZXMubGVuZ3RoOyBpIDwgbjsgaSArPSAzLCBqICs9IDIpIHtcbiAgICAgIGNvbnN0IHQxID0gdHJpYW5nbGVzW2ldICogMjtcbiAgICAgIGNvbnN0IHQyID0gdHJpYW5nbGVzW2kgKyAxXSAqIDI7XG4gICAgICBjb25zdCB0MyA9IHRyaWFuZ2xlc1tpICsgMl0gKiAyO1xuICAgICAgY29uc3QgeDEgPSBwb2ludHNbdDFdO1xuICAgICAgY29uc3QgeTEgPSBwb2ludHNbdDEgKyAxXTtcbiAgICAgIGNvbnN0IHgyID0gcG9pbnRzW3QyXTtcbiAgICAgIGNvbnN0IHkyID0gcG9pbnRzW3QyICsgMV07XG4gICAgICBjb25zdCB4MyA9IHBvaW50c1t0M107XG4gICAgICBjb25zdCB5MyA9IHBvaW50c1t0MyArIDFdO1xuICAgICAgY29uc3QgYTIgPSB4MSAtIHgyO1xuICAgICAgY29uc3QgYTMgPSB4MSAtIHgzO1xuICAgICAgY29uc3QgYjIgPSB5MSAtIHkyO1xuICAgICAgY29uc3QgYjMgPSB5MSAtIHkzO1xuICAgICAgY29uc3QgZDEgPSB4MSAqIHgxICsgeTEgKiB5MTtcbiAgICAgIGNvbnN0IGQyID0gZDEgLSB4MiAqIHgyIC0geTIgKiB5MjtcbiAgICAgIGNvbnN0IGQzID0gZDEgLSB4MyAqIHgzIC0geTMgKiB5MztcbiAgICAgIGNvbnN0IGFiID0gKGEzICogYjIgLSBhMiAqIGIzKSAqIDI7XG4gICAgICBjaXJjdW1jZW50ZXJzW2pdID0gKGIyICogZDMgLSBiMyAqIGQyKSAvIGFiO1xuICAgICAgY2lyY3VtY2VudGVyc1tqICsgMV0gPSAoYTMgKiBkMiAtIGEyICogZDMpIC8gYWI7XG4gICAgfVxuXG4gICAgLy8gQ29tcHV0ZSBleHRlcmlvciBjZWxsIHJheXMuXG4gICAgbGV0IG5vZGUgPSBodWxsO1xuICAgIGxldCBwMCwgcDEgPSBub2RlLmkgKiA0O1xuICAgIGxldCB4MCwgeDEgPSBub2RlLng7XG4gICAgbGV0IHkwLCB5MSA9IG5vZGUueTtcbiAgICBkbyB7XG4gICAgICBub2RlID0gbm9kZS5uZXh0LCBwMCA9IHAxLCB4MCA9IHgxLCB5MCA9IHkxLCBwMSA9IG5vZGUuaSAqIDQsIHgxID0gbm9kZS54LCB5MSA9IG5vZGUueTtcbiAgICAgIHZlY3RvcnNbcDAgKyAyXSA9IHZlY3RvcnNbcDFdID0geTAgLSB5MTtcbiAgICAgIHZlY3RvcnNbcDAgKyAzXSA9IHZlY3RvcnNbcDEgKyAxXSA9IHgxIC0geDA7XG4gICAgfSB3aGlsZSAobm9kZSAhPT0gaHVsbCk7XG4gIH1cbiAgcmVuZGVyKGNvbnRleHQpIHtcbiAgICBjb25zdCBidWZmZXIgPSBjb250ZXh0ID09IG51bGwgPyBjb250ZXh0ID0gbmV3IFBhdGggOiB1bmRlZmluZWQ7XG4gICAgY29uc3Qge2RlbGF1bmF5OiB7aGFsZmVkZ2VzLCBodWxsfSwgY2lyY3VtY2VudGVycywgdmVjdG9yc30gPSB0aGlzO1xuICAgIGZvciAobGV0IGkgPSAwLCBuID0gaGFsZmVkZ2VzLmxlbmd0aDsgaSA8IG47ICsraSkge1xuICAgICAgY29uc3QgaiA9IGhhbGZlZGdlc1tpXTtcbiAgICAgIGlmIChqIDwgaSkgY29udGludWU7XG4gICAgICBjb25zdCB0aSA9IE1hdGguZmxvb3IoaSAvIDMpICogMjtcbiAgICAgIGNvbnN0IHRqID0gTWF0aC5mbG9vcihqIC8gMykgKiAyO1xuICAgICAgY29uc3QgeGkgPSBjaXJjdW1jZW50ZXJzW3RpXTtcbiAgICAgIGNvbnN0IHlpID0gY2lyY3VtY2VudGVyc1t0aSArIDFdO1xuICAgICAgY29uc3QgeGogPSBjaXJjdW1jZW50ZXJzW3RqXTtcbiAgICAgIGNvbnN0IHlqID0gY2lyY3VtY2VudGVyc1t0aiArIDFdO1xuICAgICAgdGhpcy5fcmVuZGVyU2VnbWVudCh4aSwgeWksIHhqLCB5aiwgY29udGV4dCk7XG4gICAgfVxuICAgIGxldCBub2RlID0gaHVsbDtcbiAgICBkbyB7XG4gICAgICBub2RlID0gbm9kZS5uZXh0O1xuICAgICAgY29uc3QgdCA9IE1hdGguZmxvb3Iobm9kZS50IC8gMykgKiAyO1xuICAgICAgY29uc3QgeCA9IGNpcmN1bWNlbnRlcnNbdF07XG4gICAgICBjb25zdCB5ID0gY2lyY3VtY2VudGVyc1t0ICsgMV07XG4gICAgICBjb25zdCB2ID0gbm9kZS5pICogNDtcbiAgICAgIGNvbnN0IHAgPSB0aGlzLl9wcm9qZWN0KHgsIHksIHZlY3RvcnNbdiArIDJdLCB2ZWN0b3JzW3YgKyAzXSk7XG4gICAgICBpZiAocCkgdGhpcy5fcmVuZGVyU2VnbWVudCh4LCB5LCBwWzBdLCBwWzFdLCBjb250ZXh0KTtcbiAgICB9IHdoaWxlIChub2RlICE9PSBodWxsKTtcbiAgICByZXR1cm4gYnVmZmVyICYmIGJ1ZmZlci52YWx1ZSgpO1xuICB9XG4gIHJlbmRlckJvdW5kcyhjb250ZXh0KSB7XG4gICAgY29uc3QgYnVmZmVyID0gY29udGV4dCA9PSBudWxsID8gY29udGV4dCA9IG5ldyBQYXRoIDogdW5kZWZpbmVkO1xuICAgIGNvbnRleHQucmVjdCh0aGlzLnhtaW4sIHRoaXMueW1pbiwgdGhpcy54bWF4IC0gdGhpcy54bWluLCB0aGlzLnltYXggLSB0aGlzLnltaW4pO1xuICAgIHJldHVybiBidWZmZXIgJiYgYnVmZmVyLnZhbHVlKCk7XG4gIH1cbiAgcmVuZGVyQ2VsbChpLCBjb250ZXh0KSB7XG4gICAgY29uc3QgYnVmZmVyID0gY29udGV4dCA9PSBudWxsID8gY29udGV4dCA9IG5ldyBQYXRoIDogdW5kZWZpbmVkO1xuICAgIGNvbnN0IHBvaW50cyA9IHRoaXMuX2NsaXAoaSk7XG4gICAgaWYgKHBvaW50cyA9PT0gbnVsbCkgcmV0dXJuO1xuICAgIGNvbnRleHQubW92ZVRvKHBvaW50c1swXSwgcG9pbnRzWzFdKTtcbiAgICBmb3IgKGxldCBpID0gMiwgbiA9IHBvaW50cy5sZW5ndGg7IGkgPCBuOyBpICs9IDIpIHtcbiAgICAgIGNvbnRleHQubGluZVRvKHBvaW50c1tpXSwgcG9pbnRzW2kgKyAxXSk7XG4gICAgfVxuICAgIGNvbnRleHQuY2xvc2VQYXRoKCk7XG4gICAgcmV0dXJuIGJ1ZmZlciAmJiBidWZmZXIudmFsdWUoKTtcbiAgfVxuICAqY2VsbFBvbHlnb25zKCkge1xuICAgIGNvbnN0IHtkZWxhdW5heToge3BvaW50c319ID0gdGhpcztcbiAgICBmb3IgKGxldCBpID0gMCwgbiA9IHBvaW50cy5sZW5ndGggLyAyOyBpIDwgbjsgKytpKSB7XG4gICAgICBjb25zdCBjZWxsID0gdGhpcy5jZWxsUG9seWdvbihpKTtcbiAgICAgIGlmIChjZWxsKSB5aWVsZCBjZWxsO1xuICAgIH1cbiAgfVxuICBjZWxsUG9seWdvbihpKSB7XG4gICAgY29uc3QgcG9seWdvbiA9IG5ldyBQb2x5Z29uO1xuICAgIHRoaXMucmVuZGVyQ2VsbChpLCBwb2x5Z29uKTtcbiAgICByZXR1cm4gcG9seWdvbi52YWx1ZSgpO1xuICB9XG4gIF9yZW5kZXJTZWdtZW50KHgwLCB5MCwgeDEsIHkxLCBjb250ZXh0KSB7XG4gICAgbGV0IFM7XG4gICAgY29uc3QgYzAgPSB0aGlzLl9yZWdpb25jb2RlKHgwLCB5MCk7XG4gICAgY29uc3QgYzEgPSB0aGlzLl9yZWdpb25jb2RlKHgxLCB5MSk7XG4gICAgaWYgKGMwID09PSAwICYmIGMxID09PSAwKSB7XG4gICAgICBjb250ZXh0Lm1vdmVUbyh4MCwgeTApO1xuICAgICAgY29udGV4dC5saW5lVG8oeDEsIHkxKTtcbiAgICB9IGVsc2UgaWYgKFMgPSB0aGlzLl9jbGlwU2VnbWVudCh4MCwgeTAsIHgxLCB5MSwgYzAsIGMxKSkge1xuICAgICAgY29udGV4dC5tb3ZlVG8oU1swXSwgU1sxXSk7XG4gICAgICBjb250ZXh0LmxpbmVUbyhTWzJdLCBTWzNdKTtcbiAgICB9XG4gIH1cbiAgY29udGFpbnMoaSwgeCwgeSkge1xuICAgIGlmICgoeCA9ICt4LCB4ICE9PSB4KSB8fCAoeSA9ICt5LCB5ICE9PSB5KSkgcmV0dXJuIGZhbHNlO1xuICAgIHJldHVybiB0aGlzLmRlbGF1bmF5Ll9zdGVwKGksIHgsIHkpID09PSBpO1xuICB9XG4gIF9jZWxsKGkpIHtcbiAgICBjb25zdCB7Y2lyY3VtY2VudGVycywgZGVsYXVuYXk6IHtpbmVkZ2VzLCBoYWxmZWRnZXMsIHRyaWFuZ2xlc319ID0gdGhpcztcbiAgICBjb25zdCBlMCA9IGluZWRnZXNbaV07XG4gICAgaWYgKGUwID09PSAtMSkgcmV0dXJuIG51bGw7IC8vIGNvaW5jaWRlbnQgcG9pbnRcbiAgICBjb25zdCBwb2ludHMgPSBbXTtcbiAgICBsZXQgZSA9IGUwO1xuICAgIGRvIHtcbiAgICAgIGNvbnN0IHQgPSBNYXRoLmZsb29yKGUgLyAzKTtcbiAgICAgIHBvaW50cy5wdXNoKGNpcmN1bWNlbnRlcnNbdCAqIDJdLCBjaXJjdW1jZW50ZXJzW3QgKiAyICsgMV0pO1xuICAgICAgZSA9IGUgJSAzID09PSAyID8gZSAtIDIgOiBlICsgMTtcbiAgICAgIGlmICh0cmlhbmdsZXNbZV0gIT09IGkpIGJyZWFrOyAvLyBiYWQgdHJpYW5ndWxhdGlvblxuICAgICAgZSA9IGhhbGZlZGdlc1tlXTtcbiAgICB9IHdoaWxlIChlICE9PSBlMCAmJiBlICE9PSAtMSk7XG4gICAgcmV0dXJuIHBvaW50cztcbiAgfVxuICBfY2xpcChpKSB7XG4gICAgY29uc3QgcG9pbnRzID0gdGhpcy5fY2VsbChpKTtcbiAgICBpZiAocG9pbnRzID09PSBudWxsKSByZXR1cm4gbnVsbDtcbiAgICBjb25zdCB7dmVjdG9yczogVn0gPSB0aGlzO1xuICAgIGNvbnN0IHYgPSBpICogNDtcbiAgICByZXR1cm4gVlt2XSB8fCBWW3YgKyAxXVxuICAgICAgICA/IHRoaXMuX2NsaXBJbmZpbml0ZShpLCBwb2ludHMsIFZbdl0sIFZbdiArIDFdLCBWW3YgKyAyXSwgVlt2ICsgM10pXG4gICAgICAgIDogdGhpcy5fY2xpcEZpbml0ZShpLCBwb2ludHMpO1xuICB9XG4gIF9jbGlwRmluaXRlKGksIHBvaW50cykge1xuICAgIGNvbnN0IG4gPSBwb2ludHMubGVuZ3RoO1xuICAgIGxldCBQID0gbnVsbDtcbiAgICBsZXQgeDAsIHkwLCB4MSA9IHBvaW50c1tuIC0gMl0sIHkxID0gcG9pbnRzW24gLSAxXTtcbiAgICBsZXQgYzAsIGMxID0gdGhpcy5fcmVnaW9uY29kZSh4MSwgeTEpO1xuICAgIGxldCBlMCwgZTE7XG4gICAgZm9yIChsZXQgaiA9IDA7IGogPCBuOyBqICs9IDIpIHtcbiAgICAgIHgwID0geDEsIHkwID0geTEsIHgxID0gcG9pbnRzW2pdLCB5MSA9IHBvaW50c1tqICsgMV07XG4gICAgICBjMCA9IGMxLCBjMSA9IHRoaXMuX3JlZ2lvbmNvZGUoeDEsIHkxKTtcbiAgICAgIGlmIChjMCA9PT0gMCAmJiBjMSA9PT0gMCkge1xuICAgICAgICBlMCA9IGUxLCBlMSA9IDA7XG4gICAgICAgIGlmIChQKSBQLnB1c2goeDEsIHkxKTtcbiAgICAgICAgZWxzZSBQID0gW3gxLCB5MV07XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBsZXQgUywgc3gwLCBzeTAsIHN4MSwgc3kxO1xuICAgICAgICBpZiAoYzAgPT09IDApIHtcbiAgICAgICAgICBpZiAoKFMgPSB0aGlzLl9jbGlwU2VnbWVudCh4MCwgeTAsIHgxLCB5MSwgYzAsIGMxKSkgPT09IG51bGwpIGNvbnRpbnVlO1xuICAgICAgICAgIFtzeDAsIHN5MCwgc3gxLCBzeTFdID0gUztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpZiAoKFMgPSB0aGlzLl9jbGlwU2VnbWVudCh4MSwgeTEsIHgwLCB5MCwgYzEsIGMwKSkgPT09IG51bGwpIGNvbnRpbnVlO1xuICAgICAgICAgIFtzeDEsIHN5MSwgc3gwLCBzeTBdID0gUztcbiAgICAgICAgICBlMCA9IGUxLCBlMSA9IHRoaXMuX2VkZ2Vjb2RlKHN4MCwgc3kwKTtcbiAgICAgICAgICBpZiAoZTAgJiYgZTEpIHRoaXMuX2VkZ2UoaSwgZTAsIGUxLCBQLCBQLmxlbmd0aCk7XG4gICAgICAgICAgaWYgKFApIFAucHVzaChzeDAsIHN5MCk7XG4gICAgICAgICAgZWxzZSBQID0gW3N4MCwgc3kwXTtcbiAgICAgICAgfVxuICAgICAgICBlMCA9IGUxLCBlMSA9IHRoaXMuX2VkZ2Vjb2RlKHN4MSwgc3kxKTtcbiAgICAgICAgaWYgKGUwICYmIGUxKSB0aGlzLl9lZGdlKGksIGUwLCBlMSwgUCwgUC5sZW5ndGgpO1xuICAgICAgICBpZiAoUCkgUC5wdXNoKHN4MSwgc3kxKTtcbiAgICAgICAgZWxzZSBQID0gW3N4MSwgc3kxXTtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKFApIHtcbiAgICAgIGUwID0gZTEsIGUxID0gdGhpcy5fZWRnZWNvZGUoUFswXSwgUFsxXSk7XG4gICAgICBpZiAoZTAgJiYgZTEpIHRoaXMuX2VkZ2UoaSwgZTAsIGUxLCBQLCBQLmxlbmd0aCk7XG4gICAgfSBlbHNlIGlmICh0aGlzLmNvbnRhaW5zKGksICh0aGlzLnhtaW4gKyB0aGlzLnhtYXgpIC8gMiwgKHRoaXMueW1pbiArIHRoaXMueW1heCkgLyAyKSkge1xuICAgICAgcmV0dXJuIFt0aGlzLnhtYXgsIHRoaXMueW1pbiwgdGhpcy54bWF4LCB0aGlzLnltYXgsIHRoaXMueG1pbiwgdGhpcy55bWF4LCB0aGlzLnhtaW4sIHRoaXMueW1pbl07XG4gICAgfVxuICAgIHJldHVybiBQO1xuICB9XG4gIF9jbGlwU2VnbWVudCh4MCwgeTAsIHgxLCB5MSwgYzAsIGMxKSB7XG4gICAgd2hpbGUgKHRydWUpIHtcbiAgICAgIGlmIChjMCA9PT0gMCAmJiBjMSA9PT0gMCkgcmV0dXJuIFt4MCwgeTAsIHgxLCB5MV07XG4gICAgICBpZiAoYzAgJiBjMSkgcmV0dXJuIG51bGw7XG4gICAgICBsZXQgeCwgeSwgYyA9IGMwIHx8IGMxO1xuICAgICAgaWYgKGMgJiAwYjEwMDApIHggPSB4MCArICh4MSAtIHgwKSAqICh0aGlzLnltYXggLSB5MCkgLyAoeTEgLSB5MCksIHkgPSB0aGlzLnltYXg7XG4gICAgICBlbHNlIGlmIChjICYgMGIwMTAwKSB4ID0geDAgKyAoeDEgLSB4MCkgKiAodGhpcy55bWluIC0geTApIC8gKHkxIC0geTApLCB5ID0gdGhpcy55bWluO1xuICAgICAgZWxzZSBpZiAoYyAmIDBiMDAxMCkgeSA9IHkwICsgKHkxIC0geTApICogKHRoaXMueG1heCAtIHgwKSAvICh4MSAtIHgwKSwgeCA9IHRoaXMueG1heDtcbiAgICAgIGVsc2UgeSA9IHkwICsgKHkxIC0geTApICogKHRoaXMueG1pbiAtIHgwKSAvICh4MSAtIHgwKSwgeCA9IHRoaXMueG1pbjtcbiAgICAgIGlmIChjMCkgeDAgPSB4LCB5MCA9IHksIGMwID0gdGhpcy5fcmVnaW9uY29kZSh4MCwgeTApO1xuICAgICAgZWxzZSB4MSA9IHgsIHkxID0geSwgYzEgPSB0aGlzLl9yZWdpb25jb2RlKHgxLCB5MSk7XG4gICAgfVxuICB9XG4gIF9jbGlwSW5maW5pdGUoaSwgcG9pbnRzLCB2eDAsIHZ5MCwgdnhuLCB2eW4pIHtcbiAgICBsZXQgUCA9IEFycmF5LmZyb20ocG9pbnRzKSwgcDtcbiAgICBpZiAocCA9IHRoaXMuX3Byb2plY3QoUFswXSwgUFsxXSwgdngwLCB2eTApKSBQLnVuc2hpZnQocFswXSwgcFsxXSk7XG4gICAgaWYgKHAgPSB0aGlzLl9wcm9qZWN0KFBbUC5sZW5ndGggLSAyXSwgUFtQLmxlbmd0aCAtIDFdLCB2eG4sIHZ5bikpIFAucHVzaChwWzBdLCBwWzFdKTtcbiAgICBpZiAoUCA9IHRoaXMuX2NsaXBGaW5pdGUoaSwgUCkpIHtcbiAgICAgIGZvciAobGV0IGogPSAwLCBuID0gUC5sZW5ndGgsIGMwLCBjMSA9IHRoaXMuX2VkZ2Vjb2RlKFBbbiAtIDJdLCBQW24gLSAxXSk7IGogPCBuOyBqICs9IDIpIHtcbiAgICAgICAgYzAgPSBjMSwgYzEgPSB0aGlzLl9lZGdlY29kZShQW2pdLCBQW2ogKyAxXSk7XG4gICAgICAgIGlmIChjMCAmJiBjMSkgaiA9IHRoaXMuX2VkZ2UoaSwgYzAsIGMxLCBQLCBqKSwgbiA9IFAubGVuZ3RoO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAodGhpcy5jb250YWlucyhpLCAodGhpcy54bWluICsgdGhpcy54bWF4KSAvIDIsICh0aGlzLnltaW4gKyB0aGlzLnltYXgpIC8gMikpIHtcbiAgICAgIFAgPSBbdGhpcy54bWluLCB0aGlzLnltaW4sIHRoaXMueG1heCwgdGhpcy55bWluLCB0aGlzLnhtYXgsIHRoaXMueW1heCwgdGhpcy54bWluLCB0aGlzLnltYXhdO1xuICAgIH1cbiAgICByZXR1cm4gUDtcbiAgfVxuICBfZWRnZShpLCBlMCwgZTEsIFAsIGopIHtcbiAgICB3aGlsZSAoZTAgIT09IGUxKSB7XG4gICAgICBsZXQgeCwgeTtcbiAgICAgIHN3aXRjaCAoZTApIHtcbiAgICAgICAgY2FzZSAwYjAxMDE6IGUwID0gMGIwMTAwOyBjb250aW51ZTsgLy8gdG9wLWxlZnRcbiAgICAgICAgY2FzZSAwYjAxMDA6IGUwID0gMGIwMTEwLCB4ID0gdGhpcy54bWF4LCB5ID0gdGhpcy55bWluOyBicmVhazsgLy8gdG9wXG4gICAgICAgIGNhc2UgMGIwMTEwOiBlMCA9IDBiMDAxMDsgY29udGludWU7IC8vIHRvcC1yaWdodFxuICAgICAgICBjYXNlIDBiMDAxMDogZTAgPSAwYjEwMTAsIHggPSB0aGlzLnhtYXgsIHkgPSB0aGlzLnltYXg7IGJyZWFrOyAvLyByaWdodFxuICAgICAgICBjYXNlIDBiMTAxMDogZTAgPSAwYjEwMDA7IGNvbnRpbnVlOyAvLyBib3R0b20tcmlnaHRcbiAgICAgICAgY2FzZSAwYjEwMDA6IGUwID0gMGIxMDAxLCB4ID0gdGhpcy54bWluLCB5ID0gdGhpcy55bWF4OyBicmVhazsgLy8gYm90dG9tXG4gICAgICAgIGNhc2UgMGIxMDAxOiBlMCA9IDBiMDAwMTsgY29udGludWU7IC8vIGJvdHRvbS1sZWZ0XG4gICAgICAgIGNhc2UgMGIwMDAxOiBlMCA9IDBiMDEwMSwgeCA9IHRoaXMueG1pbiwgeSA9IHRoaXMueW1pbjsgYnJlYWs7IC8vIGxlZnRcbiAgICAgIH1cbiAgICAgIGlmICgoUFtqXSAhPT0geCB8fCBQW2ogKyAxXSAhPT0geSkgJiYgdGhpcy5jb250YWlucyhpLCB4LCB5KSkge1xuICAgICAgICBQLnNwbGljZShqLCAwLCB4LCB5KSwgaiArPSAyO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gajtcbiAgfVxuICBfcHJvamVjdCh4MCwgeTAsIHZ4LCB2eSkge1xuICAgIGxldCB0ID0gSW5maW5pdHksIGMsIHgsIHk7XG4gICAgaWYgKHZ5IDwgMCkgeyAvLyB0b3BcbiAgICAgIGlmICh5MCA8PSB0aGlzLnltaW4pIHJldHVybiBudWxsO1xuICAgICAgaWYgKChjID0gKHRoaXMueW1pbiAtIHkwKSAvIHZ5KSA8IHQpIHkgPSB0aGlzLnltaW4sIHggPSB4MCArICh0ID0gYykgKiB2eDtcbiAgICB9IGVsc2UgaWYgKHZ5ID4gMCkgeyAvLyBib3R0b21cbiAgICAgIGlmICh5MCA+PSB0aGlzLnltYXgpIHJldHVybiBudWxsO1xuICAgICAgaWYgKChjID0gKHRoaXMueW1heCAtIHkwKSAvIHZ5KSA8IHQpIHkgPSB0aGlzLnltYXgsIHggPSB4MCArICh0ID0gYykgKiB2eDtcbiAgICB9XG4gICAgaWYgKHZ4ID4gMCkgeyAvLyByaWdodFxuICAgICAgaWYgKHgwID49IHRoaXMueG1heCkgcmV0dXJuIG51bGw7XG4gICAgICBpZiAoKGMgPSAodGhpcy54bWF4IC0geDApIC8gdngpIDwgdCkgeCA9IHRoaXMueG1heCwgeSA9IHkwICsgKHQgPSBjKSAqIHZ5O1xuICAgIH0gZWxzZSBpZiAodnggPCAwKSB7IC8vIGxlZnRcbiAgICAgIGlmICh4MCA8PSB0aGlzLnhtaW4pIHJldHVybiBudWxsO1xuICAgICAgaWYgKChjID0gKHRoaXMueG1pbiAtIHgwKSAvIHZ4KSA8IHQpIHggPSB0aGlzLnhtaW4sIHkgPSB5MCArICh0ID0gYykgKiB2eTtcbiAgICB9XG4gICAgcmV0dXJuIFt4LCB5XTtcbiAgfVxuICBfZWRnZWNvZGUoeCwgeSkge1xuICAgIHJldHVybiAoeCA9PT0gdGhpcy54bWluID8gMGIwMDAxXG4gICAgICAgIDogeCA9PT0gdGhpcy54bWF4ID8gMGIwMDEwIDogMGIwMDAwKVxuICAgICAgICB8ICh5ID09PSB0aGlzLnltaW4gPyAwYjAxMDBcbiAgICAgICAgOiB5ID09PSB0aGlzLnltYXggPyAwYjEwMDAgOiAwYjAwMDApO1xuICB9XG4gIF9yZWdpb25jb2RlKHgsIHkpIHtcbiAgICByZXR1cm4gKHggPCB0aGlzLnhtaW4gPyAwYjAwMDFcbiAgICAgICAgOiB4ID4gdGhpcy54bWF4ID8gMGIwMDEwIDogMGIwMDAwKVxuICAgICAgICB8ICh5IDwgdGhpcy55bWluID8gMGIwMTAwXG4gICAgICAgIDogeSA+IHRoaXMueW1heCA/IDBiMTAwMCA6IDBiMDAwMCk7XG4gIH1cbn1cbiIsIlxuY29uc3QgRVBTSUxPTiA9IE1hdGgucG93KDIsIC01Mik7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIERlbGF1bmF0b3Ige1xuXG4gICAgc3RhdGljIGZyb20ocG9pbnRzLCBnZXRYLCBnZXRZKSB7XG4gICAgICAgIGlmICghZ2V0WCkgZ2V0WCA9IGRlZmF1bHRHZXRYO1xuICAgICAgICBpZiAoIWdldFkpIGdldFkgPSBkZWZhdWx0R2V0WTtcblxuICAgICAgICBjb25zdCBuID0gcG9pbnRzLmxlbmd0aDtcbiAgICAgICAgY29uc3QgY29vcmRzID0gbmV3IEZsb2F0NjRBcnJheShuICogMik7XG5cbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBuOyBpKyspIHtcbiAgICAgICAgICAgIGNvbnN0IHAgPSBwb2ludHNbaV07XG4gICAgICAgICAgICBjb29yZHNbMiAqIGldID0gZ2V0WChwKTtcbiAgICAgICAgICAgIGNvb3Jkc1syICogaSArIDFdID0gZ2V0WShwKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBuZXcgRGVsYXVuYXRvcihjb29yZHMpO1xuICAgIH1cblxuICAgIGNvbnN0cnVjdG9yKGNvb3Jkcykge1xuICAgICAgICBsZXQgbWluWCA9IEluZmluaXR5O1xuICAgICAgICBsZXQgbWluWSA9IEluZmluaXR5O1xuICAgICAgICBsZXQgbWF4WCA9IC1JbmZpbml0eTtcbiAgICAgICAgbGV0IG1heFkgPSAtSW5maW5pdHk7XG5cbiAgICAgICAgY29uc3QgbiA9IGNvb3Jkcy5sZW5ndGggPj4gMTtcbiAgICAgICAgY29uc3QgaWRzID0gdGhpcy5pZHMgPSBuZXcgVWludDMyQXJyYXkobik7XG5cbiAgICAgICAgaWYgKG4gPiAwICYmIHR5cGVvZiBjb29yZHNbMF0gIT09ICdudW1iZXInKSB0aHJvdyBuZXcgRXJyb3IoJ0V4cGVjdGVkIGNvb3JkcyB0byBjb250YWluIG51bWJlcnMuJyk7XG5cbiAgICAgICAgdGhpcy5jb29yZHMgPSBjb29yZHM7XG5cbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBuOyBpKyspIHtcbiAgICAgICAgICAgIGNvbnN0IHggPSBjb29yZHNbMiAqIGldO1xuICAgICAgICAgICAgY29uc3QgeSA9IGNvb3Jkc1syICogaSArIDFdO1xuICAgICAgICAgICAgaWYgKHggPCBtaW5YKSBtaW5YID0geDtcbiAgICAgICAgICAgIGlmICh5IDwgbWluWSkgbWluWSA9IHk7XG4gICAgICAgICAgICBpZiAoeCA+IG1heFgpIG1heFggPSB4O1xuICAgICAgICAgICAgaWYgKHkgPiBtYXhZKSBtYXhZID0geTtcbiAgICAgICAgICAgIGlkc1tpXSA9IGk7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBjeCA9IChtaW5YICsgbWF4WCkgLyAyO1xuICAgICAgICBjb25zdCBjeSA9IChtaW5ZICsgbWF4WSkgLyAyO1xuXG4gICAgICAgIGxldCBtaW5EaXN0ID0gSW5maW5pdHk7XG4gICAgICAgIGxldCBpMCwgaTEsIGkyO1xuXG4gICAgICAgIC8vIHBpY2sgYSBzZWVkIHBvaW50IGNsb3NlIHRvIHRoZSBjZW50cm9pZFxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG47IGkrKykge1xuICAgICAgICAgICAgY29uc3QgZCA9IGRpc3QoY3gsIGN5LCBjb29yZHNbMiAqIGldLCBjb29yZHNbMiAqIGkgKyAxXSk7XG4gICAgICAgICAgICBpZiAoZCA8IG1pbkRpc3QpIHtcbiAgICAgICAgICAgICAgICBpMCA9IGk7XG4gICAgICAgICAgICAgICAgbWluRGlzdCA9IGQ7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgaTB4ID0gY29vcmRzWzIgKiBpMF07XG4gICAgICAgIGNvbnN0IGkweSA9IGNvb3Jkc1syICogaTAgKyAxXTtcblxuICAgICAgICBtaW5EaXN0ID0gSW5maW5pdHk7XG5cbiAgICAgICAgLy8gZmluZCB0aGUgcG9pbnQgY2xvc2VzdCB0byB0aGUgc2VlZFxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG47IGkrKykge1xuICAgICAgICAgICAgaWYgKGkgPT09IGkwKSBjb250aW51ZTtcbiAgICAgICAgICAgIGNvbnN0IGQgPSBkaXN0KGkweCwgaTB5LCBjb29yZHNbMiAqIGldLCBjb29yZHNbMiAqIGkgKyAxXSk7XG4gICAgICAgICAgICBpZiAoZCA8IG1pbkRpc3QgJiYgZCA+IDApIHtcbiAgICAgICAgICAgICAgICBpMSA9IGk7XG4gICAgICAgICAgICAgICAgbWluRGlzdCA9IGQ7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgbGV0IGkxeCA9IGNvb3Jkc1syICogaTFdO1xuICAgICAgICBsZXQgaTF5ID0gY29vcmRzWzIgKiBpMSArIDFdO1xuXG4gICAgICAgIGxldCBtaW5SYWRpdXMgPSBJbmZpbml0eTtcblxuICAgICAgICAvLyBmaW5kIHRoZSB0aGlyZCBwb2ludCB3aGljaCBmb3JtcyB0aGUgc21hbGxlc3QgY2lyY3VtY2lyY2xlIHdpdGggdGhlIGZpcnN0IHR3b1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG47IGkrKykge1xuICAgICAgICAgICAgaWYgKGkgPT09IGkwIHx8IGkgPT09IGkxKSBjb250aW51ZTtcbiAgICAgICAgICAgIGNvbnN0IHIgPSBjaXJjdW1yYWRpdXMoaTB4LCBpMHksIGkxeCwgaTF5LCBjb29yZHNbMiAqIGldLCBjb29yZHNbMiAqIGkgKyAxXSk7XG4gICAgICAgICAgICBpZiAociA8IG1pblJhZGl1cykge1xuICAgICAgICAgICAgICAgIGkyID0gaTtcbiAgICAgICAgICAgICAgICBtaW5SYWRpdXMgPSByO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGxldCBpMnggPSBjb29yZHNbMiAqIGkyXTtcbiAgICAgICAgbGV0IGkyeSA9IGNvb3Jkc1syICogaTIgKyAxXTtcblxuICAgICAgICBpZiAobWluUmFkaXVzID09PSBJbmZpbml0eSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdObyBEZWxhdW5heSB0cmlhbmd1bGF0aW9uIGV4aXN0cyBmb3IgdGhpcyBpbnB1dC4nKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIHN3YXAgdGhlIG9yZGVyIG9mIHRoZSBzZWVkIHBvaW50cyBmb3IgY291bnRlci1jbG9ja3dpc2Ugb3JpZW50YXRpb25cbiAgICAgICAgaWYgKG9yaWVudChpMHgsIGkweSwgaTF4LCBpMXksIGkyeCwgaTJ5KSkge1xuICAgICAgICAgICAgY29uc3QgaSA9IGkxO1xuICAgICAgICAgICAgY29uc3QgeCA9IGkxeDtcbiAgICAgICAgICAgIGNvbnN0IHkgPSBpMXk7XG4gICAgICAgICAgICBpMSA9IGkyO1xuICAgICAgICAgICAgaTF4ID0gaTJ4O1xuICAgICAgICAgICAgaTF5ID0gaTJ5O1xuICAgICAgICAgICAgaTIgPSBpO1xuICAgICAgICAgICAgaTJ4ID0geDtcbiAgICAgICAgICAgIGkyeSA9IHk7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBjZW50ZXIgPSBjaXJjdW1jZW50ZXIoaTB4LCBpMHksIGkxeCwgaTF5LCBpMngsIGkyeSk7XG4gICAgICAgIHRoaXMuX2N4ID0gY2VudGVyLng7XG4gICAgICAgIHRoaXMuX2N5ID0gY2VudGVyLnk7XG5cbiAgICAgICAgLy8gc29ydCB0aGUgcG9pbnRzIGJ5IGRpc3RhbmNlIGZyb20gdGhlIHNlZWQgdHJpYW5nbGUgY2lyY3VtY2VudGVyXG4gICAgICAgIHF1aWNrc29ydChpZHMsIGNvb3JkcywgMCwgaWRzLmxlbmd0aCAtIDEsIGNlbnRlci54LCBjZW50ZXIueSk7XG5cbiAgICAgICAgLy8gaW5pdGlhbGl6ZSBhIGhhc2ggdGFibGUgZm9yIHN0b3JpbmcgZWRnZXMgb2YgdGhlIGFkdmFuY2luZyBjb252ZXggaHVsbFxuICAgICAgICB0aGlzLl9oYXNoU2l6ZSA9IE1hdGguY2VpbChNYXRoLnNxcnQobikpO1xuICAgICAgICB0aGlzLl9oYXNoID0gbmV3IEFycmF5KHRoaXMuX2hhc2hTaXplKTtcblxuICAgICAgICAvLyBpbml0aWFsaXplIGEgY2lyY3VsYXIgZG91Ymx5LWxpbmtlZCBsaXN0IHRoYXQgd2lsbCBob2xkIGFuIGFkdmFuY2luZyBjb252ZXggaHVsbFxuICAgICAgICBsZXQgZSA9IHRoaXMuaHVsbCA9IGluc2VydE5vZGUoY29vcmRzLCBpMCk7XG4gICAgICAgIHRoaXMuX2hhc2hFZGdlKGUpO1xuICAgICAgICBlLnQgPSAwO1xuICAgICAgICBlID0gaW5zZXJ0Tm9kZShjb29yZHMsIGkxLCBlKTtcbiAgICAgICAgdGhpcy5faGFzaEVkZ2UoZSk7XG4gICAgICAgIGUudCA9IDE7XG4gICAgICAgIGUgPSBpbnNlcnROb2RlKGNvb3JkcywgaTIsIGUpO1xuICAgICAgICB0aGlzLl9oYXNoRWRnZShlKTtcbiAgICAgICAgZS50ID0gMjtcblxuICAgICAgICBjb25zdCBtYXhUcmlhbmdsZXMgPSAyICogbiAtIDU7XG4gICAgICAgIGNvbnN0IHRyaWFuZ2xlcyA9IHRoaXMudHJpYW5nbGVzID0gbmV3IFVpbnQzMkFycmF5KG1heFRyaWFuZ2xlcyAqIDMpO1xuICAgICAgICBjb25zdCBoYWxmZWRnZXMgPSB0aGlzLmhhbGZlZGdlcyA9IG5ldyBJbnQzMkFycmF5KG1heFRyaWFuZ2xlcyAqIDMpO1xuXG4gICAgICAgIHRoaXMudHJpYW5nbGVzTGVuID0gMDtcblxuICAgICAgICB0aGlzLl9hZGRUcmlhbmdsZShpMCwgaTEsIGkyLCAtMSwgLTEsIC0xKTtcblxuICAgICAgICBmb3IgKGxldCBrID0gMCwgeHAsIHlwOyBrIDwgaWRzLmxlbmd0aDsgaysrKSB7XG4gICAgICAgICAgICBjb25zdCBpID0gaWRzW2tdO1xuICAgICAgICAgICAgY29uc3QgeCA9IGNvb3Jkc1syICogaV07XG4gICAgICAgICAgICBjb25zdCB5ID0gY29vcmRzWzIgKiBpICsgMV07XG5cbiAgICAgICAgICAgIC8vIHNraXAgbmVhci1kdXBsaWNhdGUgcG9pbnRzXG4gICAgICAgICAgICBpZiAoayA+IDAgJiYgTWF0aC5hYnMoeCAtIHhwKSA8PSBFUFNJTE9OICYmIE1hdGguYWJzKHkgLSB5cCkgPD0gRVBTSUxPTikgY29udGludWU7XG4gICAgICAgICAgICB4cCA9IHg7XG4gICAgICAgICAgICB5cCA9IHk7XG5cbiAgICAgICAgICAgIC8vIHNraXAgc2VlZCB0cmlhbmdsZSBwb2ludHNcbiAgICAgICAgICAgIGlmIChpID09PSBpMCB8fCBpID09PSBpMSB8fCBpID09PSBpMikgY29udGludWU7XG5cbiAgICAgICAgICAgIC8vIGZpbmQgYSB2aXNpYmxlIGVkZ2Ugb24gdGhlIGNvbnZleCBodWxsIHVzaW5nIGVkZ2UgaGFzaFxuICAgICAgICAgICAgY29uc3Qgc3RhcnRLZXkgPSB0aGlzLl9oYXNoS2V5KHgsIHkpO1xuICAgICAgICAgICAgbGV0IGtleSA9IHN0YXJ0S2V5O1xuICAgICAgICAgICAgbGV0IHN0YXJ0O1xuICAgICAgICAgICAgZG8ge1xuICAgICAgICAgICAgICAgIHN0YXJ0ID0gdGhpcy5faGFzaFtrZXldO1xuICAgICAgICAgICAgICAgIGtleSA9IChrZXkgKyAxKSAlIHRoaXMuX2hhc2hTaXplO1xuICAgICAgICAgICAgfSB3aGlsZSAoKCFzdGFydCB8fCBzdGFydC5yZW1vdmVkKSAmJiBrZXkgIT09IHN0YXJ0S2V5KTtcblxuICAgICAgICAgICAgc3RhcnQgPSBzdGFydC5wcmV2O1xuICAgICAgICAgICAgZSA9IHN0YXJ0O1xuICAgICAgICAgICAgd2hpbGUgKCFvcmllbnQoeCwgeSwgZS54LCBlLnksIGUubmV4dC54LCBlLm5leHQueSkpIHtcbiAgICAgICAgICAgICAgICBlID0gZS5uZXh0O1xuICAgICAgICAgICAgICAgIGlmIChlID09PSBzdGFydCkge1xuICAgICAgICAgICAgICAgICAgICBlID0gbnVsbDtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gbGlrZWx5IGEgbmVhci1kdXBsaWNhdGUgcG9pbnQ7IHNraXAgaXRcbiAgICAgICAgICAgIGlmICghZSkgY29udGludWU7XG5cbiAgICAgICAgICAgIGNvbnN0IHdhbGtCYWNrID0gZSA9PT0gc3RhcnQ7XG5cbiAgICAgICAgICAgIC8vIGFkZCB0aGUgZmlyc3QgdHJpYW5nbGUgZnJvbSB0aGUgcG9pbnRcbiAgICAgICAgICAgIGxldCB0ID0gdGhpcy5fYWRkVHJpYW5nbGUoZS5pLCBpLCBlLm5leHQuaSwgLTEsIC0xLCBlLnQpO1xuXG4gICAgICAgICAgICBlLnQgPSB0OyAvLyBrZWVwIHRyYWNrIG9mIGJvdW5kYXJ5IHRyaWFuZ2xlcyBvbiB0aGUgaHVsbFxuICAgICAgICAgICAgZSA9IGluc2VydE5vZGUoY29vcmRzLCBpLCBlKTtcblxuICAgICAgICAgICAgLy8gcmVjdXJzaXZlbHkgZmxpcCB0cmlhbmdsZXMgZnJvbSB0aGUgcG9pbnQgdW50aWwgdGhleSBzYXRpc2Z5IHRoZSBEZWxhdW5heSBjb25kaXRpb25cbiAgICAgICAgICAgIGUudCA9IHRoaXMuX2xlZ2FsaXplKHQgKyAyKTtcblxuICAgICAgICAgICAgLy8gd2FsayBmb3J3YXJkIHRocm91Z2ggdGhlIGh1bGwsIGFkZGluZyBtb3JlIHRyaWFuZ2xlcyBhbmQgZmxpcHBpbmcgcmVjdXJzaXZlbHlcbiAgICAgICAgICAgIGxldCBxID0gZS5uZXh0O1xuICAgICAgICAgICAgd2hpbGUgKG9yaWVudCh4LCB5LCBxLngsIHEueSwgcS5uZXh0LngsIHEubmV4dC55KSkge1xuICAgICAgICAgICAgICAgIHQgPSB0aGlzLl9hZGRUcmlhbmdsZShxLmksIGksIHEubmV4dC5pLCBxLnByZXYudCwgLTEsIHEudCk7XG4gICAgICAgICAgICAgICAgcS5wcmV2LnQgPSB0aGlzLl9sZWdhbGl6ZSh0ICsgMik7XG4gICAgICAgICAgICAgICAgdGhpcy5odWxsID0gcmVtb3ZlTm9kZShxKTtcbiAgICAgICAgICAgICAgICBxID0gcS5uZXh0O1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAod2Fsa0JhY2spIHtcbiAgICAgICAgICAgICAgICAvLyB3YWxrIGJhY2t3YXJkIGZyb20gdGhlIG90aGVyIHNpZGUsIGFkZGluZyBtb3JlIHRyaWFuZ2xlcyBhbmQgZmxpcHBpbmdcbiAgICAgICAgICAgICAgICBxID0gZS5wcmV2O1xuICAgICAgICAgICAgICAgIHdoaWxlIChvcmllbnQoeCwgeSwgcS5wcmV2LngsIHEucHJldi55LCBxLngsIHEueSkpIHtcbiAgICAgICAgICAgICAgICAgICAgdCA9IHRoaXMuX2FkZFRyaWFuZ2xlKHEucHJldi5pLCBpLCBxLmksIC0xLCBxLnQsIHEucHJldi50KTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fbGVnYWxpemUodCArIDIpO1xuICAgICAgICAgICAgICAgICAgICBxLnByZXYudCA9IHQ7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaHVsbCA9IHJlbW92ZU5vZGUocSk7XG4gICAgICAgICAgICAgICAgICAgIHEgPSBxLnByZXY7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBzYXZlIHRoZSB0d28gbmV3IGVkZ2VzIGluIHRoZSBoYXNoIHRhYmxlXG4gICAgICAgICAgICB0aGlzLl9oYXNoRWRnZShlKTtcbiAgICAgICAgICAgIHRoaXMuX2hhc2hFZGdlKGUucHJldik7XG4gICAgICAgIH1cblxuICAgICAgICAvLyB0cmltIHR5cGVkIHRyaWFuZ2xlIG1lc2ggYXJyYXlzXG4gICAgICAgIHRoaXMudHJpYW5nbGVzID0gdHJpYW5nbGVzLnN1YmFycmF5KDAsIHRoaXMudHJpYW5nbGVzTGVuKTtcbiAgICAgICAgdGhpcy5oYWxmZWRnZXMgPSBoYWxmZWRnZXMuc3ViYXJyYXkoMCwgdGhpcy50cmlhbmdsZXNMZW4pO1xuICAgIH1cblxuICAgIF9oYXNoRWRnZShlKSB7XG4gICAgICAgIHRoaXMuX2hhc2hbdGhpcy5faGFzaEtleShlLngsIGUueSldID0gZTtcbiAgICB9XG5cbiAgICBfaGFzaEtleSh4LCB5KSB7XG4gICAgICAgIHJldHVybiBNYXRoLmZsb29yKHBzZXVkb0FuZ2xlKHggLSB0aGlzLl9jeCwgeSAtIHRoaXMuX2N5KSAqIHRoaXMuX2hhc2hTaXplKSAlIHRoaXMuX2hhc2hTaXplO1xuICAgIH1cblxuICAgIF9sZWdhbGl6ZShhKSB7XG4gICAgICAgIGNvbnN0IHt0cmlhbmdsZXMsIGNvb3JkcywgaGFsZmVkZ2VzfSA9IHRoaXM7XG5cbiAgICAgICAgY29uc3QgYiA9IGhhbGZlZGdlc1thXTtcblxuICAgICAgICAvKiBpZiB0aGUgcGFpciBvZiB0cmlhbmdsZXMgZG9lc24ndCBzYXRpc2Z5IHRoZSBEZWxhdW5heSBjb25kaXRpb25cbiAgICAgICAgICogKHAxIGlzIGluc2lkZSB0aGUgY2lyY3VtY2lyY2xlIG9mIFtwMCwgcGwsIHByXSksIGZsaXAgdGhlbSxcbiAgICAgICAgICogdGhlbiBkbyB0aGUgc2FtZSBjaGVjay9mbGlwIHJlY3Vyc2l2ZWx5IGZvciB0aGUgbmV3IHBhaXIgb2YgdHJpYW5nbGVzXG4gICAgICAgICAqXG4gICAgICAgICAqICAgICAgICAgICBwbCAgICAgICAgICAgICAgICAgICAgcGxcbiAgICAgICAgICogICAgICAgICAgL3x8XFwgICAgICAgICAgICAgICAgICAvICBcXFxuICAgICAgICAgKiAgICAgICBhbC8gfHwgXFxibCAgICAgICAgICAgIGFsLyAgICBcXGFcbiAgICAgICAgICogICAgICAgIC8gIHx8ICBcXCAgICAgICAgICAgICAgLyAgICAgIFxcXG4gICAgICAgICAqICAgICAgIC8gIGF8fGIgIFxcICAgIGZsaXAgICAgL19fX2FyX19fXFxcbiAgICAgICAgICogICAgIHAwXFwgICB8fCAgIC9wMSAgID0+ICAgcDBcXC0tLWJsLS0tL3AxXG4gICAgICAgICAqICAgICAgICBcXCAgfHwgIC8gICAgICAgICAgICAgIFxcICAgICAgL1xuICAgICAgICAgKiAgICAgICBhclxcIHx8IC9iciAgICAgICAgICAgICBiXFwgICAgL2JyXG4gICAgICAgICAqICAgICAgICAgIFxcfHwvICAgICAgICAgICAgICAgICAgXFwgIC9cbiAgICAgICAgICogICAgICAgICAgIHByICAgICAgICAgICAgICAgICAgICBwclxuICAgICAgICAgKi9cbiAgICAgICAgY29uc3QgYTAgPSBhIC0gYSAlIDM7XG4gICAgICAgIGNvbnN0IGIwID0gYiAtIGIgJSAzO1xuXG4gICAgICAgIGNvbnN0IGFsID0gYTAgKyAoYSArIDEpICUgMztcbiAgICAgICAgY29uc3QgYXIgPSBhMCArIChhICsgMikgJSAzO1xuICAgICAgICBjb25zdCBibCA9IGIwICsgKGIgKyAyKSAlIDM7XG5cbiAgICAgICAgaWYgKGIgPT09IC0xKSByZXR1cm4gYXI7XG5cbiAgICAgICAgY29uc3QgcDAgPSB0cmlhbmdsZXNbYXJdO1xuICAgICAgICBjb25zdCBwciA9IHRyaWFuZ2xlc1thXTtcbiAgICAgICAgY29uc3QgcGwgPSB0cmlhbmdsZXNbYWxdO1xuICAgICAgICBjb25zdCBwMSA9IHRyaWFuZ2xlc1tibF07XG5cbiAgICAgICAgY29uc3QgaWxsZWdhbCA9IGluQ2lyY2xlKFxuICAgICAgICAgICAgY29vcmRzWzIgKiBwMF0sIGNvb3Jkc1syICogcDAgKyAxXSxcbiAgICAgICAgICAgIGNvb3Jkc1syICogcHJdLCBjb29yZHNbMiAqIHByICsgMV0sXG4gICAgICAgICAgICBjb29yZHNbMiAqIHBsXSwgY29vcmRzWzIgKiBwbCArIDFdLFxuICAgICAgICAgICAgY29vcmRzWzIgKiBwMV0sIGNvb3Jkc1syICogcDEgKyAxXSk7XG5cbiAgICAgICAgaWYgKGlsbGVnYWwpIHtcbiAgICAgICAgICAgIHRyaWFuZ2xlc1thXSA9IHAxO1xuICAgICAgICAgICAgdHJpYW5nbGVzW2JdID0gcDA7XG5cbiAgICAgICAgICAgIGNvbnN0IGhibCA9IGhhbGZlZGdlc1tibF07XG5cbiAgICAgICAgICAgIC8vIGVkZ2Ugc3dhcHBlZCBvbiB0aGUgb3RoZXIgc2lkZSBvZiB0aGUgaHVsbCAocmFyZSk7IGZpeCB0aGUgaGFsZmVkZ2UgcmVmZXJlbmNlXG4gICAgICAgICAgICBpZiAoaGJsID09PSAtMSkge1xuICAgICAgICAgICAgICAgIGxldCBlID0gdGhpcy5odWxsO1xuICAgICAgICAgICAgICAgIGRvIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGUudCA9PT0gYmwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGUudCA9IGE7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlID0gZS5uZXh0O1xuICAgICAgICAgICAgICAgIH0gd2hpbGUgKGUgIT09IHRoaXMuaHVsbCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLl9saW5rKGEsIGhibCk7XG4gICAgICAgICAgICB0aGlzLl9saW5rKGIsIGhhbGZlZGdlc1thcl0pO1xuICAgICAgICAgICAgdGhpcy5fbGluayhhciwgYmwpO1xuXG4gICAgICAgICAgICBjb25zdCBiciA9IGIwICsgKGIgKyAxKSAlIDM7XG5cbiAgICAgICAgICAgIHRoaXMuX2xlZ2FsaXplKGEpO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2xlZ2FsaXplKGJyKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBhcjtcbiAgICB9XG5cbiAgICBfbGluayhhLCBiKSB7XG4gICAgICAgIHRoaXMuaGFsZmVkZ2VzW2FdID0gYjtcbiAgICAgICAgaWYgKGIgIT09IC0xKSB0aGlzLmhhbGZlZGdlc1tiXSA9IGE7XG4gICAgfVxuXG4gICAgLy8gYWRkIGEgbmV3IHRyaWFuZ2xlIGdpdmVuIHZlcnRleCBpbmRpY2VzIGFuZCBhZGphY2VudCBoYWxmLWVkZ2UgaWRzXG4gICAgX2FkZFRyaWFuZ2xlKGkwLCBpMSwgaTIsIGEsIGIsIGMpIHtcbiAgICAgICAgY29uc3QgdCA9IHRoaXMudHJpYW5nbGVzTGVuO1xuXG4gICAgICAgIHRoaXMudHJpYW5nbGVzW3RdID0gaTA7XG4gICAgICAgIHRoaXMudHJpYW5nbGVzW3QgKyAxXSA9IGkxO1xuICAgICAgICB0aGlzLnRyaWFuZ2xlc1t0ICsgMl0gPSBpMjtcblxuICAgICAgICB0aGlzLl9saW5rKHQsIGEpO1xuICAgICAgICB0aGlzLl9saW5rKHQgKyAxLCBiKTtcbiAgICAgICAgdGhpcy5fbGluayh0ICsgMiwgYyk7XG5cbiAgICAgICAgdGhpcy50cmlhbmdsZXNMZW4gKz0gMztcblxuICAgICAgICByZXR1cm4gdDtcbiAgICB9XG59XG5cbi8vIG1vbm90b25pY2FsbHkgaW5jcmVhc2VzIHdpdGggcmVhbCBhbmdsZSwgYnV0IGRvZXNuJ3QgbmVlZCBleHBlbnNpdmUgdHJpZ29ub21ldHJ5XG5mdW5jdGlvbiBwc2V1ZG9BbmdsZShkeCwgZHkpIHtcbiAgICBjb25zdCBwID0gZHggLyAoTWF0aC5hYnMoZHgpICsgTWF0aC5hYnMoZHkpKTtcbiAgICByZXR1cm4gKGR5ID4gMCA/IDMgLSBwIDogMSArIHApIC8gNDsgLy8gWzAuLjFdXG59XG5cbmZ1bmN0aW9uIGRpc3QoYXgsIGF5LCBieCwgYnkpIHtcbiAgICBjb25zdCBkeCA9IGF4IC0gYng7XG4gICAgY29uc3QgZHkgPSBheSAtIGJ5O1xuICAgIHJldHVybiBkeCAqIGR4ICsgZHkgKiBkeTtcbn1cblxuZnVuY3Rpb24gb3JpZW50KHB4LCBweSwgcXgsIHF5LCByeCwgcnkpIHtcbiAgICByZXR1cm4gKHF5IC0gcHkpICogKHJ4IC0gcXgpIC0gKHF4IC0gcHgpICogKHJ5IC0gcXkpIDwgMDtcbn1cblxuZnVuY3Rpb24gaW5DaXJjbGUoYXgsIGF5LCBieCwgYnksIGN4LCBjeSwgcHgsIHB5KSB7XG4gICAgY29uc3QgZHggPSBheCAtIHB4O1xuICAgIGNvbnN0IGR5ID0gYXkgLSBweTtcbiAgICBjb25zdCBleCA9IGJ4IC0gcHg7XG4gICAgY29uc3QgZXkgPSBieSAtIHB5O1xuICAgIGNvbnN0IGZ4ID0gY3ggLSBweDtcbiAgICBjb25zdCBmeSA9IGN5IC0gcHk7XG5cbiAgICBjb25zdCBhcCA9IGR4ICogZHggKyBkeSAqIGR5O1xuICAgIGNvbnN0IGJwID0gZXggKiBleCArIGV5ICogZXk7XG4gICAgY29uc3QgY3AgPSBmeCAqIGZ4ICsgZnkgKiBmeTtcblxuICAgIHJldHVybiBkeCAqIChleSAqIGNwIC0gYnAgKiBmeSkgLVxuICAgICAgICAgICBkeSAqIChleCAqIGNwIC0gYnAgKiBmeCkgK1xuICAgICAgICAgICBhcCAqIChleCAqIGZ5IC0gZXkgKiBmeCkgPCAwO1xufVxuXG5mdW5jdGlvbiBjaXJjdW1yYWRpdXMoYXgsIGF5LCBieCwgYnksIGN4LCBjeSkge1xuICAgIGNvbnN0IGR4ID0gYnggLSBheDtcbiAgICBjb25zdCBkeSA9IGJ5IC0gYXk7XG4gICAgY29uc3QgZXggPSBjeCAtIGF4O1xuICAgIGNvbnN0IGV5ID0gY3kgLSBheTtcblxuICAgIGNvbnN0IGJsID0gZHggKiBkeCArIGR5ICogZHk7XG4gICAgY29uc3QgY2wgPSBleCAqIGV4ICsgZXkgKiBleTtcbiAgICBjb25zdCBkID0gZHggKiBleSAtIGR5ICogZXg7XG5cbiAgICBjb25zdCB4ID0gKGV5ICogYmwgLSBkeSAqIGNsKSAqIDAuNSAvIGQ7XG4gICAgY29uc3QgeSA9IChkeCAqIGNsIC0gZXggKiBibCkgKiAwLjUgLyBkO1xuXG4gICAgcmV0dXJuIGJsICYmIGNsICYmIGQgJiYgKHggKiB4ICsgeSAqIHkpIHx8IEluZmluaXR5O1xufVxuXG5mdW5jdGlvbiBjaXJjdW1jZW50ZXIoYXgsIGF5LCBieCwgYnksIGN4LCBjeSkge1xuICAgIGNvbnN0IGR4ID0gYnggLSBheDtcbiAgICBjb25zdCBkeSA9IGJ5IC0gYXk7XG4gICAgY29uc3QgZXggPSBjeCAtIGF4O1xuICAgIGNvbnN0IGV5ID0gY3kgLSBheTtcblxuICAgIGNvbnN0IGJsID0gZHggKiBkeCArIGR5ICogZHk7XG4gICAgY29uc3QgY2wgPSBleCAqIGV4ICsgZXkgKiBleTtcbiAgICBjb25zdCBkID0gZHggKiBleSAtIGR5ICogZXg7XG5cbiAgICBjb25zdCB4ID0gYXggKyAoZXkgKiBibCAtIGR5ICogY2wpICogMC41IC8gZDtcbiAgICBjb25zdCB5ID0gYXkgKyAoZHggKiBjbCAtIGV4ICogYmwpICogMC41IC8gZDtcblxuICAgIHJldHVybiB7eCwgeX07XG59XG5cbi8vIGNyZWF0ZSBhIG5ldyBub2RlIGluIGEgZG91Ymx5IGxpbmtlZCBsaXN0XG5mdW5jdGlvbiBpbnNlcnROb2RlKGNvb3JkcywgaSwgcHJldikge1xuICAgIGNvbnN0IG5vZGUgPSB7XG4gICAgICAgIGksXG4gICAgICAgIHg6IGNvb3Jkc1syICogaV0sXG4gICAgICAgIHk6IGNvb3Jkc1syICogaSArIDFdLFxuICAgICAgICB0OiAwLFxuICAgICAgICBwcmV2OiBudWxsLFxuICAgICAgICBuZXh0OiBudWxsLFxuICAgICAgICByZW1vdmVkOiBmYWxzZVxuICAgIH07XG5cbiAgICBpZiAoIXByZXYpIHtcbiAgICAgICAgbm9kZS5wcmV2ID0gbm9kZTtcbiAgICAgICAgbm9kZS5uZXh0ID0gbm9kZTtcblxuICAgIH0gZWxzZSB7XG4gICAgICAgIG5vZGUubmV4dCA9IHByZXYubmV4dDtcbiAgICAgICAgbm9kZS5wcmV2ID0gcHJldjtcbiAgICAgICAgcHJldi5uZXh0LnByZXYgPSBub2RlO1xuICAgICAgICBwcmV2Lm5leHQgPSBub2RlO1xuICAgIH1cbiAgICByZXR1cm4gbm9kZTtcbn1cblxuZnVuY3Rpb24gcmVtb3ZlTm9kZShub2RlKSB7XG4gICAgbm9kZS5wcmV2Lm5leHQgPSBub2RlLm5leHQ7XG4gICAgbm9kZS5uZXh0LnByZXYgPSBub2RlLnByZXY7XG4gICAgbm9kZS5yZW1vdmVkID0gdHJ1ZTtcbiAgICByZXR1cm4gbm9kZS5wcmV2O1xufVxuXG5mdW5jdGlvbiBxdWlja3NvcnQoaWRzLCBjb29yZHMsIGxlZnQsIHJpZ2h0LCBjeCwgY3kpIHtcbiAgICBsZXQgaSwgaiwgdGVtcDtcblxuICAgIGlmIChyaWdodCAtIGxlZnQgPD0gMjApIHtcbiAgICAgICAgZm9yIChpID0gbGVmdCArIDE7IGkgPD0gcmlnaHQ7IGkrKykge1xuICAgICAgICAgICAgdGVtcCA9IGlkc1tpXTtcbiAgICAgICAgICAgIGogPSBpIC0gMTtcbiAgICAgICAgICAgIHdoaWxlIChqID49IGxlZnQgJiYgY29tcGFyZShjb29yZHMsIGlkc1tqXSwgdGVtcCwgY3gsIGN5KSA+IDApIGlkc1tqICsgMV0gPSBpZHNbai0tXTtcbiAgICAgICAgICAgIGlkc1tqICsgMV0gPSB0ZW1wO1xuICAgICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgICAgY29uc3QgbWVkaWFuID0gKGxlZnQgKyByaWdodCkgPj4gMTtcbiAgICAgICAgaSA9IGxlZnQgKyAxO1xuICAgICAgICBqID0gcmlnaHQ7XG4gICAgICAgIHN3YXAoaWRzLCBtZWRpYW4sIGkpO1xuICAgICAgICBpZiAoY29tcGFyZShjb29yZHMsIGlkc1tsZWZ0XSwgaWRzW3JpZ2h0XSwgY3gsIGN5KSA+IDApIHN3YXAoaWRzLCBsZWZ0LCByaWdodCk7XG4gICAgICAgIGlmIChjb21wYXJlKGNvb3JkcywgaWRzW2ldLCBpZHNbcmlnaHRdLCBjeCwgY3kpID4gMCkgc3dhcChpZHMsIGksIHJpZ2h0KTtcbiAgICAgICAgaWYgKGNvbXBhcmUoY29vcmRzLCBpZHNbbGVmdF0sIGlkc1tpXSwgY3gsIGN5KSA+IDApIHN3YXAoaWRzLCBsZWZ0LCBpKTtcblxuICAgICAgICB0ZW1wID0gaWRzW2ldO1xuICAgICAgICB3aGlsZSAodHJ1ZSkge1xuICAgICAgICAgICAgZG8gaSsrOyB3aGlsZSAoY29tcGFyZShjb29yZHMsIGlkc1tpXSwgdGVtcCwgY3gsIGN5KSA8IDApO1xuICAgICAgICAgICAgZG8gai0tOyB3aGlsZSAoY29tcGFyZShjb29yZHMsIGlkc1tqXSwgdGVtcCwgY3gsIGN5KSA+IDApO1xuICAgICAgICAgICAgaWYgKGogPCBpKSBicmVhaztcbiAgICAgICAgICAgIHN3YXAoaWRzLCBpLCBqKTtcbiAgICAgICAgfVxuICAgICAgICBpZHNbbGVmdCArIDFdID0gaWRzW2pdO1xuICAgICAgICBpZHNbal0gPSB0ZW1wO1xuXG4gICAgICAgIGlmIChyaWdodCAtIGkgKyAxID49IGogLSBsZWZ0KSB7XG4gICAgICAgICAgICBxdWlja3NvcnQoaWRzLCBjb29yZHMsIGksIHJpZ2h0LCBjeCwgY3kpO1xuICAgICAgICAgICAgcXVpY2tzb3J0KGlkcywgY29vcmRzLCBsZWZ0LCBqIC0gMSwgY3gsIGN5KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHF1aWNrc29ydChpZHMsIGNvb3JkcywgbGVmdCwgaiAtIDEsIGN4LCBjeSk7XG4gICAgICAgICAgICBxdWlja3NvcnQoaWRzLCBjb29yZHMsIGksIHJpZ2h0LCBjeCwgY3kpO1xuICAgICAgICB9XG4gICAgfVxufVxuXG5mdW5jdGlvbiBjb21wYXJlKGNvb3JkcywgaSwgaiwgY3gsIGN5KSB7XG4gICAgY29uc3QgZDEgPSBkaXN0KGNvb3Jkc1syICogaV0sIGNvb3Jkc1syICogaSArIDFdLCBjeCwgY3kpO1xuICAgIGNvbnN0IGQyID0gZGlzdChjb29yZHNbMiAqIGpdLCBjb29yZHNbMiAqIGogKyAxXSwgY3gsIGN5KTtcbiAgICByZXR1cm4gKGQxIC0gZDIpIHx8IChjb29yZHNbMiAqIGldIC0gY29vcmRzWzIgKiBqXSkgfHwgKGNvb3Jkc1syICogaSArIDFdIC0gY29vcmRzWzIgKiBqICsgMV0pO1xufVxuXG5mdW5jdGlvbiBzd2FwKGFyciwgaSwgaikge1xuICAgIGNvbnN0IHRtcCA9IGFycltpXTtcbiAgICBhcnJbaV0gPSBhcnJbal07XG4gICAgYXJyW2pdID0gdG1wO1xufVxuXG5mdW5jdGlvbiBkZWZhdWx0R2V0WChwKSB7XG4gICAgcmV0dXJuIHBbMF07XG59XG5mdW5jdGlvbiBkZWZhdWx0R2V0WShwKSB7XG4gICAgcmV0dXJuIHBbMV07XG59XG4iXSwic291cmNlUm9vdCI6IiJ9