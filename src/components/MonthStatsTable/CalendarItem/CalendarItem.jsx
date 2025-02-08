import { useDispatch } from 'react-redux';
import { setActiveDay } from '../../../redux/water/waterSlice';
import css from './CalendarItem.module.css'

const CalendarItem = ({ feasibility = 0, day, isActive, onClick }) => {
    const containerStyle = {
        backgroundColor: isActive ? '#323f47' : (feasibility < 100 ? '#fff' : '#FFFFFF'),
        color: isActive ? '#9be1a0' : '#000000',
        border: feasibility < 100 ? '1px solid #ff9d43' : 'none'
    };
const dispatch = useDispatch();


    const handleClick = () => {
        dispatch(setActiveDay(day));
        onClick();
    };

    return (
        <div className={css.container}>
            <button className={css.button} style={containerStyle} onClick={handleClick}>{day}</button>
            <p className={css.text}>{feasibility}%</p>
        </div>
    );
}

export default CalendarItem