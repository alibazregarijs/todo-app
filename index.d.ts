export type Todo = {
  _id: string; // The ID is a string
  title: string; // The title of the todo
  description: string; // The description of the todo
  start_date: string; // The start date as an ISO string
  end_date: string; // The end date as an ISO string
  is_completed: boolean; // Flag to check if the todo is completed
  createdAt: string; // The created date as an ISO string
  updatedAt: string; // The updated date as an ISO string
  is_archived: boolean; // Flag to check if the todo is archived
};
