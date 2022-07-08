import { OPEN_MODAL, CLOSE_MODAL } from "../constants/modal";

export interface IOpenModalAction {
  readonly type: typeof OPEN_MODAL;
  readonly modalTitle: string;
  readonly modalContent: JSX.Element;
}
export interface ICloseModalAction {
  readonly type: typeof CLOSE_MODAL;
}

export type TModalActions = IOpenModalAction | ICloseModalAction;
