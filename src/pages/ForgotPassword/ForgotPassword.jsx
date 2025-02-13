import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import * as Yup from 'yup';

import { sendResetEmail } from '../../redux/auth/operations';

import Container from '../../components/Container/Container';
import AuthForm from '../../components/AuthForm/AuthForm';

import { SuccessToast } from '../../utils/successToast';
import { ErrorToast } from '../../utils/errorToast';
import LoaderFallback from '../../components/LoaderFallback/LoaderFallback';

const forgotPasswordSchema = Yup.object({
  email: Yup.string()
    .email('Enter a valid email')
    .required('Email is required'),
});

const forgotPasswordFields = [
  {
    name: 'email',
    type: 'email',
    label: 'Enter your email',
    placeholder: 'E-mail',
  },
];

const ForgotPassword = () => {
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (formValue, { resetForm }) => {
    setLoading(true);

    try {
      await dispatch(sendResetEmail(formValue.email)).unwrap();
      SuccessToast('Password reset instructions sent to your email');
      resetForm();
      navigate('/signin');
    } catch (error) {
      if (
        error.status === 404 ||
        error.message?.includes('not registered') ||
        error.message?.includes('not found')
      ) {
        ErrorToast('User with this email is not registered');
      } else {
        ErrorToast(error?.message || 'Failed to send reset instructions');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="signInUpPages">
      <Container>
        {loading ? (
          <LoaderFallback />
        ) : (
          <AuthForm
            title="Forgot Password?"
            initialValues={{ email: '' }}
            onSubmit={handleSubmit}
            validationSchema={forgotPasswordSchema}
            fields={forgotPasswordFields}
            btnText="Send Reset Link"
            linkTo="/signin"
            linkText="Back to Sign In"
          />
        )}
      </Container>
    </main>
  );
};

export default ForgotPassword;
