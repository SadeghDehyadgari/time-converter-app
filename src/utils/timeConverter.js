// RELIABLE TIMESTAMP-BASED TIME CONVERSION

// Convert time from source timezone to target timezone
export const convertTime = (sourceDateTime, sourceTimeZone, targetTimeZone) => {
  try {
    // Get the timezone offset for both timezones at this specific datetime
    const sourceOffset = getTimezoneOffsetAtDate(
      sourceTimeZone,
      sourceDateTime
    );
    const targetOffset = getTimezoneOffsetAtDate(
      targetTimeZone,
      sourceDateTime
    );

    // Calculate the difference in offsets and apply to get target time
    const offsetDifference = targetOffset - sourceOffset;
    const targetTimestamp = sourceDateTime.getTime() + offsetDifference;

    return new Date(targetTimestamp);
  } catch (error) {
    return sourceDateTime;
  }
};

// Get timezone offset for a specific date (accounts for DST)
const getTimezoneOffsetAtDate = (timeZone, date) => {
  try {
    // Use Intl.DateTimeFormat to get the offset for this specific date
    const formatter = new Intl.DateTimeFormat("en-US", {
      timeZone: timeZone,
      year: "numeric",
      month: "numeric",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      timeZoneName: "longOffset",
    });

    const parts = formatter.formatToParts(date);

    // Extract the offset from the formatted string
    const offsetString = parts.find(
      (part) => part.type === "timeZoneName"
    ).value;

    // Parse offset string like "GMT+3:30" or "GMT-5"
    return parseTimezoneOffset(offsetString);
  } catch (error) {
    // Fallback: use current offset
    return getCurrentTimezoneOffset(timeZone);
  }
};

// Parse timezone offset string like "GMT+3:30" or "GMT-5"
const parseTimezoneOffset = (offsetString) => {
  // Remove "GMT" prefix
  const offset = offsetString.replace("GMT", "").trim();

  if (offset === "") return 0; // GMT

  const sign = offset.startsWith("+") ? 1 : -1;
  const timeParts = offset.replace(/[+-]/, "").split(":");

  const hours = parseInt(timeParts[0]) || 0;
  const minutes = parseInt(timeParts[1]) || 0;

  return sign * (hours * 60 * 60 * 1000 + minutes * 60 * 1000);
};

// Fallback: get current timezone offset
const getCurrentTimezoneOffset = (timeZone) => {
  const now = new Date();
  const formatter = new Intl.DateTimeFormat("en-US", {
    timeZone: timeZone,
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  });

  const parts = formatter.formatToParts(now);
  const year = parts.find((p) => p.type === "year").value;
  const month = parts.find((p) => p.type === "month").value.padStart(2, "0");
  const day = parts.find((p) => p.type === "day").value.padStart(2, "0");
  const hour = parts.find((p) => p.type === "hour").value.padStart(2, "0");
  const minute =
    parts.find((p) => p.type === "minute")?.value.padStart(2, "0") || "00";

  // Create local date in the target timezone
  const localDate = new Date(`${year}-${month}-${day}T${hour}:${minute}:00`);

  // Calculate offset relative to UTC
  const utcTime = Date.UTC(
    localDate.getFullYear(),
    localDate.getMonth(),
    localDate.getDate(),
    localDate.getHours(),
    localDate.getMinutes()
  );

  return localDate.getTime() - utcTime;
};

// Format date for display
export const formatTimeForDisplay = (date, timeZone, includeDate = true) => {
  try {
    const options = {
      timeZone: timeZone,
      hour12: true,
      hour: "numeric",
      minute: "2-digit",
    };

    if (includeDate) {
      options.weekday = "long";
      options.year = "numeric";
      options.month = "long";
      options.day = "numeric";
    }

    return new Intl.DateTimeFormat("en-US", options).format(date);
  } catch (error) {
    return "Invalid time";
  }
};

// Calculate time difference between two timezones
export const getTimeDifference = (sourceTimeZone, targetTimeZone) => {
  try {
    const now = new Date();
    const sourceOffset = getTimezoneOffsetAtDate(sourceTimeZone, now);
    const targetOffset = getTimezoneOffsetAtDate(targetTimeZone, now);

    return (targetOffset - sourceOffset) / (60 * 60 * 1000);
  } catch (error) {
    return 0;
  }
};

// Check if a timezone is currently in DST
export const isDST = (timeZone) => {
  try {
    const jan = new Date(Date.UTC(2023, 0, 1));
    const jul = new Date(Date.UTC(2023, 6, 1));

    const janOffset = getTimezoneOffsetAtDate(timeZone, jan);
    const julOffset = getTimezoneOffsetAtDate(timeZone, jul);

    return Math.max(janOffset, julOffset) !== Math.min(janOffset, julOffset);
  } catch (error) {
    return false;
  }
};
