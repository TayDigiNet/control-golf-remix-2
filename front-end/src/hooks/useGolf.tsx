import React from "react";
import { toast } from "react-hot-toast";
import { useMutation, useQuery } from "react-query";
import { HoleSelect, IHole, IMatch, ISaveInput, ITeam } from "../../typings";
import {
  getHoles,
  getMatches,
  getScore,
  getTeams,
  saveChange,
} from "../services/service";

interface IGolfContext {
  matches: IMatch[];
  selectMatch: IMatch | undefined;
  setSelectMatch: (match: IMatch) => void;
  selectTeam: ITeam | undefined;
  setSelectTeam: (team: ITeam) => void;
  selectHole: HoleSelect | undefined;
  setSelectHole: (team: HoleSelect) => void;
  selectGolfer: string | undefined;
  setSelectGolfer: (team: string | undefined) => void;
  score: number;
  setScore: (num: number) => void;
  isLoading: boolean;
  isError: boolean;
  refetchMatches: () => void;
  teams: ITeam[];
  holes: IHole;
  save: () => void;
}

const initValue: IGolfContext = {
  matches: [],
  selectMatch: undefined,
  setSelectMatch: (match: IMatch) => {},
  selectTeam: undefined,
  setSelectTeam: (team: ITeam) => {},
  selectHole: undefined,
  setSelectHole: (team: HoleSelect) => {},
  selectGolfer: undefined,
  setSelectGolfer: (team: string | undefined) => {},
  score: 0,
  setScore: (num: number) => {},
  isLoading: false,
  isError: false,
  refetchMatches: () => {},
  teams: [],
  holes: {},
  save: () => {},
};

export const GolfContext = React.createContext<IGolfContext>(initValue);

export const GolfProvider = ({ children }: { children: React.ReactNode }) => {
  const [matches, setMatches] = React.useState<IMatch[]>([]);
  const [teams, setTeams] = React.useState<ITeam[]>([]);
  const [holes, setHoles] = React.useState<IHole>({});
  const [selectMatch, setSelectMatch] = React.useState<IMatch>();
  const [selectTeam, setSelectTeam] = React.useState<ITeam>();
  const [selectHole, setSelectHole] = React.useState<HoleSelect>();
  const [selectGolfer, setSelectGolfer] = React.useState<string>();
  const [score, setScore] = React.useState<number>(0);
  const { mutate: saveMutate } = useMutation((data: ISaveInput) =>
    saveChange(data)
  );
  const { mutate: getScoreQuery } = useMutation(({ key }: { key: string }) =>
    getScore(key)
  );
  const { data, isLoading, isError, refetch } = useQuery(
    ["matches"],
    getMatches
  );
  const {
    data: teamsData,
    isLoading: teamsLoading,
    isError: teamsError,
  } = useQuery(["teams"], getTeams);
  const {
    data: holesData,
    isLoading: holesLoading,
    isError: holesError,
  } = useQuery(["holes"], getHoles);

  React.useEffect(() => {
    if (!isLoading && !isError) {
      setMatches(data || []);
    }
  }, [data, isError, isLoading]);
  React.useEffect(() => {
    if (!teamsLoading && !teamsError) {
      setTeams(teamsData || []);
    }
  }, [teamsData, teamsError, teamsLoading]);
  React.useEffect(() => {
    if (!holesLoading && !holesError) {
      setHoles(holesData || {});
    }
  }, [holesData, holesError, holesLoading]);

  React.useEffect(() => {
    if (
      selectMatch !== undefined &&
      selectGolfer !== undefined &&
      selectTeam !== undefined &&
      selectHole !== undefined
    ) {
      const key = `${selectMatch._id}_${selectTeam._id}_${selectGolfer}_${selectHole.name}_${selectHole.pair}`;
      getScoreQuery(
        { key: key },
        {
          onSuccess: (data) => {
            setScore(data.score);
          },
        }
      );
    }
  }, [selectMatch, selectGolfer, selectTeam, selectHole, getScoreQuery]);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const reset = () => {
    setSelectMatch(undefined);
    setSelectTeam(undefined);
    setSelectHole(undefined);
    setScore(0);
  };

  const save = () => {
    if (!selectMatch) {
      return toast("Chưa chọn trận đấu");
    }
    if (!selectTeam) {
      return toast("Chưa chọn đội đấu");
    }
    if (!selectGolfer) {
      return toast("Chưa vận động viên");
    }
    if (!selectHole) {
      return toast("Chưa chọn hố đấu");
    }
    let result: ISaveInput = {
      match: selectMatch as IMatch,
      hole: selectHole as HoleSelect,
      score: score,
      golferSelect: selectGolfer,
      team: selectTeam as ITeam,
    };
    saveMutate(
      {
        ...result,
      },
      {
        onSuccess: () => {
          toast.success("Save successful!");
        },
        onError: () => {
          toast.error("Network or system are error, please try again!");
        },
        // onSettled: () => {
        //   reset();
        // },
      }
    );
  };

  const values: IGolfContext = {
    matches: matches,
    selectMatch: selectMatch,
    setSelectMatch: setSelectMatch,
    selectTeam: selectTeam,
    setSelectTeam: setSelectTeam,
    selectHole,
    setSelectHole,
    selectGolfer,
    setSelectGolfer,
    score,
    setScore,
    isLoading: isLoading,
    isError: isError,
    refetchMatches: () => refetch(),
    teams: teams,
    holes: holes,
    save,
  };
  return <GolfContext.Provider value={values}>{children}</GolfContext.Provider>;
};

const useGolf = () => {
  const context = React.useContext(GolfContext);
  return context;
};

export default useGolf;
