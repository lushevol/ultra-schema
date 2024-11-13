import { renderHook } from "@Test/test-utils";

import { useStompService } from "./useStompService";

describe('useStompService', () => {
  it("useStompService should return stomp$", () => {
    const { result } = renderHook(() => useStompService());

    expect(result.current.stomp$).not.toBeUndefined();
  });
});