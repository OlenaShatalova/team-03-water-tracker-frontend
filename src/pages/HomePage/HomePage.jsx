import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import DailyNorma from '../../components/DailyNorma/DailyNorma';
import WaterRatioPanel from '../../components/WaterRatioPanel/WaterRatioPanel';
import AddWaterButton from '../../components/AddWaterButton/AddWaterButton';
import TodayWaterList from '../../components/TodayWaterList/TodayWaterList';
import MonthStatsTable from '../../components/MonthStatsTable/MonthStatsTable';

import {
  fetchWaterPerMonth,
  fetchWaterToday,
} from '../../redux/water/waterOperations';

import { selectDailyNorm } from '../../redux/auth/selectors';

import css from './HomePage.module.css';
import LoaderFallback from '../../components/LoaderFallback/LoaderFallback';

const HomePage = () => {
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();

  const dailyNorm = useSelector(selectDailyNorm);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(fetchWaterToday());
        await dispatch(fetchWaterPerMonth());
      } catch (error) {
        console.error('Error fetching water data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [dispatch, dailyNorm]);

  return (
    <div className={css.containerCenter}>
      <div className={css.mainContainer}>
        {loading ? (
          <LoaderFallback />
        ) : (
          <>
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
          </>
        )}
      </div>
    </div>
  );
};

export default HomePage;
