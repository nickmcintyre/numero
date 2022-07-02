import { Range } from './props';

export const min = (array: number[]): number => Math.min(...array);

export const max = (array: number[]): number => Math.max(...array);

export const range = (array: number[]): Range => ({ min: min(array), max: max(array) });
