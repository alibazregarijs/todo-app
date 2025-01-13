export const getDateString = () => {
  const date = new Date();

  // Get components
  const weekday = date.toLocaleString("en-US", { weekday: "long" });
  const day = date.getDate();
  const month = date.toLocaleString("en-US", { month: "long" });

  return `${weekday}, ${day} ${month}`;
};

