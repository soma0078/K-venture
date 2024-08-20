import EditProfileForm from '@/components/userProfile/EditProfileForm';

export default function ProfilePage() {
  return (
    <>
      <h2 className="mb-6 text-kv-3xl font-kv-bold pc:mb-8">내 정보</h2>
      <EditProfileForm />
    </>
  );
}
