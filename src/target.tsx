import { FC, useEffect, useState } from "react";
import { GearBox } from "./gearBox";

const arr = [0, 1, 2, 3, 4, 5, 6, 7, 8];
const saveKey = "targets";

interface TargetProp {
  targetIndex: number;
  types: string[];
  onClick: (index: number, noCheck: boolean) => void;
}

const Target: FC<TargetProp> = ({ targetIndex, types, onClick }) => {
  const [selected, setSelected] = useState([
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
  ]);
  const onBoxClick = (index: number, check: number) => {
    const temp = [...selected];
    temp[Math.floor(index / 3)][index % 3] = check;
    setSelected(temp);

    const save = JSON.parse(localStorage.getItem(saveKey)!);
    save[targetIndex] = temp;
    localStorage.setItem(saveKey, JSON.stringify(save));
    onClick(
      targetIndex,
      temp.every((p) => p.every((q) => !q))
    );
  };
  return (
    <div
      style={{
        display: "grid",
        gap: "7px 7px",
        gridTemplateColumns: "auto auto auto",
        gridTemplateRows: "auto auto auto",
        border: "black 2px solid",
        padding: 7,
        width: 150,
        height: 150,
      }}
    >
      {arr.map((item) => (
        <GearBox
          key={item}
          index={item}
          onClick={onBoxClick}
          types={types}
        ></GearBox>
      ))}
    </div>
  );
};

export const TargetGroup: FC = () => {
  useEffect(() => {
    localStorage.setItem(saveKey, JSON.stringify({}));
  }, []);
  const [targets, setTargets] = useState([new Date().valueOf()]);
  const onChange = (i: number, noCheck: boolean) => {
    if (noCheck && targets.length > 1) {
      const temp = [...targets];
      temp.splice(temp.indexOf(i), 1);
      setTargets(temp);

      const save = JSON.parse("{}");
      Object.entries(JSON.parse(localStorage.getItem(saveKey)!))
        .filter((p) => p[0] !== i.toString())
        .forEach((p) => (save[p[0]] = p[1]));
      localStorage.setItem(saveKey, JSON.stringify(save));
    } else {
      if (targets.indexOf(i) === targets.length - 1) {
        setTargets([...targets, new Date().valueOf()]);
      }
    }
  };
  return (
    <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
      {targets.map((i) => (
        <Target
          key={i}
          targetIndex={i}
          onClick={onChange}
          types={["", "black"]}
        ></Target>
      ))}
    </div>
  );
};
