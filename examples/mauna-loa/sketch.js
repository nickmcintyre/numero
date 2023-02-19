let data;

function preload() {
  data = loadTable('co2.csv', 'csv', 'header');
}

function setup() {
  noCanvas();
  tidy(
    data,
    filter((d) => d.mean > 400),
    debug('Observations greater than 400ppm CO2'),
  );
}
