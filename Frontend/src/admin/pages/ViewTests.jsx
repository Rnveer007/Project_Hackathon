import React, { useEffect, useState } from "react";
import instance from "../../../axiosConfig";

function ViewTests() {
  const [tests, setTests] = useState([]);
  // console.log("test", tests)

  useEffect(() => {
    fetchTests();
  }, []);

  const fetchTests = async () => {
    // console.log("fetching");
    try {
      const response = await instance.get("/admin/view-test", { withCredentials: true });
      setTests(response.data.tests || []);

      // console.log("res", response);

    } catch (error) {
      console.error("Error fetching tests:", error);
    }
  };

  const deleteTest = async (id) => {
    try {
      await instance.delete(`/admin/delete/${id}`, { withCredentials: true });
      setTests(tests.filter((test) => test._id !== id));
    } catch (error) {
      console.error("Error deleting test:", error);
    }
  };

  const issueTest = async (id) => {
    try {
      await instance.patch(`/admin/issue/${id}`, { status: "issued" });
      setTests(
        tests.map((test) =>
          test._id === id ? { ...test, status: "issued" } : test
        )
      );
      // console.log(tests);
    } catch (error) {
      console.error("Error updating test status:", error);
    }
  };

  const updateTestFile = async (e, testId) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await instance.patch(`/admin/update/${testId}`, formData, {
        withCredentials: true,

        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log("Update Response:", response)

      alert("Test updated successfully");
      fetchTests();
    } catch (error) {
      console.error("Error updating test:", error);
      alert("Failed to update test");
    }
  };

  return (
    <div>
      <h1>View Tests</h1>
      <table border="1" style={{ width: "100%", textAlign: "left" }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tests.map((test, index) => (
            <tr key={test._id}>
              <td>{++index}</td>
              <td>{test.name}</td>
              <td>{test.status}</td>
              <td>
                <button onClick={() => deleteTest(test._id)}>Delete</button>
                <button onClick={() => issueTest(test._id)}>Issue</button>
                <input
                  type="file"
                  accept="application/json"
                  onChange={(e) => updateTestFile(e, test._id)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div >
  );
}

export default ViewTests;
