function getAllBookedDates(checkin, checkOut) {
  const startDate = new Date(checkin);
  const endDate = new Date(checkOut);
  const datesToAdd = [];
  const options = {
    year: "2-digit",
    month: "2-digit",
    day: "2-digit",
    formatMatcher: "basic",
    timeZone: "Asia/Kolkata",
  };

  for (
    let date = startDate;
    date <= endDate;
    date.setDate(date.getDate() + 1)
  ) {
    const isoDateString = date.toISOString();
    const formattedDate = isoDateString.slice(2, 10);
    datesToAdd.push(formattedDate);
  }

  return datesToAdd;
}

module.exports = getAllBookedDates;
