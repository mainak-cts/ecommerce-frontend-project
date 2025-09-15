import { Link, NavLink } from "react-router-dom";
import { useLogin } from "../hooks/useLogin";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Loading from "../components/Loading";
import type { AxiosError } from "axios";
import type z from "zod";
import { LoginFormSchema } from "../schema/forms";
import type { LoginData } from "../shared/types/auth";
import { Bounce, toast } from "react-toastify";
import { GoogleLogin, type CredentialResponse } from "@react-oauth/google";
import { useLoginViaGoogle } from "../hooks/useLoginViaGoogle";

export default function Login() {
  const { mutate, isPending, reset, isError, error } = useLogin();
  const loginViaGoogle = useLoginViaGoogle();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof LoginFormSchema>>({
    resolver: zodResolver(LoginFormSchema),
    mode: "all",
  });

  const handleFormSubmit = async (data: LoginData) => {
    mutate(data);
  };

  const handleLoginViaGoogle = (credentialResponse: CredentialResponse) => {
    loginViaGoogle(credentialResponse);
  };

  if (isError) {
    toast.error(
      `${
        ((error as AxiosError).response?.data as { message?: string })?.message
      }`,
      {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
        transition: Bounce,
      }
    );
    reset(); // Reset error state
  }

  return (
    <>
      <div className="login w-[400px] shadow-lg mt-8 mb-8 border border-blue-200 bg-gradient-to-br from-white to-blue-50 px-8 pt-8 pb-6 rounded-xl flex flex-col gap-4 justify-center">
        <form
          className="flex flex-col gap-2"
          onSubmit={handleSubmit(handleFormSubmit)}
        >
          <h1 className="text-center text-3xl text-blue-700 font-bold">
            Log in
          </h1>
          <div className="username flex flex-col gap-1">
            <label htmlFor="username">Username</label>
            <input
              {...register("username")}
              className={`w-full py-1.5 px-2 border-2 ${
                errors.username
                  ? "border-red-500 focus:outline-red-300"
                  : "border-blue-400 focus:outline-blue-300"
              } rounded focus:outline-2`}
              type="text"
              name="username"
              id="username"
              placeholder="john123"
            />
            {errors.username && (
              <p className="text-red-600">{errors.username.message}</p>
            )}
          </div>
          <div className="password flex flex-col gap-1">
            <label htmlFor="password">Password</label>
            <input
              {...register("password")}
              type="password"
              name="password"
              id="password"
              className={`w-full py-1.5 px-2 border-2 ${
                errors.password
                  ? "border-red-500 focus:outline-red-300"
                  : "border-blue-400 focus:outline-blue-300"
              } rounded focus:outline-2`}
            />
            {errors.password && (
              <p className="text-red-600">{errors.password.message}</p>
            )}
          </div>
          <div className="forgot-password flex flex-row-reverse text-[0.85rem] underline hover:no-underline">
            <Link to="/forgot-password">Forgot password?</Link>
          </div>
          <button
            className="rounded p-2 cursor-pointer bg-blue-500 hover:bg-blue-600 transition-colors text-white flex justify-center items-center gap-2"
            type="submit"
          >
            {isPending && <Loading width="5px" usedInBtn={true} />}
            Login
          </button>
          <div className="flex">
            <GoogleLogin
              onSuccess={(credentialResponse) => {
                handleLoginViaGoogle(credentialResponse);
              }}
              onError={() => {
                toast.error("Something went wrong!");
              }}
              width="335px"
            />
          </div>
          <div className="flex justify-center mt-2 gap-2 text-[0.85rem]">
            Don't have an account?{" "}
            <NavLink to="/register" className="underline hover:no-underline">
              Sign up
            </NavLink>
          </div>
        </form>
      </div>
    </>
  );
}
