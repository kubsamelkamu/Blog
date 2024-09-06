import { useContext } from "react";
import { ThemeContext } from "./themecontext";

export const useTheme = () => useContext(ThemeContext);