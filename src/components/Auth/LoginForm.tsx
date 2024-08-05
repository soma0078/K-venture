import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/router';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';

import Button from '@/components/common/Button';
import ErrorText from '@/components/common/ErrorText';
import Input from '@/components/common/Input';
import Label from '@/components/common/Label';
import useLogIn from '@/hooks/useLogin';
import { LogInForm } from '@/types/post/loginTypes';

import PasswordInput from './PasswordInput';

const schema = yup.object().shape({
  email: yup
    .string()
    .trim()
    .matches(
      /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i,
      '잘못된 이메일입니다.',
    )
    .required('이메일을 입력해주세요'),
  password: yup
    .string()
    .min(8, '8자 이상 입력해주세요')
    .required('비밀번호를 입력해주세요'),
});

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<LogInForm>({ mode: 'onChange', resolver: yupResolver(schema) });
  const router = useRouter();

  const mutation = useLogIn();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    mutation.mutate(data, {
      onSuccess: () => {
        router.push('/'); // 로그인 성공 시 리다이렉트
      },
    });
  };

  return (
    <form
      className="flex w-[100%] flex-col gap-[32px]"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="grid gap-6">
        <div className="grid gap-[10px]">
          <Label htmlFor="email" className="flex flex-col gap-3">
            이메일
            <Input
              type="text"
              id="email"
              placeholder="이메일을 입력해 주세요"
              {...register('email')}
              validationCheck={!!errors.email}
            />
            {errors.email?.message && (
              <ErrorText>{errors.email?.message}</ErrorText>
            )}
          </Label>
        </div>
        <div className="grid gap-[10px]">
          <Label htmlFor="password" className="relative flex flex-col gap-3">
            비밀번호
            <PasswordInput
              id="password"
              placeholder="비밀번호를 입력해 주세요"
              {...register('password')}
              validationCheck={!!errors.password}
            />
          </Label>
          {errors.password && <ErrorText>{errors.password?.message}</ErrorText>}
        </div>
      </div>
      <Button
        disabled={!isValid || mutation.isPending}
        type="submit"
        className={`${!isValid || mutation.isPending ? 'bg-kv-gray-600 text-white' : 'bg-kv-primary-blue text-white'}`}
      >
        로그인 하기
      </Button>
    </form>
  );
}
