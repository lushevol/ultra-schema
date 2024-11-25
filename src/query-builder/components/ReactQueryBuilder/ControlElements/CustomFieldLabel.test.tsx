import { render } from '@testing-library/react';
import type { Schema } from 'react-querybuilder';
import { CustomFieldLabel } from './CustomFieldLabel';

afterAll(() => {
  jest.clearAllMocks();
});

describe('CustomFieldLabel component', () => {
  it('should be in the document', () => {
    const props = {
      className: 'rule-value',
      handleOnChange: jest.fn(),
      options: [],
      value: '200',
      title: 'title',
      disabled: false,
      multiple: false,
      listsAsArrays: true,
      path: [6],
      level: 3,
      rule: {
        field: 'TEST',
        value: '',
        operator: '=',
        id: '0a498ef2-2fb7-48f2-a4e2-4c5cb9888872',
      },
      schema: {
        fields: [],
      } as unknown as Schema,
    };
    const { getByTestId } = render(<CustomFieldLabel {...props} />);
    const label = getByTestId('custom-field-label');
    expect(label).toBeInTheDocument();
  });
});
