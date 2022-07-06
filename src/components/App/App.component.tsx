import "./App.style.css";
import Header from "../Header/Header.component";
import { useRecoilState } from "recoil";
import { authStatusStateData } from "../../recoil/atoms";
import { useNavigate, Routes, Route } from "react-router-dom";
import CreateUser from "../Auth/CreateUser.component";
import { useUser } from "../../hooks/useUser.hook";
import { useEffect } from "react";
import { Roles } from "../../typing/enums/Role.enum";

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
      <Header />
      {JSON.stringify(user)}
      <Routes>
        <Route path="create-user" element={<CreateUser />} />
        {/* <Route path="create-user" element={<CreateUser />} /> */}
      </Routes>
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
