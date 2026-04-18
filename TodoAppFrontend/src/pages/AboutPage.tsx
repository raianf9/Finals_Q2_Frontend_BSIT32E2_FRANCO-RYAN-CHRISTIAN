import { useTheme } from "../context/ThemeContext";

export default function AboutPage() {
  const { theme } = useTheme();
  const textColor =
    theme === "dark" || theme === "ocean" ? "#f8fafc" : "#0f172a";
  const subTextColor =
    theme === "dark" || theme === "ocean" ? "#cbd5e1" : "#475569";

  return (
    <main style={{ maxWidth: "900px", margin: "0 auto", padding: "32px 20px" }}>
      <h1 style={{ color: textColor }}>About</h1>
      <p style={{ color: subTextColor, lineHeight: 1.8 }}>
        This Todo app uses React Router, Context API, react-hook-form, immutable
        state updates, and a .NET backend API.
      </p>
    </main>
  );
}