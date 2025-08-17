#صورت‌حساب کیف پول
صورت‌حساب یا فاکتور (invoice) برای دریافت رمزارز در برخی شبکه‌های انتقال استفاده می‌شود.
برای آشنایی با مفاهیم مرتبط با انتقال صورت‌حسابی
[مطلب آموزشی بلاگ](https://blog.nobitex.ir/لایتنینگ-چیست-و-چطور-از-آن-استفاده-کنیم/ "لایتنینگ چیست و چطور از آن استفاده کنیم؟")
را مطالعه نمایید.

### نکات و ملاحظات
1. در حال حاضر تنها برای کیف پول بیت‌کوین از طریق شبکه لایتنینگ انتقال صورت‌حسابی امکان‌پذیر است.
2. احراز هویت در API های این مجموعه الزامی است.

##ایجاد صورت‌حساب واریز

>نمونه درخواست:

```shell
curl -X POST 'https://apiv2.nobitex.ir/users/wallets/invoice/generate' \
  -H 'Authorization: Token yourTOKENhereHEX0000000000' \
  -H 'Content-Type: application/json' \
  --data '{"wallet": 1, "amount": 100}'
```

```javascript
api.post('/users/wallets/invoice/generate', {wallet: 1, amount: 100}, {
  headers: {Authorization: "Token yourTOKENhereHEX0000000000"},
}).then((response) => {
  console.log(response);
});
```

```java
public interface APIService {
  @Headers({"Authorization: Token yourTOKENhereHEX0000000000"})
  @FormUrlEncoded
  @POST("/users/wallets/invoice/generate")
  Call<JsonObject> generateWalletInvoice(@Field("wallet") int walletId, @Field("amount") int amount);
}

APIService api = retrofit.create(APIService.class);

Call<JsonObject> call = api.generateWalletInvoice(1, 100);
```


```plaintext
POST /users/wallets/invoice/generate HTTP/1.1
Host: apiv2.nobitex.ir
Authorization: Token yourTOKENhereHEX0000000000
Content-Type: application/json
{"wallet": 1, "amount": 100}
```

> در صورت فراخوانی درست، پاسخ به این صورت خواهد بود:

```json
{
  "status": "ok",
  "deposit": {
    "id": 1,
    "amount": "0.0000010000",
    "date": "2021-10-17T18:52:31.679312+00:00",
    "depositType": "coinDeposit",
    "confirmed": true,
    "transaction": {
      "id": 5,
      "amount": "0.0000010000",
      "currency": "btc",
      "description": "Deposit - address:tbtctest2o21q2ufulqrp85wt6qnxzxgmkd72hgc2du, tx:0001020304050607080900010203040506070809000102030405060708090102",
      "created_at": "2021-10-17T18:52:31.679312+00:00",
      "balance": null
    },
    "txHash": "0001020304050607080900010203040506070809000102030405060708090102",
    "address": 123456789,
    "currency": "Bitcoin",
    "blockchainUrl": "hash: 0001020304050607080900010203040506070809000102030405060708090102",
    "requiredConfirmations": 3,
    "confirmations": 2,
    "isConfirmed": false,
    "invoice": "lnbc1u1pskcu80pp5qqqsyqcyq5rqwzqfqqqsyqcyq5rqwzqfqqqsyqcyq5rqwzqfqypqdqcfehky6t5v4uzqer9wphhx6t5z7jut6xdcvpnye3suzk448rqex822kr788q8hxrgtw8muxmnnj4jfj074lgh7czwf8k3wdx3u8y46znnxeqg0e6gqmc57rpw3qnyl7gpnaaqru",
    "expired": false
  }
}

```
برای ایجاد صورت‌حساب واریز از این نوع درخواست استفاده نمایید:

* **درخواست:** `POST /users/wallets/invoice/generate`
- **<a href="/#ratelimit">محدودیت فراخوانی:</a>** 10 درخواست در 3 دقیقه

### پارامترهای ورودی

پارامتر | نوع | پیش‌فرض | توضیحات                                      | نمونه
------- | ---- | ---- |----------------------------------------------| ---------
wallet | integer | الزامی | شناسه کیف‌پول کاربر برای رمزارز واریز شده    | 1
amount | integer | الزامی | مقدار رمزارز واریز شده (ساتوشی برای بیتکوین) | 100


### پارامترهای پاسخ

پارامتر | نوع | توضیحات | نمونه
------- | ---- | --------- | ---------
status | string | وضعیت پاسخ | ok
deposit | CoinDeposit | اطلاعات واریز | {"id": 1, ...}

### شی Deposit

پارامتر | نوع | توضیحات | نمونه
------- | ---- | --------- | ---------
id | integer | شناسه واریز | 1
amount | monetary | مقدار واریز شده | "0.0000010000"
date | iso-string | زمان واریز | "2021-10-17T18:52:31.679312+00:00"
depositType | string | شناسه واریز | 1
confirmed | boolean | تایید شده در نوبیتکس | true
transaction | Transaction | اطلاعات تراکنش واریز به کیف پول | {"id": 5, ...}

### شی CoinDeposit (نوع Deposit با depositType = <bdi>"coinDeposit"</bdi>)

پارامتر | نوع | توضیحات | نمونه
------- | ---- | --------- | ---------
txHash | string | هش واریز | <span class="long">"0001020304050607080900010203040506070809000102030405060708090102"</span>
address | string | آدرس یا تگ واریز | 123456789
currency | string | رمزارز واریزی | "Bitcoin"
blockchainUrl | integer | شناسه واریز | <span class="long">"hash: 0001020304050607080900010203040506070809000102030405060708090102"</span>
requiredConfirmations | integer | تعداد تاییدهای مورد نیاز | 3
confirmations | integer | تعداد تاییدهای دریافت شده | 2
isConfirmed | boolean | تایید شده در شبکه رمزارزی | false
invoice | string | صورت‌حساب واریز | <span class="long">"lnbc1u1pskcu80pp5qqqsyqcyq5rqwzqfqqqsyqcyq5rqwzqfqqqsyqcyq5rqwzqfqypqdqcfehky6t5v4uzqer9wphhx6t5z7jut6xdcvpnye3suzk448rqex822kr788q8hxrgtw8muxmnnj4jfj074lgh7czwf8k3wdx3u8y46znnxeqg0e6gqmc57rpw3qnyl7gpnaaqru"</span>
expired | boolean | منقضی شده | false

### شی Transaction

پارامتر | نوع | توضیحات | نمونه
------- | ---- | --------- | ---------
id | integer | شناسه تراکنش | 5
amount | monetary | مقدار تراکنش | "0.0000010000"
currency | string | رمزارز تراکنش | "btc"
description | string | توضیح تراکنش | "Deposit - address:tbtctest2o21q2ufulqrp85wt6qnxzxgmkd72hgc2du, tx:0001020304050607080900010203040506070809000102030405060708090102"
created_at | iso-string | زمان تراکنش | "2021-10-17T18:52:31.679312+00:00"
balance | integer | موجودی نهایی کیف پول | null


### حالت‌های خطا

کد خطا | توضیحات
---- | ----
CoinDepositLimitation | کاربر اجازه واریز رمزارز در نوبیتکس را ندارد.
InvalidAmount | مقدار تراکنش در بازه مجاز نیست.
InvalidCurrency | رمزارز کیف‌پول درخواست از انتقال صورت‌حسابی پشتیبانی نمی‌کند.
CoinDepositDisabled | امکان واریز رمزارز در این شبکه به طور مقطعی توسط مدیر سیستم غیر فعال شده است.
NotAvailable | دسترسی به شبکه برای ساخت صورت‌حساب به دلیل اختلالات در اتصال به صورت موقت وجود ندارد.
ParseError |نوع یا شرط الزامی بودن یکی از پارامترهای ورودی رعایت نشده است.

### نکات و ملاحظات
1. واحد amount برای رمزارز بیت‌کوین در این درخواست معادل
<a href="https://blog.nobitex.ir/glossary/satoshi/">ساتوشی</a>
می‌باشد.
2. در حال حاضر، حداقل واریز 100 ساتوشی و حداکثر واریز 100000 ساتوشی در نظر گرفته شده است.
3. کاربر درخواست دهنده در این API بایستی حداقل سطح مجاز برای واریز رمزارز (سطح یک) را داشته باشد.


##تفسیر صورت‌حساب

>نمونه درخواست:

```shell
curl -X POST 'https://apiv2.nobitex.ir/users/wallets/invoice/decode' \
  -H 'Authorization: Token yourTOKENhereHEX0000000000' \
  -H 'Content-Type: application/json' \
  --data '{"wallet": 1,"invoice": "lnbc1u1pskcu80pp5qqqsyqcyq5rqwzqfqqqsyqcyq5rqwzqfqqqsyqcyq5rqwzqfqypqdqcfehky6t5v4uzqer9wphhx6t5z7jut6xdcvpnye3suzk448rqex822kr788q8hxrgtw8muxmnnj4jfj074lgh7czwf8k3wdx3u8y46znnxeqg0e6gqmc57rpw3qnyl7gpnaaqru"}'
```

```javascript
api.post('/users/wallets/invoice/decode', {
    wallet: 1,
    invoice: 'lnbc1u1pskcu80pp5qqqsyqcyq5rqwzqfqqqsyqcyq5rqwzqfqqqsyqcyq5rqwzqfqypqdqcfehky6t5v4uzqer9wphhx6t5z7jut6xdcvpnye3suzk448rqex822kr788q8hxrgtw8muxmnnj4jfj074lgh7czwf8k3wdx3u8y46znnxeqg0e6gqmc57rpw3qnyl7gpnaaqru'
}, {
  headers: {Authorization: 'Token yourTOKENhereHEX0000000000'},
}).then((response) => {
  console.log(response);
});
```

```java
public interface APIService {
  @Headers({"Authorization: Token yourTOKENhereHEX0000000000"})
  @FormUrlEncoded
  @POST("/users/wallets/invoice/decode")
  Call<JsonObject> decodeWalletInvoice(@Field("wallet") int walletId, @Field("invoice") String invoice);
}

APIService api = retrofit.create(APIService.class);

String invoice = "lnbc1u1pskcu80pp5qqqsyqcyq5rqwzqfqqqsyqcyq5rqwzqfqqqsyqcyq5rqwzqfqypqdqcfehky6t5v4uzqer9wphhx6t5z7jut6xdcvpnye3suzk448rqex822kr788q8hxrgtw8muxmnnj4jfj074lgh7czwf8k3wdx3u8y46znnxeqg0e6gqmc57rpw3qnyl7gpnaaqru";
Call<JsonObject> call = api.decodeWalletInvoice(1, invoice);
```


```plaintext
POST /users/wallets/invoice/decode HTTP/1.1
Host: apiv2.nobitex.ir
Authorization: Token yourTOKENhereHEX0000000000
Content-Type: application/json
{"wallet": 1, "invoice": "lnbc1u1pskcu80pp5qqqsyqcyq5rqwzqfqqqsyqcyq5rqwzqfqqqsyqcyq5rqwzqfqypqdqcfehky6t5v4uzqer9wphhx6t5z7jut6xdcvpnye3suzk448rqex822kr788q8hxrgtw8muxmnnj4jfj074lgh7czwf8k3wdx3u8y46znnxeqg0e6gqmc57rpw3qnyl7gpnaaqru"}
```

> در صورت فراخوانی درست، پاسخ به این صورت خواهد بود:

```json
{
  "status": "ok",
  "amount": "0.000001",
  "address": "03e7156ae33b0a208d0744199163177e909e80176e55d97a2f221ede0f934dd9ad",
  "date": 1634496751,
  "fee": "0.00000010"
}
```

برای استخراج مقادیر موجود در صورت‌حساب رمزگذاری شده از این نوع درخواست استفاده نمایید:

- **درخواست:** `POST /users/wallets/invoice/decode`
- **<a href="/#ratelimit">محدودیت فراخوانی:</a>** 60 درخواست در 2 دقیقه

### پارامترهای ورودی

پارامتر | نوع | پیش‌فرض | توضیحات | نمونه
------- | ---- | ---- | --------- | ---------
wallet | integer | الزامی | شناسه کیف‌پول کاربر که صورت‌حساب برای آن صادر شده | 1
invoice | string | الزامی | صورت‌حساب کد شده | <span class="long">"lnbc1u1pskcu80pp5qqqsyqcyq5rqwzqfqqqsyqcyq5rqwzqfqqqsyqcyq5rqwzqfqypqdqcfehky6t5v4uzqer9wphhx6t5z7jut6xdcvpnye3suzk448rqex822kr788q8hxrgtw8muxmnnj4jfj074lgh7czwf8k3wdx3u8y46znnxeqg0e6gqmc57rpw3qnyl7gpnaaqru"</span>

> نمونه صورت‌حساب آزمایشی:

```json
"lntb1u1pskcu80pp5qqqsyqcyq5rqwzqfqqqsyqcyq5rqwzqfqqqsyqcyq5rqwzqfqypqdqcfehky6t5v4uzqer9wphhx6t5wtu3ws8aua895ruar4kw2ps6vrc4cj2nrsyms6t5n8q38rrpw6nqnus2fen69uwyzru2m65qxvvezmw6y8pxqz9qg3px6jldq40smpgp05rvjk"
```


### پارامترهای پاسخ

پارامتر | نوع | توضیحات | نمونه
------- | ---- | --------- | ---------
status | string | وضعیت پاسخ | ok
amount | monetary | مقدار صورت‌حساب | "0.000001"
date | int | زمان ایجاد صورت‌حساب | 1634496751
address | string | کلید عمومی پرداخت کننده | <span class="long">"03e7156ae33b0a208d0744199163177e909e80176e55d97a2f221ede0f934dd9ad"</span>
fee | monetary | کارمزد انتقال | "0.00000010"


### حالت‌های خطا

کد خطا | توضیحات
---- | ----
InvalidInvoice | <p>صورت‌حساب نامعتبر است یا پشتیبانی نمی‌شود</p>


### نکات و ملاحظات
دقت نمایید صورت‌حساب ثبت شده نمی‌تواند مربوط به شبکه‌های آزمایشی رمزارز باشد. برای تفسیر صورت‌حساب‌های آزمایشی از محیط آزمایشی نوبیتکس استفاده نمایید.
