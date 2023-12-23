const convertToUTC = (utcDate, offset) => {
  const date = new Date(utcDate)
  return new Date(date.getTime() + (offset * 60 * 60 * 1000) - (date.getTimezoneOffset() * 60000))
};