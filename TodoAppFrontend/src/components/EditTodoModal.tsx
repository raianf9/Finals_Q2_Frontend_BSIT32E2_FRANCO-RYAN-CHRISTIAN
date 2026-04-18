import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTodos } from "../hooks/useTodos";
import { useTheme } from "../context/ThemeContext";
import type { Todo } from "../context/TodoContext";

type Props = {
  todo: Todo;
  onClose: () => void;
};

export default function EditTodoModal({ todo, onClose }: Props) {
  const [title, setTitle] = useState(todo.title);
  const [isMining, setIsMining] = useState(false);
  const { updateTodo } = useTodos();
  const { theme } = useTheme();
  const navigate = useNavigate();

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
  const inputBg = isDark
    ? "#0f172a"
    : isOcean
    ? "rgba(255,255,255,0.9)"
    : "#ffffff";

  const handleSave = async () => {
    if (isMining) return;

    const trimmedTitle = title.trim();
    if (!trimmedTitle) return;

    setIsMining(true);
    try {
      const success = await updateTodo(todo.id, trimmedTitle);

      if (success) {
        onClose();
        navigate("/");
      }
    } finally {
      setIsMining(false);
    }
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "rgba(0,0,0,0.55)",
        display: "grid",
        placeItems: "center",
        padding: "20px",
        zIndex: 1000,
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "500px",
          backgroundColor: cardBg,
          border: `1px solid ${borderColor}`,
          borderRadius: "20px",
          padding: "24px",
        }}
      >
        <h2 style={{ marginTop: 0, color: headingColor }}>Edit Todo</h2>

        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          disabled={isMining}
          style={{
            width: "100%",
            padding: "12px 14px",
            borderRadius: "12px",
            border: `1px solid ${borderColor}`,
            backgroundColor: inputBg,
            color: headingColor,
            marginBottom: "16px",
            opacity: isMining ? 0.6 : 1,
          }}
        />

        {isMining && (
          <p style={{ color: "#60a5fa", marginTop: 0, marginBottom: "12px" }}>
            Mining proof of work...
          </p>
        )}

        <div style={{ display: "flex", gap: "12px" }}>
          <button
            onClick={handleSave}
            disabled={isMining}
            style={{
              backgroundColor: isMining ? "#94a3b8" : "#3b82f6",
              color: "#ffffff",
              border: "none",
              padding: "10px 16px",
              borderRadius: "12px",
              fontWeight: 700,
              cursor: isMining ? "not-allowed" : "pointer",
            }}
          >
            {isMining ? "Mining..." : "Save"}
          </button>

          <button
            onClick={onClose}
            disabled={isMining}
            style={{
              backgroundColor: isMining ? "#94a3b8" : "#64748b",
              color: "#ffffff",
              border: "none",
              padding: "10px 16px",
              borderRadius: "12px",
              fontWeight: 700,
              cursor: isMining ? "not-allowed" : "pointer",
            }}
          >
            Cancel
          </button>
        </div>

        <p style={{ color: textColor, marginTop: "12px" }}>
          Update the title, then save your changes.
        </p>
      </div>
    </div>
  );
}