import { forwardRef } from 'react';

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  validationCheck?: boolean;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ validationCheck, ...rest }, ref) => {
    return (
      <input
        autoComplete="off"
        className={`base-input ${validationCheck ? 'border-kv-red focus:border-kv-red' : 'focus:border-kv-blue'}`}
        ref={ref}
        {...rest}
      />
    );
  },
);

export default Input;
