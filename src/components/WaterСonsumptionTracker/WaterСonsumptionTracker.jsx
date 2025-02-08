import { useNavigate } from 'react-router-dom';
import css from './WaterConsumptionTracker.module.css';
import Icon from '../Icon/Icon.jsx';
import { useEffect, useState } from 'react';

const WaterConsumptionTracker = () => {
  const navigate = useNavigate();

  const [iconSize, setIconSize] = useState(window.innerWidth <= 320 ? 32 : 40);

  useEffect(() => {
    const handleResize = () => {
      setIconSize(window.innerWidth <= 320 ? 32 : 40);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

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
            <Icon
              name="icon-calendar"
              width={iconSize}
              height={iconSize}
              color="black"
              className={css.waterIcon}
            />
            <span>Habit drive</span>
          </li>
          <li className={css.benefitsItem}>
            <Icon
              name="icon-statistic"
              width={iconSize}
              height={iconSize}
              color="black"
              className={css.waterIcon}
            />
            <span>View statistics</span>
          </li>
          <li className={css.benefitsItem}>
            <Icon
              name="icon-key"
              width={iconSize}
              height={iconSize}
              color="black"
              className={css.waterIcon}
            />
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
