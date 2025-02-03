const Icon = ({
  name,
  width = 24,
  height = 24,
  color = "currentColor",
  className,
  ariaLabel,
}) => {
  return (
    <svg
      width={width}
      height={height}
      fill={color}
      className={className}
      role="img"
      aria-label={ariaLabel || name}
    >
      <use xlinkHref={`/assets/images/icons.svg#icon-${name}`} />
    </svg>
  );
};

export default Icon;
