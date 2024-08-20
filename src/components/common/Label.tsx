function Label({
  htmlFor,
  children,
  className = '',
  ...rest
}: React.LabelHTMLAttributes<HTMLLabelElement>) {
  return (
    <label
      htmlFor={htmlFor}
      className={`font-kv-medium kv-text-lg ${className}`}
      {...rest}
    >
      {children}
    </label>
  );
}

export default Label;
