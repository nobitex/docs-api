---
title: مستندات API نوبیتکس
lang: fa
language_tabs:
  - shell
  - plaintext
includes:
  - referral
  - general_notes
  - faq
  - deprecated
toc_footers:
  - <a href='https://github.com/nobitex/docs-api'>مخزن گیت هاب</a>
  - <a href='https://nobitex.ir/'>سایت نوبیتکس</a>
  - <a href='https://documenter.getpostman.com/view/5722122/Szmcayjw?version=latest'>کالکشن Postman</a>
---

# مستندات API نوبیتکس

##ساختار API
به نوبیتکس و مستندات توسعه دهندگان خوش آمدید.

این مستندات و توضیحات، نحوه عملکرد APIهای تهیه شده برای اطلاعات بازار، اطلاعات مالی و دیگر عملکردهای موجود در نوبیتکس که برای توسعه دهندگان آماده شده است را بیان میکند.

توجه داشته باشید بعضی از APIها نیاز به احراز هویت و دریافت توکن دارد که میتوانید از بخش لاگین نحوه عملکرد آن را مطالعه کنید.



پس از احراز هویت و دریافت توکن، شما می توانید از همه APIها استفاده نمائید.
<aside class="info">
برای دریافت توکن میتوانید به دو روش عمل کنید:

- دریافت توکن از طریق متد [Login](#login)
- دریافت توکن از طریق منوی تنظیمات در پنل کاربری
</aside>

<aside class="warning">
<b>به هیچ عنوان توکن احراز هویت خود را در اختیار دیگران قرار ندهید.</b>
<br>
اگر این توکن به صورت تصادفی در اختیار دیگران قرار گرفت سریعا logout کرده و اقدام به دریافت توکن جدید کنید.
</aside>

برای استفاده آسان و راحت تر از apiها کالکشن Postman تهیه شده است.


می‌توانید از
 <a target="_blank" rel="nofollow" href="https://documenter.getpostman.com/view/5722122/Szmcayjw?version=latest">اینجا</a>
 این بسته را دریافت و شروع به کار کنید

این راه بهترین روش برای شروع به کار سریع با apiها برای کاربران جدید است.


## محدودیت ها
توجه داشته باشید، برای استفاده برخی از APIها محدودیت هایی وجود دارد که در قسمت توضیحات هر کدام از APIها این موارد ذکر شده است.


##راهنمای حل مشکلات
در صورت وجود ابهام یا مشکلی در استفاده از APIها ابتدا ملاحظات عمومی و سوالات متداول را بررسی و در صورتی که مشکل شما برطرف نگردید میتوانید در
<a href="https://github.com/nobitex/docs-api" target="_blank">مخزن گیت‌هاب مستندات نوبیتکس API</a>
مورد (issue) جدیدی را ایجاد نمایید یا مستقیما روی <a href="https://github.com/nobitex/docs-api/issues/new" target="_blank">این لینک</a> کلیک کنید و مشکل مد نظرتان را با ما در میان بگذارید.


<aside class="warning">
مستندات API در حال توسعه می باشد و ممکن است فرمت درخواست‌ها و پاسخ‌ها دچار تغییر شوند .لطفا در موارد حساس ملاحظات لازم را در نظر بگیرید
</aside>



در ادامه اجزای اصلی API نوبیتکس توضیح داده شده‌اند.



<h1 id="login">احراز هویت</h1>

##  ورود (دریافت توکن)
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
    "status": "success",
    "key": "db2055f743c1ac8c30d23278a496283b1e2dd46f",
    "device": "AlRyansW"
}
```

دریافت توکن به صورت خودکار و با ارسال درخواست به `/auth/login/` صورت می‌گیرد. این تنها APIی است که نیاز دارید
به آن نام کاربری و رمز عبور خود را ارسال کنید. تمامی دیگر APIها از توکن به جای رمز عبور برای احراز هویت استفاده می‌کنند.
توکن‌های صادر شده بعد از چهار ساعت منقضی می‌شوند و باید مجددا با ارسال درخواست لاگین، توکن جدیدی دریافت کنید.
در صورتی که نیاز به ایجاد توکن‌های بلند مدت دارید، از پارامتر `remember=yes` استفاده کنید تا توکن ایجاد شده به مدت سی
روز معتبر بماند.
توجه داشته باشید، در صورتی که احراز هویت دو مرحله ای را فعال کرده باشید، می بایست رمز یکبارمصرف را نیز ارسال نمائید. توضیحات دقیق تر را <a href="#dbf936619c">از اینجا</a> مطالعه فرمائید.



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

<aside class="notice">
در صورت مشکل در دریافت توکن، میتونید از توکن‌‌های ماهانه موجود در تنظیمات پروفایل خود استفاده کنید.
</aside>

## خروج (سوزاندن توکن)
> برای خروج یا سوزاندن توکن، از این کد استفاده کنید:

```shell
curl -X POST 'https://api.nobitex.ir/auth/logout/' \
--header 'Authorization: Token yourTOKENhereHEX0000000000'
```

```plaintext
POST /auth/logout/ HTTP/1.1
Host: api.nobitex.ir
Authorization: Token yourTOKENhereHEX0000000000
```

> در صورت فراخوانی درست، پاسخ به این صورت خواهد بود:

```json
{
    "detail": "خروج با موفقیت انجام شد.",
    "message": "خروج با موفقیت انجام شد."
}
```

- آدرس : `/POST /auth/logout `


# اطلاعات بازار (عمومی)
##لیست سفارشات

```shell
curl 'https://api.nobitex.ir/v2/orderbook/BTCIRT'
```

```plaintext
http GET https://api.nobitex.ir/v2/orderbook/BTCIRT
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

- آدرس : `GET /v2/orderbook/SYMBOL`

- پارامترها :

پارامتر     | نوع    | پیش‌فرض   |  توضیحات   | نمونه
----------- | ----   | ------   | ---------  | -----
symbol | string |   الزامی | نماد | `BTCIRT`


<aside class="notice">
محدودیت فراخوانی : 60 درخواست در دقیقه
</aside>
<aside class="notice">
خروجی شامل دو آرایه asks و bids بوده که در هر یک قیمت و مقدار سفارش‌های بازار وجود دارد.
</aside>
<aside class="notice">
در این api نیاز به توکن وجود ندارد.
</aside>
<aside class="notice">
لیست نمادهای بازار ها عبارتنداز :BTCIRT، ETHIRT، LTCIRT، XRPIRT، BCHIRT، BNBIRT، EOSIRT،  XLMIRT، ETCIRT،‌ TRXIRT ،USDTIRT، BTCUSDT، ETHUSDT، LTCUSDT، XRPUSDT، BCHUSDT، BNBUSDT، EOSUSDT، XLMUSDT، ETCUSDT، TRXUSDT
که می بایست یکی از این نمادها را به صورت پارامتر با نام symbol به آدرس api ارسال و استفاده نمائید
</aside>

## لیست معاملات

```shell
curl 'https://api.nobitex.ir/v2/trades/BCHIRT'
```

```plaintext
http GET https://api.nobitex.ir/v2/trades/BCHIRT
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

- آدرس : `GET v2/trades/SYMBOL `

- پارامترها :

پارامتر     | نوع    | پیش‌فرض   |  توضیحات   | نمونه
----------- | ----   | ------   | ---------  | -----
symbol | string |   الزامی | نماد | `BTCIRT`


<aside class="notice">
محدودیت فراخوانی : 15 درخواست در دقیقه
</aside>
<aside class="notice">
در این api نیاز به توکن وجود ندازد.
</aside>
<aside class="notice">
لیست نمادهای بازار ها عبارتنداز :BTCIRT، ETHIRT، LTCIRT، XRPIRT، BCHIRT، BNBIRT، EOSIRT،  XLMIRT، ETCIRT،‌ TRXIRT ،USDTIRT، BTCUSDT، ETHUSDT، LTCUSDT، XRPUSDT، BCHUSDT، BNBUSDT، EOSUSDT، XLMUSDT، ETCUSDT، TRXUSDT
که می بایست یکی از این نمادها را به صورت پارامتر با نام symbol به آدرس api ارسال و استفاده نمائید
</aside>
<aside class="notice">
پارامتر بازگشتی time زمان دقیق انجام شدن معامله است که با فرمت <a href="https://fa.wikipedia.org/wiki/%D8%B3%D8%A7%D8%B9%D8%AA_%DB%8C%D9%88%D9%86%DB%8C%DA%A9%D8%B3" target="_blank">یونیکس</a> نمایش داده میشود
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
        }
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
<aside class="warning">
در شی پاسخ جهت سازگاری با نسخه‌های پیشین، آمار بازار بایننس نیز برگردانده می‌شود.
دقت کنید این قسمت از اطلاعات (متناظر با کلید global) منسوخ شده و در نسخه‌های آتی به طور کامل حذف خواهد شد.
توصیه می‌شود جهت دریافت آمار بازار بایینس از <a href="#cdf265d0e6">آمار بازار جهانی</a> استفاده نمایید.
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

- آدرس : `GET /market/udf/history`

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
  -H "Authorization: Token yourTOKENhereHEX0000000000"
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
  -H "Authorization: Token yourTOKENhereHEX0000000000"
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


## افزودن کارت بانکی

```shell
curl 'https://api.nobitex.ir/users/cards-add' \
  -X POST \
  -H "Authorization: Token yourTOKENhereHEX0000000000" \
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
  -H "Authorization: Token yourTOKENhereHEX0000000000" \
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
number      | string |  الزامی  |    شماره حساب | `5041721011111111`
shaba       | string |  الزامی  |   شماره شبا   | `IR111111111111111111111111`
bank        | string |  الزامی  |    نام بانک   | `رسالت`

<aside class="notice">
محدودیت فراخوانی : 5 درخواست در ساعت
</aside>


##محدودیت های کاربر

```shell
curl 'https://api.nobitex.ir/users/limitations' \
  -X GET \
  -H "Authorization: Token yourTOKENhereHEX0000000000" \
  -H "content-type: application/json" \
```

```plaintext
http GET https://api.nobitex.ir/users/limitations
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
#اطلاعات مالی کاربر

## لیست کیف پول ها

```shell
curl 'https://api.nobitex.ir/users/wallets/list' \
  -X POST \
  --header "Authorization: Token yourTOKENhereHEX0000000000"
```

```plaintext
http POST https://api.nobitex.ir/users/wallets/list \
  Authorization=Token yourTOKENhereHEX0000000000
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

<aside class="notice">
    در برخی از موارد به دلیل کنترل بار ترافیک ورودی این سرویس، ممکن است پاسخ مورد انتظار دریافت نگردد، در این حالت می بایست مجددا فراخوانی را انجام داد و یا اینکه از <a href="#1ff004071d">این سرویس</a> برای دریافت لیست کیف پول ها استفاده نمائید
</aside>

##لیست کیف پول ها (انتخابی)

```shell
curl 'https://api.nobitex.ir/v2/wallets' \
  -X POST \
  --header "Authorization: Token yourTOKENhereHEX0000000000"
  --data '{"currencies":"rls,btc"}'
```

```plaintext
http POST https://api.nobitex.ir/v2/wallets \
  Authorization=Token yourTOKENhereHEX0000000000
  currencies=rls,btc
```

> در صورت فراخوانی درست، پاسخ به این صورت خواهد بود:

```json
{
    "status": "ok",
    "wallets": {
        "RLS": {
            "id": 133777,
            "balance": "0E-10",
            "blocked": "0"
        },
        "BTC": {
            "id": 133778,
            "balance": "0E-10",
            "blocked": "0"
        }
    }
}
```

برای دریافت لیست کیف پول های کاربر از این نوع درخواست استفاده نمایید:

- آدرس : `POST /v2/wallets`

- پارامترها :

پارامتر     | نوع    | پیش‌فرض   |      توضیحات     | نمونه
----------- | ----   | ------   |   ---------      | -----
currencies  | string |   اختیاری | نوع کیف پول(ارز)، به صورت رشته ای از ارزهای جداشده با کاما | `rls,btc`


##موجودی

```shell
curl 'https://api.nobitex.ir/users/wallets/balance' \
  -X POST \
  --header "Authorization: Token yourTOKENhereHEX0000000000" \
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
  -H "Authorization: Token yourTOKENhereHEX0000000000" \
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
  -H "Authorization: Token yourTOKENhereHEX0000000000" \
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
  -H "Authorization: Token yourTOKENhereHEX0000000000" \
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

## ثبت سفارش جدید

```shell
curl 'https://api.nobitex.ir/market/orders/add' \
  -X POST \
  -H "Authorization: Token yourTOKENhereHEX0000000000" \
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
        "id": 25,
        "status": "Active",
        "partial": false,
        "fee": 0,
        "user": "name@example.com",
        "created_at": "2018-11-28T11:36:13.592827+00:00"
    }
}
```

> در صورت عدم پذیرش سفارش، پاسخ به این صورت خواهد بود:

```json
{
  "status": "failed",
  "code": "ErrorCode",
  "message": "Human readable error message"
}
```

`POST /market/orders/add`

برای ثبت سفارش معامله در بازار نوبیتکس از این درخواست استفاده نمایید.

ثبت سفارش الزاماً به معنی انجام معامله نیست و بسته به نوع و قیمت سفارش و وضعیت لحظه‌ای بازار ممکن است معامله انجام شود یا نشود. با درخواست «وضعیت سفارش» می‌توانید از وضعیت سفارش خود مطلع شوید.

سفارش‌ها پس از ثبت، پیش از ورود به دفتر معاملاتی و انجام معامله، مجدداً از نظر اعتبار مورد بررسی قرار گرفته و در صورت نامعتبر بودن، به وضعیت «رد شده» برده خواهند شد. به همین علت در صورتی که سفارش‌های شما ثبت می‌شود ولی بلافاصله به وضعیت «رد شده» تغییر حالت پیدا می‌کنند، پارامترهای ارسالی خود به ویژه مقدار و قیمت سفارش و موجودی حساب خود را دقیق‌تر بررسی نمایید.

### پارامترهای ورودی

پارامتر     | نوع    | پیش‌فرض   |   توضیحات     | نمونه
----------- | ----   | ------   |   ---------   | -----
type        | string |  الزامی  |     نوع سفارش | `buy` یا `sell`
execution   | string | الزامی |   نحوه‌ی اجرای سفارش  | ‍‍‍`market` یا `limit`
srcCurrency | string |  الزامی  |    رمزارز مبدا   | `btc` یا `eth` یا `xrp` یا ...
dstCurrency | string |  الزامی  |    رمزارز مقصد   | `rls` یا `usdt`
amount      | monetary |  الزامی  |       مقدار رمزارز (حجم)   | `0.0623`
price       | monetary | الزامی  |   قیمت واحد   | `1210000000`

### حالت‌های خطا
در صورتی که درخواست ثبت سفارش معتبر نباشد، ممکن است یکی از این خطاها برگردانده شود. در صورت دریافت هر یک از این خطاها، آن سفارش شما ثبت نشده است و در صورت تمایل باید درخواست ثبت آن سفارش را دوباره ارسال کنید.

کد خطا  |  توضیحات
-------- | ---------
InvalidOrderPrice | قیمت سفارش (price) تعیین نشده یا اشتباه است
BadPrice | قیمت تعیین شده برای سفارش نسبت به قیمت فعلی بازار تفاوت زیادی دارد. قیمت سفارش خود را در بازه‌ی ۳۰٪ قیمت کنونی بازار تعیین کنید.
InvalidExecutionType | نوع:مارکت/لیمیت اجرای سفارش (execution) تعیین نشده یا اشتباه است.
InvalidOrderType | نوع:خرید/فروش سفارش (type) تعیین نشده یا اشتباه است.
OverValueOrder | مقدار سفارش فروش (amount) یا ارزش کل سفارش خرید (amount*price) از موجودی کیف پول نوبیتکس شما کمتر است.
SmallOrder | حداقل ارزش معامله رعایت نشده است. حداقل ارزش معامله برای بازارهای ریالی، یک میلیون ریال و برای بازارهای تتری، ۱۱ تتر است و مبلغ کل سفارش (amount*price) باید بیشتر از این حداقل باشد.
DuplicateOrder | سفارشی با همین مشخصات توسط کاربر شما در بازه زمانی ده ثانیه اخیر ارسال شده است.
InvalidMarketPair | رمزارز مبدا (srcCurrency) یا رمزارز مقصد (dstCurrency) به درستی مقداردهی نشده است یا چنین بازاری در نوبیتکس وجود ندارد.
MarketClosed | بازار مد نظر در حال حاضر به صورت موقت بسته است.
TradingUnavailable | کاربر اجازه‌ی معامله ندارد، فرآیند احراز هویت خود را تکمیل نمایید.
TradeLimitation | سقف معاملات کاربر به اتمام رسیده است، فرآیند احراز هویت خود را تکمیل نمایید.

### نکات و ملاحظات
1. **محدودیت فراخوانی:** ۱۰۰ درخواست در هر ۱۰ دقیقه
1. **واحدها:** واحد قیمت در بازارهای ریالی به ریال (و نه تومان) می‌باشد. واحد قیمت در بازارهای تتری نیز تتر می‌باشد. واحد پارامتر مقدار (amount) بر حسب رمزارز مبدا (srcCurrency) است.
1. **سفارش مارکت:** برای ثبت سفارش سریع (سفارش مارکت، سفارش به قیمت بازار)، مقدار پارامتر `execution` را برابر `market` ارسال نمایید. منظور از سفارش مارکت سفارشی است که کاربر درخواست دارد تا به بهترین قیمت موجود بازار مورد انجام قرار گیرد. [ℹB](https://www.binance.vision/tutorials/what-is-a-market-order) - [ℹI](https://www.investopedia.com/terms/m/marketorder.asp)
1. **تعیین محدوده مورد انتظار قیمت:** در سفارش‌های مارکت به شدت توصیه می‌شود که پارامتر `price` را نیز مشخص نمایید. این پارامتر در سفارش مارکت تخمین شما از قیمت بازار را نمایش می‌دهد و باعث می‌شود سفارش شما تنها تا جایی پر شود که قیمت معامله در بازه‌ی قیمتی مشخص شده باشد. برای نمونه اگر نوع سفارش خرید مارکت باشد و قیمت ۱۰۰ میلیون تومان تعیین شود، تنها تا جایی در بازار range کشیده می‌شود که قیمت زیر ۱۰۱ میلیون تومان باشد. برای پیش‌گیری از معاملات با قیمت ناخواسته به علت نوسانات دفعی بازار، پیشنهاد می‌شود که حتماً قیمت تقریبی مد نظر خود را در سفارش‌های مارکت نیز ارسال کنید. با این حال اگر اطمینان به کد خود و تبعات احتمالی این موضوع دارید، می‌توانید پارامتر `price` را اصلاً ارسال ننمایید که در این شرایط معامله با قیمت لحظه‌ای بازار جهانی، به هر میزان که باشد تا بازه نوسان ۱٪، انجام خواهد شد.
1. **سفارش تکراری:** برای جلوگیری از ثبت سفارش تکراری ناشی از اختلالات شبکه و سرور، در صورتی که دو یا چند سفارش با پارامترهای ورودی کاملاً مشابه از جمله نوع و قیمت و مقدار، در بازه‌ی زمانی کمتر از ده ثانیه ارسال نمایید، تنها سفارش اول پذیرفته می‌شود و باقی درخواست‌های مشابه تا ده ثانیه پیام خطای `DuplicateOrder` دریافت می‌کنند. (غیرفعال در حالت Pro)
1. **دقت مقادیر پولی (monetary):** نوع monetary که در پارامترهای `amount` و `price` به کار می‌رود، بسته به بازار هر رمزارز، تعداد رقم اعشار متغیری بین ۰ تا ۸ رقم دارد. در صورت ارسال مقادیر با ارقام اعشاری بیشتر، ارقام بی‌معنی حذف (به پایین گرد) خواهند شد.<br>مشاهده جدول دقت‌ها

## وضعیت سفارش

```shell
curl 'https://api.nobitex.ir/market/orders/status' \
  -X POST \
  -H "Authorization: Token yourTOKENhereHEX0000000000" \
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

- آدرس : `POST /market/orders/status`

- پارامترها :

پارامتر     | نوع    | پیش‌فرض   |   توضیحات     | نمونه
----------- | ----   | ------   |   ---------   | -----
id          | int    |  الزامی  |     شناسه سفارش | ‍‍`5684`


<aside class="notice">
محدودیت فراخوانی : 60 درخواست در 1 دقیقه
</aside>

### نکات و ملاحظات
**انواع مقادیر `status`:**

* Active: سفارش مقدار پر نشده (`unmatched_amount`) برای شرکت در معاملات دارد و در بازار فعال است.
* Done: سفارش تماما معامله شده است.
* Inactive: سفارش توقف هنوز به محدوده قیمت تعیین شده نرسیده و غیرفعال است.
* Canceled: سفارش پیش از پر شدن کامل توسط کاربر یا سامانه لغو شده است.
سفارش به چند دلیل می‌تواند توسط سامانه لغو شود:
  * مقدار سفارش کافی در بازار در بازه ۱٪ قیمت تعیین شده برای پر کردن سفارش وجود نداشته است.
  * موجودی کیف پول کاربر از طریق سایر تراکنش‌ها کاهش یافته است و از موجودی لازم برای پر شدن معامله کمتر شده است.

## فهرست سفارش‌های کاربر


```shell
curl 'https://api.nobitex.ir/market/orders/list' \
  -X POST \
  -H "Authorization: Token yourTOKENhereHEX0000000000" \
  -H "content-type: application/json" \
  --data '{"srcCurrency":"btc","dstCurrency":"usdt","details":2}'
```

```plaintext
http POST https://api.nobitex.ir/market/orders/list \
  srcCurrency=btc dstCurrency=usdt details=2
```

> در صورت فراخوانی درست، پاسخ به این صورت خواهد بود:

```json
{
  "status": "ok",
  "orders": [
    {
      "id": 173546223,
      "type": "sell",
      "execution": "Limit",
      "status": "Active",
      "srcCurrency": "Bitcoin",
      "dstCurrency": "Tether",
      "price": "9750.01",
      "amount": "0.0123",
      "matchedAmount": "0E-10",
      "averagePrice": "0",
      "fee": "0E-10"
    }
  ]
}
```

`POST /market/orders/list`

برای دریافت فهرست سفارش‌های خود، از این درخواست استفاده نمایید.

### پارامترهای ورودی
پارامتر     | نوع    | پیش‌فرض   |   توضیحات     | نمونه
----------- | ----   | ------   |   ---------   | -----
status | string | `open` | وضعیت سفارش | `all` یا `open` یا `done` یا `close`
type | string | تمام انواع سفارش | نوع سفارش‌های مد نظر، خرید یا فروش | `sell` یا `buy`
srcCurrency | string | تمام رمزارزها | رمزارز مبدا | `btc` یا `eth` یا `xrp` یا ...
dstCurrency | string |  تمام رمزارزها  |    رمزارز مقصد   | `rls` یا `usdt`
details | int | `1` | میزان جزئیات پاسخ، اعداد بزرگ‌تر تعداد فیلدهای بیشتری را از وضعیت هر سفارش بازمی‌گرداند | `1` یا `2`

### پارامترهای پاسخ
پارامتر | نوع | توضیحات | نمونه
---- | ---- | ---- | ----
orders | list of Order | فهرست سفارش‌های کاربر | `[{...Order...}, ...]`

### شی Order
فیلد | نوع | توضیحات | نمونه
---- | ---- | ---- | ----
type | string | نو ع خرید یا فروش سفارش | `buy` یا `sell`
execution | string | نوع اجرای سفارش | `Limit` یا `Market`
srcCurrency | string | رمزارز مبدا سفارش | `Bitcoin` یا `Ethereum` یا `TRON` یا ...
dstCurrency | string | رمزارز مقصد سفارش | `﷼` یا `Tether`
price | monetary | قیمت ثبت شده برای سفارش | `2900000000` یا `market`
amount | monetary | مقدار ثبت شده برای سفارش | `0.023324`
matchedAmount | monetary | مقدار پر شده از سفارش | `0.012001`

همچنین در صورتی که پارامتر `details=2` باشد این فیلدها نیز برای هر سفارش بازگردانده می‌شود:

فیلد | نوع | توضیحات | نمونه
---- | ---- | ---- | ----
id | int | شناسه سفارش | `180258791`
status | string | وضعیت فعلی سفارش | `New` یا `Active` یا `Done` یا `Canceled`
fee | monetary | کارمزد سفارش تاکنون | `0.00001`
created_at | datetime | تاریخ ایجاد سفارش | `2020-07-15T11:32:38.326809+00:00`
averagePrice | monetary | میانگین قیمت اجرا شده از سفارش | `2899500000`

### نکات و ملاحظات
1. **محدودیت فراخوانی:** ۳۰ درخواست در هر دقیقه
2. در پاسخ حداکثر اطلاعات هزار سفارش بازگردانده می‌شود. با استفاده از پارامترهای ورودی می‌توانید تعداد محدودتری از سفارش‌های خود را دریافت کنید. همچنین پیشنهاد می‌شود که در صورتی که تعداد زیادی سفارش باز دارید، شناسه آن‌ها را در زمان ثبت سفارش دریافت و ذخیره نمایید و به صورت مستقل با استفاده از درخواست «وضعیت سفارش» اطلاعات هر یک را بنا به نیاز به‌روز کنید. همچنین برای اطلاع از معاملات انجام شده خود می‌توانید از درخواست «market/trades/list» استفاده نمایید.
3. منظور از وضعیت Done سفارشی است که به صورت صد در صد اجرا شده باشد. ممکن است سفارش شما به تدریج اجرا شود، و در این حالت وضعیت آن کماکان Active می‌ماند. از فیلد matchedAmount برای تشخیص وضعیت اجرا و پر شدن سفارش استفاده کنید. همچنین ممکن است سفارش شما قبل از اجرای کامل، به دلیل درخواست «لغو سفارش» یا کمبود موجودی یا تغییر شدید قیمت بازار (در سفارش‌های مارکت) لغو شود که در این حالت وضعیت آن Canceled خواهد بود، به این معنی که به صورت صد در صد اجرا نشده است ولی می‌تواند مقدار matchedAmount آن بزرگ‌تر از صفر باشد.

## به روز رسانی سفارش

```shell
curl 'https://api.nobitex.ir/market/orders/update-status' \
  -X POST \
  -H "Authorization: Token yourTOKENhereHEX0000000000" \
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
  -H "Authorization: Token yourTOKENhereHEX0000000000" \
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

برای لغو سفارشات از این نوع درخواست استفاده نمایید:

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




# امنیت

## فعالسازی لغو اضطراری

```shell
curl 'https://api.nobitex.ir/security/emergency-cancel/activate' \
  -X GET \
  -H "Authorization: Token e9282e56c83f93eb077043e5ad8b6cf5b3ff7568" 
```

```plaintext
http GET https://api.nobitex.ir/security/emergency-cancel/activate \
  Authorization: Token 4928f7a7d00b3sc1efaa8dda2fc7a9tf905cc69
```

> در صورت فراخوانی درست، پاسخ به این صورت خواهد بود:

```json
{
    "status": "ok",
    "cancelCode": {
        "code": "seJlef35L3"
    }
}
```


جهت فعالسازی امکان لغو اضطراریِ درخواست های برداشت از این درخواست استفاده نمائید.
پس از فعالسازی این امکان، پیامک و ایمیل ارسالی پس از ثبت درخواست برداشت، 
حاوی لینکی خواهد بود که شما میتوانید با استفاده از آن در صورتی که درخواست برداشت توسط شما ثبت نشده است، در کمترین زمان ممکن و بدون نیاز به لاگین، درخواست های برداشت خود را لغو نمایید.

- آدرس : `GET /security/emergency-cancel/activate`


<aside class="notice">
توجه داشته باشید: در صورتی که درخواست برداشت شما توسط این امکان لغو گردد، امکان ثبت درخواست برداشت تا ۷۲ ساعت برای شما غیرفعال خواهد شد.
</aside>
