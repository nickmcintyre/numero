let plot;
const battery = {
  ah: 100,
  v: 12,
  capacity: 100 * 12,
  maxdod: 0.8,
  cRate: 20,
  hour: [0],
  wh: [240],
};
let hr = 0;
let fanAngle = 0;
let fanEnergy = 0;
let solarEnergy = 0;
const button = {
  x: 320,
  y: 152,
  r: 10,
};

function setup() {
  createCanvas(400, 400);

  plot = createPlot(battery);
  plot.size(width, height / 2);
  const props = {
    isDynamic: true,
    yRange: {
      min: 0,
      max: battery.capacity,
    },
  };
  plot.configure(props);
  plot.position(0, height / 2);

  frameRate(12);

  describe('A solar panel charging a battery that powers a fan.');
}

function draw() {
  drawSky();
  drawGround();

  drawPanel();
  drawBattery();
  drawFan();
  drawCircuit();

  plot.title('Battery energy storage');
  plot.xlabel('Hour');
  plot.ylabel('Energy (Wh)');
  plot.line({ x: 'hour', y: 'wh' });
  plot.render();

  update();
}

function update() {
  // supply
  solarEnergy = random(100, 300);
  // demand
  const { x, y, r } = button;
  if (mouseIsPressed && dist(x, y, mouseX, mouseY) < r) {
    fanEnergy = 200;
  } else {
    fanEnergy = 0;
  }
  // physics
  runCircuit();
  // data management
  if (battery.hour.length > 48) {
    battery.hour.shift();
    battery.wh.shift();
  }
  // time
  hr += 1;
}

function drawSky() {
  // sky
  background('dodgerblue');
  // sun
  fill('gold');
  noStroke();
  circle(80, 30, 50);
  // cloud
  const a = 70 - map(solarEnergy, 100, 300, 0, 20);
  fill(255, a);
  ellipse(80, 45, 100, 30);
}

function drawGround() {
  stroke('burlywood');
  fill('burlywood');
  rect(0, 150, width, 50);
}

function drawPanel() {
  push();
  translate(80, 85);
  stroke('gainsboro');
  strokeWeight(2);
  fill('midnightblue');
  quad(-30, 0, 30, 0, 40, 80, -40, 80);
  pop();
}

function drawBattery() {
  push();
  translate(width / 2, 160);
  fill('gray');
  stroke('gray');
  strokeWeight(1);
  let w = 80;
  const h = 30;
  translate(-w / 2, 0);
  rect(0, 0, w, h);
  fill('limegreen');
  const last = battery.wh.length - 1;
  w = map(battery.wh[last], 0, battery.capacity, 0, w);
  rect(0, 0, w, h);
  pop();
}

function drawFan() {
  push();
  const angleSpeed = fanEnergy * 0.1;
  fanAngle += angleSpeed;
  translate(320, 90);
  // frame
  fill('black');
  stroke('black');
  strokeWeight(1);
  rectMode(CENTER);
  rect(0, 50, 50, 51);
  fill('dodgerblue');
  stroke('black');
  strokeWeight(2);
  circle(0, 0, 100);
  const last = battery.wh.length - 1;
  if (battery.wh[last] > (1 - battery.maxdod) * battery.capacity) {
    rotate(fanAngle);
  }
  // blades
  noStroke();
  fill('lightblue');
  ellipse(0, 0, 95, 50);
  rotate(HALF_PI);
  ellipse(0, 0, 95, 50);
  noFill();
  stroke('black');
  circle(0, 0, 30);
  pop();
  // button
  push();
  const { x, y, r } = button;
  translate(x, y);
  if (dist(x, y, mouseX, mouseY) < r && mouseIsPressed) {
    fill('red');
  } else {
    fill('gray');
  }
  noStroke();
  circle(0, 0, 2 * r);
  pop();
}

function drawCircuit() {
  push();

  // left
  // positive
  push();
  translate(80, 88);
  stroke('red');
  strokeWeight(2);
  line(20, 79, 20, 85);
  line(20, 85, 79, 85);
  pop();
  // negative
  push();
  translate(40, 88);
  stroke('black');
  strokeWeight(2);
  line(20, 79, 20, 90);
  line(20, 90, 119, 90);
  pop();

  // right
  // positive
  push();
  translate(295, 88);
  stroke('red');
  strokeWeight(2);
  line(20, 79, 20, 85);
  line(20, 85, -54, 85);
  pop();
  // negative
  push();
  translate(305, 88);
  stroke('black');
  strokeWeight(2);
  line(20, 79, 20, 90);
  line(20, 90, -64, 90);
  pop();

  pop();
}

function runCircuit() {
  // add time step
  battery.hour.push(hr);
  battery.wh.push(0);
  const last = battery.wh.length - 1;
  // compute supply and demand
  const maxCharge = battery.capacity / battery.cRate;
  if (solarEnergy > fanEnergy) {
    let supply = solarEnergy - fanEnergy;
    supply = constrain(supply, 0, maxCharge);
    battery.wh[last] = battery.wh[last - 1] + supply;
    battery.wh[last] = constrain(battery.wh[last], 0, battery.capacity);
  } else {
    let demand = fanEnergy - solarEnergy;
    let supply = battery.wh[last - 1] - (1 - battery.maxdod) * battery.capacity;
    supply = constrain(supply, 0, maxCharge);
    demand = min(supply, demand);
    battery.wh[last] = battery.wh[last - 1] - demand;
  }
}
