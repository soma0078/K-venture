function Button({
  type,
  children,
  className = '',
  onClick,
  disabled,
  ...rest
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const buttonStyle =
    'rounded-md bg-kv-gray-600 py-[11px] font-kv-bold text-white kv-text-lg';

  return (
    <button
      type={type}
      className={`${buttonStyle} ${className}`}
      onClick={onClick}
      disabled={disabled}
      {...rest}
    >
      {children}
    </button>
  );
}

export default Button;
