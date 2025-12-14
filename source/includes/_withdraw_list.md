
<h1 id="withdraw-list">فهرست برداشت‌ها</h1>


<h2 id="withdraw-list-section">فهرست برداشت‌ها</h2>



```shell
curl 'https://apiv2.nobitex.ir/users/wallets/withdraws/list' \
  -H 'Authorization: Token yourTOKENhereHEX0000000000'
```


```plaintext
http GET https://apiv2.nobitex.ir/users/wallets/withdraws/list
```

> در صورت فراخوانی درست، پاسخ به این صورت خواهد بود:

```json
{
  "status": "ok",
  "withdraws": [
    {
      "id": 432,
      "createdAt": "2021-12-11T10:13:42.957103+00:00",
      "status": "Canceled",
      "amount": "0.0123",
      "currency": "btc",
      "network": "BTCLN",
      "invoice": "lnbc123m1pskcu80pp5qqqsyqcyq5rqwz...",
      "address": "SaMpLeWaLlEtAdDrEsS",
      "tag": "123456",
      "wallet_id": 3456,
      "blockchain_url": "https://nobitex.ir/receipt/Bitcoin/ewd23d...",
      "is_cancelable": true
    },
    {
      "id": 238,
      "createdAt": "2020-09-19T14:17:23.441723+00:00",
      "status": "Done",
      "amount": "1000000",
      "currency": "rls",
      "network": "FIAT_MONEY",
      "invoice": null,
      "address": "\u062a\u062c\u0627\u0631\u062a: IR140180000000003333333333",
      "tag": null,
      "wallet_id": 3451,
      "blockchain_url": null,
      "is_cancelable": true
    },
    {
      "id": 239,
      "createdAt": "2018-10-04T12:59:38.196935+00:00",
      "status": "Done",
      "amount": "1",
      "currency": "ltc",
      "network": "LTC",
      "address": "Lgn1zc77mEjk72KvX...",
      "tag": null,
      "wallet_id": 3454,
      "blockchain_url": "https://live.blockcypher.com/ltc/tx/c1ed4229e598d4cf...",
      "is_cancelable": false
    }
  ],
  "hasNext": true
}
```

برای دریافت لیست آخرین برداشت‌ها اعم از ریالی و رمزارزی میتوانید از این نوع درخواست استفاده نمایید:

* **درخواست:** `GET /users/wallets/withdraws/list`
* **<a href="/#ratelimit">محدودیت فراخوانی:</a>** ۶۰ درخواست در ۲ دقیقه
* **<a href="#pagination">صفحه بندی:</a>** دارد (پیش فرض 20)
* **<a href="#date-filter">فیلترزمانی:</a>** دارد

### پارامترهای ورودی

| پارامتر | نوع    | پیش‌فرض | توضیحات             | نمونه |
|---------|--------|---------|---------------------|-------|
| wallet  | string | all     | شناسه کیف پول کاربر | 3456  |
