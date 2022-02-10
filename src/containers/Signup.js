import { React, useState } from "react";
import { LockClosedIcon } from "@heroicons/react/solid";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

// import SignupConfirmation from "./SignupConfirmation";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [registered, setRegistered] = useState(false);
  const navigate = useNavigate();

  const handSubmit = async (e) => {
    e.preventDefault();
    const res = await axios.post(process.env.REACT_APP_HOST + "/user/signup", {
      email: email,
      password: password,
    });
    setRegistered(true);
    console.log(res);
    navigate("/login");
  };
  return !registered ? (
    <div className="max-w-2xl container mx-auto">
      <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
        S'inscrire
      </h2>
      <form className="mt-8 space-y-6" onSubmit={handSubmit}>
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

        <div>
          <button
            type="submit"
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
          >
            <span className="absolute left-0 inset-y-0 flex items-center pl-3">
              <LockClosedIcon
                className="h-5 w-5 text-teal-500 group-hover:text-teal-400"
                aria-hidden="true"
              />
            </span>
            Sign in
          </button>
          <div className="text-sm text-center">
            <Link
              to="/signin"
              className="font-medium text-teal-600 hover:text-teal-500"
            >
              Tu as déjà un compte ?
            </Link>
          </div>
        </div>
      </form>
    </div>
  ) : (
    <>Good</>
  );
};

export default Signup;
