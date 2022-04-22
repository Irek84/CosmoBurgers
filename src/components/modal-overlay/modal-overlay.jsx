import styles from './modal-overlay.module.css'

const ModalOverlay = (props) => {
	return (
		<div className={styles.modal_overlay} onClick={props.onClose}/>
	)
}

export default ModalOverlay; 