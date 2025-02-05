import DailyNorma from "../../components/DailyNorma/DailyNorma";
import MonthStatsTable from "../../components/MonthStatsTable/MonthStatsTable";
import TodayWaterList from "../../components/TodayWaterList/TodayWaterList";
import WaterRatioPanel from "../../components/WaterRatioPanel/WaterRatioPanel";
import css from "./HomePage.module.css"


const HomePage = () => {
  return (
    <div className={css.mainContainer}>
      <img src="" alt="" />
      <DailyNorma />
      <WaterRatioPanel />
      <div className={css.blueContainer}>
        <TodayWaterList />
        <MonthStatsTable />
      </div>
    </div>
  )
};

export default HomePage;
