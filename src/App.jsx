import { useState, useEffect } from 'react';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import { Container, Typography, CssBaseline } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import './App.css';

const theme = createTheme();

function App() {
  const [tasks, setTasks] = useState( JSON.parse(localStorage.getItem('tasks')) || []);

  const handleAddTask = (newTask) => {
    // Agregar la nueva tarea al estado tasks
    setTasks((prevTasks) => [...prevTasks, newTask]);
  };

  const handleDeleteTask = (taskId) => {
    // Eliminar la tarea del estado tasks
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
  };

 useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
 }, [tasks]);

  const handleCompleteTask = (taskId) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };
  
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container component="main" maxWidth="md" sx={{ mt: 5 }}>
        <Typography variant="h2" component="div" align="center" sx={{ mb: 4 }}>
          Lista de Tareas
        </Typography>
        <TaskForm onAddTask={handleAddTask} />
        <TaskList
          tasks={tasks}
          onComplete={handleCompleteTask}
          onDelete={handleDeleteTask}
        />
      </Container>
    </ThemeProvider>
  );
}

export default App;
