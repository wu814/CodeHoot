import React from "react";

const OutputDetails = ({ outputDetails }) => {
  return (
    <div className="">
      <p className="overflow-auto focus:outline-none w-full border-2 border-black z-10 rounded-md shadow-[5px_5px_0px_0px_rgba(0,0,0)] px-4 py-2 hover:shadow transition duration-200 bg-white mt-2">
        Status:{" "}
        <span className="font-semibold px-2 py-1 rounded-md bg-gray-100 mt-1">
          {/* (outputDetails?.status?.id === 3) ? {"Compiled"} : {"else"} */}
          {outputDetails?.status?.id === 3 ? (
            "Compiled"
          ) : (
            "Error"
          )}
        </span>
      </p>
      <p className="overflow-auto focus:outline-none w-full border-2 border-black z-10 rounded-md shadow-[5px_5px_0px_0px_rgba(0,0,0)] px-4 py-2 hover:shadow transition duration-200 bg-white mt-2">
        Memory:{" "}
        <span className="font-semibold px-3 py- rounded-md bg-gray-100 mt-1">
          {outputDetails?.memory}kb
        </span>
      </p>
      <p className="overflow-auto focus:outline-none w-full border-2 border-black z-10 rounded-md shadow-[5px_5px_0px_0px_rgba(0,0,0)] px-4 py-2 hover:shadow transition duration-200 bg-white mt-2">
        Time:{" "}
        <span className="font-semibold px-2 py-1 rounded-md bg-gray-100 mt-1">
          {outputDetails?.time}ms
        </span>
      </p>
    </div>
  );
};

export default OutputDetails;
