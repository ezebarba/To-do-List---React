import { useState } from 'react';
import { TextField, Button, Box, Snackbar } from '@mui/material';
import { Alert } from '@mui/material';

const TaskForm = ({ onAddTask }) => {
  const [taskName, setTaskName] = useState('');
  const [showAddSnackbar, setShowAddSnackbar] = useState(false);

  const generateUniqueId = () => {
    return Math.random().toString(36).substr(2, 9);
  };

  const handleInputChange = (event) => {
    setTaskName(event.target.value);
  };

  const handleAddClick = () => {
    if (taskName.trim() !== '') {
      const newTask = {
        id: generateUniqueId(),
        name: taskName,
        completed: false,
      };

      onAddTask(newTask);
      setTaskName('');
      setShowAddSnackbar(true);
    }
  };

  const handleAddSnackbarClose = () => {
    setShowAddSnackbar(false);
  };

  return (
    <Box sx={{ mt: 3, display: 'flex', alignItems: 'center' }}>
      <TextField
        label="Nueva Tarea"
        variant="outlined"
        fullWidth
        value={taskName}
        onChange={handleInputChange}
      />
      <Button variant="contained" color="primary" sx={{ ml: 2 }} onClick={handleAddClick}>
        Agregar
      </Button>
      <Snackbar
        open={showAddSnackbar}
        autoHideDuration={3000}
        onClose={handleAddSnackbarClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert onClose={handleAddSnackbarClose} severity="success" sx={{ width: '100%' }}>
          Tarea agregada con éxito.
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default TaskForm;
