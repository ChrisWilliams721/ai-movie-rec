"use client";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { useRouter } from "next/navigation";
import React from "react";
import { useState } from "react";


export default function Nav() {
  const [user, setUser] = useState(null);
  const router = useRouter();

  const signOut = async () => {
    try { router.push("/"); }
    catch (error) { console.error(error); }
    };

  const handlebrowse = async () => {
    try {
      router.push("/browse");
    } catch (error) {
      console.error(error);
    }
  };
  const handleactivity = async () => {
    try {
      router.push("/activity");
    } catch (error) {
      console.error(error);
    }
  };
    const handlereadlist = async () => {
        try {
        router.push("/readlist");
        } catch (error) {
        console.error(error);
        }
    };
    const handleblog = async () => {
        try {
        router.push("/blog");
        } catch (error) {
        console.error(error);
        }
    };
    const handleprofile = async () => {
        try {
        router.push("/profile");
        } catch (error) {
        console.error(error);
        }
    };
  return (
    <div className="flex bg-gray-300 rounded-full mt-7 mx-auto w-11/12 h-20 items-center">
      <div className="flex pl-8">
        <img src="smalllogo.png" alt="Your Company" className="h-16 w-auto" />
      </div>
      <div className="flex flex-grow">
        <ul className="flex space-x-8 ml-20 items-center">
          <li className="px-3">
            <a
              onClick={handlebrowse}
              href="#"
              className="font-medium text-lg text-gray-900 hover:font-semibold"
            >
              Browse
            </a>
          </li>
          <li className="px-3">
            <a
                onClick={handleactivity}
              href="#"
              className="font-medium text-lg text-gray-900 hover:font-semibold"
            >
              Activity
            </a>
          </li>
          <li className="px-3">
            <a
                onClick={handlereadlist}
              href="#"
              className="font-medium text-lg text-gray-900 hover:font-semibold"
            >
              ReadList
            </a>
          </li>
          <li className="px-3">
            <a
                onClick={handleblog}
              href="#"
              className="font-medium text-lg text-gray-900 hover:font-semibold"
            >
              Blog
            </a>
          </li>
        </ul>
        <div className="flex flex-grow justify-end mr-20">
          <div className="flex items-center ml-40 mr-4">
            <input
              type="text"
              placeholder="Search..."
              className="px-4 py-2 border rounded-full w-50 focus:outline-none text-black"
            />
            {/* Profile dropdown */}
            <Menu as="div" className="relative">
              <div>
                <MenuButton className="flex rounded-full bg-gray-800 text-sm focus:outline-none ml-20">
                  <span className="sr-only">Open user menu</span>
                  <img
                    alt=""
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                    className="h-12 w-12 rounded-full"
                  />
                </MenuButton>
              </div>
              <MenuItems
                transition
                className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black/5 focus:outline-none"
              >
                <MenuItem>
                  <a
                  onClick={handleprofile}
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Your Profile
                  </a>
                </MenuItem>
                <MenuItem>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Settings
                  </a>
                </MenuItem>
                <MenuItem>
                  <a
                    onClick={signOut}
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Sign out
                  </a>
                </MenuItem>
              </MenuItems>
            </Menu>
          </div>
        </div>
      </div>
    </div>
  );
}
