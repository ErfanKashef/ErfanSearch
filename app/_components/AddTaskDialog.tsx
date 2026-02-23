"use client";
import { useState } from "react";
import type { Task, Priority } from "@/types/task";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

interface AddTaskDialogProps {
  onAdd: (task: Task) => void;
}

export const AddTaskDialog = ({ onAdd }: AddTaskDialogProps) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState<Priority>("low");
  const [open, setOpen] = useState(false);
  const [error, setError] = useState("");

  const handleAdd = () => {
    if (!title.trim()) {
      setError("Task title cannot be empty!");
      return;
    }

    onAdd({
      id: Date.now().toString(),
      title,
      description,
      completed: false,
      priority,
    });

    setTitle("");
    setDescription("");
    setPriority("low");
    setError("");
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="mb-4 bg-blue-500 text-white w-full">Add Task</Button>
      </DialogTrigger>

      {/* 🔥 بک‌گراند دیالوگ */}
      <DialogContent className="sm:max-w-[425px] bg-gray-700/80 dark:bg-gray-800 rounded-xl shadow-lg">
        <DialogHeader>
          <DialogTitle className="text-gray-900 dark:text-white">
            Add New Task
          </DialogTitle>
        </DialogHeader>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleAdd();
          }}
        >
          <div className="flex flex-col gap-3 mt-4">
            {/* Title */}
            <Input
              placeholder="Task title"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                if (e.target.value.trim()) setError("");
              }}
              className="bg-gray-200  dark:bg-gray-700 text-gray-900 dark:text-white"
            />

            {error && <p className="text-red-500 text-sm">{error}</p>}

            {/* Description */}
            <Textarea
              placeholder="Task description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white"
            />

            {/* Priority */}
            <Select
              value={priority}
              onValueChange={(val) => setPriority(val as Priority)}
            >
              <SelectTrigger className="w-full bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white">
                <SelectValue placeholder="Priority" />
              </SelectTrigger>

              <SelectContent className="bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white">
                <SelectItem value="low">Low</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="high">High</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <DialogFooter>
            <Button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white w-full mt-4"
            >
              Add Task
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
