import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../../redux/auth/operations';
import css from './UserLogoutModal.module.css';

const UserLogoutModal = ({ onClose }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const handleKeyDown = e => {
      if (e.code === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const handleBackdropClick = e => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleLogout = () => {
    dispatch(logout())
      .unwrap()
      .then(() => {
        onClose();
      })
      .catch(error => {
        console.error('Logout failed:', error);
      });
  };

  return (
    <div className={css.backdrop} onClick={handleBackdropClick}>
      <div className={css.modal}>
        <h2 className={css.title}>Delete entry</h2>
        <p className={css.text}>Are you sure you want to delete the entry?</p>
        <div className={css.buttonWrapper}>
          <button className={css.cancelButton} onClick={onClose}>
            Cancel
          </button>
          <button className={css.deleteButton} onClick={handleLogout}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserLogoutModal;
