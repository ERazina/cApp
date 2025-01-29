import { makeAutoObservable, runInAction } from "mobx";
import { Rates, DetailsRate } from "./types";
import { toJS } from "mobx";

const url = "https://app.youhodler.com/api/v3/rates/extended";

class RatesStore {
  rates: Rates = {};
  isLoading: boolean = false;
  error: string | null = null;
  details: DetailsRate = {};

  constructor() {
    makeAutoObservable(this);
  }

  private handleError(error: unknown) {
    runInAction(() => {
      if (error instanceof Error) {
        this.error = error.message;
      } else {
        this.error = "Произошла неизвестная ошибка";
      }
      this.isLoading = false;
    });
  }

  private finishLoading() {
    runInAction(() => {
      this.isLoading = false;
    });
  }

  async fetchRates() {
    this.isLoading = true;
    this.error = null;

    try {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`Failed to fetch rates: ${response.status}`);
      }

      const data: Rates = await response.json();

      runInAction(() => {
        this.rates = data;
        this.finishLoading();
      });
    } catch (error: unknown) {
      this.handleError(error);
    }
  }

  async getDetails(currency: string) {
    this.isLoading = true;
    this.error = null;
    this.details = {};

    try {
      if (!this.rates && Object.keys(this.rates).length === 0) return;

      runInAction(() => {
        this.details = this.rates[currency];
        this.finishLoading();
        console.log(toJS(this.details));
      });
    } catch (error: unknown) {
      this.handleError(error);
    }
  }
}

export const ratesStore = new RatesStore();
