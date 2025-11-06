import React, { useState, useMemo } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { Container, Typography, Box, Paper } from "@mui/material";
import ThemeToggle from "./components/ThemeToggle";
import DateTimePicker from "./components/DateTimePicker";
import TimeZoneSelect from "./components/TimeZoneSelect";
import SwapButton from "./components/SwapButton";
import ResultDisplay from "./components/ResultDisplay";
import Footer from "./components/Footer"; // اضافه کردن Footer
import { convertTime, getTimeDifference } from "./utils/timeConverter";

function App() {
  const [mode, setMode] = useState("light");
  const [sourceDateTime, setSourceDateTime] = useState(new Date());
  const [sourceTimeZone, setSourceTimeZone] = useState("Asia/Tehran");
  const [targetTimeZone, setTargetTimeZone] = useState("Europe/London");

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          primary: {
            main: mode === "light" ? "#6366f1" : "#8b5cf6",
          },
          secondary: {
            main: mode === "light" ? "#ec4899" : "#f472b6",
          },
          background: {
            default:
              mode === "light"
                ? "linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 50%, #f0fdf4 100%)"
                : "linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #1a1a1a 100%)",
            paper:
              mode === "light"
                ? "rgba(255, 255, 255, 0.9)"
                : "rgba(30, 30, 30, 0.9)",
          },
        },
        direction: "ltr",
        shape: {
          borderRadius: 12,
        },
      }),
    [mode]
  );

  // Convert time
  const convertedTime = useMemo(
    () => convertTime(sourceDateTime, sourceTimeZone, targetTimeZone),
    [sourceDateTime, sourceTimeZone, targetTimeZone]
  );

  // Time difference
  const timeDifference = useMemo(
    () => getTimeDifference(sourceTimeZone, targetTimeZone),
    [sourceTimeZone, targetTimeZone]
  );

  const toggleTheme = () =>
    setMode((prev) => (prev === "light" ? "dark" : "light"));

  const handleSwapTimezones = () => {
    const temp = sourceTimeZone;
    setSourceTimeZone(targetTimeZone);
    setTargetTimeZone(temp);
  };

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          minHeight: "100vh",
          background: (theme) =>
            theme.palette.mode === "light"
              ? "linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 50%, #f0fdf4 100%)"
              : "linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #1a1a1a 100%)",
        }}
      >
        <CssBaseline />
        <Box
          sx={{
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            py: 4,
            px: 2,
          }}
        >
          <Container
            maxWidth="md"
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              flex: 1,
            }}
          >
            {/* Header */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 4,
                width: "100%",
                maxWidth: "800px",
              }}
            >
              <Typography
                variant="h4"
                component="h1"
                gutterBottom
                sx={{
                  fontWeight: 700,
                  background: (theme) =>
                    theme.palette.mode === "light"
                      ? "linear-gradient(135deg, #6366f1 0%, #ec4899 100%)"
                      : "linear-gradient(135deg, #8b5cf6 0%, #f472b6 100%)",
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  m: 0,
                }}
              >
                Timezone Converter
              </Typography>
              <ThemeToggle mode={mode} toggleTheme={toggleTheme} />
            </Box>

            {/* Main converter form */}
            <Paper
              elevation={0}
              sx={{
                p: 4,
                mb: 3,
                borderRadius: 3,
                width: "100%",
                maxWidth: "800px",
                background: (theme) =>
                  theme.palette.mode === "light"
                    ? "rgba(255, 255, 255, 0.85)"
                    : "rgba(30, 30, 30, 0.85)",
                backdropFilter: "blur(20px)",
                border: (theme) =>
                  `1px solid ${
                    theme.palette.mode === "light"
                      ? "rgba(99, 102, 241, 0.2)"
                      : "rgba(139, 92, 246, 0.2)"
                  }`,
                boxShadow: (theme) =>
                  theme.palette.mode === "light"
                    ? "0 4px 20px rgba(99, 102, 241, 0.15)"
                    : "0 4px 20px rgba(0, 0, 0, 0.4)",
              }}
            >
              <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
                <DateTimePicker
                  value={sourceDateTime}
                  onChange={setSourceDateTime}
                  label="Source Date & Time"
                />

                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 3,
                    flexDirection: { xs: "column", sm: "row" },
                  }}
                >
                  <Box sx={{ flex: 1, width: "100%" }}>
                    <TimeZoneSelect
                      value={sourceTimeZone}
                      onChange={setSourceTimeZone}
                      label="Source Timezone"
                    />
                  </Box>

                  <SwapButton onClick={handleSwapTimezones} />

                  <Box sx={{ flex: 1, width: "100%" }}>
                    <TimeZoneSelect
                      value={targetTimeZone}
                      onChange={setTargetTimeZone}
                      label="Target Timezone"
                    />
                  </Box>
                </Box>
              </Box>
            </Paper>

            {/* Result Display */}
            <Box sx={{ width: "100%", maxWidth: "800px", mb: 4 }}>
              <ResultDisplay
                sourceDateTime={sourceDateTime}
                sourceTimeZone={sourceTimeZone}
                targetTimeZone={targetTimeZone}
                convertedTime={convertedTime}
                timeDifference={timeDifference}
              />
            </Box>

            {/* Footer */}
            <Footer />
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default App;
