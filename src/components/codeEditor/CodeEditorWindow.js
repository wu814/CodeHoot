import React, { useState } from "react";

import Editor from "@monaco-editor/react";

const CodeEditorWindow = ({ onChange, language, code, theme }) => {
  const [value, setValue] = useState(code || "");

  const handleEditorChange = (value) => {
    setValue(value);
    onChange("code", value);
  };

  return (
    <div className="overlay rounded-md overflow-hidden w-full h-full shadow-4xl focus:outline-none w-full border-2 border-black z-10 rounded-md shadow-[2px_2px_0px_0px_rgba(0,0,0)] px-4 py-3 hover:shadow transition duration-200 bg-white mt-2">
      <Editor
        height="85vh"
        width={`100%`}
        language={language || "python"}
        value={value}
        theme={theme}
        defaultValue="// some comment"
        onChange={handleEditorChange}
      />
    </div>
  );
};
export default CodeEditorWindow;
