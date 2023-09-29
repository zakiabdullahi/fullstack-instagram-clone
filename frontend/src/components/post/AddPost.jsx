/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
// App.js
import React, { useState } from "react";
import Modal from "./Modal"; // Adjust the import path accordingly
import { useAddPostMutation } from "../../features/apiSlice/postSlice";

function AddPost({ isModalOpen, setIsModalOpen }) {
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <button onClick={handleOpenModal}>+</button>
      {isModalOpen && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "fixed",
            top: "0",
            left: "0",
            width: "100%",
            height: "100%",
            background: "rgba(0,0,0,0.5)",
          }}
        >
          <Modal
            onClose={handleCloseModal}
            isModalOpen={isModalOpen}
            setIsModalOpen={setIsModalOpen}
          />
        </div>
      )}
    </div>
  );
}

export default AddPost;
