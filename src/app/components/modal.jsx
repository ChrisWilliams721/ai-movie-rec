import React from "react";

export default function Modal({ isOpen, onClose, onSave }) {
  if (!isOpen) return null;

  const handleSave = (e) => {
    const inputValue = document.getElementById("blogInput").value;
    onSave(inputValue);
  };
  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-4 rounded shadow-lg ">
        <h2 className="text-xl mb-4">Enter Blog Content</h2>
        <input
          type="text"
          id="blogInput"
          className="border p-2 mb-4 w-full"
          placeholder="Enter your blog content"
        />
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
