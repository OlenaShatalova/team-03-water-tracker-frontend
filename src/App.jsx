// import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import SharedLayout from "./components/SharedLayout/SharedLayout";
// import RestrictedRoute from "./components/RestrictedRoute";
// import PrivateRoute from "./components/PrivateRoute";

// const MainPage = lazy(() => import("./pages/MainPage/MainPage"));
// const SigninPage = lazy(() => import("./pages/SigninPage/SigninPage"));
// const SigupPage = lazy(() => import("./pages/SignupPage/SignupPage"));
// const HomePage = lazy(() => import("./pages/HomePage/HomePage"));

import MainPage from "./pages/MainPage/MainPage";
import SignupPage from "./pages/SignupPage/SignupPage";
import SigninPage from "./pages/SigninPage/SigninPage";
import HomePage from "./pages/HomePage/HomePage";

const App = () => {
  return (
    <SharedLayout>
      <p>APP</p>
      {/* // <Suspense fallback={<p>Loading...</p>}> */}
      <Routes>
        <Route path="/welcome" element={<MainPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/signin" element={<SigninPage />} />
        <Route path="/home" element={<HomePage />} />
      </Routes>
      {/* </Suspense> */}
      {/* <Routes>
        <Route path="/" element={<MainPage />} />
        <Route
          path="/register"
          element={
            <RestrictedRoute
              redirectTo="/contacts"
              component={<SingInPage />}
            />
          }
        />
        <Route
          path="/login"
          element={
            <RestrictedRoute
              redirectTo="/contacts"
              component={<SingUpPage />}
            />
          }
        />
        <Route
          path="/contacts"
          element={
            <PrivateRoute redirectTo="/login" component={<TrackerPage />} />
          }
        />
      </Routes> */}
    </SharedLayout>
  );
};

export default App;
