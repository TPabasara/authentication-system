"use client";
import { useState } from "react";
import Link from "next/link";
import axios from "axios";

export default function LoginSignup() {
  const [signUpError, setSignUpError] = useState("");
  const [success, setSuccess] = useState("");
  const [flag1, setFlag1] = useState(false);
  const [flag2, setFlag2] = useState(false);

  function signUpData(formData: FormData) {
    const userEmail = formData.get("userEmail");
    const userPassword = formData.get("userPassword");
    const userConfirmPassword = formData.get("userConfirmPassword");

    const postData = {
      email: userEmail,
      password1: userPassword,
      password2: userConfirmPassword,
    }; //create a JSON object to send data to the backend

    axios
      .post("http://127.0.0.1:8000/signup/", postData)
      .then((responds) => {
        setFlag1(true); //set the flag to true if the signup is successful
        setSignUpError(`signed up successfully`); //If the server responds with a successful status code (200–299) set this success message to be displayed.
      })
      .catch((error) => {
        if (
          error.response &&
          error.response.data &&
          error.response.data.detail
        ) {
          setFlag1(false);
          setSignUpError(error.response.data.detail);
        } else {
          setFlag1(false);
          setSignUpError("Something went wrong try again");
        }
      }); //set the error message, if the backend returns 400 Bad Request, 422 Unprocessable Entity, or any other error accorodingly.
  }

  function signInData(formData: FormData) {
    const userEmail = formData.get("userEmail");
    const userPassword = formData.get("userPassword");

    const postData = {
      email: userEmail,
      password: userPassword,
    }; //create a JSON object to send data to the backend
    axios
      .post("http://127.0.0.1:8000/signin/", postData)
      .then((responds) => {
        setFlag2(true); //set the flag to true if the signup is successful
        setSuccess(`signed in successfully`); //If the server responds with a successful status code (200–299) set this success message to be displayed.
      })
      .catch((error) => {
        if (
          error.response &&
          error.response.data &&
          error.response.data.detail
        ) {
          setFlag2(false);
          setSuccess(error.response.data.detail);
        } else {
          setFlag2(false);
          setSuccess("Something went wrong try again");
        }
      });
  }

  const [login, setlogin] = useState(true);

  return (
    <div className="flex items-center justify-center h-screen bg-blue-600">
      <div className="w-1/5 h-auto flex flex-col items-center rounded-lg bg-white">
        {login ? (
          <h1 className="font-inter font-medium text-3xl mt-4">Login Form</h1>
        ) : (
          <h1 className="font-inter font-medium text-3xl mt-4">Signup Form</h1>
        )}
        <ul className="flex flex-row mt-4 border-1 rounded-lg w-3/4">
          <li className="text-lg flex items-center justify-center w-1/2 h-9">
            <button
              onClick={() => setlogin(true)}
              className={`w-full border-0 rounded-lg cursor-pointer h-full ${
                login ? "bg-blue-600 text-white" : "bg-white text-black"
              }`}
            >
              Login
            </button>
          </li>
          <li className="text-lg flex items-center justify-center w-1/2 h-9">
            <button
              onClick={() => setlogin(false)}
              className={`${
                !login ? "bg-blue-600 text-white" : "bg-white text-black"
              } w-full border-0  rounded-lg cursor-pointer h-full`}
            >
              Signup
            </button>
          </li>
        </ul>
        {login ? (
          <>
            <form className="flex flex-col w-3/4 mt-4" action={signInData}>
              <input
                type="email"
                name="userEmail"
                placeholder="Email Address"
                required
                className="border-1 rounded-lg mt-4 h-10 pl-2"
              />
              <input
                type="password"
                placeholder="Password"
                name="userPassword"
                minLength={8} //specify the minimum characters need to be entered in the password field
                required
                className="border-1 rounded-lg mt-4 h-10 pl-2"
              />
              <Link
                href="/auth/forgot-password"
                className="text-blue-600 mt-2 cursor-pointer hover:underline text-sm"
              >
                forgot password?
              </Link>
              <button
                type="submit"
                className="text-white bg-blue-600 w-full h-10 rounded-lg mt-4 cursor-pointer"
              >
                Login
              </button>
              {/*we can use button with type parameter instead of using input type submit*/}
            </form>

            <div
              className={`flex flex-row gap-1 items-start w-3/4 mt-4 ${
                !success && "mb-4"
              }`}
            >
              <p>Not a member?</p>
              <button
                onClick={() => setlogin(false)}
                className="text-blue-600 cursor-pointer hover:underline"
              >
                signup now
              </button>
            </div>
            {success && (
              <p
                className={`my-2 pl-2 text-xs ${
                  !flag2 && "text-red-500 bg-red-200"
                } text-green-500 bg-green-200 rounded-lg w-3/4 flex justify-center`}
              >
                {success}
              </p>
            )}
          </>
        ) : (
          <>
            <form className="flex flex-col w-3/4 mt-4" action={signUpData}>
              <input
                type="email"
                placeholder="Email Address"
                name="userEmail"
                className="border-1 rounded-lg mt-4 h-10 pl-2"
              />
              <input
                type="password"
                placeholder="Password"
                name="userPassword"
                minLength={8} //specify the minimum characters need to be entered in the password field
                required
                className="border-1 rounded-lg mt-4 h-10 pl-2"
              />
              <input
                type="password"
                placeholder="Confirm Password"
                name="userConfirmPassword"
                minLength={8}
                required
                className="border-1 rounded-lg mt-4 h-10 pl-2"
              />
              <button
                type="submit"
                className={`text-white bg-blue-600 mt-4 ${
                  !signUpError && "mb-7"
                } h-10 rounded-lg cursor-pointer`}
              >
                SignUp
              </button>
            </form>
            {signUpError && (
              <p
                className={`my-2 pl-2 text-xs ${
                  !flag1 && "text-red-500 bg-red-200"
                } text-green-500 bg-green-200  rounded-lg w-3/4 flex justify-center`}
              >
                {signUpError}
              </p>
            )}
          </>
        )}
      </div>
    </div>
  );
}
