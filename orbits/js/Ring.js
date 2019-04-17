export default class Ring {
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