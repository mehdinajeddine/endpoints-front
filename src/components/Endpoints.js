import { React, useState, useEffect } from "react";
import axios from "axios";
import cookies from "js-cookie";
import { Link, useNavigate } from "react-router-dom";

const Endpoints = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEndpoints = async () => {
      try {
        const res = await axios.post(
          process.env.REACT_APP_HOST + "/endpoints",
          {},
          {
            headers: {
              Authorization: "Bearer " + cookies.get("token"),
            },
          }
        );
        setData(res.data);
        console.log(res);
        setIsLoading(false);
      } catch (e) {
        navigate("/login");
      }
    };

    fetchEndpoints();
  }, [navigate]);
  return isLoading ? (
    <div>is Loading...</div>
  ) : (
    <div className="flex flex-col  sm:px-6 lg:px-8 mt-10">
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8 mx-auto">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <Link
            to="/endpoints/add"
            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
          >
            Add Endpoint
          </Link>
          <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg mt-4">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Label
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Path
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Method
                  </th>

                  <th scope="col" className="relative px-6 py-3">
                    <span className="sr-only">Status</span>
                  </th>
                  <th scope="col" className="relative px-6 py-3">
                    <span className="sr-only">Edit</span>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {data.map((item, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <Link to={"/endpoint/" + item._id}>{item.label}</Link>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5  rounded-full">
                        {process.env.REACT_APP_HOST}/{item.owner._id}
                        {item.path}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 rounded-full">
                        {item.method}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5  rounded-full bg-green-100 text-green-800">
                        Active
                      </span>
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm ">
                      <Link
                        to={"/endpoint/" + item._id}
                        className="text-indigo-600 hover:text-indigo-900"
                      >
                        Edit
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Endpoints;
