"use client";

import { useState } from "react";
import { gql, useMutation } from "@apollo/client";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import DatePicker from "react-datepicker"; // Import ShadCN-compatible date picker
import "react-datepicker/dist/react-datepicker.css"; // Import default styles

// Mutation for adding task
const ADD_TASK = gql`
  mutation AddTask($title: String!, $description: String, $due_date: date) {
    insert_tasks_one(
      object: { title: $title, description: $description, due_date: $due_date }
    ) {
      id
      title
      description
      status
      due_date
    }
  }
`;

export default function AddTaskPopup({ isModalOpen, setIsModalOpen }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState(null); // Use a Date object for ShadCN picker
  const [addTask, { loading, error }] = useMutation(ADD_TASK, {
    refetchQueries: ["GetTasks"],
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    // Format the due date as a string
    const formattedDueDate = dueDate
      ? dueDate.toISOString().split("T")[0]
      : null;

    try {
      await addTask({
        variables: { title, description, due_date: formattedDueDate },
      });
      setTitle("");
      setDescription("");
      setDueDate(null);
      setIsModalOpen(false);
    } catch (err) {
      console.error("Error adding task:", err.message);
    }
  };

  return (
    <>
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <Card className="w-[350px] bg-black text-white">
            <CardHeader>
              <CardTitle>Add Task</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit}>
                <div className="grid w-full items-center gap-4">
                  {/* Task Title */}
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="title" className="text-white">
                      Task Title
                    </Label>
                    <Input
                      id="title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="Enter task title"
                      required
                      className="bg-black text-white border-gray-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    />
                  </div>

                  {/* Task Description */}
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="description" className="text-white">
                      Task Description
                    </Label>
                    <Textarea
                      id="description"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Enter task description (optional)"
                      className="bg-black text-white border-gray-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    />
                  </div>

                  {/* Due Date */}
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="dueDate" className="text-white">
                      Due Date
                    </Label>
                    <DatePicker
                      selected={dueDate}
                      onChange={(date) => setDueDate(date)}
                      placeholderText="Select due date"
                      dateFormat="yyyy-MM-dd"
                      className="w-full bg-black text-white border-gray-600 px-3 py-2 rounded focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </form>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button
                variant="outline"
                onClick={() => setIsModalOpen(false)}
                className="bg-black text-white border-gray-600 hover:bg-gray-700"
              >
                Cancel
              </Button>
              <Button onClick={handleSubmit} disabled={loading}>
                {loading ? "Adding..." : "Add Task"}
              </Button>
            </CardFooter>
            {error && (
              <p className="text-red-500 text-sm mt-2 text-center">
                Error: {error.message}
              </p>
            )}
          </Card>
        </div>
      )}
    </>
  );
}
