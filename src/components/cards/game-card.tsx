import { ITeam } from '../../pages/teams';

interface IGame {
  items: {
    id: string;
    fullTime: boolean;
    startDate: string;
    round: string;
    leagueId: string;
    homeId: string;
    awayId: string;
    homeScore: number | null;
    awayScore: number | null;
    homePenalty: number | null;
    awayPenalty: number | null;
    home: ITeam;
    away: ITeam;
  };
}

export function GameCard({ items }: IGame) {
  return (
    <div className="flex justify-center items-center h-32 w-1/2 mx-2 mb-2 flex-col rounded-lg bg-gray-500"></div>
  );
}
