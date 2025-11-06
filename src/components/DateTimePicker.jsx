import React from "react";
import { TextField } from "@mui/material";
import { format, parseISO } from "date-fns";

function DateTimePicker({ value, onChange, label }) {
  const formatDateForInput = (date) => {
    if (!date || isNaN(date.getTime())) return "";
    return format(date, "yyyy-MM-dd'T'HH:mm");
  };

  const handleChange = (event) => {
    const newValue = event.target.value;
    if (newValue) {
      const newDate = parseISO(newValue);
      if (!isNaN(newDate.getTime())) {
        onChange(newDate);
      }
    }
  };

  return (
    <TextField
      label={label}
      type="datetime-local"
      value={formatDateForInput(value)}
      onChange={handleChange}
      fullWidth
      variant="outlined"
      sx={{
        "& .MuiOutlinedInput-root": {
          borderRadius: 2,
          transition: "all 0.2s ease-in-out",
          fontSize: "16px",
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
          fontSize: "16px",
        },
        "& .MuiOutlinedInput-input": {
          fontSize: "16px",
        },
        '& input[type="datetime-local"]::-webkit-calendar-picker-indicator': {
          filter: (theme) =>
            theme.palette.mode === "dark" ? "invert(1)" : "invert(0)",
          opacity: 0.7,
          cursor: "pointer",
          "&:hover": {
            opacity: 1,
          },
        },
      }}
    />
  );
}

export default DateTimePicker;
