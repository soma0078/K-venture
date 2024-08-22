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
        className="mr-2.5 h-8 w-8 rounded-full"
      />
      <span className="font-medium kv-text-md">{nickname}</span>
    </div>
  );
};

export default HeaderUserProfile;
