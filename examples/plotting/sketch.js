let iris
let plot

function preload() {
  iris = loadTable('iris.csv', 'csv', 'header')
}

function setup() {
  createCanvas(400, 400)

  plot = createPlot(iris)
}

function draw() {
  plot.title('Iris sepals')
  plot.xlabel('Width')
  plot.ylabel('Height')
  plot.point({
    x: 'SepalWidth',
    y: 'SepalLength',
  })
}
