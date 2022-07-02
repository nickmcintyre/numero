let iris

function preload() {
  iris = loadTable('../plotting/iris.csv', 'csv', 'header')
}

function setup() {
  noCanvas()
  // iris.print() // raw dataset
  iris.inferTypes()
  // iris.print() // dataset with types inferred
  print('Iris dataset summary by column')
  let summary = iris.describe()
  summary.print()
  print('Mean by species')
  let mean = iris.groupby('Species').mean()
  mean.print()
}
