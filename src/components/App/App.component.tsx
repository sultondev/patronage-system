import "./App.style.css";
import Header from "../Header/Header.component";
import { useRecoilState } from "recoil";
import { authStatusStateData } from "../../recoil/atoms";
import { useNavigate, Routes, Route } from "react-router-dom";
import CreateUser from "../AccountCreators/CreateModerator.component";
import { useUser } from "../../hooks/useUser.hook";
import { useEffect } from "react";
import { Roles } from "../../typing/enums/Role.enum";
import { Categories } from "../Categories/Categories.component";
import { Test } from "../Test/Test.component";

const App = () => {
  const { user } = useUser();
  useEffect(() => {
    console.log(user);
  }, []);
  if (!user.id) {
    return <div>Loading...</div>;
  }
  return (
    <div className="app">
      <div className="md:px-[80px] lg:px-[100px]">
        <Header />
        <Routes>
          <Route path="create-user" element={<CreateUser />} />
          <Route path="categories/*" element={<Categories />} />
          <Route path="schedules/:scheduleId" element={<Test />} />
        </Routes>
      </div>
    </div>
  );
};

const privileges = {
  [Roles.SUPERUSER]: {
    createUser: [Roles.EMPLOYEE, Roles.MODERATOR],
  },
  [Roles.EMPLOYEE]: {
    createUser: [Roles.MODERATOR],
  },
  [Roles.MODERATOR]: {
    createUser: false,
  },
};

export default App;
