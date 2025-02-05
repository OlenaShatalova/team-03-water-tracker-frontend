import Container from '../../components/Container/Container';
import WaterConsumptionTracker from '../../components/WaterСonsumptionTracker/WaterСonsumptionTracker';
import WhyDrinkWater from '../../components/WhyDrinkWater/WhyDrinkWater';
import css from './MainPage.module.css';

const MainPage = () => {
  return (
    <main className={css.mainBackground}>
      <Container>
        <div className={css.welcomeContainer}>
          <WaterConsumptionTracker />
          <WhyDrinkWater />
        </div>
      </Container>
      ;
    </main>
  );
};

export default MainPage;
