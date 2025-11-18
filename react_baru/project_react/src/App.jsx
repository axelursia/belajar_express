import React, { Suspense } from "react";
import { BrowserRouter as Router, Routes, Route, NavLink } from "react-router-dom";

const Home = React.lazy(() => import("./components/Home"));
const FakultasList = React.lazy(() => import("./components/Fakultas/List"));

function App() {
  return (
    <Router>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            Navbar
          </a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <NavLink className="nav-link active" aria-current="page" to="/">
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/fakultas">
                  Fakultas
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/fakultas" element={<FakultasList />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
