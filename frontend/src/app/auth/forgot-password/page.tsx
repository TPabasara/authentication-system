"use client";
import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Fogot() {
  const [error, setError] = useState("");
  const [flag1, setFlag1] = useState(false);
  const [flag2, setFlag2] = useState(false);
  const router = useRouter();

  function handleOtpSend(formData: FormData) {
    const userEmail = formData.get("email");
    const postData = {
      email: userEmail,
    };
    axios
      .post(`${process.env.NEXT_PUBLIC_SERVER}/forgot-password/`, postData)
      .then((responds) => {
        setFlag2(false);
        setFlag1(true);
        setError(responds.data);
        router.push("/auth/otp-verification");
      })
      .catch((error) => {
        if (
          error.response &&
          error.response.data &&
          error.response.data.detail
        ) {
          setFlag1(false);
          setFlag2(true);
          setError(error.response.data.detail);
        } else {
          setFlag1(false);
          setFlag2(true);
          setError("Something went wrong.");
        }
      });
  }
  return (
    <div className="bg-blue-600 flex items-center justify-center h-screen">
      <div className="w-2/5 bg-white rounded-lg h-2/4 flex flex-col items-center">
        <p className="text-inter text-black font-medium text-3xl pt-2">
          Fogot Password
        </p>
        <p className="mt-2">
          Enter your email address and we will send you an OTP
        </p>
        <form className="flex flex-col w-3/4 mt-4" action={handleOtpSend}>
          <input
            type="email"
            className="border-black rounded-lg border-1 mt-4 h-10 pl-2"
            placeholder="Enter your email address"
            name="email"
          />
          <button className="rounded-lg bg-blue-600 text-white mt-4 h-10 cursor-pointer active:bg-blue-500">
            Continue
          </button>
        </form>
        {flag2 && (
          <p className="text-black items-start mt-2 w-3/4 rounded-lg h-10 bg-red-300 pl-2">
            {error}
            <span className="text-red-600">Try again</span>
          </p>
        )}
        {flag1 && (
          <p
            className="text-black items-start mt-2 w-3/4 rounded-lg h-10 bg-green-300
            pl-2"
          >
            {error}
          </p>
        )}
      </div>
    </div>
  );
}
