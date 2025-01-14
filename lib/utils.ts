import { createTheme } from "@mui/material";

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
  const hours = date.getUTCHours().toString().padStart(2, "0"); // Get hours in 2-digit format
  const minutes = date.getUTCMinutes().toString().padStart(2, "0"); // Get minutes in 2-digit format

  return `${hours}:${minutes}`;
};

export const buttonStyles = {
  backgroundColor: "#0760FB1A",
  borderRadius: "10px",
  width: "125px",
  height: "40px",
  color: "#0760FB",
  fontSize: "14px",
  lineHeight: "21px",
  fontWeight: "500",
};



export const theme = createTheme({
  palette: {
    primary: {
      main: "#0760FB", // first-blue-color
    },
    grey: {
      100: "#D9D9D9", // first-gray-color
      200: "#9F9F9F", // second-gray-color
    },
  },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiInputBase-root": {
            fontSize: "0.875rem",
          },
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          fontSize: "0.875rem",
        },
      },
    },
  },
});
