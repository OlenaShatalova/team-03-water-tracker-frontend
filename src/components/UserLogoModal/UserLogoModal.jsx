import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import useTheme from '../ThemeContext/useTheme';
import CustomButton from '../UserLogo/CusomButton/CustomButton';
import UserLogoutModal from '../UserLogoutModal/UserLogoutModal';
import { useState } from 'react';
import SettingModal from '../SettingModal/SettingModal';
import { ListItemIcon, ListItemText } from '@mui/material';
import { ReactSVG } from 'react-svg';

import ulg_setting from '../../assets/icons/ulg_setting.svg';
import ulg_logout from '../../assets/icons/ulg_logout.svg';

export default function UserLogoModal({ children }) {
  const { theme } = useTheme();
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [isSettingModalOpen, setIsSettingModalOpen] = useState(false);

  const openLogoutModal = () => setIsLogoutModalOpen(true);
  const closeLogoutModal = () => setIsLogoutModalOpen(false);

  const openSettingModal = () => setIsSettingModalOpen(true);
  const closeSettingModal = () => setIsSettingModalOpen(false);

  return (
    <>
      <PopupState variant="popover" popupId="user-menu">
        {popupState => (
          <>
            <CustomButton {...bindTrigger(popupState)}>{children}</CustomButton>
            <Menu
              {...bindMenu(popupState)}
              sx={{
                '& .MuiList-root': {
                  padding: '16px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '16px',
                  backgroundColor: theme === 'dark' ? '#1E1E1E' : '#fff', // Динамічна зміна фону
                  '&:hover': {
                    backgroundColor: theme === 'dark' ? '#1E1E1E' : '#fff',
                  },
                },
                '& .MuiButtonBase-root': {
                  padding: '0px',
                  backgroundColor: theme === 'dark' ? '#1E1E1E' : '#fff',
                },
              }}
            >
              <MenuItem
                onClick={() => {
                  popupState.close();
                  openSettingModal();
                }}
                sx={{
                  color: 'var(--color-primary)', // Початковий колір тексту
                  transition: 'color 0.3s ease',
                  backgroundColor: 'transparent !important', // Фіксуємо фон без змін
                  '&:hover': {
                    color: 'var(--color-accent-orange)', // Колір тексту при ховері
                    backgroundColor: 'transparent !important', // Відключаємо зміну фону
                  },
                }}
                disableRipple
              >
                <ListItemIcon>
                  <ReactSVG
                    src={ulg_setting}
                    style={{
                      width: 20,
                      height: 20,
                      filter: theme === 'dark' ? 'invert(1)' : 'none',
                    }}
                  />
                </ListItemIcon>
                <ListItemText primary="Setting" />
              </MenuItem>

              <MenuItem
                onClick={() => {
                  popupState.close();
                  openLogoutModal();
                }}
                sx={{
                  color: 'var(--color-primary)', // Початковий колір тексту
                  transition: 'color 0.3s ease',
                  backgroundColor: 'transparent !important', // Фіксуємо фон без змін
                  '&:hover': {
                    color: 'var(--color-accent-orange)', // Колір тексту при ховері
                    backgroundColor: 'transparent !important', // Відключаємо зміну фону
                  },
                }}
                disableRipple
              >
                <ListItemIcon>
                  <ReactSVG
                    src={ulg_logout}
                    style={{
                      width: 20,
                      height: 20,
                      filter: theme === 'dark' ? 'invert(1)' : 'none',
                    }}
                  />
                </ListItemIcon>
                <ListItemText primary="Logout" />
              </MenuItem>
            </Menu>
          </>
        )}
      </PopupState>
      {isSettingModalOpen && (
        <SettingModal
          closeSettingModal={closeSettingModal}
          isSettingModalOpen={isSettingModalOpen}
        />
      )}

      {isLogoutModalOpen && (
        <UserLogoutModal
          onClose={closeLogoutModal}
          isLogoutModalOpen={isLogoutModalOpen}
        />
      )}
    </>
  );
}
