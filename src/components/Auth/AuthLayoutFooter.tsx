import Link from 'next/link';
import { useRouter } from 'next/router';

export default function AuthLayoutFooter() {
  const router = useRouter();
  const isLoginPage = router.pathname === '/login';

  return (
    <span className="flex gap-3">
      {isLoginPage ? (
        <>
          <h3>회원이 아니신가요?</h3>
          <Link href="/signup" className="text-kv-primary-blue underline">
            회원가입하기
          </Link>
        </>
      ) : (
        <>
          <h3>회원이신가요?</h3>
          <Link href="/login" className="text-kv-primary-blue underline">
            로그인하기
          </Link>
        </>
      )}
    </span>
  );
}
