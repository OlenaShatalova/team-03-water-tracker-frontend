import { useState } from 'react';
import SettingModal from '../SettingModal/SettingModal';
import css from './UserLogoModal.module.css';
//import UserLogoutModal from '../UserLogoutModal/UserLogoutModal';
import { ReactSVG } from 'react-svg';
import ulgSetting from '../../assets/icons/ulg-setting.svg';
import ulgLogout from '../../assets/icons/ulg-logout.svg';

const UserLogoModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Функції для відкриття та закриття модалки взята з SettingModal
  const onOpenModal = () => {
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const onCloseModal = () => {
    setIsModalOpen(false);
    document.body.style.overflow = 'auto';
  };

  return (
    <>
      <div className={css.wrapper}>
        <ul className={css.UserLogoMenu}>
          <li>
            <button
              type="button"
              onClick={onOpenModal} // Открываем SettingModal
              className={css.UserLogoButton}
            >
              <ReactSVG src={ulgSetting} className={css.ulgSetting} />
              Setting
            </button>
          </li>
          <li>
            <button type="button" className={css.UserLogoButton}>
              <ReactSVG src={ulgLogout} className={css.ulgLogout} />
              Log out
            </button>
          </li>
        </ul>
        {/* Если activeModal === 'setting', показываем SettingModal */}
        {isModalOpen && <SettingModal onClose={onCloseModal} />}
      </div>
    </>
  );
};

export default UserLogoModal;
