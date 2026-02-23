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
      completed: false,
      priority,
    });

    setTitle("");
    setPriority("low");
    setError("");
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="mb-4 bg-blue-500 text-white w-full">Add Task</Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Task</DialogTitle>
        </DialogHeader>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleAdd();
          }}
        >
          <div className="flex flex-col gap-2 mt-4">
            <Input
              placeholder="Task title"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                if (e.target.value.trim()) setError("");
              }}
              className="dark:bg-gray-800 dark:text-white"
            />

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <Select
              value={priority}
              onValueChange={(val) => setPriority(val as Priority)}
            >
              <SelectTrigger className="w-full dark:bg-gray-800 dark:text-white">
                <SelectValue placeholder="Priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="low">Low</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="high">High</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <DialogFooter>
            <Button
              type="submit"
              className="bg-blue-500 text-white mt-4 w-full"
            >
              Add Task
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
