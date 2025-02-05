import React, { useState } from 'react';
import UserLogoutModal from '../UserLogoutModal/UserLogoutModal';
import css from './UserLogoModal.module.css';

const UserLogoModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className={css.container}>
      <button className={css.logoutButton} onClick={openModal}>
        Logout
      </button>
      {isModalOpen && <UserLogoutModal onClose={closeModal} />}
    </div>
  );
};

export default UserLogoModal;
