let data;

function preload() {
  data = loadTable('iris.csv', 'csv', 'header');
}

function setup() {
  noCanvas();
  tidy(
    data,
    sliceHead(5),
    debug('Beginning of Iris dataset'),
  );
  tidy(
    data,
    sliceTail(5),
    debug('End of Iris dataset'),
  );
  tidy(
    data,
    groupBy('Species', [
      summarize({
        min: min('PetalLength'),
        median: median('PetalLength'),
        max: max('PetalLength'),
        variance: variance('PetalLength'),
      }),
    ]),
    debug('PetalLength summary by species'),
  );
}
