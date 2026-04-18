import AddTodoForm from "../components/AddTodoForm";
import TodoList from "../components/TodoList";
import { useTheme } from "../context/ThemeContext";
import { useTodos } from "../hooks/useTodos";

export default function TodoPage() {
  const { theme } = useTheme();
  const { todos, isChainValid } = useTodos();

  const isDark = theme === "dark";
  const isOcean = theme === "ocean";

  const textColor = isDark || isOcean ? "#f8fafc" : "#0f172a";
  const subTextColor = isDark || isOcean ? "#cbd5e1" : "#475569";

  const heroBg = isDark
    ? "linear-gradient(135deg, #0f172a, #1e293b)"
    : isOcean
    ? "linear-gradient(135deg, rgba(14,165,233,0.28), rgba(255,255,255,0.12))"
    : "linear-gradient(135deg, #eff6ff, #ffffff)";

  const cardBg = isDark
    ? "#1e293b"
    : isOcean
    ? "rgba(255,255,255,0.12)"
    : "#ffffff";

  const softCardBg = isDark
    ? "#0f172a"
    : isOcean
    ? "rgba(255,255,255,0.08)"
    : "#f8fafc";

  const borderColor = isDark ? "#334155" : isOcean ? "#7dd3fc" : "#e5e7eb";

  const activeTodos = todos.filter((t) => !t.completed);
  const completedTodos = todos.filter((t) => t.completed);
  const maxReached = activeTodos.length >= 5;

  return (
    <main
      style={{
        maxWidth: "980px",
        margin: "0 auto",
        padding: "36px 20px 48px",
      }}
    >
      {!isChainValid && (
        <div
          style={{
            background:
              "linear-gradient(135deg, rgba(127,29,29,0.95), rgba(153,27,27,0.95))",
            color: "#ffffff",
            padding: "16px 18px",
            borderRadius: "16px",
            marginBottom: "22px",
            fontWeight: 800,
            textAlign: "center",
            letterSpacing: "0.08em",
            boxShadow: "0 10px 24px rgba(127,29,29,0.28)",
            border: "1px solid rgba(255,255,255,0.14)",
          }}
        >
          REDACTED / TAMPERED
        </div>
      )}

      <section
        style={{
          background: heroBg,
          border: `1px solid ${borderColor}`,
          borderRadius: "24px",
          padding: "28px",
          marginBottom: "24px",
          boxShadow: "0 16px 32px rgba(15, 23, 42, 0.08)",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "22px",
            alignItems: "center",
          }}
        >
          <div>
            <p
              style={{
                margin: "0 0 10px",
                color: isOcean ? "#e0f2fe" : "#3b82f6",
                fontWeight: 800,
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                fontSize: "0.82rem",
              }}
            >
              Todo Dashboard
            </p>

            <h1
              style={{
                color: textColor,
                margin: "0 0 10px",
                fontSize: "clamp(2rem, 4vw, 3rem)",
                lineHeight: 1.1,
              }}
            >
              Stay focused. Finish in order.
            </h1>

            <p
              style={{
                color: subTextColor,
                margin: 0,
                lineHeight: 1.8,
                maxWidth: "620px",
              }}
            >
              Manage your tasks with backend synchronization, focus-flow rules,
              tamper detection, and proof-of-work validation.
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, minmax(120px, 1fr))",
              gap: "14px",
            }}
          >
            <div
              style={{
                backgroundColor: softCardBg,
                border: `1px solid ${borderColor}`,
                borderRadius: "18px",
                padding: "18px",
              }}
            >
              <p
                style={{
                  margin: "0 0 8px",
                  color: subTextColor,
                  fontSize: "0.92rem",
                  fontWeight: 600,
                }}
              >
                Active
              </p>
              <h2
                style={{
                  margin: 0,
                  color: textColor,
                  fontSize: "1.8rem",
                }}
              >
                {activeTodos.length}
              </h2>
            </div>

            <div
              style={{
                backgroundColor: softCardBg,
                border: `1px solid ${borderColor}`,
                borderRadius: "18px",
                padding: "18px",
              }}
            >
              <p
                style={{
                  margin: "0 0 8px",
                  color: subTextColor,
                  fontSize: "0.92rem",
                  fontWeight: 600,
                }}
              >
                Completed
              </p>
              <h2
                style={{
                  margin: 0,
                  color: textColor,
                  fontSize: "1.8rem",
                }}
              >
                {completedTodos.length}
              </h2>
            </div>

            <div
              style={{
                backgroundColor: softCardBg,
                border: `1px solid ${borderColor}`,
                borderRadius: "18px",
                padding: "18px",
              }}
            >
              <p
                style={{
                  margin: "0 0 8px",
                  color: subTextColor,
                  fontSize: "0.92rem",
                  fontWeight: 600,
                }}
              >
                Limit
              </p>
              <h2
                style={{
                  margin: 0,
                  color: textColor,
                  fontSize: "1.8rem",
                }}
              >
                5
              </h2>
            </div>

            <div
              style={{
                backgroundColor: softCardBg,
                border: `1px solid ${borderColor}`,
                borderRadius: "18px",
                padding: "18px",
              }}
            >
              <p
                style={{
                  margin: "0 0 8px",
                  color: subTextColor,
                  fontSize: "0.92rem",
                  fontWeight: 600,
                }}
              >
                Chain
              </p>
              <h2
                style={{
                  margin: 0,
                  color: isChainValid ? "#22c55e" : "#ef4444",
                  fontSize: "1.2rem",
                }}
              >
                {isChainValid ? "Valid" : "Tampered"}
              </h2>
            </div>
          </div>
        </div>
      </section>

      <section
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "16px",
          marginBottom: "24px",
        }}
      >
        <div
          style={{
            backgroundColor: cardBg,
            border: `1px solid ${borderColor}`,
            borderRadius: "18px",
            padding: "18px",
            boxShadow: "0 10px 24px rgba(15, 23, 42, 0.05)",
          }}
        >
          <h3 style={{ marginTop: 0, marginBottom: "8px", color: textColor }}>
            Focus-Flow Rules
          </h3>
          <p style={{ margin: 0, color: subTextColor, lineHeight: 1.7 }}>
            Tasks must be completed in creation order. Older pending tasks have
            priority over newer ones.
          </p>
        </div>

        <div
          style={{
            backgroundColor: cardBg,
            border: `1px solid ${borderColor}`,
            borderRadius: "18px",
            padding: "18px",
            boxShadow: "0 10px 24px rgba(15, 23, 42, 0.05)",
          }}
        >
          <h3 style={{ marginTop: 0, marginBottom: "8px", color: textColor }}>
            Ghosting Rule
          </h3>
          <p style={{ margin: 0, color: subTextColor, lineHeight: 1.7 }}>
            Completed tasks vanish automatically after 15 seconds unless they
            are undone before the timer finishes.
          </p>
        </div>

        <div
          style={{
            backgroundColor: cardBg,
            border: `1px solid ${borderColor}`,
            borderRadius: "18px",
            padding: "18px",
            boxShadow: "0 10px 24px rgba(15, 23, 42, 0.05)",
          }}
        >
          <h3 style={{ marginTop: 0, marginBottom: "8px", color: textColor }}>
            Capacity Rule
          </h3>
          <p style={{ margin: 0, color: subTextColor, lineHeight: 1.7 }}>
            You can only keep up to 5 active tasks. Add is disabled once the
            limit is reached.
          </p>
        </div>
      </section>

      {maxReached && (
        <div
          style={{
            background:
              "linear-gradient(135deg, rgba(127,29,29,0.95), rgba(153,27,27,0.95))",
            color: "#ffffff",
            fontWeight: 700,
            padding: "14px 16px",
            borderRadius: "16px",
            marginBottom: "20px",
            boxShadow: "0 10px 24px rgba(127,29,29,0.24)",
          }}
        >
          Maximum of 5 active tasks reached. Complete a task first before adding
          another.
        </div>
      )}

      <AddTodoForm maxReached={maxReached} />

      <section
        style={{
          backgroundColor: cardBg,
          border: `1px solid ${borderColor}`,
          borderRadius: "20px",
          padding: "20px",
          boxShadow: "0 12px 28px rgba(15, 23, 42, 0.05)",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "12px",
            flexWrap: "wrap",
            marginBottom: "16px",
          }}
        >
          <div>
            <h2
              style={{
                margin: "0 0 6px",
                color: textColor,
                fontSize: "1.25rem",
              }}
            >
              Task Queue
            </h2>
            <p
              style={{
                margin: 0,
                color: subTextColor,
              }}
            >
              View, complete, edit, and manage your current tasks.
            </p>
          </div>

          <div
            style={{
              padding: "8px 12px",
              borderRadius: "999px",
              backgroundColor: softCardBg,
              border: `1px solid ${borderColor}`,
              color: subTextColor,
              fontWeight: 700,
            }}
          >
            Total: {todos.length}
          </div>
        </div>

        <TodoList />
      </section>
    </main>
  );
}