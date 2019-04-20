import * as dat from 'dat.gui';
import Ring from "./Ring";
import { exportSVG } from './export-functions';
import { getVoronoiPolygons } from './voronoi-functions';

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

    // Create Ring objects using params stored in guiVariables
    for(let ringParams of guiVariables.rings) {
      let ring = new Ring(ringParams.numPoints, ringParams.radius);
      ring.radius = ringParams.radius;
      ring.animationMode = ringParams.hasOwnProperty('animationMode') ? ringParams.animationMode : ring.animationMode;
      ring.velocity = ringParams.velocity / 10000;

      // Generate subrings for each point of this ring, if specified
      if(ringParams.hasSubrings) {
        for(let point of ring.points) {
          let subring = new Ring(ringParams.subringNumPoints, ringParams.subringRadius, point[0], point[1]);
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
    gui = new dat.GUI();
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
      export:    function() { exportSVG(cells) },
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
      folder.add(ring, 'radius', guiVariables.minRadius, guiVariables.maxRadius).name('Radius').onChange(generateRings);
      folder.add(ring, 'animationMode', ['rotation', 'radius']).name('Animation mode').onChange(generateRings);
      folder.add(ring, 'velocity', -100, 100, 1).name('Velocity').onChange(generateRings);

      folder.add(ring, 'hasSubrings').name('Has subrings').onChange(function(checked) {
        if(checked) {
          ring.subringNumPoints = parseInt(p5.random(1, 100));
          ring.subringRadius = p5.random(50, 200);
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
        folder.add(ring, 'subringRadius', 50, 200).name('Subring radius').onChange(generateRings);
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
    }
  }
}

// Launch the sketch using p5js in instantiated mode
new p5(sketch);