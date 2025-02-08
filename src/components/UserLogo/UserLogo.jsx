import { useSelector } from 'react-redux';
import { selectUser } from '../../redux/auth/selectors';

import { ReactSVG } from 'react-svg';

import dropdownIcon from '../../assets/icons/jhh.svg';

import css from './UserLogo.module.css';
import UserLogoModal from '../UserLogoModal/UserLogoModal';

const UserLogo = () => {
  const user = useSelector(selectUser);

  const getUserAvatar = () => {
    if (user && user.avatar) {
      return <img src={user.avatar} alt="User avatar" className={css.avatar} />;
    }
    const letter = user?.name
      ? user.name[0].toUpperCase()
      : user.email[0].toUpperCase();
    return <div className={css.avatarPlaceholder}>{letter}</div>;
  };

  return (
    <UserLogoModal>
      <span className={css.userName}>
        {user.name || user.email.split('@')[0]}
      </span>
      {getUserAvatar()}
      <ReactSVG src={dropdownIcon} className={css.dropdownIcon} />
    </UserLogoModal>
  );
};

export default UserLogo;
