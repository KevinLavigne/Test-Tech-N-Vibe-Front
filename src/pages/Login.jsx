import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { HashLink as NavLink } from "react-router-hash-link";

import Toaster from "../components/Toaster";
import notify from "../services/Toastify";
import apiConnexion from "../services/apiConnexion";
import UserContext from "../contexts/UserContext";

export default function Login() {
  const navigate = useNavigate();

  const { handleUser } = useContext(UserContext.Context);

  const [user, setUser] = useState({ email: "", password: "" });

  const handleUserData = (place, value) => {
    const newUser = { ...user };
    newUser[place] = value;
    setUser(newUser);
  };
  const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g;
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&-])[A-Za-z\d@$!%*?&-]{8,}/;
  const LoginSend = async (e) => {
    e.preventDefault();
    if (emailRegex.test(user.email) && passwordRegex.test(user.password)) {
      try {
        const { data } = await apiConnexion.post("/login", user);
        handleUser({
          email: data.email,
        });

        notify("success", `welcome on board ${data.email}.`, () =>
          navigate(`/user/home`)
        );
      } catch (err) {
        notify(
          err.response?.data.type || "error",
          err.response?.data.message || "bug"
        );
      }
    } else notify("warning", "wrong credential");
  };

  return (
    <div className=" h-[100vh] flex flex-col justify-center  items-center bg-slate-200">
      <Toaster />
      <div className="flex flex-col justify-center mb-10 items-center text-center  w-full">
        <form
          className="w-4/5 lg:w-1/3 border bg-slate-500 rounded-3xl"
          onSubmit={(e) => LoginSend(e)}
        >
          <div className="flex flex-col w-full p-4">
            <h1 className="text-center font-semibold mb-4 text-white text-4xl">
              Login
            </h1>
            <label htmlFor="Email" className="flex justify-center mb-2">
              <input
                required
                className="w-3/4 p-1 bg-slate-200 text-black"
                type="text"
                autoComplete="username"
                placeholder="email"
                name="email"
                value={user.email}
                onChange={(e) => handleUserData(e.target.name, e.target.value)}
              />
            </label>
            <label htmlFor="Password" className="flex justify-center mb-2">
              <input
                required
                className="w-3/4 p-1 bg-slate-200 text-black"
                type="password"
                autoComplete="current-password"
                placeholder="password"
                name="password"
                value={user.password}
                onChange={(e) => handleUserData(e.target.name, e.target.value)}
              />
            </label>
            <button
              className="text-3xl w-fit self-center p-2 px-4 mt-1 rounded-3xl bg-slate-400 font-medium"
              type="submit"
            >
              Login
            </button>
          </div>
        </form>
        <div className=" absolute top-[4vh] right-[2vh]">
          <NavLink
            className="text-3xl py-2 px-4 bg-slate-400 rounded-3xl"
            to="/SignUp"
          >
            Sign up
          </NavLink>
        </div>
      </div>
    </div>
  );
}
