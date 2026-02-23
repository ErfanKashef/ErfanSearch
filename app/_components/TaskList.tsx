"use client";
import { TaskItem } from "./TaskItem";
import type { Task } from "@/types/task";

interface TaskListProps {
  tasks: Task[];
  toggleTask: (id: string) => void;
  deleteTask: (id: string) => void;
}

export const TaskList = ({ tasks, toggleTask, deleteTask }: TaskListProps) => {
  const priorityOrder = { high: 3, medium: 2, low: 1 };

  const sortedTasks = [...tasks].sort((a, b) => {
    const aDone = a.completed ? 0 : 1;
    const bDone = b.completed ? 0 : 1;
    if (aDone !== bDone) return bDone - aDone;

    return priorityOrder[b.priority] - priorityOrder[a.priority];
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