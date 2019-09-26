import { Currency } from './Currency';
export interface CurrencyResponse {
    rates: Currency;
    base: string;
    date: string;
}
