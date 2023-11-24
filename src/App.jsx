import { useState, useEffect } from 'react';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import { Container, Typography, CssBaseline } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import './App.css';

const theme = createTheme();

function App() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    // Cargar tareas desde localStorage al cargar la aplicación
    const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    console.log('storedTasks:', storedTasks);
    setTasks(storedTasks);
  }, []);

  const handleAddTask = (newTask) => {
    // Agregar la nueva tarea al estado tasks
    setTasks((prevTasks) => [...prevTasks, newTask]);

    // Guardar tareas en localStorage después de agregar la nueva tarea
    localStorage.setItem('tasks', JSON.stringify([...tasks, newTask]));
  };

  const handleCompleteTask = (taskId) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const handleDeleteTask = (taskId) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
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
