import * as tf from '@tensorflow/tfjs';

import { Tensor } from './tensor';

// ===== Profiling and Management =====

/**
 * Returns memory info about tensor objects.
 *
 * @returns information about tensors in memory
 */
export const { memory } = tf;

/**
 * Executes the provided function and cleans up
 * all intermediate tensors allocated. Any
 * tensors returned will remain in memory.
 *
 * @param nameOrFn  the name of the closure, or
 *                  the function to execute.
 * @param fn        (optional) the function to execute
 * @returns         (optional) tensors
 */
export const scope = tf.tidy;

/**
 * Start a scope. Use this with endScope() to
 * clean up all tensors allocated in a section
 * of code.
 */
export const startScope = () => tf.engine().startScope();

/**
 * End a scope. Use this with startScope() to
 * clean up all tensors allocated in a section
 * of code.
 */
export const endScope = () => tf.engine().endScope();

/**
 * Keeps a tensor from being disposed automatically.
 *
 * @param tensor the tensor or tensors to be kept in memory
 */
export const keep = function keepInMemory(x: Tensor | Tensor[]) {
  if (x instanceof Tensor) {
    tf.keep(x.tensor);
  } else if (x instanceof Array) {
    x.forEach((t) => tf.keep(t.tensor));
  }
};

/**
 * Manually dispose of a tensor.
 *
 * @param x the tensor or tensors to be disposed of
 */
export const dispose = function disposeFromMemory(x: Tensor | Tensor[]) {
  if (x instanceof Tensor) {
    x.dispose();
  } else if (x instanceof Array) {
    x.forEach((t) => t.dispose());
  }
};
