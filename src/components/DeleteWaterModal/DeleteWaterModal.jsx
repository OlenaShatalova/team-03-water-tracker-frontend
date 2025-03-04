import { useDispatch } from 'react-redux';
import Modal from 'react-modal';
import { useEffect } from 'react';
import { ReactSVG } from 'react-svg';

import css from './DeleteWaterModal.module.css';
import close from '../../assets/icons/close.svg';
import { deleteWater } from '../../redux/water/waterOperations';

Modal.setAppElement('#root'); // Додаємо цей рядок

const DeleteWaterModal = ({ isOpen, onRequestClose, id }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  const handleDelete = () => {
    dispatch(deleteWater(id));
    onRequestClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Delete Entry"
      className={css.modalContent}
      overlayClassName={css.modalOverlay}
    >
      <div>
        <div className={css.deleteHeaderWrapper}>
          <h2 className={css.deleteHeader}>Delete entry</h2>
          <button className={css.closeBtn} onClick={onRequestClose}>
            <ReactSVG
              src={close}
              onClick={onRequestClose}
              className={css.closeIcon}
            />
          </button>
        </div>

        <p className={css.text}>Are you sure you want to delete entry?</p>
      </div>
      <div className={css.btnsWrapper}>
        <button className={css.deleteBtn} onClick={handleDelete}>
          Delete
        </button>
        <button className={css.cancelBtn} onClick={onRequestClose}>
          Cancel
        </button>
      </div>
    </Modal>
  );
};

export default DeleteWaterModal;
