import { useState } from "react";
import "./App.css";

const App = () => {
  const [input, setInput] = useState("t g86");
  const [chineseOutput, setChineseOutput] = useState("");

  const handleConvert = async () => {
    const segments = input.split(/(?<=[346])\s*|\s+/);
    const chineseResults = [];

    for (const segment of segments) {
      if (segment.trim() !== "") {
        // Only call API for non-empty segments
        const response = await fetch(
          `https://inputtools.google.com/request?text=${encodeURIComponent(
            segment + "="
          )}&itc=zh-hant-t-i0-und&num=1&cp=0&cs=1&ie=utf-8&oe=utf-8&app=demopage`
        );

        if (response.ok) {
          const data = await response.json();
          if (data[1] && data[1][0] && data[1][0][1]) {
            chineseResults.push(data[1][0][1][0]);
          } else {
            chineseResults.push("無法匹配");
          }
        } else {
          chineseResults.push("API 錯誤");
        }
      }
    }

    setChineseOutput(chineseResults.join(""));
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleConvert();
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>鴻哥翻譯機</h1>
      <label>
        請輸入鴻哥語:
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          style={{ margin: "10px 0", padding: "5px", width: "100%" }}
        />
      </label>
      <button onClick={handleConvert} style={{ marginRight: "10px" }}>
        go
      </button>
      <p>轉換的繁體中文：「{chineseOutput}」</p>
    </div>
  );
};

export default App;
