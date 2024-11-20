import "./globals.css";
import Header from "@/components/Header";
import TaskList from "@/components/TaskList";
import AddTaskForm from "@/components/AddTaskForm";
import Nav from "@/components/Navbar";

export default function Home() {
  return (
    <main className="max-w-2xl mx-auto p-4 space-y-6">
      <Nav />
      <TaskList />
    </main>
  );
}
