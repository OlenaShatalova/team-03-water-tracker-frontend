import { Field } from 'formik';
import css from './GenderIdentity.module.css';

const GenderIdentity = () => {
  return (
    <div>
      <h3 className={css.genderTtl}>Your gender identity</h3>
      <label>
        <Field type="radio" name="gender" value="woman" />
        <span className={css.spanGender}>Woman</span>
      </label>
      <label style={{ marginLeft: '24px' }}>
        <Field type="radio" name="gender" value="man" />
        <span className={css.spanGender}>Man</span>
      </label>
    </div>
  );
};

export default GenderIdentity;
