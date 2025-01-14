export type Todo = {
  _id: string;
  title: string;
  description: string;
  start_date: string;
  end_date: string;
  is_completed: boolean;
  createdAt: string;
  updatedAt: string;
  is_archived: boolean;
};

export interface CustomModalProps {
  open: boolean;
  onClose: () => void;
}