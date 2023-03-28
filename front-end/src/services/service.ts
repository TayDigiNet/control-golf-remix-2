import { IHole, IMatch, ISaveInput, ITeam } from "./../../typings.d";
export const SERVER_API =
  process.env.REACT_APP_SERVER_API || "http://localhost:3000";

export const fetcher = async (url: string, option?: RequestInit) => {
  let response;
  if (option) {
    response = await fetch(url, {
      ...option,
    });
  } else {
    response = await fetch(url);
  }
  return await response.json();
};

export const getMatches = (): Promise<IMatch[]> => {
  return fetcher(`${SERVER_API}/api/public/matches`);
};

export const getTeams = (): Promise<ITeam[]> => {
  return fetcher(`${SERVER_API}/api/public/teams`);
};

export const getHoles = (): Promise<IHole> => {
  return fetcher(`${SERVER_API}/api/public/holes`);
};

export const getScore = (key: string): Promise<{ score: number }> => {
  return fetcher(`/get-score?key=${key}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const saveChange = (data: ISaveInput) => {
  return fetcher(`/update-score`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
};
