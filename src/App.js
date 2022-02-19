import { React, useState } from "react";
import "./App.css";
import Signup from "./containers/Signup";
import Header from "./components/Header";
import Signin from "./containers/Signin";
import cookies from "js-cookie";
import EndpointAdd from "./components/EndpointAdd";
import Endpoints from "./components/Endpoints";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Models from "./components/Models";
import ModelsAdd from "./components/ModelsAdd";
import ModelView from "./components/ModelView";
import EndPointView from "./components/EndpointView";
import Peoples from "./components/Peoples";
import Profile from "./containers/Profile";
import OnBoarding from "./components/OnBoarding";
import Notification from "./components/Notification";
import PaymentAdd from "./containers/PaymentAdd";

function App() {
  const [logged, setLogged] = useState(cookies.get("token") || false);
  const [onboarding, setOnboarding] = useState(false);
  const [notif, setNotif] = useState({
    show: false,
    message: { title: "", subtitle: "" },
  });

  const closeNotif = () => {
    const tab = { ...notif };
    tab.show = false;
    setNotif(tab);
  };

  const showTextNotification = (message) => {
    const tab = { ...notif };
    tab.show = true;
    tab.message = message;
    setNotif(tab);
  };

  const useIsLoged = (value) => {
    setLogged(value);
    showTextNotification({
      title: "You are logged",
      subtitle: "Let's enjoy !",
    });
  };

  return (
    <div className="h-full mb-40">
      <div className="">
        <Router>
          <Header logged={logged} setLogged={setLogged} />

          {notif.show && (
            <Notification message={notif.message} closeNotif={closeNotif} />
          )}

          {logged && !onboarding && (
            <OnBoarding setOnboarding={setOnboarding} />
          )}

          <Routes>
            <Route
              path="/login"
              element={<Signin logged={logged} setLogged={useIsLoged} />}
            />
            <Route
              path="/signup"
              element={<Signup showTextNotification={showTextNotification} />}
            />
            <Route path="/endpoints/add" element={<EndpointAdd />} />
            <Route path="/" element={<Endpoints />} />
            <Route path="/models" element={<Models />} />
            <Route path="/models/add" element={<ModelsAdd />} />
            <Route path="/model/:id" element={<ModelView />} />
            <Route path="/endpoint/:id" element={<EndPointView />} />
            <Route path="/peoples" element={<Peoples />} />
            <Route path="/profile" element={<Profile />} />
            <Route
              path="/payment/add/:id"
              element={
                <PaymentAdd showTextNotification={showTextNotification} />
              }
            />
          </Routes>
        </Router>
      </div>
    </div>
  );
}

export default App;
