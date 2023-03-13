import { FC } from "react";
import Header from "../Header/Header.component";
import { PathRouteProps, Route, Routes } from "react-router-dom";
export interface LayoutProps {
  routes: Record<string, PathRouteProps & { link?: string }>;
}

const Layout: FC<LayoutProps> = ({ routes }) => {
  return (
    <div className="md:px-[80px] lg:px-[100px]">
      <Header routes={routes} />
      <Routes>
        {Object.entries(routes).map(([path, route]) => (
          <Route
            key={"route-path" + path}
            path={route.path}
            element={route.element}
          />
        ))}
      </Routes>
    </div>
  );
};

export default Layout;
