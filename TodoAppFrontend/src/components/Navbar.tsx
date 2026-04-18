import { NavLink } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

export default function Navbar() {
  const { theme, setTheme } = useTheme();

  const isDark = theme === "dark";
  const isOcean = theme === "ocean";

  const bgColor = isDark
    ? "#0f172a"
    : isOcean
    ? "rgba(255,255,255,0.1)"
    : "#ffffff";

  const borderColor = isDark ? "#334155" : isOcean ? "#7dd3fc" : "#e5e7eb";
  const textColor = isDark || isOcean ? "#f8fafc" : "#0f172a";

  const linkStyle = ({ isActive }: { isActive: boolean }) => ({
    textDecoration: "none",
    color: isActive ? "#ffffff" : textColor,
    backgroundColor: isActive ? "#2563eb" : "transparent",
    fontWeight: isActive ? 700 : 600,
    padding: "10px 16px",
    borderRadius: "999px",
  });

  return (
    <nav
      style={{
        borderBottom: `1px solid ${borderColor}`,
        backgroundColor: bgColor,
      }}
    >
      <div
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
          padding: "14px 20px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "16px",
          flexWrap: "wrap",
        }}
      >
        <div style={{ fontWeight: 800, fontSize: "1.05rem", color: textColor }}>
          Todo Manager
        </div>

        <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
          <NavLink to="/" style={linkStyle}>
            Todos
          </NavLink>
          <NavLink to="/about" style={linkStyle}>
            About
          </NavLink>

          <select
            value={theme}
            onChange={(e) => setTheme(e.target.value as "light" | "dark" | "ocean")}
            style={{
              padding: "8px 10px",
              borderRadius: "8px",
              border: `1px solid ${borderColor}`,
              backgroundColor: bgColor,
              color: textColor,
            }}
          >
            <option value="light">Light</option>
            <option value="dark">Dark</option>
            <option value="ocean">Ocean</option>
          </select>
        </div>
      </div>
    </nav>
  );
}