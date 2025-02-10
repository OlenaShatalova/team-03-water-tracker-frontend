import { Formik, Form } from 'formik';

import Title from '../Title/Title';
import Input from '../Input/Input';
import LinkButton from '../LinkButton/LinkButton';
import { Link } from 'react-router-dom';

import css from './AuthForm.module.css';

const AuthForm = ({
  title,
  initialValues,
  onSubmit,
  validationSchema,
  fields,
  btnText,
  linkTo,
  linkText,
  showForgotPassword = false,
}) => {
  return (
    <div className={css.signContainer}>
      <Title>{title}</Title>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values, actions) => {
          onSubmit(values, actions);
        }}
      >
        <Form className={css.form}>
          {fields.map(field => (
            <Input key={field.name} {...field} />
          ))}

          <button type="submit" className={css.submitBtn}>
            {btnText}
          </button>
        </Form>
      </Formik>
      {showForgotPassword && (
        <Link to="/forgot-password" className={css.forgotLink}>
          Forgot password?
        </Link>
      )}

      <LinkButton to={linkTo}>{linkText}</LinkButton>
    </div>
  );
};

export default AuthForm;
