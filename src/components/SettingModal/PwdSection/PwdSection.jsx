import { Field } from 'formik';

import css from './PwdSection.module.css';

import { ReactSVG } from 'react-svg';
import eyeClosed from '../../../assets/icons/eyeClosed.svg';

const PwdSection = () => {
  return (
    <div className={css.sectWrapper}>
      <h3>Password</h3>
      <label>
        <span className={css.span}>Outdated password</span>
        <div className={css.pwdInputWrapper}>
          <Field
            type="text"
            name="outdatedPwd"
            placeholder="Password"
            className={css.pwdInput}
          />
          <button type="button" className={css.eyeBtn}>
            <ReactSVG src={eyeClosed} />
          </button>
        </div>
      </label>
      <label>
        <span className={css.span}>New password</span>
        <div className={css.pwdInputWrapper}>
          <Field
            type="text"
            name="newPwd"
            placeholder="Password"
            className={css.pwdInput}
          />
          <button type="button" className={css.eyeBtn}>
            <ReactSVG src={eyeClosed} />
          </button>
        </div>
      </label>
      <label>
        <span className={css.span}>Repeat new password</span>
        <div className={css.pwdInputWrapper}>
          <Field
            type="text"
            name="repeatPwd"
            placeholder="Password"
            className={css.pwdInput}
          />
          <button type="button" className={css.eyeBtn}>
            <ReactSVG src={eyeClosed} />
          </button>
        </div>
      </label>
    </div>
  );
};

export default PwdSection;
