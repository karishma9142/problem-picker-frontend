const QuestionCard = ({ question, onSolve, onSkip }) => {
  if (!question) return <p>No question found</p>;

  return (
    <div style={styles.card}>
      <h2>{question.title}</h2>

      <p><b>Topic:</b> {question.topic}</p>
      <p><b>Difficulty:</b> {question.difficulty}</p>
      <p><b>Platform:</b> {question.platform}</p>

      <a href={question.link} target="_blank">
        Solve Problem 🔗
      </a>

      <div style={styles.buttons}>
        <button onClick={() => onSolve(question._id)}>
          ✅ Solved
        </button>
        <button onClick={() => onSkip(question._id)}>
          ⏭ Skip
        </button>
      </div>
    </div>
  );
};

const styles = {
  card: {
    border: "1px solid #ccc",
    padding: "20px",
    borderRadius: "10px",
    marginTop: "20px",
  },
  buttons: {
    marginTop: "10px",
    display: "flex",
    gap: "10px",
  },
};

export default QuestionCard;