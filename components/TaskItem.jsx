import { useState } from "react";
import { gql, useMutation } from "@apollo/client";
import {
  TrashIcon,
  PencilSquareIcon,
  CheckCircleIcon,
  ExclamationCircleIcon,
} from "@heroicons/react/20/solid";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import EditTask from "./EditTask"; // Import your EditTask modal/component

const DELETE_TASK = gql`
  mutation DeleteTask($id: uuid!) {
    delete_tasks_by_pk(id: $id) {
      id
    }
  }
`;

const UPDATE_TASK_STATUS = gql`
  mutation UpdateTaskStatus($id: uuid!, $status: String!) {
    update_tasks_by_pk(pk_columns: { id: $id }, _set: { status: $status }) {
      id
      status
    }
  }
`;

export default function TaskItem({ task }) {
  const [showDeleteModal, setShowDeleteModal] = useState(false); // State for delete alert dialog
  const [showEditModal, setShowEditModal] = useState(false); // State for edit modal
  const [deleteTask] = useMutation(DELETE_TASK, {
    refetchQueries: ["GetTasks"],
  });
  const [updateTaskStatus] = useMutation(UPDATE_TASK_STATUS, {
    refetchQueries: ["GetTasks"],
  });

  const handleDelete = async () => {
    try {
      await deleteTask({ variables: { id: task.id } });
      setShowDeleteModal(false); // Close the modal after successful deletion
    } catch (err) {
      console.error("Error deleting task:", err.message);
    }
  };

  const toggleStatus = async () => {
    const newStatus = task.status === "completed" ? "pending" : "completed";
    try {
      await updateTaskStatus({ variables: { id: task.id, status: newStatus } });
    } catch (err) {
      console.error("Error updating task status:", err.message);
    }
  };

  return (
    <>
      <li className="flex items-center justify-between p-4 border rounded my-2 w-full">
        {/* Radio Button */}
        {/* <input
          type="radio"
          checked={task.status === "completed"}
          onChange={toggleStatus}
          className="w-6 h-6 cursor-pointer"
          aria-label={
            task.status === "completed"
              ? "Task is completed"
              : "Task is pending"
          }
        /> */}
        {task.status === "completed" ? (
          <CheckCircleIcon className="w-7 h-7 mr-5 text-green-500" />
        ) : (
          <ExclamationCircleIcon className="w-7 h-7 mr-5 text-yellow-400" />
        )}
        {/* Task Title and Description */}
        <div className="flex-1 ml-4 truncate">
          <h3
            className={`font-bold text-lg ${
              task.status === "completed" ? "line-through text-gray-500" : ""
            }`}
          >
            {task.title}
          </h3>
          {task.description && (
            <p className="text-sm text-gray-600 truncate">{task.description}</p>
          )}
        </div>

        {/* Edit Button */}
        <button onClick={() => setShowEditModal(true)} aria-label="Edit task">
          <PencilSquareIcon className="w-6 h-6 mr-5" />
        </button>

        {/* Delete Button */}
        <button
          onClick={() => setShowDeleteModal(true)}
          aria-label="Delete task"
        >
          <TrashIcon className="w-6 h-6" color="red" />
        </button>
      </li>

      {/* ShadCN AlertDialog for Delete Confirmation */}
      <AlertDialog open={showDeleteModal} onOpenChange={setShowDeleteModal}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm Deletion</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete the task{" "}
              <span className="font-bold">{task.title}</span>? This action
              cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <Button variant="destructive" onClick={handleDelete}>
              Yes, Delete
            </Button>
            <Button variant="outline" onClick={() => setShowDeleteModal(false)}>
              Cancel
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Edit Task Modal */}
      {showEditModal && (
        <EditTask
          task={task}
          onClose={() => setShowEditModal(false)} // Close the edit modal
          refetchQueries={["GetTasks"]}
        />
      )}
    </>
  );
}
