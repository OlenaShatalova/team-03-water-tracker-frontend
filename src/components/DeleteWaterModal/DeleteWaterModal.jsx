import Modal from 'react-modal';
import { useDispatch } from 'react-redux';
import { deleteWater } from "../../redux/today/operations";
import css from "./DeleteWaterModal.module.css"

import { ReactSVG } from 'react-svg';
import closes from '../../assets/icons/closes.svg';

const DeleteWaterModal = ({ isOpen, onRequestClose, _id }) => {
    const dispatch = useDispatch();

    const handleDelete = () => {
        dispatch(deleteWater(_id));
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
                        <ReactSVG src={closes}
                        onClick={onRequestClose}/>
                   </button>
                </div>
                
            <p className={css.text}>Are you sure you want to delete entry?</p>
            </div>
            <div className={css.btnsWrapper}>
            <button className={css.deleteBtn} onClick={handleDelete}>Delete</button>
            <button className={css.cancelBtn} onClick={onRequestClose}>Cancel</button>
            </div>
            
            
        </Modal>  
    )

}

export default DeleteWaterModal