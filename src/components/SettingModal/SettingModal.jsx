import css from './SettingModal.module.css';

import { Form, Formik } from 'formik';
import { useEffect } from 'react';
import { ReactSVG } from 'react-svg';

import close from '../../assets/icons/close.svg';
import upload from '../../assets/icons/upload.svg';

import UserAvatar from './UserAvatar/UserAvatar';
import GenderIdentity from './GenderIdentity/GenderIdentity';
import PwdSection from './PwdSection/PwdSection';
import { UserInfoSchema } from '../../utils/schemas/UserInfoSchema';
import Input from '../Input/Input';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from '../../redux/auth/selectors';

const INITIAL_VALUES = {
  gender: 'female',
  name: '',
  email: '',
  oldpassword: '',
  password: '',
};

//Створити userConfig

const SettingModal = ({ onCloseModal }) => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  // const [isModalOpen, setIsModalOpen] = useState(false);

  // const onOpenModal = () => {
  //   setIsModalOpen(true);
  //   document.body.style.overflow = 'hidden';
  // };

  // const onCloseModal = () => {
  //   setIsModalOpen(false);
  //   document.body.style.overflow = 'auto';
  // };

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

  const handleSubmit = values => {
    console.log(values);
  };
  const onBackdropClick = evt => {
    if (evt.target === evt.currentTarget) {
      onCloseModal();
    }
  };

  return (
    <Formik
      initialValues={INITIAL_VALUES}
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
            <UserAvatar />
            <a href="" className={css.uploadLink}>
              <ReactSVG src={upload} className={css.uploadIcon} />
              <span className={css.uploadText}>Upload a photo</span>
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
            <button className={css.saveBtn}>Save</button>
          </div>
        </Form>
      </div>
    </Formik>
  );
};

export default SettingModal;
