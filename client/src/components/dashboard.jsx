import React, { useEffect, useState } from "react";
import axios from "axios";
import SuprSendInbox from '@suprsend/react-inbox';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../css/dashboard.css";

const Dashboard = () => {
  const [students, setStudents] = useState(0);
  const [admin, setAdmin] = useState(0);
  const [books, setBooks] = useState(0);

  useEffect(() => {
    // Fetch data from backend or local storage
    const fetchData = async () => {
      try {
        // Example of fetching data from backend
        const res = await axios.get("http://localhost:3001/dashboard");
        if (res.data.ok) {
          setStudents(res.data.student);
          setAdmin(res.data.admin);
          setBooks(res.data.book);
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="dashboard">
      <div className="dashboard-box">
        <h2>Total Books</h2>
        <h2>{books}</h2>
      </div>
      <div className="dashboard-box">
        <h2>Total Students</h2>
        <h2>{students}</h2>
      </div>
      <div className="dashboard-box">
        <h2>Total Admins</h2>
        <h2>{admin}</h2>
      </div>
      
      <div className="notification-inbox">
        <h3>Notification Inbox</h3>
        <SuprSendInbox
          workspaceKey="<workspace_key>"
          subscriberId="<subscriber_id>"
          distinctId="<distinct_id>"
          theme={{
            header: {
              container: {
                backgroundColor: "#f4f4f4", // Light gray background
                padding: "10px", // Padding around the header
                borderBottom: "1px solid #ccc" // Bottom border for separation
              },
              headertext: {
                color: "#333", // Dark text color
                fontSize: "18px", // Font size for the header text
                fontWeight: "bold" // Bold font weight
              },
              markAllReadText: {
                color: "#007bff", // Blue color for the "mark all read" text
                cursor: "pointer" // Pointer cursor on hover
              }
            }
          }}
          pageSize={10} // Number of notifications per page
          pagination={true} // Enable pagination
        />
      </div>

      <ToastContainer />
    </div>
  );
};

export default Dashboard;
