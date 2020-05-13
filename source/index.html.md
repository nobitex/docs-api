---
title: مستندات API نوبیتکس
lang: fa


# see: https://github.com/lord/slate/wiki/Custom-Slate-Themes
# see: https://developer.tradegecko.com/

language_tabs: # must be one of https://git.io/vQNgJ
  - shell
  - plaintext

toc_footers:
  - <a href='https://nobitex.ir/'>سایت نوبیتکس</a>

---

# مستندات API نوبیتکس
بستر نوبیتکس با تمرکز بر API توسعه داده شده است و کاربران محترم می‌توانند به راحتی تمامی اقدامات خود در نوبیتکس را به
با برنامه‌نویسی و به صورت خودکار مدیریت کنند. در ادامه اجزای اصلی API نوبیتکس توضیح داده شده‌اند.

برای دسترسی سریع‌تر
به API مد نظر خود می‌توانید نام یا url آن را جستجو نمایید یا از منوی سمت راست صفحه استفاده کنید. برای بسیاری از API نیز
در بخش خاکستری سمت چپ صفحه، نمونه‌ی کد آورده شده است. از بخش بالا سمت چپ صفحه نیز می‌توانید زبان برنامه‌نویسی
مطلوب خود را برای مشاهده‌ی نمونه کدها به آن زبان، انتخاب نمایید.

در صورت ناقص یا مبهم بودن توضیحات APIها یا هرگونه پیشنهاد دیگر در این خصوص، می‌توانید در [مخزن گیت‌هاب مستندات نوبیتکس API](https://github.com/nobitex/docs-api)
مورد (issue) جدیدی را ایجاد نمایید یا مستقیما روی [این لینک](https://github.com/nobitex/docs-api/issues/new) کلیک کنید و مشکل مد نظرتان را با ما در میان بگذارید.

<aside class="warning">
مستندات API در حال توسعه می باشد و ممکن است فرمت درخواست‌ها و پاسخ‌ها دچار تغییر شوند .لطفا در موارد حساس ملاحظات لازم را در نظر بگیرید. 
</aside>

# احراز هویت
برای استفاده از APIهای عمومی نیازی به ارائه‌ی رمز یا توکن خاصی نمی‌باشد ولی اگر تمایل به استفاده از APIهای
مرتبط با حساب کاربری خود را دارید، باید ابتدا درخواست توکن را ارسال نموده و با استفاده از آن توکن درخواست‌های
بعدی را احراز هویت نمایید.

## لاگین
> برای دریافت توکن، از این کد استفاده کنید:

```shell
curl 'https://api.nobitex.ir/auth/login/' \
  -X POST \
  -H "Content-Type: application/json" \
  --data $'{"username":"name@example.com","password":"secret-password-1234"}'
```

```plaintext
http POST https://api.nobitex.ir/auth/login/ \
  username=name@example.com password=secret-password-1234
```

> در صورت فراخوانی درست، پاسخ به این صورت خواهد بود:

```json
{
    "key": "e9282e56c83f93eb077043e5ad8b6cf5b3ff7568"
}
```

دریافت توکن به صورت خودکار و با ارسال درخواست به `/auth/login/` صورت می‌گیرد. این تنها APIی است که نیاز دارید
به آن نام کاربری و رمز عبور خود را ارسال کنید. تمامی دیگر APIها از توکن به جای رمز عبور برای احراز هویت استفاده می‌کنند.
توکن‌های صادر شده بعد از چهار ساعت منقضی می‌شوند و باید مجددا با ارسال درخواست لاگین، توکن جدیدی دریافت کنید.
در صورتی که نیاز به ایجاد توکن‌های بلند مدت دارید، از پارامتر `remember=yes` استفاده کنید تا توکن ایجاد شده به مدت سی
روز معتبر بماند.

- آدرس : `/POST /auth/login `

- پارامترها :

پارامتر | نوع | پیش‌فرض | توضیحات | نمونه
------- | ---- | --------- | --------- | -----
username | string | الزامی | ایمیل کاربر | `name@example.com`
password | string | الزامی | رمز عبور کاربر | `secret-password-1234`
remember | string | no | آیا توکن بلند مدت صادر شود؟ | `yes` یا `no`

<aside class="notice">
توکن‌های دریافت شده از این روش، بعد از اتمام زمان اعتبار (چهار ساعت یا سی روز) منقضی می‌شوند. در صورت نیاز به توکن‌های با تاریخ انقضای
طولانی‌تر و آگاهی از ملاحظات امنیتی لازم، با پشتیبانی نوبیتکس تماس بگیرید.
</aside>

<aside class="notice">
انتهای آدرس ارسال، حتما "/" باید گذاشته شود.
</aside>

<aside class="notice">
برای لاگین حتما باید از ip ایران درخواست ارسال شود. در غیر این صورت، خطای 429 برگردانده می شود. بدیهی است که استفاده از هر vpn، منجر به این خطا می شود.
</aside>

# اطلاعات بازار (عمومی)
##لیست سفارشات

```shell
curl 'https://api.nobitex.ir/v2/orderbook'
     -X POST -H "content-type: application/json"
     --data '{"symbol": "USDTIRT"}'
```

```plaintext
http POST https://api.nobitex.ir/v2/orderbook \
  symbol=USDTIRT
```

> در صورت فراخوانی درست، پاسخ به این صورت خواهد بود:

```json
{
    "status": "ok",
    "bids": [
        [
            "1476091000",
            "1.016"
        ],
        [
            "1479700000",
            "0.2561"
        ]
    ],
    "asks": [
        [
            "1470001120",
            "0.126571"
        ],
        [
            "1470000000",
            "0.818994"
        ]
    ]
}
```

برای دریافت لیست سفارشات از این نوع درخواست استفاده نمایید:

- آدرس : `POST /v2/orderbook`

- پارامترها :

پارامتر     | نوع    | پیش‌فرض   |  توضیحات   | نمونه
----------- | ----   | ------   | ---------  | -----
symbol       | string |  الزامی  |   نماد بازار    | `BTCIRT` یا `USDTIRT` 

<aside class="notice">
خروجی شامل دو آرایه asks و bids بوده که در هر یک قیمت و مقدار سفارش‌های بازار وجود دارد.
</aside>
<aside class="notice">
در این api نیاز به توکن وجود ندازد.
</aside>
<aside class="notice">
لیست نمادهای بازار ها عبارتنداز :BTCIRT، ETHIRT، LTCIRT، XRPIRT، BCHIRT، BNBIRT، EOSIRT،  XLMIRT، ETCIRT،‌ TRXIRT ،USDTIRT، BTCUSDT، ETHUSDT، LTCUSDT، XRPUSDT، BCHUSDT، BNBUSDT، EOSUSDT، XLMUSDT، ETCUSDT، TRXUSDT
</aside>

## لیست معاملات

```shell
curl 'https://api.nobitex.ir/v2/trades'
     -X POST -H "content-type: application/json"
     --data '{"symbol": "USDTIRT"}'
```

```plaintext
http POST https://api.nobitex.ir/v2/trades \
  symbol=USDTIRT
```

> در صورت فراخوانی درست، پاسخ به این صورت خواهد بود:

```json
{
    "status": "ok",
    "trades": [
        {
            "time": 1588689375067,
            "price": "1470000110",
            "volume": "0",
            "type": "sell"
        },
        {
            "time": 1588689360464,
            "price": "1470000110",
            "volume": "0.002",
            "type": "buy"
        }
    ]
}
```

برای دریافت لیست معاملات از این نوع درخواست استفاده نمایید:

- آدرس : `POST /v2/trades `

- پارامترها :

پارامتر     | نوع    | پیش‌فرض   |  توضیحات   | نمونه
----------- | ----   | ------   | ---------  | -----
symbol       | string |  الزامی  |   نماد بازار    | `BTCIRT` یا `USDTIRT` 

<aside class="notice">
محدودیت فراخوانی : 15 درخواست در دقیقه
</aside>
<aside class="notice">
در این api نیاز به توکن وجود ندازد.
</aside>
<aside class="notice">
لیست نمادهای بازار ها عبارتنداز :BTCIRT، ETHIRT، LTCIRT، XRPIRT، BCHIRT، BNBIRT، EOSIRT،  XLMIRT، ETCIRT،‌ TRXIRT ،USDTIRT، BTCUSDT، ETHUSDT، LTCUSDT، XRPUSDT، BCHUSDT، BNBUSDT، EOSUSDT، XLMUSDT، ETCUSDT، TRXUSDT
</aside>


##آمار بازار نوبیتکس 

```shell
curl 'https://api.nobitex.ir/market/stats' \
  -X POST \
  -H "content-type: application/json" \
  --data '{"srcCurrency":"btc","dstCurrency":"rls"}'
```

```plaintext
http POST https://api.nobitex.ir/market/stats \
  srcCurrency=btc dstCurrency=rls
```

> در صورت فراخوانی درست، پاسخ به این صورت خواهد بود:

```json
{
    "stats": {
        "btc-rls": {
            "bestSell": "749976360.0000000000",
            "isClosed": false,
            "dayOpen": "686021860.0000000000",
            "dayHigh": "750350000.0000000000",
            "bestBuy": "733059600.0000000000",
            "volumeSrc": "0.2929480000",
            "dayLow": "686021860.0000000000",
            "latest": "750350000.0000000000",
            "volumeDst": "212724856.0678640000",
            "dayChange": "9.38",
            "dayClose": "750350000.0000000000"
        },
    },
    "status": "ok"
}
```

برای دریافت آخرین آمار بازار نوبیتکس از این نوع درخواست استفاده نمایید:

- آدرس : `POST /market/stats`

- پارامترها :

پارامتر     | نوع    | پیش‌فرض   |  توضیحات   | نمونه
----------- | ----   | ------   | ---------  | -----
srcCurrency | string |   الزامی | ارزها مبدا | `btc,usdt`
dstCurrency | string |   الزامی | ارز مقصد   | `rls`

<aside class="notice">
محدودیت فراخوانی : 100 درخواست در 10 دقیقه
</aside>
<aside class="notice">
انواع ارز:
usd, rls, btc, eth, ltc, usdt, xrp, bch, bnb, eos, doge, xlm, trx, ada, xmr, xem, iota, etc, dash, zec, neo, qtum, xtz
</aside>

## آمار OHLC بازار نوبیتکس 

```shell
curl 'https://api.nobitex.ir/market/udf/history?symbol=BTCIRT&resolution=D&from=1560120967&to=1562230967' 
```

```plaintext
http GET https://api.nobitex.ir/market/udf/history?symbol=BTCIRT&resolution=D&from=1560120967&to=1562230967
```

> در صورت فراخوانی درست، پاسخ به این صورت خواهد بود:

```json
{
  "s": "ok",
  "t": [
    1562182200
  ],
  "c": [
    "157000000.0000000000"
  ],
  "o": [
    "150551000.0000000000"
  ],
  "h": [
    "161869500.0000000000"
  ],
  "l": [
    "150551000.0000000000"
  ],
  "v": [
    "9.8592626506"
  ]
}
```



برای توضیحات بیشتر در مورد  OHLC به [این لینک](https://en.wikipedia.org/wiki/Open-high-low-close_chart) مراجعه کنید.<br><br>
برای دریافت  آمار OHLC نوبیتکس از این نوع درخواست استفاده نمایید:

- آدرس : `GET /market/udf/history}`

- پارامترها :

پارامتر     | نوع    | پیش‌فرض   |  توضیحات   | نمونه
----------- | ----   | ------   | ---------  | -----
symbol | string |   الزامی | جفت ارز | `BTCIR`
resolution | string |   الزامی |بازه زمانی هر خروجی| `D`
from | int |   الزامی |زمان ابتدای بازه| `1562120967`
to | int |   الزامی |زمان پایان بازه| `1562230967`

- پارامتر Resolution  بازه زمانی  کندل‌های خروجی می‌باشد و مقدار آن می‌تواند یکی از مقادیر زیر باشد:


پارامتر | توضیح
------ | -------
 یک ساعت|`60`
 سه ساعت|`180`
 شش ساعت|`360`
 دوازده ساعت|`720`
 یک روز|`D`
 دو روز|`2D`
 سه روز|`3D`


<aside class="notice">
مقادیر from و to زمان شروع و پایان جست‌وجو را مشخص میکند. برای مثال اگر شما میخواهید بازه 4 ساعته از تاریخ 2019/2/9 11:39:41 را به خروجی های 1 ساعته دریافت کنید،مقادیر شما باید به این صورت باشد:
from: 1567424381
to: 1567395581
resolution: 60
</aside>

<aside class="notice">
در صورت ورودی اشتباه برای resolution پاسخ به این صورت خواهد بود:
`{
   "s": "error",
   "errmsg": "Invalid resolution!"
 }
 `
</aside>



- پاسخ سرور
در هر بازه زمانی، بسته به resolution انتخابی، تعداد مقادیر برگشتی متفاوت میباشد. برای مثال اگر شما اختلاف بازه زمانی خود را 7 روز و resolution را مقدار D یعنی 1 روز انتخاب کنید، 7 پاسخ به شما برگشت داده می‌شود.
هر کدام از این پاسخ‌ها در واقع یک candle هستند.
هر candle، مقادیر زیر را دارد:

پارامتر|توضیح|نوع|نمونه
-----|-------|------|-----
`s`|وضعیت پاسخ|string|`ok`
`t`|زمان|float|`1562182200`
`c`|مقدار انتهای بازه|string|`157000000.0000000000`
`o`|مقدار ابندای بازه|string|`150551000.0000000000`
`h`|بالاترین مقدار بازه|string|`161869500.0000000000`
`l`|پایین ترین مقدار بازه|string|`150551000.0000000000`
`v`|حجم بازه|array|`["9.8592626506"]`

پارامتر o (open) مقدار شروع بازه (در مثال ما بازه 1 روزه) را نشان می‌دهد. یعنی این بازه با مقدار 150551000.0000000000 شروع شده است.

پارامتر c  (close) مقدار پایان بازه را نشان می‌دهد. یعنی این بازه با مقدار 157000000.0000000000 به پایان رسیده‌است.

پارامتر h(high) است. بالاترین مقدار بازه را نشان می‌دهد. یعنی بالاترین مقدار این بازه  "150551000.0000000000"

پارامتر l  (low) پایین‌ ترین مقدار بازه را نشان می‌دهد. پایین ترین مقدار این بازه 150551000.000000 می‌باشد.

پارامتر v  (volume) حجم بازه بازه را نشان می‌دهد. حجم این بازه 9.8592626506 می‌باشد.

## آمار بازار جهانی

```shell
curl 'https://api.nobitex.ir/market/global-stats' \
  -X POST
  
```

```plaintext
http POST https://api.nobitex.ir/market/global-stats
```

> در صورت فراخوانی درست، پاسخ به این صورت خواهد بود:

```json
{
    "ltc": {
        "kraken": {
            "price": "41.69"
        }
    },
    "btc": {
        "kraken": {
            "price": "5517.2"
        }
    },
    ...
   
    "status": "ok"
}
```

برای دریافت آمار بازارهای جهانی از این نوع درخواست استفاده نمایید:

- آدرس : `POST /market/global-stats`
     
<aside class="notice">
این آمارها مربوط به بازارهای Kraken و Binance می باشد
</aside>
<aside class="notice">
محدودیت فراخوانی : 100 درخواست در 10 دقیقه
</aside>

# اطلاعات کاربر

##  پروفایل

```shell
curl 'https://api.nobitex.ir/users/profile' \
  -H "Authorization: Token e9282e56c83f93eb077043e5ad8b6cf5b3ff7568"
```

```plaintext
http POST https://api.nobitex.ir/users/profile \
```

> در صورت فراخوانی درست، پاسخ به این صورت خواهد بود:

```json
{
  "status": "ok",
  "profile": {
    "firstName": "مهدی",
    "lastName": "رضایی",
    "nationalCode": "011122333",
    "email": "name@example.com",
    "username": "name@example.com",
    "phone": "02142719000-9012",
    "mobile": "09151111111",
    "city": "مشهد",
    "bankCards": [
      {
        "number": "6037-9900-0000-0000",
        "bank": "ملی",
        "owner": "مهدی رضایی",
        "confirmed": true,
        "status": "confirmed"
      }
    ],
    "bankAccounts": [
      {
        "id": 1999,
        "number": "0346666666666",
        "shaba": "IR460170000000346666666666",
        "bank": "ملی",
        "owner": "مهدی رضایی",
        "confirmed": true,
        "status": "confirmed"
      }
    ],
    "verifications": {
      "email": true,
      "phone": true,
      "mobile": true,
      "identity": true,
      "selfie": false,
      "bankAccount": true,
      "bankCard": true,
      "address": true,
      "city": true
    },
    "pendingVerifications": {
      "email": false,
      "phone": false,
      "mobile": false,
      "identity": false,
      "selfie": false,
      "bankAccount": false,
      "bankCard": false
    },
    "options": {
      "fee": "0.35",
      "feeUsdt": "0.2",
      "isManualFee": false,
      "tfa": false,
      "socialLoginEnabled": false
    },
    "withdrawEligible": true
  },
  "tradeStats": {
    "monthTradesTotal": "10867181.5365000000",
    "monthTradesCount": 3
  }
}
```
این api، اطلاعات پروفایل شما، کارت بانکی، حساب بانکی، موارد تایید شده(ایمیل، شماره تلفن، موبایل ...)، تنظمیات مربوط به پروفایل(فی تراکنش، فی مبادلات usdt و ...) و خلاصه آمار مبادلات شما را برمیگرداند.

برای دریافت پروفایل کاربر از این نوع درخواست استفاده نمایید:

- آدرس : `GET /users/profile`

<aside class="notice">
برای این درخواست فقط کافیست توکن را ارسال فرمایید.
</aside>


##  سابقه ورود 

```shell
curl 'https://api.nobitex.ir/users/login-attempts' \
  -H "Authorization: Token e9282e56c83f93eb077043e5ad8b6cf5b3ff7568"
```

```plaintext
http POST https://api.nobitex.ir/users/login-attempts \
```

> در صورت فراخوانی درست، پاسخ به این صورت خواهد بود:

```json
{   
    "status": "ok",
    "attempts": [
        {
            "ip": "46.209.130.106",
            "username": "name@example.com",
            "status": "Successful",
            "createdAt": "2018-11-28T14:16:08.264308+00:00"
        },
        ...
    ]
}
```

برای دریافت سابقه ورود از این نوع درخواست استفاده نمایید:

- آدرس : `GET /users/login-attempts`


##  کد معرف 

```shell
curl 'https://api.nobitex.ir/users/get-referral-code' \
  -H "Authorization: Token e9282e56c83f93eb077043e5ad8b6cf5b3ff7568"
```

```plaintext
http POST https://api.nobitex.ir/users/get-referral-code \
```

> در صورت فراخوانی درست، پاسخ به این صورت خواهد بود:

```json
{
    "status": "ok",
    "referredUsersCount": 0,
    "referralCode": "84440",
    "referralFeeTotalCount": 0,
    "referralFeeTotal": 0
}
```

برای دریافت کد معرف از این نوع درخواست استفاده نمایید:

- آدرس : `GET /users/get-referral-code`


## افزودن کارت بانکی 

```shell
curl 'https://api.nobitex.ir/users/cards-add' \
  -X POST \
  -H "Authorization: Token e9282e56c83f93eb077043e5ad8b6cf5b3ff7568" \
  -H "content-type: application/json" \
  --data '{"number":"5041721011111111","bank":"رسالت"}'
```

```plaintext
http POST https://api.nobitex.ir/users/cards-add \
  number=5041721011111111 bank=رسالت
```

> در صورت فراخوانی درست، پاسخ به این صورت خواهد بود:

```json
{
    "status": "ok"
}
```

برای افزودن کارت بانکی جدید از این نوع درخواست استفاده نمایید:

- آدرس : `POST /users/cards-add`

- پارامترها :

پارامتر     | نوع    | پیش‌فرض   |   توضیحات     | نمونه
----------- | ----   | ------   |   ---------   | -----
number      | string |  الزامی  |    شماره کارت | `5041721011111111`
bank        | string |  الزامی  |    نام بانک   | `رسالت`

<aside class="notice">
محدودیت فراخوانی : 5 درخواست در ساعت
</aside>


## افزودن حساب بانکی 

```shell
curl 'https://api.nobitex.ir/users/accounts-add' \
  -X POST \
  -H "Authorization: Token e9282e56c83f93eb077043e5ad8b6cf5b3ff7568" \
  -H "content-type: application/json" \
  --data '{"number":"5041721011111111","shaba":"IR111111111111111111111111","bank":"رسالت"}'
```

```plaintext
http POST https://api.nobitex.ir/users/accounts-add \
  number=5041721011111111 shaba=IR111111111111111111111111 bank=رسالت
```

> در صورت فراخوانی درست، پاسخ به این صورت خواهد بود:

```json
{
    "status": "ok"
}
```

برای افزودن حساب بانکی جدید از این نوع درخواست استفاده نمایید:

- آدرس : `POST /users/accounts-add`

- پارامترها :

پارامتر     | نوع    | پیش‌فرض   |   توضیحات     | نمونه
----------- | ----   | ------   |   ---------   | -----
number      | string |  الزامی  |    شماره کارت | `5041721011111111`
shaba       | string |  الزامی  |   شماره شبا   | `IR111111111111111111111111`
bank        | string |  الزامی  |    نام بانک   | `رسالت`

<aside class="notice">
محدودیت فراخوانی : 5 درخواست در ساعت
</aside>


##محدودیت های کاربر 

```shell
curl 'https://api.nobitex.ir/users/limitations' \
  -X POST \
  -H "Authorization: Token e9282e56c83f93eb077043e5ad8b6cf5b3ff7568" \
  -H "content-type: application/json" \
```

```plaintext
http POST https://api.nobitex.ir/users/limitations
```

> در صورت فراخوانی درست، پاسخ به این صورت خواهد بود:

```json
{
  "status": "ok",
  "limitations": {
    "userLevel": "level2",
    "features": {
      "crypto_trade": false,
      "rial_trade": false,
      "coin_deposit": false,
      "rial_deposit": false,
      "coin_withdrawal": false,
      "rial_withdrawal": false
    },
    "limits": {
      "withdrawRialDaily": {
        "used": "0",
        "limit": "900000000"
      },
      "withdrawCoinDaily": {
        "used": "0",
        "limit": "2000000000"
      },
      "withdrawTotalDaily": {
        "used": "0",
        "limit": "2000000000"
      },
      "withdrawTotalMonthly": {
        "used": "0",
        "limit": "30000000000"
      }
    }
  }
}
```
### توضیحات
- کاربران در نوبیتکس بر اساس سطح کاربری خود، محدودیت هایی در برداشت، واریز و مبادلات خود دارند. هر کاربر نسبت به نیاز خود و میزان مبادلاتی که دارد میتواند با ارائه مدارک مورد نیاز ، سطح کاربری خود را پس از احراز هویت و تایید مدراک، ارتقا دهد. اطلاعات نمایش داده شده در خروجی api شامل همین محدودیت ها میباشد:
برای دریافت محدودیت های کاربر از این نوع درخواست استفاده نمایید:

- آدرس : `POST /users/limitations`

### شرح ورودی
- در این بخش به ورودی نیاز نیست.
- توکن دریافتی از بخش لاگین باید در هدر ارسال شود.


### شرح خروجی
### features: شرایط حساب کاربری
- crypto_trade: امکان مبادله رمز ارزها
- rial_trade: امکان مبادله با ریال
- coin_deposit: امکان واریز رمز ارز به کیف پول نوبیتکس
- rial_deposit: امکان واریز ریال به کیف پول نوبیتکس
- coin_withdrawal: امکان برداشت رمز ارز از کیف پول نوبیتکس به کیف پول دیگر
- rial_withdrawal: امکان برداشت ریال از کیف پول نوبیتکس به حساب بانکی

### limits: محدودیت های حساب کاربری
#### تمامی واحد ها به ریال هستند
- withdrawRialDaily: مقدار مجاز برای برداشت روزانه ریال 
- withdrawRialDaily: مقدار مجاز برای برداشت روزانه رمز ارز 
- withdrawTotalDaily: مقدار مجاز برای برداشت روزانه مجموع رمز ارز و ریال 
- withdrawTotalMonthly: مقدار مجاز برای برداشت ماهیانه مجموع رمز ارز و ریال 

برای اطلاع از جزئیات سطوح کاربری، میزان محدودیت ها، مدارک مورد نیاز هر سطح و توضیحات کامل هر سطح به [سطوح حساب کاربری در نوبیتکس](https://nobitex.net/policies/user-levels/) مراجعه کنید.
#کیف پول‌های کاربر

## لیست کیف پول ها

```shell
curl 'https://api.nobitex.ir/users/wallets/list' \
  -X POST \
  --header "Authorization: Token e9282e56c83f93eb077043e5ad8b6cf5b3ff7568"
```

```plaintext
http POST https://api.nobitex.ir/users/wallets/list \
  Authorization=Token e9282e56c83f93eb077043e5ad8b6cf5b3ff7568
```

> در صورت فراخوانی درست، پاسخ به این صورت خواهد بود:

```json
{
    "status": "ok",
    "wallets": [
        {
            "activeBalance": "10.2649975000",
            "blockedBalance": "0",
            "user": "name@example.com",
            "currency": "ltc",
            "id": 4159,
            "balance": "10.2649975000",
            "rialBalance": 51322935,
            "rialBalanceSell": 52507310,
            "depositAddress": null
        },
        ...  
    ]
}
```

برای دریافت لیست کیف پول های کاربر از این نوع درخواست استفاده نمایید:

- آدرس : `POST /users/wallets/list`

##موجودی 

```shell
curl 'https://api.nobitex.ir/users/wallets/balance' \
  -X POST \
  --header "Authorization: Token e9282e56c83f93eb077043e5ad8b6cf5b3ff7568" \
  --data '{"currency":"ltc"}'
```

```plaintext
http POST https://api.nobitex.ir/users/wallets/balance \
  currency=ltc
```

> در صورت فراخوانی درست، پاسخ به این صورت خواهد بود:

```json
{
    "balance": "10.2649975000",
    "status": "ok"
}
```

برای دریافت موجودی کیف پول های خود در نوبیتکس (شامل کیف پول ریالی و کیف پول های رمز ارزی) از این نوع درخواست استفاده نمایید:

- آدرس : `POST /users/wallets/balance`

- پارامترها :

پارامتر     | نوع    | پیش‌فرض   |      توضیحات     | نمونه
----------- | ----   | ------   |   ---------      | -----
currency    | string |   الزامی | نوع کیف پول(ارز) | `ltc`


<aside class="notice">
مقدار بازگشتی برای موجودی، یک عدد است که به صورت string برگردانده میشود. این مقدار می‌تواند اعداد اعشاری زیادی داشته باشد.
</aside>

<aside class="notice">
اگر قصد محاسبات مهمی بر روی این اعداد را دارید، پیشنهاد ما این است که از انواع fixed precision برای نگهداری این اعداد استفاده کنید. 
</aside>



## لیست تراکنش‌ها

```shell
curl 'https://api.nobitex.ir/users/wallets/transactions/list' \
  -X POST \
  -H "Authorization: Token e9282e56c83f93eb077043e5ad8b6cf5b3ff7568" \
  -H "content-type: application/json" \
  --data '{"wallet":"4159"}'
```

```plaintext
http POST https://api.nobitex.ir/users/wallets/transactions/list \
  wallet=4159
```

> در صورت فراخوانی درست، پاسخ به این صورت خواهد بود:

```json
{
    "transactions": [
        {
            "currency": "ltc",
            "created_at": "2018-10-17T09:41:08.519151+00:00",
            "calculatedFee": "0",
            "id": 99050,
            "amount": "4.3802000000",
            "description": "خرید 4.400 LTC به قیمت واحد ﷼7450000"
        },
        {
            "currency": "ltc",
            "created_at": "2018-10-04T13:05:01.384902+00:00",
            "calculatedFee": "0",
            "id": 96541,
            "amount": "-1.0000000000",
            "description": "Withdraw to \"Lgn1zc77mEjk72KvXPqyXq8K1mAfcDE6YR\""
        },
        ...
    ],
    "status": "ok"
}
```

برای دریافت آخرین آمار بازار نوبیتکس از این نوع درخواست استفاده نمایید:

- آدرس : `POST /users/wallets/transactions/list`

- پارامترها :

پارامتر     | نوع    | پیش‌فرض   |       توضیحات     | نمونه
----------- | ----   | ------   |   ---------       | -----
wallet      | int    |   الزامی | شناسه کیف پول(id) | `4159`

## لیست واریزها و برداشت‌ها

```shell
curl 'https://api.nobitex.ir/users/wallets/deposits/list' \
  -X POST \
  -H "Authorization: Token e9282e56c83f93eb077043e5ad8b6cf5b3ff7568" \
  -H "content-type: application/json" \
  --data '{"wallet":"4159"}'
```

```plaintext
http POST https://api.nobitex.ir/users/wallets/deposits/list \
  wallet=4159
```

> در صورت فراخوانی درست، پاسخ به این صورت خواهد بود:

```json
{
    "status": "ok",
    "deposits": [
        {
            "txHash": "c5d84268a0bf02307b5a0460a68b61987a9b3009d3a82a817e41558e619ec1d2",
            "address": "32KfyTNh162UoKithfDrWHZPYq5uePGmf7",
            "confirmed": true,
            "transaction": {
                "id": 10,
                "amount": "3.0000000000",
                "currency": "btc",
                "description": "Deposit - address:36n452uGq1x4mK7bfyZR8wgE47AnBb2pzi, tx:c5d84268a0bf02307b5a0460a68b61987a9b3009d3a82a817e41558e619ec1d2",
                "created_at": "2018-11-06T03:56:18+00:00",
                "calculatedFee": "0"
            },
            "currency": "Bitcoin",
            "blockchainUrl": "https://btc.com/c5d84268a0bf02307b5a0460a68b61987a9b3009d3a82a817e41558e619ec1d2",
            "confirmations": 2,
            "requiredConfirmations": 3,
            "amount": "3.0000000000"
        }
    ],
    "withdraws": [
      {
            "id": 2398,
            "blockchain_url": "https://live.blockcypher.com/ltc/tx/c1ed4229e598d4cf81e99e79fb06294a70af39443e2639e22c69bc30d6ecda67/",
            "is_cancelable": false,
            "status": "Done",
            "amount": "1.0000000000",
            "createdAt": "2018-10-04T12:59:38.196935+00:00",
            "wallet_id": 4159,
            "currency": "ltc",
            "address": "Lgn1zc77mEjk72KvXPqyXq8K1mAfcDE6YR"
        }
    ]
}
```

برای دریافت لیست واریزها و برداشت‌ها از این نوع درخواست استفاده نمایید:

- آدرس : `POST /users/wallets/deposits/list`

- پارامترها :

پارامتر     | نوع    | پیش‌فرض   |       توضیحات     | نمونه
----------- | ----   | ------   |   ---------       | -----
wallet      | string |   all    | شناسه کیف پول(id) | `4159`

## تولید آدرس بلاکچین 

```shell
curl 'https://api.nobitex.ir/users/wallets/generate-address' \
  -X POST \
  -H "Authorization: Token e9282e56c83f93eb077043e5ad8b6cf5b3ff7568" \
  -H "content-type: application/json" \
  --data '{"wallet":"4159"}'
```

```plaintext
http POST https://api.nobitex.ir/users/wallets/generate-address \
  wallet=4159
```

> در صورت فراخوانی درست، پاسخ به این صورت خواهد بود:

```json
{
    "status": "ok",
    "address": "LRf3vuTMy4UwD5b72G84hmkfGBQYJeTwUs"
}
```

برای تولید آدرس بلاکچین از این نوع درخواست استفاده نمایید:

- آدرس : `POST /users/wallets/generate-address`

- پارامترها :

پارامتر     | نوع    | پیش‌فرض   |       توضیحات     | نمونه
----------- | ----   | ------   |   ---------       | -----
wallet      | string |  الزامی  | شناسه کیف پول(id) | `4159`

<aside class="notice">
محدودیت فراخوانی : 6 درخواست در ساعت
</aside>


#بازار 

## سفارش جدید

```shell
curl 'https://api.nobitex.ir/market/orders/add' \
  -X POST \
  -H "Authorization: Token e9282e56c83f93eb077043e5ad8b6cf5b3ff7568" \
  -H "content-type: application/json" \
  --data '{"type":"buy","srcCurrency":"btc","dstCurrency":"rls","amount":"0.6","price":520000000}'
```

```plaintext
http POST https://api.nobitex.ir/market/orders/add \
  type=buy srcCurrency=btc dstCurrency=rls amount=0.6 price=520000000
```

> در صورت فراخوانی درست، پاسخ به این صورت خواهد بود:

```json
{
    "status": "ok", 
    "order": {
        "type": "sell", 
        "srcCurrency": "Bitcoin", 
        "dstCurrency": "ریال", 
        "price": "520000000", 
        "amount": "0.6", 
        "totalPrice": "312000000.0", 
        "matchedAmount": 0, 
        "unmatchedAmount": "0.6", 
        "isMyOrder": false, 
        "id": 25, 
        "status": "Active", 
        "partial": false, 
        "fee": 0, 
        "user": "name@example.com", 
        "created_at": "2018-11-28T11:36:13.592827+00:00"
    }
}
```

برای سفارش گذاری از این نوع درخواست استفاده نمایید:

- آدرس : `POST /market/orders/add`

- پارامترها :

پارامتر     | نوع    | پیش‌فرض   |   توضیحات     | نمونه
----------- | ----   | ------   |   ---------   | -----
type        | string |  الزامی  |     نوع سفارش | `buy` یا `sell`
execution   | string | `market` |   نحوه سفارش  | ‍‍‍`market` یا `limit`
srcCurrency | string |  الزامی  |    ارز مبدا   | `btc`
dstCurrency | string |  الزامی  |    ارز مقصد   | `rls`
amount      | string |  الزامی  |       مقدار   | `0.6`
price       | int    |  الزامی  |   قیمت واحد   | `520000000`

- خطاها :

در بعضی شرایط امکان دارد به شما خطا پاسخ داده شود. این خطاها در فیلد error برگردانده میشوند.

خطا         | توضیحات 
----------- | ------------------   
OverValueOrder|این خطا زمانی رخ میدهد که میزان سفارش(مقدار فیلد amount) از موجودی شما در کیف پول نوبیتکس کمتر باشد
InvalidMarketPair|این خطا زمانی برگردانده میشود که ارز مبدا یا ارز مقصد اشتباه وارد شده باشد
TradingUnavailable |این خطا زمانی برگردانده میشود که کاربر به دلیلی محدود شده باشد
TradeLimitation |این خطا زمانی برگردانده میشود که سطح کاربری در سطح انجام معامله نیست. این خطا در سطح کاربری ‘تایید نشده’ و ‘0’ میتواند رخ دهد
SmallOrder      |این خطا زمانی رخ می دهد که ارزش کل معامله (مقدار فیلد totalPrice) برای ارز مقصد ریال، کمتر از 1 میلیون ریال و برای ارز مقصد تتر، کمتر از 11 تتر باشد


<aside class="notice">
برای ثبت سفارش سریع(مارکت)، مقدار پارامتر 'execution' باید برابر '‍market' باشد.
</aside>

<aside class="notice">
محدودیت فراخوانی : 100 درخواست در 10 دقیقه
</aside>


## وضعیت سفارش 

```shell
curl 'https://api.nobitex.ir/market/orders/status' \
  -X POST \
  -H "Authorization: Token e9282e56c83f93eb077043e5ad8b6cf5b3ff7568" \
  -H "content-type: application/json" \
  --data '{"id":5684}'
```

```plaintext
http POST https://api.nobitex.ir/market/orders/status \
  id=5684
```

> در صورت فراخوانی درست، پاسخ به این صورت خواهد بود:

```json
{
    "status": "ok",
    "order": {
        "unmatchedAmount": "3.0000000000", 
        "fee": "0E-10", 
        "matchedAmount": "0E-10", 
        "partial": false, 
        "price": "8500000.0000000000", 
        "created_at": "2018-11-28T12:25:22.696029+00:00", 
        "user": "name@example.com", 
        "id": 5684, 
        "srcCurrency": "Litecoin", 
        "totalPrice": "25500000.00000000000000000000", 
        "type": "sell", 
        "dstCurrency": "\ufdfc", 
        "isMyOrder": false, 
        "status": "Active", 
        "amount": "3.0000000000"
    }
}
```

برای دریافت وضعیت سفارش از این نوع درخواست استفاده نمایید:

- آدرس : `POST /market/orders/add`

- پارامترها :

پارامتر     | نوع    | پیش‌فرض   |   توضیحات     | نمونه
----------- | ----   | ------   |   ---------   | -----
id          | int    |  الزامی  |     شناسه سفارش | ‍‍`5684`


<aside class="notice">
محدودیت فراخوانی : 60 درخواست در 1 دقیقه
</aside>


##به روز رسانی سفارش 

```shell
curl 'https://api.nobitex.ir/market/orders/update-status' \
  -X POST \
  -H "Authorization: Token e9282e56c83f93eb077043e5ad8b6cf5b3ff7568" \
  -H "content-type: application/json" \
  --data '{"order":5684,"status":"canceled"}'
```

```plaintext
http POST https://api.nobitex.ir/market/orders/update-status \
  order=5684 status=canceled
```

> در صورت فراخوانی درست، پاسخ به این صورت خواهد بود:

```json
{
    "status": "ok",
    "updatedStatus": "Canceled"
}
```

برای سفارش گذاری از این نوع درخواست استفاده نمایید:

- آدرس : `POST /market/orders/update-status`

- پارامترها :

پارامتر     | نوع    | پیش‌فرض   |   توضیحات     | نمونه
----------- | ----   | ------   |   ---------   | -----
order       | int    |  الزامی  |     شناسه سفارش | `‍5684‍‍`
status      | string |  الزامی  |    وضعیت جدید   | `canceled`

<aside class="notice">
محدودیت فراخوانی : 100 درخواست در 10 دقیقه
</aside>

<aside class="notice">
مقدار status میتواند از 'new' به 'active' و یا از 'active' به 'cancel' تغییر کند.
در غیر اینصورت، درخواست رد میشود.
</aside>

##لغو سفارش 

```shell
curl 'https://api.nobitex.ir/market/orders/cancel-old' \
  -X POST \
  -H "Authorization: Token e9282e56c83f93eb077043e5ad8b6cf5b3ff7568" \
  -H "content-type: application/json" \
  --data '{"execution":"limit","srcCurrency":"btc","dstCurrency":"rls","hours":2.4}'
```

```plaintext
http POST https://api.nobitex.ir/market/orders/cancel-old \
  execution=limit srcCurrency=btc dstCurrency=rls hours=2.4
```

> در صورت فراخوانی درست، پاسخ به این صورت خواهد بود:

```json
{
    "status": "ok",
}
```

برای سفارش گذاری از این نوع درخواست استفاده نمایید:

- آدرس : `POST /market/orders/cancel-old`

- پارامترها :

پارامتر     | نوع    | پیش‌فرض   |   توضیحات     | نمونه
----------- | ----   | ------   |   ---------   | -----
hours        | float |  اختیاری  |    زمان سفارش | 4.2
execution   | string | `market` |   نحوه سفارش  | ‍‍‍`market` یا `limit`
srcCurrency | string |  الزامی  |    ارز مبدا   | `btc`
dstCurrency | string |  الزامی  |    ارز مقصد   | `rls`

- خطاها :

در بعضی شرایط امکان دارد به شما خطا پاسخ داده شود. این خطاها در فیلد error برگردانده میشوند.

<aside class="notice">
مقدار hours در واقع مقدار ساعت قبل از زمان ارسال درخواست میباشد. برای مثال اگر مقدار ساعت '2' ارسال شود، سفارش های 2 ساعت قبل لغو خواهند شد.
</aside>

<aside class="notice">
در صورتی که مقدار hours ارسال نشود، تمامی سفارشات مربوط لغو خواهد شد.
</aside>


# ملاحظات
## راهنمای اشکال‌یابی
* به نوع درخواست دقت کنید، احتمال دارد درخواست از نوع `HTTP POST` باشد و شما از `GET` استفاده کرده باشید.
* آدرس API را مجددا بررسی نمایید. همچنین به وجود یا عدم وجود `/` در انتهای آدرس دقت کنید.

## اعتبارسنجی دو عاملی
در صورتی که اعتبارسنجی دو عاملی (2 Factor Authentication) را برای حساب خود فعال کرده باشید، باید در هنگام استفاده از برخی APIها،
به خصوص در هنگام دریافت توکن از API لاگین، علاوه بر سایر پارامترها، رمز یک‌بار مصرف خود را نیز در هدرهای درخواست به این صورت ارسال نمایید:
`X-TOTP: 123456`.

## محدودیت‌های فراخوانی API
برخی از APIهای نوبیتکس دارای محدودیت تعداد فراخوانی در هر بازه‌ی زمانی هستند. با این حال اگر شما به صورت معمولی و مشابه
استفاده‌ی متداول کاربران از API استفاده کنید، با این محدودیت‌ها مواجه نخواهید شد. محدودیت‌ها به ازای هر API مستقلا محاسبه
و اعمال می‌شوند. محدودیت‌ها معمولا بر اساس آدرس IP درخواست دهنده و در موارد هم بر اساس کاربر (توکن) درخواست دهنده می‌باشند.
در حالتی که به حد مجاز تعداد فراخوانی یک API رسیده باشید، پاسخ آن API به شما یک پیام خطا با کد 403 و دارای توضیحات مشخص
در خصوص آن محدودیت خواهد بود.

در صورتی که به صورت موردی یا در حین تست کد خود به محدودیتی برخورد کردید، می‌توانید با
منتظر ماندن (بین یک ساعت تا یک روز) آن محدودیت را برطرف کنید و دوباره امکان استفاده از API مد نظرتان را داشته باشید. اگر به
صورت مداوم به محدودیتی برای یک API برخورد می‌کنید و فکر می‌کنید که بهتر است تعداد فراخوانی مجاز آن API افزایش یابد، حتما با
ایجاد یک مورد در گیت‌هاب ([لینک ایجاد مورد](https://github.com/nobitex/docs-api/issues/new)) مسئله را با ما مطرح نمایید.

## توضیح پیام‌های خطا
کد HTTP | توضیحات
---------- | -------
400 | Bad Request -- پارامترهای درخواست نادرست یا ناکافی است
403 | Forbidden -- انجام این عملیات مجاز نمی‌باشد
404 | Not Found -- آدرس یا شی مد نظر وجود ندارد
500 | Internal Server Error -- مشکلی به صورت موقت در سرور نوبیتکس رخ داده است

# دریافت api‌ها با استفاده از postman

برای سهولت تست و استفاده از api‌ها میتوانید از لینک زیر وارد سایت postman شوید و api‌ها را یکجا دریافت و تست فرمایید.

 [لینک apiها](https://documenter.getpostman.com/view/5722122/Szmcayjw?version=latest)

