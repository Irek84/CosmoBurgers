import { modalReducer, initialState } from "./modal";
import { OPEN_MODAL, CLOSE_MODAL } from "../constants/modal";
import { TModalActions } from "../actions/modal";

describe("modal reducer", () => {
  it("should return the initial state", () => {
    expect(modalReducer(undefined, {} as TModalActions)).toEqual(initialState);
  });
  it("should handle OPEN_MODAL", () => {
    const state = {
      ...initialState,
      modalTitle: "Заголовок",
      modalContent: null as any,
      isModalVisible: true,
    };
    expect(
      modalReducer(undefined, {
        type: OPEN_MODAL,
        modalTitle: "Заголовок",
        modalContent: null as any,
      })
    ).toEqual(state);
  });
  it("should handle CLOSE_MODAL", () => {
    const state = {
      ...initialState,
      isModalVisible: false,
    };
    expect(modalReducer(undefined, { type: CLOSE_MODAL })).toEqual(state);
  });
});
