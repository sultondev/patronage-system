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
        path: "/categories/*",
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
      "Savol yaratish": {
        path: "/create-question",
        element: <div>Create question</div>,
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
    return <div>Loading...</div>;
  }
  return (
    <div className="app">
      {layoutProps ? <Layout {...layoutProps} /> : "Error access denied!"}
    </div>
  );
};

export default App;
