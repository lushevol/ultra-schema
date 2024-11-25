import { fireEvent, render, screen } from '@testing-library/react';
import { CustomDatePacker } from './CustomDatePacker';

it('CustomDatePacker', async () => {
  const handleOnChange = jest.fn();
  render(<CustomDatePacker handleOnChange={handleOnChange} />);

  fireEvent.click(screen.getByTestId('datetime-local'));
  expect(screen.getByText('Today')).toBeInTheDocument();

  fireEvent.click(screen.getByText('Today'));
  fireEvent.click(document.body);

  // expect(handleOnChange).toHaveBeenCalled();
});
