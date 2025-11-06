import React from "react";
import { IconButton, Tooltip } from "@mui/material";
import { SwapHoriz } from "@mui/icons-material";

function SwapButton({ onClick }) {
  return (
    <Tooltip title="Swap timezones" arrow>
      <IconButton
        onClick={onClick}
        color="primary"
        aria-label="Swap timezones"
        sx={{
          borderRadius: 3,
          padding: 2,
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
            transform: "rotate(180deg) scale(1.1)",
          },
          "&:active": {
            transform: "rotate(180deg) scale(0.95)",
          },
        }}
      >
        <SwapHoriz sx={{ fontSize: 28 }} />
      </IconButton>
    </Tooltip>
  );
}

export default SwapButton;
