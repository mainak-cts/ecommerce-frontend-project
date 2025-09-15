import { NavLink, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { SignUpFormSchema } from "../schema/forms";
import { zodResolver } from "@hookform/resolvers/zod";
import { handleSignUp } from "../shared/services/auth";
import { useState } from "react";
import Loading from "../components/Loading";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { GoogleLogin, type CredentialResponse } from "@react-oauth/google";
import { useLoginViaGoogle } from "../hooks/useLoginViaGoogle";

export default function Signup() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  type SignUpData = z.infer<typeof SignUpFormSchema>;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpData>({
    resolver: zodResolver(SignUpFormSchema),
    mode: "all",
  });
  const loginViaGoogle = useLoginViaGoogle();

  const handleFormSubmit = async (data: SignUpData) => {
    // Actual logic to be implemented
    console.log(data);
    try {
      setLoading(true);
      const res = await handleSignUp();
      console.log("Result: " + res);
      navigate("/login");
      Swal.fire({
        icon: "success",
        title: "Please login with your credentials",
        draggable: true,
      });
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const handleLoginViaGoogle = (credentialResponse: CredentialResponse) => {
    loginViaGoogle(credentialResponse);
  };

  return (
    <>
      <div className="register w-[400px] shadow-lg mt-8 mb-8 border border-blue-200 bg-gradient-to-br from-white to-blue-50 px-8 pt-8 pb-6 rounded-xl flex flex-col gap-4 justify-center">
        <form
          className="flex flex-col gap-2"
          onSubmit={handleSubmit(handleFormSubmit)}
        >
          <h1 className="text-center text-3xl text-blue-700 font-bold">
            Sign up
          </h1>
          <div className="name flex flex-col gap-1">
            <label htmlFor="name">Name</label>
            <input
              {...register("name")}
              className={`w-full py-1.5 px-2 border-2 ${
                errors.name
                  ? "border-red-500 focus:outline-red-300"
                  : "border-blue-400 focus:outline-blue-300"
              } rounded focus:outline-2`}
              type="text"
              name="name"
              id="name"
              placeholder="John Doe"
            />
            {errors.name && (
              <p className="text-red-600">{errors.name.message}</p>
            )}
          </div>
          <div className="email flex flex-col gap-1">
            <label htmlFor="email">Email</label>
            <input
              {...register("email")}
              className={`w-full py-1.5 px-2 border-2 ${
                errors.email
                  ? "border-red-500 focus:outline-red-300"
                  : "border-blue-400 focus:outline-blue-300"
              } rounded focus:outline-2`}
              type="email"
              name="email"
              id="email"
              placeholder="john@doe.com"
            />
            {errors.email && (
              <p className="text-red-600">{errors.email.message}</p>
            )}
          </div>
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
          <div className="confirm-password flex flex-col gap-1">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              {...register("confirmPassword")}
              type="password"
              name="confirmPassword"
              id="confirmPassword"
              className={`w-full py-1.5 px-2 border-2 ${
                errors.confirmPassword
                  ? "border-red-500 focus:outline-red-300"
                  : "border-blue-400 focus:outline-blue-300"
              } rounded focus:outline-2`}
            />
            {errors.confirmPassword && (
              <p className="text-red-600">{errors.confirmPassword.message}</p>
            )}
          </div>

          <button
            className="rounded p-2 cursor-pointer bg-blue-500 hover:bg-blue-600 transition-colors text-white flex justify-center items-center gap-2"
            type="submit"
          >
            {loading && <Loading width="5px" usedInBtn={true} />}
            Sign up
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
            Already have an account?
            <NavLink to="/login" className="underline hover:no-underline">
              Log in
            </NavLink>
          </div>
        </form>
      </div>
    </>
  );
}
