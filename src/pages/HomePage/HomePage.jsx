import { useEffect } from 'react';
import AddWaterButton from '../../components/AddWaterButton/AddWaterButton';
import DailyNorma from '../../components/DailyNorma/DailyNorma';
import MonthStatsTable from '../../components/MonthStatsTable/MonthStatsTable';
import TodayWaterList from '../../components/TodayWaterList/TodayWaterList';
import WaterRatioPanel from '../../components/WaterRatioPanel/WaterRatioPanel';
import css from './HomePage.module.css';

import { fetchWaterToday } from '../../redux/water/waterOperations';
import { useDispatch } from 'react-redux';

const HomePage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    // console.log('APP useEffect triggered, fetching water data...');
    dispatch(fetchWaterToday());
  }, [dispatch]);

  return (
    <div className={css.mainContainer}>
      <img src="" alt="" />
      <DailyNorma />
      <div className={css.ratioAndButtonContainer}>
        <WaterRatioPanel />
        <AddWaterButton />
      </div>
      <div className={css.blueContainer}>
        <TodayWaterList />
        <MonthStatsTable />
      </div>
    </div>
  );
};

export default HomePage;
