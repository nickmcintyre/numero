// Gaussian elimination example
// https://en.wikipedia.org/wiki/Gaussian_elimination
// CC-BY-SA

function setup() {
  const result = num.tidy(() => {
    let a = createTensor([[ 2,  1, -1,   8],
                          [-3, -1,  2, -11],
                          [-2,  1,  2,  -3]]);
    a = a.addRows(0, 1, 1.5);
    a = a.addRows(0, 2);
    a = a.subRows(1, 2, 4);
    a = a.addRows(2, 1, 0.5);
    a = a.subRows(2, 0);
    a = a.mulRow(1, 2);
    a = a.mulRow(2, -1);
    a = a.subRows(1, 0);
    a = a.mulRow(0, 0.5);

    return a;
  });

  print(result.toString());
}
