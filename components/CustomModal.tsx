import React, { useState } from 'react';
import { 
  Modal, 
  Box, 
  Typography, 
  TextField, 
  Button, 
  ThemeProvider, 
  createTheme 
} from '@mui/material';

// Create a custom theme with the specified colors
const theme = createTheme({
  palette: {
    primary: {
      main: '#0760FB', // first-blue-color
    },
    grey: {
      100: '#D9D9D9', // first-gray-color
      200: '#9F9F9F', // second-gray-color
    },
  },
});

interface CustomModalProps {
  open: boolean;
  onClose: () => void;
}

const CustomModal: React.FC<CustomModalProps> = ({ open, onClose }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Submitted:', { title, description });
    onClose();
  };

  return (
    <ThemeProvider theme={theme}>
      <Modal
        open={open}
        onClose={onClose}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box
          sx={{
            position: 'absolute',
            top: '60%',
            left: '15%',
            transform: 'translate(-50%, -50%)',
            width: 300,
            bgcolor: 'grey.100',
            border: '2px solid',
            borderColor: 'grey.200',
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
          }}
        >
          <Typography id="modal-title" variant="h6" component="h2" gutterBottom>
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
            <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
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
    </ThemeProvider>
  );
};

export default CustomModal;

