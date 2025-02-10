// import { useEffect, useState } from 'react';
// import { ErrorMessage, Field } from 'formik';
// import { ReactSVG } from 'react-svg';

// import eye from '../../assets/icons/eye.svg';
// import eyeSlash from '../../assets/icons/eyeSlash.svg';

// import css from './Input.module.css';

// const Input = ({ type = 'text', name, label, placeholder, autoFocus }) => {
//   const [showPassword, setShowPassword] = useState(false);
//   const [inputValue, setInputValue] = useState(''); // Зберігає реальне значення введеного тексту
//   const [displayValue, setDisplayValue] = useState(''); // Для відображення тексту або зірочок

//   // const { errors } = useFormikContext();
//   // const hasError = errors[name];

//   const isPwdField = type === 'password';

//   useEffect(() => {
//     if (isPwdField) {
//       setDisplayValue(
//       showPassword ? inputValue : '*'.repeat(inputValue.length));
//     }
//   }, [showPassword, inputValue, isPwdField]);

//   const togglePasswordVisibility = () => {
//     setShowPassword(!showPassword);
//   };

//   const handleInputChange = evt => {
//     const value = evt.target.value;
//     setInputValue(value); // Оновлюємо реальне значення
//     // console.log(inputValue);

//     // Якщо пароль прихований, показуємо зірочки, якщо відкритий - текст
//     if (isPwdField && !showPassword) {
//       setDisplayValue('*'.repeat(value.length)); // Маскуємо зірочками
//     } else {
//       setDisplayValue(value); // Показуємо введене значення як текст
//     }
//   };
//   // hasError && css.errorLabel
//   return (
//     <>
//       <label className={css.label}>
//         <span>{label}</span>
//         <div style={{ position: 'relative', width: '100%' }}>
//           <Field
//             type="text"
//             name={name}
//             placeholder={placeholder}
//             className={css.input}
//             autoFocus={autoFocus}
//             value={displayValue} // Відображаємо або текст, або зірочки
//             onChange={handleInputChange} // Оновлюємо значення при зміні
//             // autoComplete={name}
//           />
//           {/* Іконка для перемикання видимості пароля */}
//           {isPwdField && (
//             <span onClick={togglePasswordVisibility} className={css.iconEye}>
//               <ReactSVG
//                 style={{ height: '20px' }}
//                 src={showPassword ? eye : eyeSlash}
//               />
//             </span>
//           )}
//         </div>
//         <ErrorMessage name={name} component="span" className={css.error} />
//       </label>
//     </>
//   );
// };

// export default Input;import { useState } from 'react';import { useState } from 'react';
import { useState } from 'react';
import { useField } from 'formik';
import { ReactSVG } from 'react-svg';

import eye from '../../assets/icons/eye.svg';
import eyeSlash from '../../assets/icons/eyeSlash.svg';

import css from './Input.module.css';

const Input = ({ type = 'text', name, label, placeholder, autoFocus }) => {
  const [field, meta] = useField(name);
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(prev => !prev);
  };

  return (
    <>
      <label className={css.label}>
        <span>{label}</span>
        <div style={{ position: 'relative', width: '100%' }}>
          <input
            {...field}
            type={type === 'password' && showPassword ? 'text' : type}
            placeholder={placeholder}
            className={`${css.input} ${
              meta.touched && meta.error ? css.inputError : ''
            }`}
            autoFocus={autoFocus}
          />
          {type === 'password' && (
            <span onClick={togglePasswordVisibility} className={css.iconEye}>
              <ReactSVG src={showPassword ? eye : eyeSlash} />
            </span>
          )}
        </div>
        {meta.touched && meta.error && (
          <span className={css.error}>{meta.error}</span>
        )}
      </label>
    </>
  );
};

export default Input;
