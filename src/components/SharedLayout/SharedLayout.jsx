import { Outlet } from 'react-router-dom';

import Header from '../Header/Header';
import ThemeBtn from '../ThemeBtn/ThemeBtn';
import { Toaster } from 'react-hot-toast';

const SharedLayout = () => {
  return (
    <>
      <Toaster />
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
