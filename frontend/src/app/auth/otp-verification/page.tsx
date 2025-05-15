"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Verify() {
  const [error, setError] = useState("");
  const [flag1, setFlag1] = useState(false);
  const [flag2, setFlag2] = useState(false);
  const router = useRouter();

  function otpVerify(formData: FormData) {
    const otp1 = formData.get("otp");
    const submitData = {
      otp: otp1, //this should be the name exacly in the back end schemas.
    };
    axios
      .post("http://127.0.0.1:8000/otp/", submitData)
      .then((response) => {
        setFlag2(false);
        setFlag1(true);
        //const params = new URLSearchParams(window.location.search); //this will creat the object of URLSearchParams
        //params.set("user", response.data); //this will set the params
        router.push(`/auth/reset-password?user=${response.data}`); //this will replace the url and navigate to the reset-password page.
        setError("Successfully verified");
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
    <div className="flex flex-col items-center justify-center h-screen bg-blue-600">
      <div className="w-1/5 h-2/4 flex flex-col items-center rounded-lg bg-white">
        <p className="font-inter font-medium text-3xl mt-4">OTP Verification</p>
        <p className="mt-2 text-sm">Enter the OTP sent to your email</p>
        <form className="flex flex-col w-3/4 mt-4" action={otpVerify}>
          <input
            type="text"
            placeholder="Enter OTP"
            className="border-1 rounded-lg mt-4 h-10 pl-2"
            name="otp"
          />
          <button
            type="submit"
            className="text-white bg-blue-600 w-full h-10 rounded-lg mt-4 cursor-pointer active:bg-blue-500"
          >
            Verify
          </button>
        </form>
        <p className="mt-5">Don't receive OTP code?</p>
        <Link href="\auth\forgot-password">
          <p className="text-sm cursor-pointer hover:underline mt-2 text-blue-600">
            Resend Code
          </p>
        </Link>
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
