import React from "react";
import { Box, Typography, Link, IconButton } from "@mui/material";
import { GitHub, Email } from "@mui/icons-material";

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <Box
      component="footer"
      sx={{
        mt: 4,
        py: 3,
        textAlign: "center",
        borderTop: (theme) =>
          `1px solid ${
            theme.palette.mode === "light"
              ? "rgba(99, 102, 241, 0.1)"
              : "rgba(139, 92, 246, 0.1)"
          }`,
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: 2,
          mb: 1,
        }}
      >
        {/* GitHub Link */}
        <IconButton
          component={Link}
          href="https://github.com/sadeghdehyadgari"
          target="_blank"
          rel="noopener noreferrer"
          color="inherit"
          sx={{
            color: "text.secondary",
            transition: "all 0.3s ease-in-out",
            "&:hover": {
              color: "primary.main",
              transform: "scale(1.1)",
            },
          }}
        >
          <GitHub />
        </IconButton>

        {/* Email Link */}
        <IconButton
          component={Link}
          href="mailto:sadeghdehyadgari@gmail.com?subject=Timezone Converter Feedback"
          color="inherit"
          sx={{
            color: "text.secondary",
            transition: "all 0.3s ease-in-out",
            "&:hover": {
              color: "primary.main",
              transform: "scale(1.1)",
            },
          }}
        >
          <Email />
        </IconButton>
      </Box>

      <Typography
        variant="body2"
        color="text.secondary"
        sx={{ fontWeight: 500 }}
      >
        © {currentYear}
        <Link
          href="https://github.com/sadeghdehyadgari"
          target="_blank"
          rel="noopener noreferrer"
          sx={{
            color: "inherit",
            textDecoration: "none",
            mx: 0.5,
            fontWeight: 600,
            "&:hover": {
              color: "primary.main",
            },
          }}
        >
          Sadegh Dehyadgari
        </Link>
        . All rights reserved.
      </Typography>

      <Typography
        variant="caption"
        color="text.secondary"
        sx={{ display: "block", mt: 0.5, opacity: 0.8 }}
      >
        Built with React & Material-UI
      </Typography>
    </Box>
  );
}

export default Footer;
