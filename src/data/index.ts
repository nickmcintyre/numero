import * as tf from '@tensorflow/tfjs';

import * as dfd from '../lib/danfo';
import { Tensor } from '../tensor';

export class DataFrame {
  public dataframe: any;

  constructor(data: Array<object> | tf.Tensor | Tensor, kwargs: object) {
    if (data instanceof Tensor) {
      this.dataframe = new dfd.DataFrame(data.tensor, kwargs);
    } else {
      this.dataframe = new dfd.DataFrame(data, kwargs);
    }
  }

  /**
   * Prints the string representation of the DataFrame to the console.
   */
  print() {
    this.dataframe.print();
  }
}

/**
 * Creates a new DataFrame (2D tabular data structure).
 *
 * @param data JSON, Array, or 2D Tensor
 * @returns the tensor
 */
export const createDataFrame = function createDataFrameObject(
  data: Array<object> | tf.Tensor | Tensor,
  kwargs: object,
): DataFrame {
  return new DataFrame(data, kwargs);
};
