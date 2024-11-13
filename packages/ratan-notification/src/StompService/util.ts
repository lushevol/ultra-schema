import { RxStomp } from "@stomp/rx-stomp";
import SockJS from "sockjs-client";

import { CommonUtil } from "../import";
import { stompConfig } from "./config";

const getHeaders = () => {
  const { getLocalStorage } = CommonUtil;
  const token = (getLocalStorage().getItem("SET_TOKEN") as string) || "";
  const headers = {
    "Single-UI-Authorization": token,
  };

  return headers;
};

export const generateStomp = () => {
  const rxStomp = new RxStomp();
  rxStomp.configure({
    // brokerURL: stompConfig.url,
    connectHeaders: getHeaders(),
    webSocketFactory() {
      return new SockJS(stompConfig.url, undefined, { timeout: 1000 });
    },
    debug: (msg) => {
      console.log(new Date(), msg);
    },
    heartbeatIncoming: 0,
    heartbeatOutgoing: 20_000,
    connectionTimeout: 10_000,
    reconnectDelay: 200,
  });

  rxStomp.activate();

  return rxStomp;
};
