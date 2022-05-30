import PropTypes from "prop-types";
import styles from "./modal-overlay.module.css";

const ModalOverlay = (props) => {
  return <div className={styles.modalOverlay} onClick={props.onClose} />;
};

export default ModalOverlay;

ModalOverlay.propTypes = {
  onClose: PropTypes.func.isRequired,
};
