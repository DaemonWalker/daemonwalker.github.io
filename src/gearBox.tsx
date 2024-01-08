import { FC, useState } from "react";

interface GearBoxProps {
  index: number;
  types?: string[];
  onClick?: (idx: number, type: number) => void;
  text?: string;
  color?: string;
}
export const GearBox: FC<GearBoxProps> = ({
  index,
  types,
  onClick,
  text,
  color,
}) => {
  const [type, setType] = useState(0);
  return (
    <div
      onClick={() => {
        console.log("onCLick", !!onClick, index, types);
        if (onClick && types) {
          const newType = (type + types.length - 1) % types.length;
          onClick(index, newType);
          setType(newType);
        }
      }}
      style={{
        border: "solid 1px black",
        background: types ? types[type] : color,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {text}
    </div>
  );
};
