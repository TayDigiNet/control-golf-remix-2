import React from "react";
import useGolf from "../hooks/useGolf";
import HoleCard from "./HoleCard";
import MatchCard from "./MatchCard";
import PointCard from "./PointCard";
import TeamCard from "./TeamCard";

const Controller = () => {
  const {
    matches,
    isLoading,
    isError,
    teams,
    refetchMatches,
    selectMatch,
    save,
  } = useGolf();
  const [search, setSearch] = React.useState<string>("");
  const getSearchableStr = (s: string): string => {
    if (!s) {
      return "";
    }
    return s
      .toLowerCase()
      .replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/gi, "a")
      .replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/gi, "e")
      .replace(/ì|í|ị|ỉ|ĩ/i, "ig")
      .replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/gi, "o")
      .replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/gi, "u")
      .replace(/ỳ|ý|ỵ|ỷ|ỹ/gi, "y")
      .replace(/đ/gi, "d")
      .trim()
      .replace(/\W/g, "");
  };
  const rowVisible = (match: { [key: string]: any }): boolean => {
    if (!search) {
      return true;
    }
    let searchCvt = getSearchableStr(search);

    return (
      getSearchableStr(match["name"]).indexOf(searchCvt) > -1 ||
      getSearchableStr(match["golfer_0_a"]).indexOf(searchCvt) > -1 ||
      getSearchableStr(match["golfer_0_b"]).indexOf(searchCvt) > -1 ||
      getSearchableStr(match["golfer_1_a"]).indexOf(searchCvt) > -1 ||
      getSearchableStr(match["golfer_1_b"]).indexOf(searchCvt) > -1 ||
      (!!teams[match["team_0"]] &&
        getSearchableStr(teams[match["team_0"]]["name"]).indexOf(searchCvt) >
          -1) ||
      (!!teams[match["team_1"]] &&
        getSearchableStr(teams[match["team_1"]]["name"]).indexOf(searchCvt) >
          -1)
    );
  };

  return (
    <div className="bg-slate-50 min-h-screen p-6">
      <h1 className="text-center font-bold text-4xl py-12">Control Golf</h1>

      <div className="p-6 rounded-lg shadow-md bg-white mb-3">
        <h3 className="font-semibold text-2xl mb-3">Chọn Trận đấu</h3>
        <div className="flex items-center rounded-sm border border-gray-300 h-10 px-1 mb-3">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Tìm kiếm mọi thứ"
            className="border-none outline-none rounded-sm flex-1"
          />
          <div
            onClick={() => setSearch("")}
            className="w-6 h-6 rounded-full flex items-center justify-center cursor-pointer bg-red-500 text-white"
          >
            X
          </div>
        </div>
        <div className="flex items-center flex-nowrap overflow-x-auto gap-3">
          {isLoading ? <>Loading...</> : null}
          {isError ? (
            <div className="text-red-600">
              Error on loading, <span onClick={refetchMatches}>Try again</span>
            </div>
          ) : null}
          {matches
            .filter((m) => rowVisible(m))
            .map((match) => (
              <MatchCard key={match._id} match={match} />
            ))}
        </div>
      </div>

      <div className="p-6 rounded-lg shadow-md bg-white mb-3">
        <h3 className="font-semibold text-2xl mb-3">Chọn Đội</h3>
        {selectMatch && <TeamCard match={selectMatch} />}
      </div>

      <div className="p-6 rounded-lg shadow-md bg-white mb-3">
        <h3 className="font-semibold text-2xl mb-3">Chọn Hole</h3>
        {selectMatch && <HoleCard match={selectMatch} />}
      </div>

      <div className="p-6 rounded-lg shadow-md bg-white mb-3">
        <h3 className="font-semibold text-2xl mb-3">Chọn Điểm đánh</h3>
        {selectMatch && <PointCard match={selectMatch} />}
      </div>

      <div className="p-6 rounded-lg shadow-md bg-white mb-3 text-right">
        <button
          className="w-32 h-10 rounded-lg bg-blue-700 text-white font-bold text-lg"
          onClick={save}
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default Controller;
