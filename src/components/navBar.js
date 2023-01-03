import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Navbar(props) {
  const [theme, setTheme] = useState("false");
  const [currentPage, setCurrentPage] = useState("home");
  const navigation = useNavigate();
  var page = window.location.href;

  return (
    <div className="flex w-full justify-between">
      <div className=" px-7 sm:px-10 py-4 w-full   flex sm:flex-row flex-col items-start  sm:items-start  justify-between">
        <div className=" py-2  w-full  flex flex-col items-start justify-start ">
          <div className=" flex justify-center items-center">
            <img
              className="w-14 h-14 rounded-full p-0.5 shadow-lg"
              src="/opencolor.png"
            ></img>
            <p className="text-black text-2xl font-bold ml-2">
              OpenColor Gradient
            </p>
          </div>
        </div>
        <div className="flex items-start py-5 gap-x-3  sm:mt-0 text-sm w-32">
          <a
            target="_blank"
            href="https://twitter.com/arjunpofficial"
            className="bg-white w-8 h-8 p-1.5 rounded-full shadow-lg"
          >
            <img className="" src="/twitter.png"></img>
          </a>

          <a
            target="_blank"
            href="https://www.instagram.com/arjun.patidar.official/"
            className="bg-white w-8 h-8 p-1.5 rounded-full shadow-lg"
          >
            <img className="" src="/instagram.png"></img>
          </a>

          <a
            target="_blank"
            href="https://www.linkedin.com/in/arjun-patidar-3a0395135/"
            className="bg-white  w-8 h-8 p-1.5  rounded-full shadow-lg"
          >
            <img className="" src="/linkedin.png"></img>
          </a>
        </div>
      </div>
    </div>
  );
}
