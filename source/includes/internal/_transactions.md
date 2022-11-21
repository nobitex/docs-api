#تراکنش‌های مالی
هر گونه تغییر در موجودی کیف‌پول کاربر توسط یک تراکنش ایجاد و ثبت می‌شود. افزایش یا کسری موجودی در اثر واریز، برداشت، معامله و کارمزد همگی نمونه‌ای از تراکنش‌های مالی کاربر هستند.


### نکات و ملاحظات
احراز هویت در API های این مجموعه الزامی است.


## تاریخچه تراکنش‌ها

>نمونه درخواست:

```shell
curl 'https://api.nobitex.ir/users/transactions-history' \
  -H 'Authorization: Token yourTOKENhereHEX0000000000'
```

```javascript
api.get('/users/transactions-history', {
  headers: {Authorization: 'Token yourTOKENhereHEX0000000000'},
}).then((response) => {
  console.log(response);
});
```

```java
public interface APIService {
  @Headers({"Authorization: Token yourTOKENhereHEX0000000000"})
  @GET("/users/transactions-history")
  Call<JsonObject> listTransactions();
}

APIService api = retrofit.create(APIService.class);

Call<JsonObject> call = api.listTransactions();
```

```plaintext
GET /users/transactions-history HTTP/1.1
Host: api.nobitex.ir
Authorization: Token yourTOKENhereHEX0000000000
```

> در صورت فراخوانی درست، پاسخ به این صورت خواهد بود:

```json
{
  "status": "ok",
  "transactions": [
    {
      "id": 1,
      "tp": "deposit",
      "type": "واریز",
      "created_at": "2021-11-13T14:35:18.766Z",
      "currency": "rls",
      "amount": "10000000.0000000000",
      "balance": "10000000.0000000000",
      "description": "واریز شتابی - شماره کارت: 123456******1234 - شماره پیگیری: 39577-bpiZpZw",
      "calculatedFee": null
    },
    {
      "id": 2,
      "tp": "sell",
      "type": "معامله",
      "created_at": "2021-11-23T15:47:12.835Z",
      "currency": "rls",
      "amount": "-8000000.0000000000",
      "balance": "2000000.0000000000",
      "description": "خرید 32.00 USDT به قیمت واحد ﷼250000",
      "calculatedFee": null
    },
    {
      "id": 3,
      "tp": "buy",
      "type": "معامله",
      "created_at": "2021-11-23T15:47:12.835Z",
      "currency": "usdt",
      "amount": "32.0000000000",
      "balance": "32.0000000000",
      "description": "خرید 32.00 USDT به قیمت واحد ﷼250000",
      "calculatedFee": null
    }
  ],
  "hasNext": false
}
```

برای دریافت تاریخچه همه تراکنش‌های مالی کاربر از این نوع درخواست استفاده نمایید:

* **درخواست:** `GET /users/transactions-history`
* **محدودیت فراخوانی:** 60 درخواست در ساعت
* **<a href="/#pagination">صفحه بندی:</a>** دارد (پیش فرض 50)


### پارامترهای پاسخ

پارامتر | نوع | توضیحات | نمونه
------- | ---- | --------- | ---------
status | string | وضعیت پاسخ | ok
transactions | list of Transaction | لیستی از تراکنش‌ها | []
hasNext | boolean | آیا لیست ادامه دارد؟ | false


### شی Transaction

پارامتر | نوع | توضیحات | نمونه
------- | ---- | --------- | ---------
id | integer | شناسه تراکنش | 1
tp | string | نوع تراکنش | "deposit"
type | string | نوع قابل فهم | "واریز"
createdAt | iso-string | زمان ایجاد | "2021-11-13T14:35:18.766Z"
currency | string | نوع ارز | "rls"
amount | monetary | مقدار | "10000000.0000000000"
balance | monetary | موجودی نهایی | "10000000.0000000000"
description | string | توضیحات | "واریز شتابی - شماره کارت: 123456******1234 - شماره پیگیری: 39577-bpiZpZw"
calculatedFee | monetary | کارمزد حساب شده | null

1. **نوع تراکنش:** می‌تواند یکی از مقادیر `deposit` (واریز)، `withdraw` (برداشت)، `buy` و `sell` (معامله)، `fee` (کارمزد)، `gateway` (درگاه)، `ex_src` و `ex_dst` (صرافی) و `manual` (سیستمی) باشد.
2. **مقدار:** در تراکنش مقدار منفی نشان‌دهنده کاهش موجودی و مقدار مثبت نشان‌دهنده افزایش موجودی می‌باشد.
