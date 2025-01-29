import { makeAutoObservable, runInAction } from "mobx";
import { toJS } from "mobx";
const url = "https://app.youhodler.com/api/v3/rates/extended";
class RatesStore {
    rates = {};
    isLoading = false;
    error = null;
    details = {};
    constructor() {
        makeAutoObservable(this);
    }
    handleError(error) {
        runInAction(() => {
            if (error instanceof Error) {
                this.error = error.message;
            }
            else {
                this.error = "Произошла неизвестная ошибка";
            }
            this.isLoading = false;
        });
    }
    finishLoading() {
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
            const data = await response.json();
            runInAction(() => {
                this.rates = data;
                this.finishLoading();
            });
        }
        catch (error) {
            this.handleError(error);
        }
    }
    async getDetails(currency) {
        this.isLoading = true;
        this.error = null;
        this.details = {};
        try {
            if (!this.rates && Object.keys(this.rates).length === 0)
                return;
            runInAction(() => {
                this.details = this.rates[currency];
                this.finishLoading();
                console.log(toJS(this.details));
            });
        }
        catch (error) {
            this.handleError(error);
        }
    }
}
export const ratesStore = new RatesStore();
