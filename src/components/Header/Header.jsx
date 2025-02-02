import React from "react";
import Logo from "../Logo/Logo"; // Підключаємо Logo
import UserAuth from "../UserAuth/UserAuth"; // Підключаємо UserAuth
import styles from "./Header.module.css";

const Header = () => {
  return (
    <header>
      <nav className={styles.header}>
        <Logo /> {/* Компонент логотипу */}
        <UserAuth /> {/* Компонент авторизації */}
      </nav>
    </header>
  );
};

export default Header;
