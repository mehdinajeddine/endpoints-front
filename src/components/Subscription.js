import React, { useEffect, useState } from "react";
import { CheckIcon } from "@heroicons/react/solid";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Subscription = () => {
  const [products, setProducts] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await axios.get(process.env.REACT_APP_HOST + "/products");
        setProducts(res.data);
        console.log("products : ", res.data);
        setIsLoading(false);
      } catch (e) {
        navigate("/login");
      }
    };
    getProducts();
  }, []);

  return isLoading ? (
    <div>IsLoading</div>
  ) : (
    <div className="bg-white">
      <div className=" mx-auto py-12 ">
        <div className="sm:flex sm:flex-col sm:align-center">
          <h1 className="text-5xl font-extrabold text-gray-900 sm:text-center">
            Pay as you go
          </h1>
        </div>
        <div className="flex mt-12 space-y-4 sm:mt-16 sm:space-y-0  sm:gap-6 lg:max-w-4xl lg:mx-auto xl:max-w-none xl:mx-0 ">
          {products.map((tier, index) => (
            <div
              key={tier._id}
              className="border  flex-1 border-gray-200 rounded-lg shadow-sm divide-y divide-gray-200"
            >
              <div className="p-6">
                <p className="mt-8">
                  <span className="text-4xl font-extrabold text-gray-900">
                    ${tier.price}
                  </span>{" "}
                </p>
                <Link
                  to={"/payment/add/" + tier._id}
                  className="mt-8 block w-full bg-gray-800 border border-gray-800 rounded-md py-2 text-sm font-semibold text-white text-center hover:bg-gray-900"
                >
                  Buy {tier.label}
                </Link>
              </div>
              <div className="pt-6 pb-8 px-6">
                <h3 className="text-xs font-medium text-gray-900 tracking-wide uppercase">
                  What's included
                </h3>
                <ul role="list" className="mt-6 space-y-4">
                  {tier.includedFeatures.map((feature) => (
                    <li key={feature} className="flex space-x-3">
                      <CheckIcon
                        className="flex-shrink-0 h-5 w-5 text-green-500"
                        aria-hidden="true"
                      />
                      <span className="text-sm text-gray-500">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Subscription;
