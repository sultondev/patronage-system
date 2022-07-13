import NavBar from "../NavBar/NavBar.component";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import { useRecoilState } from "recoil";
import { menuAtom } from "../../recoil/atoms";

const Header = () => {
  const [menuState, setMenuState] = useRecoilState(menuAtom);

  return (
    <header className="">
      <div className="flex justify-between lg:items-center">
        <h1 className="text-base font-bold text-2xl">Patronaj sistemasi</h1>
        <NavBar />
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
