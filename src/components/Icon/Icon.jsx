import PropTypes from 'prop-types';

const Icon = ({ name, width = 24, height = 24, color = 'currentColor' }) => {
  return (
    <svg width={width} height={height} fill={color} className="icon">
      <use href={`/icons/icons.svg#${name}`} />
    </svg>
  );
};

Icon.propTypes = {
  name: PropTypes.string.isRequired,
  width: PropTypes.number,
  height: PropTypes.number,
  color: PropTypes.string,
  className: PropTypes.string,
};

export default Icon;
