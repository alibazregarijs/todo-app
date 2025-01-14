"use client";

import React, { useEffect, useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/store/store";
import { fetchTodos } from "@/store/TodoSlice";
import TodoItem from "./TodoItem";
import Spinner from "@/components/Spinner";
import Button from "@mui/material/Button";

const filters = ["All", "Open", "Closed", "Archived"];

export const ListingTodo = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { todos, status, error } = useSelector(
    (state: RootState) => state.todos
  );

  const [currentPage, setCurrentPage] = useState(1);
  const todosPerPage = 3;

  const [activeFilter, setActiveFilter] = useState("All");

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchTodos());
    }
  }, [status, dispatch]);

  // Using useCallback for applyFilter
  const applyFilter = useCallback((filter: string) => {
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
  }, [todos]); // Dependent on todos array

  const filteredTodos = applyFilter(activeFilter);

  const filteredTodosReversed = [...filteredTodos].reverse(); // Reverse a copy of filteredTodos
  const indexOfLastTodo = currentPage * todosPerPage;
  const indexOfFirstTodo = Math.max(0, indexOfLastTodo - todosPerPage); // Adjust for potential out-of-bounds
  const currentTodos = filteredTodosReversed.slice(indexOfFirstTodo, indexOfLastTodo);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const handleFilteration = (filter: string) => {
    setActiveFilter(filter);
  };

  if (status === "loading") return <Spinner loading={true} />;
  if (status === "failed") return <p>Error: {error}</p>;

  const totalPages = Math.ceil(filteredTodos.length / todosPerPage);

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

      {/*  listing todos  */}
      <div className="flex flex-col space-y-5 justify-center mx-10 mt-10">
        {currentTodos.map((todo: any) => (
          <TodoItem key={todo._id} todo={todo} />
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center space-x-8 mt-6">
        <Button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 border rounded"
        >
          Previous
        </Button>
        <div className="flex items-center">
          <span>
            Page {currentPage} of {totalPages}
          </span>
        </div>
        <Button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages || totalPages === 0}
          className="px-4 py-2 border rounded"
        >
          Next
        </Button>
      </div>
    </>
  );
};

export default ListingTodo;
