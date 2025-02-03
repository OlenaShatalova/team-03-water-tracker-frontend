import { Field, Form, Formik } from 'formik';
import css from './SettingModal.module.css';

import UserAvatar from './UserAvatar/UserAvatar';

import { ReactSVG } from 'react-svg';
import close from '../../assets/icons/close.svg';
import upload from '../../assets/icons/upload.svg';

import GenderIdentity from './GenderIdentity/GenderIdentity';
import PwdSection from './PwdSection/PwdSection';

const SettingModal = () => {
  const INITIAL_VALUES = {
    photo: '',
    name: '',
    email: '',
    password: '',
  };

  const handleSubmit = values => {
    console.log(values);
  };

  return (
    <Formik initialValues={INITIAL_VALUES} onSubmit={handleSubmit}>
      <div className={css.backdrop}>
        <Form className={css.modal}>
          <div className={css.titleWrapper}>
            <h2>Setting</h2>
            <button type="button" className={css.closeBtn}>
              <ReactSVG src={close} className={css.closeIcon} />
            </button>
          </div>
          <h3 className={css.blockTtl}>Your photo</h3>
          <div className={css.photoWrapper}>
            <UserAvatar />
            <a href="" className={css.uploadLink}>
              <ReactSVG src={upload} className={css.uploadIcon} />
              <span className={css.uploadText}>Upload a photo</span>
            </a>
          </div>
          <div className={css.userDetailsWrapper}>
            <div>
              <GenderIdentity />
              <div className={css.sectWrapper}>
                <h3 className={css.blockTtl}>Your name</h3>
                <label>
                  <Field
                    type="text"
                    name="name"
                    placeholder="Name"
                    className={css.textInput}
                  />
                </label>
              </div>
              <div className={css.sectWrapper}>
                <h3 className={css.blockTtl}>Email</h3>
                <label>
                  <Field
                    type="text"
                    name="email"
                    placeholder="Email"
                    className={css.textInput}
                  />
                </label>
              </div>
            </div>
            <div>
              <PwdSection />
            </div>
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
