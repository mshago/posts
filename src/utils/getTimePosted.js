const monthNames = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "June",
  "July",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export const getTimePosted = (date) => {
  const timeType = date.getHours() <= 11 ? "AM" : "PM";
  let hours = parseInt(date.getHours());
  hours = hours > 12 ? hours - 12 : hours;
  const minutes =
    date.getMinutes().toString().length === 1
      ? "0" + date.getMinutes()
      : date.getMinutes();

  return hours + ":" + minutes + " " + timeType;
};

export const getDatePosted = (date) => {
  const day =
    date.getDate().toString().length === 1
      ? "0" + date.getDate()
      : date.getDate();
  const month = monthNames[date.getMonth()];
  let year = date.getFullYear().toString();
  year = year.substring(2, 4);

  return day + " " + month + " " + year;
};