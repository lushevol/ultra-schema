import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { CustomDatePickerSelect } from './CustomDatePickerSelect';

it('CustomDatePickerSelect', () => {
  const data = { type: 'businessDay', value: 1 };
  const set = jest.fn();
  render(<div>{CustomDatePickerSelect(data, set)}</div>);
  const select = screen.getByTestId('custom-day-type-select')
    .firstElementChild as Element;
  fireEvent.mouseDown(select);
  fireEvent.click(screen.getByText('Calendar Day'));
  expect(set).toHaveBeenCalledTimes(1);

  const input = screen.getByRole('spinbutton');
  userEvent.type(input, '10');
  fireEvent.keyDown(input, { key: 'Enter' });

  expect(set).toHaveBeenCalledTimes(4);
});
