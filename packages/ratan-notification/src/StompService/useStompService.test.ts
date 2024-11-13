import { renderHook } from '@testing-library/react';
import { useStompService } from './useStompService';

describe('useStompService', () => {
  it('useStompService should return stomp$', () => {
    const { result } = renderHook(() => useStompService());

    expect(result.current.stomp$).not.toBeUndefined();
  });
});
