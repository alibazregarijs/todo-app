"use client";
import React, { useEffect, useState, useTransition } from "react";
import TodoItem from "./TodoItem";
import axios from "axios";
import { type Todo } from "@/index";

const filters = ["All", "Open", "Closed", "Archived"];

export const ListingTodo = () => {
  const [activeFilter, setActiveFilter] = useState("All");
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filteredTodos, setFilteredTodos] = useState<Todo[]>([]);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://frontendtest.ideallco.com/api/todos/fetch/all"
        );
        const allTodos = response.data.data;
        setTodos(allTodos); // Store all todos

        // Filter todos initially when data is fetched
        filterTodos("All", allTodos);
      } catch (error) {
        setError(
          error instanceof Error ? error : new Error("An error occurred")
        );
      }
    };
    fetchData(); // Fetch data once on mount
  }, []); // Empty dependency array to run once on mount

  const applyFilter = (filter: string, todos: Todo[]): Todo[] => {
    switch (filter) {
      case "Open":
        return todos.filter((todo) => !todo.is_completed);
      case "Closed":
        return todos.filter((todo) => todo.is_completed);
      case "Archived":
        return todos.filter((todo) => todo.is_archived);
      default:
        return todos; // "All" or any unrecognized filter
    }
  };

  const filterTodos = (filter: string, todos: Todo[]) => {
    startTransition(() => {
      const filtered = applyFilter(filter, todos);
      setFilteredTodos(filtered);
    });
  };

  const handleFilteration = (filter: string) => {
    setActiveFilter(filter); // Set the active filter immediately
    if (todos) {
      filterTodos(filter, todos); // Apply the filter immediately
    }
  };

  const getCountForFilter = (filter: string) => {
    const filtered = applyFilter(filter, todos);
    return filtered.length;
  };

  const checkItem = async (id: string, is_completed: boolean) => {
    todos
      .filter((todo: Todo) => todo._id === id)
      .map((todo: Todo) => {
        todo.is_completed = !todo.is_completed;
      });
    setTodos([...todos]);
    const updateTodo = async () => {
      const updatedData = { is_completed: !is_completed };
      try {
        const response = await axios.put(
          `http://frontendtest.ideallco.com/api/todos/update/${id}`,
          updatedData
        );
        console.log("Todo updated successfully:", response.data);
      } catch (error) {
        console.error("Error updating todo:", error);
      }
    };
    updateTodo();
  };

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
                } leading-[21px] ${
                  isPending && filter === activeFilter ? "opacity-50" : ""
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
                {getCountForFilter(filter)}
              </p>
            </div>
            {filter === "All" && index === 0 && (
              <div className="h-5 border-l-[2px] border-second-gray-color mx-[10px]"></div>
            )}
          </React.Fragment>
        ))}
      </div>

      <div className="flex flex-col space-y-5 justify-center mx-10 mt-10">
        {filteredTodos.map((todo: Todo, index) => (
          <TodoItem key={index} todo={todo} checkItem={checkItem} />
        ))}
      </div>
    </>
  );
};

export default ListingTodo;
