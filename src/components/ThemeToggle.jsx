import React from "react";
import { IconButton, Tooltip } from "@mui/material";
import { Brightness4, Brightness7 } from "@mui/icons-material";

function ThemeToggle({ mode, toggleTheme }) {
  return (
    <Tooltip
      title={mode === "light" ? "Switch to dark mode" : "Switch to light mode"}
      arrow
    >
      <IconButton
        onClick={toggleTheme}
        color="inherit"
        aria-label="Toggle theme"
        sx={{
          borderRadius: 2,
          padding: 1,
          backgroundColor: (theme) =>
            theme.palette.mode === "dark"
              ? "rgba(139, 92, 246, 0.15)"
              : "rgba(99, 102, 241, 0.1)",
          transition: "all 0.3s ease-in-out",
          "&:hover": {
            backgroundColor: (theme) =>
              theme.palette.mode === "dark"
                ? "rgba(139, 92, 246, 0.25)"
                : "rgba(99, 102, 241, 0.2)",
            transform: "scale(1.1)",
          },
        }}
      >
        {mode === "light" ? <Brightness4 /> : <Brightness7 />}
      </IconButton>
    </Tooltip>
  );
}

export default ThemeToggle;
