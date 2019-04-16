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
/******/ 	return __webpack_require__(__webpack_require__.s = "./animated-rings/js/entry.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./animated-rings/js/Ring.js":
/*!***********************************!*\
  !*** ./animated-rings/js/Ring.js ***!
  \***********************************/
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

/***/ "./animated-rings/js/entry.js":
/*!************************************!*\
  !*** ./animated-rings/js/entry.js ***!
  \************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var d3_delaunay__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! d3-delaunay */ "./node_modules/d3-delaunay/src/index.js");
/* harmony import */ var _Ring__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Ring */ "./animated-rings/js/Ring.js");



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
  function getVoronoiAsPolygons(points) {
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
    const polygons = getVoronoiAsPolygons(points);

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
      rings.push(new _Ring__WEBPACK_IMPORTED_MODULE_1__["default"](numPoints, currentRadius));

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vYW5pbWF0ZWQtcmluZ3MvanMvUmluZy5qcyIsIndlYnBhY2s6Ly8vLi9hbmltYXRlZC1yaW5ncy9qcy9lbnRyeS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvZDMtZGVsYXVuYXkvc3JjL2RlbGF1bmF5LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9kMy1kZWxhdW5heS9zcmMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2QzLWRlbGF1bmF5L3NyYy9wYXRoLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9kMy1kZWxhdW5heS9zcmMvcG9seWdvbi5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvZDMtZGVsYXVuYXkvc3JjL3Zvcm9ub2kuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2RlbGF1bmF0b3IvaW5kZXguanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0Esa0RBQTBDLGdDQUFnQztBQUMxRTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGdFQUF3RCxrQkFBa0I7QUFDMUU7QUFDQSx5REFBaUQsY0FBYztBQUMvRDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaURBQXlDLGlDQUFpQztBQUMxRSx3SEFBZ0gsbUJBQW1CLEVBQUU7QUFDckk7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7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QUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSx3Q0FBd0M7QUFDeEM7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBLFlBQVk7QUFDWjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSwwQkFBMEIsWUFBWTtBQUN0QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxtQkFBbUI7QUFDbkIsbUJBQW1CO0FBQ25CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJhbmltYXRlZFJpbmdzLmJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vYW5pbWF0ZWQtcmluZ3MvanMvZW50cnkuanNcIik7XG4iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBSaW5nIHtcclxuICBjb25zdHJ1Y3RvcihudW1Qb2ludHMsIHJhZGl1cywgY2VudGVyWCA9IHVuZGVmaW5lZCwgY2VudGVyWSA9IHVuZGVmaW5lZCkge1xyXG4gICAgdGhpcy5udW1Qb2ludHMgPSBudW1Qb2ludHM7XHJcbiAgICB0aGlzLnJhZGl1cyA9IHJhZGl1cztcclxuICAgIHRoaXMucmFkaXVzT2Zmc2V0ID0gMDtcclxuICAgIHRoaXMucmFkaXVzT2Zmc2V0U2NhbGVyID0gTWF0aC5yYW5kb20oKSAqICgxMCAtIC0xMCkgKyAtMTA7XHJcbiAgICBcclxuICAgIHRoaXMucG9pbnRzID0gW107XHJcblxyXG4gICAgdGhpcy5hbmdsZSA9IDA7XHJcbiAgICB0aGlzLnZlbG9jaXR5ID0gKE1hdGgucmFuZG9tKCkgKiAoMTAgLSA3KSArIDcpIC8gMTAwMDA7XHJcbiAgICB0aGlzLnZlbG9jaXR5ID0gKChNYXRoLnJhbmRvbSgpICogKDEgLSAtMSkgKyAtMSkgPCAwKSA/IHRoaXMudmVsb2NpdHkgKj0gLTEgOiB0aGlzLnZlbG9jaXR5OyBcclxuICAgIHRoaXMudGFyZ2V0QW5nbGUgPSAwO1xyXG5cclxuICAgIHRoaXMuY2VudGVyID0ge307XHJcbiAgICB0aGlzLmNlbnRlci54ID0gKGNlbnRlclggIT0gdW5kZWZpbmVkKSA/IGNlbnRlclggOiB3aW5kb3cuaW5uZXJXaWR0aCAvIDI7XHJcbiAgICB0aGlzLmNlbnRlci55ID0gKGNlbnRlclkgIT0gdW5kZWZpbmVkKSA/IGNlbnRlclkgOiB3aW5kb3cuaW5uZXJIZWlnaHQgLyAyO1xyXG5cclxuICAgIHRoaXMuZ2VuZXJhdGUoKTtcclxuICB9XHJcblxyXG4gIC8vIFN0dWZmIHRoaXMucG9pbnRzIHdpdGggcmVhbCBwb2ludCBvYmplY3RzIHVzaW5nIHRoaXMubnVtUG9pbnRzIGFuZCB0aGlzLnJhZGl1c1xyXG4gIGdlbmVyYXRlKCkge1xyXG4gICAgdGhpcy5wb2ludHMgPSBbXTtcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5udW1Qb2ludHM7IGkrKykge1xyXG4gICAgICB0aGlzLnBvaW50cy5wdXNoKFtcclxuICAgICAgICB0aGlzLmNlbnRlci54ICsgdGhpcy5yYWRpdXMgKiBNYXRoLmNvcygoKDM2MCAvIHRoaXMubnVtUG9pbnRzKSAqIChNYXRoLlBJLzE4MCkgKiBpKSArIHRoaXMuYW5nbGUpLFxyXG4gICAgICAgIHRoaXMuY2VudGVyLnkgKyB0aGlzLnJhZGl1cyAqIE1hdGguc2luKCgoMzYwIC8gdGhpcy5udW1Qb2ludHMpICogKE1hdGguUEkvMTgwKSAqIGkpICsgdGhpcy5hbmdsZSlcclxuICAgICAgXSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvLyBBZGQgdGhpcy52ZWxvY2l0eSB0byB0aGlzLmFuZ2xlIHVudGlsIGl0IHJlYWNoZXMgdGhpcy50YXJnZXRBbmdsZSAod2l0aCBlYXNpbmcpXHJcbiAgaXRlcmF0ZSgpIHtcclxuICAgIC8vIHRoaXMuYW5nbGUgKz0gdGhpcy52ZWxvY2l0eTtcclxuXHJcbiAgICB0aGlzLnJhZGl1cyArPSAoTWF0aC5zaW4odGhpcy5yYWRpdXNPZmZzZXQgKiAoTWF0aC5QSS8xODApKSAqIE1hdGguY29zKHRoaXMucmFkaXVzT2Zmc2V0ICogKE1hdGguUEkvMTgwKSkpICogdGhpcy5yYWRpdXNPZmZzZXRTY2FsZXI7XHJcblxyXG4gICAgaWYodGhpcy5yYWRpdXNPZmZzZXQgKyAxID49IDM2MCkge1xyXG4gICAgICB0aGlzLnJhZGl1c09mZnNldCA9IDA7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLnJhZGl1c09mZnNldCsrO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuZ2VuZXJhdGUoKTtcclxuICB9XHJcbn0iLCJpbXBvcnQge0RlbGF1bmF5fSBmcm9tIFwiZDMtZGVsYXVuYXlcIjtcclxuaW1wb3J0IFJpbmcgZnJvbSBcIi4vUmluZ1wiO1xyXG5cclxubGV0IHNob3dQb2ludHMgPSBmYWxzZSxcclxuICBpbnZlcnRDb2xvcnMgPSBmYWxzZSxcclxuICB1c2VCbHVyRWZmZWN0ID0gZmFsc2UsXHJcbiAgaXNQYXVzZWQgPSBmYWxzZSxcclxuICBwb2ludHMsXHJcbiAgcmluZ3M7XHJcblxyXG5jb25zdCBFVkVOID0gMCxcclxuICBPREQgPSAxLFxyXG4gIEFMVEVSTkFUSU5HID0gMixcclxuICBBTlkgPSAzO1xyXG5sZXQgUk9XX1RZUEUgPSBFVkVOO1xyXG5cclxubGV0IGN1cnJlbnRSb3dUeXBlID0gRVZFTjtcclxuXHJcbmNvbnN0IHNrZXRjaCA9IGZ1bmN0aW9uIChwNSkge1xyXG4gIC8qXHJcbiAgICBTZXR1cFxyXG4gICAgPT09PT1cclxuICAqL1xyXG4gIHA1LnNldHVwID0gZnVuY3Rpb24gKCkge1xyXG4gICAgcDUuY3JlYXRlQ2FudmFzKHdpbmRvdy5pbm5lcldpZHRoLCB3aW5kb3cuaW5uZXJIZWlnaHQpO1xyXG4gICAgZ2VuZXJhdGVQb2ludHMoKTtcclxuICB9XHJcblxyXG4gIC8qXHJcbiAgICBEcmF3XHJcbiAgICA9PT09XHJcbiAgKi9cclxuICBwNS5kcmF3ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgLy8gTW92ZSBhbGwgdGhlIHJpbmdzXHJcbiAgICBpZighaXNQYXVzZWQpIHtcclxuICAgICAgZm9yKGxldCByaW5nIG9mIHJpbmdzKSB7XHJcbiAgICAgICAgcmluZy5pdGVyYXRlKCk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC8vIEdldCB0aGUgbGF0ZXN0IHBvaW50c1xyXG4gICAgICBwb2ludHMgPSBnZXRQb2ludHMoKTtcclxuICBcclxuICAgICAgZHJhd1Zvcm9ub2koKTtcclxuICAgICAgZHJhd1BvaW50cygpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcblxyXG4gIC8qXHJcbiAgICBDdXN0b20gZnVuY3Rpb25zXHJcbiAgICA9PT09PT09PT09PT09PT09XHJcbiAgKi9cclxuIFxyXG4gIC8vIEJ1aWxkIGFuIGFycmF5IG9mIHBvbHlnb25zIChhcnJheXMgb2YgW3gseV0gcGFpcnMpIGV4dHJhY3RlZCBmcm9tIFZvcm9ub2kgcGFja2FnZVxyXG4gIGZ1bmN0aW9uIGdldFZvcm9ub2lBc1BvbHlnb25zKHBvaW50cykge1xyXG4gICAgY29uc3QgZGVsYXVuYXkgPSBEZWxhdW5heS5mcm9tKHBvaW50cyk7XHJcbiAgICBjb25zdCB2b3Jvbm9pID0gZGVsYXVuYXkudm9yb25vaShbMCwgMCwgd2luZG93LmlubmVyV2lkdGgsIHdpbmRvdy5pbm5lckhlaWdodF0pO1xyXG4gICAgY29uc3Qgc2ltcGxpZmllZFBvbHlnb25zID0gW107XHJcblxyXG4gICAgZm9yKGxldCBjZWxsIG9mIHZvcm9ub2kuY2VsbFBvbHlnb25zKCkpIHtcclxuICAgICAgbGV0IHBvbHlnb24gPSBbXTtcclxuXHJcbiAgICAgIGZvcihsZXQgdmVydGV4IG9mIGNlbGwpIHtcclxuICAgICAgICBwb2x5Z29uLnB1c2goW3ZlcnRleFswXSwgdmVydGV4WzFdXSk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHNpbXBsaWZpZWRQb2x5Z29ucy5wdXNoKHBvbHlnb24pO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBzaW1wbGlmaWVkUG9seWdvbnM7XHJcbiAgfVxyXG5cclxuXHJcbiAgLy8gRHJhdyB0aGUgVm9yb25vaSBkaWFncmFtIGZvciBhIHNldCBvZiBwb2ludHNcclxuICBmdW5jdGlvbiBkcmF3Vm9yb25vaSgpIHtcclxuICAgIC8vIFNldCBjb2xvcnNcclxuICAgIGlmIChpbnZlcnRDb2xvcnMpIHtcclxuICAgICAgaWYodXNlQmx1ckVmZmVjdCkge1xyXG4gICAgICAgIHA1LmJhY2tncm91bmQoMCwgMjApO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHA1LmJhY2tncm91bmQoMCk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHA1LnN0cm9rZSgyNTUpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgaWYodXNlQmx1ckVmZmVjdCkge1xyXG4gICAgICAgIHA1LmJhY2tncm91bmQoMjU1LCAyNSk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgcDUuYmFja2dyb3VuZCgyNTUpO1xyXG4gICAgICB9XHJcbiAgICAgIFxyXG4gICAgICBwNS5zdHJva2UoMCk7XHJcbiAgICB9XHJcblxyXG4gICAgcDUubm9GaWxsKCk7XHJcblxyXG4gICAgLy8gRXh0cmFjdCBwb2x5Z29ucyBmcm9tIFZvcm9ub2kgZGlhZ3JhbVxyXG4gICAgY29uc3QgcG9seWdvbnMgPSBnZXRWb3Jvbm9pQXNQb2x5Z29ucyhwb2ludHMpO1xyXG5cclxuICAgIC8vIERyYXcgcmF3IHBvbHlnb25zXHJcbiAgICBmb3IgKGNvbnN0IHBvbHlnb24gb2YgcG9seWdvbnMpIHtcclxuICAgICAgcDUuYmVnaW5TaGFwZSgpO1xyXG5cclxuICAgICAgZm9yIChjb25zdCB2ZXJ0ZXggb2YgcG9seWdvbikge1xyXG4gICAgICAgIHA1LnZlcnRleCh2ZXJ0ZXhbMF0sIHZlcnRleFsxXSk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHA1LmVuZFNoYXBlKCk7XHJcbiAgICB9XHJcbiAgfVxyXG4gIFxyXG4gIC8vIERyYXcgZG90cyBmb3IgZWFjaCBvZiB0aGUgcG9pbnRzXHJcbiAgZnVuY3Rpb24gZHJhd1BvaW50cygpIHtcclxuICAgIGlmIChzaG93UG9pbnRzKSB7XHJcbiAgICAgIC8vIFNldCBjb2xvcnNcclxuICAgICAgcDUubm9TdHJva2UoKTtcclxuXHJcbiAgICAgIGlmIChpbnZlcnRDb2xvcnMpIHtcclxuICAgICAgICBwNS5maWxsKDEwMCk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgcDUuZmlsbCgyMDApO1xyXG4gICAgICB9XHJcblxyXG4gICAgICAvLyBEcmF3IHRoZSBwb2ludHNcclxuICAgICAgZm9yIChsZXQgcG9pbnQgb2YgcG9pbnRzKSB7XHJcbiAgICAgICAgcDUuZWxsaXBzZShwb2ludFswXSwgcG9pbnRbMV0sIDUpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG4gIFxyXG4gIGZ1bmN0aW9uIGdlbmVyYXRlUG9pbnRzKCkge1xyXG4gICAgcG9pbnRzID0gW10sIHJpbmdzID0gW107XHJcbiAgICBsZXQgbnVtUmluZ3MgPSBwYXJzZUludChwNS5yYW5kb20oNSwgMjApKTtcclxuICAgIGNvbnN0IG1heFJhZGl1cyA9ICh3aW5kb3cuaW5uZXJXaWR0aCA+IHdpbmRvdy5pbm5lckhlaWdodCkgPyB3aW5kb3cuaW5uZXJIZWlnaHQvMiAtIDEwIDogd2luZG93LmlubmVyV2lkdGgvMiAtIDEwO1xyXG4gICAgY29uc3QgbWluUmFkaXVzID0gcDUucmFuZG9tKDEwLCAzMCk7XHJcbiAgICBsZXQgY3VycmVudFJhZGl1cyA9IG1heFJhZGl1cztcclxuICAgIGNvbnN0IHJhZGl1c1N0ZXAgPSAobWF4UmFkaXVzIC0gbWluUmFkaXVzKSAvIG51bVJpbmdzO1xyXG5cclxuICAgIC8vIEdlbmVyYXRlIHNldCBvZiBwb2ludHMgZm9yIFZvcm9ub2kgZGlhZ3JhbVxyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBudW1SaW5nczsgaSsrKSB7XHJcbiAgICAgIGxldCBudW1Qb2ludHMsIHJhbmdlID0gW107XHJcblxyXG4gICAgICAvLyBSaW5ncyBuZWFyIHRoZSBjZW50ZXIgbG9vayBiZXR0ZXIgd2l0aCBmZXdlciBwb2ludHNcclxuICAgICAgaWYgKGkgPiAzKSB7XHJcbiAgICAgICAgcmFuZ2VbMF0gPSA1O1xyXG4gICAgICAgIHJhbmdlWzFdID0gMTA7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgcmFuZ2VbMF0gPSAyMDtcclxuICAgICAgICByYW5nZVsxXSA9IDIwMDtcclxuICAgICAgfVxyXG5cclxuICAgICAgLy8gVE9ETzogbWFrZSByYW5nZSBwcm9wb3J0aW9uYWwgdG8gaS4gXHJcblxyXG4gICAgICAvLyBHZW5lcmF0ZSBhIHJhbmRvbSBudW1iZXIgb2YgcG9pbnRzIGJhc2VkIG9uIHNlbGVjdGVkIFwicm93IHR5cGVcIlxyXG4gICAgICBzd2l0Y2ggKFJPV19UWVBFKSB7XHJcbiAgICAgICAgY2FzZSBFVkVOOlxyXG4gICAgICAgICAgbnVtUG9pbnRzID0gZ2V0UmFuZG9tRXZlbk51bWJlcihyYW5nZVswXSwgcmFuZ2VbMV0pO1xyXG4gICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICAgIGNhc2UgT0REOlxyXG4gICAgICAgICAgbnVtUG9pbnRzID0gZ2V0UmFuZG9tT2RkTnVtYmVyKHJhbmdlWzBdLCByYW5nZVsxXSk7XHJcbiAgICAgICAgICBicmVhaztcclxuXHJcbiAgICAgICAgY2FzZSBBTFRFUk5BVElORzpcclxuICAgICAgICAgIHN3aXRjaCAoY3VycmVudFJvd1R5cGUpIHtcclxuICAgICAgICAgICAgY2FzZSBFVkVOOlxyXG4gICAgICAgICAgICAgIG51bVBvaW50cyA9IGdldFJhbmRvbUV2ZW5OdW1iZXIocmFuZ2VbMF0sIHJhbmdlWzFdKTtcclxuICAgICAgICAgICAgICBjdXJyZW50Um93VHlwZSA9IE9ERDtcclxuICAgICAgICAgICAgICBicmVhaztcclxuXHJcbiAgICAgICAgICAgIGNhc2UgT0REOlxyXG4gICAgICAgICAgICAgIG51bVBvaW50cyA9IGdldFJhbmRvbU9kZE51bWJlcihyYW5nZVswXSwgcmFuZ2VbMV0pO1xyXG4gICAgICAgICAgICAgIGN1cnJlbnRSb3dUeXBlID0gRVZFTjtcclxuICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICBicmVhaztcclxuXHJcbiAgICAgICAgY2FzZSBBTlk6XHJcbiAgICAgICAgICBudW1Qb2ludHMgPSBwYXJzZUludChwNS5yYW5kb20ocmFuZ2VbMF0sIHJhbmdlWzFdKSk7XHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgfVxyXG5cclxuICAgICAgLy8gR2VuZXJhdGUgcG9pbnRzIGFycmFuZ2VkIGluIGEgcmluZ1xyXG4gICAgICByaW5ncy5wdXNoKG5ldyBSaW5nKG51bVBvaW50cywgY3VycmVudFJhZGl1cykpO1xyXG5cclxuICAgICAgY3VycmVudFJhZGl1cyAtPSByYWRpdXNTdGVwICsgcDUucmFuZG9tKC1yYWRpdXNTdGVwLzIsIHJhZGl1c1N0ZXApO1xyXG4gICAgfVxyXG5cclxuICAgIHBvaW50cyA9IGdldFBvaW50cygpO1xyXG4gIH1cclxuXHJcbiAgZnVuY3Rpb24gZ2V0UG9pbnRzKCkge1xyXG4gICAgbGV0IHB0cyA9IFtdO1xyXG5cclxuICAgIC8vIEV4dHJhY3QgYWxsIHBvaW50cyBmcm9tIGFsbCByaW5ncyBmb3IgVm9yb25vaSBcclxuICAgIGZvcihsZXQgcmluZyBvZiByaW5ncykge1xyXG4gICAgICBmb3IobGV0IHBvaW50IG9mIHJpbmcucG9pbnRzKSB7XHJcbiAgICAgICAgcHRzLnB1c2gocG9pbnQpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHB0cztcclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIGdldFJhbmRvbUV2ZW5OdW1iZXIobWluLCBtYXgpIHtcclxuICAgIGxldCBudW0gPSBwYXJzZUludChwNS5yYW5kb20obWluLCBtYXgpKTtcclxuXHJcbiAgICBpZiAobnVtICUgMiA+IDApIHtcclxuICAgICAgaWYgKG51bSAtIDEgPCBtaW4pIHtcclxuICAgICAgICBudW0rKztcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBudW0tLTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBudW07XHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiBnZXRSYW5kb21PZGROdW1iZXIobWluLCBtYXgpIHtcclxuICAgIGxldCBudW0gPSBwYXJzZUludChwNS5yYW5kb20obWluLCBtYXgpKTtcclxuXHJcbiAgICBpZiAobnVtICUgMiA9PSAwKSB7XHJcbiAgICAgIGlmIChudW0gLSAxIDwgbWluKSB7XHJcbiAgICAgICAgbnVtKys7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgbnVtLS07XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gbnVtO1xyXG4gIH1cclxuICBcclxuXHJcbiAgLypcclxuICAgIEtleSByZWxlYXNlZCBoYW5kbGVyXHJcbiAgICA9PT09PT09PT09PT09PT09PT09PVxyXG4gICovXHJcbiAgcDUua2V5UmVsZWFzZWQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICBzd2l0Y2ggKHA1LmtleSkge1xyXG4gICAgICBjYXNlICdyJzpcclxuICAgICAgICBnZW5lcmF0ZVBvaW50cygpO1xyXG4gICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgY2FzZSAncCc6XHJcbiAgICAgICAgc2hvd1BvaW50cyA9ICFzaG93UG9pbnRzO1xyXG4gICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgY2FzZSAnaSc6XHJcbiAgICAgICAgaW52ZXJ0Q29sb3JzID0gIWludmVydENvbG9ycztcclxuICAgICAgICBicmVhaztcclxuXHJcbiAgICAgIGNhc2UgJ2InOlxyXG4gICAgICAgIHVzZUJsdXJFZmZlY3QgPSAhdXNlQmx1ckVmZmVjdDtcclxuICAgICAgICBicmVhaztcclxuXHJcbiAgICAgIGNhc2UgJyAnOlxyXG4gICAgICAgIGlzUGF1c2VkID0gIWlzUGF1c2VkO1xyXG4gICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgY2FzZSAnMSc6XHJcbiAgICAgICAgUk9XX1RZUEUgPSBFVkVOO1xyXG4gICAgICAgIGdlbmVyYXRlUG9pbnRzKCk7XHJcbiAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICBjYXNlICcyJzpcclxuICAgICAgICBST1dfVFlQRSA9IE9ERDtcclxuICAgICAgICBnZW5lcmF0ZVBvaW50cygpO1xyXG4gICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgY2FzZSAnMyc6XHJcbiAgICAgICAgUk9XX1RZUEUgPSBBTFRFUk5BVElORztcclxuICAgICAgICBnZW5lcmF0ZVBvaW50cygpO1xyXG4gICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgY2FzZSAnNCc6XHJcbiAgICAgICAgUk9XX1RZUEUgPSBBTlk7XHJcbiAgICAgICAgZ2VuZXJhdGVQb2ludHMoKTtcclxuICAgICAgICBicmVhaztcclxuICAgIH1cclxuICB9XHJcbn1cclxuXHJcbi8vIExhdW5jaCB0aGUgc2tldGNoIHVzaW5nIHA1anMgaW4gaW5zdGFudGlhdGVkIG1vZGVcclxubmV3IHA1KHNrZXRjaCk7IiwiaW1wb3J0IERlbGF1bmF0b3IgZnJvbSBcImRlbGF1bmF0b3JcIjtcbmltcG9ydCBQYXRoIGZyb20gXCIuL3BhdGguanNcIjtcbmltcG9ydCBQb2x5Z29uIGZyb20gXCIuL3BvbHlnb24uanNcIjtcbmltcG9ydCBWb3Jvbm9pIGZyb20gXCIuL3Zvcm9ub2kuanNcIjtcblxuY29uc3QgdGF1ID0gMiAqIE1hdGguUEk7XG5cbmZ1bmN0aW9uIHBvaW50WChwKSB7XG4gIHJldHVybiBwWzBdO1xufVxuXG5mdW5jdGlvbiBwb2ludFkocCkge1xuICByZXR1cm4gcFsxXTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRGVsYXVuYXkge1xuICBjb25zdHJ1Y3Rvcihwb2ludHMpIHtcbiAgICBjb25zdCB7aGFsZmVkZ2VzLCBodWxsLCB0cmlhbmdsZXN9ID0gbmV3IERlbGF1bmF0b3IocG9pbnRzKTtcbiAgICB0aGlzLnBvaW50cyA9IHBvaW50cztcbiAgICB0aGlzLmhhbGZlZGdlcyA9IGhhbGZlZGdlcztcbiAgICB0aGlzLmh1bGwgPSBodWxsO1xuICAgIHRoaXMudHJpYW5nbGVzID0gdHJpYW5nbGVzO1xuICAgIGNvbnN0IGluZWRnZXMgPSB0aGlzLmluZWRnZXMgPSBuZXcgSW50MzJBcnJheShwb2ludHMubGVuZ3RoIC8gMikuZmlsbCgtMSk7XG4gICAgY29uc3Qgb3V0ZWRnZXMgPSB0aGlzLm91dGVkZ2VzID0gbmV3IEludDMyQXJyYXkocG9pbnRzLmxlbmd0aCAvIDIpLmZpbGwoLTEpO1xuXG4gICAgLy8gQ29tcHV0ZSBhbiBpbmRleCBmcm9tIGVhY2ggcG9pbnQgdG8gYW4gKGFyYml0cmFyeSkgaW5jb21pbmcgaGFsZmVkZ2UuXG4gICAgZm9yIChsZXQgZSA9IDAsIG4gPSBoYWxmZWRnZXMubGVuZ3RoOyBlIDwgbjsgKytlKSB7XG4gICAgICBpbmVkZ2VzW3RyaWFuZ2xlc1tlICUgMyA9PT0gMiA/IGUgLSAyIDogZSArIDFdXSA9IGU7XG4gICAgfVxuXG4gICAgLy8gRm9yIHBvaW50cyBvbiB0aGUgaHVsbCwgaW5kZXggYm90aCB0aGUgaW5jb21pbmcgYW5kIG91dGdvaW5nIGhhbGZlZGdlcy5cbiAgICBsZXQgbm9kZTAsIG5vZGUxID0gaHVsbDtcbiAgICBkbyB7XG4gICAgICBub2RlMCA9IG5vZGUxLCBub2RlMSA9IG5vZGUxLm5leHQ7XG4gICAgICBpbmVkZ2VzW25vZGUxLmldID0gbm9kZTAudDtcbiAgICAgIG91dGVkZ2VzW25vZGUwLmldID0gbm9kZTEudDtcbiAgICB9IHdoaWxlIChub2RlMSAhPT0gaHVsbCk7XG4gIH1cbiAgdm9yb25vaShib3VuZHMpIHtcbiAgICByZXR1cm4gbmV3IFZvcm9ub2kodGhpcywgYm91bmRzKTtcbiAgfVxuICAqbmVpZ2hib3JzKGkpIHtcbiAgICBjb25zdCB7aW5lZGdlcywgb3V0ZWRnZXMsIGhhbGZlZGdlcywgdHJpYW5nbGVzfSA9IHRoaXM7XG4gICAgY29uc3QgZTAgPSBpbmVkZ2VzW2ldO1xuICAgIGlmIChlMCA9PT0gLTEpIHJldHVybjsgLy8gY29pbmNpZGVudCBwb2ludFxuICAgIGxldCBlID0gZTA7XG4gICAgZG8ge1xuICAgICAgeWllbGQgdHJpYW5nbGVzW2VdO1xuICAgICAgZSA9IGUgJSAzID09PSAyID8gZSAtIDIgOiBlICsgMTtcbiAgICAgIGlmICh0cmlhbmdsZXNbZV0gIT09IGkpIHJldHVybjsgLy8gYmFkIHRyaWFuZ3VsYXRpb25cbiAgICAgIGUgPSBoYWxmZWRnZXNbZV07XG4gICAgICBpZiAoZSA9PT0gLTEpIHJldHVybiB5aWVsZCB0cmlhbmdsZXNbb3V0ZWRnZXNbaV1dO1xuICAgIH0gd2hpbGUgKGUgIT09IGUwKTtcbiAgfVxuICBmaW5kKHgsIHksIGkgPSAwKSB7XG4gICAgaWYgKCh4ID0gK3gsIHggIT09IHgpIHx8ICh5ID0gK3ksIHkgIT09IHkpKSByZXR1cm4gLTE7XG4gICAgbGV0IGM7XG4gICAgd2hpbGUgKChjID0gdGhpcy5fc3RlcChpLCB4LCB5KSkgPj0gMCAmJiBjICE9PSBpKSBpID0gYztcbiAgICByZXR1cm4gYztcbiAgfVxuICBfc3RlcChpLCB4LCB5KSB7XG4gICAgY29uc3Qge2luZWRnZXMsIHBvaW50c30gPSB0aGlzO1xuICAgIGlmIChpbmVkZ2VzW2ldID09PSAtMSkgcmV0dXJuIC0xOyAvLyBjb2luY2lkZW50IHBvaW50XG4gICAgbGV0IGMgPSBpO1xuICAgIGxldCBkYyA9ICh4IC0gcG9pbnRzW2kgKiAyXSkgKiogMiArICh5IC0gcG9pbnRzW2kgKiAyICsgMV0pICoqIDI7XG4gICAgZm9yIChjb25zdCB0IG9mIHRoaXMubmVpZ2hib3JzKGkpKSB7XG4gICAgICBjb25zdCBkdCA9ICh4IC0gcG9pbnRzW3QgKiAyXSkgKiogMiArICh5IC0gcG9pbnRzW3QgKiAyICsgMV0pICoqIDI7XG4gICAgICBpZiAoZHQgPCBkYykgZGMgPSBkdCwgYyA9IHQ7XG4gICAgfVxuICAgIHJldHVybiBjO1xuICB9XG4gIHJlbmRlcihjb250ZXh0KSB7XG4gICAgY29uc3QgYnVmZmVyID0gY29udGV4dCA9PSBudWxsID8gY29udGV4dCA9IG5ldyBQYXRoIDogdW5kZWZpbmVkO1xuICAgIGNvbnN0IHtwb2ludHMsIGhhbGZlZGdlcywgdHJpYW5nbGVzfSA9IHRoaXM7XG4gICAgZm9yIChsZXQgaSA9IDAsIG4gPSBoYWxmZWRnZXMubGVuZ3RoOyBpIDwgbjsgKytpKSB7XG4gICAgICBjb25zdCBqID0gaGFsZmVkZ2VzW2ldO1xuICAgICAgaWYgKGogPCBpKSBjb250aW51ZTtcbiAgICAgIGNvbnN0IHRpID0gdHJpYW5nbGVzW2ldICogMjtcbiAgICAgIGNvbnN0IHRqID0gdHJpYW5nbGVzW2pdICogMjtcbiAgICAgIGNvbnRleHQubW92ZVRvKHBvaW50c1t0aV0sIHBvaW50c1t0aSArIDFdKTtcbiAgICAgIGNvbnRleHQubGluZVRvKHBvaW50c1t0al0sIHBvaW50c1t0aiArIDFdKTtcbiAgICB9XG4gICAgdGhpcy5yZW5kZXJIdWxsKGNvbnRleHQpO1xuICAgIHJldHVybiBidWZmZXIgJiYgYnVmZmVyLnZhbHVlKCk7XG4gIH1cbiAgcmVuZGVyUG9pbnRzKGNvbnRleHQsIHIgPSAyKSB7XG4gICAgY29uc3QgYnVmZmVyID0gY29udGV4dCA9PSBudWxsID8gY29udGV4dCA9IG5ldyBQYXRoIDogdW5kZWZpbmVkO1xuICAgIGNvbnN0IHtwb2ludHN9ID0gdGhpcztcbiAgICBmb3IgKGxldCBpID0gMCwgbiA9IHBvaW50cy5sZW5ndGg7IGkgPCBuOyBpICs9IDIpIHtcbiAgICAgIGNvbnN0IHggPSBwb2ludHNbaV0sIHkgPSBwb2ludHNbaSArIDFdO1xuICAgICAgY29udGV4dC5tb3ZlVG8oeCArIHIsIHkpO1xuICAgICAgY29udGV4dC5hcmMoeCwgeSwgciwgMCwgdGF1KTtcbiAgICB9XG4gICAgcmV0dXJuIGJ1ZmZlciAmJiBidWZmZXIudmFsdWUoKTtcbiAgfVxuICByZW5kZXJIdWxsKGNvbnRleHQpIHtcbiAgICBjb25zdCBidWZmZXIgPSBjb250ZXh0ID09IG51bGwgPyBjb250ZXh0ID0gbmV3IFBhdGggOiB1bmRlZmluZWQ7XG4gICAgY29uc3Qge2h1bGx9ID0gdGhpcztcbiAgICBsZXQgbm9kZSA9IGh1bGw7XG4gICAgY29udGV4dC5tb3ZlVG8obm9kZS54LCBub2RlLnkpO1xuICAgIHdoaWxlIChub2RlID0gbm9kZS5uZXh0LCBub2RlICE9PSBodWxsKSBjb250ZXh0LmxpbmVUbyhub2RlLngsIG5vZGUueSk7XG4gICAgY29udGV4dC5jbG9zZVBhdGgoKTtcbiAgICByZXR1cm4gYnVmZmVyICYmIGJ1ZmZlci52YWx1ZSgpO1xuICB9XG4gIGh1bGxQb2x5Z29uKCkge1xuICAgIGNvbnN0IHBvbHlnb24gPSBuZXcgUG9seWdvbjtcbiAgICB0aGlzLnJlbmRlckh1bGwocG9seWdvbik7XG4gICAgcmV0dXJuIHBvbHlnb24udmFsdWUoKTtcbiAgfVxuICByZW5kZXJUcmlhbmdsZShpLCBjb250ZXh0KSB7XG4gICAgY29uc3QgYnVmZmVyID0gY29udGV4dCA9PSBudWxsID8gY29udGV4dCA9IG5ldyBQYXRoIDogdW5kZWZpbmVkO1xuICAgIGNvbnN0IHtwb2ludHMsIHRyaWFuZ2xlc30gPSB0aGlzO1xuICAgIGNvbnN0IHQwID0gdHJpYW5nbGVzW2kgKj0gM10gKiAyO1xuICAgIGNvbnN0IHQxID0gdHJpYW5nbGVzW2kgKyAxXSAqIDI7XG4gICAgY29uc3QgdDIgPSB0cmlhbmdsZXNbaSArIDJdICogMjtcbiAgICBjb250ZXh0Lm1vdmVUbyhwb2ludHNbdDBdLCBwb2ludHNbdDAgKyAxXSk7XG4gICAgY29udGV4dC5saW5lVG8ocG9pbnRzW3QxXSwgcG9pbnRzW3QxICsgMV0pO1xuICAgIGNvbnRleHQubGluZVRvKHBvaW50c1t0Ml0sIHBvaW50c1t0MiArIDFdKTtcbiAgICBjb250ZXh0LmNsb3NlUGF0aCgpO1xuICAgIHJldHVybiBidWZmZXIgJiYgYnVmZmVyLnZhbHVlKCk7XG4gIH1cbiAgKnRyaWFuZ2xlUG9seWdvbnMoKSB7XG4gICAgY29uc3Qge3RyaWFuZ2xlc30gPSB0aGlzO1xuICAgIGZvciAobGV0IGkgPSAwLCBuID0gdHJpYW5nbGVzLmxlbmd0aCAvIDM7IGkgPCBuOyArK2kpIHtcbiAgICAgIHlpZWxkIHRoaXMudHJpYW5nbGVQb2x5Z29uKGkpO1xuICAgIH1cbiAgfVxuICB0cmlhbmdsZVBvbHlnb24oaSkge1xuICAgIGNvbnN0IHBvbHlnb24gPSBuZXcgUG9seWdvbjtcbiAgICB0aGlzLnJlbmRlclRyaWFuZ2xlKGksIHBvbHlnb24pO1xuICAgIHJldHVybiBwb2x5Z29uLnZhbHVlKCk7XG4gIH1cbn1cblxuRGVsYXVuYXkuZnJvbSA9IGZ1bmN0aW9uKHBvaW50cywgZnggPSBwb2ludFgsIGZ5ID0gcG9pbnRZLCB0aGF0KSB7XG4gIHJldHVybiBuZXcgRGVsYXVuYXkoXCJsZW5ndGhcIiBpbiBwb2ludHNcbiAgICAgID8gZmxhdEFycmF5KHBvaW50cywgZngsIGZ5LCB0aGF0KVxuICAgICAgOiBGbG9hdDY0QXJyYXkuZnJvbShmbGF0SXRlcmFibGUocG9pbnRzLCBmeCwgZnksIHRoYXQpKSk7XG59O1xuXG5mdW5jdGlvbiBmbGF0QXJyYXkocG9pbnRzLCBmeCwgZnksIHRoYXQpIHtcbiAgY29uc3QgbiA9IHBvaW50cy5sZW5ndGg7XG4gIGNvbnN0IGFycmF5ID0gbmV3IEZsb2F0NjRBcnJheShuICogMik7XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgbjsgKytpKSB7XG4gICAgY29uc3QgcCA9IHBvaW50c1tpXTtcbiAgICBhcnJheVtpICogMl0gPSBmeC5jYWxsKHRoYXQsIHAsIGksIHBvaW50cyk7XG4gICAgYXJyYXlbaSAqIDIgKyAxXSA9IGZ5LmNhbGwodGhhdCwgcCwgaSwgcG9pbnRzKTtcbiAgfVxuICByZXR1cm4gYXJyYXk7XG59XG5cbmZ1bmN0aW9uKiBmbGF0SXRlcmFibGUocG9pbnRzLCBmeCwgZnksIHRoYXQpIHtcbiAgbGV0IGkgPSAwO1xuICBmb3IgKGNvbnN0IHAgb2YgcG9pbnRzKSB7XG4gICAgeWllbGQgZnguY2FsbCh0aGF0LCBwLCBpLCBwb2ludHMpO1xuICAgIHlpZWxkIGZ5LmNhbGwodGhhdCwgcCwgaSwgcG9pbnRzKTtcbiAgICArK2k7XG4gIH1cbn1cbiIsImV4cG9ydCB7ZGVmYXVsdCBhcyBEZWxhdW5heX0gZnJvbSBcIi4vZGVsYXVuYXkuanNcIjtcbmV4cG9ydCB7ZGVmYXVsdCBhcyBWb3Jvbm9pfSBmcm9tIFwiLi92b3Jvbm9pLmpzXCI7XG4iLCJjb25zdCBlcHNpbG9uID0gMWUtNjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUGF0aCB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMuX3gwID0gdGhpcy5feTAgPSAvLyBzdGFydCBvZiBjdXJyZW50IHN1YnBhdGhcbiAgICB0aGlzLl94MSA9IHRoaXMuX3kxID0gbnVsbDsgLy8gZW5kIG9mIGN1cnJlbnQgc3VicGF0aFxuICAgIHRoaXMuXyA9IFwiXCI7XG4gIH1cbiAgbW92ZVRvKHgsIHkpIHtcbiAgICB0aGlzLl8gKz0gYE0ke3RoaXMuX3gwID0gdGhpcy5feDEgPSAreH0sJHt0aGlzLl95MCA9IHRoaXMuX3kxID0gK3l9YDtcbiAgfVxuICBjbG9zZVBhdGgoKSB7XG4gICAgaWYgKHRoaXMuX3gxICE9PSBudWxsKSB7XG4gICAgICB0aGlzLl94MSA9IHRoaXMuX3gwLCB0aGlzLl95MSA9IHRoaXMuX3kwO1xuICAgICAgdGhpcy5fICs9IFwiWlwiO1xuICAgIH1cbiAgfVxuICBsaW5lVG8oeCwgeSkge1xuICAgIHRoaXMuXyArPSBgTCR7dGhpcy5feDEgPSAreH0sJHt0aGlzLl95MSA9ICt5fWA7XG4gIH1cbiAgYXJjKHgsIHksIHIpIHtcbiAgICB4ID0gK3gsIHkgPSAreSwgciA9ICtyO1xuICAgIGNvbnN0IHgwID0geCArIHI7XG4gICAgY29uc3QgeTAgPSB5O1xuICAgIGlmIChyIDwgMCkgdGhyb3cgbmV3IEVycm9yKFwibmVnYXRpdmUgcmFkaXVzXCIpO1xuICAgIGlmICh0aGlzLl94MSA9PT0gbnVsbCkgdGhpcy5fICs9IGBNJHt4MH0sJHt5MH1gO1xuICAgIGVsc2UgaWYgKE1hdGguYWJzKHRoaXMuX3gxIC0geDApID4gZXBzaWxvbiB8fCBNYXRoLmFicyh0aGlzLl95MSAtIHkwKSA+IGVwc2lsb24pIHRoaXMuXyArPSBcIkxcIiArIHgwICsgXCIsXCIgKyB5MDtcbiAgICBpZiAoIXIpIHJldHVybjtcbiAgICB0aGlzLl8gKz0gYEEke3J9LCR7cn0sMCwxLDEsJHt4IC0gcn0sJHt5fUEke3J9LCR7cn0sMCwxLDEsJHt0aGlzLl94MSA9IHgwfSwke3RoaXMuX3kxID0geTB9YDtcbiAgfVxuICByZWN0KHgsIHksIHcsIGgpIHtcbiAgICB0aGlzLl8gKz0gYE0ke3RoaXMuX3gwID0gdGhpcy5feDEgPSAreH0sJHt0aGlzLl95MCA9IHRoaXMuX3kxID0gK3l9aCR7K3d9diR7K2h9aCR7LXd9WmA7XG4gIH1cbiAgdmFsdWUoKSB7XG4gICAgcmV0dXJuIHRoaXMuXyB8fCBudWxsO1xuICB9XG59XG4iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBQb2x5Z29uIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5fID0gW107XG4gIH1cbiAgbW92ZVRvKHgsIHkpIHtcbiAgICB0aGlzLl8ucHVzaChbeCwgeV0pO1xuICB9XG4gIGNsb3NlUGF0aCgpIHtcbiAgICB0aGlzLl8ucHVzaCh0aGlzLl9bMF0uc2xpY2UoKSk7XG4gIH1cbiAgbGluZVRvKHgsIHkpIHtcbiAgICB0aGlzLl8ucHVzaChbeCwgeV0pO1xuICB9XG4gIHZhbHVlKCkge1xuICAgIHJldHVybiB0aGlzLl8ubGVuZ3RoID8gdGhpcy5fIDogbnVsbDtcbiAgfVxufVxuIiwiaW1wb3J0IFBhdGggZnJvbSBcIi4vcGF0aC5qc1wiO1xuaW1wb3J0IFBvbHlnb24gZnJvbSBcIi4vcG9seWdvbi5qc1wiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBWb3Jvbm9pIHtcbiAgY29uc3RydWN0b3IoZGVsYXVuYXksIFt4bWluLCB5bWluLCB4bWF4LCB5bWF4XSA9IFswLCAwLCA5NjAsIDUwMF0pIHtcbiAgICBpZiAoISgoeG1heCA9ICt4bWF4KSA+PSAoeG1pbiA9ICt4bWluKSkgfHwgISgoeW1heCA9ICt5bWF4KSA+PSAoeW1pbiA9ICt5bWluKSkpIHRocm93IG5ldyBFcnJvcihcImludmFsaWQgYm91bmRzXCIpO1xuICAgIGNvbnN0IHtwb2ludHMsIGh1bGwsIHRyaWFuZ2xlc30gPSB0aGlzLmRlbGF1bmF5ID0gZGVsYXVuYXk7XG4gICAgY29uc3QgY2lyY3VtY2VudGVycyA9IHRoaXMuY2lyY3VtY2VudGVycyA9IG5ldyBGbG9hdDY0QXJyYXkodHJpYW5nbGVzLmxlbmd0aCAvIDMgKiAyKTtcbiAgICBjb25zdCB2ZWN0b3JzID0gdGhpcy52ZWN0b3JzID0gbmV3IEZsb2F0NjRBcnJheShwb2ludHMubGVuZ3RoICogMik7XG4gICAgdGhpcy54bWF4ID0geG1heCwgdGhpcy54bWluID0geG1pbjtcbiAgICB0aGlzLnltYXggPSB5bWF4LCB0aGlzLnltaW4gPSB5bWluO1xuXG4gICAgLy8gQ29tcHV0ZSBjaXJjdW1jZW50ZXJzLlxuICAgIGZvciAobGV0IGkgPSAwLCBqID0gMCwgbiA9IHRyaWFuZ2xlcy5sZW5ndGg7IGkgPCBuOyBpICs9IDMsIGogKz0gMikge1xuICAgICAgY29uc3QgdDEgPSB0cmlhbmdsZXNbaV0gKiAyO1xuICAgICAgY29uc3QgdDIgPSB0cmlhbmdsZXNbaSArIDFdICogMjtcbiAgICAgIGNvbnN0IHQzID0gdHJpYW5nbGVzW2kgKyAyXSAqIDI7XG4gICAgICBjb25zdCB4MSA9IHBvaW50c1t0MV07XG4gICAgICBjb25zdCB5MSA9IHBvaW50c1t0MSArIDFdO1xuICAgICAgY29uc3QgeDIgPSBwb2ludHNbdDJdO1xuICAgICAgY29uc3QgeTIgPSBwb2ludHNbdDIgKyAxXTtcbiAgICAgIGNvbnN0IHgzID0gcG9pbnRzW3QzXTtcbiAgICAgIGNvbnN0IHkzID0gcG9pbnRzW3QzICsgMV07XG4gICAgICBjb25zdCBhMiA9IHgxIC0geDI7XG4gICAgICBjb25zdCBhMyA9IHgxIC0geDM7XG4gICAgICBjb25zdCBiMiA9IHkxIC0geTI7XG4gICAgICBjb25zdCBiMyA9IHkxIC0geTM7XG4gICAgICBjb25zdCBkMSA9IHgxICogeDEgKyB5MSAqIHkxO1xuICAgICAgY29uc3QgZDIgPSBkMSAtIHgyICogeDIgLSB5MiAqIHkyO1xuICAgICAgY29uc3QgZDMgPSBkMSAtIHgzICogeDMgLSB5MyAqIHkzO1xuICAgICAgY29uc3QgYWIgPSAoYTMgKiBiMiAtIGEyICogYjMpICogMjtcbiAgICAgIGNpcmN1bWNlbnRlcnNbal0gPSAoYjIgKiBkMyAtIGIzICogZDIpIC8gYWI7XG4gICAgICBjaXJjdW1jZW50ZXJzW2ogKyAxXSA9IChhMyAqIGQyIC0gYTIgKiBkMykgLyBhYjtcbiAgICB9XG5cbiAgICAvLyBDb21wdXRlIGV4dGVyaW9yIGNlbGwgcmF5cy5cbiAgICBsZXQgbm9kZSA9IGh1bGw7XG4gICAgbGV0IHAwLCBwMSA9IG5vZGUuaSAqIDQ7XG4gICAgbGV0IHgwLCB4MSA9IG5vZGUueDtcbiAgICBsZXQgeTAsIHkxID0gbm9kZS55O1xuICAgIGRvIHtcbiAgICAgIG5vZGUgPSBub2RlLm5leHQsIHAwID0gcDEsIHgwID0geDEsIHkwID0geTEsIHAxID0gbm9kZS5pICogNCwgeDEgPSBub2RlLngsIHkxID0gbm9kZS55O1xuICAgICAgdmVjdG9yc1twMCArIDJdID0gdmVjdG9yc1twMV0gPSB5MCAtIHkxO1xuICAgICAgdmVjdG9yc1twMCArIDNdID0gdmVjdG9yc1twMSArIDFdID0geDEgLSB4MDtcbiAgICB9IHdoaWxlIChub2RlICE9PSBodWxsKTtcbiAgfVxuICByZW5kZXIoY29udGV4dCkge1xuICAgIGNvbnN0IGJ1ZmZlciA9IGNvbnRleHQgPT0gbnVsbCA/IGNvbnRleHQgPSBuZXcgUGF0aCA6IHVuZGVmaW5lZDtcbiAgICBjb25zdCB7ZGVsYXVuYXk6IHtoYWxmZWRnZXMsIGh1bGx9LCBjaXJjdW1jZW50ZXJzLCB2ZWN0b3JzfSA9IHRoaXM7XG4gICAgZm9yIChsZXQgaSA9IDAsIG4gPSBoYWxmZWRnZXMubGVuZ3RoOyBpIDwgbjsgKytpKSB7XG4gICAgICBjb25zdCBqID0gaGFsZmVkZ2VzW2ldO1xuICAgICAgaWYgKGogPCBpKSBjb250aW51ZTtcbiAgICAgIGNvbnN0IHRpID0gTWF0aC5mbG9vcihpIC8gMykgKiAyO1xuICAgICAgY29uc3QgdGogPSBNYXRoLmZsb29yKGogLyAzKSAqIDI7XG4gICAgICBjb25zdCB4aSA9IGNpcmN1bWNlbnRlcnNbdGldO1xuICAgICAgY29uc3QgeWkgPSBjaXJjdW1jZW50ZXJzW3RpICsgMV07XG4gICAgICBjb25zdCB4aiA9IGNpcmN1bWNlbnRlcnNbdGpdO1xuICAgICAgY29uc3QgeWogPSBjaXJjdW1jZW50ZXJzW3RqICsgMV07XG4gICAgICB0aGlzLl9yZW5kZXJTZWdtZW50KHhpLCB5aSwgeGosIHlqLCBjb250ZXh0KTtcbiAgICB9XG4gICAgbGV0IG5vZGUgPSBodWxsO1xuICAgIGRvIHtcbiAgICAgIG5vZGUgPSBub2RlLm5leHQ7XG4gICAgICBjb25zdCB0ID0gTWF0aC5mbG9vcihub2RlLnQgLyAzKSAqIDI7XG4gICAgICBjb25zdCB4ID0gY2lyY3VtY2VudGVyc1t0XTtcbiAgICAgIGNvbnN0IHkgPSBjaXJjdW1jZW50ZXJzW3QgKyAxXTtcbiAgICAgIGNvbnN0IHYgPSBub2RlLmkgKiA0O1xuICAgICAgY29uc3QgcCA9IHRoaXMuX3Byb2plY3QoeCwgeSwgdmVjdG9yc1t2ICsgMl0sIHZlY3RvcnNbdiArIDNdKTtcbiAgICAgIGlmIChwKSB0aGlzLl9yZW5kZXJTZWdtZW50KHgsIHksIHBbMF0sIHBbMV0sIGNvbnRleHQpO1xuICAgIH0gd2hpbGUgKG5vZGUgIT09IGh1bGwpO1xuICAgIHJldHVybiBidWZmZXIgJiYgYnVmZmVyLnZhbHVlKCk7XG4gIH1cbiAgcmVuZGVyQm91bmRzKGNvbnRleHQpIHtcbiAgICBjb25zdCBidWZmZXIgPSBjb250ZXh0ID09IG51bGwgPyBjb250ZXh0ID0gbmV3IFBhdGggOiB1bmRlZmluZWQ7XG4gICAgY29udGV4dC5yZWN0KHRoaXMueG1pbiwgdGhpcy55bWluLCB0aGlzLnhtYXggLSB0aGlzLnhtaW4sIHRoaXMueW1heCAtIHRoaXMueW1pbik7XG4gICAgcmV0dXJuIGJ1ZmZlciAmJiBidWZmZXIudmFsdWUoKTtcbiAgfVxuICByZW5kZXJDZWxsKGksIGNvbnRleHQpIHtcbiAgICBjb25zdCBidWZmZXIgPSBjb250ZXh0ID09IG51bGwgPyBjb250ZXh0ID0gbmV3IFBhdGggOiB1bmRlZmluZWQ7XG4gICAgY29uc3QgcG9pbnRzID0gdGhpcy5fY2xpcChpKTtcbiAgICBpZiAocG9pbnRzID09PSBudWxsKSByZXR1cm47XG4gICAgY29udGV4dC5tb3ZlVG8ocG9pbnRzWzBdLCBwb2ludHNbMV0pO1xuICAgIGZvciAobGV0IGkgPSAyLCBuID0gcG9pbnRzLmxlbmd0aDsgaSA8IG47IGkgKz0gMikge1xuICAgICAgY29udGV4dC5saW5lVG8ocG9pbnRzW2ldLCBwb2ludHNbaSArIDFdKTtcbiAgICB9XG4gICAgY29udGV4dC5jbG9zZVBhdGgoKTtcbiAgICByZXR1cm4gYnVmZmVyICYmIGJ1ZmZlci52YWx1ZSgpO1xuICB9XG4gICpjZWxsUG9seWdvbnMoKSB7XG4gICAgY29uc3Qge2RlbGF1bmF5OiB7cG9pbnRzfX0gPSB0aGlzO1xuICAgIGZvciAobGV0IGkgPSAwLCBuID0gcG9pbnRzLmxlbmd0aCAvIDI7IGkgPCBuOyArK2kpIHtcbiAgICAgIGNvbnN0IGNlbGwgPSB0aGlzLmNlbGxQb2x5Z29uKGkpO1xuICAgICAgaWYgKGNlbGwpIHlpZWxkIGNlbGw7XG4gICAgfVxuICB9XG4gIGNlbGxQb2x5Z29uKGkpIHtcbiAgICBjb25zdCBwb2x5Z29uID0gbmV3IFBvbHlnb247XG4gICAgdGhpcy5yZW5kZXJDZWxsKGksIHBvbHlnb24pO1xuICAgIHJldHVybiBwb2x5Z29uLnZhbHVlKCk7XG4gIH1cbiAgX3JlbmRlclNlZ21lbnQoeDAsIHkwLCB4MSwgeTEsIGNvbnRleHQpIHtcbiAgICBsZXQgUztcbiAgICBjb25zdCBjMCA9IHRoaXMuX3JlZ2lvbmNvZGUoeDAsIHkwKTtcbiAgICBjb25zdCBjMSA9IHRoaXMuX3JlZ2lvbmNvZGUoeDEsIHkxKTtcbiAgICBpZiAoYzAgPT09IDAgJiYgYzEgPT09IDApIHtcbiAgICAgIGNvbnRleHQubW92ZVRvKHgwLCB5MCk7XG4gICAgICBjb250ZXh0LmxpbmVUbyh4MSwgeTEpO1xuICAgIH0gZWxzZSBpZiAoUyA9IHRoaXMuX2NsaXBTZWdtZW50KHgwLCB5MCwgeDEsIHkxLCBjMCwgYzEpKSB7XG4gICAgICBjb250ZXh0Lm1vdmVUbyhTWzBdLCBTWzFdKTtcbiAgICAgIGNvbnRleHQubGluZVRvKFNbMl0sIFNbM10pO1xuICAgIH1cbiAgfVxuICBjb250YWlucyhpLCB4LCB5KSB7XG4gICAgaWYgKCh4ID0gK3gsIHggIT09IHgpIHx8ICh5ID0gK3ksIHkgIT09IHkpKSByZXR1cm4gZmFsc2U7XG4gICAgcmV0dXJuIHRoaXMuZGVsYXVuYXkuX3N0ZXAoaSwgeCwgeSkgPT09IGk7XG4gIH1cbiAgX2NlbGwoaSkge1xuICAgIGNvbnN0IHtjaXJjdW1jZW50ZXJzLCBkZWxhdW5heToge2luZWRnZXMsIGhhbGZlZGdlcywgdHJpYW5nbGVzfX0gPSB0aGlzO1xuICAgIGNvbnN0IGUwID0gaW5lZGdlc1tpXTtcbiAgICBpZiAoZTAgPT09IC0xKSByZXR1cm4gbnVsbDsgLy8gY29pbmNpZGVudCBwb2ludFxuICAgIGNvbnN0IHBvaW50cyA9IFtdO1xuICAgIGxldCBlID0gZTA7XG4gICAgZG8ge1xuICAgICAgY29uc3QgdCA9IE1hdGguZmxvb3IoZSAvIDMpO1xuICAgICAgcG9pbnRzLnB1c2goY2lyY3VtY2VudGVyc1t0ICogMl0sIGNpcmN1bWNlbnRlcnNbdCAqIDIgKyAxXSk7XG4gICAgICBlID0gZSAlIDMgPT09IDIgPyBlIC0gMiA6IGUgKyAxO1xuICAgICAgaWYgKHRyaWFuZ2xlc1tlXSAhPT0gaSkgYnJlYWs7IC8vIGJhZCB0cmlhbmd1bGF0aW9uXG4gICAgICBlID0gaGFsZmVkZ2VzW2VdO1xuICAgIH0gd2hpbGUgKGUgIT09IGUwICYmIGUgIT09IC0xKTtcbiAgICByZXR1cm4gcG9pbnRzO1xuICB9XG4gIF9jbGlwKGkpIHtcbiAgICBjb25zdCBwb2ludHMgPSB0aGlzLl9jZWxsKGkpO1xuICAgIGlmIChwb2ludHMgPT09IG51bGwpIHJldHVybiBudWxsO1xuICAgIGNvbnN0IHt2ZWN0b3JzOiBWfSA9IHRoaXM7XG4gICAgY29uc3QgdiA9IGkgKiA0O1xuICAgIHJldHVybiBWW3ZdIHx8IFZbdiArIDFdXG4gICAgICAgID8gdGhpcy5fY2xpcEluZmluaXRlKGksIHBvaW50cywgVlt2XSwgVlt2ICsgMV0sIFZbdiArIDJdLCBWW3YgKyAzXSlcbiAgICAgICAgOiB0aGlzLl9jbGlwRmluaXRlKGksIHBvaW50cyk7XG4gIH1cbiAgX2NsaXBGaW5pdGUoaSwgcG9pbnRzKSB7XG4gICAgY29uc3QgbiA9IHBvaW50cy5sZW5ndGg7XG4gICAgbGV0IFAgPSBudWxsO1xuICAgIGxldCB4MCwgeTAsIHgxID0gcG9pbnRzW24gLSAyXSwgeTEgPSBwb2ludHNbbiAtIDFdO1xuICAgIGxldCBjMCwgYzEgPSB0aGlzLl9yZWdpb25jb2RlKHgxLCB5MSk7XG4gICAgbGV0IGUwLCBlMTtcbiAgICBmb3IgKGxldCBqID0gMDsgaiA8IG47IGogKz0gMikge1xuICAgICAgeDAgPSB4MSwgeTAgPSB5MSwgeDEgPSBwb2ludHNbal0sIHkxID0gcG9pbnRzW2ogKyAxXTtcbiAgICAgIGMwID0gYzEsIGMxID0gdGhpcy5fcmVnaW9uY29kZSh4MSwgeTEpO1xuICAgICAgaWYgKGMwID09PSAwICYmIGMxID09PSAwKSB7XG4gICAgICAgIGUwID0gZTEsIGUxID0gMDtcbiAgICAgICAgaWYgKFApIFAucHVzaCh4MSwgeTEpO1xuICAgICAgICBlbHNlIFAgPSBbeDEsIHkxXTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGxldCBTLCBzeDAsIHN5MCwgc3gxLCBzeTE7XG4gICAgICAgIGlmIChjMCA9PT0gMCkge1xuICAgICAgICAgIGlmICgoUyA9IHRoaXMuX2NsaXBTZWdtZW50KHgwLCB5MCwgeDEsIHkxLCBjMCwgYzEpKSA9PT0gbnVsbCkgY29udGludWU7XG4gICAgICAgICAgW3N4MCwgc3kwLCBzeDEsIHN5MV0gPSBTO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGlmICgoUyA9IHRoaXMuX2NsaXBTZWdtZW50KHgxLCB5MSwgeDAsIHkwLCBjMSwgYzApKSA9PT0gbnVsbCkgY29udGludWU7XG4gICAgICAgICAgW3N4MSwgc3kxLCBzeDAsIHN5MF0gPSBTO1xuICAgICAgICAgIGUwID0gZTEsIGUxID0gdGhpcy5fZWRnZWNvZGUoc3gwLCBzeTApO1xuICAgICAgICAgIGlmIChlMCAmJiBlMSkgdGhpcy5fZWRnZShpLCBlMCwgZTEsIFAsIFAubGVuZ3RoKTtcbiAgICAgICAgICBpZiAoUCkgUC5wdXNoKHN4MCwgc3kwKTtcbiAgICAgICAgICBlbHNlIFAgPSBbc3gwLCBzeTBdO1xuICAgICAgICB9XG4gICAgICAgIGUwID0gZTEsIGUxID0gdGhpcy5fZWRnZWNvZGUoc3gxLCBzeTEpO1xuICAgICAgICBpZiAoZTAgJiYgZTEpIHRoaXMuX2VkZ2UoaSwgZTAsIGUxLCBQLCBQLmxlbmd0aCk7XG4gICAgICAgIGlmIChQKSBQLnB1c2goc3gxLCBzeTEpO1xuICAgICAgICBlbHNlIFAgPSBbc3gxLCBzeTFdO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAoUCkge1xuICAgICAgZTAgPSBlMSwgZTEgPSB0aGlzLl9lZGdlY29kZShQWzBdLCBQWzFdKTtcbiAgICAgIGlmIChlMCAmJiBlMSkgdGhpcy5fZWRnZShpLCBlMCwgZTEsIFAsIFAubGVuZ3RoKTtcbiAgICB9IGVsc2UgaWYgKHRoaXMuY29udGFpbnMoaSwgKHRoaXMueG1pbiArIHRoaXMueG1heCkgLyAyLCAodGhpcy55bWluICsgdGhpcy55bWF4KSAvIDIpKSB7XG4gICAgICByZXR1cm4gW3RoaXMueG1heCwgdGhpcy55bWluLCB0aGlzLnhtYXgsIHRoaXMueW1heCwgdGhpcy54bWluLCB0aGlzLnltYXgsIHRoaXMueG1pbiwgdGhpcy55bWluXTtcbiAgICB9XG4gICAgcmV0dXJuIFA7XG4gIH1cbiAgX2NsaXBTZWdtZW50KHgwLCB5MCwgeDEsIHkxLCBjMCwgYzEpIHtcbiAgICB3aGlsZSAodHJ1ZSkge1xuICAgICAgaWYgKGMwID09PSAwICYmIGMxID09PSAwKSByZXR1cm4gW3gwLCB5MCwgeDEsIHkxXTtcbiAgICAgIGlmIChjMCAmIGMxKSByZXR1cm4gbnVsbDtcbiAgICAgIGxldCB4LCB5LCBjID0gYzAgfHwgYzE7XG4gICAgICBpZiAoYyAmIDBiMTAwMCkgeCA9IHgwICsgKHgxIC0geDApICogKHRoaXMueW1heCAtIHkwKSAvICh5MSAtIHkwKSwgeSA9IHRoaXMueW1heDtcbiAgICAgIGVsc2UgaWYgKGMgJiAwYjAxMDApIHggPSB4MCArICh4MSAtIHgwKSAqICh0aGlzLnltaW4gLSB5MCkgLyAoeTEgLSB5MCksIHkgPSB0aGlzLnltaW47XG4gICAgICBlbHNlIGlmIChjICYgMGIwMDEwKSB5ID0geTAgKyAoeTEgLSB5MCkgKiAodGhpcy54bWF4IC0geDApIC8gKHgxIC0geDApLCB4ID0gdGhpcy54bWF4O1xuICAgICAgZWxzZSB5ID0geTAgKyAoeTEgLSB5MCkgKiAodGhpcy54bWluIC0geDApIC8gKHgxIC0geDApLCB4ID0gdGhpcy54bWluO1xuICAgICAgaWYgKGMwKSB4MCA9IHgsIHkwID0geSwgYzAgPSB0aGlzLl9yZWdpb25jb2RlKHgwLCB5MCk7XG4gICAgICBlbHNlIHgxID0geCwgeTEgPSB5LCBjMSA9IHRoaXMuX3JlZ2lvbmNvZGUoeDEsIHkxKTtcbiAgICB9XG4gIH1cbiAgX2NsaXBJbmZpbml0ZShpLCBwb2ludHMsIHZ4MCwgdnkwLCB2eG4sIHZ5bikge1xuICAgIGxldCBQID0gQXJyYXkuZnJvbShwb2ludHMpLCBwO1xuICAgIGlmIChwID0gdGhpcy5fcHJvamVjdChQWzBdLCBQWzFdLCB2eDAsIHZ5MCkpIFAudW5zaGlmdChwWzBdLCBwWzFdKTtcbiAgICBpZiAocCA9IHRoaXMuX3Byb2plY3QoUFtQLmxlbmd0aCAtIDJdLCBQW1AubGVuZ3RoIC0gMV0sIHZ4biwgdnluKSkgUC5wdXNoKHBbMF0sIHBbMV0pO1xuICAgIGlmIChQID0gdGhpcy5fY2xpcEZpbml0ZShpLCBQKSkge1xuICAgICAgZm9yIChsZXQgaiA9IDAsIG4gPSBQLmxlbmd0aCwgYzAsIGMxID0gdGhpcy5fZWRnZWNvZGUoUFtuIC0gMl0sIFBbbiAtIDFdKTsgaiA8IG47IGogKz0gMikge1xuICAgICAgICBjMCA9IGMxLCBjMSA9IHRoaXMuX2VkZ2Vjb2RlKFBbal0sIFBbaiArIDFdKTtcbiAgICAgICAgaWYgKGMwICYmIGMxKSBqID0gdGhpcy5fZWRnZShpLCBjMCwgYzEsIFAsIGopLCBuID0gUC5sZW5ndGg7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmICh0aGlzLmNvbnRhaW5zKGksICh0aGlzLnhtaW4gKyB0aGlzLnhtYXgpIC8gMiwgKHRoaXMueW1pbiArIHRoaXMueW1heCkgLyAyKSkge1xuICAgICAgUCA9IFt0aGlzLnhtaW4sIHRoaXMueW1pbiwgdGhpcy54bWF4LCB0aGlzLnltaW4sIHRoaXMueG1heCwgdGhpcy55bWF4LCB0aGlzLnhtaW4sIHRoaXMueW1heF07XG4gICAgfVxuICAgIHJldHVybiBQO1xuICB9XG4gIF9lZGdlKGksIGUwLCBlMSwgUCwgaikge1xuICAgIHdoaWxlIChlMCAhPT0gZTEpIHtcbiAgICAgIGxldCB4LCB5O1xuICAgICAgc3dpdGNoIChlMCkge1xuICAgICAgICBjYXNlIDBiMDEwMTogZTAgPSAwYjAxMDA7IGNvbnRpbnVlOyAvLyB0b3AtbGVmdFxuICAgICAgICBjYXNlIDBiMDEwMDogZTAgPSAwYjAxMTAsIHggPSB0aGlzLnhtYXgsIHkgPSB0aGlzLnltaW47IGJyZWFrOyAvLyB0b3BcbiAgICAgICAgY2FzZSAwYjAxMTA6IGUwID0gMGIwMDEwOyBjb250aW51ZTsgLy8gdG9wLXJpZ2h0XG4gICAgICAgIGNhc2UgMGIwMDEwOiBlMCA9IDBiMTAxMCwgeCA9IHRoaXMueG1heCwgeSA9IHRoaXMueW1heDsgYnJlYWs7IC8vIHJpZ2h0XG4gICAgICAgIGNhc2UgMGIxMDEwOiBlMCA9IDBiMTAwMDsgY29udGludWU7IC8vIGJvdHRvbS1yaWdodFxuICAgICAgICBjYXNlIDBiMTAwMDogZTAgPSAwYjEwMDEsIHggPSB0aGlzLnhtaW4sIHkgPSB0aGlzLnltYXg7IGJyZWFrOyAvLyBib3R0b21cbiAgICAgICAgY2FzZSAwYjEwMDE6IGUwID0gMGIwMDAxOyBjb250aW51ZTsgLy8gYm90dG9tLWxlZnRcbiAgICAgICAgY2FzZSAwYjAwMDE6IGUwID0gMGIwMTAxLCB4ID0gdGhpcy54bWluLCB5ID0gdGhpcy55bWluOyBicmVhazsgLy8gbGVmdFxuICAgICAgfVxuICAgICAgaWYgKChQW2pdICE9PSB4IHx8IFBbaiArIDFdICE9PSB5KSAmJiB0aGlzLmNvbnRhaW5zKGksIHgsIHkpKSB7XG4gICAgICAgIFAuc3BsaWNlKGosIDAsIHgsIHkpLCBqICs9IDI7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBqO1xuICB9XG4gIF9wcm9qZWN0KHgwLCB5MCwgdngsIHZ5KSB7XG4gICAgbGV0IHQgPSBJbmZpbml0eSwgYywgeCwgeTtcbiAgICBpZiAodnkgPCAwKSB7IC8vIHRvcFxuICAgICAgaWYgKHkwIDw9IHRoaXMueW1pbikgcmV0dXJuIG51bGw7XG4gICAgICBpZiAoKGMgPSAodGhpcy55bWluIC0geTApIC8gdnkpIDwgdCkgeSA9IHRoaXMueW1pbiwgeCA9IHgwICsgKHQgPSBjKSAqIHZ4O1xuICAgIH0gZWxzZSBpZiAodnkgPiAwKSB7IC8vIGJvdHRvbVxuICAgICAgaWYgKHkwID49IHRoaXMueW1heCkgcmV0dXJuIG51bGw7XG4gICAgICBpZiAoKGMgPSAodGhpcy55bWF4IC0geTApIC8gdnkpIDwgdCkgeSA9IHRoaXMueW1heCwgeCA9IHgwICsgKHQgPSBjKSAqIHZ4O1xuICAgIH1cbiAgICBpZiAodnggPiAwKSB7IC8vIHJpZ2h0XG4gICAgICBpZiAoeDAgPj0gdGhpcy54bWF4KSByZXR1cm4gbnVsbDtcbiAgICAgIGlmICgoYyA9ICh0aGlzLnhtYXggLSB4MCkgLyB2eCkgPCB0KSB4ID0gdGhpcy54bWF4LCB5ID0geTAgKyAodCA9IGMpICogdnk7XG4gICAgfSBlbHNlIGlmICh2eCA8IDApIHsgLy8gbGVmdFxuICAgICAgaWYgKHgwIDw9IHRoaXMueG1pbikgcmV0dXJuIG51bGw7XG4gICAgICBpZiAoKGMgPSAodGhpcy54bWluIC0geDApIC8gdngpIDwgdCkgeCA9IHRoaXMueG1pbiwgeSA9IHkwICsgKHQgPSBjKSAqIHZ5O1xuICAgIH1cbiAgICByZXR1cm4gW3gsIHldO1xuICB9XG4gIF9lZGdlY29kZSh4LCB5KSB7XG4gICAgcmV0dXJuICh4ID09PSB0aGlzLnhtaW4gPyAwYjAwMDFcbiAgICAgICAgOiB4ID09PSB0aGlzLnhtYXggPyAwYjAwMTAgOiAwYjAwMDApXG4gICAgICAgIHwgKHkgPT09IHRoaXMueW1pbiA/IDBiMDEwMFxuICAgICAgICA6IHkgPT09IHRoaXMueW1heCA/IDBiMTAwMCA6IDBiMDAwMCk7XG4gIH1cbiAgX3JlZ2lvbmNvZGUoeCwgeSkge1xuICAgIHJldHVybiAoeCA8IHRoaXMueG1pbiA/IDBiMDAwMVxuICAgICAgICA6IHggPiB0aGlzLnhtYXggPyAwYjAwMTAgOiAwYjAwMDApXG4gICAgICAgIHwgKHkgPCB0aGlzLnltaW4gPyAwYjAxMDBcbiAgICAgICAgOiB5ID4gdGhpcy55bWF4ID8gMGIxMDAwIDogMGIwMDAwKTtcbiAgfVxufVxuIiwiXG5jb25zdCBFUFNJTE9OID0gTWF0aC5wb3coMiwgLTUyKTtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRGVsYXVuYXRvciB7XG5cbiAgICBzdGF0aWMgZnJvbShwb2ludHMsIGdldFgsIGdldFkpIHtcbiAgICAgICAgaWYgKCFnZXRYKSBnZXRYID0gZGVmYXVsdEdldFg7XG4gICAgICAgIGlmICghZ2V0WSkgZ2V0WSA9IGRlZmF1bHRHZXRZO1xuXG4gICAgICAgIGNvbnN0IG4gPSBwb2ludHMubGVuZ3RoO1xuICAgICAgICBjb25zdCBjb29yZHMgPSBuZXcgRmxvYXQ2NEFycmF5KG4gKiAyKTtcblxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG47IGkrKykge1xuICAgICAgICAgICAgY29uc3QgcCA9IHBvaW50c1tpXTtcbiAgICAgICAgICAgIGNvb3Jkc1syICogaV0gPSBnZXRYKHApO1xuICAgICAgICAgICAgY29vcmRzWzIgKiBpICsgMV0gPSBnZXRZKHApO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIG5ldyBEZWxhdW5hdG9yKGNvb3Jkcyk7XG4gICAgfVxuXG4gICAgY29uc3RydWN0b3IoY29vcmRzKSB7XG4gICAgICAgIGxldCBtaW5YID0gSW5maW5pdHk7XG4gICAgICAgIGxldCBtaW5ZID0gSW5maW5pdHk7XG4gICAgICAgIGxldCBtYXhYID0gLUluZmluaXR5O1xuICAgICAgICBsZXQgbWF4WSA9IC1JbmZpbml0eTtcblxuICAgICAgICBjb25zdCBuID0gY29vcmRzLmxlbmd0aCA+PiAxO1xuICAgICAgICBjb25zdCBpZHMgPSB0aGlzLmlkcyA9IG5ldyBVaW50MzJBcnJheShuKTtcblxuICAgICAgICBpZiAobiA+IDAgJiYgdHlwZW9mIGNvb3Jkc1swXSAhPT0gJ251bWJlcicpIHRocm93IG5ldyBFcnJvcignRXhwZWN0ZWQgY29vcmRzIHRvIGNvbnRhaW4gbnVtYmVycy4nKTtcblxuICAgICAgICB0aGlzLmNvb3JkcyA9IGNvb3JkcztcblxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG47IGkrKykge1xuICAgICAgICAgICAgY29uc3QgeCA9IGNvb3Jkc1syICogaV07XG4gICAgICAgICAgICBjb25zdCB5ID0gY29vcmRzWzIgKiBpICsgMV07XG4gICAgICAgICAgICBpZiAoeCA8IG1pblgpIG1pblggPSB4O1xuICAgICAgICAgICAgaWYgKHkgPCBtaW5ZKSBtaW5ZID0geTtcbiAgICAgICAgICAgIGlmICh4ID4gbWF4WCkgbWF4WCA9IHg7XG4gICAgICAgICAgICBpZiAoeSA+IG1heFkpIG1heFkgPSB5O1xuICAgICAgICAgICAgaWRzW2ldID0gaTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGN4ID0gKG1pblggKyBtYXhYKSAvIDI7XG4gICAgICAgIGNvbnN0IGN5ID0gKG1pblkgKyBtYXhZKSAvIDI7XG5cbiAgICAgICAgbGV0IG1pbkRpc3QgPSBJbmZpbml0eTtcbiAgICAgICAgbGV0IGkwLCBpMSwgaTI7XG5cbiAgICAgICAgLy8gcGljayBhIHNlZWQgcG9pbnQgY2xvc2UgdG8gdGhlIGNlbnRyb2lkXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbjsgaSsrKSB7XG4gICAgICAgICAgICBjb25zdCBkID0gZGlzdChjeCwgY3ksIGNvb3Jkc1syICogaV0sIGNvb3Jkc1syICogaSArIDFdKTtcbiAgICAgICAgICAgIGlmIChkIDwgbWluRGlzdCkge1xuICAgICAgICAgICAgICAgIGkwID0gaTtcbiAgICAgICAgICAgICAgICBtaW5EaXN0ID0gZDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBjb25zdCBpMHggPSBjb29yZHNbMiAqIGkwXTtcbiAgICAgICAgY29uc3QgaTB5ID0gY29vcmRzWzIgKiBpMCArIDFdO1xuXG4gICAgICAgIG1pbkRpc3QgPSBJbmZpbml0eTtcblxuICAgICAgICAvLyBmaW5kIHRoZSBwb2ludCBjbG9zZXN0IHRvIHRoZSBzZWVkXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbjsgaSsrKSB7XG4gICAgICAgICAgICBpZiAoaSA9PT0gaTApIGNvbnRpbnVlO1xuICAgICAgICAgICAgY29uc3QgZCA9IGRpc3QoaTB4LCBpMHksIGNvb3Jkc1syICogaV0sIGNvb3Jkc1syICogaSArIDFdKTtcbiAgICAgICAgICAgIGlmIChkIDwgbWluRGlzdCAmJiBkID4gMCkge1xuICAgICAgICAgICAgICAgIGkxID0gaTtcbiAgICAgICAgICAgICAgICBtaW5EaXN0ID0gZDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBsZXQgaTF4ID0gY29vcmRzWzIgKiBpMV07XG4gICAgICAgIGxldCBpMXkgPSBjb29yZHNbMiAqIGkxICsgMV07XG5cbiAgICAgICAgbGV0IG1pblJhZGl1cyA9IEluZmluaXR5O1xuXG4gICAgICAgIC8vIGZpbmQgdGhlIHRoaXJkIHBvaW50IHdoaWNoIGZvcm1zIHRoZSBzbWFsbGVzdCBjaXJjdW1jaXJjbGUgd2l0aCB0aGUgZmlyc3QgdHdvXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbjsgaSsrKSB7XG4gICAgICAgICAgICBpZiAoaSA9PT0gaTAgfHwgaSA9PT0gaTEpIGNvbnRpbnVlO1xuICAgICAgICAgICAgY29uc3QgciA9IGNpcmN1bXJhZGl1cyhpMHgsIGkweSwgaTF4LCBpMXksIGNvb3Jkc1syICogaV0sIGNvb3Jkc1syICogaSArIDFdKTtcbiAgICAgICAgICAgIGlmIChyIDwgbWluUmFkaXVzKSB7XG4gICAgICAgICAgICAgICAgaTIgPSBpO1xuICAgICAgICAgICAgICAgIG1pblJhZGl1cyA9IHI7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgbGV0IGkyeCA9IGNvb3Jkc1syICogaTJdO1xuICAgICAgICBsZXQgaTJ5ID0gY29vcmRzWzIgKiBpMiArIDFdO1xuXG4gICAgICAgIGlmIChtaW5SYWRpdXMgPT09IEluZmluaXR5KSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ05vIERlbGF1bmF5IHRyaWFuZ3VsYXRpb24gZXhpc3RzIGZvciB0aGlzIGlucHV0LicpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gc3dhcCB0aGUgb3JkZXIgb2YgdGhlIHNlZWQgcG9pbnRzIGZvciBjb3VudGVyLWNsb2Nrd2lzZSBvcmllbnRhdGlvblxuICAgICAgICBpZiAob3JpZW50KGkweCwgaTB5LCBpMXgsIGkxeSwgaTJ4LCBpMnkpKSB7XG4gICAgICAgICAgICBjb25zdCBpID0gaTE7XG4gICAgICAgICAgICBjb25zdCB4ID0gaTF4O1xuICAgICAgICAgICAgY29uc3QgeSA9IGkxeTtcbiAgICAgICAgICAgIGkxID0gaTI7XG4gICAgICAgICAgICBpMXggPSBpMng7XG4gICAgICAgICAgICBpMXkgPSBpMnk7XG4gICAgICAgICAgICBpMiA9IGk7XG4gICAgICAgICAgICBpMnggPSB4O1xuICAgICAgICAgICAgaTJ5ID0geTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGNlbnRlciA9IGNpcmN1bWNlbnRlcihpMHgsIGkweSwgaTF4LCBpMXksIGkyeCwgaTJ5KTtcbiAgICAgICAgdGhpcy5fY3ggPSBjZW50ZXIueDtcbiAgICAgICAgdGhpcy5fY3kgPSBjZW50ZXIueTtcblxuICAgICAgICAvLyBzb3J0IHRoZSBwb2ludHMgYnkgZGlzdGFuY2UgZnJvbSB0aGUgc2VlZCB0cmlhbmdsZSBjaXJjdW1jZW50ZXJcbiAgICAgICAgcXVpY2tzb3J0KGlkcywgY29vcmRzLCAwLCBpZHMubGVuZ3RoIC0gMSwgY2VudGVyLngsIGNlbnRlci55KTtcblxuICAgICAgICAvLyBpbml0aWFsaXplIGEgaGFzaCB0YWJsZSBmb3Igc3RvcmluZyBlZGdlcyBvZiB0aGUgYWR2YW5jaW5nIGNvbnZleCBodWxsXG4gICAgICAgIHRoaXMuX2hhc2hTaXplID0gTWF0aC5jZWlsKE1hdGguc3FydChuKSk7XG4gICAgICAgIHRoaXMuX2hhc2ggPSBuZXcgQXJyYXkodGhpcy5faGFzaFNpemUpO1xuXG4gICAgICAgIC8vIGluaXRpYWxpemUgYSBjaXJjdWxhciBkb3VibHktbGlua2VkIGxpc3QgdGhhdCB3aWxsIGhvbGQgYW4gYWR2YW5jaW5nIGNvbnZleCBodWxsXG4gICAgICAgIGxldCBlID0gdGhpcy5odWxsID0gaW5zZXJ0Tm9kZShjb29yZHMsIGkwKTtcbiAgICAgICAgdGhpcy5faGFzaEVkZ2UoZSk7XG4gICAgICAgIGUudCA9IDA7XG4gICAgICAgIGUgPSBpbnNlcnROb2RlKGNvb3JkcywgaTEsIGUpO1xuICAgICAgICB0aGlzLl9oYXNoRWRnZShlKTtcbiAgICAgICAgZS50ID0gMTtcbiAgICAgICAgZSA9IGluc2VydE5vZGUoY29vcmRzLCBpMiwgZSk7XG4gICAgICAgIHRoaXMuX2hhc2hFZGdlKGUpO1xuICAgICAgICBlLnQgPSAyO1xuXG4gICAgICAgIGNvbnN0IG1heFRyaWFuZ2xlcyA9IDIgKiBuIC0gNTtcbiAgICAgICAgY29uc3QgdHJpYW5nbGVzID0gdGhpcy50cmlhbmdsZXMgPSBuZXcgVWludDMyQXJyYXkobWF4VHJpYW5nbGVzICogMyk7XG4gICAgICAgIGNvbnN0IGhhbGZlZGdlcyA9IHRoaXMuaGFsZmVkZ2VzID0gbmV3IEludDMyQXJyYXkobWF4VHJpYW5nbGVzICogMyk7XG5cbiAgICAgICAgdGhpcy50cmlhbmdsZXNMZW4gPSAwO1xuXG4gICAgICAgIHRoaXMuX2FkZFRyaWFuZ2xlKGkwLCBpMSwgaTIsIC0xLCAtMSwgLTEpO1xuXG4gICAgICAgIGZvciAobGV0IGsgPSAwLCB4cCwgeXA7IGsgPCBpZHMubGVuZ3RoOyBrKyspIHtcbiAgICAgICAgICAgIGNvbnN0IGkgPSBpZHNba107XG4gICAgICAgICAgICBjb25zdCB4ID0gY29vcmRzWzIgKiBpXTtcbiAgICAgICAgICAgIGNvbnN0IHkgPSBjb29yZHNbMiAqIGkgKyAxXTtcblxuICAgICAgICAgICAgLy8gc2tpcCBuZWFyLWR1cGxpY2F0ZSBwb2ludHNcbiAgICAgICAgICAgIGlmIChrID4gMCAmJiBNYXRoLmFicyh4IC0geHApIDw9IEVQU0lMT04gJiYgTWF0aC5hYnMoeSAtIHlwKSA8PSBFUFNJTE9OKSBjb250aW51ZTtcbiAgICAgICAgICAgIHhwID0geDtcbiAgICAgICAgICAgIHlwID0geTtcblxuICAgICAgICAgICAgLy8gc2tpcCBzZWVkIHRyaWFuZ2xlIHBvaW50c1xuICAgICAgICAgICAgaWYgKGkgPT09IGkwIHx8IGkgPT09IGkxIHx8IGkgPT09IGkyKSBjb250aW51ZTtcblxuICAgICAgICAgICAgLy8gZmluZCBhIHZpc2libGUgZWRnZSBvbiB0aGUgY29udmV4IGh1bGwgdXNpbmcgZWRnZSBoYXNoXG4gICAgICAgICAgICBjb25zdCBzdGFydEtleSA9IHRoaXMuX2hhc2hLZXkoeCwgeSk7XG4gICAgICAgICAgICBsZXQga2V5ID0gc3RhcnRLZXk7XG4gICAgICAgICAgICBsZXQgc3RhcnQ7XG4gICAgICAgICAgICBkbyB7XG4gICAgICAgICAgICAgICAgc3RhcnQgPSB0aGlzLl9oYXNoW2tleV07XG4gICAgICAgICAgICAgICAga2V5ID0gKGtleSArIDEpICUgdGhpcy5faGFzaFNpemU7XG4gICAgICAgICAgICB9IHdoaWxlICgoIXN0YXJ0IHx8IHN0YXJ0LnJlbW92ZWQpICYmIGtleSAhPT0gc3RhcnRLZXkpO1xuXG4gICAgICAgICAgICBzdGFydCA9IHN0YXJ0LnByZXY7XG4gICAgICAgICAgICBlID0gc3RhcnQ7XG4gICAgICAgICAgICB3aGlsZSAoIW9yaWVudCh4LCB5LCBlLngsIGUueSwgZS5uZXh0LngsIGUubmV4dC55KSkge1xuICAgICAgICAgICAgICAgIGUgPSBlLm5leHQ7XG4gICAgICAgICAgICAgICAgaWYgKGUgPT09IHN0YXJ0KSB7XG4gICAgICAgICAgICAgICAgICAgIGUgPSBudWxsO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBsaWtlbHkgYSBuZWFyLWR1cGxpY2F0ZSBwb2ludDsgc2tpcCBpdFxuICAgICAgICAgICAgaWYgKCFlKSBjb250aW51ZTtcblxuICAgICAgICAgICAgY29uc3Qgd2Fsa0JhY2sgPSBlID09PSBzdGFydDtcblxuICAgICAgICAgICAgLy8gYWRkIHRoZSBmaXJzdCB0cmlhbmdsZSBmcm9tIHRoZSBwb2ludFxuICAgICAgICAgICAgbGV0IHQgPSB0aGlzLl9hZGRUcmlhbmdsZShlLmksIGksIGUubmV4dC5pLCAtMSwgLTEsIGUudCk7XG5cbiAgICAgICAgICAgIGUudCA9IHQ7IC8vIGtlZXAgdHJhY2sgb2YgYm91bmRhcnkgdHJpYW5nbGVzIG9uIHRoZSBodWxsXG4gICAgICAgICAgICBlID0gaW5zZXJ0Tm9kZShjb29yZHMsIGksIGUpO1xuXG4gICAgICAgICAgICAvLyByZWN1cnNpdmVseSBmbGlwIHRyaWFuZ2xlcyBmcm9tIHRoZSBwb2ludCB1bnRpbCB0aGV5IHNhdGlzZnkgdGhlIERlbGF1bmF5IGNvbmRpdGlvblxuICAgICAgICAgICAgZS50ID0gdGhpcy5fbGVnYWxpemUodCArIDIpO1xuXG4gICAgICAgICAgICAvLyB3YWxrIGZvcndhcmQgdGhyb3VnaCB0aGUgaHVsbCwgYWRkaW5nIG1vcmUgdHJpYW5nbGVzIGFuZCBmbGlwcGluZyByZWN1cnNpdmVseVxuICAgICAgICAgICAgbGV0IHEgPSBlLm5leHQ7XG4gICAgICAgICAgICB3aGlsZSAob3JpZW50KHgsIHksIHEueCwgcS55LCBxLm5leHQueCwgcS5uZXh0LnkpKSB7XG4gICAgICAgICAgICAgICAgdCA9IHRoaXMuX2FkZFRyaWFuZ2xlKHEuaSwgaSwgcS5uZXh0LmksIHEucHJldi50LCAtMSwgcS50KTtcbiAgICAgICAgICAgICAgICBxLnByZXYudCA9IHRoaXMuX2xlZ2FsaXplKHQgKyAyKTtcbiAgICAgICAgICAgICAgICB0aGlzLmh1bGwgPSByZW1vdmVOb2RlKHEpO1xuICAgICAgICAgICAgICAgIHEgPSBxLm5leHQ7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICh3YWxrQmFjaykge1xuICAgICAgICAgICAgICAgIC8vIHdhbGsgYmFja3dhcmQgZnJvbSB0aGUgb3RoZXIgc2lkZSwgYWRkaW5nIG1vcmUgdHJpYW5nbGVzIGFuZCBmbGlwcGluZ1xuICAgICAgICAgICAgICAgIHEgPSBlLnByZXY7XG4gICAgICAgICAgICAgICAgd2hpbGUgKG9yaWVudCh4LCB5LCBxLnByZXYueCwgcS5wcmV2LnksIHEueCwgcS55KSkge1xuICAgICAgICAgICAgICAgICAgICB0ID0gdGhpcy5fYWRkVHJpYW5nbGUocS5wcmV2LmksIGksIHEuaSwgLTEsIHEudCwgcS5wcmV2LnQpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9sZWdhbGl6ZSh0ICsgMik7XG4gICAgICAgICAgICAgICAgICAgIHEucHJldi50ID0gdDtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5odWxsID0gcmVtb3ZlTm9kZShxKTtcbiAgICAgICAgICAgICAgICAgICAgcSA9IHEucHJldjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIHNhdmUgdGhlIHR3byBuZXcgZWRnZXMgaW4gdGhlIGhhc2ggdGFibGVcbiAgICAgICAgICAgIHRoaXMuX2hhc2hFZGdlKGUpO1xuICAgICAgICAgICAgdGhpcy5faGFzaEVkZ2UoZS5wcmV2KTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIHRyaW0gdHlwZWQgdHJpYW5nbGUgbWVzaCBhcnJheXNcbiAgICAgICAgdGhpcy50cmlhbmdsZXMgPSB0cmlhbmdsZXMuc3ViYXJyYXkoMCwgdGhpcy50cmlhbmdsZXNMZW4pO1xuICAgICAgICB0aGlzLmhhbGZlZGdlcyA9IGhhbGZlZGdlcy5zdWJhcnJheSgwLCB0aGlzLnRyaWFuZ2xlc0xlbik7XG4gICAgfVxuXG4gICAgX2hhc2hFZGdlKGUpIHtcbiAgICAgICAgdGhpcy5faGFzaFt0aGlzLl9oYXNoS2V5KGUueCwgZS55KV0gPSBlO1xuICAgIH1cblxuICAgIF9oYXNoS2V5KHgsIHkpIHtcbiAgICAgICAgcmV0dXJuIE1hdGguZmxvb3IocHNldWRvQW5nbGUoeCAtIHRoaXMuX2N4LCB5IC0gdGhpcy5fY3kpICogdGhpcy5faGFzaFNpemUpICUgdGhpcy5faGFzaFNpemU7XG4gICAgfVxuXG4gICAgX2xlZ2FsaXplKGEpIHtcbiAgICAgICAgY29uc3Qge3RyaWFuZ2xlcywgY29vcmRzLCBoYWxmZWRnZXN9ID0gdGhpcztcblxuICAgICAgICBjb25zdCBiID0gaGFsZmVkZ2VzW2FdO1xuXG4gICAgICAgIC8qIGlmIHRoZSBwYWlyIG9mIHRyaWFuZ2xlcyBkb2Vzbid0IHNhdGlzZnkgdGhlIERlbGF1bmF5IGNvbmRpdGlvblxuICAgICAgICAgKiAocDEgaXMgaW5zaWRlIHRoZSBjaXJjdW1jaXJjbGUgb2YgW3AwLCBwbCwgcHJdKSwgZmxpcCB0aGVtLFxuICAgICAgICAgKiB0aGVuIGRvIHRoZSBzYW1lIGNoZWNrL2ZsaXAgcmVjdXJzaXZlbHkgZm9yIHRoZSBuZXcgcGFpciBvZiB0cmlhbmdsZXNcbiAgICAgICAgICpcbiAgICAgICAgICogICAgICAgICAgIHBsICAgICAgICAgICAgICAgICAgICBwbFxuICAgICAgICAgKiAgICAgICAgICAvfHxcXCAgICAgICAgICAgICAgICAgIC8gIFxcXG4gICAgICAgICAqICAgICAgIGFsLyB8fCBcXGJsICAgICAgICAgICAgYWwvICAgIFxcYVxuICAgICAgICAgKiAgICAgICAgLyAgfHwgIFxcICAgICAgICAgICAgICAvICAgICAgXFxcbiAgICAgICAgICogICAgICAgLyAgYXx8YiAgXFwgICAgZmxpcCAgICAvX19fYXJfX19cXFxuICAgICAgICAgKiAgICAgcDBcXCAgIHx8ICAgL3AxICAgPT4gICBwMFxcLS0tYmwtLS0vcDFcbiAgICAgICAgICogICAgICAgIFxcICB8fCAgLyAgICAgICAgICAgICAgXFwgICAgICAvXG4gICAgICAgICAqICAgICAgIGFyXFwgfHwgL2JyICAgICAgICAgICAgIGJcXCAgICAvYnJcbiAgICAgICAgICogICAgICAgICAgXFx8fC8gICAgICAgICAgICAgICAgICBcXCAgL1xuICAgICAgICAgKiAgICAgICAgICAgcHIgICAgICAgICAgICAgICAgICAgIHByXG4gICAgICAgICAqL1xuICAgICAgICBjb25zdCBhMCA9IGEgLSBhICUgMztcbiAgICAgICAgY29uc3QgYjAgPSBiIC0gYiAlIDM7XG5cbiAgICAgICAgY29uc3QgYWwgPSBhMCArIChhICsgMSkgJSAzO1xuICAgICAgICBjb25zdCBhciA9IGEwICsgKGEgKyAyKSAlIDM7XG4gICAgICAgIGNvbnN0IGJsID0gYjAgKyAoYiArIDIpICUgMztcblxuICAgICAgICBpZiAoYiA9PT0gLTEpIHJldHVybiBhcjtcblxuICAgICAgICBjb25zdCBwMCA9IHRyaWFuZ2xlc1thcl07XG4gICAgICAgIGNvbnN0IHByID0gdHJpYW5nbGVzW2FdO1xuICAgICAgICBjb25zdCBwbCA9IHRyaWFuZ2xlc1thbF07XG4gICAgICAgIGNvbnN0IHAxID0gdHJpYW5nbGVzW2JsXTtcblxuICAgICAgICBjb25zdCBpbGxlZ2FsID0gaW5DaXJjbGUoXG4gICAgICAgICAgICBjb29yZHNbMiAqIHAwXSwgY29vcmRzWzIgKiBwMCArIDFdLFxuICAgICAgICAgICAgY29vcmRzWzIgKiBwcl0sIGNvb3Jkc1syICogcHIgKyAxXSxcbiAgICAgICAgICAgIGNvb3Jkc1syICogcGxdLCBjb29yZHNbMiAqIHBsICsgMV0sXG4gICAgICAgICAgICBjb29yZHNbMiAqIHAxXSwgY29vcmRzWzIgKiBwMSArIDFdKTtcblxuICAgICAgICBpZiAoaWxsZWdhbCkge1xuICAgICAgICAgICAgdHJpYW5nbGVzW2FdID0gcDE7XG4gICAgICAgICAgICB0cmlhbmdsZXNbYl0gPSBwMDtcblxuICAgICAgICAgICAgY29uc3QgaGJsID0gaGFsZmVkZ2VzW2JsXTtcblxuICAgICAgICAgICAgLy8gZWRnZSBzd2FwcGVkIG9uIHRoZSBvdGhlciBzaWRlIG9mIHRoZSBodWxsIChyYXJlKTsgZml4IHRoZSBoYWxmZWRnZSByZWZlcmVuY2VcbiAgICAgICAgICAgIGlmIChoYmwgPT09IC0xKSB7XG4gICAgICAgICAgICAgICAgbGV0IGUgPSB0aGlzLmh1bGw7XG4gICAgICAgICAgICAgICAgZG8ge1xuICAgICAgICAgICAgICAgICAgICBpZiAoZS50ID09PSBibCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgZS50ID0gYTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGUgPSBlLm5leHQ7XG4gICAgICAgICAgICAgICAgfSB3aGlsZSAoZSAhPT0gdGhpcy5odWxsKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuX2xpbmsoYSwgaGJsKTtcbiAgICAgICAgICAgIHRoaXMuX2xpbmsoYiwgaGFsZmVkZ2VzW2FyXSk7XG4gICAgICAgICAgICB0aGlzLl9saW5rKGFyLCBibCk7XG5cbiAgICAgICAgICAgIGNvbnN0IGJyID0gYjAgKyAoYiArIDEpICUgMztcblxuICAgICAgICAgICAgdGhpcy5fbGVnYWxpemUoYSk7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fbGVnYWxpemUoYnIpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGFyO1xuICAgIH1cblxuICAgIF9saW5rKGEsIGIpIHtcbiAgICAgICAgdGhpcy5oYWxmZWRnZXNbYV0gPSBiO1xuICAgICAgICBpZiAoYiAhPT0gLTEpIHRoaXMuaGFsZmVkZ2VzW2JdID0gYTtcbiAgICB9XG5cbiAgICAvLyBhZGQgYSBuZXcgdHJpYW5nbGUgZ2l2ZW4gdmVydGV4IGluZGljZXMgYW5kIGFkamFjZW50IGhhbGYtZWRnZSBpZHNcbiAgICBfYWRkVHJpYW5nbGUoaTAsIGkxLCBpMiwgYSwgYiwgYykge1xuICAgICAgICBjb25zdCB0ID0gdGhpcy50cmlhbmdsZXNMZW47XG5cbiAgICAgICAgdGhpcy50cmlhbmdsZXNbdF0gPSBpMDtcbiAgICAgICAgdGhpcy50cmlhbmdsZXNbdCArIDFdID0gaTE7XG4gICAgICAgIHRoaXMudHJpYW5nbGVzW3QgKyAyXSA9IGkyO1xuXG4gICAgICAgIHRoaXMuX2xpbmsodCwgYSk7XG4gICAgICAgIHRoaXMuX2xpbmsodCArIDEsIGIpO1xuICAgICAgICB0aGlzLl9saW5rKHQgKyAyLCBjKTtcblxuICAgICAgICB0aGlzLnRyaWFuZ2xlc0xlbiArPSAzO1xuXG4gICAgICAgIHJldHVybiB0O1xuICAgIH1cbn1cblxuLy8gbW9ub3RvbmljYWxseSBpbmNyZWFzZXMgd2l0aCByZWFsIGFuZ2xlLCBidXQgZG9lc24ndCBuZWVkIGV4cGVuc2l2ZSB0cmlnb25vbWV0cnlcbmZ1bmN0aW9uIHBzZXVkb0FuZ2xlKGR4LCBkeSkge1xuICAgIGNvbnN0IHAgPSBkeCAvIChNYXRoLmFicyhkeCkgKyBNYXRoLmFicyhkeSkpO1xuICAgIHJldHVybiAoZHkgPiAwID8gMyAtIHAgOiAxICsgcCkgLyA0OyAvLyBbMC4uMV1cbn1cblxuZnVuY3Rpb24gZGlzdChheCwgYXksIGJ4LCBieSkge1xuICAgIGNvbnN0IGR4ID0gYXggLSBieDtcbiAgICBjb25zdCBkeSA9IGF5IC0gYnk7XG4gICAgcmV0dXJuIGR4ICogZHggKyBkeSAqIGR5O1xufVxuXG5mdW5jdGlvbiBvcmllbnQocHgsIHB5LCBxeCwgcXksIHJ4LCByeSkge1xuICAgIHJldHVybiAocXkgLSBweSkgKiAocnggLSBxeCkgLSAocXggLSBweCkgKiAocnkgLSBxeSkgPCAwO1xufVxuXG5mdW5jdGlvbiBpbkNpcmNsZShheCwgYXksIGJ4LCBieSwgY3gsIGN5LCBweCwgcHkpIHtcbiAgICBjb25zdCBkeCA9IGF4IC0gcHg7XG4gICAgY29uc3QgZHkgPSBheSAtIHB5O1xuICAgIGNvbnN0IGV4ID0gYnggLSBweDtcbiAgICBjb25zdCBleSA9IGJ5IC0gcHk7XG4gICAgY29uc3QgZnggPSBjeCAtIHB4O1xuICAgIGNvbnN0IGZ5ID0gY3kgLSBweTtcblxuICAgIGNvbnN0IGFwID0gZHggKiBkeCArIGR5ICogZHk7XG4gICAgY29uc3QgYnAgPSBleCAqIGV4ICsgZXkgKiBleTtcbiAgICBjb25zdCBjcCA9IGZ4ICogZnggKyBmeSAqIGZ5O1xuXG4gICAgcmV0dXJuIGR4ICogKGV5ICogY3AgLSBicCAqIGZ5KSAtXG4gICAgICAgICAgIGR5ICogKGV4ICogY3AgLSBicCAqIGZ4KSArXG4gICAgICAgICAgIGFwICogKGV4ICogZnkgLSBleSAqIGZ4KSA8IDA7XG59XG5cbmZ1bmN0aW9uIGNpcmN1bXJhZGl1cyhheCwgYXksIGJ4LCBieSwgY3gsIGN5KSB7XG4gICAgY29uc3QgZHggPSBieCAtIGF4O1xuICAgIGNvbnN0IGR5ID0gYnkgLSBheTtcbiAgICBjb25zdCBleCA9IGN4IC0gYXg7XG4gICAgY29uc3QgZXkgPSBjeSAtIGF5O1xuXG4gICAgY29uc3QgYmwgPSBkeCAqIGR4ICsgZHkgKiBkeTtcbiAgICBjb25zdCBjbCA9IGV4ICogZXggKyBleSAqIGV5O1xuICAgIGNvbnN0IGQgPSBkeCAqIGV5IC0gZHkgKiBleDtcblxuICAgIGNvbnN0IHggPSAoZXkgKiBibCAtIGR5ICogY2wpICogMC41IC8gZDtcbiAgICBjb25zdCB5ID0gKGR4ICogY2wgLSBleCAqIGJsKSAqIDAuNSAvIGQ7XG5cbiAgICByZXR1cm4gYmwgJiYgY2wgJiYgZCAmJiAoeCAqIHggKyB5ICogeSkgfHwgSW5maW5pdHk7XG59XG5cbmZ1bmN0aW9uIGNpcmN1bWNlbnRlcihheCwgYXksIGJ4LCBieSwgY3gsIGN5KSB7XG4gICAgY29uc3QgZHggPSBieCAtIGF4O1xuICAgIGNvbnN0IGR5ID0gYnkgLSBheTtcbiAgICBjb25zdCBleCA9IGN4IC0gYXg7XG4gICAgY29uc3QgZXkgPSBjeSAtIGF5O1xuXG4gICAgY29uc3QgYmwgPSBkeCAqIGR4ICsgZHkgKiBkeTtcbiAgICBjb25zdCBjbCA9IGV4ICogZXggKyBleSAqIGV5O1xuICAgIGNvbnN0IGQgPSBkeCAqIGV5IC0gZHkgKiBleDtcblxuICAgIGNvbnN0IHggPSBheCArIChleSAqIGJsIC0gZHkgKiBjbCkgKiAwLjUgLyBkO1xuICAgIGNvbnN0IHkgPSBheSArIChkeCAqIGNsIC0gZXggKiBibCkgKiAwLjUgLyBkO1xuXG4gICAgcmV0dXJuIHt4LCB5fTtcbn1cblxuLy8gY3JlYXRlIGEgbmV3IG5vZGUgaW4gYSBkb3VibHkgbGlua2VkIGxpc3RcbmZ1bmN0aW9uIGluc2VydE5vZGUoY29vcmRzLCBpLCBwcmV2KSB7XG4gICAgY29uc3Qgbm9kZSA9IHtcbiAgICAgICAgaSxcbiAgICAgICAgeDogY29vcmRzWzIgKiBpXSxcbiAgICAgICAgeTogY29vcmRzWzIgKiBpICsgMV0sXG4gICAgICAgIHQ6IDAsXG4gICAgICAgIHByZXY6IG51bGwsXG4gICAgICAgIG5leHQ6IG51bGwsXG4gICAgICAgIHJlbW92ZWQ6IGZhbHNlXG4gICAgfTtcblxuICAgIGlmICghcHJldikge1xuICAgICAgICBub2RlLnByZXYgPSBub2RlO1xuICAgICAgICBub2RlLm5leHQgPSBub2RlO1xuXG4gICAgfSBlbHNlIHtcbiAgICAgICAgbm9kZS5uZXh0ID0gcHJldi5uZXh0O1xuICAgICAgICBub2RlLnByZXYgPSBwcmV2O1xuICAgICAgICBwcmV2Lm5leHQucHJldiA9IG5vZGU7XG4gICAgICAgIHByZXYubmV4dCA9IG5vZGU7XG4gICAgfVxuICAgIHJldHVybiBub2RlO1xufVxuXG5mdW5jdGlvbiByZW1vdmVOb2RlKG5vZGUpIHtcbiAgICBub2RlLnByZXYubmV4dCA9IG5vZGUubmV4dDtcbiAgICBub2RlLm5leHQucHJldiA9IG5vZGUucHJldjtcbiAgICBub2RlLnJlbW92ZWQgPSB0cnVlO1xuICAgIHJldHVybiBub2RlLnByZXY7XG59XG5cbmZ1bmN0aW9uIHF1aWNrc29ydChpZHMsIGNvb3JkcywgbGVmdCwgcmlnaHQsIGN4LCBjeSkge1xuICAgIGxldCBpLCBqLCB0ZW1wO1xuXG4gICAgaWYgKHJpZ2h0IC0gbGVmdCA8PSAyMCkge1xuICAgICAgICBmb3IgKGkgPSBsZWZ0ICsgMTsgaSA8PSByaWdodDsgaSsrKSB7XG4gICAgICAgICAgICB0ZW1wID0gaWRzW2ldO1xuICAgICAgICAgICAgaiA9IGkgLSAxO1xuICAgICAgICAgICAgd2hpbGUgKGogPj0gbGVmdCAmJiBjb21wYXJlKGNvb3JkcywgaWRzW2pdLCB0ZW1wLCBjeCwgY3kpID4gMCkgaWRzW2ogKyAxXSA9IGlkc1tqLS1dO1xuICAgICAgICAgICAgaWRzW2ogKyAxXSA9IHRlbXA7XG4gICAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgICBjb25zdCBtZWRpYW4gPSAobGVmdCArIHJpZ2h0KSA+PiAxO1xuICAgICAgICBpID0gbGVmdCArIDE7XG4gICAgICAgIGogPSByaWdodDtcbiAgICAgICAgc3dhcChpZHMsIG1lZGlhbiwgaSk7XG4gICAgICAgIGlmIChjb21wYXJlKGNvb3JkcywgaWRzW2xlZnRdLCBpZHNbcmlnaHRdLCBjeCwgY3kpID4gMCkgc3dhcChpZHMsIGxlZnQsIHJpZ2h0KTtcbiAgICAgICAgaWYgKGNvbXBhcmUoY29vcmRzLCBpZHNbaV0sIGlkc1tyaWdodF0sIGN4LCBjeSkgPiAwKSBzd2FwKGlkcywgaSwgcmlnaHQpO1xuICAgICAgICBpZiAoY29tcGFyZShjb29yZHMsIGlkc1tsZWZ0XSwgaWRzW2ldLCBjeCwgY3kpID4gMCkgc3dhcChpZHMsIGxlZnQsIGkpO1xuXG4gICAgICAgIHRlbXAgPSBpZHNbaV07XG4gICAgICAgIHdoaWxlICh0cnVlKSB7XG4gICAgICAgICAgICBkbyBpKys7IHdoaWxlIChjb21wYXJlKGNvb3JkcywgaWRzW2ldLCB0ZW1wLCBjeCwgY3kpIDwgMCk7XG4gICAgICAgICAgICBkbyBqLS07IHdoaWxlIChjb21wYXJlKGNvb3JkcywgaWRzW2pdLCB0ZW1wLCBjeCwgY3kpID4gMCk7XG4gICAgICAgICAgICBpZiAoaiA8IGkpIGJyZWFrO1xuICAgICAgICAgICAgc3dhcChpZHMsIGksIGopO1xuICAgICAgICB9XG4gICAgICAgIGlkc1tsZWZ0ICsgMV0gPSBpZHNbal07XG4gICAgICAgIGlkc1tqXSA9IHRlbXA7XG5cbiAgICAgICAgaWYgKHJpZ2h0IC0gaSArIDEgPj0gaiAtIGxlZnQpIHtcbiAgICAgICAgICAgIHF1aWNrc29ydChpZHMsIGNvb3JkcywgaSwgcmlnaHQsIGN4LCBjeSk7XG4gICAgICAgICAgICBxdWlja3NvcnQoaWRzLCBjb29yZHMsIGxlZnQsIGogLSAxLCBjeCwgY3kpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcXVpY2tzb3J0KGlkcywgY29vcmRzLCBsZWZ0LCBqIC0gMSwgY3gsIGN5KTtcbiAgICAgICAgICAgIHF1aWNrc29ydChpZHMsIGNvb3JkcywgaSwgcmlnaHQsIGN4LCBjeSk7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbmZ1bmN0aW9uIGNvbXBhcmUoY29vcmRzLCBpLCBqLCBjeCwgY3kpIHtcbiAgICBjb25zdCBkMSA9IGRpc3QoY29vcmRzWzIgKiBpXSwgY29vcmRzWzIgKiBpICsgMV0sIGN4LCBjeSk7XG4gICAgY29uc3QgZDIgPSBkaXN0KGNvb3Jkc1syICogal0sIGNvb3Jkc1syICogaiArIDFdLCBjeCwgY3kpO1xuICAgIHJldHVybiAoZDEgLSBkMikgfHwgKGNvb3Jkc1syICogaV0gLSBjb29yZHNbMiAqIGpdKSB8fCAoY29vcmRzWzIgKiBpICsgMV0gLSBjb29yZHNbMiAqIGogKyAxXSk7XG59XG5cbmZ1bmN0aW9uIHN3YXAoYXJyLCBpLCBqKSB7XG4gICAgY29uc3QgdG1wID0gYXJyW2ldO1xuICAgIGFycltpXSA9IGFycltqXTtcbiAgICBhcnJbal0gPSB0bXA7XG59XG5cbmZ1bmN0aW9uIGRlZmF1bHRHZXRYKHApIHtcbiAgICByZXR1cm4gcFswXTtcbn1cbmZ1bmN0aW9uIGRlZmF1bHRHZXRZKHApIHtcbiAgICByZXR1cm4gcFsxXTtcbn1cbiJdLCJzb3VyY2VSb290IjoiIn0=