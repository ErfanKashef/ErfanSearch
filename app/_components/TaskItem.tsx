"use client";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Trash } from "lucide-react";
import { Task } from "@/types/task";

interface TaskItemProps {
  task: Task;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export const TaskItem = ({ task, onToggle, onDelete }: TaskItemProps) => {
  const priorityColor = {
    low: "bg-green-500",
    medium: "bg-yellow-500",
    high: "bg-red-500",
  };

  return (
    <div
      className="flex items-center justify-between p-4 border rounded-lg space-x-3
                    dark:border-gray-700 dark:bg-gray-900 dark:text-white"
    >
      <div className="flex items-center gap-3">
        <Checkbox
          checked={task.completed}
          onCheckedChange={() => onToggle(task.id)}
        />
        <span className={`${task.completed ? "line-through opacity-50" : ""}`}>
          {task.title}
        </span>
      </div>

      <div className="flex items-center gap-2">
        <Badge className={`${priorityColor[task.priority]} text-white`}>
          {task.priority}
        </Badge>
        <Trash
          className="w-4 h-4 cursor-pointer text-red-500"
          onClick={() => onDelete(task.id)}
        />
      </div>
    </div>
  );
};
