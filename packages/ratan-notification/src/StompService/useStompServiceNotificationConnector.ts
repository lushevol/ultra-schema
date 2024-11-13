import { useEffect } from "react";
import { NotifiedCashflow } from "src/Cashflow_CN/components/CashflowNotification/CashflowNotificationSubscriber/interface";

import { useNotificationCenter } from "../NotificationCenter/v2";
import { NotifyConfig } from "../NotificationCenter/v2/notify/type";
import { stompConfig } from "./config";
import { useStompServiceTopicMessage } from "./useStompService";
import { featureScopedEnabled } from "../common/utils/featureFlagController";

export const useStompServiceNotificationConnector = () => {
  const { message$ } = useStompServiceTopicMessage<NotifiedCashflow>(
    stompConfig.topic,
  );
  const nc = useNotificationCenter();

  useEffect(() => {
    if (message$ && featureScopedEnabled("Enable_Stomp_Notification")) {
      const notify: NotifyConfig<NotifiedCashflow> = ({ data }) => {
        const { Cashflow_Id, Cashflow_State } = data!;
        return {
          title: Cashflow_Id,
          body: Cashflow_State,
          type: "success",
        };
      };
      nc.schedule({
        processor: message$,
        notify,
      });
    }
  }, [message$]);
};
