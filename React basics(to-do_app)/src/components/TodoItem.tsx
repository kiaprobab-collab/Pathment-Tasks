
import Button from "./Button";

const TodoItem = (props: any) => {
  console.log(props);

  function doneTodo() {
    props.completedTodo(props.id);
  }

  function undoneTodo() {
    props.undoTodo(props.id);
  }

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "400px",
          padding: "14px",
          marginBottom: "12px",
          borderRadius: "12px",
          backgroundColor: props.completed ? "#ecfdf5" : "#fafafa",
          border: "1px solid #e5e7eb",
          margin:"20px"
        }}
      >
        <h3
          style={{
            margin: 0,
            fontWeight: 500,
            textDecoration: props.completed ? "line-through" : "none",
            color: props.completed ? "#6b7280" : "#111827",
          }}
        >
          {props.title}
        </h3>
        <div style={{ display: "flex", gap: "8px" }}>
          <Button title="Done" functionality={doneTodo} />
          <Button title="Undo" functionality={undoneTodo} />
        </div>
      </div>
    </div>
  );
};

export default TodoItem;
