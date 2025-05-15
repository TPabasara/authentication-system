"use client";

import axios from "axios";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ResetPassword() {
  const [error, setError] = useState("");
  const [flag1, setFlag1] = useState(false);
  const [flag2, setFlag2] = useState(false);
  const searchParams = useSearchParams(); //to get the value of querry parameter
  const user = searchParams.get("user");
  const router = useRouter();

  function Reset(formdata: FormData) {
    const password1 = formdata.get("password1");
    const password2 = formdata.get("password2");

    const SubmitData = {
      password1: password1,
      password2: password2,
    };

    //const params = new URLSearchParams(window.location.search);
    //const enableParem = params.get("user");

    console.log(user);
    axios
      .put(`http://127.0.0.1:8000/resetPassword/${user}`, SubmitData)
      .then((response) => {
        setFlag2(false);
        setFlag1(true);
        setError(response.data);
        router.push("/auth/login-signup");
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
          setError("Something went wrong try again");
        }
      });
  }
  return (
    <div className="bg-blue-600 flex items-center justify-center h-screen">
      <div className=" w-1/5 bg-white rounded-lg h-2/4 flex flex-col items-center">
        <p className="font-inter font-medium text-3xl mt-4">New Password</p>
        <p className="mt-2 text-sm h-10 flex items-center px-2">
          Enter your new password
        </p>
        <form className="flex flex-col w-3/4 mt-2" action={Reset}>
          <input
            type="password"
            placeholder="New Password"
            className="rounded-lg pl-2 border-1 mt-4 h-10"
            name="password1"
            minLength={8}
          />
          <input
            type="password"
            placeholder="Confirm Password"
            className="rounded-lg pl-2 border-1 mt-4 h-10"
            name="password2"
            minLength={8}
          />
          <button
            type="submit"
            className="bg-blue-600 text-white mt-4 h-10 rounded-lg cursor-pointer active:bg-blue-500"
          >
            Change
          </button>
        </form>
        {flag2 && (
          <p className="text-black items-start mt-2 w-3/4 rounded-lg h-10 bg-red-300 pl-2">
            {error}
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
