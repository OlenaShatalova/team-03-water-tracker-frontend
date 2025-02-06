import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ReactSVG } from 'react-svg';

import UserLogoModal from '../UserLogoModal/UserLogoModal';
import UserAvatar from '../SettingModal/UserAvatar/UserAvatar';

import dropdownIcon from '../../assets/icons/jhh.svg';

import css from './UserLogo.module.css';

const UserLogo = ({ user }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleModal = () => {
    setIsOpen(prev => !prev);
  };

  const getUserAvatar = () => {
    // if (user && user.avatar) {
    //   return user.avatar;
    // } else {
    //   const letter = user?.name
    //     ? user.name[0].toUpperCase()
    //     : user.email[0].toUpperCase();
    //   return letter;
    // }
    /*<div className={css.avatarPlaceholder}>{letter}</div>;*/
  };

  return (
    <>
      <Link onClick={toggleModal} className={css.userButton}>
        <span className={css.userName}>Name</span>
        {/* { {getUserAvatar()} */}
        <UserAvatar />
        <ReactSVG src={dropdownIcon} className={css.dropdownIcon} />
        {isOpen && <UserLogoModal onClose={toggleModal} user={user} />}
      </Link>
    </>
  );
};

// {
//   user.name || user.email;
// }

export default UserLogo;
