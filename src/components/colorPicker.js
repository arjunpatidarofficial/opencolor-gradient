import React from "react";
import { CustomPicker } from "react-color";
import {
  EditableInput,
  Hue,
  Saturation,
  Alpha,
} from "react-color/lib/components/common";

const ColorPicker = (props) => {
  const { hex, rgb, hsl, hsv, onChange } = props;

  const styles = {
    hue: {
      height: "256px",
      width: "50px",
      position: "relative",
      borderRadius: "8px",
    },
    alpha: {
      height: "256px",
      width: "50px",
      position: "relative",
      borderRadius: "8px",
    },
    saturation: {
      height: "256px",
      position: "relative",
    },
    input: {
      height: 24,
      width: 80,
      padding: 8,
      fontWeight: "bold",
      color: "black",
      fontSize: 14,
      maxLength: "7",
      borderRadius: 2,
      outline: "none",
    },
    swatch: {
      width: 54,
      height: 38,
      background: hex,
    },
  };

  function SaturationPicker() {
    return (
      <div
        className="rounded-full"
        style={{
          width: "16px",
          height: "16px",
          background: hex,
          border: "2px solid black",
          boxShadow: "0px 2px 0px rgba(0, 0, 0, 0.25)",
          transform: "translate(-7px , -5px)",
        }}
      >
        <div className="border-2 h-full rounded-full border-white"></div>
      </div>
    );
  }

  function Picker() {
    return (
      <div
        className="rounded-full cursor-move"
        style={{
          width: "60px",
          height: "14px",
          border: "2px solid black",
          boxShadow: "0px 2px 0px rgba(0, 0, 0, 0.25)",
          transform: "translate(-5px , -5px)",
        }}
      >
        <div
          style={{ border: "3px solid white" }}
          className=" h-full rounded-full"
        ></div>
      </div>
    );
  }

  function AlphaPicker() {
    return (
      <div
        className="rounded-full cursor-move"
        style={{
          width: "60px",
          height: "14px",
          border: "2px solid black",
          boxShadow: "0px 2px 0px rgba(0, 0, 0, 0.25)",
          transform: "translate(-7px , -5px)",
        }}
      >
        <div
          style={{ border: "3px solid white" }}
          className=" h-full rounded-full"
        ></div>
      </div>
    );
  }

  return (
    <div className=" flex flex-col space-y-3">
      <div className="flex sm:flex-row flex-col sm:space-x-7 ">
        <div className="border p-0.5 flex justify-center items-center rounded-md border-black">
          <div className="w-full sm:w-64 h-64" style={styles.saturation}>
            <Saturation
              style={{
                circle: {
                  height: "8px",
                  width: "8px",
                  boxShadow:
                    "0 0 0 3px #fff, inset 0 0 1px 1px rgba(0,0,0,.3),\n            0 0 1px 2px rgba(0,0,0,.4)",
                },
              }}
              radius="4px"
              hsl={hsl}
              hsv={hsv}
              pointer={SaturationPicker}
              onChange={onChange}
            />
          </div>
        </div>

        <div className="flex space-x-2 mt-5 sm:mt-0 sm:space-x-7">
          <div className="border p-0.5 rounded-md border-black">
            <div style={styles.hue} className="">
              <Hue
                pointer={Picker}
                hsl={hsl}
                radius="4px"
                direction="vertical"
                onChange={onChange}
              />
            </div>
          </div>

          <div className="border p-0.5 rounded-md border-black">
            <div style={styles.alpha}>
              {console.log("----props----", { ...props })}
              <Alpha
                {...props}
                direction="vertical"
                pointer={AlphaPicker}
                onChange={onChange}
              />
            </div>
          </div>

          <div className="flex flex-col  w-full">
            <div className="border  border-black p-0.5 h-10 w-full rounded-md">
              <div
                style={{
                  backgroundColor: `rgba(${rgb.r},${rgb.g},${rgb.b},${rgb.a})`,
                }}
                className="w-full h-full rounded"
              ></div>
            </div>
            <div className="flex flex-col  mt-5 w-full">
              <p className="text-xs text-gray-400 font-medium">HEX CODE</p>
              <div className="flex justify-end mt-2 hover:border-2  border border-gray-300 hover:border-black items-center h-9 rounded-md w-28">
                <div
                  style={{
                    border: `5px solid rgba(${rgb.r},${rgb.g},${rgb.b},${rgb.a})`,
                    boxShadow: "0px 0px 0px rgba(0, 0, 0, 0.25)",
                  }}
                  className={` rounded-full w-4 h-4 `}
                ></div>
                <EditableInput
                  style={{ input: styles.input }}
                  className=""
                  value={hex}
                  onChange={onChange}
                />
              </div>
            </div>

            <div className="flex flex-col  mt-5 w-full">
              <p className="text-xs text-gray-400 font-medium">RGBA CODE</p>
              <div className="flex justify-center mt-2 hover:border-2 px-2   border border-gray-300 hover:border-black items-center h-9 rounded-md w-44">
                <div
                  style={{
                    border: `5px solid rgba(${rgb.r},${rgb.g},${rgb.b},${rgb.a})`,
                    boxShadow: "0px 0px 0px rgba(0, 0, 0, 0.25)",
                  }}
                  className={` rounded-full w-4 h-4 `}
                ></div>
                <EditableInput
                  style={{
                    input: {
                      width: 150,
                      paddingLeft: 5,
                      outline: "none",
                    },
                  }}
                  value={`rgba(${rgb.r},${rgb.g},${rgb.b},${rgb.a})`}
                  onChange={onChange}
                />
              </div>
            </div>

            {/* <div className="grid  grid-cols-4 gap-3 w-full mt-5">
            <div className="flex flex-col items-center space-y-1">
              <p className="text-xs text-gray-400 font-medium">R</p>
              <input
                type="number"
                className="text-black text-sm w-10 text-center rounded h-8 border hover:border-2 border-gray-300 hover:border-black"
                value={rgb.r}
              />
            </div>
            <div className="flex flex-col items-center space-y-1">
              <p className="text-xs text-gray-400 font-medium">G</p>
              <input
                type="number"
                className="text-black text-sm w-10 text-center rounded h-8 border hover:border-2 border-gray-300 hover:border-black"
                value={rgb.g}
              />
            </div>
            <div className="flex flex-col items-center space-y-1">
              <p className="text-xs text-gray-400 font-medium">B</p>
              <input
                type="number"
                className="text-black text-sm w-10 text-center rounded h-8 border hover:border-2 border-gray-300 hover:border-black"
                value={rgb.b}
              />
            </div>
            <div className="flex flex-col items-center space-y-1">
              <p className="text-xs text-gray-400 font-medium">A</p>
              <input
                type="number"
                className="text-black text-sm w-10 text-center rounded h-8 border hover:border-2 border-gray-300 hover:border-black"
                value={rgb.a}
              />
            </div>
          </div> */}

            <div className="flex flex-col  mt-5 w-full">
              <p className="text-xs text-gray-400 font-medium">HSL</p>
              <p className=" text-black mt-0.5 text-sm font-medium">{`${Math.ceil(
                hsl.h
              )}, ${Math.ceil(hsl.s * 100)}%, ${Math.ceil(hsl.l * 100)}%`}</p>
            </div>

            {/* <div className="flex flex-col  mt-3 w-full">
            <p className="text-xs text-gray-400 font-medium">HSV</p>
            <p className=" text-black mt-0.5 text-sm font-medium">{`${Math.ceil(
              hsv.h
            )},  ${Math.ceil(hsv.s * 100)}%,  ${Math.ceil(hsv.v * 100)}%`}</p>
          </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomPicker(ColorPicker);
