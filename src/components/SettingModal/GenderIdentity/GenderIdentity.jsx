import { Field } from 'formik';
import css from './GenderIdentity.module.css';

const GenderIdentity = () => {
  return (
    <div>
      <h3 className={css.genderTtl}>Your gender identity</h3>
      <label style={{ cursor: 'pointer' }}>
        <Field
          type="radio"
          name="gender"
          value="female"
          style={{ cursor: 'pointer' }}
        />
        <span className={css.spanGender}>Female</span>
      </label>
      <label style={{ marginLeft: '24px', cursor: 'pointer' }}>
        <Field type="radio" name="gender" value="male" />
        <span className={css.spanGender}>Male</span>
      </label>
    </div>
  );
};

export default GenderIdentity;
