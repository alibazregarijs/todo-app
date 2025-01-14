import React, { useState, memo } from "react";
import Checkbox from "@mui/material/Checkbox";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import { getHoursAndMinutes } from "@/lib/utils";
import { type Todo } from "@/index";
import DeleteIcon from "@mui/icons-material/Delete";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/store";
import { deleteTodo, updateTodoStatus } from "@/store/TodoSlice";

export const TodoItem = memo(({ todo }: { todo: Todo }) => {
  const [iconDeleteClicked, setIconDeleteClicked] = useState(false);
  const dispatch = useDispatch<AppDispatch>();

  const handleDeletTodo = (id: string) => {
    setIconDeleteClicked(true);
    dispatch(deleteTodo(id));
  };

  const handleCheckItem = (id: string, is_completed: boolean) => {
    dispatch(updateTodoStatus({ id, is_completed: !is_completed }));
  };

  return (
    <div className="flex flex-col bg-white rounded-lg w-full max-w-md p-5">
      <div className="flex justify-between items-center">
        <div className="flex flex-col space-y-[5px]">
          <h3
            className={`font-medium text-base leading-6 whitespace-nowrap ${
              todo?.is_completed && "line-through"
            }`}
          >
            {todo?.title}
          </h3>
          <p className="font-medium text-xs leading-4 text-second-gray-color">
            {todo?.description}
          </p>
        </div>
        <div className="flex">
          <Checkbox
            checked={todo?.is_completed}
            onClick={() => handleCheckItem(todo?._id, todo?.is_completed)}
            size="medium"
            sx={{
              color: "#D9D9D9",
              "&.Mui-checked": {
                color: "#0760FB",
              },
            }}
            icon={<RadioButtonUncheckedIcon />}
            checkedIcon={<CheckCircleIcon />}
          />
        </div>
      </div>
      <div className="border-b mr-2 mt-[10px]" />
      <div className="flex justify-between items-center mt-4 space-x-[10px]">
        <div>
          <span className="text-xs leading-[18px] text-second-gray-color">
            Today
          </span>
          <h3 className="text-xs leading-[18px] text-first-gray-color">
            {getHoursAndMinutes(todo.start_date)} -{" "}
            {getHoursAndMinutes(todo.end_date)}
          </h3>
        </div>
        <div>
          {iconDeleteClicked ? (
            <DeleteIcon className="cursor-pointer mr-2" />
          ) : (
            <DeleteOutlinedIcon
              className="cursor-pointer mr-2"
              onClick={() => handleDeletTodo(todo._id)}
            />
          )}
        </div>
      </div>
    </div>
  );
});

export default TodoItem;
