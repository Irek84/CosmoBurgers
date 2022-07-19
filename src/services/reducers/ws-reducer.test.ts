import { wsReducer, initialState } from "./ws-reducer";
import { WS_CONNECTION_SUCCESS, WS_CONNECTION_ERROR, WS_CONNECTION_CLOSED, WS_GET_MESSAGE } from "../constants/ws-actions";
import { TWSActionsActions } from "../actions/ws-actions";
import { PayloadAction } from "@reduxjs/toolkit";
import { TWsOrders } from "../types";

describe("wsReducer", () => {
  it("should return the initial state", () => {
    expect(wsReducer(undefined, {} as TWSActionsActions)).toEqual(initialState);
  });
  it("should handle WS_CONNECTION_SUCCESS", () => {
    const state = {
      ...initialState,
      wsConnected: true,
    };
    expect(
      wsReducer(undefined, {
        type: WS_CONNECTION_SUCCESS,
        payload: {} as PayloadAction,
      })
    ).toEqual(state);
  });
  it("should handle WS_CONNECTION_ERROR", () => {
    const state = {
      ...initialState,
      error: {} as PayloadAction,
      wsConnected: false,
    };
    expect(
      wsReducer(undefined, {
        type: WS_CONNECTION_ERROR,
        payload: {} as PayloadAction,
      })
    ).toEqual(state);
  });
  it("should handle WS_CONNECTION_CLOSED", () => {
    const state = {
      ...initialState,
      wsConnected: false,
    };
    expect(
      wsReducer(undefined, {
        type: WS_CONNECTION_CLOSED,
        payload: {} as PayloadAction,
      })
    ).toEqual(state);
  });
  it("should handle WS_GET_MESSAGE", () => {
    const state = {
      ...initialState,
      orders: undefined,
      total: undefined,
      totalToday: undefined,
    };
    expect(
      wsReducer(undefined, {
        type: WS_GET_MESSAGE,
        payload: {} as TWsOrders,
      })
    ).toEqual(state);
  });
});
