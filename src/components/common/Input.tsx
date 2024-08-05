import { forwardRef } from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  validationCheck?: boolean;
}

const INPUT_STYLE =
  'rounded-md border-2 border-kv-gray-600 px-5 py-4 font-kv-medium kv-text-lg';

export default forwardRef(function Input(
  { validationCheck, ...rest }: InputProps,
  ref: React.LegacyRef<HTMLInputElement>,
) {
  return (
    <input
      autoComplete="off"
      className={`${INPUT_STYLE} ${validationCheck ? '"bg-kv-red-light hover:bg-kv-red-light focus:border-kv-red focus:outline-none' : 'bg-white hover:bg-kv-blue-light hover:bg-opacity-[0.4] focus:border-kv-blue focus:outline-none'}`}
      ref={ref}
      {...rest}
    />
  );
});
