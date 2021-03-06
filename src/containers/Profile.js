import { React, useState, useEffect } from "react";
import { ExclamationCircleIcon } from "@heroicons/react/solid";
import axios from "axios";
import cookies from "js-cookie";
import Subscription from "../components/Subscription";
import Payments from "./Payments";

const Profile = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [avatar, setAvatar] = useState();
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const handSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("avatar", avatar);
      formData.append("email", email);
      formData.append("password", password);
      const res = await axios.post(
        process.env.REACT_APP_HOST + "/user/update",
        formData,
        {
          headers: {
            Authorization: "Bearer " + cookies.get("token"),
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (res.data.user.avatar) {
        cookies.set("avatar", res.data.user.avatar.secure_url);
      }
      //setData(res.data);
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    const getUserData = async () => {
      const res = await axios.post(
        process.env.REACT_APP_HOST + "/user/data",
        {},
        {
          headers: {
            Authorization: "Bearer " + cookies.get("token"),
          },
        }
      );
      setData(res.data);
      setIsLoading(false);
      console.log("res.data : ", res.data);
    };
    getUserData();
  }, []);

  return isLoading ? (
    <div>IsLoading</div>
  ) : (
    <div className="flex mt-6 mx-auto max-w-4xl">
      <div className="mr-4">
        <ul className="w-36 text-sm bg-white border p-2">
          <li>Back to Endpoints</li>
          <li className="mt-10">Profile</li>
          <li>Usage</li>
          <li>Buy more requests</li>
        </ul>
      </div>
      <div className="max-w-2xl container  bg-white p-10  ">
        <Subscription />
        <hr />
        <h1 className="mt-20 text-5xl font-extrabold text-gray-900 sm:text-center">
          Profile
        </h1>
        <form className="mt-2 space-y-6" onSubmit={handSubmit}>
          <div className="text-red text-sm flex items-center">
            {error !== "" && <ExclamationCircleIcon className="h-7 w-7 mr-1" />}
            {error}
          </div>
          <div className="rounded-md shadow-sm ">
            <div className="flex items-center justify-center">
              <span className="mr-2 h-12 w-12 rounded-full overflow-hidden">
                {data && data.user.avatar ? (
                  <img
                    className="h-12 w-12 rounded-full object-cover"
                    src={data.user.avatar.secure_url}
                    alt="avater"
                  />
                ) : (
                  <svg
                    className="h-full w-full text-gray-300"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                )}
              </span>
              <input
                type="file"
                onChange={(e) => setAvatar(e.target.files[0])}
              />
            </div>

            <div className="mt-4">
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                defaultValue={data && data.user.email}
                disabled={true}
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
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
              className="text-white group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
            >
              <span className="absolute left-0 inset-y-0 flex items-center pl-3"></span>
              Update
            </button>
          </div>
        </form>

        <hr className="mt-10" />
        <div className="mt-20">
          <h2 className="text-5xl font-extrabold text-gray-900 sm:text-center">
            The API Usage:
          </h2>
          <div className="flex items-center mt-4">
            <p className=" mr-4">
              API Requests : 0 / 1,000 <small>(working progress)</small>
            </p>
            <button className="text-white py-1 justify-center px-4 border border-transparent text-sm font-medium rounded-md bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500">
              Buy more requests
            </button>
          </div>
        </div>
        <hr className="mt-20" />
        <Payments data={data.payments} />
      </div>
    </div>
  );
};

export default Profile;
