import classNames from 'classnames';

function Button({
  type,
  children,
  className = '',
  onClick,
  disabled,
  ...rest
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const baseClass = 'rounded-md py-[11px] font-kv-bold text-kv-lg';
  const combinedClassName = classNames(baseClass, className);

  return (
    <button
      type={type}
      className={combinedClassName}
      onClick={onClick}
      disabled={disabled}
      {...rest}
    >
      {children}
    </button>
  );
}

export default Button;
