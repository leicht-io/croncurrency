import { Currency } from './Currency';
import { CurrencyResponse } from './CurrencyResponse';
export declare class CronCurrency {
    private baseUrl;
    private currencies;
    private baseCurrency;
    private cron;
    with(currencies: Currency[]): CronCurrency;
    base(currency: Currency): CronCurrency;
    every(cron: string): CronCurrency;
    subscribe(onNext: (value: CurrencyResponse) => void, onError?: (exception: any) => void): any;
    private request;
}
