import React, { useState } from "react";
import { Link } from "react-router-dom";
import instance from "../../../axiosConfig";

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
    try {
      const response = await instance.post("/admin/register", form);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <form action="" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter name"
          name="name"
          value={form.name}
          onChange={handleChange}
        />
        <input
          type="email"
          placeholder="Enter email"
          name="email"
          value={form.email}
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="Enter password"
          name="password"
          value={form.password}
          onChange={handleChange}
        />
        <button type="submit">Register</button>
      </form>
      <Link to="/admin/login">Login</Link>
    </>
  );
}

export default Register;
