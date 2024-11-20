import Header from "@/components/Header";
import TaskList from "@/components/TaskList";
import AddTaskForm from "@/components/AddTaskForm";
import ApolloProviderWrapper from "@/lib/ApolloProviderWrapper";

export const metadata = {
  title: "TaskMate",
  description: "A simple to-do app using Next.js and Hasura",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ApolloProviderWrapper>
          <Header />
          {children}
        </ApolloProviderWrapper>
      </body>
    </html>
  );
}
