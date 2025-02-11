import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { fetchWaterToday } from '../../redux/water/waterOperations';

import { selectDailyNorm } from '../../redux/auth/selectors';

import AddWaterButton from '../../components/AddWaterButton/AddWaterButton';
import DailyNorma from '../../components/DailyNorma/DailyNorma';
import MonthStatsTable from '../../components/MonthStatsTable/MonthStatsTable';
import TodayWaterList from '../../components/TodayWaterList/TodayWaterList';
import WaterRatioPanel from '../../components/WaterRatioPanel/WaterRatioPanel';

import css from './HomePage.module.css';

const HomePage = () => {
  const dispatch = useDispatch();

  const dailyNorm = useSelector(selectDailyNorm);

  useEffect(() => {
    // console.log('APP useEffect triggered, fetching water data...');
    dispatch(fetchWaterToday());
  }, [dispatch, dailyNorm]);

  return (
    <div className={css.containerCenter}>
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
    </div>
  );
};

export default HomePage;
