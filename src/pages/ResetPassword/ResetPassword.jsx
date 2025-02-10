import { useDispatch } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';
import * as Yup from 'yup';
import { resetPassword } from '../../redux/auth/operations';
import AuthForm from '../../components/AuthForm/AuthForm';
import { SuccessToast, ErrorToast } from '../../utils/toasts';
import Container from '../../components/Container/Container';

const resetPasswordSchema = Yup.object({
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .max(64, 'Password must be less than 64 characters')
    .required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords must match')
    .required('Please confirm your password'),
});

const resetPasswordFields = [
  {
    name: 'password',
    type: 'password',
    label: 'Password',
    placeholder: 'Enter your password',
  },
  {
    name: 'confirmPassword',
    type: 'password',
    label: 'Confirm password',
    placeholder: 'Confirm password',
  },
];

const ResetPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');

  // Якщо немає токена, перенаправляємо на сторінку входу
  if (!token) {
    navigate('/signin');
    return null;
  }

  const handleSubmit = async values => {
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
    }
  };

  return (
    <main className="signInUpPages">
      <Container>
        <AuthForm
          title="Reset Password"
          subtitle="Write your new password"
          initialValues={{ password: '', confirmPassword: '' }}
          onSubmit={handleSubmit}
          validationSchema={resetPasswordSchema}
          fields={resetPasswordFields}
          btnText="Reset password"
        />
      </Container>
    </main>
  );
};

export default ResetPassword;
