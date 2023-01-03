import React, { useState, useRef, useEffect, useLayoutEffect } from "react";
import Draggable from "react-draggable";
import { uid } from "uid";
import ColorPicker from "../../components/colorPicker";
import Background from "../../components/icons/background";
import Text from "../../components/icons/text";
import Radial from "../../components/icons/radial";
import Linear from "../../components/icons/linear";
import Navbar from "../../components/navBar";
import Footer from "../../components/footer";

const Gradient = () => {
  const barRef = useRef(null);
  const canvasRef = useRef(null);
  const [barWidth, setBarWidth] = useState(0);

  const [isBackground, setIsBackground] = useState(true);
  const [angle, setAngle] = useState(45);
  const [isLinear, setIsLinear] = useState(true);

  const [selectedColor, setSelectedColor] = useState("1");

  const [deleteCount, setDeleteCount] = useState(0);

  const [finalArray, setFinalArray] = useState([]);

  const [thumbPointers, setThumbPointers] = useState([
    {
      position: {
        x: 0,
      },
      id: "1",
      color: {
        r: 62,
        g: 0,
        b: 255,
        a: 1,
      },
    },
    {
      position: {
        x: 100,
      },
      id: "2",
      color: {
        r: 255,
        g: 149,
        b: 9,
        a: 1,
      },
    },
  ]);

  function useWindowSize() {
    const [size, setSize] = useState([0, 0]);
    useLayoutEffect(() => {
      function updateSize() {
        setSize([window.innerWidth, window.innerHeight]);
      }
      window.addEventListener("resize", updateSize);
      updateSize();
      return () => window.removeEventListener("resize", updateSize);
    }, []);
    return size;
  }

  function ShowWindowDimensions(props) {
    const [width, height] = useWindowSize();
    setBarWidth(barRef?.current?.clientWidth);
    return <></>;
  }

  const handleSort = (thumbPointers) => {
    var sortAsc = thumbPointers.slice().sort((a, b) => {
      return a.position.x - b.position.x;
    });
    setFinalArray(sortAsc);
  };

  useEffect(() => {
    handleSort(thumbPointers);
  }, [thumbPointers]);

  useEffect(() => {
    setSelectedColor(thumbPointers[thumbPointers.length - 1].id);
  }, [deleteCount]);

  const trackPos = (data, id) => {
    const index = thumbPointers.findIndex((object) => {
      return object.id === id;
    });

    const xValue = ((data.x + 44) / barWidth) * 100;

    // change the value of x if the find id is matched

    const array = [
      ...thumbPointers.slice(0, index),
      Object.assign({}, thumbPointers[index], {
        position: {
          x: xValue,
          y: 0,
        },
        id: id,
      }),
      ...thumbPointers.slice(index + 1),
    ];
    setThumbPointers(array);
  };

  useEffect(() => {
    setBarWidth(barRef.current.clientWidth);
  }, [barRef]);

  const addNewThumb = (e) => {
    if (e.target.id === "bar") {
      let currentId = uid();
      setSelectedColor(currentId);

      let currentColor = getPixelColorCode(
        ((e.pageX - e.target.offsetLeft) / barWidth) * 100
      );

      console.log(
        "---currentColor---",
        `rgba(${currentColor.r},${currentColor.g},${currentColor.b},${currentColor.a})`
      );

      setThumbPointers((pre) => [
        ...pre,
        {
          position: {
            x: ((e.pageX - e.target.offsetLeft) / barWidth) * 100,
          },
          color: {
            r: currentColor.r,
            g: currentColor.g,
            b: currentColor.b,
            a: currentColor.a,
          },
          id: currentId,
        },
      ]);
    }
  };

  const deleteThumb = (currentId) => {
    if (thumbPointers.length <= 2) {
      return;
    }

    setDeleteCount((pre) => pre + 1);

    setThumbPointers(
      thumbPointers.filter((pointers) => pointers.id != currentId)
    );
  };

  function rgbToHex(r, g, b) {
    if (r > 255 || g > 255 || b > 255) throw "Invalid color component";
    return ((r << 16) | (g << 8) | b).toString(16);
  }

  const getPixelColorCode = (currentXpos) => {
    const canvasXpos = (currentXpos * 299) / 100;

    console.log("canvasXpos", canvasXpos);
    const context = canvasRef?.current?.getContext("2d");

    context.beginPath();
    var gradient = context.createLinearGradient(
      0,
      0,
      canvasRef.current.width,
      0
    );

    finalArray.map((obj) => {
      gradient.addColorStop(
        obj.position.x / 100,
        `rgba(${obj.color.r},${obj.color.g},${obj.color.b},${obj.color.a})`
      );
    });
    context.fillStyle = gradient;
    context.fillRect(0, 0, canvasRef.current.clientWidth, 100);

    console.log("-----width-----", canvasRef.current.clientWidth);

    var pixelData = context.getImageData(canvasXpos, 1, 1, 1).data;

    console.log("context", context, pixelData);

    // var hex =
    //   "#" +
    //   ("000000" + rgbToHex(pixelData[0], pixelData[1], pixelData[2])).slice(-6);

    return {
      r: pixelData[0],
      g: pixelData[1],
      b: pixelData[2],
      a: 1,
    };
  };

  return (
    <div
      onKeyUp={(e) => {
        if (e.key === "Delete" && e.target.localName !== "input") {
          deleteThumb(selectedColor);
        }
      }}
      tabIndex="0"
      className="flex items-center flex-col outline-none border-0 bg-primary w-full  pb-10"
    >
      <div>
        <ShowWindowDimensions></ShowWindowDimensions>
      </div>

      <div className=" w-full">
        <canvas
          className="invisible"
          style={{ width: "100%", height: "1px" }}
          id="color-strip"
          ref={canvasRef}
        ></canvas>
      </div>

      <Navbar />

      <div className="w-[95%] border border-gray-400 p-[3px] mt-3 rounded-md">
        <div
          style={
            isBackground
              ? {
                  background: `${
                    isLinear
                      ? `linear-gradient(${angle}deg`
                      : "radial-gradient(circle"
                  }, ${finalArray.map((obj) => {
                    return `rgba(${obj.color.r},${obj.color.g},${obj.color.b},${obj.color.a}) ${obj.position.x}%`;
                  })})`,
                }
              : {}
          }
          className="w-full flex bg-primary justify-center items-center rounded h-44"
        >
          <h1
            className="text-4xl font-black select-none"
            style={
              isBackground
                ? {
                    color: "#ffffff",
                  }
                : {
                    backgroundImage: ` -webkit-linear-gradient(45deg, ${finalArray.map(
                      (obj) => {
                        return `rgba(${obj.color.r},${obj.color.g},${obj.color.b},${obj.color.a}) ${obj.position.x}%`;
                      }
                    )})`,
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }
            }
          >
            Because of your smile, you make life more beautiful.
          </h1>
        </div>
      </div>

      <div className=" mt-3 h-14 flex justify-end space-x-3  w-[95%] rounded-md">
        {isLinear ? (
          <div className="border-gray-200 border flex-col items-center justify-center bg-white rounded-md h-14 w-20">
            <p className="text-gray-500 text-xs text-center mt-1.5">Angle °</p>
            <input
              className="w-16 font-bold text-sm text-center mt-0.5  rounded outline-none"
              value={angle}
              maxLength="3"
              onChange={(e) => {
                setAngle(e.target.value);
              }}
              type="number"
            ></input>
          </div>
        ) : (
          <></>
        )}
        <div className=" flex items-center space-x-3 h-full border-gray-200 border bg-white rounded-md px-5">
          <div
            onClick={() => {
              setIsBackground(true);
            }}
            className={`p-1.5 w-7 h-7 flex justify-center items-center rounded ${
              isBackground ? "bg-orange-500" : "bg-gray-100"
            }`}
          >
            <Background
              primaryColor={isBackground ? "#ffffff" : "#000000"}
              secondaryColor={isBackground ? "#EFEFEF" : "#717171"}
            />
          </div>
          <div
            onClick={() => {
              setIsBackground(false);
            }}
            className={`p-1.5 w-7 h-7 flex justify-center items-center rounded ${
              !isBackground ? "bg-orange-500" : "bg-gray-100"
            }`}
          >
            <Text
              primaryColor={!isBackground ? "#ffffff" : "#000000"}
              secondaryColor={!isBackground ? "#EFEFEF" : "#717171"}
            />
          </div>

          <div className="h-full py-2">
            <div className="border-l h-full"></div>
          </div>

          <div
            onClick={() => {
              setIsLinear(true);
            }}
            className={`p-1.5 w-7 h-7 flex justify-center items-center rounded ${
              isLinear ? "bg-orange-500" : "bg-gray-100"
            }`}
          >
            <Linear
              primaryColor={isLinear ? "#ffffff" : "#000000"}
              secondaryColor={isLinear ? "#EFEFEF" : "#717171"}
            />
          </div>

          <div
            onClick={() => {
              setIsLinear(false);
            }}
            className={`p-1.5 w-7 h-7 flex justify-center items-center rounded ${
              !isLinear ? "bg-orange-500" : "bg-gray-100"
            }`}
          >
            <Radial
              primaryColor={!isLinear ? "#ffffff" : "#000000"}
              secondaryColor={!isLinear ? "#EFEFEF" : "#717171"}
            />
          </div>
        </div>
      </div>

      <div className="w-full px-5 mt-4">
        <div className="w-full rounded-md bg-white shadow-md">
          <div className="w-full px-5  py-2 ">
            <div className="w-full rounded p-[2px] border-2 mt-5 border-black">
              <div
                ref={barRef}
                onClick={(e) => {
                  addNewThumb(e);
                }}
                id="bar"
                style={{
                  backgroundImage: `linear-gradient(45deg, ${finalArray.map(
                    (obj) => {
                      return `rgba(${obj.color.r},${obj.color.g},${obj.color.b},${obj.color.a}) ${obj.position.x}%`;
                    }
                  )})`,
                }}
                className="flex  w-full rounded h-9 cursor-copy"
              >
                {thumbPointers.map((obj, index) => {
                  const xValue = (obj.position.x * barWidth) / 100 - 44;

                  return (
                    <Draggable
                      bounds="parent"
                      key={index}
                      axis="x"
                      onStart={() => {
                        setSelectedColor(obj.id);
                        const thumb = document.getElementById(obj.id);
                        thumb.style.zIndex = "100";
                      }}
                      onStop={() => {
                        const thumb = document.getElementById(obj.id);
                        thumb.style.zIndex = "0";
                      }}
                      position={{ x: xValue, y: 0 }}
                      onDrag={(e, data) => trackPos(data, obj.id)}
                    >
                      <div className="w-0" id={obj.id}>
                        <div
                          // onClick={(e) => {
                          //   console.log("I am clicked", e);
                          // }}
                          className="box demo -my-[10px] bg-black cursor-move  rounded-full ml-9 -mr-7 p-[2px]"
                        >
                          <div
                            style={{
                              backgroundColor: `rgba(${obj.color.r},${obj.color.g},${obj.color.b},${obj.color.a})`,
                            }}
                            className="w-full h-full border-2 select-none  rounded-full"
                          ></div>
                        </div>
                        <input
                          className={`${
                            selectedColor === obj.id ? "border-2" : "border"
                          } w-10 ml-6 font-semibold text-center select-none text-sm rounded-md h-8 mt-5 border hover:border-2 border-black`}
                          value={Math.ceil(obj.position.x)}
                          type="number"
                          onChange={(e) => {
                            const index = thumbPointers.findIndex((object) => {
                              return object.id === obj.id;
                            });

                            const array = [
                              ...thumbPointers.slice(0, index),
                              Object.assign({}, thumbPointers[index], {
                                position: {
                                  x: e.target.value,
                                },
                              }),
                              ...thumbPointers.slice(index + 1),
                            ];
                            setThumbPointers(array);
                          }}
                        ></input>
                      </div>
                    </Draggable>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="w-full flex py-10  border-t mt-5">
            <div className="flex flex-col mt-7  items-center w-2/3 border-r border-gray-200">
              <ColorPicker
                color={`rgba(${
                  thumbPointers[
                    thumbPointers.findIndex((object) => {
                      return object.id === selectedColor;
                    })
                  ]?.color.r
                },${
                  thumbPointers[
                    thumbPointers.findIndex((object) => {
                      return object.id === selectedColor;
                    })
                  ]?.color.g
                },${
                  thumbPointers[
                    thumbPointers.findIndex((object) => {
                      return object.id === selectedColor;
                    })
                  ]?.color.b
                },${
                  thumbPointers[
                    thumbPointers.findIndex((object) => {
                      return object.id === selectedColor;
                    })
                  ]?.color.a
                })`}
                onChange={(e) => {
                  // console.log("-----colorObject-------", e);
                  setSelectedColor(selectedColor);
                  const index = thumbPointers.findIndex((object) => {
                    return object.id === selectedColor;
                  });

                  const array = [
                    ...thumbPointers.slice(0, index),
                    Object.assign({}, thumbPointers[index], {
                      color: {
                        r: e.rgb.r,
                        g: e.rgb.g,
                        b: e.rgb.b,
                        a: e.rgb.a,
                      },
                    }),
                    ...thumbPointers.slice(index + 1),
                  ];
                  setThumbPointers(array);
                }}
              />
            </div>
            <div className="w-1/3 space-y-1 px-7 mt-5">
              {finalArray.map((obj, index) => {
                return (
                  <>
                    <div
                      onClick={(e) => setSelectedColor(obj.id)}
                      className={`flex justify-center hover:bg-primary space-x-8 ${
                        selectedColor === obj.id ? "bg-primary" : ""
                      } rounded-md py-2 items-center`}
                    >
                      <div
                        className={`${
                          selectedColor === obj.id
                            ? "border-black"
                            : "border-white"
                        } border-black rounded-full border-[2px] p-[2px]`}
                      >
                        <div
                          style={{
                            backgroundColor: `rgba(${obj.color.r},${obj.color.g},${obj.color.b},${obj.color.a})`,
                          }}
                          className="w-10 h-10 rounded-full"
                        ></div>
                      </div>
                      <input
                        className={`w-20 ${
                          selectedColor === obj.id
                            ? "border-black border-2"
                            : "border-gray-300"
                        }  uppercase font-bold text-center select-none text-sm rounded-md h-10 border
                         hover:border-2 hover:border-black `}
                        value={`#${rgbToHex(
                          obj.color.r,
                          obj.color.g,
                          obj.color.b
                        )}`}
                        onChange={(e) => {
                          const index = thumbPointers.findIndex((object) => {
                            return object.id === obj.id;
                          });

                          const array = [
                            ...thumbPointers.slice(0, index),
                            Object.assign({}, thumbPointers[index], {
                              color: e.target.value,
                            }),
                            ...thumbPointers.slice(index + 1),
                          ];
                          setThumbPointers(array);
                        }}
                        type="text"
                      ></input>

                      <input
                        className={`w-12 ${
                          selectedColor === obj.id
                            ? "border-black border-2"
                            : "border-gray-300"
                        }   font-bold text-center select-none text-sm rounded-md h-10 border  hover:border-2 hover:border-black`}
                        value={Math.ceil(obj.position.x)}
                        type="number"
                        onChange={(e) => {
                          const index = thumbPointers.findIndex((object) => {
                            return object.id === obj.id;
                          });

                          const array = [
                            ...thumbPointers.slice(0, index),
                            Object.assign({}, thumbPointers[index], {
                              position: {
                                x: e.target.value,
                              },
                            }),
                            ...thumbPointers.slice(index + 1),
                          ];
                          setThumbPointers(array);
                        }}
                      ></input>

                      <i
                        onClick={() => {
                          deleteThumb(obj.id);
                        }}
                        className="fa-solid fa-xmark text-gray-300 text-xl"
                      ></i>
                    </div>
                  </>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Gradient;
