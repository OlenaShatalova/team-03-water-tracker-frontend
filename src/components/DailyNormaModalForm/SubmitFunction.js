import { fetchWaterRate } from '../../redux/water/waterOperations';
import { closeModal } from '../../redux/water/waterSlice';
import { ErrorToast } from '../../utils/errorToast';
import { SuccessToast } from '../../utils/successToast';

const handleSubmit = async (values, dispatch) => {
  try {
    const dailyNorm = values.dailyNorm * 1000;
    console.log('dailyNorm:', dailyNorm);

    await dispatch(fetchWaterRate(dailyNorm)).unwrap();
    SuccessToast('Successfully set your water rate! Please, reload the page');
  } catch {
    // console.log(error.message);
    ErrorToast('Failed to set water rate. Please try again.');
  } finally {
    dispatch(closeModal('isWaterRateOpen'));
  }
};

export { handleSubmit };
