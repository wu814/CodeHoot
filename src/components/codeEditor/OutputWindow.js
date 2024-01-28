import React from "react";
import { customStyles } from "../../constants/customStyles";

const OutputWindow = ({ outputDetails }) => {
    const getOutput = () => {
        let statusId = outputDetails?.status?.id;

        if (statusId === 6) {
            // compilation error
            return <pre className='overflow-auto px-2 py-1 font-normal text-sm text-red-500'>{atob(outputDetails?.compile_output)}</pre>;
        } else if (statusId === 3) {
            return <pre className='overflow-auto px-2 py-1 font-normal text-lg text-green-500'>{atob(outputDetails.stdout) !== null ? `${atob(outputDetails.stdout)}` : null}</pre>;
        } else if (statusId === 5) {
            return <pre className='overflow-auto px-2 py-1 font-normal text-sm text-red-500'>{`Time Limit Exceeded`}</pre>;
        } else {
            return <pre className='overflow-auto px-2 py-1 font-normal text-sm text-red-500'>{atob(outputDetails?.stderr)}</pre>;
        }
    };
    return (
        <>
            {/* <h1 className='font-bold text-xl bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-700 mb-2'>Output</h1> */}
            <h1 className="focus:outline-none w-full border-2 border-black z-10 rounded-md shadow-[1px_1px_0px_0px_rgba(0,0,0)] px-4 py-2 hover:shadow transition duration-200 bg-white mt-2">Output</h1>
            <div className='focus:outline-none w-full border-2 border-black z-10 rounded-md shadow-[2px_2px_0px_0px_rgba(0,0,0)] px-4 py-2 hover:shadow transition duration-200 bg-white mt-2'>
                {" "}
                {outputDetails ? <>{getOutput()}</> : null}
            </div>
        </>
    );
};

export default OutputWindow;
