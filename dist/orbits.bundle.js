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
/******/ 	return __webpack_require__(__webpack_require__.s = "./orbits/js/entry.js");
/******/ })
/************************************************************************/
/******/ ({

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


/***/ }),

/***/ "./node_modules/file-saver/dist/FileSaver.min.js":
/*!*******************************************************!*\
  !*** ./node_modules/file-saver/dist/FileSaver.min.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function(a,b){if(true)!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (b),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));else {}})(this,function(){"use strict";function b(a,b){return"undefined"==typeof b?b={autoBom:!1}:"object"!=typeof b&&(console.warn("Deprecated: Expected third argument to be a object"),b={autoBom:!b}),b.autoBom&&/^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(a.type)?new Blob(["\uFEFF",a],{type:a.type}):a}function c(b,c,d){var e=new XMLHttpRequest;e.open("GET",b),e.responseType="blob",e.onload=function(){a(e.response,c,d)},e.onerror=function(){console.error("could not download file")},e.send()}function d(a){var b=new XMLHttpRequest;return b.open("HEAD",a,!1),b.send(),200<=b.status&&299>=b.status}function e(a){try{a.dispatchEvent(new MouseEvent("click"))}catch(c){var b=document.createEvent("MouseEvents");b.initMouseEvent("click",!0,!0,window,0,0,0,80,20,!1,!1,!1,!1,0,null),a.dispatchEvent(b)}}var f="object"==typeof window&&window.window===window?window:"object"==typeof self&&self.self===self?self:"object"==typeof global&&global.global===global?global:void 0,a=f.saveAs||("object"!=typeof window||window!==f?function(){}:"download"in HTMLAnchorElement.prototype?function(b,g,h){var i=f.URL||f.webkitURL,j=document.createElement("a");g=g||b.name||"download",j.download=g,j.rel="noopener","string"==typeof b?(j.href=b,j.origin===location.origin?e(j):d(j.href)?c(b,g,h):e(j,j.target="_blank")):(j.href=i.createObjectURL(b),setTimeout(function(){i.revokeObjectURL(j.href)},4E4),setTimeout(function(){e(j)},0))}:"msSaveOrOpenBlob"in navigator?function(f,g,h){if(g=g||f.name||"download","string"!=typeof f)navigator.msSaveOrOpenBlob(b(f,h),g);else if(d(f))c(f,g,h);else{var i=document.createElement("a");i.href=f,i.target="_blank",setTimeout(function(){e(i)})}}:function(a,b,d,e){if(e=e||open("","_blank"),e&&(e.document.title=e.document.body.innerText="downloading..."),"string"==typeof a)return c(a,b,d);var g="application/octet-stream"===a.type,h=/constructor/i.test(f.HTMLElement)||f.safari,i=/CriOS\/[\d]+/.test(navigator.userAgent);if((i||g&&h)&&"object"==typeof FileReader){var j=new FileReader;j.onloadend=function(){var a=j.result;a=i?a:a.replace(/^data:[^;]*;/,"data:attachment/file;"),e?e.location.href=a:location=a,e=null},j.readAsDataURL(a)}else{var k=f.URL||f.webkitURL,l=k.createObjectURL(a);e?e.location=l:location.href=l,e=null,setTimeout(function(){k.revokeObjectURL(l)},4E4)}});f.saveAs=a.saveAs=a, true&&(module.exports=a)});

//# sourceMappingURL=FileSaver.min.js.map
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./node_modules/svg-points/modules/index.js":
/*!**************************************************!*\
  !*** ./node_modules/svg-points/modules/index.js ***!
  \**************************************************/
/*! exports provided: toPath, toPoints, valid */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _toPath__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./toPath */ "./node_modules/svg-points/modules/toPath.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "toPath", function() { return _toPath__WEBPACK_IMPORTED_MODULE_0__["default"]; });

/* harmony import */ var _toPoints__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./toPoints */ "./node_modules/svg-points/modules/toPoints.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "toPoints", function() { return _toPoints__WEBPACK_IMPORTED_MODULE_1__["default"]; });

/* harmony import */ var _valid__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./valid */ "./node_modules/svg-points/modules/valid.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "valid", function() { return _valid__WEBPACK_IMPORTED_MODULE_2__["default"]; });







/***/ }),

/***/ "./node_modules/svg-points/modules/toPath.js":
/*!***************************************************!*\
  !*** ./node_modules/svg-points/modules/toPath.js ***!
  \***************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _toPoints__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./toPoints */ "./node_modules/svg-points/modules/toPoints.js");


var pointsToD = function pointsToD(p) {
  var d = '';
  var i = 0;
  var firstPoint = void 0;

  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = p[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var point = _step.value;
      var _point$curve = point.curve,
          curve = _point$curve === undefined ? false : _point$curve,
          moveTo = point.moveTo,
          x = point.x,
          y = point.y;

      var isFirstPoint = i === 0 || moveTo;
      var isLastPoint = i === p.length - 1 || p[i + 1].moveTo;
      var prevPoint = i === 0 ? null : p[i - 1];

      if (isFirstPoint) {
        firstPoint = point;

        if (!isLastPoint) {
          d += 'M' + x + ',' + y;
        }
      } else if (curve) {
        switch (curve.type) {
          case 'arc':
            var _point$curve2 = point.curve,
                _point$curve2$largeAr = _point$curve2.largeArcFlag,
                largeArcFlag = _point$curve2$largeAr === undefined ? 0 : _point$curve2$largeAr,
                rx = _point$curve2.rx,
                ry = _point$curve2.ry,
                _point$curve2$sweepFl = _point$curve2.sweepFlag,
                sweepFlag = _point$curve2$sweepFl === undefined ? 0 : _point$curve2$sweepFl,
                _point$curve2$xAxisRo = _point$curve2.xAxisRotation,
                xAxisRotation = _point$curve2$xAxisRo === undefined ? 0 : _point$curve2$xAxisRo;

            d += 'A' + rx + ',' + ry + ',' + xAxisRotation + ',' + largeArcFlag + ',' + sweepFlag + ',' + x + ',' + y;
            break;
          case 'cubic':
            var _point$curve3 = point.curve,
                cx1 = _point$curve3.x1,
                cy1 = _point$curve3.y1,
                cx2 = _point$curve3.x2,
                cy2 = _point$curve3.y2;

            d += 'C' + cx1 + ',' + cy1 + ',' + cx2 + ',' + cy2 + ',' + x + ',' + y;
            break;
          case 'quadratic':
            var _point$curve4 = point.curve,
                qx1 = _point$curve4.x1,
                qy1 = _point$curve4.y1;

            d += 'Q' + qx1 + ',' + qy1 + ',' + x + ',' + y;
            break;
        }

        if (isLastPoint && x === firstPoint.x && y === firstPoint.y) {
          d += 'Z';
        }
      } else if (isLastPoint && x === firstPoint.x && y === firstPoint.y) {
        d += 'Z';
      } else if (x !== prevPoint.x && y !== prevPoint.y) {
        d += 'L' + x + ',' + y;
      } else if (x !== prevPoint.x) {
        d += 'H' + x;
      } else if (y !== prevPoint.y) {
        d += 'V' + y;
      }

      i++;
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  return d;
};

var toPath = function toPath(s) {
  var isPoints = Array.isArray(s);
  var isGroup = isPoints ? Array.isArray(s[0]) : s.type === 'g';
  var points = isPoints ? s : isGroup ? s.shapes.map(function (shp) {
    return Object(_toPoints__WEBPACK_IMPORTED_MODULE_0__["default"])(shp);
  }) : Object(_toPoints__WEBPACK_IMPORTED_MODULE_0__["default"])(s);

  if (isGroup) {
    return points.map(function (p) {
      return pointsToD(p);
    });
  }

  return pointsToD(points);
};

/* harmony default export */ __webpack_exports__["default"] = (toPath);

/***/ }),

/***/ "./node_modules/svg-points/modules/toPoints.js":
/*!*****************************************************!*\
  !*** ./node_modules/svg-points/modules/toPoints.js ***!
  \*****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var toPoints = function toPoints(_ref) {
  var type = _ref.type,
      props = _objectWithoutProperties(_ref, ['type']);

  switch (type) {
    case 'circle':
      return getPointsFromCircle(props);
    case 'ellipse':
      return getPointsFromEllipse(props);
    case 'line':
      return getPointsFromLine(props);
    case 'path':
      return getPointsFromPath(props);
    case 'polygon':
      return getPointsFromPolygon(props);
    case 'polyline':
      return getPointsFromPolyline(props);
    case 'rect':
      return getPointsFromRect(props);
    case 'g':
      return getPointsFromG(props);
    default:
      throw new Error('Not a valid shape type');
  }
};

var getPointsFromCircle = function getPointsFromCircle(_ref2) {
  var cx = _ref2.cx,
      cy = _ref2.cy,
      r = _ref2.r;

  return [{ x: cx, y: cy - r, moveTo: true }, { x: cx, y: cy + r, curve: { type: 'arc', rx: r, ry: r, sweepFlag: 1 } }, { x: cx, y: cy - r, curve: { type: 'arc', rx: r, ry: r, sweepFlag: 1 } }];
};

var getPointsFromEllipse = function getPointsFromEllipse(_ref3) {
  var cx = _ref3.cx,
      cy = _ref3.cy,
      rx = _ref3.rx,
      ry = _ref3.ry;

  return [{ x: cx, y: cy - ry, moveTo: true }, { x: cx, y: cy + ry, curve: { type: 'arc', rx: rx, ry: ry, sweepFlag: 1 } }, { x: cx, y: cy - ry, curve: { type: 'arc', rx: rx, ry: ry, sweepFlag: 1 } }];
};

var getPointsFromLine = function getPointsFromLine(_ref4) {
  var x1 = _ref4.x1,
      x2 = _ref4.x2,
      y1 = _ref4.y1,
      y2 = _ref4.y2;

  return [{ x: x1, y: y1, moveTo: true }, { x: x2, y: y2 }];
};

var validCommands = /[MmLlHhVvCcSsQqTtAaZz]/g;

var commandLengths = {
  A: 7,
  C: 6,
  H: 1,
  L: 2,
  M: 2,
  Q: 4,
  S: 4,
  T: 2,
  V: 1,
  Z: 0
};

var relativeCommands = ['a', 'c', 'h', 'l', 'm', 'q', 's', 't', 'v'];

var isRelative = function isRelative(command) {
  return relativeCommands.indexOf(command) !== -1;
};

var optionalArcKeys = ['xAxisRotation', 'largeArcFlag', 'sweepFlag'];

var getCommands = function getCommands(d) {
  return d.match(validCommands);
};

var getParams = function getParams(d) {
  return d.split(validCommands).map(function (v) {
    return v.replace(/[0-9]+-/g, function (m) {
      return m.slice(0, -1) + ' -';
    });
  }).map(function (v) {
    return v.replace(/\.[0-9]+/g, function (m) {
      return m + ' ';
    });
  }).map(function (v) {
    return v.trim();
  }).filter(function (v) {
    return v.length > 0;
  }).map(function (v) {
    return v.split(/[ ,]+/).map(parseFloat).filter(function (n) {
      return !isNaN(n);
    });
  });
};

var getPointsFromPath = function getPointsFromPath(_ref5) {
  var d = _ref5.d;

  var commands = getCommands(d);
  var params = getParams(d);

  var points = [];

  var moveTo = void 0;

  for (var i = 0, l = commands.length; i < l; i++) {
    var command = commands[i];
    var upperCaseCommand = command.toUpperCase();
    var commandLength = commandLengths[upperCaseCommand];
    var relative = isRelative(command);

    if (commandLength > 0) {
      var commandParams = params.shift();
      var iterations = commandParams.length / commandLength;

      for (var j = 0; j < iterations; j++) {
        var prevPoint = points[points.length - 1] || { x: 0, y: 0 };

        switch (upperCaseCommand) {
          case 'M':
            var x = (relative ? prevPoint.x : 0) + commandParams.shift();
            var y = (relative ? prevPoint.y : 0) + commandParams.shift();

            if (j === 0) {
              moveTo = { x: x, y: y };
              points.push({ x: x, y: y, moveTo: true });
            } else {
              points.push({ x: x, y: y });
            }

            break;

          case 'L':
            points.push({
              x: (relative ? prevPoint.x : 0) + commandParams.shift(),
              y: (relative ? prevPoint.y : 0) + commandParams.shift()
            });

            break;

          case 'H':
            points.push({
              x: (relative ? prevPoint.x : 0) + commandParams.shift(),
              y: prevPoint.y
            });

            break;

          case 'V':
            points.push({
              x: prevPoint.x,
              y: (relative ? prevPoint.y : 0) + commandParams.shift()
            });

            break;

          case 'A':
            points.push({
              curve: {
                type: 'arc',
                rx: commandParams.shift(),
                ry: commandParams.shift(),
                xAxisRotation: commandParams.shift(),
                largeArcFlag: commandParams.shift(),
                sweepFlag: commandParams.shift()
              },
              x: (relative ? prevPoint.x : 0) + commandParams.shift(),
              y: (relative ? prevPoint.y : 0) + commandParams.shift()
            });

            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
              for (var _iterator = optionalArcKeys[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                var k = _step.value;

                if (points[points.length - 1]['curve'][k] === 0) {
                  delete points[points.length - 1]['curve'][k];
                }
              }
            } catch (err) {
              _didIteratorError = true;
              _iteratorError = err;
            } finally {
              try {
                if (!_iteratorNormalCompletion && _iterator.return) {
                  _iterator.return();
                }
              } finally {
                if (_didIteratorError) {
                  throw _iteratorError;
                }
              }
            }

            break;

          case 'C':
            points.push({
              curve: {
                type: 'cubic',
                x1: (relative ? prevPoint.x : 0) + commandParams.shift(),
                y1: (relative ? prevPoint.y : 0) + commandParams.shift(),
                x2: (relative ? prevPoint.x : 0) + commandParams.shift(),
                y2: (relative ? prevPoint.y : 0) + commandParams.shift()
              },
              x: (relative ? prevPoint.x : 0) + commandParams.shift(),
              y: (relative ? prevPoint.y : 0) + commandParams.shift()
            });

            break;

          case 'S':
            var sx2 = (relative ? prevPoint.x : 0) + commandParams.shift();
            var sy2 = (relative ? prevPoint.y : 0) + commandParams.shift();
            var sx = (relative ? prevPoint.x : 0) + commandParams.shift();
            var sy = (relative ? prevPoint.y : 0) + commandParams.shift();

            var diff = {};

            var sx1 = void 0;
            var sy1 = void 0;

            if (prevPoint.curve && prevPoint.curve.type === 'cubic') {
              diff.x = Math.abs(prevPoint.x - prevPoint.curve.x2);
              diff.y = Math.abs(prevPoint.y - prevPoint.curve.y2);
              sx1 = prevPoint.x < prevPoint.curve.x2 ? prevPoint.x - diff.x : prevPoint.x + diff.x;
              sy1 = prevPoint.y < prevPoint.curve.y2 ? prevPoint.y - diff.y : prevPoint.y + diff.y;
            } else {
              diff.x = Math.abs(sx - sx2);
              diff.y = Math.abs(sy - sy2);
              sx1 = prevPoint.x;
              sy1 = prevPoint.y;
            }

            points.push({ curve: { type: 'cubic', x1: sx1, y1: sy1, x2: sx2, y2: sy2 }, x: sx, y: sy });

            break;

          case 'Q':
            points.push({
              curve: {
                type: 'quadratic',
                x1: (relative ? prevPoint.x : 0) + commandParams.shift(),
                y1: (relative ? prevPoint.y : 0) + commandParams.shift()
              },
              x: (relative ? prevPoint.x : 0) + commandParams.shift(),
              y: (relative ? prevPoint.y : 0) + commandParams.shift()
            });

            break;

          case 'T':
            var tx = (relative ? prevPoint.x : 0) + commandParams.shift();
            var ty = (relative ? prevPoint.y : 0) + commandParams.shift();

            var tx1 = void 0;
            var ty1 = void 0;

            if (prevPoint.curve && prevPoint.curve.type === 'quadratic') {
              var _diff = {
                x: Math.abs(prevPoint.x - prevPoint.curve.x1),
                y: Math.abs(prevPoint.y - prevPoint.curve.y1)
              };

              tx1 = prevPoint.x < prevPoint.curve.x1 ? prevPoint.x - _diff.x : prevPoint.x + _diff.x;
              ty1 = prevPoint.y < prevPoint.curve.y1 ? prevPoint.y - _diff.y : prevPoint.y + _diff.y;
            } else {
              tx1 = prevPoint.x;
              ty1 = prevPoint.y;
            }

            points.push({ curve: { type: 'quadratic', x1: tx1, y1: ty1 }, x: tx, y: ty });

            break;
        }
      }
    } else {
      var _prevPoint = points[points.length - 1] || { x: 0, y: 0 };

      if (_prevPoint.x !== moveTo.x || _prevPoint.y !== moveTo.y) {
        points.push({ x: moveTo.x, y: moveTo.y });
      }
    }
  }

  return points;
};

var getPointsFromPolygon = function getPointsFromPolygon(_ref6) {
  var points = _ref6.points;

  return getPointsFromPoints({ closed: true, points: points });
};

var getPointsFromPolyline = function getPointsFromPolyline(_ref7) {
  var points = _ref7.points;

  return getPointsFromPoints({ closed: false, points: points });
};

var getPointsFromPoints = function getPointsFromPoints(_ref8) {
  var closed = _ref8.closed,
      points = _ref8.points;

  var numbers = points.split(/[\s,]+/).map(function (n) {
    return parseFloat(n);
  });

  var p = numbers.reduce(function (arr, point, i) {
    if (i % 2 === 0) {
      arr.push({ x: point });
    } else {
      arr[(i - 1) / 2].y = point;
    }

    return arr;
  }, []);

  if (closed) {
    p.push(_extends({}, p[0]));
  }

  p[0].moveTo = true;

  return p;
};

var getPointsFromRect = function getPointsFromRect(_ref9) {
  var height = _ref9.height,
      rx = _ref9.rx,
      ry = _ref9.ry,
      width = _ref9.width,
      x = _ref9.x,
      y = _ref9.y;

  if (rx || ry) {
    return getPointsFromRectWithCornerRadius({
      height: height,
      rx: rx || ry,
      ry: ry || rx,
      width: width,
      x: x,
      y: y
    });
  }

  return getPointsFromBasicRect({ height: height, width: width, x: x, y: y });
};

var getPointsFromBasicRect = function getPointsFromBasicRect(_ref10) {
  var height = _ref10.height,
      width = _ref10.width,
      x = _ref10.x,
      y = _ref10.y;

  return [{ x: x, y: y, moveTo: true }, { x: x + width, y: y }, { x: x + width, y: y + height }, { x: x, y: y + height }, { x: x, y: y }];
};

var getPointsFromRectWithCornerRadius = function getPointsFromRectWithCornerRadius(_ref11) {
  var height = _ref11.height,
      rx = _ref11.rx,
      ry = _ref11.ry,
      width = _ref11.width,
      x = _ref11.x,
      y = _ref11.y;

  var curve = { type: 'arc', rx: rx, ry: ry, sweepFlag: 1 };

  return [{ x: x + rx, y: y, moveTo: true }, { x: x + width - rx, y: y }, { x: x + width, y: y + ry, curve: curve }, { x: x + width, y: y + height - ry }, { x: x + width - rx, y: y + height, curve: curve }, { x: x + rx, y: y + height }, { x: x, y: y + height - ry, curve: curve }, { x: x, y: y + ry }, { x: x + rx, y: y, curve: curve }];
};

var getPointsFromG = function getPointsFromG(_ref12) {
  var shapes = _ref12.shapes;
  return shapes.map(function (s) {
    return toPoints(s);
  });
};

/* harmony default export */ __webpack_exports__["default"] = (toPoints);

/***/ }),

/***/ "./node_modules/svg-points/modules/valid.js":
/*!**************************************************!*\
  !*** ./node_modules/svg-points/modules/valid.js ***!
  \**************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var getErrors = function getErrors(shape) {
  var rules = getRules(shape);
  var errors = [];

  rules.map(function (_ref) {
    var match = _ref.match,
        prop = _ref.prop,
        required = _ref.required,
        type = _ref.type;

    if (typeof shape[prop] === 'undefined') {
      if (required) {
        errors.push(prop + ' prop is required' + (prop === 'type' ? '' : ' on a ' + shape.type));
      }
    } else {
      if (typeof type !== 'undefined') {
        if (type === 'array') {
          if (!Array.isArray(shape[prop])) {
            errors.push(prop + ' prop must be of type array');
          }
        } else if (_typeof(shape[prop]) !== type) {
          // eslint-disable-line valid-typeof
          errors.push(prop + ' prop must be of type ' + type);
        }
      }

      if (Array.isArray(match)) {
        if (match.indexOf(shape[prop]) === -1) {
          errors.push(prop + ' prop must be one of ' + match.join(', '));
        }
      }
    }
  });

  if (shape.type === 'g' && Array.isArray(shape.shapes)) {
    var childErrors = shape.shapes.map(function (s) {
      return getErrors(s);
    });
    return [].concat.apply(errors, childErrors);
  }

  return errors;
};

var getRules = function getRules(shape) {
  var rules = [{
    match: ['circle', 'ellipse', 'line', 'path', 'polygon', 'polyline', 'rect', 'g'],
    prop: 'type',
    required: true,
    type: 'string'
  }];

  switch (shape.type) {
    case 'circle':
      rules.push({ prop: 'cx', required: true, type: 'number' });
      rules.push({ prop: 'cy', required: true, type: 'number' });
      rules.push({ prop: 'r', required: true, type: 'number' });
      break;

    case 'ellipse':
      rules.push({ prop: 'cx', required: true, type: 'number' });
      rules.push({ prop: 'cy', required: true, type: 'number' });
      rules.push({ prop: 'rx', required: true, type: 'number' });
      rules.push({ prop: 'ry', required: true, type: 'number' });
      break;

    case 'line':
      rules.push({ prop: 'x1', required: true, type: 'number' });
      rules.push({ prop: 'x2', required: true, type: 'number' });
      rules.push({ prop: 'y1', required: true, type: 'number' });
      rules.push({ prop: 'y2', required: true, type: 'number' });
      break;

    case 'path':
      rules.push({ prop: 'd', required: true, type: 'string' });
      break;

    case 'polygon':
    case 'polyline':
      rules.push({ prop: 'points', required: true, type: 'string' });
      break;

    case 'rect':
      rules.push({ prop: 'height', required: true, type: 'number' });
      rules.push({ prop: 'rx', type: 'number' });
      rules.push({ prop: 'ry', type: 'number' });
      rules.push({ prop: 'width', required: true, type: 'number' });
      rules.push({ prop: 'x', required: true, type: 'number' });
      rules.push({ prop: 'y', required: true, type: 'number' });
      break;

    case 'g':
      rules.push({ prop: 'shapes', required: true, type: 'array' });
      break;
  }

  return rules;
};

var valid = function valid(shape) {
  var errors = getErrors(shape);

  return {
    errors: errors,
    valid: errors.length === 0
  };
};

/* harmony default export */ __webpack_exports__["default"] = (valid);

/***/ }),

/***/ "./node_modules/webpack/buildin/global.js":
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ "./orbits/js/Ring.js":
/*!***************************!*\
  !*** ./orbits/js/Ring.js ***!
  \***************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Ring; });
class Ring {
  constructor(numPoints, radius, centerX = undefined, centerY = undefined) {
    this.numPoints = numPoints;
    this.radius = radius;
    this.radiusOffset = 0;
    this.radiusOffsetScaler = Math.random() * (10 - -10) + -10;
    
    this.points = [];

    this.angle = 0;
    this.velocity = (Math.random() * (10 - 7) + 7) / 10000;
    this.velocity = ((Math.random() * (1 - -1) + -1) < 0) ? this.velocity *= -1 : this.velocity; 
    this.targetAngle = 0;

    this.center = {};
    this.center.x = (centerX != undefined) ? centerX : window.innerWidth / 2;
    this.center.y = (centerY != undefined) ? centerY : window.innerHeight / 2;

    this.animationMode = 'rotation';

    this.subrings = [];

    this.generate();
  }

  // Stuff this.points with real point coordinates using this.numPoints and this.radius
  generate() {
    this.points = [];
    for (let i = 0; i < this.numPoints; i++) {
      this.points.push([
        this.center.x + this.radius * Math.cos(((360 / this.numPoints) * (Math.PI/180) * i) + this.angle),
        this.center.y + this.radius * Math.sin(((360 / this.numPoints) * (Math.PI/180) * i) + this.angle)
      ]);
    }

    for(let ring of this.subrings) {
      ring.generate();
    }
  }

  // Add this.velocity to this.angle until it reaches this.targetAngle (with easing)
  iterate() {
    switch(this.animationMode) {
      case 'rotation':
        this.angle += this.velocity;
        break;

      case 'radius':
        this.radius += (Math.sin(this.radiusOffset * (Math.PI/180)) * Math.cos(this.radiusOffset * (Math.PI/180))) * this.radiusOffsetScaler;

        if(this.radiusOffset + 1 >= 360) {
          this.radiusOffset = 0;
        } else {
          this.radiusOffset++;
        }

        break;
    }

    for(let [index,ring] of this.subrings.entries()) {
      ring.center.x = this.points[index][0];
      ring.center.y = this.points[index][1];
      ring.iterate();
    }

    this.generate();
  }
}

/***/ }),

/***/ "./orbits/js/entry.js":
/*!****************************!*\
  !*** ./orbits/js/entry.js ***!
  \****************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var d3_delaunay__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! d3-delaunay */ "./node_modules/d3-delaunay/src/index.js");
/* harmony import */ var svg_points__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! svg-points */ "./node_modules/svg-points/modules/index.js");
/* harmony import */ var file_saver__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! file-saver */ "./node_modules/file-saver/dist/FileSaver.min.js");
/* harmony import */ var file_saver__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(file_saver__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _Ring__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Ring */ "./orbits/js/Ring.js");





let showPoints = false,
  invertColors = false,
  useBlurEffect = false,
  isPaused = false,
  points,
  rings;

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
    generatePoints();
  }

  /*
    Draw
    ====
  */
  p5.draw = function () {
    // Move all the rings
    if(!isPaused) {
      for(let ring of rings) {
        ring.iterate();
      }

      // Get the latest points
      points = getPoints();
  
      drawVoronoi();
      drawPoints();
    }
  }


  /*
    Custom functions
    ================
  */
 
  // Build an array of polygons (arrays of [x,y] pairs) extracted from Voronoi package
  function getVoronoiPolygons() {
    const delaunay = d3_delaunay__WEBPACK_IMPORTED_MODULE_0__["Delaunay"].from(points);
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


  // Draw the Voronoi diagram for a set of points
  function drawVoronoi() {
    // Set colors
    if (invertColors) {
      if(useBlurEffect) {
        p5.background(0, 20);
      } else {
        p5.background(0);
      }

      p5.stroke(255);
    } else {
      if(useBlurEffect) {
        p5.background(255, 25);
      } else {
        p5.background(255);
      }
      
      p5.stroke(0);
    }

    p5.noFill();

    // Extract polygons from Voronoi diagram
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
      // Set colors
      p5.noStroke();

      if (invertColors) {
        p5.fill(100);
      } else {
        p5.fill(200);
      }

      // Draw the points
      for (let point of points) {
        p5.ellipse(point[0], point[1], 5);
      }
    }
  }
  
  function generatePoints() {
    points = [], rings = [];
    let numRings = parseInt(p5.random(3,10));
    // let numRings = 3;
    const maxRadius = (window.innerWidth > window.innerHeight) ? window.innerHeight/2 - 10 : window.innerWidth/2 - 10;
    const minRadius = p5.random(10, 30);
    // let currentRadius = maxRadius;
    let currentRadius = 300;
    const radiusStep = (maxRadius - minRadius) / numRings;

    // Generate set of points for Voronoi diagram
    for (let i = 0; i < numRings; i++) {
      let numPoints, range = [], ring;

      if(i != 1) {
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

        ring = new _Ring__WEBPACK_IMPORTED_MODULE_3__["default"](numPoints, currentRadius);

  
      // Add sub-rings to the outermost main ring
      } else {
        numPoints = parseInt(p5.random(5,12));

        ring = new _Ring__WEBPACK_IMPORTED_MODULE_3__["default"](numPoints, currentRadius);

        let subringPoints = parseInt(p5.random(9,50));
        let subringRadius = parseInt(p5.random(20,150));
        let subringRadiusOffsetScaler = Math.random() * (10 - -10) + -10;

        for(let point of ring.points) {
          let subring = new _Ring__WEBPACK_IMPORTED_MODULE_3__["default"](subringPoints, subringRadius, point[0], point[1]);
          subring.velocity = .01;
          subring.radiusOffsetScaler = subringRadiusOffsetScaler / 5;
          subring.animationMode = 'rotation';

          ring.subrings.push(subring);
        }
      }

      rings.push(ring);
      currentRadius -= radiusStep + p5.random(-radiusStep/2, radiusStep);
    }

    points = getPoints();
  }

  function getPoints() {
    let pts = [];

    // Extract all points from all rings and sub-rings 
    for(let ring of rings) {
      for(let point of ring.points) {
        pts.push(point);
      }

      for(let subring of ring.subrings) {
        for(let point of subring.points) {
          pts.push(point);
        }
      }
    }

    return pts;
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
    Object(file_saver__WEBPACK_IMPORTED_MODULE_2__["saveAs"])(blob, 'voronoi-' + Date.now() + '.svg');
  }

  function createPathElFromPoints(points) {
    let pointsString = '';

    for(let [index, point] of points.entries()) {
      pointsString += point[0] + ',' + point[1];

      if(index < points.length - 1) {
        pointsString += ' ';
      }
    }

    let d = Object(svg_points__WEBPACK_IMPORTED_MODULE_1__["toPath"])({
      type: 'polyline',
      points: pointsString
    });

    let pathEl = document.createElement('path');
    pathEl.setAttribute('d', d);
    pathEl.setAttribute('style', 'fill: none; stroke: black; stroke-width: 1');

    return pathEl;
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

      case 'b':
        useBlurEffect = !useBlurEffect;
        break;

      case ' ':
        isPaused = !isPaused;
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
}

// Launch the sketch using p5js in instantiated mode
new p5(sketch);

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2QzLWRlbGF1bmF5L3NyYy9kZWxhdW5heS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvZDMtZGVsYXVuYXkvc3JjL2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9kMy1kZWxhdW5heS9zcmMvcGF0aC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvZDMtZGVsYXVuYXkvc3JjL3BvbHlnb24uanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2QzLWRlbGF1bmF5L3NyYy92b3Jvbm9pLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9kZWxhdW5hdG9yL2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9maWxlLXNhdmVyL2Rpc3QvRmlsZVNhdmVyLm1pbi5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvc3ZnLXBvaW50cy9tb2R1bGVzL2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9zdmctcG9pbnRzL21vZHVsZXMvdG9QYXRoLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9zdmctcG9pbnRzL21vZHVsZXMvdG9Qb2ludHMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3N2Zy1wb2ludHMvbW9kdWxlcy92YWxpZC5qcyIsIndlYnBhY2s6Ly8vKHdlYnBhY2spL2J1aWxkaW4vZ2xvYmFsLmpzIiwid2VicGFjazovLy8uL29yYml0cy9qcy9SaW5nLmpzIiwid2VicGFjazovLy8uL29yYml0cy9qcy9lbnRyeS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNB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O0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7O0FBRWI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNkNBQTZDO0FBQzdDOztBQUVBOztBQUVBO0FBQ0E7O0FBRUEsb0JBQW9CO0FBQ3BCOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxlQUFlLDZCQUE2Qjs7QUFFNUM7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUEsaUVBQWlFO0FBQ2pFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLHdDQUF3QztBQUN4Qzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFD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RUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUIsb0JBQW9CO0FBQ3ZDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsQzs7Ozs7Ozs7Ozs7O0FDbkVBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFxQztBQUNIO0FBQ0E7QUFDUjs7QUFFMUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxxQkFBcUIsb0RBQVE7QUFDN0I7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBOztBQUVBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLG1CQUFtQixjQUFjO0FBQ2pDOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLG1CQUFtQiw2Q0FBSTs7O0FBR3ZCO0FBQ0EsT0FBTztBQUNQOztBQUVBLG1CQUFtQiw2Q0FBSTs7QUFFdkI7QUFDQTtBQUNBOztBQUVBO0FBQ0EsNEJBQTRCLDZDQUFJO0FBQ2hDO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxJQUFJLHlEQUFNO0FBQ1Y7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLFlBQVkseURBQU07QUFDbEI7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBLDZDQUE2QyxlQUFlOztBQUU1RDtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLGUiLCJmaWxlIjoib3JiaXRzLmJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vb3JiaXRzL2pzL2VudHJ5LmpzXCIpO1xuIiwiaW1wb3J0IERlbGF1bmF0b3IgZnJvbSBcImRlbGF1bmF0b3JcIjtcbmltcG9ydCBQYXRoIGZyb20gXCIuL3BhdGguanNcIjtcbmltcG9ydCBQb2x5Z29uIGZyb20gXCIuL3BvbHlnb24uanNcIjtcbmltcG9ydCBWb3Jvbm9pIGZyb20gXCIuL3Zvcm9ub2kuanNcIjtcblxuY29uc3QgdGF1ID0gMiAqIE1hdGguUEk7XG5cbmZ1bmN0aW9uIHBvaW50WChwKSB7XG4gIHJldHVybiBwWzBdO1xufVxuXG5mdW5jdGlvbiBwb2ludFkocCkge1xuICByZXR1cm4gcFsxXTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRGVsYXVuYXkge1xuICBjb25zdHJ1Y3Rvcihwb2ludHMpIHtcbiAgICBjb25zdCB7aGFsZmVkZ2VzLCBodWxsLCB0cmlhbmdsZXN9ID0gbmV3IERlbGF1bmF0b3IocG9pbnRzKTtcbiAgICB0aGlzLnBvaW50cyA9IHBvaW50cztcbiAgICB0aGlzLmhhbGZlZGdlcyA9IGhhbGZlZGdlcztcbiAgICB0aGlzLmh1bGwgPSBodWxsO1xuICAgIHRoaXMudHJpYW5nbGVzID0gdHJpYW5nbGVzO1xuICAgIGNvbnN0IGluZWRnZXMgPSB0aGlzLmluZWRnZXMgPSBuZXcgSW50MzJBcnJheShwb2ludHMubGVuZ3RoIC8gMikuZmlsbCgtMSk7XG4gICAgY29uc3Qgb3V0ZWRnZXMgPSB0aGlzLm91dGVkZ2VzID0gbmV3IEludDMyQXJyYXkocG9pbnRzLmxlbmd0aCAvIDIpLmZpbGwoLTEpO1xuXG4gICAgLy8gQ29tcHV0ZSBhbiBpbmRleCBmcm9tIGVhY2ggcG9pbnQgdG8gYW4gKGFyYml0cmFyeSkgaW5jb21pbmcgaGFsZmVkZ2UuXG4gICAgZm9yIChsZXQgZSA9IDAsIG4gPSBoYWxmZWRnZXMubGVuZ3RoOyBlIDwgbjsgKytlKSB7XG4gICAgICBpbmVkZ2VzW3RyaWFuZ2xlc1tlICUgMyA9PT0gMiA/IGUgLSAyIDogZSArIDFdXSA9IGU7XG4gICAgfVxuXG4gICAgLy8gRm9yIHBvaW50cyBvbiB0aGUgaHVsbCwgaW5kZXggYm90aCB0aGUgaW5jb21pbmcgYW5kIG91dGdvaW5nIGhhbGZlZGdlcy5cbiAgICBsZXQgbm9kZTAsIG5vZGUxID0gaHVsbDtcbiAgICBkbyB7XG4gICAgICBub2RlMCA9IG5vZGUxLCBub2RlMSA9IG5vZGUxLm5leHQ7XG4gICAgICBpbmVkZ2VzW25vZGUxLmldID0gbm9kZTAudDtcbiAgICAgIG91dGVkZ2VzW25vZGUwLmldID0gbm9kZTEudDtcbiAgICB9IHdoaWxlIChub2RlMSAhPT0gaHVsbCk7XG4gIH1cbiAgdm9yb25vaShib3VuZHMpIHtcbiAgICByZXR1cm4gbmV3IFZvcm9ub2kodGhpcywgYm91bmRzKTtcbiAgfVxuICAqbmVpZ2hib3JzKGkpIHtcbiAgICBjb25zdCB7aW5lZGdlcywgb3V0ZWRnZXMsIGhhbGZlZGdlcywgdHJpYW5nbGVzfSA9IHRoaXM7XG4gICAgY29uc3QgZTAgPSBpbmVkZ2VzW2ldO1xuICAgIGlmIChlMCA9PT0gLTEpIHJldHVybjsgLy8gY29pbmNpZGVudCBwb2ludFxuICAgIGxldCBlID0gZTA7XG4gICAgZG8ge1xuICAgICAgeWllbGQgdHJpYW5nbGVzW2VdO1xuICAgICAgZSA9IGUgJSAzID09PSAyID8gZSAtIDIgOiBlICsgMTtcbiAgICAgIGlmICh0cmlhbmdsZXNbZV0gIT09IGkpIHJldHVybjsgLy8gYmFkIHRyaWFuZ3VsYXRpb25cbiAgICAgIGUgPSBoYWxmZWRnZXNbZV07XG4gICAgICBpZiAoZSA9PT0gLTEpIHJldHVybiB5aWVsZCB0cmlhbmdsZXNbb3V0ZWRnZXNbaV1dO1xuICAgIH0gd2hpbGUgKGUgIT09IGUwKTtcbiAgfVxuICBmaW5kKHgsIHksIGkgPSAwKSB7XG4gICAgaWYgKCh4ID0gK3gsIHggIT09IHgpIHx8ICh5ID0gK3ksIHkgIT09IHkpKSByZXR1cm4gLTE7XG4gICAgbGV0IGM7XG4gICAgd2hpbGUgKChjID0gdGhpcy5fc3RlcChpLCB4LCB5KSkgPj0gMCAmJiBjICE9PSBpKSBpID0gYztcbiAgICByZXR1cm4gYztcbiAgfVxuICBfc3RlcChpLCB4LCB5KSB7XG4gICAgY29uc3Qge2luZWRnZXMsIHBvaW50c30gPSB0aGlzO1xuICAgIGlmIChpbmVkZ2VzW2ldID09PSAtMSkgcmV0dXJuIC0xOyAvLyBjb2luY2lkZW50IHBvaW50XG4gICAgbGV0IGMgPSBpO1xuICAgIGxldCBkYyA9ICh4IC0gcG9pbnRzW2kgKiAyXSkgKiogMiArICh5IC0gcG9pbnRzW2kgKiAyICsgMV0pICoqIDI7XG4gICAgZm9yIChjb25zdCB0IG9mIHRoaXMubmVpZ2hib3JzKGkpKSB7XG4gICAgICBjb25zdCBkdCA9ICh4IC0gcG9pbnRzW3QgKiAyXSkgKiogMiArICh5IC0gcG9pbnRzW3QgKiAyICsgMV0pICoqIDI7XG4gICAgICBpZiAoZHQgPCBkYykgZGMgPSBkdCwgYyA9IHQ7XG4gICAgfVxuICAgIHJldHVybiBjO1xuICB9XG4gIHJlbmRlcihjb250ZXh0KSB7XG4gICAgY29uc3QgYnVmZmVyID0gY29udGV4dCA9PSBudWxsID8gY29udGV4dCA9IG5ldyBQYXRoIDogdW5kZWZpbmVkO1xuICAgIGNvbnN0IHtwb2ludHMsIGhhbGZlZGdlcywgdHJpYW5nbGVzfSA9IHRoaXM7XG4gICAgZm9yIChsZXQgaSA9IDAsIG4gPSBoYWxmZWRnZXMubGVuZ3RoOyBpIDwgbjsgKytpKSB7XG4gICAgICBjb25zdCBqID0gaGFsZmVkZ2VzW2ldO1xuICAgICAgaWYgKGogPCBpKSBjb250aW51ZTtcbiAgICAgIGNvbnN0IHRpID0gdHJpYW5nbGVzW2ldICogMjtcbiAgICAgIGNvbnN0IHRqID0gdHJpYW5nbGVzW2pdICogMjtcbiAgICAgIGNvbnRleHQubW92ZVRvKHBvaW50c1t0aV0sIHBvaW50c1t0aSArIDFdKTtcbiAgICAgIGNvbnRleHQubGluZVRvKHBvaW50c1t0al0sIHBvaW50c1t0aiArIDFdKTtcbiAgICB9XG4gICAgdGhpcy5yZW5kZXJIdWxsKGNvbnRleHQpO1xuICAgIHJldHVybiBidWZmZXIgJiYgYnVmZmVyLnZhbHVlKCk7XG4gIH1cbiAgcmVuZGVyUG9pbnRzKGNvbnRleHQsIHIgPSAyKSB7XG4gICAgY29uc3QgYnVmZmVyID0gY29udGV4dCA9PSBudWxsID8gY29udGV4dCA9IG5ldyBQYXRoIDogdW5kZWZpbmVkO1xuICAgIGNvbnN0IHtwb2ludHN9ID0gdGhpcztcbiAgICBmb3IgKGxldCBpID0gMCwgbiA9IHBvaW50cy5sZW5ndGg7IGkgPCBuOyBpICs9IDIpIHtcbiAgICAgIGNvbnN0IHggPSBwb2ludHNbaV0sIHkgPSBwb2ludHNbaSArIDFdO1xuICAgICAgY29udGV4dC5tb3ZlVG8oeCArIHIsIHkpO1xuICAgICAgY29udGV4dC5hcmMoeCwgeSwgciwgMCwgdGF1KTtcbiAgICB9XG4gICAgcmV0dXJuIGJ1ZmZlciAmJiBidWZmZXIudmFsdWUoKTtcbiAgfVxuICByZW5kZXJIdWxsKGNvbnRleHQpIHtcbiAgICBjb25zdCBidWZmZXIgPSBjb250ZXh0ID09IG51bGwgPyBjb250ZXh0ID0gbmV3IFBhdGggOiB1bmRlZmluZWQ7XG4gICAgY29uc3Qge2h1bGx9ID0gdGhpcztcbiAgICBsZXQgbm9kZSA9IGh1bGw7XG4gICAgY29udGV4dC5tb3ZlVG8obm9kZS54LCBub2RlLnkpO1xuICAgIHdoaWxlIChub2RlID0gbm9kZS5uZXh0LCBub2RlICE9PSBodWxsKSBjb250ZXh0LmxpbmVUbyhub2RlLngsIG5vZGUueSk7XG4gICAgY29udGV4dC5jbG9zZVBhdGgoKTtcbiAgICByZXR1cm4gYnVmZmVyICYmIGJ1ZmZlci52YWx1ZSgpO1xuICB9XG4gIGh1bGxQb2x5Z29uKCkge1xuICAgIGNvbnN0IHBvbHlnb24gPSBuZXcgUG9seWdvbjtcbiAgICB0aGlzLnJlbmRlckh1bGwocG9seWdvbik7XG4gICAgcmV0dXJuIHBvbHlnb24udmFsdWUoKTtcbiAgfVxuICByZW5kZXJUcmlhbmdsZShpLCBjb250ZXh0KSB7XG4gICAgY29uc3QgYnVmZmVyID0gY29udGV4dCA9PSBudWxsID8gY29udGV4dCA9IG5ldyBQYXRoIDogdW5kZWZpbmVkO1xuICAgIGNvbnN0IHtwb2ludHMsIHRyaWFuZ2xlc30gPSB0aGlzO1xuICAgIGNvbnN0IHQwID0gdHJpYW5nbGVzW2kgKj0gM10gKiAyO1xuICAgIGNvbnN0IHQxID0gdHJpYW5nbGVzW2kgKyAxXSAqIDI7XG4gICAgY29uc3QgdDIgPSB0cmlhbmdsZXNbaSArIDJdICogMjtcbiAgICBjb250ZXh0Lm1vdmVUbyhwb2ludHNbdDBdLCBwb2ludHNbdDAgKyAxXSk7XG4gICAgY29udGV4dC5saW5lVG8ocG9pbnRzW3QxXSwgcG9pbnRzW3QxICsgMV0pO1xuICAgIGNvbnRleHQubGluZVRvKHBvaW50c1t0Ml0sIHBvaW50c1t0MiArIDFdKTtcbiAgICBjb250ZXh0LmNsb3NlUGF0aCgpO1xuICAgIHJldHVybiBidWZmZXIgJiYgYnVmZmVyLnZhbHVlKCk7XG4gIH1cbiAgKnRyaWFuZ2xlUG9seWdvbnMoKSB7XG4gICAgY29uc3Qge3RyaWFuZ2xlc30gPSB0aGlzO1xuICAgIGZvciAobGV0IGkgPSAwLCBuID0gdHJpYW5nbGVzLmxlbmd0aCAvIDM7IGkgPCBuOyArK2kpIHtcbiAgICAgIHlpZWxkIHRoaXMudHJpYW5nbGVQb2x5Z29uKGkpO1xuICAgIH1cbiAgfVxuICB0cmlhbmdsZVBvbHlnb24oaSkge1xuICAgIGNvbnN0IHBvbHlnb24gPSBuZXcgUG9seWdvbjtcbiAgICB0aGlzLnJlbmRlclRyaWFuZ2xlKGksIHBvbHlnb24pO1xuICAgIHJldHVybiBwb2x5Z29uLnZhbHVlKCk7XG4gIH1cbn1cblxuRGVsYXVuYXkuZnJvbSA9IGZ1bmN0aW9uKHBvaW50cywgZnggPSBwb2ludFgsIGZ5ID0gcG9pbnRZLCB0aGF0KSB7XG4gIHJldHVybiBuZXcgRGVsYXVuYXkoXCJsZW5ndGhcIiBpbiBwb2ludHNcbiAgICAgID8gZmxhdEFycmF5KHBvaW50cywgZngsIGZ5LCB0aGF0KVxuICAgICAgOiBGbG9hdDY0QXJyYXkuZnJvbShmbGF0SXRlcmFibGUocG9pbnRzLCBmeCwgZnksIHRoYXQpKSk7XG59O1xuXG5mdW5jdGlvbiBmbGF0QXJyYXkocG9pbnRzLCBmeCwgZnksIHRoYXQpIHtcbiAgY29uc3QgbiA9IHBvaW50cy5sZW5ndGg7XG4gIGNvbnN0IGFycmF5ID0gbmV3IEZsb2F0NjRBcnJheShuICogMik7XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgbjsgKytpKSB7XG4gICAgY29uc3QgcCA9IHBvaW50c1tpXTtcbiAgICBhcnJheVtpICogMl0gPSBmeC5jYWxsKHRoYXQsIHAsIGksIHBvaW50cyk7XG4gICAgYXJyYXlbaSAqIDIgKyAxXSA9IGZ5LmNhbGwodGhhdCwgcCwgaSwgcG9pbnRzKTtcbiAgfVxuICByZXR1cm4gYXJyYXk7XG59XG5cbmZ1bmN0aW9uKiBmbGF0SXRlcmFibGUocG9pbnRzLCBmeCwgZnksIHRoYXQpIHtcbiAgbGV0IGkgPSAwO1xuICBmb3IgKGNvbnN0IHAgb2YgcG9pbnRzKSB7XG4gICAgeWllbGQgZnguY2FsbCh0aGF0LCBwLCBpLCBwb2ludHMpO1xuICAgIHlpZWxkIGZ5LmNhbGwodGhhdCwgcCwgaSwgcG9pbnRzKTtcbiAgICArK2k7XG4gIH1cbn1cbiIsImV4cG9ydCB7ZGVmYXVsdCBhcyBEZWxhdW5heX0gZnJvbSBcIi4vZGVsYXVuYXkuanNcIjtcbmV4cG9ydCB7ZGVmYXVsdCBhcyBWb3Jvbm9pfSBmcm9tIFwiLi92b3Jvbm9pLmpzXCI7XG4iLCJjb25zdCBlcHNpbG9uID0gMWUtNjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUGF0aCB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMuX3gwID0gdGhpcy5feTAgPSAvLyBzdGFydCBvZiBjdXJyZW50IHN1YnBhdGhcbiAgICB0aGlzLl94MSA9IHRoaXMuX3kxID0gbnVsbDsgLy8gZW5kIG9mIGN1cnJlbnQgc3VicGF0aFxuICAgIHRoaXMuXyA9IFwiXCI7XG4gIH1cbiAgbW92ZVRvKHgsIHkpIHtcbiAgICB0aGlzLl8gKz0gYE0ke3RoaXMuX3gwID0gdGhpcy5feDEgPSAreH0sJHt0aGlzLl95MCA9IHRoaXMuX3kxID0gK3l9YDtcbiAgfVxuICBjbG9zZVBhdGgoKSB7XG4gICAgaWYgKHRoaXMuX3gxICE9PSBudWxsKSB7XG4gICAgICB0aGlzLl94MSA9IHRoaXMuX3gwLCB0aGlzLl95MSA9IHRoaXMuX3kwO1xuICAgICAgdGhpcy5fICs9IFwiWlwiO1xuICAgIH1cbiAgfVxuICBsaW5lVG8oeCwgeSkge1xuICAgIHRoaXMuXyArPSBgTCR7dGhpcy5feDEgPSAreH0sJHt0aGlzLl95MSA9ICt5fWA7XG4gIH1cbiAgYXJjKHgsIHksIHIpIHtcbiAgICB4ID0gK3gsIHkgPSAreSwgciA9ICtyO1xuICAgIGNvbnN0IHgwID0geCArIHI7XG4gICAgY29uc3QgeTAgPSB5O1xuICAgIGlmIChyIDwgMCkgdGhyb3cgbmV3IEVycm9yKFwibmVnYXRpdmUgcmFkaXVzXCIpO1xuICAgIGlmICh0aGlzLl94MSA9PT0gbnVsbCkgdGhpcy5fICs9IGBNJHt4MH0sJHt5MH1gO1xuICAgIGVsc2UgaWYgKE1hdGguYWJzKHRoaXMuX3gxIC0geDApID4gZXBzaWxvbiB8fCBNYXRoLmFicyh0aGlzLl95MSAtIHkwKSA+IGVwc2lsb24pIHRoaXMuXyArPSBcIkxcIiArIHgwICsgXCIsXCIgKyB5MDtcbiAgICBpZiAoIXIpIHJldHVybjtcbiAgICB0aGlzLl8gKz0gYEEke3J9LCR7cn0sMCwxLDEsJHt4IC0gcn0sJHt5fUEke3J9LCR7cn0sMCwxLDEsJHt0aGlzLl94MSA9IHgwfSwke3RoaXMuX3kxID0geTB9YDtcbiAgfVxuICByZWN0KHgsIHksIHcsIGgpIHtcbiAgICB0aGlzLl8gKz0gYE0ke3RoaXMuX3gwID0gdGhpcy5feDEgPSAreH0sJHt0aGlzLl95MCA9IHRoaXMuX3kxID0gK3l9aCR7K3d9diR7K2h9aCR7LXd9WmA7XG4gIH1cbiAgdmFsdWUoKSB7XG4gICAgcmV0dXJuIHRoaXMuXyB8fCBudWxsO1xuICB9XG59XG4iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBQb2x5Z29uIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5fID0gW107XG4gIH1cbiAgbW92ZVRvKHgsIHkpIHtcbiAgICB0aGlzLl8ucHVzaChbeCwgeV0pO1xuICB9XG4gIGNsb3NlUGF0aCgpIHtcbiAgICB0aGlzLl8ucHVzaCh0aGlzLl9bMF0uc2xpY2UoKSk7XG4gIH1cbiAgbGluZVRvKHgsIHkpIHtcbiAgICB0aGlzLl8ucHVzaChbeCwgeV0pO1xuICB9XG4gIHZhbHVlKCkge1xuICAgIHJldHVybiB0aGlzLl8ubGVuZ3RoID8gdGhpcy5fIDogbnVsbDtcbiAgfVxufVxuIiwiaW1wb3J0IFBhdGggZnJvbSBcIi4vcGF0aC5qc1wiO1xuaW1wb3J0IFBvbHlnb24gZnJvbSBcIi4vcG9seWdvbi5qc1wiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBWb3Jvbm9pIHtcbiAgY29uc3RydWN0b3IoZGVsYXVuYXksIFt4bWluLCB5bWluLCB4bWF4LCB5bWF4XSA9IFswLCAwLCA5NjAsIDUwMF0pIHtcbiAgICBpZiAoISgoeG1heCA9ICt4bWF4KSA+PSAoeG1pbiA9ICt4bWluKSkgfHwgISgoeW1heCA9ICt5bWF4KSA+PSAoeW1pbiA9ICt5bWluKSkpIHRocm93IG5ldyBFcnJvcihcImludmFsaWQgYm91bmRzXCIpO1xuICAgIGNvbnN0IHtwb2ludHMsIGh1bGwsIHRyaWFuZ2xlc30gPSB0aGlzLmRlbGF1bmF5ID0gZGVsYXVuYXk7XG4gICAgY29uc3QgY2lyY3VtY2VudGVycyA9IHRoaXMuY2lyY3VtY2VudGVycyA9IG5ldyBGbG9hdDY0QXJyYXkodHJpYW5nbGVzLmxlbmd0aCAvIDMgKiAyKTtcbiAgICBjb25zdCB2ZWN0b3JzID0gdGhpcy52ZWN0b3JzID0gbmV3IEZsb2F0NjRBcnJheShwb2ludHMubGVuZ3RoICogMik7XG4gICAgdGhpcy54bWF4ID0geG1heCwgdGhpcy54bWluID0geG1pbjtcbiAgICB0aGlzLnltYXggPSB5bWF4LCB0aGlzLnltaW4gPSB5bWluO1xuXG4gICAgLy8gQ29tcHV0ZSBjaXJjdW1jZW50ZXJzLlxuICAgIGZvciAobGV0IGkgPSAwLCBqID0gMCwgbiA9IHRyaWFuZ2xlcy5sZW5ndGg7IGkgPCBuOyBpICs9IDMsIGogKz0gMikge1xuICAgICAgY29uc3QgdDEgPSB0cmlhbmdsZXNbaV0gKiAyO1xuICAgICAgY29uc3QgdDIgPSB0cmlhbmdsZXNbaSArIDFdICogMjtcbiAgICAgIGNvbnN0IHQzID0gdHJpYW5nbGVzW2kgKyAyXSAqIDI7XG4gICAgICBjb25zdCB4MSA9IHBvaW50c1t0MV07XG4gICAgICBjb25zdCB5MSA9IHBvaW50c1t0MSArIDFdO1xuICAgICAgY29uc3QgeDIgPSBwb2ludHNbdDJdO1xuICAgICAgY29uc3QgeTIgPSBwb2ludHNbdDIgKyAxXTtcbiAgICAgIGNvbnN0IHgzID0gcG9pbnRzW3QzXTtcbiAgICAgIGNvbnN0IHkzID0gcG9pbnRzW3QzICsgMV07XG4gICAgICBjb25zdCBhMiA9IHgxIC0geDI7XG4gICAgICBjb25zdCBhMyA9IHgxIC0geDM7XG4gICAgICBjb25zdCBiMiA9IHkxIC0geTI7XG4gICAgICBjb25zdCBiMyA9IHkxIC0geTM7XG4gICAgICBjb25zdCBkMSA9IHgxICogeDEgKyB5MSAqIHkxO1xuICAgICAgY29uc3QgZDIgPSBkMSAtIHgyICogeDIgLSB5MiAqIHkyO1xuICAgICAgY29uc3QgZDMgPSBkMSAtIHgzICogeDMgLSB5MyAqIHkzO1xuICAgICAgY29uc3QgYWIgPSAoYTMgKiBiMiAtIGEyICogYjMpICogMjtcbiAgICAgIGNpcmN1bWNlbnRlcnNbal0gPSAoYjIgKiBkMyAtIGIzICogZDIpIC8gYWI7XG4gICAgICBjaXJjdW1jZW50ZXJzW2ogKyAxXSA9IChhMyAqIGQyIC0gYTIgKiBkMykgLyBhYjtcbiAgICB9XG5cbiAgICAvLyBDb21wdXRlIGV4dGVyaW9yIGNlbGwgcmF5cy5cbiAgICBsZXQgbm9kZSA9IGh1bGw7XG4gICAgbGV0IHAwLCBwMSA9IG5vZGUuaSAqIDQ7XG4gICAgbGV0IHgwLCB4MSA9IG5vZGUueDtcbiAgICBsZXQgeTAsIHkxID0gbm9kZS55O1xuICAgIGRvIHtcbiAgICAgIG5vZGUgPSBub2RlLm5leHQsIHAwID0gcDEsIHgwID0geDEsIHkwID0geTEsIHAxID0gbm9kZS5pICogNCwgeDEgPSBub2RlLngsIHkxID0gbm9kZS55O1xuICAgICAgdmVjdG9yc1twMCArIDJdID0gdmVjdG9yc1twMV0gPSB5MCAtIHkxO1xuICAgICAgdmVjdG9yc1twMCArIDNdID0gdmVjdG9yc1twMSArIDFdID0geDEgLSB4MDtcbiAgICB9IHdoaWxlIChub2RlICE9PSBodWxsKTtcbiAgfVxuICByZW5kZXIoY29udGV4dCkge1xuICAgIGNvbnN0IGJ1ZmZlciA9IGNvbnRleHQgPT0gbnVsbCA/IGNvbnRleHQgPSBuZXcgUGF0aCA6IHVuZGVmaW5lZDtcbiAgICBjb25zdCB7ZGVsYXVuYXk6IHtoYWxmZWRnZXMsIGh1bGx9LCBjaXJjdW1jZW50ZXJzLCB2ZWN0b3JzfSA9IHRoaXM7XG4gICAgZm9yIChsZXQgaSA9IDAsIG4gPSBoYWxmZWRnZXMubGVuZ3RoOyBpIDwgbjsgKytpKSB7XG4gICAgICBjb25zdCBqID0gaGFsZmVkZ2VzW2ldO1xuICAgICAgaWYgKGogPCBpKSBjb250aW51ZTtcbiAgICAgIGNvbnN0IHRpID0gTWF0aC5mbG9vcihpIC8gMykgKiAyO1xuICAgICAgY29uc3QgdGogPSBNYXRoLmZsb29yKGogLyAzKSAqIDI7XG4gICAgICBjb25zdCB4aSA9IGNpcmN1bWNlbnRlcnNbdGldO1xuICAgICAgY29uc3QgeWkgPSBjaXJjdW1jZW50ZXJzW3RpICsgMV07XG4gICAgICBjb25zdCB4aiA9IGNpcmN1bWNlbnRlcnNbdGpdO1xuICAgICAgY29uc3QgeWogPSBjaXJjdW1jZW50ZXJzW3RqICsgMV07XG4gICAgICB0aGlzLl9yZW5kZXJTZWdtZW50KHhpLCB5aSwgeGosIHlqLCBjb250ZXh0KTtcbiAgICB9XG4gICAgbGV0IG5vZGUgPSBodWxsO1xuICAgIGRvIHtcbiAgICAgIG5vZGUgPSBub2RlLm5leHQ7XG4gICAgICBjb25zdCB0ID0gTWF0aC5mbG9vcihub2RlLnQgLyAzKSAqIDI7XG4gICAgICBjb25zdCB4ID0gY2lyY3VtY2VudGVyc1t0XTtcbiAgICAgIGNvbnN0IHkgPSBjaXJjdW1jZW50ZXJzW3QgKyAxXTtcbiAgICAgIGNvbnN0IHYgPSBub2RlLmkgKiA0O1xuICAgICAgY29uc3QgcCA9IHRoaXMuX3Byb2plY3QoeCwgeSwgdmVjdG9yc1t2ICsgMl0sIHZlY3RvcnNbdiArIDNdKTtcbiAgICAgIGlmIChwKSB0aGlzLl9yZW5kZXJTZWdtZW50KHgsIHksIHBbMF0sIHBbMV0sIGNvbnRleHQpO1xuICAgIH0gd2hpbGUgKG5vZGUgIT09IGh1bGwpO1xuICAgIHJldHVybiBidWZmZXIgJiYgYnVmZmVyLnZhbHVlKCk7XG4gIH1cbiAgcmVuZGVyQm91bmRzKGNvbnRleHQpIHtcbiAgICBjb25zdCBidWZmZXIgPSBjb250ZXh0ID09IG51bGwgPyBjb250ZXh0ID0gbmV3IFBhdGggOiB1bmRlZmluZWQ7XG4gICAgY29udGV4dC5yZWN0KHRoaXMueG1pbiwgdGhpcy55bWluLCB0aGlzLnhtYXggLSB0aGlzLnhtaW4sIHRoaXMueW1heCAtIHRoaXMueW1pbik7XG4gICAgcmV0dXJuIGJ1ZmZlciAmJiBidWZmZXIudmFsdWUoKTtcbiAgfVxuICByZW5kZXJDZWxsKGksIGNvbnRleHQpIHtcbiAgICBjb25zdCBidWZmZXIgPSBjb250ZXh0ID09IG51bGwgPyBjb250ZXh0ID0gbmV3IFBhdGggOiB1bmRlZmluZWQ7XG4gICAgY29uc3QgcG9pbnRzID0gdGhpcy5fY2xpcChpKTtcbiAgICBpZiAocG9pbnRzID09PSBudWxsKSByZXR1cm47XG4gICAgY29udGV4dC5tb3ZlVG8ocG9pbnRzWzBdLCBwb2ludHNbMV0pO1xuICAgIGZvciAobGV0IGkgPSAyLCBuID0gcG9pbnRzLmxlbmd0aDsgaSA8IG47IGkgKz0gMikge1xuICAgICAgY29udGV4dC5saW5lVG8ocG9pbnRzW2ldLCBwb2ludHNbaSArIDFdKTtcbiAgICB9XG4gICAgY29udGV4dC5jbG9zZVBhdGgoKTtcbiAgICByZXR1cm4gYnVmZmVyICYmIGJ1ZmZlci52YWx1ZSgpO1xuICB9XG4gICpjZWxsUG9seWdvbnMoKSB7XG4gICAgY29uc3Qge2RlbGF1bmF5OiB7cG9pbnRzfX0gPSB0aGlzO1xuICAgIGZvciAobGV0IGkgPSAwLCBuID0gcG9pbnRzLmxlbmd0aCAvIDI7IGkgPCBuOyArK2kpIHtcbiAgICAgIGNvbnN0IGNlbGwgPSB0aGlzLmNlbGxQb2x5Z29uKGkpO1xuICAgICAgaWYgKGNlbGwpIHlpZWxkIGNlbGw7XG4gICAgfVxuICB9XG4gIGNlbGxQb2x5Z29uKGkpIHtcbiAgICBjb25zdCBwb2x5Z29uID0gbmV3IFBvbHlnb247XG4gICAgdGhpcy5yZW5kZXJDZWxsKGksIHBvbHlnb24pO1xuICAgIHJldHVybiBwb2x5Z29uLnZhbHVlKCk7XG4gIH1cbiAgX3JlbmRlclNlZ21lbnQoeDAsIHkwLCB4MSwgeTEsIGNvbnRleHQpIHtcbiAgICBsZXQgUztcbiAgICBjb25zdCBjMCA9IHRoaXMuX3JlZ2lvbmNvZGUoeDAsIHkwKTtcbiAgICBjb25zdCBjMSA9IHRoaXMuX3JlZ2lvbmNvZGUoeDEsIHkxKTtcbiAgICBpZiAoYzAgPT09IDAgJiYgYzEgPT09IDApIHtcbiAgICAgIGNvbnRleHQubW92ZVRvKHgwLCB5MCk7XG4gICAgICBjb250ZXh0LmxpbmVUbyh4MSwgeTEpO1xuICAgIH0gZWxzZSBpZiAoUyA9IHRoaXMuX2NsaXBTZWdtZW50KHgwLCB5MCwgeDEsIHkxLCBjMCwgYzEpKSB7XG4gICAgICBjb250ZXh0Lm1vdmVUbyhTWzBdLCBTWzFdKTtcbiAgICAgIGNvbnRleHQubGluZVRvKFNbMl0sIFNbM10pO1xuICAgIH1cbiAgfVxuICBjb250YWlucyhpLCB4LCB5KSB7XG4gICAgaWYgKCh4ID0gK3gsIHggIT09IHgpIHx8ICh5ID0gK3ksIHkgIT09IHkpKSByZXR1cm4gZmFsc2U7XG4gICAgcmV0dXJuIHRoaXMuZGVsYXVuYXkuX3N0ZXAoaSwgeCwgeSkgPT09IGk7XG4gIH1cbiAgX2NlbGwoaSkge1xuICAgIGNvbnN0IHtjaXJjdW1jZW50ZXJzLCBkZWxhdW5heToge2luZWRnZXMsIGhhbGZlZGdlcywgdHJpYW5nbGVzfX0gPSB0aGlzO1xuICAgIGNvbnN0IGUwID0gaW5lZGdlc1tpXTtcbiAgICBpZiAoZTAgPT09IC0xKSByZXR1cm4gbnVsbDsgLy8gY29pbmNpZGVudCBwb2ludFxuICAgIGNvbnN0IHBvaW50cyA9IFtdO1xuICAgIGxldCBlID0gZTA7XG4gICAgZG8ge1xuICAgICAgY29uc3QgdCA9IE1hdGguZmxvb3IoZSAvIDMpO1xuICAgICAgcG9pbnRzLnB1c2goY2lyY3VtY2VudGVyc1t0ICogMl0sIGNpcmN1bWNlbnRlcnNbdCAqIDIgKyAxXSk7XG4gICAgICBlID0gZSAlIDMgPT09IDIgPyBlIC0gMiA6IGUgKyAxO1xuICAgICAgaWYgKHRyaWFuZ2xlc1tlXSAhPT0gaSkgYnJlYWs7IC8vIGJhZCB0cmlhbmd1bGF0aW9uXG4gICAgICBlID0gaGFsZmVkZ2VzW2VdO1xuICAgIH0gd2hpbGUgKGUgIT09IGUwICYmIGUgIT09IC0xKTtcbiAgICByZXR1cm4gcG9pbnRzO1xuICB9XG4gIF9jbGlwKGkpIHtcbiAgICBjb25zdCBwb2ludHMgPSB0aGlzLl9jZWxsKGkpO1xuICAgIGlmIChwb2ludHMgPT09IG51bGwpIHJldHVybiBudWxsO1xuICAgIGNvbnN0IHt2ZWN0b3JzOiBWfSA9IHRoaXM7XG4gICAgY29uc3QgdiA9IGkgKiA0O1xuICAgIHJldHVybiBWW3ZdIHx8IFZbdiArIDFdXG4gICAgICAgID8gdGhpcy5fY2xpcEluZmluaXRlKGksIHBvaW50cywgVlt2XSwgVlt2ICsgMV0sIFZbdiArIDJdLCBWW3YgKyAzXSlcbiAgICAgICAgOiB0aGlzLl9jbGlwRmluaXRlKGksIHBvaW50cyk7XG4gIH1cbiAgX2NsaXBGaW5pdGUoaSwgcG9pbnRzKSB7XG4gICAgY29uc3QgbiA9IHBvaW50cy5sZW5ndGg7XG4gICAgbGV0IFAgPSBudWxsO1xuICAgIGxldCB4MCwgeTAsIHgxID0gcG9pbnRzW24gLSAyXSwgeTEgPSBwb2ludHNbbiAtIDFdO1xuICAgIGxldCBjMCwgYzEgPSB0aGlzLl9yZWdpb25jb2RlKHgxLCB5MSk7XG4gICAgbGV0IGUwLCBlMTtcbiAgICBmb3IgKGxldCBqID0gMDsgaiA8IG47IGogKz0gMikge1xuICAgICAgeDAgPSB4MSwgeTAgPSB5MSwgeDEgPSBwb2ludHNbal0sIHkxID0gcG9pbnRzW2ogKyAxXTtcbiAgICAgIGMwID0gYzEsIGMxID0gdGhpcy5fcmVnaW9uY29kZSh4MSwgeTEpO1xuICAgICAgaWYgKGMwID09PSAwICYmIGMxID09PSAwKSB7XG4gICAgICAgIGUwID0gZTEsIGUxID0gMDtcbiAgICAgICAgaWYgKFApIFAucHVzaCh4MSwgeTEpO1xuICAgICAgICBlbHNlIFAgPSBbeDEsIHkxXTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGxldCBTLCBzeDAsIHN5MCwgc3gxLCBzeTE7XG4gICAgICAgIGlmIChjMCA9PT0gMCkge1xuICAgICAgICAgIGlmICgoUyA9IHRoaXMuX2NsaXBTZWdtZW50KHgwLCB5MCwgeDEsIHkxLCBjMCwgYzEpKSA9PT0gbnVsbCkgY29udGludWU7XG4gICAgICAgICAgW3N4MCwgc3kwLCBzeDEsIHN5MV0gPSBTO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGlmICgoUyA9IHRoaXMuX2NsaXBTZWdtZW50KHgxLCB5MSwgeDAsIHkwLCBjMSwgYzApKSA9PT0gbnVsbCkgY29udGludWU7XG4gICAgICAgICAgW3N4MSwgc3kxLCBzeDAsIHN5MF0gPSBTO1xuICAgICAgICAgIGUwID0gZTEsIGUxID0gdGhpcy5fZWRnZWNvZGUoc3gwLCBzeTApO1xuICAgICAgICAgIGlmIChlMCAmJiBlMSkgdGhpcy5fZWRnZShpLCBlMCwgZTEsIFAsIFAubGVuZ3RoKTtcbiAgICAgICAgICBpZiAoUCkgUC5wdXNoKHN4MCwgc3kwKTtcbiAgICAgICAgICBlbHNlIFAgPSBbc3gwLCBzeTBdO1xuICAgICAgICB9XG4gICAgICAgIGUwID0gZTEsIGUxID0gdGhpcy5fZWRnZWNvZGUoc3gxLCBzeTEpO1xuICAgICAgICBpZiAoZTAgJiYgZTEpIHRoaXMuX2VkZ2UoaSwgZTAsIGUxLCBQLCBQLmxlbmd0aCk7XG4gICAgICAgIGlmIChQKSBQLnB1c2goc3gxLCBzeTEpO1xuICAgICAgICBlbHNlIFAgPSBbc3gxLCBzeTFdO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAoUCkge1xuICAgICAgZTAgPSBlMSwgZTEgPSB0aGlzLl9lZGdlY29kZShQWzBdLCBQWzFdKTtcbiAgICAgIGlmIChlMCAmJiBlMSkgdGhpcy5fZWRnZShpLCBlMCwgZTEsIFAsIFAubGVuZ3RoKTtcbiAgICB9IGVsc2UgaWYgKHRoaXMuY29udGFpbnMoaSwgKHRoaXMueG1pbiArIHRoaXMueG1heCkgLyAyLCAodGhpcy55bWluICsgdGhpcy55bWF4KSAvIDIpKSB7XG4gICAgICByZXR1cm4gW3RoaXMueG1heCwgdGhpcy55bWluLCB0aGlzLnhtYXgsIHRoaXMueW1heCwgdGhpcy54bWluLCB0aGlzLnltYXgsIHRoaXMueG1pbiwgdGhpcy55bWluXTtcbiAgICB9XG4gICAgcmV0dXJuIFA7XG4gIH1cbiAgX2NsaXBTZWdtZW50KHgwLCB5MCwgeDEsIHkxLCBjMCwgYzEpIHtcbiAgICB3aGlsZSAodHJ1ZSkge1xuICAgICAgaWYgKGMwID09PSAwICYmIGMxID09PSAwKSByZXR1cm4gW3gwLCB5MCwgeDEsIHkxXTtcbiAgICAgIGlmIChjMCAmIGMxKSByZXR1cm4gbnVsbDtcbiAgICAgIGxldCB4LCB5LCBjID0gYzAgfHwgYzE7XG4gICAgICBpZiAoYyAmIDBiMTAwMCkgeCA9IHgwICsgKHgxIC0geDApICogKHRoaXMueW1heCAtIHkwKSAvICh5MSAtIHkwKSwgeSA9IHRoaXMueW1heDtcbiAgICAgIGVsc2UgaWYgKGMgJiAwYjAxMDApIHggPSB4MCArICh4MSAtIHgwKSAqICh0aGlzLnltaW4gLSB5MCkgLyAoeTEgLSB5MCksIHkgPSB0aGlzLnltaW47XG4gICAgICBlbHNlIGlmIChjICYgMGIwMDEwKSB5ID0geTAgKyAoeTEgLSB5MCkgKiAodGhpcy54bWF4IC0geDApIC8gKHgxIC0geDApLCB4ID0gdGhpcy54bWF4O1xuICAgICAgZWxzZSB5ID0geTAgKyAoeTEgLSB5MCkgKiAodGhpcy54bWluIC0geDApIC8gKHgxIC0geDApLCB4ID0gdGhpcy54bWluO1xuICAgICAgaWYgKGMwKSB4MCA9IHgsIHkwID0geSwgYzAgPSB0aGlzLl9yZWdpb25jb2RlKHgwLCB5MCk7XG4gICAgICBlbHNlIHgxID0geCwgeTEgPSB5LCBjMSA9IHRoaXMuX3JlZ2lvbmNvZGUoeDEsIHkxKTtcbiAgICB9XG4gIH1cbiAgX2NsaXBJbmZpbml0ZShpLCBwb2ludHMsIHZ4MCwgdnkwLCB2eG4sIHZ5bikge1xuICAgIGxldCBQID0gQXJyYXkuZnJvbShwb2ludHMpLCBwO1xuICAgIGlmIChwID0gdGhpcy5fcHJvamVjdChQWzBdLCBQWzFdLCB2eDAsIHZ5MCkpIFAudW5zaGlmdChwWzBdLCBwWzFdKTtcbiAgICBpZiAocCA9IHRoaXMuX3Byb2plY3QoUFtQLmxlbmd0aCAtIDJdLCBQW1AubGVuZ3RoIC0gMV0sIHZ4biwgdnluKSkgUC5wdXNoKHBbMF0sIHBbMV0pO1xuICAgIGlmIChQID0gdGhpcy5fY2xpcEZpbml0ZShpLCBQKSkge1xuICAgICAgZm9yIChsZXQgaiA9IDAsIG4gPSBQLmxlbmd0aCwgYzAsIGMxID0gdGhpcy5fZWRnZWNvZGUoUFtuIC0gMl0sIFBbbiAtIDFdKTsgaiA8IG47IGogKz0gMikge1xuICAgICAgICBjMCA9IGMxLCBjMSA9IHRoaXMuX2VkZ2Vjb2RlKFBbal0sIFBbaiArIDFdKTtcbiAgICAgICAgaWYgKGMwICYmIGMxKSBqID0gdGhpcy5fZWRnZShpLCBjMCwgYzEsIFAsIGopLCBuID0gUC5sZW5ndGg7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmICh0aGlzLmNvbnRhaW5zKGksICh0aGlzLnhtaW4gKyB0aGlzLnhtYXgpIC8gMiwgKHRoaXMueW1pbiArIHRoaXMueW1heCkgLyAyKSkge1xuICAgICAgUCA9IFt0aGlzLnhtaW4sIHRoaXMueW1pbiwgdGhpcy54bWF4LCB0aGlzLnltaW4sIHRoaXMueG1heCwgdGhpcy55bWF4LCB0aGlzLnhtaW4sIHRoaXMueW1heF07XG4gICAgfVxuICAgIHJldHVybiBQO1xuICB9XG4gIF9lZGdlKGksIGUwLCBlMSwgUCwgaikge1xuICAgIHdoaWxlIChlMCAhPT0gZTEpIHtcbiAgICAgIGxldCB4LCB5O1xuICAgICAgc3dpdGNoIChlMCkge1xuICAgICAgICBjYXNlIDBiMDEwMTogZTAgPSAwYjAxMDA7IGNvbnRpbnVlOyAvLyB0b3AtbGVmdFxuICAgICAgICBjYXNlIDBiMDEwMDogZTAgPSAwYjAxMTAsIHggPSB0aGlzLnhtYXgsIHkgPSB0aGlzLnltaW47IGJyZWFrOyAvLyB0b3BcbiAgICAgICAgY2FzZSAwYjAxMTA6IGUwID0gMGIwMDEwOyBjb250aW51ZTsgLy8gdG9wLXJpZ2h0XG4gICAgICAgIGNhc2UgMGIwMDEwOiBlMCA9IDBiMTAxMCwgeCA9IHRoaXMueG1heCwgeSA9IHRoaXMueW1heDsgYnJlYWs7IC8vIHJpZ2h0XG4gICAgICAgIGNhc2UgMGIxMDEwOiBlMCA9IDBiMTAwMDsgY29udGludWU7IC8vIGJvdHRvbS1yaWdodFxuICAgICAgICBjYXNlIDBiMTAwMDogZTAgPSAwYjEwMDEsIHggPSB0aGlzLnhtaW4sIHkgPSB0aGlzLnltYXg7IGJyZWFrOyAvLyBib3R0b21cbiAgICAgICAgY2FzZSAwYjEwMDE6IGUwID0gMGIwMDAxOyBjb250aW51ZTsgLy8gYm90dG9tLWxlZnRcbiAgICAgICAgY2FzZSAwYjAwMDE6IGUwID0gMGIwMTAxLCB4ID0gdGhpcy54bWluLCB5ID0gdGhpcy55bWluOyBicmVhazsgLy8gbGVmdFxuICAgICAgfVxuICAgICAgaWYgKChQW2pdICE9PSB4IHx8IFBbaiArIDFdICE9PSB5KSAmJiB0aGlzLmNvbnRhaW5zKGksIHgsIHkpKSB7XG4gICAgICAgIFAuc3BsaWNlKGosIDAsIHgsIHkpLCBqICs9IDI7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBqO1xuICB9XG4gIF9wcm9qZWN0KHgwLCB5MCwgdngsIHZ5KSB7XG4gICAgbGV0IHQgPSBJbmZpbml0eSwgYywgeCwgeTtcbiAgICBpZiAodnkgPCAwKSB7IC8vIHRvcFxuICAgICAgaWYgKHkwIDw9IHRoaXMueW1pbikgcmV0dXJuIG51bGw7XG4gICAgICBpZiAoKGMgPSAodGhpcy55bWluIC0geTApIC8gdnkpIDwgdCkgeSA9IHRoaXMueW1pbiwgeCA9IHgwICsgKHQgPSBjKSAqIHZ4O1xuICAgIH0gZWxzZSBpZiAodnkgPiAwKSB7IC8vIGJvdHRvbVxuICAgICAgaWYgKHkwID49IHRoaXMueW1heCkgcmV0dXJuIG51bGw7XG4gICAgICBpZiAoKGMgPSAodGhpcy55bWF4IC0geTApIC8gdnkpIDwgdCkgeSA9IHRoaXMueW1heCwgeCA9IHgwICsgKHQgPSBjKSAqIHZ4O1xuICAgIH1cbiAgICBpZiAodnggPiAwKSB7IC8vIHJpZ2h0XG4gICAgICBpZiAoeDAgPj0gdGhpcy54bWF4KSByZXR1cm4gbnVsbDtcbiAgICAgIGlmICgoYyA9ICh0aGlzLnhtYXggLSB4MCkgLyB2eCkgPCB0KSB4ID0gdGhpcy54bWF4LCB5ID0geTAgKyAodCA9IGMpICogdnk7XG4gICAgfSBlbHNlIGlmICh2eCA8IDApIHsgLy8gbGVmdFxuICAgICAgaWYgKHgwIDw9IHRoaXMueG1pbikgcmV0dXJuIG51bGw7XG4gICAgICBpZiAoKGMgPSAodGhpcy54bWluIC0geDApIC8gdngpIDwgdCkgeCA9IHRoaXMueG1pbiwgeSA9IHkwICsgKHQgPSBjKSAqIHZ5O1xuICAgIH1cbiAgICByZXR1cm4gW3gsIHldO1xuICB9XG4gIF9lZGdlY29kZSh4LCB5KSB7XG4gICAgcmV0dXJuICh4ID09PSB0aGlzLnhtaW4gPyAwYjAwMDFcbiAgICAgICAgOiB4ID09PSB0aGlzLnhtYXggPyAwYjAwMTAgOiAwYjAwMDApXG4gICAgICAgIHwgKHkgPT09IHRoaXMueW1pbiA/IDBiMDEwMFxuICAgICAgICA6IHkgPT09IHRoaXMueW1heCA/IDBiMTAwMCA6IDBiMDAwMCk7XG4gIH1cbiAgX3JlZ2lvbmNvZGUoeCwgeSkge1xuICAgIHJldHVybiAoeCA8IHRoaXMueG1pbiA/IDBiMDAwMVxuICAgICAgICA6IHggPiB0aGlzLnhtYXggPyAwYjAwMTAgOiAwYjAwMDApXG4gICAgICAgIHwgKHkgPCB0aGlzLnltaW4gPyAwYjAxMDBcbiAgICAgICAgOiB5ID4gdGhpcy55bWF4ID8gMGIxMDAwIDogMGIwMDAwKTtcbiAgfVxufVxuIiwiXG5jb25zdCBFUFNJTE9OID0gTWF0aC5wb3coMiwgLTUyKTtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRGVsYXVuYXRvciB7XG5cbiAgICBzdGF0aWMgZnJvbShwb2ludHMsIGdldFgsIGdldFkpIHtcbiAgICAgICAgaWYgKCFnZXRYKSBnZXRYID0gZGVmYXVsdEdldFg7XG4gICAgICAgIGlmICghZ2V0WSkgZ2V0WSA9IGRlZmF1bHRHZXRZO1xuXG4gICAgICAgIGNvbnN0IG4gPSBwb2ludHMubGVuZ3RoO1xuICAgICAgICBjb25zdCBjb29yZHMgPSBuZXcgRmxvYXQ2NEFycmF5KG4gKiAyKTtcblxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG47IGkrKykge1xuICAgICAgICAgICAgY29uc3QgcCA9IHBvaW50c1tpXTtcbiAgICAgICAgICAgIGNvb3Jkc1syICogaV0gPSBnZXRYKHApO1xuICAgICAgICAgICAgY29vcmRzWzIgKiBpICsgMV0gPSBnZXRZKHApO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIG5ldyBEZWxhdW5hdG9yKGNvb3Jkcyk7XG4gICAgfVxuXG4gICAgY29uc3RydWN0b3IoY29vcmRzKSB7XG4gICAgICAgIGxldCBtaW5YID0gSW5maW5pdHk7XG4gICAgICAgIGxldCBtaW5ZID0gSW5maW5pdHk7XG4gICAgICAgIGxldCBtYXhYID0gLUluZmluaXR5O1xuICAgICAgICBsZXQgbWF4WSA9IC1JbmZpbml0eTtcblxuICAgICAgICBjb25zdCBuID0gY29vcmRzLmxlbmd0aCA+PiAxO1xuICAgICAgICBjb25zdCBpZHMgPSB0aGlzLmlkcyA9IG5ldyBVaW50MzJBcnJheShuKTtcblxuICAgICAgICBpZiAobiA+IDAgJiYgdHlwZW9mIGNvb3Jkc1swXSAhPT0gJ251bWJlcicpIHRocm93IG5ldyBFcnJvcignRXhwZWN0ZWQgY29vcmRzIHRvIGNvbnRhaW4gbnVtYmVycy4nKTtcblxuICAgICAgICB0aGlzLmNvb3JkcyA9IGNvb3JkcztcblxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG47IGkrKykge1xuICAgICAgICAgICAgY29uc3QgeCA9IGNvb3Jkc1syICogaV07XG4gICAgICAgICAgICBjb25zdCB5ID0gY29vcmRzWzIgKiBpICsgMV07XG4gICAgICAgICAgICBpZiAoeCA8IG1pblgpIG1pblggPSB4O1xuICAgICAgICAgICAgaWYgKHkgPCBtaW5ZKSBtaW5ZID0geTtcbiAgICAgICAgICAgIGlmICh4ID4gbWF4WCkgbWF4WCA9IHg7XG4gICAgICAgICAgICBpZiAoeSA+IG1heFkpIG1heFkgPSB5O1xuICAgICAgICAgICAgaWRzW2ldID0gaTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGN4ID0gKG1pblggKyBtYXhYKSAvIDI7XG4gICAgICAgIGNvbnN0IGN5ID0gKG1pblkgKyBtYXhZKSAvIDI7XG5cbiAgICAgICAgbGV0IG1pbkRpc3QgPSBJbmZpbml0eTtcbiAgICAgICAgbGV0IGkwLCBpMSwgaTI7XG5cbiAgICAgICAgLy8gcGljayBhIHNlZWQgcG9pbnQgY2xvc2UgdG8gdGhlIGNlbnRyb2lkXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbjsgaSsrKSB7XG4gICAgICAgICAgICBjb25zdCBkID0gZGlzdChjeCwgY3ksIGNvb3Jkc1syICogaV0sIGNvb3Jkc1syICogaSArIDFdKTtcbiAgICAgICAgICAgIGlmIChkIDwgbWluRGlzdCkge1xuICAgICAgICAgICAgICAgIGkwID0gaTtcbiAgICAgICAgICAgICAgICBtaW5EaXN0ID0gZDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBjb25zdCBpMHggPSBjb29yZHNbMiAqIGkwXTtcbiAgICAgICAgY29uc3QgaTB5ID0gY29vcmRzWzIgKiBpMCArIDFdO1xuXG4gICAgICAgIG1pbkRpc3QgPSBJbmZpbml0eTtcblxuICAgICAgICAvLyBmaW5kIHRoZSBwb2ludCBjbG9zZXN0IHRvIHRoZSBzZWVkXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbjsgaSsrKSB7XG4gICAgICAgICAgICBpZiAoaSA9PT0gaTApIGNvbnRpbnVlO1xuICAgICAgICAgICAgY29uc3QgZCA9IGRpc3QoaTB4LCBpMHksIGNvb3Jkc1syICogaV0sIGNvb3Jkc1syICogaSArIDFdKTtcbiAgICAgICAgICAgIGlmIChkIDwgbWluRGlzdCAmJiBkID4gMCkge1xuICAgICAgICAgICAgICAgIGkxID0gaTtcbiAgICAgICAgICAgICAgICBtaW5EaXN0ID0gZDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBsZXQgaTF4ID0gY29vcmRzWzIgKiBpMV07XG4gICAgICAgIGxldCBpMXkgPSBjb29yZHNbMiAqIGkxICsgMV07XG5cbiAgICAgICAgbGV0IG1pblJhZGl1cyA9IEluZmluaXR5O1xuXG4gICAgICAgIC8vIGZpbmQgdGhlIHRoaXJkIHBvaW50IHdoaWNoIGZvcm1zIHRoZSBzbWFsbGVzdCBjaXJjdW1jaXJjbGUgd2l0aCB0aGUgZmlyc3QgdHdvXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbjsgaSsrKSB7XG4gICAgICAgICAgICBpZiAoaSA9PT0gaTAgfHwgaSA9PT0gaTEpIGNvbnRpbnVlO1xuICAgICAgICAgICAgY29uc3QgciA9IGNpcmN1bXJhZGl1cyhpMHgsIGkweSwgaTF4LCBpMXksIGNvb3Jkc1syICogaV0sIGNvb3Jkc1syICogaSArIDFdKTtcbiAgICAgICAgICAgIGlmIChyIDwgbWluUmFkaXVzKSB7XG4gICAgICAgICAgICAgICAgaTIgPSBpO1xuICAgICAgICAgICAgICAgIG1pblJhZGl1cyA9IHI7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgbGV0IGkyeCA9IGNvb3Jkc1syICogaTJdO1xuICAgICAgICBsZXQgaTJ5ID0gY29vcmRzWzIgKiBpMiArIDFdO1xuXG4gICAgICAgIGlmIChtaW5SYWRpdXMgPT09IEluZmluaXR5KSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ05vIERlbGF1bmF5IHRyaWFuZ3VsYXRpb24gZXhpc3RzIGZvciB0aGlzIGlucHV0LicpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gc3dhcCB0aGUgb3JkZXIgb2YgdGhlIHNlZWQgcG9pbnRzIGZvciBjb3VudGVyLWNsb2Nrd2lzZSBvcmllbnRhdGlvblxuICAgICAgICBpZiAob3JpZW50KGkweCwgaTB5LCBpMXgsIGkxeSwgaTJ4LCBpMnkpKSB7XG4gICAgICAgICAgICBjb25zdCBpID0gaTE7XG4gICAgICAgICAgICBjb25zdCB4ID0gaTF4O1xuICAgICAgICAgICAgY29uc3QgeSA9IGkxeTtcbiAgICAgICAgICAgIGkxID0gaTI7XG4gICAgICAgICAgICBpMXggPSBpMng7XG4gICAgICAgICAgICBpMXkgPSBpMnk7XG4gICAgICAgICAgICBpMiA9IGk7XG4gICAgICAgICAgICBpMnggPSB4O1xuICAgICAgICAgICAgaTJ5ID0geTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGNlbnRlciA9IGNpcmN1bWNlbnRlcihpMHgsIGkweSwgaTF4LCBpMXksIGkyeCwgaTJ5KTtcbiAgICAgICAgdGhpcy5fY3ggPSBjZW50ZXIueDtcbiAgICAgICAgdGhpcy5fY3kgPSBjZW50ZXIueTtcblxuICAgICAgICAvLyBzb3J0IHRoZSBwb2ludHMgYnkgZGlzdGFuY2UgZnJvbSB0aGUgc2VlZCB0cmlhbmdsZSBjaXJjdW1jZW50ZXJcbiAgICAgICAgcXVpY2tzb3J0KGlkcywgY29vcmRzLCAwLCBpZHMubGVuZ3RoIC0gMSwgY2VudGVyLngsIGNlbnRlci55KTtcblxuICAgICAgICAvLyBpbml0aWFsaXplIGEgaGFzaCB0YWJsZSBmb3Igc3RvcmluZyBlZGdlcyBvZiB0aGUgYWR2YW5jaW5nIGNvbnZleCBodWxsXG4gICAgICAgIHRoaXMuX2hhc2hTaXplID0gTWF0aC5jZWlsKE1hdGguc3FydChuKSk7XG4gICAgICAgIHRoaXMuX2hhc2ggPSBuZXcgQXJyYXkodGhpcy5faGFzaFNpemUpO1xuXG4gICAgICAgIC8vIGluaXRpYWxpemUgYSBjaXJjdWxhciBkb3VibHktbGlua2VkIGxpc3QgdGhhdCB3aWxsIGhvbGQgYW4gYWR2YW5jaW5nIGNvbnZleCBodWxsXG4gICAgICAgIGxldCBlID0gdGhpcy5odWxsID0gaW5zZXJ0Tm9kZShjb29yZHMsIGkwKTtcbiAgICAgICAgdGhpcy5faGFzaEVkZ2UoZSk7XG4gICAgICAgIGUudCA9IDA7XG4gICAgICAgIGUgPSBpbnNlcnROb2RlKGNvb3JkcywgaTEsIGUpO1xuICAgICAgICB0aGlzLl9oYXNoRWRnZShlKTtcbiAgICAgICAgZS50ID0gMTtcbiAgICAgICAgZSA9IGluc2VydE5vZGUoY29vcmRzLCBpMiwgZSk7XG4gICAgICAgIHRoaXMuX2hhc2hFZGdlKGUpO1xuICAgICAgICBlLnQgPSAyO1xuXG4gICAgICAgIGNvbnN0IG1heFRyaWFuZ2xlcyA9IDIgKiBuIC0gNTtcbiAgICAgICAgY29uc3QgdHJpYW5nbGVzID0gdGhpcy50cmlhbmdsZXMgPSBuZXcgVWludDMyQXJyYXkobWF4VHJpYW5nbGVzICogMyk7XG4gICAgICAgIGNvbnN0IGhhbGZlZGdlcyA9IHRoaXMuaGFsZmVkZ2VzID0gbmV3IEludDMyQXJyYXkobWF4VHJpYW5nbGVzICogMyk7XG5cbiAgICAgICAgdGhpcy50cmlhbmdsZXNMZW4gPSAwO1xuXG4gICAgICAgIHRoaXMuX2FkZFRyaWFuZ2xlKGkwLCBpMSwgaTIsIC0xLCAtMSwgLTEpO1xuXG4gICAgICAgIGZvciAobGV0IGsgPSAwLCB4cCwgeXA7IGsgPCBpZHMubGVuZ3RoOyBrKyspIHtcbiAgICAgICAgICAgIGNvbnN0IGkgPSBpZHNba107XG4gICAgICAgICAgICBjb25zdCB4ID0gY29vcmRzWzIgKiBpXTtcbiAgICAgICAgICAgIGNvbnN0IHkgPSBjb29yZHNbMiAqIGkgKyAxXTtcblxuICAgICAgICAgICAgLy8gc2tpcCBuZWFyLWR1cGxpY2F0ZSBwb2ludHNcbiAgICAgICAgICAgIGlmIChrID4gMCAmJiBNYXRoLmFicyh4IC0geHApIDw9IEVQU0lMT04gJiYgTWF0aC5hYnMoeSAtIHlwKSA8PSBFUFNJTE9OKSBjb250aW51ZTtcbiAgICAgICAgICAgIHhwID0geDtcbiAgICAgICAgICAgIHlwID0geTtcblxuICAgICAgICAgICAgLy8gc2tpcCBzZWVkIHRyaWFuZ2xlIHBvaW50c1xuICAgICAgICAgICAgaWYgKGkgPT09IGkwIHx8IGkgPT09IGkxIHx8IGkgPT09IGkyKSBjb250aW51ZTtcblxuICAgICAgICAgICAgLy8gZmluZCBhIHZpc2libGUgZWRnZSBvbiB0aGUgY29udmV4IGh1bGwgdXNpbmcgZWRnZSBoYXNoXG4gICAgICAgICAgICBjb25zdCBzdGFydEtleSA9IHRoaXMuX2hhc2hLZXkoeCwgeSk7XG4gICAgICAgICAgICBsZXQga2V5ID0gc3RhcnRLZXk7XG4gICAgICAgICAgICBsZXQgc3RhcnQ7XG4gICAgICAgICAgICBkbyB7XG4gICAgICAgICAgICAgICAgc3RhcnQgPSB0aGlzLl9oYXNoW2tleV07XG4gICAgICAgICAgICAgICAga2V5ID0gKGtleSArIDEpICUgdGhpcy5faGFzaFNpemU7XG4gICAgICAgICAgICB9IHdoaWxlICgoIXN0YXJ0IHx8IHN0YXJ0LnJlbW92ZWQpICYmIGtleSAhPT0gc3RhcnRLZXkpO1xuXG4gICAgICAgICAgICBzdGFydCA9IHN0YXJ0LnByZXY7XG4gICAgICAgICAgICBlID0gc3RhcnQ7XG4gICAgICAgICAgICB3aGlsZSAoIW9yaWVudCh4LCB5LCBlLngsIGUueSwgZS5uZXh0LngsIGUubmV4dC55KSkge1xuICAgICAgICAgICAgICAgIGUgPSBlLm5leHQ7XG4gICAgICAgICAgICAgICAgaWYgKGUgPT09IHN0YXJ0KSB7XG4gICAgICAgICAgICAgICAgICAgIGUgPSBudWxsO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBsaWtlbHkgYSBuZWFyLWR1cGxpY2F0ZSBwb2ludDsgc2tpcCBpdFxuICAgICAgICAgICAgaWYgKCFlKSBjb250aW51ZTtcblxuICAgICAgICAgICAgY29uc3Qgd2Fsa0JhY2sgPSBlID09PSBzdGFydDtcblxuICAgICAgICAgICAgLy8gYWRkIHRoZSBmaXJzdCB0cmlhbmdsZSBmcm9tIHRoZSBwb2ludFxuICAgICAgICAgICAgbGV0IHQgPSB0aGlzLl9hZGRUcmlhbmdsZShlLmksIGksIGUubmV4dC5pLCAtMSwgLTEsIGUudCk7XG5cbiAgICAgICAgICAgIGUudCA9IHQ7IC8vIGtlZXAgdHJhY2sgb2YgYm91bmRhcnkgdHJpYW5nbGVzIG9uIHRoZSBodWxsXG4gICAgICAgICAgICBlID0gaW5zZXJ0Tm9kZShjb29yZHMsIGksIGUpO1xuXG4gICAgICAgICAgICAvLyByZWN1cnNpdmVseSBmbGlwIHRyaWFuZ2xlcyBmcm9tIHRoZSBwb2ludCB1bnRpbCB0aGV5IHNhdGlzZnkgdGhlIERlbGF1bmF5IGNvbmRpdGlvblxuICAgICAgICAgICAgZS50ID0gdGhpcy5fbGVnYWxpemUodCArIDIpO1xuXG4gICAgICAgICAgICAvLyB3YWxrIGZvcndhcmQgdGhyb3VnaCB0aGUgaHVsbCwgYWRkaW5nIG1vcmUgdHJpYW5nbGVzIGFuZCBmbGlwcGluZyByZWN1cnNpdmVseVxuICAgICAgICAgICAgbGV0IHEgPSBlLm5leHQ7XG4gICAgICAgICAgICB3aGlsZSAob3JpZW50KHgsIHksIHEueCwgcS55LCBxLm5leHQueCwgcS5uZXh0LnkpKSB7XG4gICAgICAgICAgICAgICAgdCA9IHRoaXMuX2FkZFRyaWFuZ2xlKHEuaSwgaSwgcS5uZXh0LmksIHEucHJldi50LCAtMSwgcS50KTtcbiAgICAgICAgICAgICAgICBxLnByZXYudCA9IHRoaXMuX2xlZ2FsaXplKHQgKyAyKTtcbiAgICAgICAgICAgICAgICB0aGlzLmh1bGwgPSByZW1vdmVOb2RlKHEpO1xuICAgICAgICAgICAgICAgIHEgPSBxLm5leHQ7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICh3YWxrQmFjaykge1xuICAgICAgICAgICAgICAgIC8vIHdhbGsgYmFja3dhcmQgZnJvbSB0aGUgb3RoZXIgc2lkZSwgYWRkaW5nIG1vcmUgdHJpYW5nbGVzIGFuZCBmbGlwcGluZ1xuICAgICAgICAgICAgICAgIHEgPSBlLnByZXY7XG4gICAgICAgICAgICAgICAgd2hpbGUgKG9yaWVudCh4LCB5LCBxLnByZXYueCwgcS5wcmV2LnksIHEueCwgcS55KSkge1xuICAgICAgICAgICAgICAgICAgICB0ID0gdGhpcy5fYWRkVHJpYW5nbGUocS5wcmV2LmksIGksIHEuaSwgLTEsIHEudCwgcS5wcmV2LnQpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9sZWdhbGl6ZSh0ICsgMik7XG4gICAgICAgICAgICAgICAgICAgIHEucHJldi50ID0gdDtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5odWxsID0gcmVtb3ZlTm9kZShxKTtcbiAgICAgICAgICAgICAgICAgICAgcSA9IHEucHJldjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIHNhdmUgdGhlIHR3byBuZXcgZWRnZXMgaW4gdGhlIGhhc2ggdGFibGVcbiAgICAgICAgICAgIHRoaXMuX2hhc2hFZGdlKGUpO1xuICAgICAgICAgICAgdGhpcy5faGFzaEVkZ2UoZS5wcmV2KTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIHRyaW0gdHlwZWQgdHJpYW5nbGUgbWVzaCBhcnJheXNcbiAgICAgICAgdGhpcy50cmlhbmdsZXMgPSB0cmlhbmdsZXMuc3ViYXJyYXkoMCwgdGhpcy50cmlhbmdsZXNMZW4pO1xuICAgICAgICB0aGlzLmhhbGZlZGdlcyA9IGhhbGZlZGdlcy5zdWJhcnJheSgwLCB0aGlzLnRyaWFuZ2xlc0xlbik7XG4gICAgfVxuXG4gICAgX2hhc2hFZGdlKGUpIHtcbiAgICAgICAgdGhpcy5faGFzaFt0aGlzLl9oYXNoS2V5KGUueCwgZS55KV0gPSBlO1xuICAgIH1cblxuICAgIF9oYXNoS2V5KHgsIHkpIHtcbiAgICAgICAgcmV0dXJuIE1hdGguZmxvb3IocHNldWRvQW5nbGUoeCAtIHRoaXMuX2N4LCB5IC0gdGhpcy5fY3kpICogdGhpcy5faGFzaFNpemUpICUgdGhpcy5faGFzaFNpemU7XG4gICAgfVxuXG4gICAgX2xlZ2FsaXplKGEpIHtcbiAgICAgICAgY29uc3Qge3RyaWFuZ2xlcywgY29vcmRzLCBoYWxmZWRnZXN9ID0gdGhpcztcblxuICAgICAgICBjb25zdCBiID0gaGFsZmVkZ2VzW2FdO1xuXG4gICAgICAgIC8qIGlmIHRoZSBwYWlyIG9mIHRyaWFuZ2xlcyBkb2Vzbid0IHNhdGlzZnkgdGhlIERlbGF1bmF5IGNvbmRpdGlvblxuICAgICAgICAgKiAocDEgaXMgaW5zaWRlIHRoZSBjaXJjdW1jaXJjbGUgb2YgW3AwLCBwbCwgcHJdKSwgZmxpcCB0aGVtLFxuICAgICAgICAgKiB0aGVuIGRvIHRoZSBzYW1lIGNoZWNrL2ZsaXAgcmVjdXJzaXZlbHkgZm9yIHRoZSBuZXcgcGFpciBvZiB0cmlhbmdsZXNcbiAgICAgICAgICpcbiAgICAgICAgICogICAgICAgICAgIHBsICAgICAgICAgICAgICAgICAgICBwbFxuICAgICAgICAgKiAgICAgICAgICAvfHxcXCAgICAgICAgICAgICAgICAgIC8gIFxcXG4gICAgICAgICAqICAgICAgIGFsLyB8fCBcXGJsICAgICAgICAgICAgYWwvICAgIFxcYVxuICAgICAgICAgKiAgICAgICAgLyAgfHwgIFxcICAgICAgICAgICAgICAvICAgICAgXFxcbiAgICAgICAgICogICAgICAgLyAgYXx8YiAgXFwgICAgZmxpcCAgICAvX19fYXJfX19cXFxuICAgICAgICAgKiAgICAgcDBcXCAgIHx8ICAgL3AxICAgPT4gICBwMFxcLS0tYmwtLS0vcDFcbiAgICAgICAgICogICAgICAgIFxcICB8fCAgLyAgICAgICAgICAgICAgXFwgICAgICAvXG4gICAgICAgICAqICAgICAgIGFyXFwgfHwgL2JyICAgICAgICAgICAgIGJcXCAgICAvYnJcbiAgICAgICAgICogICAgICAgICAgXFx8fC8gICAgICAgICAgICAgICAgICBcXCAgL1xuICAgICAgICAgKiAgICAgICAgICAgcHIgICAgICAgICAgICAgICAgICAgIHByXG4gICAgICAgICAqL1xuICAgICAgICBjb25zdCBhMCA9IGEgLSBhICUgMztcbiAgICAgICAgY29uc3QgYjAgPSBiIC0gYiAlIDM7XG5cbiAgICAgICAgY29uc3QgYWwgPSBhMCArIChhICsgMSkgJSAzO1xuICAgICAgICBjb25zdCBhciA9IGEwICsgKGEgKyAyKSAlIDM7XG4gICAgICAgIGNvbnN0IGJsID0gYjAgKyAoYiArIDIpICUgMztcblxuICAgICAgICBpZiAoYiA9PT0gLTEpIHJldHVybiBhcjtcblxuICAgICAgICBjb25zdCBwMCA9IHRyaWFuZ2xlc1thcl07XG4gICAgICAgIGNvbnN0IHByID0gdHJpYW5nbGVzW2FdO1xuICAgICAgICBjb25zdCBwbCA9IHRyaWFuZ2xlc1thbF07XG4gICAgICAgIGNvbnN0IHAxID0gdHJpYW5nbGVzW2JsXTtcblxuICAgICAgICBjb25zdCBpbGxlZ2FsID0gaW5DaXJjbGUoXG4gICAgICAgICAgICBjb29yZHNbMiAqIHAwXSwgY29vcmRzWzIgKiBwMCArIDFdLFxuICAgICAgICAgICAgY29vcmRzWzIgKiBwcl0sIGNvb3Jkc1syICogcHIgKyAxXSxcbiAgICAgICAgICAgIGNvb3Jkc1syICogcGxdLCBjb29yZHNbMiAqIHBsICsgMV0sXG4gICAgICAgICAgICBjb29yZHNbMiAqIHAxXSwgY29vcmRzWzIgKiBwMSArIDFdKTtcblxuICAgICAgICBpZiAoaWxsZWdhbCkge1xuICAgICAgICAgICAgdHJpYW5nbGVzW2FdID0gcDE7XG4gICAgICAgICAgICB0cmlhbmdsZXNbYl0gPSBwMDtcblxuICAgICAgICAgICAgY29uc3QgaGJsID0gaGFsZmVkZ2VzW2JsXTtcblxuICAgICAgICAgICAgLy8gZWRnZSBzd2FwcGVkIG9uIHRoZSBvdGhlciBzaWRlIG9mIHRoZSBodWxsIChyYXJlKTsgZml4IHRoZSBoYWxmZWRnZSByZWZlcmVuY2VcbiAgICAgICAgICAgIGlmIChoYmwgPT09IC0xKSB7XG4gICAgICAgICAgICAgICAgbGV0IGUgPSB0aGlzLmh1bGw7XG4gICAgICAgICAgICAgICAgZG8ge1xuICAgICAgICAgICAgICAgICAgICBpZiAoZS50ID09PSBibCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgZS50ID0gYTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGUgPSBlLm5leHQ7XG4gICAgICAgICAgICAgICAgfSB3aGlsZSAoZSAhPT0gdGhpcy5odWxsKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuX2xpbmsoYSwgaGJsKTtcbiAgICAgICAgICAgIHRoaXMuX2xpbmsoYiwgaGFsZmVkZ2VzW2FyXSk7XG4gICAgICAgICAgICB0aGlzLl9saW5rKGFyLCBibCk7XG5cbiAgICAgICAgICAgIGNvbnN0IGJyID0gYjAgKyAoYiArIDEpICUgMztcblxuICAgICAgICAgICAgdGhpcy5fbGVnYWxpemUoYSk7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fbGVnYWxpemUoYnIpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGFyO1xuICAgIH1cblxuICAgIF9saW5rKGEsIGIpIHtcbiAgICAgICAgdGhpcy5oYWxmZWRnZXNbYV0gPSBiO1xuICAgICAgICBpZiAoYiAhPT0gLTEpIHRoaXMuaGFsZmVkZ2VzW2JdID0gYTtcbiAgICB9XG5cbiAgICAvLyBhZGQgYSBuZXcgdHJpYW5nbGUgZ2l2ZW4gdmVydGV4IGluZGljZXMgYW5kIGFkamFjZW50IGhhbGYtZWRnZSBpZHNcbiAgICBfYWRkVHJpYW5nbGUoaTAsIGkxLCBpMiwgYSwgYiwgYykge1xuICAgICAgICBjb25zdCB0ID0gdGhpcy50cmlhbmdsZXNMZW47XG5cbiAgICAgICAgdGhpcy50cmlhbmdsZXNbdF0gPSBpMDtcbiAgICAgICAgdGhpcy50cmlhbmdsZXNbdCArIDFdID0gaTE7XG4gICAgICAgIHRoaXMudHJpYW5nbGVzW3QgKyAyXSA9IGkyO1xuXG4gICAgICAgIHRoaXMuX2xpbmsodCwgYSk7XG4gICAgICAgIHRoaXMuX2xpbmsodCArIDEsIGIpO1xuICAgICAgICB0aGlzLl9saW5rKHQgKyAyLCBjKTtcblxuICAgICAgICB0aGlzLnRyaWFuZ2xlc0xlbiArPSAzO1xuXG4gICAgICAgIHJldHVybiB0O1xuICAgIH1cbn1cblxuLy8gbW9ub3RvbmljYWxseSBpbmNyZWFzZXMgd2l0aCByZWFsIGFuZ2xlLCBidXQgZG9lc24ndCBuZWVkIGV4cGVuc2l2ZSB0cmlnb25vbWV0cnlcbmZ1bmN0aW9uIHBzZXVkb0FuZ2xlKGR4LCBkeSkge1xuICAgIGNvbnN0IHAgPSBkeCAvIChNYXRoLmFicyhkeCkgKyBNYXRoLmFicyhkeSkpO1xuICAgIHJldHVybiAoZHkgPiAwID8gMyAtIHAgOiAxICsgcCkgLyA0OyAvLyBbMC4uMV1cbn1cblxuZnVuY3Rpb24gZGlzdChheCwgYXksIGJ4LCBieSkge1xuICAgIGNvbnN0IGR4ID0gYXggLSBieDtcbiAgICBjb25zdCBkeSA9IGF5IC0gYnk7XG4gICAgcmV0dXJuIGR4ICogZHggKyBkeSAqIGR5O1xufVxuXG5mdW5jdGlvbiBvcmllbnQocHgsIHB5LCBxeCwgcXksIHJ4LCByeSkge1xuICAgIHJldHVybiAocXkgLSBweSkgKiAocnggLSBxeCkgLSAocXggLSBweCkgKiAocnkgLSBxeSkgPCAwO1xufVxuXG5mdW5jdGlvbiBpbkNpcmNsZShheCwgYXksIGJ4LCBieSwgY3gsIGN5LCBweCwgcHkpIHtcbiAgICBjb25zdCBkeCA9IGF4IC0gcHg7XG4gICAgY29uc3QgZHkgPSBheSAtIHB5O1xuICAgIGNvbnN0IGV4ID0gYnggLSBweDtcbiAgICBjb25zdCBleSA9IGJ5IC0gcHk7XG4gICAgY29uc3QgZnggPSBjeCAtIHB4O1xuICAgIGNvbnN0IGZ5ID0gY3kgLSBweTtcblxuICAgIGNvbnN0IGFwID0gZHggKiBkeCArIGR5ICogZHk7XG4gICAgY29uc3QgYnAgPSBleCAqIGV4ICsgZXkgKiBleTtcbiAgICBjb25zdCBjcCA9IGZ4ICogZnggKyBmeSAqIGZ5O1xuXG4gICAgcmV0dXJuIGR4ICogKGV5ICogY3AgLSBicCAqIGZ5KSAtXG4gICAgICAgICAgIGR5ICogKGV4ICogY3AgLSBicCAqIGZ4KSArXG4gICAgICAgICAgIGFwICogKGV4ICogZnkgLSBleSAqIGZ4KSA8IDA7XG59XG5cbmZ1bmN0aW9uIGNpcmN1bXJhZGl1cyhheCwgYXksIGJ4LCBieSwgY3gsIGN5KSB7XG4gICAgY29uc3QgZHggPSBieCAtIGF4O1xuICAgIGNvbnN0IGR5ID0gYnkgLSBheTtcbiAgICBjb25zdCBleCA9IGN4IC0gYXg7XG4gICAgY29uc3QgZXkgPSBjeSAtIGF5O1xuXG4gICAgY29uc3QgYmwgPSBkeCAqIGR4ICsgZHkgKiBkeTtcbiAgICBjb25zdCBjbCA9IGV4ICogZXggKyBleSAqIGV5O1xuICAgIGNvbnN0IGQgPSBkeCAqIGV5IC0gZHkgKiBleDtcblxuICAgIGNvbnN0IHggPSAoZXkgKiBibCAtIGR5ICogY2wpICogMC41IC8gZDtcbiAgICBjb25zdCB5ID0gKGR4ICogY2wgLSBleCAqIGJsKSAqIDAuNSAvIGQ7XG5cbiAgICByZXR1cm4gYmwgJiYgY2wgJiYgZCAmJiAoeCAqIHggKyB5ICogeSkgfHwgSW5maW5pdHk7XG59XG5cbmZ1bmN0aW9uIGNpcmN1bWNlbnRlcihheCwgYXksIGJ4LCBieSwgY3gsIGN5KSB7XG4gICAgY29uc3QgZHggPSBieCAtIGF4O1xuICAgIGNvbnN0IGR5ID0gYnkgLSBheTtcbiAgICBjb25zdCBleCA9IGN4IC0gYXg7XG4gICAgY29uc3QgZXkgPSBjeSAtIGF5O1xuXG4gICAgY29uc3QgYmwgPSBkeCAqIGR4ICsgZHkgKiBkeTtcbiAgICBjb25zdCBjbCA9IGV4ICogZXggKyBleSAqIGV5O1xuICAgIGNvbnN0IGQgPSBkeCAqIGV5IC0gZHkgKiBleDtcblxuICAgIGNvbnN0IHggPSBheCArIChleSAqIGJsIC0gZHkgKiBjbCkgKiAwLjUgLyBkO1xuICAgIGNvbnN0IHkgPSBheSArIChkeCAqIGNsIC0gZXggKiBibCkgKiAwLjUgLyBkO1xuXG4gICAgcmV0dXJuIHt4LCB5fTtcbn1cblxuLy8gY3JlYXRlIGEgbmV3IG5vZGUgaW4gYSBkb3VibHkgbGlua2VkIGxpc3RcbmZ1bmN0aW9uIGluc2VydE5vZGUoY29vcmRzLCBpLCBwcmV2KSB7XG4gICAgY29uc3Qgbm9kZSA9IHtcbiAgICAgICAgaSxcbiAgICAgICAgeDogY29vcmRzWzIgKiBpXSxcbiAgICAgICAgeTogY29vcmRzWzIgKiBpICsgMV0sXG4gICAgICAgIHQ6IDAsXG4gICAgICAgIHByZXY6IG51bGwsXG4gICAgICAgIG5leHQ6IG51bGwsXG4gICAgICAgIHJlbW92ZWQ6IGZhbHNlXG4gICAgfTtcblxuICAgIGlmICghcHJldikge1xuICAgICAgICBub2RlLnByZXYgPSBub2RlO1xuICAgICAgICBub2RlLm5leHQgPSBub2RlO1xuXG4gICAgfSBlbHNlIHtcbiAgICAgICAgbm9kZS5uZXh0ID0gcHJldi5uZXh0O1xuICAgICAgICBub2RlLnByZXYgPSBwcmV2O1xuICAgICAgICBwcmV2Lm5leHQucHJldiA9IG5vZGU7XG4gICAgICAgIHByZXYubmV4dCA9IG5vZGU7XG4gICAgfVxuICAgIHJldHVybiBub2RlO1xufVxuXG5mdW5jdGlvbiByZW1vdmVOb2RlKG5vZGUpIHtcbiAgICBub2RlLnByZXYubmV4dCA9IG5vZGUubmV4dDtcbiAgICBub2RlLm5leHQucHJldiA9IG5vZGUucHJldjtcbiAgICBub2RlLnJlbW92ZWQgPSB0cnVlO1xuICAgIHJldHVybiBub2RlLnByZXY7XG59XG5cbmZ1bmN0aW9uIHF1aWNrc29ydChpZHMsIGNvb3JkcywgbGVmdCwgcmlnaHQsIGN4LCBjeSkge1xuICAgIGxldCBpLCBqLCB0ZW1wO1xuXG4gICAgaWYgKHJpZ2h0IC0gbGVmdCA8PSAyMCkge1xuICAgICAgICBmb3IgKGkgPSBsZWZ0ICsgMTsgaSA8PSByaWdodDsgaSsrKSB7XG4gICAgICAgICAgICB0ZW1wID0gaWRzW2ldO1xuICAgICAgICAgICAgaiA9IGkgLSAxO1xuICAgICAgICAgICAgd2hpbGUgKGogPj0gbGVmdCAmJiBjb21wYXJlKGNvb3JkcywgaWRzW2pdLCB0ZW1wLCBjeCwgY3kpID4gMCkgaWRzW2ogKyAxXSA9IGlkc1tqLS1dO1xuICAgICAgICAgICAgaWRzW2ogKyAxXSA9IHRlbXA7XG4gICAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgICBjb25zdCBtZWRpYW4gPSAobGVmdCArIHJpZ2h0KSA+PiAxO1xuICAgICAgICBpID0gbGVmdCArIDE7XG4gICAgICAgIGogPSByaWdodDtcbiAgICAgICAgc3dhcChpZHMsIG1lZGlhbiwgaSk7XG4gICAgICAgIGlmIChjb21wYXJlKGNvb3JkcywgaWRzW2xlZnRdLCBpZHNbcmlnaHRdLCBjeCwgY3kpID4gMCkgc3dhcChpZHMsIGxlZnQsIHJpZ2h0KTtcbiAgICAgICAgaWYgKGNvbXBhcmUoY29vcmRzLCBpZHNbaV0sIGlkc1tyaWdodF0sIGN4LCBjeSkgPiAwKSBzd2FwKGlkcywgaSwgcmlnaHQpO1xuICAgICAgICBpZiAoY29tcGFyZShjb29yZHMsIGlkc1tsZWZ0XSwgaWRzW2ldLCBjeCwgY3kpID4gMCkgc3dhcChpZHMsIGxlZnQsIGkpO1xuXG4gICAgICAgIHRlbXAgPSBpZHNbaV07XG4gICAgICAgIHdoaWxlICh0cnVlKSB7XG4gICAgICAgICAgICBkbyBpKys7IHdoaWxlIChjb21wYXJlKGNvb3JkcywgaWRzW2ldLCB0ZW1wLCBjeCwgY3kpIDwgMCk7XG4gICAgICAgICAgICBkbyBqLS07IHdoaWxlIChjb21wYXJlKGNvb3JkcywgaWRzW2pdLCB0ZW1wLCBjeCwgY3kpID4gMCk7XG4gICAgICAgICAgICBpZiAoaiA8IGkpIGJyZWFrO1xuICAgICAgICAgICAgc3dhcChpZHMsIGksIGopO1xuICAgICAgICB9XG4gICAgICAgIGlkc1tsZWZ0ICsgMV0gPSBpZHNbal07XG4gICAgICAgIGlkc1tqXSA9IHRlbXA7XG5cbiAgICAgICAgaWYgKHJpZ2h0IC0gaSArIDEgPj0gaiAtIGxlZnQpIHtcbiAgICAgICAgICAgIHF1aWNrc29ydChpZHMsIGNvb3JkcywgaSwgcmlnaHQsIGN4LCBjeSk7XG4gICAgICAgICAgICBxdWlja3NvcnQoaWRzLCBjb29yZHMsIGxlZnQsIGogLSAxLCBjeCwgY3kpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcXVpY2tzb3J0KGlkcywgY29vcmRzLCBsZWZ0LCBqIC0gMSwgY3gsIGN5KTtcbiAgICAgICAgICAgIHF1aWNrc29ydChpZHMsIGNvb3JkcywgaSwgcmlnaHQsIGN4LCBjeSk7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbmZ1bmN0aW9uIGNvbXBhcmUoY29vcmRzLCBpLCBqLCBjeCwgY3kpIHtcbiAgICBjb25zdCBkMSA9IGRpc3QoY29vcmRzWzIgKiBpXSwgY29vcmRzWzIgKiBpICsgMV0sIGN4LCBjeSk7XG4gICAgY29uc3QgZDIgPSBkaXN0KGNvb3Jkc1syICogal0sIGNvb3Jkc1syICogaiArIDFdLCBjeCwgY3kpO1xuICAgIHJldHVybiAoZDEgLSBkMikgfHwgKGNvb3Jkc1syICogaV0gLSBjb29yZHNbMiAqIGpdKSB8fCAoY29vcmRzWzIgKiBpICsgMV0gLSBjb29yZHNbMiAqIGogKyAxXSk7XG59XG5cbmZ1bmN0aW9uIHN3YXAoYXJyLCBpLCBqKSB7XG4gICAgY29uc3QgdG1wID0gYXJyW2ldO1xuICAgIGFycltpXSA9IGFycltqXTtcbiAgICBhcnJbal0gPSB0bXA7XG59XG5cbmZ1bmN0aW9uIGRlZmF1bHRHZXRYKHApIHtcbiAgICByZXR1cm4gcFswXTtcbn1cbmZ1bmN0aW9uIGRlZmF1bHRHZXRZKHApIHtcbiAgICByZXR1cm4gcFsxXTtcbn1cbiIsIihmdW5jdGlvbihhLGIpe2lmKFwiZnVuY3Rpb25cIj09dHlwZW9mIGRlZmluZSYmZGVmaW5lLmFtZClkZWZpbmUoW10sYik7ZWxzZSBpZihcInVuZGVmaW5lZFwiIT10eXBlb2YgZXhwb3J0cyliKCk7ZWxzZXtiKCksYS5GaWxlU2F2ZXI9e2V4cG9ydHM6e319LmV4cG9ydHN9fSkodGhpcyxmdW5jdGlvbigpe1widXNlIHN0cmljdFwiO2Z1bmN0aW9uIGIoYSxiKXtyZXR1cm5cInVuZGVmaW5lZFwiPT10eXBlb2YgYj9iPXthdXRvQm9tOiExfTpcIm9iamVjdFwiIT10eXBlb2YgYiYmKGNvbnNvbGUud2FybihcIkRlcHJlY2F0ZWQ6IEV4cGVjdGVkIHRoaXJkIGFyZ3VtZW50IHRvIGJlIGEgb2JqZWN0XCIpLGI9e2F1dG9Cb206IWJ9KSxiLmF1dG9Cb20mJi9eXFxzKig/OnRleHRcXC9cXFMqfGFwcGxpY2F0aW9uXFwveG1sfFxcUypcXC9cXFMqXFwreG1sKVxccyo7LipjaGFyc2V0XFxzKj1cXHMqdXRmLTgvaS50ZXN0KGEudHlwZSk/bmV3IEJsb2IoW1wiXFx1RkVGRlwiLGFdLHt0eXBlOmEudHlwZX0pOmF9ZnVuY3Rpb24gYyhiLGMsZCl7dmFyIGU9bmV3IFhNTEh0dHBSZXF1ZXN0O2Uub3BlbihcIkdFVFwiLGIpLGUucmVzcG9uc2VUeXBlPVwiYmxvYlwiLGUub25sb2FkPWZ1bmN0aW9uKCl7YShlLnJlc3BvbnNlLGMsZCl9LGUub25lcnJvcj1mdW5jdGlvbigpe2NvbnNvbGUuZXJyb3IoXCJjb3VsZCBub3QgZG93bmxvYWQgZmlsZVwiKX0sZS5zZW5kKCl9ZnVuY3Rpb24gZChhKXt2YXIgYj1uZXcgWE1MSHR0cFJlcXVlc3Q7cmV0dXJuIGIub3BlbihcIkhFQURcIixhLCExKSxiLnNlbmQoKSwyMDA8PWIuc3RhdHVzJiYyOTk+PWIuc3RhdHVzfWZ1bmN0aW9uIGUoYSl7dHJ5e2EuZGlzcGF0Y2hFdmVudChuZXcgTW91c2VFdmVudChcImNsaWNrXCIpKX1jYXRjaChjKXt2YXIgYj1kb2N1bWVudC5jcmVhdGVFdmVudChcIk1vdXNlRXZlbnRzXCIpO2IuaW5pdE1vdXNlRXZlbnQoXCJjbGlja1wiLCEwLCEwLHdpbmRvdywwLDAsMCw4MCwyMCwhMSwhMSwhMSwhMSwwLG51bGwpLGEuZGlzcGF0Y2hFdmVudChiKX19dmFyIGY9XCJvYmplY3RcIj09dHlwZW9mIHdpbmRvdyYmd2luZG93LndpbmRvdz09PXdpbmRvdz93aW5kb3c6XCJvYmplY3RcIj09dHlwZW9mIHNlbGYmJnNlbGYuc2VsZj09PXNlbGY/c2VsZjpcIm9iamVjdFwiPT10eXBlb2YgZ2xvYmFsJiZnbG9iYWwuZ2xvYmFsPT09Z2xvYmFsP2dsb2JhbDp2b2lkIDAsYT1mLnNhdmVBc3x8KFwib2JqZWN0XCIhPXR5cGVvZiB3aW5kb3d8fHdpbmRvdyE9PWY/ZnVuY3Rpb24oKXt9OlwiZG93bmxvYWRcImluIEhUTUxBbmNob3JFbGVtZW50LnByb3RvdHlwZT9mdW5jdGlvbihiLGcsaCl7dmFyIGk9Zi5VUkx8fGYud2Via2l0VVJMLGo9ZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImFcIik7Zz1nfHxiLm5hbWV8fFwiZG93bmxvYWRcIixqLmRvd25sb2FkPWcsai5yZWw9XCJub29wZW5lclwiLFwic3RyaW5nXCI9PXR5cGVvZiBiPyhqLmhyZWY9YixqLm9yaWdpbj09PWxvY2F0aW9uLm9yaWdpbj9lKGopOmQoai5ocmVmKT9jKGIsZyxoKTplKGosai50YXJnZXQ9XCJfYmxhbmtcIikpOihqLmhyZWY9aS5jcmVhdGVPYmplY3RVUkwoYiksc2V0VGltZW91dChmdW5jdGlvbigpe2kucmV2b2tlT2JqZWN0VVJMKGouaHJlZil9LDRFNCksc2V0VGltZW91dChmdW5jdGlvbigpe2Uoail9LDApKX06XCJtc1NhdmVPck9wZW5CbG9iXCJpbiBuYXZpZ2F0b3I/ZnVuY3Rpb24oZixnLGgpe2lmKGc9Z3x8Zi5uYW1lfHxcImRvd25sb2FkXCIsXCJzdHJpbmdcIiE9dHlwZW9mIGYpbmF2aWdhdG9yLm1zU2F2ZU9yT3BlbkJsb2IoYihmLGgpLGcpO2Vsc2UgaWYoZChmKSljKGYsZyxoKTtlbHNle3ZhciBpPWRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJhXCIpO2kuaHJlZj1mLGkudGFyZ2V0PVwiX2JsYW5rXCIsc2V0VGltZW91dChmdW5jdGlvbigpe2UoaSl9KX19OmZ1bmN0aW9uKGEsYixkLGUpe2lmKGU9ZXx8b3BlbihcIlwiLFwiX2JsYW5rXCIpLGUmJihlLmRvY3VtZW50LnRpdGxlPWUuZG9jdW1lbnQuYm9keS5pbm5lclRleHQ9XCJkb3dubG9hZGluZy4uLlwiKSxcInN0cmluZ1wiPT10eXBlb2YgYSlyZXR1cm4gYyhhLGIsZCk7dmFyIGc9XCJhcHBsaWNhdGlvbi9vY3RldC1zdHJlYW1cIj09PWEudHlwZSxoPS9jb25zdHJ1Y3Rvci9pLnRlc3QoZi5IVE1MRWxlbWVudCl8fGYuc2FmYXJpLGk9L0NyaU9TXFwvW1xcZF0rLy50ZXN0KG5hdmlnYXRvci51c2VyQWdlbnQpO2lmKChpfHxnJiZoKSYmXCJvYmplY3RcIj09dHlwZW9mIEZpbGVSZWFkZXIpe3ZhciBqPW5ldyBGaWxlUmVhZGVyO2oub25sb2FkZW5kPWZ1bmN0aW9uKCl7dmFyIGE9ai5yZXN1bHQ7YT1pP2E6YS5yZXBsYWNlKC9eZGF0YTpbXjtdKjsvLFwiZGF0YTphdHRhY2htZW50L2ZpbGU7XCIpLGU/ZS5sb2NhdGlvbi5ocmVmPWE6bG9jYXRpb249YSxlPW51bGx9LGoucmVhZEFzRGF0YVVSTChhKX1lbHNle3ZhciBrPWYuVVJMfHxmLndlYmtpdFVSTCxsPWsuY3JlYXRlT2JqZWN0VVJMKGEpO2U/ZS5sb2NhdGlvbj1sOmxvY2F0aW9uLmhyZWY9bCxlPW51bGwsc2V0VGltZW91dChmdW5jdGlvbigpe2sucmV2b2tlT2JqZWN0VVJMKGwpfSw0RTQpfX0pO2Yuc2F2ZUFzPWEuc2F2ZUFzPWEsXCJ1bmRlZmluZWRcIiE9dHlwZW9mIG1vZHVsZSYmKG1vZHVsZS5leHBvcnRzPWEpfSk7XG5cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPUZpbGVTYXZlci5taW4uanMubWFwIiwiaW1wb3J0IHRvUGF0aCBmcm9tICcuL3RvUGF0aCc7XG5pbXBvcnQgdG9Qb2ludHMgZnJvbSAnLi90b1BvaW50cyc7XG5pbXBvcnQgdmFsaWQgZnJvbSAnLi92YWxpZCc7XG5cbmV4cG9ydCB7IHRvUGF0aCwgdG9Qb2ludHMsIHZhbGlkIH07IiwiaW1wb3J0IHRvUG9pbnRzIGZyb20gJy4vdG9Qb2ludHMnO1xuXG52YXIgcG9pbnRzVG9EID0gZnVuY3Rpb24gcG9pbnRzVG9EKHApIHtcbiAgdmFyIGQgPSAnJztcbiAgdmFyIGkgPSAwO1xuICB2YXIgZmlyc3RQb2ludCA9IHZvaWQgMDtcblxuICB2YXIgX2l0ZXJhdG9yTm9ybWFsQ29tcGxldGlvbiA9IHRydWU7XG4gIHZhciBfZGlkSXRlcmF0b3JFcnJvciA9IGZhbHNlO1xuICB2YXIgX2l0ZXJhdG9yRXJyb3IgPSB1bmRlZmluZWQ7XG5cbiAgdHJ5IHtcbiAgICBmb3IgKHZhciBfaXRlcmF0b3IgPSBwW1N5bWJvbC5pdGVyYXRvcl0oKSwgX3N0ZXA7ICEoX2l0ZXJhdG9yTm9ybWFsQ29tcGxldGlvbiA9IChfc3RlcCA9IF9pdGVyYXRvci5uZXh0KCkpLmRvbmUpOyBfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uID0gdHJ1ZSkge1xuICAgICAgdmFyIHBvaW50ID0gX3N0ZXAudmFsdWU7XG4gICAgICB2YXIgX3BvaW50JGN1cnZlID0gcG9pbnQuY3VydmUsXG4gICAgICAgICAgY3VydmUgPSBfcG9pbnQkY3VydmUgPT09IHVuZGVmaW5lZCA/IGZhbHNlIDogX3BvaW50JGN1cnZlLFxuICAgICAgICAgIG1vdmVUbyA9IHBvaW50Lm1vdmVUbyxcbiAgICAgICAgICB4ID0gcG9pbnQueCxcbiAgICAgICAgICB5ID0gcG9pbnQueTtcblxuICAgICAgdmFyIGlzRmlyc3RQb2ludCA9IGkgPT09IDAgfHwgbW92ZVRvO1xuICAgICAgdmFyIGlzTGFzdFBvaW50ID0gaSA9PT0gcC5sZW5ndGggLSAxIHx8IHBbaSArIDFdLm1vdmVUbztcbiAgICAgIHZhciBwcmV2UG9pbnQgPSBpID09PSAwID8gbnVsbCA6IHBbaSAtIDFdO1xuXG4gICAgICBpZiAoaXNGaXJzdFBvaW50KSB7XG4gICAgICAgIGZpcnN0UG9pbnQgPSBwb2ludDtcblxuICAgICAgICBpZiAoIWlzTGFzdFBvaW50KSB7XG4gICAgICAgICAgZCArPSAnTScgKyB4ICsgJywnICsgeTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmIChjdXJ2ZSkge1xuICAgICAgICBzd2l0Y2ggKGN1cnZlLnR5cGUpIHtcbiAgICAgICAgICBjYXNlICdhcmMnOlxuICAgICAgICAgICAgdmFyIF9wb2ludCRjdXJ2ZTIgPSBwb2ludC5jdXJ2ZSxcbiAgICAgICAgICAgICAgICBfcG9pbnQkY3VydmUyJGxhcmdlQXIgPSBfcG9pbnQkY3VydmUyLmxhcmdlQXJjRmxhZyxcbiAgICAgICAgICAgICAgICBsYXJnZUFyY0ZsYWcgPSBfcG9pbnQkY3VydmUyJGxhcmdlQXIgPT09IHVuZGVmaW5lZCA/IDAgOiBfcG9pbnQkY3VydmUyJGxhcmdlQXIsXG4gICAgICAgICAgICAgICAgcnggPSBfcG9pbnQkY3VydmUyLnJ4LFxuICAgICAgICAgICAgICAgIHJ5ID0gX3BvaW50JGN1cnZlMi5yeSxcbiAgICAgICAgICAgICAgICBfcG9pbnQkY3VydmUyJHN3ZWVwRmwgPSBfcG9pbnQkY3VydmUyLnN3ZWVwRmxhZyxcbiAgICAgICAgICAgICAgICBzd2VlcEZsYWcgPSBfcG9pbnQkY3VydmUyJHN3ZWVwRmwgPT09IHVuZGVmaW5lZCA/IDAgOiBfcG9pbnQkY3VydmUyJHN3ZWVwRmwsXG4gICAgICAgICAgICAgICAgX3BvaW50JGN1cnZlMiR4QXhpc1JvID0gX3BvaW50JGN1cnZlMi54QXhpc1JvdGF0aW9uLFxuICAgICAgICAgICAgICAgIHhBeGlzUm90YXRpb24gPSBfcG9pbnQkY3VydmUyJHhBeGlzUm8gPT09IHVuZGVmaW5lZCA/IDAgOiBfcG9pbnQkY3VydmUyJHhBeGlzUm87XG5cbiAgICAgICAgICAgIGQgKz0gJ0EnICsgcnggKyAnLCcgKyByeSArICcsJyArIHhBeGlzUm90YXRpb24gKyAnLCcgKyBsYXJnZUFyY0ZsYWcgKyAnLCcgKyBzd2VlcEZsYWcgKyAnLCcgKyB4ICsgJywnICsgeTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgJ2N1YmljJzpcbiAgICAgICAgICAgIHZhciBfcG9pbnQkY3VydmUzID0gcG9pbnQuY3VydmUsXG4gICAgICAgICAgICAgICAgY3gxID0gX3BvaW50JGN1cnZlMy54MSxcbiAgICAgICAgICAgICAgICBjeTEgPSBfcG9pbnQkY3VydmUzLnkxLFxuICAgICAgICAgICAgICAgIGN4MiA9IF9wb2ludCRjdXJ2ZTMueDIsXG4gICAgICAgICAgICAgICAgY3kyID0gX3BvaW50JGN1cnZlMy55MjtcblxuICAgICAgICAgICAgZCArPSAnQycgKyBjeDEgKyAnLCcgKyBjeTEgKyAnLCcgKyBjeDIgKyAnLCcgKyBjeTIgKyAnLCcgKyB4ICsgJywnICsgeTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgJ3F1YWRyYXRpYyc6XG4gICAgICAgICAgICB2YXIgX3BvaW50JGN1cnZlNCA9IHBvaW50LmN1cnZlLFxuICAgICAgICAgICAgICAgIHF4MSA9IF9wb2ludCRjdXJ2ZTQueDEsXG4gICAgICAgICAgICAgICAgcXkxID0gX3BvaW50JGN1cnZlNC55MTtcblxuICAgICAgICAgICAgZCArPSAnUScgKyBxeDEgKyAnLCcgKyBxeTEgKyAnLCcgKyB4ICsgJywnICsgeTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGlzTGFzdFBvaW50ICYmIHggPT09IGZpcnN0UG9pbnQueCAmJiB5ID09PSBmaXJzdFBvaW50LnkpIHtcbiAgICAgICAgICBkICs9ICdaJztcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmIChpc0xhc3RQb2ludCAmJiB4ID09PSBmaXJzdFBvaW50LnggJiYgeSA9PT0gZmlyc3RQb2ludC55KSB7XG4gICAgICAgIGQgKz0gJ1onO1xuICAgICAgfSBlbHNlIGlmICh4ICE9PSBwcmV2UG9pbnQueCAmJiB5ICE9PSBwcmV2UG9pbnQueSkge1xuICAgICAgICBkICs9ICdMJyArIHggKyAnLCcgKyB5O1xuICAgICAgfSBlbHNlIGlmICh4ICE9PSBwcmV2UG9pbnQueCkge1xuICAgICAgICBkICs9ICdIJyArIHg7XG4gICAgICB9IGVsc2UgaWYgKHkgIT09IHByZXZQb2ludC55KSB7XG4gICAgICAgIGQgKz0gJ1YnICsgeTtcbiAgICAgIH1cblxuICAgICAgaSsrO1xuICAgIH1cbiAgfSBjYXRjaCAoZXJyKSB7XG4gICAgX2RpZEl0ZXJhdG9yRXJyb3IgPSB0cnVlO1xuICAgIF9pdGVyYXRvckVycm9yID0gZXJyO1xuICB9IGZpbmFsbHkge1xuICAgIHRyeSB7XG4gICAgICBpZiAoIV9pdGVyYXRvck5vcm1hbENvbXBsZXRpb24gJiYgX2l0ZXJhdG9yLnJldHVybikge1xuICAgICAgICBfaXRlcmF0b3IucmV0dXJuKCk7XG4gICAgICB9XG4gICAgfSBmaW5hbGx5IHtcbiAgICAgIGlmIChfZGlkSXRlcmF0b3JFcnJvcikge1xuICAgICAgICB0aHJvdyBfaXRlcmF0b3JFcnJvcjtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZXR1cm4gZDtcbn07XG5cbnZhciB0b1BhdGggPSBmdW5jdGlvbiB0b1BhdGgocykge1xuICB2YXIgaXNQb2ludHMgPSBBcnJheS5pc0FycmF5KHMpO1xuICB2YXIgaXNHcm91cCA9IGlzUG9pbnRzID8gQXJyYXkuaXNBcnJheShzWzBdKSA6IHMudHlwZSA9PT0gJ2cnO1xuICB2YXIgcG9pbnRzID0gaXNQb2ludHMgPyBzIDogaXNHcm91cCA/IHMuc2hhcGVzLm1hcChmdW5jdGlvbiAoc2hwKSB7XG4gICAgcmV0dXJuIHRvUG9pbnRzKHNocCk7XG4gIH0pIDogdG9Qb2ludHMocyk7XG5cbiAgaWYgKGlzR3JvdXApIHtcbiAgICByZXR1cm4gcG9pbnRzLm1hcChmdW5jdGlvbiAocCkge1xuICAgICAgcmV0dXJuIHBvaW50c1RvRChwKTtcbiAgICB9KTtcbiAgfVxuXG4gIHJldHVybiBwb2ludHNUb0QocG9pbnRzKTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IHRvUGF0aDsiLCJ2YXIgX2V4dGVuZHMgPSBPYmplY3QuYXNzaWduIHx8IGZ1bmN0aW9uICh0YXJnZXQpIHsgZm9yICh2YXIgaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHsgdmFyIHNvdXJjZSA9IGFyZ3VtZW50c1tpXTsgZm9yICh2YXIga2V5IGluIHNvdXJjZSkgeyBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHNvdXJjZSwga2V5KSkgeyB0YXJnZXRba2V5XSA9IHNvdXJjZVtrZXldOyB9IH0gfSByZXR1cm4gdGFyZ2V0OyB9O1xuXG5mdW5jdGlvbiBfb2JqZWN0V2l0aG91dFByb3BlcnRpZXMob2JqLCBrZXlzKSB7IHZhciB0YXJnZXQgPSB7fTsgZm9yICh2YXIgaSBpbiBvYmopIHsgaWYgKGtleXMuaW5kZXhPZihpKSA+PSAwKSBjb250aW51ZTsgaWYgKCFPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBpKSkgY29udGludWU7IHRhcmdldFtpXSA9IG9ialtpXTsgfSByZXR1cm4gdGFyZ2V0OyB9XG5cbnZhciB0b1BvaW50cyA9IGZ1bmN0aW9uIHRvUG9pbnRzKF9yZWYpIHtcbiAgdmFyIHR5cGUgPSBfcmVmLnR5cGUsXG4gICAgICBwcm9wcyA9IF9vYmplY3RXaXRob3V0UHJvcGVydGllcyhfcmVmLCBbJ3R5cGUnXSk7XG5cbiAgc3dpdGNoICh0eXBlKSB7XG4gICAgY2FzZSAnY2lyY2xlJzpcbiAgICAgIHJldHVybiBnZXRQb2ludHNGcm9tQ2lyY2xlKHByb3BzKTtcbiAgICBjYXNlICdlbGxpcHNlJzpcbiAgICAgIHJldHVybiBnZXRQb2ludHNGcm9tRWxsaXBzZShwcm9wcyk7XG4gICAgY2FzZSAnbGluZSc6XG4gICAgICByZXR1cm4gZ2V0UG9pbnRzRnJvbUxpbmUocHJvcHMpO1xuICAgIGNhc2UgJ3BhdGgnOlxuICAgICAgcmV0dXJuIGdldFBvaW50c0Zyb21QYXRoKHByb3BzKTtcbiAgICBjYXNlICdwb2x5Z29uJzpcbiAgICAgIHJldHVybiBnZXRQb2ludHNGcm9tUG9seWdvbihwcm9wcyk7XG4gICAgY2FzZSAncG9seWxpbmUnOlxuICAgICAgcmV0dXJuIGdldFBvaW50c0Zyb21Qb2x5bGluZShwcm9wcyk7XG4gICAgY2FzZSAncmVjdCc6XG4gICAgICByZXR1cm4gZ2V0UG9pbnRzRnJvbVJlY3QocHJvcHMpO1xuICAgIGNhc2UgJ2cnOlxuICAgICAgcmV0dXJuIGdldFBvaW50c0Zyb21HKHByb3BzKTtcbiAgICBkZWZhdWx0OlxuICAgICAgdGhyb3cgbmV3IEVycm9yKCdOb3QgYSB2YWxpZCBzaGFwZSB0eXBlJyk7XG4gIH1cbn07XG5cbnZhciBnZXRQb2ludHNGcm9tQ2lyY2xlID0gZnVuY3Rpb24gZ2V0UG9pbnRzRnJvbUNpcmNsZShfcmVmMikge1xuICB2YXIgY3ggPSBfcmVmMi5jeCxcbiAgICAgIGN5ID0gX3JlZjIuY3ksXG4gICAgICByID0gX3JlZjIucjtcblxuICByZXR1cm4gW3sgeDogY3gsIHk6IGN5IC0gciwgbW92ZVRvOiB0cnVlIH0sIHsgeDogY3gsIHk6IGN5ICsgciwgY3VydmU6IHsgdHlwZTogJ2FyYycsIHJ4OiByLCByeTogciwgc3dlZXBGbGFnOiAxIH0gfSwgeyB4OiBjeCwgeTogY3kgLSByLCBjdXJ2ZTogeyB0eXBlOiAnYXJjJywgcng6IHIsIHJ5OiByLCBzd2VlcEZsYWc6IDEgfSB9XTtcbn07XG5cbnZhciBnZXRQb2ludHNGcm9tRWxsaXBzZSA9IGZ1bmN0aW9uIGdldFBvaW50c0Zyb21FbGxpcHNlKF9yZWYzKSB7XG4gIHZhciBjeCA9IF9yZWYzLmN4LFxuICAgICAgY3kgPSBfcmVmMy5jeSxcbiAgICAgIHJ4ID0gX3JlZjMucngsXG4gICAgICByeSA9IF9yZWYzLnJ5O1xuXG4gIHJldHVybiBbeyB4OiBjeCwgeTogY3kgLSByeSwgbW92ZVRvOiB0cnVlIH0sIHsgeDogY3gsIHk6IGN5ICsgcnksIGN1cnZlOiB7IHR5cGU6ICdhcmMnLCByeDogcngsIHJ5OiByeSwgc3dlZXBGbGFnOiAxIH0gfSwgeyB4OiBjeCwgeTogY3kgLSByeSwgY3VydmU6IHsgdHlwZTogJ2FyYycsIHJ4OiByeCwgcnk6IHJ5LCBzd2VlcEZsYWc6IDEgfSB9XTtcbn07XG5cbnZhciBnZXRQb2ludHNGcm9tTGluZSA9IGZ1bmN0aW9uIGdldFBvaW50c0Zyb21MaW5lKF9yZWY0KSB7XG4gIHZhciB4MSA9IF9yZWY0LngxLFxuICAgICAgeDIgPSBfcmVmNC54MixcbiAgICAgIHkxID0gX3JlZjQueTEsXG4gICAgICB5MiA9IF9yZWY0LnkyO1xuXG4gIHJldHVybiBbeyB4OiB4MSwgeTogeTEsIG1vdmVUbzogdHJ1ZSB9LCB7IHg6IHgyLCB5OiB5MiB9XTtcbn07XG5cbnZhciB2YWxpZENvbW1hbmRzID0gL1tNbUxsSGhWdkNjU3NRcVR0QWFael0vZztcblxudmFyIGNvbW1hbmRMZW5ndGhzID0ge1xuICBBOiA3LFxuICBDOiA2LFxuICBIOiAxLFxuICBMOiAyLFxuICBNOiAyLFxuICBROiA0LFxuICBTOiA0LFxuICBUOiAyLFxuICBWOiAxLFxuICBaOiAwXG59O1xuXG52YXIgcmVsYXRpdmVDb21tYW5kcyA9IFsnYScsICdjJywgJ2gnLCAnbCcsICdtJywgJ3EnLCAncycsICd0JywgJ3YnXTtcblxudmFyIGlzUmVsYXRpdmUgPSBmdW5jdGlvbiBpc1JlbGF0aXZlKGNvbW1hbmQpIHtcbiAgcmV0dXJuIHJlbGF0aXZlQ29tbWFuZHMuaW5kZXhPZihjb21tYW5kKSAhPT0gLTE7XG59O1xuXG52YXIgb3B0aW9uYWxBcmNLZXlzID0gWyd4QXhpc1JvdGF0aW9uJywgJ2xhcmdlQXJjRmxhZycsICdzd2VlcEZsYWcnXTtcblxudmFyIGdldENvbW1hbmRzID0gZnVuY3Rpb24gZ2V0Q29tbWFuZHMoZCkge1xuICByZXR1cm4gZC5tYXRjaCh2YWxpZENvbW1hbmRzKTtcbn07XG5cbnZhciBnZXRQYXJhbXMgPSBmdW5jdGlvbiBnZXRQYXJhbXMoZCkge1xuICByZXR1cm4gZC5zcGxpdCh2YWxpZENvbW1hbmRzKS5tYXAoZnVuY3Rpb24gKHYpIHtcbiAgICByZXR1cm4gdi5yZXBsYWNlKC9bMC05XSstL2csIGZ1bmN0aW9uIChtKSB7XG4gICAgICByZXR1cm4gbS5zbGljZSgwLCAtMSkgKyAnIC0nO1xuICAgIH0pO1xuICB9KS5tYXAoZnVuY3Rpb24gKHYpIHtcbiAgICByZXR1cm4gdi5yZXBsYWNlKC9cXC5bMC05XSsvZywgZnVuY3Rpb24gKG0pIHtcbiAgICAgIHJldHVybiBtICsgJyAnO1xuICAgIH0pO1xuICB9KS5tYXAoZnVuY3Rpb24gKHYpIHtcbiAgICByZXR1cm4gdi50cmltKCk7XG4gIH0pLmZpbHRlcihmdW5jdGlvbiAodikge1xuICAgIHJldHVybiB2Lmxlbmd0aCA+IDA7XG4gIH0pLm1hcChmdW5jdGlvbiAodikge1xuICAgIHJldHVybiB2LnNwbGl0KC9bICxdKy8pLm1hcChwYXJzZUZsb2F0KS5maWx0ZXIoZnVuY3Rpb24gKG4pIHtcbiAgICAgIHJldHVybiAhaXNOYU4obik7XG4gICAgfSk7XG4gIH0pO1xufTtcblxudmFyIGdldFBvaW50c0Zyb21QYXRoID0gZnVuY3Rpb24gZ2V0UG9pbnRzRnJvbVBhdGgoX3JlZjUpIHtcbiAgdmFyIGQgPSBfcmVmNS5kO1xuXG4gIHZhciBjb21tYW5kcyA9IGdldENvbW1hbmRzKGQpO1xuICB2YXIgcGFyYW1zID0gZ2V0UGFyYW1zKGQpO1xuXG4gIHZhciBwb2ludHMgPSBbXTtcblxuICB2YXIgbW92ZVRvID0gdm9pZCAwO1xuXG4gIGZvciAodmFyIGkgPSAwLCBsID0gY29tbWFuZHMubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgdmFyIGNvbW1hbmQgPSBjb21tYW5kc1tpXTtcbiAgICB2YXIgdXBwZXJDYXNlQ29tbWFuZCA9IGNvbW1hbmQudG9VcHBlckNhc2UoKTtcbiAgICB2YXIgY29tbWFuZExlbmd0aCA9IGNvbW1hbmRMZW5ndGhzW3VwcGVyQ2FzZUNvbW1hbmRdO1xuICAgIHZhciByZWxhdGl2ZSA9IGlzUmVsYXRpdmUoY29tbWFuZCk7XG5cbiAgICBpZiAoY29tbWFuZExlbmd0aCA+IDApIHtcbiAgICAgIHZhciBjb21tYW5kUGFyYW1zID0gcGFyYW1zLnNoaWZ0KCk7XG4gICAgICB2YXIgaXRlcmF0aW9ucyA9IGNvbW1hbmRQYXJhbXMubGVuZ3RoIC8gY29tbWFuZExlbmd0aDtcblxuICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCBpdGVyYXRpb25zOyBqKyspIHtcbiAgICAgICAgdmFyIHByZXZQb2ludCA9IHBvaW50c1twb2ludHMubGVuZ3RoIC0gMV0gfHwgeyB4OiAwLCB5OiAwIH07XG5cbiAgICAgICAgc3dpdGNoICh1cHBlckNhc2VDb21tYW5kKSB7XG4gICAgICAgICAgY2FzZSAnTSc6XG4gICAgICAgICAgICB2YXIgeCA9IChyZWxhdGl2ZSA/IHByZXZQb2ludC54IDogMCkgKyBjb21tYW5kUGFyYW1zLnNoaWZ0KCk7XG4gICAgICAgICAgICB2YXIgeSA9IChyZWxhdGl2ZSA/IHByZXZQb2ludC55IDogMCkgKyBjb21tYW5kUGFyYW1zLnNoaWZ0KCk7XG5cbiAgICAgICAgICAgIGlmIChqID09PSAwKSB7XG4gICAgICAgICAgICAgIG1vdmVUbyA9IHsgeDogeCwgeTogeSB9O1xuICAgICAgICAgICAgICBwb2ludHMucHVzaCh7IHg6IHgsIHk6IHksIG1vdmVUbzogdHJ1ZSB9KTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHBvaW50cy5wdXNoKHsgeDogeCwgeTogeSB9KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICBjYXNlICdMJzpcbiAgICAgICAgICAgIHBvaW50cy5wdXNoKHtcbiAgICAgICAgICAgICAgeDogKHJlbGF0aXZlID8gcHJldlBvaW50LnggOiAwKSArIGNvbW1hbmRQYXJhbXMuc2hpZnQoKSxcbiAgICAgICAgICAgICAgeTogKHJlbGF0aXZlID8gcHJldlBvaW50LnkgOiAwKSArIGNvbW1hbmRQYXJhbXMuc2hpZnQoKVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgY2FzZSAnSCc6XG4gICAgICAgICAgICBwb2ludHMucHVzaCh7XG4gICAgICAgICAgICAgIHg6IChyZWxhdGl2ZSA/IHByZXZQb2ludC54IDogMCkgKyBjb21tYW5kUGFyYW1zLnNoaWZ0KCksXG4gICAgICAgICAgICAgIHk6IHByZXZQb2ludC55XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICBjYXNlICdWJzpcbiAgICAgICAgICAgIHBvaW50cy5wdXNoKHtcbiAgICAgICAgICAgICAgeDogcHJldlBvaW50LngsXG4gICAgICAgICAgICAgIHk6IChyZWxhdGl2ZSA/IHByZXZQb2ludC55IDogMCkgKyBjb21tYW5kUGFyYW1zLnNoaWZ0KClcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgIGNhc2UgJ0EnOlxuICAgICAgICAgICAgcG9pbnRzLnB1c2goe1xuICAgICAgICAgICAgICBjdXJ2ZToge1xuICAgICAgICAgICAgICAgIHR5cGU6ICdhcmMnLFxuICAgICAgICAgICAgICAgIHJ4OiBjb21tYW5kUGFyYW1zLnNoaWZ0KCksXG4gICAgICAgICAgICAgICAgcnk6IGNvbW1hbmRQYXJhbXMuc2hpZnQoKSxcbiAgICAgICAgICAgICAgICB4QXhpc1JvdGF0aW9uOiBjb21tYW5kUGFyYW1zLnNoaWZ0KCksXG4gICAgICAgICAgICAgICAgbGFyZ2VBcmNGbGFnOiBjb21tYW5kUGFyYW1zLnNoaWZ0KCksXG4gICAgICAgICAgICAgICAgc3dlZXBGbGFnOiBjb21tYW5kUGFyYW1zLnNoaWZ0KClcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgeDogKHJlbGF0aXZlID8gcHJldlBvaW50LnggOiAwKSArIGNvbW1hbmRQYXJhbXMuc2hpZnQoKSxcbiAgICAgICAgICAgICAgeTogKHJlbGF0aXZlID8gcHJldlBvaW50LnkgOiAwKSArIGNvbW1hbmRQYXJhbXMuc2hpZnQoKVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIHZhciBfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uID0gdHJ1ZTtcbiAgICAgICAgICAgIHZhciBfZGlkSXRlcmF0b3JFcnJvciA9IGZhbHNlO1xuICAgICAgICAgICAgdmFyIF9pdGVyYXRvckVycm9yID0gdW5kZWZpbmVkO1xuXG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICBmb3IgKHZhciBfaXRlcmF0b3IgPSBvcHRpb25hbEFyY0tleXNbU3ltYm9sLml0ZXJhdG9yXSgpLCBfc3RlcDsgIShfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uID0gKF9zdGVwID0gX2l0ZXJhdG9yLm5leHQoKSkuZG9uZSk7IF9pdGVyYXRvck5vcm1hbENvbXBsZXRpb24gPSB0cnVlKSB7XG4gICAgICAgICAgICAgICAgdmFyIGsgPSBfc3RlcC52YWx1ZTtcblxuICAgICAgICAgICAgICAgIGlmIChwb2ludHNbcG9pbnRzLmxlbmd0aCAtIDFdWydjdXJ2ZSddW2tdID09PSAwKSB7XG4gICAgICAgICAgICAgICAgICBkZWxldGUgcG9pbnRzW3BvaW50cy5sZW5ndGggLSAxXVsnY3VydmUnXVtrXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgICBfZGlkSXRlcmF0b3JFcnJvciA9IHRydWU7XG4gICAgICAgICAgICAgIF9pdGVyYXRvckVycm9yID0gZXJyO1xuICAgICAgICAgICAgfSBmaW5hbGx5IHtcbiAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBpZiAoIV9pdGVyYXRvck5vcm1hbENvbXBsZXRpb24gJiYgX2l0ZXJhdG9yLnJldHVybikge1xuICAgICAgICAgICAgICAgICAgX2l0ZXJhdG9yLnJldHVybigpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfSBmaW5hbGx5IHtcbiAgICAgICAgICAgICAgICBpZiAoX2RpZEl0ZXJhdG9yRXJyb3IpIHtcbiAgICAgICAgICAgICAgICAgIHRocm93IF9pdGVyYXRvckVycm9yO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgIGNhc2UgJ0MnOlxuICAgICAgICAgICAgcG9pbnRzLnB1c2goe1xuICAgICAgICAgICAgICBjdXJ2ZToge1xuICAgICAgICAgICAgICAgIHR5cGU6ICdjdWJpYycsXG4gICAgICAgICAgICAgICAgeDE6IChyZWxhdGl2ZSA/IHByZXZQb2ludC54IDogMCkgKyBjb21tYW5kUGFyYW1zLnNoaWZ0KCksXG4gICAgICAgICAgICAgICAgeTE6IChyZWxhdGl2ZSA/IHByZXZQb2ludC55IDogMCkgKyBjb21tYW5kUGFyYW1zLnNoaWZ0KCksXG4gICAgICAgICAgICAgICAgeDI6IChyZWxhdGl2ZSA/IHByZXZQb2ludC54IDogMCkgKyBjb21tYW5kUGFyYW1zLnNoaWZ0KCksXG4gICAgICAgICAgICAgICAgeTI6IChyZWxhdGl2ZSA/IHByZXZQb2ludC55IDogMCkgKyBjb21tYW5kUGFyYW1zLnNoaWZ0KClcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgeDogKHJlbGF0aXZlID8gcHJldlBvaW50LnggOiAwKSArIGNvbW1hbmRQYXJhbXMuc2hpZnQoKSxcbiAgICAgICAgICAgICAgeTogKHJlbGF0aXZlID8gcHJldlBvaW50LnkgOiAwKSArIGNvbW1hbmRQYXJhbXMuc2hpZnQoKVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgY2FzZSAnUyc6XG4gICAgICAgICAgICB2YXIgc3gyID0gKHJlbGF0aXZlID8gcHJldlBvaW50LnggOiAwKSArIGNvbW1hbmRQYXJhbXMuc2hpZnQoKTtcbiAgICAgICAgICAgIHZhciBzeTIgPSAocmVsYXRpdmUgPyBwcmV2UG9pbnQueSA6IDApICsgY29tbWFuZFBhcmFtcy5zaGlmdCgpO1xuICAgICAgICAgICAgdmFyIHN4ID0gKHJlbGF0aXZlID8gcHJldlBvaW50LnggOiAwKSArIGNvbW1hbmRQYXJhbXMuc2hpZnQoKTtcbiAgICAgICAgICAgIHZhciBzeSA9IChyZWxhdGl2ZSA/IHByZXZQb2ludC55IDogMCkgKyBjb21tYW5kUGFyYW1zLnNoaWZ0KCk7XG5cbiAgICAgICAgICAgIHZhciBkaWZmID0ge307XG5cbiAgICAgICAgICAgIHZhciBzeDEgPSB2b2lkIDA7XG4gICAgICAgICAgICB2YXIgc3kxID0gdm9pZCAwO1xuXG4gICAgICAgICAgICBpZiAocHJldlBvaW50LmN1cnZlICYmIHByZXZQb2ludC5jdXJ2ZS50eXBlID09PSAnY3ViaWMnKSB7XG4gICAgICAgICAgICAgIGRpZmYueCA9IE1hdGguYWJzKHByZXZQb2ludC54IC0gcHJldlBvaW50LmN1cnZlLngyKTtcbiAgICAgICAgICAgICAgZGlmZi55ID0gTWF0aC5hYnMocHJldlBvaW50LnkgLSBwcmV2UG9pbnQuY3VydmUueTIpO1xuICAgICAgICAgICAgICBzeDEgPSBwcmV2UG9pbnQueCA8IHByZXZQb2ludC5jdXJ2ZS54MiA/IHByZXZQb2ludC54IC0gZGlmZi54IDogcHJldlBvaW50LnggKyBkaWZmLng7XG4gICAgICAgICAgICAgIHN5MSA9IHByZXZQb2ludC55IDwgcHJldlBvaW50LmN1cnZlLnkyID8gcHJldlBvaW50LnkgLSBkaWZmLnkgOiBwcmV2UG9pbnQueSArIGRpZmYueTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIGRpZmYueCA9IE1hdGguYWJzKHN4IC0gc3gyKTtcbiAgICAgICAgICAgICAgZGlmZi55ID0gTWF0aC5hYnMoc3kgLSBzeTIpO1xuICAgICAgICAgICAgICBzeDEgPSBwcmV2UG9pbnQueDtcbiAgICAgICAgICAgICAgc3kxID0gcHJldlBvaW50Lnk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHBvaW50cy5wdXNoKHsgY3VydmU6IHsgdHlwZTogJ2N1YmljJywgeDE6IHN4MSwgeTE6IHN5MSwgeDI6IHN4MiwgeTI6IHN5MiB9LCB4OiBzeCwgeTogc3kgfSk7XG5cbiAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgY2FzZSAnUSc6XG4gICAgICAgICAgICBwb2ludHMucHVzaCh7XG4gICAgICAgICAgICAgIGN1cnZlOiB7XG4gICAgICAgICAgICAgICAgdHlwZTogJ3F1YWRyYXRpYycsXG4gICAgICAgICAgICAgICAgeDE6IChyZWxhdGl2ZSA/IHByZXZQb2ludC54IDogMCkgKyBjb21tYW5kUGFyYW1zLnNoaWZ0KCksXG4gICAgICAgICAgICAgICAgeTE6IChyZWxhdGl2ZSA/IHByZXZQb2ludC55IDogMCkgKyBjb21tYW5kUGFyYW1zLnNoaWZ0KClcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgeDogKHJlbGF0aXZlID8gcHJldlBvaW50LnggOiAwKSArIGNvbW1hbmRQYXJhbXMuc2hpZnQoKSxcbiAgICAgICAgICAgICAgeTogKHJlbGF0aXZlID8gcHJldlBvaW50LnkgOiAwKSArIGNvbW1hbmRQYXJhbXMuc2hpZnQoKVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgY2FzZSAnVCc6XG4gICAgICAgICAgICB2YXIgdHggPSAocmVsYXRpdmUgPyBwcmV2UG9pbnQueCA6IDApICsgY29tbWFuZFBhcmFtcy5zaGlmdCgpO1xuICAgICAgICAgICAgdmFyIHR5ID0gKHJlbGF0aXZlID8gcHJldlBvaW50LnkgOiAwKSArIGNvbW1hbmRQYXJhbXMuc2hpZnQoKTtcblxuICAgICAgICAgICAgdmFyIHR4MSA9IHZvaWQgMDtcbiAgICAgICAgICAgIHZhciB0eTEgPSB2b2lkIDA7XG5cbiAgICAgICAgICAgIGlmIChwcmV2UG9pbnQuY3VydmUgJiYgcHJldlBvaW50LmN1cnZlLnR5cGUgPT09ICdxdWFkcmF0aWMnKSB7XG4gICAgICAgICAgICAgIHZhciBfZGlmZiA9IHtcbiAgICAgICAgICAgICAgICB4OiBNYXRoLmFicyhwcmV2UG9pbnQueCAtIHByZXZQb2ludC5jdXJ2ZS54MSksXG4gICAgICAgICAgICAgICAgeTogTWF0aC5hYnMocHJldlBvaW50LnkgLSBwcmV2UG9pbnQuY3VydmUueTEpXG4gICAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICAgdHgxID0gcHJldlBvaW50LnggPCBwcmV2UG9pbnQuY3VydmUueDEgPyBwcmV2UG9pbnQueCAtIF9kaWZmLnggOiBwcmV2UG9pbnQueCArIF9kaWZmLng7XG4gICAgICAgICAgICAgIHR5MSA9IHByZXZQb2ludC55IDwgcHJldlBvaW50LmN1cnZlLnkxID8gcHJldlBvaW50LnkgLSBfZGlmZi55IDogcHJldlBvaW50LnkgKyBfZGlmZi55O1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgdHgxID0gcHJldlBvaW50Lng7XG4gICAgICAgICAgICAgIHR5MSA9IHByZXZQb2ludC55O1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBwb2ludHMucHVzaCh7IGN1cnZlOiB7IHR5cGU6ICdxdWFkcmF0aWMnLCB4MTogdHgxLCB5MTogdHkxIH0sIHg6IHR4LCB5OiB0eSB9KTtcblxuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIF9wcmV2UG9pbnQgPSBwb2ludHNbcG9pbnRzLmxlbmd0aCAtIDFdIHx8IHsgeDogMCwgeTogMCB9O1xuXG4gICAgICBpZiAoX3ByZXZQb2ludC54ICE9PSBtb3ZlVG8ueCB8fCBfcHJldlBvaW50LnkgIT09IG1vdmVUby55KSB7XG4gICAgICAgIHBvaW50cy5wdXNoKHsgeDogbW92ZVRvLngsIHk6IG1vdmVUby55IH0pO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiBwb2ludHM7XG59O1xuXG52YXIgZ2V0UG9pbnRzRnJvbVBvbHlnb24gPSBmdW5jdGlvbiBnZXRQb2ludHNGcm9tUG9seWdvbihfcmVmNikge1xuICB2YXIgcG9pbnRzID0gX3JlZjYucG9pbnRzO1xuXG4gIHJldHVybiBnZXRQb2ludHNGcm9tUG9pbnRzKHsgY2xvc2VkOiB0cnVlLCBwb2ludHM6IHBvaW50cyB9KTtcbn07XG5cbnZhciBnZXRQb2ludHNGcm9tUG9seWxpbmUgPSBmdW5jdGlvbiBnZXRQb2ludHNGcm9tUG9seWxpbmUoX3JlZjcpIHtcbiAgdmFyIHBvaW50cyA9IF9yZWY3LnBvaW50cztcblxuICByZXR1cm4gZ2V0UG9pbnRzRnJvbVBvaW50cyh7IGNsb3NlZDogZmFsc2UsIHBvaW50czogcG9pbnRzIH0pO1xufTtcblxudmFyIGdldFBvaW50c0Zyb21Qb2ludHMgPSBmdW5jdGlvbiBnZXRQb2ludHNGcm9tUG9pbnRzKF9yZWY4KSB7XG4gIHZhciBjbG9zZWQgPSBfcmVmOC5jbG9zZWQsXG4gICAgICBwb2ludHMgPSBfcmVmOC5wb2ludHM7XG5cbiAgdmFyIG51bWJlcnMgPSBwb2ludHMuc3BsaXQoL1tcXHMsXSsvKS5tYXAoZnVuY3Rpb24gKG4pIHtcbiAgICByZXR1cm4gcGFyc2VGbG9hdChuKTtcbiAgfSk7XG5cbiAgdmFyIHAgPSBudW1iZXJzLnJlZHVjZShmdW5jdGlvbiAoYXJyLCBwb2ludCwgaSkge1xuICAgIGlmIChpICUgMiA9PT0gMCkge1xuICAgICAgYXJyLnB1c2goeyB4OiBwb2ludCB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgYXJyWyhpIC0gMSkgLyAyXS55ID0gcG9pbnQ7XG4gICAgfVxuXG4gICAgcmV0dXJuIGFycjtcbiAgfSwgW10pO1xuXG4gIGlmIChjbG9zZWQpIHtcbiAgICBwLnB1c2goX2V4dGVuZHMoe30sIHBbMF0pKTtcbiAgfVxuXG4gIHBbMF0ubW92ZVRvID0gdHJ1ZTtcblxuICByZXR1cm4gcDtcbn07XG5cbnZhciBnZXRQb2ludHNGcm9tUmVjdCA9IGZ1bmN0aW9uIGdldFBvaW50c0Zyb21SZWN0KF9yZWY5KSB7XG4gIHZhciBoZWlnaHQgPSBfcmVmOS5oZWlnaHQsXG4gICAgICByeCA9IF9yZWY5LnJ4LFxuICAgICAgcnkgPSBfcmVmOS5yeSxcbiAgICAgIHdpZHRoID0gX3JlZjkud2lkdGgsXG4gICAgICB4ID0gX3JlZjkueCxcbiAgICAgIHkgPSBfcmVmOS55O1xuXG4gIGlmIChyeCB8fCByeSkge1xuICAgIHJldHVybiBnZXRQb2ludHNGcm9tUmVjdFdpdGhDb3JuZXJSYWRpdXMoe1xuICAgICAgaGVpZ2h0OiBoZWlnaHQsXG4gICAgICByeDogcnggfHwgcnksXG4gICAgICByeTogcnkgfHwgcngsXG4gICAgICB3aWR0aDogd2lkdGgsXG4gICAgICB4OiB4LFxuICAgICAgeTogeVxuICAgIH0pO1xuICB9XG5cbiAgcmV0dXJuIGdldFBvaW50c0Zyb21CYXNpY1JlY3QoeyBoZWlnaHQ6IGhlaWdodCwgd2lkdGg6IHdpZHRoLCB4OiB4LCB5OiB5IH0pO1xufTtcblxudmFyIGdldFBvaW50c0Zyb21CYXNpY1JlY3QgPSBmdW5jdGlvbiBnZXRQb2ludHNGcm9tQmFzaWNSZWN0KF9yZWYxMCkge1xuICB2YXIgaGVpZ2h0ID0gX3JlZjEwLmhlaWdodCxcbiAgICAgIHdpZHRoID0gX3JlZjEwLndpZHRoLFxuICAgICAgeCA9IF9yZWYxMC54LFxuICAgICAgeSA9IF9yZWYxMC55O1xuXG4gIHJldHVybiBbeyB4OiB4LCB5OiB5LCBtb3ZlVG86IHRydWUgfSwgeyB4OiB4ICsgd2lkdGgsIHk6IHkgfSwgeyB4OiB4ICsgd2lkdGgsIHk6IHkgKyBoZWlnaHQgfSwgeyB4OiB4LCB5OiB5ICsgaGVpZ2h0IH0sIHsgeDogeCwgeTogeSB9XTtcbn07XG5cbnZhciBnZXRQb2ludHNGcm9tUmVjdFdpdGhDb3JuZXJSYWRpdXMgPSBmdW5jdGlvbiBnZXRQb2ludHNGcm9tUmVjdFdpdGhDb3JuZXJSYWRpdXMoX3JlZjExKSB7XG4gIHZhciBoZWlnaHQgPSBfcmVmMTEuaGVpZ2h0LFxuICAgICAgcnggPSBfcmVmMTEucngsXG4gICAgICByeSA9IF9yZWYxMS5yeSxcbiAgICAgIHdpZHRoID0gX3JlZjExLndpZHRoLFxuICAgICAgeCA9IF9yZWYxMS54LFxuICAgICAgeSA9IF9yZWYxMS55O1xuXG4gIHZhciBjdXJ2ZSA9IHsgdHlwZTogJ2FyYycsIHJ4OiByeCwgcnk6IHJ5LCBzd2VlcEZsYWc6IDEgfTtcblxuICByZXR1cm4gW3sgeDogeCArIHJ4LCB5OiB5LCBtb3ZlVG86IHRydWUgfSwgeyB4OiB4ICsgd2lkdGggLSByeCwgeTogeSB9LCB7IHg6IHggKyB3aWR0aCwgeTogeSArIHJ5LCBjdXJ2ZTogY3VydmUgfSwgeyB4OiB4ICsgd2lkdGgsIHk6IHkgKyBoZWlnaHQgLSByeSB9LCB7IHg6IHggKyB3aWR0aCAtIHJ4LCB5OiB5ICsgaGVpZ2h0LCBjdXJ2ZTogY3VydmUgfSwgeyB4OiB4ICsgcngsIHk6IHkgKyBoZWlnaHQgfSwgeyB4OiB4LCB5OiB5ICsgaGVpZ2h0IC0gcnksIGN1cnZlOiBjdXJ2ZSB9LCB7IHg6IHgsIHk6IHkgKyByeSB9LCB7IHg6IHggKyByeCwgeTogeSwgY3VydmU6IGN1cnZlIH1dO1xufTtcblxudmFyIGdldFBvaW50c0Zyb21HID0gZnVuY3Rpb24gZ2V0UG9pbnRzRnJvbUcoX3JlZjEyKSB7XG4gIHZhciBzaGFwZXMgPSBfcmVmMTIuc2hhcGVzO1xuICByZXR1cm4gc2hhcGVzLm1hcChmdW5jdGlvbiAocykge1xuICAgIHJldHVybiB0b1BvaW50cyhzKTtcbiAgfSk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCB0b1BvaW50czsiLCJ2YXIgX3R5cGVvZiA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiB0eXBlb2YgU3ltYm9sLml0ZXJhdG9yID09PSBcInN5bWJvbFwiID8gZnVuY3Rpb24gKG9iaikgeyByZXR1cm4gdHlwZW9mIG9iajsgfSA6IGZ1bmN0aW9uIChvYmopIHsgcmV0dXJuIG9iaiAmJiB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgb2JqLmNvbnN0cnVjdG9yID09PSBTeW1ib2wgJiYgb2JqICE9PSBTeW1ib2wucHJvdG90eXBlID8gXCJzeW1ib2xcIiA6IHR5cGVvZiBvYmo7IH07XG5cbnZhciBnZXRFcnJvcnMgPSBmdW5jdGlvbiBnZXRFcnJvcnMoc2hhcGUpIHtcbiAgdmFyIHJ1bGVzID0gZ2V0UnVsZXMoc2hhcGUpO1xuICB2YXIgZXJyb3JzID0gW107XG5cbiAgcnVsZXMubWFwKGZ1bmN0aW9uIChfcmVmKSB7XG4gICAgdmFyIG1hdGNoID0gX3JlZi5tYXRjaCxcbiAgICAgICAgcHJvcCA9IF9yZWYucHJvcCxcbiAgICAgICAgcmVxdWlyZWQgPSBfcmVmLnJlcXVpcmVkLFxuICAgICAgICB0eXBlID0gX3JlZi50eXBlO1xuXG4gICAgaWYgKHR5cGVvZiBzaGFwZVtwcm9wXSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIGlmIChyZXF1aXJlZCkge1xuICAgICAgICBlcnJvcnMucHVzaChwcm9wICsgJyBwcm9wIGlzIHJlcXVpcmVkJyArIChwcm9wID09PSAndHlwZScgPyAnJyA6ICcgb24gYSAnICsgc2hhcGUudHlwZSkpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBpZiAodHlwZW9mIHR5cGUgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIGlmICh0eXBlID09PSAnYXJyYXknKSB7XG4gICAgICAgICAgaWYgKCFBcnJheS5pc0FycmF5KHNoYXBlW3Byb3BdKSkge1xuICAgICAgICAgICAgZXJyb3JzLnB1c2gocHJvcCArICcgcHJvcCBtdXN0IGJlIG9mIHR5cGUgYXJyYXknKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAoX3R5cGVvZihzaGFwZVtwcm9wXSkgIT09IHR5cGUpIHtcbiAgICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIHZhbGlkLXR5cGVvZlxuICAgICAgICAgIGVycm9ycy5wdXNoKHByb3AgKyAnIHByb3AgbXVzdCBiZSBvZiB0eXBlICcgKyB0eXBlKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAoQXJyYXkuaXNBcnJheShtYXRjaCkpIHtcbiAgICAgICAgaWYgKG1hdGNoLmluZGV4T2Yoc2hhcGVbcHJvcF0pID09PSAtMSkge1xuICAgICAgICAgIGVycm9ycy5wdXNoKHByb3AgKyAnIHByb3AgbXVzdCBiZSBvbmUgb2YgJyArIG1hdGNoLmpvaW4oJywgJykpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9KTtcblxuICBpZiAoc2hhcGUudHlwZSA9PT0gJ2cnICYmIEFycmF5LmlzQXJyYXkoc2hhcGUuc2hhcGVzKSkge1xuICAgIHZhciBjaGlsZEVycm9ycyA9IHNoYXBlLnNoYXBlcy5tYXAoZnVuY3Rpb24gKHMpIHtcbiAgICAgIHJldHVybiBnZXRFcnJvcnMocyk7XG4gICAgfSk7XG4gICAgcmV0dXJuIFtdLmNvbmNhdC5hcHBseShlcnJvcnMsIGNoaWxkRXJyb3JzKTtcbiAgfVxuXG4gIHJldHVybiBlcnJvcnM7XG59O1xuXG52YXIgZ2V0UnVsZXMgPSBmdW5jdGlvbiBnZXRSdWxlcyhzaGFwZSkge1xuICB2YXIgcnVsZXMgPSBbe1xuICAgIG1hdGNoOiBbJ2NpcmNsZScsICdlbGxpcHNlJywgJ2xpbmUnLCAncGF0aCcsICdwb2x5Z29uJywgJ3BvbHlsaW5lJywgJ3JlY3QnLCAnZyddLFxuICAgIHByb3A6ICd0eXBlJyxcbiAgICByZXF1aXJlZDogdHJ1ZSxcbiAgICB0eXBlOiAnc3RyaW5nJ1xuICB9XTtcblxuICBzd2l0Y2ggKHNoYXBlLnR5cGUpIHtcbiAgICBjYXNlICdjaXJjbGUnOlxuICAgICAgcnVsZXMucHVzaCh7IHByb3A6ICdjeCcsIHJlcXVpcmVkOiB0cnVlLCB0eXBlOiAnbnVtYmVyJyB9KTtcbiAgICAgIHJ1bGVzLnB1c2goeyBwcm9wOiAnY3knLCByZXF1aXJlZDogdHJ1ZSwgdHlwZTogJ251bWJlcicgfSk7XG4gICAgICBydWxlcy5wdXNoKHsgcHJvcDogJ3InLCByZXF1aXJlZDogdHJ1ZSwgdHlwZTogJ251bWJlcicgfSk7XG4gICAgICBicmVhaztcblxuICAgIGNhc2UgJ2VsbGlwc2UnOlxuICAgICAgcnVsZXMucHVzaCh7IHByb3A6ICdjeCcsIHJlcXVpcmVkOiB0cnVlLCB0eXBlOiAnbnVtYmVyJyB9KTtcbiAgICAgIHJ1bGVzLnB1c2goeyBwcm9wOiAnY3knLCByZXF1aXJlZDogdHJ1ZSwgdHlwZTogJ251bWJlcicgfSk7XG4gICAgICBydWxlcy5wdXNoKHsgcHJvcDogJ3J4JywgcmVxdWlyZWQ6IHRydWUsIHR5cGU6ICdudW1iZXInIH0pO1xuICAgICAgcnVsZXMucHVzaCh7IHByb3A6ICdyeScsIHJlcXVpcmVkOiB0cnVlLCB0eXBlOiAnbnVtYmVyJyB9KTtcbiAgICAgIGJyZWFrO1xuXG4gICAgY2FzZSAnbGluZSc6XG4gICAgICBydWxlcy5wdXNoKHsgcHJvcDogJ3gxJywgcmVxdWlyZWQ6IHRydWUsIHR5cGU6ICdudW1iZXInIH0pO1xuICAgICAgcnVsZXMucHVzaCh7IHByb3A6ICd4MicsIHJlcXVpcmVkOiB0cnVlLCB0eXBlOiAnbnVtYmVyJyB9KTtcbiAgICAgIHJ1bGVzLnB1c2goeyBwcm9wOiAneTEnLCByZXF1aXJlZDogdHJ1ZSwgdHlwZTogJ251bWJlcicgfSk7XG4gICAgICBydWxlcy5wdXNoKHsgcHJvcDogJ3kyJywgcmVxdWlyZWQ6IHRydWUsIHR5cGU6ICdudW1iZXInIH0pO1xuICAgICAgYnJlYWs7XG5cbiAgICBjYXNlICdwYXRoJzpcbiAgICAgIHJ1bGVzLnB1c2goeyBwcm9wOiAnZCcsIHJlcXVpcmVkOiB0cnVlLCB0eXBlOiAnc3RyaW5nJyB9KTtcbiAgICAgIGJyZWFrO1xuXG4gICAgY2FzZSAncG9seWdvbic6XG4gICAgY2FzZSAncG9seWxpbmUnOlxuICAgICAgcnVsZXMucHVzaCh7IHByb3A6ICdwb2ludHMnLCByZXF1aXJlZDogdHJ1ZSwgdHlwZTogJ3N0cmluZycgfSk7XG4gICAgICBicmVhaztcblxuICAgIGNhc2UgJ3JlY3QnOlxuICAgICAgcnVsZXMucHVzaCh7IHByb3A6ICdoZWlnaHQnLCByZXF1aXJlZDogdHJ1ZSwgdHlwZTogJ251bWJlcicgfSk7XG4gICAgICBydWxlcy5wdXNoKHsgcHJvcDogJ3J4JywgdHlwZTogJ251bWJlcicgfSk7XG4gICAgICBydWxlcy5wdXNoKHsgcHJvcDogJ3J5JywgdHlwZTogJ251bWJlcicgfSk7XG4gICAgICBydWxlcy5wdXNoKHsgcHJvcDogJ3dpZHRoJywgcmVxdWlyZWQ6IHRydWUsIHR5cGU6ICdudW1iZXInIH0pO1xuICAgICAgcnVsZXMucHVzaCh7IHByb3A6ICd4JywgcmVxdWlyZWQ6IHRydWUsIHR5cGU6ICdudW1iZXInIH0pO1xuICAgICAgcnVsZXMucHVzaCh7IHByb3A6ICd5JywgcmVxdWlyZWQ6IHRydWUsIHR5cGU6ICdudW1iZXInIH0pO1xuICAgICAgYnJlYWs7XG5cbiAgICBjYXNlICdnJzpcbiAgICAgIHJ1bGVzLnB1c2goeyBwcm9wOiAnc2hhcGVzJywgcmVxdWlyZWQ6IHRydWUsIHR5cGU6ICdhcnJheScgfSk7XG4gICAgICBicmVhaztcbiAgfVxuXG4gIHJldHVybiBydWxlcztcbn07XG5cbnZhciB2YWxpZCA9IGZ1bmN0aW9uIHZhbGlkKHNoYXBlKSB7XG4gIHZhciBlcnJvcnMgPSBnZXRFcnJvcnMoc2hhcGUpO1xuXG4gIHJldHVybiB7XG4gICAgZXJyb3JzOiBlcnJvcnMsXG4gICAgdmFsaWQ6IGVycm9ycy5sZW5ndGggPT09IDBcbiAgfTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IHZhbGlkOyIsInZhciBnO1xuXG4vLyBUaGlzIHdvcmtzIGluIG5vbi1zdHJpY3QgbW9kZVxuZyA9IChmdW5jdGlvbigpIHtcblx0cmV0dXJuIHRoaXM7XG59KSgpO1xuXG50cnkge1xuXHQvLyBUaGlzIHdvcmtzIGlmIGV2YWwgaXMgYWxsb3dlZCAoc2VlIENTUClcblx0ZyA9IGcgfHwgbmV3IEZ1bmN0aW9uKFwicmV0dXJuIHRoaXNcIikoKTtcbn0gY2F0Y2ggKGUpIHtcblx0Ly8gVGhpcyB3b3JrcyBpZiB0aGUgd2luZG93IHJlZmVyZW5jZSBpcyBhdmFpbGFibGVcblx0aWYgKHR5cGVvZiB3aW5kb3cgPT09IFwib2JqZWN0XCIpIGcgPSB3aW5kb3c7XG59XG5cbi8vIGcgY2FuIHN0aWxsIGJlIHVuZGVmaW5lZCwgYnV0IG5vdGhpbmcgdG8gZG8gYWJvdXQgaXQuLi5cbi8vIFdlIHJldHVybiB1bmRlZmluZWQsIGluc3RlYWQgb2Ygbm90aGluZyBoZXJlLCBzbyBpdCdzXG4vLyBlYXNpZXIgdG8gaGFuZGxlIHRoaXMgY2FzZS4gaWYoIWdsb2JhbCkgeyAuLi59XG5cbm1vZHVsZS5leHBvcnRzID0gZztcbiIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIFJpbmcge1xyXG4gIGNvbnN0cnVjdG9yKG51bVBvaW50cywgcmFkaXVzLCBjZW50ZXJYID0gdW5kZWZpbmVkLCBjZW50ZXJZID0gdW5kZWZpbmVkKSB7XHJcbiAgICB0aGlzLm51bVBvaW50cyA9IG51bVBvaW50cztcclxuICAgIHRoaXMucmFkaXVzID0gcmFkaXVzO1xyXG4gICAgdGhpcy5yYWRpdXNPZmZzZXQgPSAwO1xyXG4gICAgdGhpcy5yYWRpdXNPZmZzZXRTY2FsZXIgPSBNYXRoLnJhbmRvbSgpICogKDEwIC0gLTEwKSArIC0xMDtcclxuICAgIFxyXG4gICAgdGhpcy5wb2ludHMgPSBbXTtcclxuXHJcbiAgICB0aGlzLmFuZ2xlID0gMDtcclxuICAgIHRoaXMudmVsb2NpdHkgPSAoTWF0aC5yYW5kb20oKSAqICgxMCAtIDcpICsgNykgLyAxMDAwMDtcclxuICAgIHRoaXMudmVsb2NpdHkgPSAoKE1hdGgucmFuZG9tKCkgKiAoMSAtIC0xKSArIC0xKSA8IDApID8gdGhpcy52ZWxvY2l0eSAqPSAtMSA6IHRoaXMudmVsb2NpdHk7IFxyXG4gICAgdGhpcy50YXJnZXRBbmdsZSA9IDA7XHJcblxyXG4gICAgdGhpcy5jZW50ZXIgPSB7fTtcclxuICAgIHRoaXMuY2VudGVyLnggPSAoY2VudGVyWCAhPSB1bmRlZmluZWQpID8gY2VudGVyWCA6IHdpbmRvdy5pbm5lcldpZHRoIC8gMjtcclxuICAgIHRoaXMuY2VudGVyLnkgPSAoY2VudGVyWSAhPSB1bmRlZmluZWQpID8gY2VudGVyWSA6IHdpbmRvdy5pbm5lckhlaWdodCAvIDI7XHJcblxyXG4gICAgdGhpcy5hbmltYXRpb25Nb2RlID0gJ3JvdGF0aW9uJztcclxuXHJcbiAgICB0aGlzLnN1YnJpbmdzID0gW107XHJcblxyXG4gICAgdGhpcy5nZW5lcmF0ZSgpO1xyXG4gIH1cclxuXHJcbiAgLy8gU3R1ZmYgdGhpcy5wb2ludHMgd2l0aCByZWFsIHBvaW50IGNvb3JkaW5hdGVzIHVzaW5nIHRoaXMubnVtUG9pbnRzIGFuZCB0aGlzLnJhZGl1c1xyXG4gIGdlbmVyYXRlKCkge1xyXG4gICAgdGhpcy5wb2ludHMgPSBbXTtcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5udW1Qb2ludHM7IGkrKykge1xyXG4gICAgICB0aGlzLnBvaW50cy5wdXNoKFtcclxuICAgICAgICB0aGlzLmNlbnRlci54ICsgdGhpcy5yYWRpdXMgKiBNYXRoLmNvcygoKDM2MCAvIHRoaXMubnVtUG9pbnRzKSAqIChNYXRoLlBJLzE4MCkgKiBpKSArIHRoaXMuYW5nbGUpLFxyXG4gICAgICAgIHRoaXMuY2VudGVyLnkgKyB0aGlzLnJhZGl1cyAqIE1hdGguc2luKCgoMzYwIC8gdGhpcy5udW1Qb2ludHMpICogKE1hdGguUEkvMTgwKSAqIGkpICsgdGhpcy5hbmdsZSlcclxuICAgICAgXSk7XHJcbiAgICB9XHJcblxyXG4gICAgZm9yKGxldCByaW5nIG9mIHRoaXMuc3VicmluZ3MpIHtcclxuICAgICAgcmluZy5nZW5lcmF0ZSgpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLy8gQWRkIHRoaXMudmVsb2NpdHkgdG8gdGhpcy5hbmdsZSB1bnRpbCBpdCByZWFjaGVzIHRoaXMudGFyZ2V0QW5nbGUgKHdpdGggZWFzaW5nKVxyXG4gIGl0ZXJhdGUoKSB7XHJcbiAgICBzd2l0Y2godGhpcy5hbmltYXRpb25Nb2RlKSB7XHJcbiAgICAgIGNhc2UgJ3JvdGF0aW9uJzpcclxuICAgICAgICB0aGlzLmFuZ2xlICs9IHRoaXMudmVsb2NpdHk7XHJcbiAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICBjYXNlICdyYWRpdXMnOlxyXG4gICAgICAgIHRoaXMucmFkaXVzICs9IChNYXRoLnNpbih0aGlzLnJhZGl1c09mZnNldCAqIChNYXRoLlBJLzE4MCkpICogTWF0aC5jb3ModGhpcy5yYWRpdXNPZmZzZXQgKiAoTWF0aC5QSS8xODApKSkgKiB0aGlzLnJhZGl1c09mZnNldFNjYWxlcjtcclxuXHJcbiAgICAgICAgaWYodGhpcy5yYWRpdXNPZmZzZXQgKyAxID49IDM2MCkge1xyXG4gICAgICAgICAgdGhpcy5yYWRpdXNPZmZzZXQgPSAwO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICB0aGlzLnJhZGl1c09mZnNldCsrO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICB9XHJcblxyXG4gICAgZm9yKGxldCBbaW5kZXgscmluZ10gb2YgdGhpcy5zdWJyaW5ncy5lbnRyaWVzKCkpIHtcclxuICAgICAgcmluZy5jZW50ZXIueCA9IHRoaXMucG9pbnRzW2luZGV4XVswXTtcclxuICAgICAgcmluZy5jZW50ZXIueSA9IHRoaXMucG9pbnRzW2luZGV4XVsxXTtcclxuICAgICAgcmluZy5pdGVyYXRlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5nZW5lcmF0ZSgpO1xyXG4gIH1cclxufSIsImltcG9ydCB7RGVsYXVuYXl9IGZyb20gXCJkMy1kZWxhdW5heVwiO1xyXG5pbXBvcnQge3RvUGF0aH0gZnJvbSAnc3ZnLXBvaW50cyc7XHJcbmltcG9ydCB7c2F2ZUFzfSBmcm9tICdmaWxlLXNhdmVyJztcclxuaW1wb3J0IFJpbmcgZnJvbSBcIi4vUmluZ1wiO1xyXG5cclxubGV0IHNob3dQb2ludHMgPSBmYWxzZSxcclxuICBpbnZlcnRDb2xvcnMgPSBmYWxzZSxcclxuICB1c2VCbHVyRWZmZWN0ID0gZmFsc2UsXHJcbiAgaXNQYXVzZWQgPSBmYWxzZSxcclxuICBwb2ludHMsXHJcbiAgcmluZ3M7XHJcblxyXG5jb25zdCBFVkVOID0gMCxcclxuICBPREQgPSAxLFxyXG4gIEFMVEVSTkFUSU5HID0gMixcclxuICBBTlkgPSAzO1xyXG5sZXQgUk9XX1RZUEUgPSBFVkVOO1xyXG5cclxubGV0IGN1cnJlbnRSb3dUeXBlID0gRVZFTjtcclxuXHJcbmNvbnN0IHNrZXRjaCA9IGZ1bmN0aW9uIChwNSkge1xyXG4gIC8qXHJcbiAgICBTZXR1cFxyXG4gICAgPT09PT1cclxuICAqL1xyXG4gIHA1LnNldHVwID0gZnVuY3Rpb24gKCkge1xyXG4gICAgcDUuY3JlYXRlQ2FudmFzKHdpbmRvdy5pbm5lcldpZHRoLCB3aW5kb3cuaW5uZXJIZWlnaHQpO1xyXG4gICAgZ2VuZXJhdGVQb2ludHMoKTtcclxuICB9XHJcblxyXG4gIC8qXHJcbiAgICBEcmF3XHJcbiAgICA9PT09XHJcbiAgKi9cclxuICBwNS5kcmF3ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgLy8gTW92ZSBhbGwgdGhlIHJpbmdzXHJcbiAgICBpZighaXNQYXVzZWQpIHtcclxuICAgICAgZm9yKGxldCByaW5nIG9mIHJpbmdzKSB7XHJcbiAgICAgICAgcmluZy5pdGVyYXRlKCk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC8vIEdldCB0aGUgbGF0ZXN0IHBvaW50c1xyXG4gICAgICBwb2ludHMgPSBnZXRQb2ludHMoKTtcclxuICBcclxuICAgICAgZHJhd1Zvcm9ub2koKTtcclxuICAgICAgZHJhd1BvaW50cygpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcblxyXG4gIC8qXHJcbiAgICBDdXN0b20gZnVuY3Rpb25zXHJcbiAgICA9PT09PT09PT09PT09PT09XHJcbiAgKi9cclxuIFxyXG4gIC8vIEJ1aWxkIGFuIGFycmF5IG9mIHBvbHlnb25zIChhcnJheXMgb2YgW3gseV0gcGFpcnMpIGV4dHJhY3RlZCBmcm9tIFZvcm9ub2kgcGFja2FnZVxyXG4gIGZ1bmN0aW9uIGdldFZvcm9ub2lQb2x5Z29ucygpIHtcclxuICAgIGNvbnN0IGRlbGF1bmF5ID0gRGVsYXVuYXkuZnJvbShwb2ludHMpO1xyXG4gICAgY29uc3Qgdm9yb25vaSA9IGRlbGF1bmF5LnZvcm9ub2koWzAsIDAsIHdpbmRvdy5pbm5lcldpZHRoLCB3aW5kb3cuaW5uZXJIZWlnaHRdKTtcclxuICAgIGNvbnN0IHNpbXBsaWZpZWRQb2x5Z29ucyA9IFtdO1xyXG5cclxuICAgIGZvcihsZXQgY2VsbCBvZiB2b3Jvbm9pLmNlbGxQb2x5Z29ucygpKSB7XHJcbiAgICAgIGxldCBwb2x5Z29uID0gW107XHJcblxyXG4gICAgICBmb3IobGV0IHZlcnRleCBvZiBjZWxsKSB7XHJcbiAgICAgICAgcG9seWdvbi5wdXNoKFt2ZXJ0ZXhbMF0sIHZlcnRleFsxXV0pO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBzaW1wbGlmaWVkUG9seWdvbnMucHVzaChwb2x5Z29uKTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gc2ltcGxpZmllZFBvbHlnb25zO1xyXG4gIH1cclxuXHJcblxyXG4gIC8vIERyYXcgdGhlIFZvcm9ub2kgZGlhZ3JhbSBmb3IgYSBzZXQgb2YgcG9pbnRzXHJcbiAgZnVuY3Rpb24gZHJhd1Zvcm9ub2koKSB7XHJcbiAgICAvLyBTZXQgY29sb3JzXHJcbiAgICBpZiAoaW52ZXJ0Q29sb3JzKSB7XHJcbiAgICAgIGlmKHVzZUJsdXJFZmZlY3QpIHtcclxuICAgICAgICBwNS5iYWNrZ3JvdW5kKDAsIDIwKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBwNS5iYWNrZ3JvdW5kKDApO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBwNS5zdHJva2UoMjU1KTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGlmKHVzZUJsdXJFZmZlY3QpIHtcclxuICAgICAgICBwNS5iYWNrZ3JvdW5kKDI1NSwgMjUpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHA1LmJhY2tncm91bmQoMjU1KTtcclxuICAgICAgfVxyXG4gICAgICBcclxuICAgICAgcDUuc3Ryb2tlKDApO1xyXG4gICAgfVxyXG5cclxuICAgIHA1Lm5vRmlsbCgpO1xyXG5cclxuICAgIC8vIEV4dHJhY3QgcG9seWdvbnMgZnJvbSBWb3Jvbm9pIGRpYWdyYW1cclxuICAgIGNvbnN0IHBvbHlnb25zID0gZ2V0Vm9yb25vaVBvbHlnb25zKCk7XHJcblxyXG4gICAgLy8gRHJhdyByYXcgcG9seWdvbnNcclxuICAgIGZvciAoY29uc3QgcG9seWdvbiBvZiBwb2x5Z29ucykge1xyXG4gICAgICBwNS5iZWdpblNoYXBlKCk7XHJcblxyXG4gICAgICBmb3IgKGNvbnN0IHZlcnRleCBvZiBwb2x5Z29uKSB7XHJcbiAgICAgICAgcDUudmVydGV4KHZlcnRleFswXSwgdmVydGV4WzFdKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgcDUuZW5kU2hhcGUoKTtcclxuICAgIH1cclxuICB9XHJcbiAgXHJcbiAgLy8gRHJhdyBkb3RzIGZvciBlYWNoIG9mIHRoZSBwb2ludHNcclxuICBmdW5jdGlvbiBkcmF3UG9pbnRzKCkge1xyXG4gICAgaWYgKHNob3dQb2ludHMpIHtcclxuICAgICAgLy8gU2V0IGNvbG9yc1xyXG4gICAgICBwNS5ub1N0cm9rZSgpO1xyXG5cclxuICAgICAgaWYgKGludmVydENvbG9ycykge1xyXG4gICAgICAgIHA1LmZpbGwoMTAwKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBwNS5maWxsKDIwMCk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC8vIERyYXcgdGhlIHBvaW50c1xyXG4gICAgICBmb3IgKGxldCBwb2ludCBvZiBwb2ludHMpIHtcclxuICAgICAgICBwNS5lbGxpcHNlKHBvaW50WzBdLCBwb2ludFsxXSwgNSk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcbiAgXHJcbiAgZnVuY3Rpb24gZ2VuZXJhdGVQb2ludHMoKSB7XHJcbiAgICBwb2ludHMgPSBbXSwgcmluZ3MgPSBbXTtcclxuICAgIGxldCBudW1SaW5ncyA9IHBhcnNlSW50KHA1LnJhbmRvbSgzLDEwKSk7XHJcbiAgICAvLyBsZXQgbnVtUmluZ3MgPSAzO1xyXG4gICAgY29uc3QgbWF4UmFkaXVzID0gKHdpbmRvdy5pbm5lcldpZHRoID4gd2luZG93LmlubmVySGVpZ2h0KSA/IHdpbmRvdy5pbm5lckhlaWdodC8yIC0gMTAgOiB3aW5kb3cuaW5uZXJXaWR0aC8yIC0gMTA7XHJcbiAgICBjb25zdCBtaW5SYWRpdXMgPSBwNS5yYW5kb20oMTAsIDMwKTtcclxuICAgIC8vIGxldCBjdXJyZW50UmFkaXVzID0gbWF4UmFkaXVzO1xyXG4gICAgbGV0IGN1cnJlbnRSYWRpdXMgPSAzMDA7XHJcbiAgICBjb25zdCByYWRpdXNTdGVwID0gKG1heFJhZGl1cyAtIG1pblJhZGl1cykgLyBudW1SaW5ncztcclxuXHJcbiAgICAvLyBHZW5lcmF0ZSBzZXQgb2YgcG9pbnRzIGZvciBWb3Jvbm9pIGRpYWdyYW1cclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbnVtUmluZ3M7IGkrKykge1xyXG4gICAgICBsZXQgbnVtUG9pbnRzLCByYW5nZSA9IFtdLCByaW5nO1xyXG5cclxuICAgICAgaWYoaSAhPSAxKSB7XHJcbiAgICAgICAgLy8gUmluZ3MgbmVhciB0aGUgY2VudGVyIGxvb2sgYmV0dGVyIHdpdGggZmV3ZXIgcG9pbnRzXHJcbiAgICAgICAgaWYgKGkgPiAzKSB7XHJcbiAgICAgICAgICByYW5nZVswXSA9IDU7XHJcbiAgICAgICAgICByYW5nZVsxXSA9IDEwO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICByYW5nZVswXSA9IDIwO1xyXG4gICAgICAgICAgcmFuZ2VbMV0gPSAxMDA7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBUT0RPOiBtYWtlIHJhbmdlIHByb3BvcnRpb25hbCB0byBpLiBcclxuXHJcbiAgICAgICAgLy8gR2VuZXJhdGUgYSByYW5kb20gbnVtYmVyIG9mIHBvaW50cyBiYXNlZCBvbiBzZWxlY3RlZCBcInJvdyB0eXBlXCJcclxuICAgICAgICBzd2l0Y2ggKFJPV19UWVBFKSB7XHJcbiAgICAgICAgICBjYXNlIEVWRU46XHJcbiAgICAgICAgICAgIG51bVBvaW50cyA9IGdldFJhbmRvbUV2ZW5OdW1iZXIocmFuZ2VbMF0sIHJhbmdlWzFdKTtcclxuICAgICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICAgICAgY2FzZSBPREQ6XHJcbiAgICAgICAgICAgIG51bVBvaW50cyA9IGdldFJhbmRvbU9kZE51bWJlcihyYW5nZVswXSwgcmFuZ2VbMV0pO1xyXG4gICAgICAgICAgICBicmVhaztcclxuXHJcbiAgICAgICAgICBjYXNlIEFMVEVSTkFUSU5HOlxyXG4gICAgICAgICAgICBzd2l0Y2ggKGN1cnJlbnRSb3dUeXBlKSB7XHJcbiAgICAgICAgICAgICAgY2FzZSBFVkVOOlxyXG4gICAgICAgICAgICAgICAgbnVtUG9pbnRzID0gZ2V0UmFuZG9tRXZlbk51bWJlcihyYW5nZVswXSwgcmFuZ2VbMV0pO1xyXG4gICAgICAgICAgICAgICAgY3VycmVudFJvd1R5cGUgPSBPREQ7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuXHJcbiAgICAgICAgICAgICAgY2FzZSBPREQ6XHJcbiAgICAgICAgICAgICAgICBudW1Qb2ludHMgPSBnZXRSYW5kb21PZGROdW1iZXIocmFuZ2VbMF0sIHJhbmdlWzFdKTtcclxuICAgICAgICAgICAgICAgIGN1cnJlbnRSb3dUeXBlID0gRVZFTjtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBicmVhaztcclxuXHJcbiAgICAgICAgICBjYXNlIEFOWTpcclxuICAgICAgICAgICAgbnVtUG9pbnRzID0gcGFyc2VJbnQocDUucmFuZG9tKHJhbmdlWzBdLCByYW5nZVsxXSkpO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJpbmcgPSBuZXcgUmluZyhudW1Qb2ludHMsIGN1cnJlbnRSYWRpdXMpO1xyXG5cclxuICBcclxuICAgICAgLy8gQWRkIHN1Yi1yaW5ncyB0byB0aGUgb3V0ZXJtb3N0IG1haW4gcmluZ1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIG51bVBvaW50cyA9IHBhcnNlSW50KHA1LnJhbmRvbSg1LDEyKSk7XHJcblxyXG4gICAgICAgIHJpbmcgPSBuZXcgUmluZyhudW1Qb2ludHMsIGN1cnJlbnRSYWRpdXMpO1xyXG5cclxuICAgICAgICBsZXQgc3VicmluZ1BvaW50cyA9IHBhcnNlSW50KHA1LnJhbmRvbSg5LDUwKSk7XHJcbiAgICAgICAgbGV0IHN1YnJpbmdSYWRpdXMgPSBwYXJzZUludChwNS5yYW5kb20oMjAsMTUwKSk7XHJcbiAgICAgICAgbGV0IHN1YnJpbmdSYWRpdXNPZmZzZXRTY2FsZXIgPSBNYXRoLnJhbmRvbSgpICogKDEwIC0gLTEwKSArIC0xMDtcclxuXHJcbiAgICAgICAgZm9yKGxldCBwb2ludCBvZiByaW5nLnBvaW50cykge1xyXG4gICAgICAgICAgbGV0IHN1YnJpbmcgPSBuZXcgUmluZyhzdWJyaW5nUG9pbnRzLCBzdWJyaW5nUmFkaXVzLCBwb2ludFswXSwgcG9pbnRbMV0pO1xyXG4gICAgICAgICAgc3VicmluZy52ZWxvY2l0eSA9IC4wMTtcclxuICAgICAgICAgIHN1YnJpbmcucmFkaXVzT2Zmc2V0U2NhbGVyID0gc3VicmluZ1JhZGl1c09mZnNldFNjYWxlciAvIDU7XHJcbiAgICAgICAgICBzdWJyaW5nLmFuaW1hdGlvbk1vZGUgPSAncm90YXRpb24nO1xyXG5cclxuICAgICAgICAgIHJpbmcuc3VicmluZ3MucHVzaChzdWJyaW5nKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHJpbmdzLnB1c2gocmluZyk7XHJcbiAgICAgIGN1cnJlbnRSYWRpdXMgLT0gcmFkaXVzU3RlcCArIHA1LnJhbmRvbSgtcmFkaXVzU3RlcC8yLCByYWRpdXNTdGVwKTtcclxuICAgIH1cclxuXHJcbiAgICBwb2ludHMgPSBnZXRQb2ludHMoKTtcclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIGdldFBvaW50cygpIHtcclxuICAgIGxldCBwdHMgPSBbXTtcclxuXHJcbiAgICAvLyBFeHRyYWN0IGFsbCBwb2ludHMgZnJvbSBhbGwgcmluZ3MgYW5kIHN1Yi1yaW5ncyBcclxuICAgIGZvcihsZXQgcmluZyBvZiByaW5ncykge1xyXG4gICAgICBmb3IobGV0IHBvaW50IG9mIHJpbmcucG9pbnRzKSB7XHJcbiAgICAgICAgcHRzLnB1c2gocG9pbnQpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBmb3IobGV0IHN1YnJpbmcgb2YgcmluZy5zdWJyaW5ncykge1xyXG4gICAgICAgIGZvcihsZXQgcG9pbnQgb2Ygc3VicmluZy5wb2ludHMpIHtcclxuICAgICAgICAgIHB0cy5wdXNoKHBvaW50KTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gcHRzO1xyXG4gIH1cclxuXHJcbiAgZnVuY3Rpb24gZ2V0UmFuZG9tRXZlbk51bWJlcihtaW4sIG1heCkge1xyXG4gICAgbGV0IG51bSA9IHBhcnNlSW50KHA1LnJhbmRvbShtaW4sIG1heCkpO1xyXG5cclxuICAgIGlmIChudW0gJSAyID4gMCkge1xyXG4gICAgICBpZiAobnVtIC0gMSA8IG1pbikge1xyXG4gICAgICAgIG51bSsrO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIG51bS0tO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIG51bTtcclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIGdldFJhbmRvbU9kZE51bWJlcihtaW4sIG1heCkge1xyXG4gICAgbGV0IG51bSA9IHBhcnNlSW50KHA1LnJhbmRvbShtaW4sIG1heCkpO1xyXG5cclxuICAgIGlmIChudW0gJSAyID09IDApIHtcclxuICAgICAgaWYgKG51bSAtIDEgPCBtaW4pIHtcclxuICAgICAgICBudW0rKztcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBudW0tLTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBudW07XHJcbiAgfVxyXG4gIFxyXG4gIGZ1bmN0aW9uIGV4cG9ydFNWRygpIHtcclxuICAgIC8vIFNldCB1cCA8c3ZnPiBlbGVtZW50XHJcbiAgICBsZXQgc3ZnID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3ZnJyk7XHJcbiAgICBzdmcuc2V0QXR0cmlidXRlKCd4bWxucycsICdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZycpO1xyXG4gICAgc3ZnLnNldEF0dHJpYnV0ZSgneG1sbnM6eGxpbmsnLCAnaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluaycpO1xyXG4gICAgc3ZnLnNldEF0dHJpYnV0ZSgnd2lkdGgnLCB3aW5kb3cuaW5uZXJXaWR0aCk7XHJcbiAgICBzdmcuc2V0QXR0cmlidXRlKCdoZWlnaHQnLCB3aW5kb3cuaW5uZXJIZWlnaHQpO1xyXG4gICAgc3ZnLnNldEF0dHJpYnV0ZSgndmlld0JveCcsICcwIDAgJyArIHdpbmRvdy5pbm5lcldpZHRoICsgJyAnICsgd2luZG93LmlubmVySGVpZ2h0KTtcclxuXHJcbiAgICBsZXQgcG9seWdvbnMgPSBnZXRWb3Jvbm9pUG9seWdvbnMoKTtcclxuXHJcbiAgICBmb3IobGV0IHBvbHlnb24gb2YgcG9seWdvbnMpIHtcclxuICAgICAgc3ZnLmFwcGVuZENoaWxkKCBjcmVhdGVQYXRoRWxGcm9tUG9pbnRzKHBvbHlnb24pICk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gRm9yY2UgZG93bmxvYWQgb2YgLnN2ZyBmaWxlIGJhc2VkIG9uIGh0dHBzOi8vanNmaWRkbGUubmV0L2NoNzdlN3loLzFcclxuICAgIGxldCBzdmdEb2NUeXBlID0gZG9jdW1lbnQuaW1wbGVtZW50YXRpb24uY3JlYXRlRG9jdW1lbnRUeXBlKCdzdmcnLCBcIi0vL1czQy8vRFREIFNWRyAxLjEvL0VOXCIsIFwiaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEuZHRkXCIpO1xyXG4gICAgbGV0IHN2Z0RvYyA9IGRvY3VtZW50LmltcGxlbWVudGF0aW9uLmNyZWF0ZURvY3VtZW50KCdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZycsICdzdmcnLCBzdmdEb2NUeXBlKTtcclxuICAgIHN2Z0RvYy5yZXBsYWNlQ2hpbGQoc3ZnLCBzdmdEb2MuZG9jdW1lbnRFbGVtZW50KTtcclxuICAgIGxldCBzdmdEYXRhID0gKG5ldyBYTUxTZXJpYWxpemVyKCkpLnNlcmlhbGl6ZVRvU3RyaW5nKHN2Z0RvYyk7XHJcblxyXG4gICAgbGV0IGJsb2IgPSBuZXcgQmxvYihbc3ZnRGF0YS5yZXBsYWNlKC8+PC9nLCAnPlxcblxccjwnKV0pO1xyXG4gICAgc2F2ZUFzKGJsb2IsICd2b3Jvbm9pLScgKyBEYXRlLm5vdygpICsgJy5zdmcnKTtcclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIGNyZWF0ZVBhdGhFbEZyb21Qb2ludHMocG9pbnRzKSB7XHJcbiAgICBsZXQgcG9pbnRzU3RyaW5nID0gJyc7XHJcblxyXG4gICAgZm9yKGxldCBbaW5kZXgsIHBvaW50XSBvZiBwb2ludHMuZW50cmllcygpKSB7XHJcbiAgICAgIHBvaW50c1N0cmluZyArPSBwb2ludFswXSArICcsJyArIHBvaW50WzFdO1xyXG5cclxuICAgICAgaWYoaW5kZXggPCBwb2ludHMubGVuZ3RoIC0gMSkge1xyXG4gICAgICAgIHBvaW50c1N0cmluZyArPSAnICc7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBsZXQgZCA9IHRvUGF0aCh7XHJcbiAgICAgIHR5cGU6ICdwb2x5bGluZScsXHJcbiAgICAgIHBvaW50czogcG9pbnRzU3RyaW5nXHJcbiAgICB9KTtcclxuXHJcbiAgICBsZXQgcGF0aEVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncGF0aCcpO1xyXG4gICAgcGF0aEVsLnNldEF0dHJpYnV0ZSgnZCcsIGQpO1xyXG4gICAgcGF0aEVsLnNldEF0dHJpYnV0ZSgnc3R5bGUnLCAnZmlsbDogbm9uZTsgc3Ryb2tlOiBibGFjazsgc3Ryb2tlLXdpZHRoOiAxJyk7XHJcblxyXG4gICAgcmV0dXJuIHBhdGhFbDtcclxuICB9XHJcbiAgXHJcblxyXG4gIC8qXHJcbiAgICBLZXkgcmVsZWFzZWQgaGFuZGxlclxyXG4gICAgPT09PT09PT09PT09PT09PT09PT1cclxuICAqL1xyXG4gIHA1LmtleVJlbGVhc2VkID0gZnVuY3Rpb24gKCkge1xyXG4gICAgc3dpdGNoIChwNS5rZXkpIHtcclxuICAgICAgY2FzZSAncic6XHJcbiAgICAgICAgZ2VuZXJhdGVQb2ludHMoKTtcclxuICAgICAgICBicmVhaztcclxuXHJcbiAgICAgIGNhc2UgJ3AnOlxyXG4gICAgICAgIHNob3dQb2ludHMgPSAhc2hvd1BvaW50cztcclxuICAgICAgICBicmVhaztcclxuXHJcbiAgICAgIGNhc2UgJ2knOlxyXG4gICAgICAgIGludmVydENvbG9ycyA9ICFpbnZlcnRDb2xvcnM7XHJcbiAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICBjYXNlICdiJzpcclxuICAgICAgICB1c2VCbHVyRWZmZWN0ID0gIXVzZUJsdXJFZmZlY3Q7XHJcbiAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICBjYXNlICcgJzpcclxuICAgICAgICBpc1BhdXNlZCA9ICFpc1BhdXNlZDtcclxuICAgICAgICBicmVhaztcclxuXHJcbiAgICAgIGNhc2UgJ2UnOlxyXG4gICAgICAgIGV4cG9ydFNWRygpO1xyXG4gICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgY2FzZSAnMSc6XHJcbiAgICAgICAgUk9XX1RZUEUgPSBFVkVOO1xyXG4gICAgICAgIGdlbmVyYXRlUG9pbnRzKCk7XHJcbiAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICBjYXNlICcyJzpcclxuICAgICAgICBST1dfVFlQRSA9IE9ERDtcclxuICAgICAgICBnZW5lcmF0ZVBvaW50cygpO1xyXG4gICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgY2FzZSAnMyc6XHJcbiAgICAgICAgUk9XX1RZUEUgPSBBTFRFUk5BVElORztcclxuICAgICAgICBnZW5lcmF0ZVBvaW50cygpO1xyXG4gICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgY2FzZSAnNCc6XHJcbiAgICAgICAgUk9XX1RZUEUgPSBBTlk7XHJcbiAgICAgICAgZ2VuZXJhdGVQb2ludHMoKTtcclxuICAgICAgICBicmVhaztcclxuICAgIH1cclxuICB9XHJcbn1cclxuXHJcbi8vIExhdW5jaCB0aGUgc2tldGNoIHVzaW5nIHA1anMgaW4gaW5zdGFudGlhdGVkIG1vZGVcclxubmV3IHA1KHNrZXRjaCk7Il0sInNvdXJjZVJvb3QiOiIifQ==