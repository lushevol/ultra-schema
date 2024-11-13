import { render } from '@testing-library/react';

import RatanNotification from './ratan-notification';

describe('RatanNotification', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<RatanNotification />);
    expect(baseElement).toBeTruthy();
  });
});
