interface ILeague {
  items: {
    id: string;
    name: string;
    type: string;
    logo: string;
    season: string;
    rounds: string[];
    numberOfRounds: number;
    countryId: string | null;
  };
}

export function LeagueCard({ items }: ILeague) {
  return (
    <div className="flex h-80 w-64 mx-2 mb-2 flex-col rounded-lg">
      <div className="bg-gray-300 p-2 flex justify-center items-center">
        <div className="bg-white rounded-full h-56 w-56 flex justify-center items-center">
          <img className="h-32 p-4" src={items.logo} alt="" />
        </div>
      </div>
      <div className="bg-gray-200 h-16 w-64 flex justify-center items-center">
        <p className="text-xl">{items.name}</p>
      </div>
    </div>
  );
}
