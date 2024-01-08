import { FC, useEffect, useState } from "react";
import { GearBox } from "./gearBox";

const w = [0, 1, 2, 3, 4, 5];
const h = [0, 1, 2, 3, 4, 5, 6];
const wl = w.length;

export const Board: FC = () => {
  const [board, setBoard] = useState(h.map(() => w.map(() => 0)));
  useEffect(() => {
    localStorage.setItem("board", JSON.stringify(board));
  }, [board]);
  const onClick = (index: number, type: number) => {
    board[Math.floor(index / wl)][index % wl] = type;
    setBoard([...board]);
  };

  return (
    <div
      style={{
        display: "grid",
        gap: "7px 7px",
        gridTemplateColumns: w.map(() => "auto").join(" "),
        gridTemplateRows: h.map(() => "auto").join(" "),
        border: "black 2px solid",
        padding: 7,
      }}
      className="board"
    >
      {h.map((i) =>
        w.map((j) => (
          <GearBox
            key={i * wl + j}
            index={i * wl + j}
            onClick={onClick}
            types={["", "black", "grey"]}
          ></GearBox>
        ))
      )}
    </div>
  );
};
