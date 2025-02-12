import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ReactSVG } from 'react-svg';
import ThemeBtn from '../ThemeBtn/ThemeBtn';
import Container from '../Container/Container';
import UserAuth from '../UserAuth/UserAuth'; // Підключаємо UserAuth
import UserLogo from '../UserLogo/UserLogo';

import logo from '../../assets/icons/logo.svg';

import { selectIsLoggedIn, selectUser } from '../../redux/auth/selectors';

import css from './Header.module.css';

const Header = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn); // Отримуємо юзера з Redux
  const user = useSelector(selectUser);

  return (
    <header>
      <Container>
        <nav className={css.header}>
          <Link to={isLoggedIn ? '/home' : '/welcome'}>
            <ReactSVG src={logo} className={css.logo} />
          </Link>
          <div className={css.btn_info}>
            <ThemeBtn />
            {isLoggedIn ? <UserLogo user={user} /> : <UserAuth />}
          </div>
        </nav>
      </Container>
    </header>
  );
};

export default Header;
