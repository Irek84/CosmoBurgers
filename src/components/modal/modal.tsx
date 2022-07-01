import { useEffect, FC, ReactNode } from "react";
import ReactDOM from "react-dom";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import ModalOverlay from "../modal-overlay/modal-overlay";
import styles from "./modal.module.css";

const modalRoot = document.getElementById("react-modals") as HTMLFormElement;
type TModalProps = {
  title?: string | null;
  onClose: (e: React.MouseEvent<HTMLElement>|KeyboardEvent) => void;
  children: ReactNode;
}
const Modal: FC<TModalProps> = (props) => {
  const closeModalEsc = (e: KeyboardEvent) => {
    if (e.key === "Escape") props.onClose(e);
  };

  useEffect(() => {
    window.addEventListener("keydown", closeModalEsc);
    return () => {
      window.removeEventListener("keydown", closeModalEsc);
    };
  });

  return ReactDOM.createPortal(
    <>
      <div className={styles.modal}>
        <div className={styles.modalHeader}>
          <h1 className="mt-10 pt-3 ml-10 text text_type_main-large">
            {props.title}
          </h1>
          <div className={styles.closeButton} onClick={props.onClose}>
            <CloseIcon type="primary" />
          </div>
        </div>

        <div className={`${styles.modalContent} text text_type_main-default`}>
          {props.children}
        </div>
      </div>
      <ModalOverlay onClose={props.onClose} />
    </>,
    modalRoot
  );
};

export default Modal;
