import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";
import Otp from "../components/Otp";
import { Bounce, toast } from "react-toastify";

const EmailSchema = z.object({
  email: z.email({ message: "Enter a valid email" }),
});

export default function ForgotPassword() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof EmailSchema>>({
    resolver: zodResolver(EmailSchema),
    mode: "all",
  });

  const [showOtp, setShowOtp] = useState(false);

  const handleEmailSubmit = () => {
    if (!errors.email) {
      toast.success("OTP sent to your email", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
        transition: Bounce,
      });
      setShowOtp(true);
    }
  };

  return (
    <>
      {showOtp ? (
        <Otp length={5} />
      ) : (
        <form
          className="w-[400px] shadow-lg mt-8 mb-8 border border-blue-200 bg-gradient-to-br from-white to-blue-50 px-8 pt-8 pb-6 rounded-xl flex flex-col gap-4 justify-center"
          onSubmit={handleSubmit(handleEmailSubmit)}
        >
          <h1 className="text-center text-3xl font-extrabold text-blue-700 mb-2">
            Enter your email
          </h1>
          <input
            {...register("email")}
            className={`w-full py-2 px-3 border-2 ${
              errors.email
                ? "border-red-500 focus:outline-red-300"
                : "border-blue-400 focus:outline-blue-300"
            } rounded-lg focus:outline-2 bg-white shadow-sm text-lg transition-all duration-150`}
            type="text"
            name="email"
            id="email"
            placeholder="john123@example.com"
          />
          {errors.email && (
            <p className="text-red-600 text-sm relative bottom-2">
              {errors.email.message}
            </p>
          )}
          <button className="rounded-lg py-2 px-5 cursor-pointer bg-blue-600 hover:bg-blue-700 transition-colors text-white font-semibold shadow focus:outline-none focus:ring-2 focus:ring-blue-400 mt-2">
            Send OTP
          </button>
        </form>
      )}
    </>
  );
}
