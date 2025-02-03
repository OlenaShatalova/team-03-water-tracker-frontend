import css from './Title.module.css';

const Title = ({ children }) => <h2 className={css.title}>{children}</h2>;
export default Title;
