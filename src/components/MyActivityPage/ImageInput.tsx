import Image from 'next/image';
import { ChangeEvent, RefObject } from 'react';

interface ImageInputProps {
  name: string;
  inputRef: RefObject<HTMLInputElement>;
  onChange: (f: File) => void;
}

/* NOTE: 이미지 인풋을 입력받는 컴포넌트
 * onChange: 실제 폼에 입력 변화를 반영하기 위한 함수
 */
export default function ImageInput({
  name,
  inputRef,
  onChange,
}: ImageInputProps) {
  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    if (files === null || !files[0]) return;
    onChange(files[0]); // NOTE: 실제 폼 반영
  };

  return (
    <>
      <label
        htmlFor={name}
        className="btn-gray size-[167px] flex-col gap-[30px] rounded-2xl border-[1.5px] border-dashed pc:size-[180px] tablet:size-[206px]"
      >
        <div className="relative size-12">
          <Image src="/assets/icons/icon_plus.svg" alt="이미지 추가" fill />
        </div>
        <span className="text-kv-2xl text-kv-gray-4b">이미지 등록</span>
      </label>

      {/* 실제 인풋 받는 요소 */}
      <input
        className="hidden"
        id={name}
        type="file"
        accept="image/jpeg, image/png"
        onChange={handleImageChange}
        ref={inputRef}
      />
    </>
  );
}
