import classNames from 'classnames';
import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
}

export default function Button({
  type,
  children,
  className = '',
  onClick,
  disabled,
  ...rest
}: ButtonProps) {
  return (
    <button
      type={type}
      className={classNames('base-button-default', className)}
      onClick={onClick}
      disabled={disabled}
      {...rest}
    >
      {children}
    </button>
  );
}
