import Calendar from './Calendar/Calendar';
import CalendarPagination from './CalendarPagination/CalendarPagination';
import css from './MonthStatsTable.module.css';
import DaysGeneralStats from '../DaysGeneralStats/DaysGeneralStats';

const MonthStatsTable = () => {
  return (
    <div>
      <div className={css.container}>
        <h2 className={css.title}>Month</h2>
        <CalendarPagination />
      </div>
      <DaysGeneralStats
        date="5 April"
        dailyNorm="1.5"
        percent="60"
        portions="6"
      />
      <>
        <Calendar />
      </>
    </div>
  );
};

export default MonthStatsTable;
