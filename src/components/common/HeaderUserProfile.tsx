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
      <img
        src={profileImageUrl}
        alt={`${nickname}의 프로필`}
        className="h-8 w-8 rounded-full"
      />
      <span className="ml-2.5 hidden font-medium kv-text-md pc:inline tablet:inline">
        {nickname}
      </span>
    </div>
  );
};

export default HeaderUserProfile;
