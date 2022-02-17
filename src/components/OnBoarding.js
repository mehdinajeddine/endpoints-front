import { React, useState, useEffect } from "react";
import { CheckCircleIcon, HeartIcon } from "@heroicons/react/solid";
import { Link, useNavigate, useLocation } from "react-router-dom";
import cookies from "js-cookie";
import axios from "axios";

const OnBoarding = ({ setOnboarding }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState();
  const navigate = useNavigate();
  const location = useLocation();

  const handCloseBt = (e) => {
    e.preventDefault();
    //cookies.set("onboarding", "true");
    setOnboarding(true);
  };

  useEffect(() => {
    const getOnboardingData = async () => {
      try {
        const res = await axios.get(
          process.env.REACT_APP_HOST + "/user/onboarding",
          {
            headers: {
              Authorization: "Bearer " + cookies.get("token"),
            },
          }
        );
        const result = res.data;
        if (
          result.model &&
          result.fields &&
          result.gen &&
          result.endpoint &&
          result.endpoint.model &&
          result.user.onboarding
        ) {
          setOnboarding(true);
        }
        setData(res.data);
        setIsLoading(false);
      } catch (e) {
        navigate("/login");
      }
    };
    getOnboardingData();
  }, [location.pathname, navigate, setOnboarding]);
  return isLoading ? (
    <div></div>
  ) : (
    <div className="max-w-2xl container mx-auto mt-10 ">
      <h1 className="mt-6 text-center text-2xl text-dark">
        Let's create a simple API in 6 steps...
      </h1>{" "}
      <ul role="list" className="mt-3  ">
        <li className="col-span-1 flex shadow-sm rounded-md">
          <div
            className={
              "bg-darkblue flex-shrink-0 flex items-center justify-center w-16 text-white text-sm font-medium rounded-l-md"
            }
          >
            1
          </div>
          <div className="flex-1 flex items-center justify-between border-t border-r border-b border-gray-200 bg-white rounded-r-md truncate">
            <div className="flex-1 px-4 py-2 text-sm truncate">
              <Link
                to="/Models"
                className={
                  (data.model && "line-through") +
                  " text-gray-900 font-medium hover:text-gray-600"
                }
              >
                Create a Model (Clic here)
              </Link>
              <p className="text-gray-500">
                {" "}
                Exemple : <b>Products</b>
              </p>
            </div>
            <div className="flex-shrink-0 pr-2">
              <button
                type="button"
                className="w-8 h-8 bg-white inline-flex items-center justify-center text-gray-400 rounded-full bg-transparent hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                {data.model && (
                  <CheckCircleIcon className="w-5 h-5" aria-hidden="true" />
                )}
              </button>
            </div>
          </div>
        </li>

        {/* Add fields */}

        <li className="col-span-1 flex shadow-sm rounded-md mt-2">
          <div
            className={
              "bg-darkblue flex-shrink-0 flex items-center justify-center w-16 text-white text-sm font-medium rounded-l-md"
            }
          >
            2
          </div>
          <div className="flex-1 flex items-center justify-between border-t border-r border-b border-gray-200 bg-white rounded-r-md truncate">
            <div className="flex-1 px-4 py-2 text-sm truncate">
              <Link
                to={data.model ? "/model/" + data.model._id : "/"}
                className={
                  (data.fields && "line-through ") +
                  "text-gray-900 font-medium hover:text-gray-600"
                }
              >
                Add Fields to my Model (Clic here)
              </Link>
              <p className="text-gray-500">
                {" "}
                Exemple : String <b>Name</b>, String <b>Description</b>...
              </p>
            </div>
            <div className="flex-shrink-0 pr-2">
              <button
                type="button"
                className="w-8 h-8 bg-white inline-flex items-center justify-center text-gray-400 rounded-full bg-transparent hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                {data.fields && (
                  <CheckCircleIcon className="w-5 h-5" aria-hidden="true" />
                )}
              </button>
            </div>
          </div>
        </li>

        {/* Generate Model */}

        <li className="col-span-1 flex shadow-sm rounded-md mt-2">
          <div
            className={
              "bg-darkblue flex-shrink-0 flex items-center justify-center w-16 text-white text-sm font-medium rounded-l-md"
            }
          >
            3
          </div>
          <div className="flex-1 flex items-center justify-between border-t border-r border-b border-gray-200 bg-white rounded-r-md truncate">
            <div className="flex-1 px-4 py-2 text-sm truncate">
              <Link
                to={data.model ? "/model/" + data.model._id : "/"}
                className={
                  (data.gen && "line-through ") +
                  "text-gray-900 font-medium hover:text-gray-600"
                }
              >
                Generate Model and add some Data (Clic here)
              </Link>
              <p className="text-gray-500">
                {" "}
                Exemple : Name is <b>Book</b> and description{" "}
                <b>The best one</b>...
              </p>
            </div>
            <div className="flex-shrink-0 pr-2">
              <button
                type="button"
                className="w-8 h-8 bg-white inline-flex items-center justify-center text-gray-400 rounded-full bg-transparent hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <span className="sr-only">Open options</span>
                {data.gen && (
                  <CheckCircleIcon className="w-5 h-5" aria-hidden="true" />
                )}
              </button>
            </div>
          </div>
        </li>

        {/* End point */}

        <li className="col-span-1 flex shadow-sm rounded-md mt-2">
          <div
            className={
              "bg-darkblue flex-shrink-0 flex items-center justify-center w-16 text-white text-sm font-medium rounded-l-md"
            }
          >
            4
          </div>
          <div className="flex-1 flex items-center justify-between border-t border-r border-b border-gray-200 bg-white rounded-r-md truncate">
            <div className="flex-1 px-4 py-2 text-sm truncate">
              <Link
                to="/"
                className={
                  (data.endpoint && "line-through ") +
                  "text-gray-900 font-medium hover:text-gray-600"
                }
              >
                Create an Endpoint (Clic here)
              </Link>
              <p className="text-gray-500">
                {" "}
                Exemple : <b>/products</b> with <b>GET</b> method
              </p>
            </div>
            <div className="flex-shrink-0 pr-2">
              <button
                type="button"
                className="w-8 h-8 bg-white inline-flex items-center justify-center text-gray-400 rounded-full bg-transparent hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                {data.endpoint && (
                  <CheckCircleIcon className="w-5 h-5" aria-hidden="true" />
                )}
              </button>
            </div>
          </div>
        </li>

        {/* Link Model and Endpoint */}

        <li className="col-span-1 flex shadow-sm rounded-md mt-2">
          <div
            className={
              "bg-darkblue flex-shrink-0 flex items-center justify-center w-16 text-white text-sm font-medium rounded-l-md"
            }
          >
            5
          </div>
          <div className="flex-1 flex items-center justify-between border-t border-r border-b border-gray-200 bg-white rounded-r-md truncate">
            <div className="flex-1 px-4 py-2 text-sm truncate">
              <Link
                to={data.endpoint ? "/endpoint/" + data.endpoint._id : "/"}
                className={
                  data.endpoint &&
                  data.endpoint.model &&
                  "line-through " +
                    "text-gray-900 font-medium hover:text-gray-600"
                }
              >
                Link your Endpoint to your Model (Clic here)
              </Link>
              <p className="text-gray-500">
                {" "}
                Exemple : The Endpoint <b>/products</b> fetch data from the
                Model <b>products</b>
              </p>
            </div>
            <div className="flex-shrink-0 pr-2">
              <button
                type="button"
                className="w-8 h-8 bg-white inline-flex items-center justify-center text-gray-400 rounded-full bg-transparent hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                {data.endpoint && data.endpoint.model && (
                  <CheckCircleIcon className="w-5 h-5" aria-hidden="true" />
                )}
              </button>
            </div>
          </div>
        </li>

        {/* Test */}

        <li className="col-span-1 flex shadow-sm rounded-md mt-2">
          <div
            className={
              "bg-darkblue flex-shrink-0 flex items-center justify-center w-16 text-white text-sm font-medium rounded-l-md"
            }
          >
            6
          </div>
          <div className="flex-1 flex items-center justify-between border-t border-r border-b border-gray-200 bg-white rounded-r-md truncate">
            <div className="flex-1 px-4 py-2 text-sm truncate">
              <Link
                to="/"
                className={
                  (data.user.onboarding && "line-through ") +
                  "text-gray-900 font-medium hover:text-gray-600"
                }
              >
                Test it with command shell
              </Link>
              <p className="text-gray-500">
                {data.user && data.endpoint && (
                  <>
                    {" "}
                    <code>
                      curl {process.env.REACT_APP_HOST}/{data.user._id}
                      {data.endpoint.path}{" "}
                    </code>
                  </>
                )}
              </p>
            </div>
            <div className="flex-shrink-0 pr-2">
              <button
                type="button"
                className="w-8 h-8 bg-white inline-flex items-center justify-center text-gray-400 rounded-full bg-transparent hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                {data.user.onboarding && (
                  <CheckCircleIcon className="w-5 h-5" aria-hidden="true" />
                )}
              </button>
            </div>
          </div>
        </li>
      </ul>
      <div className="flex">
        <p className="flex-1 mt-4 mr-4 mx-auto group relative  flex justify-center py-2 px-14  text-sm font-medium rounded-md bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500">
          <span className="mr-2 inset-y-0 flex items-center pl-3">
            <HeartIcon
              className="h-5 w-5 text-teal-500 group-hover:text-teal-400"
              aria-hidden="true"
            />
          </span>
          Great ! You created your first Endpoint !
        </p>
        <button
          onClick={handCloseBt}
          className="mt-4  group    justify-center py-2 px-2 border border-black text-sm font-medium rounded-md bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
        >
          <span className="absolute left-0 inset-y-0 flex items-center pl-3"></span>
          Close
        </button>
      </div>
    </div>
  );
};

export default OnBoarding;
