import React from "react";
import Checkbox from "@mui/material/Checkbox";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import { getHoursAndMinutes } from "@/lib/utils";
import { type Todo } from "@/index";

export const TodoItem = ({
  todo,
  checkItem,
}: {
  todo: Todo;
  checkItem: (id: string, is_completed: boolean) => void;
}) => {
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
            onClick={() => checkItem(todo?._id, todo?.is_completed)}
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
      <div className="flex items-center mt-4 space-x-[10px]">
        <span className="text-xs leading-[18px] text-second-gray-color">
          Today
        </span>
        <h3 className="text-xs leading-[18px] text-first-gray-color">
          {getHoursAndMinutes(todo.start_date)} -{" "}
          {getHoursAndMinutes(todo.end_date)}
        </h3>
      </div>
    </div>
  );
};

export default TodoItem;
