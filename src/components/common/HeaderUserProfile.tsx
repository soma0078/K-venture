import { useEffect, useState } from 'react';

interface HeaderUserProfileProps {
  profileImageUrl: string | null;
  nickname: string;
}

const HeaderUserProfile: React.FC<HeaderUserProfileProps> = ({
  profileImageUrl,
  nickname,
}) => {
  const DEFAULT_IMAGE = '/assets/icons/icon_profile.svg';
  const [imgSrc, setImgSrc] = useState(profileImageUrl || DEFAULT_IMAGE);

  const handleImgError = () => {
    setImgSrc(DEFAULT_IMAGE);
  };

  return (
    <div className="flex items-center">
      <img
        src={imgSrc}
        alt={`${nickname}의 프로필`}
        className="mr-2.5 h-8 w-8 rounded-full"
        onError={handleImgError}
      />
      <span className="font-medium kv-text-md">{nickname}</span>
    </div>
  );
};

export default HeaderUserProfile;
