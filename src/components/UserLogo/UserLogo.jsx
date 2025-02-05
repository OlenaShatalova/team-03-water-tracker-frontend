import { useState } from 'react';
import { ReactSVG } from 'react-svg';
import dropdownIcon from '../../assets/icons/dropdown.svg';
import UserLogoModal from '../UserLogoModal/UserLogoModal';
import css from './UserLogo.module.css';

const UserLogo = ({ user }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleModal = () => {
    setIsOpen(prev => !prev);
  };

  const getUserAvatar = () => {
    if (user.avatar) {
      return <img src={user.avatar} alt="User Avatar" className={css.avatar} />;
    }
    const letter = user.name
      ? user.name[0].toUpperCase()
      : user.email[0].toUpperCase();
    return <div className={css.avatarPlaceholder}>{letter}</div>;
  };

  return (
    <>
      <button onClick={toggleModal} className={css.userButton}>
        <span className={css.userName}>{user.name || user.email}</span>
        {getUserAvatar()}
        <ReactSVG src={dropdownIcon} className={css.dropdownIcon} />
      </button>

      {isOpen && <UserLogoModal onClose={toggleModal} user={user} />}
    </>
  );
};

export default UserLogo;
