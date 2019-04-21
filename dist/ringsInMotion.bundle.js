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
/******/ 	return __webpack_require__(__webpack_require__.s = "./rings-in-motion/js/entry.js");
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

/***/ "./rings-in-motion/js/Ring.js":
/*!************************************!*\
  !*** ./rings-in-motion/js/Ring.js ***!
  \************************************/
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

    this.generate();
  }

  // Stuff this.points with real point objects using this.numPoints and this.radius
  generate() {
    this.points = [];
    for (let i = 0; i < this.numPoints; i++) {
      this.points.push([
        this.center.x + this.radius * Math.cos(((360 / this.numPoints) * (Math.PI/180) * i) + this.angle),
        this.center.y + this.radius * Math.sin(((360 / this.numPoints) * (Math.PI/180) * i) + this.angle)
      ]);
    }
  }

  // Add this.velocity to this.angle until it reaches this.targetAngle (with easing)
  iterate() {
    // this.angle += this.velocity;

    this.radius += (Math.sin(this.radiusOffset * (Math.PI/180)) * Math.cos(this.radiusOffset * (Math.PI/180))) * this.radiusOffsetScaler;

    if(this.radiusOffset + 1 >= 360) {
      this.radiusOffset = 0;
    } else {
      this.radiusOffset++;
    }

    this.generate();
  }
}

/***/ }),

/***/ "./rings-in-motion/js/entry.js":
/*!*************************************!*\
  !*** ./rings-in-motion/js/entry.js ***!
  \*************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var d3_delaunay__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! d3-delaunay */ "./node_modules/d3-delaunay/src/index.js");
/* harmony import */ var svg_points__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! svg-points */ "./node_modules/svg-points/modules/index.js");
/* harmony import */ var file_saver__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! file-saver */ "./node_modules/file-saver/dist/FileSaver.min.js");
/* harmony import */ var file_saver__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(file_saver__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _Ring__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Ring */ "./rings-in-motion/js/Ring.js");





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
        range[1] = 200;
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

      // Generate points arranged in a ring
      rings.push(new _Ring__WEBPACK_IMPORTED_MODULE_3__["default"](numPoints, currentRadius));

      currentRadius -= radiusStep + p5.random(-radiusStep/2, radiusStep);
    }

    points = getPoints();
  }

  function getPoints() {
    let pts = [];

    // Extract all points from all rings for Voronoi 
    for(let ring of rings) {
      for(let point of ring.points) {
        pts.push(point);
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

      case 'e':
        exportSVG();
        break;

      case ' ':
        isPaused = !isPaused;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2QzLWRlbGF1bmF5L3NyYy9kZWxhdW5heS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvZDMtZGVsYXVuYXkvc3JjL2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9kMy1kZWxhdW5heS9zcmMvcGF0aC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvZDMtZGVsYXVuYXkvc3JjL3BvbHlnb24uanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2QzLWRlbGF1bmF5L3NyYy92b3Jvbm9pLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9kZWxhdW5hdG9yL2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9maWxlLXNhdmVyL2Rpc3QvRmlsZVNhdmVyLm1pbi5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvc3ZnLXBvaW50cy9tb2R1bGVzL2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9zdmctcG9pbnRzL21vZHVsZXMvdG9QYXRoLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9zdmctcG9pbnRzL21vZHVsZXMvdG9Qb2ludHMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3N2Zy1wb2ludHMvbW9kdWxlcy92YWxpZC5qcyIsIndlYnBhY2s6Ly8vKHdlYnBhY2spL2J1aWxkaW4vZ2xvYmFsLmpzIiwid2VicGFjazovLy8uL3JpbmdzLWluLW1vdGlvbi9qcy9SaW5nLmpzIiwid2VicGFjazovLy8uL3JpbmdzLWluLW1vdGlvbi9qcy9lbnRyeS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FB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Q0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7O0FBRWI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNkNBQTZDO0FBQzdDOztBQUVBOztBQUVBO0FBQ0E7O0FBRUEsb0JBQW9CO0FBQ3BCOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxlQUFlLDZCQUE2Qjs7QUFFNUM7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUEsaUVBQWlFO0FBQ2pFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLHdDQUF3QztBQUN4Qzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtB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RUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxxQkFBcUIsNkNBQUk7O0FBRXpCO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxJQUFJLHlEQUFNO0FBQ1Y7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLFlBQVkseURBQU07QUFDbEI7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBLDZDQUE2QyxlQUFlOztBQUU1RDtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLGUiLCJmaWxlIjoicmluZ3NJbk1vdGlvbi5idW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3JpbmdzLWluLW1vdGlvbi9qcy9lbnRyeS5qc1wiKTtcbiIsImltcG9ydCBEZWxhdW5hdG9yIGZyb20gXCJkZWxhdW5hdG9yXCI7XG5pbXBvcnQgUGF0aCBmcm9tIFwiLi9wYXRoLmpzXCI7XG5pbXBvcnQgUG9seWdvbiBmcm9tIFwiLi9wb2x5Z29uLmpzXCI7XG5pbXBvcnQgVm9yb25vaSBmcm9tIFwiLi92b3Jvbm9pLmpzXCI7XG5cbmNvbnN0IHRhdSA9IDIgKiBNYXRoLlBJO1xuXG5mdW5jdGlvbiBwb2ludFgocCkge1xuICByZXR1cm4gcFswXTtcbn1cblxuZnVuY3Rpb24gcG9pbnRZKHApIHtcbiAgcmV0dXJuIHBbMV07XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIERlbGF1bmF5IHtcbiAgY29uc3RydWN0b3IocG9pbnRzKSB7XG4gICAgY29uc3Qge2hhbGZlZGdlcywgaHVsbCwgdHJpYW5nbGVzfSA9IG5ldyBEZWxhdW5hdG9yKHBvaW50cyk7XG4gICAgdGhpcy5wb2ludHMgPSBwb2ludHM7XG4gICAgdGhpcy5oYWxmZWRnZXMgPSBoYWxmZWRnZXM7XG4gICAgdGhpcy5odWxsID0gaHVsbDtcbiAgICB0aGlzLnRyaWFuZ2xlcyA9IHRyaWFuZ2xlcztcbiAgICBjb25zdCBpbmVkZ2VzID0gdGhpcy5pbmVkZ2VzID0gbmV3IEludDMyQXJyYXkocG9pbnRzLmxlbmd0aCAvIDIpLmZpbGwoLTEpO1xuICAgIGNvbnN0IG91dGVkZ2VzID0gdGhpcy5vdXRlZGdlcyA9IG5ldyBJbnQzMkFycmF5KHBvaW50cy5sZW5ndGggLyAyKS5maWxsKC0xKTtcblxuICAgIC8vIENvbXB1dGUgYW4gaW5kZXggZnJvbSBlYWNoIHBvaW50IHRvIGFuIChhcmJpdHJhcnkpIGluY29taW5nIGhhbGZlZGdlLlxuICAgIGZvciAobGV0IGUgPSAwLCBuID0gaGFsZmVkZ2VzLmxlbmd0aDsgZSA8IG47ICsrZSkge1xuICAgICAgaW5lZGdlc1t0cmlhbmdsZXNbZSAlIDMgPT09IDIgPyBlIC0gMiA6IGUgKyAxXV0gPSBlO1xuICAgIH1cblxuICAgIC8vIEZvciBwb2ludHMgb24gdGhlIGh1bGwsIGluZGV4IGJvdGggdGhlIGluY29taW5nIGFuZCBvdXRnb2luZyBoYWxmZWRnZXMuXG4gICAgbGV0IG5vZGUwLCBub2RlMSA9IGh1bGw7XG4gICAgZG8ge1xuICAgICAgbm9kZTAgPSBub2RlMSwgbm9kZTEgPSBub2RlMS5uZXh0O1xuICAgICAgaW5lZGdlc1tub2RlMS5pXSA9IG5vZGUwLnQ7XG4gICAgICBvdXRlZGdlc1tub2RlMC5pXSA9IG5vZGUxLnQ7XG4gICAgfSB3aGlsZSAobm9kZTEgIT09IGh1bGwpO1xuICB9XG4gIHZvcm9ub2koYm91bmRzKSB7XG4gICAgcmV0dXJuIG5ldyBWb3Jvbm9pKHRoaXMsIGJvdW5kcyk7XG4gIH1cbiAgKm5laWdoYm9ycyhpKSB7XG4gICAgY29uc3Qge2luZWRnZXMsIG91dGVkZ2VzLCBoYWxmZWRnZXMsIHRyaWFuZ2xlc30gPSB0aGlzO1xuICAgIGNvbnN0IGUwID0gaW5lZGdlc1tpXTtcbiAgICBpZiAoZTAgPT09IC0xKSByZXR1cm47IC8vIGNvaW5jaWRlbnQgcG9pbnRcbiAgICBsZXQgZSA9IGUwO1xuICAgIGRvIHtcbiAgICAgIHlpZWxkIHRyaWFuZ2xlc1tlXTtcbiAgICAgIGUgPSBlICUgMyA9PT0gMiA/IGUgLSAyIDogZSArIDE7XG4gICAgICBpZiAodHJpYW5nbGVzW2VdICE9PSBpKSByZXR1cm47IC8vIGJhZCB0cmlhbmd1bGF0aW9uXG4gICAgICBlID0gaGFsZmVkZ2VzW2VdO1xuICAgICAgaWYgKGUgPT09IC0xKSByZXR1cm4geWllbGQgdHJpYW5nbGVzW291dGVkZ2VzW2ldXTtcbiAgICB9IHdoaWxlIChlICE9PSBlMCk7XG4gIH1cbiAgZmluZCh4LCB5LCBpID0gMCkge1xuICAgIGlmICgoeCA9ICt4LCB4ICE9PSB4KSB8fCAoeSA9ICt5LCB5ICE9PSB5KSkgcmV0dXJuIC0xO1xuICAgIGxldCBjO1xuICAgIHdoaWxlICgoYyA9IHRoaXMuX3N0ZXAoaSwgeCwgeSkpID49IDAgJiYgYyAhPT0gaSkgaSA9IGM7XG4gICAgcmV0dXJuIGM7XG4gIH1cbiAgX3N0ZXAoaSwgeCwgeSkge1xuICAgIGNvbnN0IHtpbmVkZ2VzLCBwb2ludHN9ID0gdGhpcztcbiAgICBpZiAoaW5lZGdlc1tpXSA9PT0gLTEpIHJldHVybiAtMTsgLy8gY29pbmNpZGVudCBwb2ludFxuICAgIGxldCBjID0gaTtcbiAgICBsZXQgZGMgPSAoeCAtIHBvaW50c1tpICogMl0pICoqIDIgKyAoeSAtIHBvaW50c1tpICogMiArIDFdKSAqKiAyO1xuICAgIGZvciAoY29uc3QgdCBvZiB0aGlzLm5laWdoYm9ycyhpKSkge1xuICAgICAgY29uc3QgZHQgPSAoeCAtIHBvaW50c1t0ICogMl0pICoqIDIgKyAoeSAtIHBvaW50c1t0ICogMiArIDFdKSAqKiAyO1xuICAgICAgaWYgKGR0IDwgZGMpIGRjID0gZHQsIGMgPSB0O1xuICAgIH1cbiAgICByZXR1cm4gYztcbiAgfVxuICByZW5kZXIoY29udGV4dCkge1xuICAgIGNvbnN0IGJ1ZmZlciA9IGNvbnRleHQgPT0gbnVsbCA/IGNvbnRleHQgPSBuZXcgUGF0aCA6IHVuZGVmaW5lZDtcbiAgICBjb25zdCB7cG9pbnRzLCBoYWxmZWRnZXMsIHRyaWFuZ2xlc30gPSB0aGlzO1xuICAgIGZvciAobGV0IGkgPSAwLCBuID0gaGFsZmVkZ2VzLmxlbmd0aDsgaSA8IG47ICsraSkge1xuICAgICAgY29uc3QgaiA9IGhhbGZlZGdlc1tpXTtcbiAgICAgIGlmIChqIDwgaSkgY29udGludWU7XG4gICAgICBjb25zdCB0aSA9IHRyaWFuZ2xlc1tpXSAqIDI7XG4gICAgICBjb25zdCB0aiA9IHRyaWFuZ2xlc1tqXSAqIDI7XG4gICAgICBjb250ZXh0Lm1vdmVUbyhwb2ludHNbdGldLCBwb2ludHNbdGkgKyAxXSk7XG4gICAgICBjb250ZXh0LmxpbmVUbyhwb2ludHNbdGpdLCBwb2ludHNbdGogKyAxXSk7XG4gICAgfVxuICAgIHRoaXMucmVuZGVySHVsbChjb250ZXh0KTtcbiAgICByZXR1cm4gYnVmZmVyICYmIGJ1ZmZlci52YWx1ZSgpO1xuICB9XG4gIHJlbmRlclBvaW50cyhjb250ZXh0LCByID0gMikge1xuICAgIGNvbnN0IGJ1ZmZlciA9IGNvbnRleHQgPT0gbnVsbCA/IGNvbnRleHQgPSBuZXcgUGF0aCA6IHVuZGVmaW5lZDtcbiAgICBjb25zdCB7cG9pbnRzfSA9IHRoaXM7XG4gICAgZm9yIChsZXQgaSA9IDAsIG4gPSBwb2ludHMubGVuZ3RoOyBpIDwgbjsgaSArPSAyKSB7XG4gICAgICBjb25zdCB4ID0gcG9pbnRzW2ldLCB5ID0gcG9pbnRzW2kgKyAxXTtcbiAgICAgIGNvbnRleHQubW92ZVRvKHggKyByLCB5KTtcbiAgICAgIGNvbnRleHQuYXJjKHgsIHksIHIsIDAsIHRhdSk7XG4gICAgfVxuICAgIHJldHVybiBidWZmZXIgJiYgYnVmZmVyLnZhbHVlKCk7XG4gIH1cbiAgcmVuZGVySHVsbChjb250ZXh0KSB7XG4gICAgY29uc3QgYnVmZmVyID0gY29udGV4dCA9PSBudWxsID8gY29udGV4dCA9IG5ldyBQYXRoIDogdW5kZWZpbmVkO1xuICAgIGNvbnN0IHtodWxsfSA9IHRoaXM7XG4gICAgbGV0IG5vZGUgPSBodWxsO1xuICAgIGNvbnRleHQubW92ZVRvKG5vZGUueCwgbm9kZS55KTtcbiAgICB3aGlsZSAobm9kZSA9IG5vZGUubmV4dCwgbm9kZSAhPT0gaHVsbCkgY29udGV4dC5saW5lVG8obm9kZS54LCBub2RlLnkpO1xuICAgIGNvbnRleHQuY2xvc2VQYXRoKCk7XG4gICAgcmV0dXJuIGJ1ZmZlciAmJiBidWZmZXIudmFsdWUoKTtcbiAgfVxuICBodWxsUG9seWdvbigpIHtcbiAgICBjb25zdCBwb2x5Z29uID0gbmV3IFBvbHlnb247XG4gICAgdGhpcy5yZW5kZXJIdWxsKHBvbHlnb24pO1xuICAgIHJldHVybiBwb2x5Z29uLnZhbHVlKCk7XG4gIH1cbiAgcmVuZGVyVHJpYW5nbGUoaSwgY29udGV4dCkge1xuICAgIGNvbnN0IGJ1ZmZlciA9IGNvbnRleHQgPT0gbnVsbCA/IGNvbnRleHQgPSBuZXcgUGF0aCA6IHVuZGVmaW5lZDtcbiAgICBjb25zdCB7cG9pbnRzLCB0cmlhbmdsZXN9ID0gdGhpcztcbiAgICBjb25zdCB0MCA9IHRyaWFuZ2xlc1tpICo9IDNdICogMjtcbiAgICBjb25zdCB0MSA9IHRyaWFuZ2xlc1tpICsgMV0gKiAyO1xuICAgIGNvbnN0IHQyID0gdHJpYW5nbGVzW2kgKyAyXSAqIDI7XG4gICAgY29udGV4dC5tb3ZlVG8ocG9pbnRzW3QwXSwgcG9pbnRzW3QwICsgMV0pO1xuICAgIGNvbnRleHQubGluZVRvKHBvaW50c1t0MV0sIHBvaW50c1t0MSArIDFdKTtcbiAgICBjb250ZXh0LmxpbmVUbyhwb2ludHNbdDJdLCBwb2ludHNbdDIgKyAxXSk7XG4gICAgY29udGV4dC5jbG9zZVBhdGgoKTtcbiAgICByZXR1cm4gYnVmZmVyICYmIGJ1ZmZlci52YWx1ZSgpO1xuICB9XG4gICp0cmlhbmdsZVBvbHlnb25zKCkge1xuICAgIGNvbnN0IHt0cmlhbmdsZXN9ID0gdGhpcztcbiAgICBmb3IgKGxldCBpID0gMCwgbiA9IHRyaWFuZ2xlcy5sZW5ndGggLyAzOyBpIDwgbjsgKytpKSB7XG4gICAgICB5aWVsZCB0aGlzLnRyaWFuZ2xlUG9seWdvbihpKTtcbiAgICB9XG4gIH1cbiAgdHJpYW5nbGVQb2x5Z29uKGkpIHtcbiAgICBjb25zdCBwb2x5Z29uID0gbmV3IFBvbHlnb247XG4gICAgdGhpcy5yZW5kZXJUcmlhbmdsZShpLCBwb2x5Z29uKTtcbiAgICByZXR1cm4gcG9seWdvbi52YWx1ZSgpO1xuICB9XG59XG5cbkRlbGF1bmF5LmZyb20gPSBmdW5jdGlvbihwb2ludHMsIGZ4ID0gcG9pbnRYLCBmeSA9IHBvaW50WSwgdGhhdCkge1xuICByZXR1cm4gbmV3IERlbGF1bmF5KFwibGVuZ3RoXCIgaW4gcG9pbnRzXG4gICAgICA/IGZsYXRBcnJheShwb2ludHMsIGZ4LCBmeSwgdGhhdClcbiAgICAgIDogRmxvYXQ2NEFycmF5LmZyb20oZmxhdEl0ZXJhYmxlKHBvaW50cywgZngsIGZ5LCB0aGF0KSkpO1xufTtcblxuZnVuY3Rpb24gZmxhdEFycmF5KHBvaW50cywgZngsIGZ5LCB0aGF0KSB7XG4gIGNvbnN0IG4gPSBwb2ludHMubGVuZ3RoO1xuICBjb25zdCBhcnJheSA9IG5ldyBGbG9hdDY0QXJyYXkobiAqIDIpO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IG47ICsraSkge1xuICAgIGNvbnN0IHAgPSBwb2ludHNbaV07XG4gICAgYXJyYXlbaSAqIDJdID0gZnguY2FsbCh0aGF0LCBwLCBpLCBwb2ludHMpO1xuICAgIGFycmF5W2kgKiAyICsgMV0gPSBmeS5jYWxsKHRoYXQsIHAsIGksIHBvaW50cyk7XG4gIH1cbiAgcmV0dXJuIGFycmF5O1xufVxuXG5mdW5jdGlvbiogZmxhdEl0ZXJhYmxlKHBvaW50cywgZngsIGZ5LCB0aGF0KSB7XG4gIGxldCBpID0gMDtcbiAgZm9yIChjb25zdCBwIG9mIHBvaW50cykge1xuICAgIHlpZWxkIGZ4LmNhbGwodGhhdCwgcCwgaSwgcG9pbnRzKTtcbiAgICB5aWVsZCBmeS5jYWxsKHRoYXQsIHAsIGksIHBvaW50cyk7XG4gICAgKytpO1xuICB9XG59XG4iLCJleHBvcnQge2RlZmF1bHQgYXMgRGVsYXVuYXl9IGZyb20gXCIuL2RlbGF1bmF5LmpzXCI7XG5leHBvcnQge2RlZmF1bHQgYXMgVm9yb25vaX0gZnJvbSBcIi4vdm9yb25vaS5qc1wiO1xuIiwiY29uc3QgZXBzaWxvbiA9IDFlLTY7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFBhdGgge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLl94MCA9IHRoaXMuX3kwID0gLy8gc3RhcnQgb2YgY3VycmVudCBzdWJwYXRoXG4gICAgdGhpcy5feDEgPSB0aGlzLl95MSA9IG51bGw7IC8vIGVuZCBvZiBjdXJyZW50IHN1YnBhdGhcbiAgICB0aGlzLl8gPSBcIlwiO1xuICB9XG4gIG1vdmVUbyh4LCB5KSB7XG4gICAgdGhpcy5fICs9IGBNJHt0aGlzLl94MCA9IHRoaXMuX3gxID0gK3h9LCR7dGhpcy5feTAgPSB0aGlzLl95MSA9ICt5fWA7XG4gIH1cbiAgY2xvc2VQYXRoKCkge1xuICAgIGlmICh0aGlzLl94MSAhPT0gbnVsbCkge1xuICAgICAgdGhpcy5feDEgPSB0aGlzLl94MCwgdGhpcy5feTEgPSB0aGlzLl95MDtcbiAgICAgIHRoaXMuXyArPSBcIlpcIjtcbiAgICB9XG4gIH1cbiAgbGluZVRvKHgsIHkpIHtcbiAgICB0aGlzLl8gKz0gYEwke3RoaXMuX3gxID0gK3h9LCR7dGhpcy5feTEgPSAreX1gO1xuICB9XG4gIGFyYyh4LCB5LCByKSB7XG4gICAgeCA9ICt4LCB5ID0gK3ksIHIgPSArcjtcbiAgICBjb25zdCB4MCA9IHggKyByO1xuICAgIGNvbnN0IHkwID0geTtcbiAgICBpZiAociA8IDApIHRocm93IG5ldyBFcnJvcihcIm5lZ2F0aXZlIHJhZGl1c1wiKTtcbiAgICBpZiAodGhpcy5feDEgPT09IG51bGwpIHRoaXMuXyArPSBgTSR7eDB9LCR7eTB9YDtcbiAgICBlbHNlIGlmIChNYXRoLmFicyh0aGlzLl94MSAtIHgwKSA+IGVwc2lsb24gfHwgTWF0aC5hYnModGhpcy5feTEgLSB5MCkgPiBlcHNpbG9uKSB0aGlzLl8gKz0gXCJMXCIgKyB4MCArIFwiLFwiICsgeTA7XG4gICAgaWYgKCFyKSByZXR1cm47XG4gICAgdGhpcy5fICs9IGBBJHtyfSwke3J9LDAsMSwxLCR7eCAtIHJ9LCR7eX1BJHtyfSwke3J9LDAsMSwxLCR7dGhpcy5feDEgPSB4MH0sJHt0aGlzLl95MSA9IHkwfWA7XG4gIH1cbiAgcmVjdCh4LCB5LCB3LCBoKSB7XG4gICAgdGhpcy5fICs9IGBNJHt0aGlzLl94MCA9IHRoaXMuX3gxID0gK3h9LCR7dGhpcy5feTAgPSB0aGlzLl95MSA9ICt5fWgkeyt3fXYkeytofWgkey13fVpgO1xuICB9XG4gIHZhbHVlKCkge1xuICAgIHJldHVybiB0aGlzLl8gfHwgbnVsbDtcbiAgfVxufVxuIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgUG9seWdvbiB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMuXyA9IFtdO1xuICB9XG4gIG1vdmVUbyh4LCB5KSB7XG4gICAgdGhpcy5fLnB1c2goW3gsIHldKTtcbiAgfVxuICBjbG9zZVBhdGgoKSB7XG4gICAgdGhpcy5fLnB1c2godGhpcy5fWzBdLnNsaWNlKCkpO1xuICB9XG4gIGxpbmVUbyh4LCB5KSB7XG4gICAgdGhpcy5fLnB1c2goW3gsIHldKTtcbiAgfVxuICB2YWx1ZSgpIHtcbiAgICByZXR1cm4gdGhpcy5fLmxlbmd0aCA/IHRoaXMuXyA6IG51bGw7XG4gIH1cbn1cbiIsImltcG9ydCBQYXRoIGZyb20gXCIuL3BhdGguanNcIjtcbmltcG9ydCBQb2x5Z29uIGZyb20gXCIuL3BvbHlnb24uanNcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVm9yb25vaSB7XG4gIGNvbnN0cnVjdG9yKGRlbGF1bmF5LCBbeG1pbiwgeW1pbiwgeG1heCwgeW1heF0gPSBbMCwgMCwgOTYwLCA1MDBdKSB7XG4gICAgaWYgKCEoKHhtYXggPSAreG1heCkgPj0gKHhtaW4gPSAreG1pbikpIHx8ICEoKHltYXggPSAreW1heCkgPj0gKHltaW4gPSAreW1pbikpKSB0aHJvdyBuZXcgRXJyb3IoXCJpbnZhbGlkIGJvdW5kc1wiKTtcbiAgICBjb25zdCB7cG9pbnRzLCBodWxsLCB0cmlhbmdsZXN9ID0gdGhpcy5kZWxhdW5heSA9IGRlbGF1bmF5O1xuICAgIGNvbnN0IGNpcmN1bWNlbnRlcnMgPSB0aGlzLmNpcmN1bWNlbnRlcnMgPSBuZXcgRmxvYXQ2NEFycmF5KHRyaWFuZ2xlcy5sZW5ndGggLyAzICogMik7XG4gICAgY29uc3QgdmVjdG9ycyA9IHRoaXMudmVjdG9ycyA9IG5ldyBGbG9hdDY0QXJyYXkocG9pbnRzLmxlbmd0aCAqIDIpO1xuICAgIHRoaXMueG1heCA9IHhtYXgsIHRoaXMueG1pbiA9IHhtaW47XG4gICAgdGhpcy55bWF4ID0geW1heCwgdGhpcy55bWluID0geW1pbjtcblxuICAgIC8vIENvbXB1dGUgY2lyY3VtY2VudGVycy5cbiAgICBmb3IgKGxldCBpID0gMCwgaiA9IDAsIG4gPSB0cmlhbmdsZXMubGVuZ3RoOyBpIDwgbjsgaSArPSAzLCBqICs9IDIpIHtcbiAgICAgIGNvbnN0IHQxID0gdHJpYW5nbGVzW2ldICogMjtcbiAgICAgIGNvbnN0IHQyID0gdHJpYW5nbGVzW2kgKyAxXSAqIDI7XG4gICAgICBjb25zdCB0MyA9IHRyaWFuZ2xlc1tpICsgMl0gKiAyO1xuICAgICAgY29uc3QgeDEgPSBwb2ludHNbdDFdO1xuICAgICAgY29uc3QgeTEgPSBwb2ludHNbdDEgKyAxXTtcbiAgICAgIGNvbnN0IHgyID0gcG9pbnRzW3QyXTtcbiAgICAgIGNvbnN0IHkyID0gcG9pbnRzW3QyICsgMV07XG4gICAgICBjb25zdCB4MyA9IHBvaW50c1t0M107XG4gICAgICBjb25zdCB5MyA9IHBvaW50c1t0MyArIDFdO1xuICAgICAgY29uc3QgYTIgPSB4MSAtIHgyO1xuICAgICAgY29uc3QgYTMgPSB4MSAtIHgzO1xuICAgICAgY29uc3QgYjIgPSB5MSAtIHkyO1xuICAgICAgY29uc3QgYjMgPSB5MSAtIHkzO1xuICAgICAgY29uc3QgZDEgPSB4MSAqIHgxICsgeTEgKiB5MTtcbiAgICAgIGNvbnN0IGQyID0gZDEgLSB4MiAqIHgyIC0geTIgKiB5MjtcbiAgICAgIGNvbnN0IGQzID0gZDEgLSB4MyAqIHgzIC0geTMgKiB5MztcbiAgICAgIGNvbnN0IGFiID0gKGEzICogYjIgLSBhMiAqIGIzKSAqIDI7XG4gICAgICBjaXJjdW1jZW50ZXJzW2pdID0gKGIyICogZDMgLSBiMyAqIGQyKSAvIGFiO1xuICAgICAgY2lyY3VtY2VudGVyc1tqICsgMV0gPSAoYTMgKiBkMiAtIGEyICogZDMpIC8gYWI7XG4gICAgfVxuXG4gICAgLy8gQ29tcHV0ZSBleHRlcmlvciBjZWxsIHJheXMuXG4gICAgbGV0IG5vZGUgPSBodWxsO1xuICAgIGxldCBwMCwgcDEgPSBub2RlLmkgKiA0O1xuICAgIGxldCB4MCwgeDEgPSBub2RlLng7XG4gICAgbGV0IHkwLCB5MSA9IG5vZGUueTtcbiAgICBkbyB7XG4gICAgICBub2RlID0gbm9kZS5uZXh0LCBwMCA9IHAxLCB4MCA9IHgxLCB5MCA9IHkxLCBwMSA9IG5vZGUuaSAqIDQsIHgxID0gbm9kZS54LCB5MSA9IG5vZGUueTtcbiAgICAgIHZlY3RvcnNbcDAgKyAyXSA9IHZlY3RvcnNbcDFdID0geTAgLSB5MTtcbiAgICAgIHZlY3RvcnNbcDAgKyAzXSA9IHZlY3RvcnNbcDEgKyAxXSA9IHgxIC0geDA7XG4gICAgfSB3aGlsZSAobm9kZSAhPT0gaHVsbCk7XG4gIH1cbiAgcmVuZGVyKGNvbnRleHQpIHtcbiAgICBjb25zdCBidWZmZXIgPSBjb250ZXh0ID09IG51bGwgPyBjb250ZXh0ID0gbmV3IFBhdGggOiB1bmRlZmluZWQ7XG4gICAgY29uc3Qge2RlbGF1bmF5OiB7aGFsZmVkZ2VzLCBodWxsfSwgY2lyY3VtY2VudGVycywgdmVjdG9yc30gPSB0aGlzO1xuICAgIGZvciAobGV0IGkgPSAwLCBuID0gaGFsZmVkZ2VzLmxlbmd0aDsgaSA8IG47ICsraSkge1xuICAgICAgY29uc3QgaiA9IGhhbGZlZGdlc1tpXTtcbiAgICAgIGlmIChqIDwgaSkgY29udGludWU7XG4gICAgICBjb25zdCB0aSA9IE1hdGguZmxvb3IoaSAvIDMpICogMjtcbiAgICAgIGNvbnN0IHRqID0gTWF0aC5mbG9vcihqIC8gMykgKiAyO1xuICAgICAgY29uc3QgeGkgPSBjaXJjdW1jZW50ZXJzW3RpXTtcbiAgICAgIGNvbnN0IHlpID0gY2lyY3VtY2VudGVyc1t0aSArIDFdO1xuICAgICAgY29uc3QgeGogPSBjaXJjdW1jZW50ZXJzW3RqXTtcbiAgICAgIGNvbnN0IHlqID0gY2lyY3VtY2VudGVyc1t0aiArIDFdO1xuICAgICAgdGhpcy5fcmVuZGVyU2VnbWVudCh4aSwgeWksIHhqLCB5aiwgY29udGV4dCk7XG4gICAgfVxuICAgIGxldCBub2RlID0gaHVsbDtcbiAgICBkbyB7XG4gICAgICBub2RlID0gbm9kZS5uZXh0O1xuICAgICAgY29uc3QgdCA9IE1hdGguZmxvb3Iobm9kZS50IC8gMykgKiAyO1xuICAgICAgY29uc3QgeCA9IGNpcmN1bWNlbnRlcnNbdF07XG4gICAgICBjb25zdCB5ID0gY2lyY3VtY2VudGVyc1t0ICsgMV07XG4gICAgICBjb25zdCB2ID0gbm9kZS5pICogNDtcbiAgICAgIGNvbnN0IHAgPSB0aGlzLl9wcm9qZWN0KHgsIHksIHZlY3RvcnNbdiArIDJdLCB2ZWN0b3JzW3YgKyAzXSk7XG4gICAgICBpZiAocCkgdGhpcy5fcmVuZGVyU2VnbWVudCh4LCB5LCBwWzBdLCBwWzFdLCBjb250ZXh0KTtcbiAgICB9IHdoaWxlIChub2RlICE9PSBodWxsKTtcbiAgICByZXR1cm4gYnVmZmVyICYmIGJ1ZmZlci52YWx1ZSgpO1xuICB9XG4gIHJlbmRlckJvdW5kcyhjb250ZXh0KSB7XG4gICAgY29uc3QgYnVmZmVyID0gY29udGV4dCA9PSBudWxsID8gY29udGV4dCA9IG5ldyBQYXRoIDogdW5kZWZpbmVkO1xuICAgIGNvbnRleHQucmVjdCh0aGlzLnhtaW4sIHRoaXMueW1pbiwgdGhpcy54bWF4IC0gdGhpcy54bWluLCB0aGlzLnltYXggLSB0aGlzLnltaW4pO1xuICAgIHJldHVybiBidWZmZXIgJiYgYnVmZmVyLnZhbHVlKCk7XG4gIH1cbiAgcmVuZGVyQ2VsbChpLCBjb250ZXh0KSB7XG4gICAgY29uc3QgYnVmZmVyID0gY29udGV4dCA9PSBudWxsID8gY29udGV4dCA9IG5ldyBQYXRoIDogdW5kZWZpbmVkO1xuICAgIGNvbnN0IHBvaW50cyA9IHRoaXMuX2NsaXAoaSk7XG4gICAgaWYgKHBvaW50cyA9PT0gbnVsbCkgcmV0dXJuO1xuICAgIGNvbnRleHQubW92ZVRvKHBvaW50c1swXSwgcG9pbnRzWzFdKTtcbiAgICBmb3IgKGxldCBpID0gMiwgbiA9IHBvaW50cy5sZW5ndGg7IGkgPCBuOyBpICs9IDIpIHtcbiAgICAgIGNvbnRleHQubGluZVRvKHBvaW50c1tpXSwgcG9pbnRzW2kgKyAxXSk7XG4gICAgfVxuICAgIGNvbnRleHQuY2xvc2VQYXRoKCk7XG4gICAgcmV0dXJuIGJ1ZmZlciAmJiBidWZmZXIudmFsdWUoKTtcbiAgfVxuICAqY2VsbFBvbHlnb25zKCkge1xuICAgIGNvbnN0IHtkZWxhdW5heToge3BvaW50c319ID0gdGhpcztcbiAgICBmb3IgKGxldCBpID0gMCwgbiA9IHBvaW50cy5sZW5ndGggLyAyOyBpIDwgbjsgKytpKSB7XG4gICAgICBjb25zdCBjZWxsID0gdGhpcy5jZWxsUG9seWdvbihpKTtcbiAgICAgIGlmIChjZWxsKSB5aWVsZCBjZWxsO1xuICAgIH1cbiAgfVxuICBjZWxsUG9seWdvbihpKSB7XG4gICAgY29uc3QgcG9seWdvbiA9IG5ldyBQb2x5Z29uO1xuICAgIHRoaXMucmVuZGVyQ2VsbChpLCBwb2x5Z29uKTtcbiAgICByZXR1cm4gcG9seWdvbi52YWx1ZSgpO1xuICB9XG4gIF9yZW5kZXJTZWdtZW50KHgwLCB5MCwgeDEsIHkxLCBjb250ZXh0KSB7XG4gICAgbGV0IFM7XG4gICAgY29uc3QgYzAgPSB0aGlzLl9yZWdpb25jb2RlKHgwLCB5MCk7XG4gICAgY29uc3QgYzEgPSB0aGlzLl9yZWdpb25jb2RlKHgxLCB5MSk7XG4gICAgaWYgKGMwID09PSAwICYmIGMxID09PSAwKSB7XG4gICAgICBjb250ZXh0Lm1vdmVUbyh4MCwgeTApO1xuICAgICAgY29udGV4dC5saW5lVG8oeDEsIHkxKTtcbiAgICB9IGVsc2UgaWYgKFMgPSB0aGlzLl9jbGlwU2VnbWVudCh4MCwgeTAsIHgxLCB5MSwgYzAsIGMxKSkge1xuICAgICAgY29udGV4dC5tb3ZlVG8oU1swXSwgU1sxXSk7XG4gICAgICBjb250ZXh0LmxpbmVUbyhTWzJdLCBTWzNdKTtcbiAgICB9XG4gIH1cbiAgY29udGFpbnMoaSwgeCwgeSkge1xuICAgIGlmICgoeCA9ICt4LCB4ICE9PSB4KSB8fCAoeSA9ICt5LCB5ICE9PSB5KSkgcmV0dXJuIGZhbHNlO1xuICAgIHJldHVybiB0aGlzLmRlbGF1bmF5Ll9zdGVwKGksIHgsIHkpID09PSBpO1xuICB9XG4gIF9jZWxsKGkpIHtcbiAgICBjb25zdCB7Y2lyY3VtY2VudGVycywgZGVsYXVuYXk6IHtpbmVkZ2VzLCBoYWxmZWRnZXMsIHRyaWFuZ2xlc319ID0gdGhpcztcbiAgICBjb25zdCBlMCA9IGluZWRnZXNbaV07XG4gICAgaWYgKGUwID09PSAtMSkgcmV0dXJuIG51bGw7IC8vIGNvaW5jaWRlbnQgcG9pbnRcbiAgICBjb25zdCBwb2ludHMgPSBbXTtcbiAgICBsZXQgZSA9IGUwO1xuICAgIGRvIHtcbiAgICAgIGNvbnN0IHQgPSBNYXRoLmZsb29yKGUgLyAzKTtcbiAgICAgIHBvaW50cy5wdXNoKGNpcmN1bWNlbnRlcnNbdCAqIDJdLCBjaXJjdW1jZW50ZXJzW3QgKiAyICsgMV0pO1xuICAgICAgZSA9IGUgJSAzID09PSAyID8gZSAtIDIgOiBlICsgMTtcbiAgICAgIGlmICh0cmlhbmdsZXNbZV0gIT09IGkpIGJyZWFrOyAvLyBiYWQgdHJpYW5ndWxhdGlvblxuICAgICAgZSA9IGhhbGZlZGdlc1tlXTtcbiAgICB9IHdoaWxlIChlICE9PSBlMCAmJiBlICE9PSAtMSk7XG4gICAgcmV0dXJuIHBvaW50cztcbiAgfVxuICBfY2xpcChpKSB7XG4gICAgY29uc3QgcG9pbnRzID0gdGhpcy5fY2VsbChpKTtcbiAgICBpZiAocG9pbnRzID09PSBudWxsKSByZXR1cm4gbnVsbDtcbiAgICBjb25zdCB7dmVjdG9yczogVn0gPSB0aGlzO1xuICAgIGNvbnN0IHYgPSBpICogNDtcbiAgICByZXR1cm4gVlt2XSB8fCBWW3YgKyAxXVxuICAgICAgICA/IHRoaXMuX2NsaXBJbmZpbml0ZShpLCBwb2ludHMsIFZbdl0sIFZbdiArIDFdLCBWW3YgKyAyXSwgVlt2ICsgM10pXG4gICAgICAgIDogdGhpcy5fY2xpcEZpbml0ZShpLCBwb2ludHMpO1xuICB9XG4gIF9jbGlwRmluaXRlKGksIHBvaW50cykge1xuICAgIGNvbnN0IG4gPSBwb2ludHMubGVuZ3RoO1xuICAgIGxldCBQID0gbnVsbDtcbiAgICBsZXQgeDAsIHkwLCB4MSA9IHBvaW50c1tuIC0gMl0sIHkxID0gcG9pbnRzW24gLSAxXTtcbiAgICBsZXQgYzAsIGMxID0gdGhpcy5fcmVnaW9uY29kZSh4MSwgeTEpO1xuICAgIGxldCBlMCwgZTE7XG4gICAgZm9yIChsZXQgaiA9IDA7IGogPCBuOyBqICs9IDIpIHtcbiAgICAgIHgwID0geDEsIHkwID0geTEsIHgxID0gcG9pbnRzW2pdLCB5MSA9IHBvaW50c1tqICsgMV07XG4gICAgICBjMCA9IGMxLCBjMSA9IHRoaXMuX3JlZ2lvbmNvZGUoeDEsIHkxKTtcbiAgICAgIGlmIChjMCA9PT0gMCAmJiBjMSA9PT0gMCkge1xuICAgICAgICBlMCA9IGUxLCBlMSA9IDA7XG4gICAgICAgIGlmIChQKSBQLnB1c2goeDEsIHkxKTtcbiAgICAgICAgZWxzZSBQID0gW3gxLCB5MV07XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBsZXQgUywgc3gwLCBzeTAsIHN4MSwgc3kxO1xuICAgICAgICBpZiAoYzAgPT09IDApIHtcbiAgICAgICAgICBpZiAoKFMgPSB0aGlzLl9jbGlwU2VnbWVudCh4MCwgeTAsIHgxLCB5MSwgYzAsIGMxKSkgPT09IG51bGwpIGNvbnRpbnVlO1xuICAgICAgICAgIFtzeDAsIHN5MCwgc3gxLCBzeTFdID0gUztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpZiAoKFMgPSB0aGlzLl9jbGlwU2VnbWVudCh4MSwgeTEsIHgwLCB5MCwgYzEsIGMwKSkgPT09IG51bGwpIGNvbnRpbnVlO1xuICAgICAgICAgIFtzeDEsIHN5MSwgc3gwLCBzeTBdID0gUztcbiAgICAgICAgICBlMCA9IGUxLCBlMSA9IHRoaXMuX2VkZ2Vjb2RlKHN4MCwgc3kwKTtcbiAgICAgICAgICBpZiAoZTAgJiYgZTEpIHRoaXMuX2VkZ2UoaSwgZTAsIGUxLCBQLCBQLmxlbmd0aCk7XG4gICAgICAgICAgaWYgKFApIFAucHVzaChzeDAsIHN5MCk7XG4gICAgICAgICAgZWxzZSBQID0gW3N4MCwgc3kwXTtcbiAgICAgICAgfVxuICAgICAgICBlMCA9IGUxLCBlMSA9IHRoaXMuX2VkZ2Vjb2RlKHN4MSwgc3kxKTtcbiAgICAgICAgaWYgKGUwICYmIGUxKSB0aGlzLl9lZGdlKGksIGUwLCBlMSwgUCwgUC5sZW5ndGgpO1xuICAgICAgICBpZiAoUCkgUC5wdXNoKHN4MSwgc3kxKTtcbiAgICAgICAgZWxzZSBQID0gW3N4MSwgc3kxXTtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKFApIHtcbiAgICAgIGUwID0gZTEsIGUxID0gdGhpcy5fZWRnZWNvZGUoUFswXSwgUFsxXSk7XG4gICAgICBpZiAoZTAgJiYgZTEpIHRoaXMuX2VkZ2UoaSwgZTAsIGUxLCBQLCBQLmxlbmd0aCk7XG4gICAgfSBlbHNlIGlmICh0aGlzLmNvbnRhaW5zKGksICh0aGlzLnhtaW4gKyB0aGlzLnhtYXgpIC8gMiwgKHRoaXMueW1pbiArIHRoaXMueW1heCkgLyAyKSkge1xuICAgICAgcmV0dXJuIFt0aGlzLnhtYXgsIHRoaXMueW1pbiwgdGhpcy54bWF4LCB0aGlzLnltYXgsIHRoaXMueG1pbiwgdGhpcy55bWF4LCB0aGlzLnhtaW4sIHRoaXMueW1pbl07XG4gICAgfVxuICAgIHJldHVybiBQO1xuICB9XG4gIF9jbGlwU2VnbWVudCh4MCwgeTAsIHgxLCB5MSwgYzAsIGMxKSB7XG4gICAgd2hpbGUgKHRydWUpIHtcbiAgICAgIGlmIChjMCA9PT0gMCAmJiBjMSA9PT0gMCkgcmV0dXJuIFt4MCwgeTAsIHgxLCB5MV07XG4gICAgICBpZiAoYzAgJiBjMSkgcmV0dXJuIG51bGw7XG4gICAgICBsZXQgeCwgeSwgYyA9IGMwIHx8IGMxO1xuICAgICAgaWYgKGMgJiAwYjEwMDApIHggPSB4MCArICh4MSAtIHgwKSAqICh0aGlzLnltYXggLSB5MCkgLyAoeTEgLSB5MCksIHkgPSB0aGlzLnltYXg7XG4gICAgICBlbHNlIGlmIChjICYgMGIwMTAwKSB4ID0geDAgKyAoeDEgLSB4MCkgKiAodGhpcy55bWluIC0geTApIC8gKHkxIC0geTApLCB5ID0gdGhpcy55bWluO1xuICAgICAgZWxzZSBpZiAoYyAmIDBiMDAxMCkgeSA9IHkwICsgKHkxIC0geTApICogKHRoaXMueG1heCAtIHgwKSAvICh4MSAtIHgwKSwgeCA9IHRoaXMueG1heDtcbiAgICAgIGVsc2UgeSA9IHkwICsgKHkxIC0geTApICogKHRoaXMueG1pbiAtIHgwKSAvICh4MSAtIHgwKSwgeCA9IHRoaXMueG1pbjtcbiAgICAgIGlmIChjMCkgeDAgPSB4LCB5MCA9IHksIGMwID0gdGhpcy5fcmVnaW9uY29kZSh4MCwgeTApO1xuICAgICAgZWxzZSB4MSA9IHgsIHkxID0geSwgYzEgPSB0aGlzLl9yZWdpb25jb2RlKHgxLCB5MSk7XG4gICAgfVxuICB9XG4gIF9jbGlwSW5maW5pdGUoaSwgcG9pbnRzLCB2eDAsIHZ5MCwgdnhuLCB2eW4pIHtcbiAgICBsZXQgUCA9IEFycmF5LmZyb20ocG9pbnRzKSwgcDtcbiAgICBpZiAocCA9IHRoaXMuX3Byb2plY3QoUFswXSwgUFsxXSwgdngwLCB2eTApKSBQLnVuc2hpZnQocFswXSwgcFsxXSk7XG4gICAgaWYgKHAgPSB0aGlzLl9wcm9qZWN0KFBbUC5sZW5ndGggLSAyXSwgUFtQLmxlbmd0aCAtIDFdLCB2eG4sIHZ5bikpIFAucHVzaChwWzBdLCBwWzFdKTtcbiAgICBpZiAoUCA9IHRoaXMuX2NsaXBGaW5pdGUoaSwgUCkpIHtcbiAgICAgIGZvciAobGV0IGogPSAwLCBuID0gUC5sZW5ndGgsIGMwLCBjMSA9IHRoaXMuX2VkZ2Vjb2RlKFBbbiAtIDJdLCBQW24gLSAxXSk7IGogPCBuOyBqICs9IDIpIHtcbiAgICAgICAgYzAgPSBjMSwgYzEgPSB0aGlzLl9lZGdlY29kZShQW2pdLCBQW2ogKyAxXSk7XG4gICAgICAgIGlmIChjMCAmJiBjMSkgaiA9IHRoaXMuX2VkZ2UoaSwgYzAsIGMxLCBQLCBqKSwgbiA9IFAubGVuZ3RoO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAodGhpcy5jb250YWlucyhpLCAodGhpcy54bWluICsgdGhpcy54bWF4KSAvIDIsICh0aGlzLnltaW4gKyB0aGlzLnltYXgpIC8gMikpIHtcbiAgICAgIFAgPSBbdGhpcy54bWluLCB0aGlzLnltaW4sIHRoaXMueG1heCwgdGhpcy55bWluLCB0aGlzLnhtYXgsIHRoaXMueW1heCwgdGhpcy54bWluLCB0aGlzLnltYXhdO1xuICAgIH1cbiAgICByZXR1cm4gUDtcbiAgfVxuICBfZWRnZShpLCBlMCwgZTEsIFAsIGopIHtcbiAgICB3aGlsZSAoZTAgIT09IGUxKSB7XG4gICAgICBsZXQgeCwgeTtcbiAgICAgIHN3aXRjaCAoZTApIHtcbiAgICAgICAgY2FzZSAwYjAxMDE6IGUwID0gMGIwMTAwOyBjb250aW51ZTsgLy8gdG9wLWxlZnRcbiAgICAgICAgY2FzZSAwYjAxMDA6IGUwID0gMGIwMTEwLCB4ID0gdGhpcy54bWF4LCB5ID0gdGhpcy55bWluOyBicmVhazsgLy8gdG9wXG4gICAgICAgIGNhc2UgMGIwMTEwOiBlMCA9IDBiMDAxMDsgY29udGludWU7IC8vIHRvcC1yaWdodFxuICAgICAgICBjYXNlIDBiMDAxMDogZTAgPSAwYjEwMTAsIHggPSB0aGlzLnhtYXgsIHkgPSB0aGlzLnltYXg7IGJyZWFrOyAvLyByaWdodFxuICAgICAgICBjYXNlIDBiMTAxMDogZTAgPSAwYjEwMDA7IGNvbnRpbnVlOyAvLyBib3R0b20tcmlnaHRcbiAgICAgICAgY2FzZSAwYjEwMDA6IGUwID0gMGIxMDAxLCB4ID0gdGhpcy54bWluLCB5ID0gdGhpcy55bWF4OyBicmVhazsgLy8gYm90dG9tXG4gICAgICAgIGNhc2UgMGIxMDAxOiBlMCA9IDBiMDAwMTsgY29udGludWU7IC8vIGJvdHRvbS1sZWZ0XG4gICAgICAgIGNhc2UgMGIwMDAxOiBlMCA9IDBiMDEwMSwgeCA9IHRoaXMueG1pbiwgeSA9IHRoaXMueW1pbjsgYnJlYWs7IC8vIGxlZnRcbiAgICAgIH1cbiAgICAgIGlmICgoUFtqXSAhPT0geCB8fCBQW2ogKyAxXSAhPT0geSkgJiYgdGhpcy5jb250YWlucyhpLCB4LCB5KSkge1xuICAgICAgICBQLnNwbGljZShqLCAwLCB4LCB5KSwgaiArPSAyO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gajtcbiAgfVxuICBfcHJvamVjdCh4MCwgeTAsIHZ4LCB2eSkge1xuICAgIGxldCB0ID0gSW5maW5pdHksIGMsIHgsIHk7XG4gICAgaWYgKHZ5IDwgMCkgeyAvLyB0b3BcbiAgICAgIGlmICh5MCA8PSB0aGlzLnltaW4pIHJldHVybiBudWxsO1xuICAgICAgaWYgKChjID0gKHRoaXMueW1pbiAtIHkwKSAvIHZ5KSA8IHQpIHkgPSB0aGlzLnltaW4sIHggPSB4MCArICh0ID0gYykgKiB2eDtcbiAgICB9IGVsc2UgaWYgKHZ5ID4gMCkgeyAvLyBib3R0b21cbiAgICAgIGlmICh5MCA+PSB0aGlzLnltYXgpIHJldHVybiBudWxsO1xuICAgICAgaWYgKChjID0gKHRoaXMueW1heCAtIHkwKSAvIHZ5KSA8IHQpIHkgPSB0aGlzLnltYXgsIHggPSB4MCArICh0ID0gYykgKiB2eDtcbiAgICB9XG4gICAgaWYgKHZ4ID4gMCkgeyAvLyByaWdodFxuICAgICAgaWYgKHgwID49IHRoaXMueG1heCkgcmV0dXJuIG51bGw7XG4gICAgICBpZiAoKGMgPSAodGhpcy54bWF4IC0geDApIC8gdngpIDwgdCkgeCA9IHRoaXMueG1heCwgeSA9IHkwICsgKHQgPSBjKSAqIHZ5O1xuICAgIH0gZWxzZSBpZiAodnggPCAwKSB7IC8vIGxlZnRcbiAgICAgIGlmICh4MCA8PSB0aGlzLnhtaW4pIHJldHVybiBudWxsO1xuICAgICAgaWYgKChjID0gKHRoaXMueG1pbiAtIHgwKSAvIHZ4KSA8IHQpIHggPSB0aGlzLnhtaW4sIHkgPSB5MCArICh0ID0gYykgKiB2eTtcbiAgICB9XG4gICAgcmV0dXJuIFt4LCB5XTtcbiAgfVxuICBfZWRnZWNvZGUoeCwgeSkge1xuICAgIHJldHVybiAoeCA9PT0gdGhpcy54bWluID8gMGIwMDAxXG4gICAgICAgIDogeCA9PT0gdGhpcy54bWF4ID8gMGIwMDEwIDogMGIwMDAwKVxuICAgICAgICB8ICh5ID09PSB0aGlzLnltaW4gPyAwYjAxMDBcbiAgICAgICAgOiB5ID09PSB0aGlzLnltYXggPyAwYjEwMDAgOiAwYjAwMDApO1xuICB9XG4gIF9yZWdpb25jb2RlKHgsIHkpIHtcbiAgICByZXR1cm4gKHggPCB0aGlzLnhtaW4gPyAwYjAwMDFcbiAgICAgICAgOiB4ID4gdGhpcy54bWF4ID8gMGIwMDEwIDogMGIwMDAwKVxuICAgICAgICB8ICh5IDwgdGhpcy55bWluID8gMGIwMTAwXG4gICAgICAgIDogeSA+IHRoaXMueW1heCA/IDBiMTAwMCA6IDBiMDAwMCk7XG4gIH1cbn1cbiIsIlxuY29uc3QgRVBTSUxPTiA9IE1hdGgucG93KDIsIC01Mik7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIERlbGF1bmF0b3Ige1xuXG4gICAgc3RhdGljIGZyb20ocG9pbnRzLCBnZXRYLCBnZXRZKSB7XG4gICAgICAgIGlmICghZ2V0WCkgZ2V0WCA9IGRlZmF1bHRHZXRYO1xuICAgICAgICBpZiAoIWdldFkpIGdldFkgPSBkZWZhdWx0R2V0WTtcblxuICAgICAgICBjb25zdCBuID0gcG9pbnRzLmxlbmd0aDtcbiAgICAgICAgY29uc3QgY29vcmRzID0gbmV3IEZsb2F0NjRBcnJheShuICogMik7XG5cbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBuOyBpKyspIHtcbiAgICAgICAgICAgIGNvbnN0IHAgPSBwb2ludHNbaV07XG4gICAgICAgICAgICBjb29yZHNbMiAqIGldID0gZ2V0WChwKTtcbiAgICAgICAgICAgIGNvb3Jkc1syICogaSArIDFdID0gZ2V0WShwKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBuZXcgRGVsYXVuYXRvcihjb29yZHMpO1xuICAgIH1cblxuICAgIGNvbnN0cnVjdG9yKGNvb3Jkcykge1xuICAgICAgICBsZXQgbWluWCA9IEluZmluaXR5O1xuICAgICAgICBsZXQgbWluWSA9IEluZmluaXR5O1xuICAgICAgICBsZXQgbWF4WCA9IC1JbmZpbml0eTtcbiAgICAgICAgbGV0IG1heFkgPSAtSW5maW5pdHk7XG5cbiAgICAgICAgY29uc3QgbiA9IGNvb3Jkcy5sZW5ndGggPj4gMTtcbiAgICAgICAgY29uc3QgaWRzID0gdGhpcy5pZHMgPSBuZXcgVWludDMyQXJyYXkobik7XG5cbiAgICAgICAgaWYgKG4gPiAwICYmIHR5cGVvZiBjb29yZHNbMF0gIT09ICdudW1iZXInKSB0aHJvdyBuZXcgRXJyb3IoJ0V4cGVjdGVkIGNvb3JkcyB0byBjb250YWluIG51bWJlcnMuJyk7XG5cbiAgICAgICAgdGhpcy5jb29yZHMgPSBjb29yZHM7XG5cbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBuOyBpKyspIHtcbiAgICAgICAgICAgIGNvbnN0IHggPSBjb29yZHNbMiAqIGldO1xuICAgICAgICAgICAgY29uc3QgeSA9IGNvb3Jkc1syICogaSArIDFdO1xuICAgICAgICAgICAgaWYgKHggPCBtaW5YKSBtaW5YID0geDtcbiAgICAgICAgICAgIGlmICh5IDwgbWluWSkgbWluWSA9IHk7XG4gICAgICAgICAgICBpZiAoeCA+IG1heFgpIG1heFggPSB4O1xuICAgICAgICAgICAgaWYgKHkgPiBtYXhZKSBtYXhZID0geTtcbiAgICAgICAgICAgIGlkc1tpXSA9IGk7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBjeCA9IChtaW5YICsgbWF4WCkgLyAyO1xuICAgICAgICBjb25zdCBjeSA9IChtaW5ZICsgbWF4WSkgLyAyO1xuXG4gICAgICAgIGxldCBtaW5EaXN0ID0gSW5maW5pdHk7XG4gICAgICAgIGxldCBpMCwgaTEsIGkyO1xuXG4gICAgICAgIC8vIHBpY2sgYSBzZWVkIHBvaW50IGNsb3NlIHRvIHRoZSBjZW50cm9pZFxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG47IGkrKykge1xuICAgICAgICAgICAgY29uc3QgZCA9IGRpc3QoY3gsIGN5LCBjb29yZHNbMiAqIGldLCBjb29yZHNbMiAqIGkgKyAxXSk7XG4gICAgICAgICAgICBpZiAoZCA8IG1pbkRpc3QpIHtcbiAgICAgICAgICAgICAgICBpMCA9IGk7XG4gICAgICAgICAgICAgICAgbWluRGlzdCA9IGQ7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgaTB4ID0gY29vcmRzWzIgKiBpMF07XG4gICAgICAgIGNvbnN0IGkweSA9IGNvb3Jkc1syICogaTAgKyAxXTtcblxuICAgICAgICBtaW5EaXN0ID0gSW5maW5pdHk7XG5cbiAgICAgICAgLy8gZmluZCB0aGUgcG9pbnQgY2xvc2VzdCB0byB0aGUgc2VlZFxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG47IGkrKykge1xuICAgICAgICAgICAgaWYgKGkgPT09IGkwKSBjb250aW51ZTtcbiAgICAgICAgICAgIGNvbnN0IGQgPSBkaXN0KGkweCwgaTB5LCBjb29yZHNbMiAqIGldLCBjb29yZHNbMiAqIGkgKyAxXSk7XG4gICAgICAgICAgICBpZiAoZCA8IG1pbkRpc3QgJiYgZCA+IDApIHtcbiAgICAgICAgICAgICAgICBpMSA9IGk7XG4gICAgICAgICAgICAgICAgbWluRGlzdCA9IGQ7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgbGV0IGkxeCA9IGNvb3Jkc1syICogaTFdO1xuICAgICAgICBsZXQgaTF5ID0gY29vcmRzWzIgKiBpMSArIDFdO1xuXG4gICAgICAgIGxldCBtaW5SYWRpdXMgPSBJbmZpbml0eTtcblxuICAgICAgICAvLyBmaW5kIHRoZSB0aGlyZCBwb2ludCB3aGljaCBmb3JtcyB0aGUgc21hbGxlc3QgY2lyY3VtY2lyY2xlIHdpdGggdGhlIGZpcnN0IHR3b1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG47IGkrKykge1xuICAgICAgICAgICAgaWYgKGkgPT09IGkwIHx8IGkgPT09IGkxKSBjb250aW51ZTtcbiAgICAgICAgICAgIGNvbnN0IHIgPSBjaXJjdW1yYWRpdXMoaTB4LCBpMHksIGkxeCwgaTF5LCBjb29yZHNbMiAqIGldLCBjb29yZHNbMiAqIGkgKyAxXSk7XG4gICAgICAgICAgICBpZiAociA8IG1pblJhZGl1cykge1xuICAgICAgICAgICAgICAgIGkyID0gaTtcbiAgICAgICAgICAgICAgICBtaW5SYWRpdXMgPSByO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGxldCBpMnggPSBjb29yZHNbMiAqIGkyXTtcbiAgICAgICAgbGV0IGkyeSA9IGNvb3Jkc1syICogaTIgKyAxXTtcblxuICAgICAgICBpZiAobWluUmFkaXVzID09PSBJbmZpbml0eSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdObyBEZWxhdW5heSB0cmlhbmd1bGF0aW9uIGV4aXN0cyBmb3IgdGhpcyBpbnB1dC4nKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIHN3YXAgdGhlIG9yZGVyIG9mIHRoZSBzZWVkIHBvaW50cyBmb3IgY291bnRlci1jbG9ja3dpc2Ugb3JpZW50YXRpb25cbiAgICAgICAgaWYgKG9yaWVudChpMHgsIGkweSwgaTF4LCBpMXksIGkyeCwgaTJ5KSkge1xuICAgICAgICAgICAgY29uc3QgaSA9IGkxO1xuICAgICAgICAgICAgY29uc3QgeCA9IGkxeDtcbiAgICAgICAgICAgIGNvbnN0IHkgPSBpMXk7XG4gICAgICAgICAgICBpMSA9IGkyO1xuICAgICAgICAgICAgaTF4ID0gaTJ4O1xuICAgICAgICAgICAgaTF5ID0gaTJ5O1xuICAgICAgICAgICAgaTIgPSBpO1xuICAgICAgICAgICAgaTJ4ID0geDtcbiAgICAgICAgICAgIGkyeSA9IHk7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBjZW50ZXIgPSBjaXJjdW1jZW50ZXIoaTB4LCBpMHksIGkxeCwgaTF5LCBpMngsIGkyeSk7XG4gICAgICAgIHRoaXMuX2N4ID0gY2VudGVyLng7XG4gICAgICAgIHRoaXMuX2N5ID0gY2VudGVyLnk7XG5cbiAgICAgICAgLy8gc29ydCB0aGUgcG9pbnRzIGJ5IGRpc3RhbmNlIGZyb20gdGhlIHNlZWQgdHJpYW5nbGUgY2lyY3VtY2VudGVyXG4gICAgICAgIHF1aWNrc29ydChpZHMsIGNvb3JkcywgMCwgaWRzLmxlbmd0aCAtIDEsIGNlbnRlci54LCBjZW50ZXIueSk7XG5cbiAgICAgICAgLy8gaW5pdGlhbGl6ZSBhIGhhc2ggdGFibGUgZm9yIHN0b3JpbmcgZWRnZXMgb2YgdGhlIGFkdmFuY2luZyBjb252ZXggaHVsbFxuICAgICAgICB0aGlzLl9oYXNoU2l6ZSA9IE1hdGguY2VpbChNYXRoLnNxcnQobikpO1xuICAgICAgICB0aGlzLl9oYXNoID0gbmV3IEFycmF5KHRoaXMuX2hhc2hTaXplKTtcblxuICAgICAgICAvLyBpbml0aWFsaXplIGEgY2lyY3VsYXIgZG91Ymx5LWxpbmtlZCBsaXN0IHRoYXQgd2lsbCBob2xkIGFuIGFkdmFuY2luZyBjb252ZXggaHVsbFxuICAgICAgICBsZXQgZSA9IHRoaXMuaHVsbCA9IGluc2VydE5vZGUoY29vcmRzLCBpMCk7XG4gICAgICAgIHRoaXMuX2hhc2hFZGdlKGUpO1xuICAgICAgICBlLnQgPSAwO1xuICAgICAgICBlID0gaW5zZXJ0Tm9kZShjb29yZHMsIGkxLCBlKTtcbiAgICAgICAgdGhpcy5faGFzaEVkZ2UoZSk7XG4gICAgICAgIGUudCA9IDE7XG4gICAgICAgIGUgPSBpbnNlcnROb2RlKGNvb3JkcywgaTIsIGUpO1xuICAgICAgICB0aGlzLl9oYXNoRWRnZShlKTtcbiAgICAgICAgZS50ID0gMjtcblxuICAgICAgICBjb25zdCBtYXhUcmlhbmdsZXMgPSAyICogbiAtIDU7XG4gICAgICAgIGNvbnN0IHRyaWFuZ2xlcyA9IHRoaXMudHJpYW5nbGVzID0gbmV3IFVpbnQzMkFycmF5KG1heFRyaWFuZ2xlcyAqIDMpO1xuICAgICAgICBjb25zdCBoYWxmZWRnZXMgPSB0aGlzLmhhbGZlZGdlcyA9IG5ldyBJbnQzMkFycmF5KG1heFRyaWFuZ2xlcyAqIDMpO1xuXG4gICAgICAgIHRoaXMudHJpYW5nbGVzTGVuID0gMDtcblxuICAgICAgICB0aGlzLl9hZGRUcmlhbmdsZShpMCwgaTEsIGkyLCAtMSwgLTEsIC0xKTtcblxuICAgICAgICBmb3IgKGxldCBrID0gMCwgeHAsIHlwOyBrIDwgaWRzLmxlbmd0aDsgaysrKSB7XG4gICAgICAgICAgICBjb25zdCBpID0gaWRzW2tdO1xuICAgICAgICAgICAgY29uc3QgeCA9IGNvb3Jkc1syICogaV07XG4gICAgICAgICAgICBjb25zdCB5ID0gY29vcmRzWzIgKiBpICsgMV07XG5cbiAgICAgICAgICAgIC8vIHNraXAgbmVhci1kdXBsaWNhdGUgcG9pbnRzXG4gICAgICAgICAgICBpZiAoayA+IDAgJiYgTWF0aC5hYnMoeCAtIHhwKSA8PSBFUFNJTE9OICYmIE1hdGguYWJzKHkgLSB5cCkgPD0gRVBTSUxPTikgY29udGludWU7XG4gICAgICAgICAgICB4cCA9IHg7XG4gICAgICAgICAgICB5cCA9IHk7XG5cbiAgICAgICAgICAgIC8vIHNraXAgc2VlZCB0cmlhbmdsZSBwb2ludHNcbiAgICAgICAgICAgIGlmIChpID09PSBpMCB8fCBpID09PSBpMSB8fCBpID09PSBpMikgY29udGludWU7XG5cbiAgICAgICAgICAgIC8vIGZpbmQgYSB2aXNpYmxlIGVkZ2Ugb24gdGhlIGNvbnZleCBodWxsIHVzaW5nIGVkZ2UgaGFzaFxuICAgICAgICAgICAgY29uc3Qgc3RhcnRLZXkgPSB0aGlzLl9oYXNoS2V5KHgsIHkpO1xuICAgICAgICAgICAgbGV0IGtleSA9IHN0YXJ0S2V5O1xuICAgICAgICAgICAgbGV0IHN0YXJ0O1xuICAgICAgICAgICAgZG8ge1xuICAgICAgICAgICAgICAgIHN0YXJ0ID0gdGhpcy5faGFzaFtrZXldO1xuICAgICAgICAgICAgICAgIGtleSA9IChrZXkgKyAxKSAlIHRoaXMuX2hhc2hTaXplO1xuICAgICAgICAgICAgfSB3aGlsZSAoKCFzdGFydCB8fCBzdGFydC5yZW1vdmVkKSAmJiBrZXkgIT09IHN0YXJ0S2V5KTtcblxuICAgICAgICAgICAgc3RhcnQgPSBzdGFydC5wcmV2O1xuICAgICAgICAgICAgZSA9IHN0YXJ0O1xuICAgICAgICAgICAgd2hpbGUgKCFvcmllbnQoeCwgeSwgZS54LCBlLnksIGUubmV4dC54LCBlLm5leHQueSkpIHtcbiAgICAgICAgICAgICAgICBlID0gZS5uZXh0O1xuICAgICAgICAgICAgICAgIGlmIChlID09PSBzdGFydCkge1xuICAgICAgICAgICAgICAgICAgICBlID0gbnVsbDtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gbGlrZWx5IGEgbmVhci1kdXBsaWNhdGUgcG9pbnQ7IHNraXAgaXRcbiAgICAgICAgICAgIGlmICghZSkgY29udGludWU7XG5cbiAgICAgICAgICAgIGNvbnN0IHdhbGtCYWNrID0gZSA9PT0gc3RhcnQ7XG5cbiAgICAgICAgICAgIC8vIGFkZCB0aGUgZmlyc3QgdHJpYW5nbGUgZnJvbSB0aGUgcG9pbnRcbiAgICAgICAgICAgIGxldCB0ID0gdGhpcy5fYWRkVHJpYW5nbGUoZS5pLCBpLCBlLm5leHQuaSwgLTEsIC0xLCBlLnQpO1xuXG4gICAgICAgICAgICBlLnQgPSB0OyAvLyBrZWVwIHRyYWNrIG9mIGJvdW5kYXJ5IHRyaWFuZ2xlcyBvbiB0aGUgaHVsbFxuICAgICAgICAgICAgZSA9IGluc2VydE5vZGUoY29vcmRzLCBpLCBlKTtcblxuICAgICAgICAgICAgLy8gcmVjdXJzaXZlbHkgZmxpcCB0cmlhbmdsZXMgZnJvbSB0aGUgcG9pbnQgdW50aWwgdGhleSBzYXRpc2Z5IHRoZSBEZWxhdW5heSBjb25kaXRpb25cbiAgICAgICAgICAgIGUudCA9IHRoaXMuX2xlZ2FsaXplKHQgKyAyKTtcblxuICAgICAgICAgICAgLy8gd2FsayBmb3J3YXJkIHRocm91Z2ggdGhlIGh1bGwsIGFkZGluZyBtb3JlIHRyaWFuZ2xlcyBhbmQgZmxpcHBpbmcgcmVjdXJzaXZlbHlcbiAgICAgICAgICAgIGxldCBxID0gZS5uZXh0O1xuICAgICAgICAgICAgd2hpbGUgKG9yaWVudCh4LCB5LCBxLngsIHEueSwgcS5uZXh0LngsIHEubmV4dC55KSkge1xuICAgICAgICAgICAgICAgIHQgPSB0aGlzLl9hZGRUcmlhbmdsZShxLmksIGksIHEubmV4dC5pLCBxLnByZXYudCwgLTEsIHEudCk7XG4gICAgICAgICAgICAgICAgcS5wcmV2LnQgPSB0aGlzLl9sZWdhbGl6ZSh0ICsgMik7XG4gICAgICAgICAgICAgICAgdGhpcy5odWxsID0gcmVtb3ZlTm9kZShxKTtcbiAgICAgICAgICAgICAgICBxID0gcS5uZXh0O1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAod2Fsa0JhY2spIHtcbiAgICAgICAgICAgICAgICAvLyB3YWxrIGJhY2t3YXJkIGZyb20gdGhlIG90aGVyIHNpZGUsIGFkZGluZyBtb3JlIHRyaWFuZ2xlcyBhbmQgZmxpcHBpbmdcbiAgICAgICAgICAgICAgICBxID0gZS5wcmV2O1xuICAgICAgICAgICAgICAgIHdoaWxlIChvcmllbnQoeCwgeSwgcS5wcmV2LngsIHEucHJldi55LCBxLngsIHEueSkpIHtcbiAgICAgICAgICAgICAgICAgICAgdCA9IHRoaXMuX2FkZFRyaWFuZ2xlKHEucHJldi5pLCBpLCBxLmksIC0xLCBxLnQsIHEucHJldi50KTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fbGVnYWxpemUodCArIDIpO1xuICAgICAgICAgICAgICAgICAgICBxLnByZXYudCA9IHQ7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaHVsbCA9IHJlbW92ZU5vZGUocSk7XG4gICAgICAgICAgICAgICAgICAgIHEgPSBxLnByZXY7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBzYXZlIHRoZSB0d28gbmV3IGVkZ2VzIGluIHRoZSBoYXNoIHRhYmxlXG4gICAgICAgICAgICB0aGlzLl9oYXNoRWRnZShlKTtcbiAgICAgICAgICAgIHRoaXMuX2hhc2hFZGdlKGUucHJldik7XG4gICAgICAgIH1cblxuICAgICAgICAvLyB0cmltIHR5cGVkIHRyaWFuZ2xlIG1lc2ggYXJyYXlzXG4gICAgICAgIHRoaXMudHJpYW5nbGVzID0gdHJpYW5nbGVzLnN1YmFycmF5KDAsIHRoaXMudHJpYW5nbGVzTGVuKTtcbiAgICAgICAgdGhpcy5oYWxmZWRnZXMgPSBoYWxmZWRnZXMuc3ViYXJyYXkoMCwgdGhpcy50cmlhbmdsZXNMZW4pO1xuICAgIH1cblxuICAgIF9oYXNoRWRnZShlKSB7XG4gICAgICAgIHRoaXMuX2hhc2hbdGhpcy5faGFzaEtleShlLngsIGUueSldID0gZTtcbiAgICB9XG5cbiAgICBfaGFzaEtleSh4LCB5KSB7XG4gICAgICAgIHJldHVybiBNYXRoLmZsb29yKHBzZXVkb0FuZ2xlKHggLSB0aGlzLl9jeCwgeSAtIHRoaXMuX2N5KSAqIHRoaXMuX2hhc2hTaXplKSAlIHRoaXMuX2hhc2hTaXplO1xuICAgIH1cblxuICAgIF9sZWdhbGl6ZShhKSB7XG4gICAgICAgIGNvbnN0IHt0cmlhbmdsZXMsIGNvb3JkcywgaGFsZmVkZ2VzfSA9IHRoaXM7XG5cbiAgICAgICAgY29uc3QgYiA9IGhhbGZlZGdlc1thXTtcblxuICAgICAgICAvKiBpZiB0aGUgcGFpciBvZiB0cmlhbmdsZXMgZG9lc24ndCBzYXRpc2Z5IHRoZSBEZWxhdW5heSBjb25kaXRpb25cbiAgICAgICAgICogKHAxIGlzIGluc2lkZSB0aGUgY2lyY3VtY2lyY2xlIG9mIFtwMCwgcGwsIHByXSksIGZsaXAgdGhlbSxcbiAgICAgICAgICogdGhlbiBkbyB0aGUgc2FtZSBjaGVjay9mbGlwIHJlY3Vyc2l2ZWx5IGZvciB0aGUgbmV3IHBhaXIgb2YgdHJpYW5nbGVzXG4gICAgICAgICAqXG4gICAgICAgICAqICAgICAgICAgICBwbCAgICAgICAgICAgICAgICAgICAgcGxcbiAgICAgICAgICogICAgICAgICAgL3x8XFwgICAgICAgICAgICAgICAgICAvICBcXFxuICAgICAgICAgKiAgICAgICBhbC8gfHwgXFxibCAgICAgICAgICAgIGFsLyAgICBcXGFcbiAgICAgICAgICogICAgICAgIC8gIHx8ICBcXCAgICAgICAgICAgICAgLyAgICAgIFxcXG4gICAgICAgICAqICAgICAgIC8gIGF8fGIgIFxcICAgIGZsaXAgICAgL19fX2FyX19fXFxcbiAgICAgICAgICogICAgIHAwXFwgICB8fCAgIC9wMSAgID0+ICAgcDBcXC0tLWJsLS0tL3AxXG4gICAgICAgICAqICAgICAgICBcXCAgfHwgIC8gICAgICAgICAgICAgIFxcICAgICAgL1xuICAgICAgICAgKiAgICAgICBhclxcIHx8IC9iciAgICAgICAgICAgICBiXFwgICAgL2JyXG4gICAgICAgICAqICAgICAgICAgIFxcfHwvICAgICAgICAgICAgICAgICAgXFwgIC9cbiAgICAgICAgICogICAgICAgICAgIHByICAgICAgICAgICAgICAgICAgICBwclxuICAgICAgICAgKi9cbiAgICAgICAgY29uc3QgYTAgPSBhIC0gYSAlIDM7XG4gICAgICAgIGNvbnN0IGIwID0gYiAtIGIgJSAzO1xuXG4gICAgICAgIGNvbnN0IGFsID0gYTAgKyAoYSArIDEpICUgMztcbiAgICAgICAgY29uc3QgYXIgPSBhMCArIChhICsgMikgJSAzO1xuICAgICAgICBjb25zdCBibCA9IGIwICsgKGIgKyAyKSAlIDM7XG5cbiAgICAgICAgaWYgKGIgPT09IC0xKSByZXR1cm4gYXI7XG5cbiAgICAgICAgY29uc3QgcDAgPSB0cmlhbmdsZXNbYXJdO1xuICAgICAgICBjb25zdCBwciA9IHRyaWFuZ2xlc1thXTtcbiAgICAgICAgY29uc3QgcGwgPSB0cmlhbmdsZXNbYWxdO1xuICAgICAgICBjb25zdCBwMSA9IHRyaWFuZ2xlc1tibF07XG5cbiAgICAgICAgY29uc3QgaWxsZWdhbCA9IGluQ2lyY2xlKFxuICAgICAgICAgICAgY29vcmRzWzIgKiBwMF0sIGNvb3Jkc1syICogcDAgKyAxXSxcbiAgICAgICAgICAgIGNvb3Jkc1syICogcHJdLCBjb29yZHNbMiAqIHByICsgMV0sXG4gICAgICAgICAgICBjb29yZHNbMiAqIHBsXSwgY29vcmRzWzIgKiBwbCArIDFdLFxuICAgICAgICAgICAgY29vcmRzWzIgKiBwMV0sIGNvb3Jkc1syICogcDEgKyAxXSk7XG5cbiAgICAgICAgaWYgKGlsbGVnYWwpIHtcbiAgICAgICAgICAgIHRyaWFuZ2xlc1thXSA9IHAxO1xuICAgICAgICAgICAgdHJpYW5nbGVzW2JdID0gcDA7XG5cbiAgICAgICAgICAgIGNvbnN0IGhibCA9IGhhbGZlZGdlc1tibF07XG5cbiAgICAgICAgICAgIC8vIGVkZ2Ugc3dhcHBlZCBvbiB0aGUgb3RoZXIgc2lkZSBvZiB0aGUgaHVsbCAocmFyZSk7IGZpeCB0aGUgaGFsZmVkZ2UgcmVmZXJlbmNlXG4gICAgICAgICAgICBpZiAoaGJsID09PSAtMSkge1xuICAgICAgICAgICAgICAgIGxldCBlID0gdGhpcy5odWxsO1xuICAgICAgICAgICAgICAgIGRvIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGUudCA9PT0gYmwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGUudCA9IGE7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlID0gZS5uZXh0O1xuICAgICAgICAgICAgICAgIH0gd2hpbGUgKGUgIT09IHRoaXMuaHVsbCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLl9saW5rKGEsIGhibCk7XG4gICAgICAgICAgICB0aGlzLl9saW5rKGIsIGhhbGZlZGdlc1thcl0pO1xuICAgICAgICAgICAgdGhpcy5fbGluayhhciwgYmwpO1xuXG4gICAgICAgICAgICBjb25zdCBiciA9IGIwICsgKGIgKyAxKSAlIDM7XG5cbiAgICAgICAgICAgIHRoaXMuX2xlZ2FsaXplKGEpO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2xlZ2FsaXplKGJyKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBhcjtcbiAgICB9XG5cbiAgICBfbGluayhhLCBiKSB7XG4gICAgICAgIHRoaXMuaGFsZmVkZ2VzW2FdID0gYjtcbiAgICAgICAgaWYgKGIgIT09IC0xKSB0aGlzLmhhbGZlZGdlc1tiXSA9IGE7XG4gICAgfVxuXG4gICAgLy8gYWRkIGEgbmV3IHRyaWFuZ2xlIGdpdmVuIHZlcnRleCBpbmRpY2VzIGFuZCBhZGphY2VudCBoYWxmLWVkZ2UgaWRzXG4gICAgX2FkZFRyaWFuZ2xlKGkwLCBpMSwgaTIsIGEsIGIsIGMpIHtcbiAgICAgICAgY29uc3QgdCA9IHRoaXMudHJpYW5nbGVzTGVuO1xuXG4gICAgICAgIHRoaXMudHJpYW5nbGVzW3RdID0gaTA7XG4gICAgICAgIHRoaXMudHJpYW5nbGVzW3QgKyAxXSA9IGkxO1xuICAgICAgICB0aGlzLnRyaWFuZ2xlc1t0ICsgMl0gPSBpMjtcblxuICAgICAgICB0aGlzLl9saW5rKHQsIGEpO1xuICAgICAgICB0aGlzLl9saW5rKHQgKyAxLCBiKTtcbiAgICAgICAgdGhpcy5fbGluayh0ICsgMiwgYyk7XG5cbiAgICAgICAgdGhpcy50cmlhbmdsZXNMZW4gKz0gMztcblxuICAgICAgICByZXR1cm4gdDtcbiAgICB9XG59XG5cbi8vIG1vbm90b25pY2FsbHkgaW5jcmVhc2VzIHdpdGggcmVhbCBhbmdsZSwgYnV0IGRvZXNuJ3QgbmVlZCBleHBlbnNpdmUgdHJpZ29ub21ldHJ5XG5mdW5jdGlvbiBwc2V1ZG9BbmdsZShkeCwgZHkpIHtcbiAgICBjb25zdCBwID0gZHggLyAoTWF0aC5hYnMoZHgpICsgTWF0aC5hYnMoZHkpKTtcbiAgICByZXR1cm4gKGR5ID4gMCA/IDMgLSBwIDogMSArIHApIC8gNDsgLy8gWzAuLjFdXG59XG5cbmZ1bmN0aW9uIGRpc3QoYXgsIGF5LCBieCwgYnkpIHtcbiAgICBjb25zdCBkeCA9IGF4IC0gYng7XG4gICAgY29uc3QgZHkgPSBheSAtIGJ5O1xuICAgIHJldHVybiBkeCAqIGR4ICsgZHkgKiBkeTtcbn1cblxuZnVuY3Rpb24gb3JpZW50KHB4LCBweSwgcXgsIHF5LCByeCwgcnkpIHtcbiAgICByZXR1cm4gKHF5IC0gcHkpICogKHJ4IC0gcXgpIC0gKHF4IC0gcHgpICogKHJ5IC0gcXkpIDwgMDtcbn1cblxuZnVuY3Rpb24gaW5DaXJjbGUoYXgsIGF5LCBieCwgYnksIGN4LCBjeSwgcHgsIHB5KSB7XG4gICAgY29uc3QgZHggPSBheCAtIHB4O1xuICAgIGNvbnN0IGR5ID0gYXkgLSBweTtcbiAgICBjb25zdCBleCA9IGJ4IC0gcHg7XG4gICAgY29uc3QgZXkgPSBieSAtIHB5O1xuICAgIGNvbnN0IGZ4ID0gY3ggLSBweDtcbiAgICBjb25zdCBmeSA9IGN5IC0gcHk7XG5cbiAgICBjb25zdCBhcCA9IGR4ICogZHggKyBkeSAqIGR5O1xuICAgIGNvbnN0IGJwID0gZXggKiBleCArIGV5ICogZXk7XG4gICAgY29uc3QgY3AgPSBmeCAqIGZ4ICsgZnkgKiBmeTtcblxuICAgIHJldHVybiBkeCAqIChleSAqIGNwIC0gYnAgKiBmeSkgLVxuICAgICAgICAgICBkeSAqIChleCAqIGNwIC0gYnAgKiBmeCkgK1xuICAgICAgICAgICBhcCAqIChleCAqIGZ5IC0gZXkgKiBmeCkgPCAwO1xufVxuXG5mdW5jdGlvbiBjaXJjdW1yYWRpdXMoYXgsIGF5LCBieCwgYnksIGN4LCBjeSkge1xuICAgIGNvbnN0IGR4ID0gYnggLSBheDtcbiAgICBjb25zdCBkeSA9IGJ5IC0gYXk7XG4gICAgY29uc3QgZXggPSBjeCAtIGF4O1xuICAgIGNvbnN0IGV5ID0gY3kgLSBheTtcblxuICAgIGNvbnN0IGJsID0gZHggKiBkeCArIGR5ICogZHk7XG4gICAgY29uc3QgY2wgPSBleCAqIGV4ICsgZXkgKiBleTtcbiAgICBjb25zdCBkID0gZHggKiBleSAtIGR5ICogZXg7XG5cbiAgICBjb25zdCB4ID0gKGV5ICogYmwgLSBkeSAqIGNsKSAqIDAuNSAvIGQ7XG4gICAgY29uc3QgeSA9IChkeCAqIGNsIC0gZXggKiBibCkgKiAwLjUgLyBkO1xuXG4gICAgcmV0dXJuIGJsICYmIGNsICYmIGQgJiYgKHggKiB4ICsgeSAqIHkpIHx8IEluZmluaXR5O1xufVxuXG5mdW5jdGlvbiBjaXJjdW1jZW50ZXIoYXgsIGF5LCBieCwgYnksIGN4LCBjeSkge1xuICAgIGNvbnN0IGR4ID0gYnggLSBheDtcbiAgICBjb25zdCBkeSA9IGJ5IC0gYXk7XG4gICAgY29uc3QgZXggPSBjeCAtIGF4O1xuICAgIGNvbnN0IGV5ID0gY3kgLSBheTtcblxuICAgIGNvbnN0IGJsID0gZHggKiBkeCArIGR5ICogZHk7XG4gICAgY29uc3QgY2wgPSBleCAqIGV4ICsgZXkgKiBleTtcbiAgICBjb25zdCBkID0gZHggKiBleSAtIGR5ICogZXg7XG5cbiAgICBjb25zdCB4ID0gYXggKyAoZXkgKiBibCAtIGR5ICogY2wpICogMC41IC8gZDtcbiAgICBjb25zdCB5ID0gYXkgKyAoZHggKiBjbCAtIGV4ICogYmwpICogMC41IC8gZDtcblxuICAgIHJldHVybiB7eCwgeX07XG59XG5cbi8vIGNyZWF0ZSBhIG5ldyBub2RlIGluIGEgZG91Ymx5IGxpbmtlZCBsaXN0XG5mdW5jdGlvbiBpbnNlcnROb2RlKGNvb3JkcywgaSwgcHJldikge1xuICAgIGNvbnN0IG5vZGUgPSB7XG4gICAgICAgIGksXG4gICAgICAgIHg6IGNvb3Jkc1syICogaV0sXG4gICAgICAgIHk6IGNvb3Jkc1syICogaSArIDFdLFxuICAgICAgICB0OiAwLFxuICAgICAgICBwcmV2OiBudWxsLFxuICAgICAgICBuZXh0OiBudWxsLFxuICAgICAgICByZW1vdmVkOiBmYWxzZVxuICAgIH07XG5cbiAgICBpZiAoIXByZXYpIHtcbiAgICAgICAgbm9kZS5wcmV2ID0gbm9kZTtcbiAgICAgICAgbm9kZS5uZXh0ID0gbm9kZTtcblxuICAgIH0gZWxzZSB7XG4gICAgICAgIG5vZGUubmV4dCA9IHByZXYubmV4dDtcbiAgICAgICAgbm9kZS5wcmV2ID0gcHJldjtcbiAgICAgICAgcHJldi5uZXh0LnByZXYgPSBub2RlO1xuICAgICAgICBwcmV2Lm5leHQgPSBub2RlO1xuICAgIH1cbiAgICByZXR1cm4gbm9kZTtcbn1cblxuZnVuY3Rpb24gcmVtb3ZlTm9kZShub2RlKSB7XG4gICAgbm9kZS5wcmV2Lm5leHQgPSBub2RlLm5leHQ7XG4gICAgbm9kZS5uZXh0LnByZXYgPSBub2RlLnByZXY7XG4gICAgbm9kZS5yZW1vdmVkID0gdHJ1ZTtcbiAgICByZXR1cm4gbm9kZS5wcmV2O1xufVxuXG5mdW5jdGlvbiBxdWlja3NvcnQoaWRzLCBjb29yZHMsIGxlZnQsIHJpZ2h0LCBjeCwgY3kpIHtcbiAgICBsZXQgaSwgaiwgdGVtcDtcblxuICAgIGlmIChyaWdodCAtIGxlZnQgPD0gMjApIHtcbiAgICAgICAgZm9yIChpID0gbGVmdCArIDE7IGkgPD0gcmlnaHQ7IGkrKykge1xuICAgICAgICAgICAgdGVtcCA9IGlkc1tpXTtcbiAgICAgICAgICAgIGogPSBpIC0gMTtcbiAgICAgICAgICAgIHdoaWxlIChqID49IGxlZnQgJiYgY29tcGFyZShjb29yZHMsIGlkc1tqXSwgdGVtcCwgY3gsIGN5KSA+IDApIGlkc1tqICsgMV0gPSBpZHNbai0tXTtcbiAgICAgICAgICAgIGlkc1tqICsgMV0gPSB0ZW1wO1xuICAgICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgICAgY29uc3QgbWVkaWFuID0gKGxlZnQgKyByaWdodCkgPj4gMTtcbiAgICAgICAgaSA9IGxlZnQgKyAxO1xuICAgICAgICBqID0gcmlnaHQ7XG4gICAgICAgIHN3YXAoaWRzLCBtZWRpYW4sIGkpO1xuICAgICAgICBpZiAoY29tcGFyZShjb29yZHMsIGlkc1tsZWZ0XSwgaWRzW3JpZ2h0XSwgY3gsIGN5KSA+IDApIHN3YXAoaWRzLCBsZWZ0LCByaWdodCk7XG4gICAgICAgIGlmIChjb21wYXJlKGNvb3JkcywgaWRzW2ldLCBpZHNbcmlnaHRdLCBjeCwgY3kpID4gMCkgc3dhcChpZHMsIGksIHJpZ2h0KTtcbiAgICAgICAgaWYgKGNvbXBhcmUoY29vcmRzLCBpZHNbbGVmdF0sIGlkc1tpXSwgY3gsIGN5KSA+IDApIHN3YXAoaWRzLCBsZWZ0LCBpKTtcblxuICAgICAgICB0ZW1wID0gaWRzW2ldO1xuICAgICAgICB3aGlsZSAodHJ1ZSkge1xuICAgICAgICAgICAgZG8gaSsrOyB3aGlsZSAoY29tcGFyZShjb29yZHMsIGlkc1tpXSwgdGVtcCwgY3gsIGN5KSA8IDApO1xuICAgICAgICAgICAgZG8gai0tOyB3aGlsZSAoY29tcGFyZShjb29yZHMsIGlkc1tqXSwgdGVtcCwgY3gsIGN5KSA+IDApO1xuICAgICAgICAgICAgaWYgKGogPCBpKSBicmVhaztcbiAgICAgICAgICAgIHN3YXAoaWRzLCBpLCBqKTtcbiAgICAgICAgfVxuICAgICAgICBpZHNbbGVmdCArIDFdID0gaWRzW2pdO1xuICAgICAgICBpZHNbal0gPSB0ZW1wO1xuXG4gICAgICAgIGlmIChyaWdodCAtIGkgKyAxID49IGogLSBsZWZ0KSB7XG4gICAgICAgICAgICBxdWlja3NvcnQoaWRzLCBjb29yZHMsIGksIHJpZ2h0LCBjeCwgY3kpO1xuICAgICAgICAgICAgcXVpY2tzb3J0KGlkcywgY29vcmRzLCBsZWZ0LCBqIC0gMSwgY3gsIGN5KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHF1aWNrc29ydChpZHMsIGNvb3JkcywgbGVmdCwgaiAtIDEsIGN4LCBjeSk7XG4gICAgICAgICAgICBxdWlja3NvcnQoaWRzLCBjb29yZHMsIGksIHJpZ2h0LCBjeCwgY3kpO1xuICAgICAgICB9XG4gICAgfVxufVxuXG5mdW5jdGlvbiBjb21wYXJlKGNvb3JkcywgaSwgaiwgY3gsIGN5KSB7XG4gICAgY29uc3QgZDEgPSBkaXN0KGNvb3Jkc1syICogaV0sIGNvb3Jkc1syICogaSArIDFdLCBjeCwgY3kpO1xuICAgIGNvbnN0IGQyID0gZGlzdChjb29yZHNbMiAqIGpdLCBjb29yZHNbMiAqIGogKyAxXSwgY3gsIGN5KTtcbiAgICByZXR1cm4gKGQxIC0gZDIpIHx8IChjb29yZHNbMiAqIGldIC0gY29vcmRzWzIgKiBqXSkgfHwgKGNvb3Jkc1syICogaSArIDFdIC0gY29vcmRzWzIgKiBqICsgMV0pO1xufVxuXG5mdW5jdGlvbiBzd2FwKGFyciwgaSwgaikge1xuICAgIGNvbnN0IHRtcCA9IGFycltpXTtcbiAgICBhcnJbaV0gPSBhcnJbal07XG4gICAgYXJyW2pdID0gdG1wO1xufVxuXG5mdW5jdGlvbiBkZWZhdWx0R2V0WChwKSB7XG4gICAgcmV0dXJuIHBbMF07XG59XG5mdW5jdGlvbiBkZWZhdWx0R2V0WShwKSB7XG4gICAgcmV0dXJuIHBbMV07XG59XG4iLCIoZnVuY3Rpb24oYSxiKXtpZihcImZ1bmN0aW9uXCI9PXR5cGVvZiBkZWZpbmUmJmRlZmluZS5hbWQpZGVmaW5lKFtdLGIpO2Vsc2UgaWYoXCJ1bmRlZmluZWRcIiE9dHlwZW9mIGV4cG9ydHMpYigpO2Vsc2V7YigpLGEuRmlsZVNhdmVyPXtleHBvcnRzOnt9fS5leHBvcnRzfX0pKHRoaXMsZnVuY3Rpb24oKXtcInVzZSBzdHJpY3RcIjtmdW5jdGlvbiBiKGEsYil7cmV0dXJuXCJ1bmRlZmluZWRcIj09dHlwZW9mIGI/Yj17YXV0b0JvbTohMX06XCJvYmplY3RcIiE9dHlwZW9mIGImJihjb25zb2xlLndhcm4oXCJEZXByZWNhdGVkOiBFeHBlY3RlZCB0aGlyZCBhcmd1bWVudCB0byBiZSBhIG9iamVjdFwiKSxiPXthdXRvQm9tOiFifSksYi5hdXRvQm9tJiYvXlxccyooPzp0ZXh0XFwvXFxTKnxhcHBsaWNhdGlvblxcL3htbHxcXFMqXFwvXFxTKlxcK3htbClcXHMqOy4qY2hhcnNldFxccyo9XFxzKnV0Zi04L2kudGVzdChhLnR5cGUpP25ldyBCbG9iKFtcIlxcdUZFRkZcIixhXSx7dHlwZTphLnR5cGV9KTphfWZ1bmN0aW9uIGMoYixjLGQpe3ZhciBlPW5ldyBYTUxIdHRwUmVxdWVzdDtlLm9wZW4oXCJHRVRcIixiKSxlLnJlc3BvbnNlVHlwZT1cImJsb2JcIixlLm9ubG9hZD1mdW5jdGlvbigpe2EoZS5yZXNwb25zZSxjLGQpfSxlLm9uZXJyb3I9ZnVuY3Rpb24oKXtjb25zb2xlLmVycm9yKFwiY291bGQgbm90IGRvd25sb2FkIGZpbGVcIil9LGUuc2VuZCgpfWZ1bmN0aW9uIGQoYSl7dmFyIGI9bmV3IFhNTEh0dHBSZXF1ZXN0O3JldHVybiBiLm9wZW4oXCJIRUFEXCIsYSwhMSksYi5zZW5kKCksMjAwPD1iLnN0YXR1cyYmMjk5Pj1iLnN0YXR1c31mdW5jdGlvbiBlKGEpe3RyeXthLmRpc3BhdGNoRXZlbnQobmV3IE1vdXNlRXZlbnQoXCJjbGlja1wiKSl9Y2F0Y2goYyl7dmFyIGI9ZG9jdW1lbnQuY3JlYXRlRXZlbnQoXCJNb3VzZUV2ZW50c1wiKTtiLmluaXRNb3VzZUV2ZW50KFwiY2xpY2tcIiwhMCwhMCx3aW5kb3csMCwwLDAsODAsMjAsITEsITEsITEsITEsMCxudWxsKSxhLmRpc3BhdGNoRXZlbnQoYil9fXZhciBmPVwib2JqZWN0XCI9PXR5cGVvZiB3aW5kb3cmJndpbmRvdy53aW5kb3c9PT13aW5kb3c/d2luZG93Olwib2JqZWN0XCI9PXR5cGVvZiBzZWxmJiZzZWxmLnNlbGY9PT1zZWxmP3NlbGY6XCJvYmplY3RcIj09dHlwZW9mIGdsb2JhbCYmZ2xvYmFsLmdsb2JhbD09PWdsb2JhbD9nbG9iYWw6dm9pZCAwLGE9Zi5zYXZlQXN8fChcIm9iamVjdFwiIT10eXBlb2Ygd2luZG93fHx3aW5kb3chPT1mP2Z1bmN0aW9uKCl7fTpcImRvd25sb2FkXCJpbiBIVE1MQW5jaG9yRWxlbWVudC5wcm90b3R5cGU/ZnVuY3Rpb24oYixnLGgpe3ZhciBpPWYuVVJMfHxmLndlYmtpdFVSTCxqPWRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJhXCIpO2c9Z3x8Yi5uYW1lfHxcImRvd25sb2FkXCIsai5kb3dubG9hZD1nLGoucmVsPVwibm9vcGVuZXJcIixcInN0cmluZ1wiPT10eXBlb2YgYj8oai5ocmVmPWIsai5vcmlnaW49PT1sb2NhdGlvbi5vcmlnaW4/ZShqKTpkKGouaHJlZik/YyhiLGcsaCk6ZShqLGoudGFyZ2V0PVwiX2JsYW5rXCIpKTooai5ocmVmPWkuY3JlYXRlT2JqZWN0VVJMKGIpLHNldFRpbWVvdXQoZnVuY3Rpb24oKXtpLnJldm9rZU9iamVjdFVSTChqLmhyZWYpfSw0RTQpLHNldFRpbWVvdXQoZnVuY3Rpb24oKXtlKGopfSwwKSl9OlwibXNTYXZlT3JPcGVuQmxvYlwiaW4gbmF2aWdhdG9yP2Z1bmN0aW9uKGYsZyxoKXtpZihnPWd8fGYubmFtZXx8XCJkb3dubG9hZFwiLFwic3RyaW5nXCIhPXR5cGVvZiBmKW5hdmlnYXRvci5tc1NhdmVPck9wZW5CbG9iKGIoZixoKSxnKTtlbHNlIGlmKGQoZikpYyhmLGcsaCk7ZWxzZXt2YXIgaT1kb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYVwiKTtpLmhyZWY9ZixpLnRhcmdldD1cIl9ibGFua1wiLHNldFRpbWVvdXQoZnVuY3Rpb24oKXtlKGkpfSl9fTpmdW5jdGlvbihhLGIsZCxlKXtpZihlPWV8fG9wZW4oXCJcIixcIl9ibGFua1wiKSxlJiYoZS5kb2N1bWVudC50aXRsZT1lLmRvY3VtZW50LmJvZHkuaW5uZXJUZXh0PVwiZG93bmxvYWRpbmcuLi5cIiksXCJzdHJpbmdcIj09dHlwZW9mIGEpcmV0dXJuIGMoYSxiLGQpO3ZhciBnPVwiYXBwbGljYXRpb24vb2N0ZXQtc3RyZWFtXCI9PT1hLnR5cGUsaD0vY29uc3RydWN0b3IvaS50ZXN0KGYuSFRNTEVsZW1lbnQpfHxmLnNhZmFyaSxpPS9DcmlPU1xcL1tcXGRdKy8udGVzdChuYXZpZ2F0b3IudXNlckFnZW50KTtpZigoaXx8ZyYmaCkmJlwib2JqZWN0XCI9PXR5cGVvZiBGaWxlUmVhZGVyKXt2YXIgaj1uZXcgRmlsZVJlYWRlcjtqLm9ubG9hZGVuZD1mdW5jdGlvbigpe3ZhciBhPWoucmVzdWx0O2E9aT9hOmEucmVwbGFjZSgvXmRhdGE6W147XSo7LyxcImRhdGE6YXR0YWNobWVudC9maWxlO1wiKSxlP2UubG9jYXRpb24uaHJlZj1hOmxvY2F0aW9uPWEsZT1udWxsfSxqLnJlYWRBc0RhdGFVUkwoYSl9ZWxzZXt2YXIgaz1mLlVSTHx8Zi53ZWJraXRVUkwsbD1rLmNyZWF0ZU9iamVjdFVSTChhKTtlP2UubG9jYXRpb249bDpsb2NhdGlvbi5ocmVmPWwsZT1udWxsLHNldFRpbWVvdXQoZnVuY3Rpb24oKXtrLnJldm9rZU9iamVjdFVSTChsKX0sNEU0KX19KTtmLnNhdmVBcz1hLnNhdmVBcz1hLFwidW5kZWZpbmVkXCIhPXR5cGVvZiBtb2R1bGUmJihtb2R1bGUuZXhwb3J0cz1hKX0pO1xuXG4vLyMgc291cmNlTWFwcGluZ1VSTD1GaWxlU2F2ZXIubWluLmpzLm1hcCIsImltcG9ydCB0b1BhdGggZnJvbSAnLi90b1BhdGgnO1xuaW1wb3J0IHRvUG9pbnRzIGZyb20gJy4vdG9Qb2ludHMnO1xuaW1wb3J0IHZhbGlkIGZyb20gJy4vdmFsaWQnO1xuXG5leHBvcnQgeyB0b1BhdGgsIHRvUG9pbnRzLCB2YWxpZCB9OyIsImltcG9ydCB0b1BvaW50cyBmcm9tICcuL3RvUG9pbnRzJztcblxudmFyIHBvaW50c1RvRCA9IGZ1bmN0aW9uIHBvaW50c1RvRChwKSB7XG4gIHZhciBkID0gJyc7XG4gIHZhciBpID0gMDtcbiAgdmFyIGZpcnN0UG9pbnQgPSB2b2lkIDA7XG5cbiAgdmFyIF9pdGVyYXRvck5vcm1hbENvbXBsZXRpb24gPSB0cnVlO1xuICB2YXIgX2RpZEl0ZXJhdG9yRXJyb3IgPSBmYWxzZTtcbiAgdmFyIF9pdGVyYXRvckVycm9yID0gdW5kZWZpbmVkO1xuXG4gIHRyeSB7XG4gICAgZm9yICh2YXIgX2l0ZXJhdG9yID0gcFtTeW1ib2wuaXRlcmF0b3JdKCksIF9zdGVwOyAhKF9pdGVyYXRvck5vcm1hbENvbXBsZXRpb24gPSAoX3N0ZXAgPSBfaXRlcmF0b3IubmV4dCgpKS5kb25lKTsgX2l0ZXJhdG9yTm9ybWFsQ29tcGxldGlvbiA9IHRydWUpIHtcbiAgICAgIHZhciBwb2ludCA9IF9zdGVwLnZhbHVlO1xuICAgICAgdmFyIF9wb2ludCRjdXJ2ZSA9IHBvaW50LmN1cnZlLFxuICAgICAgICAgIGN1cnZlID0gX3BvaW50JGN1cnZlID09PSB1bmRlZmluZWQgPyBmYWxzZSA6IF9wb2ludCRjdXJ2ZSxcbiAgICAgICAgICBtb3ZlVG8gPSBwb2ludC5tb3ZlVG8sXG4gICAgICAgICAgeCA9IHBvaW50LngsXG4gICAgICAgICAgeSA9IHBvaW50Lnk7XG5cbiAgICAgIHZhciBpc0ZpcnN0UG9pbnQgPSBpID09PSAwIHx8IG1vdmVUbztcbiAgICAgIHZhciBpc0xhc3RQb2ludCA9IGkgPT09IHAubGVuZ3RoIC0gMSB8fCBwW2kgKyAxXS5tb3ZlVG87XG4gICAgICB2YXIgcHJldlBvaW50ID0gaSA9PT0gMCA/IG51bGwgOiBwW2kgLSAxXTtcblxuICAgICAgaWYgKGlzRmlyc3RQb2ludCkge1xuICAgICAgICBmaXJzdFBvaW50ID0gcG9pbnQ7XG5cbiAgICAgICAgaWYgKCFpc0xhc3RQb2ludCkge1xuICAgICAgICAgIGQgKz0gJ00nICsgeCArICcsJyArIHk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAoY3VydmUpIHtcbiAgICAgICAgc3dpdGNoIChjdXJ2ZS50eXBlKSB7XG4gICAgICAgICAgY2FzZSAnYXJjJzpcbiAgICAgICAgICAgIHZhciBfcG9pbnQkY3VydmUyID0gcG9pbnQuY3VydmUsXG4gICAgICAgICAgICAgICAgX3BvaW50JGN1cnZlMiRsYXJnZUFyID0gX3BvaW50JGN1cnZlMi5sYXJnZUFyY0ZsYWcsXG4gICAgICAgICAgICAgICAgbGFyZ2VBcmNGbGFnID0gX3BvaW50JGN1cnZlMiRsYXJnZUFyID09PSB1bmRlZmluZWQgPyAwIDogX3BvaW50JGN1cnZlMiRsYXJnZUFyLFxuICAgICAgICAgICAgICAgIHJ4ID0gX3BvaW50JGN1cnZlMi5yeCxcbiAgICAgICAgICAgICAgICByeSA9IF9wb2ludCRjdXJ2ZTIucnksXG4gICAgICAgICAgICAgICAgX3BvaW50JGN1cnZlMiRzd2VlcEZsID0gX3BvaW50JGN1cnZlMi5zd2VlcEZsYWcsXG4gICAgICAgICAgICAgICAgc3dlZXBGbGFnID0gX3BvaW50JGN1cnZlMiRzd2VlcEZsID09PSB1bmRlZmluZWQgPyAwIDogX3BvaW50JGN1cnZlMiRzd2VlcEZsLFxuICAgICAgICAgICAgICAgIF9wb2ludCRjdXJ2ZTIkeEF4aXNSbyA9IF9wb2ludCRjdXJ2ZTIueEF4aXNSb3RhdGlvbixcbiAgICAgICAgICAgICAgICB4QXhpc1JvdGF0aW9uID0gX3BvaW50JGN1cnZlMiR4QXhpc1JvID09PSB1bmRlZmluZWQgPyAwIDogX3BvaW50JGN1cnZlMiR4QXhpc1JvO1xuXG4gICAgICAgICAgICBkICs9ICdBJyArIHJ4ICsgJywnICsgcnkgKyAnLCcgKyB4QXhpc1JvdGF0aW9uICsgJywnICsgbGFyZ2VBcmNGbGFnICsgJywnICsgc3dlZXBGbGFnICsgJywnICsgeCArICcsJyArIHk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBjYXNlICdjdWJpYyc6XG4gICAgICAgICAgICB2YXIgX3BvaW50JGN1cnZlMyA9IHBvaW50LmN1cnZlLFxuICAgICAgICAgICAgICAgIGN4MSA9IF9wb2ludCRjdXJ2ZTMueDEsXG4gICAgICAgICAgICAgICAgY3kxID0gX3BvaW50JGN1cnZlMy55MSxcbiAgICAgICAgICAgICAgICBjeDIgPSBfcG9pbnQkY3VydmUzLngyLFxuICAgICAgICAgICAgICAgIGN5MiA9IF9wb2ludCRjdXJ2ZTMueTI7XG5cbiAgICAgICAgICAgIGQgKz0gJ0MnICsgY3gxICsgJywnICsgY3kxICsgJywnICsgY3gyICsgJywnICsgY3kyICsgJywnICsgeCArICcsJyArIHk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBjYXNlICdxdWFkcmF0aWMnOlxuICAgICAgICAgICAgdmFyIF9wb2ludCRjdXJ2ZTQgPSBwb2ludC5jdXJ2ZSxcbiAgICAgICAgICAgICAgICBxeDEgPSBfcG9pbnQkY3VydmU0LngxLFxuICAgICAgICAgICAgICAgIHF5MSA9IF9wb2ludCRjdXJ2ZTQueTE7XG5cbiAgICAgICAgICAgIGQgKz0gJ1EnICsgcXgxICsgJywnICsgcXkxICsgJywnICsgeCArICcsJyArIHk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChpc0xhc3RQb2ludCAmJiB4ID09PSBmaXJzdFBvaW50LnggJiYgeSA9PT0gZmlyc3RQb2ludC55KSB7XG4gICAgICAgICAgZCArPSAnWic7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAoaXNMYXN0UG9pbnQgJiYgeCA9PT0gZmlyc3RQb2ludC54ICYmIHkgPT09IGZpcnN0UG9pbnQueSkge1xuICAgICAgICBkICs9ICdaJztcbiAgICAgIH0gZWxzZSBpZiAoeCAhPT0gcHJldlBvaW50LnggJiYgeSAhPT0gcHJldlBvaW50LnkpIHtcbiAgICAgICAgZCArPSAnTCcgKyB4ICsgJywnICsgeTtcbiAgICAgIH0gZWxzZSBpZiAoeCAhPT0gcHJldlBvaW50LngpIHtcbiAgICAgICAgZCArPSAnSCcgKyB4O1xuICAgICAgfSBlbHNlIGlmICh5ICE9PSBwcmV2UG9pbnQueSkge1xuICAgICAgICBkICs9ICdWJyArIHk7XG4gICAgICB9XG5cbiAgICAgIGkrKztcbiAgICB9XG4gIH0gY2F0Y2ggKGVycikge1xuICAgIF9kaWRJdGVyYXRvckVycm9yID0gdHJ1ZTtcbiAgICBfaXRlcmF0b3JFcnJvciA9IGVycjtcbiAgfSBmaW5hbGx5IHtcbiAgICB0cnkge1xuICAgICAgaWYgKCFfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uICYmIF9pdGVyYXRvci5yZXR1cm4pIHtcbiAgICAgICAgX2l0ZXJhdG9yLnJldHVybigpO1xuICAgICAgfVxuICAgIH0gZmluYWxseSB7XG4gICAgICBpZiAoX2RpZEl0ZXJhdG9yRXJyb3IpIHtcbiAgICAgICAgdGhyb3cgX2l0ZXJhdG9yRXJyb3I7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGQ7XG59O1xuXG52YXIgdG9QYXRoID0gZnVuY3Rpb24gdG9QYXRoKHMpIHtcbiAgdmFyIGlzUG9pbnRzID0gQXJyYXkuaXNBcnJheShzKTtcbiAgdmFyIGlzR3JvdXAgPSBpc1BvaW50cyA/IEFycmF5LmlzQXJyYXkoc1swXSkgOiBzLnR5cGUgPT09ICdnJztcbiAgdmFyIHBvaW50cyA9IGlzUG9pbnRzID8gcyA6IGlzR3JvdXAgPyBzLnNoYXBlcy5tYXAoZnVuY3Rpb24gKHNocCkge1xuICAgIHJldHVybiB0b1BvaW50cyhzaHApO1xuICB9KSA6IHRvUG9pbnRzKHMpO1xuXG4gIGlmIChpc0dyb3VwKSB7XG4gICAgcmV0dXJuIHBvaW50cy5tYXAoZnVuY3Rpb24gKHApIHtcbiAgICAgIHJldHVybiBwb2ludHNUb0QocCk7XG4gICAgfSk7XG4gIH1cblxuICByZXR1cm4gcG9pbnRzVG9EKHBvaW50cyk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCB0b1BhdGg7IiwidmFyIF9leHRlbmRzID0gT2JqZWN0LmFzc2lnbiB8fCBmdW5jdGlvbiAodGFyZ2V0KSB7IGZvciAodmFyIGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7IHZhciBzb3VyY2UgPSBhcmd1bWVudHNbaV07IGZvciAodmFyIGtleSBpbiBzb3VyY2UpIHsgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzb3VyY2UsIGtleSkpIHsgdGFyZ2V0W2tleV0gPSBzb3VyY2Vba2V5XTsgfSB9IH0gcmV0dXJuIHRhcmdldDsgfTtcblxuZnVuY3Rpb24gX29iamVjdFdpdGhvdXRQcm9wZXJ0aWVzKG9iaiwga2V5cykgeyB2YXIgdGFyZ2V0ID0ge307IGZvciAodmFyIGkgaW4gb2JqKSB7IGlmIChrZXlzLmluZGV4T2YoaSkgPj0gMCkgY29udGludWU7IGlmICghT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgaSkpIGNvbnRpbnVlOyB0YXJnZXRbaV0gPSBvYmpbaV07IH0gcmV0dXJuIHRhcmdldDsgfVxuXG52YXIgdG9Qb2ludHMgPSBmdW5jdGlvbiB0b1BvaW50cyhfcmVmKSB7XG4gIHZhciB0eXBlID0gX3JlZi50eXBlLFxuICAgICAgcHJvcHMgPSBfb2JqZWN0V2l0aG91dFByb3BlcnRpZXMoX3JlZiwgWyd0eXBlJ10pO1xuXG4gIHN3aXRjaCAodHlwZSkge1xuICAgIGNhc2UgJ2NpcmNsZSc6XG4gICAgICByZXR1cm4gZ2V0UG9pbnRzRnJvbUNpcmNsZShwcm9wcyk7XG4gICAgY2FzZSAnZWxsaXBzZSc6XG4gICAgICByZXR1cm4gZ2V0UG9pbnRzRnJvbUVsbGlwc2UocHJvcHMpO1xuICAgIGNhc2UgJ2xpbmUnOlxuICAgICAgcmV0dXJuIGdldFBvaW50c0Zyb21MaW5lKHByb3BzKTtcbiAgICBjYXNlICdwYXRoJzpcbiAgICAgIHJldHVybiBnZXRQb2ludHNGcm9tUGF0aChwcm9wcyk7XG4gICAgY2FzZSAncG9seWdvbic6XG4gICAgICByZXR1cm4gZ2V0UG9pbnRzRnJvbVBvbHlnb24ocHJvcHMpO1xuICAgIGNhc2UgJ3BvbHlsaW5lJzpcbiAgICAgIHJldHVybiBnZXRQb2ludHNGcm9tUG9seWxpbmUocHJvcHMpO1xuICAgIGNhc2UgJ3JlY3QnOlxuICAgICAgcmV0dXJuIGdldFBvaW50c0Zyb21SZWN0KHByb3BzKTtcbiAgICBjYXNlICdnJzpcbiAgICAgIHJldHVybiBnZXRQb2ludHNGcm9tRyhwcm9wcyk7XG4gICAgZGVmYXVsdDpcbiAgICAgIHRocm93IG5ldyBFcnJvcignTm90IGEgdmFsaWQgc2hhcGUgdHlwZScpO1xuICB9XG59O1xuXG52YXIgZ2V0UG9pbnRzRnJvbUNpcmNsZSA9IGZ1bmN0aW9uIGdldFBvaW50c0Zyb21DaXJjbGUoX3JlZjIpIHtcbiAgdmFyIGN4ID0gX3JlZjIuY3gsXG4gICAgICBjeSA9IF9yZWYyLmN5LFxuICAgICAgciA9IF9yZWYyLnI7XG5cbiAgcmV0dXJuIFt7IHg6IGN4LCB5OiBjeSAtIHIsIG1vdmVUbzogdHJ1ZSB9LCB7IHg6IGN4LCB5OiBjeSArIHIsIGN1cnZlOiB7IHR5cGU6ICdhcmMnLCByeDogciwgcnk6IHIsIHN3ZWVwRmxhZzogMSB9IH0sIHsgeDogY3gsIHk6IGN5IC0gciwgY3VydmU6IHsgdHlwZTogJ2FyYycsIHJ4OiByLCByeTogciwgc3dlZXBGbGFnOiAxIH0gfV07XG59O1xuXG52YXIgZ2V0UG9pbnRzRnJvbUVsbGlwc2UgPSBmdW5jdGlvbiBnZXRQb2ludHNGcm9tRWxsaXBzZShfcmVmMykge1xuICB2YXIgY3ggPSBfcmVmMy5jeCxcbiAgICAgIGN5ID0gX3JlZjMuY3ksXG4gICAgICByeCA9IF9yZWYzLnJ4LFxuICAgICAgcnkgPSBfcmVmMy5yeTtcblxuICByZXR1cm4gW3sgeDogY3gsIHk6IGN5IC0gcnksIG1vdmVUbzogdHJ1ZSB9LCB7IHg6IGN4LCB5OiBjeSArIHJ5LCBjdXJ2ZTogeyB0eXBlOiAnYXJjJywgcng6IHJ4LCByeTogcnksIHN3ZWVwRmxhZzogMSB9IH0sIHsgeDogY3gsIHk6IGN5IC0gcnksIGN1cnZlOiB7IHR5cGU6ICdhcmMnLCByeDogcngsIHJ5OiByeSwgc3dlZXBGbGFnOiAxIH0gfV07XG59O1xuXG52YXIgZ2V0UG9pbnRzRnJvbUxpbmUgPSBmdW5jdGlvbiBnZXRQb2ludHNGcm9tTGluZShfcmVmNCkge1xuICB2YXIgeDEgPSBfcmVmNC54MSxcbiAgICAgIHgyID0gX3JlZjQueDIsXG4gICAgICB5MSA9IF9yZWY0LnkxLFxuICAgICAgeTIgPSBfcmVmNC55MjtcblxuICByZXR1cm4gW3sgeDogeDEsIHk6IHkxLCBtb3ZlVG86IHRydWUgfSwgeyB4OiB4MiwgeTogeTIgfV07XG59O1xuXG52YXIgdmFsaWRDb21tYW5kcyA9IC9bTW1MbEhoVnZDY1NzUXFUdEFhWnpdL2c7XG5cbnZhciBjb21tYW5kTGVuZ3RocyA9IHtcbiAgQTogNyxcbiAgQzogNixcbiAgSDogMSxcbiAgTDogMixcbiAgTTogMixcbiAgUTogNCxcbiAgUzogNCxcbiAgVDogMixcbiAgVjogMSxcbiAgWjogMFxufTtcblxudmFyIHJlbGF0aXZlQ29tbWFuZHMgPSBbJ2EnLCAnYycsICdoJywgJ2wnLCAnbScsICdxJywgJ3MnLCAndCcsICd2J107XG5cbnZhciBpc1JlbGF0aXZlID0gZnVuY3Rpb24gaXNSZWxhdGl2ZShjb21tYW5kKSB7XG4gIHJldHVybiByZWxhdGl2ZUNvbW1hbmRzLmluZGV4T2YoY29tbWFuZCkgIT09IC0xO1xufTtcblxudmFyIG9wdGlvbmFsQXJjS2V5cyA9IFsneEF4aXNSb3RhdGlvbicsICdsYXJnZUFyY0ZsYWcnLCAnc3dlZXBGbGFnJ107XG5cbnZhciBnZXRDb21tYW5kcyA9IGZ1bmN0aW9uIGdldENvbW1hbmRzKGQpIHtcbiAgcmV0dXJuIGQubWF0Y2godmFsaWRDb21tYW5kcyk7XG59O1xuXG52YXIgZ2V0UGFyYW1zID0gZnVuY3Rpb24gZ2V0UGFyYW1zKGQpIHtcbiAgcmV0dXJuIGQuc3BsaXQodmFsaWRDb21tYW5kcykubWFwKGZ1bmN0aW9uICh2KSB7XG4gICAgcmV0dXJuIHYucmVwbGFjZSgvWzAtOV0rLS9nLCBmdW5jdGlvbiAobSkge1xuICAgICAgcmV0dXJuIG0uc2xpY2UoMCwgLTEpICsgJyAtJztcbiAgICB9KTtcbiAgfSkubWFwKGZ1bmN0aW9uICh2KSB7XG4gICAgcmV0dXJuIHYucmVwbGFjZSgvXFwuWzAtOV0rL2csIGZ1bmN0aW9uIChtKSB7XG4gICAgICByZXR1cm4gbSArICcgJztcbiAgICB9KTtcbiAgfSkubWFwKGZ1bmN0aW9uICh2KSB7XG4gICAgcmV0dXJuIHYudHJpbSgpO1xuICB9KS5maWx0ZXIoZnVuY3Rpb24gKHYpIHtcbiAgICByZXR1cm4gdi5sZW5ndGggPiAwO1xuICB9KS5tYXAoZnVuY3Rpb24gKHYpIHtcbiAgICByZXR1cm4gdi5zcGxpdCgvWyAsXSsvKS5tYXAocGFyc2VGbG9hdCkuZmlsdGVyKGZ1bmN0aW9uIChuKSB7XG4gICAgICByZXR1cm4gIWlzTmFOKG4pO1xuICAgIH0pO1xuICB9KTtcbn07XG5cbnZhciBnZXRQb2ludHNGcm9tUGF0aCA9IGZ1bmN0aW9uIGdldFBvaW50c0Zyb21QYXRoKF9yZWY1KSB7XG4gIHZhciBkID0gX3JlZjUuZDtcblxuICB2YXIgY29tbWFuZHMgPSBnZXRDb21tYW5kcyhkKTtcbiAgdmFyIHBhcmFtcyA9IGdldFBhcmFtcyhkKTtcblxuICB2YXIgcG9pbnRzID0gW107XG5cbiAgdmFyIG1vdmVUbyA9IHZvaWQgMDtcblxuICBmb3IgKHZhciBpID0gMCwgbCA9IGNvbW1hbmRzLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgIHZhciBjb21tYW5kID0gY29tbWFuZHNbaV07XG4gICAgdmFyIHVwcGVyQ2FzZUNvbW1hbmQgPSBjb21tYW5kLnRvVXBwZXJDYXNlKCk7XG4gICAgdmFyIGNvbW1hbmRMZW5ndGggPSBjb21tYW5kTGVuZ3Roc1t1cHBlckNhc2VDb21tYW5kXTtcbiAgICB2YXIgcmVsYXRpdmUgPSBpc1JlbGF0aXZlKGNvbW1hbmQpO1xuXG4gICAgaWYgKGNvbW1hbmRMZW5ndGggPiAwKSB7XG4gICAgICB2YXIgY29tbWFuZFBhcmFtcyA9IHBhcmFtcy5zaGlmdCgpO1xuICAgICAgdmFyIGl0ZXJhdGlvbnMgPSBjb21tYW5kUGFyYW1zLmxlbmd0aCAvIGNvbW1hbmRMZW5ndGg7XG5cbiAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgaXRlcmF0aW9uczsgaisrKSB7XG4gICAgICAgIHZhciBwcmV2UG9pbnQgPSBwb2ludHNbcG9pbnRzLmxlbmd0aCAtIDFdIHx8IHsgeDogMCwgeTogMCB9O1xuXG4gICAgICAgIHN3aXRjaCAodXBwZXJDYXNlQ29tbWFuZCkge1xuICAgICAgICAgIGNhc2UgJ00nOlxuICAgICAgICAgICAgdmFyIHggPSAocmVsYXRpdmUgPyBwcmV2UG9pbnQueCA6IDApICsgY29tbWFuZFBhcmFtcy5zaGlmdCgpO1xuICAgICAgICAgICAgdmFyIHkgPSAocmVsYXRpdmUgPyBwcmV2UG9pbnQueSA6IDApICsgY29tbWFuZFBhcmFtcy5zaGlmdCgpO1xuXG4gICAgICAgICAgICBpZiAoaiA9PT0gMCkge1xuICAgICAgICAgICAgICBtb3ZlVG8gPSB7IHg6IHgsIHk6IHkgfTtcbiAgICAgICAgICAgICAgcG9pbnRzLnB1c2goeyB4OiB4LCB5OiB5LCBtb3ZlVG86IHRydWUgfSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBwb2ludHMucHVzaCh7IHg6IHgsIHk6IHkgfSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgY2FzZSAnTCc6XG4gICAgICAgICAgICBwb2ludHMucHVzaCh7XG4gICAgICAgICAgICAgIHg6IChyZWxhdGl2ZSA/IHByZXZQb2ludC54IDogMCkgKyBjb21tYW5kUGFyYW1zLnNoaWZ0KCksXG4gICAgICAgICAgICAgIHk6IChyZWxhdGl2ZSA/IHByZXZQb2ludC55IDogMCkgKyBjb21tYW5kUGFyYW1zLnNoaWZ0KClcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgIGNhc2UgJ0gnOlxuICAgICAgICAgICAgcG9pbnRzLnB1c2goe1xuICAgICAgICAgICAgICB4OiAocmVsYXRpdmUgPyBwcmV2UG9pbnQueCA6IDApICsgY29tbWFuZFBhcmFtcy5zaGlmdCgpLFxuICAgICAgICAgICAgICB5OiBwcmV2UG9pbnQueVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgY2FzZSAnVic6XG4gICAgICAgICAgICBwb2ludHMucHVzaCh7XG4gICAgICAgICAgICAgIHg6IHByZXZQb2ludC54LFxuICAgICAgICAgICAgICB5OiAocmVsYXRpdmUgPyBwcmV2UG9pbnQueSA6IDApICsgY29tbWFuZFBhcmFtcy5zaGlmdCgpXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICBjYXNlICdBJzpcbiAgICAgICAgICAgIHBvaW50cy5wdXNoKHtcbiAgICAgICAgICAgICAgY3VydmU6IHtcbiAgICAgICAgICAgICAgICB0eXBlOiAnYXJjJyxcbiAgICAgICAgICAgICAgICByeDogY29tbWFuZFBhcmFtcy5zaGlmdCgpLFxuICAgICAgICAgICAgICAgIHJ5OiBjb21tYW5kUGFyYW1zLnNoaWZ0KCksXG4gICAgICAgICAgICAgICAgeEF4aXNSb3RhdGlvbjogY29tbWFuZFBhcmFtcy5zaGlmdCgpLFxuICAgICAgICAgICAgICAgIGxhcmdlQXJjRmxhZzogY29tbWFuZFBhcmFtcy5zaGlmdCgpLFxuICAgICAgICAgICAgICAgIHN3ZWVwRmxhZzogY29tbWFuZFBhcmFtcy5zaGlmdCgpXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIHg6IChyZWxhdGl2ZSA/IHByZXZQb2ludC54IDogMCkgKyBjb21tYW5kUGFyYW1zLnNoaWZ0KCksXG4gICAgICAgICAgICAgIHk6IChyZWxhdGl2ZSA/IHByZXZQb2ludC55IDogMCkgKyBjb21tYW5kUGFyYW1zLnNoaWZ0KClcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICB2YXIgX2l0ZXJhdG9yTm9ybWFsQ29tcGxldGlvbiA9IHRydWU7XG4gICAgICAgICAgICB2YXIgX2RpZEl0ZXJhdG9yRXJyb3IgPSBmYWxzZTtcbiAgICAgICAgICAgIHZhciBfaXRlcmF0b3JFcnJvciA9IHVuZGVmaW5lZDtcblxuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgZm9yICh2YXIgX2l0ZXJhdG9yID0gb3B0aW9uYWxBcmNLZXlzW1N5bWJvbC5pdGVyYXRvcl0oKSwgX3N0ZXA7ICEoX2l0ZXJhdG9yTm9ybWFsQ29tcGxldGlvbiA9IChfc3RlcCA9IF9pdGVyYXRvci5uZXh0KCkpLmRvbmUpOyBfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uID0gdHJ1ZSkge1xuICAgICAgICAgICAgICAgIHZhciBrID0gX3N0ZXAudmFsdWU7XG5cbiAgICAgICAgICAgICAgICBpZiAocG9pbnRzW3BvaW50cy5sZW5ndGggLSAxXVsnY3VydmUnXVtrXSA9PT0gMCkge1xuICAgICAgICAgICAgICAgICAgZGVsZXRlIHBvaW50c1twb2ludHMubGVuZ3RoIC0gMV1bJ2N1cnZlJ11ba107XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgICAgICAgX2RpZEl0ZXJhdG9yRXJyb3IgPSB0cnVlO1xuICAgICAgICAgICAgICBfaXRlcmF0b3JFcnJvciA9IGVycjtcbiAgICAgICAgICAgIH0gZmluYWxseSB7XG4gICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgaWYgKCFfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uICYmIF9pdGVyYXRvci5yZXR1cm4pIHtcbiAgICAgICAgICAgICAgICAgIF9pdGVyYXRvci5yZXR1cm4oKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH0gZmluYWxseSB7XG4gICAgICAgICAgICAgICAgaWYgKF9kaWRJdGVyYXRvckVycm9yKSB7XG4gICAgICAgICAgICAgICAgICB0aHJvdyBfaXRlcmF0b3JFcnJvcjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICBjYXNlICdDJzpcbiAgICAgICAgICAgIHBvaW50cy5wdXNoKHtcbiAgICAgICAgICAgICAgY3VydmU6IHtcbiAgICAgICAgICAgICAgICB0eXBlOiAnY3ViaWMnLFxuICAgICAgICAgICAgICAgIHgxOiAocmVsYXRpdmUgPyBwcmV2UG9pbnQueCA6IDApICsgY29tbWFuZFBhcmFtcy5zaGlmdCgpLFxuICAgICAgICAgICAgICAgIHkxOiAocmVsYXRpdmUgPyBwcmV2UG9pbnQueSA6IDApICsgY29tbWFuZFBhcmFtcy5zaGlmdCgpLFxuICAgICAgICAgICAgICAgIHgyOiAocmVsYXRpdmUgPyBwcmV2UG9pbnQueCA6IDApICsgY29tbWFuZFBhcmFtcy5zaGlmdCgpLFxuICAgICAgICAgICAgICAgIHkyOiAocmVsYXRpdmUgPyBwcmV2UG9pbnQueSA6IDApICsgY29tbWFuZFBhcmFtcy5zaGlmdCgpXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIHg6IChyZWxhdGl2ZSA/IHByZXZQb2ludC54IDogMCkgKyBjb21tYW5kUGFyYW1zLnNoaWZ0KCksXG4gICAgICAgICAgICAgIHk6IChyZWxhdGl2ZSA/IHByZXZQb2ludC55IDogMCkgKyBjb21tYW5kUGFyYW1zLnNoaWZ0KClcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgIGNhc2UgJ1MnOlxuICAgICAgICAgICAgdmFyIHN4MiA9IChyZWxhdGl2ZSA/IHByZXZQb2ludC54IDogMCkgKyBjb21tYW5kUGFyYW1zLnNoaWZ0KCk7XG4gICAgICAgICAgICB2YXIgc3kyID0gKHJlbGF0aXZlID8gcHJldlBvaW50LnkgOiAwKSArIGNvbW1hbmRQYXJhbXMuc2hpZnQoKTtcbiAgICAgICAgICAgIHZhciBzeCA9IChyZWxhdGl2ZSA/IHByZXZQb2ludC54IDogMCkgKyBjb21tYW5kUGFyYW1zLnNoaWZ0KCk7XG4gICAgICAgICAgICB2YXIgc3kgPSAocmVsYXRpdmUgPyBwcmV2UG9pbnQueSA6IDApICsgY29tbWFuZFBhcmFtcy5zaGlmdCgpO1xuXG4gICAgICAgICAgICB2YXIgZGlmZiA9IHt9O1xuXG4gICAgICAgICAgICB2YXIgc3gxID0gdm9pZCAwO1xuICAgICAgICAgICAgdmFyIHN5MSA9IHZvaWQgMDtcblxuICAgICAgICAgICAgaWYgKHByZXZQb2ludC5jdXJ2ZSAmJiBwcmV2UG9pbnQuY3VydmUudHlwZSA9PT0gJ2N1YmljJykge1xuICAgICAgICAgICAgICBkaWZmLnggPSBNYXRoLmFicyhwcmV2UG9pbnQueCAtIHByZXZQb2ludC5jdXJ2ZS54Mik7XG4gICAgICAgICAgICAgIGRpZmYueSA9IE1hdGguYWJzKHByZXZQb2ludC55IC0gcHJldlBvaW50LmN1cnZlLnkyKTtcbiAgICAgICAgICAgICAgc3gxID0gcHJldlBvaW50LnggPCBwcmV2UG9pbnQuY3VydmUueDIgPyBwcmV2UG9pbnQueCAtIGRpZmYueCA6IHByZXZQb2ludC54ICsgZGlmZi54O1xuICAgICAgICAgICAgICBzeTEgPSBwcmV2UG9pbnQueSA8IHByZXZQb2ludC5jdXJ2ZS55MiA/IHByZXZQb2ludC55IC0gZGlmZi55IDogcHJldlBvaW50LnkgKyBkaWZmLnk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBkaWZmLnggPSBNYXRoLmFicyhzeCAtIHN4Mik7XG4gICAgICAgICAgICAgIGRpZmYueSA9IE1hdGguYWJzKHN5IC0gc3kyKTtcbiAgICAgICAgICAgICAgc3gxID0gcHJldlBvaW50Lng7XG4gICAgICAgICAgICAgIHN5MSA9IHByZXZQb2ludC55O1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBwb2ludHMucHVzaCh7IGN1cnZlOiB7IHR5cGU6ICdjdWJpYycsIHgxOiBzeDEsIHkxOiBzeTEsIHgyOiBzeDIsIHkyOiBzeTIgfSwgeDogc3gsIHk6IHN5IH0pO1xuXG4gICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgIGNhc2UgJ1EnOlxuICAgICAgICAgICAgcG9pbnRzLnB1c2goe1xuICAgICAgICAgICAgICBjdXJ2ZToge1xuICAgICAgICAgICAgICAgIHR5cGU6ICdxdWFkcmF0aWMnLFxuICAgICAgICAgICAgICAgIHgxOiAocmVsYXRpdmUgPyBwcmV2UG9pbnQueCA6IDApICsgY29tbWFuZFBhcmFtcy5zaGlmdCgpLFxuICAgICAgICAgICAgICAgIHkxOiAocmVsYXRpdmUgPyBwcmV2UG9pbnQueSA6IDApICsgY29tbWFuZFBhcmFtcy5zaGlmdCgpXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIHg6IChyZWxhdGl2ZSA/IHByZXZQb2ludC54IDogMCkgKyBjb21tYW5kUGFyYW1zLnNoaWZ0KCksXG4gICAgICAgICAgICAgIHk6IChyZWxhdGl2ZSA/IHByZXZQb2ludC55IDogMCkgKyBjb21tYW5kUGFyYW1zLnNoaWZ0KClcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgIGNhc2UgJ1QnOlxuICAgICAgICAgICAgdmFyIHR4ID0gKHJlbGF0aXZlID8gcHJldlBvaW50LnggOiAwKSArIGNvbW1hbmRQYXJhbXMuc2hpZnQoKTtcbiAgICAgICAgICAgIHZhciB0eSA9IChyZWxhdGl2ZSA/IHByZXZQb2ludC55IDogMCkgKyBjb21tYW5kUGFyYW1zLnNoaWZ0KCk7XG5cbiAgICAgICAgICAgIHZhciB0eDEgPSB2b2lkIDA7XG4gICAgICAgICAgICB2YXIgdHkxID0gdm9pZCAwO1xuXG4gICAgICAgICAgICBpZiAocHJldlBvaW50LmN1cnZlICYmIHByZXZQb2ludC5jdXJ2ZS50eXBlID09PSAncXVhZHJhdGljJykge1xuICAgICAgICAgICAgICB2YXIgX2RpZmYgPSB7XG4gICAgICAgICAgICAgICAgeDogTWF0aC5hYnMocHJldlBvaW50LnggLSBwcmV2UG9pbnQuY3VydmUueDEpLFxuICAgICAgICAgICAgICAgIHk6IE1hdGguYWJzKHByZXZQb2ludC55IC0gcHJldlBvaW50LmN1cnZlLnkxKVxuICAgICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAgIHR4MSA9IHByZXZQb2ludC54IDwgcHJldlBvaW50LmN1cnZlLngxID8gcHJldlBvaW50LnggLSBfZGlmZi54IDogcHJldlBvaW50LnggKyBfZGlmZi54O1xuICAgICAgICAgICAgICB0eTEgPSBwcmV2UG9pbnQueSA8IHByZXZQb2ludC5jdXJ2ZS55MSA/IHByZXZQb2ludC55IC0gX2RpZmYueSA6IHByZXZQb2ludC55ICsgX2RpZmYueTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHR4MSA9IHByZXZQb2ludC54O1xuICAgICAgICAgICAgICB0eTEgPSBwcmV2UG9pbnQueTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcG9pbnRzLnB1c2goeyBjdXJ2ZTogeyB0eXBlOiAncXVhZHJhdGljJywgeDE6IHR4MSwgeTE6IHR5MSB9LCB4OiB0eCwgeTogdHkgfSk7XG5cbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciBfcHJldlBvaW50ID0gcG9pbnRzW3BvaW50cy5sZW5ndGggLSAxXSB8fCB7IHg6IDAsIHk6IDAgfTtcblxuICAgICAgaWYgKF9wcmV2UG9pbnQueCAhPT0gbW92ZVRvLnggfHwgX3ByZXZQb2ludC55ICE9PSBtb3ZlVG8ueSkge1xuICAgICAgICBwb2ludHMucHVzaCh7IHg6IG1vdmVUby54LCB5OiBtb3ZlVG8ueSB9KTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZXR1cm4gcG9pbnRzO1xufTtcblxudmFyIGdldFBvaW50c0Zyb21Qb2x5Z29uID0gZnVuY3Rpb24gZ2V0UG9pbnRzRnJvbVBvbHlnb24oX3JlZjYpIHtcbiAgdmFyIHBvaW50cyA9IF9yZWY2LnBvaW50cztcblxuICByZXR1cm4gZ2V0UG9pbnRzRnJvbVBvaW50cyh7IGNsb3NlZDogdHJ1ZSwgcG9pbnRzOiBwb2ludHMgfSk7XG59O1xuXG52YXIgZ2V0UG9pbnRzRnJvbVBvbHlsaW5lID0gZnVuY3Rpb24gZ2V0UG9pbnRzRnJvbVBvbHlsaW5lKF9yZWY3KSB7XG4gIHZhciBwb2ludHMgPSBfcmVmNy5wb2ludHM7XG5cbiAgcmV0dXJuIGdldFBvaW50c0Zyb21Qb2ludHMoeyBjbG9zZWQ6IGZhbHNlLCBwb2ludHM6IHBvaW50cyB9KTtcbn07XG5cbnZhciBnZXRQb2ludHNGcm9tUG9pbnRzID0gZnVuY3Rpb24gZ2V0UG9pbnRzRnJvbVBvaW50cyhfcmVmOCkge1xuICB2YXIgY2xvc2VkID0gX3JlZjguY2xvc2VkLFxuICAgICAgcG9pbnRzID0gX3JlZjgucG9pbnRzO1xuXG4gIHZhciBudW1iZXJzID0gcG9pbnRzLnNwbGl0KC9bXFxzLF0rLykubWFwKGZ1bmN0aW9uIChuKSB7XG4gICAgcmV0dXJuIHBhcnNlRmxvYXQobik7XG4gIH0pO1xuXG4gIHZhciBwID0gbnVtYmVycy5yZWR1Y2UoZnVuY3Rpb24gKGFyciwgcG9pbnQsIGkpIHtcbiAgICBpZiAoaSAlIDIgPT09IDApIHtcbiAgICAgIGFyci5wdXNoKHsgeDogcG9pbnQgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGFyclsoaSAtIDEpIC8gMl0ueSA9IHBvaW50O1xuICAgIH1cblxuICAgIHJldHVybiBhcnI7XG4gIH0sIFtdKTtcblxuICBpZiAoY2xvc2VkKSB7XG4gICAgcC5wdXNoKF9leHRlbmRzKHt9LCBwWzBdKSk7XG4gIH1cblxuICBwWzBdLm1vdmVUbyA9IHRydWU7XG5cbiAgcmV0dXJuIHA7XG59O1xuXG52YXIgZ2V0UG9pbnRzRnJvbVJlY3QgPSBmdW5jdGlvbiBnZXRQb2ludHNGcm9tUmVjdChfcmVmOSkge1xuICB2YXIgaGVpZ2h0ID0gX3JlZjkuaGVpZ2h0LFxuICAgICAgcnggPSBfcmVmOS5yeCxcbiAgICAgIHJ5ID0gX3JlZjkucnksXG4gICAgICB3aWR0aCA9IF9yZWY5LndpZHRoLFxuICAgICAgeCA9IF9yZWY5LngsXG4gICAgICB5ID0gX3JlZjkueTtcblxuICBpZiAocnggfHwgcnkpIHtcbiAgICByZXR1cm4gZ2V0UG9pbnRzRnJvbVJlY3RXaXRoQ29ybmVyUmFkaXVzKHtcbiAgICAgIGhlaWdodDogaGVpZ2h0LFxuICAgICAgcng6IHJ4IHx8IHJ5LFxuICAgICAgcnk6IHJ5IHx8IHJ4LFxuICAgICAgd2lkdGg6IHdpZHRoLFxuICAgICAgeDogeCxcbiAgICAgIHk6IHlcbiAgICB9KTtcbiAgfVxuXG4gIHJldHVybiBnZXRQb2ludHNGcm9tQmFzaWNSZWN0KHsgaGVpZ2h0OiBoZWlnaHQsIHdpZHRoOiB3aWR0aCwgeDogeCwgeTogeSB9KTtcbn07XG5cbnZhciBnZXRQb2ludHNGcm9tQmFzaWNSZWN0ID0gZnVuY3Rpb24gZ2V0UG9pbnRzRnJvbUJhc2ljUmVjdChfcmVmMTApIHtcbiAgdmFyIGhlaWdodCA9IF9yZWYxMC5oZWlnaHQsXG4gICAgICB3aWR0aCA9IF9yZWYxMC53aWR0aCxcbiAgICAgIHggPSBfcmVmMTAueCxcbiAgICAgIHkgPSBfcmVmMTAueTtcblxuICByZXR1cm4gW3sgeDogeCwgeTogeSwgbW92ZVRvOiB0cnVlIH0sIHsgeDogeCArIHdpZHRoLCB5OiB5IH0sIHsgeDogeCArIHdpZHRoLCB5OiB5ICsgaGVpZ2h0IH0sIHsgeDogeCwgeTogeSArIGhlaWdodCB9LCB7IHg6IHgsIHk6IHkgfV07XG59O1xuXG52YXIgZ2V0UG9pbnRzRnJvbVJlY3RXaXRoQ29ybmVyUmFkaXVzID0gZnVuY3Rpb24gZ2V0UG9pbnRzRnJvbVJlY3RXaXRoQ29ybmVyUmFkaXVzKF9yZWYxMSkge1xuICB2YXIgaGVpZ2h0ID0gX3JlZjExLmhlaWdodCxcbiAgICAgIHJ4ID0gX3JlZjExLnJ4LFxuICAgICAgcnkgPSBfcmVmMTEucnksXG4gICAgICB3aWR0aCA9IF9yZWYxMS53aWR0aCxcbiAgICAgIHggPSBfcmVmMTEueCxcbiAgICAgIHkgPSBfcmVmMTEueTtcblxuICB2YXIgY3VydmUgPSB7IHR5cGU6ICdhcmMnLCByeDogcngsIHJ5OiByeSwgc3dlZXBGbGFnOiAxIH07XG5cbiAgcmV0dXJuIFt7IHg6IHggKyByeCwgeTogeSwgbW92ZVRvOiB0cnVlIH0sIHsgeDogeCArIHdpZHRoIC0gcngsIHk6IHkgfSwgeyB4OiB4ICsgd2lkdGgsIHk6IHkgKyByeSwgY3VydmU6IGN1cnZlIH0sIHsgeDogeCArIHdpZHRoLCB5OiB5ICsgaGVpZ2h0IC0gcnkgfSwgeyB4OiB4ICsgd2lkdGggLSByeCwgeTogeSArIGhlaWdodCwgY3VydmU6IGN1cnZlIH0sIHsgeDogeCArIHJ4LCB5OiB5ICsgaGVpZ2h0IH0sIHsgeDogeCwgeTogeSArIGhlaWdodCAtIHJ5LCBjdXJ2ZTogY3VydmUgfSwgeyB4OiB4LCB5OiB5ICsgcnkgfSwgeyB4OiB4ICsgcngsIHk6IHksIGN1cnZlOiBjdXJ2ZSB9XTtcbn07XG5cbnZhciBnZXRQb2ludHNGcm9tRyA9IGZ1bmN0aW9uIGdldFBvaW50c0Zyb21HKF9yZWYxMikge1xuICB2YXIgc2hhcGVzID0gX3JlZjEyLnNoYXBlcztcbiAgcmV0dXJuIHNoYXBlcy5tYXAoZnVuY3Rpb24gKHMpIHtcbiAgICByZXR1cm4gdG9Qb2ludHMocyk7XG4gIH0pO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgdG9Qb2ludHM7IiwidmFyIF90eXBlb2YgPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgdHlwZW9mIFN5bWJvbC5pdGVyYXRvciA9PT0gXCJzeW1ib2xcIiA/IGZ1bmN0aW9uIChvYmopIHsgcmV0dXJuIHR5cGVvZiBvYmo7IH0gOiBmdW5jdGlvbiAob2JqKSB7IHJldHVybiBvYmogJiYgdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIG9iai5jb25zdHJ1Y3RvciA9PT0gU3ltYm9sICYmIG9iaiAhPT0gU3ltYm9sLnByb3RvdHlwZSA/IFwic3ltYm9sXCIgOiB0eXBlb2Ygb2JqOyB9O1xuXG52YXIgZ2V0RXJyb3JzID0gZnVuY3Rpb24gZ2V0RXJyb3JzKHNoYXBlKSB7XG4gIHZhciBydWxlcyA9IGdldFJ1bGVzKHNoYXBlKTtcbiAgdmFyIGVycm9ycyA9IFtdO1xuXG4gIHJ1bGVzLm1hcChmdW5jdGlvbiAoX3JlZikge1xuICAgIHZhciBtYXRjaCA9IF9yZWYubWF0Y2gsXG4gICAgICAgIHByb3AgPSBfcmVmLnByb3AsXG4gICAgICAgIHJlcXVpcmVkID0gX3JlZi5yZXF1aXJlZCxcbiAgICAgICAgdHlwZSA9IF9yZWYudHlwZTtcblxuICAgIGlmICh0eXBlb2Ygc2hhcGVbcHJvcF0gPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICBpZiAocmVxdWlyZWQpIHtcbiAgICAgICAgZXJyb3JzLnB1c2gocHJvcCArICcgcHJvcCBpcyByZXF1aXJlZCcgKyAocHJvcCA9PT0gJ3R5cGUnID8gJycgOiAnIG9uIGEgJyArIHNoYXBlLnR5cGUpKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKHR5cGVvZiB0eXBlICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICBpZiAodHlwZSA9PT0gJ2FycmF5Jykge1xuICAgICAgICAgIGlmICghQXJyYXkuaXNBcnJheShzaGFwZVtwcm9wXSkpIHtcbiAgICAgICAgICAgIGVycm9ycy5wdXNoKHByb3AgKyAnIHByb3AgbXVzdCBiZSBvZiB0eXBlIGFycmF5Jyk7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKF90eXBlb2Yoc2hhcGVbcHJvcF0pICE9PSB0eXBlKSB7XG4gICAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbGluZSB2YWxpZC10eXBlb2ZcbiAgICAgICAgICBlcnJvcnMucHVzaChwcm9wICsgJyBwcm9wIG11c3QgYmUgb2YgdHlwZSAnICsgdHlwZSk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKEFycmF5LmlzQXJyYXkobWF0Y2gpKSB7XG4gICAgICAgIGlmIChtYXRjaC5pbmRleE9mKHNoYXBlW3Byb3BdKSA9PT0gLTEpIHtcbiAgICAgICAgICBlcnJvcnMucHVzaChwcm9wICsgJyBwcm9wIG11c3QgYmUgb25lIG9mICcgKyBtYXRjaC5qb2luKCcsICcpKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfSk7XG5cbiAgaWYgKHNoYXBlLnR5cGUgPT09ICdnJyAmJiBBcnJheS5pc0FycmF5KHNoYXBlLnNoYXBlcykpIHtcbiAgICB2YXIgY2hpbGRFcnJvcnMgPSBzaGFwZS5zaGFwZXMubWFwKGZ1bmN0aW9uIChzKSB7XG4gICAgICByZXR1cm4gZ2V0RXJyb3JzKHMpO1xuICAgIH0pO1xuICAgIHJldHVybiBbXS5jb25jYXQuYXBwbHkoZXJyb3JzLCBjaGlsZEVycm9ycyk7XG4gIH1cblxuICByZXR1cm4gZXJyb3JzO1xufTtcblxudmFyIGdldFJ1bGVzID0gZnVuY3Rpb24gZ2V0UnVsZXMoc2hhcGUpIHtcbiAgdmFyIHJ1bGVzID0gW3tcbiAgICBtYXRjaDogWydjaXJjbGUnLCAnZWxsaXBzZScsICdsaW5lJywgJ3BhdGgnLCAncG9seWdvbicsICdwb2x5bGluZScsICdyZWN0JywgJ2cnXSxcbiAgICBwcm9wOiAndHlwZScsXG4gICAgcmVxdWlyZWQ6IHRydWUsXG4gICAgdHlwZTogJ3N0cmluZydcbiAgfV07XG5cbiAgc3dpdGNoIChzaGFwZS50eXBlKSB7XG4gICAgY2FzZSAnY2lyY2xlJzpcbiAgICAgIHJ1bGVzLnB1c2goeyBwcm9wOiAnY3gnLCByZXF1aXJlZDogdHJ1ZSwgdHlwZTogJ251bWJlcicgfSk7XG4gICAgICBydWxlcy5wdXNoKHsgcHJvcDogJ2N5JywgcmVxdWlyZWQ6IHRydWUsIHR5cGU6ICdudW1iZXInIH0pO1xuICAgICAgcnVsZXMucHVzaCh7IHByb3A6ICdyJywgcmVxdWlyZWQ6IHRydWUsIHR5cGU6ICdudW1iZXInIH0pO1xuICAgICAgYnJlYWs7XG5cbiAgICBjYXNlICdlbGxpcHNlJzpcbiAgICAgIHJ1bGVzLnB1c2goeyBwcm9wOiAnY3gnLCByZXF1aXJlZDogdHJ1ZSwgdHlwZTogJ251bWJlcicgfSk7XG4gICAgICBydWxlcy5wdXNoKHsgcHJvcDogJ2N5JywgcmVxdWlyZWQ6IHRydWUsIHR5cGU6ICdudW1iZXInIH0pO1xuICAgICAgcnVsZXMucHVzaCh7IHByb3A6ICdyeCcsIHJlcXVpcmVkOiB0cnVlLCB0eXBlOiAnbnVtYmVyJyB9KTtcbiAgICAgIHJ1bGVzLnB1c2goeyBwcm9wOiAncnknLCByZXF1aXJlZDogdHJ1ZSwgdHlwZTogJ251bWJlcicgfSk7XG4gICAgICBicmVhaztcblxuICAgIGNhc2UgJ2xpbmUnOlxuICAgICAgcnVsZXMucHVzaCh7IHByb3A6ICd4MScsIHJlcXVpcmVkOiB0cnVlLCB0eXBlOiAnbnVtYmVyJyB9KTtcbiAgICAgIHJ1bGVzLnB1c2goeyBwcm9wOiAneDInLCByZXF1aXJlZDogdHJ1ZSwgdHlwZTogJ251bWJlcicgfSk7XG4gICAgICBydWxlcy5wdXNoKHsgcHJvcDogJ3kxJywgcmVxdWlyZWQ6IHRydWUsIHR5cGU6ICdudW1iZXInIH0pO1xuICAgICAgcnVsZXMucHVzaCh7IHByb3A6ICd5MicsIHJlcXVpcmVkOiB0cnVlLCB0eXBlOiAnbnVtYmVyJyB9KTtcbiAgICAgIGJyZWFrO1xuXG4gICAgY2FzZSAncGF0aCc6XG4gICAgICBydWxlcy5wdXNoKHsgcHJvcDogJ2QnLCByZXF1aXJlZDogdHJ1ZSwgdHlwZTogJ3N0cmluZycgfSk7XG4gICAgICBicmVhaztcblxuICAgIGNhc2UgJ3BvbHlnb24nOlxuICAgIGNhc2UgJ3BvbHlsaW5lJzpcbiAgICAgIHJ1bGVzLnB1c2goeyBwcm9wOiAncG9pbnRzJywgcmVxdWlyZWQ6IHRydWUsIHR5cGU6ICdzdHJpbmcnIH0pO1xuICAgICAgYnJlYWs7XG5cbiAgICBjYXNlICdyZWN0JzpcbiAgICAgIHJ1bGVzLnB1c2goeyBwcm9wOiAnaGVpZ2h0JywgcmVxdWlyZWQ6IHRydWUsIHR5cGU6ICdudW1iZXInIH0pO1xuICAgICAgcnVsZXMucHVzaCh7IHByb3A6ICdyeCcsIHR5cGU6ICdudW1iZXInIH0pO1xuICAgICAgcnVsZXMucHVzaCh7IHByb3A6ICdyeScsIHR5cGU6ICdudW1iZXInIH0pO1xuICAgICAgcnVsZXMucHVzaCh7IHByb3A6ICd3aWR0aCcsIHJlcXVpcmVkOiB0cnVlLCB0eXBlOiAnbnVtYmVyJyB9KTtcbiAgICAgIHJ1bGVzLnB1c2goeyBwcm9wOiAneCcsIHJlcXVpcmVkOiB0cnVlLCB0eXBlOiAnbnVtYmVyJyB9KTtcbiAgICAgIHJ1bGVzLnB1c2goeyBwcm9wOiAneScsIHJlcXVpcmVkOiB0cnVlLCB0eXBlOiAnbnVtYmVyJyB9KTtcbiAgICAgIGJyZWFrO1xuXG4gICAgY2FzZSAnZyc6XG4gICAgICBydWxlcy5wdXNoKHsgcHJvcDogJ3NoYXBlcycsIHJlcXVpcmVkOiB0cnVlLCB0eXBlOiAnYXJyYXknIH0pO1xuICAgICAgYnJlYWs7XG4gIH1cblxuICByZXR1cm4gcnVsZXM7XG59O1xuXG52YXIgdmFsaWQgPSBmdW5jdGlvbiB2YWxpZChzaGFwZSkge1xuICB2YXIgZXJyb3JzID0gZ2V0RXJyb3JzKHNoYXBlKTtcblxuICByZXR1cm4ge1xuICAgIGVycm9yczogZXJyb3JzLFxuICAgIHZhbGlkOiBlcnJvcnMubGVuZ3RoID09PSAwXG4gIH07XG59O1xuXG5leHBvcnQgZGVmYXVsdCB2YWxpZDsiLCJ2YXIgZztcblxuLy8gVGhpcyB3b3JrcyBpbiBub24tc3RyaWN0IG1vZGVcbmcgPSAoZnVuY3Rpb24oKSB7XG5cdHJldHVybiB0aGlzO1xufSkoKTtcblxudHJ5IHtcblx0Ly8gVGhpcyB3b3JrcyBpZiBldmFsIGlzIGFsbG93ZWQgKHNlZSBDU1ApXG5cdGcgPSBnIHx8IG5ldyBGdW5jdGlvbihcInJldHVybiB0aGlzXCIpKCk7XG59IGNhdGNoIChlKSB7XG5cdC8vIFRoaXMgd29ya3MgaWYgdGhlIHdpbmRvdyByZWZlcmVuY2UgaXMgYXZhaWxhYmxlXG5cdGlmICh0eXBlb2Ygd2luZG93ID09PSBcIm9iamVjdFwiKSBnID0gd2luZG93O1xufVxuXG4vLyBnIGNhbiBzdGlsbCBiZSB1bmRlZmluZWQsIGJ1dCBub3RoaW5nIHRvIGRvIGFib3V0IGl0Li4uXG4vLyBXZSByZXR1cm4gdW5kZWZpbmVkLCBpbnN0ZWFkIG9mIG5vdGhpbmcgaGVyZSwgc28gaXQnc1xuLy8gZWFzaWVyIHRvIGhhbmRsZSB0aGlzIGNhc2UuIGlmKCFnbG9iYWwpIHsgLi4ufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGc7XG4iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBSaW5nIHtcclxuICBjb25zdHJ1Y3RvcihudW1Qb2ludHMsIHJhZGl1cywgY2VudGVyWCA9IHVuZGVmaW5lZCwgY2VudGVyWSA9IHVuZGVmaW5lZCkge1xyXG4gICAgdGhpcy5udW1Qb2ludHMgPSBudW1Qb2ludHM7XHJcbiAgICB0aGlzLnJhZGl1cyA9IHJhZGl1cztcclxuICAgIHRoaXMucmFkaXVzT2Zmc2V0ID0gMDtcclxuICAgIHRoaXMucmFkaXVzT2Zmc2V0U2NhbGVyID0gTWF0aC5yYW5kb20oKSAqICgxMCAtIC0xMCkgKyAtMTA7XHJcbiAgICBcclxuICAgIHRoaXMucG9pbnRzID0gW107XHJcblxyXG4gICAgdGhpcy5hbmdsZSA9IDA7XHJcbiAgICB0aGlzLnZlbG9jaXR5ID0gKE1hdGgucmFuZG9tKCkgKiAoMTAgLSA3KSArIDcpIC8gMTAwMDA7XHJcbiAgICB0aGlzLnZlbG9jaXR5ID0gKChNYXRoLnJhbmRvbSgpICogKDEgLSAtMSkgKyAtMSkgPCAwKSA/IHRoaXMudmVsb2NpdHkgKj0gLTEgOiB0aGlzLnZlbG9jaXR5OyBcclxuICAgIHRoaXMudGFyZ2V0QW5nbGUgPSAwO1xyXG5cclxuICAgIHRoaXMuY2VudGVyID0ge307XHJcbiAgICB0aGlzLmNlbnRlci54ID0gKGNlbnRlclggIT0gdW5kZWZpbmVkKSA/IGNlbnRlclggOiB3aW5kb3cuaW5uZXJXaWR0aCAvIDI7XHJcbiAgICB0aGlzLmNlbnRlci55ID0gKGNlbnRlclkgIT0gdW5kZWZpbmVkKSA/IGNlbnRlclkgOiB3aW5kb3cuaW5uZXJIZWlnaHQgLyAyO1xyXG5cclxuICAgIHRoaXMuZ2VuZXJhdGUoKTtcclxuICB9XHJcblxyXG4gIC8vIFN0dWZmIHRoaXMucG9pbnRzIHdpdGggcmVhbCBwb2ludCBvYmplY3RzIHVzaW5nIHRoaXMubnVtUG9pbnRzIGFuZCB0aGlzLnJhZGl1c1xyXG4gIGdlbmVyYXRlKCkge1xyXG4gICAgdGhpcy5wb2ludHMgPSBbXTtcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5udW1Qb2ludHM7IGkrKykge1xyXG4gICAgICB0aGlzLnBvaW50cy5wdXNoKFtcclxuICAgICAgICB0aGlzLmNlbnRlci54ICsgdGhpcy5yYWRpdXMgKiBNYXRoLmNvcygoKDM2MCAvIHRoaXMubnVtUG9pbnRzKSAqIChNYXRoLlBJLzE4MCkgKiBpKSArIHRoaXMuYW5nbGUpLFxyXG4gICAgICAgIHRoaXMuY2VudGVyLnkgKyB0aGlzLnJhZGl1cyAqIE1hdGguc2luKCgoMzYwIC8gdGhpcy5udW1Qb2ludHMpICogKE1hdGguUEkvMTgwKSAqIGkpICsgdGhpcy5hbmdsZSlcclxuICAgICAgXSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvLyBBZGQgdGhpcy52ZWxvY2l0eSB0byB0aGlzLmFuZ2xlIHVudGlsIGl0IHJlYWNoZXMgdGhpcy50YXJnZXRBbmdsZSAod2l0aCBlYXNpbmcpXHJcbiAgaXRlcmF0ZSgpIHtcclxuICAgIC8vIHRoaXMuYW5nbGUgKz0gdGhpcy52ZWxvY2l0eTtcclxuXHJcbiAgICB0aGlzLnJhZGl1cyArPSAoTWF0aC5zaW4odGhpcy5yYWRpdXNPZmZzZXQgKiAoTWF0aC5QSS8xODApKSAqIE1hdGguY29zKHRoaXMucmFkaXVzT2Zmc2V0ICogKE1hdGguUEkvMTgwKSkpICogdGhpcy5yYWRpdXNPZmZzZXRTY2FsZXI7XHJcblxyXG4gICAgaWYodGhpcy5yYWRpdXNPZmZzZXQgKyAxID49IDM2MCkge1xyXG4gICAgICB0aGlzLnJhZGl1c09mZnNldCA9IDA7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLnJhZGl1c09mZnNldCsrO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuZ2VuZXJhdGUoKTtcclxuICB9XHJcbn0iLCJpbXBvcnQge0RlbGF1bmF5fSBmcm9tIFwiZDMtZGVsYXVuYXlcIjtcclxuaW1wb3J0IHt0b1BhdGh9IGZyb20gJ3N2Zy1wb2ludHMnO1xyXG5pbXBvcnQge3NhdmVBc30gZnJvbSAnZmlsZS1zYXZlcic7XHJcbmltcG9ydCBSaW5nIGZyb20gXCIuL1JpbmdcIjtcclxuXHJcbmxldCBzaG93UG9pbnRzID0gZmFsc2UsXHJcbiAgaW52ZXJ0Q29sb3JzID0gZmFsc2UsXHJcbiAgdXNlQmx1ckVmZmVjdCA9IGZhbHNlLFxyXG4gIGlzUGF1c2VkID0gZmFsc2UsXHJcbiAgcG9pbnRzLFxyXG4gIHJpbmdzO1xyXG5cclxuY29uc3QgRVZFTiA9IDAsXHJcbiAgT0REID0gMSxcclxuICBBTFRFUk5BVElORyA9IDIsXHJcbiAgQU5ZID0gMztcclxubGV0IFJPV19UWVBFID0gRVZFTjtcclxuXHJcbmxldCBjdXJyZW50Um93VHlwZSA9IEVWRU47XHJcblxyXG5jb25zdCBza2V0Y2ggPSBmdW5jdGlvbiAocDUpIHtcclxuICAvKlxyXG4gICAgU2V0dXBcclxuICAgID09PT09XHJcbiAgKi9cclxuICBwNS5zZXR1cCA9IGZ1bmN0aW9uICgpIHtcclxuICAgIHA1LmNyZWF0ZUNhbnZhcyh3aW5kb3cuaW5uZXJXaWR0aCwgd2luZG93LmlubmVySGVpZ2h0KTtcclxuICAgIGdlbmVyYXRlUG9pbnRzKCk7XHJcbiAgfVxyXG5cclxuICAvKlxyXG4gICAgRHJhd1xyXG4gICAgPT09PVxyXG4gICovXHJcbiAgcDUuZHJhdyA9IGZ1bmN0aW9uICgpIHtcclxuICAgIC8vIE1vdmUgYWxsIHRoZSByaW5nc1xyXG4gICAgaWYoIWlzUGF1c2VkKSB7XHJcbiAgICAgIGZvcihsZXQgcmluZyBvZiByaW5ncykge1xyXG4gICAgICAgIHJpbmcuaXRlcmF0ZSgpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICAvLyBHZXQgdGhlIGxhdGVzdCBwb2ludHNcclxuICAgICAgcG9pbnRzID0gZ2V0UG9pbnRzKCk7XHJcbiAgXHJcbiAgICAgIGRyYXdWb3Jvbm9pKCk7XHJcbiAgICAgIGRyYXdQb2ludHMoKTtcclxuICAgIH1cclxuICB9XHJcblxyXG5cclxuICAvKlxyXG4gICAgQ3VzdG9tIGZ1bmN0aW9uc1xyXG4gICAgPT09PT09PT09PT09PT09PVxyXG4gICovXHJcbiBcclxuICAvLyBCdWlsZCBhbiBhcnJheSBvZiBwb2x5Z29ucyAoYXJyYXlzIG9mIFt4LHldIHBhaXJzKSBleHRyYWN0ZWQgZnJvbSBWb3Jvbm9pIHBhY2thZ2VcclxuICBmdW5jdGlvbiBnZXRWb3Jvbm9pUG9seWdvbnMoKSB7XHJcbiAgICBjb25zdCBkZWxhdW5heSA9IERlbGF1bmF5LmZyb20ocG9pbnRzKTtcclxuICAgIGNvbnN0IHZvcm9ub2kgPSBkZWxhdW5heS52b3Jvbm9pKFswLCAwLCB3aW5kb3cuaW5uZXJXaWR0aCwgd2luZG93LmlubmVySGVpZ2h0XSk7XHJcbiAgICBjb25zdCBzaW1wbGlmaWVkUG9seWdvbnMgPSBbXTtcclxuXHJcbiAgICBmb3IobGV0IGNlbGwgb2Ygdm9yb25vaS5jZWxsUG9seWdvbnMoKSkge1xyXG4gICAgICBsZXQgcG9seWdvbiA9IFtdO1xyXG5cclxuICAgICAgZm9yKGxldCB2ZXJ0ZXggb2YgY2VsbCkge1xyXG4gICAgICAgIHBvbHlnb24ucHVzaChbdmVydGV4WzBdLCB2ZXJ0ZXhbMV1dKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgc2ltcGxpZmllZFBvbHlnb25zLnB1c2gocG9seWdvbik7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHNpbXBsaWZpZWRQb2x5Z29ucztcclxuICB9XHJcblxyXG5cclxuICAvLyBEcmF3IHRoZSBWb3Jvbm9pIGRpYWdyYW0gZm9yIGEgc2V0IG9mIHBvaW50c1xyXG4gIGZ1bmN0aW9uIGRyYXdWb3Jvbm9pKCkge1xyXG4gICAgLy8gU2V0IGNvbG9yc1xyXG4gICAgaWYgKGludmVydENvbG9ycykge1xyXG4gICAgICBpZih1c2VCbHVyRWZmZWN0KSB7XHJcbiAgICAgICAgcDUuYmFja2dyb3VuZCgwLCAyMCk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgcDUuYmFja2dyb3VuZCgwKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgcDUuc3Ryb2tlKDI1NSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBpZih1c2VCbHVyRWZmZWN0KSB7XHJcbiAgICAgICAgcDUuYmFja2dyb3VuZCgyNTUsIDI1KTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBwNS5iYWNrZ3JvdW5kKDI1NSk7XHJcbiAgICAgIH1cclxuICAgICAgXHJcbiAgICAgIHA1LnN0cm9rZSgwKTtcclxuICAgIH1cclxuXHJcbiAgICBwNS5ub0ZpbGwoKTtcclxuXHJcbiAgICAvLyBFeHRyYWN0IHBvbHlnb25zIGZyb20gVm9yb25vaSBkaWFncmFtXHJcbiAgICBjb25zdCBwb2x5Z29ucyA9IGdldFZvcm9ub2lQb2x5Z29ucygpO1xyXG5cclxuICAgIC8vIERyYXcgcmF3IHBvbHlnb25zXHJcbiAgICBmb3IgKGNvbnN0IHBvbHlnb24gb2YgcG9seWdvbnMpIHtcclxuICAgICAgcDUuYmVnaW5TaGFwZSgpO1xyXG5cclxuICAgICAgZm9yIChjb25zdCB2ZXJ0ZXggb2YgcG9seWdvbikge1xyXG4gICAgICAgIHA1LnZlcnRleCh2ZXJ0ZXhbMF0sIHZlcnRleFsxXSk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHA1LmVuZFNoYXBlKCk7XHJcbiAgICB9XHJcbiAgfVxyXG4gIFxyXG4gIC8vIERyYXcgZG90cyBmb3IgZWFjaCBvZiB0aGUgcG9pbnRzXHJcbiAgZnVuY3Rpb24gZHJhd1BvaW50cygpIHtcclxuICAgIGlmIChzaG93UG9pbnRzKSB7XHJcbiAgICAgIC8vIFNldCBjb2xvcnNcclxuICAgICAgcDUubm9TdHJva2UoKTtcclxuXHJcbiAgICAgIGlmIChpbnZlcnRDb2xvcnMpIHtcclxuICAgICAgICBwNS5maWxsKDEwMCk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgcDUuZmlsbCgyMDApO1xyXG4gICAgICB9XHJcblxyXG4gICAgICAvLyBEcmF3IHRoZSBwb2ludHNcclxuICAgICAgZm9yIChsZXQgcG9pbnQgb2YgcG9pbnRzKSB7XHJcbiAgICAgICAgcDUuZWxsaXBzZShwb2ludFswXSwgcG9pbnRbMV0sIDUpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG4gIFxyXG4gIGZ1bmN0aW9uIGdlbmVyYXRlUG9pbnRzKCkge1xyXG4gICAgcG9pbnRzID0gW10sIHJpbmdzID0gW107XHJcbiAgICBsZXQgbnVtUmluZ3MgPSBwYXJzZUludChwNS5yYW5kb20oNSwgMjApKTtcclxuICAgIGNvbnN0IG1heFJhZGl1cyA9ICh3aW5kb3cuaW5uZXJXaWR0aCA+IHdpbmRvdy5pbm5lckhlaWdodCkgPyB3aW5kb3cuaW5uZXJIZWlnaHQvMiAtIDEwIDogd2luZG93LmlubmVyV2lkdGgvMiAtIDEwO1xyXG4gICAgY29uc3QgbWluUmFkaXVzID0gcDUucmFuZG9tKDEwLCAzMCk7XHJcbiAgICBsZXQgY3VycmVudFJhZGl1cyA9IG1heFJhZGl1cztcclxuICAgIGNvbnN0IHJhZGl1c1N0ZXAgPSAobWF4UmFkaXVzIC0gbWluUmFkaXVzKSAvIG51bVJpbmdzO1xyXG5cclxuICAgIC8vIEdlbmVyYXRlIHNldCBvZiBwb2ludHMgZm9yIFZvcm9ub2kgZGlhZ3JhbVxyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBudW1SaW5nczsgaSsrKSB7XHJcbiAgICAgIGxldCBudW1Qb2ludHMsIHJhbmdlID0gW107XHJcblxyXG4gICAgICAvLyBSaW5ncyBuZWFyIHRoZSBjZW50ZXIgbG9vayBiZXR0ZXIgd2l0aCBmZXdlciBwb2ludHNcclxuICAgICAgaWYgKGkgPiAzKSB7XHJcbiAgICAgICAgcmFuZ2VbMF0gPSA1O1xyXG4gICAgICAgIHJhbmdlWzFdID0gMTA7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgcmFuZ2VbMF0gPSAyMDtcclxuICAgICAgICByYW5nZVsxXSA9IDIwMDtcclxuICAgICAgfVxyXG5cclxuICAgICAgLy8gVE9ETzogbWFrZSByYW5nZSBwcm9wb3J0aW9uYWwgdG8gaS4gXHJcblxyXG4gICAgICAvLyBHZW5lcmF0ZSBhIHJhbmRvbSBudW1iZXIgb2YgcG9pbnRzIGJhc2VkIG9uIHNlbGVjdGVkIFwicm93IHR5cGVcIlxyXG4gICAgICBzd2l0Y2ggKFJPV19UWVBFKSB7XHJcbiAgICAgICAgY2FzZSBFVkVOOlxyXG4gICAgICAgICAgbnVtUG9pbnRzID0gZ2V0UmFuZG9tRXZlbk51bWJlcihyYW5nZVswXSwgcmFuZ2VbMV0pO1xyXG4gICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICAgIGNhc2UgT0REOlxyXG4gICAgICAgICAgbnVtUG9pbnRzID0gZ2V0UmFuZG9tT2RkTnVtYmVyKHJhbmdlWzBdLCByYW5nZVsxXSk7XHJcbiAgICAgICAgICBicmVhaztcclxuXHJcbiAgICAgICAgY2FzZSBBTFRFUk5BVElORzpcclxuICAgICAgICAgIHN3aXRjaCAoY3VycmVudFJvd1R5cGUpIHtcclxuICAgICAgICAgICAgY2FzZSBFVkVOOlxyXG4gICAgICAgICAgICAgIG51bVBvaW50cyA9IGdldFJhbmRvbUV2ZW5OdW1iZXIocmFuZ2VbMF0sIHJhbmdlWzFdKTtcclxuICAgICAgICAgICAgICBjdXJyZW50Um93VHlwZSA9IE9ERDtcclxuICAgICAgICAgICAgICBicmVhaztcclxuXHJcbiAgICAgICAgICAgIGNhc2UgT0REOlxyXG4gICAgICAgICAgICAgIG51bVBvaW50cyA9IGdldFJhbmRvbU9kZE51bWJlcihyYW5nZVswXSwgcmFuZ2VbMV0pO1xyXG4gICAgICAgICAgICAgIGN1cnJlbnRSb3dUeXBlID0gRVZFTjtcclxuICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICBicmVhaztcclxuXHJcbiAgICAgICAgY2FzZSBBTlk6XHJcbiAgICAgICAgICBudW1Qb2ludHMgPSBwYXJzZUludChwNS5yYW5kb20ocmFuZ2VbMF0sIHJhbmdlWzFdKSk7XHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgfVxyXG5cclxuICAgICAgLy8gR2VuZXJhdGUgcG9pbnRzIGFycmFuZ2VkIGluIGEgcmluZ1xyXG4gICAgICByaW5ncy5wdXNoKG5ldyBSaW5nKG51bVBvaW50cywgY3VycmVudFJhZGl1cykpO1xyXG5cclxuICAgICAgY3VycmVudFJhZGl1cyAtPSByYWRpdXNTdGVwICsgcDUucmFuZG9tKC1yYWRpdXNTdGVwLzIsIHJhZGl1c1N0ZXApO1xyXG4gICAgfVxyXG5cclxuICAgIHBvaW50cyA9IGdldFBvaW50cygpO1xyXG4gIH1cclxuXHJcbiAgZnVuY3Rpb24gZ2V0UG9pbnRzKCkge1xyXG4gICAgbGV0IHB0cyA9IFtdO1xyXG5cclxuICAgIC8vIEV4dHJhY3QgYWxsIHBvaW50cyBmcm9tIGFsbCByaW5ncyBmb3IgVm9yb25vaSBcclxuICAgIGZvcihsZXQgcmluZyBvZiByaW5ncykge1xyXG4gICAgICBmb3IobGV0IHBvaW50IG9mIHJpbmcucG9pbnRzKSB7XHJcbiAgICAgICAgcHRzLnB1c2gocG9pbnQpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHB0cztcclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIGdldFJhbmRvbUV2ZW5OdW1iZXIobWluLCBtYXgpIHtcclxuICAgIGxldCBudW0gPSBwYXJzZUludChwNS5yYW5kb20obWluLCBtYXgpKTtcclxuXHJcbiAgICBpZiAobnVtICUgMiA+IDApIHtcclxuICAgICAgaWYgKG51bSAtIDEgPCBtaW4pIHtcclxuICAgICAgICBudW0rKztcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBudW0tLTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBudW07XHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiBnZXRSYW5kb21PZGROdW1iZXIobWluLCBtYXgpIHtcclxuICAgIGxldCBudW0gPSBwYXJzZUludChwNS5yYW5kb20obWluLCBtYXgpKTtcclxuXHJcbiAgICBpZiAobnVtICUgMiA9PSAwKSB7XHJcbiAgICAgIGlmIChudW0gLSAxIDwgbWluKSB7XHJcbiAgICAgICAgbnVtKys7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgbnVtLS07XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gbnVtO1xyXG4gIH1cclxuICBcclxuICBmdW5jdGlvbiBleHBvcnRTVkcoKSB7XHJcbiAgICAvLyBTZXQgdXAgPHN2Zz4gZWxlbWVudFxyXG4gICAgbGV0IHN2ZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3N2ZycpO1xyXG4gICAgc3ZnLnNldEF0dHJpYnV0ZSgneG1sbnMnLCAnaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnKTtcclxuICAgIHN2Zy5zZXRBdHRyaWJ1dGUoJ3htbG5zOnhsaW5rJywgJ2h0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsnKTtcclxuICAgIHN2Zy5zZXRBdHRyaWJ1dGUoJ3dpZHRoJywgd2luZG93LmlubmVyV2lkdGgpO1xyXG4gICAgc3ZnLnNldEF0dHJpYnV0ZSgnaGVpZ2h0Jywgd2luZG93LmlubmVySGVpZ2h0KTtcclxuICAgIHN2Zy5zZXRBdHRyaWJ1dGUoJ3ZpZXdCb3gnLCAnMCAwICcgKyB3aW5kb3cuaW5uZXJXaWR0aCArICcgJyArIHdpbmRvdy5pbm5lckhlaWdodCk7XHJcblxyXG4gICAgbGV0IHBvbHlnb25zID0gZ2V0Vm9yb25vaVBvbHlnb25zKCk7XHJcblxyXG4gICAgZm9yKGxldCBwb2x5Z29uIG9mIHBvbHlnb25zKSB7XHJcbiAgICAgIHN2Zy5hcHBlbmRDaGlsZCggY3JlYXRlUGF0aEVsRnJvbVBvaW50cyhwb2x5Z29uKSApO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIEZvcmNlIGRvd25sb2FkIG9mIC5zdmcgZmlsZSBiYXNlZCBvbiBodHRwczovL2pzZmlkZGxlLm5ldC9jaDc3ZTd5aC8xXHJcbiAgICBsZXQgc3ZnRG9jVHlwZSA9IGRvY3VtZW50LmltcGxlbWVudGF0aW9uLmNyZWF0ZURvY3VtZW50VHlwZSgnc3ZnJywgXCItLy9XM0MvL0RURCBTVkcgMS4xLy9FTlwiLCBcImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZFwiKTtcclxuICAgIGxldCBzdmdEb2MgPSBkb2N1bWVudC5pbXBsZW1lbnRhdGlvbi5jcmVhdGVEb2N1bWVudCgnaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnLCAnc3ZnJywgc3ZnRG9jVHlwZSk7XHJcbiAgICBzdmdEb2MucmVwbGFjZUNoaWxkKHN2Zywgc3ZnRG9jLmRvY3VtZW50RWxlbWVudCk7XHJcbiAgICBsZXQgc3ZnRGF0YSA9IChuZXcgWE1MU2VyaWFsaXplcigpKS5zZXJpYWxpemVUb1N0cmluZyhzdmdEb2MpO1xyXG5cclxuICAgIGxldCBibG9iID0gbmV3IEJsb2IoW3N2Z0RhdGEucmVwbGFjZSgvPjwvZywgJz5cXG5cXHI8JyldKTtcclxuICAgIHNhdmVBcyhibG9iLCAndm9yb25vaS0nICsgRGF0ZS5ub3coKSArICcuc3ZnJyk7XHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiBjcmVhdGVQYXRoRWxGcm9tUG9pbnRzKHBvaW50cykge1xyXG4gICAgbGV0IHBvaW50c1N0cmluZyA9ICcnO1xyXG5cclxuICAgIGZvcihsZXQgW2luZGV4LCBwb2ludF0gb2YgcG9pbnRzLmVudHJpZXMoKSkge1xyXG4gICAgICBwb2ludHNTdHJpbmcgKz0gcG9pbnRbMF0gKyAnLCcgKyBwb2ludFsxXTtcclxuXHJcbiAgICAgIGlmKGluZGV4IDwgcG9pbnRzLmxlbmd0aCAtIDEpIHtcclxuICAgICAgICBwb2ludHNTdHJpbmcgKz0gJyAnO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgbGV0IGQgPSB0b1BhdGgoe1xyXG4gICAgICB0eXBlOiAncG9seWxpbmUnLFxyXG4gICAgICBwb2ludHM6IHBvaW50c1N0cmluZ1xyXG4gICAgfSk7XHJcblxyXG4gICAgbGV0IHBhdGhFbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3BhdGgnKTtcclxuICAgIHBhdGhFbC5zZXRBdHRyaWJ1dGUoJ2QnLCBkKTtcclxuICAgIHBhdGhFbC5zZXRBdHRyaWJ1dGUoJ3N0eWxlJywgJ2ZpbGw6IG5vbmU7IHN0cm9rZTogYmxhY2s7IHN0cm9rZS13aWR0aDogMScpO1xyXG5cclxuICAgIHJldHVybiBwYXRoRWw7XHJcbiAgfVxyXG4gIFxyXG5cclxuICAvKlxyXG4gICAgS2V5IHJlbGVhc2VkIGhhbmRsZXJcclxuICAgID09PT09PT09PT09PT09PT09PT09XHJcbiAgKi9cclxuICBwNS5rZXlSZWxlYXNlZCA9IGZ1bmN0aW9uICgpIHtcclxuICAgIHN3aXRjaCAocDUua2V5KSB7XHJcbiAgICAgIGNhc2UgJ3InOlxyXG4gICAgICAgIGdlbmVyYXRlUG9pbnRzKCk7XHJcbiAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICBjYXNlICdwJzpcclxuICAgICAgICBzaG93UG9pbnRzID0gIXNob3dQb2ludHM7XHJcbiAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICBjYXNlICdpJzpcclxuICAgICAgICBpbnZlcnRDb2xvcnMgPSAhaW52ZXJ0Q29sb3JzO1xyXG4gICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgY2FzZSAnYic6XHJcbiAgICAgICAgdXNlQmx1ckVmZmVjdCA9ICF1c2VCbHVyRWZmZWN0O1xyXG4gICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgY2FzZSAnZSc6XHJcbiAgICAgICAgZXhwb3J0U1ZHKCk7XHJcbiAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICBjYXNlICcgJzpcclxuICAgICAgICBpc1BhdXNlZCA9ICFpc1BhdXNlZDtcclxuICAgICAgICBicmVhaztcclxuXHJcbiAgICAgIGNhc2UgJzEnOlxyXG4gICAgICAgIFJPV19UWVBFID0gRVZFTjtcclxuICAgICAgICBnZW5lcmF0ZVBvaW50cygpO1xyXG4gICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgY2FzZSAnMic6XHJcbiAgICAgICAgUk9XX1RZUEUgPSBPREQ7XHJcbiAgICAgICAgZ2VuZXJhdGVQb2ludHMoKTtcclxuICAgICAgICBicmVhaztcclxuXHJcbiAgICAgIGNhc2UgJzMnOlxyXG4gICAgICAgIFJPV19UWVBFID0gQUxURVJOQVRJTkc7XHJcbiAgICAgICAgZ2VuZXJhdGVQb2ludHMoKTtcclxuICAgICAgICBicmVhaztcclxuXHJcbiAgICAgIGNhc2UgJzQnOlxyXG4gICAgICAgIFJPV19UWVBFID0gQU5ZO1xyXG4gICAgICAgIGdlbmVyYXRlUG9pbnRzKCk7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcblxyXG4vLyBMYXVuY2ggdGhlIHNrZXRjaCB1c2luZyBwNWpzIGluIGluc3RhbnRpYXRlZCBtb2RlXHJcbm5ldyBwNShza2V0Y2gpOyJdLCJzb3VyY2VSb290IjoiIn0=