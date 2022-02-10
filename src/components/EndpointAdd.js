import { React, useState } from "react";
import cookies from "js-cookie";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const EndpointAdd = () => {
  const [label, setLabel] = useState();
  const [path, setPath] = useState();
  const [method, setMethod] = useState("POST");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await axios.post(
      process.env.REACT_APP_HOST + "/endpoints/add",
      {
        label: label,
        path: path,
        methodType: method,
      },
      {
        headers: {
          Authorization: "Bearer " + cookies.get("token"),
        },
      }
    );
    navigate("/");
  };

  return (
    <div>
      <h2 className="text-center">Ajouter un endpoint</h2>{" "}
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
              placeholder="Libellé"
              onChange={(e) => {
                setLabel(e.target.value);
              }}
            />
          </div>
          <div>
            <label htmlFor="eppath" className="sr-only">
              Chemin
            </label>
            <input
              id="eppath"
              name="eppath"
              type="text"
              required
              className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-teal-500 focus:border-teal-500 focus:z-10 sm:text-sm"
              placeholder="Chemin"
              onChange={(e) => {
                setPath(e.target.value);
              }}
            />
          </div>
          <div>
            <label htmlFor="epmethod" className="sr-only">
              Méthode
            </label>
            <select
              onChange={(e) => {
                console.log(e.target);
                setMethod(e.target.value);
              }}
              id="epmethod"
              name="epmethod"
              className="form-select appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-teal-500 focus:border-teal-500 focus:z-10 sm:text-sm"
              aria-label="Default select example"
            >
              <option value="POST">POST</option>
              <option value="GET">GET</option>
            </select>
          </div>
        </div>

        <div>
          <button
            type="submit"
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
          >
            Créer
          </button>
        </div>
      </form>
    </div>
  );
};

export default EndpointAdd;
