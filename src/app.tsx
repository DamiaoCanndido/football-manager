import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Games } from './pages/games';
import { Leagues } from './pages/leagues';
import { Teams } from './pages/teams';

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" Component={Games} />
        <Route path="/leagues" Component={Leagues} />
        <Route path="/teams" Component={Teams} />
      </Routes>
    </BrowserRouter>
  );
}
