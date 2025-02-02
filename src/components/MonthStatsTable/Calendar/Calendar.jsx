import React from "react";
import css from "./Calendar.module.css"; // Подключение стилей (если они есть)

const daysInMonth = (month, year) => {
    return new Date(year, month + 1, 0).getDate();
};

const Calendar = () => {
    const today = new Date();
    const month = today.getMonth(); // current month (0-11)
    const year = today.getFullYear(); // current year 

    const arrayOfDays = Array.from({ length: daysInMonth(month, year) }, (_, index) => index + 1);

    return (
        <ul className={css.list}>
            {arrayOfDays.map((day) => (
                <li className={css.item} key={day}>{day}</li>
            ))}
        </ul>
    );
};

export default Calendar;
