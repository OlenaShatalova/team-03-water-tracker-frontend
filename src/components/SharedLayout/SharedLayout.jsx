import { Outlet } from "react-router-dom";

import Header from "../Header/Header";

import css from "./SharedLayout.module.css";

const SharedLayout = () => {
  return (
    <div className={css.wrap}>
      <Header />
      <Outlet />
    </div>
  );
};

export default SharedLayout;
