import { Link } from 'react-router-dom';
import { ReactSVG } from 'react-svg';

import Container from '../Container/Container';
import UserAuth from '../UserAuth/UserAuth'; // Підключаємо UserAuth

import logo from '../../assets/icons/logo.svg';
import iconMen from '../../assets/icons/user.svg';

import css from './Header.module.css';

/*<UserAuth />;*/
const Header = () => {
  return (
    <header>
      <Container>
        <nav className={css.header}>
          <Link to="welcome">
            <ReactSVG src={logo} className={css.logo} />
          </Link>
          <Link to="signin" className={css.signIn}>
            Sign In
            <ReactSVG src={iconMen} className={css.iconMen} />
          </Link>
        </nav>
      </Container>
    </header>
  );
};

export default Header;
