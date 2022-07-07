import { PayloadAction } from '@reduxjs/toolkit';
import { TWsOrders } from '../types';
import {
	WS_CONNECTION_START_AUTH,
	WS_CONNECTION_CLOSE_AUTH,
	WS_CONNECTION_SUCCESS_AUTH,
	WS_CONNECTION_ERROR_AUTH,
	WS_CONNECTION_CLOSED_AUTH,
	WS_GET_MESSAGE_AUTH
} from '../constants/ws-auth-actions';

export const wsAuthActions = {
	wsInit: WS_CONNECTION_START_AUTH,
	wsClose: WS_CONNECTION_CLOSE_AUTH,
	onOpen: WS_CONNECTION_SUCCESS_AUTH,
	onClose: WS_CONNECTION_CLOSED_AUTH,
	onError: WS_CONNECTION_ERROR_AUTH,
	onMessage: WS_GET_MESSAGE_AUTH
};

/***/
export interface IWsConnectionStartAuthAction {
	readonly type: typeof WS_CONNECTION_START_AUTH;
}

export interface IWsConnectionCloseAuthAction {
	readonly type: typeof WS_CONNECTION_CLOSE_AUTH;
}

export interface IWsConnectionSuccessAuthAction {
	readonly type: typeof WS_CONNECTION_SUCCESS_AUTH;
	payload: PayloadAction
}

export interface IWsConnectionErrorAuthAction {
	readonly type: typeof WS_CONNECTION_ERROR_AUTH;
	payload: PayloadAction
}

export interface IWsConnectionClosedAuthAction {
	readonly type: typeof WS_CONNECTION_CLOSED_AUTH;
	payload: PayloadAction
}

export interface IWsGetMessageAuthAction {
	readonly type: typeof WS_GET_MESSAGE_AUTH;
	payload: TWsOrders
}

export type TWSActionsAuthActions =
	| IWsConnectionStartAuthAction
	| IWsConnectionCloseAuthAction
	| IWsConnectionSuccessAuthAction
	| IWsConnectionErrorAuthAction
	| IWsConnectionClosedAuthAction
	| IWsGetMessageAuthAction;