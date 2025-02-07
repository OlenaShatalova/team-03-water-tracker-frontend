import { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectUser } from '../../redux/auth/selectors';

import { Link } from 'react-router-dom';
import { ReactSVG } from 'react-svg';

import UserLogoModal from '../UserLogoModal/UserLogoModal';
import UserAvatar from '../SettingModal/UserAvatar/UserAvatar';

import dropdownIcon from '../../assets/icons/jhh.svg';

import css from './UserLogo.module.css';

const UserLogo = () => {
  const user = useSelector(selectUser);
  const [isOpen, setIsOpen] = useState(false);

  const toggleModal = () => {
    setIsOpen(prev => !prev);
  };

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
    <Link onClick={toggleModal} className={css.userButton}>
      <span className={css.userName}>{user.name || user.email}</span>
      {getUserAvatar()}
      <ReactSVG src={dropdownIcon} className={css.dropdownIcon} />
      {isOpen && <UserLogoModal onClose={toggleModal} user={user} />}
    </Link>
  );
};

export default UserLogo;
