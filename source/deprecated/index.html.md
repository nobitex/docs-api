---
title: موارد قدیمی API
lang: fa
toc_footers:
  - <a href='/'>مستندات API نوبیتکس</a>
  - <a href='/changelog/'>سابقه تغییرات API</a>
  - <a href='/terms/'>شرایط استفاده از API</a>
  - <a href='https://nobitex.ir/'>سایت نوبیتکس</a>
---

# موارد قدیمی API
برخی از APIها به دلیل تغییرات ساختاری یا کارکردی، قدیمی و deprecated محسوب می‌شوند و نباید دیگر از آن‌ها استفاده شود. این موارد صرفاً جهت ثبت در ادامه خواهند آمد، ولی ممکن است در حال حاضر یا هر یک از نسخه‌های آتی نوبیتکس این APIها غیرفعال شوند یا دیگر پاسخگو نباشند.

##  کد دعوت پیش‌فرض

```shell
curl 'https://apiv2.nobitex.ir/users/get-referral-code' \
  -H "Authorization: Token yourTOKENhereHEX0000000000"
```

```plaintext
http POST https://apiv2.nobitex.ir/users/get-referral-code \
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

برای دریافت کد دعوت پیش‌فرض از این نوع درخواست استفاده نمایید:

- آدرس : `GET /users/get-referral-code`



##  لیست سفارشـات

```shell
curl 'https://apiv2.nobitex.ir/v2/orderbook'
     -X POST -H "content-type: application/json"
     --data '{"symbol": "USDTIRT"}'
```

```plaintext
http POST https://apiv2.nobitex.ir/v2/orderbook \
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


##لیست معامـلات

```shell
curl 'https://apiv2.nobitex.ir/v2/trades'
     -X POST -H "content-type: application/json"
     --data '{"symbol": "USDTIRT"}'
```

```plaintext
http POST https://apiv2.nobitex.ir/v2/trades \
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
