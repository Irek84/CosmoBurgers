import { useEffect } from "react";
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import ModalOverlay from "../modal-overlay/modal-overlay";
import styles from "./modal.module.css";
import { useDispatch } from 'react-redux';
import { CLOSE_MODAL } from '../../services/actions/modal';

const modalRoot = document.getElementById("react-modals");

const Modal = (props) => {
  const dispatch = useDispatch();

  const closeModal = () => {
		dispatch({
			type: CLOSE_MODAL
		})
	}

  const closeModalEsc= (e) => {
    if (e.key === "Escape")
		  closeModal()
	}

  useEffect(() => {
		window.addEventListener('keydown', closeModalEsc)
		return () => {
			window.removeEventListener('keydown', closeModalEsc)
		}
	})

    return ReactDOM.createPortal(
      <>
        <div className={styles.modal}>
          <div className={styles.modalHeader}>
            <h1 className="mt-10 pt-3 ml-10 text text_type_main-large">{props.title}</h1>
            <div className={styles.closeButton} onClick={closeModal}>
              <CloseIcon type="primary" />
            </div>
          </div>
          
          <div className={`${styles.modalContent} text text_type_main-default`}>
            {props.children}
          </div>
          
        </div>
        <ModalOverlay onClose={closeModal} />
      </>,
      modalRoot
    );
}

export default Modal;

Modal.propTypes = {
  title: PropTypes.string
};