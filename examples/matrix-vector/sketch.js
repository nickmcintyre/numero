function setup() {
  noCanvas();
  print("---\n A \n---\n");
  const a = createTensor([[1, 0], [0, 2]]);
  a.print();
  print("---\n x \n---\n");
  const x = createTensor([3, 4]);
  x.print();
  print("--------\n Ax = b \n--------\n");
  const b = a.dot(x);
  b.print();
}
