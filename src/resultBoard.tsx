import { FC } from "react";
import { GearBox } from "./gearBox";

const w = [0, 1, 2, 3, 4, 5];
const h = [0, 1, 2, 3, 4, 5, 6];
const wl = w.length;

interface ResultBoardProp {
  board?: number[][];
  count: number;
}

const getColor = (current: number, total: number): string | undefined => {
  const per = current / total;
  if (per >= 0.6) {
    return "red";
  } else if (per >= 0.3) {
    return "yellow";
  } else if (per === 0) {
    return "grey";
  }
  return undefined;
};

export const ResultBoard: FC<ResultBoardProp> = ({ board, count }) => {
  if (!board) {
    return <></>;
  }
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
      {board.map((row, i) =>
        row.map((item, j) => (
          <GearBox
            key={i * wl + j}
            index={0}
            color={getColor(item, count)}
            text={`${item}`}
          ></GearBox>
        ))
      )}
    </div>
  );
};
