import { expect, test } from 'vitest';
import { sum_func } from './index';

test('adds 1 + 2 to equal 3', () => {
    expect(sum_func(1, 2)).toBe(3)
})