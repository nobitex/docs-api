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
      "city": true,
      "nationalSerialNumber": true
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

- **درخواست:** `GET /users/profile`

### پارامترهای ورودی
برای دریافت پاسخ، کافیست توکن احراز هویت را ارسال نمایید

## تولید آدرس بلاکچین

```shell
curl 'https://api.nobitex.ir/users/wallets/generate-address' \
  -X POST \
  -H "Authorization: Token yourTOKENhereHEX0000000000" \
  -H "content-type: application/json" \
  --data '{"currency":"btc"}'
```

```plaintext
http POST https://api.nobitex.ir/users/wallets/generate-address \
  currency=btc
```

> در صورت فراخوانی درست، پاسخ به این صورت خواهد بود:

```json
{
    "status": "ok",
    "address": "LRf3vuTMy4UwD5b72G84hmkfGBQYJeTwUs"
}
```

برای تولید آدرس بلاکچین از این نوع درخواست استفاده نمایید:

- **درخواست:** `POST /users/wallets/generate-address`
- **محدودیت فراخوانی:** ۳۰ درخواست در ساعت


### پارامترهای ورودی

| پارامتر                                | نوع    | پیش‌فرض                   | توضیحات       | نمونه  |
|----------------------------------------|--------|---------------------------|---------------|--------|
| currency <sup class="badge">ارجح</sup> | string | الزامی (جایگزین wallet)   | رمزارز کیف    | `btc`  |
| wallet <sup class="badge">قدیمی</sup>  | string | (در نبود currency الزامی) | شناسه کیف پول | `4159` |


<aside class="notice">
برای ایجاد آدرس بلاکچین می‌توانید از currency کیف مقصد استفاده نمایید. ارسال wallet برای ایجاد آدرس قدیمی است و توصیه نمی‌شود.
</aside>

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

- **درخواست:** `POST /users/cards-add`
- **محدودیت فراخوانی:** ۳۰ درخواست در هر ۳۰ دقیقه

### پارامترهای ورودی

پارامتر     | نوع    | پیش‌فرض   |   توضیحات     | نمونه
----------- | ----   | ------   |   ---------   | -----
number      | string |  الزامی  |    شماره کارت | `5041721011111111`
bank        | string |  الزامی  |    نام بانک   | `رسالت`

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

- **درخواست:** `POST /users/accounts-add`
- **محدودیت فراخوانی:** ۳۰ درخواست در ۳۰ دقیقه


### پارامترهای ورودی

پارامتر     | نوع    | پیش‌فرض   |   توضیحات     | نمونه
----------- | ----   | ------   |   ---------   | -----
number      | string |  الزامی  |    شماره حساب | `5041721011111111`
shaba       | string |  الزامی  |   شماره شبا   | `IR111111111111111111111111`
bank        | string |  الزامی  |    نام بانک   | `رسالت`



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
کاربران در نوبیتکس بر اساس سطح کاربری خود، محدودیت هایی در برداشت، واریز و مبادلات خود دارند. هر کاربر نسبت به نیاز خود و میزان مبادلاتی که دارد میتواند با ارائه مدارک مورد نیاز ، سطح کاربری خود را پس از احراز هویت و تایید مدراک، ارتقا دهد. اطلاعات نمایش داده شده در خروجی api شامل همین محدودیت ها میباشد:


برای دریافت محدودیت های کاربر از این نوع درخواست استفاده نمایید:

- **درخواست:** `POST /users/limitations`

### پارامترهای ورودی
- در این بخش به ورودی نیاز نیست.
- توکن دریافتی از بخش لاگین باید در هدر ارسال شود.


### پارامترهای خروجی
### features: شرایط حساب کاربری
- crypto_trade: امکان مبادله رمز ارزها
- rial_trade: امکان مبادله با ریال
- coin_deposit: امکان واریز رمز ارز به کیف پول نوبیتکس
- rial_deposit: امکان واریز ریال به کیف پول نوبیتکس
- coin_withdrawal: امکان برداشت رمز ارز از کیف پول نوبیتکس به کیف پول دیگر
- rial_withdrawal: امکان برداشت ریال از کیف پول نوبیتکس به حساب بانکی

### limits: محدودیت های حساب کاربری
- withdrawRialDaily: مقدار مجاز برای برداشت روزانه ریال
- withdrawRialDaily: مقدار مجاز برای برداشت روزانه رمز ارز
- withdrawTotalDaily: مقدار مجاز برای برداشت روزانه مجموع رمز ارز و ریال
- withdrawTotalMonthly: مقدار مجاز برای برداشت ماهیانه مجموع رمز ارز و ریال

### نکات و ملاحظات
1. تمامی مبالغ در خروجی به ریال هستند.
2. برای اطلاع از جزئیات سطوح کاربری، میزان محدودیت ها، مدارک مورد نیاز هر سطح و توضیحات کامل هر سطح به [سطوح حساب کاربری در نوبیتکس](https://nobitex.net/policies/user-levels/) مراجعه کنید.
#اطلاعات مالی کاربر

## لیست کیف پول ها

```shell
curl 'https://api.nobitex.ir/users/wallets/list' \
  --header "Authorization: Token yourTOKENhereHEX0000000000"
```

```plaintext
http GET https://api.nobitex.ir/users/wallets/list \
  Authorization=Token yourTOKENhereHEX0000000000
```

> در صورت فراخوانی درست، پاسخ به این صورت خواهد بود:

```json
{
  "status": "ok",
  "wallets": [
    {
      "depositAddress": null,
      "depositTag": null,
      "depositInfo": {
        "FIAT_MONEY": {
          "address": null,
          "tag": null
        }
      },
      "id": 2693280,
      "currency": "rls",
      "balance": "746212980",
      "blockedBalance": "0",
      "activeBalance": "746212980",
      "rialBalance": 746212980,
      "rialBalanceSell": 746212980
    },
    {
      "depositAddress": "bc1qp8dvtrhgjae6qhjfmvs2dj80ck0hgdjs6ts720",
      "depositTag": null,
      "depositInfo": {
        "BTC-LEGACY": {
          "address": null,
          "tag": null
        },
        "BTC": {
          "address": "bc1qp8dvtrhgjae6qhjfmvs2dj80ck0hgdjs6ts720",
          "tag": null
        },
        "BTCLN": {
          "address": null,
          "tag": null
        },
        "BSC": {
          "address": null,
          "tag": null
        }
      },
      "id": 133778,
      "currency": "btc",
      "balance": "0",
      "blockedBalance": "0",
      "activeBalance": "0",
      "rialBalance": 0,
      "rialBalanceSell": 0
    }
  ]
}
```

برای دریافت لیست کیف پول های کاربر از این نوع درخواست استفاده نمایید:

- **درخواست:** `GET /users/wallets/list`
- **محدودیت فراخوانی:** 20 درخواست در 2 دقیقه


### نکات و ملاحظات
1. کیف پول یک رمزارز در صورتی برای کاربر ایجاد می‌شود که کاربر سفارشی در بازار آن رمزارز ثبت کرده و یا آدرس واریز برای آن ایجاد کرده باشد.
این ویژگی در رمزارزهای آتی نوبیتکس نمایش خواهد یافت. برای رمزارزهای قدیمی کاربران سابق، همه کیف‌پول‌های از پیش موجود کاربر باقی خواهند ماند.
2.     در برخی از موارد به دلیل کنترل بار ترافیک ورودی این سرویس، ممکن است پاسخ مورد انتظار دریافت نگردد، در این حالت می بایست مجددا فراخوانی را انجام داد و یا اینکه از <a href="#1ff004071d">این سرویس</a> برای دریافت لیست کیف پول ها استفاده نمائید
3. برای مشخص کردن نوع کیف پول (spot or margin) میتوانید نوع آن را با استفاده از پارامتر type مشخص نمایید. به صورت پیش فرض کیف پول‌های spot لیست خواهند شد

## لیست کیف پول ها (انتخابی)

```shell
curl 'https://api.nobitex.ir/v2/wallets?currencies=rls,btc' \
  --header "Authorization: Token yourTOKENhereHEX0000000000"
```

```plaintext
http GET https://api.nobitex.ir/v2/wallets \
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

- **درخواست:** `GET /v2/wallets`
- **محدودیت فراخوانی:** 15 درخواست در دقیقه

### پارامترهای ورودی

پارامتر     | نوع    | پیش‌فرض   |      توضیحات     | نمونه
----------- | ----   | ------   |   ---------      | -----
currencies  | string |   اختیاری | نوع کیف پول(ارز)، به صورت رشته ای از ارزهای جداشده با کاما | `rls,btc`
type | string | `spot` | نوع کیف پول (اسپات یا فروش تعهدی) | `spot` یا `margin`


### نکات و ملاحظات
کیف پول یک رمزارز در صورتی برای کاربر ایجاد می‌شود که کاربر سفارشی در بازار آن رمزارز ثبت کرده و یا آدرس واریز برای آن ایجاد کرده باشد.
این ویژگی در رمزارزهای آتی نوبیتکس نمایش خواهد یافت. برای رمزارزهای قدیمی کاربران سابق، همه کیف‌پول‌های از پیش موجود کاربر باقی خواهند ماند.


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

- **درخواست:** `POST /users/wallets/balance`
- **محدودیت فراخوانی:** ۶۰ درخواست در ۲ دقیقه

### پارامترهای ورودی

پارامتر     | نوع    | پیش‌فرض   |      توضیحات     | نمونه
----------- | ----   | ------   |   ---------      | -----
currency    | string |   الزامی | نوع کیف پول(ارز) | `ltc`

### نکات و ملاحظات
1. مقدار بازگشتی برای موجودی، یک عدد است که به صورت string برگردانده میشود. این مقدار می‌تواند اعداد اعشاری زیادی داشته باشد.
2. اگر قصد محاسبات مهمی بر روی این اعداد را دارید، پیشنهاد ما این است که از انواع fixed precision برای نگهداری این اعداد استفاده کنید.

## لیست تراکنش‌ها

```shell
curl 'https://api.nobitex.ir/users/wallets/transactions/list?wallet=4159' \
  -H "Authorization: Token yourTOKENhereHEX0000000000"
```

```plaintext
http GET https://api.nobitex.ir/users/wallets/transactions/list \
  wallet=4159
```

> در صورت فراخوانی درست، پاسخ به این صورت خواهد بود:

```json
{
    "status": "ok",
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
    "hasNext": true
}
```

برای دریافت آخرین آمار بازار نوبیتکس از این نوع درخواست استفاده نمایید:

- **درخواست:** `GET /users/wallets/transactions/list`
- **محدودیت فراخوانی:** ۶۰ درخواست در ۲ دقیقه
- **<a href="#pagination">صفحه بندی:</a>** دارد (پیشفرض ۵۰)

### پارامترهای ورودی

پارامتر     | نوع    | پیش‌فرض   |       توضیحات     | نمونه
----------- | ----   | ------   |   ---------       | -----
wallet      | int    |   الزامی | شناسه کیف پول(id) | `4159`

## لیست واریزها

```shell
curl 'https://api.nobitex.ir/users/wallets/deposits/list?wallet=4159' \
  -H "Authorization: Token yourTOKENhereHEX0000000000"
```

```plaintext
http GET https://api.nobitex.ir/users/wallets/deposits/list \
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
    "hasNext": true
}
```

برای دریافت لیست واریزها از این نوع درخواست استفاده نمایید:

- **درخواست:** `GET /users/wallets/deposits/list`
- **محدودیت فراخوانی:** ۶۰ درخواست در ۲ دقیقه
- **<a href="#pagination">صفحه بندی:</a>** دارد (پیشفرض ۱۰برای ریال و ۲۰برای سایر)
- **<a href="#date-filter">فیلترزمانی:</a>** دارد

### پارامترهای ورودی

پارامتر     | نوع        | پیش‌فرض | توضیحات       | نمونه
----------- |------------|---------|---------------| -----
wallet      | string     | all     | شناسه کیف پول | `4159`

### نکات و ملاحظات
- از این طریق واریزهای حداکثر سه ماهه اخیر قابل نمایش است.
- صفحه بندی و فیلترزمانی فقط برای حالتی است که wallet تعیین شده باشد و برای حالت پیشفرض یعنی all کارایی ندارد.



<h2 id="favorite_market"> بازارهای مورد علاقه</h2>

با استفاده از این امکان، کاربران قادر خواهند بود بازارهای مورد علاقه خود را مشخص کنند.

### دریافت لیست بازارهای مورد علاقه

```shell
curl 'https://api.nobitex.ir/users/markets/favorite' \
  -X GET

```

```plaintext
http GET https://api.nobitex.ir/users/markets/favorite
```

> در صورت فراخوانی درست، پاسخ به این صورت خواهد بود:

```json
{
    "status": "ok",
    "favoriteMarkets": [
        "XLMIRT",
        "BTCUSDT",
        "BTCIRT"
    ]
}
```

- **درخواست:** `GET /users/markets/favorite`
- **محدودیت فراخوانی:** 6 درخواست در ۱ دقیقه
- **نیاز به ارسال توکن:** دارد


### ثبت بازار(های) مورد علاقه

```shell
curl 'https://api.nobitex.ir/users/markets/favorite' \
  -X POST

```

```plaintext
http POST https://api.nobitex.ir/users/markets/favorite
```

> در صورت فراخوانی درست، پاسخ به این صورت خواهد بود:

```json
{
    "status": "ok",
    "favoriteMarkets": [
        "BTCIRT",
        "DOGEUSDT"
    ]
}
```


- **درخواست:** `POST /users/markets/favorite`
- **محدودیت فراخوانی:** 12 درخواست در ۱ دقیقه
- **نیاز به ارسال توکن:** دارد


### پارامتر ورودی

پارامتر     | نوع    | پیش‌فرض   | توضیحات                   | نمونه
----------- | ----   | ------   |---------------------------| -----
market | string |   الزامی | نماد بازار comma-separated | `BTCIRT` or `BTCIRT,DOGEUSDT`

<aside class="notice">
لیست نمادهای معتبر بازارها عبارتند از:<br/> <span class="market-symbols"></span>
</aside>




### حذف بازار مورد علاقه

```shell
curl 'https://api.nobitex.ir/users/markets/favorite' \
  -X DELETE

```

```plaintext
http DELETE https://api.nobitex.ir/users/markets/favorite
```

> در صورت فراخوانی درست، پاسخ به این صورت خواهد بود:

```json
{
    "status": "ok",
    "favoriteMarkets": [
        "BTCIRT",
        "DOGEUSDT"
    ]
}
```


- **درخواست:** `DELETE /users/markets/favorite`
- **محدودیت فراخوانی:** 12 درخواست در ۱ دقیقه
- **نیاز به ارسال توکن:** دارد


### پارامتر ورودی

پارامتر     | نوع    | پیش‌فرض   | توضیحات                           | نمونه
----------- | ----   | ------   |-----------------------------------| -----
market | string |   الزامی | نماد بازار  و یا All برای حذف همه | `All` or `BTCIRT`

