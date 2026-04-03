import { useEffect, useState } from "react";
import QuestionCard from "../components/QuestionCard";
import { useUser } from "@clerk/clerk-react";
import { useAuth } from "@clerk/clerk-react";
import { useMemo } from "react";
import { createAPI } from "../api/axios";


const Home = () => {
  const [question, setQuestion] = useState(null);
  const [loading, setLoading] = useState(false);
  const { user } = useUser();
  console.log("User ID:", user?.id);
  const USER_ID = user?.id;
  if (!USER_ID) return;
  const { getToken } = useAuth();
  const API = useMemo(() => createAPI(getToken), [getToken]);

  // 🎯 Get random unsolved question
  const fetchQuestion = async () => {
    try {
      setLoading(true);
      const res = await API.get(`/questions/unsolved/${USER_ID}`);
      setQuestion(res.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };


  const handleSolve = async (id) => {
    await API.post("/progress/update", {
      userId: USER_ID,
      questionId: id,
      status: "solved",
    });

    fetchQuestion();
  };

  // ⏭ Skip
  const handleSkip = async (id) => {
    await API.post("/progress/update", {
      userId: USER_ID,
      questionId: id,
      status: "skipped",
    });

    fetchQuestion();
  };

  useEffect(() => {
    fetchQuestion();
  }, [USER_ID]);

  return (
    <div
      style={{
        padding: "20px",
        color: "white",
        background: "#0f172a",
        height: "100vh",
      }}
    >
      <div>Welcome {user?.firstName}</div>
      <h1 style={{
        padding: "12px",
        textAlign: "center",
        fontSize: "30px",
        fontWeight: "bold"
      }}>
        🎯 Random DSA Question Picker From Love Babbar DSA Sheet
      </h1>

      <button onClick={fetchQuestion}>🔄 New Question</button>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <QuestionCard
          question={question}
          onSolve={handleSolve}
          onSkip={handleSkip}
        />
      )}
    </div>
  );
};

const styles = {
  container: {
    maxWidth: "600px",
    margin: "50px auto",
    textAlign: "center",
  },
};

export default Home;