import { Swords, Trophy, UserCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Menu() {
  return (
    <aside className="w-60 p-2 fixed mt-24 h-full bg-gray-500">
      <Link
        className="flex p-2 justify-center mb-2 bg-transparent hover:bg-gray-400 text-white"
        to="/"
      >
        <Swords className="mx-3" />
        Jogos
      </Link>

      <Link
        className="flex p-2 justify-center mb-2 bg-transparent hover:bg-gray-400 text-white"
        to="/leagues"
      >
        <Trophy className="mx-3" />
        <p>Ligas</p>
      </Link>

      <Link
        className="flex p-2 justify-center mb-2 bg-transparent hover:bg-gray-400 text-white"
        to="/teams"
      >
        <UserCheck className="mx-3" />
        Times
      </Link>
    </aside>
  );
}
