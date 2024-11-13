import { useEffect } from 'react';
import { useNotificationCenter } from '../notification-center';
import type { NotifyConfig } from '../notification-center/notify/type';
import { stompConfig } from './config';
import { useStompServiceTopicMessage } from './useStompService';

export const useStompServiceNotificationConnector = () => {
  const { message$ } = useStompServiceTopicMessage<any>(stompConfig.topic);
  const nc = useNotificationCenter();

  useEffect(() => {
    if (message$) {
      const notify: NotifyConfig<any> = ({ data }) => {
        const { Cashflow_Id, Cashflow_State } = data;
        return {
          title: Cashflow_Id,
          body: Cashflow_State,
          type: 'success',
        };
      };
      nc.schedule({
        processor: message$,
        notify,
      });
    }
  }, [message$, nc.schedule]);
};
