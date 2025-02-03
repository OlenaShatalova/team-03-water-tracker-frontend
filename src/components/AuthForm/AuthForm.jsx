import { Formik, Form } from 'formik';

import Title from '../Title/Title';
import Input from '../Input/Input';
import LinkButton from '../LinkButton/LinkButton';

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
}) => {
  return (
    <>
      <Title>{title}</Title>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
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
      <LinkButton to={linkTo}>{linkText}</LinkButton>
    </>
  );
};

export default AuthForm;
