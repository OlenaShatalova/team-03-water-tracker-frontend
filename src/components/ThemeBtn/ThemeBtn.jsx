import useTheme from '../ThemeContext/useTheme';
import { BsSun, BsMoon } from 'react-icons/bs';
import css from './ThemeBtn.module.css';

const ThemeBtn = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      className={css.themeButton}
      onClick={toggleTheme}
      aria-label="Toggle theme"
    >
      <span
        className={`${css.icon} ${theme === 'light' ? css.show : css.hide}`}
      >
        <BsSun />
      </span>
      <span className={`${css.icon} ${theme === 'dark' ? css.show : css.hide}`}>
        <BsMoon />
      </span>
    </button>
  );
};

export default ThemeBtn;
