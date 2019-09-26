# CronCurrency
Node.js Wrapper around https://exchangeratesapi.io/ which ***is a free service for current and historical foreign exchange rates
published by the European Central Bank.***

This library makes it possible to get the values a single time via an Observable or infinite times using node-cron.

### Install
```bash
npm install @leicht/croncurrency@0.0.1
```

### Run Demo
```bash
npm run development
```

### Build
```bash
npm run production
```

### Usage
```typescript
import {CronCurrency} from "../src/CronCurrency";
```

#### GET
```typescript
import {CronCurrency} from "../src/CronCurrency";

new CronCurrency()
  .base('DKK')
  .with(['EUR', 'GBP', 'USD'])
  .every("* * * * *") // Every minute. Remote this line to make a single request.
  .subscribe(data => {
      console.log('data', data);
      // TODO: Save e.g. in DB
});
```
