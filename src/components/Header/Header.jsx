import { Link } from "react-router-dom";

const Header = () => (
  <header>
    <nav>
      <Link to="welcome">Welcome</Link> | <Link to="signin">Sign In</Link>
    </nav>
  </header>
);

export default Header;
