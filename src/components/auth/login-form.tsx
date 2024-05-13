import Logo from "@/components/ui/logo";
import Alert from "@/components/ui/alert";
import Input from "@/components/ui/form/input";
import PasswordInput from "@/components/ui/form/password-input";
import Button from "@/components/ui/button";
import * as yup from "yup";
import { useModalAction } from "@/components/ui/modal/modal.context";
import { useRouter } from "next/router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Login } from "@/service/service";
import { useAuthAction } from "@/context/auth.context";

type Inputs = {
  email: string;
  password: string;
};
//handle LoginSchema For Authenctication
const loginFormSchema = yup.object().shape({
  email: yup.string().required("Username Required"),
  password: yup.string().required("Password Required"),
});
function LoginForm() {
  const router = useRouter();
  const { login } = useAuthAction();
  const { closeModal } = useModalAction();

  const [serverError, setServerError] = useState<any>("");
  const [isLoading, setisLoading] = useState<boolean>(false);
  //useReactHook Form
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: yupResolver(loginFormSchema),
  });

  //handleLogin Submit
  const Submit = (values: Inputs) => {
    let object = {
      username: values.email,
      password: values.password,
      expiresInMins: 10,
    };
    setisLoading(true);
    Login("/auth/login", object)
      .then((res: any) => {
        //handle Success
        if (res?.token) {
          login(res.token, res);
          closeModal();
        }
        setisLoading(false);
      })
      .catch((error: any) => {
        //Error handle
        setServerError("Wrong Credentials");
        setisLoading(false);
      });
  };
  return (
    <>
      <Alert
        message={serverError}
        className="mb-6"
        closeable={true}
        onClose={() => setServerError(null)}
      />
      <form onSubmit={handleSubmit(Submit)} className="">
        <>
          <Input
            label={"Username"}
            {...register("email")}
            type="text"
            className="mb-5"
            error={errors.email?.message!}
          />
          <PasswordInput
            label={"Password"}
            {...register("password")}
            error={errors.password?.message!}
            className="mb-5"
          />
          <div className="mt-8">
            <Button
              className="h-11 w-full sm:h-12"
              loading={isLoading}
              disabled={isLoading}
              variant="outline"
            >
              {"Login"}
            </Button>
          </div>
        </>
      </form>
    </>
  );
}

export default function LoginView() {
  return (
    <div className="flex h-full min-h-screen w-screen flex-col justify-center bg-light py-6 px-5 sm:p-8 md:h-auto md:min-h-0 md:max-w-[480px] md:rounded-xl">
      <div className="flex justify-center">
        <Logo />
      </div>
      <p className="mt-4 mb-8 text-center text-sm text-body sm:mt-5 sm:mb-10 md:text-base">
        Login with Email and Password
      </p>
      <LoginForm />
    </div>
  );
}
