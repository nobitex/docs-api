---
title: مستندات API نوبیتکس

# see: https://github.com/lord/slate/wiki/Custom-Slate-Themes
# see: https://developer.tradegecko.com/

language_tabs: # must be one of https://git.io/vQNgJ
  - shell
  - plaintext

toc_footers:
  - <a href='https://nobitex.market/'>سایت نوبیتکس</a>

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

پارامتر | نوع | پیش‌فرض | توضیحات | نمونه
------- | ---- | --------- | --------- | -----
username | string | الزامی | ایمیل کاربر | `name@example.com`
password | string | الزامی | رمز عبور کاربر | `secret-password-1234`
remember | string | no | آیا توکن بلند مدت صادر شود؟ | `yes` یا `no`

<aside class="notice">
توکن‌های دریافت شده از این روش، بعد از اتمام زمان اعتبار (چهار ساعت یا سی روز) منقضی می‌شوند. در صورت نیاز به توکن‌های با تاریخ انقضای
طولانی‌تر و آگاهی از ملاحظات امنیتی لازم، با پشتیبانی نوبیتکس تماس بگیرید.
</aside>

# اطلاعات بازار (عمومی)
##لیست سفارشات

```shell
curl 'https://api.nobitex.ir/market/orders/list' \
  -X POST \
  -H "content-type: application/json" \
  --data '{"order":"-price","type":"sell","dstCurrency":"usdt"}'
```

```plaintext
http POST https://api.nobitex.ir/market/orders/list \
  order=-price type=sell dstCurrency=usdt
```

> در صورت فراخوانی درست، پاسخ به این صورت خواهد بود:

```json
{
    "status": "ok",
    "orders": [
        {
            "unmatchedAmount": "0.1416000000",
            "amount": "0.1416000000",
            "srcCurrency": "Bitcoin",
            "dstCurrency": "Tether(omni)",
            "matchedAmount": "0E-10",
            "isMyOrder": false,
            "price": "5787.0000000000",
            "type": "sell",
            "totalPrice": "819.43920000000000000000"
        },
        ...
 
    ]
}
```

برای دریافت لیست سفارشات از این نوع درخواست استفاده نمایید:

- آدرس : `POST /market/orders/list`

- پارامترها :

پارامتر     | نوع    | پیش‌فرض   |  توضیحات   | نمونه
----------- | ----   | ------   | ---------  | -----
order       | string | `price`  |   ترتیب    | `price` یا `price-` 
type        | string |  اختیاری | نوع سفارش  | `buy` یا `sell`
srcCurrency | string |   اختیاری | ارز مبدا   | `btc`
dstCurrency | string |   اختیاری | ارز مقصد   | `rls`

<aside class="notice">
ترتیب ‍‍'price' از قیمت کم به زیاد و ترتیب 'price-' بالعکس می باشد .
</aside>

## لیست معاملات

```shell
curl 'https://api.nobitex.ir/market/trades/list' \
  -X POST \
  -H "content-type: application/json" \
  --data '{"srcCurrency":"btc","dstCurrency":"rls"}'
```

```plaintext
http POST https://api.nobitex.ir/market/trades/list \
  srcCurrency=btc dstCurrency=rls
```

> در صورت فراخوانی درست، پاسخ به این صورت خواهد بود:

```json
{
    "trades": [
        {
            "market": "Bitcoin-﷼",
            "total": "99949293.63720000000000000000",
            "price": "750032220.0000000000",
            "amount": "0.1332600000",
            "type": "buy",
            "timestamp": "2018-11-18T11:56:07.798845+00:00"
        },
        ...
    ],
    "status": "ok"
}
```

برای دریافت لیست معاملات از این نوع درخواست استفاده نمایید:

- آدرس : `POST /market/trades/list`

- پارامترها :

پارامتر     | نوع    | پیش‌فرض   |  توضیحات   | نمونه
----------- | ----   | ------   | ---------  | -----
srcCurrency | string |   الزامی | ارز مبدا   |`btc`
dstCurrency | string |   الزامی | ارز مقصد   | `rls`


<aside class="notice">
محدودیت فراخوانی : 15 درخواست در دقیقه
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
        ...
    }
}
```

برای دریافت پروفایل کاربر از این نوع درخواست استفاده نمایید:

- آدرس : `GET /users/profile`


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

برای دریافت آخرین آمار بازار نوبیتکس از این نوع درخواست استفاده نمایید:

- آدرس : `POST /users/wallets/balance`

- پارامترها :

پارامتر     | نوع    | پیش‌فرض   |      توضیحات     | نمونه
----------- | ----   | ------   |   ---------      | -----
currency    | string |   الزامی | نوع کیف پول(ارز) | `ltc`

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


##لغو سفارش 

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
