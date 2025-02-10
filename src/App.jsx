import { lazy, Suspense, useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { refreshUser } from './redux/auth/operations';
import { selectIsRefreshing } from './redux/auth/selectors';

import RestrictedRoute from './components/RestrictedRoute';
import PrivateRoute from './components/PrivateRoute';

import SharedLayout from './components/SharedLayout/SharedLayout';
import LoaderFallback from './components/LoaderFallback/LoaderFallback';
import { Loader } from './components/Loader/Loader';

const MainPage = lazy(() => import('./pages/MainPage/MainPage'));
const SignupPage = lazy(() => import('./pages/SignupPage/SignupPage'));
const SigninPage = lazy(() => import('./pages/SigninPage/SigninPage'));
const HomePage = lazy(() => import('./pages/HomePage/HomePage'));
const ForgotPassword = lazy(() =>
  import('./pages/ForgotPassword/ForgotPassword')
);
const ResetPassword = lazy(() => import('./pages/ResetPassword/ResetPassword'));
const NewPasswordPage = lazy(() =>
  import('./pages/NewPasswordPage/NewPasswordPage')
);

const App = () => {
  const dispatch = useDispatch();
  const isRefreshing = useSelector(selectIsRefreshing);

  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);

  if (isRefreshing) <LoaderFallback />;

  return (
    <Suspense fallback={<LoaderFallback />}>
      <Routes>
        <Route path="/" element={<SharedLayout />}>
          <Route index element={<Navigate to="/welcome" />} />
          <Route path="welcome" element={<MainPage />} />
          <Route
            path="signup"
            element={
              <RestrictedRoute redirectTo="/home" component={<SignupPage />} />
            }
          />
          <Route
            path="signin"
            element={
              <RestrictedRoute redirectTo="/home" component={<SigninPage />} />
            }
          />
          <Route
            path="home"
            element={
              <PrivateRoute redirectTo="/signin" component={<HomePage />} />
            }
          />
          <Route
            path="forgot-password"
            element={
              <RestrictedRoute
                redirectTo="/home"
                component={<ForgotPassword />}
              />
            }
          />
          <Route
            path="reset-password"
            element={
              <RestrictedRoute
                redirectTo="/home"
                component={<ResetPassword />}
              />
            }
          />
          <Route path="/reset-password" element={<NewPasswordPage />} />
        </Route>
      </Routes>
    </Suspense>
  );
};

export default App;
