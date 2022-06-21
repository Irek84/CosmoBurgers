import { FC } from "react";
import styles from "./modal-overlay.module.css";

type TModalProps = {
  onClose: (e: React.MouseEvent<HTMLElement>|KeyboardEvent) => void;
}

const ModalOverlay: FC<TModalProps>  = (props) => {
  return <div className={styles.modalOverlay} onClick={props.onClose} />;
};

export default ModalOverlay;