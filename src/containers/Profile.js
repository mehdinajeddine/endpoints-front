import { React, useState, useEffect } from "react";
import { ExclamationCircleIcon } from "@heroicons/react/solid";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import cookies from "js-cookie";

const Profile = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [avatar, setAvatar] = useState();
  const [data, setData] = useState();

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
      setData(res.data);
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
    };
    getUserData();
  }, []);

  return (
    <div className="max-w-2xl container mx-auto">
      <h1 className="mt-6 text-center text-2xl text-dark">Profile</h1>
      <form className="mt-8 space-y-6" onSubmit={handSubmit}>
        <div className="text-red text-sm flex items-center">
          {error !== "" && <ExclamationCircleIcon className="h-7 w-7 mr-1" />}
          {error}
        </div>
        <div className="rounded-md shadow-sm ">
          <div className="flex items-center justify-center">
            <span className="mr-2 h-12 w-12 rounded-full overflow-hidden">
              {data && data.avatar ? (
                <img
                  className="h-12 w-12 rounded-full object-cover"
                  src={data.avatar.secure_url}
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
            <input type="file" onChange={(e) => setAvatar(e.target.files[0])} />
          </div>

          <div className="mt-4">
            <label htmlFor="email-address" className="sr-only">
              Email address
            </label>
            <input
              defaultValue={data && data.email}
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
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
          >
            <span className="absolute left-0 inset-y-0 flex items-center pl-3"></span>
            Update
          </button>
        </div>
      </form>
    </div>
  );
};

export default Profile;
