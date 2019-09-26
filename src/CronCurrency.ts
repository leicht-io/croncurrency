const cron = require('node-cron');
const request = require('request');

import { Observable } from 'rxjs';
import { Currency } from './Currency';
import { CurrencyResponse } from './CurrencyResponse';

export class CronCurrency {
    private baseUrl: string = 'https://api.exchangeratesapi.io/latest?base=';
    private currencies: Currency[] = [];
    private baseCurrency: Currency = 'EUR';
    private cron: string | null = null;

    public with(currencies: Currency[]): CronCurrency {
        this.currencies = currencies;

        return this;
    }

    public base(currency: Currency): CronCurrency {
        this.baseCurrency = currency;

        return this;
    }

    public every(cron: string): CronCurrency {
        if (cron.split(' ').length !== 5) {
            throw Error('Cron not correct');
        }

        this.cron = cron;

        return this;
    }

    public subscribe(onNext: (value: CurrencyResponse) => void, onError?: (exception: any) => void): any {
        return new Observable(subscriber => {
            if (this.cron === null) {
                this.request((body: CurrencyResponse) => {
                    subscriber.next(body);
                });
            } else {
                cron.schedule(this.cron, () => {
                    this.request((body: CurrencyResponse) => {
                        subscriber.next(body);
                    });
                });
            }
        }).subscribe(data => {
            onNext(data as CurrencyResponse);
        }, error => {
            onError && onError(error);
        });
    }

    private request(callback: (currencyResponse: CurrencyResponse) => void): any {
        return request(this.baseUrl + this.baseCurrency + '&symbols=' + this.currencies.join(','), {json: true}, (err, res, body) => {
            if (err) {
                throw Error(err);
            }

            callback(body);
        });
    }
}
