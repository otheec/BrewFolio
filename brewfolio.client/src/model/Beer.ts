import { Brewery } from "./Brewery";

export interface Beer {
  id: number;
  name: string;
  brewery: Brewery;
}