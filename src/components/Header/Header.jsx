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
/*import React from "react";
import css from "./Header.css";
import logo from "../../assets/icons";

const Header = () => {
  const username = "David"; // Отримати з Redux або бекенду
  const userAvatar = "https://randomuser.me/api/portraits/men/45.jpg"; // Тестова картинка

  return (
    <HeaderWrapper>
      <Logo className={css.logo} src={logo} alt="Tracker of Water" />
      <UserSection>
        <span>{username}</span>
        <Avatar src={userAvatar} alt="User Avatar" />
      </UserSection>
    </HeaderWrapper>
  );
};

export default Header;*/
