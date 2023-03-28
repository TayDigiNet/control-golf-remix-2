import React from "react";
import { HoleSelect, IMatch } from "../../typings";
import useGolf from "../hooks/useGolf";

const HoleCard = ({ match }: { match: IMatch }) => {
  const { holes, selectHole, setSelectHole } = useGolf();
  const hole1 = holes[match.course_0];
  const hole2 = holes[match.course_1];
  let listHole: HoleSelect[] = [];
  hole1.forEach((h, idx) => {
    listHole.push({
      name: `${idx + 1}-${match.course_0}`,
      pair: h,
    });
  });
  hole2.forEach((h, idx) => {
    listHole.push({
      name: `${idx + 1}-${match.course_1}`,
      pair: h,
    });
  });
  return (
    <div className="flex items-center gap-3 flex-nowrap overflow-x-auto">
      {listHole.map((h) => (
        <div
          onClick={() => setSelectHole(h)}
          key={h.name}
          className={`border ${
            selectHole?.name === h.name && selectHole.pair === h.pair
              ? "border-blue-800"
              : "border-transparent"
          } min-w-[5rem] rounded-md bg-lime-200 shadow p-3 cursor-pointer`}
        >
          <h5 className="text-lg text-center font-bold">{h.name}</h5>
          <div className="text-sm">
            <span className="italic font-semibold">Pair:</span> {h.pair}
          </div>
        </div>
      ))}
    </div>
  );
};

export default HoleCard;
