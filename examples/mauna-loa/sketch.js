let co2;

function preload() {
  co2 = loadTable('co2.csv', 'csv', 'header', wrangle);
}

function setup() {
  noCanvas();
  print('Atmospheric Carbon Dioxide at Mauna Loa');
  co2.head();
}

function wrangle(table) {
  table.parseDates('date');
  table.inferTypes();
}
