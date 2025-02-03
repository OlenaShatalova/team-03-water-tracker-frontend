import { Field, Form, Formik } from "formik";
import css from "./SettingModal.module.css";
import clsx from "clsx";

import UserAvatar from "./UserAvatar/UserAvatar";

import { ReactSVG } from "react-svg";
import close from "../../assets/icons/close.svg";
import upload from "../../assets/icons/upload.svg";
import eyeClosed from "../../assets/icons/eyeClosed.svg";

const SettingModal = () => {
  const INITIAL_VALUES = {
    name: "",
    email: "",
  };

  const handleSubmit = (values) => {
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
          <div className={css.sectWrapper}>
            <h3 className={css.genderTtl}>Your gender identity</h3>
            <label>
              <Field type="radio" name="gender" value="woman" />
              <span className={css.spanGender}>Woman</span>
            </label>
            <label style={{ marginLeft: "24px" }}>
              <Field type="radio" name="gender" value="man" />
              <span className={css.spanGender}>Man</span>
            </label>
          </div>
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
          <div className={css.sectWrapper}>
            <h3 className={css.pwdTtl}>Password</h3>
            <label className={css.pwdLabel}>
              <span className={css.span}>Outdated password</span>
              <div className={css.pwdInputWrapper}>
                <Field
                  type="text"
                  name="outdatedPwd"
                  placeholder="Password"
                  className={clsx(css.textInput, css.pwdInput)}
                />
                <button type="button" className={css.eyeBtn}>
                  <ReactSVG src={eyeClosed} />
                </button>
              </div>
            </label>
            <label className={css.pwdLabel}>
              <span className={css.span}>New password</span>
              <div className={css.pwdInputWrapper}>
                <Field
                  type="text"
                  name="newPwd"
                  placeholder="Password"
                  className={clsx(css.textInput, css.pwdInput)}
                />
                <button type="button" className={css.eyeBtn}>
                  <ReactSVG src={eyeClosed} />
                </button>
              </div>
            </label>
            <label className={css.pwdLabel}>
              <span className={css.span}>Repeat new password</span>
              <div className={css.pwdInputWrapper}>
                <Field
                  type="text"
                  name="repeatPwd"
                  placeholder="Password"
                  className={clsx(css.textInput, css.pwdInput)}
                />
                <button type="button" className={css.eyeBtn}>
                  <ReactSVG src={eyeClosed} />
                </button>
              </div>
            </label>
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
