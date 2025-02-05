import { Link } from 'react-router-dom';

import css from './LinkButton.module.css';

const LinkButton = ({ to, children }) => (
  <Link to={to} className={css.linkButton}>
    {children}
  </Link>
);

export default LinkButton;
