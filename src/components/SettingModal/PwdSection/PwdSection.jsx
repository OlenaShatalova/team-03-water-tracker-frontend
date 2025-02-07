import css from './PwdSection.module.css';

import Input from '../../Input/Input';

const PwdSection = ({ handleInputChange }) => {
  return (
    <div className={css.sectWrapper}>
      <h3 className={css.pwdTtl}>Password</h3>
      <Input
        type="password"
        name="outdatedPwd"
        label="Outdated password"
        placeholder="Password"
        onChange={handleInputChange}
      />
      <Input
        type="password"
        name="newPwd"
        label="New password"
        placeholder="Password"
        onChange={handleInputChange}
      />
      <Input
        type="password"
        name="repeatPwd"
        label="Repeat new password"
        placeholder="Password"
        onChange={handleInputChange}
      />
    </div>
  );
};

export default PwdSection;
