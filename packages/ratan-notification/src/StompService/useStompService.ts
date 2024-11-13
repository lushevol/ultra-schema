import { RxStomp, RxStompState } from "@stomp/rx-stomp";
import { createContext, useContext, useEffect, useState } from "react";
import { map, Observable } from "rxjs";

type ContextType = {
  stomp$: RxStomp | null;
};

export const StompServiceContext = createContext<ContextType>({
  stomp$: null,
});

export const useStompService = () => {
  const { stomp$ } = useContext(StompServiceContext);

  return {
    stomp$,
  };
};

export const useStompServiceStatue = () => {
  const { stomp$ } = useStompService();
  const [connectionStatus, setConnectionStatus] = useState<string>();

  useEffect(() => {
    const subscriptionOb = stomp$?.connectionState$.subscribe((state) => {
      setConnectionStatus(RxStompState[state]);
    });

    return () => {
      subscriptionOb?.unsubscribe();
    };
  }, []);

  return {
    connectionStatus,
  };
};

export const useStompServiceTopicMessage = <T>(topic: string) => {
  const { stomp$ } = useStompService();
  const [message$, setMessage$] = useState<Observable<T>>();

  useEffect(() => {
    setMessage$(
      stomp$?.watch(topic).pipe(map((message) => JSON.parse(message.body))),
    );
  }, []);

  return {
    message$,
  };
};
