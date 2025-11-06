import React from "react";
import { Autocomplete, TextField, Chip } from "@mui/material";

function TimeZoneSelect({ value, onChange, label }) {
  const timeZones = Intl.supportedValuesOf("timeZone");

  return (
    <Autocomplete
      value={value}
      onChange={(event, newValue) => {
        onChange(newValue || "");
      }}
      options={timeZones}
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
        <li {...props}>
          <Chip
            label={option.split("/")[0]}
            size="small"
            variant="outlined"
            sx={{ mr: 1 }}
          />
          {option}
        </li>
      )}
      fullWidth
    />
  );
}

export default TimeZoneSelect;
