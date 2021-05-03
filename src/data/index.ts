import * as tf from '@tensorflow/tfjs';

import * as dfd from '../lib/danfo';
// @ts-ignore
import { neuralNetwork } from '../lib/ml5';
import { Tensor } from '../tensor';

export const { DataFrame } = dfd;

/**
 * Creates a new DataFrame (2D tabular data structure).
 *
 * @param data JSON, Array, or 2D Tensor
 * @returns the tensor
 */
export const createDataFrame = function createDataFrameObject(
  data: Array<object> | tf.Tensor | Tensor,
  kwargs: object,
): dfd.DataFrame {
  if (data instanceof Tensor ) {
    return new DataFrame(data.tensor, kwargs);
  } else {
    return new DataFrame(data, kwargs);
  }
};

/**
 * Loads csv or json data from a file or a URL.
 * 
 * @param filename      String: name of the file or url to load
 * @param extension     String: parse the dataframe by comma-separated values "csv" or JSON "json"
 * @param callback      Function: function to be executed after loadDataFrame() completes. On success, the DataFrame object is passed in as the first argument. 
 * @param errorCallback Function: function to be executed if there is an error, response is passed in as first argument (Optional) 
 */
 export const loadDataFrame = function _loadDataFrame(
     filename: string,
     extension: string,
     callback: any,
     errorCallback: any,
) {
    if (extension === 'csv') {
      dfd.read_csv(filename)
        .then(callback)
        .catch(errorCallback);
    } else if (extension === 'json') {
      dfd.read_json(filename)
        .then(callback)
        .catch(errorCallback);
    }
  };
