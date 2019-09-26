"use strict";
exports.__esModule = true;
var cron = require('node-cron');
var request = require('request');
var rxjs_1 = require("rxjs");
var CronCurrency = /** @class */ (function () {
    function CronCurrency() {
        this.baseUrl = 'https://api.exchangeratesapi.io/latest?base=';
        this.currencies = [];
        this.baseCurrency = 'EUR';
        this.cron = null;
    }
    CronCurrency.prototype["with"] = function (currencies) {
        this.currencies = currencies;
        return this;
    };
    CronCurrency.prototype.base = function (currency) {
        this.baseCurrency = currency;
        return this;
    };
    CronCurrency.prototype.every = function (cron) {
        if (cron.split(' ').length !== 5) {
            throw Error('Cron not correct');
        }
        this.cron = cron;
        return this;
    };
    CronCurrency.prototype.subscribe = function (onNext, onError) {
        var _this = this;
        return new rxjs_1.Observable(function (subscriber) {
            if (_this.cron === null) {
                _this.request(function (body) {
                    subscriber.next(body);
                });
            }
            else {
                cron.schedule(_this.cron, function () {
                    _this.request(function (body) {
                        subscriber.next(body);
                    });
                });
            }
        }).subscribe(function (data) {
            onNext(data);
        }, function (error) {
            onError && onError(error);
        });
    };
    CronCurrency.prototype.request = function (callback) {
        return request(this.baseUrl + this.baseCurrency + '&symbols=' + this.currencies.join(','), { json: true }, function (err, res, body) {
            if (err) {
                throw Error(err);
            }
            callback(body);
        });
    };
    return CronCurrency;
}());
exports.CronCurrency = CronCurrency;
