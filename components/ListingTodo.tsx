"use client";

import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/store/store";
import { fetchTodos, updateTodoStatus } from "@/store/TodoSlice";
import TodoItem from "./TodoItem";
import Spinner from "@/components/Spinner";

const filters = ["All", "Open", "Closed", "Archived"];

export const ListingTodo = () => {
  const dispatch = useDispatch<AppDispatch>();

  // Fetch todos and other state from Redux
  const { todos, status, error } = useSelector((state: RootState) => state.todos);

  const [activeFilter, setActiveFilter] = React.useState("All");

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchTodos());
    }
  }, [status, dispatch]);

  const applyFilter = (filter: string) => {
    switch (filter) {
      case "Open":
        return todos.filter((todo) => !todo.is_completed);
      case "Closed":
        return todos.filter((todo) => todo.is_completed);
      case "Archived":
        return todos.filter((todo) => todo.is_archived);
      default:
        return todos;
    }
  };

  const filteredTodos = applyFilter(activeFilter);

  const handleFilteration = (filter: string) => {
    setActiveFilter(filter);
  };

  const handleCheckItem = (id: string, is_completed: boolean) => {
    dispatch(updateTodoStatus({ id, is_completed: !is_completed }));
  };

  if (status === "loading") return <Spinner loading={true} />;
  if (status === "failed") return <p>Error: {error}</p>;

  return (
    <>
      <div className="flex justify-center items-center mt-10 space-x-[19px]">
        {filters.map((filter, index) => (
          <React.Fragment key={index}>
            <div className="flex justify-center items-center space-x-[5px]">
              <h3
                onClick={() => handleFilteration(filter)}
                className={`font-semibold cursor-pointer text-sm ${
                  filter === activeFilter
                    ? "text-first-blue-color"
                    : "text-second-gray-color"
                }`}
              >
                {filter}
              </h3>
              <p
                className={`${
                  filter === activeFilter
                    ? "bg-first-blue-color"
                    : "bg-second-gray-color"
                } text-center text-[10px] text-white font-medium leading-[15px] rounded-full w-5 h-[15px]`}
              >
                {applyFilter(filter).length}
              </p>
            </div>
          </React.Fragment>
        ))}
      </div>

      <div className="flex flex-col space-y-5 justify-center mx-10 mt-10">
        {filteredTodos.map((todo:any) => (
          <TodoItem
            key={todo._id}
            todo={todo}
            checkItem={() => handleCheckItem(todo._id, todo.is_completed)}
          />
        ))}
      </div>
    </>
  );
};

export default ListingTodo;
