import React from "react";
import { useNavigate } from "react-router-dom";
import { Bounce, toast } from "react-toastify";

export default function Otp({ length }: { length: number }) {
  const [otp, setOtp] = React.useState(new Array(length).fill(""));
  const ref = React.useRef<Array<HTMLInputElement | null>>([]);
  const navigate = useNavigate();

  React.useEffect(() => {
    ref.current[0]?.focus();
  }, []);

  const handleChange = (element: HTMLInputElement, index: number) => {
    if (isNaN(Number(element.value))) return false;
    if (element.value.length > 1) return false;

    const newOtp = [...otp];
    newOtp[index] = element.value;
    ref.current[index + 1]?.focus();
    setOtp(newOtp);
    return true;
  };

  const handleDeleteOtp = (e: React.KeyboardEvent, index: number) => {
    if (e.key === "Backspace" && !otp[index] && index !== 0) {
      ref.current[index - 1]?.focus();
      const newOtp = [...otp];
      newOtp[index - 1] = "";
      setOtp(newOtp);
    }
  };

  const handleVerifyOtp = () => {
    const enteredOtp = otp.join("");
    if (enteredOtp.length !== length) {
      toast.error("Please enter complete OTP", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
        transition: Bounce,
      });
    } else if (enteredOtp === "7".repeat(length)) {
      toast.success("OTP verified successfully", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
        transition: Bounce,
      });
      navigate("/login");
    } else {
      toast.error("Invalid OTP. Please try again.", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
        transition: Bounce,
      });
    }
  };

  const handleResendOtp = () => {
    setOtp(new Array(length).fill(""));
    ref.current[0]?.focus();

    toast.success("A new OTP has been sent to your email.", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      theme: "colored",
      transition: Bounce,
    });
  };

  return (
    <div className="flex flex-col gap-6 shadow-lg mt-6 mb-6 border border-blue-200 bg-gradient-to-br from-white to-blue-50 px-8 pt-8 pb-6 rounded-xl max-w-md mx-auto">
      <h1 className="text-3xl font-extrabold text-blue-700 text-center tracking-tight mb-2">
        Enter your OTP
      </h1>
      <div className="otp flex justify-center gap-3 mb-2">
        {otp.map((value, index) => (
          <input
            key={index}
            type="text"
            value={value}
            onChange={(e) => handleChange(e.target, index)}
            className="w-14 h-14 font-semibold border-2 border-blue-300 rounded-lg text-center mx-1 outline-none focus:ring-2 focus:ring-blue-400 text-[1.7rem] bg-white shadow-sm transition-all duration-150"
            onKeyDown={(e) => handleDeleteOtp(e, index)}
            ref={(el) => {
              ref.current[index] = el;
            }}
            maxLength={1}
            autoComplete="off"
          />
        ))}
      </div>
      <div className="flex justify-between w-full mt-4 gap-4">
        <button
          className="rounded-lg px-5 py-2 cursor-pointer bg-blue-500 hover:bg-blue-700 transition-colors text-white font-semibold shadow focus:outline-none focus:ring-2 focus:ring-blue-400"
          onClick={handleResendOtp}
        >
          Resend OTP
        </button>
        <button
          className="rounded-lg px-5 py-2 cursor-pointer bg-amber-500 hover:bg-amber-600 transition-colors text-white font-semibold shadow focus:outline-none focus:ring-2 focus:ring-amber-400"
          onClick={handleVerifyOtp}
        >
          Verify OTP
        </button>
      </div>
    </div>
  );
}
