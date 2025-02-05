import { useState } from 'react';
import { Field, ErrorMessage } from 'formik';
import { ReactSVG } from 'react-svg';

import eye from '../../assets/icons/eye.svg';
import eyeSlash from '../../assets/icons/eyeSlash.svg';

import css from './Input.module.css';

const Input = ({ type = 'text', name, label, placeholder, autoFocus }) => {
  const [showPassword, setShowPassword] = useState();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const inputType = type === 'password' && showPassword ? 'text' : type;

  return (
    <>
      <label className={css.label}>
        <span>{label}</span>
        <div style={{ position: 'relative', width: '100%' }}>
          <Field
            type={inputType}
            name={name}
            placeholder={placeholder}
            className={css.input}
            autoFocus={autoFocus}
            // autoComplete={name}
          />
          {/* Іконка для перемикання видимості пароля */}
          {type === 'password' && (
            <span onClick={togglePasswordVisibility} className={css.iconEye}>
              <ReactSVG
                style={{ height: '20px' }}
                src={showPassword ? eye : eyeSlash}
              />
            </span>
          )}
        </div>
        <ErrorMessage name={name} component="span" className={css.error} />
      </label>
    </>
  );
};

export default Input;
