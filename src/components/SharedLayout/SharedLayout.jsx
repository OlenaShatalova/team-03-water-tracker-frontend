import { Suspense } from "react";

const Layout = ({ children }) => {
  return (
      <div>

      <Suspense fallback={null}>{children}</Suspense>
    </div>
  );
};

export default Layout;
