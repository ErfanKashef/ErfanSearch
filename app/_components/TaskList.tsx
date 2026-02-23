"use client";
import { Task } from "@/types/task";
import { TaskItem } from "./TaskItem";

interface TaskListProps {
  tasks: Task[];
  toggleTask: (id: string) => void;
  deleteTask: (id: string) => void;
}

export const TaskList = ({ tasks, toggleTask, deleteTask }: TaskListProps) => {
  const priorityOrder = { high: 3, medium: 2, low: 1 };

  const sortedTasks = [...tasks].sort((a, b) => {
    const aPriority = priorityOrder[a.priority];
    const bPriority = priorityOrder[b.priority];

    const aDone = a.completed ? 0 : 1;
    const bDone = b.completed ? 0 : 1;

    if (aDone !== bDone) return bDone - aDone;

    return bPriority - aPriority;
  });

  return (
    <div className="space-y-3">
      {sortedTasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onToggle={toggleTask}
          onDelete={deleteTask}
        />
      ))}
    </div>
  );
};
