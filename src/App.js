import { React, useState } from "react";
import "./App.css";
import Signup from "./containers/Signup";
import Header from "./components/Header";
import Signin from "./containers/Signin";
import cookies from "js-cookie";
import EndpointAdd from "./components/EndpointAdd";
import Endpoints from "./components/Endpoints";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Models from "./components/Models";
import ModelsAdd from "./components/ModelsAdd";
import ModelView from "./components/ModelView";
import EndPointView from "./components/EndpointView";

function App() {
  const [logged, setLogged] = useState(cookies.get("token") || false);
  return (
    <div className="bg-slate-300 h-full">
      <div className="container mx-auto px-4">
        <Router>
          <Header logged={logged} setLogged={setLogged} />

          <Routes>
            <Route
              path="/login"
              element={<Signin logged={logged} setLogged={setLogged} />}
            />
            <Route path="/signup" element={<Signup />} />
            <Route path="/endpoints/add" element={<EndpointAdd />} />
            <Route path="/" element={<Endpoints />} />
            <Route path="/models" element={<Models />} />
            <Route path="/models/add" element={<ModelsAdd />} />
            <Route path="/model/:id" element={<ModelView />} />
            <Route path="/endpoint/:id" element={<EndPointView />} />
          </Routes>
        </Router>
      </div>
    </div>
  );
}

export default App;
