let iris;
let plot;

function preload() {
  iris = loadTable('iris.csv', 'csv', 'header');
}

function setup() {
  createCanvas(400, 400);

  iris.inferTypes();
  plot = createPlot(iris);

  noLoop();
}

function draw() {
  plot.title('Iris sepals');
  plot.xlabel('Width (cm)');
  plot.ylabel('Height (cm)');
  plot.point({
    x: 'SepalWidth',
    y: 'SepalLength',
  });
  plot.render();
}
