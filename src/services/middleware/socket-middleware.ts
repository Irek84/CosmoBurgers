import { AnyAction, MiddlewareAPI } from "redux";
import { TWsAction } from "../types";
import { getCookie } from "../../utils/api";

export const socketMiddleware = (wsUrl: string, wsActions: TWsAction, isProtected: boolean) => (store: MiddlewareAPI) => {
  let socket: WebSocket | null = null;
  let connected = false;
  return (next: (i: AnyAction) => void) => (action: AnyAction) => {
    const { dispatch } = store;
    const { type, payload } = action;
    const { wsInit, wsClose, onOpen, onClose, onError, onMessage } = wsActions;
    const token = isProtected ? getCookie("token") : null;
    if (type === wsInit) {
      socket = token ? new WebSocket(`${wsUrl}?token=${token}`) : new WebSocket(`${wsUrl}`);
    }
    if (socket) {
      connected = true;
      socket.onopen = (event) => {
        dispatch({ type: onOpen, payload: event });
      };

      socket.onerror = (event) => {
        dispatch({ type: onError, payload: event });
      };

      socket.onmessage = (event) => {
        const { data } = event;
        const parsedData = JSON.parse(data);
        const { success, ...restParsedData } = parsedData;
        dispatch({ type: onMessage, payload: restParsedData });
      };

      socket.onclose = (event) => {
        dispatch({ type: onClose, payload: event });
        console.log("Код закрытия сокета: ", event.code);
        if (!connected) {
          setTimeout(() => {
            dispatch({ type: wsInit });
          }, 1000);
        }
      };

      if (wsClose && type === wsClose && socket) {
        socket.close(1000, "Сокет закрыт");
        connected = false;
      }
    }

    next(action);
  };
};
