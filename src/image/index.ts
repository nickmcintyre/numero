import * as tfc from '@tensorflow/tfjs-core';
import * as p5 from 'p5';

import { createTensor, Tensor } from '../tensor/index';

/**
 * Creates a Tensor object from an existing p5.Image.
 *
 * @param img          the image
 * @param numChannels  (optional) the number of channels of the output tensor.
 * @returns            the image as a tensor
 */
export const fromImage = function loadImageIntoTensor(
  img: any,
  numChannels?: number,
): Tensor {
  const t: Tensor = createTensor(tfc.browser.fromPixels(img.canvas, numChannels));
  // t.tensor.

  return t;
};

/**
 * Creates a p5.Image from an existing tensor object.
 * 
 * @param t the image as a tensor
 * @returns the image
 */
export const toImage = function drawTensorToImage(
  t: Tensor,
): p5.Image {
  const { shape } = t.tensor;
  const height: number = shape[0];
  const width: number = shape[1];
  const depth: number = shape[2];
  const img: any = p5.prototype.createImage(width, height);
  tfc.browser.toPixels(t.tensor.as3D(height, width, depth), img.canvas);

  return img;
};
