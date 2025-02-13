import useTheme from '../ThemeContext/useTheme';
import { BsSun, BsMoon } from 'react-icons/bs';
import css from './ThemeBtn.module.css';
import Container from '../Container/Container';

const ThemeBtn = () => {
  const { theme, toggleTheme } = useTheme();
  // console.log('Current theme:', theme);

  return (
    <Container>
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
        <span
          className={`${css.icon} ${theme === 'dark' ? css.show : css.hide}`}
        >
          <BsMoon />
        </span>
      </button>
    </Container>
  );
};

export default ThemeBtn;
