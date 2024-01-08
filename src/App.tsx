import { useState } from "react";
import "./App.css";
import { TargetGroup } from "./target";
import { Board } from "./board";
import { check } from "./core";
import { ResultBoard } from "./resultBoard";
import "./board.css";

function App() {
  const [gearCount, setGearCount] = useState(8);
  const [result, setResult] = useState<number[][]>();
  const [count, setCount] = useState(0);
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        gap: 10,
        flexWrap: "wrap",
      }}
    >
      <div
        style={{ display: "flex", flexDirection: "column", gap: 10, flex: 1 }}
      >
        <div style={{ display: "flex" }}>
          <div style={{ marginRight: 5 }}>
            <label>总齿轮数</label>
          </div>
          <input
            type="number"
            value={gearCount}
            onChange={(e) => setGearCount(parseInt(e.target.value))}
          ></input>
        </div>
        <div>
          <TargetGroup />
        </div>
        <div>
          <Board />
        </div>
        <div style={{ gap: 10, display: "flex" }}>
          <input
            type="button"
            value="start"
            onClick={() => {
              const targets = JSON.parse(localStorage.getItem("targets")!);
              const result = check(
                gearCount,
                Object.entries(targets).map((v) => v[1] as number[][]),
                JSON.parse(localStorage.getItem("board")!) as number[][]
              );
              console.log("result", result);
              setCount(result.resultCount);
              setResult(result.results);
            }}
            style={{ width: 100, height: 40 }}
          />
        </div>
      </div>
      <div
        style={{ display: "flex", flexDirection: "column", gap: 10, flex: 1 }}
      >
        <label>{`图案可行方案总数：${count}`}</label>
        <ResultBoard count={count} board={result}></ResultBoard>
      </div>
    </div>
  );
}

export default App;
