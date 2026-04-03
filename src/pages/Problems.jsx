import { useEffect, useState } from "react";
import { useMemo } from "react";
import { useAuth } from "@clerk/clerk-react";
import { createAPI } from "../api/axios";

const Problems = () => {
  const { getToken } = useAuth();
  const [data, setData] = useState([]);
  const API = useMemo(() => createAPI(getToken), [getToken]);
  useEffect(() => {
    const fetchData = async () => {
      const res = await API.get("/progress/all-status");
      setData(res.data);
    };

    fetchData();
  }, []);

  const getStatusUI = (status) => {
    if (status === "solved") return "Solved";
    if (status === "skipped") return "Skipped";
    return "Unsolved";
  };

  return (
    <div style={{ padding: "20px", color: "white", background: "#0f172a" }}>
      <h1>All Problems</h1>

      <div style={{ marginTop: "20px" }}>
        {data.map((q) => (
          <div
            key={q.id}
            style={{
              padding: "10px",
              marginBottom: "10px",
              background: "#1e293b",
              borderRadius: "8px",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <span>{q.title}</span>
            <span>{getStatusUI(q.status)}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Problems;