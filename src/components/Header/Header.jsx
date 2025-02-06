import { Link } from 'react-router-dom';
import { ReactSVG } from 'react-svg';
import { useSelector } from 'react-redux';

import Container from '../Container/Container';
import UserAuth from '../UserAuth/UserAuth'; // Підключаємо UserAuth
import UserLogo from '../UserLogo/UserLogo';
import logo from '../../assets/icons/logo.svg';

import css from './Header.module.css';

const Header = () => {
  const user = useSelector(state => state.auth.user); // Отримуємо юзера з Redux
  const isLoggedIn = Boolean(user); // Перевіряємо, чи залогінений користувач
  return (
    <header>
      <Container>
        <nav className={css.header}>
          <Link to={isLoggedIn ? '/home' : '/welcome'}>
            <ReactSVG src={logo} className={css.logo} />
          </Link>
          <UserLogo />
          {/* {isLoggedIn ? <UserLogo user={user} /> : <UserAuth />} */}
        </nav>
      </Container>
    </header>
  );
};

export default Header;
