import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './WaterRatioPanel.module.css';
import { fetchWaterToday } from '../../redux/water/waterOperations';
import { selectPercentTodayWater } from '../../redux/water/waterSelectors';

const WaterRatioPanel = () => {
  const dispatch = useDispatch();

  const progress = useSelector(selectPercentTodayWater);

  console.log('Component progress (from Redux):', progress);

  useEffect(() => {
    console.log('useEffect triggered, fetching water data...');
    dispatch(fetchWaterToday());
  }, [dispatch]);

  useEffect(() => {
    console.log('Redux updated, component should re-render.');
  }, [progress]);

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
          </div>
          <div className={styles.progressLabels}>
            <span
              className={`${styles.label} ${styles.leftLabel} ${
                progress < 25 ? styles.active : ''
              }`}
            >
              0%
            </span>
            <span
              className={`${styles.label} ${styles.middleLabel} ${
                progress >= 25 && progress <= 75 ? styles.active : ''
              }`}
            >
              50%
            </span>
            <span
              className={`${styles.label} ${styles.rightLabel} ${
                progress > 75 ? styles.active : ''
              }`}
            >
              100%
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WaterRatioPanel;
