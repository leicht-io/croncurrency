import {CronCurrency} from "../src/CronCurrency";

new CronCurrency()
    .base('DKK')
    .with(['EUR', 'GBP', 'USD'])
    .every("* * * * *")
    .subscribe(data => {
        console.log('data', data);
        // TODO: Save e.g. in DB
    });

