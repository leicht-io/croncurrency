const cron = require('node-cron');
const request = require('request');
import { Observable } from 'rxjs';
export class CronCurrency {
    constructor() {
        this.baseUrl = 'https://api.exchangeratesapi.io/latest?base=';
        this.currencies = [];
        this.baseCurrency = 'EUR';
        this.cron = null;
    }
    with(currencies) {
        this.currencies = currencies;
        return this;
    }
    base(currency) {
        this.baseCurrency = currency;
        return this;
    }
    every(cron) {
        if (cron.split(' ').length !== 5) {
            throw Error('Cron not correct');
        }
        this.cron = cron;
        return this;
    }
    subscribe(onNext, onError) {
        return new Observable(subscriber => {
            if (this.cron === null) {
                this.request((body) => {
                    subscriber.next(body);
                });
            }
            else {
                cron.schedule(this.cron, () => {
                    this.request((body) => {
                        subscriber.next(body);
                    });
                });
            }
        }).subscribe(data => {
            onNext(data);
        }, error => {
            onError && onError(error);
        });
    }
    request(callback) {
        return request(this.baseUrl + this.baseCurrency + '&symbols=' + this.currencies.join(','), { json: true }, (err, res, body) => {
            if (err) {
                throw Error(err);
            }
            callback(body);
        });
    }
}
//# sourceMappingURL=CronCurrency.js.map