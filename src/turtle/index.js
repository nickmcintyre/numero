export class Turtle {
  constructor(pInst) {
    this.pInst = pInst;

    this.turtle = {};
    this.home();
  }

  home() {
    this.turtle.x = this.pInst.width / 2;
    this.turtle.y = this.pInst.height / 2;
    this.turtle.angle = 0;

    this.turtle.pen = true;
    this.turtle.pencolor = "black";
    this.turtle.penwidth = 1;
  }

  pencolor(pencolor) {
    this.turtle.pencolor = pencolor;
  }

  pensize(penwidth) {
    this.turtle.penwidth = penwidth;
  }

  pendown() {
    this.turtle.pen = true;
  }

  penup() {
    this.turtle.pen = false;
  }

  setposition(x, y) {
    this.turtle.x = x;
    this.turtle.y = y;
  }

  position() {
    return [this.turtle.x, this.turtle.y];
  }

  left(angle) {
    this.turtle.angle -= angle;
  }

  right(angle) {
    this.turtle.angle += angle;
  }

  setheading(angle) {
    this.turtle.angle = angle;
  }

  heading() {
    return this.turtle.angle;
  }

  forward(d) {
    // save current angleMode
    const currAngleMode = this._angleMode;

    // switch to DEGREES
    this.pInst.angleMode(this.pInst.DEGREES);

    // apply -90 correction since in logo 0 degrees is up
    const x2 = this.turtle.x + d * this.pInst.cos(this.turtle.angle - 90);
    const y2 = this.turtle.y + d * this.pInst.sin(this.turtle.angle - 90);

    // restore original angleMode
    this.pInst.angleMode(currAngleMode);

    if (this.turtle.pen) {
      this.pInst.push();

      this.pInst.strokeWeight(this.turtle.penwidth);
      this.pInst.stroke(this.turtle.pencolor);
      this.pInst.line(this.turtle.x, this.turtle.y, x2, y2);

      this.pInst.pop();
    }

    this.turtle.x = x2;
    this.turtle.y = y2;
  }

  back(d) {
    this.forward(-d);
  }

  circle(r) {
    if (!this.turtle.pen) return;

    this.pInst.push();

    this.pInst.strokeWeight(this.turtle.penwidth);
    this.pInst.stroke(this.turtle.pencolor);
    this.pInst.circle(this.turtle.x, this.turtle.y, 2 * r);

    this.pInst.pop();
  }
}

// Redefines circle() to allow drawing of a circle at current turtle position
// If three parameters are specified, the regular p5.js circle is drawn
const p5Circle = p5.prototype.circle;
p5.prototype.circle = function () {
  if (!p5Circle) return;

  if (arguments.length === 1) {
    this.getDefaultTurtle().circle(arguments[0]);
    return;
  }

  p5Circle.call(this, ...arguments);
};

// Returns a new Turtle object to be used in multiple-turtle mode
p5.prototype.createTurtle = function () {
  return new Turtle(this);
};

// Returns the default turtle object
// Usually only built-in global API functions are using this function
p5.prototype.getDefaultTurtle = function () {
  if (!this.defaultTurtle) this.defaultTurtle = this.createTurtle();

  return this.defaultTurtle;
};

// Returns the turtle in the home position
p5.prototype.home = function () {
  this.getDefaultTurtle().home();
};

// Selects a color for the turtle pen
p5.prototype.pencolor = function (pencolor) {
  this.getDefaultTurtle().pencolor(pencolor);
};

// Selects a size for the turtle pen
p5.prototype.pensize = function (penwidth) {
  this.getDefaultTurtle().pensize(penwidth);
};

// Instructs the turtle to put the pen on the canvas
// Turtle draw only if pen is down
p5.prototype.pendown = function () {
  this.getDefaultTurtle().pendown();
};

// Instructs the turtle to raise the pen
// In this mode the turtle doesn't leave a 'trail' on the canvas
p5.prototype.penup = function () {
  this.getDefaultTurtle().penup();
};

// Makes the turtle jump to a particular position
p5.prototype.setposition = function (x, y) {
  this.getDefaultTurtle().setposition(x, y);
};

// Returns the position of the turtle
p5.prototype.position = function () {
  return this.getDefaultTurtle().position();
};

// Turns turtle left the specified number of degrees
p5.prototype.left = function (angle) {
  this.getDefaultTurtle().left(angle);
};

// Turns turtle right the specified number of degrees
p5.prototype.right = function (angle) {
  this.getDefaultTurtle().right(angle);
};

// Sets the turtle heading / angle in degrees (0 is up)
p5.prototype.setheading = function (angle) {
  this.getDefaultTurtle().setheading(angle);
};

// Returns the turtle heading / angle (0 is up)
p5.prototype.heading = function () {
  return this.getDefaultTurtle().heading();
};

// Moves the turtle forward (e.g. draw a straight line of specified lenght)
// The line will be visible only if pen is down
p5.prototype.forward = function (d) {
  this.getDefaultTurtle().forward(d);
};

// Moves the turtle backwards (e.g. draw a straight line of specified lenght)
// The line will be visible only if pen is down
p5.prototype.back = function (d) {
  this.getDefaultTurtle().back(d);
};
