"use client";
import React, { useEffect, useState, useTransition } from "react";
import Checkbox from "@mui/material/Checkbox";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import axios from "axios";
import {type Todo} from "@/index"

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

        // Calculate the counts for each filter once and store them

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

  const filterTodos = (filter: string, todos: Todo[]) => {
    startTransition(() => {
      let filtered = todos;

      // Apply filtering logic based on the active filter
      if (filter === "All") {
        filtered = todos;
      } else if (filter === "Open") {
        filtered = todos.filter((todo: Todo) => !todo.is_completed);
      } else if (filter === "Closed") {
        filtered = todos.filter((todo: Todo) => todo.is_completed);
      } else if (filter === "Archived") {
        filtered = todos.filter((todo: Todo) => todo.is_archived); // Assuming archived is a field
      }

      setFilteredTodos(filtered); // Set filtered todos and limit to 4
    });
  };

  const handleFilteration = (filter: string) => {
    setActiveFilter(filter); // Set the active filter immediately
    if (todos) {
      filterTodos(filter, todos); // Apply the filter immediately
    }
  };

  // Use the pre-calculated counts for each filter
  const getCountForFilter = (filter: string) => {
    console.log(filter, "sssss");
    if (filter === "All") {
      return todos.length;
    } else if (filter === "Open") {
      return todos.filter((todo: Todo) => !todo.is_completed).length; // Open means is_completed is false
    } else if (filter === "Closed") {
      return todos.filter((todo: Todo) => todo.is_completed).length; // Closed means is_completed is true
    } else if (filter === "Archived") {
      return todos.filter((todo: Todo) => todo.is_archived).length;
    }
    return 0;
  };

  const checkItem = async (id: string,is_completed: boolean) => {
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
          <div
            key={index}
            className="flex flex-col bg-white rounded-lg w-full max-w-md p-5"
          >
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
                  onClick={() => checkItem(todo?._id,todo?.is_completed)}
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
                10:00 PM - 11:45 PM
              </h3>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default ListingTodo;
