import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <nav className="nav">
      <ul className="nav-list flex gap-4">
        <li className="nav-list__item">Applications page</li>
        <li className="nav-list__item">Categories page</li>
        <li className="nav-list__item">Schedules page</li>
        <li className="nav-list__item">Questions page</li>
        <li className="nav-list__item">
          <Link to="create-user">Create User</Link>
        </li>
        <li className="nav-list__item">Log Out</li>
      </ul>
    </nav>
  );
};

export default NavBar;
