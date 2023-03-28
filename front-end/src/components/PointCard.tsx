import React from "react";
import { IMatch } from "../../typings";
import useGolf from "../hooks/useGolf";

const PointCard = ({ match }: { match: IMatch }) => {
  const { score, setScore } = useGolf();
  return (
    <div className="flex gap-2 flex-wrap">
      {[
        1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
      ].map((point) => (
        <div
          key={point}
          onClick={() => setScore(point)}
          className={`${
            score < point ? "bg-gray-200" : "bg-blue-400"
          } w-14 h-14 rounded-md  flex items-center justify-center font-bold text-lg cursor-pointer transition active:scale-95`}
        >
          {point}
        </div>
      ))}
    </div>
  );
};

export default PointCard;
