import Calendar from "./Calendar/Calendar"
import CalendarPagination from "./CalendarPagination/CalendarPagination"
import css from "./MonthStatsTable.module.css"

const MonthStatsTable = () => {
    return (
        <div>
            <div className={css.container}>
                <h2 className={css.title}>Month</h2>
                <CalendarPagination />
            </div>
            <>
                <Calendar />
            </>
        </div>

    )
}

export default MonthStatsTable