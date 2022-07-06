import "./App.style.css";
import Header from "../Header/Header.component";
import { useRecoilState } from "recoil";
import { authStatusStateData } from "../../recoil/atoms";
import { useNavigate, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import CreateUser from "../Auth/CreateUser.component";

const App = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const localAuthStatus = JSON.parse(
      localStorage.getItem("access-token") || "false"
    );
    console.log(typeof localAuthStatus);
    if (!localAuthStatus) {
      navigate("/login");
    }
  }, []);

  return (
    <div className="app">
      <Header />
      <Routes>
        <Route path="create-user" element={<CreateUser />} />
        {/* <Route path="create-user" element={<CreateUser />} /> */}
      </Routes>
    </div>
  );
};

export default App;
