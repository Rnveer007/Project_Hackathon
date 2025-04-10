import React, { useState } from "react";
import { Link } from "react-router-dom";
import instance from "../../../axiosConfig";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const response = await instance.post(
        "",
        { email, password },
        { withCredentials: true }
      );
    } catch (error) {
      console.error("Error during registration:", error);
    }
  }

  return (
    <>
      <form action="" onSubmit={handleSubmit}>
        <input
          name="email"
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border-2 mx-3 my-5 pl-3"
        />
        <input
          name="password"
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border-2 mx-3 my-5 pl-3"
        />
        <button type="submit" className="cursor-pointer">
          Login
        </button>
      </form>

      <div>
        <h1>
          New User?
          <span className="cursor-pointer">
            <Link to={"/register"}>Register Here</Link>
          </span>
        </h1>
      </div>
    </>
  );
}

export default Login;