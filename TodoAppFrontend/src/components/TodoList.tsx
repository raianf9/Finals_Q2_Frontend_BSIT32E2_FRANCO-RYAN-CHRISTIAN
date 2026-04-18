import { useTodos } from "../hooks/useTodos";
import { useTheme } from "../context/ThemeContext";
import TodoItem from "./TodoItem";

export default function TodoList() {
  const { todos } = useTodos();
  const { theme } = useTheme();

  const textColor =
    theme === "dark" || theme === "ocean" ? "#f8fafc" : "#0f172a";

  if (todos.length === 0) {
    return <p style={{ color: textColor }}>No todos yet.</p>;
  }

  return (
    <ul style={{ padding: 0, margin: 0 }}>
        {todos.map((t) => (<TodoItem key={t.id} todo={t} />))}
    </ul>
  );
}