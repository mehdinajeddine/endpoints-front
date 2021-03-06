import { React, useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import cookies from "js-cookie";
import Scroller from "../utils/Scroller";

const EndPointView = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState();
  const [action, setAction] = useState("Fetch");
  const [models, setModelsData] = useState();
  const [model, setModel] = useState();
  const [auth, setAuth] = useState(false);
  const { id } = useParams();
  const head = useRef();

  const navigate = useNavigate();

  Scroller({ ref: head, isLoading: isLoading });

  const handleUpdateEndPoint = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        process.env.REACT_APP_HOST + "/endpoint/update",
        { _id: id, action: action, modelid: model, auth: auth },
        {
          headers: {
            Authorization: "Bearer " + cookies.get("token"),
          },
        }
      );
      navigate("/");
    } catch (error) {}
  };

  const getModelsData = async (endpoint) => {
    const res = await axios.post(
      process.env.REACT_APP_HOST + "/models",
      {},
      {
        headers: {
          Authorization: "Bearer " + cookies.get("token"),
        },
      }
    );
    setModelsData(res.data);
    setIsLoading(false);
  };

  useEffect(() => {
    const getEndPointData = async () => {
      const res = await axios.get(
        process.env.REACT_APP_HOST + "/endpoint/view/" + id,
        {
          headers: {
            Authorization: "Bearer " + cookies.get("token"),
          },
        }
      );
      setData(res.data);
      setAction(res.data?.action);
      //    res.data?.model ? setModel(res.data?.model._id) : 1;
      if (res.data.model) {
        setModel(res.data.model._id);
      }
      setAuth(res.data.authentify);
      getModelsData(res.data);
    };

    getEndPointData();
  }, [id]);
  return isLoading ? (
    <div>Is Loading...</div>
  ) : (
    <div
      ref={head}
      className="max-w-6xl container mx-auto mt-10 bg-white shadow overflow-hidden sm:rounded-lg"
    >
      <div className="px-4 py-5 sm:px-6">
        <h3 className="text-lg leading-6 font-medium text-gray-900">
          {data.label}
        </h3>
        <p className="mt-1 max-w-2xl text-sm text-gray-500">
          Endpoints details.
        </p>
      </div>
      <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
        <form onSubmit={handleUpdateEndPoint}>
          <dl className="sm:divide-y sm:divide-gray-200">
            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Full name</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {data.label}
              </dd>
            </div>
            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">EndPoint ID</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {data._id}
              </dd>
            </div>
            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Path</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                /{data.owner._id}
                {data.path}
              </dd>
            </div>
            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Owner</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {data.owner.email}
              </dd>
            </div>

            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Action</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                <select
                  value={action}
                  onChange={(e) => {
                    setAction(e.target.value);
                  }}
                  id="action"
                  className="form-select appearance-none rounded-none   w-28 px-1 py-1 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-teal-500 focus:border-teal-500 focus:z-10 sm:text-sm"
                >
                  <option value="-1">Select Action</option>
                  <option value="Fetch">Fetch</option>
                  <option value="Insert">Insert</option>
                  <option value="Update">Update</option>
                  <option value="View">View</option>
                </select>
                <select
                  value={model}
                  onChange={(e) => {
                    setModel(e.target.value);
                  }}
                  id="model"
                  className="form-select appearance-none rounded-none   w-28 px-1 py-1 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-teal-500 focus:border-teal-500 focus:z-10 sm:text-sm"
                >
                  <option value="-1">Select Model</option>
                  {models.map((item, index) => {
                    return (
                      <option key={index} value={item._id}>
                        {item.label}
                      </option>
                    );
                  })}
                </select>
              </dd>
            </div>
            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">
                Need token autorization ?
              </dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                <div className="relative flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      checked={auth}
                      onChange={(e) => setAuth(e.target.checked)}
                      id="auth"
                      aria-describedby="auth-description"
                      name="auth"
                      type="checkbox"
                      className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="auth" className="font-medium text-gray-700">
                      Activate token autorization
                    </label>
                    <p id="auth-description" className="text-gray-500">
                      Your users need autorization to use this endpoint
                    </p>
                  </div>
                </div>
              </dd>
            </div>
          </dl>
          <button
            type="submit"
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md  bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
          >
            Save
          </button>
        </form>
      </div>
    </div>
  );
};

export default EndPointView;
