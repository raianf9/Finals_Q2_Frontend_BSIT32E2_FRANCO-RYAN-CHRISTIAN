import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useTodos } from "../hooks/useTodos";
import { useTheme } from "../context/ThemeContext";

type FormValues = {
  title: string;
};

type Props = {
  maxReached: boolean;
};

export default function AddTodoForm({ maxReached }: Props) {
  const { addTodo } = useTodos();
  const { theme } = useTheme();
  const navigate = useNavigate();
  const [isMining, setIsMining] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>();

  const isDark = theme === "dark";
  const isOcean = theme === "ocean";

  const cardBg = isDark
    ? "#1e293b"
    : isOcean
    ? "rgba(255,255,255,0.12)"
    : "#ffffff";

  const inputBg = isDark
    ? "#0f172a"
    : isOcean
    ? "rgba(255,255,255,0.9)"
    : "#ffffff";

  const textColor = isDark || isOcean ? "#f8fafc" : "#0f172a";
  const subTextColor = isDark || isOcean ? "#cbd5e1" : "#475569";
  const borderColor = isDark ? "#334155" : isOcean ? "#7dd3fc" : "#e5e7eb";

  const onSubmit = async (data: FormValues) => {
    if (maxReached || isMining) return;

    const trimmedTitle = data.title.trim();
    if (!trimmedTitle) return;

    setIsMining(true);
    try {
      const success = await addTodo(trimmedTitle);

      if (success) {
        reset();
        navigate("/");
      }
    } finally {
      setIsMining(false);
    }
  };

  return (
    <section
      style={{
        backgroundColor: cardBg,
        border: `1px solid ${borderColor}`,
        borderRadius: "18px",
        padding: "20px",
        marginBottom: "24px",
      }}
    >
      <h2
        style={{
          marginTop: 0,
          marginBottom: "8px",
          color: textColor,
          fontSize: "1.1rem",
        }}
      >
        Add a New Task
      </h2>

      <p
        style={{
          marginTop: 0,
          marginBottom: "16px",
          color: subTextColor,
          lineHeight: 1.7,
        }}
      >
        You can keep up to 5 active tasks at a time.
      </p>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div style={{ marginBottom: "12px" }}>
          <label
            htmlFor="title"
            style={{
              display: "block",
              marginBottom: "8px",
              fontWeight: 600,
              color: textColor,
            }}
          >
            Task Title
          </label>

          <input
            id="title"
            type="text"
            placeholder="Enter todo title"
            disabled={maxReached || isMining}
            {...register("title", {
              required: "Title is required",
              validate: (value) =>
                value.trim().length > 0 || "Title cannot be empty",
            })}
            style={{
              width: "100%",
              padding: "12px 14px",
              borderRadius: "12px",
              border: `1px solid ${borderColor}`,
              backgroundColor: inputBg,
              color: textColor,
              opacity: maxReached || isMining ? 0.6 : 1,
            }}
          />

          {errors.title && (
            <p style={{ color: "#ef4444", marginTop: "8px", marginBottom: 0 }}>
              {errors.title.message}
            </p>
          )}
        </div>

        {maxReached && (
          <p
            style={{
              color: "#f59e0b",
              fontWeight: 600,
              marginTop: "0",
              marginBottom: "14px",
            }}
          >
            Add is disabled because you already have 5 active tasks.
          </p>
        )}

        {isMining && (
          <p
            style={{
              color: "#60a5fa",
              fontWeight: 600,
              marginTop: "0",
              marginBottom: "14px",
            }}
          >
            Mining proof of work...
          </p>
        )}

        <button
          type="submit"
          disabled={maxReached || isMining}
          style={{
            backgroundColor: maxReached || isMining ? "#94a3b8" : "#3b82f6",
            color: "#ffffff",
            border: "none",
            padding: "12px 18px",
            borderRadius: "12px",
            fontWeight: 700,
            cursor: maxReached || isMining ? "not-allowed" : "pointer",
          }}
        >
          {isMining ? "Mining..." : "Add Todo"}
        </button>
      </form>
    </section>
  );
}