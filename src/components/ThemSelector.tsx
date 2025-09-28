import { PaletteIcon } from "lucide-react";
import { THEMES } from "../constants";
import type { themeOptions } from "../types";
import { useThemeStore } from "../store/useThemeStore";

const ThemSelector = () => {
  const { theme, setTheme } = useThemeStore();
  return (
    <div className="dropdown dropdown-end">
      {/* dropdown trigger */}
      <button tabIndex={0} className="btn btn-ghost btn-circle">
        <PaletteIcon className="size-5" />
      </button>
      <div
        tabIndex={0}
        className="dropdown-content mt-2 p-1 shadow-2xl bg-base-200 backdrop-blur-lg rounded-2xl w-56 border border-base-content/10"
      >
        {THEMES.map((themeOptions: themeOptions) => {
          return (
            <button
              key={themeOptions.name}
              className={`
            w-full px-4 py-3 rounded-xl flex items-center gap-3 transform-colors
            ${
              theme === themeOptions.name
                ? "bg-primary/10 text-primary"
                : "hover:bg-base-content/5"
            }
            
            `}
              onClick={() => setTheme(themeOptions.name)}
            >
              <PaletteIcon className="size-4" />
              <span className="text-sm font-medium">{themeOptions.label}</span>
              <div className="ml-auto flex gap-1">
                {themeOptions.colors.map((color: string, i: number) => (
                  <span
                    key={i}
                    className="size-2 rounded-full"
                    style={{ backgroundColor: color }}
                  ></span>
                ))}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default ThemSelector;
