export default class Ring {
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