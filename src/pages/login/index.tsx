import { SubmitHandler, useForm } from 'react-hook-form';

import Button from '@/components/common/Button';
import ErrorText from '@/components/common/ErrorText';
import Input from '@/components/common/Input';
import Label from '@/components/common/Label';

interface LoginProps {
  email: string;
  password: string;
}
const onSubmit: SubmitHandler<LoginProps> = () => {};
const EMAIL_REGEX = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i;

export default function Login() {
  const {
    register,
    setError,
    handleSubmit,
    formState: { isSubmitting, errors, isValid },
  } = useForm<LoginProps>({ mode: 'onChange' });

  return (
    <form
      className="mx-auto mt-[118px] flex max-w-[640px] flex-col gap-[32px]"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="grid gap-6">
        <div className="grid gap-[10px]">
          <Label htmlFor="email">이메일</Label>
          <Input
            type="text"
            id="email"
            placeholder="이메일을 입력해 주세요"
            {...register('email', {
              required: '잘못된 이메일입니다.',
              pattern: {
                value: EMAIL_REGEX,
                message: '잘못된 이메일입니다.',
              },
            })}
            validationCheck={!!errors.email}
          />
          {errors.email?.message && (
            <ErrorText>{errors.email?.message}</ErrorText>
          )}
        </div>
        <div className="grid gap-[10px]">
          <Label htmlFor="password">비밀번호</Label>
          <Input
            type="password"
            id="password"
            placeholder="비밀번호를 입력해 주세요"
            {...register('password', {
              required: '8자 이상 작성해 주세요',
              minLength: {
                value: 8,
                message: '8자 이상 작성해 주세요',
              },
            })}
            validationCheck={!!errors.password}
          />
          {errors.password && <ErrorText>{errors.password?.message}</ErrorText>}
        </div>
      </div>
      <Button
        disabled={!isValid || isSubmitting}
        type="submit"
        className={`${!isValid || isSubmitting ? 'bg-kv-gray-600' : 'bg-kv-primary-blue'}`}
      >
        로그인 하기
      </Button>
    </form>
  );
}
