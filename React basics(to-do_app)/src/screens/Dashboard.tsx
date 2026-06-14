import React, { useState } from "react";
import TodoItem from "../components/TodoItem";
import { CenterComponent } from "../components/CenterComponent";

// }
const Dashboard = (props) => {
  console.log("Dashboard rendered");
  const [todo, setTodo] = useState([
    { id: 1, title: "Learn React", completed: false },
  ]);
  const [inputValue, setInputValue] = useState("");

  function saveTodo() {
    if (inputValue === "") {
      return;
    }
    const newTodo = {
      id: Date.now(),
      title: inputValue,
      completed: false,
    };
    setTodo([...todo, newTodo]);
    setInputValue("");
  }

  function doneTodo(id) {
    setTodo(
      todo.map((t) => {
        if (t.id === id) {
          return { ...t, completed: true };
        }
        return t;
      }),
    );
  }

  function undoneTodo(id) {
    setTodo(
      todo.map((t) => {
        if (t.id === id) {
          return { ...t, completed: false };
        }
        return t;
      }),
    );
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f5f5f5",
      }}
    >
      <CenterComponent>
        <div
          style={{
            width: "500px",
            backgroundColor: "white",
            padding: "30px",
            borderRadius: "16px",
          }}
        >
          <h1
            style={{
              marginBottom: "24px",
              textAlign: "center",
              fontSize: "32px",
              fontWeight: "600",
            }}
          >
            Todo Application
          </h1>
          <div
            style={{
              display: "flex",
              gap: "10px",
              marginBottom: "20px",
            }}
          >
            <input
              type="text"
              placeholder="Enter todo"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              style={{
                flex: 1,
                padding: "12px",
                borderRadius: "10px",
                border: "1px solid #ddd",
                outline: "none",
                fontSize: "16px",
              }}
            ></input>
            <button
              onClick={saveTodo}
              style={{
                padding: "12px 18px",
                border: "none",
                borderRadius: "10px",
                backgroundColor: "#111827",
                color: "white",
                cursor: "pointer",
              }}
            >
              Add
            </button>
          </div>
        </div>

        <div style={{ justifyContent: "center", justifyItems: "center" }}>
          {todo.map((t) => (
            <TodoItem
              key={t.id}
              id={t.id}
              title={t.title}
              completedTodo={doneTodo}
              undoTodo={undoneTodo}
              completed={t.completed}
            ></TodoItem>
          ))}
        </div>
      </CenterComponent>
    </div>
  );
};

export default Dashboard;
