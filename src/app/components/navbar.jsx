import React from "react";

export default function Nav() {
  return (
    <div className="flex bg-gray-300 rounded-full mt-6 mx-auto w-11/12 h-20">
      <div className="flex pl-8 mt-1">
        <img
          src="smalllogo.png"
          alt="Your Company"
          className="mx-auto h-20 w-auto"
        />
      </div>
      <div>
        <ul className="flex justify-normal items-center w-11/12 h-20">
          <li className="pr-6">
            <a
              href="#"
              className="font-semibold text-gray-900 hover:text-indigo-500"
            >
              Browse
            </a>
          </li>
          <li className="pr-6">
            <a
              href="#"
              className="font-semibold text-gray-900 hover:text-indigo-500"
            >
              Activity
            </a>
          </li>
          <li className="pr-6">
            <a
              href="#"
              className="font-semibold text-gray-900 hover:text-indigo-500"
            >
              ReadList
            </a>
          </li>
          <li className="pr-6">
            <a
              href="#"
              className="font-semibold text-gray-900 hover:text-indigo-500"
            >
              Blog
            </a>
          </li>
        </ul>

      </div>
    </div>
  );
}
