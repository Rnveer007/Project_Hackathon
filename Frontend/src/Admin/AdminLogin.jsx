import React, { useState } from "react";
import instance from "../../axiosConfig";
// import { useNavigate } from "react-router-dom"; // Uncomment if using React Router

function AdminLogin() {
  const [adminEmail, setAdminEmail] = useState("");
  const [adminPassword, setAdminPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // const navigate = useNavigate(); // Uncomment if using React Router

  async function handleSubmit(e) {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    try {
      const response = await instance.post(
        "/auth/login", // Update if using proxy or different port
        { email: adminEmail, password: adminPassword },
        { withCredentials: true }
      );

      setMessage(response.data.message); // "Admin logged in Successfully"
      
      // Optional: Redirect to admin dashboard after successful login
      // navigate("/admin/dashboard");

    } catch (error) {
      const errMsg = error.response?.data?.message || "Login failed";
      setMessage(errMsg);
    }

    setLoading(false);
  }

  return (
    <div className="flex flex-col items-center mt-10">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-80">
        <input
          name="email"
          type="email"
          placeholder="Enter your email"
          value={adminEmail}
          onChange={(e) => setAdminEmail(e.target.value)}
          className="border-2 p-2 rounded"
          required
        />
        <input
          name="password"
          type="password"
          placeholder="Enter your password"
          value={adminPassword}
          onChange={(e) => setAdminPassword(e.target.value)}
          className="border-2 p-2 rounded"
          required
        />
        <button
          type="submit"
          className={`bg-blue-500 text-white p-2 rounded ${loading ? "opacity-60" : ""}`}
          disabled={loading || !adminEmail || !adminPassword}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>

      {message && (
        <p className="mt-4 text-sm text-center text-red-600">{message}</p>
      )}
    </div>
  );
}

export default AdminLogin;
