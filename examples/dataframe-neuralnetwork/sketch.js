function preload() {
  // Step 1: load data
  loadDataFrame('https://assets.computiful.org/pre-alpha/who_life_expectancy.csv', 'csv', callback, errorCallback);
}

function callback(df) {
  // Step 2: transform and visualize
  df = df.query({column: 'Country', is: '==', to: 'Kenya'});
  df = df.dropna({ axis: 0 });
  let plotDiv = createDiv();
  plotDiv.id('plot_div');
  df.plot("plot_div").scatter({
    x: 'Schooling',
    y: 'Life expectancy',
  });
  df.to_json().then((json) => {
    // Step 3: set your neural network options
    const options = {
      task: 'regression',
      debug: true,
    };

    // Step 4: initialize your neural network
    const nn = ml5.neuralNetwork(options);

    // Step 5: add data to the neural network
    JSON.parse(json).forEach((item) => {
      const input = {
        schooling: item['Schooling'],
      };
      const output = {
        life_expectancy: item['Life expectancy'],
      };

      nn.addData(input, output);
    });

    // Step 6: normalize your data
    nn.normalizeData();

    // Step 7: train your neural network
    const trainingOptions = {
      epochs: 32,
      batchSize: 12,
    };
    nn.train(trainingOptions, finishedTraining);

    // Step 8: use the trained model
    function finishedTraining() {
      predict();
    }

    // Step 9: make a prediction
    function predict() {
      const input = {
        schooling: 5,
      };
      nn.predict(input, handleResults);
    }

    // Step 10: define a function to handle the results of your classification
    function handleResults(error, result) {
      if (error) {
        console.error(error);
        return;
      }
      console.log(result); // { label: 'life_expectancy', value: 79.7 };
    }
  });
}

function errorCallback(error) {
  console.error(error);
}

function setup() {
  noCanvas();
}
