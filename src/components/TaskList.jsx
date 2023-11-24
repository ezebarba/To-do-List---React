import TaskItem from './TaskItem';
import { List } from '@mui/material';

const TaskList = ({ tasks, onComplete, onDelete }) => {
  return (
    <List>
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} onComplete={onComplete} onDelete={onDelete} />
      ))}
    </List>
  );
};

export default TaskList;
