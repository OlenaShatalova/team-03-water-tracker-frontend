import css from './SettingModal.module.css';

import { Form, Formik } from 'formik';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ReactSVG } from 'react-svg';

import close from '../../assets/icons/close.svg';
import upload from '../../assets/icons/upload.svg';

import UserAvatar from './UserAvatar/UserAvatar';
import GenderIdentity from './GenderIdentity/GenderIdentity';
import PwdSection from './PwdSection/PwdSection';
import Input from '../Input/Input';
import { UserInfoSchema } from '../../utils/schemas/UserInfoSchema';

import { selectUser } from '../../redux/auth/selectors';
import { updateAvatar, updateUser } from '../../redux/auth/operations';
import { ErrorToast } from '../../utils/errorToast';
// import toast from 'react-hot-toast';

// const [isModalOpen, setIsModalOpen] = useState(false);

// const onOpenModal = () => {
//   setIsModalOpen(true);
//   document.body.style.overflow = 'hidden';
// };

// const onCloseModal = () => {
//   setIsModalOpen(false);
//   document.body.style.overflow = 'auto';
// };

// <button type="button" onClick={onOpenModal}></button>;
// {
//   isModalOpen && <SettingModal onCloseModal={onCloseModal} />;
// }

const SettingModal = ({ onCloseModal }) => {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const avatarRef = useRef(null);
  const [avatar, setAvatar] = useState();
  const [avatarUrl, setAvatarUrl] = useState();

  useEffect(() => {
    const onKeyDown = evt => {
      if (evt.code === 'Escape') {
        onCloseModal();
      }
    };
    window.addEventListener('keydown', onKeyDown);

    return () => {
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [onCloseModal]);

  const onBackdropClick = evt => {
    if (evt.target === evt.currentTarget) {
      onCloseModal();
    }
  };

  const onUploadCllick = () => {
    avatarRef.current.click(); // Відкриваємо файловий діалог
  };

  const handleChangeAvatar = e => {
    const file = e.target.files[0];
    const maxFileSize = 5 * 1024 * 1024;
    if (file) {
      if (file.size > maxFileSize) {
        ErrorToast('Please choose a file less than 5MB');
      } else {
        setAvatar(file);
        const tempUrl = URL.createObjectURL(file); //Створення тимчасового url файлу для відображення в img
        setAvatarUrl(tempUrl);
      }
    }
  };

  const handleSubmit = () => {
    // console.log(user);
    // console.log(avatar);
    dispatch(updateUser(user));
    dispatch(updateAvatar(avatar));
    // console.log(user);
    // actions.resetForm();
  };

  return (
    <Formik
      initialValues={{
        gender: user.gender,
        name: user.name,
        email: user.email,
        avatar: user.avatarUrl,
      }}
      validationSchema={UserInfoSchema}
      onSubmit={handleSubmit}
    >
      <div className={css.backdrop} onClick={onBackdropClick}>
        <Form className={css.modal}>
          <div className={css.titleWrapper}>
            <h2 className={css.mainTtl}>Setting</h2>
            <button
              type="button"
              className={css.closeBtn}
              onClick={onCloseModal}
            >
              <ReactSVG src={close} className={css.closeIcon} />
            </button>
          </div>

          <h3 className={css.photoTtl}>Your photo</h3>
          <div className={css.photoWrapper}>
            <UserAvatar avatarUrl={avatarUrl} />
            <input
              ref={avatarRef} // Привʼязуємо ref до input
              type="file"
              accept="avatar/*"
              style={{ display: 'none' }}
              onChange={handleChangeAvatar}
            />
            <a className={css.uploadLink}>
              <ReactSVG src={upload} className={css.uploadIcon} />
              <span className={css.uploadText} onClick={onUploadCllick}>
                Upload a photo
              </span>
            </a>
          </div>

          <div className={css.userDetailsAndPwd}>
            <div className={css.userDetailsWrapper}>
              <GenderIdentity />
              <Input name="name" label="Your name" placeholder="Name" />
              <Input name="email" label="Email" placeholder="Email" />
            </div>
            <PwdSection className={css.pwdWrapper} />
          </div>

          <div className={css.saveBtnWrpr}>
            <button type="submit" className={css.saveBtn}>
              Save
            </button>
          </div>
        </Form>
      </div>
    </Formik>
  );
};

export default SettingModal;
