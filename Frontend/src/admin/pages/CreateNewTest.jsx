import React, { useState } from "react";
import instance from "../../../axiosConfig";

const AdminTest = () => {
  const [testName, setTestName] = useState("");
  const [jsonFile, setJsonFile] = useState(null);
  const [message, setMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!testName || !jsonFile) {
      setMessage("Please provide a test name and select a JSON file.");
      return;
    }

    // Create a FormData object
    const formData = new FormData();
    formData.append("name", testName);
    formData.append("file", jsonFile);

    try {
      const response = await instance.post("/admin/create-test", formData, {
        withCredentials:true
      });

      setMessage("Test created successfully: " + JSON.stringify(response.data));
    } catch (error) {
      setMessage(
        "Error creating test: " +
          (error.response?.data?.error || error.message)
      );
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Create Test</h1>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div>
          <label htmlFor="testName">Test Name:</label>
          <input
            type="text"
            id="testName"
            value={testName}
            onChange={(e) => setTestName(e.target.value)}
            required
          />
        </div>
        <br />
        <div>
          <label htmlFor="jsonFile">Upload JSON File:</label>
          <input
            type="file"
            id="jsonFile"
            accept="application/json"
            onChange={(e) => setJsonFile(e.target.files[0])}
            required
          />
        </div>
        <br />
        <button type="submit">Create Test</button>
      </form>
      <br />
      {message && <p>{message}</p>}
    </div>
  );
};

export default AdminTest;