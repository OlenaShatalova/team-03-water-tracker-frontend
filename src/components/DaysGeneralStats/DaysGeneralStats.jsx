import css from './DaysGeneralStats.module.css';

const DaysGeneralStats = ({ date, dailyNorm, percent, portions }) => {
  return (
    <div className={css.container}>
      <div className={css.title}>
        <p className={css.statsData}>{date}</p>
      </div>

      <div className={css.title}>
        <p>Daily norma:</p>
        <p className={css.statsData}>{dailyNorm} L</p>
      </div>

      <div className={css.title}>
        <p>Fulfillment of the daily norm:</p>
        <p className={css.statsData}>{percent}%</p>
      </div>

      <div className={css.title}>
        <p>How many servings of water:</p>
        <p className={css.statsData}>{portions}</p>
      </div>
    </div>
  );
};

export default DaysGeneralStats;
