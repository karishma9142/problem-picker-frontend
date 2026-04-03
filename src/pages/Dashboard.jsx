import { useEffect, useState } from "react";
import { useAuth } from "@clerk/clerk-react";
import { createAPI } from "../api/axios";

const Dashboard = () => {
    const { getToken } = useAuth();
    const API = createAPI(getToken);

    const [data, setData] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            const res = await API.get("/dashboard");
            setData(res.data);
        };

        fetchData();
    }, []);

    return (
        <div style={{ padding: "20px", color: "white", background: "#0f172a" ,height:"100vh"}}>
            <h1>📊 Dashboard</h1>

            {Object.keys(data).length === 0 ? (
                <p>No activity yet</p>
            ) : (
                Object.entries(data)
                    .filter(([day]) => day !== "undefined")
                    .sort((a, b) => new Date(b[0]) - new Date(a[0]))
                    .map(([day, questions]) => (
                        <div key={day} style={{ marginTop: "20px" }}>
                            <h2>📅 {day}</h2>

                            {questions.map((q, i) => (
                                <div key={i}>
                                    {q.status === "solved" ? "✔" : "⏭(Skip) "} {q.question}
                                </div>
                            ))}
                        </div>
                    ))
                    )}
        </div>
    );
};

export default Dashboard;