import React from "react";
import { IMatch } from "../../typings";
import useGolf from "../hooks/useGolf";

const MatchCard = ({ match }: { match: IMatch }) => {
  const { selectMatch, setSelectMatch } = useGolf();
  return (
    <div
      onClick={() => setSelectMatch(match)}
      className={`border ${
        selectMatch?._id === match._id
          ? "border-blue-800"
          : "border-transparent"
      } p-6 min-w-[12rem] bg-slate-200 rounded-md shadow-sm cursor-pointer active:scale-95 transition select-none`}
    >
      <h4 className="text-xl font-bold w-full text-center">{match.name}</h4>
      <div className="text-sm">
        <span className="font-bold italic">Day</span>: {match.day}
      </div>
      <div className="text-sm">
        <span className="font-bold italic">Group</span>: {match.group}
      </div>
    </div>
  );
};

export default MatchCard;
