import * as tfc from '@tensorflow/tfjs-core';
import * as p5 from 'p5';

import { Tensor } from './index';


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
 *                  the function to execute. If a name is provided, the 2nd argument should be the function. If debug mode is on, the timing and the memory usage of the function will be tracked and displayed on the console using the provided name.
 * @param fn        the function to execute
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
