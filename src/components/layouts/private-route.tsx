import { useRouter } from "next/router";
import { BackArrowRound } from "@/components/ui/back-arrow-round";
import LoginView from "@/components/auth/login-form";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { useAuthAction, useAuthState } from "@/context/auth.context";
import { GetCurrentUser } from "@/service/service";
const Loader = dynamic(
  () => import("@/components/ui/loaders/spinner/spinner"),
  { ssr: false }
);

const PrivateRoute: React.FC<{ children?: React.ReactNode }> = ({
  children,
}) => {
  const router = useRouter();
  const [hasMounted, setHasMounted] = useState(false);
  const [isUser, setisUser] = useState(false);
  const { isAuthenticated, token } = useAuthState();
  const { logout } = useAuthAction();
  //useEffect to check Current User
  useEffect(() => {
    setHasMounted(true);
    if (token) {
      GetCurrentUser("/auth/me", token)
        .then((res: any) => {
          if (res.id) {
            setisUser(true);
          }
        })
        .catch((error) => {
          if (error?.status === 401) {
            logout();
          }
        });
    }
  }, [token]);
  //return login view if unauthoirzed
  if (!isUser && !isAuthenticated && hasMounted) {
    return (
      <div className="relative flex min-h-screen w-full justify-center py-5 md:py-8">
        <button
          className="absolute top-5 flex h-8 w-8 text-gray-200 transition-colors hover:text-gray-400   md:h-16 md:w-16 md:text-gray-300"
          onClick={router.back}
        >
          <BackArrowRound />
        </button>
        <div className="my-auto flex flex-col">
          <LoginView />
        </div>
      </div>
    );
  }
//return ChildPage if Suthoirzed
  if (isUser && isAuthenticated) {
    return <div>{children}</div>;
  }

  // Session is being fetched, or no user.
  // If no user, useEffect() will redirect.
  return <Loader showText={false} />;
};

export default PrivateRoute;
