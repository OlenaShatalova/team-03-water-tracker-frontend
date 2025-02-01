import { Link } from "react-router-dom";

import Container from "../Container/Container";

const Header = () => (
  <header>
    <Container>
      <nav>
        <Link to="welcome">LogoTracker</Link> | <Link to="signin">Sign In</Link>
      </nav>
    </Container>
  </header>
);

export default Header;
