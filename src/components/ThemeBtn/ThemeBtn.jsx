import useTheme from '../ThemeContext/useTheme';
import css from './ThemeBtn.module.css';

const ThemeBtn = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button className={`${css.themeButton} button`} onClick={toggleTheme}>
      {theme === 'light' ? '🌙' : '☀️'}
    </button>
  );
};

export default ThemeBtn;
