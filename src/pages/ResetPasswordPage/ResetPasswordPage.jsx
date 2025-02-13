import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';
import { resetPassword } from '../../redux/auth/operations';
import Container from '../../components/Container/Container';
import AuthForm from '../../components/AuthForm/AuthForm';
import { SuccessToast } from '../../utils/successToast';
import { ErrorToast } from '../../utils/errorToast';
import { useState } from 'react';
import LoaderFallback from '../../components/LoaderFallback/LoaderFallback';

const resetPasswordSchema = Yup.object({
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .max(64, 'Password must be less than 64 characters')
    .matches(
      /^[A-Za-z0-9!@#$%^&*()_+=\-[\]{};:'"\\|,.<>/?]*$/,
      'Password can only contain Latin letters, numbers and special characters'
    )
    .required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords must match')
    .required('Confirm password is required'),
});

const resetPasswordFields = [
  {
    name: 'password',
    type: 'password',
    label: 'New Password',
    placeholder: 'Enter new password',
  },
  {
    name: 'confirmPassword',
    type: 'password',
    label: 'Confirm Password',
    placeholder: 'Confirm new password',
  },
];

const ResetPasswordPage = () => {
  const [loading, setLoading] = useState(false);

  const { token } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async values => {
    setLoading(true);

    try {
      await dispatch(
        resetPassword({
          password: values.password,
          token,
        })
      ).unwrap();

      SuccessToast('Password successfully reset');
      navigate('/signin');
    } catch (error) {
      ErrorToast(error?.message || 'Failed to reset password');
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
            title="Reset Password"
            initialValues={{ password: '', confirmPassword: '' }}
            onSubmit={handleSubmit}
            validationSchema={resetPasswordSchema}
            fields={resetPasswordFields}
            btnText="Reset Password"
          />
        )}
      </Container>
    </main>
  );
};

export default ResetPasswordPage;
