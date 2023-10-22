export interface ILeague {
  id: string;
  name: string;
  type: string;
  logo: string;
  season: string;
  rounds: string[];
  numberOfRounds: number;
  countryId: string | null;
}
