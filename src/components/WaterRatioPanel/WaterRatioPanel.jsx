import styles from './WaterRatioPanel.module.css';

const WaterRatioPanel = () => {
  const progress = 50;

  return (
    <div className={styles.wrapper}>
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
                progress >= 0 && progress < 25 ? styles.active : ''
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
