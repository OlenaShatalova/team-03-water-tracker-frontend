import css from './UserAvatar.module.css';
import { useSelector } from 'react-redux';

import { selectUser } from '../../../redux/auth/selectors';
import { useEffect, useState } from 'react';

const UserAvatar = ({ avatarUrl }) => {
  const user = useSelector(selectUser);
  const [bgColor, setBgColor] = useState(getRandomColor());

  const getInitial = () => {
    if (user && user.name) {
      return user.name[0].toUpperCase() || user.email[0].toUpperCase();
    } else {
      return '';
    }
  };
  // user && user.name
  //   ? user.name[0].toUpperCase()
  //   : user.email[0].toUpperCase();

  function getRandomColor() {
    return '#' + Math.floor(Math.random() * 16777215).toString(16);
  }

  useEffect(() => {
    if (!user.avatarUrl) {
      const storedColor = localStorage.getItem(`avatarColor-${user._id}`);
      if (storedColor) {
        setBgColor(storedColor);
      } else {
        const newColor = getRandomColor();
        localStorage.setItem(`avatarColor-${user._id}`, newColor);
        setBgColor(newColor);
      }
    }
  }, [user]);

  return (
    <div className={css.userAvatar} style={{ backgroundColor: bgColor }}>
      {avatarUrl ? (
        <img
          src={avatarUrl}
          alt={`${user.name || 'User'}'s avatar`}
          className={css.avatarImg}
        />
      ) : (
        <span className={css.userInitial}>{getInitial()}</span>
      )}
    </div>
  );
};

export default UserAvatar;
