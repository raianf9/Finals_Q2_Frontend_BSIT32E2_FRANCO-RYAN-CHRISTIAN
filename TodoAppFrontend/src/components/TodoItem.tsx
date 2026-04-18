import { useState } from "react";
import { useTodos } from "../hooks/useTodos";
import { useTheme } from "../context/ThemeContext";
import EditTodoModal from "./EditTodoModal";
import type { Todo } from "../context/TodoContext";

type Props = {
  todo: Todo;
};

export default function TodoItem({ todo }: Props) {
  const { todos, deleteTodo, toggleTodo } = useTodos();
  const { theme } = useTheme();
  const [isEditing, setIsEditing] = useState(false);

  const isDark = theme === "dark";
  const isOcean = theme === "ocean";

  const cardBg = isDark
    ? "#1e293b"
    : isOcean
    ? "rgba(255,255,255,0.12)"
    : "#ffffff";

  const borderColor = isDark ? "#334155" : isOcean ? "#7dd3fc" : "#e5e7eb";
  const headingColor = isDark || isOcean ? "#f8fafc" : "#0f172a";
  const textColor = isDark || isOcean ? "#cbd5e1" : "#475569";

  const activeTodos = todos
    .filter((t) => !t.completed)
    .sort(
      (a, b) =>
        new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
    );

  const firstActiveId = activeTodos.length > 0 ? activeTodos[0].id : null;

  const isOldestActive = todo.id === firstActiveId;


  const canToggle = todo.completed || isOldestActive;

  const createdLabel = new Date(todo.createdAt).toLocaleString();

  return (
    <>
      <li
        style={{
          listStyle: "none",
          backgroundColor: cardBg,
          border: `1px solid ${borderColor}`,
          borderRadius: "18px",
          padding: "18px",
          marginBottom: "14px",
        }}
      >
        <h3
          style={{
            marginTop: 0,
            marginBottom: "8px",
            color: headingColor,
            textDecoration: todo.completed ? "line-through" : "none",
          }}
        >
          {todo.title}
        </h3>

        <p style={{ color: textColor, marginTop: 0, marginBottom: "6px" }}>
          Status: {todo.completed ? "Completed" : "Pending"}
        </p>

        <p style={{ color: textColor, marginTop: 0, marginBottom: "10px" }}>
          Created: {createdLabel}
        </p>

        {!todo.completed && isOldestActive && (
          <p style={{ color: "#22c55e", fontWeight: 600, marginTop: 0 }}>
            Next task in line for completion.
          </p>
        )}

        {!todo.completed && !canToggle && (
          <p style={{ color: "#f59e0b", fontWeight: 600, marginTop: 0 }}>
            Complete older tasks first.
          </p>
        )}

        {todo.completed && (
          <p style={{ color: "#60a5fa", fontWeight: 600, marginTop: 0 }}>
            This task will vanish 15 seconds after completion.
          </p>
        )}

        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
          <button
            onClick={() => toggleTodo(todo)}
            disabled={!canToggle}
            style={{
              backgroundColor: canToggle ? "#22c55e" : "#94a3b8",
              color: "#ffffff",
              border: "none",
              padding: "10px 14px",
              borderRadius: "10px",
              fontWeight: 700,
              cursor: canToggle ? "pointer" : "not-allowed",
            }}
          >
            {todo.completed ? "Undo" : "Complete"}
          </button>

          <button
            onClick={() => setIsEditing(true)}
            disabled={todo.completed}
            style={{
              backgroundColor: todo.completed ? "#94a3b8" : "#f59e0b",
              color: "#ffffff",
              border: "none",
              padding: "10px 14px",
              borderRadius: "10px",
              fontWeight: 700,
              cursor: todo.completed ? "not-allowed" : "pointer",
            }}
          >
            Edit
          </button>

          <button
            onClick={() => deleteTodo(todo.id)}
            style={{
              backgroundColor: "#ef4444",
              color: "#ffffff",
              border: "none",
              padding: "10px 14px",
              borderRadius: "10px",
              fontWeight: 700,
              cursor: "pointer",
            }}
          >
            Delete
          </button>
        </div>
      </li>

      {isEditing && (
        <EditTodoModal todo={todo} onClose={() => setIsEditing(false)} />
      )}
    </>
  );
}