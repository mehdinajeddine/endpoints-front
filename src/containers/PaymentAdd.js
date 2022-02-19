import { React, useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import stripelogo from "../assets/stripe.png";
import PaymentAddForm from "../components/PaymentAddForm";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const PaymentAdd = ({ showTextNotification }) => {
  const [product, setProduct] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();
  const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_KEY);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await axios.get(
          process.env.REACT_APP_HOST + "/product/" + id
        );
        setProduct(res.data);
        setIsLoading(false);
      } catch (e) {
        navigate("/login");
      }
    };
    getProducts();
  }, [navigate, id]);

  return isLoading ? (
    <div>Loading...</div>
  ) : (
    <>
      <h2 className="mt-20 text-5xl font-extrabold text-gray-900 sm:text-center">
        Payment
      </h2>
      <div className="max-w-2xl p-4 container mx-auto border mt-10">
        <div>
          <div className="flex">
            <div className=" px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
              <time dateTime={1}>19/02/2022</time>
            </div>
            <div className=" flex-1 px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {product.label}
            </div>
            <div className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {product.price}€
            </div>
          </div>
        </div>
        <hr />
        <img width="120" src={stripelogo} alt="" />
        <Elements stripe={stripePromise}>
          <PaymentAddForm
            price={product.price}
            showTextNotification={showTextNotification}
            productid={id}
          />
        </Elements>
      </div>
    </>
  );
};

export default PaymentAdd;
