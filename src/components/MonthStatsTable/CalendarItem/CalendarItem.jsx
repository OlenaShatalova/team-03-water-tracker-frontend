

const CalendarItem = ({ feasibility = 0, day, isActive, onClick }) => {
    const containerStyle = {
        backgroundColor: isActive ? '#323f47' : (feasibility < 100 ? 'rgba(50, 63, 71, 0.2)' : '#FFFFFF'),
        color: isActive ? '#9be1a0' : '#000000'
    };

    return (
        <div className={css.container}>
            <button className={css.button} style={containerStyle} onClick={handleClick}>{day}</button>
            <p className={css.text}>{feasibility}%</p>
        </div>
    );
}

export default CalendarItem