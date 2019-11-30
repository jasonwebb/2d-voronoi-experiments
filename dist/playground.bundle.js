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
/******/ 	return __webpack_require__(__webpack_require__.s = "./playground/js/entry.js");
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

/***/ "./node_modules/dat.gui/build/dat.gui.module.js":
/*!******************************************************!*\
  !*** ./node_modules/dat.gui/build/dat.gui.module.js ***!
  \******************************************************/
/*! exports provided: color, controllers, dom, gui, GUI, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "color", function() { return color; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "controllers", function() { return controllers; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "dom", function() { return dom$1; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "gui", function() { return gui; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GUI", function() { return GUI$1; });
/**
 * dat-gui JavaScript Controller Library
 * http://code.google.com/p/dat-gui
 *
 * Copyright 2011 Data Arts Team, Google Creative Lab
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 */

function ___$insertStyle(css) {
  if (!css) {
    return;
  }
  if (typeof window === 'undefined') {
    return;
  }

  var style = document.createElement('style');

  style.setAttribute('type', 'text/css');
  style.innerHTML = css;
  document.head.appendChild(style);

  return css;
}

function colorToString (color, forceCSSHex) {
  var colorFormat = color.__state.conversionName.toString();
  var r = Math.round(color.r);
  var g = Math.round(color.g);
  var b = Math.round(color.b);
  var a = color.a;
  var h = Math.round(color.h);
  var s = color.s.toFixed(1);
  var v = color.v.toFixed(1);
  if (forceCSSHex || colorFormat === 'THREE_CHAR_HEX' || colorFormat === 'SIX_CHAR_HEX') {
    var str = color.hex.toString(16);
    while (str.length < 6) {
      str = '0' + str;
    }
    return '#' + str;
  } else if (colorFormat === 'CSS_RGB') {
    return 'rgb(' + r + ',' + g + ',' + b + ')';
  } else if (colorFormat === 'CSS_RGBA') {
    return 'rgba(' + r + ',' + g + ',' + b + ',' + a + ')';
  } else if (colorFormat === 'HEX') {
    return '0x' + color.hex.toString(16);
  } else if (colorFormat === 'RGB_ARRAY') {
    return '[' + r + ',' + g + ',' + b + ']';
  } else if (colorFormat === 'RGBA_ARRAY') {
    return '[' + r + ',' + g + ',' + b + ',' + a + ']';
  } else if (colorFormat === 'RGB_OBJ') {
    return '{r:' + r + ',g:' + g + ',b:' + b + '}';
  } else if (colorFormat === 'RGBA_OBJ') {
    return '{r:' + r + ',g:' + g + ',b:' + b + ',a:' + a + '}';
  } else if (colorFormat === 'HSV_OBJ') {
    return '{h:' + h + ',s:' + s + ',v:' + v + '}';
  } else if (colorFormat === 'HSVA_OBJ') {
    return '{h:' + h + ',s:' + s + ',v:' + v + ',a:' + a + '}';
  }
  return 'unknown format';
}

var ARR_EACH = Array.prototype.forEach;
var ARR_SLICE = Array.prototype.slice;
var Common = {
  BREAK: {},
  extend: function extend(target) {
    this.each(ARR_SLICE.call(arguments, 1), function (obj) {
      var keys = this.isObject(obj) ? Object.keys(obj) : [];
      keys.forEach(function (key) {
        if (!this.isUndefined(obj[key])) {
          target[key] = obj[key];
        }
      }.bind(this));
    }, this);
    return target;
  },
  defaults: function defaults(target) {
    this.each(ARR_SLICE.call(arguments, 1), function (obj) {
      var keys = this.isObject(obj) ? Object.keys(obj) : [];
      keys.forEach(function (key) {
        if (this.isUndefined(target[key])) {
          target[key] = obj[key];
        }
      }.bind(this));
    }, this);
    return target;
  },
  compose: function compose() {
    var toCall = ARR_SLICE.call(arguments);
    return function () {
      var args = ARR_SLICE.call(arguments);
      for (var i = toCall.length - 1; i >= 0; i--) {
        args = [toCall[i].apply(this, args)];
      }
      return args[0];
    };
  },
  each: function each(obj, itr, scope) {
    if (!obj) {
      return;
    }
    if (ARR_EACH && obj.forEach && obj.forEach === ARR_EACH) {
      obj.forEach(itr, scope);
    } else if (obj.length === obj.length + 0) {
      var key = void 0;
      var l = void 0;
      for (key = 0, l = obj.length; key < l; key++) {
        if (key in obj && itr.call(scope, obj[key], key) === this.BREAK) {
          return;
        }
      }
    } else {
      for (var _key in obj) {
        if (itr.call(scope, obj[_key], _key) === this.BREAK) {
          return;
        }
      }
    }
  },
  defer: function defer(fnc) {
    setTimeout(fnc, 0);
  },
  debounce: function debounce(func, threshold, callImmediately) {
    var timeout = void 0;
    return function () {
      var obj = this;
      var args = arguments;
      function delayed() {
        timeout = null;
        if (!callImmediately) func.apply(obj, args);
      }
      var callNow = callImmediately || !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(delayed, threshold);
      if (callNow) {
        func.apply(obj, args);
      }
    };
  },
  toArray: function toArray(obj) {
    if (obj.toArray) return obj.toArray();
    return ARR_SLICE.call(obj);
  },
  isUndefined: function isUndefined(obj) {
    return obj === undefined;
  },
  isNull: function isNull(obj) {
    return obj === null;
  },
  isNaN: function (_isNaN) {
    function isNaN(_x) {
      return _isNaN.apply(this, arguments);
    }
    isNaN.toString = function () {
      return _isNaN.toString();
    };
    return isNaN;
  }(function (obj) {
    return isNaN(obj);
  }),
  isArray: Array.isArray || function (obj) {
    return obj.constructor === Array;
  },
  isObject: function isObject(obj) {
    return obj === Object(obj);
  },
  isNumber: function isNumber(obj) {
    return obj === obj + 0;
  },
  isString: function isString(obj) {
    return obj === obj + '';
  },
  isBoolean: function isBoolean(obj) {
    return obj === false || obj === true;
  },
  isFunction: function isFunction(obj) {
    return Object.prototype.toString.call(obj) === '[object Function]';
  }
};

var INTERPRETATIONS = [
{
  litmus: Common.isString,
  conversions: {
    THREE_CHAR_HEX: {
      read: function read(original) {
        var test = original.match(/^#([A-F0-9])([A-F0-9])([A-F0-9])$/i);
        if (test === null) {
          return false;
        }
        return {
          space: 'HEX',
          hex: parseInt('0x' + test[1].toString() + test[1].toString() + test[2].toString() + test[2].toString() + test[3].toString() + test[3].toString(), 0)
        };
      },
      write: colorToString
    },
    SIX_CHAR_HEX: {
      read: function read(original) {
        var test = original.match(/^#([A-F0-9]{6})$/i);
        if (test === null) {
          return false;
        }
        return {
          space: 'HEX',
          hex: parseInt('0x' + test[1].toString(), 0)
        };
      },
      write: colorToString
    },
    CSS_RGB: {
      read: function read(original) {
        var test = original.match(/^rgb\(\s*(.+)\s*,\s*(.+)\s*,\s*(.+)\s*\)/);
        if (test === null) {
          return false;
        }
        return {
          space: 'RGB',
          r: parseFloat(test[1]),
          g: parseFloat(test[2]),
          b: parseFloat(test[3])
        };
      },
      write: colorToString
    },
    CSS_RGBA: {
      read: function read(original) {
        var test = original.match(/^rgba\(\s*(.+)\s*,\s*(.+)\s*,\s*(.+)\s*,\s*(.+)\s*\)/);
        if (test === null) {
          return false;
        }
        return {
          space: 'RGB',
          r: parseFloat(test[1]),
          g: parseFloat(test[2]),
          b: parseFloat(test[3]),
          a: parseFloat(test[4])
        };
      },
      write: colorToString
    }
  }
},
{
  litmus: Common.isNumber,
  conversions: {
    HEX: {
      read: function read(original) {
        return {
          space: 'HEX',
          hex: original,
          conversionName: 'HEX'
        };
      },
      write: function write(color) {
        return color.hex;
      }
    }
  }
},
{
  litmus: Common.isArray,
  conversions: {
    RGB_ARRAY: {
      read: function read(original) {
        if (original.length !== 3) {
          return false;
        }
        return {
          space: 'RGB',
          r: original[0],
          g: original[1],
          b: original[2]
        };
      },
      write: function write(color) {
        return [color.r, color.g, color.b];
      }
    },
    RGBA_ARRAY: {
      read: function read(original) {
        if (original.length !== 4) return false;
        return {
          space: 'RGB',
          r: original[0],
          g: original[1],
          b: original[2],
          a: original[3]
        };
      },
      write: function write(color) {
        return [color.r, color.g, color.b, color.a];
      }
    }
  }
},
{
  litmus: Common.isObject,
  conversions: {
    RGBA_OBJ: {
      read: function read(original) {
        if (Common.isNumber(original.r) && Common.isNumber(original.g) && Common.isNumber(original.b) && Common.isNumber(original.a)) {
          return {
            space: 'RGB',
            r: original.r,
            g: original.g,
            b: original.b,
            a: original.a
          };
        }
        return false;
      },
      write: function write(color) {
        return {
          r: color.r,
          g: color.g,
          b: color.b,
          a: color.a
        };
      }
    },
    RGB_OBJ: {
      read: function read(original) {
        if (Common.isNumber(original.r) && Common.isNumber(original.g) && Common.isNumber(original.b)) {
          return {
            space: 'RGB',
            r: original.r,
            g: original.g,
            b: original.b
          };
        }
        return false;
      },
      write: function write(color) {
        return {
          r: color.r,
          g: color.g,
          b: color.b
        };
      }
    },
    HSVA_OBJ: {
      read: function read(original) {
        if (Common.isNumber(original.h) && Common.isNumber(original.s) && Common.isNumber(original.v) && Common.isNumber(original.a)) {
          return {
            space: 'HSV',
            h: original.h,
            s: original.s,
            v: original.v,
            a: original.a
          };
        }
        return false;
      },
      write: function write(color) {
        return {
          h: color.h,
          s: color.s,
          v: color.v,
          a: color.a
        };
      }
    },
    HSV_OBJ: {
      read: function read(original) {
        if (Common.isNumber(original.h) && Common.isNumber(original.s) && Common.isNumber(original.v)) {
          return {
            space: 'HSV',
            h: original.h,
            s: original.s,
            v: original.v
          };
        }
        return false;
      },
      write: function write(color) {
        return {
          h: color.h,
          s: color.s,
          v: color.v
        };
      }
    }
  }
}];
var result = void 0;
var toReturn = void 0;
var interpret = function interpret() {
  toReturn = false;
  var original = arguments.length > 1 ? Common.toArray(arguments) : arguments[0];
  Common.each(INTERPRETATIONS, function (family) {
    if (family.litmus(original)) {
      Common.each(family.conversions, function (conversion, conversionName) {
        result = conversion.read(original);
        if (toReturn === false && result !== false) {
          toReturn = result;
          result.conversionName = conversionName;
          result.conversion = conversion;
          return Common.BREAK;
        }
      });
      return Common.BREAK;
    }
  });
  return toReturn;
};

var tmpComponent = void 0;
var ColorMath = {
  hsv_to_rgb: function hsv_to_rgb(h, s, v) {
    var hi = Math.floor(h / 60) % 6;
    var f = h / 60 - Math.floor(h / 60);
    var p = v * (1.0 - s);
    var q = v * (1.0 - f * s);
    var t = v * (1.0 - (1.0 - f) * s);
    var c = [[v, t, p], [q, v, p], [p, v, t], [p, q, v], [t, p, v], [v, p, q]][hi];
    return {
      r: c[0] * 255,
      g: c[1] * 255,
      b: c[2] * 255
    };
  },
  rgb_to_hsv: function rgb_to_hsv(r, g, b) {
    var min = Math.min(r, g, b);
    var max = Math.max(r, g, b);
    var delta = max - min;
    var h = void 0;
    var s = void 0;
    if (max !== 0) {
      s = delta / max;
    } else {
      return {
        h: NaN,
        s: 0,
        v: 0
      };
    }
    if (r === max) {
      h = (g - b) / delta;
    } else if (g === max) {
      h = 2 + (b - r) / delta;
    } else {
      h = 4 + (r - g) / delta;
    }
    h /= 6;
    if (h < 0) {
      h += 1;
    }
    return {
      h: h * 360,
      s: s,
      v: max / 255
    };
  },
  rgb_to_hex: function rgb_to_hex(r, g, b) {
    var hex = this.hex_with_component(0, 2, r);
    hex = this.hex_with_component(hex, 1, g);
    hex = this.hex_with_component(hex, 0, b);
    return hex;
  },
  component_from_hex: function component_from_hex(hex, componentIndex) {
    return hex >> componentIndex * 8 & 0xFF;
  },
  hex_with_component: function hex_with_component(hex, componentIndex, value) {
    return value << (tmpComponent = componentIndex * 8) | hex & ~(0xFF << tmpComponent);
  }
};

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};











var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();







var get = function get(object, property, receiver) {
  if (object === null) object = Function.prototype;
  var desc = Object.getOwnPropertyDescriptor(object, property);

  if (desc === undefined) {
    var parent = Object.getPrototypeOf(object);

    if (parent === null) {
      return undefined;
    } else {
      return get(parent, property, receiver);
    }
  } else if ("value" in desc) {
    return desc.value;
  } else {
    var getter = desc.get;

    if (getter === undefined) {
      return undefined;
    }

    return getter.call(receiver);
  }
};

var inherits = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
};











var possibleConstructorReturn = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (typeof call === "object" || typeof call === "function") ? call : self;
};

var Color = function () {
  function Color() {
    classCallCheck(this, Color);
    this.__state = interpret.apply(this, arguments);
    if (this.__state === false) {
      throw new Error('Failed to interpret color arguments');
    }
    this.__state.a = this.__state.a || 1;
  }
  createClass(Color, [{
    key: 'toString',
    value: function toString() {
      return colorToString(this);
    }
  }, {
    key: 'toHexString',
    value: function toHexString() {
      return colorToString(this, true);
    }
  }, {
    key: 'toOriginal',
    value: function toOriginal() {
      return this.__state.conversion.write(this);
    }
  }]);
  return Color;
}();
function defineRGBComponent(target, component, componentHexIndex) {
  Object.defineProperty(target, component, {
    get: function get$$1() {
      if (this.__state.space === 'RGB') {
        return this.__state[component];
      }
      Color.recalculateRGB(this, component, componentHexIndex);
      return this.__state[component];
    },
    set: function set$$1(v) {
      if (this.__state.space !== 'RGB') {
        Color.recalculateRGB(this, component, componentHexIndex);
        this.__state.space = 'RGB';
      }
      this.__state[component] = v;
    }
  });
}
function defineHSVComponent(target, component) {
  Object.defineProperty(target, component, {
    get: function get$$1() {
      if (this.__state.space === 'HSV') {
        return this.__state[component];
      }
      Color.recalculateHSV(this);
      return this.__state[component];
    },
    set: function set$$1(v) {
      if (this.__state.space !== 'HSV') {
        Color.recalculateHSV(this);
        this.__state.space = 'HSV';
      }
      this.__state[component] = v;
    }
  });
}
Color.recalculateRGB = function (color, component, componentHexIndex) {
  if (color.__state.space === 'HEX') {
    color.__state[component] = ColorMath.component_from_hex(color.__state.hex, componentHexIndex);
  } else if (color.__state.space === 'HSV') {
    Common.extend(color.__state, ColorMath.hsv_to_rgb(color.__state.h, color.__state.s, color.__state.v));
  } else {
    throw new Error('Corrupted color state');
  }
};
Color.recalculateHSV = function (color) {
  var result = ColorMath.rgb_to_hsv(color.r, color.g, color.b);
  Common.extend(color.__state, {
    s: result.s,
    v: result.v
  });
  if (!Common.isNaN(result.h)) {
    color.__state.h = result.h;
  } else if (Common.isUndefined(color.__state.h)) {
    color.__state.h = 0;
  }
};
Color.COMPONENTS = ['r', 'g', 'b', 'h', 's', 'v', 'hex', 'a'];
defineRGBComponent(Color.prototype, 'r', 2);
defineRGBComponent(Color.prototype, 'g', 1);
defineRGBComponent(Color.prototype, 'b', 0);
defineHSVComponent(Color.prototype, 'h');
defineHSVComponent(Color.prototype, 's');
defineHSVComponent(Color.prototype, 'v');
Object.defineProperty(Color.prototype, 'a', {
  get: function get$$1() {
    return this.__state.a;
  },
  set: function set$$1(v) {
    this.__state.a = v;
  }
});
Object.defineProperty(Color.prototype, 'hex', {
  get: function get$$1() {
    if (!this.__state.space !== 'HEX') {
      this.__state.hex = ColorMath.rgb_to_hex(this.r, this.g, this.b);
    }
    return this.__state.hex;
  },
  set: function set$$1(v) {
    this.__state.space = 'HEX';
    this.__state.hex = v;
  }
});

var Controller = function () {
  function Controller(object, property) {
    classCallCheck(this, Controller);
    this.initialValue = object[property];
    this.domElement = document.createElement('div');
    this.object = object;
    this.property = property;
    this.__onChange = undefined;
    this.__onFinishChange = undefined;
  }
  createClass(Controller, [{
    key: 'onChange',
    value: function onChange(fnc) {
      this.__onChange = fnc;
      return this;
    }
  }, {
    key: 'onFinishChange',
    value: function onFinishChange(fnc) {
      this.__onFinishChange = fnc;
      return this;
    }
  }, {
    key: 'setValue',
    value: function setValue(newValue) {
      this.object[this.property] = newValue;
      if (this.__onChange) {
        this.__onChange.call(this, newValue);
      }
      this.updateDisplay();
      return this;
    }
  }, {
    key: 'getValue',
    value: function getValue() {
      return this.object[this.property];
    }
  }, {
    key: 'updateDisplay',
    value: function updateDisplay() {
      return this;
    }
  }, {
    key: 'isModified',
    value: function isModified() {
      return this.initialValue !== this.getValue();
    }
  }]);
  return Controller;
}();

var EVENT_MAP = {
  HTMLEvents: ['change'],
  MouseEvents: ['click', 'mousemove', 'mousedown', 'mouseup', 'mouseover'],
  KeyboardEvents: ['keydown']
};
var EVENT_MAP_INV = {};
Common.each(EVENT_MAP, function (v, k) {
  Common.each(v, function (e) {
    EVENT_MAP_INV[e] = k;
  });
});
var CSS_VALUE_PIXELS = /(\d+(\.\d+)?)px/;
function cssValueToPixels(val) {
  if (val === '0' || Common.isUndefined(val)) {
    return 0;
  }
  var match = val.match(CSS_VALUE_PIXELS);
  if (!Common.isNull(match)) {
    return parseFloat(match[1]);
  }
  return 0;
}
var dom = {
  makeSelectable: function makeSelectable(elem, selectable) {
    if (elem === undefined || elem.style === undefined) return;
    elem.onselectstart = selectable ? function () {
      return false;
    } : function () {};
    elem.style.MozUserSelect = selectable ? 'auto' : 'none';
    elem.style.KhtmlUserSelect = selectable ? 'auto' : 'none';
    elem.unselectable = selectable ? 'on' : 'off';
  },
  makeFullscreen: function makeFullscreen(elem, hor, vert) {
    var vertical = vert;
    var horizontal = hor;
    if (Common.isUndefined(horizontal)) {
      horizontal = true;
    }
    if (Common.isUndefined(vertical)) {
      vertical = true;
    }
    elem.style.position = 'absolute';
    if (horizontal) {
      elem.style.left = 0;
      elem.style.right = 0;
    }
    if (vertical) {
      elem.style.top = 0;
      elem.style.bottom = 0;
    }
  },
  fakeEvent: function fakeEvent(elem, eventType, pars, aux) {
    var params = pars || {};
    var className = EVENT_MAP_INV[eventType];
    if (!className) {
      throw new Error('Event type ' + eventType + ' not supported.');
    }
    var evt = document.createEvent(className);
    switch (className) {
      case 'MouseEvents':
        {
          var clientX = params.x || params.clientX || 0;
          var clientY = params.y || params.clientY || 0;
          evt.initMouseEvent(eventType, params.bubbles || false, params.cancelable || true, window, params.clickCount || 1, 0,
          0,
          clientX,
          clientY,
          false, false, false, false, 0, null);
          break;
        }
      case 'KeyboardEvents':
        {
          var init = evt.initKeyboardEvent || evt.initKeyEvent;
          Common.defaults(params, {
            cancelable: true,
            ctrlKey: false,
            altKey: false,
            shiftKey: false,
            metaKey: false,
            keyCode: undefined,
            charCode: undefined
          });
          init(eventType, params.bubbles || false, params.cancelable, window, params.ctrlKey, params.altKey, params.shiftKey, params.metaKey, params.keyCode, params.charCode);
          break;
        }
      default:
        {
          evt.initEvent(eventType, params.bubbles || false, params.cancelable || true);
          break;
        }
    }
    Common.defaults(evt, aux);
    elem.dispatchEvent(evt);
  },
  bind: function bind(elem, event, func, newBool) {
    var bool = newBool || false;
    if (elem.addEventListener) {
      elem.addEventListener(event, func, bool);
    } else if (elem.attachEvent) {
      elem.attachEvent('on' + event, func);
    }
    return dom;
  },
  unbind: function unbind(elem, event, func, newBool) {
    var bool = newBool || false;
    if (elem.removeEventListener) {
      elem.removeEventListener(event, func, bool);
    } else if (elem.detachEvent) {
      elem.detachEvent('on' + event, func);
    }
    return dom;
  },
  addClass: function addClass(elem, className) {
    if (elem.className === undefined) {
      elem.className = className;
    } else if (elem.className !== className) {
      var classes = elem.className.split(/ +/);
      if (classes.indexOf(className) === -1) {
        classes.push(className);
        elem.className = classes.join(' ').replace(/^\s+/, '').replace(/\s+$/, '');
      }
    }
    return dom;
  },
  removeClass: function removeClass(elem, className) {
    if (className) {
      if (elem.className === className) {
        elem.removeAttribute('class');
      } else {
        var classes = elem.className.split(/ +/);
        var index = classes.indexOf(className);
        if (index !== -1) {
          classes.splice(index, 1);
          elem.className = classes.join(' ');
        }
      }
    } else {
      elem.className = undefined;
    }
    return dom;
  },
  hasClass: function hasClass(elem, className) {
    return new RegExp('(?:^|\\s+)' + className + '(?:\\s+|$)').test(elem.className) || false;
  },
  getWidth: function getWidth(elem) {
    var style = getComputedStyle(elem);
    return cssValueToPixels(style['border-left-width']) + cssValueToPixels(style['border-right-width']) + cssValueToPixels(style['padding-left']) + cssValueToPixels(style['padding-right']) + cssValueToPixels(style.width);
  },
  getHeight: function getHeight(elem) {
    var style = getComputedStyle(elem);
    return cssValueToPixels(style['border-top-width']) + cssValueToPixels(style['border-bottom-width']) + cssValueToPixels(style['padding-top']) + cssValueToPixels(style['padding-bottom']) + cssValueToPixels(style.height);
  },
  getOffset: function getOffset(el) {
    var elem = el;
    var offset = { left: 0, top: 0 };
    if (elem.offsetParent) {
      do {
        offset.left += elem.offsetLeft;
        offset.top += elem.offsetTop;
        elem = elem.offsetParent;
      } while (elem);
    }
    return offset;
  },
  isActive: function isActive(elem) {
    return elem === document.activeElement && (elem.type || elem.href);
  }
};

var BooleanController = function (_Controller) {
  inherits(BooleanController, _Controller);
  function BooleanController(object, property) {
    classCallCheck(this, BooleanController);
    var _this2 = possibleConstructorReturn(this, (BooleanController.__proto__ || Object.getPrototypeOf(BooleanController)).call(this, object, property));
    var _this = _this2;
    _this2.__prev = _this2.getValue();
    _this2.__checkbox = document.createElement('input');
    _this2.__checkbox.setAttribute('type', 'checkbox');
    function onChange() {
      _this.setValue(!_this.__prev);
    }
    dom.bind(_this2.__checkbox, 'change', onChange, false);
    _this2.domElement.appendChild(_this2.__checkbox);
    _this2.updateDisplay();
    return _this2;
  }
  createClass(BooleanController, [{
    key: 'setValue',
    value: function setValue(v) {
      var toReturn = get(BooleanController.prototype.__proto__ || Object.getPrototypeOf(BooleanController.prototype), 'setValue', this).call(this, v);
      if (this.__onFinishChange) {
        this.__onFinishChange.call(this, this.getValue());
      }
      this.__prev = this.getValue();
      return toReturn;
    }
  }, {
    key: 'updateDisplay',
    value: function updateDisplay() {
      if (this.getValue() === true) {
        this.__checkbox.setAttribute('checked', 'checked');
        this.__checkbox.checked = true;
        this.__prev = true;
      } else {
        this.__checkbox.checked = false;
        this.__prev = false;
      }
      return get(BooleanController.prototype.__proto__ || Object.getPrototypeOf(BooleanController.prototype), 'updateDisplay', this).call(this);
    }
  }]);
  return BooleanController;
}(Controller);

var OptionController = function (_Controller) {
  inherits(OptionController, _Controller);
  function OptionController(object, property, opts) {
    classCallCheck(this, OptionController);
    var _this2 = possibleConstructorReturn(this, (OptionController.__proto__ || Object.getPrototypeOf(OptionController)).call(this, object, property));
    var options = opts;
    var _this = _this2;
    _this2.__select = document.createElement('select');
    if (Common.isArray(options)) {
      var map = {};
      Common.each(options, function (element) {
        map[element] = element;
      });
      options = map;
    }
    Common.each(options, function (value, key) {
      var opt = document.createElement('option');
      opt.innerHTML = key;
      opt.setAttribute('value', value);
      _this.__select.appendChild(opt);
    });
    _this2.updateDisplay();
    dom.bind(_this2.__select, 'change', function () {
      var desiredValue = this.options[this.selectedIndex].value;
      _this.setValue(desiredValue);
    });
    _this2.domElement.appendChild(_this2.__select);
    return _this2;
  }
  createClass(OptionController, [{
    key: 'setValue',
    value: function setValue(v) {
      var toReturn = get(OptionController.prototype.__proto__ || Object.getPrototypeOf(OptionController.prototype), 'setValue', this).call(this, v);
      if (this.__onFinishChange) {
        this.__onFinishChange.call(this, this.getValue());
      }
      return toReturn;
    }
  }, {
    key: 'updateDisplay',
    value: function updateDisplay() {
      if (dom.isActive(this.__select)) return this;
      this.__select.value = this.getValue();
      return get(OptionController.prototype.__proto__ || Object.getPrototypeOf(OptionController.prototype), 'updateDisplay', this).call(this);
    }
  }]);
  return OptionController;
}(Controller);

var StringController = function (_Controller) {
  inherits(StringController, _Controller);
  function StringController(object, property) {
    classCallCheck(this, StringController);
    var _this2 = possibleConstructorReturn(this, (StringController.__proto__ || Object.getPrototypeOf(StringController)).call(this, object, property));
    var _this = _this2;
    function onChange() {
      _this.setValue(_this.__input.value);
    }
    function onBlur() {
      if (_this.__onFinishChange) {
        _this.__onFinishChange.call(_this, _this.getValue());
      }
    }
    _this2.__input = document.createElement('input');
    _this2.__input.setAttribute('type', 'text');
    dom.bind(_this2.__input, 'keyup', onChange);
    dom.bind(_this2.__input, 'change', onChange);
    dom.bind(_this2.__input, 'blur', onBlur);
    dom.bind(_this2.__input, 'keydown', function (e) {
      if (e.keyCode === 13) {
        this.blur();
      }
    });
    _this2.updateDisplay();
    _this2.domElement.appendChild(_this2.__input);
    return _this2;
  }
  createClass(StringController, [{
    key: 'updateDisplay',
    value: function updateDisplay() {
      if (!dom.isActive(this.__input)) {
        this.__input.value = this.getValue();
      }
      return get(StringController.prototype.__proto__ || Object.getPrototypeOf(StringController.prototype), 'updateDisplay', this).call(this);
    }
  }]);
  return StringController;
}(Controller);

function numDecimals(x) {
  var _x = x.toString();
  if (_x.indexOf('.') > -1) {
    return _x.length - _x.indexOf('.') - 1;
  }
  return 0;
}
var NumberController = function (_Controller) {
  inherits(NumberController, _Controller);
  function NumberController(object, property, params) {
    classCallCheck(this, NumberController);
    var _this = possibleConstructorReturn(this, (NumberController.__proto__ || Object.getPrototypeOf(NumberController)).call(this, object, property));
    var _params = params || {};
    _this.__min = _params.min;
    _this.__max = _params.max;
    _this.__step = _params.step;
    if (Common.isUndefined(_this.__step)) {
      if (_this.initialValue === 0) {
        _this.__impliedStep = 1;
      } else {
        _this.__impliedStep = Math.pow(10, Math.floor(Math.log(Math.abs(_this.initialValue)) / Math.LN10)) / 10;
      }
    } else {
      _this.__impliedStep = _this.__step;
    }
    _this.__precision = numDecimals(_this.__impliedStep);
    return _this;
  }
  createClass(NumberController, [{
    key: 'setValue',
    value: function setValue(v) {
      var _v = v;
      if (this.__min !== undefined && _v < this.__min) {
        _v = this.__min;
      } else if (this.__max !== undefined && _v > this.__max) {
        _v = this.__max;
      }
      if (this.__step !== undefined && _v % this.__step !== 0) {
        _v = Math.round(_v / this.__step) * this.__step;
      }
      return get(NumberController.prototype.__proto__ || Object.getPrototypeOf(NumberController.prototype), 'setValue', this).call(this, _v);
    }
  }, {
    key: 'min',
    value: function min(minValue) {
      this.__min = minValue;
      return this;
    }
  }, {
    key: 'max',
    value: function max(maxValue) {
      this.__max = maxValue;
      return this;
    }
  }, {
    key: 'step',
    value: function step(stepValue) {
      this.__step = stepValue;
      this.__impliedStep = stepValue;
      this.__precision = numDecimals(stepValue);
      return this;
    }
  }]);
  return NumberController;
}(Controller);

function roundToDecimal(value, decimals) {
  var tenTo = Math.pow(10, decimals);
  return Math.round(value * tenTo) / tenTo;
}
var NumberControllerBox = function (_NumberController) {
  inherits(NumberControllerBox, _NumberController);
  function NumberControllerBox(object, property, params) {
    classCallCheck(this, NumberControllerBox);
    var _this2 = possibleConstructorReturn(this, (NumberControllerBox.__proto__ || Object.getPrototypeOf(NumberControllerBox)).call(this, object, property, params));
    _this2.__truncationSuspended = false;
    var _this = _this2;
    var prevY = void 0;
    function onChange() {
      var attempted = parseFloat(_this.__input.value);
      if (!Common.isNaN(attempted)) {
        _this.setValue(attempted);
      }
    }
    function onFinish() {
      if (_this.__onFinishChange) {
        _this.__onFinishChange.call(_this, _this.getValue());
      }
    }
    function onBlur() {
      onFinish();
    }
    function onMouseDrag(e) {
      var diff = prevY - e.clientY;
      _this.setValue(_this.getValue() + diff * _this.__impliedStep);
      prevY = e.clientY;
    }
    function onMouseUp() {
      dom.unbind(window, 'mousemove', onMouseDrag);
      dom.unbind(window, 'mouseup', onMouseUp);
      onFinish();
    }
    function onMouseDown(e) {
      dom.bind(window, 'mousemove', onMouseDrag);
      dom.bind(window, 'mouseup', onMouseUp);
      prevY = e.clientY;
    }
    _this2.__input = document.createElement('input');
    _this2.__input.setAttribute('type', 'text');
    dom.bind(_this2.__input, 'change', onChange);
    dom.bind(_this2.__input, 'blur', onBlur);
    dom.bind(_this2.__input, 'mousedown', onMouseDown);
    dom.bind(_this2.__input, 'keydown', function (e) {
      if (e.keyCode === 13) {
        _this.__truncationSuspended = true;
        this.blur();
        _this.__truncationSuspended = false;
        onFinish();
      }
    });
    _this2.updateDisplay();
    _this2.domElement.appendChild(_this2.__input);
    return _this2;
  }
  createClass(NumberControllerBox, [{
    key: 'updateDisplay',
    value: function updateDisplay() {
      this.__input.value = this.__truncationSuspended ? this.getValue() : roundToDecimal(this.getValue(), this.__precision);
      return get(NumberControllerBox.prototype.__proto__ || Object.getPrototypeOf(NumberControllerBox.prototype), 'updateDisplay', this).call(this);
    }
  }]);
  return NumberControllerBox;
}(NumberController);

function map(v, i1, i2, o1, o2) {
  return o1 + (o2 - o1) * ((v - i1) / (i2 - i1));
}
var NumberControllerSlider = function (_NumberController) {
  inherits(NumberControllerSlider, _NumberController);
  function NumberControllerSlider(object, property, min, max, step) {
    classCallCheck(this, NumberControllerSlider);
    var _this2 = possibleConstructorReturn(this, (NumberControllerSlider.__proto__ || Object.getPrototypeOf(NumberControllerSlider)).call(this, object, property, { min: min, max: max, step: step }));
    var _this = _this2;
    _this2.__background = document.createElement('div');
    _this2.__foreground = document.createElement('div');
    dom.bind(_this2.__background, 'mousedown', onMouseDown);
    dom.bind(_this2.__background, 'touchstart', onTouchStart);
    dom.addClass(_this2.__background, 'slider');
    dom.addClass(_this2.__foreground, 'slider-fg');
    function onMouseDown(e) {
      document.activeElement.blur();
      dom.bind(window, 'mousemove', onMouseDrag);
      dom.bind(window, 'mouseup', onMouseUp);
      onMouseDrag(e);
    }
    function onMouseDrag(e) {
      e.preventDefault();
      var bgRect = _this.__background.getBoundingClientRect();
      _this.setValue(map(e.clientX, bgRect.left, bgRect.right, _this.__min, _this.__max));
      return false;
    }
    function onMouseUp() {
      dom.unbind(window, 'mousemove', onMouseDrag);
      dom.unbind(window, 'mouseup', onMouseUp);
      if (_this.__onFinishChange) {
        _this.__onFinishChange.call(_this, _this.getValue());
      }
    }
    function onTouchStart(e) {
      if (e.touches.length !== 1) {
        return;
      }
      dom.bind(window, 'touchmove', onTouchMove);
      dom.bind(window, 'touchend', onTouchEnd);
      onTouchMove(e);
    }
    function onTouchMove(e) {
      var clientX = e.touches[0].clientX;
      var bgRect = _this.__background.getBoundingClientRect();
      _this.setValue(map(clientX, bgRect.left, bgRect.right, _this.__min, _this.__max));
    }
    function onTouchEnd() {
      dom.unbind(window, 'touchmove', onTouchMove);
      dom.unbind(window, 'touchend', onTouchEnd);
      if (_this.__onFinishChange) {
        _this.__onFinishChange.call(_this, _this.getValue());
      }
    }
    _this2.updateDisplay();
    _this2.__background.appendChild(_this2.__foreground);
    _this2.domElement.appendChild(_this2.__background);
    return _this2;
  }
  createClass(NumberControllerSlider, [{
    key: 'updateDisplay',
    value: function updateDisplay() {
      var pct = (this.getValue() - this.__min) / (this.__max - this.__min);
      this.__foreground.style.width = pct * 100 + '%';
      return get(NumberControllerSlider.prototype.__proto__ || Object.getPrototypeOf(NumberControllerSlider.prototype), 'updateDisplay', this).call(this);
    }
  }]);
  return NumberControllerSlider;
}(NumberController);

var FunctionController = function (_Controller) {
  inherits(FunctionController, _Controller);
  function FunctionController(object, property, text) {
    classCallCheck(this, FunctionController);
    var _this2 = possibleConstructorReturn(this, (FunctionController.__proto__ || Object.getPrototypeOf(FunctionController)).call(this, object, property));
    var _this = _this2;
    _this2.__button = document.createElement('div');
    _this2.__button.innerHTML = text === undefined ? 'Fire' : text;
    dom.bind(_this2.__button, 'click', function (e) {
      e.preventDefault();
      _this.fire();
      return false;
    });
    dom.addClass(_this2.__button, 'button');
    _this2.domElement.appendChild(_this2.__button);
    return _this2;
  }
  createClass(FunctionController, [{
    key: 'fire',
    value: function fire() {
      if (this.__onChange) {
        this.__onChange.call(this);
      }
      this.getValue().call(this.object);
      if (this.__onFinishChange) {
        this.__onFinishChange.call(this, this.getValue());
      }
    }
  }]);
  return FunctionController;
}(Controller);

var ColorController = function (_Controller) {
  inherits(ColorController, _Controller);
  function ColorController(object, property) {
    classCallCheck(this, ColorController);
    var _this2 = possibleConstructorReturn(this, (ColorController.__proto__ || Object.getPrototypeOf(ColorController)).call(this, object, property));
    _this2.__color = new Color(_this2.getValue());
    _this2.__temp = new Color(0);
    var _this = _this2;
    _this2.domElement = document.createElement('div');
    dom.makeSelectable(_this2.domElement, false);
    _this2.__selector = document.createElement('div');
    _this2.__selector.className = 'selector';
    _this2.__saturation_field = document.createElement('div');
    _this2.__saturation_field.className = 'saturation-field';
    _this2.__field_knob = document.createElement('div');
    _this2.__field_knob.className = 'field-knob';
    _this2.__field_knob_border = '2px solid ';
    _this2.__hue_knob = document.createElement('div');
    _this2.__hue_knob.className = 'hue-knob';
    _this2.__hue_field = document.createElement('div');
    _this2.__hue_field.className = 'hue-field';
    _this2.__input = document.createElement('input');
    _this2.__input.type = 'text';
    _this2.__input_textShadow = '0 1px 1px ';
    dom.bind(_this2.__input, 'keydown', function (e) {
      if (e.keyCode === 13) {
        onBlur.call(this);
      }
    });
    dom.bind(_this2.__input, 'blur', onBlur);
    dom.bind(_this2.__selector, 'mousedown', function ()        {
      dom.addClass(this, 'drag').bind(window, 'mouseup', function ()        {
        dom.removeClass(_this.__selector, 'drag');
      });
    });
    dom.bind(_this2.__selector, 'touchstart', function ()        {
      dom.addClass(this, 'drag').bind(window, 'touchend', function ()        {
        dom.removeClass(_this.__selector, 'drag');
      });
    });
    var valueField = document.createElement('div');
    Common.extend(_this2.__selector.style, {
      width: '122px',
      height: '102px',
      padding: '3px',
      backgroundColor: '#222',
      boxShadow: '0px 1px 3px rgba(0,0,0,0.3)'
    });
    Common.extend(_this2.__field_knob.style, {
      position: 'absolute',
      width: '12px',
      height: '12px',
      border: _this2.__field_knob_border + (_this2.__color.v < 0.5 ? '#fff' : '#000'),
      boxShadow: '0px 1px 3px rgba(0,0,0,0.5)',
      borderRadius: '12px',
      zIndex: 1
    });
    Common.extend(_this2.__hue_knob.style, {
      position: 'absolute',
      width: '15px',
      height: '2px',
      borderRight: '4px solid #fff',
      zIndex: 1
    });
    Common.extend(_this2.__saturation_field.style, {
      width: '100px',
      height: '100px',
      border: '1px solid #555',
      marginRight: '3px',
      display: 'inline-block',
      cursor: 'pointer'
    });
    Common.extend(valueField.style, {
      width: '100%',
      height: '100%',
      background: 'none'
    });
    linearGradient(valueField, 'top', 'rgba(0,0,0,0)', '#000');
    Common.extend(_this2.__hue_field.style, {
      width: '15px',
      height: '100px',
      border: '1px solid #555',
      cursor: 'ns-resize',
      position: 'absolute',
      top: '3px',
      right: '3px'
    });
    hueGradient(_this2.__hue_field);
    Common.extend(_this2.__input.style, {
      outline: 'none',
      textAlign: 'center',
      color: '#fff',
      border: 0,
      fontWeight: 'bold',
      textShadow: _this2.__input_textShadow + 'rgba(0,0,0,0.7)'
    });
    dom.bind(_this2.__saturation_field, 'mousedown', fieldDown);
    dom.bind(_this2.__saturation_field, 'touchstart', fieldDown);
    dom.bind(_this2.__field_knob, 'mousedown', fieldDown);
    dom.bind(_this2.__field_knob, 'touchstart', fieldDown);
    dom.bind(_this2.__hue_field, 'mousedown', fieldDownH);
    dom.bind(_this2.__hue_field, 'touchstart', fieldDownH);
    function fieldDown(e) {
      setSV(e);
      dom.bind(window, 'mousemove', setSV);
      dom.bind(window, 'touchmove', setSV);
      dom.bind(window, 'mouseup', fieldUpSV);
      dom.bind(window, 'touchend', fieldUpSV);
    }
    function fieldDownH(e) {
      setH(e);
      dom.bind(window, 'mousemove', setH);
      dom.bind(window, 'touchmove', setH);
      dom.bind(window, 'mouseup', fieldUpH);
      dom.bind(window, 'touchend', fieldUpH);
    }
    function fieldUpSV() {
      dom.unbind(window, 'mousemove', setSV);
      dom.unbind(window, 'touchmove', setSV);
      dom.unbind(window, 'mouseup', fieldUpSV);
      dom.unbind(window, 'touchend', fieldUpSV);
      onFinish();
    }
    function fieldUpH() {
      dom.unbind(window, 'mousemove', setH);
      dom.unbind(window, 'touchmove', setH);
      dom.unbind(window, 'mouseup', fieldUpH);
      dom.unbind(window, 'touchend', fieldUpH);
      onFinish();
    }
    function onBlur() {
      var i = interpret(this.value);
      if (i !== false) {
        _this.__color.__state = i;
        _this.setValue(_this.__color.toOriginal());
      } else {
        this.value = _this.__color.toString();
      }
    }
    function onFinish() {
      if (_this.__onFinishChange) {
        _this.__onFinishChange.call(_this, _this.__color.toOriginal());
      }
    }
    _this2.__saturation_field.appendChild(valueField);
    _this2.__selector.appendChild(_this2.__field_knob);
    _this2.__selector.appendChild(_this2.__saturation_field);
    _this2.__selector.appendChild(_this2.__hue_field);
    _this2.__hue_field.appendChild(_this2.__hue_knob);
    _this2.domElement.appendChild(_this2.__input);
    _this2.domElement.appendChild(_this2.__selector);
    _this2.updateDisplay();
    function setSV(e) {
      if (e.type.indexOf('touch') === -1) {
        e.preventDefault();
      }
      var fieldRect = _this.__saturation_field.getBoundingClientRect();
      var _ref = e.touches && e.touches[0] || e,
          clientX = _ref.clientX,
          clientY = _ref.clientY;
      var s = (clientX - fieldRect.left) / (fieldRect.right - fieldRect.left);
      var v = 1 - (clientY - fieldRect.top) / (fieldRect.bottom - fieldRect.top);
      if (v > 1) {
        v = 1;
      } else if (v < 0) {
        v = 0;
      }
      if (s > 1) {
        s = 1;
      } else if (s < 0) {
        s = 0;
      }
      _this.__color.v = v;
      _this.__color.s = s;
      _this.setValue(_this.__color.toOriginal());
      return false;
    }
    function setH(e) {
      if (e.type.indexOf('touch') === -1) {
        e.preventDefault();
      }
      var fieldRect = _this.__hue_field.getBoundingClientRect();
      var _ref2 = e.touches && e.touches[0] || e,
          clientY = _ref2.clientY;
      var h = 1 - (clientY - fieldRect.top) / (fieldRect.bottom - fieldRect.top);
      if (h > 1) {
        h = 1;
      } else if (h < 0) {
        h = 0;
      }
      _this.__color.h = h * 360;
      _this.setValue(_this.__color.toOriginal());
      return false;
    }
    return _this2;
  }
  createClass(ColorController, [{
    key: 'updateDisplay',
    value: function updateDisplay() {
      var i = interpret(this.getValue());
      if (i !== false) {
        var mismatch = false;
        Common.each(Color.COMPONENTS, function (component) {
          if (!Common.isUndefined(i[component]) && !Common.isUndefined(this.__color.__state[component]) && i[component] !== this.__color.__state[component]) {
            mismatch = true;
            return {};
          }
        }, this);
        if (mismatch) {
          Common.extend(this.__color.__state, i);
        }
      }
      Common.extend(this.__temp.__state, this.__color.__state);
      this.__temp.a = 1;
      var flip = this.__color.v < 0.5 || this.__color.s > 0.5 ? 255 : 0;
      var _flip = 255 - flip;
      Common.extend(this.__field_knob.style, {
        marginLeft: 100 * this.__color.s - 7 + 'px',
        marginTop: 100 * (1 - this.__color.v) - 7 + 'px',
        backgroundColor: this.__temp.toHexString(),
        border: this.__field_knob_border + 'rgb(' + flip + ',' + flip + ',' + flip + ')'
      });
      this.__hue_knob.style.marginTop = (1 - this.__color.h / 360) * 100 + 'px';
      this.__temp.s = 1;
      this.__temp.v = 1;
      linearGradient(this.__saturation_field, 'left', '#fff', this.__temp.toHexString());
      this.__input.value = this.__color.toString();
      Common.extend(this.__input.style, {
        backgroundColor: this.__color.toHexString(),
        color: 'rgb(' + flip + ',' + flip + ',' + flip + ')',
        textShadow: this.__input_textShadow + 'rgba(' + _flip + ',' + _flip + ',' + _flip + ',.7)'
      });
    }
  }]);
  return ColorController;
}(Controller);
var vendors = ['-moz-', '-o-', '-webkit-', '-ms-', ''];
function linearGradient(elem, x, a, b) {
  elem.style.background = '';
  Common.each(vendors, function (vendor) {
    elem.style.cssText += 'background: ' + vendor + 'linear-gradient(' + x + ', ' + a + ' 0%, ' + b + ' 100%); ';
  });
}
function hueGradient(elem) {
  elem.style.background = '';
  elem.style.cssText += 'background: -moz-linear-gradient(top,  #ff0000 0%, #ff00ff 17%, #0000ff 34%, #00ffff 50%, #00ff00 67%, #ffff00 84%, #ff0000 100%);';
  elem.style.cssText += 'background: -webkit-linear-gradient(top,  #ff0000 0%,#ff00ff 17%,#0000ff 34%,#00ffff 50%,#00ff00 67%,#ffff00 84%,#ff0000 100%);';
  elem.style.cssText += 'background: -o-linear-gradient(top,  #ff0000 0%,#ff00ff 17%,#0000ff 34%,#00ffff 50%,#00ff00 67%,#ffff00 84%,#ff0000 100%);';
  elem.style.cssText += 'background: -ms-linear-gradient(top,  #ff0000 0%,#ff00ff 17%,#0000ff 34%,#00ffff 50%,#00ff00 67%,#ffff00 84%,#ff0000 100%);';
  elem.style.cssText += 'background: linear-gradient(top,  #ff0000 0%,#ff00ff 17%,#0000ff 34%,#00ffff 50%,#00ff00 67%,#ffff00 84%,#ff0000 100%);';
}

var css = {
  load: function load(url, indoc) {
    var doc = indoc || document;
    var link = doc.createElement('link');
    link.type = 'text/css';
    link.rel = 'stylesheet';
    link.href = url;
    doc.getElementsByTagName('head')[0].appendChild(link);
  },
  inject: function inject(cssContent, indoc) {
    var doc = indoc || document;
    var injected = document.createElement('style');
    injected.type = 'text/css';
    injected.innerHTML = cssContent;
    var head = doc.getElementsByTagName('head')[0];
    try {
      head.appendChild(injected);
    } catch (e) {
    }
  }
};

var saveDialogContents = "<div id=\"dg-save\" class=\"dg dialogue\">\n\n  Here's the new load parameter for your <code>GUI</code>'s constructor:\n\n  <textarea id=\"dg-new-constructor\"></textarea>\n\n  <div id=\"dg-save-locally\">\n\n    <input id=\"dg-local-storage\" type=\"checkbox\"/> Automatically save\n    values to <code>localStorage</code> on exit.\n\n    <div id=\"dg-local-explain\">The values saved to <code>localStorage</code> will\n      override those passed to <code>dat.GUI</code>'s constructor. This makes it\n      easier to work incrementally, but <code>localStorage</code> is fragile,\n      and your friends may not see the same values you do.\n\n    </div>\n\n  </div>\n\n</div>";

var ControllerFactory = function ControllerFactory(object, property) {
  var initialValue = object[property];
  if (Common.isArray(arguments[2]) || Common.isObject(arguments[2])) {
    return new OptionController(object, property, arguments[2]);
  }
  if (Common.isNumber(initialValue)) {
    if (Common.isNumber(arguments[2]) && Common.isNumber(arguments[3])) {
      if (Common.isNumber(arguments[4])) {
        return new NumberControllerSlider(object, property, arguments[2], arguments[3], arguments[4]);
      }
      return new NumberControllerSlider(object, property, arguments[2], arguments[3]);
    }
    if (Common.isNumber(arguments[4])) {
      return new NumberControllerBox(object, property, { min: arguments[2], max: arguments[3], step: arguments[4] });
    }
    return new NumberControllerBox(object, property, { min: arguments[2], max: arguments[3] });
  }
  if (Common.isString(initialValue)) {
    return new StringController(object, property);
  }
  if (Common.isFunction(initialValue)) {
    return new FunctionController(object, property, '');
  }
  if (Common.isBoolean(initialValue)) {
    return new BooleanController(object, property);
  }
  return null;
};

function requestAnimationFrame(callback) {
  setTimeout(callback, 1000 / 60);
}
var requestAnimationFrame$1 = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || requestAnimationFrame;

var CenteredDiv = function () {
  function CenteredDiv() {
    classCallCheck(this, CenteredDiv);
    this.backgroundElement = document.createElement('div');
    Common.extend(this.backgroundElement.style, {
      backgroundColor: 'rgba(0,0,0,0.8)',
      top: 0,
      left: 0,
      display: 'none',
      zIndex: '1000',
      opacity: 0,
      WebkitTransition: 'opacity 0.2s linear',
      transition: 'opacity 0.2s linear'
    });
    dom.makeFullscreen(this.backgroundElement);
    this.backgroundElement.style.position = 'fixed';
    this.domElement = document.createElement('div');
    Common.extend(this.domElement.style, {
      position: 'fixed',
      display: 'none',
      zIndex: '1001',
      opacity: 0,
      WebkitTransition: '-webkit-transform 0.2s ease-out, opacity 0.2s linear',
      transition: 'transform 0.2s ease-out, opacity 0.2s linear'
    });
    document.body.appendChild(this.backgroundElement);
    document.body.appendChild(this.domElement);
    var _this = this;
    dom.bind(this.backgroundElement, 'click', function () {
      _this.hide();
    });
  }
  createClass(CenteredDiv, [{
    key: 'show',
    value: function show() {
      var _this = this;
      this.backgroundElement.style.display = 'block';
      this.domElement.style.display = 'block';
      this.domElement.style.opacity = 0;
      this.domElement.style.webkitTransform = 'scale(1.1)';
      this.layout();
      Common.defer(function () {
        _this.backgroundElement.style.opacity = 1;
        _this.domElement.style.opacity = 1;
        _this.domElement.style.webkitTransform = 'scale(1)';
      });
    }
  }, {
    key: 'hide',
    value: function hide() {
      var _this = this;
      var hide = function hide() {
        _this.domElement.style.display = 'none';
        _this.backgroundElement.style.display = 'none';
        dom.unbind(_this.domElement, 'webkitTransitionEnd', hide);
        dom.unbind(_this.domElement, 'transitionend', hide);
        dom.unbind(_this.domElement, 'oTransitionEnd', hide);
      };
      dom.bind(this.domElement, 'webkitTransitionEnd', hide);
      dom.bind(this.domElement, 'transitionend', hide);
      dom.bind(this.domElement, 'oTransitionEnd', hide);
      this.backgroundElement.style.opacity = 0;
      this.domElement.style.opacity = 0;
      this.domElement.style.webkitTransform = 'scale(1.1)';
    }
  }, {
    key: 'layout',
    value: function layout() {
      this.domElement.style.left = window.innerWidth / 2 - dom.getWidth(this.domElement) / 2 + 'px';
      this.domElement.style.top = window.innerHeight / 2 - dom.getHeight(this.domElement) / 2 + 'px';
    }
  }]);
  return CenteredDiv;
}();

var styleSheet = ___$insertStyle(".dg ul{list-style:none;margin:0;padding:0;width:100%;clear:both}.dg.ac{position:fixed;top:0;left:0;right:0;height:0;z-index:0}.dg:not(.ac) .main{overflow:hidden}.dg.main{-webkit-transition:opacity .1s linear;-o-transition:opacity .1s linear;-moz-transition:opacity .1s linear;transition:opacity .1s linear}.dg.main.taller-than-window{overflow-y:auto}.dg.main.taller-than-window .close-button{opacity:1;margin-top:-1px;border-top:1px solid #2c2c2c}.dg.main ul.closed .close-button{opacity:1 !important}.dg.main:hover .close-button,.dg.main .close-button.drag{opacity:1}.dg.main .close-button{-webkit-transition:opacity .1s linear;-o-transition:opacity .1s linear;-moz-transition:opacity .1s linear;transition:opacity .1s linear;border:0;line-height:19px;height:20px;cursor:pointer;text-align:center;background-color:#000}.dg.main .close-button.close-top{position:relative}.dg.main .close-button.close-bottom{position:absolute}.dg.main .close-button:hover{background-color:#111}.dg.a{float:right;margin-right:15px;overflow-y:visible}.dg.a.has-save>ul.close-top{margin-top:0}.dg.a.has-save>ul.close-bottom{margin-top:27px}.dg.a.has-save>ul.closed{margin-top:0}.dg.a .save-row{top:0;z-index:1002}.dg.a .save-row.close-top{position:relative}.dg.a .save-row.close-bottom{position:fixed}.dg li{-webkit-transition:height .1s ease-out;-o-transition:height .1s ease-out;-moz-transition:height .1s ease-out;transition:height .1s ease-out;-webkit-transition:overflow .1s linear;-o-transition:overflow .1s linear;-moz-transition:overflow .1s linear;transition:overflow .1s linear}.dg li:not(.folder){cursor:auto;height:27px;line-height:27px;padding:0 4px 0 5px}.dg li.folder{padding:0;border-left:4px solid rgba(0,0,0,0)}.dg li.title{cursor:pointer;margin-left:-4px}.dg .closed li:not(.title),.dg .closed ul li,.dg .closed ul li>*{height:0;overflow:hidden;border:0}.dg .cr{clear:both;padding-left:3px;height:27px;overflow:hidden}.dg .property-name{cursor:default;float:left;clear:left;width:40%;overflow:hidden;text-overflow:ellipsis}.dg .c{float:left;width:60%;position:relative}.dg .c input[type=text]{border:0;margin-top:4px;padding:3px;width:100%;float:right}.dg .has-slider input[type=text]{width:30%;margin-left:0}.dg .slider{float:left;width:66%;margin-left:-5px;margin-right:0;height:19px;margin-top:4px}.dg .slider-fg{height:100%}.dg .c input[type=checkbox]{margin-top:7px}.dg .c select{margin-top:5px}.dg .cr.function,.dg .cr.function .property-name,.dg .cr.function *,.dg .cr.boolean,.dg .cr.boolean *{cursor:pointer}.dg .cr.color{overflow:visible}.dg .selector{display:none;position:absolute;margin-left:-9px;margin-top:23px;z-index:10}.dg .c:hover .selector,.dg .selector.drag{display:block}.dg li.save-row{padding:0}.dg li.save-row .button{display:inline-block;padding:0px 6px}.dg.dialogue{background-color:#222;width:460px;padding:15px;font-size:13px;line-height:15px}#dg-new-constructor{padding:10px;color:#222;font-family:Monaco, monospace;font-size:10px;border:0;resize:none;box-shadow:inset 1px 1px 1px #888;word-wrap:break-word;margin:12px 0;display:block;width:440px;overflow-y:scroll;height:100px;position:relative}#dg-local-explain{display:none;font-size:11px;line-height:17px;border-radius:3px;background-color:#333;padding:8px;margin-top:10px}#dg-local-explain code{font-size:10px}#dat-gui-save-locally{display:none}.dg{color:#eee;font:11px 'Lucida Grande', sans-serif;text-shadow:0 -1px 0 #111}.dg.main::-webkit-scrollbar{width:5px;background:#1a1a1a}.dg.main::-webkit-scrollbar-corner{height:0;display:none}.dg.main::-webkit-scrollbar-thumb{border-radius:5px;background:#676767}.dg li:not(.folder){background:#1a1a1a;border-bottom:1px solid #2c2c2c}.dg li.save-row{line-height:25px;background:#dad5cb;border:0}.dg li.save-row select{margin-left:5px;width:108px}.dg li.save-row .button{margin-left:5px;margin-top:1px;border-radius:2px;font-size:9px;line-height:7px;padding:4px 4px 5px 4px;background:#c5bdad;color:#fff;text-shadow:0 1px 0 #b0a58f;box-shadow:0 -1px 0 #b0a58f;cursor:pointer}.dg li.save-row .button.gears{background:#c5bdad url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAsAAAANCAYAAAB/9ZQ7AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAQJJREFUeNpiYKAU/P//PwGIC/ApCABiBSAW+I8AClAcgKxQ4T9hoMAEUrxx2QSGN6+egDX+/vWT4e7N82AMYoPAx/evwWoYoSYbACX2s7KxCxzcsezDh3evFoDEBYTEEqycggWAzA9AuUSQQgeYPa9fPv6/YWm/Acx5IPb7ty/fw+QZblw67vDs8R0YHyQhgObx+yAJkBqmG5dPPDh1aPOGR/eugW0G4vlIoTIfyFcA+QekhhHJhPdQxbiAIguMBTQZrPD7108M6roWYDFQiIAAv6Aow/1bFwXgis+f2LUAynwoIaNcz8XNx3Dl7MEJUDGQpx9gtQ8YCueB+D26OECAAQDadt7e46D42QAAAABJRU5ErkJggg==) 2px 1px no-repeat;height:7px;width:8px}.dg li.save-row .button:hover{background-color:#bab19e;box-shadow:0 -1px 0 #b0a58f}.dg li.folder{border-bottom:0}.dg li.title{padding-left:16px;background:#000 url(data:image/gif;base64,R0lGODlhBQAFAJEAAP////Pz8////////yH5BAEAAAIALAAAAAAFAAUAAAIIlI+hKgFxoCgAOw==) 6px 10px no-repeat;cursor:pointer;border-bottom:1px solid rgba(255,255,255,0.2)}.dg .closed li.title{background-image:url(data:image/gif;base64,R0lGODlhBQAFAJEAAP////Pz8////////yH5BAEAAAIALAAAAAAFAAUAAAIIlGIWqMCbWAEAOw==)}.dg .cr.boolean{border-left:3px solid #806787}.dg .cr.color{border-left:3px solid}.dg .cr.function{border-left:3px solid #e61d5f}.dg .cr.number{border-left:3px solid #2FA1D6}.dg .cr.number input[type=text]{color:#2FA1D6}.dg .cr.string{border-left:3px solid #1ed36f}.dg .cr.string input[type=text]{color:#1ed36f}.dg .cr.function:hover,.dg .cr.boolean:hover{background:#111}.dg .c input[type=text]{background:#303030;outline:none}.dg .c input[type=text]:hover{background:#3c3c3c}.dg .c input[type=text]:focus{background:#494949;color:#fff}.dg .c .slider{background:#303030;cursor:ew-resize}.dg .c .slider-fg{background:#2FA1D6;max-width:100%}.dg .c .slider:hover{background:#3c3c3c}.dg .c .slider:hover .slider-fg{background:#44abda}\n");

css.inject(styleSheet);
var CSS_NAMESPACE = 'dg';
var HIDE_KEY_CODE = 72;
var CLOSE_BUTTON_HEIGHT = 20;
var DEFAULT_DEFAULT_PRESET_NAME = 'Default';
var SUPPORTS_LOCAL_STORAGE = function () {
  try {
    return !!window.localStorage;
  } catch (e) {
    return false;
  }
}();
var SAVE_DIALOGUE = void 0;
var autoPlaceVirgin = true;
var autoPlaceContainer = void 0;
var hide = false;
var hideableGuis = [];
var GUI = function GUI(pars) {
  var _this = this;
  var params = pars || {};
  this.domElement = document.createElement('div');
  this.__ul = document.createElement('ul');
  this.domElement.appendChild(this.__ul);
  dom.addClass(this.domElement, CSS_NAMESPACE);
  this.__folders = {};
  this.__controllers = [];
  this.__rememberedObjects = [];
  this.__rememberedObjectIndecesToControllers = [];
  this.__listening = [];
  params = Common.defaults(params, {
    closeOnTop: false,
    autoPlace: true,
    width: GUI.DEFAULT_WIDTH
  });
  params = Common.defaults(params, {
    resizable: params.autoPlace,
    hideable: params.autoPlace
  });
  if (!Common.isUndefined(params.load)) {
    if (params.preset) {
      params.load.preset = params.preset;
    }
  } else {
    params.load = { preset: DEFAULT_DEFAULT_PRESET_NAME };
  }
  if (Common.isUndefined(params.parent) && params.hideable) {
    hideableGuis.push(this);
  }
  params.resizable = Common.isUndefined(params.parent) && params.resizable;
  if (params.autoPlace && Common.isUndefined(params.scrollable)) {
    params.scrollable = true;
  }
  var useLocalStorage = SUPPORTS_LOCAL_STORAGE && localStorage.getItem(getLocalStorageHash(this, 'isLocal')) === 'true';
  var saveToLocalStorage = void 0;
  var titleRow = void 0;
  Object.defineProperties(this,
  {
    parent: {
      get: function get$$1() {
        return params.parent;
      }
    },
    scrollable: {
      get: function get$$1() {
        return params.scrollable;
      }
    },
    autoPlace: {
      get: function get$$1() {
        return params.autoPlace;
      }
    },
    closeOnTop: {
      get: function get$$1() {
        return params.closeOnTop;
      }
    },
    preset: {
      get: function get$$1() {
        if (_this.parent) {
          return _this.getRoot().preset;
        }
        return params.load.preset;
      },
      set: function set$$1(v) {
        if (_this.parent) {
          _this.getRoot().preset = v;
        } else {
          params.load.preset = v;
        }
        setPresetSelectIndex(this);
        _this.revert();
      }
    },
    width: {
      get: function get$$1() {
        return params.width;
      },
      set: function set$$1(v) {
        params.width = v;
        setWidth(_this, v);
      }
    },
    name: {
      get: function get$$1() {
        return params.name;
      },
      set: function set$$1(v) {
        params.name = v;
        if (titleRow) {
          titleRow.innerHTML = params.name;
        }
      }
    },
    closed: {
      get: function get$$1() {
        return params.closed;
      },
      set: function set$$1(v) {
        params.closed = v;
        if (params.closed) {
          dom.addClass(_this.__ul, GUI.CLASS_CLOSED);
        } else {
          dom.removeClass(_this.__ul, GUI.CLASS_CLOSED);
        }
        this.onResize();
        if (_this.__closeButton) {
          _this.__closeButton.innerHTML = v ? GUI.TEXT_OPEN : GUI.TEXT_CLOSED;
        }
      }
    },
    load: {
      get: function get$$1() {
        return params.load;
      }
    },
    useLocalStorage: {
      get: function get$$1() {
        return useLocalStorage;
      },
      set: function set$$1(bool) {
        if (SUPPORTS_LOCAL_STORAGE) {
          useLocalStorage = bool;
          if (bool) {
            dom.bind(window, 'unload', saveToLocalStorage);
          } else {
            dom.unbind(window, 'unload', saveToLocalStorage);
          }
          localStorage.setItem(getLocalStorageHash(_this, 'isLocal'), bool);
        }
      }
    }
  });
  if (Common.isUndefined(params.parent)) {
    this.closed = params.closed || false;
    dom.addClass(this.domElement, GUI.CLASS_MAIN);
    dom.makeSelectable(this.domElement, false);
    if (SUPPORTS_LOCAL_STORAGE) {
      if (useLocalStorage) {
        _this.useLocalStorage = true;
        var savedGui = localStorage.getItem(getLocalStorageHash(this, 'gui'));
        if (savedGui) {
          params.load = JSON.parse(savedGui);
        }
      }
    }
    this.__closeButton = document.createElement('div');
    this.__closeButton.innerHTML = GUI.TEXT_CLOSED;
    dom.addClass(this.__closeButton, GUI.CLASS_CLOSE_BUTTON);
    if (params.closeOnTop) {
      dom.addClass(this.__closeButton, GUI.CLASS_CLOSE_TOP);
      this.domElement.insertBefore(this.__closeButton, this.domElement.childNodes[0]);
    } else {
      dom.addClass(this.__closeButton, GUI.CLASS_CLOSE_BOTTOM);
      this.domElement.appendChild(this.__closeButton);
    }
    dom.bind(this.__closeButton, 'click', function () {
      _this.closed = !_this.closed;
    });
  } else {
    if (params.closed === undefined) {
      params.closed = true;
    }
    var titleRowName = document.createTextNode(params.name);
    dom.addClass(titleRowName, 'controller-name');
    titleRow = addRow(_this, titleRowName);
    var onClickTitle = function onClickTitle(e) {
      e.preventDefault();
      _this.closed = !_this.closed;
      return false;
    };
    dom.addClass(this.__ul, GUI.CLASS_CLOSED);
    dom.addClass(titleRow, 'title');
    dom.bind(titleRow, 'click', onClickTitle);
    if (!params.closed) {
      this.closed = false;
    }
  }
  if (params.autoPlace) {
    if (Common.isUndefined(params.parent)) {
      if (autoPlaceVirgin) {
        autoPlaceContainer = document.createElement('div');
        dom.addClass(autoPlaceContainer, CSS_NAMESPACE);
        dom.addClass(autoPlaceContainer, GUI.CLASS_AUTO_PLACE_CONTAINER);
        document.body.appendChild(autoPlaceContainer);
        autoPlaceVirgin = false;
      }
      autoPlaceContainer.appendChild(this.domElement);
      dom.addClass(this.domElement, GUI.CLASS_AUTO_PLACE);
    }
    if (!this.parent) {
      setWidth(_this, params.width);
    }
  }
  this.__resizeHandler = function () {
    _this.onResizeDebounced();
  };
  dom.bind(window, 'resize', this.__resizeHandler);
  dom.bind(this.__ul, 'webkitTransitionEnd', this.__resizeHandler);
  dom.bind(this.__ul, 'transitionend', this.__resizeHandler);
  dom.bind(this.__ul, 'oTransitionEnd', this.__resizeHandler);
  this.onResize();
  if (params.resizable) {
    addResizeHandle(this);
  }
  saveToLocalStorage = function saveToLocalStorage() {
    if (SUPPORTS_LOCAL_STORAGE && localStorage.getItem(getLocalStorageHash(_this, 'isLocal')) === 'true') {
      localStorage.setItem(getLocalStorageHash(_this, 'gui'), JSON.stringify(_this.getSaveObject()));
    }
  };
  this.saveToLocalStorageIfPossible = saveToLocalStorage;
  function resetWidth() {
    var root = _this.getRoot();
    root.width += 1;
    Common.defer(function () {
      root.width -= 1;
    });
  }
  if (!params.parent) {
    resetWidth();
  }
};
GUI.toggleHide = function () {
  hide = !hide;
  Common.each(hideableGuis, function (gui) {
    gui.domElement.style.display = hide ? 'none' : '';
  });
};
GUI.CLASS_AUTO_PLACE = 'a';
GUI.CLASS_AUTO_PLACE_CONTAINER = 'ac';
GUI.CLASS_MAIN = 'main';
GUI.CLASS_CONTROLLER_ROW = 'cr';
GUI.CLASS_TOO_TALL = 'taller-than-window';
GUI.CLASS_CLOSED = 'closed';
GUI.CLASS_CLOSE_BUTTON = 'close-button';
GUI.CLASS_CLOSE_TOP = 'close-top';
GUI.CLASS_CLOSE_BOTTOM = 'close-bottom';
GUI.CLASS_DRAG = 'drag';
GUI.DEFAULT_WIDTH = 245;
GUI.TEXT_CLOSED = 'Close Controls';
GUI.TEXT_OPEN = 'Open Controls';
GUI._keydownHandler = function (e) {
  if (document.activeElement.type !== 'text' && (e.which === HIDE_KEY_CODE || e.keyCode === HIDE_KEY_CODE)) {
    GUI.toggleHide();
  }
};
dom.bind(window, 'keydown', GUI._keydownHandler, false);
Common.extend(GUI.prototype,
{
  add: function add(object, property) {
    return _add(this, object, property, {
      factoryArgs: Array.prototype.slice.call(arguments, 2)
    });
  },
  addColor: function addColor(object, property) {
    return _add(this, object, property, {
      color: true
    });
  },
  remove: function remove(controller) {
    this.__ul.removeChild(controller.__li);
    this.__controllers.splice(this.__controllers.indexOf(controller), 1);
    var _this = this;
    Common.defer(function () {
      _this.onResize();
    });
  },
  destroy: function destroy() {
    if (this.parent) {
      throw new Error('Only the root GUI should be removed with .destroy(). ' + 'For subfolders, use gui.removeFolder(folder) instead.');
    }
    if (this.autoPlace) {
      autoPlaceContainer.removeChild(this.domElement);
    }
    var _this = this;
    Common.each(this.__folders, function (subfolder) {
      _this.removeFolder(subfolder);
    });
    dom.unbind(window, 'keydown', GUI._keydownHandler, false);
    removeListeners(this);
  },
  addFolder: function addFolder(name) {
    if (this.__folders[name] !== undefined) {
      throw new Error('You already have a folder in this GUI by the' + ' name "' + name + '"');
    }
    var newGuiParams = { name: name, parent: this };
    newGuiParams.autoPlace = this.autoPlace;
    if (this.load &&
    this.load.folders &&
    this.load.folders[name]) {
      newGuiParams.closed = this.load.folders[name].closed;
      newGuiParams.load = this.load.folders[name];
    }
    var gui = new GUI(newGuiParams);
    this.__folders[name] = gui;
    var li = addRow(this, gui.domElement);
    dom.addClass(li, 'folder');
    return gui;
  },
  removeFolder: function removeFolder(folder) {
    this.__ul.removeChild(folder.domElement.parentElement);
    delete this.__folders[folder.name];
    if (this.load &&
    this.load.folders &&
    this.load.folders[folder.name]) {
      delete this.load.folders[folder.name];
    }
    removeListeners(folder);
    var _this = this;
    Common.each(folder.__folders, function (subfolder) {
      folder.removeFolder(subfolder);
    });
    Common.defer(function () {
      _this.onResize();
    });
  },
  open: function open() {
    this.closed = false;
  },
  close: function close() {
    this.closed = true;
  },
  hide: function hide() {
    this.domElement.style.display = 'none';
  },
  show: function show() {
    this.domElement.style.display = '';
  },
  onResize: function onResize() {
    var root = this.getRoot();
    if (root.scrollable) {
      var top = dom.getOffset(root.__ul).top;
      var h = 0;
      Common.each(root.__ul.childNodes, function (node) {
        if (!(root.autoPlace && node === root.__save_row)) {
          h += dom.getHeight(node);
        }
      });
      if (window.innerHeight - top - CLOSE_BUTTON_HEIGHT < h) {
        dom.addClass(root.domElement, GUI.CLASS_TOO_TALL);
        root.__ul.style.height = window.innerHeight - top - CLOSE_BUTTON_HEIGHT + 'px';
      } else {
        dom.removeClass(root.domElement, GUI.CLASS_TOO_TALL);
        root.__ul.style.height = 'auto';
      }
    }
    if (root.__resize_handle) {
      Common.defer(function () {
        root.__resize_handle.style.height = root.__ul.offsetHeight + 'px';
      });
    }
    if (root.__closeButton) {
      root.__closeButton.style.width = root.width + 'px';
    }
  },
  onResizeDebounced: Common.debounce(function () {
    this.onResize();
  }, 50),
  remember: function remember() {
    if (Common.isUndefined(SAVE_DIALOGUE)) {
      SAVE_DIALOGUE = new CenteredDiv();
      SAVE_DIALOGUE.domElement.innerHTML = saveDialogContents;
    }
    if (this.parent) {
      throw new Error('You can only call remember on a top level GUI.');
    }
    var _this = this;
    Common.each(Array.prototype.slice.call(arguments), function (object) {
      if (_this.__rememberedObjects.length === 0) {
        addSaveMenu(_this);
      }
      if (_this.__rememberedObjects.indexOf(object) === -1) {
        _this.__rememberedObjects.push(object);
      }
    });
    if (this.autoPlace) {
      setWidth(this, this.width);
    }
  },
  getRoot: function getRoot() {
    var gui = this;
    while (gui.parent) {
      gui = gui.parent;
    }
    return gui;
  },
  getSaveObject: function getSaveObject() {
    var toReturn = this.load;
    toReturn.closed = this.closed;
    if (this.__rememberedObjects.length > 0) {
      toReturn.preset = this.preset;
      if (!toReturn.remembered) {
        toReturn.remembered = {};
      }
      toReturn.remembered[this.preset] = getCurrentPreset(this);
    }
    toReturn.folders = {};
    Common.each(this.__folders, function (element, key) {
      toReturn.folders[key] = element.getSaveObject();
    });
    return toReturn;
  },
  save: function save() {
    if (!this.load.remembered) {
      this.load.remembered = {};
    }
    this.load.remembered[this.preset] = getCurrentPreset(this);
    markPresetModified(this, false);
    this.saveToLocalStorageIfPossible();
  },
  saveAs: function saveAs(presetName) {
    if (!this.load.remembered) {
      this.load.remembered = {};
      this.load.remembered[DEFAULT_DEFAULT_PRESET_NAME] = getCurrentPreset(this, true);
    }
    this.load.remembered[presetName] = getCurrentPreset(this);
    this.preset = presetName;
    addPresetOption(this, presetName, true);
    this.saveToLocalStorageIfPossible();
  },
  revert: function revert(gui) {
    Common.each(this.__controllers, function (controller) {
      if (!this.getRoot().load.remembered) {
        controller.setValue(controller.initialValue);
      } else {
        recallSavedValue(gui || this.getRoot(), controller);
      }
      if (controller.__onFinishChange) {
        controller.__onFinishChange.call(controller, controller.getValue());
      }
    }, this);
    Common.each(this.__folders, function (folder) {
      folder.revert(folder);
    });
    if (!gui) {
      markPresetModified(this.getRoot(), false);
    }
  },
  listen: function listen(controller) {
    var init = this.__listening.length === 0;
    this.__listening.push(controller);
    if (init) {
      updateDisplays(this.__listening);
    }
  },
  updateDisplay: function updateDisplay() {
    Common.each(this.__controllers, function (controller) {
      controller.updateDisplay();
    });
    Common.each(this.__folders, function (folder) {
      folder.updateDisplay();
    });
  }
});
function addRow(gui, newDom, liBefore) {
  var li = document.createElement('li');
  if (newDom) {
    li.appendChild(newDom);
  }
  if (liBefore) {
    gui.__ul.insertBefore(li, liBefore);
  } else {
    gui.__ul.appendChild(li);
  }
  gui.onResize();
  return li;
}
function removeListeners(gui) {
  dom.unbind(window, 'resize', gui.__resizeHandler);
  if (gui.saveToLocalStorageIfPossible) {
    dom.unbind(window, 'unload', gui.saveToLocalStorageIfPossible);
  }
}
function markPresetModified(gui, modified) {
  var opt = gui.__preset_select[gui.__preset_select.selectedIndex];
  if (modified) {
    opt.innerHTML = opt.value + '*';
  } else {
    opt.innerHTML = opt.value;
  }
}
function augmentController(gui, li, controller) {
  controller.__li = li;
  controller.__gui = gui;
  Common.extend(controller,                                   {
    options: function options(_options) {
      if (arguments.length > 1) {
        var nextSibling = controller.__li.nextElementSibling;
        controller.remove();
        return _add(gui, controller.object, controller.property, {
          before: nextSibling,
          factoryArgs: [Common.toArray(arguments)]
        });
      }
      if (Common.isArray(_options) || Common.isObject(_options)) {
        var _nextSibling = controller.__li.nextElementSibling;
        controller.remove();
        return _add(gui, controller.object, controller.property, {
          before: _nextSibling,
          factoryArgs: [_options]
        });
      }
    },
    name: function name(_name) {
      controller.__li.firstElementChild.firstElementChild.innerHTML = _name;
      return controller;
    },
    listen: function listen() {
      controller.__gui.listen(controller);
      return controller;
    },
    remove: function remove() {
      controller.__gui.remove(controller);
      return controller;
    }
  });
  if (controller instanceof NumberControllerSlider) {
    var box = new NumberControllerBox(controller.object, controller.property, { min: controller.__min, max: controller.__max, step: controller.__step });
    Common.each(['updateDisplay', 'onChange', 'onFinishChange', 'step', 'min', 'max'], function (method) {
      var pc = controller[method];
      var pb = box[method];
      controller[method] = box[method] = function () {
        var args = Array.prototype.slice.call(arguments);
        pb.apply(box, args);
        return pc.apply(controller, args);
      };
    });
    dom.addClass(li, 'has-slider');
    controller.domElement.insertBefore(box.domElement, controller.domElement.firstElementChild);
  } else if (controller instanceof NumberControllerBox) {
    var r = function r(returned) {
      if (Common.isNumber(controller.__min) && Common.isNumber(controller.__max)) {
        var oldName = controller.__li.firstElementChild.firstElementChild.innerHTML;
        var wasListening = controller.__gui.__listening.indexOf(controller) > -1;
        controller.remove();
        var newController = _add(gui, controller.object, controller.property, {
          before: controller.__li.nextElementSibling,
          factoryArgs: [controller.__min, controller.__max, controller.__step]
        });
        newController.name(oldName);
        if (wasListening) newController.listen();
        return newController;
      }
      return returned;
    };
    controller.min = Common.compose(r, controller.min);
    controller.max = Common.compose(r, controller.max);
  } else if (controller instanceof BooleanController) {
    dom.bind(li, 'click', function () {
      dom.fakeEvent(controller.__checkbox, 'click');
    });
    dom.bind(controller.__checkbox, 'click', function (e) {
      e.stopPropagation();
    });
  } else if (controller instanceof FunctionController) {
    dom.bind(li, 'click', function () {
      dom.fakeEvent(controller.__button, 'click');
    });
    dom.bind(li, 'mouseover', function () {
      dom.addClass(controller.__button, 'hover');
    });
    dom.bind(li, 'mouseout', function () {
      dom.removeClass(controller.__button, 'hover');
    });
  } else if (controller instanceof ColorController) {
    dom.addClass(li, 'color');
    controller.updateDisplay = Common.compose(function (val) {
      li.style.borderLeftColor = controller.__color.toString();
      return val;
    }, controller.updateDisplay);
    controller.updateDisplay();
  }
  controller.setValue = Common.compose(function (val) {
    if (gui.getRoot().__preset_select && controller.isModified()) {
      markPresetModified(gui.getRoot(), true);
    }
    return val;
  }, controller.setValue);
}
function recallSavedValue(gui, controller) {
  var root = gui.getRoot();
  var matchedIndex = root.__rememberedObjects.indexOf(controller.object);
  if (matchedIndex !== -1) {
    var controllerMap = root.__rememberedObjectIndecesToControllers[matchedIndex];
    if (controllerMap === undefined) {
      controllerMap = {};
      root.__rememberedObjectIndecesToControllers[matchedIndex] = controllerMap;
    }
    controllerMap[controller.property] = controller;
    if (root.load && root.load.remembered) {
      var presetMap = root.load.remembered;
      var preset = void 0;
      if (presetMap[gui.preset]) {
        preset = presetMap[gui.preset];
      } else if (presetMap[DEFAULT_DEFAULT_PRESET_NAME]) {
        preset = presetMap[DEFAULT_DEFAULT_PRESET_NAME];
      } else {
        return;
      }
      if (preset[matchedIndex] && preset[matchedIndex][controller.property] !== undefined) {
        var value = preset[matchedIndex][controller.property];
        controller.initialValue = value;
        controller.setValue(value);
      }
    }
  }
}
function _add(gui, object, property, params) {
  if (object[property] === undefined) {
    throw new Error('Object "' + object + '" has no property "' + property + '"');
  }
  var controller = void 0;
  if (params.color) {
    controller = new ColorController(object, property);
  } else {
    var factoryArgs = [object, property].concat(params.factoryArgs);
    controller = ControllerFactory.apply(gui, factoryArgs);
  }
  if (params.before instanceof Controller) {
    params.before = params.before.__li;
  }
  recallSavedValue(gui, controller);
  dom.addClass(controller.domElement, 'c');
  var name = document.createElement('span');
  dom.addClass(name, 'property-name');
  name.innerHTML = controller.property;
  var container = document.createElement('div');
  container.appendChild(name);
  container.appendChild(controller.domElement);
  var li = addRow(gui, container, params.before);
  dom.addClass(li, GUI.CLASS_CONTROLLER_ROW);
  if (controller instanceof ColorController) {
    dom.addClass(li, 'color');
  } else {
    dom.addClass(li, _typeof(controller.getValue()));
  }
  augmentController(gui, li, controller);
  gui.__controllers.push(controller);
  return controller;
}
function getLocalStorageHash(gui, key) {
  return document.location.href + '.' + key;
}
function addPresetOption(gui, name, setSelected) {
  var opt = document.createElement('option');
  opt.innerHTML = name;
  opt.value = name;
  gui.__preset_select.appendChild(opt);
  if (setSelected) {
    gui.__preset_select.selectedIndex = gui.__preset_select.length - 1;
  }
}
function showHideExplain(gui, explain) {
  explain.style.display = gui.useLocalStorage ? 'block' : 'none';
}
function addSaveMenu(gui) {
  var div = gui.__save_row = document.createElement('li');
  dom.addClass(gui.domElement, 'has-save');
  gui.__ul.insertBefore(div, gui.__ul.firstChild);
  dom.addClass(div, 'save-row');
  var gears = document.createElement('span');
  gears.innerHTML = '&nbsp;';
  dom.addClass(gears, 'button gears');
  var button = document.createElement('span');
  button.innerHTML = 'Save';
  dom.addClass(button, 'button');
  dom.addClass(button, 'save');
  var button2 = document.createElement('span');
  button2.innerHTML = 'New';
  dom.addClass(button2, 'button');
  dom.addClass(button2, 'save-as');
  var button3 = document.createElement('span');
  button3.innerHTML = 'Revert';
  dom.addClass(button3, 'button');
  dom.addClass(button3, 'revert');
  var select = gui.__preset_select = document.createElement('select');
  if (gui.load && gui.load.remembered) {
    Common.each(gui.load.remembered, function (value, key) {
      addPresetOption(gui, key, key === gui.preset);
    });
  } else {
    addPresetOption(gui, DEFAULT_DEFAULT_PRESET_NAME, false);
  }
  dom.bind(select, 'change', function () {
    for (var index = 0; index < gui.__preset_select.length; index++) {
      gui.__preset_select[index].innerHTML = gui.__preset_select[index].value;
    }
    gui.preset = this.value;
  });
  div.appendChild(select);
  div.appendChild(gears);
  div.appendChild(button);
  div.appendChild(button2);
  div.appendChild(button3);
  if (SUPPORTS_LOCAL_STORAGE) {
    var explain = document.getElementById('dg-local-explain');
    var localStorageCheckBox = document.getElementById('dg-local-storage');
    var saveLocally = document.getElementById('dg-save-locally');
    saveLocally.style.display = 'block';
    if (localStorage.getItem(getLocalStorageHash(gui, 'isLocal')) === 'true') {
      localStorageCheckBox.setAttribute('checked', 'checked');
    }
    showHideExplain(gui, explain);
    dom.bind(localStorageCheckBox, 'change', function () {
      gui.useLocalStorage = !gui.useLocalStorage;
      showHideExplain(gui, explain);
    });
  }
  var newConstructorTextArea = document.getElementById('dg-new-constructor');
  dom.bind(newConstructorTextArea, 'keydown', function (e) {
    if (e.metaKey && (e.which === 67 || e.keyCode === 67)) {
      SAVE_DIALOGUE.hide();
    }
  });
  dom.bind(gears, 'click', function () {
    newConstructorTextArea.innerHTML = JSON.stringify(gui.getSaveObject(), undefined, 2);
    SAVE_DIALOGUE.show();
    newConstructorTextArea.focus();
    newConstructorTextArea.select();
  });
  dom.bind(button, 'click', function () {
    gui.save();
  });
  dom.bind(button2, 'click', function () {
    var presetName = prompt('Enter a new preset name.');
    if (presetName) {
      gui.saveAs(presetName);
    }
  });
  dom.bind(button3, 'click', function () {
    gui.revert();
  });
}
function addResizeHandle(gui) {
  var pmouseX = void 0;
  gui.__resize_handle = document.createElement('div');
  Common.extend(gui.__resize_handle.style, {
    width: '6px',
    marginLeft: '-3px',
    height: '200px',
    cursor: 'ew-resize',
    position: 'absolute'
  });
  function drag(e) {
    e.preventDefault();
    gui.width += pmouseX - e.clientX;
    gui.onResize();
    pmouseX = e.clientX;
    return false;
  }
  function dragStop() {
    dom.removeClass(gui.__closeButton, GUI.CLASS_DRAG);
    dom.unbind(window, 'mousemove', drag);
    dom.unbind(window, 'mouseup', dragStop);
  }
  function dragStart(e) {
    e.preventDefault();
    pmouseX = e.clientX;
    dom.addClass(gui.__closeButton, GUI.CLASS_DRAG);
    dom.bind(window, 'mousemove', drag);
    dom.bind(window, 'mouseup', dragStop);
    return false;
  }
  dom.bind(gui.__resize_handle, 'mousedown', dragStart);
  dom.bind(gui.__closeButton, 'mousedown', dragStart);
  gui.domElement.insertBefore(gui.__resize_handle, gui.domElement.firstElementChild);
}
function setWidth(gui, w) {
  gui.domElement.style.width = w + 'px';
  if (gui.__save_row && gui.autoPlace) {
    gui.__save_row.style.width = w + 'px';
  }
  if (gui.__closeButton) {
    gui.__closeButton.style.width = w + 'px';
  }
}
function getCurrentPreset(gui, useInitialValues) {
  var toReturn = {};
  Common.each(gui.__rememberedObjects, function (val, index) {
    var savedValues = {};
    var controllerMap = gui.__rememberedObjectIndecesToControllers[index];
    Common.each(controllerMap, function (controller, property) {
      savedValues[property] = useInitialValues ? controller.initialValue : controller.getValue();
    });
    toReturn[index] = savedValues;
  });
  return toReturn;
}
function setPresetSelectIndex(gui) {
  for (var index = 0; index < gui.__preset_select.length; index++) {
    if (gui.__preset_select[index].value === gui.preset) {
      gui.__preset_select.selectedIndex = index;
    }
  }
}
function updateDisplays(controllerArray) {
  if (controllerArray.length !== 0) {
    requestAnimationFrame$1.call(window, function () {
      updateDisplays(controllerArray);
    });
  }
  Common.each(controllerArray, function (c) {
    c.updateDisplay();
  });
}

var color = {
  Color: Color,
  math: ColorMath,
  interpret: interpret
};
var controllers = {
  Controller: Controller,
  BooleanController: BooleanController,
  OptionController: OptionController,
  StringController: StringController,
  NumberController: NumberController,
  NumberControllerBox: NumberControllerBox,
  NumberControllerSlider: NumberControllerSlider,
  FunctionController: FunctionController,
  ColorController: ColorController
};
var dom$1 = { dom: dom };
var gui = { GUI: GUI };
var GUI$1 = GUI;
var index = {
  color: color,
  controllers: controllers,
  dom: dom$1,
  gui: gui,
  GUI: GUI$1
};


/* harmony default export */ __webpack_exports__["default"] = (index);
//# sourceMappingURL=dat.gui.module.js.map


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
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));else {}})(this,function(){"use strict";function b(a,b){return"undefined"==typeof b?b={autoBom:!1}:"object"!=typeof b&&(console.warn("Deprecated: Expected third argument to be a object"),b={autoBom:!b}),b.autoBom&&/^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(a.type)?new Blob(["\uFEFF",a],{type:a.type}):a}function c(b,c,d){var e=new XMLHttpRequest;e.open("GET",b),e.responseType="blob",e.onload=function(){a(e.response,c,d)},e.onerror=function(){console.error("could not download file")},e.send()}function d(a){var b=new XMLHttpRequest;b.open("HEAD",a,!1);try{b.send()}catch(a){}return 200<=b.status&&299>=b.status}function e(a){try{a.dispatchEvent(new MouseEvent("click"))}catch(c){var b=document.createEvent("MouseEvents");b.initMouseEvent("click",!0,!0,window,0,0,0,80,20,!1,!1,!1,!1,0,null),a.dispatchEvent(b)}}var f="object"==typeof window&&window.window===window?window:"object"==typeof self&&self.self===self?self:"object"==typeof global&&global.global===global?global:void 0,a=f.saveAs||("object"!=typeof window||window!==f?function(){}:"download"in HTMLAnchorElement.prototype?function(b,g,h){var i=f.URL||f.webkitURL,j=document.createElement("a");g=g||b.name||"download",j.download=g,j.rel="noopener","string"==typeof b?(j.href=b,j.origin===location.origin?e(j):d(j.href)?c(b,g,h):e(j,j.target="_blank")):(j.href=i.createObjectURL(b),setTimeout(function(){i.revokeObjectURL(j.href)},4E4),setTimeout(function(){e(j)},0))}:"msSaveOrOpenBlob"in navigator?function(f,g,h){if(g=g||f.name||"download","string"!=typeof f)navigator.msSaveOrOpenBlob(b(f,h),g);else if(d(f))c(f,g,h);else{var i=document.createElement("a");i.href=f,i.target="_blank",setTimeout(function(){e(i)})}}:function(a,b,d,e){if(e=e||open("","_blank"),e&&(e.document.title=e.document.body.innerText="downloading..."),"string"==typeof a)return c(a,b,d);var g="application/octet-stream"===a.type,h=/constructor/i.test(f.HTMLElement)||f.safari,i=/CriOS\/[\d]+/.test(navigator.userAgent);if((i||g&&h)&&"object"==typeof FileReader){var j=new FileReader;j.onloadend=function(){var a=j.result;a=i?a:a.replace(/^data:[^;]*;/,"data:attachment/file;"),e?e.location.href=a:location=a,e=null},j.readAsDataURL(a)}else{var k=f.URL||f.webkitURL,l=k.createObjectURL(a);e?e.location=l:location.href=l,e=null,setTimeout(function(){k.revokeObjectURL(l)},4E4)}});f.saveAs=a.saveAs=a, true&&(module.exports=a)});

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

/***/ "./playground/js/Ring.js":
/*!*******************************!*\
  !*** ./playground/js/Ring.js ***!
  \*******************************/
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
    
    this.points = [];

    this.angle = 0;
    this.velocity = (Math.random() * (10 - 7) + 7) / 10000;
    this.velocity = ((Math.random() * (1 - -1) + -1) < 0) ? this.velocity *= -1 : this.velocity; 
    this.animationMode = 'rotation';
    this._animationCounter = 0;

    this.center = {};
    this.center.x = (centerX != undefined) ? centerX : window.innerWidth / 2;
    this.center.y = (centerY != undefined) ? centerY : window.innerHeight / 2;

    this.subrings = [];

    this.generate();
  }

  // Stuff this.points with real point coordinates using this.numPoints and this.radius
  generate() {
    this.points = [];
    for (let i = 0; i < this.numPoints; i++) {
      this.points.push([
        this.center.x + (this.radius + this.radiusOffset) * Math.cos(((360 / this.numPoints) * (Math.PI/180) * i) + this.angle),
        this.center.y + (this.radius + this.radiusOffset) * Math.sin(((360 / this.numPoints) * (Math.PI/180) * i) + this.angle)
      ]);
    }

    for(let ring of this.subrings) {
      ring.generate();
    }
  }

  iterate() {
    switch(this.animationMode) {
      case 'rotation':
        this.angle += this.velocity;
        break;

      case 'radius':
        this.radius += (Math.sin(this._animationCounter * (Math.PI/180)) * Math.cos(this._animationCounter * (Math.PI/180))) * 10;

        if(this._animationCounter + 1 >= 360) {
          this._animationCounter = 0;
        } else {
          this._animationCounter++;
        }

        break;
    }

    for(let [index,subring] of this.subrings.entries()) {
      subring.center.x = this.points[index][0];
      subring.center.y = this.points[index][1];
      subring.iterate();
    }

    this.generate();
  }
}

/***/ }),

/***/ "./playground/js/entry.js":
/*!********************************!*\
  !*** ./playground/js/entry.js ***!
  \********************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var dat_gui__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! dat.gui */ "./node_modules/dat.gui/build/dat.gui.module.js");
/* harmony import */ var _Ring__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Ring */ "./playground/js/Ring.js");
/* harmony import */ var _export_functions__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./export-functions */ "./playground/js/export-functions.js");
/* harmony import */ var _voronoi_functions__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./voronoi-functions */ "./playground/js/voronoi-functions.js");





let isPaused = false,
  points = [],
  cells = [],
  rings = [],
  gui,
  guiElements = {},
  guiVariables = {
    rings: [],
    numRings: 3,
    invertColors: false,
    blurEffect: false,
    showPoints: false
  };
  
const maxPossibleRadius = (window.innerWidth > window.innerHeight) ? window.innerHeight/2 - 10 : window.innerWidth/2 - 10;

const sketch = function (p5) {
  /*
    Setup
    =====
  */
  p5.setup = function () {
    p5.createCanvas(window.innerWidth, window.innerHeight);
    initializeGUI();
    rebuildGUI();
    generateRings();
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
    }

    drawVoronoi();
    drawPoints();
  }


  /*
    Drawing functions
    =================
  */

  // Draw the Voronoi diagram for a set of points
  function drawVoronoi() {
    // Set colors
    if (guiVariables.invertColors) {
      if(guiVariables.blurEffect) {
        p5.background(0, 20);
      } else {
        p5.background(0);
      }

      p5.stroke(255);
    } else {
      if(guiVariables.blurEffect) {
        p5.background(255, 25);
      } else {
        p5.background(255);
      }
      
      p5.stroke(0);
    }

    p5.noFill();

    // Extract polygons from Voronoi diagram
    cells = Object(_voronoi_functions__WEBPACK_IMPORTED_MODULE_3__["getVoronoiPolygons"])(points);

    // Draw raw polygons
    for (const cell of cells) {
      p5.beginShape();

      for (const vertex of cell) {
        p5.vertex(vertex[0], vertex[1]);
      }

      p5.endShape();
    }
  }
  
  // Draw dots for each of the points
  function drawPoints() {
    if (guiVariables.showPoints) {
      // Set colors
      p5.noStroke();

      if (guiVariables.invertColors) {
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

  
  /*
    Create Ring objects
    ===================
  */
  
  // Create Ring objects based on current values from GUI
  function generateRings() {
    rings = [];

    // Create Ring objects using params stored in guiVariables
    for(let ringParams of guiVariables.rings) {
      let ring = new _Ring__WEBPACK_IMPORTED_MODULE_1__["default"](ringParams.numPoints, ringParams.radius);
      ring.radiusOffset = ringParams.radiusOffset;
      ring.animationMode = ringParams.hasOwnProperty('animationMode') ? ringParams.animationMode : ring.animationMode;
      ring.velocity = ringParams.velocity / 10000;

      // Generate subrings for each point of this ring, if specified
      if(ringParams.hasSubrings) {
        for(let point of ring.points) {
          let subring = new _Ring__WEBPACK_IMPORTED_MODULE_1__["default"](ringParams.subringNumPoints, ringParams.subringRadius, point[0], point[1]);
          subring.animationMode = ringParams.subringAnimationMode;
          subring.velocity = ringParams.subringVelocity / 10000;
          ring.subrings.push(subring);
        }
      }

      rings.push(ring);
    }

    // Run a single iteration when paused to force a new diagram to be drawn
    if(isPaused) {
      for(let ring of rings) {
        ring.iterate();
      }

      // Get the latest points
      points = getPoints();
    }
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

  // Generate evenly-space radius values for each ring - called when numRings changes
  function calculateRingRadii() {
    for(let [index, ringParams] of guiVariables.rings.entries()) {
      ringParams.radius = guiVariables.maxRadius - ((guiVariables.maxRadius - guiVariables.minRadius) / guiVariables.numRings) * (index);
    }
  }

  // Adjust number of rings in params array based on changes to numRings slider
  function adjustRingArray() {
    if(guiVariables.numRings < guiVariables.rings.length) {   // numRings decreased - reduce the array size
      guiVariables.rings = guiVariables.rings.slice(0, guiVariables.numRings);
      
    } else if(guiVariables.numRings > guiVariables.rings.length) {    // numRings increased - generate new ring params
      for(let i=0; i < Math.abs(guiVariables.numRings - guiVariables.rings.length); i++) {
        guiVariables.rings.push(generateRandomRingParams());
      }
    }
  }


  /*
    UI functions
    ============
  */

  // Create the UI panel with random initial values
  function initializeGUI() {
    gui = new dat_gui__WEBPACK_IMPORTED_MODULE_0__["GUI"]();
    gui.width = 300;
    randomize();
  }

  // Build the dat.gui interface
  function rebuildGUI(openedFolders = []) {
    // Remove all elements so that ring folders can be added/removed
    for(let element of Object.keys(guiElements)) {
      if(element != 'folders') {
        gui.remove(guiElements[element]);
      } else {
        for(let folder of guiElements[element]) {
          gui.removeFolder(folder);
        }
      }
    }

    guiElements = {};

    // Button functions
    let guiFunctions = {
      randomize: function() { randomize(); rebuildGUI(); generateRings(); },
      export:    function() { Object(_export_functions__WEBPACK_IMPORTED_MODULE_2__["exportSVG"])(cells) },
      // delete:    function() {}
    }

    // Number of rings slider
    guiElements.numRingsSlider = gui.add(guiVariables, 'numRings', 1, 10, 1).name('Number of rings').onChange(function() {
      adjustRingArray();
      calculateRingRadii();
      generateRings();
    });

    // Max/min radii
    guiElements.maxRadiusSlider = gui.add(guiVariables, 'maxRadius', 100, maxPossibleRadius, 1).name('Maximum radius').onChange(function() {
      calculateRingRadii();
      generateRings();
    });

    guiElements.minRadiusSlider = gui.add(guiVariables, 'minRadius', 1, 100, 1).name('Minimum radius').onChange(function() {
      calculateRingRadii();
      generateRings();
    });

    // Folders for each ring
    guiElements.folders = [];
    for(let [index, ring] of guiVariables.rings.entries()) {
      let folder = gui.addFolder('Ring ' + (index + 1));

      // Ring options
      folder.add(ring, 'numPoints', 1, 100, 1).name('Number of points').onChange(generateRings);
      folder.add(ring, 'radiusOffset', -((guiVariables.maxRadius - guiVariables.minRadius) / guiVariables.numRings), (guiVariables.maxRadius - guiVariables.minRadius) / guiVariables.numRings).name('Radius offset').onChange(generateRings);
      folder.add(ring, 'animationMode', ['rotation', 'radius']).name('Animation mode').onChange(generateRings);
      folder.add(ring, 'velocity', -100, 100, 1).name('Velocity').onChange(generateRings);

      folder.add(ring, 'hasSubrings').name('Has subrings').onChange(function(checked) {
        if(checked) {
          ring.subringNumPoints = parseInt(p5.random(1, 100));
          ring.subringRadius = p5.random(10, 100);
          ring.subringAnimationMode = 'rotation';
          ring.subringVelocity = p5.random(-.01, .01);
        } else {
          delete ring.subringNumPoints;
          delete ring.subringRadius;
          delete ring.subringAnimationMode;
          delete ring.subringVelocity;
        }

        let openedFolders = getOpenedFolderIndices();

        generateRings();
        rebuildGUI(openedFolders);
      });

      // Subring options
      if(ring.hasSubrings) {
        folder.add(ring, 'subringNumPoints', 1, 100, 1).name('Subring point count').onChange(generateRings);
        folder.add(ring, 'subringRadius', 10, 100).name('Subring radius').onChange(generateRings);
        folder.add(ring, 'subringAnimationMode', ['rotation', 'radius']).name('Subring animation').onChange(generateRings);
        folder.add(ring, 'subringVelocity', -100, 100, 1).name('Subring velocity').onChange(generateRings);
      }

      // Delete button
      // folder.add(guiFunctions, 'delete').name('Delete this ring').onChange(function() {
      //   if(Object.keys(gui.__folders).length > 1) {
      //     // Reduce and update the numRings slider value
      //     guiVariables.numRings--;
      //     guiElements.numRingsSlider.setValue(guiVariables.numRings);

      //     // Remove this folder from the GUI
      //     guiElements.folders = guiElements.folders.slice(index, index+1);
      //     gui.removeFolder(folder);

      //     generateRings();
      //   } else {
      //     alert('nice try');
      //   }
      // });

      // Open this folder if requested
      if(openedFolders.includes(index)) {
        folder.open();
      }

      guiElements.folders.push(folder);
    }

    // Feature toggles
    guiElements.invertColorsCheckbox = gui.add(guiVariables, 'invertColors').name('Invert colors');
    guiElements.blurEffectCheckbox   = gui.add(guiVariables, 'blurEffect').name('Blur effect');
    guiElements.showPointsCheckbox   = gui.add(guiVariables, 'showPoints').name('Show points');

    // Buttons
    guiElements.randomizeButton = gui.add(guiFunctions, 'randomize').name('Randomize');
    guiElements.exportButton   = gui.add(guiFunctions, 'export').name('Export as SVG');
  }


  // Randomize the parameters stored in guiVariables
  function randomize() {
    guiVariables.numRings = parseInt(p5.random(3,10));
    guiVariables.maxRadius = p5.random(maxPossibleRadius - 200, maxPossibleRadius);
    guiVariables.minRadius = 10;
    
    guiVariables.rings = [];

    for(let i = 0; i < guiVariables.numRings; i++) {
      let ringParams, pointDensity;
      
      // Rings near the center look better with fewer points
      if (i > 3) {
        pointDensity = 'LOW';
      } else {
        pointDensity = 'HIGH';
      }

      ringParams = generateRandomRingParams(pointDensity);      
      guiVariables.rings.push(ringParams);
    }

    calculateRingRadii();
  }
  
  // Generate random parameters for a single ring
  function generateRandomRingParams(pointDensity = 'HIGH') {
    let ringParams = {}, range = [];

    switch(pointDensity) {
      case 'LOW':
        range[0] = 5;
        range[1] = 10;
        break;
      case 'HIGH':
        range[0] = 20;
        range[1] = 70;
        break;
    }

    ringParams.numPoints = parseInt(p5.random(range[0], range[1]));
    ringParams.radiusOffset = p5.random( -((guiVariables.maxRadius - guiVariables.minRadius) / guiVariables.numRings) / 2, (guiVariables.maxRadius - guiVariables.minRadius) / guiVariables.numRings / 2);
    ringParams.animationMode = 'rotation';
    ringParams.velocity = p5.random(-10, 10);
    ringParams.hasSubrings = false;

    return ringParams;
  }

  // Get a list of all the folders that are currently opened
  function getOpenedFolderIndices() {
    let openedFolders = [],
    folderElements = Object.values(gui.__folders);

    for(let i=0; i<folderElements.length; i++) {
      if(!folderElements[i].closed) {
        openedFolders.push(i);
      }
    }

    return openedFolders;
  }
  

  /*
    Key released handler
    ====================
  */
  p5.keyReleased = function () {
    switch (p5.key) {
      case 'r':
        randomize();
        generateRings();
        rebuildGUI();
        break;

      case 'p':
        guiVariables.showPoints = !guiVariables.showPoints;
        rebuildGUI(getOpenedFolderIndices());
        break;

      case 'i':
        guiVariables.invertColors = !guiVariables.invertColors;
        rebuildGUI(getOpenedFolderIndices());
        break;

      case 'b':
        guiVariables.blurEffect = !guiVariables.blurEffect;
        rebuildGUI(getOpenedFolderIndices());
        break;

      case ' ':
        isPaused = !isPaused;
        break;

      case 'e':
        Object(_export_functions__WEBPACK_IMPORTED_MODULE_2__["exportSVG"])(cells);
        break;
    }
  }
}

// Launch the sketch using p5js in instantiated mode
new p5(sketch);

/***/ }),

/***/ "./playground/js/export-functions.js":
/*!*******************************************!*\
  !*** ./playground/js/export-functions.js ***!
  \*******************************************/
/*! exports provided: exportSVG, createPathElFromPoints */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "exportSVG", function() { return exportSVG; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createPathElFromPoints", function() { return createPathElFromPoints; });
/* harmony import */ var svg_points__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! svg-points */ "./node_modules/svg-points/modules/index.js");
/* harmony import */ var file_saver__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! file-saver */ "./node_modules/file-saver/dist/FileSaver.min.js");
/* harmony import */ var file_saver__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(file_saver__WEBPACK_IMPORTED_MODULE_1__);



function exportSVG(polygons) {
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
  Object(file_saver__WEBPACK_IMPORTED_MODULE_1__["saveAs"])(blob, 'voronoi-' + Date.now() + '.svg');
}

function createPathElFromPoints(points) {
  let pointsString = '';

  for(let [index, point] of points.entries()) {
    pointsString += point[0] + ',' + point[1];

    if(index < points.length - 1) {
      pointsString += ' ';
    }
  }

  let d = Object(svg_points__WEBPACK_IMPORTED_MODULE_0__["toPath"])({
    type: 'polyline',
    points: pointsString
  });

  let pathEl = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  pathEl.setAttribute('d', d);
  pathEl.setAttribute('style', 'fill: none; stroke: black; stroke-width: 1');

  return pathEl;
}


/***/ }),

/***/ "./playground/js/voronoi-functions.js":
/*!********************************************!*\
  !*** ./playground/js/voronoi-functions.js ***!
  \********************************************/
/*! exports provided: getVoronoiPolygons */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getVoronoiPolygons", function() { return getVoronoiPolygons; });
/* harmony import */ var d3_delaunay__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! d3-delaunay */ "./node_modules/d3-delaunay/src/index.js");


// Build an array of polygons (arrays of [x,y] pairs) extracted from Voronoi package
function getVoronoiPolygons(points) {
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

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2QzLWRlbGF1bmF5L3NyYy9kZWxhdW5heS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvZDMtZGVsYXVuYXkvc3JjL2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9kMy1kZWxhdW5heS9zcmMvcGF0aC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvZDMtZGVsYXVuYXkvc3JjL3BvbHlnb24uanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2QzLWRlbGF1bmF5L3NyYy92b3Jvbm9pLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9kYXQuZ3VpL2J1aWxkL2RhdC5ndWkubW9kdWxlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9kZWxhdW5hdG9yL2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9maWxlLXNhdmVyL2Rpc3QvRmlsZVNhdmVyLm1pbi5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvc3ZnLXBvaW50cy9tb2R1bGVzL2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9zdmctcG9pbnRzL21vZHVsZXMvdG9QYXRoLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9zdmctcG9pbnRzL21vZHVsZXMvdG9Qb2ludHMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3N2Zy1wb2ludHMvbW9kdWxlcy92YWxpZC5qcyIsIndlYnBhY2s6Ly8vKHdlYnBhY2spL2J1aWxkaW4vZ2xvYmFsLmpzIiwid2VicGFjazovLy8uL3BsYXlncm91bmQvanMvUmluZy5qcyIsIndlYnBhY2s6Ly8vLi9wbGF5Z3JvdW5kL2pzL2VudHJ5LmpzIiwid2VicGFjazovLy8uL3BsYXlncm91bmQvanMvZXhwb3J0LWZ1bmN0aW9ucy5qcyIsIndlYnBhY2s6Ly8v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QUFDTDtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUCxLQUFLO0FBQ0w7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQ0FBcUMsUUFBUTtBQUM3QztBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLG1DQUFtQyxTQUFTO0FBQzVDO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsK0NBQStDLEVBQUU7QUFDakQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTs7Ozs7Ozs7Ozs7O0FBWUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsbUJBQW1CLGtCQUFrQjtBQUNyQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7Ozs7Ozs7QUFRRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQSxHQUFHO0FBQ0g7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBOzs7Ozs7Ozs7Ozs7QUFZQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0gsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0Esa0JBQWtCO0FBQ2xCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtS0FBbUssaUNBQWlDO0FBQ3BNO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUCxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtB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QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTCxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdCQUF3QjtBQUN4QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsR0FBRztBQUNIO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQSwrRUFBK0Usd0VBQXdFO0FBQ3ZKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsS0FBSztBQUNMLEdBQUc7QUFDSDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLEtBQUs7QUFDTCxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkJBQTJCO0FBQzNCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBLHVCQUF1QixvQ0FBb0M7QUFDM0Q7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNB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O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0EsZUFBZSw2QkFBNkI7O0FBRTVDOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBLGlFQUFpRTtBQUNqRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSx3Q0FBd0M7QUFDeEM7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBLFlBQVk7QUFDWjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSwwQkFBMEIsWUFBWTtB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eUJBQXlCO0FBQ3pDO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0EsUUFBUSxtRUFBUztBQUNqQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLGU7Ozs7Ozs7Ozs7OztBQ3phQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBb0M7QUFDQTs7QUFFN0I7QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0Esc0RBQXNELHNCQUFzQixHQUFHO0FBQy9FLEVBQUUseURBQU07QUFDUjs7QUFFTztBQUNQOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsVUFBVSx5REFBTTtBQUNoQjtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0EsMkNBQTJDLGVBQWU7O0FBRTFEO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUM1Q0E7QUFBQTtBQUFBO0FBQXVDOztBQUV2QztBQUNPO0FBQ1AsbUJBQW1CLG9EQUFRO0FBQzNCO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLEMiLCJmaWxlIjoicGxheWdyb3VuZC5idW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3BsYXlncm91bmQvanMvZW50cnkuanNcIik7XG4iLCJpbXBvcnQgRGVsYXVuYXRvciBmcm9tIFwiZGVsYXVuYXRvclwiO1xuaW1wb3J0IFBhdGggZnJvbSBcIi4vcGF0aC5qc1wiO1xuaW1wb3J0IFBvbHlnb24gZnJvbSBcIi4vcG9seWdvbi5qc1wiO1xuaW1wb3J0IFZvcm9ub2kgZnJvbSBcIi4vdm9yb25vaS5qc1wiO1xuXG5jb25zdCB0YXUgPSAyICogTWF0aC5QSTtcblxuZnVuY3Rpb24gcG9pbnRYKHApIHtcbiAgcmV0dXJuIHBbMF07XG59XG5cbmZ1bmN0aW9uIHBvaW50WShwKSB7XG4gIHJldHVybiBwWzFdO1xufVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBEZWxhdW5heSB7XG4gIGNvbnN0cnVjdG9yKHBvaW50cykge1xuICAgIGNvbnN0IHtoYWxmZWRnZXMsIGh1bGwsIHRyaWFuZ2xlc30gPSBuZXcgRGVsYXVuYXRvcihwb2ludHMpO1xuICAgIHRoaXMucG9pbnRzID0gcG9pbnRzO1xuICAgIHRoaXMuaGFsZmVkZ2VzID0gaGFsZmVkZ2VzO1xuICAgIHRoaXMuaHVsbCA9IGh1bGw7XG4gICAgdGhpcy50cmlhbmdsZXMgPSB0cmlhbmdsZXM7XG4gICAgY29uc3QgaW5lZGdlcyA9IHRoaXMuaW5lZGdlcyA9IG5ldyBJbnQzMkFycmF5KHBvaW50cy5sZW5ndGggLyAyKS5maWxsKC0xKTtcbiAgICBjb25zdCBvdXRlZGdlcyA9IHRoaXMub3V0ZWRnZXMgPSBuZXcgSW50MzJBcnJheShwb2ludHMubGVuZ3RoIC8gMikuZmlsbCgtMSk7XG5cbiAgICAvLyBDb21wdXRlIGFuIGluZGV4IGZyb20gZWFjaCBwb2ludCB0byBhbiAoYXJiaXRyYXJ5KSBpbmNvbWluZyBoYWxmZWRnZS5cbiAgICBmb3IgKGxldCBlID0gMCwgbiA9IGhhbGZlZGdlcy5sZW5ndGg7IGUgPCBuOyArK2UpIHtcbiAgICAgIGluZWRnZXNbdHJpYW5nbGVzW2UgJSAzID09PSAyID8gZSAtIDIgOiBlICsgMV1dID0gZTtcbiAgICB9XG5cbiAgICAvLyBGb3IgcG9pbnRzIG9uIHRoZSBodWxsLCBpbmRleCBib3RoIHRoZSBpbmNvbWluZyBhbmQgb3V0Z29pbmcgaGFsZmVkZ2VzLlxuICAgIGxldCBub2RlMCwgbm9kZTEgPSBodWxsO1xuICAgIGRvIHtcbiAgICAgIG5vZGUwID0gbm9kZTEsIG5vZGUxID0gbm9kZTEubmV4dDtcbiAgICAgIGluZWRnZXNbbm9kZTEuaV0gPSBub2RlMC50O1xuICAgICAgb3V0ZWRnZXNbbm9kZTAuaV0gPSBub2RlMS50O1xuICAgIH0gd2hpbGUgKG5vZGUxICE9PSBodWxsKTtcbiAgfVxuICB2b3Jvbm9pKGJvdW5kcykge1xuICAgIHJldHVybiBuZXcgVm9yb25vaSh0aGlzLCBib3VuZHMpO1xuICB9XG4gICpuZWlnaGJvcnMoaSkge1xuICAgIGNvbnN0IHtpbmVkZ2VzLCBvdXRlZGdlcywgaGFsZmVkZ2VzLCB0cmlhbmdsZXN9ID0gdGhpcztcbiAgICBjb25zdCBlMCA9IGluZWRnZXNbaV07XG4gICAgaWYgKGUwID09PSAtMSkgcmV0dXJuOyAvLyBjb2luY2lkZW50IHBvaW50XG4gICAgbGV0IGUgPSBlMDtcbiAgICBkbyB7XG4gICAgICB5aWVsZCB0cmlhbmdsZXNbZV07XG4gICAgICBlID0gZSAlIDMgPT09IDIgPyBlIC0gMiA6IGUgKyAxO1xuICAgICAgaWYgKHRyaWFuZ2xlc1tlXSAhPT0gaSkgcmV0dXJuOyAvLyBiYWQgdHJpYW5ndWxhdGlvblxuICAgICAgZSA9IGhhbGZlZGdlc1tlXTtcbiAgICAgIGlmIChlID09PSAtMSkgcmV0dXJuIHlpZWxkIHRyaWFuZ2xlc1tvdXRlZGdlc1tpXV07XG4gICAgfSB3aGlsZSAoZSAhPT0gZTApO1xuICB9XG4gIGZpbmQoeCwgeSwgaSA9IDApIHtcbiAgICBpZiAoKHggPSAreCwgeCAhPT0geCkgfHwgKHkgPSAreSwgeSAhPT0geSkpIHJldHVybiAtMTtcbiAgICBsZXQgYztcbiAgICB3aGlsZSAoKGMgPSB0aGlzLl9zdGVwKGksIHgsIHkpKSA+PSAwICYmIGMgIT09IGkpIGkgPSBjO1xuICAgIHJldHVybiBjO1xuICB9XG4gIF9zdGVwKGksIHgsIHkpIHtcbiAgICBjb25zdCB7aW5lZGdlcywgcG9pbnRzfSA9IHRoaXM7XG4gICAgaWYgKGluZWRnZXNbaV0gPT09IC0xKSByZXR1cm4gLTE7IC8vIGNvaW5jaWRlbnQgcG9pbnRcbiAgICBsZXQgYyA9IGk7XG4gICAgbGV0IGRjID0gKHggLSBwb2ludHNbaSAqIDJdKSAqKiAyICsgKHkgLSBwb2ludHNbaSAqIDIgKyAxXSkgKiogMjtcbiAgICBmb3IgKGNvbnN0IHQgb2YgdGhpcy5uZWlnaGJvcnMoaSkpIHtcbiAgICAgIGNvbnN0IGR0ID0gKHggLSBwb2ludHNbdCAqIDJdKSAqKiAyICsgKHkgLSBwb2ludHNbdCAqIDIgKyAxXSkgKiogMjtcbiAgICAgIGlmIChkdCA8IGRjKSBkYyA9IGR0LCBjID0gdDtcbiAgICB9XG4gICAgcmV0dXJuIGM7XG4gIH1cbiAgcmVuZGVyKGNvbnRleHQpIHtcbiAgICBjb25zdCBidWZmZXIgPSBjb250ZXh0ID09IG51bGwgPyBjb250ZXh0ID0gbmV3IFBhdGggOiB1bmRlZmluZWQ7XG4gICAgY29uc3Qge3BvaW50cywgaGFsZmVkZ2VzLCB0cmlhbmdsZXN9ID0gdGhpcztcbiAgICBmb3IgKGxldCBpID0gMCwgbiA9IGhhbGZlZGdlcy5sZW5ndGg7IGkgPCBuOyArK2kpIHtcbiAgICAgIGNvbnN0IGogPSBoYWxmZWRnZXNbaV07XG4gICAgICBpZiAoaiA8IGkpIGNvbnRpbnVlO1xuICAgICAgY29uc3QgdGkgPSB0cmlhbmdsZXNbaV0gKiAyO1xuICAgICAgY29uc3QgdGogPSB0cmlhbmdsZXNbal0gKiAyO1xuICAgICAgY29udGV4dC5tb3ZlVG8ocG9pbnRzW3RpXSwgcG9pbnRzW3RpICsgMV0pO1xuICAgICAgY29udGV4dC5saW5lVG8ocG9pbnRzW3RqXSwgcG9pbnRzW3RqICsgMV0pO1xuICAgIH1cbiAgICB0aGlzLnJlbmRlckh1bGwoY29udGV4dCk7XG4gICAgcmV0dXJuIGJ1ZmZlciAmJiBidWZmZXIudmFsdWUoKTtcbiAgfVxuICByZW5kZXJQb2ludHMoY29udGV4dCwgciA9IDIpIHtcbiAgICBjb25zdCBidWZmZXIgPSBjb250ZXh0ID09IG51bGwgPyBjb250ZXh0ID0gbmV3IFBhdGggOiB1bmRlZmluZWQ7XG4gICAgY29uc3Qge3BvaW50c30gPSB0aGlzO1xuICAgIGZvciAobGV0IGkgPSAwLCBuID0gcG9pbnRzLmxlbmd0aDsgaSA8IG47IGkgKz0gMikge1xuICAgICAgY29uc3QgeCA9IHBvaW50c1tpXSwgeSA9IHBvaW50c1tpICsgMV07XG4gICAgICBjb250ZXh0Lm1vdmVUbyh4ICsgciwgeSk7XG4gICAgICBjb250ZXh0LmFyYyh4LCB5LCByLCAwLCB0YXUpO1xuICAgIH1cbiAgICByZXR1cm4gYnVmZmVyICYmIGJ1ZmZlci52YWx1ZSgpO1xuICB9XG4gIHJlbmRlckh1bGwoY29udGV4dCkge1xuICAgIGNvbnN0IGJ1ZmZlciA9IGNvbnRleHQgPT0gbnVsbCA/IGNvbnRleHQgPSBuZXcgUGF0aCA6IHVuZGVmaW5lZDtcbiAgICBjb25zdCB7aHVsbH0gPSB0aGlzO1xuICAgIGxldCBub2RlID0gaHVsbDtcbiAgICBjb250ZXh0Lm1vdmVUbyhub2RlLngsIG5vZGUueSk7XG4gICAgd2hpbGUgKG5vZGUgPSBub2RlLm5leHQsIG5vZGUgIT09IGh1bGwpIGNvbnRleHQubGluZVRvKG5vZGUueCwgbm9kZS55KTtcbiAgICBjb250ZXh0LmNsb3NlUGF0aCgpO1xuICAgIHJldHVybiBidWZmZXIgJiYgYnVmZmVyLnZhbHVlKCk7XG4gIH1cbiAgaHVsbFBvbHlnb24oKSB7XG4gICAgY29uc3QgcG9seWdvbiA9IG5ldyBQb2x5Z29uO1xuICAgIHRoaXMucmVuZGVySHVsbChwb2x5Z29uKTtcbiAgICByZXR1cm4gcG9seWdvbi52YWx1ZSgpO1xuICB9XG4gIHJlbmRlclRyaWFuZ2xlKGksIGNvbnRleHQpIHtcbiAgICBjb25zdCBidWZmZXIgPSBjb250ZXh0ID09IG51bGwgPyBjb250ZXh0ID0gbmV3IFBhdGggOiB1bmRlZmluZWQ7XG4gICAgY29uc3Qge3BvaW50cywgdHJpYW5nbGVzfSA9IHRoaXM7XG4gICAgY29uc3QgdDAgPSB0cmlhbmdsZXNbaSAqPSAzXSAqIDI7XG4gICAgY29uc3QgdDEgPSB0cmlhbmdsZXNbaSArIDFdICogMjtcbiAgICBjb25zdCB0MiA9IHRyaWFuZ2xlc1tpICsgMl0gKiAyO1xuICAgIGNvbnRleHQubW92ZVRvKHBvaW50c1t0MF0sIHBvaW50c1t0MCArIDFdKTtcbiAgICBjb250ZXh0LmxpbmVUbyhwb2ludHNbdDFdLCBwb2ludHNbdDEgKyAxXSk7XG4gICAgY29udGV4dC5saW5lVG8ocG9pbnRzW3QyXSwgcG9pbnRzW3QyICsgMV0pO1xuICAgIGNvbnRleHQuY2xvc2VQYXRoKCk7XG4gICAgcmV0dXJuIGJ1ZmZlciAmJiBidWZmZXIudmFsdWUoKTtcbiAgfVxuICAqdHJpYW5nbGVQb2x5Z29ucygpIHtcbiAgICBjb25zdCB7dHJpYW5nbGVzfSA9IHRoaXM7XG4gICAgZm9yIChsZXQgaSA9IDAsIG4gPSB0cmlhbmdsZXMubGVuZ3RoIC8gMzsgaSA8IG47ICsraSkge1xuICAgICAgeWllbGQgdGhpcy50cmlhbmdsZVBvbHlnb24oaSk7XG4gICAgfVxuICB9XG4gIHRyaWFuZ2xlUG9seWdvbihpKSB7XG4gICAgY29uc3QgcG9seWdvbiA9IG5ldyBQb2x5Z29uO1xuICAgIHRoaXMucmVuZGVyVHJpYW5nbGUoaSwgcG9seWdvbik7XG4gICAgcmV0dXJuIHBvbHlnb24udmFsdWUoKTtcbiAgfVxufVxuXG5EZWxhdW5heS5mcm9tID0gZnVuY3Rpb24ocG9pbnRzLCBmeCA9IHBvaW50WCwgZnkgPSBwb2ludFksIHRoYXQpIHtcbiAgcmV0dXJuIG5ldyBEZWxhdW5heShcImxlbmd0aFwiIGluIHBvaW50c1xuICAgICAgPyBmbGF0QXJyYXkocG9pbnRzLCBmeCwgZnksIHRoYXQpXG4gICAgICA6IEZsb2F0NjRBcnJheS5mcm9tKGZsYXRJdGVyYWJsZShwb2ludHMsIGZ4LCBmeSwgdGhhdCkpKTtcbn07XG5cbmZ1bmN0aW9uIGZsYXRBcnJheShwb2ludHMsIGZ4LCBmeSwgdGhhdCkge1xuICBjb25zdCBuID0gcG9pbnRzLmxlbmd0aDtcbiAgY29uc3QgYXJyYXkgPSBuZXcgRmxvYXQ2NEFycmF5KG4gKiAyKTtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBuOyArK2kpIHtcbiAgICBjb25zdCBwID0gcG9pbnRzW2ldO1xuICAgIGFycmF5W2kgKiAyXSA9IGZ4LmNhbGwodGhhdCwgcCwgaSwgcG9pbnRzKTtcbiAgICBhcnJheVtpICogMiArIDFdID0gZnkuY2FsbCh0aGF0LCBwLCBpLCBwb2ludHMpO1xuICB9XG4gIHJldHVybiBhcnJheTtcbn1cblxuZnVuY3Rpb24qIGZsYXRJdGVyYWJsZShwb2ludHMsIGZ4LCBmeSwgdGhhdCkge1xuICBsZXQgaSA9IDA7XG4gIGZvciAoY29uc3QgcCBvZiBwb2ludHMpIHtcbiAgICB5aWVsZCBmeC5jYWxsKHRoYXQsIHAsIGksIHBvaW50cyk7XG4gICAgeWllbGQgZnkuY2FsbCh0aGF0LCBwLCBpLCBwb2ludHMpO1xuICAgICsraTtcbiAgfVxufVxuIiwiZXhwb3J0IHtkZWZhdWx0IGFzIERlbGF1bmF5fSBmcm9tIFwiLi9kZWxhdW5heS5qc1wiO1xuZXhwb3J0IHtkZWZhdWx0IGFzIFZvcm9ub2l9IGZyb20gXCIuL3Zvcm9ub2kuanNcIjtcbiIsImNvbnN0IGVwc2lsb24gPSAxZS02O1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQYXRoIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5feDAgPSB0aGlzLl95MCA9IC8vIHN0YXJ0IG9mIGN1cnJlbnQgc3VicGF0aFxuICAgIHRoaXMuX3gxID0gdGhpcy5feTEgPSBudWxsOyAvLyBlbmQgb2YgY3VycmVudCBzdWJwYXRoXG4gICAgdGhpcy5fID0gXCJcIjtcbiAgfVxuICBtb3ZlVG8oeCwgeSkge1xuICAgIHRoaXMuXyArPSBgTSR7dGhpcy5feDAgPSB0aGlzLl94MSA9ICt4fSwke3RoaXMuX3kwID0gdGhpcy5feTEgPSAreX1gO1xuICB9XG4gIGNsb3NlUGF0aCgpIHtcbiAgICBpZiAodGhpcy5feDEgIT09IG51bGwpIHtcbiAgICAgIHRoaXMuX3gxID0gdGhpcy5feDAsIHRoaXMuX3kxID0gdGhpcy5feTA7XG4gICAgICB0aGlzLl8gKz0gXCJaXCI7XG4gICAgfVxuICB9XG4gIGxpbmVUbyh4LCB5KSB7XG4gICAgdGhpcy5fICs9IGBMJHt0aGlzLl94MSA9ICt4fSwke3RoaXMuX3kxID0gK3l9YDtcbiAgfVxuICBhcmMoeCwgeSwgcikge1xuICAgIHggPSAreCwgeSA9ICt5LCByID0gK3I7XG4gICAgY29uc3QgeDAgPSB4ICsgcjtcbiAgICBjb25zdCB5MCA9IHk7XG4gICAgaWYgKHIgPCAwKSB0aHJvdyBuZXcgRXJyb3IoXCJuZWdhdGl2ZSByYWRpdXNcIik7XG4gICAgaWYgKHRoaXMuX3gxID09PSBudWxsKSB0aGlzLl8gKz0gYE0ke3gwfSwke3kwfWA7XG4gICAgZWxzZSBpZiAoTWF0aC5hYnModGhpcy5feDEgLSB4MCkgPiBlcHNpbG9uIHx8IE1hdGguYWJzKHRoaXMuX3kxIC0geTApID4gZXBzaWxvbikgdGhpcy5fICs9IFwiTFwiICsgeDAgKyBcIixcIiArIHkwO1xuICAgIGlmICghcikgcmV0dXJuO1xuICAgIHRoaXMuXyArPSBgQSR7cn0sJHtyfSwwLDEsMSwke3ggLSByfSwke3l9QSR7cn0sJHtyfSwwLDEsMSwke3RoaXMuX3gxID0geDB9LCR7dGhpcy5feTEgPSB5MH1gO1xuICB9XG4gIHJlY3QoeCwgeSwgdywgaCkge1xuICAgIHRoaXMuXyArPSBgTSR7dGhpcy5feDAgPSB0aGlzLl94MSA9ICt4fSwke3RoaXMuX3kwID0gdGhpcy5feTEgPSAreX1oJHsrd312JHsraH1oJHstd31aYDtcbiAgfVxuICB2YWx1ZSgpIHtcbiAgICByZXR1cm4gdGhpcy5fIHx8IG51bGw7XG4gIH1cbn1cbiIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIFBvbHlnb24ge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLl8gPSBbXTtcbiAgfVxuICBtb3ZlVG8oeCwgeSkge1xuICAgIHRoaXMuXy5wdXNoKFt4LCB5XSk7XG4gIH1cbiAgY2xvc2VQYXRoKCkge1xuICAgIHRoaXMuXy5wdXNoKHRoaXMuX1swXS5zbGljZSgpKTtcbiAgfVxuICBsaW5lVG8oeCwgeSkge1xuICAgIHRoaXMuXy5wdXNoKFt4LCB5XSk7XG4gIH1cbiAgdmFsdWUoKSB7XG4gICAgcmV0dXJuIHRoaXMuXy5sZW5ndGggPyB0aGlzLl8gOiBudWxsO1xuICB9XG59XG4iLCJpbXBvcnQgUGF0aCBmcm9tIFwiLi9wYXRoLmpzXCI7XG5pbXBvcnQgUG9seWdvbiBmcm9tIFwiLi9wb2x5Z29uLmpzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFZvcm9ub2kge1xuICBjb25zdHJ1Y3RvcihkZWxhdW5heSwgW3htaW4sIHltaW4sIHhtYXgsIHltYXhdID0gWzAsIDAsIDk2MCwgNTAwXSkge1xuICAgIGlmICghKCh4bWF4ID0gK3htYXgpID49ICh4bWluID0gK3htaW4pKSB8fCAhKCh5bWF4ID0gK3ltYXgpID49ICh5bWluID0gK3ltaW4pKSkgdGhyb3cgbmV3IEVycm9yKFwiaW52YWxpZCBib3VuZHNcIik7XG4gICAgY29uc3Qge3BvaW50cywgaHVsbCwgdHJpYW5nbGVzfSA9IHRoaXMuZGVsYXVuYXkgPSBkZWxhdW5heTtcbiAgICBjb25zdCBjaXJjdW1jZW50ZXJzID0gdGhpcy5jaXJjdW1jZW50ZXJzID0gbmV3IEZsb2F0NjRBcnJheSh0cmlhbmdsZXMubGVuZ3RoIC8gMyAqIDIpO1xuICAgIGNvbnN0IHZlY3RvcnMgPSB0aGlzLnZlY3RvcnMgPSBuZXcgRmxvYXQ2NEFycmF5KHBvaW50cy5sZW5ndGggKiAyKTtcbiAgICB0aGlzLnhtYXggPSB4bWF4LCB0aGlzLnhtaW4gPSB4bWluO1xuICAgIHRoaXMueW1heCA9IHltYXgsIHRoaXMueW1pbiA9IHltaW47XG5cbiAgICAvLyBDb21wdXRlIGNpcmN1bWNlbnRlcnMuXG4gICAgZm9yIChsZXQgaSA9IDAsIGogPSAwLCBuID0gdHJpYW5nbGVzLmxlbmd0aDsgaSA8IG47IGkgKz0gMywgaiArPSAyKSB7XG4gICAgICBjb25zdCB0MSA9IHRyaWFuZ2xlc1tpXSAqIDI7XG4gICAgICBjb25zdCB0MiA9IHRyaWFuZ2xlc1tpICsgMV0gKiAyO1xuICAgICAgY29uc3QgdDMgPSB0cmlhbmdsZXNbaSArIDJdICogMjtcbiAgICAgIGNvbnN0IHgxID0gcG9pbnRzW3QxXTtcbiAgICAgIGNvbnN0IHkxID0gcG9pbnRzW3QxICsgMV07XG4gICAgICBjb25zdCB4MiA9IHBvaW50c1t0Ml07XG4gICAgICBjb25zdCB5MiA9IHBvaW50c1t0MiArIDFdO1xuICAgICAgY29uc3QgeDMgPSBwb2ludHNbdDNdO1xuICAgICAgY29uc3QgeTMgPSBwb2ludHNbdDMgKyAxXTtcbiAgICAgIGNvbnN0IGEyID0geDEgLSB4MjtcbiAgICAgIGNvbnN0IGEzID0geDEgLSB4MztcbiAgICAgIGNvbnN0IGIyID0geTEgLSB5MjtcbiAgICAgIGNvbnN0IGIzID0geTEgLSB5MztcbiAgICAgIGNvbnN0IGQxID0geDEgKiB4MSArIHkxICogeTE7XG4gICAgICBjb25zdCBkMiA9IGQxIC0geDIgKiB4MiAtIHkyICogeTI7XG4gICAgICBjb25zdCBkMyA9IGQxIC0geDMgKiB4MyAtIHkzICogeTM7XG4gICAgICBjb25zdCBhYiA9IChhMyAqIGIyIC0gYTIgKiBiMykgKiAyO1xuICAgICAgY2lyY3VtY2VudGVyc1tqXSA9IChiMiAqIGQzIC0gYjMgKiBkMikgLyBhYjtcbiAgICAgIGNpcmN1bWNlbnRlcnNbaiArIDFdID0gKGEzICogZDIgLSBhMiAqIGQzKSAvIGFiO1xuICAgIH1cblxuICAgIC8vIENvbXB1dGUgZXh0ZXJpb3IgY2VsbCByYXlzLlxuICAgIGxldCBub2RlID0gaHVsbDtcbiAgICBsZXQgcDAsIHAxID0gbm9kZS5pICogNDtcbiAgICBsZXQgeDAsIHgxID0gbm9kZS54O1xuICAgIGxldCB5MCwgeTEgPSBub2RlLnk7XG4gICAgZG8ge1xuICAgICAgbm9kZSA9IG5vZGUubmV4dCwgcDAgPSBwMSwgeDAgPSB4MSwgeTAgPSB5MSwgcDEgPSBub2RlLmkgKiA0LCB4MSA9IG5vZGUueCwgeTEgPSBub2RlLnk7XG4gICAgICB2ZWN0b3JzW3AwICsgMl0gPSB2ZWN0b3JzW3AxXSA9IHkwIC0geTE7XG4gICAgICB2ZWN0b3JzW3AwICsgM10gPSB2ZWN0b3JzW3AxICsgMV0gPSB4MSAtIHgwO1xuICAgIH0gd2hpbGUgKG5vZGUgIT09IGh1bGwpO1xuICB9XG4gIHJlbmRlcihjb250ZXh0KSB7XG4gICAgY29uc3QgYnVmZmVyID0gY29udGV4dCA9PSBudWxsID8gY29udGV4dCA9IG5ldyBQYXRoIDogdW5kZWZpbmVkO1xuICAgIGNvbnN0IHtkZWxhdW5heToge2hhbGZlZGdlcywgaHVsbH0sIGNpcmN1bWNlbnRlcnMsIHZlY3RvcnN9ID0gdGhpcztcbiAgICBmb3IgKGxldCBpID0gMCwgbiA9IGhhbGZlZGdlcy5sZW5ndGg7IGkgPCBuOyArK2kpIHtcbiAgICAgIGNvbnN0IGogPSBoYWxmZWRnZXNbaV07XG4gICAgICBpZiAoaiA8IGkpIGNvbnRpbnVlO1xuICAgICAgY29uc3QgdGkgPSBNYXRoLmZsb29yKGkgLyAzKSAqIDI7XG4gICAgICBjb25zdCB0aiA9IE1hdGguZmxvb3IoaiAvIDMpICogMjtcbiAgICAgIGNvbnN0IHhpID0gY2lyY3VtY2VudGVyc1t0aV07XG4gICAgICBjb25zdCB5aSA9IGNpcmN1bWNlbnRlcnNbdGkgKyAxXTtcbiAgICAgIGNvbnN0IHhqID0gY2lyY3VtY2VudGVyc1t0al07XG4gICAgICBjb25zdCB5aiA9IGNpcmN1bWNlbnRlcnNbdGogKyAxXTtcbiAgICAgIHRoaXMuX3JlbmRlclNlZ21lbnQoeGksIHlpLCB4aiwgeWosIGNvbnRleHQpO1xuICAgIH1cbiAgICBsZXQgbm9kZSA9IGh1bGw7XG4gICAgZG8ge1xuICAgICAgbm9kZSA9IG5vZGUubmV4dDtcbiAgICAgIGNvbnN0IHQgPSBNYXRoLmZsb29yKG5vZGUudCAvIDMpICogMjtcbiAgICAgIGNvbnN0IHggPSBjaXJjdW1jZW50ZXJzW3RdO1xuICAgICAgY29uc3QgeSA9IGNpcmN1bWNlbnRlcnNbdCArIDFdO1xuICAgICAgY29uc3QgdiA9IG5vZGUuaSAqIDQ7XG4gICAgICBjb25zdCBwID0gdGhpcy5fcHJvamVjdCh4LCB5LCB2ZWN0b3JzW3YgKyAyXSwgdmVjdG9yc1t2ICsgM10pO1xuICAgICAgaWYgKHApIHRoaXMuX3JlbmRlclNlZ21lbnQoeCwgeSwgcFswXSwgcFsxXSwgY29udGV4dCk7XG4gICAgfSB3aGlsZSAobm9kZSAhPT0gaHVsbCk7XG4gICAgcmV0dXJuIGJ1ZmZlciAmJiBidWZmZXIudmFsdWUoKTtcbiAgfVxuICByZW5kZXJCb3VuZHMoY29udGV4dCkge1xuICAgIGNvbnN0IGJ1ZmZlciA9IGNvbnRleHQgPT0gbnVsbCA/IGNvbnRleHQgPSBuZXcgUGF0aCA6IHVuZGVmaW5lZDtcbiAgICBjb250ZXh0LnJlY3QodGhpcy54bWluLCB0aGlzLnltaW4sIHRoaXMueG1heCAtIHRoaXMueG1pbiwgdGhpcy55bWF4IC0gdGhpcy55bWluKTtcbiAgICByZXR1cm4gYnVmZmVyICYmIGJ1ZmZlci52YWx1ZSgpO1xuICB9XG4gIHJlbmRlckNlbGwoaSwgY29udGV4dCkge1xuICAgIGNvbnN0IGJ1ZmZlciA9IGNvbnRleHQgPT0gbnVsbCA/IGNvbnRleHQgPSBuZXcgUGF0aCA6IHVuZGVmaW5lZDtcbiAgICBjb25zdCBwb2ludHMgPSB0aGlzLl9jbGlwKGkpO1xuICAgIGlmIChwb2ludHMgPT09IG51bGwpIHJldHVybjtcbiAgICBjb250ZXh0Lm1vdmVUbyhwb2ludHNbMF0sIHBvaW50c1sxXSk7XG4gICAgZm9yIChsZXQgaSA9IDIsIG4gPSBwb2ludHMubGVuZ3RoOyBpIDwgbjsgaSArPSAyKSB7XG4gICAgICBjb250ZXh0LmxpbmVUbyhwb2ludHNbaV0sIHBvaW50c1tpICsgMV0pO1xuICAgIH1cbiAgICBjb250ZXh0LmNsb3NlUGF0aCgpO1xuICAgIHJldHVybiBidWZmZXIgJiYgYnVmZmVyLnZhbHVlKCk7XG4gIH1cbiAgKmNlbGxQb2x5Z29ucygpIHtcbiAgICBjb25zdCB7ZGVsYXVuYXk6IHtwb2ludHN9fSA9IHRoaXM7XG4gICAgZm9yIChsZXQgaSA9IDAsIG4gPSBwb2ludHMubGVuZ3RoIC8gMjsgaSA8IG47ICsraSkge1xuICAgICAgY29uc3QgY2VsbCA9IHRoaXMuY2VsbFBvbHlnb24oaSk7XG4gICAgICBpZiAoY2VsbCkgeWllbGQgY2VsbDtcbiAgICB9XG4gIH1cbiAgY2VsbFBvbHlnb24oaSkge1xuICAgIGNvbnN0IHBvbHlnb24gPSBuZXcgUG9seWdvbjtcbiAgICB0aGlzLnJlbmRlckNlbGwoaSwgcG9seWdvbik7XG4gICAgcmV0dXJuIHBvbHlnb24udmFsdWUoKTtcbiAgfVxuICBfcmVuZGVyU2VnbWVudCh4MCwgeTAsIHgxLCB5MSwgY29udGV4dCkge1xuICAgIGxldCBTO1xuICAgIGNvbnN0IGMwID0gdGhpcy5fcmVnaW9uY29kZSh4MCwgeTApO1xuICAgIGNvbnN0IGMxID0gdGhpcy5fcmVnaW9uY29kZSh4MSwgeTEpO1xuICAgIGlmIChjMCA9PT0gMCAmJiBjMSA9PT0gMCkge1xuICAgICAgY29udGV4dC5tb3ZlVG8oeDAsIHkwKTtcbiAgICAgIGNvbnRleHQubGluZVRvKHgxLCB5MSk7XG4gICAgfSBlbHNlIGlmIChTID0gdGhpcy5fY2xpcFNlZ21lbnQoeDAsIHkwLCB4MSwgeTEsIGMwLCBjMSkpIHtcbiAgICAgIGNvbnRleHQubW92ZVRvKFNbMF0sIFNbMV0pO1xuICAgICAgY29udGV4dC5saW5lVG8oU1syXSwgU1szXSk7XG4gICAgfVxuICB9XG4gIGNvbnRhaW5zKGksIHgsIHkpIHtcbiAgICBpZiAoKHggPSAreCwgeCAhPT0geCkgfHwgKHkgPSAreSwgeSAhPT0geSkpIHJldHVybiBmYWxzZTtcbiAgICByZXR1cm4gdGhpcy5kZWxhdW5heS5fc3RlcChpLCB4LCB5KSA9PT0gaTtcbiAgfVxuICBfY2VsbChpKSB7XG4gICAgY29uc3Qge2NpcmN1bWNlbnRlcnMsIGRlbGF1bmF5OiB7aW5lZGdlcywgaGFsZmVkZ2VzLCB0cmlhbmdsZXN9fSA9IHRoaXM7XG4gICAgY29uc3QgZTAgPSBpbmVkZ2VzW2ldO1xuICAgIGlmIChlMCA9PT0gLTEpIHJldHVybiBudWxsOyAvLyBjb2luY2lkZW50IHBvaW50XG4gICAgY29uc3QgcG9pbnRzID0gW107XG4gICAgbGV0IGUgPSBlMDtcbiAgICBkbyB7XG4gICAgICBjb25zdCB0ID0gTWF0aC5mbG9vcihlIC8gMyk7XG4gICAgICBwb2ludHMucHVzaChjaXJjdW1jZW50ZXJzW3QgKiAyXSwgY2lyY3VtY2VudGVyc1t0ICogMiArIDFdKTtcbiAgICAgIGUgPSBlICUgMyA9PT0gMiA/IGUgLSAyIDogZSArIDE7XG4gICAgICBpZiAodHJpYW5nbGVzW2VdICE9PSBpKSBicmVhazsgLy8gYmFkIHRyaWFuZ3VsYXRpb25cbiAgICAgIGUgPSBoYWxmZWRnZXNbZV07XG4gICAgfSB3aGlsZSAoZSAhPT0gZTAgJiYgZSAhPT0gLTEpO1xuICAgIHJldHVybiBwb2ludHM7XG4gIH1cbiAgX2NsaXAoaSkge1xuICAgIGNvbnN0IHBvaW50cyA9IHRoaXMuX2NlbGwoaSk7XG4gICAgaWYgKHBvaW50cyA9PT0gbnVsbCkgcmV0dXJuIG51bGw7XG4gICAgY29uc3Qge3ZlY3RvcnM6IFZ9ID0gdGhpcztcbiAgICBjb25zdCB2ID0gaSAqIDQ7XG4gICAgcmV0dXJuIFZbdl0gfHwgVlt2ICsgMV1cbiAgICAgICAgPyB0aGlzLl9jbGlwSW5maW5pdGUoaSwgcG9pbnRzLCBWW3ZdLCBWW3YgKyAxXSwgVlt2ICsgMl0sIFZbdiArIDNdKVxuICAgICAgICA6IHRoaXMuX2NsaXBGaW5pdGUoaSwgcG9pbnRzKTtcbiAgfVxuICBfY2xpcEZpbml0ZShpLCBwb2ludHMpIHtcbiAgICBjb25zdCBuID0gcG9pbnRzLmxlbmd0aDtcbiAgICBsZXQgUCA9IG51bGw7XG4gICAgbGV0IHgwLCB5MCwgeDEgPSBwb2ludHNbbiAtIDJdLCB5MSA9IHBvaW50c1tuIC0gMV07XG4gICAgbGV0IGMwLCBjMSA9IHRoaXMuX3JlZ2lvbmNvZGUoeDEsIHkxKTtcbiAgICBsZXQgZTAsIGUxO1xuICAgIGZvciAobGV0IGogPSAwOyBqIDwgbjsgaiArPSAyKSB7XG4gICAgICB4MCA9IHgxLCB5MCA9IHkxLCB4MSA9IHBvaW50c1tqXSwgeTEgPSBwb2ludHNbaiArIDFdO1xuICAgICAgYzAgPSBjMSwgYzEgPSB0aGlzLl9yZWdpb25jb2RlKHgxLCB5MSk7XG4gICAgICBpZiAoYzAgPT09IDAgJiYgYzEgPT09IDApIHtcbiAgICAgICAgZTAgPSBlMSwgZTEgPSAwO1xuICAgICAgICBpZiAoUCkgUC5wdXNoKHgxLCB5MSk7XG4gICAgICAgIGVsc2UgUCA9IFt4MSwgeTFdO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbGV0IFMsIHN4MCwgc3kwLCBzeDEsIHN5MTtcbiAgICAgICAgaWYgKGMwID09PSAwKSB7XG4gICAgICAgICAgaWYgKChTID0gdGhpcy5fY2xpcFNlZ21lbnQoeDAsIHkwLCB4MSwgeTEsIGMwLCBjMSkpID09PSBudWxsKSBjb250aW51ZTtcbiAgICAgICAgICBbc3gwLCBzeTAsIHN4MSwgc3kxXSA9IFM7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaWYgKChTID0gdGhpcy5fY2xpcFNlZ21lbnQoeDEsIHkxLCB4MCwgeTAsIGMxLCBjMCkpID09PSBudWxsKSBjb250aW51ZTtcbiAgICAgICAgICBbc3gxLCBzeTEsIHN4MCwgc3kwXSA9IFM7XG4gICAgICAgICAgZTAgPSBlMSwgZTEgPSB0aGlzLl9lZGdlY29kZShzeDAsIHN5MCk7XG4gICAgICAgICAgaWYgKGUwICYmIGUxKSB0aGlzLl9lZGdlKGksIGUwLCBlMSwgUCwgUC5sZW5ndGgpO1xuICAgICAgICAgIGlmIChQKSBQLnB1c2goc3gwLCBzeTApO1xuICAgICAgICAgIGVsc2UgUCA9IFtzeDAsIHN5MF07XG4gICAgICAgIH1cbiAgICAgICAgZTAgPSBlMSwgZTEgPSB0aGlzLl9lZGdlY29kZShzeDEsIHN5MSk7XG4gICAgICAgIGlmIChlMCAmJiBlMSkgdGhpcy5fZWRnZShpLCBlMCwgZTEsIFAsIFAubGVuZ3RoKTtcbiAgICAgICAgaWYgKFApIFAucHVzaChzeDEsIHN5MSk7XG4gICAgICAgIGVsc2UgUCA9IFtzeDEsIHN5MV07XG4gICAgICB9XG4gICAgfVxuICAgIGlmIChQKSB7XG4gICAgICBlMCA9IGUxLCBlMSA9IHRoaXMuX2VkZ2Vjb2RlKFBbMF0sIFBbMV0pO1xuICAgICAgaWYgKGUwICYmIGUxKSB0aGlzLl9lZGdlKGksIGUwLCBlMSwgUCwgUC5sZW5ndGgpO1xuICAgIH0gZWxzZSBpZiAodGhpcy5jb250YWlucyhpLCAodGhpcy54bWluICsgdGhpcy54bWF4KSAvIDIsICh0aGlzLnltaW4gKyB0aGlzLnltYXgpIC8gMikpIHtcbiAgICAgIHJldHVybiBbdGhpcy54bWF4LCB0aGlzLnltaW4sIHRoaXMueG1heCwgdGhpcy55bWF4LCB0aGlzLnhtaW4sIHRoaXMueW1heCwgdGhpcy54bWluLCB0aGlzLnltaW5dO1xuICAgIH1cbiAgICByZXR1cm4gUDtcbiAgfVxuICBfY2xpcFNlZ21lbnQoeDAsIHkwLCB4MSwgeTEsIGMwLCBjMSkge1xuICAgIHdoaWxlICh0cnVlKSB7XG4gICAgICBpZiAoYzAgPT09IDAgJiYgYzEgPT09IDApIHJldHVybiBbeDAsIHkwLCB4MSwgeTFdO1xuICAgICAgaWYgKGMwICYgYzEpIHJldHVybiBudWxsO1xuICAgICAgbGV0IHgsIHksIGMgPSBjMCB8fCBjMTtcbiAgICAgIGlmIChjICYgMGIxMDAwKSB4ID0geDAgKyAoeDEgLSB4MCkgKiAodGhpcy55bWF4IC0geTApIC8gKHkxIC0geTApLCB5ID0gdGhpcy55bWF4O1xuICAgICAgZWxzZSBpZiAoYyAmIDBiMDEwMCkgeCA9IHgwICsgKHgxIC0geDApICogKHRoaXMueW1pbiAtIHkwKSAvICh5MSAtIHkwKSwgeSA9IHRoaXMueW1pbjtcbiAgICAgIGVsc2UgaWYgKGMgJiAwYjAwMTApIHkgPSB5MCArICh5MSAtIHkwKSAqICh0aGlzLnhtYXggLSB4MCkgLyAoeDEgLSB4MCksIHggPSB0aGlzLnhtYXg7XG4gICAgICBlbHNlIHkgPSB5MCArICh5MSAtIHkwKSAqICh0aGlzLnhtaW4gLSB4MCkgLyAoeDEgLSB4MCksIHggPSB0aGlzLnhtaW47XG4gICAgICBpZiAoYzApIHgwID0geCwgeTAgPSB5LCBjMCA9IHRoaXMuX3JlZ2lvbmNvZGUoeDAsIHkwKTtcbiAgICAgIGVsc2UgeDEgPSB4LCB5MSA9IHksIGMxID0gdGhpcy5fcmVnaW9uY29kZSh4MSwgeTEpO1xuICAgIH1cbiAgfVxuICBfY2xpcEluZmluaXRlKGksIHBvaW50cywgdngwLCB2eTAsIHZ4biwgdnluKSB7XG4gICAgbGV0IFAgPSBBcnJheS5mcm9tKHBvaW50cyksIHA7XG4gICAgaWYgKHAgPSB0aGlzLl9wcm9qZWN0KFBbMF0sIFBbMV0sIHZ4MCwgdnkwKSkgUC51bnNoaWZ0KHBbMF0sIHBbMV0pO1xuICAgIGlmIChwID0gdGhpcy5fcHJvamVjdChQW1AubGVuZ3RoIC0gMl0sIFBbUC5sZW5ndGggLSAxXSwgdnhuLCB2eW4pKSBQLnB1c2gocFswXSwgcFsxXSk7XG4gICAgaWYgKFAgPSB0aGlzLl9jbGlwRmluaXRlKGksIFApKSB7XG4gICAgICBmb3IgKGxldCBqID0gMCwgbiA9IFAubGVuZ3RoLCBjMCwgYzEgPSB0aGlzLl9lZGdlY29kZShQW24gLSAyXSwgUFtuIC0gMV0pOyBqIDwgbjsgaiArPSAyKSB7XG4gICAgICAgIGMwID0gYzEsIGMxID0gdGhpcy5fZWRnZWNvZGUoUFtqXSwgUFtqICsgMV0pO1xuICAgICAgICBpZiAoYzAgJiYgYzEpIGogPSB0aGlzLl9lZGdlKGksIGMwLCBjMSwgUCwgaiksIG4gPSBQLmxlbmd0aDtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKHRoaXMuY29udGFpbnMoaSwgKHRoaXMueG1pbiArIHRoaXMueG1heCkgLyAyLCAodGhpcy55bWluICsgdGhpcy55bWF4KSAvIDIpKSB7XG4gICAgICBQID0gW3RoaXMueG1pbiwgdGhpcy55bWluLCB0aGlzLnhtYXgsIHRoaXMueW1pbiwgdGhpcy54bWF4LCB0aGlzLnltYXgsIHRoaXMueG1pbiwgdGhpcy55bWF4XTtcbiAgICB9XG4gICAgcmV0dXJuIFA7XG4gIH1cbiAgX2VkZ2UoaSwgZTAsIGUxLCBQLCBqKSB7XG4gICAgd2hpbGUgKGUwICE9PSBlMSkge1xuICAgICAgbGV0IHgsIHk7XG4gICAgICBzd2l0Y2ggKGUwKSB7XG4gICAgICAgIGNhc2UgMGIwMTAxOiBlMCA9IDBiMDEwMDsgY29udGludWU7IC8vIHRvcC1sZWZ0XG4gICAgICAgIGNhc2UgMGIwMTAwOiBlMCA9IDBiMDExMCwgeCA9IHRoaXMueG1heCwgeSA9IHRoaXMueW1pbjsgYnJlYWs7IC8vIHRvcFxuICAgICAgICBjYXNlIDBiMDExMDogZTAgPSAwYjAwMTA7IGNvbnRpbnVlOyAvLyB0b3AtcmlnaHRcbiAgICAgICAgY2FzZSAwYjAwMTA6IGUwID0gMGIxMDEwLCB4ID0gdGhpcy54bWF4LCB5ID0gdGhpcy55bWF4OyBicmVhazsgLy8gcmlnaHRcbiAgICAgICAgY2FzZSAwYjEwMTA6IGUwID0gMGIxMDAwOyBjb250aW51ZTsgLy8gYm90dG9tLXJpZ2h0XG4gICAgICAgIGNhc2UgMGIxMDAwOiBlMCA9IDBiMTAwMSwgeCA9IHRoaXMueG1pbiwgeSA9IHRoaXMueW1heDsgYnJlYWs7IC8vIGJvdHRvbVxuICAgICAgICBjYXNlIDBiMTAwMTogZTAgPSAwYjAwMDE7IGNvbnRpbnVlOyAvLyBib3R0b20tbGVmdFxuICAgICAgICBjYXNlIDBiMDAwMTogZTAgPSAwYjAxMDEsIHggPSB0aGlzLnhtaW4sIHkgPSB0aGlzLnltaW47IGJyZWFrOyAvLyBsZWZ0XG4gICAgICB9XG4gICAgICBpZiAoKFBbal0gIT09IHggfHwgUFtqICsgMV0gIT09IHkpICYmIHRoaXMuY29udGFpbnMoaSwgeCwgeSkpIHtcbiAgICAgICAgUC5zcGxpY2UoaiwgMCwgeCwgeSksIGogKz0gMjtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGo7XG4gIH1cbiAgX3Byb2plY3QoeDAsIHkwLCB2eCwgdnkpIHtcbiAgICBsZXQgdCA9IEluZmluaXR5LCBjLCB4LCB5O1xuICAgIGlmICh2eSA8IDApIHsgLy8gdG9wXG4gICAgICBpZiAoeTAgPD0gdGhpcy55bWluKSByZXR1cm4gbnVsbDtcbiAgICAgIGlmICgoYyA9ICh0aGlzLnltaW4gLSB5MCkgLyB2eSkgPCB0KSB5ID0gdGhpcy55bWluLCB4ID0geDAgKyAodCA9IGMpICogdng7XG4gICAgfSBlbHNlIGlmICh2eSA+IDApIHsgLy8gYm90dG9tXG4gICAgICBpZiAoeTAgPj0gdGhpcy55bWF4KSByZXR1cm4gbnVsbDtcbiAgICAgIGlmICgoYyA9ICh0aGlzLnltYXggLSB5MCkgLyB2eSkgPCB0KSB5ID0gdGhpcy55bWF4LCB4ID0geDAgKyAodCA9IGMpICogdng7XG4gICAgfVxuICAgIGlmICh2eCA+IDApIHsgLy8gcmlnaHRcbiAgICAgIGlmICh4MCA+PSB0aGlzLnhtYXgpIHJldHVybiBudWxsO1xuICAgICAgaWYgKChjID0gKHRoaXMueG1heCAtIHgwKSAvIHZ4KSA8IHQpIHggPSB0aGlzLnhtYXgsIHkgPSB5MCArICh0ID0gYykgKiB2eTtcbiAgICB9IGVsc2UgaWYgKHZ4IDwgMCkgeyAvLyBsZWZ0XG4gICAgICBpZiAoeDAgPD0gdGhpcy54bWluKSByZXR1cm4gbnVsbDtcbiAgICAgIGlmICgoYyA9ICh0aGlzLnhtaW4gLSB4MCkgLyB2eCkgPCB0KSB4ID0gdGhpcy54bWluLCB5ID0geTAgKyAodCA9IGMpICogdnk7XG4gICAgfVxuICAgIHJldHVybiBbeCwgeV07XG4gIH1cbiAgX2VkZ2Vjb2RlKHgsIHkpIHtcbiAgICByZXR1cm4gKHggPT09IHRoaXMueG1pbiA/IDBiMDAwMVxuICAgICAgICA6IHggPT09IHRoaXMueG1heCA/IDBiMDAxMCA6IDBiMDAwMClcbiAgICAgICAgfCAoeSA9PT0gdGhpcy55bWluID8gMGIwMTAwXG4gICAgICAgIDogeSA9PT0gdGhpcy55bWF4ID8gMGIxMDAwIDogMGIwMDAwKTtcbiAgfVxuICBfcmVnaW9uY29kZSh4LCB5KSB7XG4gICAgcmV0dXJuICh4IDwgdGhpcy54bWluID8gMGIwMDAxXG4gICAgICAgIDogeCA+IHRoaXMueG1heCA/IDBiMDAxMCA6IDBiMDAwMClcbiAgICAgICAgfCAoeSA8IHRoaXMueW1pbiA/IDBiMDEwMFxuICAgICAgICA6IHkgPiB0aGlzLnltYXggPyAwYjEwMDAgOiAwYjAwMDApO1xuICB9XG59XG4iLCIvKipcbiAqIGRhdC1ndWkgSmF2YVNjcmlwdCBDb250cm9sbGVyIExpYnJhcnlcbiAqIGh0dHA6Ly9jb2RlLmdvb2dsZS5jb20vcC9kYXQtZ3VpXG4gKlxuICogQ29weXJpZ2h0IDIwMTEgRGF0YSBBcnRzIFRlYW0sIEdvb2dsZSBDcmVhdGl2ZSBMYWJcbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKi9cblxuZnVuY3Rpb24gX19fJGluc2VydFN0eWxlKGNzcykge1xuICBpZiAoIWNzcykge1xuICAgIHJldHVybjtcbiAgfVxuICBpZiAodHlwZW9mIHdpbmRvdyA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICByZXR1cm47XG4gIH1cblxuICB2YXIgc3R5bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzdHlsZScpO1xuXG4gIHN0eWxlLnNldEF0dHJpYnV0ZSgndHlwZScsICd0ZXh0L2NzcycpO1xuICBzdHlsZS5pbm5lckhUTUwgPSBjc3M7XG4gIGRvY3VtZW50LmhlYWQuYXBwZW5kQ2hpbGQoc3R5bGUpO1xuXG4gIHJldHVybiBjc3M7XG59XG5cbmZ1bmN0aW9uIGNvbG9yVG9TdHJpbmcgKGNvbG9yLCBmb3JjZUNTU0hleCkge1xuICB2YXIgY29sb3JGb3JtYXQgPSBjb2xvci5fX3N0YXRlLmNvbnZlcnNpb25OYW1lLnRvU3RyaW5nKCk7XG4gIHZhciByID0gTWF0aC5yb3VuZChjb2xvci5yKTtcbiAgdmFyIGcgPSBNYXRoLnJvdW5kKGNvbG9yLmcpO1xuICB2YXIgYiA9IE1hdGgucm91bmQoY29sb3IuYik7XG4gIHZhciBhID0gY29sb3IuYTtcbiAgdmFyIGggPSBNYXRoLnJvdW5kKGNvbG9yLmgpO1xuICB2YXIgcyA9IGNvbG9yLnMudG9GaXhlZCgxKTtcbiAgdmFyIHYgPSBjb2xvci52LnRvRml4ZWQoMSk7XG4gIGlmIChmb3JjZUNTU0hleCB8fCBjb2xvckZvcm1hdCA9PT0gJ1RIUkVFX0NIQVJfSEVYJyB8fCBjb2xvckZvcm1hdCA9PT0gJ1NJWF9DSEFSX0hFWCcpIHtcbiAgICB2YXIgc3RyID0gY29sb3IuaGV4LnRvU3RyaW5nKDE2KTtcbiAgICB3aGlsZSAoc3RyLmxlbmd0aCA8IDYpIHtcbiAgICAgIHN0ciA9ICcwJyArIHN0cjtcbiAgICB9XG4gICAgcmV0dXJuICcjJyArIHN0cjtcbiAgfSBlbHNlIGlmIChjb2xvckZvcm1hdCA9PT0gJ0NTU19SR0InKSB7XG4gICAgcmV0dXJuICdyZ2IoJyArIHIgKyAnLCcgKyBnICsgJywnICsgYiArICcpJztcbiAgfSBlbHNlIGlmIChjb2xvckZvcm1hdCA9PT0gJ0NTU19SR0JBJykge1xuICAgIHJldHVybiAncmdiYSgnICsgciArICcsJyArIGcgKyAnLCcgKyBiICsgJywnICsgYSArICcpJztcbiAgfSBlbHNlIGlmIChjb2xvckZvcm1hdCA9PT0gJ0hFWCcpIHtcbiAgICByZXR1cm4gJzB4JyArIGNvbG9yLmhleC50b1N0cmluZygxNik7XG4gIH0gZWxzZSBpZiAoY29sb3JGb3JtYXQgPT09ICdSR0JfQVJSQVknKSB7XG4gICAgcmV0dXJuICdbJyArIHIgKyAnLCcgKyBnICsgJywnICsgYiArICddJztcbiAgfSBlbHNlIGlmIChjb2xvckZvcm1hdCA9PT0gJ1JHQkFfQVJSQVknKSB7XG4gICAgcmV0dXJuICdbJyArIHIgKyAnLCcgKyBnICsgJywnICsgYiArICcsJyArIGEgKyAnXSc7XG4gIH0gZWxzZSBpZiAoY29sb3JGb3JtYXQgPT09ICdSR0JfT0JKJykge1xuICAgIHJldHVybiAne3I6JyArIHIgKyAnLGc6JyArIGcgKyAnLGI6JyArIGIgKyAnfSc7XG4gIH0gZWxzZSBpZiAoY29sb3JGb3JtYXQgPT09ICdSR0JBX09CSicpIHtcbiAgICByZXR1cm4gJ3tyOicgKyByICsgJyxnOicgKyBnICsgJyxiOicgKyBiICsgJyxhOicgKyBhICsgJ30nO1xuICB9IGVsc2UgaWYgKGNvbG9yRm9ybWF0ID09PSAnSFNWX09CSicpIHtcbiAgICByZXR1cm4gJ3toOicgKyBoICsgJyxzOicgKyBzICsgJyx2OicgKyB2ICsgJ30nO1xuICB9IGVsc2UgaWYgKGNvbG9yRm9ybWF0ID09PSAnSFNWQV9PQkonKSB7XG4gICAgcmV0dXJuICd7aDonICsgaCArICcsczonICsgcyArICcsdjonICsgdiArICcsYTonICsgYSArICd9JztcbiAgfVxuICByZXR1cm4gJ3Vua25vd24gZm9ybWF0Jztcbn1cblxudmFyIEFSUl9FQUNIID0gQXJyYXkucHJvdG90eXBlLmZvckVhY2g7XG52YXIgQVJSX1NMSUNFID0gQXJyYXkucHJvdG90eXBlLnNsaWNlO1xudmFyIENvbW1vbiA9IHtcbiAgQlJFQUs6IHt9LFxuICBleHRlbmQ6IGZ1bmN0aW9uIGV4dGVuZCh0YXJnZXQpIHtcbiAgICB0aGlzLmVhY2goQVJSX1NMSUNFLmNhbGwoYXJndW1lbnRzLCAxKSwgZnVuY3Rpb24gKG9iaikge1xuICAgICAgdmFyIGtleXMgPSB0aGlzLmlzT2JqZWN0KG9iaikgPyBPYmplY3Qua2V5cyhvYmopIDogW107XG4gICAgICBrZXlzLmZvckVhY2goZnVuY3Rpb24gKGtleSkge1xuICAgICAgICBpZiAoIXRoaXMuaXNVbmRlZmluZWQob2JqW2tleV0pKSB7XG4gICAgICAgICAgdGFyZ2V0W2tleV0gPSBvYmpba2V5XTtcbiAgICAgICAgfVxuICAgICAgfS5iaW5kKHRoaXMpKTtcbiAgICB9LCB0aGlzKTtcbiAgICByZXR1cm4gdGFyZ2V0O1xuICB9LFxuICBkZWZhdWx0czogZnVuY3Rpb24gZGVmYXVsdHModGFyZ2V0KSB7XG4gICAgdGhpcy5lYWNoKEFSUl9TTElDRS5jYWxsKGFyZ3VtZW50cywgMSksIGZ1bmN0aW9uIChvYmopIHtcbiAgICAgIHZhciBrZXlzID0gdGhpcy5pc09iamVjdChvYmopID8gT2JqZWN0LmtleXMob2JqKSA6IFtdO1xuICAgICAga2V5cy5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpIHtcbiAgICAgICAgaWYgKHRoaXMuaXNVbmRlZmluZWQodGFyZ2V0W2tleV0pKSB7XG4gICAgICAgICAgdGFyZ2V0W2tleV0gPSBvYmpba2V5XTtcbiAgICAgICAgfVxuICAgICAgfS5iaW5kKHRoaXMpKTtcbiAgICB9LCB0aGlzKTtcbiAgICByZXR1cm4gdGFyZ2V0O1xuICB9LFxuICBjb21wb3NlOiBmdW5jdGlvbiBjb21wb3NlKCkge1xuICAgIHZhciB0b0NhbGwgPSBBUlJfU0xJQ0UuY2FsbChhcmd1bWVudHMpO1xuICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgICB2YXIgYXJncyA9IEFSUl9TTElDRS5jYWxsKGFyZ3VtZW50cyk7XG4gICAgICBmb3IgKHZhciBpID0gdG9DYWxsLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG4gICAgICAgIGFyZ3MgPSBbdG9DYWxsW2ldLmFwcGx5KHRoaXMsIGFyZ3MpXTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBhcmdzWzBdO1xuICAgIH07XG4gIH0sXG4gIGVhY2g6IGZ1bmN0aW9uIGVhY2gob2JqLCBpdHIsIHNjb3BlKSB7XG4gICAgaWYgKCFvYmopIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKEFSUl9FQUNIICYmIG9iai5mb3JFYWNoICYmIG9iai5mb3JFYWNoID09PSBBUlJfRUFDSCkge1xuICAgICAgb2JqLmZvckVhY2goaXRyLCBzY29wZSk7XG4gICAgfSBlbHNlIGlmIChvYmoubGVuZ3RoID09PSBvYmoubGVuZ3RoICsgMCkge1xuICAgICAgdmFyIGtleSA9IHZvaWQgMDtcbiAgICAgIHZhciBsID0gdm9pZCAwO1xuICAgICAgZm9yIChrZXkgPSAwLCBsID0gb2JqLmxlbmd0aDsga2V5IDwgbDsga2V5KyspIHtcbiAgICAgICAgaWYgKGtleSBpbiBvYmogJiYgaXRyLmNhbGwoc2NvcGUsIG9ialtrZXldLCBrZXkpID09PSB0aGlzLkJSRUFLKSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGZvciAodmFyIF9rZXkgaW4gb2JqKSB7XG4gICAgICAgIGlmIChpdHIuY2FsbChzY29wZSwgb2JqW19rZXldLCBfa2V5KSA9PT0gdGhpcy5CUkVBSykge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfSxcbiAgZGVmZXI6IGZ1bmN0aW9uIGRlZmVyKGZuYykge1xuICAgIHNldFRpbWVvdXQoZm5jLCAwKTtcbiAgfSxcbiAgZGVib3VuY2U6IGZ1bmN0aW9uIGRlYm91bmNlKGZ1bmMsIHRocmVzaG9sZCwgY2FsbEltbWVkaWF0ZWx5KSB7XG4gICAgdmFyIHRpbWVvdXQgPSB2b2lkIDA7XG4gICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAgIHZhciBvYmogPSB0aGlzO1xuICAgICAgdmFyIGFyZ3MgPSBhcmd1bWVudHM7XG4gICAgICBmdW5jdGlvbiBkZWxheWVkKCkge1xuICAgICAgICB0aW1lb3V0ID0gbnVsbDtcbiAgICAgICAgaWYgKCFjYWxsSW1tZWRpYXRlbHkpIGZ1bmMuYXBwbHkob2JqLCBhcmdzKTtcbiAgICAgIH1cbiAgICAgIHZhciBjYWxsTm93ID0gY2FsbEltbWVkaWF0ZWx5IHx8ICF0aW1lb3V0O1xuICAgICAgY2xlYXJUaW1lb3V0KHRpbWVvdXQpO1xuICAgICAgdGltZW91dCA9IHNldFRpbWVvdXQoZGVsYXllZCwgdGhyZXNob2xkKTtcbiAgICAgIGlmIChjYWxsTm93KSB7XG4gICAgICAgIGZ1bmMuYXBwbHkob2JqLCBhcmdzKTtcbiAgICAgIH1cbiAgICB9O1xuICB9LFxuICB0b0FycmF5OiBmdW5jdGlvbiB0b0FycmF5KG9iaikge1xuICAgIGlmIChvYmoudG9BcnJheSkgcmV0dXJuIG9iai50b0FycmF5KCk7XG4gICAgcmV0dXJuIEFSUl9TTElDRS5jYWxsKG9iaik7XG4gIH0sXG4gIGlzVW5kZWZpbmVkOiBmdW5jdGlvbiBpc1VuZGVmaW5lZChvYmopIHtcbiAgICByZXR1cm4gb2JqID09PSB1bmRlZmluZWQ7XG4gIH0sXG4gIGlzTnVsbDogZnVuY3Rpb24gaXNOdWxsKG9iaikge1xuICAgIHJldHVybiBvYmogPT09IG51bGw7XG4gIH0sXG4gIGlzTmFOOiBmdW5jdGlvbiAoX2lzTmFOKSB7XG4gICAgZnVuY3Rpb24gaXNOYU4oX3gpIHtcbiAgICAgIHJldHVybiBfaXNOYU4uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICB9XG4gICAgaXNOYU4udG9TdHJpbmcgPSBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gX2lzTmFOLnRvU3RyaW5nKCk7XG4gICAgfTtcbiAgICByZXR1cm4gaXNOYU47XG4gIH0oZnVuY3Rpb24gKG9iaikge1xuICAgIHJldHVybiBpc05hTihvYmopO1xuICB9KSxcbiAgaXNBcnJheTogQXJyYXkuaXNBcnJheSB8fCBmdW5jdGlvbiAob2JqKSB7XG4gICAgcmV0dXJuIG9iai5jb25zdHJ1Y3RvciA9PT0gQXJyYXk7XG4gIH0sXG4gIGlzT2JqZWN0OiBmdW5jdGlvbiBpc09iamVjdChvYmopIHtcbiAgICByZXR1cm4gb2JqID09PSBPYmplY3Qob2JqKTtcbiAgfSxcbiAgaXNOdW1iZXI6IGZ1bmN0aW9uIGlzTnVtYmVyKG9iaikge1xuICAgIHJldHVybiBvYmogPT09IG9iaiArIDA7XG4gIH0sXG4gIGlzU3RyaW5nOiBmdW5jdGlvbiBpc1N0cmluZyhvYmopIHtcbiAgICByZXR1cm4gb2JqID09PSBvYmogKyAnJztcbiAgfSxcbiAgaXNCb29sZWFuOiBmdW5jdGlvbiBpc0Jvb2xlYW4ob2JqKSB7XG4gICAgcmV0dXJuIG9iaiA9PT0gZmFsc2UgfHwgb2JqID09PSB0cnVlO1xuICB9LFxuICBpc0Z1bmN0aW9uOiBmdW5jdGlvbiBpc0Z1bmN0aW9uKG9iaikge1xuICAgIHJldHVybiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwob2JqKSA9PT0gJ1tvYmplY3QgRnVuY3Rpb25dJztcbiAgfVxufTtcblxudmFyIElOVEVSUFJFVEFUSU9OUyA9IFtcbntcbiAgbGl0bXVzOiBDb21tb24uaXNTdHJpbmcsXG4gIGNvbnZlcnNpb25zOiB7XG4gICAgVEhSRUVfQ0hBUl9IRVg6IHtcbiAgICAgIHJlYWQ6IGZ1bmN0aW9uIHJlYWQob3JpZ2luYWwpIHtcbiAgICAgICAgdmFyIHRlc3QgPSBvcmlnaW5hbC5tYXRjaCgvXiMoW0EtRjAtOV0pKFtBLUYwLTldKShbQS1GMC05XSkkL2kpO1xuICAgICAgICBpZiAodGVzdCA9PT0gbnVsbCkge1xuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIHNwYWNlOiAnSEVYJyxcbiAgICAgICAgICBoZXg6IHBhcnNlSW50KCcweCcgKyB0ZXN0WzFdLnRvU3RyaW5nKCkgKyB0ZXN0WzFdLnRvU3RyaW5nKCkgKyB0ZXN0WzJdLnRvU3RyaW5nKCkgKyB0ZXN0WzJdLnRvU3RyaW5nKCkgKyB0ZXN0WzNdLnRvU3RyaW5nKCkgKyB0ZXN0WzNdLnRvU3RyaW5nKCksIDApXG4gICAgICAgIH07XG4gICAgICB9LFxuICAgICAgd3JpdGU6IGNvbG9yVG9TdHJpbmdcbiAgICB9LFxuICAgIFNJWF9DSEFSX0hFWDoge1xuICAgICAgcmVhZDogZnVuY3Rpb24gcmVhZChvcmlnaW5hbCkge1xuICAgICAgICB2YXIgdGVzdCA9IG9yaWdpbmFsLm1hdGNoKC9eIyhbQS1GMC05XXs2fSkkL2kpO1xuICAgICAgICBpZiAodGVzdCA9PT0gbnVsbCkge1xuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIHNwYWNlOiAnSEVYJyxcbiAgICAgICAgICBoZXg6IHBhcnNlSW50KCcweCcgKyB0ZXN0WzFdLnRvU3RyaW5nKCksIDApXG4gICAgICAgIH07XG4gICAgICB9LFxuICAgICAgd3JpdGU6IGNvbG9yVG9TdHJpbmdcbiAgICB9LFxuICAgIENTU19SR0I6IHtcbiAgICAgIHJlYWQ6IGZ1bmN0aW9uIHJlYWQob3JpZ2luYWwpIHtcbiAgICAgICAgdmFyIHRlc3QgPSBvcmlnaW5hbC5tYXRjaCgvXnJnYlxcKFxccyooLispXFxzKixcXHMqKC4rKVxccyosXFxzKiguKylcXHMqXFwpLyk7XG4gICAgICAgIGlmICh0ZXN0ID09PSBudWxsKSB7XG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgc3BhY2U6ICdSR0InLFxuICAgICAgICAgIHI6IHBhcnNlRmxvYXQodGVzdFsxXSksXG4gICAgICAgICAgZzogcGFyc2VGbG9hdCh0ZXN0WzJdKSxcbiAgICAgICAgICBiOiBwYXJzZUZsb2F0KHRlc3RbM10pXG4gICAgICAgIH07XG4gICAgICB9LFxuICAgICAgd3JpdGU6IGNvbG9yVG9TdHJpbmdcbiAgICB9LFxuICAgIENTU19SR0JBOiB7XG4gICAgICByZWFkOiBmdW5jdGlvbiByZWFkKG9yaWdpbmFsKSB7XG4gICAgICAgIHZhciB0ZXN0ID0gb3JpZ2luYWwubWF0Y2goL15yZ2JhXFwoXFxzKiguKylcXHMqLFxccyooLispXFxzKixcXHMqKC4rKVxccyosXFxzKiguKylcXHMqXFwpLyk7XG4gICAgICAgIGlmICh0ZXN0ID09PSBudWxsKSB7XG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgc3BhY2U6ICdSR0InLFxuICAgICAgICAgIHI6IHBhcnNlRmxvYXQodGVzdFsxXSksXG4gICAgICAgICAgZzogcGFyc2VGbG9hdCh0ZXN0WzJdKSxcbiAgICAgICAgICBiOiBwYXJzZUZsb2F0KHRlc3RbM10pLFxuICAgICAgICAgIGE6IHBhcnNlRmxvYXQodGVzdFs0XSlcbiAgICAgICAgfTtcbiAgICAgIH0sXG4gICAgICB3cml0ZTogY29sb3JUb1N0cmluZ1xuICAgIH1cbiAgfVxufSxcbntcbiAgbGl0bXVzOiBDb21tb24uaXNOdW1iZXIsXG4gIGNvbnZlcnNpb25zOiB7XG4gICAgSEVYOiB7XG4gICAgICByZWFkOiBmdW5jdGlvbiByZWFkKG9yaWdpbmFsKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgc3BhY2U6ICdIRVgnLFxuICAgICAgICAgIGhleDogb3JpZ2luYWwsXG4gICAgICAgICAgY29udmVyc2lvbk5hbWU6ICdIRVgnXG4gICAgICAgIH07XG4gICAgICB9LFxuICAgICAgd3JpdGU6IGZ1bmN0aW9uIHdyaXRlKGNvbG9yKSB7XG4gICAgICAgIHJldHVybiBjb2xvci5oZXg7XG4gICAgICB9XG4gICAgfVxuICB9XG59LFxue1xuICBsaXRtdXM6IENvbW1vbi5pc0FycmF5LFxuICBjb252ZXJzaW9uczoge1xuICAgIFJHQl9BUlJBWToge1xuICAgICAgcmVhZDogZnVuY3Rpb24gcmVhZChvcmlnaW5hbCkge1xuICAgICAgICBpZiAob3JpZ2luYWwubGVuZ3RoICE9PSAzKSB7XG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgc3BhY2U6ICdSR0InLFxuICAgICAgICAgIHI6IG9yaWdpbmFsWzBdLFxuICAgICAgICAgIGc6IG9yaWdpbmFsWzFdLFxuICAgICAgICAgIGI6IG9yaWdpbmFsWzJdXG4gICAgICAgIH07XG4gICAgICB9LFxuICAgICAgd3JpdGU6IGZ1bmN0aW9uIHdyaXRlKGNvbG9yKSB7XG4gICAgICAgIHJldHVybiBbY29sb3IuciwgY29sb3IuZywgY29sb3IuYl07XG4gICAgICB9XG4gICAgfSxcbiAgICBSR0JBX0FSUkFZOiB7XG4gICAgICByZWFkOiBmdW5jdGlvbiByZWFkKG9yaWdpbmFsKSB7XG4gICAgICAgIGlmIChvcmlnaW5hbC5sZW5ndGggIT09IDQpIHJldHVybiBmYWxzZTtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICBzcGFjZTogJ1JHQicsXG4gICAgICAgICAgcjogb3JpZ2luYWxbMF0sXG4gICAgICAgICAgZzogb3JpZ2luYWxbMV0sXG4gICAgICAgICAgYjogb3JpZ2luYWxbMl0sXG4gICAgICAgICAgYTogb3JpZ2luYWxbM11cbiAgICAgICAgfTtcbiAgICAgIH0sXG4gICAgICB3cml0ZTogZnVuY3Rpb24gd3JpdGUoY29sb3IpIHtcbiAgICAgICAgcmV0dXJuIFtjb2xvci5yLCBjb2xvci5nLCBjb2xvci5iLCBjb2xvci5hXTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn0sXG57XG4gIGxpdG11czogQ29tbW9uLmlzT2JqZWN0LFxuICBjb252ZXJzaW9uczoge1xuICAgIFJHQkFfT0JKOiB7XG4gICAgICByZWFkOiBmdW5jdGlvbiByZWFkKG9yaWdpbmFsKSB7XG4gICAgICAgIGlmIChDb21tb24uaXNOdW1iZXIob3JpZ2luYWwucikgJiYgQ29tbW9uLmlzTnVtYmVyKG9yaWdpbmFsLmcpICYmIENvbW1vbi5pc051bWJlcihvcmlnaW5hbC5iKSAmJiBDb21tb24uaXNOdW1iZXIob3JpZ2luYWwuYSkpIHtcbiAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgc3BhY2U6ICdSR0InLFxuICAgICAgICAgICAgcjogb3JpZ2luYWwucixcbiAgICAgICAgICAgIGc6IG9yaWdpbmFsLmcsXG4gICAgICAgICAgICBiOiBvcmlnaW5hbC5iLFxuICAgICAgICAgICAgYTogb3JpZ2luYWwuYVxuICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfSxcbiAgICAgIHdyaXRlOiBmdW5jdGlvbiB3cml0ZShjb2xvcikge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIHI6IGNvbG9yLnIsXG4gICAgICAgICAgZzogY29sb3IuZyxcbiAgICAgICAgICBiOiBjb2xvci5iLFxuICAgICAgICAgIGE6IGNvbG9yLmFcbiAgICAgICAgfTtcbiAgICAgIH1cbiAgICB9LFxuICAgIFJHQl9PQko6IHtcbiAgICAgIHJlYWQ6IGZ1bmN0aW9uIHJlYWQob3JpZ2luYWwpIHtcbiAgICAgICAgaWYgKENvbW1vbi5pc051bWJlcihvcmlnaW5hbC5yKSAmJiBDb21tb24uaXNOdW1iZXIob3JpZ2luYWwuZykgJiYgQ29tbW9uLmlzTnVtYmVyKG9yaWdpbmFsLmIpKSB7XG4gICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHNwYWNlOiAnUkdCJyxcbiAgICAgICAgICAgIHI6IG9yaWdpbmFsLnIsXG4gICAgICAgICAgICBnOiBvcmlnaW5hbC5nLFxuICAgICAgICAgICAgYjogb3JpZ2luYWwuYlxuICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfSxcbiAgICAgIHdyaXRlOiBmdW5jdGlvbiB3cml0ZShjb2xvcikge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIHI6IGNvbG9yLnIsXG4gICAgICAgICAgZzogY29sb3IuZyxcbiAgICAgICAgICBiOiBjb2xvci5iXG4gICAgICAgIH07XG4gICAgICB9XG4gICAgfSxcbiAgICBIU1ZBX09CSjoge1xuICAgICAgcmVhZDogZnVuY3Rpb24gcmVhZChvcmlnaW5hbCkge1xuICAgICAgICBpZiAoQ29tbW9uLmlzTnVtYmVyKG9yaWdpbmFsLmgpICYmIENvbW1vbi5pc051bWJlcihvcmlnaW5hbC5zKSAmJiBDb21tb24uaXNOdW1iZXIob3JpZ2luYWwudikgJiYgQ29tbW9uLmlzTnVtYmVyKG9yaWdpbmFsLmEpKSB7XG4gICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHNwYWNlOiAnSFNWJyxcbiAgICAgICAgICAgIGg6IG9yaWdpbmFsLmgsXG4gICAgICAgICAgICBzOiBvcmlnaW5hbC5zLFxuICAgICAgICAgICAgdjogb3JpZ2luYWwudixcbiAgICAgICAgICAgIGE6IG9yaWdpbmFsLmFcbiAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH0sXG4gICAgICB3cml0ZTogZnVuY3Rpb24gd3JpdGUoY29sb3IpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICBoOiBjb2xvci5oLFxuICAgICAgICAgIHM6IGNvbG9yLnMsXG4gICAgICAgICAgdjogY29sb3IudixcbiAgICAgICAgICBhOiBjb2xvci5hXG4gICAgICAgIH07XG4gICAgICB9XG4gICAgfSxcbiAgICBIU1ZfT0JKOiB7XG4gICAgICByZWFkOiBmdW5jdGlvbiByZWFkKG9yaWdpbmFsKSB7XG4gICAgICAgIGlmIChDb21tb24uaXNOdW1iZXIob3JpZ2luYWwuaCkgJiYgQ29tbW9uLmlzTnVtYmVyKG9yaWdpbmFsLnMpICYmIENvbW1vbi5pc051bWJlcihvcmlnaW5hbC52KSkge1xuICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBzcGFjZTogJ0hTVicsXG4gICAgICAgICAgICBoOiBvcmlnaW5hbC5oLFxuICAgICAgICAgICAgczogb3JpZ2luYWwucyxcbiAgICAgICAgICAgIHY6IG9yaWdpbmFsLnZcbiAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH0sXG4gICAgICB3cml0ZTogZnVuY3Rpb24gd3JpdGUoY29sb3IpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICBoOiBjb2xvci5oLFxuICAgICAgICAgIHM6IGNvbG9yLnMsXG4gICAgICAgICAgdjogY29sb3IudlxuICAgICAgICB9O1xuICAgICAgfVxuICAgIH1cbiAgfVxufV07XG52YXIgcmVzdWx0ID0gdm9pZCAwO1xudmFyIHRvUmV0dXJuID0gdm9pZCAwO1xudmFyIGludGVycHJldCA9IGZ1bmN0aW9uIGludGVycHJldCgpIHtcbiAgdG9SZXR1cm4gPSBmYWxzZTtcbiAgdmFyIG9yaWdpbmFsID0gYXJndW1lbnRzLmxlbmd0aCA+IDEgPyBDb21tb24udG9BcnJheShhcmd1bWVudHMpIDogYXJndW1lbnRzWzBdO1xuICBDb21tb24uZWFjaChJTlRFUlBSRVRBVElPTlMsIGZ1bmN0aW9uIChmYW1pbHkpIHtcbiAgICBpZiAoZmFtaWx5LmxpdG11cyhvcmlnaW5hbCkpIHtcbiAgICAgIENvbW1vbi5lYWNoKGZhbWlseS5jb252ZXJzaW9ucywgZnVuY3Rpb24gKGNvbnZlcnNpb24sIGNvbnZlcnNpb25OYW1lKSB7XG4gICAgICAgIHJlc3VsdCA9IGNvbnZlcnNpb24ucmVhZChvcmlnaW5hbCk7XG4gICAgICAgIGlmICh0b1JldHVybiA9PT0gZmFsc2UgJiYgcmVzdWx0ICE9PSBmYWxzZSkge1xuICAgICAgICAgIHRvUmV0dXJuID0gcmVzdWx0O1xuICAgICAgICAgIHJlc3VsdC5jb252ZXJzaW9uTmFtZSA9IGNvbnZlcnNpb25OYW1lO1xuICAgICAgICAgIHJlc3VsdC5jb252ZXJzaW9uID0gY29udmVyc2lvbjtcbiAgICAgICAgICByZXR1cm4gQ29tbW9uLkJSRUFLO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIHJldHVybiBDb21tb24uQlJFQUs7XG4gICAgfVxuICB9KTtcbiAgcmV0dXJuIHRvUmV0dXJuO1xufTtcblxudmFyIHRtcENvbXBvbmVudCA9IHZvaWQgMDtcbnZhciBDb2xvck1hdGggPSB7XG4gIGhzdl90b19yZ2I6IGZ1bmN0aW9uIGhzdl90b19yZ2IoaCwgcywgdikge1xuICAgIHZhciBoaSA9IE1hdGguZmxvb3IoaCAvIDYwKSAlIDY7XG4gICAgdmFyIGYgPSBoIC8gNjAgLSBNYXRoLmZsb29yKGggLyA2MCk7XG4gICAgdmFyIHAgPSB2ICogKDEuMCAtIHMpO1xuICAgIHZhciBxID0gdiAqICgxLjAgLSBmICogcyk7XG4gICAgdmFyIHQgPSB2ICogKDEuMCAtICgxLjAgLSBmKSAqIHMpO1xuICAgIHZhciBjID0gW1t2LCB0LCBwXSwgW3EsIHYsIHBdLCBbcCwgdiwgdF0sIFtwLCBxLCB2XSwgW3QsIHAsIHZdLCBbdiwgcCwgcV1dW2hpXTtcbiAgICByZXR1cm4ge1xuICAgICAgcjogY1swXSAqIDI1NSxcbiAgICAgIGc6IGNbMV0gKiAyNTUsXG4gICAgICBiOiBjWzJdICogMjU1XG4gICAgfTtcbiAgfSxcbiAgcmdiX3RvX2hzdjogZnVuY3Rpb24gcmdiX3RvX2hzdihyLCBnLCBiKSB7XG4gICAgdmFyIG1pbiA9IE1hdGgubWluKHIsIGcsIGIpO1xuICAgIHZhciBtYXggPSBNYXRoLm1heChyLCBnLCBiKTtcbiAgICB2YXIgZGVsdGEgPSBtYXggLSBtaW47XG4gICAgdmFyIGggPSB2b2lkIDA7XG4gICAgdmFyIHMgPSB2b2lkIDA7XG4gICAgaWYgKG1heCAhPT0gMCkge1xuICAgICAgcyA9IGRlbHRhIC8gbWF4O1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBoOiBOYU4sXG4gICAgICAgIHM6IDAsXG4gICAgICAgIHY6IDBcbiAgICAgIH07XG4gICAgfVxuICAgIGlmIChyID09PSBtYXgpIHtcbiAgICAgIGggPSAoZyAtIGIpIC8gZGVsdGE7XG4gICAgfSBlbHNlIGlmIChnID09PSBtYXgpIHtcbiAgICAgIGggPSAyICsgKGIgLSByKSAvIGRlbHRhO1xuICAgIH0gZWxzZSB7XG4gICAgICBoID0gNCArIChyIC0gZykgLyBkZWx0YTtcbiAgICB9XG4gICAgaCAvPSA2O1xuICAgIGlmIChoIDwgMCkge1xuICAgICAgaCArPSAxO1xuICAgIH1cbiAgICByZXR1cm4ge1xuICAgICAgaDogaCAqIDM2MCxcbiAgICAgIHM6IHMsXG4gICAgICB2OiBtYXggLyAyNTVcbiAgICB9O1xuICB9LFxuICByZ2JfdG9faGV4OiBmdW5jdGlvbiByZ2JfdG9faGV4KHIsIGcsIGIpIHtcbiAgICB2YXIgaGV4ID0gdGhpcy5oZXhfd2l0aF9jb21wb25lbnQoMCwgMiwgcik7XG4gICAgaGV4ID0gdGhpcy5oZXhfd2l0aF9jb21wb25lbnQoaGV4LCAxLCBnKTtcbiAgICBoZXggPSB0aGlzLmhleF93aXRoX2NvbXBvbmVudChoZXgsIDAsIGIpO1xuICAgIHJldHVybiBoZXg7XG4gIH0sXG4gIGNvbXBvbmVudF9mcm9tX2hleDogZnVuY3Rpb24gY29tcG9uZW50X2Zyb21faGV4KGhleCwgY29tcG9uZW50SW5kZXgpIHtcbiAgICByZXR1cm4gaGV4ID4+IGNvbXBvbmVudEluZGV4ICogOCAmIDB4RkY7XG4gIH0sXG4gIGhleF93aXRoX2NvbXBvbmVudDogZnVuY3Rpb24gaGV4X3dpdGhfY29tcG9uZW50KGhleCwgY29tcG9uZW50SW5kZXgsIHZhbHVlKSB7XG4gICAgcmV0dXJuIHZhbHVlIDw8ICh0bXBDb21wb25lbnQgPSBjb21wb25lbnRJbmRleCAqIDgpIHwgaGV4ICYgfigweEZGIDw8IHRtcENvbXBvbmVudCk7XG4gIH1cbn07XG5cbnZhciBfdHlwZW9mID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIHR5cGVvZiBTeW1ib2wuaXRlcmF0b3IgPT09IFwic3ltYm9sXCIgPyBmdW5jdGlvbiAob2JqKSB7XG4gIHJldHVybiB0eXBlb2Ygb2JqO1xufSA6IGZ1bmN0aW9uIChvYmopIHtcbiAgcmV0dXJuIG9iaiAmJiB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgb2JqLmNvbnN0cnVjdG9yID09PSBTeW1ib2wgJiYgb2JqICE9PSBTeW1ib2wucHJvdG90eXBlID8gXCJzeW1ib2xcIiA6IHR5cGVvZiBvYmo7XG59O1xuXG5cblxuXG5cblxuXG5cblxuXG5cbnZhciBjbGFzc0NhbGxDaGVjayA9IGZ1bmN0aW9uIChpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHtcbiAgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uXCIpO1xuICB9XG59O1xuXG52YXIgY3JlYXRlQ2xhc3MgPSBmdW5jdGlvbiAoKSB7XG4gIGZ1bmN0aW9uIGRlZmluZVByb3BlcnRpZXModGFyZ2V0LCBwcm9wcykge1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcHJvcHMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBkZXNjcmlwdG9yID0gcHJvcHNbaV07XG4gICAgICBkZXNjcmlwdG9yLmVudW1lcmFibGUgPSBkZXNjcmlwdG9yLmVudW1lcmFibGUgfHwgZmFsc2U7XG4gICAgICBkZXNjcmlwdG9yLmNvbmZpZ3VyYWJsZSA9IHRydWU7XG4gICAgICBpZiAoXCJ2YWx1ZVwiIGluIGRlc2NyaXB0b3IpIGRlc2NyaXB0b3Iud3JpdGFibGUgPSB0cnVlO1xuICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwgZGVzY3JpcHRvci5rZXksIGRlc2NyaXB0b3IpO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBmdW5jdGlvbiAoQ29uc3RydWN0b3IsIHByb3RvUHJvcHMsIHN0YXRpY1Byb3BzKSB7XG4gICAgaWYgKHByb3RvUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IucHJvdG90eXBlLCBwcm90b1Byb3BzKTtcbiAgICBpZiAoc3RhdGljUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IsIHN0YXRpY1Byb3BzKTtcbiAgICByZXR1cm4gQ29uc3RydWN0b3I7XG4gIH07XG59KCk7XG5cblxuXG5cblxuXG5cbnZhciBnZXQgPSBmdW5jdGlvbiBnZXQob2JqZWN0LCBwcm9wZXJ0eSwgcmVjZWl2ZXIpIHtcbiAgaWYgKG9iamVjdCA9PT0gbnVsbCkgb2JqZWN0ID0gRnVuY3Rpb24ucHJvdG90eXBlO1xuICB2YXIgZGVzYyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3Iob2JqZWN0LCBwcm9wZXJ0eSk7XG5cbiAgaWYgKGRlc2MgPT09IHVuZGVmaW5lZCkge1xuICAgIHZhciBwYXJlbnQgPSBPYmplY3QuZ2V0UHJvdG90eXBlT2Yob2JqZWN0KTtcblxuICAgIGlmIChwYXJlbnQgPT09IG51bGwpIHtcbiAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBnZXQocGFyZW50LCBwcm9wZXJ0eSwgcmVjZWl2ZXIpO1xuICAgIH1cbiAgfSBlbHNlIGlmIChcInZhbHVlXCIgaW4gZGVzYykge1xuICAgIHJldHVybiBkZXNjLnZhbHVlO1xuICB9IGVsc2Uge1xuICAgIHZhciBnZXR0ZXIgPSBkZXNjLmdldDtcblxuICAgIGlmIChnZXR0ZXIgPT09IHVuZGVmaW5lZCkge1xuICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICB9XG5cbiAgICByZXR1cm4gZ2V0dGVyLmNhbGwocmVjZWl2ZXIpO1xuICB9XG59O1xuXG52YXIgaW5oZXJpdHMgPSBmdW5jdGlvbiAoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIHtcbiAgaWYgKHR5cGVvZiBzdXBlckNsYXNzICE9PSBcImZ1bmN0aW9uXCIgJiYgc3VwZXJDbGFzcyAhPT0gbnVsbCkge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJTdXBlciBleHByZXNzaW9uIG11c3QgZWl0aGVyIGJlIG51bGwgb3IgYSBmdW5jdGlvbiwgbm90IFwiICsgdHlwZW9mIHN1cGVyQ2xhc3MpO1xuICB9XG5cbiAgc3ViQ2xhc3MucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShzdXBlckNsYXNzICYmIHN1cGVyQ2xhc3MucHJvdG90eXBlLCB7XG4gICAgY29uc3RydWN0b3I6IHtcbiAgICAgIHZhbHVlOiBzdWJDbGFzcyxcbiAgICAgIGVudW1lcmFibGU6IGZhbHNlLFxuICAgICAgd3JpdGFibGU6IHRydWUsXG4gICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICB9XG4gIH0pO1xuICBpZiAoc3VwZXJDbGFzcykgT2JqZWN0LnNldFByb3RvdHlwZU9mID8gT2JqZWN0LnNldFByb3RvdHlwZU9mKHN1YkNsYXNzLCBzdXBlckNsYXNzKSA6IHN1YkNsYXNzLl9fcHJvdG9fXyA9IHN1cGVyQ2xhc3M7XG59O1xuXG5cblxuXG5cblxuXG5cblxuXG5cbnZhciBwb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuID0gZnVuY3Rpb24gKHNlbGYsIGNhbGwpIHtcbiAgaWYgKCFzZWxmKSB7XG4gICAgdGhyb3cgbmV3IFJlZmVyZW5jZUVycm9yKFwidGhpcyBoYXNuJ3QgYmVlbiBpbml0aWFsaXNlZCAtIHN1cGVyKCkgaGFzbid0IGJlZW4gY2FsbGVkXCIpO1xuICB9XG5cbiAgcmV0dXJuIGNhbGwgJiYgKHR5cGVvZiBjYWxsID09PSBcIm9iamVjdFwiIHx8IHR5cGVvZiBjYWxsID09PSBcImZ1bmN0aW9uXCIpID8gY2FsbCA6IHNlbGY7XG59O1xuXG52YXIgQ29sb3IgPSBmdW5jdGlvbiAoKSB7XG4gIGZ1bmN0aW9uIENvbG9yKCkge1xuICAgIGNsYXNzQ2FsbENoZWNrKHRoaXMsIENvbG9yKTtcbiAgICB0aGlzLl9fc3RhdGUgPSBpbnRlcnByZXQuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICBpZiAodGhpcy5fX3N0YXRlID09PSBmYWxzZSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdGYWlsZWQgdG8gaW50ZXJwcmV0IGNvbG9yIGFyZ3VtZW50cycpO1xuICAgIH1cbiAgICB0aGlzLl9fc3RhdGUuYSA9IHRoaXMuX19zdGF0ZS5hIHx8IDE7XG4gIH1cbiAgY3JlYXRlQ2xhc3MoQ29sb3IsIFt7XG4gICAga2V5OiAndG9TdHJpbmcnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiB0b1N0cmluZygpIHtcbiAgICAgIHJldHVybiBjb2xvclRvU3RyaW5nKHRoaXMpO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ3RvSGV4U3RyaW5nJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gdG9IZXhTdHJpbmcoKSB7XG4gICAgICByZXR1cm4gY29sb3JUb1N0cmluZyh0aGlzLCB0cnVlKTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICd0b09yaWdpbmFsJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gdG9PcmlnaW5hbCgpIHtcbiAgICAgIHJldHVybiB0aGlzLl9fc3RhdGUuY29udmVyc2lvbi53cml0ZSh0aGlzKTtcbiAgICB9XG4gIH1dKTtcbiAgcmV0dXJuIENvbG9yO1xufSgpO1xuZnVuY3Rpb24gZGVmaW5lUkdCQ29tcG9uZW50KHRhcmdldCwgY29tcG9uZW50LCBjb21wb25lbnRIZXhJbmRleCkge1xuICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBjb21wb25lbnQsIHtcbiAgICBnZXQ6IGZ1bmN0aW9uIGdldCQkMSgpIHtcbiAgICAgIGlmICh0aGlzLl9fc3RhdGUuc3BhY2UgPT09ICdSR0InKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9fc3RhdGVbY29tcG9uZW50XTtcbiAgICAgIH1cbiAgICAgIENvbG9yLnJlY2FsY3VsYXRlUkdCKHRoaXMsIGNvbXBvbmVudCwgY29tcG9uZW50SGV4SW5kZXgpO1xuICAgICAgcmV0dXJuIHRoaXMuX19zdGF0ZVtjb21wb25lbnRdO1xuICAgIH0sXG4gICAgc2V0OiBmdW5jdGlvbiBzZXQkJDEodikge1xuICAgICAgaWYgKHRoaXMuX19zdGF0ZS5zcGFjZSAhPT0gJ1JHQicpIHtcbiAgICAgICAgQ29sb3IucmVjYWxjdWxhdGVSR0IodGhpcywgY29tcG9uZW50LCBjb21wb25lbnRIZXhJbmRleCk7XG4gICAgICAgIHRoaXMuX19zdGF0ZS5zcGFjZSA9ICdSR0InO1xuICAgICAgfVxuICAgICAgdGhpcy5fX3N0YXRlW2NvbXBvbmVudF0gPSB2O1xuICAgIH1cbiAgfSk7XG59XG5mdW5jdGlvbiBkZWZpbmVIU1ZDb21wb25lbnQodGFyZ2V0LCBjb21wb25lbnQpIHtcbiAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwgY29tcG9uZW50LCB7XG4gICAgZ2V0OiBmdW5jdGlvbiBnZXQkJDEoKSB7XG4gICAgICBpZiAodGhpcy5fX3N0YXRlLnNwYWNlID09PSAnSFNWJykge1xuICAgICAgICByZXR1cm4gdGhpcy5fX3N0YXRlW2NvbXBvbmVudF07XG4gICAgICB9XG4gICAgICBDb2xvci5yZWNhbGN1bGF0ZUhTVih0aGlzKTtcbiAgICAgIHJldHVybiB0aGlzLl9fc3RhdGVbY29tcG9uZW50XTtcbiAgICB9LFxuICAgIHNldDogZnVuY3Rpb24gc2V0JCQxKHYpIHtcbiAgICAgIGlmICh0aGlzLl9fc3RhdGUuc3BhY2UgIT09ICdIU1YnKSB7XG4gICAgICAgIENvbG9yLnJlY2FsY3VsYXRlSFNWKHRoaXMpO1xuICAgICAgICB0aGlzLl9fc3RhdGUuc3BhY2UgPSAnSFNWJztcbiAgICAgIH1cbiAgICAgIHRoaXMuX19zdGF0ZVtjb21wb25lbnRdID0gdjtcbiAgICB9XG4gIH0pO1xufVxuQ29sb3IucmVjYWxjdWxhdGVSR0IgPSBmdW5jdGlvbiAoY29sb3IsIGNvbXBvbmVudCwgY29tcG9uZW50SGV4SW5kZXgpIHtcbiAgaWYgKGNvbG9yLl9fc3RhdGUuc3BhY2UgPT09ICdIRVgnKSB7XG4gICAgY29sb3IuX19zdGF0ZVtjb21wb25lbnRdID0gQ29sb3JNYXRoLmNvbXBvbmVudF9mcm9tX2hleChjb2xvci5fX3N0YXRlLmhleCwgY29tcG9uZW50SGV4SW5kZXgpO1xuICB9IGVsc2UgaWYgKGNvbG9yLl9fc3RhdGUuc3BhY2UgPT09ICdIU1YnKSB7XG4gICAgQ29tbW9uLmV4dGVuZChjb2xvci5fX3N0YXRlLCBDb2xvck1hdGguaHN2X3RvX3JnYihjb2xvci5fX3N0YXRlLmgsIGNvbG9yLl9fc3RhdGUucywgY29sb3IuX19zdGF0ZS52KSk7XG4gIH0gZWxzZSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdDb3JydXB0ZWQgY29sb3Igc3RhdGUnKTtcbiAgfVxufTtcbkNvbG9yLnJlY2FsY3VsYXRlSFNWID0gZnVuY3Rpb24gKGNvbG9yKSB7XG4gIHZhciByZXN1bHQgPSBDb2xvck1hdGgucmdiX3RvX2hzdihjb2xvci5yLCBjb2xvci5nLCBjb2xvci5iKTtcbiAgQ29tbW9uLmV4dGVuZChjb2xvci5fX3N0YXRlLCB7XG4gICAgczogcmVzdWx0LnMsXG4gICAgdjogcmVzdWx0LnZcbiAgfSk7XG4gIGlmICghQ29tbW9uLmlzTmFOKHJlc3VsdC5oKSkge1xuICAgIGNvbG9yLl9fc3RhdGUuaCA9IHJlc3VsdC5oO1xuICB9IGVsc2UgaWYgKENvbW1vbi5pc1VuZGVmaW5lZChjb2xvci5fX3N0YXRlLmgpKSB7XG4gICAgY29sb3IuX19zdGF0ZS5oID0gMDtcbiAgfVxufTtcbkNvbG9yLkNPTVBPTkVOVFMgPSBbJ3InLCAnZycsICdiJywgJ2gnLCAncycsICd2JywgJ2hleCcsICdhJ107XG5kZWZpbmVSR0JDb21wb25lbnQoQ29sb3IucHJvdG90eXBlLCAncicsIDIpO1xuZGVmaW5lUkdCQ29tcG9uZW50KENvbG9yLnByb3RvdHlwZSwgJ2cnLCAxKTtcbmRlZmluZVJHQkNvbXBvbmVudChDb2xvci5wcm90b3R5cGUsICdiJywgMCk7XG5kZWZpbmVIU1ZDb21wb25lbnQoQ29sb3IucHJvdG90eXBlLCAnaCcpO1xuZGVmaW5lSFNWQ29tcG9uZW50KENvbG9yLnByb3RvdHlwZSwgJ3MnKTtcbmRlZmluZUhTVkNvbXBvbmVudChDb2xvci5wcm90b3R5cGUsICd2Jyk7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoQ29sb3IucHJvdG90eXBlLCAnYScsIHtcbiAgZ2V0OiBmdW5jdGlvbiBnZXQkJDEoKSB7XG4gICAgcmV0dXJuIHRoaXMuX19zdGF0ZS5hO1xuICB9LFxuICBzZXQ6IGZ1bmN0aW9uIHNldCQkMSh2KSB7XG4gICAgdGhpcy5fX3N0YXRlLmEgPSB2O1xuICB9XG59KTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShDb2xvci5wcm90b3R5cGUsICdoZXgnLCB7XG4gIGdldDogZnVuY3Rpb24gZ2V0JCQxKCkge1xuICAgIGlmICghdGhpcy5fX3N0YXRlLnNwYWNlICE9PSAnSEVYJykge1xuICAgICAgdGhpcy5fX3N0YXRlLmhleCA9IENvbG9yTWF0aC5yZ2JfdG9faGV4KHRoaXMuciwgdGhpcy5nLCB0aGlzLmIpO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5fX3N0YXRlLmhleDtcbiAgfSxcbiAgc2V0OiBmdW5jdGlvbiBzZXQkJDEodikge1xuICAgIHRoaXMuX19zdGF0ZS5zcGFjZSA9ICdIRVgnO1xuICAgIHRoaXMuX19zdGF0ZS5oZXggPSB2O1xuICB9XG59KTtcblxudmFyIENvbnRyb2xsZXIgPSBmdW5jdGlvbiAoKSB7XG4gIGZ1bmN0aW9uIENvbnRyb2xsZXIob2JqZWN0LCBwcm9wZXJ0eSkge1xuICAgIGNsYXNzQ2FsbENoZWNrKHRoaXMsIENvbnRyb2xsZXIpO1xuICAgIHRoaXMuaW5pdGlhbFZhbHVlID0gb2JqZWN0W3Byb3BlcnR5XTtcbiAgICB0aGlzLmRvbUVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICB0aGlzLm9iamVjdCA9IG9iamVjdDtcbiAgICB0aGlzLnByb3BlcnR5ID0gcHJvcGVydHk7XG4gICAgdGhpcy5fX29uQ2hhbmdlID0gdW5kZWZpbmVkO1xuICAgIHRoaXMuX19vbkZpbmlzaENoYW5nZSA9IHVuZGVmaW5lZDtcbiAgfVxuICBjcmVhdGVDbGFzcyhDb250cm9sbGVyLCBbe1xuICAgIGtleTogJ29uQ2hhbmdlJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gb25DaGFuZ2UoZm5jKSB7XG4gICAgICB0aGlzLl9fb25DaGFuZ2UgPSBmbmM7XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdvbkZpbmlzaENoYW5nZScsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIG9uRmluaXNoQ2hhbmdlKGZuYykge1xuICAgICAgdGhpcy5fX29uRmluaXNoQ2hhbmdlID0gZm5jO1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAnc2V0VmFsdWUnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBzZXRWYWx1ZShuZXdWYWx1ZSkge1xuICAgICAgdGhpcy5vYmplY3RbdGhpcy5wcm9wZXJ0eV0gPSBuZXdWYWx1ZTtcbiAgICAgIGlmICh0aGlzLl9fb25DaGFuZ2UpIHtcbiAgICAgICAgdGhpcy5fX29uQ2hhbmdlLmNhbGwodGhpcywgbmV3VmFsdWUpO1xuICAgICAgfVxuICAgICAgdGhpcy51cGRhdGVEaXNwbGF5KCk7XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdnZXRWYWx1ZScsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGdldFZhbHVlKCkge1xuICAgICAgcmV0dXJuIHRoaXMub2JqZWN0W3RoaXMucHJvcGVydHldO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ3VwZGF0ZURpc3BsYXknLFxuICAgIHZhbHVlOiBmdW5jdGlvbiB1cGRhdGVEaXNwbGF5KCkge1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAnaXNNb2RpZmllZCcsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGlzTW9kaWZpZWQoKSB7XG4gICAgICByZXR1cm4gdGhpcy5pbml0aWFsVmFsdWUgIT09IHRoaXMuZ2V0VmFsdWUoKTtcbiAgICB9XG4gIH1dKTtcbiAgcmV0dXJuIENvbnRyb2xsZXI7XG59KCk7XG5cbnZhciBFVkVOVF9NQVAgPSB7XG4gIEhUTUxFdmVudHM6IFsnY2hhbmdlJ10sXG4gIE1vdXNlRXZlbnRzOiBbJ2NsaWNrJywgJ21vdXNlbW92ZScsICdtb3VzZWRvd24nLCAnbW91c2V1cCcsICdtb3VzZW92ZXInXSxcbiAgS2V5Ym9hcmRFdmVudHM6IFsna2V5ZG93biddXG59O1xudmFyIEVWRU5UX01BUF9JTlYgPSB7fTtcbkNvbW1vbi5lYWNoKEVWRU5UX01BUCwgZnVuY3Rpb24gKHYsIGspIHtcbiAgQ29tbW9uLmVhY2godiwgZnVuY3Rpb24gKGUpIHtcbiAgICBFVkVOVF9NQVBfSU5WW2VdID0gaztcbiAgfSk7XG59KTtcbnZhciBDU1NfVkFMVUVfUElYRUxTID0gLyhcXGQrKFxcLlxcZCspPylweC87XG5mdW5jdGlvbiBjc3NWYWx1ZVRvUGl4ZWxzKHZhbCkge1xuICBpZiAodmFsID09PSAnMCcgfHwgQ29tbW9uLmlzVW5kZWZpbmVkKHZhbCkpIHtcbiAgICByZXR1cm4gMDtcbiAgfVxuICB2YXIgbWF0Y2ggPSB2YWwubWF0Y2goQ1NTX1ZBTFVFX1BJWEVMUyk7XG4gIGlmICghQ29tbW9uLmlzTnVsbChtYXRjaCkpIHtcbiAgICByZXR1cm4gcGFyc2VGbG9hdChtYXRjaFsxXSk7XG4gIH1cbiAgcmV0dXJuIDA7XG59XG52YXIgZG9tID0ge1xuICBtYWtlU2VsZWN0YWJsZTogZnVuY3Rpb24gbWFrZVNlbGVjdGFibGUoZWxlbSwgc2VsZWN0YWJsZSkge1xuICAgIGlmIChlbGVtID09PSB1bmRlZmluZWQgfHwgZWxlbS5zdHlsZSA9PT0gdW5kZWZpbmVkKSByZXR1cm47XG4gICAgZWxlbS5vbnNlbGVjdHN0YXJ0ID0gc2VsZWN0YWJsZSA/IGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9IDogZnVuY3Rpb24gKCkge307XG4gICAgZWxlbS5zdHlsZS5Nb3pVc2VyU2VsZWN0ID0gc2VsZWN0YWJsZSA/ICdhdXRvJyA6ICdub25lJztcbiAgICBlbGVtLnN0eWxlLktodG1sVXNlclNlbGVjdCA9IHNlbGVjdGFibGUgPyAnYXV0bycgOiAnbm9uZSc7XG4gICAgZWxlbS51bnNlbGVjdGFibGUgPSBzZWxlY3RhYmxlID8gJ29uJyA6ICdvZmYnO1xuICB9LFxuICBtYWtlRnVsbHNjcmVlbjogZnVuY3Rpb24gbWFrZUZ1bGxzY3JlZW4oZWxlbSwgaG9yLCB2ZXJ0KSB7XG4gICAgdmFyIHZlcnRpY2FsID0gdmVydDtcbiAgICB2YXIgaG9yaXpvbnRhbCA9IGhvcjtcbiAgICBpZiAoQ29tbW9uLmlzVW5kZWZpbmVkKGhvcml6b250YWwpKSB7XG4gICAgICBob3Jpem9udGFsID0gdHJ1ZTtcbiAgICB9XG4gICAgaWYgKENvbW1vbi5pc1VuZGVmaW5lZCh2ZXJ0aWNhbCkpIHtcbiAgICAgIHZlcnRpY2FsID0gdHJ1ZTtcbiAgICB9XG4gICAgZWxlbS5zdHlsZS5wb3NpdGlvbiA9ICdhYnNvbHV0ZSc7XG4gICAgaWYgKGhvcml6b250YWwpIHtcbiAgICAgIGVsZW0uc3R5bGUubGVmdCA9IDA7XG4gICAgICBlbGVtLnN0eWxlLnJpZ2h0ID0gMDtcbiAgICB9XG4gICAgaWYgKHZlcnRpY2FsKSB7XG4gICAgICBlbGVtLnN0eWxlLnRvcCA9IDA7XG4gICAgICBlbGVtLnN0eWxlLmJvdHRvbSA9IDA7XG4gICAgfVxuICB9LFxuICBmYWtlRXZlbnQ6IGZ1bmN0aW9uIGZha2VFdmVudChlbGVtLCBldmVudFR5cGUsIHBhcnMsIGF1eCkge1xuICAgIHZhciBwYXJhbXMgPSBwYXJzIHx8IHt9O1xuICAgIHZhciBjbGFzc05hbWUgPSBFVkVOVF9NQVBfSU5WW2V2ZW50VHlwZV07XG4gICAgaWYgKCFjbGFzc05hbWUpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignRXZlbnQgdHlwZSAnICsgZXZlbnRUeXBlICsgJyBub3Qgc3VwcG9ydGVkLicpO1xuICAgIH1cbiAgICB2YXIgZXZ0ID0gZG9jdW1lbnQuY3JlYXRlRXZlbnQoY2xhc3NOYW1lKTtcbiAgICBzd2l0Y2ggKGNsYXNzTmFtZSkge1xuICAgICAgY2FzZSAnTW91c2VFdmVudHMnOlxuICAgICAgICB7XG4gICAgICAgICAgdmFyIGNsaWVudFggPSBwYXJhbXMueCB8fCBwYXJhbXMuY2xpZW50WCB8fCAwO1xuICAgICAgICAgIHZhciBjbGllbnRZID0gcGFyYW1zLnkgfHwgcGFyYW1zLmNsaWVudFkgfHwgMDtcbiAgICAgICAgICBldnQuaW5pdE1vdXNlRXZlbnQoZXZlbnRUeXBlLCBwYXJhbXMuYnViYmxlcyB8fCBmYWxzZSwgcGFyYW1zLmNhbmNlbGFibGUgfHwgdHJ1ZSwgd2luZG93LCBwYXJhbXMuY2xpY2tDb3VudCB8fCAxLCAwLFxuICAgICAgICAgIDAsXG4gICAgICAgICAgY2xpZW50WCxcbiAgICAgICAgICBjbGllbnRZLFxuICAgICAgICAgIGZhbHNlLCBmYWxzZSwgZmFsc2UsIGZhbHNlLCAwLCBudWxsKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgY2FzZSAnS2V5Ym9hcmRFdmVudHMnOlxuICAgICAgICB7XG4gICAgICAgICAgdmFyIGluaXQgPSBldnQuaW5pdEtleWJvYXJkRXZlbnQgfHwgZXZ0LmluaXRLZXlFdmVudDtcbiAgICAgICAgICBDb21tb24uZGVmYXVsdHMocGFyYW1zLCB7XG4gICAgICAgICAgICBjYW5jZWxhYmxlOiB0cnVlLFxuICAgICAgICAgICAgY3RybEtleTogZmFsc2UsXG4gICAgICAgICAgICBhbHRLZXk6IGZhbHNlLFxuICAgICAgICAgICAgc2hpZnRLZXk6IGZhbHNlLFxuICAgICAgICAgICAgbWV0YUtleTogZmFsc2UsXG4gICAgICAgICAgICBrZXlDb2RlOiB1bmRlZmluZWQsXG4gICAgICAgICAgICBjaGFyQ29kZTogdW5kZWZpbmVkXG4gICAgICAgICAgfSk7XG4gICAgICAgICAgaW5pdChldmVudFR5cGUsIHBhcmFtcy5idWJibGVzIHx8IGZhbHNlLCBwYXJhbXMuY2FuY2VsYWJsZSwgd2luZG93LCBwYXJhbXMuY3RybEtleSwgcGFyYW1zLmFsdEtleSwgcGFyYW1zLnNoaWZ0S2V5LCBwYXJhbXMubWV0YUtleSwgcGFyYW1zLmtleUNvZGUsIHBhcmFtcy5jaGFyQ29kZSk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHtcbiAgICAgICAgICBldnQuaW5pdEV2ZW50KGV2ZW50VHlwZSwgcGFyYW1zLmJ1YmJsZXMgfHwgZmFsc2UsIHBhcmFtcy5jYW5jZWxhYmxlIHx8IHRydWUpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgfVxuICAgIENvbW1vbi5kZWZhdWx0cyhldnQsIGF1eCk7XG4gICAgZWxlbS5kaXNwYXRjaEV2ZW50KGV2dCk7XG4gIH0sXG4gIGJpbmQ6IGZ1bmN0aW9uIGJpbmQoZWxlbSwgZXZlbnQsIGZ1bmMsIG5ld0Jvb2wpIHtcbiAgICB2YXIgYm9vbCA9IG5ld0Jvb2wgfHwgZmFsc2U7XG4gICAgaWYgKGVsZW0uYWRkRXZlbnRMaXN0ZW5lcikge1xuICAgICAgZWxlbS5hZGRFdmVudExpc3RlbmVyKGV2ZW50LCBmdW5jLCBib29sKTtcbiAgICB9IGVsc2UgaWYgKGVsZW0uYXR0YWNoRXZlbnQpIHtcbiAgICAgIGVsZW0uYXR0YWNoRXZlbnQoJ29uJyArIGV2ZW50LCBmdW5jKTtcbiAgICB9XG4gICAgcmV0dXJuIGRvbTtcbiAgfSxcbiAgdW5iaW5kOiBmdW5jdGlvbiB1bmJpbmQoZWxlbSwgZXZlbnQsIGZ1bmMsIG5ld0Jvb2wpIHtcbiAgICB2YXIgYm9vbCA9IG5ld0Jvb2wgfHwgZmFsc2U7XG4gICAgaWYgKGVsZW0ucmVtb3ZlRXZlbnRMaXN0ZW5lcikge1xuICAgICAgZWxlbS5yZW1vdmVFdmVudExpc3RlbmVyKGV2ZW50LCBmdW5jLCBib29sKTtcbiAgICB9IGVsc2UgaWYgKGVsZW0uZGV0YWNoRXZlbnQpIHtcbiAgICAgIGVsZW0uZGV0YWNoRXZlbnQoJ29uJyArIGV2ZW50LCBmdW5jKTtcbiAgICB9XG4gICAgcmV0dXJuIGRvbTtcbiAgfSxcbiAgYWRkQ2xhc3M6IGZ1bmN0aW9uIGFkZENsYXNzKGVsZW0sIGNsYXNzTmFtZSkge1xuICAgIGlmIChlbGVtLmNsYXNzTmFtZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICBlbGVtLmNsYXNzTmFtZSA9IGNsYXNzTmFtZTtcbiAgICB9IGVsc2UgaWYgKGVsZW0uY2xhc3NOYW1lICE9PSBjbGFzc05hbWUpIHtcbiAgICAgIHZhciBjbGFzc2VzID0gZWxlbS5jbGFzc05hbWUuc3BsaXQoLyArLyk7XG4gICAgICBpZiAoY2xhc3Nlcy5pbmRleE9mKGNsYXNzTmFtZSkgPT09IC0xKSB7XG4gICAgICAgIGNsYXNzZXMucHVzaChjbGFzc05hbWUpO1xuICAgICAgICBlbGVtLmNsYXNzTmFtZSA9IGNsYXNzZXMuam9pbignICcpLnJlcGxhY2UoL15cXHMrLywgJycpLnJlcGxhY2UoL1xccyskLywgJycpO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gZG9tO1xuICB9LFxuICByZW1vdmVDbGFzczogZnVuY3Rpb24gcmVtb3ZlQ2xhc3MoZWxlbSwgY2xhc3NOYW1lKSB7XG4gICAgaWYgKGNsYXNzTmFtZSkge1xuICAgICAgaWYgKGVsZW0uY2xhc3NOYW1lID09PSBjbGFzc05hbWUpIHtcbiAgICAgICAgZWxlbS5yZW1vdmVBdHRyaWJ1dGUoJ2NsYXNzJyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB2YXIgY2xhc3NlcyA9IGVsZW0uY2xhc3NOYW1lLnNwbGl0KC8gKy8pO1xuICAgICAgICB2YXIgaW5kZXggPSBjbGFzc2VzLmluZGV4T2YoY2xhc3NOYW1lKTtcbiAgICAgICAgaWYgKGluZGV4ICE9PSAtMSkge1xuICAgICAgICAgIGNsYXNzZXMuc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgICAgICBlbGVtLmNsYXNzTmFtZSA9IGNsYXNzZXMuam9pbignICcpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGVsZW0uY2xhc3NOYW1lID0gdW5kZWZpbmVkO1xuICAgIH1cbiAgICByZXR1cm4gZG9tO1xuICB9LFxuICBoYXNDbGFzczogZnVuY3Rpb24gaGFzQ2xhc3MoZWxlbSwgY2xhc3NOYW1lKSB7XG4gICAgcmV0dXJuIG5ldyBSZWdFeHAoJyg/Ol58XFxcXHMrKScgKyBjbGFzc05hbWUgKyAnKD86XFxcXHMrfCQpJykudGVzdChlbGVtLmNsYXNzTmFtZSkgfHwgZmFsc2U7XG4gIH0sXG4gIGdldFdpZHRoOiBmdW5jdGlvbiBnZXRXaWR0aChlbGVtKSB7XG4gICAgdmFyIHN0eWxlID0gZ2V0Q29tcHV0ZWRTdHlsZShlbGVtKTtcbiAgICByZXR1cm4gY3NzVmFsdWVUb1BpeGVscyhzdHlsZVsnYm9yZGVyLWxlZnQtd2lkdGgnXSkgKyBjc3NWYWx1ZVRvUGl4ZWxzKHN0eWxlWydib3JkZXItcmlnaHQtd2lkdGgnXSkgKyBjc3NWYWx1ZVRvUGl4ZWxzKHN0eWxlWydwYWRkaW5nLWxlZnQnXSkgKyBjc3NWYWx1ZVRvUGl4ZWxzKHN0eWxlWydwYWRkaW5nLXJpZ2h0J10pICsgY3NzVmFsdWVUb1BpeGVscyhzdHlsZS53aWR0aCk7XG4gIH0sXG4gIGdldEhlaWdodDogZnVuY3Rpb24gZ2V0SGVpZ2h0KGVsZW0pIHtcbiAgICB2YXIgc3R5bGUgPSBnZXRDb21wdXRlZFN0eWxlKGVsZW0pO1xuICAgIHJldHVybiBjc3NWYWx1ZVRvUGl4ZWxzKHN0eWxlWydib3JkZXItdG9wLXdpZHRoJ10pICsgY3NzVmFsdWVUb1BpeGVscyhzdHlsZVsnYm9yZGVyLWJvdHRvbS13aWR0aCddKSArIGNzc1ZhbHVlVG9QaXhlbHMoc3R5bGVbJ3BhZGRpbmctdG9wJ10pICsgY3NzVmFsdWVUb1BpeGVscyhzdHlsZVsncGFkZGluZy1ib3R0b20nXSkgKyBjc3NWYWx1ZVRvUGl4ZWxzKHN0eWxlLmhlaWdodCk7XG4gIH0sXG4gIGdldE9mZnNldDogZnVuY3Rpb24gZ2V0T2Zmc2V0KGVsKSB7XG4gICAgdmFyIGVsZW0gPSBlbDtcbiAgICB2YXIgb2Zmc2V0ID0geyBsZWZ0OiAwLCB0b3A6IDAgfTtcbiAgICBpZiAoZWxlbS5vZmZzZXRQYXJlbnQpIHtcbiAgICAgIGRvIHtcbiAgICAgICAgb2Zmc2V0LmxlZnQgKz0gZWxlbS5vZmZzZXRMZWZ0O1xuICAgICAgICBvZmZzZXQudG9wICs9IGVsZW0ub2Zmc2V0VG9wO1xuICAgICAgICBlbGVtID0gZWxlbS5vZmZzZXRQYXJlbnQ7XG4gICAgICB9IHdoaWxlIChlbGVtKTtcbiAgICB9XG4gICAgcmV0dXJuIG9mZnNldDtcbiAgfSxcbiAgaXNBY3RpdmU6IGZ1bmN0aW9uIGlzQWN0aXZlKGVsZW0pIHtcbiAgICByZXR1cm4gZWxlbSA9PT0gZG9jdW1lbnQuYWN0aXZlRWxlbWVudCAmJiAoZWxlbS50eXBlIHx8IGVsZW0uaHJlZik7XG4gIH1cbn07XG5cbnZhciBCb29sZWFuQ29udHJvbGxlciA9IGZ1bmN0aW9uIChfQ29udHJvbGxlcikge1xuICBpbmhlcml0cyhCb29sZWFuQ29udHJvbGxlciwgX0NvbnRyb2xsZXIpO1xuICBmdW5jdGlvbiBCb29sZWFuQ29udHJvbGxlcihvYmplY3QsIHByb3BlcnR5KSB7XG4gICAgY2xhc3NDYWxsQ2hlY2sodGhpcywgQm9vbGVhbkNvbnRyb2xsZXIpO1xuICAgIHZhciBfdGhpczIgPSBwb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuKHRoaXMsIChCb29sZWFuQ29udHJvbGxlci5fX3Byb3RvX18gfHwgT2JqZWN0LmdldFByb3RvdHlwZU9mKEJvb2xlYW5Db250cm9sbGVyKSkuY2FsbCh0aGlzLCBvYmplY3QsIHByb3BlcnR5KSk7XG4gICAgdmFyIF90aGlzID0gX3RoaXMyO1xuICAgIF90aGlzMi5fX3ByZXYgPSBfdGhpczIuZ2V0VmFsdWUoKTtcbiAgICBfdGhpczIuX19jaGVja2JveCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0Jyk7XG4gICAgX3RoaXMyLl9fY2hlY2tib3guc2V0QXR0cmlidXRlKCd0eXBlJywgJ2NoZWNrYm94Jyk7XG4gICAgZnVuY3Rpb24gb25DaGFuZ2UoKSB7XG4gICAgICBfdGhpcy5zZXRWYWx1ZSghX3RoaXMuX19wcmV2KTtcbiAgICB9XG4gICAgZG9tLmJpbmQoX3RoaXMyLl9fY2hlY2tib3gsICdjaGFuZ2UnLCBvbkNoYW5nZSwgZmFsc2UpO1xuICAgIF90aGlzMi5kb21FbGVtZW50LmFwcGVuZENoaWxkKF90aGlzMi5fX2NoZWNrYm94KTtcbiAgICBfdGhpczIudXBkYXRlRGlzcGxheSgpO1xuICAgIHJldHVybiBfdGhpczI7XG4gIH1cbiAgY3JlYXRlQ2xhc3MoQm9vbGVhbkNvbnRyb2xsZXIsIFt7XG4gICAga2V5OiAnc2V0VmFsdWUnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBzZXRWYWx1ZSh2KSB7XG4gICAgICB2YXIgdG9SZXR1cm4gPSBnZXQoQm9vbGVhbkNvbnRyb2xsZXIucHJvdG90eXBlLl9fcHJvdG9fXyB8fCBPYmplY3QuZ2V0UHJvdG90eXBlT2YoQm9vbGVhbkNvbnRyb2xsZXIucHJvdG90eXBlKSwgJ3NldFZhbHVlJywgdGhpcykuY2FsbCh0aGlzLCB2KTtcbiAgICAgIGlmICh0aGlzLl9fb25GaW5pc2hDaGFuZ2UpIHtcbiAgICAgICAgdGhpcy5fX29uRmluaXNoQ2hhbmdlLmNhbGwodGhpcywgdGhpcy5nZXRWYWx1ZSgpKTtcbiAgICAgIH1cbiAgICAgIHRoaXMuX19wcmV2ID0gdGhpcy5nZXRWYWx1ZSgpO1xuICAgICAgcmV0dXJuIHRvUmV0dXJuO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ3VwZGF0ZURpc3BsYXknLFxuICAgIHZhbHVlOiBmdW5jdGlvbiB1cGRhdGVEaXNwbGF5KCkge1xuICAgICAgaWYgKHRoaXMuZ2V0VmFsdWUoKSA9PT0gdHJ1ZSkge1xuICAgICAgICB0aGlzLl9fY2hlY2tib3guc2V0QXR0cmlidXRlKCdjaGVja2VkJywgJ2NoZWNrZWQnKTtcbiAgICAgICAgdGhpcy5fX2NoZWNrYm94LmNoZWNrZWQgPSB0cnVlO1xuICAgICAgICB0aGlzLl9fcHJldiA9IHRydWU7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLl9fY2hlY2tib3guY2hlY2tlZCA9IGZhbHNlO1xuICAgICAgICB0aGlzLl9fcHJldiA9IGZhbHNlO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGdldChCb29sZWFuQ29udHJvbGxlci5wcm90b3R5cGUuX19wcm90b19fIHx8IE9iamVjdC5nZXRQcm90b3R5cGVPZihCb29sZWFuQ29udHJvbGxlci5wcm90b3R5cGUpLCAndXBkYXRlRGlzcGxheScsIHRoaXMpLmNhbGwodGhpcyk7XG4gICAgfVxuICB9XSk7XG4gIHJldHVybiBCb29sZWFuQ29udHJvbGxlcjtcbn0oQ29udHJvbGxlcik7XG5cbnZhciBPcHRpb25Db250cm9sbGVyID0gZnVuY3Rpb24gKF9Db250cm9sbGVyKSB7XG4gIGluaGVyaXRzKE9wdGlvbkNvbnRyb2xsZXIsIF9Db250cm9sbGVyKTtcbiAgZnVuY3Rpb24gT3B0aW9uQ29udHJvbGxlcihvYmplY3QsIHByb3BlcnR5LCBvcHRzKSB7XG4gICAgY2xhc3NDYWxsQ2hlY2sodGhpcywgT3B0aW9uQ29udHJvbGxlcik7XG4gICAgdmFyIF90aGlzMiA9IHBvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4odGhpcywgKE9wdGlvbkNvbnRyb2xsZXIuX19wcm90b19fIHx8IE9iamVjdC5nZXRQcm90b3R5cGVPZihPcHRpb25Db250cm9sbGVyKSkuY2FsbCh0aGlzLCBvYmplY3QsIHByb3BlcnR5KSk7XG4gICAgdmFyIG9wdGlvbnMgPSBvcHRzO1xuICAgIHZhciBfdGhpcyA9IF90aGlzMjtcbiAgICBfdGhpczIuX19zZWxlY3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzZWxlY3QnKTtcbiAgICBpZiAoQ29tbW9uLmlzQXJyYXkob3B0aW9ucykpIHtcbiAgICAgIHZhciBtYXAgPSB7fTtcbiAgICAgIENvbW1vbi5lYWNoKG9wdGlvbnMsIGZ1bmN0aW9uIChlbGVtZW50KSB7XG4gICAgICAgIG1hcFtlbGVtZW50XSA9IGVsZW1lbnQ7XG4gICAgICB9KTtcbiAgICAgIG9wdGlvbnMgPSBtYXA7XG4gICAgfVxuICAgIENvbW1vbi5lYWNoKG9wdGlvbnMsIGZ1bmN0aW9uICh2YWx1ZSwga2V5KSB7XG4gICAgICB2YXIgb3B0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnb3B0aW9uJyk7XG4gICAgICBvcHQuaW5uZXJIVE1MID0ga2V5O1xuICAgICAgb3B0LnNldEF0dHJpYnV0ZSgndmFsdWUnLCB2YWx1ZSk7XG4gICAgICBfdGhpcy5fX3NlbGVjdC5hcHBlbmRDaGlsZChvcHQpO1xuICAgIH0pO1xuICAgIF90aGlzMi51cGRhdGVEaXNwbGF5KCk7XG4gICAgZG9tLmJpbmQoX3RoaXMyLl9fc2VsZWN0LCAnY2hhbmdlJywgZnVuY3Rpb24gKCkge1xuICAgICAgdmFyIGRlc2lyZWRWYWx1ZSA9IHRoaXMub3B0aW9uc1t0aGlzLnNlbGVjdGVkSW5kZXhdLnZhbHVlO1xuICAgICAgX3RoaXMuc2V0VmFsdWUoZGVzaXJlZFZhbHVlKTtcbiAgICB9KTtcbiAgICBfdGhpczIuZG9tRWxlbWVudC5hcHBlbmRDaGlsZChfdGhpczIuX19zZWxlY3QpO1xuICAgIHJldHVybiBfdGhpczI7XG4gIH1cbiAgY3JlYXRlQ2xhc3MoT3B0aW9uQ29udHJvbGxlciwgW3tcbiAgICBrZXk6ICdzZXRWYWx1ZScsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHNldFZhbHVlKHYpIHtcbiAgICAgIHZhciB0b1JldHVybiA9IGdldChPcHRpb25Db250cm9sbGVyLnByb3RvdHlwZS5fX3Byb3RvX18gfHwgT2JqZWN0LmdldFByb3RvdHlwZU9mKE9wdGlvbkNvbnRyb2xsZXIucHJvdG90eXBlKSwgJ3NldFZhbHVlJywgdGhpcykuY2FsbCh0aGlzLCB2KTtcbiAgICAgIGlmICh0aGlzLl9fb25GaW5pc2hDaGFuZ2UpIHtcbiAgICAgICAgdGhpcy5fX29uRmluaXNoQ2hhbmdlLmNhbGwodGhpcywgdGhpcy5nZXRWYWx1ZSgpKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB0b1JldHVybjtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICd1cGRhdGVEaXNwbGF5JyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gdXBkYXRlRGlzcGxheSgpIHtcbiAgICAgIGlmIChkb20uaXNBY3RpdmUodGhpcy5fX3NlbGVjdCkpIHJldHVybiB0aGlzO1xuICAgICAgdGhpcy5fX3NlbGVjdC52YWx1ZSA9IHRoaXMuZ2V0VmFsdWUoKTtcbiAgICAgIHJldHVybiBnZXQoT3B0aW9uQ29udHJvbGxlci5wcm90b3R5cGUuX19wcm90b19fIHx8IE9iamVjdC5nZXRQcm90b3R5cGVPZihPcHRpb25Db250cm9sbGVyLnByb3RvdHlwZSksICd1cGRhdGVEaXNwbGF5JywgdGhpcykuY2FsbCh0aGlzKTtcbiAgICB9XG4gIH1dKTtcbiAgcmV0dXJuIE9wdGlvbkNvbnRyb2xsZXI7XG59KENvbnRyb2xsZXIpO1xuXG52YXIgU3RyaW5nQ29udHJvbGxlciA9IGZ1bmN0aW9uIChfQ29udHJvbGxlcikge1xuICBpbmhlcml0cyhTdHJpbmdDb250cm9sbGVyLCBfQ29udHJvbGxlcik7XG4gIGZ1bmN0aW9uIFN0cmluZ0NvbnRyb2xsZXIob2JqZWN0LCBwcm9wZXJ0eSkge1xuICAgIGNsYXNzQ2FsbENoZWNrKHRoaXMsIFN0cmluZ0NvbnRyb2xsZXIpO1xuICAgIHZhciBfdGhpczIgPSBwb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuKHRoaXMsIChTdHJpbmdDb250cm9sbGVyLl9fcHJvdG9fXyB8fCBPYmplY3QuZ2V0UHJvdG90eXBlT2YoU3RyaW5nQ29udHJvbGxlcikpLmNhbGwodGhpcywgb2JqZWN0LCBwcm9wZXJ0eSkpO1xuICAgIHZhciBfdGhpcyA9IF90aGlzMjtcbiAgICBmdW5jdGlvbiBvbkNoYW5nZSgpIHtcbiAgICAgIF90aGlzLnNldFZhbHVlKF90aGlzLl9faW5wdXQudmFsdWUpO1xuICAgIH1cbiAgICBmdW5jdGlvbiBvbkJsdXIoKSB7XG4gICAgICBpZiAoX3RoaXMuX19vbkZpbmlzaENoYW5nZSkge1xuICAgICAgICBfdGhpcy5fX29uRmluaXNoQ2hhbmdlLmNhbGwoX3RoaXMsIF90aGlzLmdldFZhbHVlKCkpO1xuICAgICAgfVxuICAgIH1cbiAgICBfdGhpczIuX19pbnB1dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0Jyk7XG4gICAgX3RoaXMyLl9faW5wdXQuc2V0QXR0cmlidXRlKCd0eXBlJywgJ3RleHQnKTtcbiAgICBkb20uYmluZChfdGhpczIuX19pbnB1dCwgJ2tleXVwJywgb25DaGFuZ2UpO1xuICAgIGRvbS5iaW5kKF90aGlzMi5fX2lucHV0LCAnY2hhbmdlJywgb25DaGFuZ2UpO1xuICAgIGRvbS5iaW5kKF90aGlzMi5fX2lucHV0LCAnYmx1cicsIG9uQmx1cik7XG4gICAgZG9tLmJpbmQoX3RoaXMyLl9faW5wdXQsICdrZXlkb3duJywgZnVuY3Rpb24gKGUpIHtcbiAgICAgIGlmIChlLmtleUNvZGUgPT09IDEzKSB7XG4gICAgICAgIHRoaXMuYmx1cigpO1xuICAgICAgfVxuICAgIH0pO1xuICAgIF90aGlzMi51cGRhdGVEaXNwbGF5KCk7XG4gICAgX3RoaXMyLmRvbUVsZW1lbnQuYXBwZW5kQ2hpbGQoX3RoaXMyLl9faW5wdXQpO1xuICAgIHJldHVybiBfdGhpczI7XG4gIH1cbiAgY3JlYXRlQ2xhc3MoU3RyaW5nQ29udHJvbGxlciwgW3tcbiAgICBrZXk6ICd1cGRhdGVEaXNwbGF5JyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gdXBkYXRlRGlzcGxheSgpIHtcbiAgICAgIGlmICghZG9tLmlzQWN0aXZlKHRoaXMuX19pbnB1dCkpIHtcbiAgICAgICAgdGhpcy5fX2lucHV0LnZhbHVlID0gdGhpcy5nZXRWYWx1ZSgpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGdldChTdHJpbmdDb250cm9sbGVyLnByb3RvdHlwZS5fX3Byb3RvX18gfHwgT2JqZWN0LmdldFByb3RvdHlwZU9mKFN0cmluZ0NvbnRyb2xsZXIucHJvdG90eXBlKSwgJ3VwZGF0ZURpc3BsYXknLCB0aGlzKS5jYWxsKHRoaXMpO1xuICAgIH1cbiAgfV0pO1xuICByZXR1cm4gU3RyaW5nQ29udHJvbGxlcjtcbn0oQ29udHJvbGxlcik7XG5cbmZ1bmN0aW9uIG51bURlY2ltYWxzKHgpIHtcbiAgdmFyIF94ID0geC50b1N0cmluZygpO1xuICBpZiAoX3guaW5kZXhPZignLicpID4gLTEpIHtcbiAgICByZXR1cm4gX3gubGVuZ3RoIC0gX3guaW5kZXhPZignLicpIC0gMTtcbiAgfVxuICByZXR1cm4gMDtcbn1cbnZhciBOdW1iZXJDb250cm9sbGVyID0gZnVuY3Rpb24gKF9Db250cm9sbGVyKSB7XG4gIGluaGVyaXRzKE51bWJlckNvbnRyb2xsZXIsIF9Db250cm9sbGVyKTtcbiAgZnVuY3Rpb24gTnVtYmVyQ29udHJvbGxlcihvYmplY3QsIHByb3BlcnR5LCBwYXJhbXMpIHtcbiAgICBjbGFzc0NhbGxDaGVjayh0aGlzLCBOdW1iZXJDb250cm9sbGVyKTtcbiAgICB2YXIgX3RoaXMgPSBwb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuKHRoaXMsIChOdW1iZXJDb250cm9sbGVyLl9fcHJvdG9fXyB8fCBPYmplY3QuZ2V0UHJvdG90eXBlT2YoTnVtYmVyQ29udHJvbGxlcikpLmNhbGwodGhpcywgb2JqZWN0LCBwcm9wZXJ0eSkpO1xuICAgIHZhciBfcGFyYW1zID0gcGFyYW1zIHx8IHt9O1xuICAgIF90aGlzLl9fbWluID0gX3BhcmFtcy5taW47XG4gICAgX3RoaXMuX19tYXggPSBfcGFyYW1zLm1heDtcbiAgICBfdGhpcy5fX3N0ZXAgPSBfcGFyYW1zLnN0ZXA7XG4gICAgaWYgKENvbW1vbi5pc1VuZGVmaW5lZChfdGhpcy5fX3N0ZXApKSB7XG4gICAgICBpZiAoX3RoaXMuaW5pdGlhbFZhbHVlID09PSAwKSB7XG4gICAgICAgIF90aGlzLl9faW1wbGllZFN0ZXAgPSAxO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgX3RoaXMuX19pbXBsaWVkU3RlcCA9IE1hdGgucG93KDEwLCBNYXRoLmZsb29yKE1hdGgubG9nKE1hdGguYWJzKF90aGlzLmluaXRpYWxWYWx1ZSkpIC8gTWF0aC5MTjEwKSkgLyAxMDtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgX3RoaXMuX19pbXBsaWVkU3RlcCA9IF90aGlzLl9fc3RlcDtcbiAgICB9XG4gICAgX3RoaXMuX19wcmVjaXNpb24gPSBudW1EZWNpbWFscyhfdGhpcy5fX2ltcGxpZWRTdGVwKTtcbiAgICByZXR1cm4gX3RoaXM7XG4gIH1cbiAgY3JlYXRlQ2xhc3MoTnVtYmVyQ29udHJvbGxlciwgW3tcbiAgICBrZXk6ICdzZXRWYWx1ZScsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHNldFZhbHVlKHYpIHtcbiAgICAgIHZhciBfdiA9IHY7XG4gICAgICBpZiAodGhpcy5fX21pbiAhPT0gdW5kZWZpbmVkICYmIF92IDwgdGhpcy5fX21pbikge1xuICAgICAgICBfdiA9IHRoaXMuX19taW47XG4gICAgICB9IGVsc2UgaWYgKHRoaXMuX19tYXggIT09IHVuZGVmaW5lZCAmJiBfdiA+IHRoaXMuX19tYXgpIHtcbiAgICAgICAgX3YgPSB0aGlzLl9fbWF4O1xuICAgICAgfVxuICAgICAgaWYgKHRoaXMuX19zdGVwICE9PSB1bmRlZmluZWQgJiYgX3YgJSB0aGlzLl9fc3RlcCAhPT0gMCkge1xuICAgICAgICBfdiA9IE1hdGgucm91bmQoX3YgLyB0aGlzLl9fc3RlcCkgKiB0aGlzLl9fc3RlcDtcbiAgICAgIH1cbiAgICAgIHJldHVybiBnZXQoTnVtYmVyQ29udHJvbGxlci5wcm90b3R5cGUuX19wcm90b19fIHx8IE9iamVjdC5nZXRQcm90b3R5cGVPZihOdW1iZXJDb250cm9sbGVyLnByb3RvdHlwZSksICdzZXRWYWx1ZScsIHRoaXMpLmNhbGwodGhpcywgX3YpO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ21pbicsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIG1pbihtaW5WYWx1ZSkge1xuICAgICAgdGhpcy5fX21pbiA9IG1pblZhbHVlO1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAnbWF4JyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gbWF4KG1heFZhbHVlKSB7XG4gICAgICB0aGlzLl9fbWF4ID0gbWF4VmFsdWU7XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdzdGVwJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gc3RlcChzdGVwVmFsdWUpIHtcbiAgICAgIHRoaXMuX19zdGVwID0gc3RlcFZhbHVlO1xuICAgICAgdGhpcy5fX2ltcGxpZWRTdGVwID0gc3RlcFZhbHVlO1xuICAgICAgdGhpcy5fX3ByZWNpc2lvbiA9IG51bURlY2ltYWxzKHN0ZXBWYWx1ZSk7XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gIH1dKTtcbiAgcmV0dXJuIE51bWJlckNvbnRyb2xsZXI7XG59KENvbnRyb2xsZXIpO1xuXG5mdW5jdGlvbiByb3VuZFRvRGVjaW1hbCh2YWx1ZSwgZGVjaW1hbHMpIHtcbiAgdmFyIHRlblRvID0gTWF0aC5wb3coMTAsIGRlY2ltYWxzKTtcbiAgcmV0dXJuIE1hdGgucm91bmQodmFsdWUgKiB0ZW5UbykgLyB0ZW5Ubztcbn1cbnZhciBOdW1iZXJDb250cm9sbGVyQm94ID0gZnVuY3Rpb24gKF9OdW1iZXJDb250cm9sbGVyKSB7XG4gIGluaGVyaXRzKE51bWJlckNvbnRyb2xsZXJCb3gsIF9OdW1iZXJDb250cm9sbGVyKTtcbiAgZnVuY3Rpb24gTnVtYmVyQ29udHJvbGxlckJveChvYmplY3QsIHByb3BlcnR5LCBwYXJhbXMpIHtcbiAgICBjbGFzc0NhbGxDaGVjayh0aGlzLCBOdW1iZXJDb250cm9sbGVyQm94KTtcbiAgICB2YXIgX3RoaXMyID0gcG9zc2libGVDb25zdHJ1Y3RvclJldHVybih0aGlzLCAoTnVtYmVyQ29udHJvbGxlckJveC5fX3Byb3RvX18gfHwgT2JqZWN0LmdldFByb3RvdHlwZU9mKE51bWJlckNvbnRyb2xsZXJCb3gpKS5jYWxsKHRoaXMsIG9iamVjdCwgcHJvcGVydHksIHBhcmFtcykpO1xuICAgIF90aGlzMi5fX3RydW5jYXRpb25TdXNwZW5kZWQgPSBmYWxzZTtcbiAgICB2YXIgX3RoaXMgPSBfdGhpczI7XG4gICAgdmFyIHByZXZZID0gdm9pZCAwO1xuICAgIGZ1bmN0aW9uIG9uQ2hhbmdlKCkge1xuICAgICAgdmFyIGF0dGVtcHRlZCA9IHBhcnNlRmxvYXQoX3RoaXMuX19pbnB1dC52YWx1ZSk7XG4gICAgICBpZiAoIUNvbW1vbi5pc05hTihhdHRlbXB0ZWQpKSB7XG4gICAgICAgIF90aGlzLnNldFZhbHVlKGF0dGVtcHRlZCk7XG4gICAgICB9XG4gICAgfVxuICAgIGZ1bmN0aW9uIG9uRmluaXNoKCkge1xuICAgICAgaWYgKF90aGlzLl9fb25GaW5pc2hDaGFuZ2UpIHtcbiAgICAgICAgX3RoaXMuX19vbkZpbmlzaENoYW5nZS5jYWxsKF90aGlzLCBfdGhpcy5nZXRWYWx1ZSgpKTtcbiAgICAgIH1cbiAgICB9XG4gICAgZnVuY3Rpb24gb25CbHVyKCkge1xuICAgICAgb25GaW5pc2goKTtcbiAgICB9XG4gICAgZnVuY3Rpb24gb25Nb3VzZURyYWcoZSkge1xuICAgICAgdmFyIGRpZmYgPSBwcmV2WSAtIGUuY2xpZW50WTtcbiAgICAgIF90aGlzLnNldFZhbHVlKF90aGlzLmdldFZhbHVlKCkgKyBkaWZmICogX3RoaXMuX19pbXBsaWVkU3RlcCk7XG4gICAgICBwcmV2WSA9IGUuY2xpZW50WTtcbiAgICB9XG4gICAgZnVuY3Rpb24gb25Nb3VzZVVwKCkge1xuICAgICAgZG9tLnVuYmluZCh3aW5kb3csICdtb3VzZW1vdmUnLCBvbk1vdXNlRHJhZyk7XG4gICAgICBkb20udW5iaW5kKHdpbmRvdywgJ21vdXNldXAnLCBvbk1vdXNlVXApO1xuICAgICAgb25GaW5pc2goKTtcbiAgICB9XG4gICAgZnVuY3Rpb24gb25Nb3VzZURvd24oZSkge1xuICAgICAgZG9tLmJpbmQod2luZG93LCAnbW91c2Vtb3ZlJywgb25Nb3VzZURyYWcpO1xuICAgICAgZG9tLmJpbmQod2luZG93LCAnbW91c2V1cCcsIG9uTW91c2VVcCk7XG4gICAgICBwcmV2WSA9IGUuY2xpZW50WTtcbiAgICB9XG4gICAgX3RoaXMyLl9faW5wdXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpO1xuICAgIF90aGlzMi5fX2lucHV0LnNldEF0dHJpYnV0ZSgndHlwZScsICd0ZXh0Jyk7XG4gICAgZG9tLmJpbmQoX3RoaXMyLl9faW5wdXQsICdjaGFuZ2UnLCBvbkNoYW5nZSk7XG4gICAgZG9tLmJpbmQoX3RoaXMyLl9faW5wdXQsICdibHVyJywgb25CbHVyKTtcbiAgICBkb20uYmluZChfdGhpczIuX19pbnB1dCwgJ21vdXNlZG93bicsIG9uTW91c2VEb3duKTtcbiAgICBkb20uYmluZChfdGhpczIuX19pbnB1dCwgJ2tleWRvd24nLCBmdW5jdGlvbiAoZSkge1xuICAgICAgaWYgKGUua2V5Q29kZSA9PT0gMTMpIHtcbiAgICAgICAgX3RoaXMuX190cnVuY2F0aW9uU3VzcGVuZGVkID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5ibHVyKCk7XG4gICAgICAgIF90aGlzLl9fdHJ1bmNhdGlvblN1c3BlbmRlZCA9IGZhbHNlO1xuICAgICAgICBvbkZpbmlzaCgpO1xuICAgICAgfVxuICAgIH0pO1xuICAgIF90aGlzMi51cGRhdGVEaXNwbGF5KCk7XG4gICAgX3RoaXMyLmRvbUVsZW1lbnQuYXBwZW5kQ2hpbGQoX3RoaXMyLl9faW5wdXQpO1xuICAgIHJldHVybiBfdGhpczI7XG4gIH1cbiAgY3JlYXRlQ2xhc3MoTnVtYmVyQ29udHJvbGxlckJveCwgW3tcbiAgICBrZXk6ICd1cGRhdGVEaXNwbGF5JyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gdXBkYXRlRGlzcGxheSgpIHtcbiAgICAgIHRoaXMuX19pbnB1dC52YWx1ZSA9IHRoaXMuX190cnVuY2F0aW9uU3VzcGVuZGVkID8gdGhpcy5nZXRWYWx1ZSgpIDogcm91bmRUb0RlY2ltYWwodGhpcy5nZXRWYWx1ZSgpLCB0aGlzLl9fcHJlY2lzaW9uKTtcbiAgICAgIHJldHVybiBnZXQoTnVtYmVyQ29udHJvbGxlckJveC5wcm90b3R5cGUuX19wcm90b19fIHx8IE9iamVjdC5nZXRQcm90b3R5cGVPZihOdW1iZXJDb250cm9sbGVyQm94LnByb3RvdHlwZSksICd1cGRhdGVEaXNwbGF5JywgdGhpcykuY2FsbCh0aGlzKTtcbiAgICB9XG4gIH1dKTtcbiAgcmV0dXJuIE51bWJlckNvbnRyb2xsZXJCb3g7XG59KE51bWJlckNvbnRyb2xsZXIpO1xuXG5mdW5jdGlvbiBtYXAodiwgaTEsIGkyLCBvMSwgbzIpIHtcbiAgcmV0dXJuIG8xICsgKG8yIC0gbzEpICogKCh2IC0gaTEpIC8gKGkyIC0gaTEpKTtcbn1cbnZhciBOdW1iZXJDb250cm9sbGVyU2xpZGVyID0gZnVuY3Rpb24gKF9OdW1iZXJDb250cm9sbGVyKSB7XG4gIGluaGVyaXRzKE51bWJlckNvbnRyb2xsZXJTbGlkZXIsIF9OdW1iZXJDb250cm9sbGVyKTtcbiAgZnVuY3Rpb24gTnVtYmVyQ29udHJvbGxlclNsaWRlcihvYmplY3QsIHByb3BlcnR5LCBtaW4sIG1heCwgc3RlcCkge1xuICAgIGNsYXNzQ2FsbENoZWNrKHRoaXMsIE51bWJlckNvbnRyb2xsZXJTbGlkZXIpO1xuICAgIHZhciBfdGhpczIgPSBwb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuKHRoaXMsIChOdW1iZXJDb250cm9sbGVyU2xpZGVyLl9fcHJvdG9fXyB8fCBPYmplY3QuZ2V0UHJvdG90eXBlT2YoTnVtYmVyQ29udHJvbGxlclNsaWRlcikpLmNhbGwodGhpcywgb2JqZWN0LCBwcm9wZXJ0eSwgeyBtaW46IG1pbiwgbWF4OiBtYXgsIHN0ZXA6IHN0ZXAgfSkpO1xuICAgIHZhciBfdGhpcyA9IF90aGlzMjtcbiAgICBfdGhpczIuX19iYWNrZ3JvdW5kID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgX3RoaXMyLl9fZm9yZWdyb3VuZCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIGRvbS5iaW5kKF90aGlzMi5fX2JhY2tncm91bmQsICdtb3VzZWRvd24nLCBvbk1vdXNlRG93bik7XG4gICAgZG9tLmJpbmQoX3RoaXMyLl9fYmFja2dyb3VuZCwgJ3RvdWNoc3RhcnQnLCBvblRvdWNoU3RhcnQpO1xuICAgIGRvbS5hZGRDbGFzcyhfdGhpczIuX19iYWNrZ3JvdW5kLCAnc2xpZGVyJyk7XG4gICAgZG9tLmFkZENsYXNzKF90aGlzMi5fX2ZvcmVncm91bmQsICdzbGlkZXItZmcnKTtcbiAgICBmdW5jdGlvbiBvbk1vdXNlRG93bihlKSB7XG4gICAgICBkb2N1bWVudC5hY3RpdmVFbGVtZW50LmJsdXIoKTtcbiAgICAgIGRvbS5iaW5kKHdpbmRvdywgJ21vdXNlbW92ZScsIG9uTW91c2VEcmFnKTtcbiAgICAgIGRvbS5iaW5kKHdpbmRvdywgJ21vdXNldXAnLCBvbk1vdXNlVXApO1xuICAgICAgb25Nb3VzZURyYWcoZSk7XG4gICAgfVxuICAgIGZ1bmN0aW9uIG9uTW91c2VEcmFnKGUpIHtcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgIHZhciBiZ1JlY3QgPSBfdGhpcy5fX2JhY2tncm91bmQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgICBfdGhpcy5zZXRWYWx1ZShtYXAoZS5jbGllbnRYLCBiZ1JlY3QubGVmdCwgYmdSZWN0LnJpZ2h0LCBfdGhpcy5fX21pbiwgX3RoaXMuX19tYXgpKTtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgZnVuY3Rpb24gb25Nb3VzZVVwKCkge1xuICAgICAgZG9tLnVuYmluZCh3aW5kb3csICdtb3VzZW1vdmUnLCBvbk1vdXNlRHJhZyk7XG4gICAgICBkb20udW5iaW5kKHdpbmRvdywgJ21vdXNldXAnLCBvbk1vdXNlVXApO1xuICAgICAgaWYgKF90aGlzLl9fb25GaW5pc2hDaGFuZ2UpIHtcbiAgICAgICAgX3RoaXMuX19vbkZpbmlzaENoYW5nZS5jYWxsKF90aGlzLCBfdGhpcy5nZXRWYWx1ZSgpKTtcbiAgICAgIH1cbiAgICB9XG4gICAgZnVuY3Rpb24gb25Ub3VjaFN0YXJ0KGUpIHtcbiAgICAgIGlmIChlLnRvdWNoZXMubGVuZ3RoICE9PSAxKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGRvbS5iaW5kKHdpbmRvdywgJ3RvdWNobW92ZScsIG9uVG91Y2hNb3ZlKTtcbiAgICAgIGRvbS5iaW5kKHdpbmRvdywgJ3RvdWNoZW5kJywgb25Ub3VjaEVuZCk7XG4gICAgICBvblRvdWNoTW92ZShlKTtcbiAgICB9XG4gICAgZnVuY3Rpb24gb25Ub3VjaE1vdmUoZSkge1xuICAgICAgdmFyIGNsaWVudFggPSBlLnRvdWNoZXNbMF0uY2xpZW50WDtcbiAgICAgIHZhciBiZ1JlY3QgPSBfdGhpcy5fX2JhY2tncm91bmQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgICBfdGhpcy5zZXRWYWx1ZShtYXAoY2xpZW50WCwgYmdSZWN0LmxlZnQsIGJnUmVjdC5yaWdodCwgX3RoaXMuX19taW4sIF90aGlzLl9fbWF4KSk7XG4gICAgfVxuICAgIGZ1bmN0aW9uIG9uVG91Y2hFbmQoKSB7XG4gICAgICBkb20udW5iaW5kKHdpbmRvdywgJ3RvdWNobW92ZScsIG9uVG91Y2hNb3ZlKTtcbiAgICAgIGRvbS51bmJpbmQod2luZG93LCAndG91Y2hlbmQnLCBvblRvdWNoRW5kKTtcbiAgICAgIGlmIChfdGhpcy5fX29uRmluaXNoQ2hhbmdlKSB7XG4gICAgICAgIF90aGlzLl9fb25GaW5pc2hDaGFuZ2UuY2FsbChfdGhpcywgX3RoaXMuZ2V0VmFsdWUoKSk7XG4gICAgICB9XG4gICAgfVxuICAgIF90aGlzMi51cGRhdGVEaXNwbGF5KCk7XG4gICAgX3RoaXMyLl9fYmFja2dyb3VuZC5hcHBlbmRDaGlsZChfdGhpczIuX19mb3JlZ3JvdW5kKTtcbiAgICBfdGhpczIuZG9tRWxlbWVudC5hcHBlbmRDaGlsZChfdGhpczIuX19iYWNrZ3JvdW5kKTtcbiAgICByZXR1cm4gX3RoaXMyO1xuICB9XG4gIGNyZWF0ZUNsYXNzKE51bWJlckNvbnRyb2xsZXJTbGlkZXIsIFt7XG4gICAga2V5OiAndXBkYXRlRGlzcGxheScsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHVwZGF0ZURpc3BsYXkoKSB7XG4gICAgICB2YXIgcGN0ID0gKHRoaXMuZ2V0VmFsdWUoKSAtIHRoaXMuX19taW4pIC8gKHRoaXMuX19tYXggLSB0aGlzLl9fbWluKTtcbiAgICAgIHRoaXMuX19mb3JlZ3JvdW5kLnN0eWxlLndpZHRoID0gcGN0ICogMTAwICsgJyUnO1xuICAgICAgcmV0dXJuIGdldChOdW1iZXJDb250cm9sbGVyU2xpZGVyLnByb3RvdHlwZS5fX3Byb3RvX18gfHwgT2JqZWN0LmdldFByb3RvdHlwZU9mKE51bWJlckNvbnRyb2xsZXJTbGlkZXIucHJvdG90eXBlKSwgJ3VwZGF0ZURpc3BsYXknLCB0aGlzKS5jYWxsKHRoaXMpO1xuICAgIH1cbiAgfV0pO1xuICByZXR1cm4gTnVtYmVyQ29udHJvbGxlclNsaWRlcjtcbn0oTnVtYmVyQ29udHJvbGxlcik7XG5cbnZhciBGdW5jdGlvbkNvbnRyb2xsZXIgPSBmdW5jdGlvbiAoX0NvbnRyb2xsZXIpIHtcbiAgaW5oZXJpdHMoRnVuY3Rpb25Db250cm9sbGVyLCBfQ29udHJvbGxlcik7XG4gIGZ1bmN0aW9uIEZ1bmN0aW9uQ29udHJvbGxlcihvYmplY3QsIHByb3BlcnR5LCB0ZXh0KSB7XG4gICAgY2xhc3NDYWxsQ2hlY2sodGhpcywgRnVuY3Rpb25Db250cm9sbGVyKTtcbiAgICB2YXIgX3RoaXMyID0gcG9zc2libGVDb25zdHJ1Y3RvclJldHVybih0aGlzLCAoRnVuY3Rpb25Db250cm9sbGVyLl9fcHJvdG9fXyB8fCBPYmplY3QuZ2V0UHJvdG90eXBlT2YoRnVuY3Rpb25Db250cm9sbGVyKSkuY2FsbCh0aGlzLCBvYmplY3QsIHByb3BlcnR5KSk7XG4gICAgdmFyIF90aGlzID0gX3RoaXMyO1xuICAgIF90aGlzMi5fX2J1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIF90aGlzMi5fX2J1dHRvbi5pbm5lckhUTUwgPSB0ZXh0ID09PSB1bmRlZmluZWQgPyAnRmlyZScgOiB0ZXh0O1xuICAgIGRvbS5iaW5kKF90aGlzMi5fX2J1dHRvbiwgJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHtcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgIF90aGlzLmZpcmUoKTtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9KTtcbiAgICBkb20uYWRkQ2xhc3MoX3RoaXMyLl9fYnV0dG9uLCAnYnV0dG9uJyk7XG4gICAgX3RoaXMyLmRvbUVsZW1lbnQuYXBwZW5kQ2hpbGQoX3RoaXMyLl9fYnV0dG9uKTtcbiAgICByZXR1cm4gX3RoaXMyO1xuICB9XG4gIGNyZWF0ZUNsYXNzKEZ1bmN0aW9uQ29udHJvbGxlciwgW3tcbiAgICBrZXk6ICdmaXJlJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gZmlyZSgpIHtcbiAgICAgIGlmICh0aGlzLl9fb25DaGFuZ2UpIHtcbiAgICAgICAgdGhpcy5fX29uQ2hhbmdlLmNhbGwodGhpcyk7XG4gICAgICB9XG4gICAgICB0aGlzLmdldFZhbHVlKCkuY2FsbCh0aGlzLm9iamVjdCk7XG4gICAgICBpZiAodGhpcy5fX29uRmluaXNoQ2hhbmdlKSB7XG4gICAgICAgIHRoaXMuX19vbkZpbmlzaENoYW5nZS5jYWxsKHRoaXMsIHRoaXMuZ2V0VmFsdWUoKSk7XG4gICAgICB9XG4gICAgfVxuICB9XSk7XG4gIHJldHVybiBGdW5jdGlvbkNvbnRyb2xsZXI7XG59KENvbnRyb2xsZXIpO1xuXG52YXIgQ29sb3JDb250cm9sbGVyID0gZnVuY3Rpb24gKF9Db250cm9sbGVyKSB7XG4gIGluaGVyaXRzKENvbG9yQ29udHJvbGxlciwgX0NvbnRyb2xsZXIpO1xuICBmdW5jdGlvbiBDb2xvckNvbnRyb2xsZXIob2JqZWN0LCBwcm9wZXJ0eSkge1xuICAgIGNsYXNzQ2FsbENoZWNrKHRoaXMsIENvbG9yQ29udHJvbGxlcik7XG4gICAgdmFyIF90aGlzMiA9IHBvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4odGhpcywgKENvbG9yQ29udHJvbGxlci5fX3Byb3RvX18gfHwgT2JqZWN0LmdldFByb3RvdHlwZU9mKENvbG9yQ29udHJvbGxlcikpLmNhbGwodGhpcywgb2JqZWN0LCBwcm9wZXJ0eSkpO1xuICAgIF90aGlzMi5fX2NvbG9yID0gbmV3IENvbG9yKF90aGlzMi5nZXRWYWx1ZSgpKTtcbiAgICBfdGhpczIuX190ZW1wID0gbmV3IENvbG9yKDApO1xuICAgIHZhciBfdGhpcyA9IF90aGlzMjtcbiAgICBfdGhpczIuZG9tRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIGRvbS5tYWtlU2VsZWN0YWJsZShfdGhpczIuZG9tRWxlbWVudCwgZmFsc2UpO1xuICAgIF90aGlzMi5fX3NlbGVjdG9yID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgX3RoaXMyLl9fc2VsZWN0b3IuY2xhc3NOYW1lID0gJ3NlbGVjdG9yJztcbiAgICBfdGhpczIuX19zYXR1cmF0aW9uX2ZpZWxkID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgX3RoaXMyLl9fc2F0dXJhdGlvbl9maWVsZC5jbGFzc05hbWUgPSAnc2F0dXJhdGlvbi1maWVsZCc7XG4gICAgX3RoaXMyLl9fZmllbGRfa25vYiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIF90aGlzMi5fX2ZpZWxkX2tub2IuY2xhc3NOYW1lID0gJ2ZpZWxkLWtub2InO1xuICAgIF90aGlzMi5fX2ZpZWxkX2tub2JfYm9yZGVyID0gJzJweCBzb2xpZCAnO1xuICAgIF90aGlzMi5fX2h1ZV9rbm9iID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgX3RoaXMyLl9faHVlX2tub2IuY2xhc3NOYW1lID0gJ2h1ZS1rbm9iJztcbiAgICBfdGhpczIuX19odWVfZmllbGQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBfdGhpczIuX19odWVfZmllbGQuY2xhc3NOYW1lID0gJ2h1ZS1maWVsZCc7XG4gICAgX3RoaXMyLl9faW5wdXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpO1xuICAgIF90aGlzMi5fX2lucHV0LnR5cGUgPSAndGV4dCc7XG4gICAgX3RoaXMyLl9faW5wdXRfdGV4dFNoYWRvdyA9ICcwIDFweCAxcHggJztcbiAgICBkb20uYmluZChfdGhpczIuX19pbnB1dCwgJ2tleWRvd24nLCBmdW5jdGlvbiAoZSkge1xuICAgICAgaWYgKGUua2V5Q29kZSA9PT0gMTMpIHtcbiAgICAgICAgb25CbHVyLmNhbGwodGhpcyk7XG4gICAgICB9XG4gICAgfSk7XG4gICAgZG9tLmJpbmQoX3RoaXMyLl9faW5wdXQsICdibHVyJywgb25CbHVyKTtcbiAgICBkb20uYmluZChfdGhpczIuX19zZWxlY3RvciwgJ21vdXNlZG93bicsIGZ1bmN0aW9uICgpICAgICAgICB7XG4gICAgICBkb20uYWRkQ2xhc3ModGhpcywgJ2RyYWcnKS5iaW5kKHdpbmRvdywgJ21vdXNldXAnLCBmdW5jdGlvbiAoKSAgICAgICAge1xuICAgICAgICBkb20ucmVtb3ZlQ2xhc3MoX3RoaXMuX19zZWxlY3RvciwgJ2RyYWcnKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICAgIGRvbS5iaW5kKF90aGlzMi5fX3NlbGVjdG9yLCAndG91Y2hzdGFydCcsIGZ1bmN0aW9uICgpICAgICAgICB7XG4gICAgICBkb20uYWRkQ2xhc3ModGhpcywgJ2RyYWcnKS5iaW5kKHdpbmRvdywgJ3RvdWNoZW5kJywgZnVuY3Rpb24gKCkgICAgICAgIHtcbiAgICAgICAgZG9tLnJlbW92ZUNsYXNzKF90aGlzLl9fc2VsZWN0b3IsICdkcmFnJyk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgICB2YXIgdmFsdWVGaWVsZCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIENvbW1vbi5leHRlbmQoX3RoaXMyLl9fc2VsZWN0b3Iuc3R5bGUsIHtcbiAgICAgIHdpZHRoOiAnMTIycHgnLFxuICAgICAgaGVpZ2h0OiAnMTAycHgnLFxuICAgICAgcGFkZGluZzogJzNweCcsXG4gICAgICBiYWNrZ3JvdW5kQ29sb3I6ICcjMjIyJyxcbiAgICAgIGJveFNoYWRvdzogJzBweCAxcHggM3B4IHJnYmEoMCwwLDAsMC4zKSdcbiAgICB9KTtcbiAgICBDb21tb24uZXh0ZW5kKF90aGlzMi5fX2ZpZWxkX2tub2Iuc3R5bGUsIHtcbiAgICAgIHBvc2l0aW9uOiAnYWJzb2x1dGUnLFxuICAgICAgd2lkdGg6ICcxMnB4JyxcbiAgICAgIGhlaWdodDogJzEycHgnLFxuICAgICAgYm9yZGVyOiBfdGhpczIuX19maWVsZF9rbm9iX2JvcmRlciArIChfdGhpczIuX19jb2xvci52IDwgMC41ID8gJyNmZmYnIDogJyMwMDAnKSxcbiAgICAgIGJveFNoYWRvdzogJzBweCAxcHggM3B4IHJnYmEoMCwwLDAsMC41KScsXG4gICAgICBib3JkZXJSYWRpdXM6ICcxMnB4JyxcbiAgICAgIHpJbmRleDogMVxuICAgIH0pO1xuICAgIENvbW1vbi5leHRlbmQoX3RoaXMyLl9faHVlX2tub2Iuc3R5bGUsIHtcbiAgICAgIHBvc2l0aW9uOiAnYWJzb2x1dGUnLFxuICAgICAgd2lkdGg6ICcxNXB4JyxcbiAgICAgIGhlaWdodDogJzJweCcsXG4gICAgICBib3JkZXJSaWdodDogJzRweCBzb2xpZCAjZmZmJyxcbiAgICAgIHpJbmRleDogMVxuICAgIH0pO1xuICAgIENvbW1vbi5leHRlbmQoX3RoaXMyLl9fc2F0dXJhdGlvbl9maWVsZC5zdHlsZSwge1xuICAgICAgd2lkdGg6ICcxMDBweCcsXG4gICAgICBoZWlnaHQ6ICcxMDBweCcsXG4gICAgICBib3JkZXI6ICcxcHggc29saWQgIzU1NScsXG4gICAgICBtYXJnaW5SaWdodDogJzNweCcsXG4gICAgICBkaXNwbGF5OiAnaW5saW5lLWJsb2NrJyxcbiAgICAgIGN1cnNvcjogJ3BvaW50ZXInXG4gICAgfSk7XG4gICAgQ29tbW9uLmV4dGVuZCh2YWx1ZUZpZWxkLnN0eWxlLCB7XG4gICAgICB3aWR0aDogJzEwMCUnLFxuICAgICAgaGVpZ2h0OiAnMTAwJScsXG4gICAgICBiYWNrZ3JvdW5kOiAnbm9uZSdcbiAgICB9KTtcbiAgICBsaW5lYXJHcmFkaWVudCh2YWx1ZUZpZWxkLCAndG9wJywgJ3JnYmEoMCwwLDAsMCknLCAnIzAwMCcpO1xuICAgIENvbW1vbi5leHRlbmQoX3RoaXMyLl9faHVlX2ZpZWxkLnN0eWxlLCB7XG4gICAgICB3aWR0aDogJzE1cHgnLFxuICAgICAgaGVpZ2h0OiAnMTAwcHgnLFxuICAgICAgYm9yZGVyOiAnMXB4IHNvbGlkICM1NTUnLFxuICAgICAgY3Vyc29yOiAnbnMtcmVzaXplJyxcbiAgICAgIHBvc2l0aW9uOiAnYWJzb2x1dGUnLFxuICAgICAgdG9wOiAnM3B4JyxcbiAgICAgIHJpZ2h0OiAnM3B4J1xuICAgIH0pO1xuICAgIGh1ZUdyYWRpZW50KF90aGlzMi5fX2h1ZV9maWVsZCk7XG4gICAgQ29tbW9uLmV4dGVuZChfdGhpczIuX19pbnB1dC5zdHlsZSwge1xuICAgICAgb3V0bGluZTogJ25vbmUnLFxuICAgICAgdGV4dEFsaWduOiAnY2VudGVyJyxcbiAgICAgIGNvbG9yOiAnI2ZmZicsXG4gICAgICBib3JkZXI6IDAsXG4gICAgICBmb250V2VpZ2h0OiAnYm9sZCcsXG4gICAgICB0ZXh0U2hhZG93OiBfdGhpczIuX19pbnB1dF90ZXh0U2hhZG93ICsgJ3JnYmEoMCwwLDAsMC43KSdcbiAgICB9KTtcbiAgICBkb20uYmluZChfdGhpczIuX19zYXR1cmF0aW9uX2ZpZWxkLCAnbW91c2Vkb3duJywgZmllbGREb3duKTtcbiAgICBkb20uYmluZChfdGhpczIuX19zYXR1cmF0aW9uX2ZpZWxkLCAndG91Y2hzdGFydCcsIGZpZWxkRG93bik7XG4gICAgZG9tLmJpbmQoX3RoaXMyLl9fZmllbGRfa25vYiwgJ21vdXNlZG93bicsIGZpZWxkRG93bik7XG4gICAgZG9tLmJpbmQoX3RoaXMyLl9fZmllbGRfa25vYiwgJ3RvdWNoc3RhcnQnLCBmaWVsZERvd24pO1xuICAgIGRvbS5iaW5kKF90aGlzMi5fX2h1ZV9maWVsZCwgJ21vdXNlZG93bicsIGZpZWxkRG93bkgpO1xuICAgIGRvbS5iaW5kKF90aGlzMi5fX2h1ZV9maWVsZCwgJ3RvdWNoc3RhcnQnLCBmaWVsZERvd25IKTtcbiAgICBmdW5jdGlvbiBmaWVsZERvd24oZSkge1xuICAgICAgc2V0U1YoZSk7XG4gICAgICBkb20uYmluZCh3aW5kb3csICdtb3VzZW1vdmUnLCBzZXRTVik7XG4gICAgICBkb20uYmluZCh3aW5kb3csICd0b3VjaG1vdmUnLCBzZXRTVik7XG4gICAgICBkb20uYmluZCh3aW5kb3csICdtb3VzZXVwJywgZmllbGRVcFNWKTtcbiAgICAgIGRvbS5iaW5kKHdpbmRvdywgJ3RvdWNoZW5kJywgZmllbGRVcFNWKTtcbiAgICB9XG4gICAgZnVuY3Rpb24gZmllbGREb3duSChlKSB7XG4gICAgICBzZXRIKGUpO1xuICAgICAgZG9tLmJpbmQod2luZG93LCAnbW91c2Vtb3ZlJywgc2V0SCk7XG4gICAgICBkb20uYmluZCh3aW5kb3csICd0b3VjaG1vdmUnLCBzZXRIKTtcbiAgICAgIGRvbS5iaW5kKHdpbmRvdywgJ21vdXNldXAnLCBmaWVsZFVwSCk7XG4gICAgICBkb20uYmluZCh3aW5kb3csICd0b3VjaGVuZCcsIGZpZWxkVXBIKTtcbiAgICB9XG4gICAgZnVuY3Rpb24gZmllbGRVcFNWKCkge1xuICAgICAgZG9tLnVuYmluZCh3aW5kb3csICdtb3VzZW1vdmUnLCBzZXRTVik7XG4gICAgICBkb20udW5iaW5kKHdpbmRvdywgJ3RvdWNobW92ZScsIHNldFNWKTtcbiAgICAgIGRvbS51bmJpbmQod2luZG93LCAnbW91c2V1cCcsIGZpZWxkVXBTVik7XG4gICAgICBkb20udW5iaW5kKHdpbmRvdywgJ3RvdWNoZW5kJywgZmllbGRVcFNWKTtcbiAgICAgIG9uRmluaXNoKCk7XG4gICAgfVxuICAgIGZ1bmN0aW9uIGZpZWxkVXBIKCkge1xuICAgICAgZG9tLnVuYmluZCh3aW5kb3csICdtb3VzZW1vdmUnLCBzZXRIKTtcbiAgICAgIGRvbS51bmJpbmQod2luZG93LCAndG91Y2htb3ZlJywgc2V0SCk7XG4gICAgICBkb20udW5iaW5kKHdpbmRvdywgJ21vdXNldXAnLCBmaWVsZFVwSCk7XG4gICAgICBkb20udW5iaW5kKHdpbmRvdywgJ3RvdWNoZW5kJywgZmllbGRVcEgpO1xuICAgICAgb25GaW5pc2goKTtcbiAgICB9XG4gICAgZnVuY3Rpb24gb25CbHVyKCkge1xuICAgICAgdmFyIGkgPSBpbnRlcnByZXQodGhpcy52YWx1ZSk7XG4gICAgICBpZiAoaSAhPT0gZmFsc2UpIHtcbiAgICAgICAgX3RoaXMuX19jb2xvci5fX3N0YXRlID0gaTtcbiAgICAgICAgX3RoaXMuc2V0VmFsdWUoX3RoaXMuX19jb2xvci50b09yaWdpbmFsKCkpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy52YWx1ZSA9IF90aGlzLl9fY29sb3IudG9TdHJpbmcoKTtcbiAgICAgIH1cbiAgICB9XG4gICAgZnVuY3Rpb24gb25GaW5pc2goKSB7XG4gICAgICBpZiAoX3RoaXMuX19vbkZpbmlzaENoYW5nZSkge1xuICAgICAgICBfdGhpcy5fX29uRmluaXNoQ2hhbmdlLmNhbGwoX3RoaXMsIF90aGlzLl9fY29sb3IudG9PcmlnaW5hbCgpKTtcbiAgICAgIH1cbiAgICB9XG4gICAgX3RoaXMyLl9fc2F0dXJhdGlvbl9maWVsZC5hcHBlbmRDaGlsZCh2YWx1ZUZpZWxkKTtcbiAgICBfdGhpczIuX19zZWxlY3Rvci5hcHBlbmRDaGlsZChfdGhpczIuX19maWVsZF9rbm9iKTtcbiAgICBfdGhpczIuX19zZWxlY3Rvci5hcHBlbmRDaGlsZChfdGhpczIuX19zYXR1cmF0aW9uX2ZpZWxkKTtcbiAgICBfdGhpczIuX19zZWxlY3Rvci5hcHBlbmRDaGlsZChfdGhpczIuX19odWVfZmllbGQpO1xuICAgIF90aGlzMi5fX2h1ZV9maWVsZC5hcHBlbmRDaGlsZChfdGhpczIuX19odWVfa25vYik7XG4gICAgX3RoaXMyLmRvbUVsZW1lbnQuYXBwZW5kQ2hpbGQoX3RoaXMyLl9faW5wdXQpO1xuICAgIF90aGlzMi5kb21FbGVtZW50LmFwcGVuZENoaWxkKF90aGlzMi5fX3NlbGVjdG9yKTtcbiAgICBfdGhpczIudXBkYXRlRGlzcGxheSgpO1xuICAgIGZ1bmN0aW9uIHNldFNWKGUpIHtcbiAgICAgIGlmIChlLnR5cGUuaW5kZXhPZigndG91Y2gnKSA9PT0gLTEpIHtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgfVxuICAgICAgdmFyIGZpZWxkUmVjdCA9IF90aGlzLl9fc2F0dXJhdGlvbl9maWVsZC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICAgIHZhciBfcmVmID0gZS50b3VjaGVzICYmIGUudG91Y2hlc1swXSB8fCBlLFxuICAgICAgICAgIGNsaWVudFggPSBfcmVmLmNsaWVudFgsXG4gICAgICAgICAgY2xpZW50WSA9IF9yZWYuY2xpZW50WTtcbiAgICAgIHZhciBzID0gKGNsaWVudFggLSBmaWVsZFJlY3QubGVmdCkgLyAoZmllbGRSZWN0LnJpZ2h0IC0gZmllbGRSZWN0LmxlZnQpO1xuICAgICAgdmFyIHYgPSAxIC0gKGNsaWVudFkgLSBmaWVsZFJlY3QudG9wKSAvIChmaWVsZFJlY3QuYm90dG9tIC0gZmllbGRSZWN0LnRvcCk7XG4gICAgICBpZiAodiA+IDEpIHtcbiAgICAgICAgdiA9IDE7XG4gICAgICB9IGVsc2UgaWYgKHYgPCAwKSB7XG4gICAgICAgIHYgPSAwO1xuICAgICAgfVxuICAgICAgaWYgKHMgPiAxKSB7XG4gICAgICAgIHMgPSAxO1xuICAgICAgfSBlbHNlIGlmIChzIDwgMCkge1xuICAgICAgICBzID0gMDtcbiAgICAgIH1cbiAgICAgIF90aGlzLl9fY29sb3IudiA9IHY7XG4gICAgICBfdGhpcy5fX2NvbG9yLnMgPSBzO1xuICAgICAgX3RoaXMuc2V0VmFsdWUoX3RoaXMuX19jb2xvci50b09yaWdpbmFsKCkpO1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBmdW5jdGlvbiBzZXRIKGUpIHtcbiAgICAgIGlmIChlLnR5cGUuaW5kZXhPZigndG91Y2gnKSA9PT0gLTEpIHtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgfVxuICAgICAgdmFyIGZpZWxkUmVjdCA9IF90aGlzLl9faHVlX2ZpZWxkLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgICAgdmFyIF9yZWYyID0gZS50b3VjaGVzICYmIGUudG91Y2hlc1swXSB8fCBlLFxuICAgICAgICAgIGNsaWVudFkgPSBfcmVmMi5jbGllbnRZO1xuICAgICAgdmFyIGggPSAxIC0gKGNsaWVudFkgLSBmaWVsZFJlY3QudG9wKSAvIChmaWVsZFJlY3QuYm90dG9tIC0gZmllbGRSZWN0LnRvcCk7XG4gICAgICBpZiAoaCA+IDEpIHtcbiAgICAgICAgaCA9IDE7XG4gICAgICB9IGVsc2UgaWYgKGggPCAwKSB7XG4gICAgICAgIGggPSAwO1xuICAgICAgfVxuICAgICAgX3RoaXMuX19jb2xvci5oID0gaCAqIDM2MDtcbiAgICAgIF90aGlzLnNldFZhbHVlKF90aGlzLl9fY29sb3IudG9PcmlnaW5hbCgpKTtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgcmV0dXJuIF90aGlzMjtcbiAgfVxuICBjcmVhdGVDbGFzcyhDb2xvckNvbnRyb2xsZXIsIFt7XG4gICAga2V5OiAndXBkYXRlRGlzcGxheScsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHVwZGF0ZURpc3BsYXkoKSB7XG4gICAgICB2YXIgaSA9IGludGVycHJldCh0aGlzLmdldFZhbHVlKCkpO1xuICAgICAgaWYgKGkgIT09IGZhbHNlKSB7XG4gICAgICAgIHZhciBtaXNtYXRjaCA9IGZhbHNlO1xuICAgICAgICBDb21tb24uZWFjaChDb2xvci5DT01QT05FTlRTLCBmdW5jdGlvbiAoY29tcG9uZW50KSB7XG4gICAgICAgICAgaWYgKCFDb21tb24uaXNVbmRlZmluZWQoaVtjb21wb25lbnRdKSAmJiAhQ29tbW9uLmlzVW5kZWZpbmVkKHRoaXMuX19jb2xvci5fX3N0YXRlW2NvbXBvbmVudF0pICYmIGlbY29tcG9uZW50XSAhPT0gdGhpcy5fX2NvbG9yLl9fc3RhdGVbY29tcG9uZW50XSkge1xuICAgICAgICAgICAgbWlzbWF0Y2ggPSB0cnVlO1xuICAgICAgICAgICAgcmV0dXJuIHt9O1xuICAgICAgICAgIH1cbiAgICAgICAgfSwgdGhpcyk7XG4gICAgICAgIGlmIChtaXNtYXRjaCkge1xuICAgICAgICAgIENvbW1vbi5leHRlbmQodGhpcy5fX2NvbG9yLl9fc3RhdGUsIGkpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBDb21tb24uZXh0ZW5kKHRoaXMuX190ZW1wLl9fc3RhdGUsIHRoaXMuX19jb2xvci5fX3N0YXRlKTtcbiAgICAgIHRoaXMuX190ZW1wLmEgPSAxO1xuICAgICAgdmFyIGZsaXAgPSB0aGlzLl9fY29sb3IudiA8IDAuNSB8fCB0aGlzLl9fY29sb3IucyA+IDAuNSA/IDI1NSA6IDA7XG4gICAgICB2YXIgX2ZsaXAgPSAyNTUgLSBmbGlwO1xuICAgICAgQ29tbW9uLmV4dGVuZCh0aGlzLl9fZmllbGRfa25vYi5zdHlsZSwge1xuICAgICAgICBtYXJnaW5MZWZ0OiAxMDAgKiB0aGlzLl9fY29sb3IucyAtIDcgKyAncHgnLFxuICAgICAgICBtYXJnaW5Ub3A6IDEwMCAqICgxIC0gdGhpcy5fX2NvbG9yLnYpIC0gNyArICdweCcsXG4gICAgICAgIGJhY2tncm91bmRDb2xvcjogdGhpcy5fX3RlbXAudG9IZXhTdHJpbmcoKSxcbiAgICAgICAgYm9yZGVyOiB0aGlzLl9fZmllbGRfa25vYl9ib3JkZXIgKyAncmdiKCcgKyBmbGlwICsgJywnICsgZmxpcCArICcsJyArIGZsaXAgKyAnKSdcbiAgICAgIH0pO1xuICAgICAgdGhpcy5fX2h1ZV9rbm9iLnN0eWxlLm1hcmdpblRvcCA9ICgxIC0gdGhpcy5fX2NvbG9yLmggLyAzNjApICogMTAwICsgJ3B4JztcbiAgICAgIHRoaXMuX190ZW1wLnMgPSAxO1xuICAgICAgdGhpcy5fX3RlbXAudiA9IDE7XG4gICAgICBsaW5lYXJHcmFkaWVudCh0aGlzLl9fc2F0dXJhdGlvbl9maWVsZCwgJ2xlZnQnLCAnI2ZmZicsIHRoaXMuX190ZW1wLnRvSGV4U3RyaW5nKCkpO1xuICAgICAgdGhpcy5fX2lucHV0LnZhbHVlID0gdGhpcy5fX2NvbG9yLnRvU3RyaW5nKCk7XG4gICAgICBDb21tb24uZXh0ZW5kKHRoaXMuX19pbnB1dC5zdHlsZSwge1xuICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6IHRoaXMuX19jb2xvci50b0hleFN0cmluZygpLFxuICAgICAgICBjb2xvcjogJ3JnYignICsgZmxpcCArICcsJyArIGZsaXAgKyAnLCcgKyBmbGlwICsgJyknLFxuICAgICAgICB0ZXh0U2hhZG93OiB0aGlzLl9faW5wdXRfdGV4dFNoYWRvdyArICdyZ2JhKCcgKyBfZmxpcCArICcsJyArIF9mbGlwICsgJywnICsgX2ZsaXAgKyAnLC43KSdcbiAgICAgIH0pO1xuICAgIH1cbiAgfV0pO1xuICByZXR1cm4gQ29sb3JDb250cm9sbGVyO1xufShDb250cm9sbGVyKTtcbnZhciB2ZW5kb3JzID0gWyctbW96LScsICctby0nLCAnLXdlYmtpdC0nLCAnLW1zLScsICcnXTtcbmZ1bmN0aW9uIGxpbmVhckdyYWRpZW50KGVsZW0sIHgsIGEsIGIpIHtcbiAgZWxlbS5zdHlsZS5iYWNrZ3JvdW5kID0gJyc7XG4gIENvbW1vbi5lYWNoKHZlbmRvcnMsIGZ1bmN0aW9uICh2ZW5kb3IpIHtcbiAgICBlbGVtLnN0eWxlLmNzc1RleHQgKz0gJ2JhY2tncm91bmQ6ICcgKyB2ZW5kb3IgKyAnbGluZWFyLWdyYWRpZW50KCcgKyB4ICsgJywgJyArIGEgKyAnIDAlLCAnICsgYiArICcgMTAwJSk7ICc7XG4gIH0pO1xufVxuZnVuY3Rpb24gaHVlR3JhZGllbnQoZWxlbSkge1xuICBlbGVtLnN0eWxlLmJhY2tncm91bmQgPSAnJztcbiAgZWxlbS5zdHlsZS5jc3NUZXh0ICs9ICdiYWNrZ3JvdW5kOiAtbW96LWxpbmVhci1ncmFkaWVudCh0b3AsICAjZmYwMDAwIDAlLCAjZmYwMGZmIDE3JSwgIzAwMDBmZiAzNCUsICMwMGZmZmYgNTAlLCAjMDBmZjAwIDY3JSwgI2ZmZmYwMCA4NCUsICNmZjAwMDAgMTAwJSk7JztcbiAgZWxlbS5zdHlsZS5jc3NUZXh0ICs9ICdiYWNrZ3JvdW5kOiAtd2Via2l0LWxpbmVhci1ncmFkaWVudCh0b3AsICAjZmYwMDAwIDAlLCNmZjAwZmYgMTclLCMwMDAwZmYgMzQlLCMwMGZmZmYgNTAlLCMwMGZmMDAgNjclLCNmZmZmMDAgODQlLCNmZjAwMDAgMTAwJSk7JztcbiAgZWxlbS5zdHlsZS5jc3NUZXh0ICs9ICdiYWNrZ3JvdW5kOiAtby1saW5lYXItZ3JhZGllbnQodG9wLCAgI2ZmMDAwMCAwJSwjZmYwMGZmIDE3JSwjMDAwMGZmIDM0JSwjMDBmZmZmIDUwJSwjMDBmZjAwIDY3JSwjZmZmZjAwIDg0JSwjZmYwMDAwIDEwMCUpOyc7XG4gIGVsZW0uc3R5bGUuY3NzVGV4dCArPSAnYmFja2dyb3VuZDogLW1zLWxpbmVhci1ncmFkaWVudCh0b3AsICAjZmYwMDAwIDAlLCNmZjAwZmYgMTclLCMwMDAwZmYgMzQlLCMwMGZmZmYgNTAlLCMwMGZmMDAgNjclLCNmZmZmMDAgODQlLCNmZjAwMDAgMTAwJSk7JztcbiAgZWxlbS5zdHlsZS5jc3NUZXh0ICs9ICdiYWNrZ3JvdW5kOiBsaW5lYXItZ3JhZGllbnQodG9wLCAgI2ZmMDAwMCAwJSwjZmYwMGZmIDE3JSwjMDAwMGZmIDM0JSwjMDBmZmZmIDUwJSwjMDBmZjAwIDY3JSwjZmZmZjAwIDg0JSwjZmYwMDAwIDEwMCUpOyc7XG59XG5cbnZhciBjc3MgPSB7XG4gIGxvYWQ6IGZ1bmN0aW9uIGxvYWQodXJsLCBpbmRvYykge1xuICAgIHZhciBkb2MgPSBpbmRvYyB8fCBkb2N1bWVudDtcbiAgICB2YXIgbGluayA9IGRvYy5jcmVhdGVFbGVtZW50KCdsaW5rJyk7XG4gICAgbGluay50eXBlID0gJ3RleHQvY3NzJztcbiAgICBsaW5rLnJlbCA9ICdzdHlsZXNoZWV0JztcbiAgICBsaW5rLmhyZWYgPSB1cmw7XG4gICAgZG9jLmdldEVsZW1lbnRzQnlUYWdOYW1lKCdoZWFkJylbMF0uYXBwZW5kQ2hpbGQobGluayk7XG4gIH0sXG4gIGluamVjdDogZnVuY3Rpb24gaW5qZWN0KGNzc0NvbnRlbnQsIGluZG9jKSB7XG4gICAgdmFyIGRvYyA9IGluZG9jIHx8IGRvY3VtZW50O1xuICAgIHZhciBpbmplY3RlZCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3N0eWxlJyk7XG4gICAgaW5qZWN0ZWQudHlwZSA9ICd0ZXh0L2Nzcyc7XG4gICAgaW5qZWN0ZWQuaW5uZXJIVE1MID0gY3NzQ29udGVudDtcbiAgICB2YXIgaGVhZCA9IGRvYy5nZXRFbGVtZW50c0J5VGFnTmFtZSgnaGVhZCcpWzBdO1xuICAgIHRyeSB7XG4gICAgICBoZWFkLmFwcGVuZENoaWxkKGluamVjdGVkKTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgfVxuICB9XG59O1xuXG52YXIgc2F2ZURpYWxvZ0NvbnRlbnRzID0gXCI8ZGl2IGlkPVxcXCJkZy1zYXZlXFxcIiBjbGFzcz1cXFwiZGcgZGlhbG9ndWVcXFwiPlxcblxcbiAgSGVyZSdzIHRoZSBuZXcgbG9hZCBwYXJhbWV0ZXIgZm9yIHlvdXIgPGNvZGU+R1VJPC9jb2RlPidzIGNvbnN0cnVjdG9yOlxcblxcbiAgPHRleHRhcmVhIGlkPVxcXCJkZy1uZXctY29uc3RydWN0b3JcXFwiPjwvdGV4dGFyZWE+XFxuXFxuICA8ZGl2IGlkPVxcXCJkZy1zYXZlLWxvY2FsbHlcXFwiPlxcblxcbiAgICA8aW5wdXQgaWQ9XFxcImRnLWxvY2FsLXN0b3JhZ2VcXFwiIHR5cGU9XFxcImNoZWNrYm94XFxcIi8+IEF1dG9tYXRpY2FsbHkgc2F2ZVxcbiAgICB2YWx1ZXMgdG8gPGNvZGU+bG9jYWxTdG9yYWdlPC9jb2RlPiBvbiBleGl0LlxcblxcbiAgICA8ZGl2IGlkPVxcXCJkZy1sb2NhbC1leHBsYWluXFxcIj5UaGUgdmFsdWVzIHNhdmVkIHRvIDxjb2RlPmxvY2FsU3RvcmFnZTwvY29kZT4gd2lsbFxcbiAgICAgIG92ZXJyaWRlIHRob3NlIHBhc3NlZCB0byA8Y29kZT5kYXQuR1VJPC9jb2RlPidzIGNvbnN0cnVjdG9yLiBUaGlzIG1ha2VzIGl0XFxuICAgICAgZWFzaWVyIHRvIHdvcmsgaW5jcmVtZW50YWxseSwgYnV0IDxjb2RlPmxvY2FsU3RvcmFnZTwvY29kZT4gaXMgZnJhZ2lsZSxcXG4gICAgICBhbmQgeW91ciBmcmllbmRzIG1heSBub3Qgc2VlIHRoZSBzYW1lIHZhbHVlcyB5b3UgZG8uXFxuXFxuICAgIDwvZGl2PlxcblxcbiAgPC9kaXY+XFxuXFxuPC9kaXY+XCI7XG5cbnZhciBDb250cm9sbGVyRmFjdG9yeSA9IGZ1bmN0aW9uIENvbnRyb2xsZXJGYWN0b3J5KG9iamVjdCwgcHJvcGVydHkpIHtcbiAgdmFyIGluaXRpYWxWYWx1ZSA9IG9iamVjdFtwcm9wZXJ0eV07XG4gIGlmIChDb21tb24uaXNBcnJheShhcmd1bWVudHNbMl0pIHx8IENvbW1vbi5pc09iamVjdChhcmd1bWVudHNbMl0pKSB7XG4gICAgcmV0dXJuIG5ldyBPcHRpb25Db250cm9sbGVyKG9iamVjdCwgcHJvcGVydHksIGFyZ3VtZW50c1syXSk7XG4gIH1cbiAgaWYgKENvbW1vbi5pc051bWJlcihpbml0aWFsVmFsdWUpKSB7XG4gICAgaWYgKENvbW1vbi5pc051bWJlcihhcmd1bWVudHNbMl0pICYmIENvbW1vbi5pc051bWJlcihhcmd1bWVudHNbM10pKSB7XG4gICAgICBpZiAoQ29tbW9uLmlzTnVtYmVyKGFyZ3VtZW50c1s0XSkpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBOdW1iZXJDb250cm9sbGVyU2xpZGVyKG9iamVjdCwgcHJvcGVydHksIGFyZ3VtZW50c1syXSwgYXJndW1lbnRzWzNdLCBhcmd1bWVudHNbNF0pO1xuICAgICAgfVxuICAgICAgcmV0dXJuIG5ldyBOdW1iZXJDb250cm9sbGVyU2xpZGVyKG9iamVjdCwgcHJvcGVydHksIGFyZ3VtZW50c1syXSwgYXJndW1lbnRzWzNdKTtcbiAgICB9XG4gICAgaWYgKENvbW1vbi5pc051bWJlcihhcmd1bWVudHNbNF0pKSB7XG4gICAgICByZXR1cm4gbmV3IE51bWJlckNvbnRyb2xsZXJCb3gob2JqZWN0LCBwcm9wZXJ0eSwgeyBtaW46IGFyZ3VtZW50c1syXSwgbWF4OiBhcmd1bWVudHNbM10sIHN0ZXA6IGFyZ3VtZW50c1s0XSB9KTtcbiAgICB9XG4gICAgcmV0dXJuIG5ldyBOdW1iZXJDb250cm9sbGVyQm94KG9iamVjdCwgcHJvcGVydHksIHsgbWluOiBhcmd1bWVudHNbMl0sIG1heDogYXJndW1lbnRzWzNdIH0pO1xuICB9XG4gIGlmIChDb21tb24uaXNTdHJpbmcoaW5pdGlhbFZhbHVlKSkge1xuICAgIHJldHVybiBuZXcgU3RyaW5nQ29udHJvbGxlcihvYmplY3QsIHByb3BlcnR5KTtcbiAgfVxuICBpZiAoQ29tbW9uLmlzRnVuY3Rpb24oaW5pdGlhbFZhbHVlKSkge1xuICAgIHJldHVybiBuZXcgRnVuY3Rpb25Db250cm9sbGVyKG9iamVjdCwgcHJvcGVydHksICcnKTtcbiAgfVxuICBpZiAoQ29tbW9uLmlzQm9vbGVhbihpbml0aWFsVmFsdWUpKSB7XG4gICAgcmV0dXJuIG5ldyBCb29sZWFuQ29udHJvbGxlcihvYmplY3QsIHByb3BlcnR5KTtcbiAgfVxuICByZXR1cm4gbnVsbDtcbn07XG5cbmZ1bmN0aW9uIHJlcXVlc3RBbmltYXRpb25GcmFtZShjYWxsYmFjaykge1xuICBzZXRUaW1lb3V0KGNhbGxiYWNrLCAxMDAwIC8gNjApO1xufVxudmFyIHJlcXVlc3RBbmltYXRpb25GcmFtZSQxID0gd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSB8fCB3aW5kb3cud2Via2l0UmVxdWVzdEFuaW1hdGlvbkZyYW1lIHx8IHdpbmRvdy5tb3pSZXF1ZXN0QW5pbWF0aW9uRnJhbWUgfHwgd2luZG93Lm9SZXF1ZXN0QW5pbWF0aW9uRnJhbWUgfHwgd2luZG93Lm1zUmVxdWVzdEFuaW1hdGlvbkZyYW1lIHx8IHJlcXVlc3RBbmltYXRpb25GcmFtZTtcblxudmFyIENlbnRlcmVkRGl2ID0gZnVuY3Rpb24gKCkge1xuICBmdW5jdGlvbiBDZW50ZXJlZERpdigpIHtcbiAgICBjbGFzc0NhbGxDaGVjayh0aGlzLCBDZW50ZXJlZERpdik7XG4gICAgdGhpcy5iYWNrZ3JvdW5kRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIENvbW1vbi5leHRlbmQodGhpcy5iYWNrZ3JvdW5kRWxlbWVudC5zdHlsZSwge1xuICAgICAgYmFja2dyb3VuZENvbG9yOiAncmdiYSgwLDAsMCwwLjgpJyxcbiAgICAgIHRvcDogMCxcbiAgICAgIGxlZnQ6IDAsXG4gICAgICBkaXNwbGF5OiAnbm9uZScsXG4gICAgICB6SW5kZXg6ICcxMDAwJyxcbiAgICAgIG9wYWNpdHk6IDAsXG4gICAgICBXZWJraXRUcmFuc2l0aW9uOiAnb3BhY2l0eSAwLjJzIGxpbmVhcicsXG4gICAgICB0cmFuc2l0aW9uOiAnb3BhY2l0eSAwLjJzIGxpbmVhcidcbiAgICB9KTtcbiAgICBkb20ubWFrZUZ1bGxzY3JlZW4odGhpcy5iYWNrZ3JvdW5kRWxlbWVudCk7XG4gICAgdGhpcy5iYWNrZ3JvdW5kRWxlbWVudC5zdHlsZS5wb3NpdGlvbiA9ICdmaXhlZCc7XG4gICAgdGhpcy5kb21FbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgQ29tbW9uLmV4dGVuZCh0aGlzLmRvbUVsZW1lbnQuc3R5bGUsIHtcbiAgICAgIHBvc2l0aW9uOiAnZml4ZWQnLFxuICAgICAgZGlzcGxheTogJ25vbmUnLFxuICAgICAgekluZGV4OiAnMTAwMScsXG4gICAgICBvcGFjaXR5OiAwLFxuICAgICAgV2Via2l0VHJhbnNpdGlvbjogJy13ZWJraXQtdHJhbnNmb3JtIDAuMnMgZWFzZS1vdXQsIG9wYWNpdHkgMC4ycyBsaW5lYXInLFxuICAgICAgdHJhbnNpdGlvbjogJ3RyYW5zZm9ybSAwLjJzIGVhc2Utb3V0LCBvcGFjaXR5IDAuMnMgbGluZWFyJ1xuICAgIH0pO1xuICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQodGhpcy5iYWNrZ3JvdW5kRWxlbWVudCk7XG4gICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZCh0aGlzLmRvbUVsZW1lbnQpO1xuICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgZG9tLmJpbmQodGhpcy5iYWNrZ3JvdW5kRWxlbWVudCwgJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xuICAgICAgX3RoaXMuaGlkZSgpO1xuICAgIH0pO1xuICB9XG4gIGNyZWF0ZUNsYXNzKENlbnRlcmVkRGl2LCBbe1xuICAgIGtleTogJ3Nob3cnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBzaG93KCkge1xuICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgIHRoaXMuYmFja2dyb3VuZEVsZW1lbnQuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XG4gICAgICB0aGlzLmRvbUVsZW1lbnQuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XG4gICAgICB0aGlzLmRvbUVsZW1lbnQuc3R5bGUub3BhY2l0eSA9IDA7XG4gICAgICB0aGlzLmRvbUVsZW1lbnQuc3R5bGUud2Via2l0VHJhbnNmb3JtID0gJ3NjYWxlKDEuMSknO1xuICAgICAgdGhpcy5sYXlvdXQoKTtcbiAgICAgIENvbW1vbi5kZWZlcihmdW5jdGlvbiAoKSB7XG4gICAgICAgIF90aGlzLmJhY2tncm91bmRFbGVtZW50LnN0eWxlLm9wYWNpdHkgPSAxO1xuICAgICAgICBfdGhpcy5kb21FbGVtZW50LnN0eWxlLm9wYWNpdHkgPSAxO1xuICAgICAgICBfdGhpcy5kb21FbGVtZW50LnN0eWxlLndlYmtpdFRyYW5zZm9ybSA9ICdzY2FsZSgxKSc7XG4gICAgICB9KTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdoaWRlJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gaGlkZSgpIHtcbiAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICB2YXIgaGlkZSA9IGZ1bmN0aW9uIGhpZGUoKSB7XG4gICAgICAgIF90aGlzLmRvbUVsZW1lbnQuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICAgICAgX3RoaXMuYmFja2dyb3VuZEVsZW1lbnQuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICAgICAgZG9tLnVuYmluZChfdGhpcy5kb21FbGVtZW50LCAnd2Via2l0VHJhbnNpdGlvbkVuZCcsIGhpZGUpO1xuICAgICAgICBkb20udW5iaW5kKF90aGlzLmRvbUVsZW1lbnQsICd0cmFuc2l0aW9uZW5kJywgaGlkZSk7XG4gICAgICAgIGRvbS51bmJpbmQoX3RoaXMuZG9tRWxlbWVudCwgJ29UcmFuc2l0aW9uRW5kJywgaGlkZSk7XG4gICAgICB9O1xuICAgICAgZG9tLmJpbmQodGhpcy5kb21FbGVtZW50LCAnd2Via2l0VHJhbnNpdGlvbkVuZCcsIGhpZGUpO1xuICAgICAgZG9tLmJpbmQodGhpcy5kb21FbGVtZW50LCAndHJhbnNpdGlvbmVuZCcsIGhpZGUpO1xuICAgICAgZG9tLmJpbmQodGhpcy5kb21FbGVtZW50LCAnb1RyYW5zaXRpb25FbmQnLCBoaWRlKTtcbiAgICAgIHRoaXMuYmFja2dyb3VuZEVsZW1lbnQuc3R5bGUub3BhY2l0eSA9IDA7XG4gICAgICB0aGlzLmRvbUVsZW1lbnQuc3R5bGUub3BhY2l0eSA9IDA7XG4gICAgICB0aGlzLmRvbUVsZW1lbnQuc3R5bGUud2Via2l0VHJhbnNmb3JtID0gJ3NjYWxlKDEuMSknO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ2xheW91dCcsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGxheW91dCgpIHtcbiAgICAgIHRoaXMuZG9tRWxlbWVudC5zdHlsZS5sZWZ0ID0gd2luZG93LmlubmVyV2lkdGggLyAyIC0gZG9tLmdldFdpZHRoKHRoaXMuZG9tRWxlbWVudCkgLyAyICsgJ3B4JztcbiAgICAgIHRoaXMuZG9tRWxlbWVudC5zdHlsZS50b3AgPSB3aW5kb3cuaW5uZXJIZWlnaHQgLyAyIC0gZG9tLmdldEhlaWdodCh0aGlzLmRvbUVsZW1lbnQpIC8gMiArICdweCc7XG4gICAgfVxuICB9XSk7XG4gIHJldHVybiBDZW50ZXJlZERpdjtcbn0oKTtcblxudmFyIHN0eWxlU2hlZXQgPSBfX18kaW5zZXJ0U3R5bGUoXCIuZGcgdWx7bGlzdC1zdHlsZTpub25lO21hcmdpbjowO3BhZGRpbmc6MDt3aWR0aDoxMDAlO2NsZWFyOmJvdGh9LmRnLmFje3Bvc2l0aW9uOmZpeGVkO3RvcDowO2xlZnQ6MDtyaWdodDowO2hlaWdodDowO3otaW5kZXg6MH0uZGc6bm90KC5hYykgLm1haW57b3ZlcmZsb3c6aGlkZGVufS5kZy5tYWluey13ZWJraXQtdHJhbnNpdGlvbjpvcGFjaXR5IC4xcyBsaW5lYXI7LW8tdHJhbnNpdGlvbjpvcGFjaXR5IC4xcyBsaW5lYXI7LW1vei10cmFuc2l0aW9uOm9wYWNpdHkgLjFzIGxpbmVhcjt0cmFuc2l0aW9uOm9wYWNpdHkgLjFzIGxpbmVhcn0uZGcubWFpbi50YWxsZXItdGhhbi13aW5kb3d7b3ZlcmZsb3cteTphdXRvfS5kZy5tYWluLnRhbGxlci10aGFuLXdpbmRvdyAuY2xvc2UtYnV0dG9ue29wYWNpdHk6MTttYXJnaW4tdG9wOi0xcHg7Ym9yZGVyLXRvcDoxcHggc29saWQgIzJjMmMyY30uZGcubWFpbiB1bC5jbG9zZWQgLmNsb3NlLWJ1dHRvbntvcGFjaXR5OjEgIWltcG9ydGFudH0uZGcubWFpbjpob3ZlciAuY2xvc2UtYnV0dG9uLC5kZy5tYWluIC5jbG9zZS1idXR0b24uZHJhZ3tvcGFjaXR5OjF9LmRnLm1haW4gLmNsb3NlLWJ1dHRvbnstd2Via2l0LXRyYW5zaXRpb246b3BhY2l0eSAuMXMgbGluZWFyOy1vLXRyYW5zaXRpb246b3BhY2l0eSAuMXMgbGluZWFyOy1tb3otdHJhbnNpdGlvbjpvcGFjaXR5IC4xcyBsaW5lYXI7dHJhbnNpdGlvbjpvcGFjaXR5IC4xcyBsaW5lYXI7Ym9yZGVyOjA7bGluZS1oZWlnaHQ6MTlweDtoZWlnaHQ6MjBweDtjdXJzb3I6cG9pbnRlcjt0ZXh0LWFsaWduOmNlbnRlcjtiYWNrZ3JvdW5kLWNvbG9yOiMwMDB9LmRnLm1haW4gLmNsb3NlLWJ1dHRvbi5jbG9zZS10b3B7cG9zaXRpb246cmVsYXRpdmV9LmRnLm1haW4gLmNsb3NlLWJ1dHRvbi5jbG9zZS1ib3R0b217cG9zaXRpb246YWJzb2x1dGV9LmRnLm1haW4gLmNsb3NlLWJ1dHRvbjpob3ZlcntiYWNrZ3JvdW5kLWNvbG9yOiMxMTF9LmRnLmF7ZmxvYXQ6cmlnaHQ7bWFyZ2luLXJpZ2h0OjE1cHg7b3ZlcmZsb3cteTp2aXNpYmxlfS5kZy5hLmhhcy1zYXZlPnVsLmNsb3NlLXRvcHttYXJnaW4tdG9wOjB9LmRnLmEuaGFzLXNhdmU+dWwuY2xvc2UtYm90dG9te21hcmdpbi10b3A6MjdweH0uZGcuYS5oYXMtc2F2ZT51bC5jbG9zZWR7bWFyZ2luLXRvcDowfS5kZy5hIC5zYXZlLXJvd3t0b3A6MDt6LWluZGV4OjEwMDJ9LmRnLmEgLnNhdmUtcm93LmNsb3NlLXRvcHtwb3NpdGlvbjpyZWxhdGl2ZX0uZGcuYSAuc2F2ZS1yb3cuY2xvc2UtYm90dG9te3Bvc2l0aW9uOmZpeGVkfS5kZyBsaXstd2Via2l0LXRyYW5zaXRpb246aGVpZ2h0IC4xcyBlYXNlLW91dDstby10cmFuc2l0aW9uOmhlaWdodCAuMXMgZWFzZS1vdXQ7LW1vei10cmFuc2l0aW9uOmhlaWdodCAuMXMgZWFzZS1vdXQ7dHJhbnNpdGlvbjpoZWlnaHQgLjFzIGVhc2Utb3V0Oy13ZWJraXQtdHJhbnNpdGlvbjpvdmVyZmxvdyAuMXMgbGluZWFyOy1vLXRyYW5zaXRpb246b3ZlcmZsb3cgLjFzIGxpbmVhcjstbW96LXRyYW5zaXRpb246b3ZlcmZsb3cgLjFzIGxpbmVhcjt0cmFuc2l0aW9uOm92ZXJmbG93IC4xcyBsaW5lYXJ9LmRnIGxpOm5vdCguZm9sZGVyKXtjdXJzb3I6YXV0bztoZWlnaHQ6MjdweDtsaW5lLWhlaWdodDoyN3B4O3BhZGRpbmc6MCA0cHggMCA1cHh9LmRnIGxpLmZvbGRlcntwYWRkaW5nOjA7Ym9yZGVyLWxlZnQ6NHB4IHNvbGlkIHJnYmEoMCwwLDAsMCl9LmRnIGxpLnRpdGxle2N1cnNvcjpwb2ludGVyO21hcmdpbi1sZWZ0Oi00cHh9LmRnIC5jbG9zZWQgbGk6bm90KC50aXRsZSksLmRnIC5jbG9zZWQgdWwgbGksLmRnIC5jbG9zZWQgdWwgbGk+KntoZWlnaHQ6MDtvdmVyZmxvdzpoaWRkZW47Ym9yZGVyOjB9LmRnIC5jcntjbGVhcjpib3RoO3BhZGRpbmctbGVmdDozcHg7aGVpZ2h0OjI3cHg7b3ZlcmZsb3c6aGlkZGVufS5kZyAucHJvcGVydHktbmFtZXtjdXJzb3I6ZGVmYXVsdDtmbG9hdDpsZWZ0O2NsZWFyOmxlZnQ7d2lkdGg6NDAlO292ZXJmbG93OmhpZGRlbjt0ZXh0LW92ZXJmbG93OmVsbGlwc2lzfS5kZyAuY3tmbG9hdDpsZWZ0O3dpZHRoOjYwJTtwb3NpdGlvbjpyZWxhdGl2ZX0uZGcgLmMgaW5wdXRbdHlwZT10ZXh0XXtib3JkZXI6MDttYXJnaW4tdG9wOjRweDtwYWRkaW5nOjNweDt3aWR0aDoxMDAlO2Zsb2F0OnJpZ2h0fS5kZyAuaGFzLXNsaWRlciBpbnB1dFt0eXBlPXRleHRde3dpZHRoOjMwJTttYXJnaW4tbGVmdDowfS5kZyAuc2xpZGVye2Zsb2F0OmxlZnQ7d2lkdGg6NjYlO21hcmdpbi1sZWZ0Oi01cHg7bWFyZ2luLXJpZ2h0OjA7aGVpZ2h0OjE5cHg7bWFyZ2luLXRvcDo0cHh9LmRnIC5zbGlkZXItZmd7aGVpZ2h0OjEwMCV9LmRnIC5jIGlucHV0W3R5cGU9Y2hlY2tib3hde21hcmdpbi10b3A6N3B4fS5kZyAuYyBzZWxlY3R7bWFyZ2luLXRvcDo1cHh9LmRnIC5jci5mdW5jdGlvbiwuZGcgLmNyLmZ1bmN0aW9uIC5wcm9wZXJ0eS1uYW1lLC5kZyAuY3IuZnVuY3Rpb24gKiwuZGcgLmNyLmJvb2xlYW4sLmRnIC5jci5ib29sZWFuICp7Y3Vyc29yOnBvaW50ZXJ9LmRnIC5jci5jb2xvcntvdmVyZmxvdzp2aXNpYmxlfS5kZyAuc2VsZWN0b3J7ZGlzcGxheTpub25lO3Bvc2l0aW9uOmFic29sdXRlO21hcmdpbi1sZWZ0Oi05cHg7bWFyZ2luLXRvcDoyM3B4O3otaW5kZXg6MTB9LmRnIC5jOmhvdmVyIC5zZWxlY3RvciwuZGcgLnNlbGVjdG9yLmRyYWd7ZGlzcGxheTpibG9ja30uZGcgbGkuc2F2ZS1yb3d7cGFkZGluZzowfS5kZyBsaS5zYXZlLXJvdyAuYnV0dG9ue2Rpc3BsYXk6aW5saW5lLWJsb2NrO3BhZGRpbmc6MHB4IDZweH0uZGcuZGlhbG9ndWV7YmFja2dyb3VuZC1jb2xvcjojMjIyO3dpZHRoOjQ2MHB4O3BhZGRpbmc6MTVweDtmb250LXNpemU6MTNweDtsaW5lLWhlaWdodDoxNXB4fSNkZy1uZXctY29uc3RydWN0b3J7cGFkZGluZzoxMHB4O2NvbG9yOiMyMjI7Zm9udC1mYW1pbHk6TW9uYWNvLCBtb25vc3BhY2U7Zm9udC1zaXplOjEwcHg7Ym9yZGVyOjA7cmVzaXplOm5vbmU7Ym94LXNoYWRvdzppbnNldCAxcHggMXB4IDFweCAjODg4O3dvcmQtd3JhcDpicmVhay13b3JkO21hcmdpbjoxMnB4IDA7ZGlzcGxheTpibG9jazt3aWR0aDo0NDBweDtvdmVyZmxvdy15OnNjcm9sbDtoZWlnaHQ6MTAwcHg7cG9zaXRpb246cmVsYXRpdmV9I2RnLWxvY2FsLWV4cGxhaW57ZGlzcGxheTpub25lO2ZvbnQtc2l6ZToxMXB4O2xpbmUtaGVpZ2h0OjE3cHg7Ym9yZGVyLXJhZGl1czozcHg7YmFja2dyb3VuZC1jb2xvcjojMzMzO3BhZGRpbmc6OHB4O21hcmdpbi10b3A6MTBweH0jZGctbG9jYWwtZXhwbGFpbiBjb2Rle2ZvbnQtc2l6ZToxMHB4fSNkYXQtZ3VpLXNhdmUtbG9jYWxseXtkaXNwbGF5Om5vbmV9LmRne2NvbG9yOiNlZWU7Zm9udDoxMXB4ICdMdWNpZGEgR3JhbmRlJywgc2Fucy1zZXJpZjt0ZXh0LXNoYWRvdzowIC0xcHggMCAjMTExfS5kZy5tYWluOjotd2Via2l0LXNjcm9sbGJhcnt3aWR0aDo1cHg7YmFja2dyb3VuZDojMWExYTFhfS5kZy5tYWluOjotd2Via2l0LXNjcm9sbGJhci1jb3JuZXJ7aGVpZ2h0OjA7ZGlzcGxheTpub25lfS5kZy5tYWluOjotd2Via2l0LXNjcm9sbGJhci10aHVtYntib3JkZXItcmFkaXVzOjVweDtiYWNrZ3JvdW5kOiM2NzY3Njd9LmRnIGxpOm5vdCguZm9sZGVyKXtiYWNrZ3JvdW5kOiMxYTFhMWE7Ym9yZGVyLWJvdHRvbToxcHggc29saWQgIzJjMmMyY30uZGcgbGkuc2F2ZS1yb3d7bGluZS1oZWlnaHQ6MjVweDtiYWNrZ3JvdW5kOiNkYWQ1Y2I7Ym9yZGVyOjB9LmRnIGxpLnNhdmUtcm93IHNlbGVjdHttYXJnaW4tbGVmdDo1cHg7d2lkdGg6MTA4cHh9LmRnIGxpLnNhdmUtcm93IC5idXR0b257bWFyZ2luLWxlZnQ6NXB4O21hcmdpbi10b3A6MXB4O2JvcmRlci1yYWRpdXM6MnB4O2ZvbnQtc2l6ZTo5cHg7bGluZS1oZWlnaHQ6N3B4O3BhZGRpbmc6NHB4IDRweCA1cHggNHB4O2JhY2tncm91bmQ6I2M1YmRhZDtjb2xvcjojZmZmO3RleHQtc2hhZG93OjAgMXB4IDAgI2IwYTU4Zjtib3gtc2hhZG93OjAgLTFweCAwICNiMGE1OGY7Y3Vyc29yOnBvaW50ZXJ9LmRnIGxpLnNhdmUtcm93IC5idXR0b24uZ2VhcnN7YmFja2dyb3VuZDojYzViZGFkIHVybChkYXRhOmltYWdlL3BuZztiYXNlNjQsaVZCT1J3MEtHZ29BQUFBTlNVaEVVZ0FBQUFzQUFBQU5DQVlBQUFCLzlaUTdBQUFBR1hSRldIUlRiMlowZDJGeVpRQkJaRzlpWlNCSmJXRm5aVkpsWVdSNWNjbGxQQUFBQVFKSlJFRlVlTnBpWUtBVS9QLy9Qd0dJQy9BcENBQmlCU0FXK0k4QUNsQWNnS3hRNFQ5aG9NQUVVcnh4MlFTR042K2VnRFgrL3ZXVDRlN044MkFNWW9QQXgvZXZ3V29Zb1NZYkFDWDJzN0t4Q3h6Y3NlekRoM2V2Rm9ERUJZVEVFcXljZ2dXQXpBOUF1VVNRUWdlWVBhOWZQdjYvWVdtL0FjeDVJUGI3dHkvZncrUVpibHc2N3ZEczhSMFlIeVFoZ09ieCt5QUprQnFtRzVkUFBEaDFhUE9HUi9ldWdXMEc0dmxJb1RJZnlGY0ErUWVraGhISmhQZFF4YmlBSWd1TUJUUVpyUEQ3MTA4TTZyb1dZREZRaUlBQXY2QW93LzFiRndYZ2lzK2YyTFVBeW53b0lhTmN6OFhOeDNEbDdNRUpVREdRcHg5Z3RROFlDdWVCK0QyNk9FQ0FBUURhZHQ3ZTQ2RDQyUUFBQUFCSlJVNUVya0pnZ2c9PSkgMnB4IDFweCBuby1yZXBlYXQ7aGVpZ2h0OjdweDt3aWR0aDo4cHh9LmRnIGxpLnNhdmUtcm93IC5idXR0b246aG92ZXJ7YmFja2dyb3VuZC1jb2xvcjojYmFiMTllO2JveC1zaGFkb3c6MCAtMXB4IDAgI2IwYTU4Zn0uZGcgbGkuZm9sZGVye2JvcmRlci1ib3R0b206MH0uZGcgbGkudGl0bGV7cGFkZGluZy1sZWZ0OjE2cHg7YmFja2dyb3VuZDojMDAwIHVybChkYXRhOmltYWdlL2dpZjtiYXNlNjQsUjBsR09EbGhCUUFGQUpFQUFQLy8vL1B6OC8vLy8vLy8veUg1QkFFQUFBSUFMQUFBQUFBRkFBVUFBQUlJbEkraEtnRnhvQ2dBT3c9PSkgNnB4IDEwcHggbm8tcmVwZWF0O2N1cnNvcjpwb2ludGVyO2JvcmRlci1ib3R0b206MXB4IHNvbGlkIHJnYmEoMjU1LDI1NSwyNTUsMC4yKX0uZGcgLmNsb3NlZCBsaS50aXRsZXtiYWNrZ3JvdW5kLWltYWdlOnVybChkYXRhOmltYWdlL2dpZjtiYXNlNjQsUjBsR09EbGhCUUFGQUpFQUFQLy8vL1B6OC8vLy8vLy8veUg1QkFFQUFBSUFMQUFBQUFBRkFBVUFBQUlJbEdJV3FNQ2JXQUVBT3c9PSl9LmRnIC5jci5ib29sZWFue2JvcmRlci1sZWZ0OjNweCBzb2xpZCAjODA2Nzg3fS5kZyAuY3IuY29sb3J7Ym9yZGVyLWxlZnQ6M3B4IHNvbGlkfS5kZyAuY3IuZnVuY3Rpb257Ym9yZGVyLWxlZnQ6M3B4IHNvbGlkICNlNjFkNWZ9LmRnIC5jci5udW1iZXJ7Ym9yZGVyLWxlZnQ6M3B4IHNvbGlkICMyRkExRDZ9LmRnIC5jci5udW1iZXIgaW5wdXRbdHlwZT10ZXh0XXtjb2xvcjojMkZBMUQ2fS5kZyAuY3Iuc3RyaW5ne2JvcmRlci1sZWZ0OjNweCBzb2xpZCAjMWVkMzZmfS5kZyAuY3Iuc3RyaW5nIGlucHV0W3R5cGU9dGV4dF17Y29sb3I6IzFlZDM2Zn0uZGcgLmNyLmZ1bmN0aW9uOmhvdmVyLC5kZyAuY3IuYm9vbGVhbjpob3ZlcntiYWNrZ3JvdW5kOiMxMTF9LmRnIC5jIGlucHV0W3R5cGU9dGV4dF17YmFja2dyb3VuZDojMzAzMDMwO291dGxpbmU6bm9uZX0uZGcgLmMgaW5wdXRbdHlwZT10ZXh0XTpob3ZlcntiYWNrZ3JvdW5kOiMzYzNjM2N9LmRnIC5jIGlucHV0W3R5cGU9dGV4dF06Zm9jdXN7YmFja2dyb3VuZDojNDk0OTQ5O2NvbG9yOiNmZmZ9LmRnIC5jIC5zbGlkZXJ7YmFja2dyb3VuZDojMzAzMDMwO2N1cnNvcjpldy1yZXNpemV9LmRnIC5jIC5zbGlkZXItZmd7YmFja2dyb3VuZDojMkZBMUQ2O21heC13aWR0aDoxMDAlfS5kZyAuYyAuc2xpZGVyOmhvdmVye2JhY2tncm91bmQ6IzNjM2MzY30uZGcgLmMgLnNsaWRlcjpob3ZlciAuc2xpZGVyLWZne2JhY2tncm91bmQ6IzQ0YWJkYX1cXG5cIik7XG5cbmNzcy5pbmplY3Qoc3R5bGVTaGVldCk7XG52YXIgQ1NTX05BTUVTUEFDRSA9ICdkZyc7XG52YXIgSElERV9LRVlfQ09ERSA9IDcyO1xudmFyIENMT1NFX0JVVFRPTl9IRUlHSFQgPSAyMDtcbnZhciBERUZBVUxUX0RFRkFVTFRfUFJFU0VUX05BTUUgPSAnRGVmYXVsdCc7XG52YXIgU1VQUE9SVFNfTE9DQUxfU1RPUkFHRSA9IGZ1bmN0aW9uICgpIHtcbiAgdHJ5IHtcbiAgICByZXR1cm4gISF3aW5kb3cubG9jYWxTdG9yYWdlO1xuICB9IGNhdGNoIChlKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG59KCk7XG52YXIgU0FWRV9ESUFMT0dVRSA9IHZvaWQgMDtcbnZhciBhdXRvUGxhY2VWaXJnaW4gPSB0cnVlO1xudmFyIGF1dG9QbGFjZUNvbnRhaW5lciA9IHZvaWQgMDtcbnZhciBoaWRlID0gZmFsc2U7XG52YXIgaGlkZWFibGVHdWlzID0gW107XG52YXIgR1VJID0gZnVuY3Rpb24gR1VJKHBhcnMpIHtcbiAgdmFyIF90aGlzID0gdGhpcztcbiAgdmFyIHBhcmFtcyA9IHBhcnMgfHwge307XG4gIHRoaXMuZG9tRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICB0aGlzLl9fdWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd1bCcpO1xuICB0aGlzLmRvbUVsZW1lbnQuYXBwZW5kQ2hpbGQodGhpcy5fX3VsKTtcbiAgZG9tLmFkZENsYXNzKHRoaXMuZG9tRWxlbWVudCwgQ1NTX05BTUVTUEFDRSk7XG4gIHRoaXMuX19mb2xkZXJzID0ge307XG4gIHRoaXMuX19jb250cm9sbGVycyA9IFtdO1xuICB0aGlzLl9fcmVtZW1iZXJlZE9iamVjdHMgPSBbXTtcbiAgdGhpcy5fX3JlbWVtYmVyZWRPYmplY3RJbmRlY2VzVG9Db250cm9sbGVycyA9IFtdO1xuICB0aGlzLl9fbGlzdGVuaW5nID0gW107XG4gIHBhcmFtcyA9IENvbW1vbi5kZWZhdWx0cyhwYXJhbXMsIHtcbiAgICBjbG9zZU9uVG9wOiBmYWxzZSxcbiAgICBhdXRvUGxhY2U6IHRydWUsXG4gICAgd2lkdGg6IEdVSS5ERUZBVUxUX1dJRFRIXG4gIH0pO1xuICBwYXJhbXMgPSBDb21tb24uZGVmYXVsdHMocGFyYW1zLCB7XG4gICAgcmVzaXphYmxlOiBwYXJhbXMuYXV0b1BsYWNlLFxuICAgIGhpZGVhYmxlOiBwYXJhbXMuYXV0b1BsYWNlXG4gIH0pO1xuICBpZiAoIUNvbW1vbi5pc1VuZGVmaW5lZChwYXJhbXMubG9hZCkpIHtcbiAgICBpZiAocGFyYW1zLnByZXNldCkge1xuICAgICAgcGFyYW1zLmxvYWQucHJlc2V0ID0gcGFyYW1zLnByZXNldDtcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgcGFyYW1zLmxvYWQgPSB7IHByZXNldDogREVGQVVMVF9ERUZBVUxUX1BSRVNFVF9OQU1FIH07XG4gIH1cbiAgaWYgKENvbW1vbi5pc1VuZGVmaW5lZChwYXJhbXMucGFyZW50KSAmJiBwYXJhbXMuaGlkZWFibGUpIHtcbiAgICBoaWRlYWJsZUd1aXMucHVzaCh0aGlzKTtcbiAgfVxuICBwYXJhbXMucmVzaXphYmxlID0gQ29tbW9uLmlzVW5kZWZpbmVkKHBhcmFtcy5wYXJlbnQpICYmIHBhcmFtcy5yZXNpemFibGU7XG4gIGlmIChwYXJhbXMuYXV0b1BsYWNlICYmIENvbW1vbi5pc1VuZGVmaW5lZChwYXJhbXMuc2Nyb2xsYWJsZSkpIHtcbiAgICBwYXJhbXMuc2Nyb2xsYWJsZSA9IHRydWU7XG4gIH1cbiAgdmFyIHVzZUxvY2FsU3RvcmFnZSA9IFNVUFBPUlRTX0xPQ0FMX1NUT1JBR0UgJiYgbG9jYWxTdG9yYWdlLmdldEl0ZW0oZ2V0TG9jYWxTdG9yYWdlSGFzaCh0aGlzLCAnaXNMb2NhbCcpKSA9PT0gJ3RydWUnO1xuICB2YXIgc2F2ZVRvTG9jYWxTdG9yYWdlID0gdm9pZCAwO1xuICB2YXIgdGl0bGVSb3cgPSB2b2lkIDA7XG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzKHRoaXMsXG4gIHtcbiAgICBwYXJlbnQ6IHtcbiAgICAgIGdldDogZnVuY3Rpb24gZ2V0JCQxKCkge1xuICAgICAgICByZXR1cm4gcGFyYW1zLnBhcmVudDtcbiAgICAgIH1cbiAgICB9LFxuICAgIHNjcm9sbGFibGU6IHtcbiAgICAgIGdldDogZnVuY3Rpb24gZ2V0JCQxKCkge1xuICAgICAgICByZXR1cm4gcGFyYW1zLnNjcm9sbGFibGU7XG4gICAgICB9XG4gICAgfSxcbiAgICBhdXRvUGxhY2U6IHtcbiAgICAgIGdldDogZnVuY3Rpb24gZ2V0JCQxKCkge1xuICAgICAgICByZXR1cm4gcGFyYW1zLmF1dG9QbGFjZTtcbiAgICAgIH1cbiAgICB9LFxuICAgIGNsb3NlT25Ub3A6IHtcbiAgICAgIGdldDogZnVuY3Rpb24gZ2V0JCQxKCkge1xuICAgICAgICByZXR1cm4gcGFyYW1zLmNsb3NlT25Ub3A7XG4gICAgICB9XG4gICAgfSxcbiAgICBwcmVzZXQ6IHtcbiAgICAgIGdldDogZnVuY3Rpb24gZ2V0JCQxKCkge1xuICAgICAgICBpZiAoX3RoaXMucGFyZW50KSB7XG4gICAgICAgICAgcmV0dXJuIF90aGlzLmdldFJvb3QoKS5wcmVzZXQ7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHBhcmFtcy5sb2FkLnByZXNldDtcbiAgICAgIH0sXG4gICAgICBzZXQ6IGZ1bmN0aW9uIHNldCQkMSh2KSB7XG4gICAgICAgIGlmIChfdGhpcy5wYXJlbnQpIHtcbiAgICAgICAgICBfdGhpcy5nZXRSb290KCkucHJlc2V0ID0gdjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBwYXJhbXMubG9hZC5wcmVzZXQgPSB2O1xuICAgICAgICB9XG4gICAgICAgIHNldFByZXNldFNlbGVjdEluZGV4KHRoaXMpO1xuICAgICAgICBfdGhpcy5yZXZlcnQoKTtcbiAgICAgIH1cbiAgICB9LFxuICAgIHdpZHRoOiB7XG4gICAgICBnZXQ6IGZ1bmN0aW9uIGdldCQkMSgpIHtcbiAgICAgICAgcmV0dXJuIHBhcmFtcy53aWR0aDtcbiAgICAgIH0sXG4gICAgICBzZXQ6IGZ1bmN0aW9uIHNldCQkMSh2KSB7XG4gICAgICAgIHBhcmFtcy53aWR0aCA9IHY7XG4gICAgICAgIHNldFdpZHRoKF90aGlzLCB2KTtcbiAgICAgIH1cbiAgICB9LFxuICAgIG5hbWU6IHtcbiAgICAgIGdldDogZnVuY3Rpb24gZ2V0JCQxKCkge1xuICAgICAgICByZXR1cm4gcGFyYW1zLm5hbWU7XG4gICAgICB9LFxuICAgICAgc2V0OiBmdW5jdGlvbiBzZXQkJDEodikge1xuICAgICAgICBwYXJhbXMubmFtZSA9IHY7XG4gICAgICAgIGlmICh0aXRsZVJvdykge1xuICAgICAgICAgIHRpdGxlUm93LmlubmVySFRNTCA9IHBhcmFtcy5uYW1lO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSxcbiAgICBjbG9zZWQ6IHtcbiAgICAgIGdldDogZnVuY3Rpb24gZ2V0JCQxKCkge1xuICAgICAgICByZXR1cm4gcGFyYW1zLmNsb3NlZDtcbiAgICAgIH0sXG4gICAgICBzZXQ6IGZ1bmN0aW9uIHNldCQkMSh2KSB7XG4gICAgICAgIHBhcmFtcy5jbG9zZWQgPSB2O1xuICAgICAgICBpZiAocGFyYW1zLmNsb3NlZCkge1xuICAgICAgICAgIGRvbS5hZGRDbGFzcyhfdGhpcy5fX3VsLCBHVUkuQ0xBU1NfQ0xPU0VEKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBkb20ucmVtb3ZlQ2xhc3MoX3RoaXMuX191bCwgR1VJLkNMQVNTX0NMT1NFRCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5vblJlc2l6ZSgpO1xuICAgICAgICBpZiAoX3RoaXMuX19jbG9zZUJ1dHRvbikge1xuICAgICAgICAgIF90aGlzLl9fY2xvc2VCdXR0b24uaW5uZXJIVE1MID0gdiA/IEdVSS5URVhUX09QRU4gOiBHVUkuVEVYVF9DTE9TRUQ7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LFxuICAgIGxvYWQ6IHtcbiAgICAgIGdldDogZnVuY3Rpb24gZ2V0JCQxKCkge1xuICAgICAgICByZXR1cm4gcGFyYW1zLmxvYWQ7XG4gICAgICB9XG4gICAgfSxcbiAgICB1c2VMb2NhbFN0b3JhZ2U6IHtcbiAgICAgIGdldDogZnVuY3Rpb24gZ2V0JCQxKCkge1xuICAgICAgICByZXR1cm4gdXNlTG9jYWxTdG9yYWdlO1xuICAgICAgfSxcbiAgICAgIHNldDogZnVuY3Rpb24gc2V0JCQxKGJvb2wpIHtcbiAgICAgICAgaWYgKFNVUFBPUlRTX0xPQ0FMX1NUT1JBR0UpIHtcbiAgICAgICAgICB1c2VMb2NhbFN0b3JhZ2UgPSBib29sO1xuICAgICAgICAgIGlmIChib29sKSB7XG4gICAgICAgICAgICBkb20uYmluZCh3aW5kb3csICd1bmxvYWQnLCBzYXZlVG9Mb2NhbFN0b3JhZ2UpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBkb20udW5iaW5kKHdpbmRvdywgJ3VubG9hZCcsIHNhdmVUb0xvY2FsU3RvcmFnZSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKGdldExvY2FsU3RvcmFnZUhhc2goX3RoaXMsICdpc0xvY2FsJyksIGJvb2wpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9KTtcbiAgaWYgKENvbW1vbi5pc1VuZGVmaW5lZChwYXJhbXMucGFyZW50KSkge1xuICAgIHRoaXMuY2xvc2VkID0gcGFyYW1zLmNsb3NlZCB8fCBmYWxzZTtcbiAgICBkb20uYWRkQ2xhc3ModGhpcy5kb21FbGVtZW50LCBHVUkuQ0xBU1NfTUFJTik7XG4gICAgZG9tLm1ha2VTZWxlY3RhYmxlKHRoaXMuZG9tRWxlbWVudCwgZmFsc2UpO1xuICAgIGlmIChTVVBQT1JUU19MT0NBTF9TVE9SQUdFKSB7XG4gICAgICBpZiAodXNlTG9jYWxTdG9yYWdlKSB7XG4gICAgICAgIF90aGlzLnVzZUxvY2FsU3RvcmFnZSA9IHRydWU7XG4gICAgICAgIHZhciBzYXZlZEd1aSA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKGdldExvY2FsU3RvcmFnZUhhc2godGhpcywgJ2d1aScpKTtcbiAgICAgICAgaWYgKHNhdmVkR3VpKSB7XG4gICAgICAgICAgcGFyYW1zLmxvYWQgPSBKU09OLnBhcnNlKHNhdmVkR3VpKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICB0aGlzLl9fY2xvc2VCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICB0aGlzLl9fY2xvc2VCdXR0b24uaW5uZXJIVE1MID0gR1VJLlRFWFRfQ0xPU0VEO1xuICAgIGRvbS5hZGRDbGFzcyh0aGlzLl9fY2xvc2VCdXR0b24sIEdVSS5DTEFTU19DTE9TRV9CVVRUT04pO1xuICAgIGlmIChwYXJhbXMuY2xvc2VPblRvcCkge1xuICAgICAgZG9tLmFkZENsYXNzKHRoaXMuX19jbG9zZUJ1dHRvbiwgR1VJLkNMQVNTX0NMT1NFX1RPUCk7XG4gICAgICB0aGlzLmRvbUVsZW1lbnQuaW5zZXJ0QmVmb3JlKHRoaXMuX19jbG9zZUJ1dHRvbiwgdGhpcy5kb21FbGVtZW50LmNoaWxkTm9kZXNbMF0pO1xuICAgIH0gZWxzZSB7XG4gICAgICBkb20uYWRkQ2xhc3ModGhpcy5fX2Nsb3NlQnV0dG9uLCBHVUkuQ0xBU1NfQ0xPU0VfQk9UVE9NKTtcbiAgICAgIHRoaXMuZG9tRWxlbWVudC5hcHBlbmRDaGlsZCh0aGlzLl9fY2xvc2VCdXR0b24pO1xuICAgIH1cbiAgICBkb20uYmluZCh0aGlzLl9fY2xvc2VCdXR0b24sICdjbGljaycsIGZ1bmN0aW9uICgpIHtcbiAgICAgIF90aGlzLmNsb3NlZCA9ICFfdGhpcy5jbG9zZWQ7XG4gICAgfSk7XG4gIH0gZWxzZSB7XG4gICAgaWYgKHBhcmFtcy5jbG9zZWQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgcGFyYW1zLmNsb3NlZCA9IHRydWU7XG4gICAgfVxuICAgIHZhciB0aXRsZVJvd05hbWUgPSBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShwYXJhbXMubmFtZSk7XG4gICAgZG9tLmFkZENsYXNzKHRpdGxlUm93TmFtZSwgJ2NvbnRyb2xsZXItbmFtZScpO1xuICAgIHRpdGxlUm93ID0gYWRkUm93KF90aGlzLCB0aXRsZVJvd05hbWUpO1xuICAgIHZhciBvbkNsaWNrVGl0bGUgPSBmdW5jdGlvbiBvbkNsaWNrVGl0bGUoZSkge1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgX3RoaXMuY2xvc2VkID0gIV90aGlzLmNsb3NlZDtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9O1xuICAgIGRvbS5hZGRDbGFzcyh0aGlzLl9fdWwsIEdVSS5DTEFTU19DTE9TRUQpO1xuICAgIGRvbS5hZGRDbGFzcyh0aXRsZVJvdywgJ3RpdGxlJyk7XG4gICAgZG9tLmJpbmQodGl0bGVSb3csICdjbGljaycsIG9uQ2xpY2tUaXRsZSk7XG4gICAgaWYgKCFwYXJhbXMuY2xvc2VkKSB7XG4gICAgICB0aGlzLmNsb3NlZCA9IGZhbHNlO1xuICAgIH1cbiAgfVxuICBpZiAocGFyYW1zLmF1dG9QbGFjZSkge1xuICAgIGlmIChDb21tb24uaXNVbmRlZmluZWQocGFyYW1zLnBhcmVudCkpIHtcbiAgICAgIGlmIChhdXRvUGxhY2VWaXJnaW4pIHtcbiAgICAgICAgYXV0b1BsYWNlQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIGRvbS5hZGRDbGFzcyhhdXRvUGxhY2VDb250YWluZXIsIENTU19OQU1FU1BBQ0UpO1xuICAgICAgICBkb20uYWRkQ2xhc3MoYXV0b1BsYWNlQ29udGFpbmVyLCBHVUkuQ0xBU1NfQVVUT19QTEFDRV9DT05UQUlORVIpO1xuICAgICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGF1dG9QbGFjZUNvbnRhaW5lcik7XG4gICAgICAgIGF1dG9QbGFjZVZpcmdpbiA9IGZhbHNlO1xuICAgICAgfVxuICAgICAgYXV0b1BsYWNlQ29udGFpbmVyLmFwcGVuZENoaWxkKHRoaXMuZG9tRWxlbWVudCk7XG4gICAgICBkb20uYWRkQ2xhc3ModGhpcy5kb21FbGVtZW50LCBHVUkuQ0xBU1NfQVVUT19QTEFDRSk7XG4gICAgfVxuICAgIGlmICghdGhpcy5wYXJlbnQpIHtcbiAgICAgIHNldFdpZHRoKF90aGlzLCBwYXJhbXMud2lkdGgpO1xuICAgIH1cbiAgfVxuICB0aGlzLl9fcmVzaXplSGFuZGxlciA9IGZ1bmN0aW9uICgpIHtcbiAgICBfdGhpcy5vblJlc2l6ZURlYm91bmNlZCgpO1xuICB9O1xuICBkb20uYmluZCh3aW5kb3csICdyZXNpemUnLCB0aGlzLl9fcmVzaXplSGFuZGxlcik7XG4gIGRvbS5iaW5kKHRoaXMuX191bCwgJ3dlYmtpdFRyYW5zaXRpb25FbmQnLCB0aGlzLl9fcmVzaXplSGFuZGxlcik7XG4gIGRvbS5iaW5kKHRoaXMuX191bCwgJ3RyYW5zaXRpb25lbmQnLCB0aGlzLl9fcmVzaXplSGFuZGxlcik7XG4gIGRvbS5iaW5kKHRoaXMuX191bCwgJ29UcmFuc2l0aW9uRW5kJywgdGhpcy5fX3Jlc2l6ZUhhbmRsZXIpO1xuICB0aGlzLm9uUmVzaXplKCk7XG4gIGlmIChwYXJhbXMucmVzaXphYmxlKSB7XG4gICAgYWRkUmVzaXplSGFuZGxlKHRoaXMpO1xuICB9XG4gIHNhdmVUb0xvY2FsU3RvcmFnZSA9IGZ1bmN0aW9uIHNhdmVUb0xvY2FsU3RvcmFnZSgpIHtcbiAgICBpZiAoU1VQUE9SVFNfTE9DQUxfU1RPUkFHRSAmJiBsb2NhbFN0b3JhZ2UuZ2V0SXRlbShnZXRMb2NhbFN0b3JhZ2VIYXNoKF90aGlzLCAnaXNMb2NhbCcpKSA9PT0gJ3RydWUnKSB7XG4gICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShnZXRMb2NhbFN0b3JhZ2VIYXNoKF90aGlzLCAnZ3VpJyksIEpTT04uc3RyaW5naWZ5KF90aGlzLmdldFNhdmVPYmplY3QoKSkpO1xuICAgIH1cbiAgfTtcbiAgdGhpcy5zYXZlVG9Mb2NhbFN0b3JhZ2VJZlBvc3NpYmxlID0gc2F2ZVRvTG9jYWxTdG9yYWdlO1xuICBmdW5jdGlvbiByZXNldFdpZHRoKCkge1xuICAgIHZhciByb290ID0gX3RoaXMuZ2V0Um9vdCgpO1xuICAgIHJvb3Qud2lkdGggKz0gMTtcbiAgICBDb21tb24uZGVmZXIoZnVuY3Rpb24gKCkge1xuICAgICAgcm9vdC53aWR0aCAtPSAxO1xuICAgIH0pO1xuICB9XG4gIGlmICghcGFyYW1zLnBhcmVudCkge1xuICAgIHJlc2V0V2lkdGgoKTtcbiAgfVxufTtcbkdVSS50b2dnbGVIaWRlID0gZnVuY3Rpb24gKCkge1xuICBoaWRlID0gIWhpZGU7XG4gIENvbW1vbi5lYWNoKGhpZGVhYmxlR3VpcywgZnVuY3Rpb24gKGd1aSkge1xuICAgIGd1aS5kb21FbGVtZW50LnN0eWxlLmRpc3BsYXkgPSBoaWRlID8gJ25vbmUnIDogJyc7XG4gIH0pO1xufTtcbkdVSS5DTEFTU19BVVRPX1BMQUNFID0gJ2EnO1xuR1VJLkNMQVNTX0FVVE9fUExBQ0VfQ09OVEFJTkVSID0gJ2FjJztcbkdVSS5DTEFTU19NQUlOID0gJ21haW4nO1xuR1VJLkNMQVNTX0NPTlRST0xMRVJfUk9XID0gJ2NyJztcbkdVSS5DTEFTU19UT09fVEFMTCA9ICd0YWxsZXItdGhhbi13aW5kb3cnO1xuR1VJLkNMQVNTX0NMT1NFRCA9ICdjbG9zZWQnO1xuR1VJLkNMQVNTX0NMT1NFX0JVVFRPTiA9ICdjbG9zZS1idXR0b24nO1xuR1VJLkNMQVNTX0NMT1NFX1RPUCA9ICdjbG9zZS10b3AnO1xuR1VJLkNMQVNTX0NMT1NFX0JPVFRPTSA9ICdjbG9zZS1ib3R0b20nO1xuR1VJLkNMQVNTX0RSQUcgPSAnZHJhZyc7XG5HVUkuREVGQVVMVF9XSURUSCA9IDI0NTtcbkdVSS5URVhUX0NMT1NFRCA9ICdDbG9zZSBDb250cm9scyc7XG5HVUkuVEVYVF9PUEVOID0gJ09wZW4gQ29udHJvbHMnO1xuR1VJLl9rZXlkb3duSGFuZGxlciA9IGZ1bmN0aW9uIChlKSB7XG4gIGlmIChkb2N1bWVudC5hY3RpdmVFbGVtZW50LnR5cGUgIT09ICd0ZXh0JyAmJiAoZS53aGljaCA9PT0gSElERV9LRVlfQ09ERSB8fCBlLmtleUNvZGUgPT09IEhJREVfS0VZX0NPREUpKSB7XG4gICAgR1VJLnRvZ2dsZUhpZGUoKTtcbiAgfVxufTtcbmRvbS5iaW5kKHdpbmRvdywgJ2tleWRvd24nLCBHVUkuX2tleWRvd25IYW5kbGVyLCBmYWxzZSk7XG5Db21tb24uZXh0ZW5kKEdVSS5wcm90b3R5cGUsXG57XG4gIGFkZDogZnVuY3Rpb24gYWRkKG9iamVjdCwgcHJvcGVydHkpIHtcbiAgICByZXR1cm4gX2FkZCh0aGlzLCBvYmplY3QsIHByb3BlcnR5LCB7XG4gICAgICBmYWN0b3J5QXJnczogQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAyKVxuICAgIH0pO1xuICB9LFxuICBhZGRDb2xvcjogZnVuY3Rpb24gYWRkQ29sb3Iob2JqZWN0LCBwcm9wZXJ0eSkge1xuICAgIHJldHVybiBfYWRkKHRoaXMsIG9iamVjdCwgcHJvcGVydHksIHtcbiAgICAgIGNvbG9yOiB0cnVlXG4gICAgfSk7XG4gIH0sXG4gIHJlbW92ZTogZnVuY3Rpb24gcmVtb3ZlKGNvbnRyb2xsZXIpIHtcbiAgICB0aGlzLl9fdWwucmVtb3ZlQ2hpbGQoY29udHJvbGxlci5fX2xpKTtcbiAgICB0aGlzLl9fY29udHJvbGxlcnMuc3BsaWNlKHRoaXMuX19jb250cm9sbGVycy5pbmRleE9mKGNvbnRyb2xsZXIpLCAxKTtcbiAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgIENvbW1vbi5kZWZlcihmdW5jdGlvbiAoKSB7XG4gICAgICBfdGhpcy5vblJlc2l6ZSgpO1xuICAgIH0pO1xuICB9LFxuICBkZXN0cm95OiBmdW5jdGlvbiBkZXN0cm95KCkge1xuICAgIGlmICh0aGlzLnBhcmVudCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdPbmx5IHRoZSByb290IEdVSSBzaG91bGQgYmUgcmVtb3ZlZCB3aXRoIC5kZXN0cm95KCkuICcgKyAnRm9yIHN1YmZvbGRlcnMsIHVzZSBndWkucmVtb3ZlRm9sZGVyKGZvbGRlcikgaW5zdGVhZC4nKTtcbiAgICB9XG4gICAgaWYgKHRoaXMuYXV0b1BsYWNlKSB7XG4gICAgICBhdXRvUGxhY2VDb250YWluZXIucmVtb3ZlQ2hpbGQodGhpcy5kb21FbGVtZW50KTtcbiAgICB9XG4gICAgdmFyIF90aGlzID0gdGhpcztcbiAgICBDb21tb24uZWFjaCh0aGlzLl9fZm9sZGVycywgZnVuY3Rpb24gKHN1YmZvbGRlcikge1xuICAgICAgX3RoaXMucmVtb3ZlRm9sZGVyKHN1YmZvbGRlcik7XG4gICAgfSk7XG4gICAgZG9tLnVuYmluZCh3aW5kb3csICdrZXlkb3duJywgR1VJLl9rZXlkb3duSGFuZGxlciwgZmFsc2UpO1xuICAgIHJlbW92ZUxpc3RlbmVycyh0aGlzKTtcbiAgfSxcbiAgYWRkRm9sZGVyOiBmdW5jdGlvbiBhZGRGb2xkZXIobmFtZSkge1xuICAgIGlmICh0aGlzLl9fZm9sZGVyc1tuYW1lXSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1lvdSBhbHJlYWR5IGhhdmUgYSBmb2xkZXIgaW4gdGhpcyBHVUkgYnkgdGhlJyArICcgbmFtZSBcIicgKyBuYW1lICsgJ1wiJyk7XG4gICAgfVxuICAgIHZhciBuZXdHdWlQYXJhbXMgPSB7IG5hbWU6IG5hbWUsIHBhcmVudDogdGhpcyB9O1xuICAgIG5ld0d1aVBhcmFtcy5hdXRvUGxhY2UgPSB0aGlzLmF1dG9QbGFjZTtcbiAgICBpZiAodGhpcy5sb2FkICYmXG4gICAgdGhpcy5sb2FkLmZvbGRlcnMgJiZcbiAgICB0aGlzLmxvYWQuZm9sZGVyc1tuYW1lXSkge1xuICAgICAgbmV3R3VpUGFyYW1zLmNsb3NlZCA9IHRoaXMubG9hZC5mb2xkZXJzW25hbWVdLmNsb3NlZDtcbiAgICAgIG5ld0d1aVBhcmFtcy5sb2FkID0gdGhpcy5sb2FkLmZvbGRlcnNbbmFtZV07XG4gICAgfVxuICAgIHZhciBndWkgPSBuZXcgR1VJKG5ld0d1aVBhcmFtcyk7XG4gICAgdGhpcy5fX2ZvbGRlcnNbbmFtZV0gPSBndWk7XG4gICAgdmFyIGxpID0gYWRkUm93KHRoaXMsIGd1aS5kb21FbGVtZW50KTtcbiAgICBkb20uYWRkQ2xhc3MobGksICdmb2xkZXInKTtcbiAgICByZXR1cm4gZ3VpO1xuICB9LFxuICByZW1vdmVGb2xkZXI6IGZ1bmN0aW9uIHJlbW92ZUZvbGRlcihmb2xkZXIpIHtcbiAgICB0aGlzLl9fdWwucmVtb3ZlQ2hpbGQoZm9sZGVyLmRvbUVsZW1lbnQucGFyZW50RWxlbWVudCk7XG4gICAgZGVsZXRlIHRoaXMuX19mb2xkZXJzW2ZvbGRlci5uYW1lXTtcbiAgICBpZiAodGhpcy5sb2FkICYmXG4gICAgdGhpcy5sb2FkLmZvbGRlcnMgJiZcbiAgICB0aGlzLmxvYWQuZm9sZGVyc1tmb2xkZXIubmFtZV0pIHtcbiAgICAgIGRlbGV0ZSB0aGlzLmxvYWQuZm9sZGVyc1tmb2xkZXIubmFtZV07XG4gICAgfVxuICAgIHJlbW92ZUxpc3RlbmVycyhmb2xkZXIpO1xuICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgQ29tbW9uLmVhY2goZm9sZGVyLl9fZm9sZGVycywgZnVuY3Rpb24gKHN1YmZvbGRlcikge1xuICAgICAgZm9sZGVyLnJlbW92ZUZvbGRlcihzdWJmb2xkZXIpO1xuICAgIH0pO1xuICAgIENvbW1vbi5kZWZlcihmdW5jdGlvbiAoKSB7XG4gICAgICBfdGhpcy5vblJlc2l6ZSgpO1xuICAgIH0pO1xuICB9LFxuICBvcGVuOiBmdW5jdGlvbiBvcGVuKCkge1xuICAgIHRoaXMuY2xvc2VkID0gZmFsc2U7XG4gIH0sXG4gIGNsb3NlOiBmdW5jdGlvbiBjbG9zZSgpIHtcbiAgICB0aGlzLmNsb3NlZCA9IHRydWU7XG4gIH0sXG4gIGhpZGU6IGZ1bmN0aW9uIGhpZGUoKSB7XG4gICAgdGhpcy5kb21FbGVtZW50LnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gIH0sXG4gIHNob3c6IGZ1bmN0aW9uIHNob3coKSB7XG4gICAgdGhpcy5kb21FbGVtZW50LnN0eWxlLmRpc3BsYXkgPSAnJztcbiAgfSxcbiAgb25SZXNpemU6IGZ1bmN0aW9uIG9uUmVzaXplKCkge1xuICAgIHZhciByb290ID0gdGhpcy5nZXRSb290KCk7XG4gICAgaWYgKHJvb3Quc2Nyb2xsYWJsZSkge1xuICAgICAgdmFyIHRvcCA9IGRvbS5nZXRPZmZzZXQocm9vdC5fX3VsKS50b3A7XG4gICAgICB2YXIgaCA9IDA7XG4gICAgICBDb21tb24uZWFjaChyb290Ll9fdWwuY2hpbGROb2RlcywgZnVuY3Rpb24gKG5vZGUpIHtcbiAgICAgICAgaWYgKCEocm9vdC5hdXRvUGxhY2UgJiYgbm9kZSA9PT0gcm9vdC5fX3NhdmVfcm93KSkge1xuICAgICAgICAgIGggKz0gZG9tLmdldEhlaWdodChub2RlKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICBpZiAod2luZG93LmlubmVySGVpZ2h0IC0gdG9wIC0gQ0xPU0VfQlVUVE9OX0hFSUdIVCA8IGgpIHtcbiAgICAgICAgZG9tLmFkZENsYXNzKHJvb3QuZG9tRWxlbWVudCwgR1VJLkNMQVNTX1RPT19UQUxMKTtcbiAgICAgICAgcm9vdC5fX3VsLnN0eWxlLmhlaWdodCA9IHdpbmRvdy5pbm5lckhlaWdodCAtIHRvcCAtIENMT1NFX0JVVFRPTl9IRUlHSFQgKyAncHgnO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZG9tLnJlbW92ZUNsYXNzKHJvb3QuZG9tRWxlbWVudCwgR1VJLkNMQVNTX1RPT19UQUxMKTtcbiAgICAgICAgcm9vdC5fX3VsLnN0eWxlLmhlaWdodCA9ICdhdXRvJztcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKHJvb3QuX19yZXNpemVfaGFuZGxlKSB7XG4gICAgICBDb21tb24uZGVmZXIoZnVuY3Rpb24gKCkge1xuICAgICAgICByb290Ll9fcmVzaXplX2hhbmRsZS5zdHlsZS5oZWlnaHQgPSByb290Ll9fdWwub2Zmc2V0SGVpZ2h0ICsgJ3B4JztcbiAgICAgIH0pO1xuICAgIH1cbiAgICBpZiAocm9vdC5fX2Nsb3NlQnV0dG9uKSB7XG4gICAgICByb290Ll9fY2xvc2VCdXR0b24uc3R5bGUud2lkdGggPSByb290LndpZHRoICsgJ3B4JztcbiAgICB9XG4gIH0sXG4gIG9uUmVzaXplRGVib3VuY2VkOiBDb21tb24uZGVib3VuY2UoZnVuY3Rpb24gKCkge1xuICAgIHRoaXMub25SZXNpemUoKTtcbiAgfSwgNTApLFxuICByZW1lbWJlcjogZnVuY3Rpb24gcmVtZW1iZXIoKSB7XG4gICAgaWYgKENvbW1vbi5pc1VuZGVmaW5lZChTQVZFX0RJQUxPR1VFKSkge1xuICAgICAgU0FWRV9ESUFMT0dVRSA9IG5ldyBDZW50ZXJlZERpdigpO1xuICAgICAgU0FWRV9ESUFMT0dVRS5kb21FbGVtZW50LmlubmVySFRNTCA9IHNhdmVEaWFsb2dDb250ZW50cztcbiAgICB9XG4gICAgaWYgKHRoaXMucGFyZW50KSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1lvdSBjYW4gb25seSBjYWxsIHJlbWVtYmVyIG9uIGEgdG9wIGxldmVsIEdVSS4nKTtcbiAgICB9XG4gICAgdmFyIF90aGlzID0gdGhpcztcbiAgICBDb21tb24uZWFjaChBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMpLCBmdW5jdGlvbiAob2JqZWN0KSB7XG4gICAgICBpZiAoX3RoaXMuX19yZW1lbWJlcmVkT2JqZWN0cy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgYWRkU2F2ZU1lbnUoX3RoaXMpO1xuICAgICAgfVxuICAgICAgaWYgKF90aGlzLl9fcmVtZW1iZXJlZE9iamVjdHMuaW5kZXhPZihvYmplY3QpID09PSAtMSkge1xuICAgICAgICBfdGhpcy5fX3JlbWVtYmVyZWRPYmplY3RzLnB1c2gob2JqZWN0KTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICBpZiAodGhpcy5hdXRvUGxhY2UpIHtcbiAgICAgIHNldFdpZHRoKHRoaXMsIHRoaXMud2lkdGgpO1xuICAgIH1cbiAgfSxcbiAgZ2V0Um9vdDogZnVuY3Rpb24gZ2V0Um9vdCgpIHtcbiAgICB2YXIgZ3VpID0gdGhpcztcbiAgICB3aGlsZSAoZ3VpLnBhcmVudCkge1xuICAgICAgZ3VpID0gZ3VpLnBhcmVudDtcbiAgICB9XG4gICAgcmV0dXJuIGd1aTtcbiAgfSxcbiAgZ2V0U2F2ZU9iamVjdDogZnVuY3Rpb24gZ2V0U2F2ZU9iamVjdCgpIHtcbiAgICB2YXIgdG9SZXR1cm4gPSB0aGlzLmxvYWQ7XG4gICAgdG9SZXR1cm4uY2xvc2VkID0gdGhpcy5jbG9zZWQ7XG4gICAgaWYgKHRoaXMuX19yZW1lbWJlcmVkT2JqZWN0cy5sZW5ndGggPiAwKSB7XG4gICAgICB0b1JldHVybi5wcmVzZXQgPSB0aGlzLnByZXNldDtcbiAgICAgIGlmICghdG9SZXR1cm4ucmVtZW1iZXJlZCkge1xuICAgICAgICB0b1JldHVybi5yZW1lbWJlcmVkID0ge307XG4gICAgICB9XG4gICAgICB0b1JldHVybi5yZW1lbWJlcmVkW3RoaXMucHJlc2V0XSA9IGdldEN1cnJlbnRQcmVzZXQodGhpcyk7XG4gICAgfVxuICAgIHRvUmV0dXJuLmZvbGRlcnMgPSB7fTtcbiAgICBDb21tb24uZWFjaCh0aGlzLl9fZm9sZGVycywgZnVuY3Rpb24gKGVsZW1lbnQsIGtleSkge1xuICAgICAgdG9SZXR1cm4uZm9sZGVyc1trZXldID0gZWxlbWVudC5nZXRTYXZlT2JqZWN0KCk7XG4gICAgfSk7XG4gICAgcmV0dXJuIHRvUmV0dXJuO1xuICB9LFxuICBzYXZlOiBmdW5jdGlvbiBzYXZlKCkge1xuICAgIGlmICghdGhpcy5sb2FkLnJlbWVtYmVyZWQpIHtcbiAgICAgIHRoaXMubG9hZC5yZW1lbWJlcmVkID0ge307XG4gICAgfVxuICAgIHRoaXMubG9hZC5yZW1lbWJlcmVkW3RoaXMucHJlc2V0XSA9IGdldEN1cnJlbnRQcmVzZXQodGhpcyk7XG4gICAgbWFya1ByZXNldE1vZGlmaWVkKHRoaXMsIGZhbHNlKTtcbiAgICB0aGlzLnNhdmVUb0xvY2FsU3RvcmFnZUlmUG9zc2libGUoKTtcbiAgfSxcbiAgc2F2ZUFzOiBmdW5jdGlvbiBzYXZlQXMocHJlc2V0TmFtZSkge1xuICAgIGlmICghdGhpcy5sb2FkLnJlbWVtYmVyZWQpIHtcbiAgICAgIHRoaXMubG9hZC5yZW1lbWJlcmVkID0ge307XG4gICAgICB0aGlzLmxvYWQucmVtZW1iZXJlZFtERUZBVUxUX0RFRkFVTFRfUFJFU0VUX05BTUVdID0gZ2V0Q3VycmVudFByZXNldCh0aGlzLCB0cnVlKTtcbiAgICB9XG4gICAgdGhpcy5sb2FkLnJlbWVtYmVyZWRbcHJlc2V0TmFtZV0gPSBnZXRDdXJyZW50UHJlc2V0KHRoaXMpO1xuICAgIHRoaXMucHJlc2V0ID0gcHJlc2V0TmFtZTtcbiAgICBhZGRQcmVzZXRPcHRpb24odGhpcywgcHJlc2V0TmFtZSwgdHJ1ZSk7XG4gICAgdGhpcy5zYXZlVG9Mb2NhbFN0b3JhZ2VJZlBvc3NpYmxlKCk7XG4gIH0sXG4gIHJldmVydDogZnVuY3Rpb24gcmV2ZXJ0KGd1aSkge1xuICAgIENvbW1vbi5lYWNoKHRoaXMuX19jb250cm9sbGVycywgZnVuY3Rpb24gKGNvbnRyb2xsZXIpIHtcbiAgICAgIGlmICghdGhpcy5nZXRSb290KCkubG9hZC5yZW1lbWJlcmVkKSB7XG4gICAgICAgIGNvbnRyb2xsZXIuc2V0VmFsdWUoY29udHJvbGxlci5pbml0aWFsVmFsdWUpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmVjYWxsU2F2ZWRWYWx1ZShndWkgfHwgdGhpcy5nZXRSb290KCksIGNvbnRyb2xsZXIpO1xuICAgICAgfVxuICAgICAgaWYgKGNvbnRyb2xsZXIuX19vbkZpbmlzaENoYW5nZSkge1xuICAgICAgICBjb250cm9sbGVyLl9fb25GaW5pc2hDaGFuZ2UuY2FsbChjb250cm9sbGVyLCBjb250cm9sbGVyLmdldFZhbHVlKCkpO1xuICAgICAgfVxuICAgIH0sIHRoaXMpO1xuICAgIENvbW1vbi5lYWNoKHRoaXMuX19mb2xkZXJzLCBmdW5jdGlvbiAoZm9sZGVyKSB7XG4gICAgICBmb2xkZXIucmV2ZXJ0KGZvbGRlcik7XG4gICAgfSk7XG4gICAgaWYgKCFndWkpIHtcbiAgICAgIG1hcmtQcmVzZXRNb2RpZmllZCh0aGlzLmdldFJvb3QoKSwgZmFsc2UpO1xuICAgIH1cbiAgfSxcbiAgbGlzdGVuOiBmdW5jdGlvbiBsaXN0ZW4oY29udHJvbGxlcikge1xuICAgIHZhciBpbml0ID0gdGhpcy5fX2xpc3RlbmluZy5sZW5ndGggPT09IDA7XG4gICAgdGhpcy5fX2xpc3RlbmluZy5wdXNoKGNvbnRyb2xsZXIpO1xuICAgIGlmIChpbml0KSB7XG4gICAgICB1cGRhdGVEaXNwbGF5cyh0aGlzLl9fbGlzdGVuaW5nKTtcbiAgICB9XG4gIH0sXG4gIHVwZGF0ZURpc3BsYXk6IGZ1bmN0aW9uIHVwZGF0ZURpc3BsYXkoKSB7XG4gICAgQ29tbW9uLmVhY2godGhpcy5fX2NvbnRyb2xsZXJzLCBmdW5jdGlvbiAoY29udHJvbGxlcikge1xuICAgICAgY29udHJvbGxlci51cGRhdGVEaXNwbGF5KCk7XG4gICAgfSk7XG4gICAgQ29tbW9uLmVhY2godGhpcy5fX2ZvbGRlcnMsIGZ1bmN0aW9uIChmb2xkZXIpIHtcbiAgICAgIGZvbGRlci51cGRhdGVEaXNwbGF5KCk7XG4gICAgfSk7XG4gIH1cbn0pO1xuZnVuY3Rpb24gYWRkUm93KGd1aSwgbmV3RG9tLCBsaUJlZm9yZSkge1xuICB2YXIgbGkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaScpO1xuICBpZiAobmV3RG9tKSB7XG4gICAgbGkuYXBwZW5kQ2hpbGQobmV3RG9tKTtcbiAgfVxuICBpZiAobGlCZWZvcmUpIHtcbiAgICBndWkuX191bC5pbnNlcnRCZWZvcmUobGksIGxpQmVmb3JlKTtcbiAgfSBlbHNlIHtcbiAgICBndWkuX191bC5hcHBlbmRDaGlsZChsaSk7XG4gIH1cbiAgZ3VpLm9uUmVzaXplKCk7XG4gIHJldHVybiBsaTtcbn1cbmZ1bmN0aW9uIHJlbW92ZUxpc3RlbmVycyhndWkpIHtcbiAgZG9tLnVuYmluZCh3aW5kb3csICdyZXNpemUnLCBndWkuX19yZXNpemVIYW5kbGVyKTtcbiAgaWYgKGd1aS5zYXZlVG9Mb2NhbFN0b3JhZ2VJZlBvc3NpYmxlKSB7XG4gICAgZG9tLnVuYmluZCh3aW5kb3csICd1bmxvYWQnLCBndWkuc2F2ZVRvTG9jYWxTdG9yYWdlSWZQb3NzaWJsZSk7XG4gIH1cbn1cbmZ1bmN0aW9uIG1hcmtQcmVzZXRNb2RpZmllZChndWksIG1vZGlmaWVkKSB7XG4gIHZhciBvcHQgPSBndWkuX19wcmVzZXRfc2VsZWN0W2d1aS5fX3ByZXNldF9zZWxlY3Quc2VsZWN0ZWRJbmRleF07XG4gIGlmIChtb2RpZmllZCkge1xuICAgIG9wdC5pbm5lckhUTUwgPSBvcHQudmFsdWUgKyAnKic7XG4gIH0gZWxzZSB7XG4gICAgb3B0LmlubmVySFRNTCA9IG9wdC52YWx1ZTtcbiAgfVxufVxuZnVuY3Rpb24gYXVnbWVudENvbnRyb2xsZXIoZ3VpLCBsaSwgY29udHJvbGxlcikge1xuICBjb250cm9sbGVyLl9fbGkgPSBsaTtcbiAgY29udHJvbGxlci5fX2d1aSA9IGd1aTtcbiAgQ29tbW9uLmV4dGVuZChjb250cm9sbGVyLCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgIG9wdGlvbnM6IGZ1bmN0aW9uIG9wdGlvbnMoX29wdGlvbnMpIHtcbiAgICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID4gMSkge1xuICAgICAgICB2YXIgbmV4dFNpYmxpbmcgPSBjb250cm9sbGVyLl9fbGkubmV4dEVsZW1lbnRTaWJsaW5nO1xuICAgICAgICBjb250cm9sbGVyLnJlbW92ZSgpO1xuICAgICAgICByZXR1cm4gX2FkZChndWksIGNvbnRyb2xsZXIub2JqZWN0LCBjb250cm9sbGVyLnByb3BlcnR5LCB7XG4gICAgICAgICAgYmVmb3JlOiBuZXh0U2libGluZyxcbiAgICAgICAgICBmYWN0b3J5QXJnczogW0NvbW1vbi50b0FycmF5KGFyZ3VtZW50cyldXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgICAgaWYgKENvbW1vbi5pc0FycmF5KF9vcHRpb25zKSB8fCBDb21tb24uaXNPYmplY3QoX29wdGlvbnMpKSB7XG4gICAgICAgIHZhciBfbmV4dFNpYmxpbmcgPSBjb250cm9sbGVyLl9fbGkubmV4dEVsZW1lbnRTaWJsaW5nO1xuICAgICAgICBjb250cm9sbGVyLnJlbW92ZSgpO1xuICAgICAgICByZXR1cm4gX2FkZChndWksIGNvbnRyb2xsZXIub2JqZWN0LCBjb250cm9sbGVyLnByb3BlcnR5LCB7XG4gICAgICAgICAgYmVmb3JlOiBfbmV4dFNpYmxpbmcsXG4gICAgICAgICAgZmFjdG9yeUFyZ3M6IFtfb3B0aW9uc11cbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfSxcbiAgICBuYW1lOiBmdW5jdGlvbiBuYW1lKF9uYW1lKSB7XG4gICAgICBjb250cm9sbGVyLl9fbGkuZmlyc3RFbGVtZW50Q2hpbGQuZmlyc3RFbGVtZW50Q2hpbGQuaW5uZXJIVE1MID0gX25hbWU7XG4gICAgICByZXR1cm4gY29udHJvbGxlcjtcbiAgICB9LFxuICAgIGxpc3RlbjogZnVuY3Rpb24gbGlzdGVuKCkge1xuICAgICAgY29udHJvbGxlci5fX2d1aS5saXN0ZW4oY29udHJvbGxlcik7XG4gICAgICByZXR1cm4gY29udHJvbGxlcjtcbiAgICB9LFxuICAgIHJlbW92ZTogZnVuY3Rpb24gcmVtb3ZlKCkge1xuICAgICAgY29udHJvbGxlci5fX2d1aS5yZW1vdmUoY29udHJvbGxlcik7XG4gICAgICByZXR1cm4gY29udHJvbGxlcjtcbiAgICB9XG4gIH0pO1xuICBpZiAoY29udHJvbGxlciBpbnN0YW5jZW9mIE51bWJlckNvbnRyb2xsZXJTbGlkZXIpIHtcbiAgICB2YXIgYm94ID0gbmV3IE51bWJlckNvbnRyb2xsZXJCb3goY29udHJvbGxlci5vYmplY3QsIGNvbnRyb2xsZXIucHJvcGVydHksIHsgbWluOiBjb250cm9sbGVyLl9fbWluLCBtYXg6IGNvbnRyb2xsZXIuX19tYXgsIHN0ZXA6IGNvbnRyb2xsZXIuX19zdGVwIH0pO1xuICAgIENvbW1vbi5lYWNoKFsndXBkYXRlRGlzcGxheScsICdvbkNoYW5nZScsICdvbkZpbmlzaENoYW5nZScsICdzdGVwJywgJ21pbicsICdtYXgnXSwgZnVuY3Rpb24gKG1ldGhvZCkge1xuICAgICAgdmFyIHBjID0gY29udHJvbGxlclttZXRob2RdO1xuICAgICAgdmFyIHBiID0gYm94W21ldGhvZF07XG4gICAgICBjb250cm9sbGVyW21ldGhvZF0gPSBib3hbbWV0aG9kXSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGFyZ3MgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMpO1xuICAgICAgICBwYi5hcHBseShib3gsIGFyZ3MpO1xuICAgICAgICByZXR1cm4gcGMuYXBwbHkoY29udHJvbGxlciwgYXJncyk7XG4gICAgICB9O1xuICAgIH0pO1xuICAgIGRvbS5hZGRDbGFzcyhsaSwgJ2hhcy1zbGlkZXInKTtcbiAgICBjb250cm9sbGVyLmRvbUVsZW1lbnQuaW5zZXJ0QmVmb3JlKGJveC5kb21FbGVtZW50LCBjb250cm9sbGVyLmRvbUVsZW1lbnQuZmlyc3RFbGVtZW50Q2hpbGQpO1xuICB9IGVsc2UgaWYgKGNvbnRyb2xsZXIgaW5zdGFuY2VvZiBOdW1iZXJDb250cm9sbGVyQm94KSB7XG4gICAgdmFyIHIgPSBmdW5jdGlvbiByKHJldHVybmVkKSB7XG4gICAgICBpZiAoQ29tbW9uLmlzTnVtYmVyKGNvbnRyb2xsZXIuX19taW4pICYmIENvbW1vbi5pc051bWJlcihjb250cm9sbGVyLl9fbWF4KSkge1xuICAgICAgICB2YXIgb2xkTmFtZSA9IGNvbnRyb2xsZXIuX19saS5maXJzdEVsZW1lbnRDaGlsZC5maXJzdEVsZW1lbnRDaGlsZC5pbm5lckhUTUw7XG4gICAgICAgIHZhciB3YXNMaXN0ZW5pbmcgPSBjb250cm9sbGVyLl9fZ3VpLl9fbGlzdGVuaW5nLmluZGV4T2YoY29udHJvbGxlcikgPiAtMTtcbiAgICAgICAgY29udHJvbGxlci5yZW1vdmUoKTtcbiAgICAgICAgdmFyIG5ld0NvbnRyb2xsZXIgPSBfYWRkKGd1aSwgY29udHJvbGxlci5vYmplY3QsIGNvbnRyb2xsZXIucHJvcGVydHksIHtcbiAgICAgICAgICBiZWZvcmU6IGNvbnRyb2xsZXIuX19saS5uZXh0RWxlbWVudFNpYmxpbmcsXG4gICAgICAgICAgZmFjdG9yeUFyZ3M6IFtjb250cm9sbGVyLl9fbWluLCBjb250cm9sbGVyLl9fbWF4LCBjb250cm9sbGVyLl9fc3RlcF1cbiAgICAgICAgfSk7XG4gICAgICAgIG5ld0NvbnRyb2xsZXIubmFtZShvbGROYW1lKTtcbiAgICAgICAgaWYgKHdhc0xpc3RlbmluZykgbmV3Q29udHJvbGxlci5saXN0ZW4oKTtcbiAgICAgICAgcmV0dXJuIG5ld0NvbnRyb2xsZXI7XG4gICAgICB9XG4gICAgICByZXR1cm4gcmV0dXJuZWQ7XG4gICAgfTtcbiAgICBjb250cm9sbGVyLm1pbiA9IENvbW1vbi5jb21wb3NlKHIsIGNvbnRyb2xsZXIubWluKTtcbiAgICBjb250cm9sbGVyLm1heCA9IENvbW1vbi5jb21wb3NlKHIsIGNvbnRyb2xsZXIubWF4KTtcbiAgfSBlbHNlIGlmIChjb250cm9sbGVyIGluc3RhbmNlb2YgQm9vbGVhbkNvbnRyb2xsZXIpIHtcbiAgICBkb20uYmluZChsaSwgJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xuICAgICAgZG9tLmZha2VFdmVudChjb250cm9sbGVyLl9fY2hlY2tib3gsICdjbGljaycpO1xuICAgIH0pO1xuICAgIGRvbS5iaW5kKGNvbnRyb2xsZXIuX19jaGVja2JveCwgJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHtcbiAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgfSk7XG4gIH0gZWxzZSBpZiAoY29udHJvbGxlciBpbnN0YW5jZW9mIEZ1bmN0aW9uQ29udHJvbGxlcikge1xuICAgIGRvbS5iaW5kKGxpLCAnY2xpY2snLCBmdW5jdGlvbiAoKSB7XG4gICAgICBkb20uZmFrZUV2ZW50KGNvbnRyb2xsZXIuX19idXR0b24sICdjbGljaycpO1xuICAgIH0pO1xuICAgIGRvbS5iaW5kKGxpLCAnbW91c2VvdmVyJywgZnVuY3Rpb24gKCkge1xuICAgICAgZG9tLmFkZENsYXNzKGNvbnRyb2xsZXIuX19idXR0b24sICdob3ZlcicpO1xuICAgIH0pO1xuICAgIGRvbS5iaW5kKGxpLCAnbW91c2VvdXQnLCBmdW5jdGlvbiAoKSB7XG4gICAgICBkb20ucmVtb3ZlQ2xhc3MoY29udHJvbGxlci5fX2J1dHRvbiwgJ2hvdmVyJyk7XG4gICAgfSk7XG4gIH0gZWxzZSBpZiAoY29udHJvbGxlciBpbnN0YW5jZW9mIENvbG9yQ29udHJvbGxlcikge1xuICAgIGRvbS5hZGRDbGFzcyhsaSwgJ2NvbG9yJyk7XG4gICAgY29udHJvbGxlci51cGRhdGVEaXNwbGF5ID0gQ29tbW9uLmNvbXBvc2UoZnVuY3Rpb24gKHZhbCkge1xuICAgICAgbGkuc3R5bGUuYm9yZGVyTGVmdENvbG9yID0gY29udHJvbGxlci5fX2NvbG9yLnRvU3RyaW5nKCk7XG4gICAgICByZXR1cm4gdmFsO1xuICAgIH0sIGNvbnRyb2xsZXIudXBkYXRlRGlzcGxheSk7XG4gICAgY29udHJvbGxlci51cGRhdGVEaXNwbGF5KCk7XG4gIH1cbiAgY29udHJvbGxlci5zZXRWYWx1ZSA9IENvbW1vbi5jb21wb3NlKGZ1bmN0aW9uICh2YWwpIHtcbiAgICBpZiAoZ3VpLmdldFJvb3QoKS5fX3ByZXNldF9zZWxlY3QgJiYgY29udHJvbGxlci5pc01vZGlmaWVkKCkpIHtcbiAgICAgIG1hcmtQcmVzZXRNb2RpZmllZChndWkuZ2V0Um9vdCgpLCB0cnVlKTtcbiAgICB9XG4gICAgcmV0dXJuIHZhbDtcbiAgfSwgY29udHJvbGxlci5zZXRWYWx1ZSk7XG59XG5mdW5jdGlvbiByZWNhbGxTYXZlZFZhbHVlKGd1aSwgY29udHJvbGxlcikge1xuICB2YXIgcm9vdCA9IGd1aS5nZXRSb290KCk7XG4gIHZhciBtYXRjaGVkSW5kZXggPSByb290Ll9fcmVtZW1iZXJlZE9iamVjdHMuaW5kZXhPZihjb250cm9sbGVyLm9iamVjdCk7XG4gIGlmIChtYXRjaGVkSW5kZXggIT09IC0xKSB7XG4gICAgdmFyIGNvbnRyb2xsZXJNYXAgPSByb290Ll9fcmVtZW1iZXJlZE9iamVjdEluZGVjZXNUb0NvbnRyb2xsZXJzW21hdGNoZWRJbmRleF07XG4gICAgaWYgKGNvbnRyb2xsZXJNYXAgPT09IHVuZGVmaW5lZCkge1xuICAgICAgY29udHJvbGxlck1hcCA9IHt9O1xuICAgICAgcm9vdC5fX3JlbWVtYmVyZWRPYmplY3RJbmRlY2VzVG9Db250cm9sbGVyc1ttYXRjaGVkSW5kZXhdID0gY29udHJvbGxlck1hcDtcbiAgICB9XG4gICAgY29udHJvbGxlck1hcFtjb250cm9sbGVyLnByb3BlcnR5XSA9IGNvbnRyb2xsZXI7XG4gICAgaWYgKHJvb3QubG9hZCAmJiByb290LmxvYWQucmVtZW1iZXJlZCkge1xuICAgICAgdmFyIHByZXNldE1hcCA9IHJvb3QubG9hZC5yZW1lbWJlcmVkO1xuICAgICAgdmFyIHByZXNldCA9IHZvaWQgMDtcbiAgICAgIGlmIChwcmVzZXRNYXBbZ3VpLnByZXNldF0pIHtcbiAgICAgICAgcHJlc2V0ID0gcHJlc2V0TWFwW2d1aS5wcmVzZXRdO1xuICAgICAgfSBlbHNlIGlmIChwcmVzZXRNYXBbREVGQVVMVF9ERUZBVUxUX1BSRVNFVF9OQU1FXSkge1xuICAgICAgICBwcmVzZXQgPSBwcmVzZXRNYXBbREVGQVVMVF9ERUZBVUxUX1BSRVNFVF9OQU1FXTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGlmIChwcmVzZXRbbWF0Y2hlZEluZGV4XSAmJiBwcmVzZXRbbWF0Y2hlZEluZGV4XVtjb250cm9sbGVyLnByb3BlcnR5XSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHZhciB2YWx1ZSA9IHByZXNldFttYXRjaGVkSW5kZXhdW2NvbnRyb2xsZXIucHJvcGVydHldO1xuICAgICAgICBjb250cm9sbGVyLmluaXRpYWxWYWx1ZSA9IHZhbHVlO1xuICAgICAgICBjb250cm9sbGVyLnNldFZhbHVlKHZhbHVlKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cbmZ1bmN0aW9uIF9hZGQoZ3VpLCBvYmplY3QsIHByb3BlcnR5LCBwYXJhbXMpIHtcbiAgaWYgKG9iamVjdFtwcm9wZXJ0eV0gPT09IHVuZGVmaW5lZCkge1xuICAgIHRocm93IG5ldyBFcnJvcignT2JqZWN0IFwiJyArIG9iamVjdCArICdcIiBoYXMgbm8gcHJvcGVydHkgXCInICsgcHJvcGVydHkgKyAnXCInKTtcbiAgfVxuICB2YXIgY29udHJvbGxlciA9IHZvaWQgMDtcbiAgaWYgKHBhcmFtcy5jb2xvcikge1xuICAgIGNvbnRyb2xsZXIgPSBuZXcgQ29sb3JDb250cm9sbGVyKG9iamVjdCwgcHJvcGVydHkpO1xuICB9IGVsc2Uge1xuICAgIHZhciBmYWN0b3J5QXJncyA9IFtvYmplY3QsIHByb3BlcnR5XS5jb25jYXQocGFyYW1zLmZhY3RvcnlBcmdzKTtcbiAgICBjb250cm9sbGVyID0gQ29udHJvbGxlckZhY3RvcnkuYXBwbHkoZ3VpLCBmYWN0b3J5QXJncyk7XG4gIH1cbiAgaWYgKHBhcmFtcy5iZWZvcmUgaW5zdGFuY2VvZiBDb250cm9sbGVyKSB7XG4gICAgcGFyYW1zLmJlZm9yZSA9IHBhcmFtcy5iZWZvcmUuX19saTtcbiAgfVxuICByZWNhbGxTYXZlZFZhbHVlKGd1aSwgY29udHJvbGxlcik7XG4gIGRvbS5hZGRDbGFzcyhjb250cm9sbGVyLmRvbUVsZW1lbnQsICdjJyk7XG4gIHZhciBuYW1lID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICBkb20uYWRkQ2xhc3MobmFtZSwgJ3Byb3BlcnR5LW5hbWUnKTtcbiAgbmFtZS5pbm5lckhUTUwgPSBjb250cm9sbGVyLnByb3BlcnR5O1xuICB2YXIgY29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gIGNvbnRhaW5lci5hcHBlbmRDaGlsZChuYW1lKTtcbiAgY29udGFpbmVyLmFwcGVuZENoaWxkKGNvbnRyb2xsZXIuZG9tRWxlbWVudCk7XG4gIHZhciBsaSA9IGFkZFJvdyhndWksIGNvbnRhaW5lciwgcGFyYW1zLmJlZm9yZSk7XG4gIGRvbS5hZGRDbGFzcyhsaSwgR1VJLkNMQVNTX0NPTlRST0xMRVJfUk9XKTtcbiAgaWYgKGNvbnRyb2xsZXIgaW5zdGFuY2VvZiBDb2xvckNvbnRyb2xsZXIpIHtcbiAgICBkb20uYWRkQ2xhc3MobGksICdjb2xvcicpO1xuICB9IGVsc2Uge1xuICAgIGRvbS5hZGRDbGFzcyhsaSwgX3R5cGVvZihjb250cm9sbGVyLmdldFZhbHVlKCkpKTtcbiAgfVxuICBhdWdtZW50Q29udHJvbGxlcihndWksIGxpLCBjb250cm9sbGVyKTtcbiAgZ3VpLl9fY29udHJvbGxlcnMucHVzaChjb250cm9sbGVyKTtcbiAgcmV0dXJuIGNvbnRyb2xsZXI7XG59XG5mdW5jdGlvbiBnZXRMb2NhbFN0b3JhZ2VIYXNoKGd1aSwga2V5KSB7XG4gIHJldHVybiBkb2N1bWVudC5sb2NhdGlvbi5ocmVmICsgJy4nICsga2V5O1xufVxuZnVuY3Rpb24gYWRkUHJlc2V0T3B0aW9uKGd1aSwgbmFtZSwgc2V0U2VsZWN0ZWQpIHtcbiAgdmFyIG9wdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ29wdGlvbicpO1xuICBvcHQuaW5uZXJIVE1MID0gbmFtZTtcbiAgb3B0LnZhbHVlID0gbmFtZTtcbiAgZ3VpLl9fcHJlc2V0X3NlbGVjdC5hcHBlbmRDaGlsZChvcHQpO1xuICBpZiAoc2V0U2VsZWN0ZWQpIHtcbiAgICBndWkuX19wcmVzZXRfc2VsZWN0LnNlbGVjdGVkSW5kZXggPSBndWkuX19wcmVzZXRfc2VsZWN0Lmxlbmd0aCAtIDE7XG4gIH1cbn1cbmZ1bmN0aW9uIHNob3dIaWRlRXhwbGFpbihndWksIGV4cGxhaW4pIHtcbiAgZXhwbGFpbi5zdHlsZS5kaXNwbGF5ID0gZ3VpLnVzZUxvY2FsU3RvcmFnZSA/ICdibG9jaycgOiAnbm9uZSc7XG59XG5mdW5jdGlvbiBhZGRTYXZlTWVudShndWkpIHtcbiAgdmFyIGRpdiA9IGd1aS5fX3NhdmVfcm93ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGknKTtcbiAgZG9tLmFkZENsYXNzKGd1aS5kb21FbGVtZW50LCAnaGFzLXNhdmUnKTtcbiAgZ3VpLl9fdWwuaW5zZXJ0QmVmb3JlKGRpdiwgZ3VpLl9fdWwuZmlyc3RDaGlsZCk7XG4gIGRvbS5hZGRDbGFzcyhkaXYsICdzYXZlLXJvdycpO1xuICB2YXIgZ2VhcnMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gIGdlYXJzLmlubmVySFRNTCA9ICcmbmJzcDsnO1xuICBkb20uYWRkQ2xhc3MoZ2VhcnMsICdidXR0b24gZ2VhcnMnKTtcbiAgdmFyIGJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcbiAgYnV0dG9uLmlubmVySFRNTCA9ICdTYXZlJztcbiAgZG9tLmFkZENsYXNzKGJ1dHRvbiwgJ2J1dHRvbicpO1xuICBkb20uYWRkQ2xhc3MoYnV0dG9uLCAnc2F2ZScpO1xuICB2YXIgYnV0dG9uMiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcbiAgYnV0dG9uMi5pbm5lckhUTUwgPSAnTmV3JztcbiAgZG9tLmFkZENsYXNzKGJ1dHRvbjIsICdidXR0b24nKTtcbiAgZG9tLmFkZENsYXNzKGJ1dHRvbjIsICdzYXZlLWFzJyk7XG4gIHZhciBidXR0b24zID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICBidXR0b24zLmlubmVySFRNTCA9ICdSZXZlcnQnO1xuICBkb20uYWRkQ2xhc3MoYnV0dG9uMywgJ2J1dHRvbicpO1xuICBkb20uYWRkQ2xhc3MoYnV0dG9uMywgJ3JldmVydCcpO1xuICB2YXIgc2VsZWN0ID0gZ3VpLl9fcHJlc2V0X3NlbGVjdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NlbGVjdCcpO1xuICBpZiAoZ3VpLmxvYWQgJiYgZ3VpLmxvYWQucmVtZW1iZXJlZCkge1xuICAgIENvbW1vbi5lYWNoKGd1aS5sb2FkLnJlbWVtYmVyZWQsIGZ1bmN0aW9uICh2YWx1ZSwga2V5KSB7XG4gICAgICBhZGRQcmVzZXRPcHRpb24oZ3VpLCBrZXksIGtleSA9PT0gZ3VpLnByZXNldCk7XG4gICAgfSk7XG4gIH0gZWxzZSB7XG4gICAgYWRkUHJlc2V0T3B0aW9uKGd1aSwgREVGQVVMVF9ERUZBVUxUX1BSRVNFVF9OQU1FLCBmYWxzZSk7XG4gIH1cbiAgZG9tLmJpbmQoc2VsZWN0LCAnY2hhbmdlJywgZnVuY3Rpb24gKCkge1xuICAgIGZvciAodmFyIGluZGV4ID0gMDsgaW5kZXggPCBndWkuX19wcmVzZXRfc2VsZWN0Lmxlbmd0aDsgaW5kZXgrKykge1xuICAgICAgZ3VpLl9fcHJlc2V0X3NlbGVjdFtpbmRleF0uaW5uZXJIVE1MID0gZ3VpLl9fcHJlc2V0X3NlbGVjdFtpbmRleF0udmFsdWU7XG4gICAgfVxuICAgIGd1aS5wcmVzZXQgPSB0aGlzLnZhbHVlO1xuICB9KTtcbiAgZGl2LmFwcGVuZENoaWxkKHNlbGVjdCk7XG4gIGRpdi5hcHBlbmRDaGlsZChnZWFycyk7XG4gIGRpdi5hcHBlbmRDaGlsZChidXR0b24pO1xuICBkaXYuYXBwZW5kQ2hpbGQoYnV0dG9uMik7XG4gIGRpdi5hcHBlbmRDaGlsZChidXR0b24zKTtcbiAgaWYgKFNVUFBPUlRTX0xPQ0FMX1NUT1JBR0UpIHtcbiAgICB2YXIgZXhwbGFpbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdkZy1sb2NhbC1leHBsYWluJyk7XG4gICAgdmFyIGxvY2FsU3RvcmFnZUNoZWNrQm94ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2RnLWxvY2FsLXN0b3JhZ2UnKTtcbiAgICB2YXIgc2F2ZUxvY2FsbHkgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZGctc2F2ZS1sb2NhbGx5Jyk7XG4gICAgc2F2ZUxvY2FsbHkuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XG4gICAgaWYgKGxvY2FsU3RvcmFnZS5nZXRJdGVtKGdldExvY2FsU3RvcmFnZUhhc2goZ3VpLCAnaXNMb2NhbCcpKSA9PT0gJ3RydWUnKSB7XG4gICAgICBsb2NhbFN0b3JhZ2VDaGVja0JveC5zZXRBdHRyaWJ1dGUoJ2NoZWNrZWQnLCAnY2hlY2tlZCcpO1xuICAgIH1cbiAgICBzaG93SGlkZUV4cGxhaW4oZ3VpLCBleHBsYWluKTtcbiAgICBkb20uYmluZChsb2NhbFN0b3JhZ2VDaGVja0JveCwgJ2NoYW5nZScsIGZ1bmN0aW9uICgpIHtcbiAgICAgIGd1aS51c2VMb2NhbFN0b3JhZ2UgPSAhZ3VpLnVzZUxvY2FsU3RvcmFnZTtcbiAgICAgIHNob3dIaWRlRXhwbGFpbihndWksIGV4cGxhaW4pO1xuICAgIH0pO1xuICB9XG4gIHZhciBuZXdDb25zdHJ1Y3RvclRleHRBcmVhID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2RnLW5ldy1jb25zdHJ1Y3RvcicpO1xuICBkb20uYmluZChuZXdDb25zdHJ1Y3RvclRleHRBcmVhLCAna2V5ZG93bicsIGZ1bmN0aW9uIChlKSB7XG4gICAgaWYgKGUubWV0YUtleSAmJiAoZS53aGljaCA9PT0gNjcgfHwgZS5rZXlDb2RlID09PSA2NykpIHtcbiAgICAgIFNBVkVfRElBTE9HVUUuaGlkZSgpO1xuICAgIH1cbiAgfSk7XG4gIGRvbS5iaW5kKGdlYXJzLCAnY2xpY2snLCBmdW5jdGlvbiAoKSB7XG4gICAgbmV3Q29uc3RydWN0b3JUZXh0QXJlYS5pbm5lckhUTUwgPSBKU09OLnN0cmluZ2lmeShndWkuZ2V0U2F2ZU9iamVjdCgpLCB1bmRlZmluZWQsIDIpO1xuICAgIFNBVkVfRElBTE9HVUUuc2hvdygpO1xuICAgIG5ld0NvbnN0cnVjdG9yVGV4dEFyZWEuZm9jdXMoKTtcbiAgICBuZXdDb25zdHJ1Y3RvclRleHRBcmVhLnNlbGVjdCgpO1xuICB9KTtcbiAgZG9tLmJpbmQoYnV0dG9uLCAnY2xpY2snLCBmdW5jdGlvbiAoKSB7XG4gICAgZ3VpLnNhdmUoKTtcbiAgfSk7XG4gIGRvbS5iaW5kKGJ1dHRvbjIsICdjbGljaycsIGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgcHJlc2V0TmFtZSA9IHByb21wdCgnRW50ZXIgYSBuZXcgcHJlc2V0IG5hbWUuJyk7XG4gICAgaWYgKHByZXNldE5hbWUpIHtcbiAgICAgIGd1aS5zYXZlQXMocHJlc2V0TmFtZSk7XG4gICAgfVxuICB9KTtcbiAgZG9tLmJpbmQoYnV0dG9uMywgJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xuICAgIGd1aS5yZXZlcnQoKTtcbiAgfSk7XG59XG5mdW5jdGlvbiBhZGRSZXNpemVIYW5kbGUoZ3VpKSB7XG4gIHZhciBwbW91c2VYID0gdm9pZCAwO1xuICBndWkuX19yZXNpemVfaGFuZGxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gIENvbW1vbi5leHRlbmQoZ3VpLl9fcmVzaXplX2hhbmRsZS5zdHlsZSwge1xuICAgIHdpZHRoOiAnNnB4JyxcbiAgICBtYXJnaW5MZWZ0OiAnLTNweCcsXG4gICAgaGVpZ2h0OiAnMjAwcHgnLFxuICAgIGN1cnNvcjogJ2V3LXJlc2l6ZScsXG4gICAgcG9zaXRpb246ICdhYnNvbHV0ZSdcbiAgfSk7XG4gIGZ1bmN0aW9uIGRyYWcoZSkge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICBndWkud2lkdGggKz0gcG1vdXNlWCAtIGUuY2xpZW50WDtcbiAgICBndWkub25SZXNpemUoKTtcbiAgICBwbW91c2VYID0gZS5jbGllbnRYO1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICBmdW5jdGlvbiBkcmFnU3RvcCgpIHtcbiAgICBkb20ucmVtb3ZlQ2xhc3MoZ3VpLl9fY2xvc2VCdXR0b24sIEdVSS5DTEFTU19EUkFHKTtcbiAgICBkb20udW5iaW5kKHdpbmRvdywgJ21vdXNlbW92ZScsIGRyYWcpO1xuICAgIGRvbS51bmJpbmQod2luZG93LCAnbW91c2V1cCcsIGRyYWdTdG9wKTtcbiAgfVxuICBmdW5jdGlvbiBkcmFnU3RhcnQoZSkge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICBwbW91c2VYID0gZS5jbGllbnRYO1xuICAgIGRvbS5hZGRDbGFzcyhndWkuX19jbG9zZUJ1dHRvbiwgR1VJLkNMQVNTX0RSQUcpO1xuICAgIGRvbS5iaW5kKHdpbmRvdywgJ21vdXNlbW92ZScsIGRyYWcpO1xuICAgIGRvbS5iaW5kKHdpbmRvdywgJ21vdXNldXAnLCBkcmFnU3RvcCk7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIGRvbS5iaW5kKGd1aS5fX3Jlc2l6ZV9oYW5kbGUsICdtb3VzZWRvd24nLCBkcmFnU3RhcnQpO1xuICBkb20uYmluZChndWkuX19jbG9zZUJ1dHRvbiwgJ21vdXNlZG93bicsIGRyYWdTdGFydCk7XG4gIGd1aS5kb21FbGVtZW50Lmluc2VydEJlZm9yZShndWkuX19yZXNpemVfaGFuZGxlLCBndWkuZG9tRWxlbWVudC5maXJzdEVsZW1lbnRDaGlsZCk7XG59XG5mdW5jdGlvbiBzZXRXaWR0aChndWksIHcpIHtcbiAgZ3VpLmRvbUVsZW1lbnQuc3R5bGUud2lkdGggPSB3ICsgJ3B4JztcbiAgaWYgKGd1aS5fX3NhdmVfcm93ICYmIGd1aS5hdXRvUGxhY2UpIHtcbiAgICBndWkuX19zYXZlX3Jvdy5zdHlsZS53aWR0aCA9IHcgKyAncHgnO1xuICB9XG4gIGlmIChndWkuX19jbG9zZUJ1dHRvbikge1xuICAgIGd1aS5fX2Nsb3NlQnV0dG9uLnN0eWxlLndpZHRoID0gdyArICdweCc7XG4gIH1cbn1cbmZ1bmN0aW9uIGdldEN1cnJlbnRQcmVzZXQoZ3VpLCB1c2VJbml0aWFsVmFsdWVzKSB7XG4gIHZhciB0b1JldHVybiA9IHt9O1xuICBDb21tb24uZWFjaChndWkuX19yZW1lbWJlcmVkT2JqZWN0cywgZnVuY3Rpb24gKHZhbCwgaW5kZXgpIHtcbiAgICB2YXIgc2F2ZWRWYWx1ZXMgPSB7fTtcbiAgICB2YXIgY29udHJvbGxlck1hcCA9IGd1aS5fX3JlbWVtYmVyZWRPYmplY3RJbmRlY2VzVG9Db250cm9sbGVyc1tpbmRleF07XG4gICAgQ29tbW9uLmVhY2goY29udHJvbGxlck1hcCwgZnVuY3Rpb24gKGNvbnRyb2xsZXIsIHByb3BlcnR5KSB7XG4gICAgICBzYXZlZFZhbHVlc1twcm9wZXJ0eV0gPSB1c2VJbml0aWFsVmFsdWVzID8gY29udHJvbGxlci5pbml0aWFsVmFsdWUgOiBjb250cm9sbGVyLmdldFZhbHVlKCk7XG4gICAgfSk7XG4gICAgdG9SZXR1cm5baW5kZXhdID0gc2F2ZWRWYWx1ZXM7XG4gIH0pO1xuICByZXR1cm4gdG9SZXR1cm47XG59XG5mdW5jdGlvbiBzZXRQcmVzZXRTZWxlY3RJbmRleChndWkpIHtcbiAgZm9yICh2YXIgaW5kZXggPSAwOyBpbmRleCA8IGd1aS5fX3ByZXNldF9zZWxlY3QubGVuZ3RoOyBpbmRleCsrKSB7XG4gICAgaWYgKGd1aS5fX3ByZXNldF9zZWxlY3RbaW5kZXhdLnZhbHVlID09PSBndWkucHJlc2V0KSB7XG4gICAgICBndWkuX19wcmVzZXRfc2VsZWN0LnNlbGVjdGVkSW5kZXggPSBpbmRleDtcbiAgICB9XG4gIH1cbn1cbmZ1bmN0aW9uIHVwZGF0ZURpc3BsYXlzKGNvbnRyb2xsZXJBcnJheSkge1xuICBpZiAoY29udHJvbGxlckFycmF5Lmxlbmd0aCAhPT0gMCkge1xuICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSQxLmNhbGwod2luZG93LCBmdW5jdGlvbiAoKSB7XG4gICAgICB1cGRhdGVEaXNwbGF5cyhjb250cm9sbGVyQXJyYXkpO1xuICAgIH0pO1xuICB9XG4gIENvbW1vbi5lYWNoKGNvbnRyb2xsZXJBcnJheSwgZnVuY3Rpb24gKGMpIHtcbiAgICBjLnVwZGF0ZURpc3BsYXkoKTtcbiAgfSk7XG59XG5cbnZhciBjb2xvciA9IHtcbiAgQ29sb3I6IENvbG9yLFxuICBtYXRoOiBDb2xvck1hdGgsXG4gIGludGVycHJldDogaW50ZXJwcmV0XG59O1xudmFyIGNvbnRyb2xsZXJzID0ge1xuICBDb250cm9sbGVyOiBDb250cm9sbGVyLFxuICBCb29sZWFuQ29udHJvbGxlcjogQm9vbGVhbkNvbnRyb2xsZXIsXG4gIE9wdGlvbkNvbnRyb2xsZXI6IE9wdGlvbkNvbnRyb2xsZXIsXG4gIFN0cmluZ0NvbnRyb2xsZXI6IFN0cmluZ0NvbnRyb2xsZXIsXG4gIE51bWJlckNvbnRyb2xsZXI6IE51bWJlckNvbnRyb2xsZXIsXG4gIE51bWJlckNvbnRyb2xsZXJCb3g6IE51bWJlckNvbnRyb2xsZXJCb3gsXG4gIE51bWJlckNvbnRyb2xsZXJTbGlkZXI6IE51bWJlckNvbnRyb2xsZXJTbGlkZXIsXG4gIEZ1bmN0aW9uQ29udHJvbGxlcjogRnVuY3Rpb25Db250cm9sbGVyLFxuICBDb2xvckNvbnRyb2xsZXI6IENvbG9yQ29udHJvbGxlclxufTtcbnZhciBkb20kMSA9IHsgZG9tOiBkb20gfTtcbnZhciBndWkgPSB7IEdVSTogR1VJIH07XG52YXIgR1VJJDEgPSBHVUk7XG52YXIgaW5kZXggPSB7XG4gIGNvbG9yOiBjb2xvcixcbiAgY29udHJvbGxlcnM6IGNvbnRyb2xsZXJzLFxuICBkb206IGRvbSQxLFxuICBndWk6IGd1aSxcbiAgR1VJOiBHVUkkMVxufTtcblxuZXhwb3J0IHsgY29sb3IsIGNvbnRyb2xsZXJzLCBkb20kMSBhcyBkb20sIGd1aSwgR1VJJDEgYXMgR1VJIH07XG5leHBvcnQgZGVmYXVsdCBpbmRleDtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWRhdC5ndWkubW9kdWxlLmpzLm1hcFxuIiwiXG5jb25zdCBFUFNJTE9OID0gTWF0aC5wb3coMiwgLTUyKTtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRGVsYXVuYXRvciB7XG5cbiAgICBzdGF0aWMgZnJvbShwb2ludHMsIGdldFgsIGdldFkpIHtcbiAgICAgICAgaWYgKCFnZXRYKSBnZXRYID0gZGVmYXVsdEdldFg7XG4gICAgICAgIGlmICghZ2V0WSkgZ2V0WSA9IGRlZmF1bHRHZXRZO1xuXG4gICAgICAgIGNvbnN0IG4gPSBwb2ludHMubGVuZ3RoO1xuICAgICAgICBjb25zdCBjb29yZHMgPSBuZXcgRmxvYXQ2NEFycmF5KG4gKiAyKTtcblxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG47IGkrKykge1xuICAgICAgICAgICAgY29uc3QgcCA9IHBvaW50c1tpXTtcbiAgICAgICAgICAgIGNvb3Jkc1syICogaV0gPSBnZXRYKHApO1xuICAgICAgICAgICAgY29vcmRzWzIgKiBpICsgMV0gPSBnZXRZKHApO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIG5ldyBEZWxhdW5hdG9yKGNvb3Jkcyk7XG4gICAgfVxuXG4gICAgY29uc3RydWN0b3IoY29vcmRzKSB7XG4gICAgICAgIGxldCBtaW5YID0gSW5maW5pdHk7XG4gICAgICAgIGxldCBtaW5ZID0gSW5maW5pdHk7XG4gICAgICAgIGxldCBtYXhYID0gLUluZmluaXR5O1xuICAgICAgICBsZXQgbWF4WSA9IC1JbmZpbml0eTtcblxuICAgICAgICBjb25zdCBuID0gY29vcmRzLmxlbmd0aCA+PiAxO1xuICAgICAgICBjb25zdCBpZHMgPSB0aGlzLmlkcyA9IG5ldyBVaW50MzJBcnJheShuKTtcblxuICAgICAgICBpZiAobiA+IDAgJiYgdHlwZW9mIGNvb3Jkc1swXSAhPT0gJ251bWJlcicpIHRocm93IG5ldyBFcnJvcignRXhwZWN0ZWQgY29vcmRzIHRvIGNvbnRhaW4gbnVtYmVycy4nKTtcblxuICAgICAgICB0aGlzLmNvb3JkcyA9IGNvb3JkcztcblxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG47IGkrKykge1xuICAgICAgICAgICAgY29uc3QgeCA9IGNvb3Jkc1syICogaV07XG4gICAgICAgICAgICBjb25zdCB5ID0gY29vcmRzWzIgKiBpICsgMV07XG4gICAgICAgICAgICBpZiAoeCA8IG1pblgpIG1pblggPSB4O1xuICAgICAgICAgICAgaWYgKHkgPCBtaW5ZKSBtaW5ZID0geTtcbiAgICAgICAgICAgIGlmICh4ID4gbWF4WCkgbWF4WCA9IHg7XG4gICAgICAgICAgICBpZiAoeSA+IG1heFkpIG1heFkgPSB5O1xuICAgICAgICAgICAgaWRzW2ldID0gaTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGN4ID0gKG1pblggKyBtYXhYKSAvIDI7XG4gICAgICAgIGNvbnN0IGN5ID0gKG1pblkgKyBtYXhZKSAvIDI7XG5cbiAgICAgICAgbGV0IG1pbkRpc3QgPSBJbmZpbml0eTtcbiAgICAgICAgbGV0IGkwLCBpMSwgaTI7XG5cbiAgICAgICAgLy8gcGljayBhIHNlZWQgcG9pbnQgY2xvc2UgdG8gdGhlIGNlbnRyb2lkXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbjsgaSsrKSB7XG4gICAgICAgICAgICBjb25zdCBkID0gZGlzdChjeCwgY3ksIGNvb3Jkc1syICogaV0sIGNvb3Jkc1syICogaSArIDFdKTtcbiAgICAgICAgICAgIGlmIChkIDwgbWluRGlzdCkge1xuICAgICAgICAgICAgICAgIGkwID0gaTtcbiAgICAgICAgICAgICAgICBtaW5EaXN0ID0gZDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBjb25zdCBpMHggPSBjb29yZHNbMiAqIGkwXTtcbiAgICAgICAgY29uc3QgaTB5ID0gY29vcmRzWzIgKiBpMCArIDFdO1xuXG4gICAgICAgIG1pbkRpc3QgPSBJbmZpbml0eTtcblxuICAgICAgICAvLyBmaW5kIHRoZSBwb2ludCBjbG9zZXN0IHRvIHRoZSBzZWVkXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbjsgaSsrKSB7XG4gICAgICAgICAgICBpZiAoaSA9PT0gaTApIGNvbnRpbnVlO1xuICAgICAgICAgICAgY29uc3QgZCA9IGRpc3QoaTB4LCBpMHksIGNvb3Jkc1syICogaV0sIGNvb3Jkc1syICogaSArIDFdKTtcbiAgICAgICAgICAgIGlmIChkIDwgbWluRGlzdCAmJiBkID4gMCkge1xuICAgICAgICAgICAgICAgIGkxID0gaTtcbiAgICAgICAgICAgICAgICBtaW5EaXN0ID0gZDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBsZXQgaTF4ID0gY29vcmRzWzIgKiBpMV07XG4gICAgICAgIGxldCBpMXkgPSBjb29yZHNbMiAqIGkxICsgMV07XG5cbiAgICAgICAgbGV0IG1pblJhZGl1cyA9IEluZmluaXR5O1xuXG4gICAgICAgIC8vIGZpbmQgdGhlIHRoaXJkIHBvaW50IHdoaWNoIGZvcm1zIHRoZSBzbWFsbGVzdCBjaXJjdW1jaXJjbGUgd2l0aCB0aGUgZmlyc3QgdHdvXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbjsgaSsrKSB7XG4gICAgICAgICAgICBpZiAoaSA9PT0gaTAgfHwgaSA9PT0gaTEpIGNvbnRpbnVlO1xuICAgICAgICAgICAgY29uc3QgciA9IGNpcmN1bXJhZGl1cyhpMHgsIGkweSwgaTF4LCBpMXksIGNvb3Jkc1syICogaV0sIGNvb3Jkc1syICogaSArIDFdKTtcbiAgICAgICAgICAgIGlmIChyIDwgbWluUmFkaXVzKSB7XG4gICAgICAgICAgICAgICAgaTIgPSBpO1xuICAgICAgICAgICAgICAgIG1pblJhZGl1cyA9IHI7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgbGV0IGkyeCA9IGNvb3Jkc1syICogaTJdO1xuICAgICAgICBsZXQgaTJ5ID0gY29vcmRzWzIgKiBpMiArIDFdO1xuXG4gICAgICAgIGlmIChtaW5SYWRpdXMgPT09IEluZmluaXR5KSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ05vIERlbGF1bmF5IHRyaWFuZ3VsYXRpb24gZXhpc3RzIGZvciB0aGlzIGlucHV0LicpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gc3dhcCB0aGUgb3JkZXIgb2YgdGhlIHNlZWQgcG9pbnRzIGZvciBjb3VudGVyLWNsb2Nrd2lzZSBvcmllbnRhdGlvblxuICAgICAgICBpZiAob3JpZW50KGkweCwgaTB5LCBpMXgsIGkxeSwgaTJ4LCBpMnkpKSB7XG4gICAgICAgICAgICBjb25zdCBpID0gaTE7XG4gICAgICAgICAgICBjb25zdCB4ID0gaTF4O1xuICAgICAgICAgICAgY29uc3QgeSA9IGkxeTtcbiAgICAgICAgICAgIGkxID0gaTI7XG4gICAgICAgICAgICBpMXggPSBpMng7XG4gICAgICAgICAgICBpMXkgPSBpMnk7XG4gICAgICAgICAgICBpMiA9IGk7XG4gICAgICAgICAgICBpMnggPSB4O1xuICAgICAgICAgICAgaTJ5ID0geTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGNlbnRlciA9IGNpcmN1bWNlbnRlcihpMHgsIGkweSwgaTF4LCBpMXksIGkyeCwgaTJ5KTtcbiAgICAgICAgdGhpcy5fY3ggPSBjZW50ZXIueDtcbiAgICAgICAgdGhpcy5fY3kgPSBjZW50ZXIueTtcblxuICAgICAgICAvLyBzb3J0IHRoZSBwb2ludHMgYnkgZGlzdGFuY2UgZnJvbSB0aGUgc2VlZCB0cmlhbmdsZSBjaXJjdW1jZW50ZXJcbiAgICAgICAgcXVpY2tzb3J0KGlkcywgY29vcmRzLCAwLCBpZHMubGVuZ3RoIC0gMSwgY2VudGVyLngsIGNlbnRlci55KTtcblxuICAgICAgICAvLyBpbml0aWFsaXplIGEgaGFzaCB0YWJsZSBmb3Igc3RvcmluZyBlZGdlcyBvZiB0aGUgYWR2YW5jaW5nIGNvbnZleCBodWxsXG4gICAgICAgIHRoaXMuX2hhc2hTaXplID0gTWF0aC5jZWlsKE1hdGguc3FydChuKSk7XG4gICAgICAgIHRoaXMuX2hhc2ggPSBuZXcgQXJyYXkodGhpcy5faGFzaFNpemUpO1xuXG4gICAgICAgIC8vIGluaXRpYWxpemUgYSBjaXJjdWxhciBkb3VibHktbGlua2VkIGxpc3QgdGhhdCB3aWxsIGhvbGQgYW4gYWR2YW5jaW5nIGNvbnZleCBodWxsXG4gICAgICAgIGxldCBlID0gdGhpcy5odWxsID0gaW5zZXJ0Tm9kZShjb29yZHMsIGkwKTtcbiAgICAgICAgdGhpcy5faGFzaEVkZ2UoZSk7XG4gICAgICAgIGUudCA9IDA7XG4gICAgICAgIGUgPSBpbnNlcnROb2RlKGNvb3JkcywgaTEsIGUpO1xuICAgICAgICB0aGlzLl9oYXNoRWRnZShlKTtcbiAgICAgICAgZS50ID0gMTtcbiAgICAgICAgZSA9IGluc2VydE5vZGUoY29vcmRzLCBpMiwgZSk7XG4gICAgICAgIHRoaXMuX2hhc2hFZGdlKGUpO1xuICAgICAgICBlLnQgPSAyO1xuXG4gICAgICAgIGNvbnN0IG1heFRyaWFuZ2xlcyA9IDIgKiBuIC0gNTtcbiAgICAgICAgY29uc3QgdHJpYW5nbGVzID0gdGhpcy50cmlhbmdsZXMgPSBuZXcgVWludDMyQXJyYXkobWF4VHJpYW5nbGVzICogMyk7XG4gICAgICAgIGNvbnN0IGhhbGZlZGdlcyA9IHRoaXMuaGFsZmVkZ2VzID0gbmV3IEludDMyQXJyYXkobWF4VHJpYW5nbGVzICogMyk7XG5cbiAgICAgICAgdGhpcy50cmlhbmdsZXNMZW4gPSAwO1xuXG4gICAgICAgIHRoaXMuX2FkZFRyaWFuZ2xlKGkwLCBpMSwgaTIsIC0xLCAtMSwgLTEpO1xuXG4gICAgICAgIGZvciAobGV0IGsgPSAwLCB4cCwgeXA7IGsgPCBpZHMubGVuZ3RoOyBrKyspIHtcbiAgICAgICAgICAgIGNvbnN0IGkgPSBpZHNba107XG4gICAgICAgICAgICBjb25zdCB4ID0gY29vcmRzWzIgKiBpXTtcbiAgICAgICAgICAgIGNvbnN0IHkgPSBjb29yZHNbMiAqIGkgKyAxXTtcblxuICAgICAgICAgICAgLy8gc2tpcCBuZWFyLWR1cGxpY2F0ZSBwb2ludHNcbiAgICAgICAgICAgIGlmIChrID4gMCAmJiBNYXRoLmFicyh4IC0geHApIDw9IEVQU0lMT04gJiYgTWF0aC5hYnMoeSAtIHlwKSA8PSBFUFNJTE9OKSBjb250aW51ZTtcbiAgICAgICAgICAgIHhwID0geDtcbiAgICAgICAgICAgIHlwID0geTtcblxuICAgICAgICAgICAgLy8gc2tpcCBzZWVkIHRyaWFuZ2xlIHBvaW50c1xuICAgICAgICAgICAgaWYgKGkgPT09IGkwIHx8IGkgPT09IGkxIHx8IGkgPT09IGkyKSBjb250aW51ZTtcblxuICAgICAgICAgICAgLy8gZmluZCBhIHZpc2libGUgZWRnZSBvbiB0aGUgY29udmV4IGh1bGwgdXNpbmcgZWRnZSBoYXNoXG4gICAgICAgICAgICBjb25zdCBzdGFydEtleSA9IHRoaXMuX2hhc2hLZXkoeCwgeSk7XG4gICAgICAgICAgICBsZXQga2V5ID0gc3RhcnRLZXk7XG4gICAgICAgICAgICBsZXQgc3RhcnQ7XG4gICAgICAgICAgICBkbyB7XG4gICAgICAgICAgICAgICAgc3RhcnQgPSB0aGlzLl9oYXNoW2tleV07XG4gICAgICAgICAgICAgICAga2V5ID0gKGtleSArIDEpICUgdGhpcy5faGFzaFNpemU7XG4gICAgICAgICAgICB9IHdoaWxlICgoIXN0YXJ0IHx8IHN0YXJ0LnJlbW92ZWQpICYmIGtleSAhPT0gc3RhcnRLZXkpO1xuXG4gICAgICAgICAgICBzdGFydCA9IHN0YXJ0LnByZXY7XG4gICAgICAgICAgICBlID0gc3RhcnQ7XG4gICAgICAgICAgICB3aGlsZSAoIW9yaWVudCh4LCB5LCBlLngsIGUueSwgZS5uZXh0LngsIGUubmV4dC55KSkge1xuICAgICAgICAgICAgICAgIGUgPSBlLm5leHQ7XG4gICAgICAgICAgICAgICAgaWYgKGUgPT09IHN0YXJ0KSB7XG4gICAgICAgICAgICAgICAgICAgIGUgPSBudWxsO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBsaWtlbHkgYSBuZWFyLWR1cGxpY2F0ZSBwb2ludDsgc2tpcCBpdFxuICAgICAgICAgICAgaWYgKCFlKSBjb250aW51ZTtcblxuICAgICAgICAgICAgY29uc3Qgd2Fsa0JhY2sgPSBlID09PSBzdGFydDtcblxuICAgICAgICAgICAgLy8gYWRkIHRoZSBmaXJzdCB0cmlhbmdsZSBmcm9tIHRoZSBwb2ludFxuICAgICAgICAgICAgbGV0IHQgPSB0aGlzLl9hZGRUcmlhbmdsZShlLmksIGksIGUubmV4dC5pLCAtMSwgLTEsIGUudCk7XG5cbiAgICAgICAgICAgIGUudCA9IHQ7IC8vIGtlZXAgdHJhY2sgb2YgYm91bmRhcnkgdHJpYW5nbGVzIG9uIHRoZSBodWxsXG4gICAgICAgICAgICBlID0gaW5zZXJ0Tm9kZShjb29yZHMsIGksIGUpO1xuXG4gICAgICAgICAgICAvLyByZWN1cnNpdmVseSBmbGlwIHRyaWFuZ2xlcyBmcm9tIHRoZSBwb2ludCB1bnRpbCB0aGV5IHNhdGlzZnkgdGhlIERlbGF1bmF5IGNvbmRpdGlvblxuICAgICAgICAgICAgZS50ID0gdGhpcy5fbGVnYWxpemUodCArIDIpO1xuXG4gICAgICAgICAgICAvLyB3YWxrIGZvcndhcmQgdGhyb3VnaCB0aGUgaHVsbCwgYWRkaW5nIG1vcmUgdHJpYW5nbGVzIGFuZCBmbGlwcGluZyByZWN1cnNpdmVseVxuICAgICAgICAgICAgbGV0IHEgPSBlLm5leHQ7XG4gICAgICAgICAgICB3aGlsZSAob3JpZW50KHgsIHksIHEueCwgcS55LCBxLm5leHQueCwgcS5uZXh0LnkpKSB7XG4gICAgICAgICAgICAgICAgdCA9IHRoaXMuX2FkZFRyaWFuZ2xlKHEuaSwgaSwgcS5uZXh0LmksIHEucHJldi50LCAtMSwgcS50KTtcbiAgICAgICAgICAgICAgICBxLnByZXYudCA9IHRoaXMuX2xlZ2FsaXplKHQgKyAyKTtcbiAgICAgICAgICAgICAgICB0aGlzLmh1bGwgPSByZW1vdmVOb2RlKHEpO1xuICAgICAgICAgICAgICAgIHEgPSBxLm5leHQ7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICh3YWxrQmFjaykge1xuICAgICAgICAgICAgICAgIC8vIHdhbGsgYmFja3dhcmQgZnJvbSB0aGUgb3RoZXIgc2lkZSwgYWRkaW5nIG1vcmUgdHJpYW5nbGVzIGFuZCBmbGlwcGluZ1xuICAgICAgICAgICAgICAgIHEgPSBlLnByZXY7XG4gICAgICAgICAgICAgICAgd2hpbGUgKG9yaWVudCh4LCB5LCBxLnByZXYueCwgcS5wcmV2LnksIHEueCwgcS55KSkge1xuICAgICAgICAgICAgICAgICAgICB0ID0gdGhpcy5fYWRkVHJpYW5nbGUocS5wcmV2LmksIGksIHEuaSwgLTEsIHEudCwgcS5wcmV2LnQpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9sZWdhbGl6ZSh0ICsgMik7XG4gICAgICAgICAgICAgICAgICAgIHEucHJldi50ID0gdDtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5odWxsID0gcmVtb3ZlTm9kZShxKTtcbiAgICAgICAgICAgICAgICAgICAgcSA9IHEucHJldjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIHNhdmUgdGhlIHR3byBuZXcgZWRnZXMgaW4gdGhlIGhhc2ggdGFibGVcbiAgICAgICAgICAgIHRoaXMuX2hhc2hFZGdlKGUpO1xuICAgICAgICAgICAgdGhpcy5faGFzaEVkZ2UoZS5wcmV2KTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIHRyaW0gdHlwZWQgdHJpYW5nbGUgbWVzaCBhcnJheXNcbiAgICAgICAgdGhpcy50cmlhbmdsZXMgPSB0cmlhbmdsZXMuc3ViYXJyYXkoMCwgdGhpcy50cmlhbmdsZXNMZW4pO1xuICAgICAgICB0aGlzLmhhbGZlZGdlcyA9IGhhbGZlZGdlcy5zdWJhcnJheSgwLCB0aGlzLnRyaWFuZ2xlc0xlbik7XG4gICAgfVxuXG4gICAgX2hhc2hFZGdlKGUpIHtcbiAgICAgICAgdGhpcy5faGFzaFt0aGlzLl9oYXNoS2V5KGUueCwgZS55KV0gPSBlO1xuICAgIH1cblxuICAgIF9oYXNoS2V5KHgsIHkpIHtcbiAgICAgICAgcmV0dXJuIE1hdGguZmxvb3IocHNldWRvQW5nbGUoeCAtIHRoaXMuX2N4LCB5IC0gdGhpcy5fY3kpICogdGhpcy5faGFzaFNpemUpICUgdGhpcy5faGFzaFNpemU7XG4gICAgfVxuXG4gICAgX2xlZ2FsaXplKGEpIHtcbiAgICAgICAgY29uc3Qge3RyaWFuZ2xlcywgY29vcmRzLCBoYWxmZWRnZXN9ID0gdGhpcztcblxuICAgICAgICBjb25zdCBiID0gaGFsZmVkZ2VzW2FdO1xuXG4gICAgICAgIC8qIGlmIHRoZSBwYWlyIG9mIHRyaWFuZ2xlcyBkb2Vzbid0IHNhdGlzZnkgdGhlIERlbGF1bmF5IGNvbmRpdGlvblxuICAgICAgICAgKiAocDEgaXMgaW5zaWRlIHRoZSBjaXJjdW1jaXJjbGUgb2YgW3AwLCBwbCwgcHJdKSwgZmxpcCB0aGVtLFxuICAgICAgICAgKiB0aGVuIGRvIHRoZSBzYW1lIGNoZWNrL2ZsaXAgcmVjdXJzaXZlbHkgZm9yIHRoZSBuZXcgcGFpciBvZiB0cmlhbmdsZXNcbiAgICAgICAgICpcbiAgICAgICAgICogICAgICAgICAgIHBsICAgICAgICAgICAgICAgICAgICBwbFxuICAgICAgICAgKiAgICAgICAgICAvfHxcXCAgICAgICAgICAgICAgICAgIC8gIFxcXG4gICAgICAgICAqICAgICAgIGFsLyB8fCBcXGJsICAgICAgICAgICAgYWwvICAgIFxcYVxuICAgICAgICAgKiAgICAgICAgLyAgfHwgIFxcICAgICAgICAgICAgICAvICAgICAgXFxcbiAgICAgICAgICogICAgICAgLyAgYXx8YiAgXFwgICAgZmxpcCAgICAvX19fYXJfX19cXFxuICAgICAgICAgKiAgICAgcDBcXCAgIHx8ICAgL3AxICAgPT4gICBwMFxcLS0tYmwtLS0vcDFcbiAgICAgICAgICogICAgICAgIFxcICB8fCAgLyAgICAgICAgICAgICAgXFwgICAgICAvXG4gICAgICAgICAqICAgICAgIGFyXFwgfHwgL2JyICAgICAgICAgICAgIGJcXCAgICAvYnJcbiAgICAgICAgICogICAgICAgICAgXFx8fC8gICAgICAgICAgICAgICAgICBcXCAgL1xuICAgICAgICAgKiAgICAgICAgICAgcHIgICAgICAgICAgICAgICAgICAgIHByXG4gICAgICAgICAqL1xuICAgICAgICBjb25zdCBhMCA9IGEgLSBhICUgMztcbiAgICAgICAgY29uc3QgYjAgPSBiIC0gYiAlIDM7XG5cbiAgICAgICAgY29uc3QgYWwgPSBhMCArIChhICsgMSkgJSAzO1xuICAgICAgICBjb25zdCBhciA9IGEwICsgKGEgKyAyKSAlIDM7XG4gICAgICAgIGNvbnN0IGJsID0gYjAgKyAoYiArIDIpICUgMztcblxuICAgICAgICBpZiAoYiA9PT0gLTEpIHJldHVybiBhcjtcblxuICAgICAgICBjb25zdCBwMCA9IHRyaWFuZ2xlc1thcl07XG4gICAgICAgIGNvbnN0IHByID0gdHJpYW5nbGVzW2FdO1xuICAgICAgICBjb25zdCBwbCA9IHRyaWFuZ2xlc1thbF07XG4gICAgICAgIGNvbnN0IHAxID0gdHJpYW5nbGVzW2JsXTtcblxuICAgICAgICBjb25zdCBpbGxlZ2FsID0gaW5DaXJjbGUoXG4gICAgICAgICAgICBjb29yZHNbMiAqIHAwXSwgY29vcmRzWzIgKiBwMCArIDFdLFxuICAgICAgICAgICAgY29vcmRzWzIgKiBwcl0sIGNvb3Jkc1syICogcHIgKyAxXSxcbiAgICAgICAgICAgIGNvb3Jkc1syICogcGxdLCBjb29yZHNbMiAqIHBsICsgMV0sXG4gICAgICAgICAgICBjb29yZHNbMiAqIHAxXSwgY29vcmRzWzIgKiBwMSArIDFdKTtcblxuICAgICAgICBpZiAoaWxsZWdhbCkge1xuICAgICAgICAgICAgdHJpYW5nbGVzW2FdID0gcDE7XG4gICAgICAgICAgICB0cmlhbmdsZXNbYl0gPSBwMDtcblxuICAgICAgICAgICAgY29uc3QgaGJsID0gaGFsZmVkZ2VzW2JsXTtcblxuICAgICAgICAgICAgLy8gZWRnZSBzd2FwcGVkIG9uIHRoZSBvdGhlciBzaWRlIG9mIHRoZSBodWxsIChyYXJlKTsgZml4IHRoZSBoYWxmZWRnZSByZWZlcmVuY2VcbiAgICAgICAgICAgIGlmIChoYmwgPT09IC0xKSB7XG4gICAgICAgICAgICAgICAgbGV0IGUgPSB0aGlzLmh1bGw7XG4gICAgICAgICAgICAgICAgZG8ge1xuICAgICAgICAgICAgICAgICAgICBpZiAoZS50ID09PSBibCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgZS50ID0gYTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGUgPSBlLm5leHQ7XG4gICAgICAgICAgICAgICAgfSB3aGlsZSAoZSAhPT0gdGhpcy5odWxsKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuX2xpbmsoYSwgaGJsKTtcbiAgICAgICAgICAgIHRoaXMuX2xpbmsoYiwgaGFsZmVkZ2VzW2FyXSk7XG4gICAgICAgICAgICB0aGlzLl9saW5rKGFyLCBibCk7XG5cbiAgICAgICAgICAgIGNvbnN0IGJyID0gYjAgKyAoYiArIDEpICUgMztcblxuICAgICAgICAgICAgdGhpcy5fbGVnYWxpemUoYSk7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fbGVnYWxpemUoYnIpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGFyO1xuICAgIH1cblxuICAgIF9saW5rKGEsIGIpIHtcbiAgICAgICAgdGhpcy5oYWxmZWRnZXNbYV0gPSBiO1xuICAgICAgICBpZiAoYiAhPT0gLTEpIHRoaXMuaGFsZmVkZ2VzW2JdID0gYTtcbiAgICB9XG5cbiAgICAvLyBhZGQgYSBuZXcgdHJpYW5nbGUgZ2l2ZW4gdmVydGV4IGluZGljZXMgYW5kIGFkamFjZW50IGhhbGYtZWRnZSBpZHNcbiAgICBfYWRkVHJpYW5nbGUoaTAsIGkxLCBpMiwgYSwgYiwgYykge1xuICAgICAgICBjb25zdCB0ID0gdGhpcy50cmlhbmdsZXNMZW47XG5cbiAgICAgICAgdGhpcy50cmlhbmdsZXNbdF0gPSBpMDtcbiAgICAgICAgdGhpcy50cmlhbmdsZXNbdCArIDFdID0gaTE7XG4gICAgICAgIHRoaXMudHJpYW5nbGVzW3QgKyAyXSA9IGkyO1xuXG4gICAgICAgIHRoaXMuX2xpbmsodCwgYSk7XG4gICAgICAgIHRoaXMuX2xpbmsodCArIDEsIGIpO1xuICAgICAgICB0aGlzLl9saW5rKHQgKyAyLCBjKTtcblxuICAgICAgICB0aGlzLnRyaWFuZ2xlc0xlbiArPSAzO1xuXG4gICAgICAgIHJldHVybiB0O1xuICAgIH1cbn1cblxuLy8gbW9ub3RvbmljYWxseSBpbmNyZWFzZXMgd2l0aCByZWFsIGFuZ2xlLCBidXQgZG9lc24ndCBuZWVkIGV4cGVuc2l2ZSB0cmlnb25vbWV0cnlcbmZ1bmN0aW9uIHBzZXVkb0FuZ2xlKGR4LCBkeSkge1xuICAgIGNvbnN0IHAgPSBkeCAvIChNYXRoLmFicyhkeCkgKyBNYXRoLmFicyhkeSkpO1xuICAgIHJldHVybiAoZHkgPiAwID8gMyAtIHAgOiAxICsgcCkgLyA0OyAvLyBbMC4uMV1cbn1cblxuZnVuY3Rpb24gZGlzdChheCwgYXksIGJ4LCBieSkge1xuICAgIGNvbnN0IGR4ID0gYXggLSBieDtcbiAgICBjb25zdCBkeSA9IGF5IC0gYnk7XG4gICAgcmV0dXJuIGR4ICogZHggKyBkeSAqIGR5O1xufVxuXG5mdW5jdGlvbiBvcmllbnQocHgsIHB5LCBxeCwgcXksIHJ4LCByeSkge1xuICAgIHJldHVybiAocXkgLSBweSkgKiAocnggLSBxeCkgLSAocXggLSBweCkgKiAocnkgLSBxeSkgPCAwO1xufVxuXG5mdW5jdGlvbiBpbkNpcmNsZShheCwgYXksIGJ4LCBieSwgY3gsIGN5LCBweCwgcHkpIHtcbiAgICBjb25zdCBkeCA9IGF4IC0gcHg7XG4gICAgY29uc3QgZHkgPSBheSAtIHB5O1xuICAgIGNvbnN0IGV4ID0gYnggLSBweDtcbiAgICBjb25zdCBleSA9IGJ5IC0gcHk7XG4gICAgY29uc3QgZnggPSBjeCAtIHB4O1xuICAgIGNvbnN0IGZ5ID0gY3kgLSBweTtcblxuICAgIGNvbnN0IGFwID0gZHggKiBkeCArIGR5ICogZHk7XG4gICAgY29uc3QgYnAgPSBleCAqIGV4ICsgZXkgKiBleTtcbiAgICBjb25zdCBjcCA9IGZ4ICogZnggKyBmeSAqIGZ5O1xuXG4gICAgcmV0dXJuIGR4ICogKGV5ICogY3AgLSBicCAqIGZ5KSAtXG4gICAgICAgICAgIGR5ICogKGV4ICogY3AgLSBicCAqIGZ4KSArXG4gICAgICAgICAgIGFwICogKGV4ICogZnkgLSBleSAqIGZ4KSA8IDA7XG59XG5cbmZ1bmN0aW9uIGNpcmN1bXJhZGl1cyhheCwgYXksIGJ4LCBieSwgY3gsIGN5KSB7XG4gICAgY29uc3QgZHggPSBieCAtIGF4O1xuICAgIGNvbnN0IGR5ID0gYnkgLSBheTtcbiAgICBjb25zdCBleCA9IGN4IC0gYXg7XG4gICAgY29uc3QgZXkgPSBjeSAtIGF5O1xuXG4gICAgY29uc3QgYmwgPSBkeCAqIGR4ICsgZHkgKiBkeTtcbiAgICBjb25zdCBjbCA9IGV4ICogZXggKyBleSAqIGV5O1xuICAgIGNvbnN0IGQgPSBkeCAqIGV5IC0gZHkgKiBleDtcblxuICAgIGNvbnN0IHggPSAoZXkgKiBibCAtIGR5ICogY2wpICogMC41IC8gZDtcbiAgICBjb25zdCB5ID0gKGR4ICogY2wgLSBleCAqIGJsKSAqIDAuNSAvIGQ7XG5cbiAgICByZXR1cm4gYmwgJiYgY2wgJiYgZCAmJiAoeCAqIHggKyB5ICogeSkgfHwgSW5maW5pdHk7XG59XG5cbmZ1bmN0aW9uIGNpcmN1bWNlbnRlcihheCwgYXksIGJ4LCBieSwgY3gsIGN5KSB7XG4gICAgY29uc3QgZHggPSBieCAtIGF4O1xuICAgIGNvbnN0IGR5ID0gYnkgLSBheTtcbiAgICBjb25zdCBleCA9IGN4IC0gYXg7XG4gICAgY29uc3QgZXkgPSBjeSAtIGF5O1xuXG4gICAgY29uc3QgYmwgPSBkeCAqIGR4ICsgZHkgKiBkeTtcbiAgICBjb25zdCBjbCA9IGV4ICogZXggKyBleSAqIGV5O1xuICAgIGNvbnN0IGQgPSBkeCAqIGV5IC0gZHkgKiBleDtcblxuICAgIGNvbnN0IHggPSBheCArIChleSAqIGJsIC0gZHkgKiBjbCkgKiAwLjUgLyBkO1xuICAgIGNvbnN0IHkgPSBheSArIChkeCAqIGNsIC0gZXggKiBibCkgKiAwLjUgLyBkO1xuXG4gICAgcmV0dXJuIHt4LCB5fTtcbn1cblxuLy8gY3JlYXRlIGEgbmV3IG5vZGUgaW4gYSBkb3VibHkgbGlua2VkIGxpc3RcbmZ1bmN0aW9uIGluc2VydE5vZGUoY29vcmRzLCBpLCBwcmV2KSB7XG4gICAgY29uc3Qgbm9kZSA9IHtcbiAgICAgICAgaSxcbiAgICAgICAgeDogY29vcmRzWzIgKiBpXSxcbiAgICAgICAgeTogY29vcmRzWzIgKiBpICsgMV0sXG4gICAgICAgIHQ6IDAsXG4gICAgICAgIHByZXY6IG51bGwsXG4gICAgICAgIG5leHQ6IG51bGwsXG4gICAgICAgIHJlbW92ZWQ6IGZhbHNlXG4gICAgfTtcblxuICAgIGlmICghcHJldikge1xuICAgICAgICBub2RlLnByZXYgPSBub2RlO1xuICAgICAgICBub2RlLm5leHQgPSBub2RlO1xuXG4gICAgfSBlbHNlIHtcbiAgICAgICAgbm9kZS5uZXh0ID0gcHJldi5uZXh0O1xuICAgICAgICBub2RlLnByZXYgPSBwcmV2O1xuICAgICAgICBwcmV2Lm5leHQucHJldiA9IG5vZGU7XG4gICAgICAgIHByZXYubmV4dCA9IG5vZGU7XG4gICAgfVxuICAgIHJldHVybiBub2RlO1xufVxuXG5mdW5jdGlvbiByZW1vdmVOb2RlKG5vZGUpIHtcbiAgICBub2RlLnByZXYubmV4dCA9IG5vZGUubmV4dDtcbiAgICBub2RlLm5leHQucHJldiA9IG5vZGUucHJldjtcbiAgICBub2RlLnJlbW92ZWQgPSB0cnVlO1xuICAgIHJldHVybiBub2RlLnByZXY7XG59XG5cbmZ1bmN0aW9uIHF1aWNrc29ydChpZHMsIGNvb3JkcywgbGVmdCwgcmlnaHQsIGN4LCBjeSkge1xuICAgIGxldCBpLCBqLCB0ZW1wO1xuXG4gICAgaWYgKHJpZ2h0IC0gbGVmdCA8PSAyMCkge1xuICAgICAgICBmb3IgKGkgPSBsZWZ0ICsgMTsgaSA8PSByaWdodDsgaSsrKSB7XG4gICAgICAgICAgICB0ZW1wID0gaWRzW2ldO1xuICAgICAgICAgICAgaiA9IGkgLSAxO1xuICAgICAgICAgICAgd2hpbGUgKGogPj0gbGVmdCAmJiBjb21wYXJlKGNvb3JkcywgaWRzW2pdLCB0ZW1wLCBjeCwgY3kpID4gMCkgaWRzW2ogKyAxXSA9IGlkc1tqLS1dO1xuICAgICAgICAgICAgaWRzW2ogKyAxXSA9IHRlbXA7XG4gICAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgICBjb25zdCBtZWRpYW4gPSAobGVmdCArIHJpZ2h0KSA+PiAxO1xuICAgICAgICBpID0gbGVmdCArIDE7XG4gICAgICAgIGogPSByaWdodDtcbiAgICAgICAgc3dhcChpZHMsIG1lZGlhbiwgaSk7XG4gICAgICAgIGlmIChjb21wYXJlKGNvb3JkcywgaWRzW2xlZnRdLCBpZHNbcmlnaHRdLCBjeCwgY3kpID4gMCkgc3dhcChpZHMsIGxlZnQsIHJpZ2h0KTtcbiAgICAgICAgaWYgKGNvbXBhcmUoY29vcmRzLCBpZHNbaV0sIGlkc1tyaWdodF0sIGN4LCBjeSkgPiAwKSBzd2FwKGlkcywgaSwgcmlnaHQpO1xuICAgICAgICBpZiAoY29tcGFyZShjb29yZHMsIGlkc1tsZWZ0XSwgaWRzW2ldLCBjeCwgY3kpID4gMCkgc3dhcChpZHMsIGxlZnQsIGkpO1xuXG4gICAgICAgIHRlbXAgPSBpZHNbaV07XG4gICAgICAgIHdoaWxlICh0cnVlKSB7XG4gICAgICAgICAgICBkbyBpKys7IHdoaWxlIChjb21wYXJlKGNvb3JkcywgaWRzW2ldLCB0ZW1wLCBjeCwgY3kpIDwgMCk7XG4gICAgICAgICAgICBkbyBqLS07IHdoaWxlIChjb21wYXJlKGNvb3JkcywgaWRzW2pdLCB0ZW1wLCBjeCwgY3kpID4gMCk7XG4gICAgICAgICAgICBpZiAoaiA8IGkpIGJyZWFrO1xuICAgICAgICAgICAgc3dhcChpZHMsIGksIGopO1xuICAgICAgICB9XG4gICAgICAgIGlkc1tsZWZ0ICsgMV0gPSBpZHNbal07XG4gICAgICAgIGlkc1tqXSA9IHRlbXA7XG5cbiAgICAgICAgaWYgKHJpZ2h0IC0gaSArIDEgPj0gaiAtIGxlZnQpIHtcbiAgICAgICAgICAgIHF1aWNrc29ydChpZHMsIGNvb3JkcywgaSwgcmlnaHQsIGN4LCBjeSk7XG4gICAgICAgICAgICBxdWlja3NvcnQoaWRzLCBjb29yZHMsIGxlZnQsIGogLSAxLCBjeCwgY3kpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcXVpY2tzb3J0KGlkcywgY29vcmRzLCBsZWZ0LCBqIC0gMSwgY3gsIGN5KTtcbiAgICAgICAgICAgIHF1aWNrc29ydChpZHMsIGNvb3JkcywgaSwgcmlnaHQsIGN4LCBjeSk7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbmZ1bmN0aW9uIGNvbXBhcmUoY29vcmRzLCBpLCBqLCBjeCwgY3kpIHtcbiAgICBjb25zdCBkMSA9IGRpc3QoY29vcmRzWzIgKiBpXSwgY29vcmRzWzIgKiBpICsgMV0sIGN4LCBjeSk7XG4gICAgY29uc3QgZDIgPSBkaXN0KGNvb3Jkc1syICogal0sIGNvb3Jkc1syICogaiArIDFdLCBjeCwgY3kpO1xuICAgIHJldHVybiAoZDEgLSBkMikgfHwgKGNvb3Jkc1syICogaV0gLSBjb29yZHNbMiAqIGpdKSB8fCAoY29vcmRzWzIgKiBpICsgMV0gLSBjb29yZHNbMiAqIGogKyAxXSk7XG59XG5cbmZ1bmN0aW9uIHN3YXAoYXJyLCBpLCBqKSB7XG4gICAgY29uc3QgdG1wID0gYXJyW2ldO1xuICAgIGFycltpXSA9IGFycltqXTtcbiAgICBhcnJbal0gPSB0bXA7XG59XG5cbmZ1bmN0aW9uIGRlZmF1bHRHZXRYKHApIHtcbiAgICByZXR1cm4gcFswXTtcbn1cbmZ1bmN0aW9uIGRlZmF1bHRHZXRZKHApIHtcbiAgICByZXR1cm4gcFsxXTtcbn1cbiIsIihmdW5jdGlvbihhLGIpe2lmKFwiZnVuY3Rpb25cIj09dHlwZW9mIGRlZmluZSYmZGVmaW5lLmFtZClkZWZpbmUoW10sYik7ZWxzZSBpZihcInVuZGVmaW5lZFwiIT10eXBlb2YgZXhwb3J0cyliKCk7ZWxzZXtiKCksYS5GaWxlU2F2ZXI9e2V4cG9ydHM6e319LmV4cG9ydHN9fSkodGhpcyxmdW5jdGlvbigpe1widXNlIHN0cmljdFwiO2Z1bmN0aW9uIGIoYSxiKXtyZXR1cm5cInVuZGVmaW5lZFwiPT10eXBlb2YgYj9iPXthdXRvQm9tOiExfTpcIm9iamVjdFwiIT10eXBlb2YgYiYmKGNvbnNvbGUud2FybihcIkRlcHJlY2F0ZWQ6IEV4cGVjdGVkIHRoaXJkIGFyZ3VtZW50IHRvIGJlIGEgb2JqZWN0XCIpLGI9e2F1dG9Cb206IWJ9KSxiLmF1dG9Cb20mJi9eXFxzKig/OnRleHRcXC9cXFMqfGFwcGxpY2F0aW9uXFwveG1sfFxcUypcXC9cXFMqXFwreG1sKVxccyo7LipjaGFyc2V0XFxzKj1cXHMqdXRmLTgvaS50ZXN0KGEudHlwZSk/bmV3IEJsb2IoW1wiXFx1RkVGRlwiLGFdLHt0eXBlOmEudHlwZX0pOmF9ZnVuY3Rpb24gYyhiLGMsZCl7dmFyIGU9bmV3IFhNTEh0dHBSZXF1ZXN0O2Uub3BlbihcIkdFVFwiLGIpLGUucmVzcG9uc2VUeXBlPVwiYmxvYlwiLGUub25sb2FkPWZ1bmN0aW9uKCl7YShlLnJlc3BvbnNlLGMsZCl9LGUub25lcnJvcj1mdW5jdGlvbigpe2NvbnNvbGUuZXJyb3IoXCJjb3VsZCBub3QgZG93bmxvYWQgZmlsZVwiKX0sZS5zZW5kKCl9ZnVuY3Rpb24gZChhKXt2YXIgYj1uZXcgWE1MSHR0cFJlcXVlc3Q7Yi5vcGVuKFwiSEVBRFwiLGEsITEpO3RyeXtiLnNlbmQoKX1jYXRjaChhKXt9cmV0dXJuIDIwMDw9Yi5zdGF0dXMmJjI5OT49Yi5zdGF0dXN9ZnVuY3Rpb24gZShhKXt0cnl7YS5kaXNwYXRjaEV2ZW50KG5ldyBNb3VzZUV2ZW50KFwiY2xpY2tcIikpfWNhdGNoKGMpe3ZhciBiPWRvY3VtZW50LmNyZWF0ZUV2ZW50KFwiTW91c2VFdmVudHNcIik7Yi5pbml0TW91c2VFdmVudChcImNsaWNrXCIsITAsITAsd2luZG93LDAsMCwwLDgwLDIwLCExLCExLCExLCExLDAsbnVsbCksYS5kaXNwYXRjaEV2ZW50KGIpfX12YXIgZj1cIm9iamVjdFwiPT10eXBlb2Ygd2luZG93JiZ3aW5kb3cud2luZG93PT09d2luZG93P3dpbmRvdzpcIm9iamVjdFwiPT10eXBlb2Ygc2VsZiYmc2VsZi5zZWxmPT09c2VsZj9zZWxmOlwib2JqZWN0XCI9PXR5cGVvZiBnbG9iYWwmJmdsb2JhbC5nbG9iYWw9PT1nbG9iYWw/Z2xvYmFsOnZvaWQgMCxhPWYuc2F2ZUFzfHwoXCJvYmplY3RcIiE9dHlwZW9mIHdpbmRvd3x8d2luZG93IT09Zj9mdW5jdGlvbigpe306XCJkb3dubG9hZFwiaW4gSFRNTEFuY2hvckVsZW1lbnQucHJvdG90eXBlP2Z1bmN0aW9uKGIsZyxoKXt2YXIgaT1mLlVSTHx8Zi53ZWJraXRVUkwsaj1kb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYVwiKTtnPWd8fGIubmFtZXx8XCJkb3dubG9hZFwiLGouZG93bmxvYWQ9ZyxqLnJlbD1cIm5vb3BlbmVyXCIsXCJzdHJpbmdcIj09dHlwZW9mIGI/KGouaHJlZj1iLGoub3JpZ2luPT09bG9jYXRpb24ub3JpZ2luP2Uoaik6ZChqLmhyZWYpP2MoYixnLGgpOmUoaixqLnRhcmdldD1cIl9ibGFua1wiKSk6KGouaHJlZj1pLmNyZWF0ZU9iamVjdFVSTChiKSxzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7aS5yZXZva2VPYmplY3RVUkwoai5ocmVmKX0sNEU0KSxzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7ZShqKX0sMCkpfTpcIm1zU2F2ZU9yT3BlbkJsb2JcImluIG5hdmlnYXRvcj9mdW5jdGlvbihmLGcsaCl7aWYoZz1nfHxmLm5hbWV8fFwiZG93bmxvYWRcIixcInN0cmluZ1wiIT10eXBlb2YgZiluYXZpZ2F0b3IubXNTYXZlT3JPcGVuQmxvYihiKGYsaCksZyk7ZWxzZSBpZihkKGYpKWMoZixnLGgpO2Vsc2V7dmFyIGk9ZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImFcIik7aS5ocmVmPWYsaS50YXJnZXQ9XCJfYmxhbmtcIixzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7ZShpKX0pfX06ZnVuY3Rpb24oYSxiLGQsZSl7aWYoZT1lfHxvcGVuKFwiXCIsXCJfYmxhbmtcIiksZSYmKGUuZG9jdW1lbnQudGl0bGU9ZS5kb2N1bWVudC5ib2R5LmlubmVyVGV4dD1cImRvd25sb2FkaW5nLi4uXCIpLFwic3RyaW5nXCI9PXR5cGVvZiBhKXJldHVybiBjKGEsYixkKTt2YXIgZz1cImFwcGxpY2F0aW9uL29jdGV0LXN0cmVhbVwiPT09YS50eXBlLGg9L2NvbnN0cnVjdG9yL2kudGVzdChmLkhUTUxFbGVtZW50KXx8Zi5zYWZhcmksaT0vQ3JpT1NcXC9bXFxkXSsvLnRlc3QobmF2aWdhdG9yLnVzZXJBZ2VudCk7aWYoKGl8fGcmJmgpJiZcIm9iamVjdFwiPT10eXBlb2YgRmlsZVJlYWRlcil7dmFyIGo9bmV3IEZpbGVSZWFkZXI7ai5vbmxvYWRlbmQ9ZnVuY3Rpb24oKXt2YXIgYT1qLnJlc3VsdDthPWk/YTphLnJlcGxhY2UoL15kYXRhOlteO10qOy8sXCJkYXRhOmF0dGFjaG1lbnQvZmlsZTtcIiksZT9lLmxvY2F0aW9uLmhyZWY9YTpsb2NhdGlvbj1hLGU9bnVsbH0sai5yZWFkQXNEYXRhVVJMKGEpfWVsc2V7dmFyIGs9Zi5VUkx8fGYud2Via2l0VVJMLGw9ay5jcmVhdGVPYmplY3RVUkwoYSk7ZT9lLmxvY2F0aW9uPWw6bG9jYXRpb24uaHJlZj1sLGU9bnVsbCxzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7ay5yZXZva2VPYmplY3RVUkwobCl9LDRFNCl9fSk7Zi5zYXZlQXM9YS5zYXZlQXM9YSxcInVuZGVmaW5lZFwiIT10eXBlb2YgbW9kdWxlJiYobW9kdWxlLmV4cG9ydHM9YSl9KTtcblxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9RmlsZVNhdmVyLm1pbi5qcy5tYXAiLCJpbXBvcnQgdG9QYXRoIGZyb20gJy4vdG9QYXRoJztcbmltcG9ydCB0b1BvaW50cyBmcm9tICcuL3RvUG9pbnRzJztcbmltcG9ydCB2YWxpZCBmcm9tICcuL3ZhbGlkJztcblxuZXhwb3J0IHsgdG9QYXRoLCB0b1BvaW50cywgdmFsaWQgfTsiLCJpbXBvcnQgdG9Qb2ludHMgZnJvbSAnLi90b1BvaW50cyc7XG5cbnZhciBwb2ludHNUb0QgPSBmdW5jdGlvbiBwb2ludHNUb0QocCkge1xuICB2YXIgZCA9ICcnO1xuICB2YXIgaSA9IDA7XG4gIHZhciBmaXJzdFBvaW50ID0gdm9pZCAwO1xuXG4gIHZhciBfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uID0gdHJ1ZTtcbiAgdmFyIF9kaWRJdGVyYXRvckVycm9yID0gZmFsc2U7XG4gIHZhciBfaXRlcmF0b3JFcnJvciA9IHVuZGVmaW5lZDtcblxuICB0cnkge1xuICAgIGZvciAodmFyIF9pdGVyYXRvciA9IHBbU3ltYm9sLml0ZXJhdG9yXSgpLCBfc3RlcDsgIShfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uID0gKF9zdGVwID0gX2l0ZXJhdG9yLm5leHQoKSkuZG9uZSk7IF9pdGVyYXRvck5vcm1hbENvbXBsZXRpb24gPSB0cnVlKSB7XG4gICAgICB2YXIgcG9pbnQgPSBfc3RlcC52YWx1ZTtcbiAgICAgIHZhciBfcG9pbnQkY3VydmUgPSBwb2ludC5jdXJ2ZSxcbiAgICAgICAgICBjdXJ2ZSA9IF9wb2ludCRjdXJ2ZSA9PT0gdW5kZWZpbmVkID8gZmFsc2UgOiBfcG9pbnQkY3VydmUsXG4gICAgICAgICAgbW92ZVRvID0gcG9pbnQubW92ZVRvLFxuICAgICAgICAgIHggPSBwb2ludC54LFxuICAgICAgICAgIHkgPSBwb2ludC55O1xuXG4gICAgICB2YXIgaXNGaXJzdFBvaW50ID0gaSA9PT0gMCB8fCBtb3ZlVG87XG4gICAgICB2YXIgaXNMYXN0UG9pbnQgPSBpID09PSBwLmxlbmd0aCAtIDEgfHwgcFtpICsgMV0ubW92ZVRvO1xuICAgICAgdmFyIHByZXZQb2ludCA9IGkgPT09IDAgPyBudWxsIDogcFtpIC0gMV07XG5cbiAgICAgIGlmIChpc0ZpcnN0UG9pbnQpIHtcbiAgICAgICAgZmlyc3RQb2ludCA9IHBvaW50O1xuXG4gICAgICAgIGlmICghaXNMYXN0UG9pbnQpIHtcbiAgICAgICAgICBkICs9ICdNJyArIHggKyAnLCcgKyB5O1xuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKGN1cnZlKSB7XG4gICAgICAgIHN3aXRjaCAoY3VydmUudHlwZSkge1xuICAgICAgICAgIGNhc2UgJ2FyYyc6XG4gICAgICAgICAgICB2YXIgX3BvaW50JGN1cnZlMiA9IHBvaW50LmN1cnZlLFxuICAgICAgICAgICAgICAgIF9wb2ludCRjdXJ2ZTIkbGFyZ2VBciA9IF9wb2ludCRjdXJ2ZTIubGFyZ2VBcmNGbGFnLFxuICAgICAgICAgICAgICAgIGxhcmdlQXJjRmxhZyA9IF9wb2ludCRjdXJ2ZTIkbGFyZ2VBciA9PT0gdW5kZWZpbmVkID8gMCA6IF9wb2ludCRjdXJ2ZTIkbGFyZ2VBcixcbiAgICAgICAgICAgICAgICByeCA9IF9wb2ludCRjdXJ2ZTIucngsXG4gICAgICAgICAgICAgICAgcnkgPSBfcG9pbnQkY3VydmUyLnJ5LFxuICAgICAgICAgICAgICAgIF9wb2ludCRjdXJ2ZTIkc3dlZXBGbCA9IF9wb2ludCRjdXJ2ZTIuc3dlZXBGbGFnLFxuICAgICAgICAgICAgICAgIHN3ZWVwRmxhZyA9IF9wb2ludCRjdXJ2ZTIkc3dlZXBGbCA9PT0gdW5kZWZpbmVkID8gMCA6IF9wb2ludCRjdXJ2ZTIkc3dlZXBGbCxcbiAgICAgICAgICAgICAgICBfcG9pbnQkY3VydmUyJHhBeGlzUm8gPSBfcG9pbnQkY3VydmUyLnhBeGlzUm90YXRpb24sXG4gICAgICAgICAgICAgICAgeEF4aXNSb3RhdGlvbiA9IF9wb2ludCRjdXJ2ZTIkeEF4aXNSbyA9PT0gdW5kZWZpbmVkID8gMCA6IF9wb2ludCRjdXJ2ZTIkeEF4aXNSbztcblxuICAgICAgICAgICAgZCArPSAnQScgKyByeCArICcsJyArIHJ5ICsgJywnICsgeEF4aXNSb3RhdGlvbiArICcsJyArIGxhcmdlQXJjRmxhZyArICcsJyArIHN3ZWVwRmxhZyArICcsJyArIHggKyAnLCcgKyB5O1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgY2FzZSAnY3ViaWMnOlxuICAgICAgICAgICAgdmFyIF9wb2ludCRjdXJ2ZTMgPSBwb2ludC5jdXJ2ZSxcbiAgICAgICAgICAgICAgICBjeDEgPSBfcG9pbnQkY3VydmUzLngxLFxuICAgICAgICAgICAgICAgIGN5MSA9IF9wb2ludCRjdXJ2ZTMueTEsXG4gICAgICAgICAgICAgICAgY3gyID0gX3BvaW50JGN1cnZlMy54MixcbiAgICAgICAgICAgICAgICBjeTIgPSBfcG9pbnQkY3VydmUzLnkyO1xuXG4gICAgICAgICAgICBkICs9ICdDJyArIGN4MSArICcsJyArIGN5MSArICcsJyArIGN4MiArICcsJyArIGN5MiArICcsJyArIHggKyAnLCcgKyB5O1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgY2FzZSAncXVhZHJhdGljJzpcbiAgICAgICAgICAgIHZhciBfcG9pbnQkY3VydmU0ID0gcG9pbnQuY3VydmUsXG4gICAgICAgICAgICAgICAgcXgxID0gX3BvaW50JGN1cnZlNC54MSxcbiAgICAgICAgICAgICAgICBxeTEgPSBfcG9pbnQkY3VydmU0LnkxO1xuXG4gICAgICAgICAgICBkICs9ICdRJyArIHF4MSArICcsJyArIHF5MSArICcsJyArIHggKyAnLCcgKyB5O1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoaXNMYXN0UG9pbnQgJiYgeCA9PT0gZmlyc3RQb2ludC54ICYmIHkgPT09IGZpcnN0UG9pbnQueSkge1xuICAgICAgICAgIGQgKz0gJ1onO1xuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKGlzTGFzdFBvaW50ICYmIHggPT09IGZpcnN0UG9pbnQueCAmJiB5ID09PSBmaXJzdFBvaW50LnkpIHtcbiAgICAgICAgZCArPSAnWic7XG4gICAgICB9IGVsc2UgaWYgKHggIT09IHByZXZQb2ludC54ICYmIHkgIT09IHByZXZQb2ludC55KSB7XG4gICAgICAgIGQgKz0gJ0wnICsgeCArICcsJyArIHk7XG4gICAgICB9IGVsc2UgaWYgKHggIT09IHByZXZQb2ludC54KSB7XG4gICAgICAgIGQgKz0gJ0gnICsgeDtcbiAgICAgIH0gZWxzZSBpZiAoeSAhPT0gcHJldlBvaW50LnkpIHtcbiAgICAgICAgZCArPSAnVicgKyB5O1xuICAgICAgfVxuXG4gICAgICBpKys7XG4gICAgfVxuICB9IGNhdGNoIChlcnIpIHtcbiAgICBfZGlkSXRlcmF0b3JFcnJvciA9IHRydWU7XG4gICAgX2l0ZXJhdG9yRXJyb3IgPSBlcnI7XG4gIH0gZmluYWxseSB7XG4gICAgdHJ5IHtcbiAgICAgIGlmICghX2l0ZXJhdG9yTm9ybWFsQ29tcGxldGlvbiAmJiBfaXRlcmF0b3IucmV0dXJuKSB7XG4gICAgICAgIF9pdGVyYXRvci5yZXR1cm4oKTtcbiAgICAgIH1cbiAgICB9IGZpbmFsbHkge1xuICAgICAgaWYgKF9kaWRJdGVyYXRvckVycm9yKSB7XG4gICAgICAgIHRocm93IF9pdGVyYXRvckVycm9yO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiBkO1xufTtcblxudmFyIHRvUGF0aCA9IGZ1bmN0aW9uIHRvUGF0aChzKSB7XG4gIHZhciBpc1BvaW50cyA9IEFycmF5LmlzQXJyYXkocyk7XG4gIHZhciBpc0dyb3VwID0gaXNQb2ludHMgPyBBcnJheS5pc0FycmF5KHNbMF0pIDogcy50eXBlID09PSAnZyc7XG4gIHZhciBwb2ludHMgPSBpc1BvaW50cyA/IHMgOiBpc0dyb3VwID8gcy5zaGFwZXMubWFwKGZ1bmN0aW9uIChzaHApIHtcbiAgICByZXR1cm4gdG9Qb2ludHMoc2hwKTtcbiAgfSkgOiB0b1BvaW50cyhzKTtcblxuICBpZiAoaXNHcm91cCkge1xuICAgIHJldHVybiBwb2ludHMubWFwKGZ1bmN0aW9uIChwKSB7XG4gICAgICByZXR1cm4gcG9pbnRzVG9EKHApO1xuICAgIH0pO1xuICB9XG5cbiAgcmV0dXJuIHBvaW50c1RvRChwb2ludHMpO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgdG9QYXRoOyIsInZhciBfZXh0ZW5kcyA9IE9iamVjdC5hc3NpZ24gfHwgZnVuY3Rpb24gKHRhcmdldCkgeyBmb3IgKHZhciBpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykgeyB2YXIgc291cmNlID0gYXJndW1lbnRzW2ldOyBmb3IgKHZhciBrZXkgaW4gc291cmNlKSB7IGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoc291cmNlLCBrZXkpKSB7IHRhcmdldFtrZXldID0gc291cmNlW2tleV07IH0gfSB9IHJldHVybiB0YXJnZXQ7IH07XG5cbmZ1bmN0aW9uIF9vYmplY3RXaXRob3V0UHJvcGVydGllcyhvYmosIGtleXMpIHsgdmFyIHRhcmdldCA9IHt9OyBmb3IgKHZhciBpIGluIG9iaikgeyBpZiAoa2V5cy5pbmRleE9mKGkpID49IDApIGNvbnRpbnVlOyBpZiAoIU9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIGkpKSBjb250aW51ZTsgdGFyZ2V0W2ldID0gb2JqW2ldOyB9IHJldHVybiB0YXJnZXQ7IH1cblxudmFyIHRvUG9pbnRzID0gZnVuY3Rpb24gdG9Qb2ludHMoX3JlZikge1xuICB2YXIgdHlwZSA9IF9yZWYudHlwZSxcbiAgICAgIHByb3BzID0gX29iamVjdFdpdGhvdXRQcm9wZXJ0aWVzKF9yZWYsIFsndHlwZSddKTtcblxuICBzd2l0Y2ggKHR5cGUpIHtcbiAgICBjYXNlICdjaXJjbGUnOlxuICAgICAgcmV0dXJuIGdldFBvaW50c0Zyb21DaXJjbGUocHJvcHMpO1xuICAgIGNhc2UgJ2VsbGlwc2UnOlxuICAgICAgcmV0dXJuIGdldFBvaW50c0Zyb21FbGxpcHNlKHByb3BzKTtcbiAgICBjYXNlICdsaW5lJzpcbiAgICAgIHJldHVybiBnZXRQb2ludHNGcm9tTGluZShwcm9wcyk7XG4gICAgY2FzZSAncGF0aCc6XG4gICAgICByZXR1cm4gZ2V0UG9pbnRzRnJvbVBhdGgocHJvcHMpO1xuICAgIGNhc2UgJ3BvbHlnb24nOlxuICAgICAgcmV0dXJuIGdldFBvaW50c0Zyb21Qb2x5Z29uKHByb3BzKTtcbiAgICBjYXNlICdwb2x5bGluZSc6XG4gICAgICByZXR1cm4gZ2V0UG9pbnRzRnJvbVBvbHlsaW5lKHByb3BzKTtcbiAgICBjYXNlICdyZWN0JzpcbiAgICAgIHJldHVybiBnZXRQb2ludHNGcm9tUmVjdChwcm9wcyk7XG4gICAgY2FzZSAnZyc6XG4gICAgICByZXR1cm4gZ2V0UG9pbnRzRnJvbUcocHJvcHMpO1xuICAgIGRlZmF1bHQ6XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ05vdCBhIHZhbGlkIHNoYXBlIHR5cGUnKTtcbiAgfVxufTtcblxudmFyIGdldFBvaW50c0Zyb21DaXJjbGUgPSBmdW5jdGlvbiBnZXRQb2ludHNGcm9tQ2lyY2xlKF9yZWYyKSB7XG4gIHZhciBjeCA9IF9yZWYyLmN4LFxuICAgICAgY3kgPSBfcmVmMi5jeSxcbiAgICAgIHIgPSBfcmVmMi5yO1xuXG4gIHJldHVybiBbeyB4OiBjeCwgeTogY3kgLSByLCBtb3ZlVG86IHRydWUgfSwgeyB4OiBjeCwgeTogY3kgKyByLCBjdXJ2ZTogeyB0eXBlOiAnYXJjJywgcng6IHIsIHJ5OiByLCBzd2VlcEZsYWc6IDEgfSB9LCB7IHg6IGN4LCB5OiBjeSAtIHIsIGN1cnZlOiB7IHR5cGU6ICdhcmMnLCByeDogciwgcnk6IHIsIHN3ZWVwRmxhZzogMSB9IH1dO1xufTtcblxudmFyIGdldFBvaW50c0Zyb21FbGxpcHNlID0gZnVuY3Rpb24gZ2V0UG9pbnRzRnJvbUVsbGlwc2UoX3JlZjMpIHtcbiAgdmFyIGN4ID0gX3JlZjMuY3gsXG4gICAgICBjeSA9IF9yZWYzLmN5LFxuICAgICAgcnggPSBfcmVmMy5yeCxcbiAgICAgIHJ5ID0gX3JlZjMucnk7XG5cbiAgcmV0dXJuIFt7IHg6IGN4LCB5OiBjeSAtIHJ5LCBtb3ZlVG86IHRydWUgfSwgeyB4OiBjeCwgeTogY3kgKyByeSwgY3VydmU6IHsgdHlwZTogJ2FyYycsIHJ4OiByeCwgcnk6IHJ5LCBzd2VlcEZsYWc6IDEgfSB9LCB7IHg6IGN4LCB5OiBjeSAtIHJ5LCBjdXJ2ZTogeyB0eXBlOiAnYXJjJywgcng6IHJ4LCByeTogcnksIHN3ZWVwRmxhZzogMSB9IH1dO1xufTtcblxudmFyIGdldFBvaW50c0Zyb21MaW5lID0gZnVuY3Rpb24gZ2V0UG9pbnRzRnJvbUxpbmUoX3JlZjQpIHtcbiAgdmFyIHgxID0gX3JlZjQueDEsXG4gICAgICB4MiA9IF9yZWY0LngyLFxuICAgICAgeTEgPSBfcmVmNC55MSxcbiAgICAgIHkyID0gX3JlZjQueTI7XG5cbiAgcmV0dXJuIFt7IHg6IHgxLCB5OiB5MSwgbW92ZVRvOiB0cnVlIH0sIHsgeDogeDIsIHk6IHkyIH1dO1xufTtcblxudmFyIHZhbGlkQ29tbWFuZHMgPSAvW01tTGxIaFZ2Q2NTc1FxVHRBYVp6XS9nO1xuXG52YXIgY29tbWFuZExlbmd0aHMgPSB7XG4gIEE6IDcsXG4gIEM6IDYsXG4gIEg6IDEsXG4gIEw6IDIsXG4gIE06IDIsXG4gIFE6IDQsXG4gIFM6IDQsXG4gIFQ6IDIsXG4gIFY6IDEsXG4gIFo6IDBcbn07XG5cbnZhciByZWxhdGl2ZUNvbW1hbmRzID0gWydhJywgJ2MnLCAnaCcsICdsJywgJ20nLCAncScsICdzJywgJ3QnLCAndiddO1xuXG52YXIgaXNSZWxhdGl2ZSA9IGZ1bmN0aW9uIGlzUmVsYXRpdmUoY29tbWFuZCkge1xuICByZXR1cm4gcmVsYXRpdmVDb21tYW5kcy5pbmRleE9mKGNvbW1hbmQpICE9PSAtMTtcbn07XG5cbnZhciBvcHRpb25hbEFyY0tleXMgPSBbJ3hBeGlzUm90YXRpb24nLCAnbGFyZ2VBcmNGbGFnJywgJ3N3ZWVwRmxhZyddO1xuXG52YXIgZ2V0Q29tbWFuZHMgPSBmdW5jdGlvbiBnZXRDb21tYW5kcyhkKSB7XG4gIHJldHVybiBkLm1hdGNoKHZhbGlkQ29tbWFuZHMpO1xufTtcblxudmFyIGdldFBhcmFtcyA9IGZ1bmN0aW9uIGdldFBhcmFtcyhkKSB7XG4gIHJldHVybiBkLnNwbGl0KHZhbGlkQ29tbWFuZHMpLm1hcChmdW5jdGlvbiAodikge1xuICAgIHJldHVybiB2LnJlcGxhY2UoL1swLTldKy0vZywgZnVuY3Rpb24gKG0pIHtcbiAgICAgIHJldHVybiBtLnNsaWNlKDAsIC0xKSArICcgLSc7XG4gICAgfSk7XG4gIH0pLm1hcChmdW5jdGlvbiAodikge1xuICAgIHJldHVybiB2LnJlcGxhY2UoL1xcLlswLTldKy9nLCBmdW5jdGlvbiAobSkge1xuICAgICAgcmV0dXJuIG0gKyAnICc7XG4gICAgfSk7XG4gIH0pLm1hcChmdW5jdGlvbiAodikge1xuICAgIHJldHVybiB2LnRyaW0oKTtcbiAgfSkuZmlsdGVyKGZ1bmN0aW9uICh2KSB7XG4gICAgcmV0dXJuIHYubGVuZ3RoID4gMDtcbiAgfSkubWFwKGZ1bmN0aW9uICh2KSB7XG4gICAgcmV0dXJuIHYuc3BsaXQoL1sgLF0rLykubWFwKHBhcnNlRmxvYXQpLmZpbHRlcihmdW5jdGlvbiAobikge1xuICAgICAgcmV0dXJuICFpc05hTihuKTtcbiAgICB9KTtcbiAgfSk7XG59O1xuXG52YXIgZ2V0UG9pbnRzRnJvbVBhdGggPSBmdW5jdGlvbiBnZXRQb2ludHNGcm9tUGF0aChfcmVmNSkge1xuICB2YXIgZCA9IF9yZWY1LmQ7XG5cbiAgdmFyIGNvbW1hbmRzID0gZ2V0Q29tbWFuZHMoZCk7XG4gIHZhciBwYXJhbXMgPSBnZXRQYXJhbXMoZCk7XG5cbiAgdmFyIHBvaW50cyA9IFtdO1xuXG4gIHZhciBtb3ZlVG8gPSB2b2lkIDA7XG5cbiAgZm9yICh2YXIgaSA9IDAsIGwgPSBjb21tYW5kcy5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICB2YXIgY29tbWFuZCA9IGNvbW1hbmRzW2ldO1xuICAgIHZhciB1cHBlckNhc2VDb21tYW5kID0gY29tbWFuZC50b1VwcGVyQ2FzZSgpO1xuICAgIHZhciBjb21tYW5kTGVuZ3RoID0gY29tbWFuZExlbmd0aHNbdXBwZXJDYXNlQ29tbWFuZF07XG4gICAgdmFyIHJlbGF0aXZlID0gaXNSZWxhdGl2ZShjb21tYW5kKTtcblxuICAgIGlmIChjb21tYW5kTGVuZ3RoID4gMCkge1xuICAgICAgdmFyIGNvbW1hbmRQYXJhbXMgPSBwYXJhbXMuc2hpZnQoKTtcbiAgICAgIHZhciBpdGVyYXRpb25zID0gY29tbWFuZFBhcmFtcy5sZW5ndGggLyBjb21tYW5kTGVuZ3RoO1xuXG4gICAgICBmb3IgKHZhciBqID0gMDsgaiA8IGl0ZXJhdGlvbnM7IGorKykge1xuICAgICAgICB2YXIgcHJldlBvaW50ID0gcG9pbnRzW3BvaW50cy5sZW5ndGggLSAxXSB8fCB7IHg6IDAsIHk6IDAgfTtcblxuICAgICAgICBzd2l0Y2ggKHVwcGVyQ2FzZUNvbW1hbmQpIHtcbiAgICAgICAgICBjYXNlICdNJzpcbiAgICAgICAgICAgIHZhciB4ID0gKHJlbGF0aXZlID8gcHJldlBvaW50LnggOiAwKSArIGNvbW1hbmRQYXJhbXMuc2hpZnQoKTtcbiAgICAgICAgICAgIHZhciB5ID0gKHJlbGF0aXZlID8gcHJldlBvaW50LnkgOiAwKSArIGNvbW1hbmRQYXJhbXMuc2hpZnQoKTtcblxuICAgICAgICAgICAgaWYgKGogPT09IDApIHtcbiAgICAgICAgICAgICAgbW92ZVRvID0geyB4OiB4LCB5OiB5IH07XG4gICAgICAgICAgICAgIHBvaW50cy5wdXNoKHsgeDogeCwgeTogeSwgbW92ZVRvOiB0cnVlIH0pO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgcG9pbnRzLnB1c2goeyB4OiB4LCB5OiB5IH0pO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgIGNhc2UgJ0wnOlxuICAgICAgICAgICAgcG9pbnRzLnB1c2goe1xuICAgICAgICAgICAgICB4OiAocmVsYXRpdmUgPyBwcmV2UG9pbnQueCA6IDApICsgY29tbWFuZFBhcmFtcy5zaGlmdCgpLFxuICAgICAgICAgICAgICB5OiAocmVsYXRpdmUgPyBwcmV2UG9pbnQueSA6IDApICsgY29tbWFuZFBhcmFtcy5zaGlmdCgpXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICBjYXNlICdIJzpcbiAgICAgICAgICAgIHBvaW50cy5wdXNoKHtcbiAgICAgICAgICAgICAgeDogKHJlbGF0aXZlID8gcHJldlBvaW50LnggOiAwKSArIGNvbW1hbmRQYXJhbXMuc2hpZnQoKSxcbiAgICAgICAgICAgICAgeTogcHJldlBvaW50LnlcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgIGNhc2UgJ1YnOlxuICAgICAgICAgICAgcG9pbnRzLnB1c2goe1xuICAgICAgICAgICAgICB4OiBwcmV2UG9pbnQueCxcbiAgICAgICAgICAgICAgeTogKHJlbGF0aXZlID8gcHJldlBvaW50LnkgOiAwKSArIGNvbW1hbmRQYXJhbXMuc2hpZnQoKVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgY2FzZSAnQSc6XG4gICAgICAgICAgICBwb2ludHMucHVzaCh7XG4gICAgICAgICAgICAgIGN1cnZlOiB7XG4gICAgICAgICAgICAgICAgdHlwZTogJ2FyYycsXG4gICAgICAgICAgICAgICAgcng6IGNvbW1hbmRQYXJhbXMuc2hpZnQoKSxcbiAgICAgICAgICAgICAgICByeTogY29tbWFuZFBhcmFtcy5zaGlmdCgpLFxuICAgICAgICAgICAgICAgIHhBeGlzUm90YXRpb246IGNvbW1hbmRQYXJhbXMuc2hpZnQoKSxcbiAgICAgICAgICAgICAgICBsYXJnZUFyY0ZsYWc6IGNvbW1hbmRQYXJhbXMuc2hpZnQoKSxcbiAgICAgICAgICAgICAgICBzd2VlcEZsYWc6IGNvbW1hbmRQYXJhbXMuc2hpZnQoKVxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICB4OiAocmVsYXRpdmUgPyBwcmV2UG9pbnQueCA6IDApICsgY29tbWFuZFBhcmFtcy5zaGlmdCgpLFxuICAgICAgICAgICAgICB5OiAocmVsYXRpdmUgPyBwcmV2UG9pbnQueSA6IDApICsgY29tbWFuZFBhcmFtcy5zaGlmdCgpXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgdmFyIF9pdGVyYXRvck5vcm1hbENvbXBsZXRpb24gPSB0cnVlO1xuICAgICAgICAgICAgdmFyIF9kaWRJdGVyYXRvckVycm9yID0gZmFsc2U7XG4gICAgICAgICAgICB2YXIgX2l0ZXJhdG9yRXJyb3IgPSB1bmRlZmluZWQ7XG5cbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgIGZvciAodmFyIF9pdGVyYXRvciA9IG9wdGlvbmFsQXJjS2V5c1tTeW1ib2wuaXRlcmF0b3JdKCksIF9zdGVwOyAhKF9pdGVyYXRvck5vcm1hbENvbXBsZXRpb24gPSAoX3N0ZXAgPSBfaXRlcmF0b3IubmV4dCgpKS5kb25lKTsgX2l0ZXJhdG9yTm9ybWFsQ29tcGxldGlvbiA9IHRydWUpIHtcbiAgICAgICAgICAgICAgICB2YXIgayA9IF9zdGVwLnZhbHVlO1xuXG4gICAgICAgICAgICAgICAgaWYgKHBvaW50c1twb2ludHMubGVuZ3RoIC0gMV1bJ2N1cnZlJ11ba10gPT09IDApIHtcbiAgICAgICAgICAgICAgICAgIGRlbGV0ZSBwb2ludHNbcG9pbnRzLmxlbmd0aCAtIDFdWydjdXJ2ZSddW2tdO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgICAgIF9kaWRJdGVyYXRvckVycm9yID0gdHJ1ZTtcbiAgICAgICAgICAgICAgX2l0ZXJhdG9yRXJyb3IgPSBlcnI7XG4gICAgICAgICAgICB9IGZpbmFsbHkge1xuICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIGlmICghX2l0ZXJhdG9yTm9ybWFsQ29tcGxldGlvbiAmJiBfaXRlcmF0b3IucmV0dXJuKSB7XG4gICAgICAgICAgICAgICAgICBfaXRlcmF0b3IucmV0dXJuKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9IGZpbmFsbHkge1xuICAgICAgICAgICAgICAgIGlmIChfZGlkSXRlcmF0b3JFcnJvcikge1xuICAgICAgICAgICAgICAgICAgdGhyb3cgX2l0ZXJhdG9yRXJyb3I7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgY2FzZSAnQyc6XG4gICAgICAgICAgICBwb2ludHMucHVzaCh7XG4gICAgICAgICAgICAgIGN1cnZlOiB7XG4gICAgICAgICAgICAgICAgdHlwZTogJ2N1YmljJyxcbiAgICAgICAgICAgICAgICB4MTogKHJlbGF0aXZlID8gcHJldlBvaW50LnggOiAwKSArIGNvbW1hbmRQYXJhbXMuc2hpZnQoKSxcbiAgICAgICAgICAgICAgICB5MTogKHJlbGF0aXZlID8gcHJldlBvaW50LnkgOiAwKSArIGNvbW1hbmRQYXJhbXMuc2hpZnQoKSxcbiAgICAgICAgICAgICAgICB4MjogKHJlbGF0aXZlID8gcHJldlBvaW50LnggOiAwKSArIGNvbW1hbmRQYXJhbXMuc2hpZnQoKSxcbiAgICAgICAgICAgICAgICB5MjogKHJlbGF0aXZlID8gcHJldlBvaW50LnkgOiAwKSArIGNvbW1hbmRQYXJhbXMuc2hpZnQoKVxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICB4OiAocmVsYXRpdmUgPyBwcmV2UG9pbnQueCA6IDApICsgY29tbWFuZFBhcmFtcy5zaGlmdCgpLFxuICAgICAgICAgICAgICB5OiAocmVsYXRpdmUgPyBwcmV2UG9pbnQueSA6IDApICsgY29tbWFuZFBhcmFtcy5zaGlmdCgpXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICBjYXNlICdTJzpcbiAgICAgICAgICAgIHZhciBzeDIgPSAocmVsYXRpdmUgPyBwcmV2UG9pbnQueCA6IDApICsgY29tbWFuZFBhcmFtcy5zaGlmdCgpO1xuICAgICAgICAgICAgdmFyIHN5MiA9IChyZWxhdGl2ZSA/IHByZXZQb2ludC55IDogMCkgKyBjb21tYW5kUGFyYW1zLnNoaWZ0KCk7XG4gICAgICAgICAgICB2YXIgc3ggPSAocmVsYXRpdmUgPyBwcmV2UG9pbnQueCA6IDApICsgY29tbWFuZFBhcmFtcy5zaGlmdCgpO1xuICAgICAgICAgICAgdmFyIHN5ID0gKHJlbGF0aXZlID8gcHJldlBvaW50LnkgOiAwKSArIGNvbW1hbmRQYXJhbXMuc2hpZnQoKTtcblxuICAgICAgICAgICAgdmFyIGRpZmYgPSB7fTtcblxuICAgICAgICAgICAgdmFyIHN4MSA9IHZvaWQgMDtcbiAgICAgICAgICAgIHZhciBzeTEgPSB2b2lkIDA7XG5cbiAgICAgICAgICAgIGlmIChwcmV2UG9pbnQuY3VydmUgJiYgcHJldlBvaW50LmN1cnZlLnR5cGUgPT09ICdjdWJpYycpIHtcbiAgICAgICAgICAgICAgZGlmZi54ID0gTWF0aC5hYnMocHJldlBvaW50LnggLSBwcmV2UG9pbnQuY3VydmUueDIpO1xuICAgICAgICAgICAgICBkaWZmLnkgPSBNYXRoLmFicyhwcmV2UG9pbnQueSAtIHByZXZQb2ludC5jdXJ2ZS55Mik7XG4gICAgICAgICAgICAgIHN4MSA9IHByZXZQb2ludC54IDwgcHJldlBvaW50LmN1cnZlLngyID8gcHJldlBvaW50LnggLSBkaWZmLnggOiBwcmV2UG9pbnQueCArIGRpZmYueDtcbiAgICAgICAgICAgICAgc3kxID0gcHJldlBvaW50LnkgPCBwcmV2UG9pbnQuY3VydmUueTIgPyBwcmV2UG9pbnQueSAtIGRpZmYueSA6IHByZXZQb2ludC55ICsgZGlmZi55O1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgZGlmZi54ID0gTWF0aC5hYnMoc3ggLSBzeDIpO1xuICAgICAgICAgICAgICBkaWZmLnkgPSBNYXRoLmFicyhzeSAtIHN5Mik7XG4gICAgICAgICAgICAgIHN4MSA9IHByZXZQb2ludC54O1xuICAgICAgICAgICAgICBzeTEgPSBwcmV2UG9pbnQueTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcG9pbnRzLnB1c2goeyBjdXJ2ZTogeyB0eXBlOiAnY3ViaWMnLCB4MTogc3gxLCB5MTogc3kxLCB4Mjogc3gyLCB5Mjogc3kyIH0sIHg6IHN4LCB5OiBzeSB9KTtcblxuICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICBjYXNlICdRJzpcbiAgICAgICAgICAgIHBvaW50cy5wdXNoKHtcbiAgICAgICAgICAgICAgY3VydmU6IHtcbiAgICAgICAgICAgICAgICB0eXBlOiAncXVhZHJhdGljJyxcbiAgICAgICAgICAgICAgICB4MTogKHJlbGF0aXZlID8gcHJldlBvaW50LnggOiAwKSArIGNvbW1hbmRQYXJhbXMuc2hpZnQoKSxcbiAgICAgICAgICAgICAgICB5MTogKHJlbGF0aXZlID8gcHJldlBvaW50LnkgOiAwKSArIGNvbW1hbmRQYXJhbXMuc2hpZnQoKVxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICB4OiAocmVsYXRpdmUgPyBwcmV2UG9pbnQueCA6IDApICsgY29tbWFuZFBhcmFtcy5zaGlmdCgpLFxuICAgICAgICAgICAgICB5OiAocmVsYXRpdmUgPyBwcmV2UG9pbnQueSA6IDApICsgY29tbWFuZFBhcmFtcy5zaGlmdCgpXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICBjYXNlICdUJzpcbiAgICAgICAgICAgIHZhciB0eCA9IChyZWxhdGl2ZSA/IHByZXZQb2ludC54IDogMCkgKyBjb21tYW5kUGFyYW1zLnNoaWZ0KCk7XG4gICAgICAgICAgICB2YXIgdHkgPSAocmVsYXRpdmUgPyBwcmV2UG9pbnQueSA6IDApICsgY29tbWFuZFBhcmFtcy5zaGlmdCgpO1xuXG4gICAgICAgICAgICB2YXIgdHgxID0gdm9pZCAwO1xuICAgICAgICAgICAgdmFyIHR5MSA9IHZvaWQgMDtcblxuICAgICAgICAgICAgaWYgKHByZXZQb2ludC5jdXJ2ZSAmJiBwcmV2UG9pbnQuY3VydmUudHlwZSA9PT0gJ3F1YWRyYXRpYycpIHtcbiAgICAgICAgICAgICAgdmFyIF9kaWZmID0ge1xuICAgICAgICAgICAgICAgIHg6IE1hdGguYWJzKHByZXZQb2ludC54IC0gcHJldlBvaW50LmN1cnZlLngxKSxcbiAgICAgICAgICAgICAgICB5OiBNYXRoLmFicyhwcmV2UG9pbnQueSAtIHByZXZQb2ludC5jdXJ2ZS55MSlcbiAgICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgICB0eDEgPSBwcmV2UG9pbnQueCA8IHByZXZQb2ludC5jdXJ2ZS54MSA/IHByZXZQb2ludC54IC0gX2RpZmYueCA6IHByZXZQb2ludC54ICsgX2RpZmYueDtcbiAgICAgICAgICAgICAgdHkxID0gcHJldlBvaW50LnkgPCBwcmV2UG9pbnQuY3VydmUueTEgPyBwcmV2UG9pbnQueSAtIF9kaWZmLnkgOiBwcmV2UG9pbnQueSArIF9kaWZmLnk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICB0eDEgPSBwcmV2UG9pbnQueDtcbiAgICAgICAgICAgICAgdHkxID0gcHJldlBvaW50Lnk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHBvaW50cy5wdXNoKHsgY3VydmU6IHsgdHlwZTogJ3F1YWRyYXRpYycsIHgxOiB0eDEsIHkxOiB0eTEgfSwgeDogdHgsIHk6IHR5IH0pO1xuXG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgX3ByZXZQb2ludCA9IHBvaW50c1twb2ludHMubGVuZ3RoIC0gMV0gfHwgeyB4OiAwLCB5OiAwIH07XG5cbiAgICAgIGlmIChfcHJldlBvaW50LnggIT09IG1vdmVUby54IHx8IF9wcmV2UG9pbnQueSAhPT0gbW92ZVRvLnkpIHtcbiAgICAgICAgcG9pbnRzLnB1c2goeyB4OiBtb3ZlVG8ueCwgeTogbW92ZVRvLnkgfSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHBvaW50cztcbn07XG5cbnZhciBnZXRQb2ludHNGcm9tUG9seWdvbiA9IGZ1bmN0aW9uIGdldFBvaW50c0Zyb21Qb2x5Z29uKF9yZWY2KSB7XG4gIHZhciBwb2ludHMgPSBfcmVmNi5wb2ludHM7XG5cbiAgcmV0dXJuIGdldFBvaW50c0Zyb21Qb2ludHMoeyBjbG9zZWQ6IHRydWUsIHBvaW50czogcG9pbnRzIH0pO1xufTtcblxudmFyIGdldFBvaW50c0Zyb21Qb2x5bGluZSA9IGZ1bmN0aW9uIGdldFBvaW50c0Zyb21Qb2x5bGluZShfcmVmNykge1xuICB2YXIgcG9pbnRzID0gX3JlZjcucG9pbnRzO1xuXG4gIHJldHVybiBnZXRQb2ludHNGcm9tUG9pbnRzKHsgY2xvc2VkOiBmYWxzZSwgcG9pbnRzOiBwb2ludHMgfSk7XG59O1xuXG52YXIgZ2V0UG9pbnRzRnJvbVBvaW50cyA9IGZ1bmN0aW9uIGdldFBvaW50c0Zyb21Qb2ludHMoX3JlZjgpIHtcbiAgdmFyIGNsb3NlZCA9IF9yZWY4LmNsb3NlZCxcbiAgICAgIHBvaW50cyA9IF9yZWY4LnBvaW50cztcblxuICB2YXIgbnVtYmVycyA9IHBvaW50cy5zcGxpdCgvW1xccyxdKy8pLm1hcChmdW5jdGlvbiAobikge1xuICAgIHJldHVybiBwYXJzZUZsb2F0KG4pO1xuICB9KTtcblxuICB2YXIgcCA9IG51bWJlcnMucmVkdWNlKGZ1bmN0aW9uIChhcnIsIHBvaW50LCBpKSB7XG4gICAgaWYgKGkgJSAyID09PSAwKSB7XG4gICAgICBhcnIucHVzaCh7IHg6IHBvaW50IH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICBhcnJbKGkgLSAxKSAvIDJdLnkgPSBwb2ludDtcbiAgICB9XG5cbiAgICByZXR1cm4gYXJyO1xuICB9LCBbXSk7XG5cbiAgaWYgKGNsb3NlZCkge1xuICAgIHAucHVzaChfZXh0ZW5kcyh7fSwgcFswXSkpO1xuICB9XG5cbiAgcFswXS5tb3ZlVG8gPSB0cnVlO1xuXG4gIHJldHVybiBwO1xufTtcblxudmFyIGdldFBvaW50c0Zyb21SZWN0ID0gZnVuY3Rpb24gZ2V0UG9pbnRzRnJvbVJlY3QoX3JlZjkpIHtcbiAgdmFyIGhlaWdodCA9IF9yZWY5LmhlaWdodCxcbiAgICAgIHJ4ID0gX3JlZjkucngsXG4gICAgICByeSA9IF9yZWY5LnJ5LFxuICAgICAgd2lkdGggPSBfcmVmOS53aWR0aCxcbiAgICAgIHggPSBfcmVmOS54LFxuICAgICAgeSA9IF9yZWY5Lnk7XG5cbiAgaWYgKHJ4IHx8IHJ5KSB7XG4gICAgcmV0dXJuIGdldFBvaW50c0Zyb21SZWN0V2l0aENvcm5lclJhZGl1cyh7XG4gICAgICBoZWlnaHQ6IGhlaWdodCxcbiAgICAgIHJ4OiByeCB8fCByeSxcbiAgICAgIHJ5OiByeSB8fCByeCxcbiAgICAgIHdpZHRoOiB3aWR0aCxcbiAgICAgIHg6IHgsXG4gICAgICB5OiB5XG4gICAgfSk7XG4gIH1cblxuICByZXR1cm4gZ2V0UG9pbnRzRnJvbUJhc2ljUmVjdCh7IGhlaWdodDogaGVpZ2h0LCB3aWR0aDogd2lkdGgsIHg6IHgsIHk6IHkgfSk7XG59O1xuXG52YXIgZ2V0UG9pbnRzRnJvbUJhc2ljUmVjdCA9IGZ1bmN0aW9uIGdldFBvaW50c0Zyb21CYXNpY1JlY3QoX3JlZjEwKSB7XG4gIHZhciBoZWlnaHQgPSBfcmVmMTAuaGVpZ2h0LFxuICAgICAgd2lkdGggPSBfcmVmMTAud2lkdGgsXG4gICAgICB4ID0gX3JlZjEwLngsXG4gICAgICB5ID0gX3JlZjEwLnk7XG5cbiAgcmV0dXJuIFt7IHg6IHgsIHk6IHksIG1vdmVUbzogdHJ1ZSB9LCB7IHg6IHggKyB3aWR0aCwgeTogeSB9LCB7IHg6IHggKyB3aWR0aCwgeTogeSArIGhlaWdodCB9LCB7IHg6IHgsIHk6IHkgKyBoZWlnaHQgfSwgeyB4OiB4LCB5OiB5IH1dO1xufTtcblxudmFyIGdldFBvaW50c0Zyb21SZWN0V2l0aENvcm5lclJhZGl1cyA9IGZ1bmN0aW9uIGdldFBvaW50c0Zyb21SZWN0V2l0aENvcm5lclJhZGl1cyhfcmVmMTEpIHtcbiAgdmFyIGhlaWdodCA9IF9yZWYxMS5oZWlnaHQsXG4gICAgICByeCA9IF9yZWYxMS5yeCxcbiAgICAgIHJ5ID0gX3JlZjExLnJ5LFxuICAgICAgd2lkdGggPSBfcmVmMTEud2lkdGgsXG4gICAgICB4ID0gX3JlZjExLngsXG4gICAgICB5ID0gX3JlZjExLnk7XG5cbiAgdmFyIGN1cnZlID0geyB0eXBlOiAnYXJjJywgcng6IHJ4LCByeTogcnksIHN3ZWVwRmxhZzogMSB9O1xuXG4gIHJldHVybiBbeyB4OiB4ICsgcngsIHk6IHksIG1vdmVUbzogdHJ1ZSB9LCB7IHg6IHggKyB3aWR0aCAtIHJ4LCB5OiB5IH0sIHsgeDogeCArIHdpZHRoLCB5OiB5ICsgcnksIGN1cnZlOiBjdXJ2ZSB9LCB7IHg6IHggKyB3aWR0aCwgeTogeSArIGhlaWdodCAtIHJ5IH0sIHsgeDogeCArIHdpZHRoIC0gcngsIHk6IHkgKyBoZWlnaHQsIGN1cnZlOiBjdXJ2ZSB9LCB7IHg6IHggKyByeCwgeTogeSArIGhlaWdodCB9LCB7IHg6IHgsIHk6IHkgKyBoZWlnaHQgLSByeSwgY3VydmU6IGN1cnZlIH0sIHsgeDogeCwgeTogeSArIHJ5IH0sIHsgeDogeCArIHJ4LCB5OiB5LCBjdXJ2ZTogY3VydmUgfV07XG59O1xuXG52YXIgZ2V0UG9pbnRzRnJvbUcgPSBmdW5jdGlvbiBnZXRQb2ludHNGcm9tRyhfcmVmMTIpIHtcbiAgdmFyIHNoYXBlcyA9IF9yZWYxMi5zaGFwZXM7XG4gIHJldHVybiBzaGFwZXMubWFwKGZ1bmN0aW9uIChzKSB7XG4gICAgcmV0dXJuIHRvUG9pbnRzKHMpO1xuICB9KTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IHRvUG9pbnRzOyIsInZhciBfdHlwZW9mID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIHR5cGVvZiBTeW1ib2wuaXRlcmF0b3IgPT09IFwic3ltYm9sXCIgPyBmdW5jdGlvbiAob2JqKSB7IHJldHVybiB0eXBlb2Ygb2JqOyB9IDogZnVuY3Rpb24gKG9iaikgeyByZXR1cm4gb2JqICYmIHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBvYmouY29uc3RydWN0b3IgPT09IFN5bWJvbCAmJiBvYmogIT09IFN5bWJvbC5wcm90b3R5cGUgPyBcInN5bWJvbFwiIDogdHlwZW9mIG9iajsgfTtcblxudmFyIGdldEVycm9ycyA9IGZ1bmN0aW9uIGdldEVycm9ycyhzaGFwZSkge1xuICB2YXIgcnVsZXMgPSBnZXRSdWxlcyhzaGFwZSk7XG4gIHZhciBlcnJvcnMgPSBbXTtcblxuICBydWxlcy5tYXAoZnVuY3Rpb24gKF9yZWYpIHtcbiAgICB2YXIgbWF0Y2ggPSBfcmVmLm1hdGNoLFxuICAgICAgICBwcm9wID0gX3JlZi5wcm9wLFxuICAgICAgICByZXF1aXJlZCA9IF9yZWYucmVxdWlyZWQsXG4gICAgICAgIHR5cGUgPSBfcmVmLnR5cGU7XG5cbiAgICBpZiAodHlwZW9mIHNoYXBlW3Byb3BdID09PSAndW5kZWZpbmVkJykge1xuICAgICAgaWYgKHJlcXVpcmVkKSB7XG4gICAgICAgIGVycm9ycy5wdXNoKHByb3AgKyAnIHByb3AgaXMgcmVxdWlyZWQnICsgKHByb3AgPT09ICd0eXBlJyA/ICcnIDogJyBvbiBhICcgKyBzaGFwZS50eXBlKSk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmICh0eXBlb2YgdHlwZSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgaWYgKHR5cGUgPT09ICdhcnJheScpIHtcbiAgICAgICAgICBpZiAoIUFycmF5LmlzQXJyYXkoc2hhcGVbcHJvcF0pKSB7XG4gICAgICAgICAgICBlcnJvcnMucHVzaChwcm9wICsgJyBwcm9wIG11c3QgYmUgb2YgdHlwZSBhcnJheScpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmIChfdHlwZW9mKHNoYXBlW3Byb3BdKSAhPT0gdHlwZSkge1xuICAgICAgICAgIC8vIGVzbGludC1kaXNhYmxlLWxpbmUgdmFsaWQtdHlwZW9mXG4gICAgICAgICAgZXJyb3JzLnB1c2gocHJvcCArICcgcHJvcCBtdXN0IGJlIG9mIHR5cGUgJyArIHR5cGUpO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmIChBcnJheS5pc0FycmF5KG1hdGNoKSkge1xuICAgICAgICBpZiAobWF0Y2guaW5kZXhPZihzaGFwZVtwcm9wXSkgPT09IC0xKSB7XG4gICAgICAgICAgZXJyb3JzLnB1c2gocHJvcCArICcgcHJvcCBtdXN0IGJlIG9uZSBvZiAnICsgbWF0Y2guam9pbignLCAnKSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH0pO1xuXG4gIGlmIChzaGFwZS50eXBlID09PSAnZycgJiYgQXJyYXkuaXNBcnJheShzaGFwZS5zaGFwZXMpKSB7XG4gICAgdmFyIGNoaWxkRXJyb3JzID0gc2hhcGUuc2hhcGVzLm1hcChmdW5jdGlvbiAocykge1xuICAgICAgcmV0dXJuIGdldEVycm9ycyhzKTtcbiAgICB9KTtcbiAgICByZXR1cm4gW10uY29uY2F0LmFwcGx5KGVycm9ycywgY2hpbGRFcnJvcnMpO1xuICB9XG5cbiAgcmV0dXJuIGVycm9ycztcbn07XG5cbnZhciBnZXRSdWxlcyA9IGZ1bmN0aW9uIGdldFJ1bGVzKHNoYXBlKSB7XG4gIHZhciBydWxlcyA9IFt7XG4gICAgbWF0Y2g6IFsnY2lyY2xlJywgJ2VsbGlwc2UnLCAnbGluZScsICdwYXRoJywgJ3BvbHlnb24nLCAncG9seWxpbmUnLCAncmVjdCcsICdnJ10sXG4gICAgcHJvcDogJ3R5cGUnLFxuICAgIHJlcXVpcmVkOiB0cnVlLFxuICAgIHR5cGU6ICdzdHJpbmcnXG4gIH1dO1xuXG4gIHN3aXRjaCAoc2hhcGUudHlwZSkge1xuICAgIGNhc2UgJ2NpcmNsZSc6XG4gICAgICBydWxlcy5wdXNoKHsgcHJvcDogJ2N4JywgcmVxdWlyZWQ6IHRydWUsIHR5cGU6ICdudW1iZXInIH0pO1xuICAgICAgcnVsZXMucHVzaCh7IHByb3A6ICdjeScsIHJlcXVpcmVkOiB0cnVlLCB0eXBlOiAnbnVtYmVyJyB9KTtcbiAgICAgIHJ1bGVzLnB1c2goeyBwcm9wOiAncicsIHJlcXVpcmVkOiB0cnVlLCB0eXBlOiAnbnVtYmVyJyB9KTtcbiAgICAgIGJyZWFrO1xuXG4gICAgY2FzZSAnZWxsaXBzZSc6XG4gICAgICBydWxlcy5wdXNoKHsgcHJvcDogJ2N4JywgcmVxdWlyZWQ6IHRydWUsIHR5cGU6ICdudW1iZXInIH0pO1xuICAgICAgcnVsZXMucHVzaCh7IHByb3A6ICdjeScsIHJlcXVpcmVkOiB0cnVlLCB0eXBlOiAnbnVtYmVyJyB9KTtcbiAgICAgIHJ1bGVzLnB1c2goeyBwcm9wOiAncngnLCByZXF1aXJlZDogdHJ1ZSwgdHlwZTogJ251bWJlcicgfSk7XG4gICAgICBydWxlcy5wdXNoKHsgcHJvcDogJ3J5JywgcmVxdWlyZWQ6IHRydWUsIHR5cGU6ICdudW1iZXInIH0pO1xuICAgICAgYnJlYWs7XG5cbiAgICBjYXNlICdsaW5lJzpcbiAgICAgIHJ1bGVzLnB1c2goeyBwcm9wOiAneDEnLCByZXF1aXJlZDogdHJ1ZSwgdHlwZTogJ251bWJlcicgfSk7XG4gICAgICBydWxlcy5wdXNoKHsgcHJvcDogJ3gyJywgcmVxdWlyZWQ6IHRydWUsIHR5cGU6ICdudW1iZXInIH0pO1xuICAgICAgcnVsZXMucHVzaCh7IHByb3A6ICd5MScsIHJlcXVpcmVkOiB0cnVlLCB0eXBlOiAnbnVtYmVyJyB9KTtcbiAgICAgIHJ1bGVzLnB1c2goeyBwcm9wOiAneTInLCByZXF1aXJlZDogdHJ1ZSwgdHlwZTogJ251bWJlcicgfSk7XG4gICAgICBicmVhaztcblxuICAgIGNhc2UgJ3BhdGgnOlxuICAgICAgcnVsZXMucHVzaCh7IHByb3A6ICdkJywgcmVxdWlyZWQ6IHRydWUsIHR5cGU6ICdzdHJpbmcnIH0pO1xuICAgICAgYnJlYWs7XG5cbiAgICBjYXNlICdwb2x5Z29uJzpcbiAgICBjYXNlICdwb2x5bGluZSc6XG4gICAgICBydWxlcy5wdXNoKHsgcHJvcDogJ3BvaW50cycsIHJlcXVpcmVkOiB0cnVlLCB0eXBlOiAnc3RyaW5nJyB9KTtcbiAgICAgIGJyZWFrO1xuXG4gICAgY2FzZSAncmVjdCc6XG4gICAgICBydWxlcy5wdXNoKHsgcHJvcDogJ2hlaWdodCcsIHJlcXVpcmVkOiB0cnVlLCB0eXBlOiAnbnVtYmVyJyB9KTtcbiAgICAgIHJ1bGVzLnB1c2goeyBwcm9wOiAncngnLCB0eXBlOiAnbnVtYmVyJyB9KTtcbiAgICAgIHJ1bGVzLnB1c2goeyBwcm9wOiAncnknLCB0eXBlOiAnbnVtYmVyJyB9KTtcbiAgICAgIHJ1bGVzLnB1c2goeyBwcm9wOiAnd2lkdGgnLCByZXF1aXJlZDogdHJ1ZSwgdHlwZTogJ251bWJlcicgfSk7XG4gICAgICBydWxlcy5wdXNoKHsgcHJvcDogJ3gnLCByZXF1aXJlZDogdHJ1ZSwgdHlwZTogJ251bWJlcicgfSk7XG4gICAgICBydWxlcy5wdXNoKHsgcHJvcDogJ3knLCByZXF1aXJlZDogdHJ1ZSwgdHlwZTogJ251bWJlcicgfSk7XG4gICAgICBicmVhaztcblxuICAgIGNhc2UgJ2cnOlxuICAgICAgcnVsZXMucHVzaCh7IHByb3A6ICdzaGFwZXMnLCByZXF1aXJlZDogdHJ1ZSwgdHlwZTogJ2FycmF5JyB9KTtcbiAgICAgIGJyZWFrO1xuICB9XG5cbiAgcmV0dXJuIHJ1bGVzO1xufTtcblxudmFyIHZhbGlkID0gZnVuY3Rpb24gdmFsaWQoc2hhcGUpIHtcbiAgdmFyIGVycm9ycyA9IGdldEVycm9ycyhzaGFwZSk7XG5cbiAgcmV0dXJuIHtcbiAgICBlcnJvcnM6IGVycm9ycyxcbiAgICB2YWxpZDogZXJyb3JzLmxlbmd0aCA9PT0gMFxuICB9O1xufTtcblxuZXhwb3J0IGRlZmF1bHQgdmFsaWQ7IiwidmFyIGc7XG5cbi8vIFRoaXMgd29ya3MgaW4gbm9uLXN0cmljdCBtb2RlXG5nID0gKGZ1bmN0aW9uKCkge1xuXHRyZXR1cm4gdGhpcztcbn0pKCk7XG5cbnRyeSB7XG5cdC8vIFRoaXMgd29ya3MgaWYgZXZhbCBpcyBhbGxvd2VkIChzZWUgQ1NQKVxuXHRnID0gZyB8fCBuZXcgRnVuY3Rpb24oXCJyZXR1cm4gdGhpc1wiKSgpO1xufSBjYXRjaCAoZSkge1xuXHQvLyBUaGlzIHdvcmtzIGlmIHRoZSB3aW5kb3cgcmVmZXJlbmNlIGlzIGF2YWlsYWJsZVxuXHRpZiAodHlwZW9mIHdpbmRvdyA9PT0gXCJvYmplY3RcIikgZyA9IHdpbmRvdztcbn1cblxuLy8gZyBjYW4gc3RpbGwgYmUgdW5kZWZpbmVkLCBidXQgbm90aGluZyB0byBkbyBhYm91dCBpdC4uLlxuLy8gV2UgcmV0dXJuIHVuZGVmaW5lZCwgaW5zdGVhZCBvZiBub3RoaW5nIGhlcmUsIHNvIGl0J3Ncbi8vIGVhc2llciB0byBoYW5kbGUgdGhpcyBjYXNlLiBpZighZ2xvYmFsKSB7IC4uLn1cblxubW9kdWxlLmV4cG9ydHMgPSBnO1xuIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgUmluZyB7XHJcbiAgY29uc3RydWN0b3IobnVtUG9pbnRzLCByYWRpdXMsIGNlbnRlclggPSB1bmRlZmluZWQsIGNlbnRlclkgPSB1bmRlZmluZWQpIHtcclxuICAgIHRoaXMubnVtUG9pbnRzID0gbnVtUG9pbnRzO1xyXG4gICAgdGhpcy5yYWRpdXMgPSByYWRpdXM7XHJcbiAgICB0aGlzLnJhZGl1c09mZnNldCA9IDA7XHJcbiAgICBcclxuICAgIHRoaXMucG9pbnRzID0gW107XHJcblxyXG4gICAgdGhpcy5hbmdsZSA9IDA7XHJcbiAgICB0aGlzLnZlbG9jaXR5ID0gKE1hdGgucmFuZG9tKCkgKiAoMTAgLSA3KSArIDcpIC8gMTAwMDA7XHJcbiAgICB0aGlzLnZlbG9jaXR5ID0gKChNYXRoLnJhbmRvbSgpICogKDEgLSAtMSkgKyAtMSkgPCAwKSA/IHRoaXMudmVsb2NpdHkgKj0gLTEgOiB0aGlzLnZlbG9jaXR5OyBcclxuICAgIHRoaXMuYW5pbWF0aW9uTW9kZSA9ICdyb3RhdGlvbic7XHJcbiAgICB0aGlzLl9hbmltYXRpb25Db3VudGVyID0gMDtcclxuXHJcbiAgICB0aGlzLmNlbnRlciA9IHt9O1xyXG4gICAgdGhpcy5jZW50ZXIueCA9IChjZW50ZXJYICE9IHVuZGVmaW5lZCkgPyBjZW50ZXJYIDogd2luZG93LmlubmVyV2lkdGggLyAyO1xyXG4gICAgdGhpcy5jZW50ZXIueSA9IChjZW50ZXJZICE9IHVuZGVmaW5lZCkgPyBjZW50ZXJZIDogd2luZG93LmlubmVySGVpZ2h0IC8gMjtcclxuXHJcbiAgICB0aGlzLnN1YnJpbmdzID0gW107XHJcblxyXG4gICAgdGhpcy5nZW5lcmF0ZSgpO1xyXG4gIH1cclxuXHJcbiAgLy8gU3R1ZmYgdGhpcy5wb2ludHMgd2l0aCByZWFsIHBvaW50IGNvb3JkaW5hdGVzIHVzaW5nIHRoaXMubnVtUG9pbnRzIGFuZCB0aGlzLnJhZGl1c1xyXG4gIGdlbmVyYXRlKCkge1xyXG4gICAgdGhpcy5wb2ludHMgPSBbXTtcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5udW1Qb2ludHM7IGkrKykge1xyXG4gICAgICB0aGlzLnBvaW50cy5wdXNoKFtcclxuICAgICAgICB0aGlzLmNlbnRlci54ICsgKHRoaXMucmFkaXVzICsgdGhpcy5yYWRpdXNPZmZzZXQpICogTWF0aC5jb3MoKCgzNjAgLyB0aGlzLm51bVBvaW50cykgKiAoTWF0aC5QSS8xODApICogaSkgKyB0aGlzLmFuZ2xlKSxcclxuICAgICAgICB0aGlzLmNlbnRlci55ICsgKHRoaXMucmFkaXVzICsgdGhpcy5yYWRpdXNPZmZzZXQpICogTWF0aC5zaW4oKCgzNjAgLyB0aGlzLm51bVBvaW50cykgKiAoTWF0aC5QSS8xODApICogaSkgKyB0aGlzLmFuZ2xlKVxyXG4gICAgICBdKTtcclxuICAgIH1cclxuXHJcbiAgICBmb3IobGV0IHJpbmcgb2YgdGhpcy5zdWJyaW5ncykge1xyXG4gICAgICByaW5nLmdlbmVyYXRlKCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBpdGVyYXRlKCkge1xyXG4gICAgc3dpdGNoKHRoaXMuYW5pbWF0aW9uTW9kZSkge1xyXG4gICAgICBjYXNlICdyb3RhdGlvbic6XHJcbiAgICAgICAgdGhpcy5hbmdsZSArPSB0aGlzLnZlbG9jaXR5O1xyXG4gICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgY2FzZSAncmFkaXVzJzpcclxuICAgICAgICB0aGlzLnJhZGl1cyArPSAoTWF0aC5zaW4odGhpcy5fYW5pbWF0aW9uQ291bnRlciAqIChNYXRoLlBJLzE4MCkpICogTWF0aC5jb3ModGhpcy5fYW5pbWF0aW9uQ291bnRlciAqIChNYXRoLlBJLzE4MCkpKSAqIDEwO1xyXG5cclxuICAgICAgICBpZih0aGlzLl9hbmltYXRpb25Db3VudGVyICsgMSA+PSAzNjApIHtcclxuICAgICAgICAgIHRoaXMuX2FuaW1hdGlvbkNvdW50ZXIgPSAwO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICB0aGlzLl9hbmltYXRpb25Db3VudGVyKys7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBicmVhaztcclxuICAgIH1cclxuXHJcbiAgICBmb3IobGV0IFtpbmRleCxzdWJyaW5nXSBvZiB0aGlzLnN1YnJpbmdzLmVudHJpZXMoKSkge1xyXG4gICAgICBzdWJyaW5nLmNlbnRlci54ID0gdGhpcy5wb2ludHNbaW5kZXhdWzBdO1xyXG4gICAgICBzdWJyaW5nLmNlbnRlci55ID0gdGhpcy5wb2ludHNbaW5kZXhdWzFdO1xyXG4gICAgICBzdWJyaW5nLml0ZXJhdGUoKTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLmdlbmVyYXRlKCk7XHJcbiAgfVxyXG59IiwiaW1wb3J0ICogYXMgZGF0IGZyb20gJ2RhdC5ndWknO1xyXG5pbXBvcnQgUmluZyBmcm9tIFwiLi9SaW5nXCI7XHJcbmltcG9ydCB7IGV4cG9ydFNWRyB9IGZyb20gJy4vZXhwb3J0LWZ1bmN0aW9ucyc7XHJcbmltcG9ydCB7IGdldFZvcm9ub2lQb2x5Z29ucyB9IGZyb20gJy4vdm9yb25vaS1mdW5jdGlvbnMnO1xyXG5cclxubGV0IGlzUGF1c2VkID0gZmFsc2UsXHJcbiAgcG9pbnRzID0gW10sXHJcbiAgY2VsbHMgPSBbXSxcclxuICByaW5ncyA9IFtdLFxyXG4gIGd1aSxcclxuICBndWlFbGVtZW50cyA9IHt9LFxyXG4gIGd1aVZhcmlhYmxlcyA9IHtcclxuICAgIHJpbmdzOiBbXSxcclxuICAgIG51bVJpbmdzOiAzLFxyXG4gICAgaW52ZXJ0Q29sb3JzOiBmYWxzZSxcclxuICAgIGJsdXJFZmZlY3Q6IGZhbHNlLFxyXG4gICAgc2hvd1BvaW50czogZmFsc2VcclxuICB9O1xyXG4gIFxyXG5jb25zdCBtYXhQb3NzaWJsZVJhZGl1cyA9ICh3aW5kb3cuaW5uZXJXaWR0aCA+IHdpbmRvdy5pbm5lckhlaWdodCkgPyB3aW5kb3cuaW5uZXJIZWlnaHQvMiAtIDEwIDogd2luZG93LmlubmVyV2lkdGgvMiAtIDEwO1xyXG5cclxuY29uc3Qgc2tldGNoID0gZnVuY3Rpb24gKHA1KSB7XHJcbiAgLypcclxuICAgIFNldHVwXHJcbiAgICA9PT09PVxyXG4gICovXHJcbiAgcDUuc2V0dXAgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICBwNS5jcmVhdGVDYW52YXMod2luZG93LmlubmVyV2lkdGgsIHdpbmRvdy5pbm5lckhlaWdodCk7XHJcbiAgICBpbml0aWFsaXplR1VJKCk7XHJcbiAgICByZWJ1aWxkR1VJKCk7XHJcbiAgICBnZW5lcmF0ZVJpbmdzKCk7XHJcbiAgfVxyXG4gIFxyXG5cclxuICAvKlxyXG4gICAgRHJhd1xyXG4gICAgPT09PVxyXG4gICovXHJcbiAgcDUuZHJhdyA9IGZ1bmN0aW9uICgpIHtcclxuICAgIC8vIE1vdmUgYWxsIHRoZSByaW5nc1xyXG4gICAgaWYoIWlzUGF1c2VkKSB7XHJcbiAgICAgIGZvcihsZXQgcmluZyBvZiByaW5ncykge1xyXG4gICAgICAgIHJpbmcuaXRlcmF0ZSgpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICAvLyBHZXQgdGhlIGxhdGVzdCBwb2ludHNcclxuICAgICAgcG9pbnRzID0gZ2V0UG9pbnRzKCk7XHJcbiAgICB9XHJcblxyXG4gICAgZHJhd1Zvcm9ub2koKTtcclxuICAgIGRyYXdQb2ludHMoKTtcclxuICB9XHJcblxyXG5cclxuICAvKlxyXG4gICAgRHJhd2luZyBmdW5jdGlvbnNcclxuICAgID09PT09PT09PT09PT09PT09XHJcbiAgKi9cclxuXHJcbiAgLy8gRHJhdyB0aGUgVm9yb25vaSBkaWFncmFtIGZvciBhIHNldCBvZiBwb2ludHNcclxuICBmdW5jdGlvbiBkcmF3Vm9yb25vaSgpIHtcclxuICAgIC8vIFNldCBjb2xvcnNcclxuICAgIGlmIChndWlWYXJpYWJsZXMuaW52ZXJ0Q29sb3JzKSB7XHJcbiAgICAgIGlmKGd1aVZhcmlhYmxlcy5ibHVyRWZmZWN0KSB7XHJcbiAgICAgICAgcDUuYmFja2dyb3VuZCgwLCAyMCk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgcDUuYmFja2dyb3VuZCgwKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgcDUuc3Ryb2tlKDI1NSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBpZihndWlWYXJpYWJsZXMuYmx1ckVmZmVjdCkge1xyXG4gICAgICAgIHA1LmJhY2tncm91bmQoMjU1LCAyNSk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgcDUuYmFja2dyb3VuZCgyNTUpO1xyXG4gICAgICB9XHJcbiAgICAgIFxyXG4gICAgICBwNS5zdHJva2UoMCk7XHJcbiAgICB9XHJcblxyXG4gICAgcDUubm9GaWxsKCk7XHJcblxyXG4gICAgLy8gRXh0cmFjdCBwb2x5Z29ucyBmcm9tIFZvcm9ub2kgZGlhZ3JhbVxyXG4gICAgY2VsbHMgPSBnZXRWb3Jvbm9pUG9seWdvbnMocG9pbnRzKTtcclxuXHJcbiAgICAvLyBEcmF3IHJhdyBwb2x5Z29uc1xyXG4gICAgZm9yIChjb25zdCBjZWxsIG9mIGNlbGxzKSB7XHJcbiAgICAgIHA1LmJlZ2luU2hhcGUoKTtcclxuXHJcbiAgICAgIGZvciAoY29uc3QgdmVydGV4IG9mIGNlbGwpIHtcclxuICAgICAgICBwNS52ZXJ0ZXgodmVydGV4WzBdLCB2ZXJ0ZXhbMV0pO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBwNS5lbmRTaGFwZSgpO1xyXG4gICAgfVxyXG4gIH1cclxuICBcclxuICAvLyBEcmF3IGRvdHMgZm9yIGVhY2ggb2YgdGhlIHBvaW50c1xyXG4gIGZ1bmN0aW9uIGRyYXdQb2ludHMoKSB7XHJcbiAgICBpZiAoZ3VpVmFyaWFibGVzLnNob3dQb2ludHMpIHtcclxuICAgICAgLy8gU2V0IGNvbG9yc1xyXG4gICAgICBwNS5ub1N0cm9rZSgpO1xyXG5cclxuICAgICAgaWYgKGd1aVZhcmlhYmxlcy5pbnZlcnRDb2xvcnMpIHtcclxuICAgICAgICBwNS5maWxsKDEwMCk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgcDUuZmlsbCgyMDApO1xyXG4gICAgICB9XHJcblxyXG4gICAgICAvLyBEcmF3IHRoZSBwb2ludHNcclxuICAgICAgZm9yIChsZXQgcG9pbnQgb2YgcG9pbnRzKSB7XHJcbiAgICAgICAgcDUuZWxsaXBzZShwb2ludFswXSwgcG9pbnRbMV0sIDUpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBcclxuICAvKlxyXG4gICAgQ3JlYXRlIFJpbmcgb2JqZWN0c1xyXG4gICAgPT09PT09PT09PT09PT09PT09PVxyXG4gICovXHJcbiAgXHJcbiAgLy8gQ3JlYXRlIFJpbmcgb2JqZWN0cyBiYXNlZCBvbiBjdXJyZW50IHZhbHVlcyBmcm9tIEdVSVxyXG4gIGZ1bmN0aW9uIGdlbmVyYXRlUmluZ3MoKSB7XHJcbiAgICByaW5ncyA9IFtdO1xyXG5cclxuICAgIC8vIENyZWF0ZSBSaW5nIG9iamVjdHMgdXNpbmcgcGFyYW1zIHN0b3JlZCBpbiBndWlWYXJpYWJsZXNcclxuICAgIGZvcihsZXQgcmluZ1BhcmFtcyBvZiBndWlWYXJpYWJsZXMucmluZ3MpIHtcclxuICAgICAgbGV0IHJpbmcgPSBuZXcgUmluZyhyaW5nUGFyYW1zLm51bVBvaW50cywgcmluZ1BhcmFtcy5yYWRpdXMpO1xyXG4gICAgICByaW5nLnJhZGl1c09mZnNldCA9IHJpbmdQYXJhbXMucmFkaXVzT2Zmc2V0O1xyXG4gICAgICByaW5nLmFuaW1hdGlvbk1vZGUgPSByaW5nUGFyYW1zLmhhc093blByb3BlcnR5KCdhbmltYXRpb25Nb2RlJykgPyByaW5nUGFyYW1zLmFuaW1hdGlvbk1vZGUgOiByaW5nLmFuaW1hdGlvbk1vZGU7XHJcbiAgICAgIHJpbmcudmVsb2NpdHkgPSByaW5nUGFyYW1zLnZlbG9jaXR5IC8gMTAwMDA7XHJcblxyXG4gICAgICAvLyBHZW5lcmF0ZSBzdWJyaW5ncyBmb3IgZWFjaCBwb2ludCBvZiB0aGlzIHJpbmcsIGlmIHNwZWNpZmllZFxyXG4gICAgICBpZihyaW5nUGFyYW1zLmhhc1N1YnJpbmdzKSB7XHJcbiAgICAgICAgZm9yKGxldCBwb2ludCBvZiByaW5nLnBvaW50cykge1xyXG4gICAgICAgICAgbGV0IHN1YnJpbmcgPSBuZXcgUmluZyhyaW5nUGFyYW1zLnN1YnJpbmdOdW1Qb2ludHMsIHJpbmdQYXJhbXMuc3VicmluZ1JhZGl1cywgcG9pbnRbMF0sIHBvaW50WzFdKTtcclxuICAgICAgICAgIHN1YnJpbmcuYW5pbWF0aW9uTW9kZSA9IHJpbmdQYXJhbXMuc3VicmluZ0FuaW1hdGlvbk1vZGU7XHJcbiAgICAgICAgICBzdWJyaW5nLnZlbG9jaXR5ID0gcmluZ1BhcmFtcy5zdWJyaW5nVmVsb2NpdHkgLyAxMDAwMDtcclxuICAgICAgICAgIHJpbmcuc3VicmluZ3MucHVzaChzdWJyaW5nKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHJpbmdzLnB1c2gocmluZyk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gUnVuIGEgc2luZ2xlIGl0ZXJhdGlvbiB3aGVuIHBhdXNlZCB0byBmb3JjZSBhIG5ldyBkaWFncmFtIHRvIGJlIGRyYXduXHJcbiAgICBpZihpc1BhdXNlZCkge1xyXG4gICAgICBmb3IobGV0IHJpbmcgb2YgcmluZ3MpIHtcclxuICAgICAgICByaW5nLml0ZXJhdGUoKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgLy8gR2V0IHRoZSBsYXRlc3QgcG9pbnRzXHJcbiAgICAgIHBvaW50cyA9IGdldFBvaW50cygpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgZnVuY3Rpb24gZ2V0UG9pbnRzKCkge1xyXG4gICAgbGV0IHB0cyA9IFtdO1xyXG5cclxuICAgIC8vIEV4dHJhY3QgYWxsIHBvaW50cyBmcm9tIGFsbCByaW5ncyBhbmQgc3ViLXJpbmdzIFxyXG4gICAgZm9yKGxldCByaW5nIG9mIHJpbmdzKSB7XHJcbiAgICAgIGZvcihsZXQgcG9pbnQgb2YgcmluZy5wb2ludHMpIHtcclxuICAgICAgICBwdHMucHVzaChwb2ludCk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGZvcihsZXQgc3VicmluZyBvZiByaW5nLnN1YnJpbmdzKSB7XHJcbiAgICAgICAgZm9yKGxldCBwb2ludCBvZiBzdWJyaW5nLnBvaW50cykge1xyXG4gICAgICAgICAgcHRzLnB1c2gocG9pbnQpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBwdHM7XHJcbiAgfVxyXG5cclxuICAvLyBHZW5lcmF0ZSBldmVubHktc3BhY2UgcmFkaXVzIHZhbHVlcyBmb3IgZWFjaCByaW5nIC0gY2FsbGVkIHdoZW4gbnVtUmluZ3MgY2hhbmdlc1xyXG4gIGZ1bmN0aW9uIGNhbGN1bGF0ZVJpbmdSYWRpaSgpIHtcclxuICAgIGZvcihsZXQgW2luZGV4LCByaW5nUGFyYW1zXSBvZiBndWlWYXJpYWJsZXMucmluZ3MuZW50cmllcygpKSB7XHJcbiAgICAgIHJpbmdQYXJhbXMucmFkaXVzID0gZ3VpVmFyaWFibGVzLm1heFJhZGl1cyAtICgoZ3VpVmFyaWFibGVzLm1heFJhZGl1cyAtIGd1aVZhcmlhYmxlcy5taW5SYWRpdXMpIC8gZ3VpVmFyaWFibGVzLm51bVJpbmdzKSAqIChpbmRleCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvLyBBZGp1c3QgbnVtYmVyIG9mIHJpbmdzIGluIHBhcmFtcyBhcnJheSBiYXNlZCBvbiBjaGFuZ2VzIHRvIG51bVJpbmdzIHNsaWRlclxyXG4gIGZ1bmN0aW9uIGFkanVzdFJpbmdBcnJheSgpIHtcclxuICAgIGlmKGd1aVZhcmlhYmxlcy5udW1SaW5ncyA8IGd1aVZhcmlhYmxlcy5yaW5ncy5sZW5ndGgpIHsgICAvLyBudW1SaW5ncyBkZWNyZWFzZWQgLSByZWR1Y2UgdGhlIGFycmF5IHNpemVcclxuICAgICAgZ3VpVmFyaWFibGVzLnJpbmdzID0gZ3VpVmFyaWFibGVzLnJpbmdzLnNsaWNlKDAsIGd1aVZhcmlhYmxlcy5udW1SaW5ncyk7XHJcbiAgICAgIFxyXG4gICAgfSBlbHNlIGlmKGd1aVZhcmlhYmxlcy5udW1SaW5ncyA+IGd1aVZhcmlhYmxlcy5yaW5ncy5sZW5ndGgpIHsgICAgLy8gbnVtUmluZ3MgaW5jcmVhc2VkIC0gZ2VuZXJhdGUgbmV3IHJpbmcgcGFyYW1zXHJcbiAgICAgIGZvcihsZXQgaT0wOyBpIDwgTWF0aC5hYnMoZ3VpVmFyaWFibGVzLm51bVJpbmdzIC0gZ3VpVmFyaWFibGVzLnJpbmdzLmxlbmd0aCk7IGkrKykge1xyXG4gICAgICAgIGd1aVZhcmlhYmxlcy5yaW5ncy5wdXNoKGdlbmVyYXRlUmFuZG9tUmluZ1BhcmFtcygpKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcblxyXG4gIC8qXHJcbiAgICBVSSBmdW5jdGlvbnNcclxuICAgID09PT09PT09PT09PVxyXG4gICovXHJcblxyXG4gIC8vIENyZWF0ZSB0aGUgVUkgcGFuZWwgd2l0aCByYW5kb20gaW5pdGlhbCB2YWx1ZXNcclxuICBmdW5jdGlvbiBpbml0aWFsaXplR1VJKCkge1xyXG4gICAgZ3VpID0gbmV3IGRhdC5HVUkoKTtcclxuICAgIGd1aS53aWR0aCA9IDMwMDtcclxuICAgIHJhbmRvbWl6ZSgpO1xyXG4gIH1cclxuXHJcbiAgLy8gQnVpbGQgdGhlIGRhdC5ndWkgaW50ZXJmYWNlXHJcbiAgZnVuY3Rpb24gcmVidWlsZEdVSShvcGVuZWRGb2xkZXJzID0gW10pIHtcclxuICAgIC8vIFJlbW92ZSBhbGwgZWxlbWVudHMgc28gdGhhdCByaW5nIGZvbGRlcnMgY2FuIGJlIGFkZGVkL3JlbW92ZWRcclxuICAgIGZvcihsZXQgZWxlbWVudCBvZiBPYmplY3Qua2V5cyhndWlFbGVtZW50cykpIHtcclxuICAgICAgaWYoZWxlbWVudCAhPSAnZm9sZGVycycpIHtcclxuICAgICAgICBndWkucmVtb3ZlKGd1aUVsZW1lbnRzW2VsZW1lbnRdKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBmb3IobGV0IGZvbGRlciBvZiBndWlFbGVtZW50c1tlbGVtZW50XSkge1xyXG4gICAgICAgICAgZ3VpLnJlbW92ZUZvbGRlcihmb2xkZXIpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGd1aUVsZW1lbnRzID0ge307XHJcblxyXG4gICAgLy8gQnV0dG9uIGZ1bmN0aW9uc1xyXG4gICAgbGV0IGd1aUZ1bmN0aW9ucyA9IHtcclxuICAgICAgcmFuZG9taXplOiBmdW5jdGlvbigpIHsgcmFuZG9taXplKCk7IHJlYnVpbGRHVUkoKTsgZ2VuZXJhdGVSaW5ncygpOyB9LFxyXG4gICAgICBleHBvcnQ6ICAgIGZ1bmN0aW9uKCkgeyBleHBvcnRTVkcoY2VsbHMpIH0sXHJcbiAgICAgIC8vIGRlbGV0ZTogICAgZnVuY3Rpb24oKSB7fVxyXG4gICAgfVxyXG5cclxuICAgIC8vIE51bWJlciBvZiByaW5ncyBzbGlkZXJcclxuICAgIGd1aUVsZW1lbnRzLm51bVJpbmdzU2xpZGVyID0gZ3VpLmFkZChndWlWYXJpYWJsZXMsICdudW1SaW5ncycsIDEsIDEwLCAxKS5uYW1lKCdOdW1iZXIgb2YgcmluZ3MnKS5vbkNoYW5nZShmdW5jdGlvbigpIHtcclxuICAgICAgYWRqdXN0UmluZ0FycmF5KCk7XHJcbiAgICAgIGNhbGN1bGF0ZVJpbmdSYWRpaSgpO1xyXG4gICAgICBnZW5lcmF0ZVJpbmdzKCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICAvLyBNYXgvbWluIHJhZGlpXHJcbiAgICBndWlFbGVtZW50cy5tYXhSYWRpdXNTbGlkZXIgPSBndWkuYWRkKGd1aVZhcmlhYmxlcywgJ21heFJhZGl1cycsIDEwMCwgbWF4UG9zc2libGVSYWRpdXMsIDEpLm5hbWUoJ01heGltdW0gcmFkaXVzJykub25DaGFuZ2UoZnVuY3Rpb24oKSB7XHJcbiAgICAgIGNhbGN1bGF0ZVJpbmdSYWRpaSgpO1xyXG4gICAgICBnZW5lcmF0ZVJpbmdzKCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBndWlFbGVtZW50cy5taW5SYWRpdXNTbGlkZXIgPSBndWkuYWRkKGd1aVZhcmlhYmxlcywgJ21pblJhZGl1cycsIDEsIDEwMCwgMSkubmFtZSgnTWluaW11bSByYWRpdXMnKS5vbkNoYW5nZShmdW5jdGlvbigpIHtcclxuICAgICAgY2FsY3VsYXRlUmluZ1JhZGlpKCk7XHJcbiAgICAgIGdlbmVyYXRlUmluZ3MoKTtcclxuICAgIH0pO1xyXG5cclxuICAgIC8vIEZvbGRlcnMgZm9yIGVhY2ggcmluZ1xyXG4gICAgZ3VpRWxlbWVudHMuZm9sZGVycyA9IFtdO1xyXG4gICAgZm9yKGxldCBbaW5kZXgsIHJpbmddIG9mIGd1aVZhcmlhYmxlcy5yaW5ncy5lbnRyaWVzKCkpIHtcclxuICAgICAgbGV0IGZvbGRlciA9IGd1aS5hZGRGb2xkZXIoJ1JpbmcgJyArIChpbmRleCArIDEpKTtcclxuXHJcbiAgICAgIC8vIFJpbmcgb3B0aW9uc1xyXG4gICAgICBmb2xkZXIuYWRkKHJpbmcsICdudW1Qb2ludHMnLCAxLCAxMDAsIDEpLm5hbWUoJ051bWJlciBvZiBwb2ludHMnKS5vbkNoYW5nZShnZW5lcmF0ZVJpbmdzKTtcclxuICAgICAgZm9sZGVyLmFkZChyaW5nLCAncmFkaXVzT2Zmc2V0JywgLSgoZ3VpVmFyaWFibGVzLm1heFJhZGl1cyAtIGd1aVZhcmlhYmxlcy5taW5SYWRpdXMpIC8gZ3VpVmFyaWFibGVzLm51bVJpbmdzKSwgKGd1aVZhcmlhYmxlcy5tYXhSYWRpdXMgLSBndWlWYXJpYWJsZXMubWluUmFkaXVzKSAvIGd1aVZhcmlhYmxlcy5udW1SaW5ncykubmFtZSgnUmFkaXVzIG9mZnNldCcpLm9uQ2hhbmdlKGdlbmVyYXRlUmluZ3MpO1xyXG4gICAgICBmb2xkZXIuYWRkKHJpbmcsICdhbmltYXRpb25Nb2RlJywgWydyb3RhdGlvbicsICdyYWRpdXMnXSkubmFtZSgnQW5pbWF0aW9uIG1vZGUnKS5vbkNoYW5nZShnZW5lcmF0ZVJpbmdzKTtcclxuICAgICAgZm9sZGVyLmFkZChyaW5nLCAndmVsb2NpdHknLCAtMTAwLCAxMDAsIDEpLm5hbWUoJ1ZlbG9jaXR5Jykub25DaGFuZ2UoZ2VuZXJhdGVSaW5ncyk7XHJcblxyXG4gICAgICBmb2xkZXIuYWRkKHJpbmcsICdoYXNTdWJyaW5ncycpLm5hbWUoJ0hhcyBzdWJyaW5ncycpLm9uQ2hhbmdlKGZ1bmN0aW9uKGNoZWNrZWQpIHtcclxuICAgICAgICBpZihjaGVja2VkKSB7XHJcbiAgICAgICAgICByaW5nLnN1YnJpbmdOdW1Qb2ludHMgPSBwYXJzZUludChwNS5yYW5kb20oMSwgMTAwKSk7XHJcbiAgICAgICAgICByaW5nLnN1YnJpbmdSYWRpdXMgPSBwNS5yYW5kb20oMTAsIDEwMCk7XHJcbiAgICAgICAgICByaW5nLnN1YnJpbmdBbmltYXRpb25Nb2RlID0gJ3JvdGF0aW9uJztcclxuICAgICAgICAgIHJpbmcuc3VicmluZ1ZlbG9jaXR5ID0gcDUucmFuZG9tKC0uMDEsIC4wMSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIGRlbGV0ZSByaW5nLnN1YnJpbmdOdW1Qb2ludHM7XHJcbiAgICAgICAgICBkZWxldGUgcmluZy5zdWJyaW5nUmFkaXVzO1xyXG4gICAgICAgICAgZGVsZXRlIHJpbmcuc3VicmluZ0FuaW1hdGlvbk1vZGU7XHJcbiAgICAgICAgICBkZWxldGUgcmluZy5zdWJyaW5nVmVsb2NpdHk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgb3BlbmVkRm9sZGVycyA9IGdldE9wZW5lZEZvbGRlckluZGljZXMoKTtcclxuXHJcbiAgICAgICAgZ2VuZXJhdGVSaW5ncygpO1xyXG4gICAgICAgIHJlYnVpbGRHVUkob3BlbmVkRm9sZGVycyk7XHJcbiAgICAgIH0pO1xyXG5cclxuICAgICAgLy8gU3VicmluZyBvcHRpb25zXHJcbiAgICAgIGlmKHJpbmcuaGFzU3VicmluZ3MpIHtcclxuICAgICAgICBmb2xkZXIuYWRkKHJpbmcsICdzdWJyaW5nTnVtUG9pbnRzJywgMSwgMTAwLCAxKS5uYW1lKCdTdWJyaW5nIHBvaW50IGNvdW50Jykub25DaGFuZ2UoZ2VuZXJhdGVSaW5ncyk7XHJcbiAgICAgICAgZm9sZGVyLmFkZChyaW5nLCAnc3VicmluZ1JhZGl1cycsIDEwLCAxMDApLm5hbWUoJ1N1YnJpbmcgcmFkaXVzJykub25DaGFuZ2UoZ2VuZXJhdGVSaW5ncyk7XHJcbiAgICAgICAgZm9sZGVyLmFkZChyaW5nLCAnc3VicmluZ0FuaW1hdGlvbk1vZGUnLCBbJ3JvdGF0aW9uJywgJ3JhZGl1cyddKS5uYW1lKCdTdWJyaW5nIGFuaW1hdGlvbicpLm9uQ2hhbmdlKGdlbmVyYXRlUmluZ3MpO1xyXG4gICAgICAgIGZvbGRlci5hZGQocmluZywgJ3N1YnJpbmdWZWxvY2l0eScsIC0xMDAsIDEwMCwgMSkubmFtZSgnU3VicmluZyB2ZWxvY2l0eScpLm9uQ2hhbmdlKGdlbmVyYXRlUmluZ3MpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICAvLyBEZWxldGUgYnV0dG9uXHJcbiAgICAgIC8vIGZvbGRlci5hZGQoZ3VpRnVuY3Rpb25zLCAnZGVsZXRlJykubmFtZSgnRGVsZXRlIHRoaXMgcmluZycpLm9uQ2hhbmdlKGZ1bmN0aW9uKCkge1xyXG4gICAgICAvLyAgIGlmKE9iamVjdC5rZXlzKGd1aS5fX2ZvbGRlcnMpLmxlbmd0aCA+IDEpIHtcclxuICAgICAgLy8gICAgIC8vIFJlZHVjZSBhbmQgdXBkYXRlIHRoZSBudW1SaW5ncyBzbGlkZXIgdmFsdWVcclxuICAgICAgLy8gICAgIGd1aVZhcmlhYmxlcy5udW1SaW5ncy0tO1xyXG4gICAgICAvLyAgICAgZ3VpRWxlbWVudHMubnVtUmluZ3NTbGlkZXIuc2V0VmFsdWUoZ3VpVmFyaWFibGVzLm51bVJpbmdzKTtcclxuXHJcbiAgICAgIC8vICAgICAvLyBSZW1vdmUgdGhpcyBmb2xkZXIgZnJvbSB0aGUgR1VJXHJcbiAgICAgIC8vICAgICBndWlFbGVtZW50cy5mb2xkZXJzID0gZ3VpRWxlbWVudHMuZm9sZGVycy5zbGljZShpbmRleCwgaW5kZXgrMSk7XHJcbiAgICAgIC8vICAgICBndWkucmVtb3ZlRm9sZGVyKGZvbGRlcik7XHJcblxyXG4gICAgICAvLyAgICAgZ2VuZXJhdGVSaW5ncygpO1xyXG4gICAgICAvLyAgIH0gZWxzZSB7XHJcbiAgICAgIC8vICAgICBhbGVydCgnbmljZSB0cnknKTtcclxuICAgICAgLy8gICB9XHJcbiAgICAgIC8vIH0pO1xyXG5cclxuICAgICAgLy8gT3BlbiB0aGlzIGZvbGRlciBpZiByZXF1ZXN0ZWRcclxuICAgICAgaWYob3BlbmVkRm9sZGVycy5pbmNsdWRlcyhpbmRleCkpIHtcclxuICAgICAgICBmb2xkZXIub3BlbigpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBndWlFbGVtZW50cy5mb2xkZXJzLnB1c2goZm9sZGVyKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBGZWF0dXJlIHRvZ2dsZXNcclxuICAgIGd1aUVsZW1lbnRzLmludmVydENvbG9yc0NoZWNrYm94ID0gZ3VpLmFkZChndWlWYXJpYWJsZXMsICdpbnZlcnRDb2xvcnMnKS5uYW1lKCdJbnZlcnQgY29sb3JzJyk7XHJcbiAgICBndWlFbGVtZW50cy5ibHVyRWZmZWN0Q2hlY2tib3ggICA9IGd1aS5hZGQoZ3VpVmFyaWFibGVzLCAnYmx1ckVmZmVjdCcpLm5hbWUoJ0JsdXIgZWZmZWN0Jyk7XHJcbiAgICBndWlFbGVtZW50cy5zaG93UG9pbnRzQ2hlY2tib3ggICA9IGd1aS5hZGQoZ3VpVmFyaWFibGVzLCAnc2hvd1BvaW50cycpLm5hbWUoJ1Nob3cgcG9pbnRzJyk7XHJcblxyXG4gICAgLy8gQnV0dG9uc1xyXG4gICAgZ3VpRWxlbWVudHMucmFuZG9taXplQnV0dG9uID0gZ3VpLmFkZChndWlGdW5jdGlvbnMsICdyYW5kb21pemUnKS5uYW1lKCdSYW5kb21pemUnKTtcclxuICAgIGd1aUVsZW1lbnRzLmV4cG9ydEJ1dHRvbiAgID0gZ3VpLmFkZChndWlGdW5jdGlvbnMsICdleHBvcnQnKS5uYW1lKCdFeHBvcnQgYXMgU1ZHJyk7XHJcbiAgfVxyXG5cclxuXHJcbiAgLy8gUmFuZG9taXplIHRoZSBwYXJhbWV0ZXJzIHN0b3JlZCBpbiBndWlWYXJpYWJsZXNcclxuICBmdW5jdGlvbiByYW5kb21pemUoKSB7XHJcbiAgICBndWlWYXJpYWJsZXMubnVtUmluZ3MgPSBwYXJzZUludChwNS5yYW5kb20oMywxMCkpO1xyXG4gICAgZ3VpVmFyaWFibGVzLm1heFJhZGl1cyA9IHA1LnJhbmRvbShtYXhQb3NzaWJsZVJhZGl1cyAtIDIwMCwgbWF4UG9zc2libGVSYWRpdXMpO1xyXG4gICAgZ3VpVmFyaWFibGVzLm1pblJhZGl1cyA9IDEwO1xyXG4gICAgXHJcbiAgICBndWlWYXJpYWJsZXMucmluZ3MgPSBbXTtcclxuXHJcbiAgICBmb3IobGV0IGkgPSAwOyBpIDwgZ3VpVmFyaWFibGVzLm51bVJpbmdzOyBpKyspIHtcclxuICAgICAgbGV0IHJpbmdQYXJhbXMsIHBvaW50RGVuc2l0eTtcclxuICAgICAgXHJcbiAgICAgIC8vIFJpbmdzIG5lYXIgdGhlIGNlbnRlciBsb29rIGJldHRlciB3aXRoIGZld2VyIHBvaW50c1xyXG4gICAgICBpZiAoaSA+IDMpIHtcclxuICAgICAgICBwb2ludERlbnNpdHkgPSAnTE9XJztcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBwb2ludERlbnNpdHkgPSAnSElHSCc7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHJpbmdQYXJhbXMgPSBnZW5lcmF0ZVJhbmRvbVJpbmdQYXJhbXMocG9pbnREZW5zaXR5KTsgICAgICBcclxuICAgICAgZ3VpVmFyaWFibGVzLnJpbmdzLnB1c2gocmluZ1BhcmFtcyk7XHJcbiAgICB9XHJcblxyXG4gICAgY2FsY3VsYXRlUmluZ1JhZGlpKCk7XHJcbiAgfVxyXG4gIFxyXG4gIC8vIEdlbmVyYXRlIHJhbmRvbSBwYXJhbWV0ZXJzIGZvciBhIHNpbmdsZSByaW5nXHJcbiAgZnVuY3Rpb24gZ2VuZXJhdGVSYW5kb21SaW5nUGFyYW1zKHBvaW50RGVuc2l0eSA9ICdISUdIJykge1xyXG4gICAgbGV0IHJpbmdQYXJhbXMgPSB7fSwgcmFuZ2UgPSBbXTtcclxuXHJcbiAgICBzd2l0Y2gocG9pbnREZW5zaXR5KSB7XHJcbiAgICAgIGNhc2UgJ0xPVyc6XHJcbiAgICAgICAgcmFuZ2VbMF0gPSA1O1xyXG4gICAgICAgIHJhbmdlWzFdID0gMTA7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgJ0hJR0gnOlxyXG4gICAgICAgIHJhbmdlWzBdID0gMjA7XHJcbiAgICAgICAgcmFuZ2VbMV0gPSA3MDtcclxuICAgICAgICBicmVhaztcclxuICAgIH1cclxuXHJcbiAgICByaW5nUGFyYW1zLm51bVBvaW50cyA9IHBhcnNlSW50KHA1LnJhbmRvbShyYW5nZVswXSwgcmFuZ2VbMV0pKTtcclxuICAgIHJpbmdQYXJhbXMucmFkaXVzT2Zmc2V0ID0gcDUucmFuZG9tKCAtKChndWlWYXJpYWJsZXMubWF4UmFkaXVzIC0gZ3VpVmFyaWFibGVzLm1pblJhZGl1cykgLyBndWlWYXJpYWJsZXMubnVtUmluZ3MpIC8gMiwgKGd1aVZhcmlhYmxlcy5tYXhSYWRpdXMgLSBndWlWYXJpYWJsZXMubWluUmFkaXVzKSAvIGd1aVZhcmlhYmxlcy5udW1SaW5ncyAvIDIpO1xyXG4gICAgcmluZ1BhcmFtcy5hbmltYXRpb25Nb2RlID0gJ3JvdGF0aW9uJztcclxuICAgIHJpbmdQYXJhbXMudmVsb2NpdHkgPSBwNS5yYW5kb20oLTEwLCAxMCk7XHJcbiAgICByaW5nUGFyYW1zLmhhc1N1YnJpbmdzID0gZmFsc2U7XHJcblxyXG4gICAgcmV0dXJuIHJpbmdQYXJhbXM7XHJcbiAgfVxyXG5cclxuICAvLyBHZXQgYSBsaXN0IG9mIGFsbCB0aGUgZm9sZGVycyB0aGF0IGFyZSBjdXJyZW50bHkgb3BlbmVkXHJcbiAgZnVuY3Rpb24gZ2V0T3BlbmVkRm9sZGVySW5kaWNlcygpIHtcclxuICAgIGxldCBvcGVuZWRGb2xkZXJzID0gW10sXHJcbiAgICBmb2xkZXJFbGVtZW50cyA9IE9iamVjdC52YWx1ZXMoZ3VpLl9fZm9sZGVycyk7XHJcblxyXG4gICAgZm9yKGxldCBpPTA7IGk8Zm9sZGVyRWxlbWVudHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgaWYoIWZvbGRlckVsZW1lbnRzW2ldLmNsb3NlZCkge1xyXG4gICAgICAgIG9wZW5lZEZvbGRlcnMucHVzaChpKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBvcGVuZWRGb2xkZXJzO1xyXG4gIH1cclxuICBcclxuXHJcbiAgLypcclxuICAgIEtleSByZWxlYXNlZCBoYW5kbGVyXHJcbiAgICA9PT09PT09PT09PT09PT09PT09PVxyXG4gICovXHJcbiAgcDUua2V5UmVsZWFzZWQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICBzd2l0Y2ggKHA1LmtleSkge1xyXG4gICAgICBjYXNlICdyJzpcclxuICAgICAgICByYW5kb21pemUoKTtcclxuICAgICAgICBnZW5lcmF0ZVJpbmdzKCk7XHJcbiAgICAgICAgcmVidWlsZEdVSSgpO1xyXG4gICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgY2FzZSAncCc6XHJcbiAgICAgICAgZ3VpVmFyaWFibGVzLnNob3dQb2ludHMgPSAhZ3VpVmFyaWFibGVzLnNob3dQb2ludHM7XHJcbiAgICAgICAgcmVidWlsZEdVSShnZXRPcGVuZWRGb2xkZXJJbmRpY2VzKCkpO1xyXG4gICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgY2FzZSAnaSc6XHJcbiAgICAgICAgZ3VpVmFyaWFibGVzLmludmVydENvbG9ycyA9ICFndWlWYXJpYWJsZXMuaW52ZXJ0Q29sb3JzO1xyXG4gICAgICAgIHJlYnVpbGRHVUkoZ2V0T3BlbmVkRm9sZGVySW5kaWNlcygpKTtcclxuICAgICAgICBicmVhaztcclxuXHJcbiAgICAgIGNhc2UgJ2InOlxyXG4gICAgICAgIGd1aVZhcmlhYmxlcy5ibHVyRWZmZWN0ID0gIWd1aVZhcmlhYmxlcy5ibHVyRWZmZWN0O1xyXG4gICAgICAgIHJlYnVpbGRHVUkoZ2V0T3BlbmVkRm9sZGVySW5kaWNlcygpKTtcclxuICAgICAgICBicmVhaztcclxuXHJcbiAgICAgIGNhc2UgJyAnOlxyXG4gICAgICAgIGlzUGF1c2VkID0gIWlzUGF1c2VkO1xyXG4gICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgY2FzZSAnZSc6XHJcbiAgICAgICAgZXhwb3J0U1ZHKGNlbGxzKTtcclxuICAgICAgICBicmVhaztcclxuICAgIH1cclxuICB9XHJcbn1cclxuXHJcbi8vIExhdW5jaCB0aGUgc2tldGNoIHVzaW5nIHA1anMgaW4gaW5zdGFudGlhdGVkIG1vZGVcclxubmV3IHA1KHNrZXRjaCk7IiwiaW1wb3J0IHsgdG9QYXRoIH0gZnJvbSAnc3ZnLXBvaW50cyc7XHJcbmltcG9ydCB7IHNhdmVBcyB9IGZyb20gJ2ZpbGUtc2F2ZXInO1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGV4cG9ydFNWRyhwb2x5Z29ucykge1xyXG4gIC8vIFNldCB1cCA8c3ZnPiBlbGVtZW50XHJcbiAgbGV0IHN2ZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnROUygnaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnLCAnc3ZnJyk7XHJcbiAgc3ZnLnNldEF0dHJpYnV0ZU5TKCdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3htbG5zLycsICd4bWxucycsICdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZycpO1xyXG4gIHN2Zy5zZXRBdHRyaWJ1dGVOUygnaHR0cDovL3d3dy53My5vcmcvMjAwMC94bWxucy8nLCAneG1sbnM6eGxpbmsnLCAnaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluaycpO1xyXG4gIHN2Zy5zZXRBdHRyaWJ1dGUoJ3dpZHRoJywgd2luZG93LmlubmVyV2lkdGgpO1xyXG4gIHN2Zy5zZXRBdHRyaWJ1dGUoJ2hlaWdodCcsIHdpbmRvdy5pbm5lckhlaWdodCk7XHJcbiAgc3ZnLnNldEF0dHJpYnV0ZSgndmlld0JveCcsICcwIDAgJyArIHdpbmRvdy5pbm5lcldpZHRoICsgJyAnICsgd2luZG93LmlubmVySGVpZ2h0KTtcclxuXHJcbiAgZm9yKGxldCBwb2x5Z29uIG9mIHBvbHlnb25zKSB7XHJcbiAgICBzdmcuYXBwZW5kQ2hpbGQoIGNyZWF0ZVBhdGhFbEZyb21Qb2ludHMocG9seWdvbikgKTtcclxuICB9XHJcblxyXG4gIC8vIEdlbmVyYXRlIHRoZSBkb2N1bWVudCBhcyBhIEJsb2IgYW5kIGZvcmNlIGEgZG93bmxvYWQgYXMgYSB0aW1lc3RhbXBlZCAuc3ZnIGZpbGVcclxuICBjb25zdCBzdmdEb2N0eXBlID0gJzw/eG1sIHZlcnNpb249XCIxLjBcIiBlbmNvZGluZz1cIlVURi04XCIgc3RhbmRhbG9uZT1cIm5vXCI/Pic7XHJcbiAgY29uc3Qgc2VyaWFsaXplZFN2ZyA9IChuZXcgWE1MU2VyaWFsaXplcigpKS5zZXJpYWxpemVUb1N0cmluZyhzdmcpO1xyXG4gIGNvbnN0IGJsb2IgPSBuZXcgQmxvYihbc3ZnRG9jdHlwZSwgc2VyaWFsaXplZFN2Z10sIHsgdHlwZTogJ2ltYWdlL3N2Zyt4bWw7JyB9KVxyXG4gIHNhdmVBcyhibG9iLCAndm9yb25vaS0nICsgRGF0ZS5ub3coKSArICcuc3ZnJyk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVQYXRoRWxGcm9tUG9pbnRzKHBvaW50cykge1xyXG4gIGxldCBwb2ludHNTdHJpbmcgPSAnJztcclxuXHJcbiAgZm9yKGxldCBbaW5kZXgsIHBvaW50XSBvZiBwb2ludHMuZW50cmllcygpKSB7XHJcbiAgICBwb2ludHNTdHJpbmcgKz0gcG9pbnRbMF0gKyAnLCcgKyBwb2ludFsxXTtcclxuXHJcbiAgICBpZihpbmRleCA8IHBvaW50cy5sZW5ndGggLSAxKSB7XHJcbiAgICAgIHBvaW50c1N0cmluZyArPSAnICc7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBsZXQgZCA9IHRvUGF0aCh7XHJcbiAgICB0eXBlOiAncG9seWxpbmUnLFxyXG4gICAgcG9pbnRzOiBwb2ludHNTdHJpbmdcclxuICB9KTtcclxuXHJcbiAgbGV0IHBhdGhFbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnROUygnaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnLCAncGF0aCcpO1xyXG4gIHBhdGhFbC5zZXRBdHRyaWJ1dGUoJ2QnLCBkKTtcclxuICBwYXRoRWwuc2V0QXR0cmlidXRlKCdzdHlsZScsICdmaWxsOiBub25lOyBzdHJva2U6IGJsYWNrOyBzdHJva2Utd2lkdGg6IDEnKTtcclxuXHJcbiAgcmV0dXJuIHBhdGhFbDtcclxufVxyXG4iLCJpbXBvcnQgeyBEZWxhdW5heSB9IGZyb20gXCJkMy1kZWxhdW5heVwiO1xyXG5cclxuLy8gQnVpbGQgYW4gYXJyYXkgb2YgcG9seWdvbnMgKGFycmF5cyBvZiBbeCx5XSBwYWlycykgZXh0cmFjdGVkIGZyb20gVm9yb25vaSBwYWNrYWdlXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRWb3Jvbm9pUG9seWdvbnMocG9pbnRzKSB7XHJcbiAgY29uc3QgZGVsYXVuYXkgPSBEZWxhdW5heS5mcm9tKHBvaW50cyk7XHJcbiAgY29uc3Qgdm9yb25vaSA9IGRlbGF1bmF5LnZvcm9ub2koWzAsIDAsIHdpbmRvdy5pbm5lcldpZHRoLCB3aW5kb3cuaW5uZXJIZWlnaHRdKTtcclxuICBjb25zdCBzaW1wbGlmaWVkUG9seWdvbnMgPSBbXTtcclxuXHJcbiAgZm9yKGxldCBjZWxsIG9mIHZvcm9ub2kuY2VsbFBvbHlnb25zKCkpIHtcclxuICAgIGxldCBwb2x5Z29uID0gW107XHJcblxyXG4gICAgZm9yKGxldCB2ZXJ0ZXggb2YgY2VsbCkge1xyXG4gICAgICBwb2x5Z29uLnB1c2goW3ZlcnRleFswXSwgdmVydGV4WzFdXSk7XHJcbiAgICB9XHJcblxyXG4gICAgc2ltcGxpZmllZFBvbHlnb25zLnB1c2gocG9seWdvbik7XHJcbiAgfVxyXG5cclxuICByZXR1cm4gc2ltcGxpZmllZFBvbHlnb25zO1xyXG59Il0sInNvdXJjZVJvb3QiOiIifQ==