import React from "react";
import { TextField, Box, IconButton } from "@mui/material";
import { CalendarToday } from "@mui/icons-material";
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

  const handleCalendarClick = () => {
    const input = document.getElementById("datetime-input");
    if (input) {
      input.showPicker();
    }
  };

  return (
    <Box sx={{ position: "relative" }}>
      <TextField
        id="datetime-input"
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
            paddingRight: { xs: "50px", sm: "14px" },
          },
          '& input[type="datetime-local"]::-webkit-calendar-picker-indicator': {
            display: { xs: "none", sm: "block" },
            filter: (theme) =>
              theme.palette.mode === "dark" ? "invert(1)" : "invert(0)",
            opacity: 0.7,
            cursor: "pointer",
            "&:hover": {
              opacity: 1,
            },
          },
        }}
        InputLabelProps={{
          shrink: true,
        }}
      />
      <IconButton
        onClick={handleCalendarClick}
        sx={{
          position: "absolute",
          right: "8px",
          top: "50%",
          transform: "translateY(-50%)",
          color: "text.secondary",
          display: { xs: "flex", sm: "none" },
        }}
      >
        <CalendarToday />
      </IconButton>
    </Box>
  );
}

export default DateTimePicker;
