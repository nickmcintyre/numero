function setup() {
  print('=== JSON-based DataFrame ===');
  
  const json_data = [
    { A: 0.4612, B: 4.28283, C: -1.509, D: -1.1352 },
    { A: 0.5112, B: -0.22863, C: -3.39059, D: 1.1632 },
    { A: 0.6911, B: -0.82863, C: -1.5059, D: 2.1352 },
    { A: 0.4692, B: -1.28863, C: 4.5059, D: 4.1632 }
  ];
  const df = createDataFrame(json_data);
  df.print();
}
