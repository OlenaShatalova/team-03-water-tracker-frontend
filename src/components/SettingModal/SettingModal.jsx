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

import { selectLoading, selectUser } from '../../redux/auth/selectors';
import { updateAvatar, updateUser } from '../../redux/auth/operations';
import { SuccessToast } from '../../utils/successToast';
import { ErrorToast } from '../../utils/errorToast';
import { Loader } from '../Loader/Loader';

const SettingModal = ({ closeSettingModal }) => {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const avatarRef = useRef(null);
  const [avatarUrl, setAvatarUrl] = useState(null);
  const loading = useSelector(selectLoading);
  const [avatarFile, setAvatarFile] = useState(null);

  useEffect(() => {
    // Оновлюємо avatarUrl при зміні user.avatar
    setAvatarUrl(user.avatarUrl);
  }, [user.avatarUrl]);

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

  const handleChangeAvatar = (e, setFieldValue) => {
    const file = e.target.files[0];

    if (file.size > 5 * 1024 * 1024) {
      ErrorToast('File size exceeds 5MB');
      return;
    }
    const tempUrl = URL.createObjectURL(file); //Створення тимчасового url файлу для відображення в img
    setAvatarUrl(tempUrl); // Оновлюємо URL для відображення аватарки
    setAvatarFile(file);
    setFieldValue('avatarUrl', file); // Оновлює значення поля 'avatar'
  };

  const handleSubmit = async values => {
    const { avatarUrl, repeatPassword, ...otherValues } = values;

    const isDataUnchanged =
      user.gender === otherValues.gender &&
      user.name === otherValues.name &&
      user.email === otherValues.email &&
      user.oldPassword === otherValues.oldPassword &&
      user.newPassword === otherValues.newPassword &&
      !avatarFile;

    if (isDataUnchanged) {
      closeSettingModal();
      return;
    }

    if (otherValues.oldPassword && !otherValues.newPassword) {
      ErrorToast('New password is required to change current password!');
      return;
    } else if (
      otherValues.oldPassword &&
      otherValues.newPassword &&
      !repeatPassword
    ) {
      ErrorToast('Repeat new password!');
      return;
    } else if (
      (otherValues.newPassword && !otherValues.oldPassword) ||
      !repeatPassword
    ) {
      ErrorToast('Current password is required to change your password!');
      return;
    }

    try {
      if (otherValues) {
        await dispatch(updateUser(otherValues)).unwrap();
      }

      if (avatarFile) {
        await dispatch(updateAvatar(avatarFile)).unwrap();
      }
      SuccessToast('Your changes is successfully saved!');
      closeSettingModal();
    } catch (error) {
      ErrorToast(error.message || 'Update failed!');
    }
  };

  return (
    <Formik
      initialValues={{
        gender: user.gender,
        name: user.name,
        email: user.email,
        avatarUrl: user.avatarUrl,
      }}
      validationSchema={UserInfoSchema}
      onSubmit={handleSubmit}
    >
      {({ setFieldValue }) => (
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
              avatarUrl={avatarUrl} // Використовуємо state avatarUrl для відображення
              avatarRef={avatarRef}
              onUploadClick={onUploadClick}
              handleChangeAvatar={e => handleChangeAvatar(e, setFieldValue)}
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
              {loading && <Loader />}
              <button type="submit" className={css.saveBtn}>
                Save
              </button>
            </div>
          </Form>
        </div>
      )}
    </Formik>
  );
};

export default SettingModal;
