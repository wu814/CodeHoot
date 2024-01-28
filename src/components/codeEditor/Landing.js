import React, { useEffect, useState } from "react";
import CodeEditorWindow from "./CodeEditorWindow";
import axios from "axios";
import { classnames } from "../../utils/general";
import { languageOptions } from "../../constants/languageOptions";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { defineTheme } from "../../lib/defineTheme";
import useKeyPress from "../../hooks/useKeyPress";
import Footer from "./Footer";
import OutputWindow from "./OutputWindow";
import CustomInput from "./CustomInput";
import OutputDetails from "./OutputDetails";
import ThemeDropdown from "./ThemeDropdown";
import LanguagesDropdown from "./LanguagesDropdown";
import { useNavigate } from "react-router-dom";


import CountDownTimer from "../CountDownTimer";

import "./css/Landing.css";
// import { compareOutputs } from "./outputUtils";
// import { unescape } from "querystring";
// import querystring from 'querystring';
import { addDoc, collection, doc, getDocs, updateDoc,  } from "@firebase/firestore"
import { firestore } from "../../firebase_setup/firebase"
import { currNameID } from "../Home";



const problemDefault = `/** This is where we load the problem **/
// Print out the word "hello" 10 times using a for-loop
// Hint: use the loop skeleton below`;

const testcode = [`
# *Problem 1

# Print out the word "Hello" 10 times using a for-loop
# Hint: use the loop skeleton below
`,
  `
  # Problem 2
# Fill out the following loop condition so only the number 5 is printed out
# Hint: use == to check for equality
for i in range(10):
  <add conditional statement here>
    print(f"{i}")
`,
`
# Problem 3
# Print out the final sum of all the numbers from 1 to 30
# For example, an example output should just be one number (i.e. 10) not more than one
`
];

const actualOutput = ["Hello!\n", "5\n", "465\n"];

// const querystring = require('querystring');

function decodeBase64(str) {
    return new Promise((resolve, reject) => {
        try {
            const decodedString = atob(str);
            resolve(decodedString);
        } catch (error) {
            reject(error);
        }
    });
}

const Landing = () => {
  const probSel = 0;
  const [code, setCode] = useState(testcode[probSel]);
  const [problem, setProblem] = useState(problemDefault);

  const [customInput, setCustomInput] = useState("");
  const [outputDetails, setOutputDetails] = useState(null);
  const [processing, setProcessing] = useState(null);
  const [theme, setTheme] = useState("cobalt");
  const [language, setLanguage] = useState(languageOptions[0]);


  const enterPress = useKeyPress("Enter");
  const ctrlPress = useKeyPress("Control");

  const onSelectChange = (sl) => {
    console.log("selected Option...", sl);
    setLanguage(sl);
  };

  useEffect(() => {
    if (enterPress && ctrlPress) {
      console.log("enterPress", enterPress);
      console.log("ctrlPress", ctrlPress);
      handleCompile();
    }
  }, [ctrlPress, enterPress]);
  const onChange = (action, data) => {
    switch (action) {
      case "code": {
        setCode(data);
        break;
      }
      default: {
        console.warn("case not handled!", action, data);
      }
    }
  };
  const handleCompile = () => {
    setProcessing(true);
    const formData = {
      language_id: language.id,
      // encode source code in base64
      source_code: btoa(code),
      stdin: btoa(customInput),
    };
    const options = {
      method: "POST",
      url: process.env.REACT_APP_RAPID_API_URL,
      params: { base64_encoded: "true", fields: "*" },
      headers: {
        "content-type": "application/json",
        "Content-Type": "application/json",
        "X-RapidAPI-Host": process.env.REACT_APP_RAPID_API_HOST,
        "X-RapidAPI-Key": process.env.REACT_APP_RAPID_API_KEY,
      },
      data: formData,
    };

    axios
      .request(options)
      .then(function (response) {
        console.log("res.data", response.data);
        const token = response.data.token;
        checkStatus(token);
      })
      .catch((err) => {
        let error = err.response ? err.response.data : err;
        // get error status
        let status = err.response.status;
        console.log("status", status);
        if (status === 429) {
          console.log("too many requests", status);

                    // showErrorToast(`Quota of 100 requests exceeded for the Day! Please read the blog on freeCodeCamp to learn how to setup your own RAPID API Judge0!`, 10000);
                }
                setProcessing(false);
                console.log("catch block...", error);
            });
    };

  const checkStatus = async (token) => {
    const options = {
      method: "GET",
      url: process.env.REACT_APP_RAPID_API_URL + "/" + token,
      params: { base64_encoded: "true", fields: "*" },
      headers: {
        "X-RapidAPI-Host": process.env.REACT_APP_RAPID_API_HOST,
        "X-RapidAPI-Key": process.env.REACT_APP_RAPID_API_KEY,
      },
    };
    try {
      let response = await axios.request(options);
      const decodedString = await decodeBase64(response.data.stdout);
      console.log("decodedString", decodedString);
      console.log("actualOutput[2]", actualOutput[probSel]);
      if (decodedString == actualOutput[probSel]) {
        console.log("STRINGS MATCH");
        navigate('../scoreboard');
      } else {
        console.log("STRINGS DO NOT MATCH");

      }
      let statusId = response.data.status?.id;

      // Processed - we have a result
      if (statusId === 1 || statusId === 2) {
        // still processing
        setTimeout(() => {
          checkStatus(token);
        }, 2000);
        return;
      } else {
        setProcessing(false);
        setOutputDetails(response.data);
        // console.log("HERE", response.data.stdout);
        showSuccessToast(`Compiled Successfully!`);
                console.log("response.data", response.data);
                return;
            }
        } catch (err) {
            console.log("err", err);
            setProcessing(false);
            showErrorToast();
        }
    };

  const [isTimerRunning, setTimerRunning] = useState(true);
  const [remainingTime, setRemainingTime] = useState(0);
  const navigate = useNavigate();
    const ref = collection(firestore, "names")

    const updateScores = async (remainingSeconds) => {
        try {
            const querySnapshot = await getDocs(ref);
            
            querySnapshot.forEach((docu) => {
                if (docu.id == currNameID) {
                    const docRef = doc(ref, docu.id); 
                    updateDoc(docRef, {
                        score: docu.data().score + remainingSeconds,
                    });
                }
          });
          
        } catch (error) {
          console.error('Error getting documents: ', error);
        }
      }

  const handleTimerStop = (remainingSeconds) => {
    setTimerRunning(false);
    setRemainingTime(remainingSeconds);
        updateScores(remainingSeconds);

    navigate("/scoreboard");
  };

    const handleSubmit = () => {
        // Handle your submit logic here
        // Access remainingTime for the remaining time value
        handleTimerStop(remainingTime); // Pass the remaining time back to the timer
        
    };

    function handleThemeChange(th) {
        const theme = th;
        console.log("theme...", theme);

        if (["light", "vs-dark"].includes(theme.value)) {
            setTheme(theme);
        } else {
            defineTheme(theme.value).then((_) => setTheme(theme));
        }
    }
  // };

  // const [isTimerRunning, setTimerRunning] = useState(true);
  // const [remainingTime, setRemainingTime] = useState(0);
  // const navigate = useNavigate();

  // const handleTimerStop = (remainingSeconds) => {
  //   setTimerRunning(false);
  //   setRemainingTime(remainingSeconds);
  //   navigate("/scoreboard");
  // };

  // const handleSubmit = () => {
  //   // Handle your submit logic here
  //   // Access remainingTime for the remaining time value
  //   console.log(`Remaining Time: ${remainingTime} seconds`);
  //   handleTimerStop(remainingTime); // Pass the remaining time back to the timer
  // };

  function handleThemeChange(th) {
    const theme = th;
    console.log("theme...", theme);

    if (["light", "vs-dark"].includes(theme.value)) {
      setTheme(theme);
    } else {
      defineTheme(theme.value).then((_) => setTheme(theme));
    }
  }
  useEffect(() => {
    defineTheme("oceanic-next").then((_) => setTheme({ value: "oceanic-next", label: "Oceanic Next" }));
  }, []);

  const showSuccessToast = (msg) => {
    toast.success(msg || `Compiled Successfully!`, {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };
  const showErrorToast = (msg, timer) => {
    toast.error(msg || `Something went wrong! Please try again.`, {
      position: "top-right",
      autoClose: timer ? timer : 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

    return (
        <>
            {/* <ToastContainer position='top-right' autoClose={2000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover /> */}
            {/* <div className='h-4 bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500'></div> */}
            <div className='question-container'>
                <div className='top-container'>
                    <div className='left-panel'>
                        <div className='px-4 py-2' id='select-language'>
                            <LanguagesDropdown onSelectChange={onSelectChange} />
                        </div>
                        <div className='px-4 py-2' id='theme-change'>
                            <ThemeDropdown handleThemeChange={handleThemeChange} theme={theme} />
                        </div>
                    </div>
                    <div className='top-problem-statement'>
                        <h1 className=' text-3xl border-2 border-black z-10 rounded-md shadow-[5px_5px_0px_0px_rgba(0,0,0)] px-4 py-2 bg-white mt-2'>CodeHoot!</h1>
                        <CodeEditorWindow code={problem} onChange={onChange} language={language?.value} theme={theme.value} />
                    </div>
                    <div className='right-top-panel'>
                        <div className='text-container'>
                            <CountDownTimer
                                initialTimeInSeconds={1000} // Set the initial time as needed
                                isRunning={isTimerRunning}
                                onStop={handleTimerStop}
                                onTick={(remainingSeconds) => setRemainingTime(remainingSeconds)}
                            />
                            <button
                                className='overflow-auto focus:outline-none w-full border-2 border-black z-10 rounded-md shadow-[5px_5px_0px_0px_rgba(0,0,0)] px-4 py-2 hover:shadow transition duration-200 bg-white mt-2'
                                onClick={handleSubmit}
                            >
                                Submit
                            </button>
                        </div>
                    </div>
                </div>

        <div className='btm-container'>
          <div className='problem-statement'>
            <div id='editor-window'>
              <CodeEditorWindow code={code} onChange={onChange} language={language?.value} theme={theme.value} />
            </div>
          </div>
          <div className='right-panel'>
            <div id='output-window'>
              <OutputWindow outputDetails={outputDetails} />
            </div>
            <div id='custom-input'>
              <CustomInput customInput={customInput} setCustomInput={setCustomInput} />
            </div>
            <div id='custom-compile'>
              <button
                onClick={handleCompile}
                disabled={!code}
                className={classnames(
                  "mt-4 border-2 border-black z-10 rounded-md shadow-[5px_5px_0px_0px_rgba(0,0,0)] px-4 py-2 hover:shadow transition duration-200 bg-white flex-shrink-0",
                  !code ? "opacity-50" : ""
                )}
              >
                {processing ? "Processing..." : "Compile and Execute"}
              </button>
            </div>
          </div>
          <div className='far-right-panel'>
            <div id='output-details'>{outputDetails && <OutputDetails outputDetails={outputDetails} />}</div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Landing;
