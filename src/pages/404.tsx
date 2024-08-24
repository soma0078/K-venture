import Image from 'next/image';
import Link from 'next/link';

export default function ErrorPage() {
  return (
    <div className="relative top-[120px] h-full w-full">
      <div className="flex-col px-8 text-lg align-center">
        <h3>죄송합니다. 현재 찾을 수 없는 페이지를 요청 하셨습니다.</h3>
        <p>
          페이지의 주소가 잘못 입력되었거나, 주소가 변경 혹은 삭제되어 요청하신
          페이지를 찾을 수 없습니다.
        </p>
      </div>
      <Link
        href="/"
        className="m-auto mt-4 max-w-32 rounded-lg bg-kv-primary-blue px-7 py-3 font-medium text-white align-center hover:bg-kv-primary-blue-hover"
      >
        메인으로
      </Link>
      <div className="relative h-[540px] overflow-hidden">
        <div className="relative h-[600px] w-full align-center">
          <Image
            src="/assets/images/blue_wave.png"
            alt="blue wave"
            className="absolute animate-float opacity-80"
            fill
            objectFit="cover"
          />
          <h2 className="absolute top-40 animate-floatTop text-9xl font-semibold text-kv-gray-800">
            404
          </h2>
          <Image
            src="/assets/images/red_wave.png"
            alt="red wave"
            className="absolute animate-floatBottom opacity-80"
            fill
            objectFit="cover"
          />
        </div>
      </div>
    </div>
  );
}
