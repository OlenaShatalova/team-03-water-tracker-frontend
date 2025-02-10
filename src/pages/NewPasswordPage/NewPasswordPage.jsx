import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { resetPassword } from '../../redux/auth/operations';
import css from './NewPasswordPage.module.css';
import { SuccessToast, ErrorToast } from '../../utils/toasts';

const NewPasswordPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const [token, setToken] = useState(null);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const tokenFromUrl = searchParams.get('token');

    if (!tokenFromUrl) {
      navigate('/signin');
      return;
    }

    setToken(tokenFromUrl);
  }, [location, navigate]);

  const handleSubmit = async e => {
    e.preventDefault();

    if (password !== confirmPassword) {
      ErrorToast('Passwords do not match');
      return;
    }

    if (!token) {
      ErrorToast('Invalid reset token');
      return;
    }

    try {
      await dispatch(resetPassword({ password, token })).unwrap();
      SuccessToast('Password successfully reset');
      navigate('/signin');
    } catch (error) {
      ErrorToast(error?.message || 'Failed to reset password');
    }
  };

  return (
    <div className={css.pageWrapper}>
      <div className={css.container}>
        <h2 className={css.title}>Reset Password</h2>
        <p className={css.subtitle}>Write your new password</p>

        <form onSubmit={handleSubmit} className={css.form}>
          <div className={css.inputGroup}>
            <label className={css.label}>Password</label>
            <input
              type="password"
              className={css.input}
              placeholder="Enter your password"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </div>

          <div className={css.inputGroup}>
            <label className={css.label}>Confirm password</label>
            <input
              type="password"
              className={css.input}
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className={css.submitButton}
            disabled={!token || !password || !confirmPassword}
          >
            Reset password
          </button>
        </form>
      </div>
    </div>
  );
};

export default NewPasswordPage;
