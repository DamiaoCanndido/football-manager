import { ITeam } from './team';

export interface IGame {
  id: string;
  fullTime: boolean;
  startDate: string;
  round: string | null;
  leagueId: string | null;
  homeId: string;
  awayId: string;
  homeScore: number | null;
  awayScore: number | null;
  homePenalty: number | null;
  awayPenalty: number | null;
  home: ITeam;
  away: ITeam;
  league: {
    name: string;
  } | null;
}
