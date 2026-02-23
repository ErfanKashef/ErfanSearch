"use client";
import { useState } from "react";
import type { Task, Priority } from "@/types/task";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

interface AddTaskProps {
  onAdd: (task: Task) => void;
}

export const AddTask = ({ onAdd }: AddTaskProps) => {
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState<Priority>("low");

  const handleAdd = () => {
    if (!title.trim()) return;
    onAdd({
      id: Date.now().toString(),
      title,
      completed: false,
      priority,
    });
    setTitle("");
    setPriority("low");
  };

  return (
    <div className="flex gap-2 mb-4">
      <Input
        placeholder="Task title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="flex-1 dark:bg-gray-800 dark:text-white"
      />

      <Select
        value={priority}
        onValueChange={(val) => setPriority(val as Priority)}
      >
        <SelectTrigger className="w-[120px] dark:bg-gray-800 dark:text-white">
          <SelectValue placeholder="Priority" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="low">Low</SelectItem>
          <SelectItem value="medium">Medium</SelectItem>
          <SelectItem value="high">High</SelectItem>
        </SelectContent>
      </Select>

      <Button
        onClick={handleAdd}
        className="bg-blue-500 text-white dark:bg-blue-600"
      >
        Add
      </Button>
    </div>
  );
};
