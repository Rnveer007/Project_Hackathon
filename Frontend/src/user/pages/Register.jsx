import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "../../../axiosConfig"; // make sure to import your axios instance

function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!form.name || !form.email || !form.password) {
      alert("Please fill in all fields.");
      return;
    }

    try {
      await axios.post("/user/register", form, { withCredentials: true });
      alert("Registered successfully!");
    } catch (error) {
      console.error("Error during registration:", error);
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          name="name"
          type="text"
          placeholder="Enter your first name"
          value={form.name}
          onChange={handleChange}
          className="border-2 mx-3 pl-3 my-5"
        />

        <input
          name="email"
          type="email"
          placeholder="Enter your email"
          value={form.email}
          onChange={handleChange}
          className="border-2 mx-3 pl-3 my-5"
        />

        <input
          name="password"
          type="password"
          placeholder="Enter your password"
          value={form.password}
          onChange={handleChange}
          className="border-2 mx-3 pl-3 my-5"
        />

        <button type="submit" className="cursor-pointer">
          Submit
        </button>
      </form>

      <div>
        <h1>
          Already Registered?
          <span className="cursor-pointer">
            <Link to={"/login"}>Login Here</Link>
          </span>
        </h1>
      </div>
    </>
  );
}

export default Register;
