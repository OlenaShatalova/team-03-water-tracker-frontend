import { useDispatch, useSelector } from 'react-redux';

import AddWaterModal from '../AddWaterModal/AddWaterModal';

import { openModal } from '../../redux/water/waterSlice';
import { selectIsAddWaterModalOpen } from '../../redux/water/waterSelectors';

// import Icon from "../Icon/Icon.jsx";
import { ReactSVG } from 'react-svg';
import circlePlus from '../../assets/icons/circle-plus.svg';

import css from './AddWaterButton.module.css';

const AddWaterButton = () => {
  const dispatch = useDispatch();
  const isOpen = useSelector(selectIsAddWaterModalOpen);
  const onAddWaterButton = () => {
    dispatch(openModal('isAddWaterOpen'));
    // console.log("Modal window is opened!")
  };

  return (
    <div className={css.container}>
      <button className={css.button} onClick={onAddWaterButton}>
        <ReactSVG src={circlePlus} className={css.plusIcon} />
        Add water
      </button>
      {isOpen && <AddWaterModal />}
    </div>
  );
};

export default AddWaterButton;
