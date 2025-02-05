import React, { useEffect } from "react";
import css from "./Calendar.module.css"; // Подключение стилей (если они есть)
import CalendarItem from "../CalendarItem/CalendarItem";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentDate } from "../../../redux/water/waterSelectors";


const daysInMonth = (month, year) => {
    return new Date(year, month + 1, 0).getDate();
};

const Calendar = () => {
    const dispatch = useDispatch();
    const currentDate = useSelector(selectCurrentDate);
    const dateObj = new Date(currentDate)
    const month = dateObj.getMonth();
    const year = dateObj.getFullYear();

    
    const arrayOfDays = Array.from({ length: daysInMonth(month, year) }, (_, index) => index + 1);
    useEffect(() => {
        const localDate = new Date(currentDate).toLocaleDateString();
        // dispatch(fetchWaterPerMonth(localDate));
    }, [dispatch, currentDate]);



    return (
        <ul className={css.list}>
            {arrayOfDays.map((day) => (
                <li className={css.item} key={day}>{day}
                    {/* <CalendarItem
                        key={day}
                        day={day}
                        waterData={dayData}
                        feasibility={feasibility}
                        onClick={() => handleDayClick(day)}
                        isActive={day === activeDay}
                    /> */}
                </li>
            ))}
        </ul>
    );
};

export default Calendar;
