export interface IHoleScore {
  hole_index: number;
  score: 0 | -1 | 1;
  _id: string;
}

export type Group = "1" | "A" | "B" | "C" | "D";
export type Course = "A" | "B" | "C" | "D";
export interface IMatch {
  _id: string;
  name: string;
  sex: boolean;
  day: 1 | 2;
  group: Group;
  start_hole: number;
  course_0: Course;
  course_1: Course;
  team_0: string;
  golfer_0_a: string;
  golfer_0_b: string;
  team_1: string;
  golfer_1_a: string;
  golfer_1_b: string;
}

export interface ITeam {
  _id: string;
  name: string;
  logo: string;
  color: string;
  score: number;
}

export interface IHole {
  [key: string]: number[];
}

export interface HoleSelect {
  name: string;
  pair: number;
}

export interface ISaveInput {
  match: IMatch;
  team: ITeam;
  golferSelect: string;
  hole: HoleSelect;
  score: number;
  team_0_logo: string;
  team_1_logo: string;
}
