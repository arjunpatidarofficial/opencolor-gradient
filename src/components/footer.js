import React, { useState, useEffect, useRef } from "react";

const Footer = () => {
  return (
    <div className=" w-full px-5 mt-5 py-6 ">
      <div className="flex flex-col justify-center items-center w-full">
        <img
          className="w-20 h-20 shadow-lg rounded-full p-1"
          src="/opencolor.png"
        ></img>
        <p className="font-bold text-xl mt-4">OpenColor Gradient</p>
        <p className="text-gray-500 text-sm font-medium">V1.0.0(Beta)</p>
        <div className="w-full flex flex-col items-center justify-center">
          <p className="text-gray-600 text-sm mt-5">
            Copyright © 2023{" "}
            <span className="font-semibold text-black">
              Arjun Patidar{" "}
              <a
                className="text-blue-500 font-normal"
                target="_blank"
                href="https://arjunpatidar.me"
              >
                (arjunpatidar.me)
              </a>
              .
            </span>{" "}
            All rights reserved.
          </p>
          <p className="text-gray-600 text-sm mt-1">
            Made with Love in{" "}
            <span className="text-orange-600 font-semibold">India</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
