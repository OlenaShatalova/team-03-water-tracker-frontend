import css from './WhyDrinkWater.module.css';

const WhyDrinkWater = () => {
  return (
    <div className={css.whyDrinkContainer}>
      <h3 className={css.whyDrinkTitle}>Why drink water</h3>
      <ul className={css.whyDrinkList}>
        <li className={css.whyDrinkItem}>Supply of nutrients to all organs</li>
        <li className={css.whyDrinkItem}>Providing oxygen to the lungs</li>
        <li className={css.whyDrinkItem}>Maintaining the work of the heart</li>
        <li className={css.whyDrinkItem}>Release of processed substances</li>
        <li className={css.whyDrinkItem}>
          Ensuring the stability of the internal environment
        </li>
        <li className={css.whyDrinkItem}>
          Maintaining within the normal temperature
        </li>
        <li className={css.whyDrinkItem}>
          Maintaining an immune system capable of resisting disease
        </li>
      </ul>
    </div>
  );
};

export default WhyDrinkWater;
