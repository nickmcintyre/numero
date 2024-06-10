/* eslint-disable import/no-extraneous-dependencies */
import * as p5 from 'p5';
import * as tf from '@tensorflow/tfjs-core';

import { createTensor, Tensor } from './tensor';

const { createImage } = p5.prototype;

/**
 * Creates a Tensor object from an existing p5.Image.
 *
 * @param img          the image
 * @param numChannels  (optional) the number of channels of the output tensor
 * @returns            the image as a tensor
 */
export const fromImage = function loadImageIntoTensor(
  img: any,
  numChannels?: number,
): Tensor {
  const t: Tensor = createTensor(tf.browser.fromPixels(img.canvas, numChannels));

  return t;
};

/**
 * Creates a p5.Image from an existing Tensor object.
 *
 * @param t the image as a tensor
 * @returns the image
 */
export const toImage = function drawTensorToImage(t: Tensor): Promise<p5.Image> {
  const { shape } = t.tensor;
  const height: number = shape[0];
  const width: number = shape[1];
  const depth: number = shape[2];
  const img: any = createImage(width, height);
  const intensor: tf.Tensor = tf.cast(t.tensor, 'int32');
  const t3D: tf.Tensor3D = tf.reshape(intensor, [height, width, depth]);

  return tf.browser.toPixels(t3D, img.canvas).then(() => {
    intensor.dispose();
    t3D.dispose();

    return img;
  });
};
