import ProfileForm from "@/components/profile/profile-form";
import { getLayout } from "@/components/layouts/layout";
import { useAuthState } from "@/context/auth.context";

const ProfilePage = () => {
  const { user } = useAuthState();
  return (
    <>
      <div className="w-full overflow-hidden px-1 pb-1">
        <div className="mb-8">
          <h1 className="flex justify-center my-4">Profile Page</h1>
          <ProfileForm user={user} />
        </div>
      </div>
    </>
  );
};

ProfilePage.authenticationRequired = true;

ProfilePage.getLayout = getLayout;
export default ProfilePage;
