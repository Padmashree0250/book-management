import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import Books from "./components/Books";
import Login from "./components/login";
import Dashboard from "./components/dashboard";
import Addstudent from "./components/addstudent";
import { useEffect, useState } from "react";
import Addbook from "./components/addbook";
import Logout from "./components/logout";
import axios from "axios";
import Editbook from "./components/editbook";
import Deletebook from "./components/delete";

import { useNavigate } from "react-router-dom";
function App() {
  const [role, setRole] = useState("");

  axios.defaults.withCredentials = true;

  useEffect(() => {
    axios
      .get("http://localhost:3001/auth/verify")
      .then((res) => {
        if (res.data.login) {
          setRole(res.data.role);
        } else {
          setRole("");
        }
        console.log(res);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <BrowserRouter>
      <Navbar role={role} />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/Books" element={<Books role={role} />}></Route>
        <Route path="/login" element={<Login setRoleVar={setRole} />}></Route>
        <Route path="/dashboard" element={<Dashboard />}></Route>
        <Route path="/addstudent" element={<Addstudent />}></Route>
        <Route path="/logout" element={<Logout setRole={setRole} />}></Route>
        <Route path="/addbook" element={<Addbook />}></Route>
        <Route path="/book/:id" element={<Editbook />}></Route>
        <Route path="/delete/:id" element={<Deletebook />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
