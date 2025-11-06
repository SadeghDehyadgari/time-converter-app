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
          fontSize: "16px",
          minHeight: "56px",
        },
        "& .MuiInputLabel-root": {
          fontSize: "16px",
          fontWeight: 500,
        },
        "& .MuiOutlinedInput-input": {
          fontSize: "16px",
          padding: "16px 14px",
        },
        '& input[type="datetime-local"]::-webkit-calendar-picker-indicator': {
          filter: (theme) =>
            theme.palette.mode === "dark" ? "invert(1)" : "invert(0)",
          opacity: 0.7,
          cursor: "pointer",
          padding: "8px",
          margin: "0 4px",
          "&:hover": {
            opacity: 1,
          },
        },
      }}
    />
  );
}

export default DateTimePicker;
