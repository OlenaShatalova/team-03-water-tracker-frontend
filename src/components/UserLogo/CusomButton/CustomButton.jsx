import Button from '@mui/material/Button';
import PropTypes from 'prop-types';

export default function CustomButton({ onClick, children }) {
  return (
    <Button variant="text" onClick={onClick}>
      {children}
    </Button>
  );
}

CustomButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};
