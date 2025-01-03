import { useTheme } from "../hooks/useTheme";
import modeIcon from "../assets/mode-icon.svg";
// styles
import "./ThemeSelector.css";
const themeColors = ["#58249C", "#249C6B", "#B70233"];
export default function ThemeSelector() {

  const { changeColor, changeMode, mode } = useTheme();

  console.log(mode);
  
  return (
    <div className="theme-selector">
      <div className="mode-toggle">
        <img
          src={modeIcon}
          alt="light/dark theme"
          style={{ filter: mode === "dark" ? "invert(100%)" : "invert(20%)" }}
          onClick={() => changeMode(mode === "light" ? "dark" : "light")}
        />
      </div>
      <div className="theme-buttons">
        {themeColors.map((color) => (
          <div key={color} onClick={() => changeColor(color)} style={{ background: color }} />
        ))}
      </div>
    </div>
  );
}
