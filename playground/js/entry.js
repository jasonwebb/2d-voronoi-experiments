import * as dat from 'dat.gui';
import Ring from "./Ring";
import { getRandomEvenNumber, getRandomOddNumber } from './math-utilities';
import { exportSVG } from './export-utilities';
import { getVoronoiPolygons } from './voronoi-utilities';

let showPoints = false,
  invertColors = false,
  useBlurEffect = false,
  isPaused = false,
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
  },
  guiFunctions = {
    randomize: function() { sketch.randomize(); },
    export: function() { exportSVG(); }
  };
  
const maxRadius = (window.innerWidth > window.innerHeight) ? window.innerHeight/2 - 10 : window.innerWidth/2 - 10,
  minRadius = 10;

const EVEN = 0,
  ODD = 1,
  ALTERNATING = 2,
  ANY = 3;

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
    cells = getVoronoiPolygons(points);

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

  
  /*
    Create Ring objects
    ===================
  */
  
  // Create Ring objects based on current values from GUI
  function generateRings() {
    rings = [];

    // Adjust number of rings in params array based on changes to numRings slider
    if(guiVariables.numRings < guiVariables.rings.length) {   // numRings decreased - reduce the array size
      guiVariables.rings = guiVariables.rings.slice(0, guiVariables.numRings);
      
    } else if(guiVariables.numRings > guiVariables.rings.length) {    // numRings increased - generate new ring params
      for(let i=0; i < Math.abs(guiVariables.numRings - guiVariables.rings.length); i++) {
        // let ringParams = generateRandomRingParams();
      }
    }

    // Calculate radii
    let currentRadius = maxRadius,
        radiusStep = (maxRadius - minRadius) / guiVariables.numRings;

    // Create Ring objects using params stored in guiVariables
    for(let ringParams of guiVariables.rings) {
      let ring = new Ring(ringParams.numPoints, currentRadius);
      ring.radiusOffset = p5.random(-50,50);
      ring.animationMode = ringParams.hasOwnProperty('animationMode') ? ringParams.animationMode : ring.animationMode;

      // Generate subrings for each point of this ring, if specified
      if(ringParams.hasSubrings) {
        for(let point of ring.points) {
          let subring = new Ring(ringParams.subringNumPoints, ringParams.subringRadius, point[0], point[1]);
          subring.animationMode = ringParams.subringAnimationMode;  
          ring.subrings.push(subring);
        }
      }

      rings.push(ring);
      currentRadius -= radiusStep;
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


  /*
    UI functions
    ============
  */

  function initializeGUI() {
    gui = new dat.GUI();
    gui.width = 300;
    randomize();
  }

  // Build the dat.gui interface
  function rebuildGUI() {
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

    // Number of rings slider
    guiElements.numRingsSlider = gui.add(guiVariables, 'numRings', 3, 10, 1).onChange(generateRings);

    // Folders for each ring
    guiElements.folders = [];
    for(let [index, ring] of guiVariables.rings.entries()) {
      let folder = gui.addFolder('Ring ' + (index + 1));

      // Ring options
      folder.add(ring, 'numPoints', 10, 100, 1).name('Number of points').onChange(generateRings);
      folder.add(ring, 'radiusOffset', -50, 50).name('Radius offset').onChange(generateRings);
      folder.add(ring, 'animationMode', ['rotation', 'radius']).name('Animation mode').onChange(generateRings);
      // folders.add(add, 'velocity', .1, .001).name('Velocity').onChange(generateRings);

      folder.add(ring, 'hasSubrings').name('Has subrings').onChange(function(checked) {
        if(checked) {
          ring.subringNumPoints = p5.random(10, 100);
          ring.subringRadius = p5.random(50, 200);
          ring.subringAnimationMode = 'rotation';
          // ring.subringVelocity = p5.random(.001, .01);
        } else {
          delete ring.subringNumPoints;
          delete ring.subringRadius;
          delete ring.subringAnimationMode;
          delete ring.subringVelocity;
        }

        generateRings();
        rebuildGUI();
      });

      // Subring options
      if(ring.hasSubrings) {
        folder.add(ring, 'subringNumPoints', 10, 100, 1).name('Subring point count').onChange(generateRings);
        folder.add(ring, 'subringRadius', 50, 200).name('Subring radius').onChange(generateRings);
        folder.add(ring, 'subringAnimationMode', ['rotation', 'radius']).name('Subring animation').onChange(generateRings);
      }

      guiElements.folders.push(folder);
    }

    // Feature toggles
    guiElements.invertColorsCheckbox = gui.add(guiVariables, 'invertColors').name('Invert colors').onChange(toggleInvertColors);
    guiElements.blurEffectCheckbox   = gui.add(guiVariables, 'blurEffect').name('Blur effect').onChange(toggleBlurEffect);
    guiElements.showPointsCheckbox   = gui.add(guiVariables, 'showPoints').name('Show points').onChange(toggleShowPoints);

    // Buttons
    guiElements.randomizeButton = gui.add(guiFunctions, 'randomize').name('Randomize');
    guiElements.exportButton   = gui.add(guiFunctions, 'export').name('Export as SVG');
  }

    function toggleInvertColors() { invertColors = !invertColors; }
    function toggleBlurEffect()   { useBlurEffect = !useBlurEffect; }
    function toggleShowPoints()   { showPoints = !showPoints; }


  function randomize() {
    guiVariables.numRings = parseInt(p5.random(3,10));
    
    guiVariables.rings = [];
    let currentRowType = EVEN;

    for(let i = 0; i < guiVariables.numRings; i++) {
      let ringParams = {}, range = [];
      const rowType = parseInt(p5.random(0,3));
      
      // Rings near the center look better with fewer points
      if (i > 3) {
        range[0] = 5;
        range[1] = 10;
      } else {
        range[0] = 20;
        range[1] = 100;
      }

      // Generate number of points in this ring
      switch(rowType) {
        case EVEN:
          ringParams.numPoints = getRandomEvenNumber(range[0], range[1]);
          break;

        case ODD:
          ringParams.numPoints = getRandomOddNumber(range[0], range[1]);
          break;

        case ALTERNATING:
          switch (currentRowType) {
            case EVEN:
              ringParams.numPoints = getRandomEvenNumber(range[0], range[1]);
              currentRowType = ODD;
              break;

            case ODD:
              ringParams.numPoints = getRandomOddNumber(range[0], range[1]);
              currentRowType = EVEN;
              break;
          }

          break;

        case ANY:
          ringParams.numPoints = parseInt(p5.random(range[0], range[1]));
          break;
      }
      
      // Generate radius for this ring
      ringParams.animationMode = 'rotation';
      ringParams.radiusOffset = p5.random(-50,50);
      ringParams.hasSubrings = false;
      
      guiVariables.rings.push(ringParams);
    }
  }
  

  /*
    Key released handler
    ====================
  */
  p5.keyReleased = function () {
    switch (p5.key) {
      case 'r':
        randomize();
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
        exportSVG(cells);
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