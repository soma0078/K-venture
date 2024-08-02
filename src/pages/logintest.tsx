import { useRouter } from 'next/router';

import useLogIn from '@/hooks/useLogin';
import { LogInForm } from '@/types/post/loginTypes';

export default function Login() {
  const isValid = true; // 임시로 true 지정
  const mutation = useLogIn();
  const router = useRouter();

  const onSubmit = (data: LogInForm) => {
    mutation.mutate(data, {
      onSuccess: () => {
        router.push('/'); // 로그인 성공 시 리다이렉트
      },
    });
  };

  return (
    <main className="align-center h-[600px] w-full">
      <form
        className="flex max-w-[640px] flex-col gap-[32px]"
        // NOTE: 테스트를 위해 일단 제가 만든 아이디로 넣었습니다.
        // 추후 hook-form 이랑 연결하면 될 것 같아요.
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit({ email: 's@s.com', password: 'ssssssss' });
        }}
      >
        <div className="grid gap-6">
          <div className="grid gap-[10px]">
            <label htmlFor="email">이메일</label>
            <input
              type="text"
              id="email"
              placeholder="이메일을 입력해 주세요"
            />
          </div>
          <div className="grid gap-[10px]">
            <label htmlFor="password">비밀번호</label>
            <input
              type="password"
              id="password"
              placeholder="비밀번호를 입력해 주세요"
            />
          </div>
        </div>
        <button
          disabled={!isValid || mutation.isPending}
          type="submit"
          className="btn-blue rounded-md py-[11px] font-kv-bold kv-text-lg"
        >
          로그인 하기
        </button>
      </form>
    </main>
  );
}
