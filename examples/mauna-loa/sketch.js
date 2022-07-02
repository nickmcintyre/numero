let co2

function preload() {
  co2 = loadTable('co2.csv', 'csv', 'header', (table) => {
    table.parseDates('date')
    table.inferTypes()
  })
}

function setup() {
  noCanvas()
  print('Atmospheric Carbon Dioxide at Mauna Loa')
  co2.print()
}
