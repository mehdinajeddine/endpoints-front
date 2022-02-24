import { React, useState, useEffect, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import cookies from "js-cookie";
import Scroller from "../utils/Scroller";

const ModelView = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState();
  const [label, setLabel] = useState("");
  const [type, setType] = useState("String");
  const [values, setValues] = useState({});
  const [refreshModels, setRefreshModels] = useState(false);
  const { id } = useParams();
  const head = useRef();
  const [linktopeople, setLinktopeople] = useState(false);

  Scroller({ ref: head, isLoading: isLoading });

  const handleAddData = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      for (const [key, value] of Object.entries(values)) {
        formData.append(key, value);
      }
      formData.append("modelid", data.model._id);
      await axios.post(
        process.env.REACT_APP_HOST + "/model/data/add",
        formData,
        {
          headers: {
            Authorization: "Bearer " + cookies.get("token"),
            "Content-Type": "multipart/form-data",
          },
        }
      );
      initValues();
    } catch (error) {
      console.log(error.message);
    }
  };

  const initValues = () => {
    const val = { ...values };
    for (const [key] of Object.entries(values)) {
      val[key] = "";
    }
    setValues(val);
  };

  const updateValues = (label, value) => {
    const val = { ...values };
    val[label] = value;
    setValues(val);
  };

  const getTypeField = (label, type) => {
    switch (type) {
      case "String":
        return (
          <input
            value={values[label]}
            onChange={(e) => updateValues(label, e.target.value)}
            id={label}
            name={label}
            type="text"
            className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-teal-500 focus:border-teal-500 focus:z-10 sm:text-sm"
            placeholder={label}
          />
        );
      case "Boolean":
        return (
          <select
            onChange={(e) => updateValues(label, e.target.value)}
            className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-teal-500 focus:border-teal-500 focus:z-10 sm:text-sm"
          >
            <option value="true">True</option>
            <option value="false">False</option>
          </select>
        );
      case "Number":
        return (
          <input
            value={values[label]}
            onChange={(e) => updateValues(label, e.target.value)}
            id={label}
            name={label}
            type="number"
            className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-teal-500 focus:border-teal-500 focus:z-10 sm:text-sm"
            placeholder={label}
          />
        );
      case "Password":
        return (
          <input
            value={values[label]}
            onChange={(e) => updateValues(label, e.target.value)}
            id={label}
            name={label}
            type="password"
            className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-teal-500 focus:border-teal-500 focus:z-10 sm:text-sm"
            placeholder={label}
          />
        );
      case "mongoose.Schema.Types.Mixed":
        return (
          <input
            onChange={(e) => updateValues(label, e.target.files[0])}
            id={label}
            name={label}
            type="file"
            className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-teal-500 focus:border-teal-500 focus:z-10 sm:text-sm"
            placeholder={label}
          />
        );
      default:
        return <span>no field</span>;
    }
  };

  const handleGenerateModel = async (e) => {
    e.preventDefault();
    await axios.post(
      process.env.REACT_APP_HOST + "/model/generate/",
      { id: id, linktopeople: linktopeople },
      {
        headers: {
          Authorization: "Bearer " + cookies.get("token"),
        },
      }
    );
    //    getModelData();
    setRefreshModels(!refreshModels);
  };

  const handleAddField = async (e) => {
    e.preventDefault();
    await axios.post(
      process.env.REACT_APP_HOST + "/fields/add",
      {
        label: label,
        type: type,
        modelid: data.model._id,
      },
      {
        headers: {
          Authorization: "Bearer " + cookies.get("token"),
        },
      }
    );
    setLabel("");
    setType("String");
    //getModelData();
    setRefreshModels(!refreshModels);
  };

  /* const getModelData = async () => {
    const res = await axios.get(
      process.env.REACT_APP_HOST + "/model/view/" + id,
      {
        headers: {
          Authorization: "Bearer " + cookies.get("token"),
        },
      }
    );
    setData(res.data);

    setIsLoading(false);
  };*/

  useEffect(() => {
    const getModelData = async () => {
      const res = await axios.get(
        process.env.REACT_APP_HOST + "/model/view/" + id,
        {
          headers: {
            Authorization: "Bearer " + cookies.get("token"),
          },
        }
      );
      setData(res.data);

      setIsLoading(false);
    };
    getModelData();
  }, [id, refreshModels]);
  return isLoading ? (
    <div>Is Loading...</div>
  ) : (
    <div
      ref={head}
      className="max-w-6xl container mx-auto mt-10 bg-white shadow overflow-hidden sm:rounded-lg"
    >
      <div className="px-4 py-5 sm:px-6">
        <h3 className="text-lg leading-6 font-medium text-gray-900">
          {data.model.label}
        </h3>
        <p className="mt-1 max-w-2xl text-sm text-gray-500">Models details.</p>
      </div>
      <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
        <dl className="sm:divide-y sm:divide-gray-200">
          <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Full name</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {data.model.label}
            </dd>
          </div>
          <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Model ID</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {data.model._id}
            </dd>
          </div>
          <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Schema Name</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {data.model.schema}
            </dd>
          </div>
          <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Owner</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {data.model.owner.email}
            </dd>
          </div>

          <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Fields</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              <ul className="border border-gray-200 rounded-md divide-y divide-gray-200">
                {data.fields.map((item, index) => {
                  return (
                    <li
                      key={index}
                      className="pl-3 pr-4 py-3 flex items-center justify-between text-sm"
                    >
                      <div className="w-0 flex-1 flex items-center">
                        <span className="ml-2 flex-1 w-0 truncate">
                          {item.label} : {item.type}
                        </span>
                      </div>
                      <div className="ml-4 flex-shrink-0">
                        <Link
                          to="/"
                          className="font-medium text-indigo-600 hover:text-indigo-500"
                        >
                          Edit
                        </Link>
                        &nbsp;
                        <Link
                          to="/"
                          className="font-medium text-indigo-600 hover:text-indigo-500"
                        >
                          Delete
                        </Link>
                      </div>
                    </li>
                  );
                })}
                {!data.model.schema && (
                  <form id="form-add-field" onSubmit={handleAddField}>
                    <li className="pl-3 pr-4 py-3 flex items-center justify-between text-sm">
                      <div className="w-0 flex-1 flex items-center">
                        <span className="ml-2 flex-1 w-0 ">
                          <input
                            value={label}
                            onChange={(e) => {
                              setLabel(e.target.value);
                            }}
                            id="label"
                            className="appearance-none rounded-none   w-28 px-1 py-1 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-teal-500 focus:border-teal-500 focus:z-10 sm:text-sm"
                          />
                          <select
                            value={type}
                            onChange={(e) => {
                              setType(e.target.value);
                            }}
                            id="type"
                            className="form-select appearance-none rounded-none   w-28 px-1 py-1 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-teal-500 focus:border-teal-500 focus:z-10 sm:text-sm"
                          >
                            <option value="String">String</option>
                            <option value="Number">Number</option>
                            <option value="Boolean">Boolean</option>
                            <option value="mongoose.Schema.Types.Mixed">
                              Image
                            </option>
                          </select>
                        </span>
                      </div>
                      <div className="ml-4 flex-shrink-0">
                        <button className="font-medium text-indigo-600 hover:text-indigo-500">
                          Add field
                        </button>
                      </div>
                    </li>
                  </form>
                )}
              </ul>
            </dd>
          </div>
        </dl>

        <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
          <dt className="text-sm font-medium text-gray-500">
            Link to people ?
          </dt>
          <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
            <div className="relative flex items-start">
              <div className="flex items-center h-5">
                <input
                  disabled={data.model.schema && true}
                  checked={linktopeople}
                  onChange={(e) => setLinktopeople(e.target.checked)}
                  id="auth"
                  aria-describedby="auth-description"
                  name="auth"
                  type="checkbox"
                  className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="auth" className="font-medium text-gray-700">
                  Activate people link
                </label>
                <p id="auth-description" className="text-gray-500">
                  This model will be link to your Users
                </p>
              </div>
            </div>
          </dd>
        </div>
      </div>
      <button
        disabled={data.model.schema && true}
        onClick={handleGenerateModel}
        className={
          "group relative w-full flex justify-center py-2 px-4 border border-black text-sm font-medium rounded-md " +
          (!data.model.schema &&
            " bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500")
        }
      >
        Generate Model
      </button>
      <br />{" "}
      {data.model.schema && (
        <>
          <form className="w-96 m-auto mb-10" onSubmit={handleAddData}>
            <h2 className="text-lg leading-6 font-medium text-gray-900">
              Populate Database
            </h2>
            {data.fields.map((item, index) => {
              return (
                <div key={index}>
                  <label htmlFor={item.label} className="sr-only">
                    {item.label}
                  </label>
                  {getTypeField(item.label, item.type)}
                </div>
              );
            })}
            <button className="group relative w-full flex justify-center py-2 px-4 border border-black text-sm font-medium rounded-md  bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500">
              Add Data
            </button>
          </form>
        </>
      )}
    </div>
  );
};

export default ModelView;
