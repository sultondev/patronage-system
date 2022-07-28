import "./App.style.css";
import CreateUser from "../AccountCreators/CreateUser.component";
import { useUser } from "../../hooks/useUser.hook";
import { useMemo } from "react";
import { Roles } from "../../typing/enums/Role.enum";
import { Categories } from "../Categories/Categories.component";
import { LayoutProps } from "../Layouts/BaseLayout";
import Layout from "../Layouts/BaseLayout";
import CreateApplicationComponent from "../ApplicationCreator/CreateApplication.component";
import Applications from "../Applications/Applications.component";
import { Users } from "../Users/Users.component";
import { Route, Routes } from "react-router-dom";
import { ApplicationDetails } from "../Applications/ApplicationDetails.component";
import { QuestionCreator } from "../QuestionCreator/QuestionCreator.component";
import Schedules from "../Schedules/Schedules.component";
import ScheduleDetailComponent from "../Schedules/ScheduleDetail.component";

const layouts: Record<Roles, LayoutProps | null> = {
  [Roles.SUPERUSER]: {
    routes: {
      "Bo'limlar": {
        path: "/categories/*",
        link: "/categories",
        element: <Categories />,
      },
      "Foydalanuchi yaratish": {
        path: "/create-user",
        element: <CreateUser />,
      },
    },
  },
  [Roles.EMPLOYEE]: {
    routes: {
      "Ariza yuborish": {
        path: "/create-application",
        element: <CreateApplicationComponent />,
      },
      "Bo'limlar": {
        path: "/categories",
        link: "/categories",
        element: <Categories />,
      },
    },
  },
  [Roles.MODERATOR]: {
    routes: {
      "Arizalarni ko'rish": {
        path: "/applications",
        link: "/applications",
        element: <Applications />,
      },
      "Bo'limlar": {
        path: "/categories",
        link: "/categories",
        element: <Categories />,
      },
      "Ishchilar ro'yxati": {
        path: "/users/*",
        link: "/users",
        element: <Users />,
      },
    },
  },
};
const App = () => {
  const { user } = useUser();
  const layoutProps = useMemo(() => layouts[user.role as Roles], [user.role]);

  if (!user.id) {
    return (
      <div className="text-2xl md:px-[80px] lg:px-[100px]">
        {!user.id ? "Yuklanmoqda..." : "Hatolik yuz berdi"}
      </div>
    );
  }
  return (
    <div className="app">
      {layoutProps ? <Layout {...layoutProps} /> : "Error access denied!"}
      <main>
        <Routes>
          <Route
            path="/applications/:applicationId"
            element={<ApplicationDetails />}
          />
          <Route
            path="/categories/:categoryId/schedules/*"
            element={<Schedules />}
          />
          <Route
            path="/categories/:categoryId/schedules/:scheduleId"
            element={<ScheduleDetailComponent />}
          />
        </Routes>
      </main>
    </div>
  );
};

export default App;
