import { React, useState } from "react";
import { ExclamationCircleIcon } from "@heroicons/react/solid";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

// import SignupConfirmation from "./SignupConfirmation";

const Signup = ({ showTextNotification }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordconf, setPasswordconf] = useState("");
  const [registered, setRegistered] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const passRegex = new RegExp(
    "^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})"
  );

  const handSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!password.match(passRegex)) {
      setError(
        "Please enter a password with a minimum of: 6 characters and 1 number password "
      );
      return;
    }
    if (password !== passwordconf) {
      setError("Password and confirmation password doesn't match");
      return;
    }
    try {
      await axios.post(process.env.REACT_APP_HOST + "/user/signup", {
        email: email,
        password: password,
      });
      setRegistered(true);
      showTextNotification({
        title: "You are now registered !",
        subtitle: "You can log in using your email and password.",
      });
      navigate("/login");
    } catch (e) {
      setError(e.response.data.error);
    }
  };
  return !registered ? (
    <div className="max-w-2xl container mx-auto">
      <h2 className="mt-6 text-center text-2xl text-dark">
        Create an Endspoints account
      </h2>
      <form className="mt-8 space-y-6" onSubmit={handSubmit}>
        <div className="text-red text-sm flex items-center">
          {error !== "" && <ExclamationCircleIcon className="h-7 w-7 mr-1" />}
          {error}
        </div>
        <div>Enter your email address and password.</div>
        <div className="rounded-md -space-y-px">
          <div>
            <label htmlFor="email-address" className="sr-only">
              Email address
            </label>
            <input
              id="email-address"
              name="email"
              type="email"
              autoComplete="email"
              required
              className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-teal-500 focus:border-teal-500 focus:z-10 sm:text-sm"
              placeholder="Email address"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </div>
          <div>
            <label htmlFor="password" className="sr-only">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-teal-500 focus:border-teal-500 focus:z-10 sm:text-sm"
              placeholder="Password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>

          <div>
            <label htmlFor="password" className="sr-only">
              Password confirmation
            </label>
            <input
              id="passwordc"
              name="passwordc"
              type="password"
              autoComplete="current-password"
              required
              className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-teal-500 focus:border-teal-500 focus:z-10 sm:text-sm"
              placeholder="Password confirmation"
              onChange={(e) => {
                setPasswordconf(e.target.value);
              }}
            />
          </div>
          <div className="text-sm pt-2">
            Password Match:{" "}
            {password !== "" && password === passwordconf ? "Yes" : "No"}
          </div>
        </div>

        <div>
          <button
            type="submit"
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
          >
            <span className="absolute left-0 inset-y-0 flex items-center pl-3"></span>
            Sign up
          </button>
          <div className="text-sm text-center mt-4">
            <Link to="/login" className="text-teal-600 hover:text-teal-500">
              Already have an account? <span className="underline">Log in</span>
            </Link>
          </div>
        </div>
      </form>
    </div>
  ) : (
    <>
      <Link to="/login" className="text-teal-600 hover:text-teal-500">
        Go to login screen
      </Link>
    </>
  );
};

export default Signup;
