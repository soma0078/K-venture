import Image from 'next/image';
import { ChangeEvent, useRef } from 'react';

interface ImageInputProps {
  disabled: boolean;
  onChange: (f: File) => void;
}

/* NOTE: 이미지 인풋을 입력받는 컴포넌트
 * onChange: 실제 폼에 입력 변화를 반영하기 위한 함수
 */
export default function ImageInput({ disabled, onChange }: ImageInputProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChangeImage = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;
    onChange(file); // 실제 폼 반영
    const inputNode = inputRef.current as HTMLInputElement;
    inputNode.value = ''; // input 비우기
  };

  return (
    <label
      className={`${disabled ? 'bg-kv-gray-300 align-center' : 'btn-gray'} size-my-act-img flex-col gap-[30px] rounded-2xl border-[1.5px] border-dashed`}
    >
      <div className="relative size-12">
        <Image src="/assets/icons/icon_plus.svg" alt="이미지 추가" fill />
      </div>
      <span className="text-kv-2xl text-kv-gray-4b">이미지 등록</span>

      {/* 실제 인풋 받는 요소 */}
      <input
        className="hidden"
        type="file"
        accept="image/jpeg, image/png"
        onChange={handleChangeImage}
        ref={inputRef}
        disabled={disabled}
      />
    </label>
  );
}
