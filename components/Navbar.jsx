"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import AddTaskPopup from "./AddTaskForm";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function Nav() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filter, setFilter] = useState("all");

  const handleToggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleFilterChange = (value) => {
    setFilter(value); // Update filter state
    // Optionally, trigger a filtering action here if you want the filter to affect the task list
  };

  return (
    <div className="flex flex-col py-4 border-b border-gray-300">
      <div className="flex justify-between items-center">
        {/* Button to trigger modal */}
        <Button onClick={handleToggleModal} aria-label="Add a new task">
          Add Task
        </Button>

        {/* Filter Dropdown */}
        <div className="flex items-center space-x-2">
          <label htmlFor="filter" className="text-sm text-white">
            Filter:
          </label>
          <Select
            value={filter}
            onValueChange={handleFilterChange}
            id="filter"
            aria-label="Filter tasks"
          >
            <SelectTrigger className="bg-gray-800 text-white border border-gray-600 rounded px-3 py-2">
              <SelectValue placeholder="Select filter" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Pass isModalOpen state and filter value to AddTaskPopup */}
      <AddTaskPopup
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        filter={filter} // Ensure filter is passed here
      />
    </div>
  );
}
