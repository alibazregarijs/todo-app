export const getDateString = () => {
  const date = new Date();

  // Get components
  const weekday = date.toLocaleString("en-US", { weekday: "long" });
  const day = date.getDate();
  const month = date.toLocaleString("en-US", { month: "long" });

  return `${weekday}, ${day} ${month}`;
};

export const getHoursAndMinutes = (dateString: string): string => {
  const date = new Date(dateString);

  // Extract hours and minutes from the date object
  const hours = date.getUTCHours().toString().padStart(2, '0'); // Get hours in 2-digit format
  const minutes = date.getUTCMinutes().toString().padStart(2, '0'); // Get minutes in 2-digit format

  return `${hours}:${minutes}`;
};

// Example usage:
const time = getHoursAndMinutes("2025-01-04T15:52:00.000Z");
console.log(time); // Output: "15:52"
