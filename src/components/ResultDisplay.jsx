import React from "react";
import { Paper, Typography, Box, Chip, Alert } from "@mui/material";
import { formatTimeForDisplay, isDST } from "../utils/timeConverter";

function ResultDisplay({
  sourceDateTime,
  sourceTimeZone,
  targetTimeZone,
  convertedTime,
  timeDifference,
}) {
  const isSourceDST = isDST(sourceTimeZone);
  const isTargetDST = isDST(targetTimeZone);

  const getDifferenceText = () => {
    if (timeDifference === 0) return "Same time";
    const absDiff = Math.abs(timeDifference);
    const hours = Math.floor(absDiff);
    const minutes = Math.round((absDiff - hours) * 60);

    let text = "";
    if (hours > 0) text += `${hours} hour${hours > 1 ? "s" : ""}`;
    if (minutes > 0) text += ` ${minutes} minute${minutes > 1 ? "s" : ""}`;

    return timeDifference > 0 ? `${text} ahead` : `${text} behind`;
  };

  const isOutsideBusinessHours = () => {
    const targetHour = convertedTime.getHours();
    return targetHour < 9 || targetHour >= 17;
  };

  const currentLocalTime = new Date();

  return (
    <Paper
      elevation={3}
      sx={{
        p: 3,
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
      <Typography
        variant="h6"
        gutterBottom
        sx={{
          fontWeight: 600,
          color: "primary.main",
          display: "flex",
          alignItems: "center",
          gap: 1,
          "@media (max-width: 600px)": {
            fontSize: "1.1rem",
          },
        }}
      >
        🕐 Converted Time
      </Typography>

      {/* Target time display */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 2,
          mb: 3,
          p: 2,
          borderRadius: 2,
          backgroundColor: (theme) =>
            theme.palette.mode === "dark"
              ? "rgba(144, 202, 249, 0.08)"
              : "rgba(25, 118, 210, 0.04)",
          border: (theme) =>
            `1px solid ${
              theme.palette.mode === "dark"
                ? "rgba(144, 202, 249, 0.2)"
                : "rgba(25, 118, 210, 0.1)"
            }`,
          "@media (max-width: 600px)": {
            flexDirection: "column",
            alignItems: "flex-start",
            gap: 1,
            p: 1.5,
          },
        }}
      >
        <Typography
          variant="h5"
          component="div"
          color="primary"
          sx={{
            fontWeight: 700,
            "@media (max-width: 600px)": {
              fontSize: "1.3rem",
              lineHeight: 1.2,
            },
          }}
        >
          {formatTimeForDisplay(convertedTime, targetTimeZone)}
        </Typography>
        <Chip
          label={targetTimeZone}
          variant="filled"
          color="primary"
          size="small"
          sx={{
            fontWeight: 600,
            "@media (max-width: 600px)": {
              fontSize: "0.75rem",
              height: "24px",
            },
          }}
        />
      </Box>

      {/* Source time */}
      <Box sx={{ mb: 3 }}>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            fontWeight: 500,
            mb: 1,
            "@media (max-width: 600px)": {
              fontSize: "0.85rem",
            },
          }}
        >
          Source time:
        </Typography>
        <Typography
          variant="body1"
          sx={{
            fontWeight: 500,
            "@media (max-width: 600px)": {
              fontSize: "0.9rem",
            },
          }}
        >
          {formatTimeForDisplay(sourceDateTime, sourceTimeZone)}
        </Typography>
      </Box>

      {/* Information sections */}
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        {/* Time difference */}
        <Box
          sx={{
            p: 2,
            borderRadius: 2,
            backgroundColor: (theme) =>
              theme.palette.mode === "dark"
                ? "rgba(255,255,255,0.05)"
                : "rgba(0,0,0,0.02)",
            "@media (max-width: 600px)": {
              p: 1.5,
            },
          }}
        >
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              fontWeight: 500,
              mb: 0.5,
              "@media (max-width: 600px)": {
                fontSize: "0.85rem",
              },
            }}
          >
            ⚡ Time difference:
          </Typography>
          <Typography
            variant="body1"
            sx={{
              fontWeight: 600,
              "@media (max-width: 600px)": {
                fontSize: "0.9rem",
              },
            }}
          >
            {getDifferenceText()} of source timezone
          </Typography>
        </Box>

        {/* DST information */}
        {(isSourceDST || isTargetDST) && (
          <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
            {isSourceDST && (
              <Chip
                label={`${sourceTimeZone} (DST)`}
                size="small"
                color="info"
                variant="outlined"
                sx={{
                  fontWeight: 500,
                  "@media (max-width: 600px)": {
                    fontSize: "0.7rem",
                    height: "22px",
                  },
                }}
              />
            )}
            {isTargetDST && (
              <Chip
                label={`${targetTimeZone} (DST)`}
                size="small"
                color="info"
                variant="outlined"
                sx={{
                  fontWeight: 500,
                  "@media (max-width: 600px)": {
                    fontSize: "0.7rem",
                    height: "22px",
                  },
                }}
              />
            )}
          </Box>
        )}

        {/* Business hours warning */}
        {isOutsideBusinessHours() && (
          <Alert
            severity="info"
            sx={{
              borderRadius: 2,
              "& .MuiAlert-message": {
                fontWeight: 500,
                "@media (max-width: 600px)": {
                  fontSize: "0.85rem",
                  padding: "4px 0",
                },
              },
            }}
          >
            ⚠️ Outside typical business hours (9 AM - 5 PM) in target timezone
          </Alert>
        )}

        {/* Local time */}
        <Box
          sx={{
            p: 2,
            borderRadius: 2,
            backgroundColor: (theme) =>
              theme.palette.mode === "dark"
                ? "rgba(255,255,255,0.05)"
                : "rgba(0,0,0,0.02)",
            "@media (max-width: 600px)": {
              p: 1.5,
            },
          }}
        >
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              fontWeight: 500,
              mb: 0.5,
              "@media (max-width: 600px)": {
                fontSize: "0.85rem",
              },
            }}
          >
            📍 Your local time:
          </Typography>
          <Typography
            variant="body1"
            sx={{
              fontWeight: 600,
              "@media (max-width: 600px)": {
                fontSize: "0.9rem",
              },
            }}
          >
            {formatTimeForDisplay(
              currentLocalTime,
              Intl.DateTimeFormat().resolvedOptions().timeZone,
              false
            )}
          </Typography>
        </Box>
      </Box>
    </Paper>
  );
}

export default ResultDisplay;
