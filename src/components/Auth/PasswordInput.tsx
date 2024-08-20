import { forwardRef } from 'react';
import { useToggle } from 'usehooks-ts';

import NoShowPasswordIcon from '@/assets/icons/icon_noshow_password.svg';
import ShowPasswordIcon from '@/assets/icons/icon_show_password.svg';

interface PasswordInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  validationCheck?: boolean;
}

const PASSWORD_INPUT_STYLE =
  'relative rounded-md border-2 border-kv-gray-600 px-5 py-4 font-kv-medium kv-text-lg';

export default forwardRef(function PasswordInput(
  { validationCheck, ...rest }: PasswordInputProps,
  ref: React.LegacyRef<HTMLInputElement>,
) {
  const [isShowPassword, toggle] = useToggle(false);
  return (
    <>
      <input
        type={isShowPassword ? 'text' : 'password'}
        autoComplete="off"
        className={`${PASSWORD_INPUT_STYLE} ${validationCheck ? 'bg-kv-red-light hover:bg-kv-red-light focus:border-kv-red focus:outline-none' : 'bg-white hover:bg-kv-blue-light hover:bg-opacity-[0.4] focus:border-kv-blue focus:outline-none'}`}
        ref={ref}
        {...rest}
      />
      {isShowPassword ? (
        <ShowPasswordIcon
          onClick={toggle}
          className="absolute right-2 top-[60px]"
        />
      ) : (
        <NoShowPasswordIcon
          onClick={toggle}
          className="absolute right-2 top-[60px]"
        />
      )}
    </>
  );
});
