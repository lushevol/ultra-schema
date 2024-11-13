import { useMemo } from "react";

import { StompServiceContext } from "./useStompService";
import { generateStomp } from "./util";

export const StompServiceProvider = ({ children }) => {
  const stomp = useMemo(() => ({ stomp$: generateStomp() }), []);
  return (
    <StompServiceContext.Provider value={stomp}>
      {children}
    </StompServiceContext.Provider>
  );
};
