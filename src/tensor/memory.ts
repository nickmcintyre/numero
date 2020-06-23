import * as tfc from '@tensorflow/tfjs-core';

import { Tensor } from './index';

declare const p5: any;


// ===== Profiling and Management =====

/**
 * Returns memory info about tensor objects.
 *
 * @returns information about tensors in memory
 */
export const { memory } = tfc;

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
export const { tidy } = tfc;

/**
 * Start a scope. Use this with endScope() to
 * clean up all tensors allocated in a section
 * of code.
 */
export const startScope = () => tfc.engine().startScope();

/**
 * End a scope. Use this with startScope() to
 * clean up all tensors allocated in a section
 * of code.
 */
export const endScope = () => tfc.engine().endScope();

/**
 * Keeps a tensor from being disposed automatically.
 * 
 * @param tensor the tensor or tensors to be kept in memory
 */
export const keep = function keepInMemory(x: Tensor | Tensor[]) {
  if (x instanceof Tensor) {
    tfc.keep(x.tensor);
  } else if (x instanceof Array) {
    x.forEach((t) => tfc.keep(t.tensor));
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
