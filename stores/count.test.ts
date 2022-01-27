import { get } from 'svelte/store';
import { count } from './count';

afterEach(() => {
  count.reset();
});

test('should init with 1000', () => {
  expect(get(count)).toEqual(1000);
});

test('should add by 10', () => {
  count.add();
  expect(get(count)).toEqual(1010);
});

test('should subtract by 10', () => {
  count.subtract();
  expect(get(count)).toEqual(990);
});

test('should reset to 1000', () => {
  count.add();
  count.add();
  count.add();
  count.reset();
  expect(get(count)).toEqual(1000);
});
