import { React } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import cookies from "js-cookie";
import logo from "../assets/logo.png";

const Header = ({ logged, setLogged }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = (e) => {
    cookies.remove("token");
    cookies.remove("avatar");
    cookies.remove("onboarding");
    setLogged(false);
    navigate("/login");
  };

  const navigation = [
    { name: "Models", to: "/models" },
    { name: "Endpoints", to: "/" },
    { name: "Peoples", to: "/peoples" },
  ];

  return (
    <header className="bg-darkblue">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" aria-label="Top">
        <div className="w-full py-6 flex items-center justify-between border-b border-indigo-500 lg:border-none">
          <div className="flex items-center">
            <div className="w-40">
              <Link to="/">
                <img src={logo} alt="" width="162" />
              </Link>
            </div>
            <div className="hidden ml-16 space-x-16 lg:block">
              {navigation.map((link) => (
                <Link
                  key={link.name}
                  to={link.to}
                  className={
                    "text-base  text-white  hover:text-red" +
                    (location.pathname === link.to && " font-medium underline")
                  }
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
          <div className="ml-10 space-x-4 flex items-center">
            {!logged ? (
              <>
                <Link
                  to="/login"
                  className="inline-flex items-center px-4 py-3 border border-gray-300 rounded-md shadow-sm text-lg bg-darkblue font-bold  text-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
                >
                  LOGIN
                </Link>
                <Link
                  to="/signup"
                  className="inline-flex items-center px-4 py-3 border border-gray-300 rounded-md shadow-sm text-lg text-darkblue font-bold  bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
                >
                  SIGN UP FREE
                </Link>
              </>
            ) : (
              <>
                {/* <span className="text-sm">Bearer : {token}</span> */}

                <div className="flex items-center justify-center">
                  <span className=" h-12 w-12 rounded-full overflow-hidden">
                    {cookies.get("avatar") ? (
                      <img
                        className="h-12 w-12 rounded-full object-cover"
                        src={cookies.get("avatar")}
                        alt="avater"
                      />
                    ) : (
                      <svg
                        className="h-full w-full text-gray-300"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                      </svg>
                    )}
                  </span>
                </div>

                <Link
                  to="/profile"
                  className="text-base  text-white hover:text-indigo-50"
                >
                  User Settings
                </Link>
                <button
                  onClick={handleLogout}
                  className="inline-flex items-center px-4 py-3 border border-gray-300 rounded-md shadow-sm text-sm text-darkblue bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
                >
                  Se déconnecter
                </button>
              </>
            )}
          </div>
        </div>
        <div className="py-4 flex flex-wrap justify-center space-x-6 lg:hidden">
          {navigation.map((link) => (
            <Link
              key={link.name}
              to={link.to}
              className="text-base font-medium text-white hover:text-indigo-50"
            >
              {link.name}
            </Link>
          ))}
        </div>
      </nav>
      <hr />
    </header>
  );
};

export default Header;
