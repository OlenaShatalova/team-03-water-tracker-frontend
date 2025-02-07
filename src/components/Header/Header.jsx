import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ReactSVG } from 'react-svg';

import Container from '../Container/Container';
import UserAuth from '../UserAuth/UserAuth'; // Підключаємо UserAuth
import UserLogo from '../UserLogo/UserLogo';

import logo from '../../assets/icons/logo.svg';

import { selectIsLoggedIn, selectUser } from '../../redux/auth/selectors';

import css from './Header.module.css';
import SettingModal from '../SettingModal/SettingModal';

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
          <SettingModal />
          {isLoggedIn ? <UserLogo user={user} /> : <UserAuth />}
        </nav>
      </Container>
    </header>
  );
};

export default Header;
