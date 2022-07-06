import NavBar from "../NavBar/NavBar.component";

const Header = () => {
  return (
    <header className="px-[120px]">
      <div className="flex justify-between">
        <h1 className="text-base font-bold text-2xl">Patronaj sistemasi</h1>
        <NavBar />
      </div>
    </header>
  );
};

export default Header;
