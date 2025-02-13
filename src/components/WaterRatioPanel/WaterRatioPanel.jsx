import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// import { fetchWaterToday } from '../../redux/water/waterOperations';
import { selectPercentTodayWater } from '../../redux/water/waterSelectors';

import styles from './WaterRatioPanel.module.css';
import { fetchWaterToday } from '../../redux/water/waterOperations';
import { selectDailyNorm } from '../../redux/auth/selectors';

const WaterRatioPanel = () => {
  const dispatch = useDispatch();

  let progress = useSelector(selectPercentTodayWater);
  progress = Math.min(progress, 100);

  const dailyNorm = useSelector(selectDailyNorm);

  useEffect(() => {
    // console.log('APP useEffect triggered, fetching water data...');
    dispatch(fetchWaterToday());
  }, [dispatch, dailyNorm]);

  return (
    <div className={styles.wrapper} key={progress}>
      <div className={styles.info}>
        <h3 className={styles.title}>Today</h3>
        <div className={styles.progressContainer}>
          <div className={styles.progressBar}>
            <div
              className={styles.progressFill}
              style={{ width: `${progress}%` }}
            ></div>
            <div
              className={styles.progressIndicator}
              style={{ left: `${progress}%` }}
            ></div>
            <span
              className={styles.progressNumber}
              style={{ left: `${progress}%` }}
            >
              {progress}%
            </span>
          </div>
          <div className={styles.progressLabels}>
            <span className={`${styles.label} ${styles.leftLabel}`}>0%</span>
            <span className={`${styles.label} ${styles.middleLabel}`}>50%</span>
            <span className={`${styles.label} ${styles.rightLabel}`}>100%</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WaterRatioPanel;
