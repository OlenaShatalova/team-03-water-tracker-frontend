import * as Yup from 'yup';

import Container from '../../components/Container/Container';
import AuthForm from '../../components/AuthForm/AuthForm';

const loginSchema = Yup.object({
  email: Yup.string()
    .email('Enter a valid email')
    .required('Email is required'),
  password: Yup.string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters')
    .max(64, 'Password must be less than 64 characters'),
});

const loginFields = [
  {
    name: 'email',
    type: 'text',
    label: 'Email',
    placeholder: 'xxx@mail.com',
    autoFocus: 'autoFocus',
  },
  {
    name: 'password',
    type: 'password',
    label: 'Password',
    placeholder: 'xxxxxxxx',
  },
];

const SigninPage = () => {
  const handleSubmit = (formValue, formAction) => {
    console.log(formValue, formAction);
  };

  return (
    <main className="signBackground">
      <Container>
        <AuthForm
          title={'Sign In'}
          initialValues={{ email: '', password: '' }}
          onSubmit={handleSubmit}
          validationSchema={loginSchema}
          fields={loginFields}
          btnText={'Sign In'}
          linkTo={'/signup'}
          linkText={'Sing Up'}
        ></AuthForm>
      </Container>
    </main>
  );
};

export default SigninPage;
