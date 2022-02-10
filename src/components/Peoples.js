import { React, useState, useEffect } from "react";
import axios from "axios";
import cookies from "js-cookie";
import { Link, useNavigate } from "react-router-dom";

const Peoples = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState();
  const [uid, setUid] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPeoples = async () => {
      try {
        const res = await axios.post(
          process.env.REACT_APP_HOST + "/peoples",
          {},
          {
            headers: {
              Authorization: "Bearer " + cookies.get("token"),
            },
          }
        );
        console.log(res.data);
        setData(res.data.peoples);
        setIsLoading(false);
        setUid(res.data.uid);
      } catch (e) {
        navigate("/login");
      }
    };

    fetchPeoples();
  }, [navigate]);

  return isLoading ? (
    <div>is Loading...</div>
  ) : (
    <div className="flex flex-col">
      <div className="text-sm">
        Endpoint for login : {process.env.REACT_APP_HOST}/{uid}/login
        <br />
        Endpoint for Signup : {process.env.REACT_APP_HOST}/{uid}/signup
      </div>
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    id
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Email
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
                        <div className="flex-shrink-0 h-10 w-10">
                          {item._id}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          {item.email}
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <Link
                        to="/"
                        className="text-indigo-600 hover:text-indigo-900"
                      >
                        Delete
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

export default Peoples;
