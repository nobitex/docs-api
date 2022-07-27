#صرافی
صرافی نوبیتکس، امکان خرید و فروش مستقیم دارایی را با قیمت لحظه بازار جهانی فراهم می‌کند.
با وجود قابلیت مبادله در صرافی، وابستگی به میزان عرضه و تقاضا در بازار داخلی نوبیتکس کاهش می‌یابد.

<aside class="notice">
در حال حاضر، مانند بازار داخلی نوبیتکس، تبدیل رمزارزها در صرافی تنها در بازارهای ریالی و تتری امکان پذیر است.
</aside>

<aside class="notice">
احراز هویت در API های این مجموعه الزامی است.
</aside>

##تخمین قیمت معامله

>نمونه درخواست:

```shell
curl -X POST 'https://api.nobitex.ir/exchange/estimate' \
  -H 'Authorization: Token yourTOKENhereHEX0000000000' \
  -H 'Content-Type: application/json' \
  --data '{"type": "sell", "srcCurrency": "BTC", "dstCurrency": "USDT", "amount": "0.01"}'
```

```javascript
api.post('/exchange/estimate', {
  type: 'sell',
  srcCurrency: 'BTC',
  dstCurrency: 'USDT',
  amount: '0.01',
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
  @POST("/exchange/estimate")
  Call<JsonObject> getExchangePriceEstimate(@Field("type") String type, @Field("srcCurrency") String srcCurrency, 
                                            @Field("dstCurrency") String dstCurrency, @Field("amount") String amount);
}

APIService api = retrofit.create(APIService.class);

Call<JsonObject> call = api.getExchangePriceEstimate("sell", "BTC", "USDT", "0.01");
```

```swift
// Contact us
```

```plaintext
POST /exchange/estimate HTTP/1.1
Host: api.nobitex.ir
Authorization: Token yourTOKENhereHEX0000000000
Content-Type: application/json
{"type": "sell", "srcCurrency": "BTC", "dstCurrency": "USDT", "amount": "0.01"}
```

> در صورت فراخوانی درست، پاسخ به این صورت خواهد بود:

```json
{
  "status": "ok",
  "price": "56707.59"
}

```
برای دریافت قیمت تخمینی در صرافی متناسب با قیمت بازار جهانی و تخمین قیمت معامله از این نوع درخواست استفاده نمایید:

* آدرس: `POST /exchange/estimate`

* پارامترهای ورودی:

پارامتر | نوع | پیش‌فرض | توضیحات | نمونه
------- | ---- | ---- | --------- | ---------
type | string | الزامی | نوع معامله | "sell"
srcCurrency | string | الزامی | رمزارز مبدا | "BTC"
dstCurrency | string | الزامی | ارز مقصد | "USDT"
amount | monetary | اختیاری | مقدار رمزارز مورد معامله | "0.01"

1. **نوع معامله:** دو مقدار `sell` برای فروش و `buy` برای خرید قابل قبول است.
2. **رمزارز مبدا:** بایستی نماد یکی از رمزارزهای `BTC`، `ETH`، `LTC`، `XRP`، `BCH`، `BNB`، `EOS`، `DOGE`، `XLM`، `TRX`، `ETC`، `ADA`، `LINK`، `DAI`، `DOT`، `UNI`، `AAVE`، `GRT`، `ADA` و `SHIB` باشد.
3. **ارز مقصد:** می‌تواند یکی از دو مقدار `RLS` و `USDT` باشد.

* پارامترهای پاسخ:

پارامتر | نوع | توضیحات | نمونه
------- | ---- | --------- | ---------
status | string | وضعیت پاسخ | ok
price | monetary | قیمت تخمینی معامله | "56707.59"

<aside class="notice">
محدودیت فراخوانی : 30 درخواست در دقیقه
</aside>

* حالت‌های خطا

کد خطا | توضیحات
---- | ----
ParseError |نوع یا شرط الزامی بودن یکی از پارامترهای ورودی رعایت نشده است.

##ثبت معامله

>نمونه درخواست:

```shell
curl -X POST 'https://api.nobitex.ir/exchange/create-trade' \
  -H 'Authorization: Token yourTOKENhereHEX0000000000' \
  -H 'Content-Type: application/json' \
  --data '{"type": "sell", "srcCurrency": "BTC", "dstCurrency": "USDT", "amount": "0.01", "price": "56707.59"}'
```

```javascript
api.post('/exchange/create-trade', {
  type: 'sell',
  srcCurrency: 'BTC',
  dstCurrency: 'USDT',
  amount: '0.01',
  price: '56707.59',
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
  @POST("/exchange/create-trade")
  Call<JsonObject> createExchangeTrade(@Field("type") String type, @Field("srcCurrency") String srcCurrency, 
                                       @Field("dstCurrency") String dstCurrency, @Field("amount") String amount,
                                       @Field("price") String price);
}

APIService api = retrofit.create(APIService.class);

Call<JsonObject> call = api.createExchangeTrade("sell", "BTC", "USDT", "0.01", "56707.59");
```

```swift
// Contact us
```

```plaintext
POST /exchange/create-trade HTTP/1.1
Host: api.nobitex.ir
Authorization: Token yourTOKENhereHEX0000000000
Content-Type: application/json
{"type": "sell", "srcCurrency": "BTC", "dstCurrency": "USDT", "amount": "0.01", "price": "56707.59"}
```

> در صورت فراخوانی درست، پاسخ به این صورت خواهد بود:

```json
{
  "status": "ok",
  "trade": {
    "id": 3,
    "status": "New",
    "created_at": "2021-11-22T14:40:36.129372+00:00",
    "isSell": true,
    "srcCurrency": "Bitcoin",
    "dstCurrency": "Tether",
    "price": "56718.32",
    "amount": "0.01"
  }
}

```
برای ثبت معامله قیمت تخمینی دریافت شده از مرحله قبل و اطلاعات معامله را مطابق این درخواست ارسال نمایید:

* آدرس: `POST /exchange/create-trade`

* پارامترهای ورودی:

پارامتر | نوع | پیش‌فرض | توضیحات | نمونه
------- | ---- | ---- | --------- | ---------
type | string | الزامی | نوع معامله | "sell"
srcCurrency | string | الزامی | رمزارز مبدا | "BTC"
dstCurrency | string | الزامی | ارز مقصد | "USDT"
amount | monetary | الزامی | مقدار رمزارز مورد معامله | "0.01"
price | monetary | الزامی | قیمت مورد انتظار واحد رمزارز | "56707.59"

1. **نوع معامله:** دو مقدار `sell` برای فروش و `buy` برای خرید قابل قبول است.
2. **رمزارز مبدا:** بایستی نماد یکی از رمزارزهای `BTC`، `ETH`، `LTC`، `XRP`، `BCH`، `BNB`، `EOS`، `DOGE`، `XLM`، `TRX`، `ETC`، `ADA`، `LINK`، `DAI`، `DOT`، `UNI`، `AAVE`، `GRT`، `ADA` و `SHIB` باشد.
3. **ارز مقصد:** می‌تواند یکی از دو مقدار `IRT` و `USDT` باشد.

<aside class="notice">
ارزش معاملات ریالی بایستی بین 500,000 تومان تا 25,000,000 تومان باشد و ارزش معاملات تتری باید بین 20 تا 1000 تتر باشد.
</aside>

* پارامترهای پاسخ:

پارامتر | نوع | توضیحات | نمونه
------- | ---- | --------- | ---------
status | string | وضعیت پاسخ | ok
trade | ExchangeTrade | معامله انجام شده | {"id": 3, ...}

###شی ExchangeTrade

پارامتر | نوع | توضیحات | نمونه
------- | ---- | --------- | ---------
id | integer | شناسه معامله | 3
status | string | وضعیت معامله | "New"
created_at | iso-string | زمان معامله | "2021-11-22T14:40:36.129372+00:00"
isSell | boolean | معامله خرید است؟ | true
srcCurrency | string | رمزارز مبدا | "Bitcoin"
dstCurrency | string | ارز مقصد | "Tether"
amount | monetary | مقدار معامله | "0.01"
price | monetary | قیمت معامله | "56718.32"

<aside class="notice">
محدودیت فراخوانی : 10 درخواست در دقیقه
</aside>

<aside class="notice">
قیمت نهایی معامله ممکن است تا 1% نوسان نسبت به قیمت تخمین زده شده داشته باشد.
</aside>

* حالت‌های خطا

کد خطا | توضیحات
---- | ----
ExchangeTradeFailed | معامله انجام نشد.
ParseError |نوع یا شرط الزامی بودن یکی از پارامترهای ورودی رعایت نشده است.

**دلایل عدم انجام معامله:**

1. بازار درخواستی پشتیبانی نمی‌شود.
2. مقدار یا قیمت بسیار کم و نزدیک به صفر است.
3. قیمت مورد انتظار (قیمت در زمان تخمین) با قیمت لحظه‌ای بازار جهانی بیش از 1% اختلاف دارد.
4. ارزش ریالی / تتری معامله در محدوده مجاز نیست.

##لیست معاملات

>نمونه درخواست:

```shell
curl 'https://api.nobitex.ir/exchange/trades-list' \
  -H 'Authorization: Token yourTOKENhereHEX0000000000' \
```

```javascript
api.get('/exchange/trades-list', {
  headers: {Authorization: 'Token yourTOKENhereHEX0000000000'},
}).then((response) => {
  console.log(response);
});
```

```java
public interface APIService {
  @Headers({"Authorization: Token yourTOKENhereHEX0000000000"})
  @GET("/exchange/trades-list")
  Call<JsonObject> listExchangeTrades();
}

APIService api = retrofit.create(APIService.class);

Call<JsonObject> call = api.listExchangeTrades();
```

```swift
// Contact us
```

```plaintext
GET /exchange/trades-list HTTP/1.1
Host: api.nobitex.ir
Authorization: Token yourTOKENhereHEX0000000000
```

> در صورت فراخوانی درست، پاسخ به این صورت خواهد بود:

```json
{
  "status": "ok",
  "trades": [
    {
      "id": 1,
      "status": "Done",
      "created_at": "2021-10-28T09:16:17.428375+00:00",
      "isSell": false,
      "srcCurrency": "Bitcoin",
      "dstCurrency": "﷼",
      "price": "13498884000",
      "amount": "0.0010000000"
    },
    {
      "id": 2,
      "status": "Canceled",
      "created_at": "2021-11-13T11:34:40.781904+00:00",
      "isSell": false,
      "srcCurrency": "Ethereum",
      "dstCurrency": "﷼",
      "price": "238000",
      "amount": "68"
    },
    {
      "id": 3,
      "status": "New",
      "created_at": "2021-11-22T14:40:36.129372+00:00",
      "isSell": true,
      "srcCurrency": "Bitcoin",
      "dstCurrency": "Tether",
      "price": "56718.32",
      "amount": "0.01"
    }
  ]
}
```
برای دریافت لیست معاملات کاربر از این نوع درخواست استفاده نمایید:

* آدرس: `GET /exchange/trades-list`

* پارامترهای پاسخ:

پارامتر | نوع | توضیحات | نمونه
------- | ---- | --------- | ---------
status | string | وضعیت پاسخ | ok
trades | list of ExchangeTrade | لیست معاملات صرافی کاربر | []

<aside class="notice">
محدودیت فراخوانی : 10 درخواست در دقیقه
</aside>

<aside class="notice">
دارای <a href="/#pagination">صفحه‌بندی</a> / اندازه صفحه پیش‌فرض: 15
</aside>
