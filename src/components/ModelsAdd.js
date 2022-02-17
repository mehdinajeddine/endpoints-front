import { React, useState } from "react";
import cookies from "js-cookie";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ModelsAdd = () => {
  const [label, setLabel] = useState();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post(
      process.env.REACT_APP_HOST + "/models/add",
      {
        label: label,
      },
      {
        headers: {
          Authorization: "Bearer " + cookies.get("token"),
        },
      }
    );
    navigate("/models");
  };

  return (
    <div className="max-w-2xl container mx-auto mt-10">
      <h1 className="mt-6 text-center text-2xl text-dark">Create a Model</h1>{" "}
      <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
        <input type="hidden" name="remember" defaultValue="true" />
        <div className="rounded-md shadow-sm -space-y-px">
          <div>
            <label htmlFor="eplabel" className="sr-only">
              Label
            </label>
            <input
              id="eplabel"
              name="eplabel"
              type="text"
              required
              className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-teal-500 focus:border-teal-500 focus:z-10 sm:text-sm"
              placeholder="Label"
              onChange={(e) => {
                setLabel(e.target.value);
              }}
            />
          </div>
        </div>

        <div>
          <button
            type="submit"
            className="group relative w-full flex justify-center py-2 px-4 border border-black text-sm font-medium rounded-md bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 mb-20"
          >
            Create
          </button>
        </div>
      </form>
    </div>
  );
};

export default ModelsAdd;
