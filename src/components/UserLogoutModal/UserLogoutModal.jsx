import React, { useEffect } from 'react';

import { useDispatch } from 'react-redux';
import { logout } from '../../redux/auth/operations';
import css from './UserLogoutModal.module.css';

const UserLogoutModal = ({ onClose }) => {
  const dispatch = useDispatch();

  // Закриття модалки по Escape
  useEffect(() => {
    const handleKeyDown = e => {
      if (e.code === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  // Закриття модалки по кліку на бекдроп
  const handleBackdropClick = e => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  // Обробник для кнопки Logout
  const handleLogout = () => {
    dispatch(logout())
      .unwrap()
      .then(() => {
        onClose(); // Закриваємо модалку після успішного виходу
      })
      .catch(error => {
        console.error('Logout failed:', error);
      });
  };

  return (
    <div className={css.backdrop} onClick={handleBackdropClick}>
      <div className={css.modal}>
        <h2 className={css.title}>Log out</h2>
        <p className={css.subtitle}>Do you really want to leave?</p>
        <div className={css.buttons}>
          <button className={css.cancelButton} onClick={onClose}>
            Cancel
          </button>
          <button className={css.logoutButton} onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserLogoutModal;
