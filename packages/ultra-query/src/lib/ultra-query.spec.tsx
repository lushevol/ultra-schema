import { render } from '@testing-library/react';

import UltraQuery from './ultra-query';

describe('UltraQuery', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<UltraQuery />);
    expect(baseElement).toBeTruthy();
  });
});
