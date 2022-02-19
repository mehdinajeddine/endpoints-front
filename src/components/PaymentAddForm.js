import { useElements, useStripe } from "@stripe/react-stripe-js";
import { CardElement } from "@stripe/react-stripe-js";
import { React, useState } from "react";
import axios from "axios";
import cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const PaymentAddForm = ({ price, showTextNotification, productid }) => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const numberReg = new RegExp("^[a-zA-Z0-9 ]+$");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!cookies.get("userid")) {
      navigate("/login");
      return;
    }
    const userid = cookies.get("userid");
    if (!userid.match(numberReg)) {
      navigate("/login");
      return;
    }

    try {
      const cardElement = elements.getElement(CardElement);

      const stripeResponse = await stripe.createToken(cardElement, {
        name: "id : " + userid,
      });

      const stripeToken = stripeResponse.token.id;

      const response = await axios.post(
        process.env.REACT_APP_HOST + "/user/pay",
        {
          stripeToken,
          price: price,
          productid: productid,
        },
        {
          headers: {
            Authorization: "Bearer " + cookies.get("token"),
          },
        }
      );
      if (response.data.status === "succeeded") {
        showTextNotification({
          title: "Payment successful",
          subtitle: "We increase your requests on your accounts !",
        });
        navigate("/profile");
      }
      return;
    } catch (error) {
      setError(error.message);
    }
  };
  return (
    <div>
      {error}
      <form onSubmit={handleSubmit} className="mt-10">
        <CardElement />
        <button
          className="text-white mt-4 group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
          type="submit"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default PaymentAddForm;
