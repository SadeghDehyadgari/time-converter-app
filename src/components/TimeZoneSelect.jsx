// TimeZoneSelect.jsx
import React, { useState, useEffect } from "react";
import { Autocomplete, TextField, Chip, Paper } from "@mui/material";

function TimeZoneSelect({ value, onChange, label }) {
  const [isOpen, setIsOpen] = useState(false);
  const timeZones = Intl.supportedValuesOf("timeZone");

  // Prevent body scroll when dropdown is open on mobile
  useEffect(() => {
    if (isOpen) {
      // Save current scroll position
      const scrollY = window.scrollY;

      // Prevent body scroll
      document.body.style.overflow = "hidden";
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = "100%";

      return () => {
        // Restore body scroll
        document.body.style.overflow = "";
        document.body.style.position = "";
        document.body.style.top = "";
        document.body.style.width = "";
        window.scrollTo(0, scrollY);
      };
    }
  }, [isOpen]);

  return (
    <Autocomplete
      value={value}
      onChange={(event, newValue) => {
        onChange(newValue || "");
      }}
      onOpen={() => setIsOpen(true)}
      onClose={() => setIsOpen(false)}
      options={timeZones}
      PaperComponent={(props) => (
        <Paper
          {...props}
          sx={{
            background: (theme) =>
              theme.palette.mode === "light"
                ? "rgba(255, 255, 255, 0.95)"
                : "rgba(30, 30, 30, 0.95)",
            backdropFilter: "blur(20px)",
            border: (theme) =>
              `1px solid ${
                theme.palette.mode === "light"
                  ? "rgba(99, 102, 241, 0.2)"
                  : "rgba(139, 92, 246, 0.2)"
              }`,
            boxShadow: (theme) =>
              theme.palette.mode === "light"
                ? "0 8px 32px rgba(99, 102, 241, 0.15)"
                : "0 8px 32px rgba(0, 0, 0, 0.4)",
            maxHeight: 300,
            overflow: "auto",
          }}
        />
      )}
      ListboxProps={{
        sx: {
          maxHeight: 300,
          "&::-webkit-scrollbar": {
            width: "8px",
          },
          "&::-webkit-scrollbar-track": {
            background: (theme) =>
              theme.palette.mode === "light"
                ? "rgba(0,0,0,0.05)"
                : "rgba(255,255,255,0.05)",
            borderRadius: "4px",
          },
          "&::-webkit-scrollbar-thumb": {
            background: (theme) =>
              theme.palette.mode === "light"
                ? "rgba(0,0,0,0.2)"
                : "rgba(255,255,255,0.2)",
            borderRadius: "4px",
            "&:hover": {
              background: (theme) =>
                theme.palette.mode === "light"
                  ? "rgba(0,0,0,0.3)"
                  : "rgba(255,255,255,0.3)",
            },
          },
        },
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
          placeholder="Search timezone..."
          variant="outlined"
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: 2,
              transition: "all 0.2s ease-in-out",
              "&:hover": {
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: "primary.main",
                },
              },
              "&.Mui-focused": {
                "& .MuiOutlinedInput-notchedOutline": {
                  borderWidth: 2,
                  borderColor: "primary.main",
                },
              },
            },
            "& .MuiInputLabel-root": {
              fontWeight: 500,
            },
          }}
        />
      )}
      renderOption={(props, option) => (
        <li
          {...props}
          style={{
            padding: "8px 12px",
            borderBottom: (theme) =>
              `1px solid ${
                theme.palette.mode === "light"
                  ? "rgba(0,0,0,0.05)"
                  : "rgba(255,255,255,0.05)"
              }`,
          }}
        >
          <Chip
            label={option.split("/")[0]}
            size="small"
            variant="outlined"
            sx={{
              mr: 1,
              fontSize: "0.7rem",
            }}
          />
          {option}
        </li>
      )}
      fullWidth
    />
  );
}

export default TimeZoneSelect;
