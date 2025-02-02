import React from "react";
import styles from "./UserAuth.module.css";

const UserAuth = () => {
  return (
    <div className={styles.user}>
      <p className={styles.userName}>David</p>
      <img
        src="/src/assets/images/ellipse1.png"
        alt="avatar"
        width="28"
        height="28"
      />
      <img
        className={styles.svg}
        src="/src/assets/icons/jhh.svg"
        alt="jhh"
        width="16"
        height="16"
      />
    </div>
  );
};

export default UserAuth;
