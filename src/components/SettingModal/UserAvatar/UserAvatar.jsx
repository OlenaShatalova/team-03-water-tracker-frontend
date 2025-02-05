import css from "./UserAvatar.module.css";

const UserAvatar = () => {
  //   const getInitial = (name) => (name ? name.charAt(0).toUpperCase() : "?");

  return (
    <div className={css.userAvatar}>
      {/* {photo ? (
        <img src={photo} alt={`${name}'s avatar`} className={css.avatarImg} />
      ) : (
        <div className={css.avatarImg}>{getInitial(name)}</div>
      )} */}
    </div>
  );
};

export default UserAvatar;
