import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

const Dashboard = () => {
  return (
    <div>
      <Link
        to="/endpoint/add"
        className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
      >
        Add Endpoint
      </Link>
    </div>
  );
};

export default Dashboard;
