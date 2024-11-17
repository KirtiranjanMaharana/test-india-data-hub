// src/App.js
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Home from "./pages/Home";
import Layout from "./components/Layout";
import Login from "./components/Login";

const isAuthenticated = () => {
  return localStorage.getItem("indiaDataHubUser") !== null;
};

function App() {
  return (
    <Routes>
      <Route
        path="/login"
        element={<Login />}
        // element={isAuthenticated() ? <Navigate to="/" replace /> : <Login />}
      />
      <Route
        path="/"
        element={
          isAuthenticated() ? <Layout /> : <Navigate to="/login" replace />
        }
      >
        {/* <Route index element={<Home />} /> */}
      </Route>
    </Routes>
  );
}

export default App;
