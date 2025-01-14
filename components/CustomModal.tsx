import React, { useState } from "react";
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  ThemeProvider,
  useMediaQuery,
} from "@mui/material";
import { LocalizationProvider, DateTimePicker } from "@mui/x-date-pickers";
import { Dayjs } from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/store";
import { createTodo } from "@/store/TodoSlice";
import { theme } from "@/lib/utils";
import { type CustomModalProps } from "@/index";
// Create a custom theme with the specified colors

const CustomModal: React.FC<CustomModalProps> = ({ open, onClose }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [startTime, setStartTime] = useState<Dayjs | null>(null);
  const [endTime, setEndTime] = useState<Dayjs | null>(null);

  const dispatch = useDispatch<AppDispatch>();

  // Use Material-UI's useMediaQuery hook to determine screen size
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (startTime && endTime) {
      // Format dates to ISO 8601
      const formattedStartTime = startTime.toISOString();
      const formattedEndTime = endTime.toISOString();

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

          // Reset the form fields after successful submission
          setTitle(""); // Reset title field
          setDescription(""); // Reset description field
          setStartTime(null); // Reset start time
          setEndTime(null); // Reset end time

          onClose(); // Close the modal after submission
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
              left: isMobile ? "40%" : "50%",
              transform: "translate(-50%, -50%)",
              width: isMobile ? "100%" : "50%",
              maxWidth: isMobile ? "350px" : "600px",
              height: isMobile ? "600px" : "auto",
              maxHeight: "90vh",
              bgcolor: "grey.100",
              border: "2px solid",
              borderColor: "grey.200",
              boxShadow: 24,
              p: 4,
              borderRadius: 2,
              overflowY: "auto",
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
                    size: isMobile ? "small" : "medium",
                  },
                  popper: {
                    className: "custom-popper_start",
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
                    size: isMobile ? "small" : "medium",
                  },
                  popper: {
                    className: "custom-popper_end",
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
