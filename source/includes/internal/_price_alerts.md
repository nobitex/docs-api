#اعلان‌های قیمت
کاربر می‌تواند رسیدن قیمت در یک بازار به یک قیمت دلخواه و عبور از آن را به کمک این اعلان پایش کند.
به محض گذر از قیمت تعیین شده، به کاربر از طرقی که مشخص کرده اطلاع‌رسانی خواهد شد.
مخاطب این امکان کاربران هستند و استفاده از آن به بات‌ها پیشنهاد نمی‌شود.


### نکات و ملاحظات
احراز هویت در API های این مجموعه الزامی است.

##لیست اعلان‌های قیمت

>نمونه درخواست:

```shell
curl 'https://apiv2.nobitex.ir/v2/price-alerts' \
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

```plaintext
GET /v2/price-alerts HTTP/1.1
Host: apiv2.nobitex.ir
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

* **درخواست:** `GET /v2/price-alerts`
* **<a href="/#ratelimit">محدودیت فراخوانی:</a>** 25 درخواست در 5 دقیقه



### پارامترهای پاسخ

پارامتر | نوع | توضیحات | نمونه
------- | ---- | --------- | ---------
status | string | وضعیت پاسخ | ok
alerts | list of PriceAlert | لیست اعلان‌های قیمت کاربر | []

### شی PriceAlert

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
3. **کانال اطلاع‌رسانی:** می‌تواند هر یک از کانال‌های نوتیفیکیشن (Notif)، ایمیل (Email) یا پیامک (SMS) و یا ترکیبی از آن‌ها باشد. (کانال پیامک در آینده پشتیبانی خواهد شد و در حال حاضر غیرفعال است.)


## ایجاد اعلان قیمت

>نمونه درخواست:

```shell
curl -X POST 'https://apiv2.nobitex.ir/v2/price-alerts' \
  -H 'Authorization: Token yourTOKENhereHEX0000000000' \
  -H 'Content-Type: application/json' \
  --data '{"tp": "price", "market": "btcusdt", "direction": "-", "price": "63000", "channel": "email,notif"}'
```

```javascript
api.post('/v2/price-alerts', {
    tp: 'price',
    market: 'btcusdt',
    direction: '-',
    price: '63000',
    channel: 'email,notif',
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
  @POST("/v2/price-alerts")
  Call<JsonObject> createPriceAlert(
    @Field("tp") String alertType,
    @Field("market") String market,
    @Field("direction") String direction,
    @Field("price") String price,
    @Field("channel") String channel,
  );
}

APIService api = retrofit.create(APIService.class);

Call<JsonObject> call = api.createPriceAlert("price", "btcusdt", "-", "63000", "email,notif");
```

```plaintext
POST /v2/price-alerts HTTP/1.1
Host: apiv2.nobitex.ir
Authorization: Token yourTOKENhereHEX0000000000
Content-Type: application/json
{"tp": "price", "market": "btcusdt", "direction": "-", "price": "63000", "channel": "email,notif"}
```

> در صورت فراخوانی درست، پاسخ به این صورت خواهد بود:

```json
{
  "status": "ok",
  "alert": {
    "id": 3,
    "createdAt": "2021-08-10T20:07:07.977328+00:00",
    "market": "BTCUSDT",
    "type": "Price",
    "direction": "-",
    "price": "63000.0000000000",
    "description": "",
    "channel": "Email/Notif"
  }
}
```

برای ایجاد یک اعلان قیمت از این نوع درخواست استفاده نمایید:

* **درخواست:** `POST /v2/price-alerts`
* **<a href="/#ratelimit">محدودیت فراخوانی:</a>** 10 درخواست در 5 دقیقه



### پارامترهای ورودی

پارامتر | نوع | پیش‌فرض | توضیحات | نمونه
------- | ---- | ---- | --------- | ---------
type | string | الزامی | نوع اعلان | "price"
market | string | الزامی | بازار مورد نظر | "BTCUSDT"
direction | string | الزامی | جهت تغییر بازار<sup>1</sup> | "-"
price | monetary | الزامی | قیمت مورد نظر | "63000"
channel | string | الزامی | کانال اطلاع‌رسانی<sup>2</sup> | "email,notif"
description | string | اختیاری | توضیحات | "sample description"

1. **جهت تغییر بازار:** دو علامت + و - قابل قبول است.
2. **کانال‌های اطلاع‌رسانی:** شامل email ,notif, sms می‌باشد که پیامک در آینده پشتیبانی خواهد شد.
جهت انتخاب چند کانال به کمک ویرگول کانال‌ها را ترکیب کنید. (مثل: `email,notif`)


### پارامترهای پاسخ

پارامتر | نوع | توضیحات | نمونه
------- | ---- | --------- | ---------
status | string | وضعیت پاسخ | ok
alert | PriceAlert | اعلان قیمت ایجاد شده | {"id": 3, ...}



### حالت‌های خطا

کد خطا | توضیحات
---- | ----
InvalidSymbol | نماد بازار (market) نامعتبر است.
ParseError | مقادیر ورودی‌ها از الگوی خواسته شده پیروی نمی‌کند.
ValidationError | ورودی‌های الزامی ارسال نشده است.


## ویرایش اعلان قیمت

>نمونه درخواست:

```shell
curl -X POST 'https://apiv2.nobitex.ir/v2/price-alerts' \
  -H 'Authorization: Token yourTOKENhereHEX0000000000' \
  -H 'Content-Type: application/json' \
  --data '{"pk": 3, "tp": "price", "market": "btcusdt", "direction": "+", "price": "64000", "channel": "notif"}'
```

```javascript
api.post('/v2/price-alerts', {
  pk: 3,
  tp: 'price',
  market: 'btcusdt',
  direction: '+',
  price: '64000',
  channel: 'notif',
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
  @POST("/v2/price-alerts")
  Call<JsonObject> updatePriceAlert(
    @Field("pk") int alertId,
    @Field("tp") String alertType,
    @Field("market") String market,
    @Field("direction") String direction,
    @Field("price") String price,
    @Field("channel") String channel,
  );
}

APIService api = retrofit.create(APIService.class);

Call<JsonObject> call = api.updatePriceAlert(3, "price", "btcusdt", "+", "64000", "notif");
```

```plaintext
POST /v2/price-alerts HTTP/1.1
Host: apiv2.nobitex.ir
Authorization: Token yourTOKENhereHEX0000000000
Content-Type: application/json
{"pk": 3, tp": "price", "market": "btcusdt", "direction": "-", "price": "63000", "channel": "email,notif"}
```

> در صورت فراخوانی درست، پاسخ به این صورت خواهد بود:

```json
{
  "status": "ok",
  "alert": {
    "id": 3,
    "createdAt": "2021-08-10T20:07:07.977328+00:00",
    "market": "BTCUSDT",
    "type": "Price",
    "direction": "+",
    "price": "64000.0000000000",
    "description": "",
    "channel": "Notif"
  }
}
```

برای ویرایش یک اعلان قیمت، از درخواستی مشابه درخواست ایجاد اعلان قیمت استفاده می‌کنیم، با این تفاوت که شناسه اعلان قیمت مورد نظر نیز به پارامترهای ورودی افزوده می‌شود:

* **درخواست:** `POST /v2/price-alerts`
* **<a href="/#ratelimit">محدودیت فراخوانی:</a>** 10 درخواست در 5 دقیقه


### پارامترهای ورودی

پارامتر | نوع | پیش‌فرض | توضیحات | نمونه
------- | ---- | ---- | --------- | ---------
pk | integer | الزامی | شناسه یکتای اعلان | 3 <tr><td>...<td colspan=4>مشابه پارامترهای ورودی ایجاد اعلان قیمت

### پارامترهای پاسخ

پارامتر | نوع | توضیحات | نمونه
------- | ---- | --------- | ---------
status | string | وضعیت پاسخ | ok
alert | PriceAlert | اعلان قیمت به‌روز شده | {"id": 3, ...}



### حالت‌های خطا
  * در صورتی که کاربر اعلانی با شناسه ارسال شده نداشته باشد، خطای 404 بازگردانده می‌شود.
  * سایر خطاها مشابه حالات خطا در ایجاد اعلان قیمت است.

## حذف اعلان قیمت

>نمونه درخواست:

```shell
curl -X DELETE 'https://apiv2.nobitex.ir/v2/price-alerts?delete_item=1,3' \
  -H 'Authorization: Token yourTOKENhereHEX0000000000'
```

```javascript
api.delete('/v2/price-alerts?delete_item=1,3', {
  headers: {Authorization: 'Token yourTOKENhereHEX0000000000'},
}).then((response) => {
  console.log(response);
});
```

```java
public interface APIService {
  @Headers({"Authorization: Token yourTOKENhereHEX0000000000"})
  @DELETE("/v2/price-alerts")
  Call<JsonObject> deletePriceAlerts(@Query("delete_item") String deleteItems);
}

APIService api = retrofit.create(APIService.class);

Call<JsonObject> call = api.deletePriceAlerts("1,3");
```

```plaintext
DELETE /v2/price-alerts?delete_item=1,3 HTTP/1.1
Host: apiv2.nobitex.ir
Authorization: Token yourTOKENhereHEX0000000000
```

> در صورت فراخوانی درست، پاسخ به این صورت خواهد بود:

```json
{
  "status": "ok"
}
```

برای حذف اعلان‌های قیمت خود از این نوع درخواست استفاده نمایید:

* **درخواست:** `DELETE /v2/price-alerts`
* **<a href="/#ratelimit">محدودیت فراخوانی:</a>** 25 درخواست در 5 دقیقه


### پارامترهای ورودی

پارامتر | نوع | پیش‌فرض | توضیحات | نمونه
------- | ---- | ---- | --------- | ---------
delete_item | string | الزامی | شناسه اعلان‌های قیمت مدنظر حذف | "1,3"

### پارامترهای پاسخ

پارامتر | نوع | توضیحات | نمونه
------- | ---- | --------- | ---------
status | string | وضعیت پاسخ | ok


### حالت‌های خطا

کد خطا | توضیحات
---- | ----
ValidationError | شناسه اعلان قیمتی برای حذف ارسال نشده است.
