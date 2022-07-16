import { Link } from "react-router-dom";
import { useUser } from "../../hooks/useUser.hook";
import { useRecoilState } from "recoil";
import { menuAtom } from "../../recoil/atoms";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { FC } from "react";
import { LayoutProps } from "../Layouts/BaseLayout";

const NavBar: FC<LayoutProps> = ({ routes }) => {
  const { logout } = useUser();
  const [menuState, setMenuState] = useRecoilState(menuAtom);

  return (
    <nav
      className={`nav 
    z-20
      ex-sm:absolute ex-sm:right-0 ex-sm:min-h-full ex-sm:bg-blue-500
    lg:min-h-auto lg:relative lg:block lg:bg-transparent

    ${menuState}
    `}
    >
      <button
        className="ex-sm:block lg:hidden ex-sm:text-4xl"
        onClick={() => {
          setMenuState("hidden");
        }}
      >
        <CloseRoundedIcon color="error" fontSize="inherit" />
      </button>
      <ul
        className="nav-list flex gap-4 
        ex-sm:flex-col ex-sm:text-white ex-sm:font-bold ex-sm:p-4
        lg:text-base lg:flex-row lg:text-black
        "
      >
        {Object.keys(routes).map((title) => (
          <li key={"navlink" + routes[title].path} className="nav-list__item">
            <Link to={routes[title].link || routes[title].path}>{title}</Link>
          </li>
        ))}
        <li className="nav-list__item cursor-pointer" onClick={logout}>
          Log Out
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
