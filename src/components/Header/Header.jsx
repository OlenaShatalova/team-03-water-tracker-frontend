import React from 'react';
import { Link } from 'react-router-dom';

import Container from '../Container/Container';
import Logo from '../Logo/Logo'; // Підключаємо Logo
import UserAuth from '../UserAuth/UserAuth'; // Підключаємо UserAuth

import css from './Header.module.css';

/*<UserAuth />;*/
const Header = () => {
  return (
    <header>
      <Container>
        <nav className={css.header}>
          <Link to="welcome" className={css.logo}>
            <Logo />
          </Link>
          <Link to="signin" className={css.signIn}>
            Sign In
            <img
              className={css.user}
              src="/src/assets/icons/user.svg"
              alt="user"
              width="28"
              height="28"
            />
          </Link>
        </nav>
      </Container>
    </header>
  );
};

export default Header;
