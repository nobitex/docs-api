#اعلان‌های قیمت
کاربر می‌تواند رسیدن قیمت در یک بازار به یک قیمت دلخواه و عبور از آن را به کمک این اعلان پایش کند.
به محض گذر از قیمت تعیین شده، به کاربر از طرقی که مشخص کرده اطلاع‌رسانی خواهد شد.
مخاطب این امکان کاربران هستند و استفاده از آن به بات‌ها پیشنهاد نمی‌شود.

<aside class="notice">
احراز هویت در API های این مجموعه الزامی است.
</aside>

##لیست اعلان‌های قیمت

>نمونه درخواست:

```shell
curl 'https://api.nobitex.ir/v2/price-alerts' \
  -H 'Authorization: Token yourTOKENhereHEX0000000000'
```

```javascript
api.get('/v2/price-alerts', {
  headers: {Authorization: 'Token yourTOKENhereHEX0000000000'},
}).then((response) => {
  console.log(response);
});
```

```java
public interface APIService {
  @Headers({"Authorization: Token yourTOKENhereHEX0000000000"})
  @GET("/v2/price-alerts")
  Call<JsonObject> listPriceAlerts();
}

APIService api = retrofit.create(APIService.class);

Call<JsonObject> call = api.listPriceAlerts();
```

```swift
// Contact us
```

```plaintext
GET /v2/price-alerts HTTP/1.1
Host: api.nobitex.ir
Authorization: Token yourTOKENhereHEX0000000000
```

> در صورت فراخوانی درست، پاسخ به این صورت خواهد بود:

```json
{
  "status": "ok",
  "alerts": [
    {
      "id": 1,
      "createdAt": "2021-08-08T22:52:59.193208+00:00",
      "market": "BTCUSDT",
      "type": "Price",
      "direction": "+",
      "price": "65000.0000000000",
      "description": "As a test",
      "channel": "Notif"
    },
    {
      "id": 2,
      "createdAt": "2021-08-08T22:59:58.383443+00:00",
      "market": "BTCUSDT",
      "type": "Price",
      "direction": "-",
      "price": "62000.0000000000",
      "description": "",
      "channel": "Email/Notif"
    }
  ]
}
```

برای دریافت اعلان‌های قیمت کاربر از این نوع درخواست استفاده نمایید:

* آدرس: `GET /v2/price-alerts`

* پارامترهای پاسخ:

پارامتر | نوع | توضیحات | نمونه
------- | ---- | --------- | ---------
status | string | وضعیت پاسخ | ok
alerts | list of PriceAlert | لیست اعلان‌های قیمت کاربر | []

###شی PriceAlert

پارامتر | نوع | توضیحات | نمونه
------- | ---- | --------- | ---------
id | integer | شناسه اعلان | 1
createdAt | iso-string | زمان ایجاد | "2021-10-04T13:19:46.103353+00:00"
market | string | بازار مورد نظر | "BTCUSDT"
type | string | نوع اعلان<sup>1</sup> | "Price"
direction | string | جهت تغییر بازار<sup>2</sup> | "+"
price | monetary | قیمت مورد نظر | "65000.0000000000"
description | string | توضیحات | ""
channel | string | کانال اطلاع‌رسانی<sup>3</sup> | "Email/Notif"

1. **نوع اعلان:** در حال حاضر تنها می‌تواند Price باشد. اعلان نوع Price برای پایش رسیدن به یک قیمت مشخص به‌کار می‌رود.
2. **جهت تغییر بازار:** می‌تواند دو مقدار + یا - داشته باشد. جهت + یعنی اعلان در صورت بیشتر شدن قیمت بازار از قیمت تعیین شده فعال می‌شود و جهت - یعنی در صورت پایین تر آمدن قیمت بازار تا قیمت تعیین شده، اعلان فعال و ارسال خواهد شد.
3. **کانال اطلاع‌رسانی:** می‌تواند هر یک از کانال‌های نوتیفیکیشن (Nofit)، ایمیل (Email) یا پیامک (SMS) و یا ترکیبی از آن‌ها باشد. (کانال پیامک در آینده پشتیبانی خواهد شد و در حال حاضر غیرفعال است.)

<aside class="notice">
محدودیت فراخوانی : 25 درخواست در 5 دقیقه
</aside>
