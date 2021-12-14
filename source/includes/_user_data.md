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

## لیست واریزها

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
    ]
}
```

برای دریافت لیست واریزها و برداشت‌ها از این نوع درخواست استفاده نمایید:

- آدرس : `POST /users/wallets/deposits/list`

- پارامترها :

پارامتر     | نوع    | پیش‌فرض   |       توضیحات     | نمونه
----------- | ----   | ------   |   ---------       | -----
wallet      | string |   all    | شناسه کیف پول(id) | `4159`
