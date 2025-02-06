import useTheme from '../ThemeContext/useTheme';
import css from './ThemeBtn.module.css';
import Icon from '../Icon/Icon.jsx'; // Import Icon component

const ThemeBtn = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button className={`${css.themeButton} button`} onClick={toggleTheme}>
      {theme === 'light' ? (
        <Icon
          name="icon-glass"
          width={16}
          height={16}
          color="black"
          className={css.icon}
        />
      ) : (
        <Icon
          name="icon-user"
          width={16}
          height={16}
          color="white"
          className={css.icon}
        />
      )}
    </button>
  );
};

export default ThemeBtn;

// 2. Використовуємо компонент ThemeBtn в App.jsx
// import useTheme from '../ThemeContext/useTheme';
// import Icon from '../Icon'; // Імпортуємо Icon
// import css from './ThemeBtn.module.css';

// const ThemeBtn = () => {
//   const { theme, toggleTheme } = useTheme();

//   return (
//     <button className={`${css.themeButton} button`} onClick={toggleTheme}>
//       {theme === 'light' ? (
//         <Icon name="moon" width={24} height={24} color="black" />
//       ) : (
//         <Icon name="sun" width={24} height={24} color="yellow" />
//       )}
//     </button>
//   );
// };

// export default ThemeBtn;
