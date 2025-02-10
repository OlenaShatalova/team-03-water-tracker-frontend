import css from './UserAvatar.module.css';
import { useSelector } from 'react-redux';

import { selectUser } from '../../../redux/auth/selectors';
import { ReactSVG } from 'react-svg';

import upload from '../../../assets/icons/upload.svg';

const UserAvatar = ({
  avatarUrl,
  avatarRef,
  handleChangeAvatar,
  setFieldValue,
  onUploadClick,
}) => {
  const user = useSelector(selectUser);

  const getInitial = () => {
    return user.name ? user.name[0].toUpperCase() : user.email[0].toUpperCase();
  };

  return (
    <>
      <h3 className={css.photoTtl}>Your photo</h3>
      <div className={css.photoWrapper}>
        <div className={css.userAvatar}>
          {/* {user.avatar ? ( */}
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
        <input
          ref={avatarRef} // Привʼязуємо ref до input
          type="file"
          accept="image/*"
          style={{ display: 'none' }}
          onChange={e => handleChangeAvatar(e, setFieldValue)}
        />
        <a className={css.uploadLink}>
          <ReactSVG src={upload} className={css.uploadIcon} />
          <span className={css.uploadText} onClick={onUploadClick}>
            Upload a photo
          </span>
        </a>
      </div>
    </>
  );
};

export default UserAvatar;
