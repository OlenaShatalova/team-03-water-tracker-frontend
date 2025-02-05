import { Outlet } from 'react-router-dom';

import Header from '../Header/Header';
import ThemeBtn from '../ThemeBtn/ThemeBtn';

const SharedLayout = () => {
  return (
    <>
      <Header />
      <div
        style={{ position: 'fixed', top: '20px', right: '20px', zIndex: 1000 }}
      >
        <ThemeBtn />
      </div>
      <Outlet />
    </>
  );
};

export default SharedLayout;
