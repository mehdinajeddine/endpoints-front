import { React, useState } from "react";
import { LockClosedIcon, ExclamationCircleIcon } from "@heroicons/react/solid";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import cookies from "js-cookie";

const Signin = ({ logged, setLogged }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(process.env.REACT_APP_HOST + "/user/login", {
        email: email.trim().toLowerCase(),
        password: password,
      });
      cookies.set("token", res.data.token);
      cookies.set("userid", res.data._id);
      if (res.data.avatar) {
        cookies.set("avatar", res.data.avatar.secure_url);
      }
      setLogged(true);
      navigate("/");
    } catch (e) {
      setError(e.response.data.error);
    }
  };

  return (
    <div className="max-w-2xl container mx-auto">
      <h1 className="mt-6 text-center text-2xl text-dark">Log in Endspoints</h1>

      <form className="mt-8 space-y-6" onSubmit={handSubmit}>
        <div className="text-red text-sm flex items-center">
          {error !== "" && <ExclamationCircleIcon className="h-7 w-7 mr-1" />}
          {error}
        </div>
        <div>Enter your email address and password.</div>
        <div className="rounded-md shadow-sm -space-y-px">
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
        </div>

        <div className="flex items-center justify-between">
          <div className="text-sm">
            <Link className="text-teal-600 hover:text-teal-500" to="/">
              Forgot your password?
            </Link>
          </div>
        </div>

        <div>
          <button
            type="submit"
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
          >
            <span className="absolute left-0 inset-y-0 flex items-center pl-3">
              <LockClosedIcon
                className="h-5 w-5 text-teal-500 group-hover:text-teal-400"
                aria-hidden="true"
              />
            </span>
            Sign in
          </button>
          <div className="text-sm text-center mt-3">
            <Link to="/signup" className=" text-teal-600 hover:text-teal-500">
              Don’t have an account yet?{" "}
              <span className="underline">Sign up</span>
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Signin;
