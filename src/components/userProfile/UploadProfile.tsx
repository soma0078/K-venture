import Image from 'next/image';
import { ChangeEvent, useEffect, useState } from 'react';

import PenIcon from '@/assets/icons/icon_pen.svg';
import DefaultProfile from '@/assets/images/profile_default_img.png';

/**
 * NOTE: 프로필 이미지 입력받는 컴포넌트
 * onProfileUpload: 실제 폼에 입력 변화를 반영하기 위한 함수
 */

interface UploadProfileProps {
  initialProfile: string;
  onProfileUpload?: (url: string) => void;
}

export default function UploadProfile({
  onProfileUpload,
  initialProfile,
}: UploadProfileProps) {
  const [profileImage, setProfileImage] = useState<string>(
    initialProfile || DefaultProfile.src,
  );

  const handleProfileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // TODO: presined URL 생성
    const profileUrl = URL.createObjectURL(file);

    setProfileImage(profileUrl);
    // 실제 폼에 반영 (TODO: S3 업로드)
    // onProfileUpload(profileUrl);
  };

  useEffect(() => {
    return () => {
      if (profileImage) {
        URL.revokeObjectURL(profileImage);
      }
    };
  }, [profileImage]);

  useEffect(() => {
    setProfileImage(initialProfile);
  }, [initialProfile]);

  return (
    <div className="relative m-auto mb-6 h-40 w-40">
      <div className="relative h-40 w-40 overflow-hidden rounded-full shadow-lg">
        <Image
          src={profileImage}
          alt={`User.nickname의 프로필`}
          fill
          objectFit="cover"
        />
      </div>

      <label htmlFor="uploadProfile">
        <span className="absolute bottom-0 right-0 z-10 cursor-pointer rounded-full bg-kv-primary-blue p-2.5 transition-all hover:scale-110">
          <PenIcon />
        </span>
      </label>

      <input
        id="uploadProfile"
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleProfileChange}
      />
    </div>
  );
}
