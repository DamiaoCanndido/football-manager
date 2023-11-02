import { DateFormatter } from '@/helpers/date-formatter';
import { ITeam } from '@/interfaces/team';

interface IGameProps {
  items: {
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
  };
  showScoreModal: () => void;
  getGame: () => void;
}

export function GameCard({ items, showScoreModal, getGame }: IGameProps) {
  return (
    <div
      onClick={() => {
        getGame();
        showScoreModal();
      }}
      className="flex flex-col h-40 w-96 mx-2 mb-2 border rounded-xl border-black hover:bg-gray-200 cursor-pointer"
    >
      <div className="flex flex-1 items-center justify-center">
        {items.league
          ? `${items.league.name} • Rodada ${items.round}`
          : 'Amistoso'}
      </div>
      <div className="flex items-center justify-center flex-2">
        <div className="mx-1">
          <img className="flex w-16" src={items.home.logo} alt="" />
        </div>
        <div className="flex flex-col items-center">
          <p className="text-xl">
            {items.homeScore} - {items.awayScore}
          </p>
          {items.homePenalty && items.awayPenalty ? (
            <p className="text-sm">
              ({items.homePenalty}) : ({items.awayPenalty})
            </p>
          ) : (
            <></>
          )}
        </div>
        <div className="mx-1">
          <img className="flex w-16" src={items.away.logo} alt="" />
        </div>
      </div>
      <div className="flex justify-center">
        <div className="flex flex-1 justify-end mx-1">{items.home.name}</div>
        <p>-</p>
        <div className="flex flex-1 mx-1">{items.away.name}</div>
      </div>
      <div className="flex items-center justify-center flex-1">
        {DateFormatter(items.startDate)}
      </div>
    </div>
  );
}
