import NavBar from "../NavBar/NavBar.component";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import { useRecoilState } from "recoil";
import { menuAtom, userAtom } from "../../recoil/atoms";
import { FC } from "react";
import { LayoutProps } from "../Layouts/BaseLayout";

const Header: FC<LayoutProps> = ({ routes }) => {
  const [, setMenuState] = useRecoilState(menuAtom);
  const [user] = useRecoilState(userAtom);

  return (
    <header className="ex-sm:px-2">
      <div className="flex justify-between lg:items-center">
        <h1 className="font-bold text-2xl">Patronaj sistemasi </h1>
        <NavBar routes={routes} />
        <button
          className="ex-sm:block ex-sm:text-3xl lg:hidden"
          onClick={() => {
            setMenuState("block");
          }}
        >
          <MenuRoundedIcon fontSize="inherit" />
        </button>
      </div>
    </header>
  );
};

export default Header;
