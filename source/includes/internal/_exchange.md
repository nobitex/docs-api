#صرافی
صرافی نوبیتکس، امکان خرید و فروش مستقیم دارایی را با قیمت لحظه بازار جهانی فراهم می‌کند.
با وجود قابلیت مبادله در صرافی، وابستگی به میزان عرضه و تقاضا در بازار داخلی نوبیتکس کاهش می‌یابد.

### نکات و ملاحظات
1. در حال حاضر، مانند بازار داخلی نوبیتکس، تبدیل رمزارزها در صرافی تنها در بازارهای ریالی و تتری امکان پذیر است.
2. احراز هویت در API های این مجموعه الزامی است.


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
    "price": "173.75",
    "token": "02edda54886a47249b668bf48995b911",
    "tokenTtl": 10.0
}

```
برای دریافت قیمت تخمینی در صرافی متناسب با قیمت بازار جهانی و تخمین قیمت معامله از این نوع درخواست استفاده نمایید:

* **درخواست:** `POST /exchange/estimate`
* **محدودیت فراخوانی:** 30 درخواست در دقیقه

### پارامترهای ورودی

پارامتر | نوع | پیش‌فرض | توضیحات | نمونه
------- | ---- | ---- | --------- | ---------
type | string | الزامی | نوع معامله | "sell"
srcCurrency | string | الزامی | رمزارز مبدا | "BTC"
dstCurrency | string | الزامی | ارز مقصد | "USDT"
amount | monetary | اختیاری | مقدار رمزارز مورد معامله | "0.01"

1. **نوع معامله:** دو مقدار `sell` برای فروش و `buy` برای خرید قابل قبول است.
2. **رمزارز مبدا:** بایستی نماد یکی از رمزارزهای `BTC`، `ETH`، `LTC`، `XRP`، `BCH`، `BNB`، `EOS`، `DOGE`، `XLM`، `TRX`، `ETC`، `ADA`، `LINK`، `DAI`، `DOT`، `UNI`، `AAVE`، `GRT`، `ADA` و `SHIB` باشد.
3. **ارز مقصد:** می‌تواند یکی از دو مقدار `RLS` و `USDT` باشد.

### پارامترهای پاسخ

پارامتر | نوع | توضیحات | نمونه
------- | ---- | --------- | ---------
status | string | وضعیت پاسخ | ok
price | monetary | قیمت تخمینی معامله | "56707.59"
token | string | توکن تضمین قیمت | "e2146258302843a9b1e7c78967e062f0"
tokenTtl | float | زمان معتبر بودن توکن تضمین قیمت‌(ثانیه) | 10.0


### حالت‌های خطا

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
    "src_wallet": {
        "id": 210430,
        "currency": "sol",
        "balance": "99999999995.5",
        "blockedBalance": "0",
        "activeBalance": "99999999995.5",
        "rialBalance": 0,
        "rialBalanceSell": 0
    },
    "dst_wallet": {
        "id": 5,
        "currency": "usdt",
        "balance": "100000000769.555",
        "blockedBalance": "0",
        "activeBalance": "100000000769.555",
        "rialBalance": 0,
        "rialBalanceSell": 0
    },
    "trade": {
        "id": 25,
        "status": "Done",
        "created_at": "2022-09-11T11:50:36.729740+00:00",
        "isSell": true,
        "srcCurrency": "Solana",
        "dstCurrency": "Tether",
        "srcSymbol": "sol",
        "dstSymbol": "usdt",
        "price": "173.75",
        "amount": "0.5"
    }
}

```
برای ثبت معامله قیمت تخمینی دریافت شده از مرحله قبل و اطلاعات معامله را مطابق این درخواست ارسال نمایید:

* **درخواست:** `POST /exchange/create-trade`
* **محدودیت فراخوانی:** 10 درخواست در دقیقه


### پارامترهای ورودی

پارامتر | نوع | پیش‌فرض | توضیحات | نمونه
------- | ---- | ---- | --------- | ---------
type | string | الزامی | نوع معامله | "sell"
srcCurrency | string | الزامی | رمزارز مبدا | "BTC"
dstCurrency | string | الزامی | ارز مقصد | "USDT"
amount | monetary | الزامی | مقدار رمزارز مورد معامله | "0.01"
price | monetary | الزامی | قیمت مورد انتظار واحد رمزارز | "56707.59"
token | string | الزامی | توکن تضمین قیمت | "e2146258302843a9b1e7c78967e062f0"
getWallets | boolean | اختیاری | دریافت کیف پول‌های رمزارز مبدا و مقصد کاربر | "true"

1. **نوع معامله:** دو مقدار `sell` برای فروش و `buy` برای خرید قابل قبول است.
2. **رمزارز مبدا:** بایستی نماد یکی از رمزارزهای `BTC`، `ETH`، `LTC`، `XRP`، `BCH`، `BNB`، `EOS`، `DOGE`، `XLM`، `TRX`، `ETC`، `ADA`، `LINK`، `DAI`، `DOT`، `UNI`، `AAVE`، `GRT`، `ADA` و `SHIB` باشد.
3. **ارز مقصد:** می‌تواند یکی از دو مقدار `IRT` و `USDT` باشد.


### پارامترهای پاسخ

پارامتر | نوع | توضیحات | نمونه
------- | ---- | --------- | ---------
status | string | وضعیت پاسخ | ok
trade | ExchangeTrade | معامله انجام شده | {"id": 3, ...}
src_wallet | Wallet | کیف پول | {"id": 3, ...}
src_wallet | Wallet | کیف پول | {"id": 3, ...}

### شی ExchangeTrade

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


### حالت‌های خطا

کد خطا | توضیحات
---- | ----
ExchangeTradeFailed | معامله انجام نشد.
ParseError |نوع یا شرط الزامی بودن یکی از پارامترهای ورودی رعایت نشده است.

**دلایل عدم انجام معامله:**

1. بازار درخواستی پشتیبانی نمی‌شود.
2. مقدار یا قیمت بسیار کم و نزدیک به صفر است.
3. قیمت مورد انتظار (قیمت در زمان تخمین) با قیمت لحظه‌ای بازار جهانی بیش از 1% اختلاف دارد.
4. ارزش ریالی / تتری معامله در محدوده مجاز نیست.



### نکات و ملاحظات
1. ارزش معاملات ریالی بایستی بین 500,000 تومان تا 25,000,000 تومان باشد و ارزش معاملات تتری باید بین 20 تا 1000 تتر باشد.
2. قیمت نهایی معامله ممکن است تا 1% نوسان نسبت به قیمت تخمین زده شده داشته باشد.



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
      "srcSymbol": "btc",
      "dstSymbol": "rls",
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
      "srcSymbol": "eth",
      "dstSymbol": "rls",
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
      "srcSymbol": "btc",
      "dstSymbol": "usdt",
      "price": "56718.32",
      "amount": "0.01"
    }
  ]
}
```
برای دریافت لیست معاملات کاربر از این نوع درخواست استفاده نمایید:

* **درخواست:** `GET /exchange/trades-list`
* **محدودیت فراخوانی:** 10 درخواست در دقیقه
* **<a href="/#pagination">صفحه بندی:</a>** دارد (پیش فرض 15)


### پارامترهای پاسخ

پارامتر | نوع | توضیحات | نمونه
------- | ---- | --------- | ---------
status | string | وضعیت پاسخ | ok
trades | list of ExchangeTrade | لیست معاملات صرافی کاربر | []
