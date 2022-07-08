import { PayloadAction } from '@reduxjs/toolkit';
import { TWsOrders } from '../types';
import {
	WS_CONNECTION_START,
	WS_CONNECTION_CLOSE,
	WS_CONNECTION_SUCCESS,
	WS_CONNECTION_ERROR,
	WS_CONNECTION_CLOSED,
	WS_GET_MESSAGE
} from '../constants/ws-actions';


export const wsActions = {
	wsInit: WS_CONNECTION_START,
	wsClose: WS_CONNECTION_CLOSE,
	onOpen: WS_CONNECTION_SUCCESS,
	onClose: WS_CONNECTION_CLOSED,
	onError: WS_CONNECTION_ERROR,
	onMessage: WS_GET_MESSAGE
};

/***/
export interface IWsConnectionStartAction {
	readonly type: typeof WS_CONNECTION_START;
}

export interface IWsConnectionCloseAction {
	readonly type: typeof WS_CONNECTION_CLOSE;
}

export interface IWsConnectionSuccessAction {
	readonly type: typeof WS_CONNECTION_SUCCESS;
	payload: PayloadAction
}

export interface IWsConnectionErrorAction {
	readonly type: typeof WS_CONNECTION_ERROR;
	payload: PayloadAction
}

export interface IWsConnectionClosedAction {
	readonly type: typeof WS_CONNECTION_CLOSED;
	payload: PayloadAction
}

export interface IWsGetMessageAction {
	readonly type: typeof WS_GET_MESSAGE;
	payload: TWsOrders
}

export type TWSActionsActions =
	| IWsConnectionStartAction
	| IWsConnectionCloseAction
	| IWsConnectionSuccessAction
	| IWsConnectionErrorAction
	| IWsConnectionClosedAction
	| IWsGetMessageAction;