import css from './DaysGeneralStats.module.css';

const formatLiters = value => {
  return `${(value / 1000).toFixed(1)} L`;
};

const modalPosition = day => {
  const screenWidth = window.innerWidth;

  let x;
  let y;
  const column = (day - 1) % 10 < 5 ? 'left' : 'right';

  if (screenWidth <= 767) {
    x = -8;
    y = -200 + 66 * (Math.ceil(+day / 5) - 1);
  } else if (screenWidth >= 768 && screenWidth < 1439) {
    x = column === 'left' ? -3 : 363;
    y = -190 + 78 * (Math.ceil(+day / 10) - 1);
  } else {
    x = column === 'left' ? -49 : 299;
    y = -191 + 76 * (Math.ceil(+day / 10) - 1);
  }

  return {
    transform: `translate(${x}px, ${y}px)`,
  };
};

const DaysGeneralStats = ({ date, dailyNorm, percent, portions }) => {
  const formatDate = dateString => {
    const [day, month, year] = dateString.split('.');
    const date = new Date(`${year}-${month}-${day}`);

    const dayNumber = date.getDate();
    const monthName = date.toLocaleString('en-US', { month: 'long' });

    return `${dayNumber}, ${monthName}`;
  };

  const [dayNumber] = date.split('.');
  return (
    <div className={css.container} style={modalPosition(dayNumber)}>
      <div className={css.date}>
        <p>{formatDate(date)}</p>
      </div>

      <div className={css.stats}>
        <p>Daily norma:</p>
        <p className={css.statsData}>{formatLiters(dailyNorm)} </p>
      </div>

      <div className={css.stats}>
        <p>Fulfillment of the daily norm:</p>
        <p className={css.statsData}>{percent}</p>
      </div>

      <div className={css.stats}>
        <p>How many servings of water:</p>
        <p className={css.statsData}>{portions}</p>
      </div>
    </div>
  );
};

export default DaysGeneralStats;
