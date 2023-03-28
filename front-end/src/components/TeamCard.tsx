import React from "react";
import { IMatch, ITeam } from "../../typings";
import useGolf from "../hooks/useGolf";

const TeamCard = ({ match }: { match: IMatch }) => {
  const { selectTeam, selectGolfer, teams, setSelectTeam, setSelectGolfer } =
    useGolf();
  const getTeam = (teamId: string) => teams.find((team) => team._id === teamId);

  const golfer1 = match.golfer_0_a;
  const golfer2 = match.golfer_0_b ? match.golfer_0_b : undefined;
  const golfer3 = match.golfer_1_a;
  const golfer4 = match.golfer_1_b ? match.golfer_1_b : undefined;

  const selectTeamHandle = (teamId: string) => {
    const team = getTeam(teamId);
    setSelectTeam(team as ITeam);
  };
  return (
    <div className="flex flex-col md:flex-row gap-3">
      <div
        onClick={() => selectTeamHandle(match.team_0)}
        className={`border ${
          selectTeam?._id === match.team_0
            ? "border-blue-800"
            : "border-transparent"
        } flex-1 rounded-lg bg-red-200 p-6 cursor-pointer`}
      >
        <h4 className="text-center text-xl font-bold mb-6">
          Đội {getTeam(match.team_0)?.name}
        </h4>
        <ul>
          <li>
            <div
              onClick={() => setSelectGolfer(golfer1)}
              className={`border ${
                golfer1 === selectGolfer
                  ? "border-blue-800"
                  : "border-transparent"
              } flex items-center gap-3 mb-4 bg-slate-100 p-3 rounded-md`}
            >
              {/* <img src={golfer1?.avatar} alt="" className="w-14 h-14 rounded" /> */}
              <span>{golfer1}</span>
            </div>
          </li>
          {golfer2 && (
            <li>
              <div
                onClick={() => setSelectGolfer(golfer2)}
                className={`border ${
                  golfer2 === selectGolfer
                    ? "border-blue-800"
                    : "border-transparent"
                } flex items-center gap-3 mb-4 bg-slate-100 p-3 rounded-md`}
              >
                {/* <img
                  src={golfer2?.avatar}
                  alt=""
                  className="w-14 h-14 rounded"
                /> */}
                <span>{golfer2}</span>
              </div>
            </li>
          )}
        </ul>
      </div>
      <div
        onClick={() => selectTeamHandle(match.team_1)}
        className={`border ${
          selectTeam?._id === match.team_1
            ? "border-blue-800"
            : "border-transparent"
        } flex-1 rounded-lg bg-blue-200 p-6 cursor-pointer`}
      >
        <h4 className="text-center text-xl font-bold mb-6">
          Đội {getTeam(match.team_1)?.name}
        </h4>
        <ul>
          <li>
            <div
              onClick={() => setSelectGolfer(golfer3)}
              className={`border ${
                golfer3 === selectGolfer
                  ? "border-blue-800"
                  : "border-transparent"
              } flex items-center gap-3 mb-4 bg-slate-100 p-3 rounded-md`}
            >
              {/* <img src={golfer3?.avatar} alt="" className="w-14 h-14 rounded" /> */}
              <span>{golfer3}</span>
            </div>
          </li>
          {golfer4 && (
            <li>
              <div
                onClick={() => setSelectGolfer(golfer4)}
                className={`border ${
                  golfer4 === selectGolfer
                    ? "border-blue-800"
                    : "border-transparent"
                } flex items-center gap-3 mb-4 bg-slate-100 p-3 rounded-md`}
              >
                {/* <img src={golfer4} alt="" className="w-14 h-14 rounded" /> */}
                <span>{golfer4}</span>
              </div>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default TeamCard;
