# فروش تعهدی
موقعیت فروش تعهدی امکان معامله وکالتی را برای کاربران فراهم می‌کند.
استفاده از این ویژگی به منزله پذیرش [شروط، قوانین و ضوابط فروش تعهدی](https://nobitex.ir/position-terms/) در نوبیتکس است.

<aside class="notice">
این ویژگی در مرحله تست بتا قرار دارد.
</aside>

## مشاهده بازارهای فروش تعهدی

```shell
curl 'https://api.nobitex.ir/margin/markets/list' \
  -H "Authorization: Token yourTOKENhereHEX0000000000"
```

```plaintext
http GET https://api.nobitex.ir/margin/markets/list
```

> در صورت فراخوانی درست، پاسخ به این صورت خواهد بود:

```json
{
  "status": "ok", 
  "markets": {
    "BTCIRT": {
      "srcCurrency": "btc",
      "dstCurrency": "rls",
      "positionFeeRate": "0.001"
    },
    "BTCUSDT": {
      "srcCurrency": "btc",
      "dstCurrency": "usdt",
      "positionFeeRate": "0.001"
    },
    "DOGEIRT": {
      "srcCurrency": "doge",
      "dstCurrency": "rls",
      "positionFeeRate": "0.001"
    },
    "DOGEUSDT": {
      "srcCurrency": "doge",
      "dstCurrency": "usdt",
      "positionFeeRate": "0.001"
    }
  }
}
```

برای دریافت بازارهای پشتیبانی شده برای معاملات فروش تعهدی از این درخواست استفاده نمایید.

- **درخواست:**: `GET /margin/markets/list`
- **محدودیت فراخوانی:** ۳۰ درخواست در هر دقیقه


## مشاهده استخرهای مشارکت ارزی فعال

```shell
curl 'https://api.nobitex.ir/liquidity-pools/list' \
  -H "Authorization: Token yourTOKENhereHEX0000000000"
```

```plaintext
http GET https://api.nobitex.ir/liquidity-pools/list
```

> در صورت فراخوانی درست، پاسخ به این صورت خواهد بود:

```json
{
  "status": "ok", 
  "pools": {
    "btc": {
      "capacity": "30",
      "filledCapacity": "28.082343",
      "availableBalance": "15.879876"
    },
    "ltc": {
      "capacity": "160",
      "filledCapacity": "149.234",
      "availableBalance": "63.987"
    },
    "doge": {
      "capacity": "5000000",
      "filledCapacity": "5000000",
      "availableBalance": "120890.34"
    }
  }
}
```

استخرهای مشارکت موجودی مورد نیاز برای اعطای وکالت فروش تعهدی را تامین می‌کنند. ظرفیت مشارکت افراد در فروش تعهدی را موجودی استخرها تعیین می‌کنند. استخرها ممکن است در زمان‌هایی فعال و غیرفعال شوند. در استخرهای غیرفعال امکان ثبت سفارش فروش تعهدی وجود ندارد (اما بستن موقعیت همچنان میسر است).
برای دریافت ظرفیت استخرهای فعال از این درخواست استفاده نمایید.

- **درخواست:**: `GET /liquidity-pools/list`
- **محدودیت فراخوانی:** ۱۲ درخواست در هر دقیقه

### حالت‌های خطا
> در صورت وقوع خطا، پاسخ به این صورت خواهد بود:

```json
{
  "status": "failed",
  "code": "FeatureUnavailable",
  "message": "ShortSell feature is not activated for you"
}
```

| کد خطا             | توضیحات                                                   |
|--------------------|-----------------------------------------------------------|
| FeatureUnavailable | شما از کاربران مجاز به استفاده از امکانات آزمایشی نیستید. |


## انتقال پول به کیف‌پول فروش تعهدی

```shell
curl -X POST 'https://api.nobitex.ir/wallets/transfer' \
  -H "Authorization: Token yourTOKENhereHEX0000000000" \
  -H "content-type: application/json" \
  --data '{"currency": "rls", "amount": "2500000000", "src": "spot", "dst": "margin"}'
  
```

```plaintext
http POST https://api.nobitex.ir/liquidity-pools/list \
  currency=rls&amount=2500000000&src=spot&dst=margin
```

> در صورت فراخوانی درست، پاسخ به این صورت خواهد بود:

```json
{
  "status": "ok", 
  "srcWallet": {
    "id": 53456,
    "currency": "rls",
    "balance": "1870000000",
    "blockedBalance": "420000000",
    "activeBalance": "1450000000",
    "rialBalance": "1870000000",
    "rialBalanceSell": "1870000000",
    "depositAddress": null,
    "depositTag": null,
    "depositInfo": {
      "FIAT_MONEY": {
        "address": null,
        "tag": null
      }
    }
  },
  "dstWallet": {
    "id": 86459,
    "currency": "rls",
    "balance": "2500000000",
    "blockedBalance": "0",
    "activeBalance": "2500000000",
    "rialBalance": "2500000000",
    "rialBalanceSell": "2500000000"
  }
}
```

وجوه تضمین قبل از دریافت وکالت فروش تعهدی باید در کیف‌پول فروش تعهدی قرار گیرند.
برای انتقال موجودی میان دو کیف‌پول اسپات و فروش تعهدی از این درخواست استفاده نمایید.

- **درخواست:**: `POST /wallets/transfer`
- **محدودیت فراخوانی:** ۱۰ درخواست در هر دقیقه

### پارامترهای ورودی

| پارامتر  | نوع      | پیش‌فرض | توضیحات          | نمونه              |
|----------|----------|---------|------------------|--------------------|
| currency | string   | الزامی  | ارز وجه تضمین    | `rls` یا `usdt`    |
| amount   | monetary | الزامی  | مقدار انتقال     | `2500000000`       |
| src      | string   | الزامی  | نوع کیف‌پول مبدا | `spot` یا `margin` |
| dst      | string   | الزامی  | نوع کیف‌پول مقصد | `spot` یا `margin` |


### نکات و ملاحظات
1. نوع کیف‌پول مبدا و مقصد نباید یکسان باشد.
2. کیف‌پول فروش تعهدی ضمن اولین انتقال به آن ایجاد می‌شود.
پس از آن موجودی این کیف‌پول را می‌توان از طریق [لیست کیف‌پول‌ها](/#1ff004071d) مشاهده کرد.

### حالت‌های خطا

> در صورت عدم پذیرش درخواست، پاسخ به این صورت خواهد بود:

```json
{
  "status": "failed",
  "code": "ErrorCode",
  "message": "Human readable error message"
}
```

| کد خطا              | توضیحات                                                      |
|---------------------|--------------------------------------------------------------|
| FeatureUnavailable  | شما از کاربران مجاز به استفاده از امکانات آزمایشی نیستید.    |
| ParseError          | فرمت ورودی‌ها مطابق فرمت خواسته شده نیست.                    |
| InvalidAmount       | مقدار نامعتبر است.                                           |
| SameDestination     | مبدا و مقصد از یک نوع (هر دو اسپات یا هر دو فروش تعهدی) است. |
| WalletNotFound      | کیف‌پول فروش تعهدی برای ارزهای غیر از ریال و تتر وجود ندارد. |
| InsufficientBalance | مقدار انتقال از موجودی آزاد کیف‌پول مبدا بیشتر است.          |


## دریافت محدودیت کاربری در مقدار وکالت

```shell
curl 'https://api.nobitex.ir/margin/delegation-limit?currency=btc' \
  -H "Authorization: Token yourTOKENhereHEX0000000000" 
  
```

```plaintext
http GET https://api.nobitex.ir/margin/delegation-limit \
  currency=btc
```

> در صورت فراخوانی درست، پاسخ به این صورت خواهد بود:

```json
{
  "status": "ok",
  "limit": "0.039062"
}
```

برای دریافت سقف مقدار قابل استفاده در موقعیت فروش که متناسب با سطح کاربری است، از این درخواست استفاده کنید.

- **درخواست:**: `GET /margin/delegation-limit`
- **محدودیت فراخوانی:** ۱۲ درخواست در هر دقیقه


### پارامترهای ورودی

| پارامتر  | نوع      | پیش‌فرض | توضیحات                                            | نمونه         |
|----------|----------|---------|----------------------------------------------------|---------------|
| currency | string   | الزامی  | رمزارز درخواستی برای اخذ وکالت (رمزارز مبدا بازار) | `btc` یا ...  |

### حالت‌های خطا

> در صورت عدم پذیرش درخواست، پاسخ به این صورت خواهد بود:

```json
{
  "status": "failed",
  "code": "ErrorCode",
  "message": "Human readable error message"
}
```

| کد خطا               | توضیحات                                                   |
|----------------------|-----------------------------------------------------------|
| FeatureUnavailable   | شما از کاربران مجاز به استفاده از امکانات آزمایشی نیستید. |
| ParseError           | فرمت ورودی‌ها مطابق فرمت خواسته شده نیست.                 |
| TradeLimitation      | کاربر سطح احراز کافی (حداقل سطح ۱) ندارد.                 |
| UnsupportedMarginSrc | رمزارز مبدا برای معاملات فروش تعهدی پشتیبانی نمی‌شود.     |
| MarginClosed         | امکان فروش تعهدی بسته شده یا باز نشده است.                |


## درج سفارش فروش تعهدی

```shell
curl -X POST 'https://api.nobitex.ir/margin/orders/add' \
  -H "Authorization: Token yourTOKENhereHEX0000000000" \
  -H "content-type: application/json" \
  --data '{"srcCurrency": "btc", "dstCurrency": "rls", "amount": "0.01", "price": "6400000000"}'
```

```plaintext
http POST https://api.nobitex.ir/margin/orders/add \
  srcCurrency=btc&dstCurrency=rls&amount=0.01&price=6400000000
```

> در صورت فراخوانی درست، پاسخ به این صورت خواهد بود:

```json
{
  "status": "ok",
  "order": {
    "id": 25,
    "type": "sell",
    "execution": "Limit",
    "tradeType": "Margin",
    "srcCurrency": "btc",
    "dstCurrency": "rls",
    "price": "6400000000",
    "amount": "0.01",
    "status": "Active",
    "totalPrice": "0",
    "totalOrderPrice": "64000000",
    "matchedAmount": 0,
    "unmatchedAmount": "0.01",
    "partial": false,
    "fee": 0,
    "created_at": "2022-10-20T11:36:13.592827+00:00",
    "averagePrice": "0"
  }
}
```

برای درج سفارش فروش تعهدی از این درخواست استفاده نمایید.

- **درخواست:**: `POST /margin/orders/add`
- **محدودیت فراخوانی:** ۱۰۰ درخواست در هر ۱۰ دقیقه


### پارامترهای ورودی

| پارامتر     | نوع      | پیش‌فرض | توضیحات                 | نمونه           |
|-------------|----------|---------|-------------------------|-----------------|
| srcCurrency | string   | الزامی  | رمزارز مبدا بازار       | `btc` یا  ...   |
| dstCurrency | string   | الزامی  | ارز مقصد بازار          | `rls` یا `usdt` |
| amount      | monetary | الزامی  | مقدار مورد تقاضای وکالت | `0.01`          |
| price       | monetary | الزامی  | قیمت سفارش گذاری        | `640000000`     |

### پارامترهای پاسخ
| پارامتر | نوع              | توضیحات          | نمونه             |
|---------|------------------|------------------|-------------------|
| order   | [Order](/#order) | سفارش فروش تعهدی | `{"id": 25, ...}` |

### نکات و ملاحظات
1. نوع اجرای سفارش با قیمت معین (`limit`) می‌باشد.
2. سفارشات فروش تعهدی ثبت شده را می‌توان در [فهرست سفارش‌های کاربر](/#a2ce8ff7e3) مشاهده کرد.
3. بعد از پر شدن سفارش فروش تعهدی، موقعیت فروش تعهدی باز خواهد شد.

### حالت‌های خطا

> در صورت عدم پذیرش درخواست، پاسخ به این صورت خواهد بود:

```json
{
  "status": "failed",
  "code": "ErrorCode",
  "message": "Human readable error message"
}
```

| کد خطا               | توضیحات                                                                                 |
|----------------------|-----------------------------------------------------------------------------------------|
| FeatureUnavailable   | شما از کاربران مجاز به استفاده از امکانات آزمایشی نیستید.                               |
| ParseError           | فرمت ورودی‌ها مطابق فرمت خواسته شده نیست.                                               |
| TradeLimitation      | کاربر سطح احراز کافی (حداقل سطح ۱) ندارد.                                               |
| InvalidMarketPair    | زوج مبدا/مقصد بازار در میان بازارهای نوبیتکس وجود ندارد.                                |
| MarketClosed         | بازار بسته شده یا هنوز باز نشده است.                                                    |
| TradingUnavailable   | کاربر محدودیت معامله (از جانب پشتیبانی) دارد.                                           |
| UnsupportedMarginSrc | رمزارز مبدا برای معاملات فروش تعهدی پشتیبانی نمی‌شود.                                   |
| MarginClosed         | امکان فروش تعهدی بسته شده یا باز نشده است.                                              |
| AmountUnavailable    | مقدار مورد تقاضا برای اخذ وکالت فروش در استخر موجود نیست.                               |
| ExceedSellLimit      | مقدار از سقف مجاز فروش باقی‌مانده کاربر بیشتر است.                                      |
| InsufficientBalance  | موجودی کیف‌پول فروش تعهدی کاربر برای تامین وجه تضمین به اندازه مبلغ کل سفارش کافی نیست. |
| BadPrice             | قیمت سفارش نامعقول است. (مشابه درج سفارش اسپات)                                         |
| SmallOrder           | سفارش کوچک است و کمینه اندازه سفارش بازار را رعایت نکرده است. (مشابه درج سفارش اسپات)   |


## مشاهده لیست موقعیت‌ها

```shell
curl 'https://api.nobitex.ir/positions/list?srcCurrency=btc&status=active' \
  -H "Authorization: Token yourTOKENhereHEX0000000000" 
  
```

```plaintext
http GET https://api.nobitex.ir/positions/list \
  srcCurrency=btc&status=active
```

> در صورت فراخوانی درست، پاسخ به این صورت خواهد بود:

```json
{
  "status": "ok",
  "positions": [
    {
      "id": 128,
      "createdAt": "2022-10-20T11:36:13.604420+00:00",
      "srcCurrency": "btc",
      "dstCurrency": "rls",
      "status": "Open",
      "marginType": "Isolated Margin",
      "collateral": "640000000",
      "openedAt": "2022-10-20T11:36:16.562038+00:00",
      "closedAt": null,
      "liquidationPrice": "25174302690",
      "entryPrice": "6400000000",
      "exitPrice": null,
      "delegatedAmount": "0.03",
      "liability": "0.0300450676",
      "totalAsset": "831712000",
      "marginRatio": "1.9986",
      "liabilityInOrder": "0",
      "assetInOrder": "0",
      "unrealizedPNL": "−576435",
      "unrealizedPNLPercent": "−0.09",
      "expirationDate": "2022-11-20",
      "extensionFee": "320000"
    },
    {
      "id": 32,
      "createdAt": "2022-08-14T15:09:58.001901+00:00",
      "srcCurrency": "btc",
      "dstCurrency": "usdt",
      "status": "Closed",
      "marginType": "Isolated Margin",
      "collateral": "2130",
      "openedAt": "2022-08-14T15:10:19.937801+00:00",
      "closedAt": "2022-08-17T18:39:52.890674+00:00",
      "liquidationPrice": "38986.54",
      "entryPrice": "21300",
      "exitPrice": "19900",
      "PNL": "118.46",
      "PNLPercent": "5.56"
    }
  ],
  "hasNext": false
}
```

برای دریافت لیست موقعیت‌های باز و تاریخچه موقعیت‌های پایان یافته از این درخواست استفاده کنید.

- **درخواست:**: `GET /positions/list`
- **محدودیت فراخوانی:** ۳۰ درخواست در هر دقیقه

- **<a href="/#pagination">صفحه‌بندی:</a>** دارد (پیش فرض ۵۰)

### پارامترهای ورودی

| پارامتر     | نوع      | پیش‌فرض  | توضیحات           | نمونه              |
|-------------|----------|----------|-------------------|--------------------|
| srcCurrency | string   | همه      | رمزارز مبدا بازار | `btc` یا ...       |
| dstCurrency | string   | همه      | ارز مقصد بازار    | `rls` یا `usdt`    |
| status      | string   | `active` | وضعیت موقعیت      | `active` یا `past` |

### پارامترهای پاسخ
| پارامتر   | نوع              | توضیحات         | نمونه                  |
|-----------|------------------|-----------------|------------------------|
| positions | list of Position | لیست موقعیت‌ها  | `[{... Position ...}]` |
| hasNext   | boolean          | صفحه بعدی دارد؟ | `false`                |

### شی Position
| فیلد                 | نوع      | توضیحات                                           | نمونه                                           |
|----------------------|----------|---------------------------------------------------|-------------------------------------------------|
| id                   | int      | شناسه‌ی موقعیت                                    | 128                                             |
| createdAt            | string   | زمان درخواست وکالت (درج سفارش) فروش تعهدی         | `2022-10-20T11:36:13.604420+00:00`              |
| srcCurrency          | string   | رمزارز مبدا بازار                                 | `btc` یا `eth` یا `trx` یا ...                  |
| dstCurrency          | string   | ارز مقصد بازار                                    | `rls` یا `usdt`                                 |
| status               | string   | وضعیت                                             | `Open` یا `Closed` یا `Liquidated` یا `Expired` |
| marginType           | string   | نوع تضمین سفارش                                   | `Isolated Margin`                               |
| collateral           | monetary | وجه تضمین بلوکه شده در کیف‌پول فروش تعهدی         | `640000000`                                     |
| openedAt             | string   | تاریخ باز شدن موقعیت                              | `2022-10-20T11:36:16.562038+00:00`              |
| closedAt             | string   | تاریخ تسویه نهایی موقعیت                          | `2022-10-25T09:57:38.560820+00:00`              |
| liquidationPrice     | monetary | قیمت لیکوئید شدن موقعیت                           | `25174302690`                                   |
| entryPrice           | monetary | میانگین قیمت سفارش فروش تعهدی                     | `6400000000`                                    |
| exitPrice            | monetary | میانگین قیمت سفارش‌های خرید تعهد                  | `6200000000`                                    |
| [ویژه موقعیت باز:]   |          |                                                   |                                                 |
| delegatedAmount      | monetary | مقدار وکالت گرفته شده در لحظه (به رمزارز مبدا)    | `0.03`                                          |
| liability            | monetary | تعهد خرید                                         | `0.0300450676`                                  |
| totalAsset           | monetary | دارایی کلی (به رمزارز مقصد)                       | `831712000`                                     |
| marginRatio          | decimal  | نسبت تعهد                                         | `1.9986`                                        |
| liabilityInOrder     | monetary | بخشی از تعهد خرید که سفارش خرید باز دارد          | `0`                                             |
| assetInOrder         | monetary | بخشی از دارایی کلی که در سفارش خرید باز بلوکه است | `0`                                             |
| unrealizedPNL        | monetary | سود و زیان محقق نشده/لحظه‌ای (به رمزارز مقصد)     | `-576435`                                       |
| unrealizedPNLPercent | decimal  | درصد سود و زیان محقق نشده/لحظه‌ای                 | `−0.09`                                         |
| expirationDate       | string   | تاریخ انقضای نهایی موقعیت فروش                    | `2022-11-20`                                    |
| extensionFee         | monetary | مقدار کارمزد تمدید در انتهای روز (به رمزارز مقصد) | `320000`                                        |
| [ویژه موقعیت بسته:]  |          |                                                   |                                                 |
| PNL                  | monetary | سود و زیان نهایی (به رمزارز مقصد)                 | `35584000`                                      |
| PNLPercent           | decimal  | درصد سود و زیان نهایی                             | `5.56`                                          |

### نکات و ملاحظات
1. **وضعیت**: این پارامتر در ورودی بر دو قسم است:
  * `active`: موقعیت‌های باز و تسویه نشده
  * `past`: موقعیت‌های بسته، لیکوئید و منقضی شده که تسویه شده باشد
همچنین در خروجی بر چند مقدار است:  
  * `Open`: باز -- همه یا بخشی از سفارش فروش تعهدی در بازار پر شده است.
  * `Closed`: بسته -- کاربر مقدار وکالت گرفته شده را بازپرداخت کرده است.
  * `Liquidated`: لیکویید شده
  * `Expired`: منقضی شده -- هر موقعیت از زمان ثبت سفارش اولیه حداکثر ۳۰ روز می‌تواند باز بماند.
2. **نوع تضمین سفارش**: بر دو قسم می‌تواند باشد.
  * `Isolated Margin`: ضرر حداکثر به اندازه وجه تضمین موقعیت خواهد بود. -- پیش‌فرض
  * `Cross Margin`: ضرر حداکثر به اندازه تمام موجودی آزاد کیف‌پول فروش تعهدی خواهد بود. -- در آینده
3. **تعهد خرید**: مقدار وکالت گرفته شده + کارمزد سفارش خرید
4. **دارایی کلی**: مقدار وجه تضمین + باقی‌مانده وجه حاصل از فروش
5. **نسبت تعهد**:  نسبت اولیه آن ۲ و حداقل نسبت لازم برای لیکوئید نشدن ۱.۱ است.
6. از زمان لیکویید/منقضی شدن یک موقعیت فروش باز تا زمان تسویه تعهد خرید با سفارش‌گذاری سیستمی و معامله در بازار،
ممکنه است اندکی فاصله ایجاد شود. در این بازه، موقعیت لیکویید/منقضی شده به منزله موقعیت فعال باز می‌گردد.

### حالت‌های خطا

> در صورت عدم پذیرش درخواست، پاسخ به این صورت خواهد بود:

```json
{
  "status": "failed",
  "code": "ErrorCode",
  "message": "Human readable error message"
}
```

| کد خطا               | توضیحات                                                   |
|----------------------|-----------------------------------------------------------|
| FeatureUnavailable   | شما از کاربران مجاز به استفاده از امکانات آزمایشی نیستید. |
| ParseError           | فرمت ورودی‌ها مطابق فرمت خواسته شده نیست.                 |


## مشاهده یک موقعیت

```shell
curl 'https://api.nobitex.ir/positions/128/status' \
  -H "Authorization: Token yourTOKENhereHEX0000000000" 
  
```

```plaintext
http GET https://api.nobitex.ir/positions/128/status
```

> در صورت فراخوانی درست، پاسخ به این صورت خواهد بود:

```json
{
  "status": "ok",
  "position": {
    "id": 128,
    "createdAt": "2022-10-20T11:36:13.604420+00:00",
    "srcCurrency": "btc",
    "dstCurrency": "rls",
    "status": "Open",
    "marginType": "Isolated Margin",
    "collateral": "640000000",
    "openedAt": "2022-10-20T11:36:16.562038+00:00",
    "closedAt": null,
    "liquidationPrice": "25174302690",
    "entryPrice": "6400000000",
    "exitPrice": null,
    "delegatedAmount": "0.03",
    "liability": "0.0300450676",
    "totalAsset": "831712000",
    "marginRatio": "1.9986",
    "liabilityInOrder": "0",
    "assetInOrder": "0",
    "unrealizedPNL": "−576435",
    "unrealizedPNLPercent": "−0.09",
    "expirationDate": "2022-11-20",
    "extensionFee": "320000"
  }
}
```

برای مشاهده وضعیت یک موقعیت از این درخواست استفاده کنید.

- **درخواست:**: `GET /positions/:positionId:/status`
- **محدودیت فراخوانی:** ۱۰۰ درخواست در هر ۱۰ دقیقه

### پارامترهای ورودی

| پارامتر      | نوع       | پیش‌فرض | توضیحات        | نمونه |
|--------------|-----------|---------|----------------|-------|
| :positionId: | url-param | الزامی  | شناسه‌ی موقعیت | `128` |

### پارامترهای پاسخ
| پارامتر  | نوع                    | توضیحات | نمونه              |
|----------|------------------------|---------|--------------------|
| position | [Position](/#position) | موقعیت  | `{"id": 128, ...}` |

### حالت‌های خطا

> در صورت عدم پذیرش درخواست، پاسخ به این صورت خواهد بود:

```json
{
  "status": "failed",
  "code": "ErrorCode",
  "message": "Human readable error message"
}
```

| کد خطا             | توضیحات                                                   |
|--------------------|-----------------------------------------------------------|
| FeatureUnavailable | شما از کاربران مجاز به استفاده از امکانات آزمایشی نیستید. |


## بستن موقعیت فروش تعهدی

```shell
curl -X POST 'https://api.nobitex.ir/positions/128/close' \
  -H "Authorization: Token yourTOKENhereHEX0000000000" \
  -H "content-type: application/json" \
  --data '{"amount": "0.0100150225", "price": "6200000000"}'
```

```plaintext
http POST https://api.nobitex.ir/positions/128/close \
  amount=0.0100150225&price=6200000000
```

> در صورت فراخوانی درست، پاسخ به این صورت خواهد بود:

```json
{
  "status": "ok",
  "order": {
    "id": 28,
    "type": "buy",
    "execution": "Limit",
    "tradeType": "Margin",
    "srcCurrency": "btc",
    "dstCurrency": "rls",
    "price": "6200000000",
    "amount": "0.0100150225",
    "status": "Active",
    "totalPrice": "0",
    "totalOrderPrice": "62093139",
    "matchedAmount": 0,
    "unmatchedAmount": "0.0100150225",
    "partial": false,
    "fee": 0,
    "created_at": "2022-10-25T09:57:38.560820+00:00",
    "averagePrice": "0"
  }
}
```

برای بستن موقعیت فروش با درج سفارش خرید تعهد از این درخواست استفاده نمایید.

- **درخواست:**: `POST /positions/:positionId:/close`
- **محدودیت فراخوانی:** ۳۰۰ درخواست در هر دقیقه

### پارامترهای ورودی

| پارامتر      | نوع       | پیش‌فرض | توضیحات        | نمونه          |
|--------------|-----------|---------|----------------|----------------|
| :positionId: | url-param | الزامی  | شناسه‌ی موقعیت | `128`          |
| amount       | monetary  | الزامی  | مقدار سفارش    | `0.0100150225` |
| price        | monetary  | الزامی  | قیمت سفارش     | `6200000000`   |

### پارامترهای پاسخ
| پارامتر | نوع              | توضیحات         | نمونه             |
|---------|------------------|-----------------|-------------------|
| order   | [Order](/#order) | سفارش خرید تعهد | `{"id": 25, ...}` |

### نکات و ملاحظات
1. نوع اجرای سفارش با قیمت معین (`limit`) می‌باشد.
2. سفارشات فروش تعهدی ثبت شده را می‌توان [فهرست سفارش‌های کاربر](/#a2ce8ff7e3) مشاهده کرد.
3. بعد از پر شدن سفارش خرید تعهد، موقعیت فروش تعهدی بسته و سود و زیان آن واریز خواهد شد.
4. سفارش‌های خرید از دارایی کلی موقعیت تامین اعتبار می‌شوند. مقدار سفارش خرید (جهت بازپرداخت) باید شروط زیر را داشته باشد:
  * مجموع مقدار باز سفارشات خرید موقعیت از تعهد خرید بیشتر نباشد. (liability - liabilityInOrder)
  * در صورتی که مقدار با همه تعهد خرید باقیمانده برابر نباشد --تسویه نهایی--، سفارش کوچک نباشد.
  (مثال: فرض کنید می‌خواهید ۰.۰۰۱ بیت‌کوین را با ارزش ۶۴۰ هزار تومان تسویه کنید و کف سفارش کوچک ۳۰۰ هزار تومان باشد.
  می‌توانید ۲ سفارش ۳۰۰ هزار تومانی خرید بگذارید. و در پایان برای ۴۰ هزار تومان باقیمانده سفارش کوچک بگذارید.
  اما نمی‌توانید سفارش‌های اولیه را کمتر از ۳۰۰ هزار تومان قرار دهد. -- مشابه تبدیل موجودی اندک در کیف پول)
  * ارزش کل بخش باز سفارش‌های خرید (موجودی ضرب در قیمت) از دارایی کلی موقعیت فروش بیشتر نباشد. (totalAsset - assetInOrder)
5. دقت کنید تعهد خرید حداکثر ۱۰ رقم دقت دارد که در زمان تسویه نهایی همه آن باید ارسال شود.

### حالت‌های خطا

> در صورت عدم پذیرش درخواست، پاسخ به این صورت خواهد بود:

```json
{
  "status": "failed",
  "code": "ErrorCode",
  "message": "Human readable error message"
}
```

| کد خطا             | توضیحات                                                                               |
|--------------------|---------------------------------------------------------------------------------------|
| FeatureUnavailable | شما از کاربران مجاز به استفاده از امکانات آزمایشی نیستید.                             |
| ParseError         | فرمت ورودی‌ها مطابق فرمت خواسته شده نیست.                                             |
| TradeLimitation    | کاربر سطح احراز کافی (حداقل سطح ۱) ندارد.                                             |
| TradingUnavailable | کاربر محدودیت معامله (از جانب پشتیبانی) دارد.                                         |
| NoOpenPosition     | موقعیت فروش فعالی با این شناسه وجود ندارد.                                            |
| ExceedLiability    | مقدار سفارش از تعهد خرید باقی‌مانده کاربر بیشتر است.                                  |
| ExceedTotalAsset   | ارزش کل سفارش از دارایی کلی آزاد کاربر بیشتر است.                                     |
| BadPrice           | قیمت سفارش نامعقول است. (مشابه درج سفارش اسپات)                                       |
| SmallOrder         | سفارش کوچک است و کمینه اندازه سفارش بازار را رعایت نکرده است. (مشابه درج سفارش اسپات) |


## ویرایش وجه تضمین موقعیت باز

```shell
curl -X POST 'https://api.nobitex.ir/positions/128/edit-collateral' \
  -H "Authorization: Token yourTOKENhereHEX0000000000" \
  -H "content-type: application/json" \
  --data '{"collateral": "230000000"}'
```

```plaintext
http POST https://api.nobitex.ir/positions/128/edit-collateral \
  collateral=230000000
```

> در صورت فراخوانی درست، پاسخ به این صورت خواهد بود:

```json
{
  "status": "ok",
  "position": {
    "id": 128,
    "createdAt": "2022-10-20T11:36:13.604420+00:00",
    "srcCurrency": "btc",
    "dstCurrency": "rls",
    "status": "Open",
    "marginType": "Isolated Margin",
    "collateral": "230000000",
    "openedAt": "2022-10-20T11:36:16.562038+00:00",
    "closedAt": null,
    "liquidationPrice": "12230682570",
    "entryPrice": "6400000000",
    "exitPrice": "6100000000",
    "PNL": null,
    "delegatedAmount": "0.02",
    "liability": "0.0200300451",
    "totalAsset": "257023981",
    "marginRatio": "2.0340",
    "liabilityInOrder": "0",
    "assetInOrder": "0",
    "unrealizedPNL": "23423565",
    "unrealizedPNLPercent": "10.18",
    "expirationDate": "2022-11-20",
    "extensionFee": "320000"
  }
}


```

برای کاهش یا افزایش وجه تضمین موقعیت باز خود از این درخواست استفاده نمایید.

- **درخواست:**: `POST /positions/:positionId:/edit-collateral`
- **محدودیت فراخوانی:** ۶۰ درخواست در هر دقیقه

### پارامترهای ورودی

| پارامتر      | نوع       | پیش‌فرض | توضیحات        | نمونه       |
|--------------|-----------|---------|----------------|-------------|
| :positionId: | url-param | الزامی  | شناسه‌ی موقعیت | `128`       |
| collateral   | monetary  | الزامی  | وجه تضمین جدید | `230000000` |

### پارامترهای پاسخ

| پارامتر  | نوع                    | توضیحات           | نمونه             |
|----------|------------------------|-------------------|-------------------|
| position | [Position](/#position) | موقعیت فروش تعهدی | `{"id": 25, ...}` |

### نکات و ملاحظات
1. در صورتی که موقعیت در سوددهی باشد (نسبت تعهد > ۲)، کاربر می‌تواند مازاد وجه تضمین خود را تا نسبت ۲ از بلوکه در بیاورد. -- سود تنها زمان بسته شدن کامل موقعیت قابل دستیابی است. 
2. در صورتی که موقعیت فروش به نقطه لیکوئید شدن نزدیک باشد و کاربر بخواهد موقعیت خود (به امید کاهش قیمت) باز نگهدارد، می‌تواند با افزایش وجه تضمین خود، قیمت لیکوئید شدن خود را افزایش دهد.

### حالت‌های خطا

> در صورت عدم پذیرش درخواست، پاسخ به این صورت خواهد بود:

```json
{
  "status": "failed",
  "code": "ErrorCode",
  "message": "Human readable error message"
}
```

| کد خطا              | توضیحات                                                       |
|---------------------|---------------------------------------------------------------|
| FeatureUnavailable  | شما از کاربران مجاز به استفاده از امکانات آزمایشی نیستید.     |
| ParseError          | فرمت ورودی‌ها مطابق فرمت خواسته شده نیست.                     |
| TryAgainLater       | موقتا امکان تغییر وجه تضمین وجود ندارد.                       |
| LowMarginRatio      | کاهش وجه تضمین کمتر از نسبت تعهد مجاز (=۲) است.               |
| InsufficientBalance | افزایش وجه تضمین بیشتر از موجودی أزاد کیف‌پول فروش تعهدی است. |
