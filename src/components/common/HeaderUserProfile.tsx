import Image from 'next/image';

interface HeaderUserProfileProps {
  profileImageUrl: string;
  nickname: string;
}

const HeaderUserProfile: React.FC<HeaderUserProfileProps> = ({
  profileImageUrl,
  nickname,
}) => {
  return (
    <div className="flex items-center">
      <div className="relative h-8 w-8 rounded-full">
        <Image
          fill
          objectFit="cover"
          src={profileImageUrl}
          alt={`${nickname}의 프로필`}
          className="absolute aspect-square rounded-full"
        />
      </div>
      <span className="ml-2.5 hidden font-medium kv-text-md pc:inline tablet:inline">
        {nickname}
      </span>
    </div>
  );
};

export default HeaderUserProfile;
