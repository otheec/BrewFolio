import { Beer } from "./Beer";
import { BreweryStatus } from "./BreweryStatus";
import { BreweryType } from "./BreweryType";

export interface Brewery {
    id: number;
    name: string;
    longName: string;
    type: BreweryType;
    status: BreweryStatus;
    visited: boolean;
    beers: Beer[];
}
