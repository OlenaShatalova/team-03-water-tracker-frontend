import { Link } from 'react-router-dom';
import { ReactSVG } from 'react-svg';

import iconMen from '../../assets/icons/user.svg';

import css from './UserAuth.module.css';

const UserAuth = () => {
  return (
    <Link to="/signin" className={css.signIn}>
      Sign In
      <ReactSVG src={iconMen} className={css.iconMen} />
    </Link>
  );
};

export default UserAuth;
