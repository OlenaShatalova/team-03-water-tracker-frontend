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
      <label className={css.label} style={{ position: 'relative' }}>
        <span>{label}</span>
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
          <span
            onClick={togglePasswordVisibility}
            style={{
              position: 'absolute',
              right: '8px',
              top: '75%',
              transform: 'translateY(-50%)',
              cursor: 'pointer',
              fontSize: '16px',
            }}
          >
            <ReactSVG src={showPassword ? eye : eyeSlash} />
          </span>
        )}
        <ErrorMessage name={name} component="span" className={css.error} />
      </label>
    </>
  );
};

export default Input;
