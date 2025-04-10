import React, { useEffect, useState } from "react";
import instance from "../../../axiosConfig";

function ViewTests() {
  const [tests, setTests] = useState([]);

  useEffect(() => {
    fetchTests();
  }, []);

  const fetchTests = async () => {
    console.log("fetching");
    try {
      const response = await instance.get("/admin/view-test",{withCredentials:true});
      setTests(response.data.tests);
      // console.log(response);
      
    } catch (error) {
      console.error("Error fetching tests:", error);
    }
  };

  const deleteTest = async (id) => {
    try {
      await instance.delete(`/admin/tests/${id}`);
      setTests(tests.filter((test) => test.id !== id));
    } catch (error) {
      console.error("Error deleting test:", error);
    }
  };

  const issueTest = async (id) => {
    try {
      await instance.put(`/admin/tests/issueTest/${id}`, { status: "issued" });
      setTests(
        tests.map((test) =>
          test.id === id ? { ...test, status: "issued" } : test
        )
      );
    } catch (error) {
      console.error("Error updating test status:", error);
    }
  };

  const updateTest = async (id, updatedData) => {
    try {
      await instance.put(`/admin/tests/${id}`, updatedData);
      setTests(
        tests.map((test) =>
          test.id === id ? { ...test, ...updatedData } : test
        )
      );
    } catch (error) {
      console.error("Error updating test:", error);
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
                <button
                  onClick={() =>
                    updateTest(test._id, {
                      name: prompt("Enter new name:", test.name),
                    })
                  }
                >
                  Update
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ViewTests;
