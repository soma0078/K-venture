import { forwardRef } from 'react';
import { useToggle } from 'usehooks-ts';

import NoShowPasswordIcon from '@/assets/icons/icon_noshow_password.svg';
import ShowPasswordIcon from '@/assets/icons/icon_show_password.svg';
import { InputProps } from '@/components/common/Input';

const PasswordInput = forwardRef<HTMLInputElement, InputProps>(
  ({ validationCheck, ...rest }, ref) => {
    const [isShowPassword, toggle] = useToggle(false);
    return (
      <>
        <input
          type={isShowPassword ? 'text' : 'password'}
          autoComplete="off"
          className={`base-input pr-11 ${validationCheck ? 'border-kv-red focus:border-kv-red' : 'focus:border-kv-blue'}`}
          ref={ref}
          {...rest}
        />
        {isShowPassword ? (
          <ShowPasswordIcon onClick={toggle} className="password-icon" />
        ) : (
          <NoShowPasswordIcon onClick={toggle} className="password-icon" />
        )}
      </>
    );
  },
);

export default PasswordInput;
