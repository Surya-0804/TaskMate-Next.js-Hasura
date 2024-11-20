"use client";
import "./globals.css";
import Header from "@/components/Header";
import TaskList from "@/components/TaskList";
import AddTaskForm from "@/components/AddTaskForm";
import Nav from "@/components/Navbar";
import { useState } from "react";

export default function Home() {
  console.log("key:", process.env.NEXT_PUBLIC_HASURA_ADMIN_SECRET);
  const [filter, setFilter] = useState("all");
  return (
    <main className="max-w-2xl mx-auto p-4 space-y-6">
      <Nav filter={filter} setFilter={setFilter} />
      <TaskList filter={filter} />
    </main>
  );
}
