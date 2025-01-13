"use client";
import React from "react";
import { getDateString } from "@/lib/utils";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";

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
    </div>
  );
};

export default CreateTask;
