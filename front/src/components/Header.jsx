import { Link } from "react-router-dom";
import NavBar from "./NavBar";

const Header = () => {
  return (
    <>
      <header className="header-container">

     
        <Link to="/" className="header-logo-link">
          <img
            src="/src/assets/img/logo.webp"
            alt="Logo NitroRiders"
            className="header-logo"
          />
        </Link>

        <h1 className="header-title">NitroRiders</h1>
      </header>

     
      <NavBar />
    </>
  );
};

export default Header;
