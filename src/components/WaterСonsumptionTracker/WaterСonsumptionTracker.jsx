import { useNavigate } from 'react-router-dom';
import css from './WaterConsumptionTracker.module.css';

const WaterConsumptionTracker = () => {
  const navigate = useNavigate();

  const handleTryTrackerClick = () => {
    navigate('/signup');
  };
  return (
    <div className={css.waterTrackerContainer}>
      <h2 className={css.waterTrackerTitle}>Water consumption tracker</h2>
      <p className={css.waterTrackerSubtitle}>
        Record daily water intake and track
      </p>
      <div className={css.benefitsBox}>
        <h3 className={css.benefitsTitle}>Tracker Benefits</h3>
        <ul className={css.benefitsList}>
          <li className={css.benefitsItem}>
            <span aria-hidden="true">іконка</span>
            <span>Habit drive</span>
          </li>
          <li className={css.benefitsItem}>
            <span aria-hidden="true">іконка</span>
            <span>View statistics</span>
          </li>
          <li className={css.benefitsItem}>
            <span aria-hidden="true">іконка</span>
            <span>Personal rate setting</span>
          </li>
        </ul>
      </div>
      <button className={css.tryTrackerBtn} onClick={handleTryTrackerClick}>
        Try tracker
      </button>
    </div>
  );
};

export default WaterConsumptionTracker;
