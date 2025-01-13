"use client";
import React, { useState } from "react";
import { getDateString } from "@/lib/utils";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import { buttonStyles } from "@/lib/utils";
import CustomModal from "@/components/CustomModal";

const CreateTask = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);
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
            onClick={handleOpenModal}
            startIcon={<AddIcon />}
            sx={buttonStyles}
          >
            New Task
          </Button>
          <CustomModal open={isModalOpen} onClose={handleCloseModal} />
        </div>
      </div>
    </div>
  );
};

export default CreateTask;
