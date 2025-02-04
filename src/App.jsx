import { lazy, Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import RestrictedRoute from './components/RestrictedRoute';
import PrivateRoute from './components/PrivateRoute';
import LoaderFallback from './components/LoaderFallback/LoaderFallback';
import SharedLayout from './components/SharedLayout/SharedLayout';

const MainPage = lazy(() => import('./pages/MainPage/MainPage'));
const SignupPage = lazy(() => import('./pages/SignupPage/SignupPage'));
const SigninPage = lazy(() => import('./pages/SigninPage/SigninPage'));
const HomePage = lazy(() => import('./pages/HomePage/HomePage'));

// import MainPage from "./pages/MainPage/MainPage";
// import SignupPage from './pages/SignupPage/SignupPage';
// import SigninPage from './pages/SigninPage/SigninPage';
// import HomePage from './pages/HomePage/HomePage';

const App = () => {
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
        </Route>
      </Routes>
    </Suspense>
  );
};

export default App;
