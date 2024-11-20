"use client";

import { gql, useQuery } from "@apollo/client";
import TaskItem from "./TaskItem";
import { Skeleton } from "@/components/ui/skeleton";

const GET_TASKS = gql`
  query GetTasks {
    tasks {
      id
      title
      description
      status
    }
  }
`;

export default function TaskList({ filter }) {
  const { data, loading, error } = useQuery(GET_TASKS);

  if (loading)
    return (
      <div>
        {Array.from({ length: 5 }).map((_, i) => (
          <Skeleton key={i} className="w-[590px] h-[40px] rounded-full m-8" />
        ))}
      </div>
    );
  if (error) return <p>Error: {error.message}</p>;

  // Filter tasks based on the selected filter
  const filteredTasks = data.tasks.filter((task) => {
    if (filter === "all") return true;
    return task.status === filter;
  });

  return (
    <ul>
      {filteredTasks.map((task) => (
        <TaskItem key={task.id} task={task} />
      ))}
    </ul>
  );
}
