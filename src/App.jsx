import { lazy, Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import RestrictedRoute from './components/RestrictedRoute';
import PrivateRoute from './components/PrivateRoute';

import SharedLayout from './components/SharedLayout/SharedLayout';
//import { useDispatch, useSelector } from 'react-redux';
//import { selectIsRefreshing } from './redux/auth/selectors';
//import { refreshUser } from './redux/auth/operations';

const MainPage = lazy(() => import('./pages/MainPage/MainPage'));
const SignupPage = lazy(() => import('./pages/SignupPage/SignupPage'));
const SigninPage = lazy(() => import('./pages/SigninPage/SigninPage'));
const HomePage = lazy(() => import('./pages/HomePage/HomePage'));

// import MainPage from "./pages/MainPage/MainPage";
// import SignupPage from './pages/SignupPage/SignupPage';
// import SigninPage from './pages/SigninPage/SigninPage';
// import HomePage from './pages/HomePage/HomePage';

const App = () => {
  // const dispatch = useDispatch();
  // const isRefreshing = useSelector(selectIsRefreshing);

  // useEffect(() => {
  //   dispatch(refreshUser());
  // }, [dispatch]);

  return (
    //isRefreshing ?
    //  <p>Refreshing...</p>
    // ) : (
    <Routes>
      <Route path="/" element={<SharedLayout />}>
        <Route index element={<Navigate to="/welcome" />} />
        <Route
          path="welcome"
          element={
            <Suspense fallback={<div>Add LOADER...</div>}>
              <MainPage />
            </Suspense>
          }
        />
        <Route
          path="signup"
          element={
            <Suspense fallback={<div>Add LOADER...</div>}>
              <RestrictedRoute redirectTo="/home" component={<SignupPage />} />
            </Suspense>
          }
        />
        <Route
          path="signin"
          element={
            <Suspense fallback={<div>Add LOADER...</div>}>
              <RestrictedRoute redirectTo="/home" component={<SigninPage />} />
            </Suspense>
          }
        />
        <Route
          path="home"
          element={
            <Suspense fallback={<div>Add LOADER...</div>}>
              <PrivateRoute redirectTo="/signin" component={<HomePage />} />
            </Suspense>
          }
        />
      </Route>
    </Routes>
  );
};

export default App;
