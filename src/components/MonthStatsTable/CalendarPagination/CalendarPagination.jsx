import { useSelector } from "react-redux";
import css from "./CalendarPagination.module.css"

const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
];


const CalendarPagination = () => {
    // const dispatch = useDispatch();
    const currentDate = useSelector(state => state.water.currentDate);

    const goToPreviousMonth = () => {
    }

    const goToNextMonth = () => {
    }

    return (
        <div className={css.container}>
            <button className={css.button} type="button" onClick={goToPreviousMonth}>

            </button>
            <p>{months[currentDate.getMonth()]}, {currentDate.getFullYear()}</p>

        </div>
    )

    export default CalendarPagination;