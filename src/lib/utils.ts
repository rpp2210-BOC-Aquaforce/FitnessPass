/* eslint-disable import/prefer-default-export */
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: string[]) {
  return twMerge(clsx(inputs));
}
