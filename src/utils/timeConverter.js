import moment from "moment-timezone";

export const convertTime = (sourceDateTime, sourceTimeZone, targetTimeZone) => {
  try {
    if (!sourceTimeZone || !targetTimeZone) return sourceDateTime;

    const sourceMoment = moment.tz(
      moment(sourceDateTime).format("YYYY-MM-DDTHH:mm:ss"),
      sourceTimeZone
    );
    const targetMoment = sourceMoment.clone().tz(targetTimeZone);

    return targetMoment.toDate();
  } catch (error) {
    return sourceDateTime;
  }
};

export const formatTimeForDisplay = (date, timeZone, includeDate = true) => {
  try {
    if (!timeZone) return "Invalid timezone";

    const momentDate = moment.tz(date, timeZone);

    return includeDate
      ? momentDate.format("dddd, MMMM DD, YYYY - hh:mm A")
      : momentDate.format("hh:mm A");
  } catch (error) {
    return "Invalid time";
  }
};

export const getTimeDifference = (sourceTimeZone, targetTimeZone) => {
  try {
    if (!sourceTimeZone || !targetTimeZone) return 0;

    const now = moment();
    const sourceOffset = now.clone().tz(sourceTimeZone).utcOffset();
    const targetOffset = now.clone().tz(targetTimeZone).utcOffset();

    return (targetOffset - sourceOffset) / 60;
  } catch (error) {
    return 0;
  }
};

export const isDST = (timeZone) => {
  try {
    if (!timeZone) return false;
    return moment().tz(timeZone).isDST();
  } catch (error) {
    return false;
  }
};
