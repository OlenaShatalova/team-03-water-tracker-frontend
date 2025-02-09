import css from './SettingModal.module.css';

import { Form, Formik } from 'formik';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ReactSVG } from 'react-svg';

import close from '../../assets/icons/close.svg';

import UserAvatar from './UserAvatar/UserAvatar';
import GenderIdentity from './GenderIdentity/GenderIdentity';
import PwdSection from './PwdSection/PwdSection';
import Input from '../Input/Input';
import { UserInfoSchema } from '../../utils/schemas/UserInfoSchema';

import { selectUser } from '../../redux/auth/selectors';
import { updateAvatar, updateUser } from '../../redux/auth/operations';

const SettingModal = ({ closeSettingModal }) => {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const avatarRef = useRef(null);
  const [avatar, setAvatar] = useState(null);
  const [avatarUrl, setAvatarUrl] = useState(null);

  useEffect(() => {
    const onKeyDown = evt => {
      if (evt.code === 'Escape') {
        closeSettingModal();
      }
    };
    window.addEventListener('keydown', onKeyDown);

    return () => {
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [closeSettingModal]);

  const onBackdropClick = evt => {
    if (evt.target === evt.currentTarget) {
      closeSettingModal();
    }
  };

  const onUploadClick = () => {
    avatarRef.current.click(); // Відкриваємо файловий діалог
  };

  const handleChangeAvatar = e => {
    const file = e.target.files[0];
    setAvatar(file);
    const tempUrl = URL.createObjectURL(file); //Створення тимчасового url файлу для відображення в img
    setAvatarUrl(tempUrl);
  };

  const handleSubmit = (values, actions) => {
    // console.log(avatar);
    dispatch(updateUser(values));
    // console.log('Was dispatched');

    // dispatch(updateAvatar(avatar));
    // console.log(user);
    actions.resetForm();
  };

  return (
    <Formik
      initialValues={{
        gender: user.gender,
        name: user.name || '',
        email: user.email,
        avatar: user.avatarUrlgit,
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
              onClick={closeSettingModal}
            >
              <ReactSVG src={close} className={css.closeIcon} />
            </button>
          </div>

          <UserAvatar
            avatarUrl={avatarUrl}
            avatarRef={avatarRef}
            onUploadClick={onUploadClick}
            handleChangeAvatar={handleChangeAvatar}
          />

          <div className={css.userDetailsAndPwd}>
            <div className={css.userDetailsWrapper}>
              <GenderIdentity />
              <Input name="name" label="Your name" placeholder="Name" />
              <Input name="email" label="Email" placeholder="Email" />
            </div>
            <PwdSection />
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
