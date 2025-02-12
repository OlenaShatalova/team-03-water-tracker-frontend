import css from './DaysGeneralStats.module.css';

const formatLiters = value => {
  return `${(value / 1000).toFixed(1)} L`;
};

const modalPosition = day => {
  const screenWidth = window.innerWidth;

  let x;
  let y;

  const column = (day - 1) % 10 < 5 ? 'left' : 'right';
  const row = Math.ceil(+day / 10);

  if (screenWidth <= 767) {
    x = -8;
    y = -200 + 66 * (Math.ceil(+day / 5) - 1); ///  READY
  } else if (screenWidth >= 768 && screenWidth < 1439) {
    if (column === 'left') {
      if (row === 1) {
        x = 18 + (day - 1) * 68; // Для першого ряду починаємо з 15
      } else if (row === 2) {
        x = 18 + (day - 11) * 68; // Для другого ряду починаємо з 15
      } else if (row === 3) {
        x = 18 + (day - 21) * 68; // Для третього ряду починаємо з 15
      } else if (row === 4) {
        x = 18 + (day - 31) * 68; // Для четвертого ряду починаємо з 15
      }

      y = -193 + (row - 1) * 75;
    } else {
      if (row === 1) {
        x = -269 + (day - 1) * 68; // Для першого ряду починаємо з 15
      } else if (row === 2) {
        x = -269 + (day - 11) * 68; // Для другого ряду починаємо з 15
      } else if (row === 3) {
        x = -269 + (day - 21) * 68; // Для третього ряду починаємо з 15
      } else if (row === 4) {
        x = -269 + (day - 31) * 68; // Для четвертого ряду починаємо з 15
      }
      y = -193 + (row - 1) * 75; // Зміщення по вертикалі для правої колонки
    }
  } else {
    if (row === 1) {
      x = -270 + (day - 1) * 56; // Для першого ряду починаємо з 15
    } else if (row === 2) {
      x = -270 + (day - 11) * 56; // Для другого ряду починаємо з 15
    } else if (row === 3) {
      x = -270 + (day - 21) * 56; // Для третього ряду починаємо з 15
    } else if (row === 4) {
      x = -270 + (day - 31) * 56; // Для четвертого ряду починаємо з 15
    }

    y = -193 + (row - 1) * 76; // Зміщення по вертикалі
  }
  //  зміщення по горизонталі 56px
  // зміщення по вертикалі 76px
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
