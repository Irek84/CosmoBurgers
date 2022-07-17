import { OPEN_MODAL, CLOSE_MODAL } from "../constants/modal";
import { TModalActions } from "../actions/modal";

export type TModalState = {
  isModalVisible: boolean;
  modalTitle: null | string;
  modalContent: null | JSX.Element;
};

export const initialState: TModalState = {
  isModalVisible: false,
  modalTitle: null,
  modalContent: null,
};

export const modalReducer = (state = initialState, action: TModalActions): TModalState => {
  switch (action.type) {
    case OPEN_MODAL: {
      return {
        isModalVisible: true,
        modalTitle: action.modalTitle,
        modalContent: action.modalContent,
      };
    }
    case CLOSE_MODAL: {
      return {
        isModalVisible: false,
        modalTitle: null,
        modalContent: null,
      };
    }

    default: {
      return state;
    }
  }
};
