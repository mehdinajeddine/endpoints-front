import React from "react";

const Payments = ({ data }) => {
  const formatDate = (date) => {
    var d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [year, month, day].join("-");
  };
  return (
    <div>
      {data.map((item) => {
        return (
          <div className="flex" key={item._id}>
            <div className=" px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
              <time dateTime={item.created_at}>
                {formatDate(item.created_at)}
              </time>
            </div>
            <div className=" flex-1 px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {item.product.label}
            </div>
            <div className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {item.price}€
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Payments;
