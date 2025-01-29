export interface Rate {
  rate: number;
  ask: number;
  bid: number;
  diff24h: number;
}

export interface Rates {
  [currency: string]: {
    [asset: string]: Rate;
  };
}

export interface DetailsRate {
  [currency: string]: Rate;
}
