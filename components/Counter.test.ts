import '@testing-library/jest-dom';
import { render, fireEvent } from '@testing-library/svelte';
import { count } from '../stores/count';
import Counter from './Counter.svelte';

afterEach(() => {
  count.reset();
});

test('should show the count', () => {
  const { getByText } = render(Counter);
  const counterDisplay = getByText('1000');

  expect(counterDisplay).toBeInTheDocument();
});

test('should add to the count', async () => {
  const { getByText, getByLabelText } = render(Counter);

  const button = getByLabelText('Add');
  await fireEvent.click(button);

  const counterDisplay = getByText('1010');
  expect(counterDisplay).toBeInTheDocument();
});

test('should subtract from the count', async () => {
  const { getByText, getByLabelText } = render(Counter);

  const button = getByLabelText('Subtract');
  await fireEvent.click(button);

  const counterDisplay = getByText('990');
  expect(counterDisplay).toBeInTheDocument();
});

test('should reset the count', async () => {
  const { getByText, getByLabelText } = render(Counter);

  const addButton = getByLabelText('Add');
  await fireEvent.click(addButton);

  const resetButton = getByText('Reset');
  await fireEvent.click(resetButton);

  const counterDisplay = getByText('1000');
  expect(counterDisplay).toBeInTheDocument();
});
