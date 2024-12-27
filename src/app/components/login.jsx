
import React from "react";
import { useUserAuth } from "../_utils/auth-context";
import { useRouter } from "next/navigation";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../_utils/firebase";

export default function Login() {
  const router = useRouter();
  const {user, signIn, signOut} = useUserAuth();

  const handleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      router.push("/profile"); // Redirect after login
    } catch (error) {
      console.error("Login failed:", error.message);
    }
  };

  const register = () => {
    router.push("/register");
  }

  return (
    <div className="flex h-screen">
      {/* Left Comic Image Section */}
      <div
        className="hidden lg:flex lg:w-2/3 bg-cover bg-center rounded-r-[140px] overflow-hidden"
        style={{ backgroundImage: 'url("/pxfuel.png")' }}
      >
        {/* Ensure the image fills this section */}
      </div>

      {/* Right Login Form Section */}
      <div className="flex flex-col justify-center items-center w-full lg:w-1/3 bg-purple-900 px-6">
        <div>
          <img
            alt="Your Company"
            src="logo.png"
            className="mx-auto h-20 w-auto"
          />
          <h2 className="mt-10 text-center text-2xl font-bold tracking-tight text-white">
            Nice to see you again!
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form action="#" method="POST" className="space-y-6">
            <div>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  placeholder="Email or phone number"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between"></div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  placeholder="Enter password"
                  autoComplete="current-password"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm"
                />
              </div>
              <br />
              <div className="flex text-sm justify-end ">
                <a
                  href="#"
                  className="font-regular text-gray-200 hover:text-indigo-500"
                >
                  Forgot password?
                </a>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign in
              </button>
            </div>
            <div>
              <p className="text-center text-sm text-gray-200 mb-2" >Or</p>
              <div>
                <button
                  onClick={handleLogin}
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-gray-700 px-3 py-1.5 text-sm font-regular text-white shadow-sm hover:bg-gray-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  <img src="/google.png" alt="Google" className="w-6 h-6 mr-2" />Sign in with Google
                </button>
              </div>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-200">
            Not a member?{" "}
            <a
              onClick={register}
              href="#"
              className="font-semibold text-white hover:text-indigo-500"
            >
              Register
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
