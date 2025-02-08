import React, { useEffect } from "react";
import css from "./Calendar.module.css"; // Подключение стилей (если они есть)
import CalendarItem from "../CalendarItem/CalendarItem";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentDate, selectWaterPerMonth, selectWaterRateNumber } from "../../../redux/water/waterSelectors";
import { fetchWaterPerMonth } from "../../../redux/water/waterOperations";
import { setActiveDay } from "../../../redux/water/waterSlice";
import DaysGeneralStats from "../../DaysGeneralStats/DaysGeneralStats";
import { selectUser } from "../../../redux/auth/selectors";
import { use } from "react";




const daysInMonth = (month, year) => {
    return new Date(year, month + 1, 0).getDate();
};

const Calendar = ({openModal}) => {
    const dispatch = useDispatch();
    const currentDate = useSelector(selectCurrentDate);
    const dateObj = new Date(currentDate)
    const month = dateObj.getMonth();
    const year = dateObj.getFullYear();


    const user = useSelector(selectUser);
    console.log(user)
    const waterRate = useSelector(selectWaterRateNumber);
    const waterPerMonth = useSelector(selectWaterPerMonth);

    const activeDay = useSelector(state => state.water.activeDay)




    const calculateFeasibility = (dayData) => {
        if (!dayData?.length) return 0;

        const totalValue = dayData.reduce((sum, record) => sum + (record.waterValue || 0), 0);
        const userWaterRate = Number(user.dailyNorm) * 1000;

        return totalValue >= userWaterRate ? 100 : Math.round((totalValue / userWaterRate) * 100);
    };
    const handleDayClick = (day) => {
        const formattedDay = `${String(day).padStart(2, '0')}.${String(month + 1).padStart(2, '0')}.${year}`;
        openModal();
        dispatch(setActiveDay(formattedDay));
        dispatch(fetchWaterPerDay(formattedDay));
    };
    const arrayOfDays = Array.from({ length: daysInMonth(month, year) }, (_, index) => index + 1);
    useEffect(() => {
        const date = new Date(currentDate);
        const formattedDate = {
            month: String(date.getMonth() + 1).padStart(2, '0'),
            year: String(date.getFullYear()),
        };

        console.log(formattedDate); // { month: "02", year: "2024" }
        dispatch(fetchWaterPerMonth({ month: formattedDate.month, year: formattedDate.year }));

    }, [dispatch, currentDate]);


    return (
        <div>
            <ul className={css.list}>
                {arrayOfDays.map((day) => {
                    const dayKey = `${String(day).padStart(2, '0')}.${String(month + 1).padStart(2, '0')}.${year}`;
                    const dayData = waterPerMonth[dayKey] || [];
                    const feasibility = calculateFeasibility(dayData);

                    return (
                        <li className={css.item} key={day}>
                            <CalendarItem
                                day={day}
                                waterData={dayData}
                                feasibility={feasibility}
                                onClick={() => handleDayClick(day)}
                                isActive={day === activeDay}
                            />

                        </li>

                    );
                })}
            </ul>
            {/* Отображение компонента с деталями для активного дня */}


        </div>



    );
};

export default Calendar;
