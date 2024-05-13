import Button from "@/components/ui/button";
import Card from "@/components/ui//card";
import Input from "../ui/form/input";
import { useAuthAction } from "@/context/auth.context";
import { useRouter } from "next/router";

const ProfileForm = ({ user }: any) => {
  const { logout } = useAuthAction();
  const router = useRouter();
  const handleLogout = () => {
    logout();
    router.push("/");
  };
  return (
    <form>
      <>
        <div className="m-2 md:m-8 flex">
          <Card className="w-full bg-white">
            <div className="relative inline-flex flex-col mt-2 overflow-hidden border rounded border-border-100 ltr:mr-2 rtl:ml-2">
              <div className="flex items-center justify-center w-16 h-16 min-w-0 overflow-hidden">
                {/* eslint-disable */}
                <img src={user?.image} alt={user?.firstName} />
              </div>
            </div>
            <div className="mb-6 flex flex-row">
              <Input
                name="firstname"
                className="flex-1"
                label={"First Name"}
                value={user?.firstName}
              />
            </div>
            <div className="mb-6 flex flex-row">
              <Input
                name="lastname"
                className="flex-1"
                label={"Last Name"}
                value={user?.lastName}
              />
            </div>
            <div className="mb-6 flex flex-row">
              <Input
                name="email"
                className="flex-1"
                label={"Last Name"}
                value={user?.email}
              />
            </div>

            <div className="flex justify-between">
              <Button
                className="ltr:ml-auto rtl:mr-auto"
                // loading={isLoading}
                // disabled={isLoading}
                variant="outline"
              >
                Save
              </Button>
              <Button
                onClick={handleLogout}
                className="ltr:ml-auto rtl:mr-auto"
                // loading={isLoading}
                // disabled={isLoading}
                variant="outline"
              >
                Logout
              </Button>
            </div>
          </Card>
        </div>
      </>
    </form>
  );
};

export default ProfileForm;
