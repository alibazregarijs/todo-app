import React from "react";
import Checkbox from "@mui/material/Checkbox";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";

export const ListingTodo = () => {
  return (
    <div className="flex justify-center mx-10 mt-10">
      <div className="flex flex-col bg-white rounded-lg w-full max-w-md p-5">
        <div className="flex justify-between items-center">
          <div className="flex flex-col space-y-[5px]">
            <h3 className="font-medium text-base leading-6 whitespace-nowrap line-through">
              Client Review & Feedback
            </h3>
            <p className="font-medium text-xs leading-4 text-second-gray-color">
              Crypto Wallet redesign
            </p>
          </div>
          <div className="flex">
            <Checkbox
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
          <span className="text-xs leading-[18px] text-second-gray-color">Today</span>
          <h3 className="text-xs leading-[18px] text-first-gray-color">10:00 PM - 11:45 PM</h3>
        </div>
      </div>
    </div>
  );
};

export default ListingTodo;
