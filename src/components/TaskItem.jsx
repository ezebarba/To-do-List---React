import React, { useState, useEffect } from 'react';
import { ListItem, Checkbox, IconButton, Typography, Snackbar, Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const TaskItem = ({ task, onComplete, onDelete }) => {
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

  useEffect(() => {
    if (showSnackbar) {
      setTimeout(() => {
        setShowSnackbar(false);
      }, 3000);
    }
  }, [showSnackbar]);

  const handleComplete = () => {
    onComplete(task.id);
    setShowSnackbar(true);
  };

  const handleDelete = () => {
    onDelete(task.id);
    setShowSnackbar(true);
    handleCloseDeleteConfirmation();
  };

  const handleOpenDeleteConfirmation = () => {
    setShowDeleteConfirmation(true);
  };

  const handleCloseDeleteConfirmation = () => {
    setShowDeleteConfirmation(false);
  };

  return (
    <React.Fragment>
      <ListItem
        secondaryAction={
          <React.Fragment>
            <IconButton edge="end" aria-label="delete" onClick={handleOpenDeleteConfirmation}>
              <DeleteIcon />
            </IconButton>
            <Dialog open={showDeleteConfirmation} onClose={handleCloseDeleteConfirmation}>
              <DialogTitle>Confirmar eliminación</DialogTitle>
              <DialogContent>
                <Typography>
                  ¿Estás seguro de que deseas eliminar la tarea "{task.name}"?
                </Typography>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleCloseDeleteConfirmation}>Cancelar</Button>
                <Button onClick={handleDelete} variant="contained" color="secondary">
                  Eliminar
                </Button>
              </DialogActions>
            </Dialog>
          </React.Fragment>
        }
      >
        <Checkbox
          checked={task.completed}
          onChange={handleComplete}
          color="primary"
          inputProps={{ 'aria-label': 'primary checkbox' }}
        />
        <Typography variant="body1" sx={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
          {task.name}
        </Typography>
      </ListItem>
      <Snackbar
        open={showSnackbar}
        autoHideDuration={3000}
        message={task.completed ? `La tarea ${task.name} ha sido completada.` : `La tarea ${task.name} ha sido cancelada.`}
      />
    </React.Fragment>
  );
};

export default TaskItem;
