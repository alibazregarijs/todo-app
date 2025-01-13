"use client";
import React from "react";
import { getDateString } from "@/lib/utils";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import { styledButton as StyledButton } from "@/components/Button";

const CreateTask = () => {
  return (
    <div>
      <div className="flex justify-around items-center mt-10">
        <div className="flex flex-col">
          <h3 className="font-bold text-xl leading-[30px]">Today's Task</h3>
          <p className="font-medium text-sm leading-[21px] text-second-gray-color">
            {getDateString()}
          </p>
        </div>
        <div className="flex ">
          <Button
            startIcon={<AddIcon />}
            sx={{
              backgroundColor: "#0760FB1A",
              borderRadius: "10px",
              width: "125px",
              height: "40px",
              color: "#0760FB",
              fontSize: "14px",
              lineHeight: "21px",
              fontWeight: "500",
            }}
          >
            New Task
          </Button>
        </div>
      </div>
      <div className="flex justify-center h-[21px] items-center mt-10 space-x-[19px]">
        <div className="flex justify-center items-center space-x-[5px]">
          <h3 className="font-semibold text-sm text-first-blue-color leading-[21px]">
            All
          </h3>
          <p className="bg-first-blue-color text-center text-[10px] text-white font-medium leading-[15px] rounded-full w-5 h-[15px]">
            35
          </p>
        </div>
        <div className="border-l-[1px] border-second-gray-color h-full "></div>
        <div className="flex justify-center items-center space-x-[5px]">
          <h3 className="font-semibold text-sm text-second-gray-color leading-[21px]">
            Open
          </h3>
          <p className="bg-first-gray-color text-center text-[10px] text-white font-medium leading-[15px] rounded-full w-5 h-[15px]">
            35
          </p>
        </div>
        <div className="flex justify-center items-center space-x-[5px]">
          <h3 className="font-semibold text-sm text-second-gray-color leading-[21px]">
            Closed
          </h3>
          <p className="bg-first-gray-color text-center text-[10px] text-white font-medium leading-[15px] rounded-full w-5 h-[15px]">
            35
          </p>
        </div>
        <div className="flex justify-center items-center space-x-[5px]">
          <h3 className="font-semibold text-sm text-second-gray-color leading-[21px]">
            Archived
          </h3>
          <p className="bg-first-gray-color text-center text-[10px] text-white font-medium leading-[15px] rounded-full w-5 h-[15px]">
            35
          </p>
        </div>
      </div>
    </div>
  );
};

export default CreateTask;
