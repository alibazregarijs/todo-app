import React, { useState } from "react";
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import { LocalizationProvider, DateTimePicker } from "@mui/x-date-pickers";
import { Dayjs } from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/store";
import { createTodo } from "@/store/TodoSlice";

// Create a custom theme with the specified colors
const theme = createTheme({
  palette: {
    primary: {
      main: "#0760FB", // first-blue-color
    },
    grey: {
      100: "#D9D9D9", // first-gray-color
      200: "#9F9F9F", // second-gray-color
    },
  },
});

interface CustomModalProps {
  open: boolean;
  onClose: () => void;
}

const CustomModal: React.FC<CustomModalProps> = ({ open, onClose }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [startTime, setStartTime] = useState<Dayjs | null>(null);
  const [endTime, setEndTime] = useState<Dayjs | null>(null);

  const dispatch = useDispatch<AppDispatch>();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (startTime && endTime) {
      // Format dates to ISO 8601
      const formattedStartTime = startTime.toISOString(); // "2025-01-04T09:00:00.000Z"
      const formattedEndTime = endTime.toISOString(); // "2025-01-04T10:00:00.000Z"

      const newTodo = {
        title,
        description,
        start_date: formattedStartTime,
        end_date: formattedEndTime,
      };

      dispatch(createTodo(newTodo))
        .unwrap()
        .then(() => {
          console.log("Todo created successfully");
          onClose();
        })
        .catch((err) => {
          console.error("Error creating todo:", err);
        });
    } else {
      console.log("Start time or end time is missing");
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Modal
          open={open}
          onClose={onClose}
          aria-labelledby="modal-title"
          aria-describedby="modal-description"
        >
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 400,
              bgcolor: "grey.100",
              border: "2px solid",
              borderColor: "grey.200",
              boxShadow: 24,
              p: 4,
              borderRadius: 2,
            }}
          >
            <Typography
              id="modal-title"
              variant="h6"
              component="h2"
              gutterBottom
            >
              Add New Item
            </Typography>
            <form onSubmit={handleSubmit}>
              <TextField
                fullWidth
                label="Title"
                variant="outlined"
                margin="normal"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
              <TextField
                fullWidth
                label="Description"
                variant="outlined"
                margin="normal"
                multiline
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
              <DateTimePicker
                label="Start Time"
                value={startTime}
                onChange={(newValue) => setStartTime(newValue)}
                slotProps={{
                  textField: {
                    fullWidth: true,
                    margin: "normal",
                    required: true,
                  },
                  popper: {
                    className: "custom-popper",
                  },
                }}
              />
              <DateTimePicker
                label="End Time"
                value={endTime}
                onChange={(newValue) => setEndTime(newValue)}
                slotProps={{
                  textField: {
                    fullWidth: true,
                    margin: "normal",
                    required: true,
                  },
                  popper: {
                    className: "custom-popper",
                  },
                }}
              />

              <Box sx={{ mt: 2, display: "flex", justifyContent: "flex-end" }}>
                <Button onClick={onClose} sx={{ mr: 1 }}>
                  Cancel
                </Button>
                <Button type="submit" variant="contained" color="primary">
                  Submit
                </Button>
              </Box>
            </form>
          </Box>
        </Modal>
      </LocalizationProvider>
    </ThemeProvider>
  );
};

export default CustomModal;
