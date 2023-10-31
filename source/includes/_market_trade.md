# معامله در بازار

## ثبت سفارش جدید

```shell
curl 'https://api.nobitex.ir/market/orders/add' \
  -X POST \
  -H "Authorization: Token yourTOKENhereHEX0000000000" \
  -H "content-type: application/json" \
  --data '{"type":"buy","srcCurrency":"btc","dstCurrency":"rls","amount":"0.6","price":520000000,"clientOrderId":"order1"}'
```

```plaintext
http POST https://api.nobitex.ir/market/orders/add \
  type=buy srcCurrency=btc dstCurrency=rls amount=0.6 price=520000000 clientOrderId=order1
```

> در صورت فراخوانی درست، پاسخ به این صورت خواهد بود:

```json
{
  "status": "ok",
  "order": {
    "type": "sell",
    "srcCurrency": "Bitcoin",
    "dstCurrency": "ریال",
    "price": "520000000",
    "amount": "0.6",
    "totalPrice": "312000000.0",
    "matchedAmount": 0,
    "unmatchedAmount": "0.6",
    "id": 25,
    "status": "Active",
    "partial": false,
    "fee": 0,
    "created_at": "2018-11-28T11:36:13.592827+00:00",
    "clientOrderId": "order1",
  }
}
```

برای ثبت سفارش معامله در بازار نوبیتکس از این درخواست استفاده نمایید.

- **درخواست:**: `POST /market/orders/add`
- **محدودیت فراخوانی:** ۲۰۰ درخواست در هر ۱۰ دقیقه

ثبت سفارش الزاماً به معنی انجام معامله نیست و بسته به نوع و قیمت سفارش و وضعیت لحظه‌ای بازار ممکن است معامله انجام شود یا نشود. با درخواست «مشاهده وضعیت سفارش» می‌توانید از وضعیت سفارش خود مطلع شوید.

سفارش‌ها پس از ثبت، پیش از ورود به دفتر معاملاتی و انجام معامله، مجدداً از نظر اعتبار مورد بررسی قرار گرفته و در صورت نامعتبر بودن، به وضعیت «رد شده» برده خواهند شد. به همین علت در صورتی که سفارش‌های شما ثبت می‌شود ولی بلافاصله به وضعیت «رد شده» تغییر حالت پیدا می‌کنند، پارامترهای ارسالی خود به ویژه مقدار و قیمت سفارش و موجودی حساب خود را دقیق‌تر بررسی نمایید.

### پارامترهای ورودی

| پارامتر     | نوع      | پیش‌فرض | توضیحات            | نمونه                                             |
|-------------|----------|--------|--------------------|---------------------------------------------------|
| type        | string   | الزامی | نوع سفارش          | `buy` یا `sell`                                   |
| execution   | string   | `limit` | نحوه‌ی اجرای سفارش | `market`: با قیمت بازار<br/>`limit`: با قیمت معین |
| srcCurrency | string   | الزامی | رمزارز مبدا        | `btc` یا `eth` یا `xrp` یا ...                    |
| dstCurrency | string   | الزامی | رمزارز مقصد        | `rls` یا `usdt`                                   |
| amount      | monetary | الزامی | مقدار رمزارز (حجم) | `0.0623`                                          |
| price       | monetary | الزامی | قیمت واحد          | `1210000000`                                      |
| clientOrderId       | string | `null` | شناسه سفارش کاربر، تا ۳۲ کاراکتر،‌ یکتا  برای هر کاربر و در میان سفارش های open/active/inactive (آزمایشی)          | `order1`                                      |


> نمونه سفارش حد ضرر:

```shell
curl 'https://api.nobitex.ir/market/orders/add' \
  -X POST \
  -H "Authorization: Token yourTOKENhereHEX0000000000" \
  -H "content-type: application/json" \
  --data '{"type":"sell","srcCurrency":"doge","dstCurrency":"rls","amount":"64","execution":"stop_market","stopPrice":47500,"clientOrderId":"order1"}'
```

```plaintext
http POST https://api.nobitex.ir/market/orders/add \
  type=sell srcCurrency=doge dstCurrency=rls amount=64 execution=stop_market stopPrice=47500 clientOrderId=order1
```

```json
{
  "status": "ok",
  "order": {
    "id": 26,
    "type": "sell",
    "execution": "StopMarket",
    "market": "DOGE-RLS",
    "srcCurrency": "Dogecoin",
    "dstCurrency": "\ufdfc",
    "price": "market",
    "amount": "64",
    "param1": "47500",
    "totalPrice": "0",
    "totalOrderPrice": "3008000",
    "matchedAmount": "0",
    "unmatchedAmount": "64",
    "status": "Inactive",
    "partial": false,
    "fee": 0,
    "created_at": "2022-01-17T12:14:18.005896+00:00",
    "averagePrice": "0",
    "clientOrderId": "order1",
  }
}
```

### سفارش حد ضرر

این سفارش در زمان رسیدن قیمت بازار به قیمت توقف فعال خواهد شد. کاربرد اصلی آن، جلوگیری از زیان در صورت تغییر غیرمنتظره قیمت بازار است.
با ثبت این نوع سفارش می‌توان بدون نیاز به رصد مداوم بازار، در صورت خروج قیمت از بازه مد نظر، اقدام به تبدیل دارایی نمود.

#### پارامترهای ویژه حد ضرر

| پارامتر   | نوع      | پیش‌فرض | توضیحات            | نمونه                                               |
|-----------|----------|---------|--------------------|-----------------------------------------------------|
| execution | string   | الزامی  | نحوه‌ی اجرای سفارش | `stop_market`: حد ضرر<br/>`stop_limit`: حد ضرر معین |
| stopPrice | monetary | الزامی  | قیمت توقف          | `1180000000`                                        |

> نمونه سفارش OCO:

```shell
curl 'https://api.nobitex.ir/market/orders/add' \
  -X POST \
  -H "Authorization: Token yourTOKENhereHEX0000000000" \
  -H "content-type: application/json" \
  --data '{"type":"buy","srcCurrency":"btc","dstCurrency":"usdt","amount":"0.01","mode":"oco","price":42390,"stopPrice":42700,"stopLimitPrice":42715,"clientOrderId":"order1"}'
```

```plaintext
http POST https://api.nobitex.ir/market/orders/add \
  type=buy srcCurrency=btc dstCurrency=usdt amount=0.01 mode=oco price=42390 stopPrice=42700 stopLimitPrice=42715 clientOrderId=order1
```

> در صورت فراخوانی درست، پاسخ به این صورت خواهد بود:

```json
{
  "status": "ok",
  "orders": [
    {
      "id": 27,
      "type": "buy",
      "execution": "Limit",
      "market": "BTC-USDT",
      "srcCurrency": "Bitcoin",
      "dstCurrency": "Tether",
      "price": "42390",
      "amount": "0.01",
      "totalPrice": "0",
      "totalOrderPrice": "423.9",
      "matchedAmount": "0",
      "unmatchedAmount": "0.01",
      "status": "Active",
      "created_at": "2022-04-10T10:12:38.402795+00:00",
      "pairId": 28,
      "clientOrderId": "order1"
    },
    {
      "id": 28,
      "type": "buy",
      "execution": "StopLimit",
      "market": "BTC-USDT",
      "srcCurrency": "Bitcoin",
      "dstCurrency": "Tether",
      "price": "42715",
      "amount": "0.01",
      "param1": "42700",
      "totalPrice": "0",
      "totalOrderPrice": "427.15",
      "matchedAmount": "0",
      "unmatchedAmount": "0.01",
      "status": "Inactive",
      "created_at": "2022-04-10T10:12:38.402795+00:00",
      "pairId": 27,
      "clientOrderId": null
    }
  ]
}
```

### سفارش OCO

یک سفارش OCO در واقع متشکل از دو سفارش است: یک سفارش با _قیمت معین_، و یک سفارش با _حد ضرر معین_.

در صورتی که هر کدام از این دو سفارش انجام شوند، سفارش دیگر لغو خواهد شد.
به عنوان مثال، اگر قیمت بازار، به قیمت سفارش معین برسد، سفارش معین اجرا می‌شود و سفارش حد ضرر، به طور خودکار لغو می‌گردد.
عکس این حالت نیز برقرار است. اگر قیمت به حد ضرر تعیین شده برسد، سفارش حد ضرر اجرا شده، سفارش با قیمت معین لغو می‌گردد.

#### پارامترهای ویژه OCO

| پارامتر        | نوع      | پیش‌فرض | توضیحات          | نمونه        |
|----------------|----------|---------|------------------|--------------|
| mode           | string   | الزامی  | حالت سفارش       | `oco`        |
| stopPrice      | monetary | الزامی  | قیمت توقف حد ضرر | `1180000000` |
| stopLimitPrice | monetary | الزامی  | قیمت حد ضرر      | `1179500000` |

<aside class="notice">
شرط قیمت سفارش OCO:
<ul>
<li><b>خرید:</b> price < آخرین قیمت بازار < stopPrice و stopLimitPrice</li>
<li><b>فروش:</b> price > آخرین قیمت بازار > stopPrice و stopLimitPrice</li>
</ul>
</aside>

### حالت‌های خطا

> در صورت عدم پذیرش سفارش، پاسخ به این صورت خواهد بود:

```json
{
  "status": "failed",
  "code": "ErrorCode",
  "message": "Human readable error message"
}
```

در صورتی که درخواست ثبت سفارش معتبر نباشد، ممکن است یکی از این خطاها برگردانده شود. در صورت دریافت هر یک از این خطاها، آن سفارش شما ثبت نشده است و در صورت تمایل باید درخواست ثبت آن سفارش را دوباره ارسال کنید.

کد خطا  |  توضیحات
-------- | ---------
InvalidOrderPrice | قیمت سفارش (price) تعیین نشده یا اشتباه است
BadPrice | در سفارش عادی: قیمت تعیین شده برای سفارش نسبت به قیمت فعلی بازار تفاوت زیادی دارد. قیمت سفارش خود را در بازه‌ی ۳۰٪ قیمت کنونی بازار تعیین کنید.<br/> در سفارش حد ضرر: قیمت تعیین شده برای سفارش بازار نمی‌تواند از قیمت توقف بهتر باشد.
PriceConditionFailed | شرط قیمت در سفارش لحاظ نشده است. شرط قیمت میان پارامترهای قیمتی و قیمت بازار تعریف می‌شود.
OverValueOrder | مقدار سفارش فروش (amount) یا ارزش کل سفارش خرید (amount*price) از موجودی کیف پول نوبیتکس شما کمتر است.
SmallOrder | حداقل ارزش معامله رعایت نشده است. حداقل ارزش معامله برای بازارهای ریالی، 3 میلیون ریال و برای بازارهای تتری، ۱۱ تتر است و مبلغ کل سفارش (amount*price) باید بیشتر از این حداقل باشد.
DuplicateOrder | سفارشی با همین مشخصات توسط کاربر شما در بازه زمانی ده ثانیه اخیر ارسال شده است.
InvalidMarketPair | رمزارز مبدا (srcCurrency) یا رمزارز مقصد (dstCurrency) به درستی مقداردهی نشده است یا چنین بازاری در نوبیتکس وجود ندارد.
MarketClosed | بازار مد نظر در حال حاضر به صورت موقت بسته است.
TradingUnavailable | کاربر اجازه‌ی معامله ندارد، فرآیند احراز هویت خود را تکمیل نمایید.
FeatureUnavailable | شما از کاربران مجاز به استفاده از امکانات آزمایشی نیستید.
DuplicateClientOrderId | شناسه سفارش کاربر تکراری است (برای هر کاربر در لحطه فقط یه سفارش open/active/inactive با یک شماره سفارش ممکن است).

### نکات و ملاحظات
1. **واحدها:** واحد قیمت در بازارهای ریالی به ریال (و نه تومان) می‌باشد. واحد قیمت در بازارهای تتری نیز تتر می‌باشد. واحد پارامتر مقدار (amount) بر حسب رمزارز مبدا (srcCurrency) است.
1. **سفارش مارکت:** برای ثبت سفارش سریع (سفارش مارکت، سفارش به قیمت بازار)، مقدار پارامتر `execution` را برابر `market` ارسال نمایید. منظور از سفارش مارکت سفارشی است که کاربر درخواست دارد تا به بهترین قیمت موجود بازار مورد انجام قرار گیرد. [ℹB](https://www.binance.vision/tutorials/what-is-a-market-order) - [ℹI](https://www.investopedia.com/terms/m/marketorder.asp)
1. **تعیین محدوده مورد انتظار قیمت:** در سفارش‌های مارکت به شدت توصیه می‌شود که پارامتر `price` را نیز مشخص نمایید. این پارامتر در سفارش مارکت تخمین شما از قیمت بازار را نمایش می‌دهد و باعث می‌شود سفارش شما تنها تا جایی پر شود که قیمت معامله در بازه‌ی قیمتی مشخص شده باشد. برای نمونه اگر نوع سفارش خرید مارکت باشد و قیمت ۱۰۰ میلیون تومان تعیین شود، تنها تا جایی در بازار range کشیده می‌شود که قیمت زیر ۱۰۱ میلیون تومان باشد. برای پیش‌گیری از معاملات با قیمت ناخواسته به علت نوسانات دفعی بازار، پیشنهاد می‌شود که حتماً قیمت تقریبی مد نظر خود را در سفارش‌های مارکت نیز ارسال کنید. با این حال اگر اطمینان به کد خود و تبعات احتمالی این موضوع دارید، می‌توانید پارامتر `price` را اصلاً ارسال ننمایید که در این شرایط معامله با قیمت لحظه‌ای بازار جهانی، به هر میزان که باشد تا بازه نوسان ۱٪، انجام خواهد شد.
1. **دقت مقادیر پولی (monetary):** نوع monetary که در پارامترهای `amount` و `price` به کار می‌رود، بسته به بازار هر رمزارز، تعداد رقم اعشار متغیری بین ۰ تا ۸ رقم دارد. در صورت ارسال مقادیر با ارقام اعشاری بیشتر، ارقام بی‌معنی در مقدار به پایین و در قیمت به روش بانکداری گرد خواهند شد.<br>[مشاهده جدول دقت‌ها](https://nobitex.ir/policies/markets/ "بازارهای رمزارزی نوبیتکس")
1. **clientOrderId**: دقت کنید که این پارامتر برای هر کاربر در میان سفارش های open/active/inactive یکتاست.
1. **سفارش تکراری:** برای جلوگیری از ثبت سفارش تکراری ناشی از اختلالات شبکه و سرور، در صورتی که دو یا چند سفارش با پارامترهای ورودی کاملاً مشابه از جمله نوع و قیمت و مقدار، در بازه‌ی زمانی کمتر از ده ثانیه ارسال نمایید، تنها سفارش اول پذیرفته می‌شود و باقی درخواست‌های مشابه تا ده ثانیه پیام خطای `DuplicateOrder` دریافت می‌کنند. (غیرفعال در حالت Pro)
توصیه می‌شود در صورت استفاده از این حالت Pro حتما از پارامتر `clientOrderId` استفاده نمایید تا از ثبت سفارش تکراری ناشی از اختلالات شبکه و سرور جلوگیری نماید.

## مشاهده وضعیت سفارش

```shell
curl 'https://api.nobitex.ir/market/orders/status' \
  -X POST \
  -H "Authorization: Token yourTOKENhereHEX0000000000" \
  -H "content-type: application/json" \
  --data '{"id":5684}'
```

```plaintext
http POST https://api.nobitex.ir/market/orders/status \
  id=5684
```

> در صورت فراخوانی درست، پاسخ به این صورت خواهد بود:

```json
{
    "status": "ok",
    "order": {
        "unmatchedAmount": "3.0000000000",
        "fee": "0E-10",
        "matchedAmount": "0E-10",
        "partial": false,
        "price": "8500000.0000000000",
        "created_at": "2018-11-28T12:25:22.696029+00:00",
        "id": 5684,
        "srcCurrency": "Litecoin",
        "totalPrice": "25500000.00000000000000000000",
        "type": "sell",
        "dstCurrency": "\ufdfc",
        "isMyOrder": false,
        "status": "Active",
        "amount": "3.0000000000",
        "clientOrderId": "order1"
    }
}
```

برای دریافت وضعیت سفارش از این نوع درخواست استفاده نمایید:

- **درخواست:** `POST /market/orders/status`
- **محدودیت فراخوانی:** 60 درخواست در هر دقیقه

###پارامترهای ورودی:

پارامتر     | نوع    | پیش‌فرض   |   توضیحات     |  نمونه
-----------   | ----   | ------   |   ---------   | -----
id            | int    |  اختیاری  |     شناسه سفارش | `5684`
clientOrderId | string |   اختیاری  |     شناسه سفارش کاربر (آزمایشی) | `order1`


### نکات و ملاحظات

1. حتما باید حداقل یکی از دو پارامتر ‍`order` و `clientOrderId` ارسال شوند.
2. اگر هر دو پارامتر ‍`order` و `clientOrderId`  ارسال شوند، اولویت با `id` است.
3. `clientOrderId` فقط در میان سفارشات open/active/inactive جستجو میشود.
4. `clientOrderId` .در حالت آزمایشی است و ممکن است در آینده تغییر کند

**انواع مقادیر `status`:**

* Active: سفارش مقدار پر نشده (`unmatched_amount`) برای شرکت در معاملات دارد و در بازار فعال است.
* Done: سفارش تماما معامله شده است.
* Inactive: سفارش حد ضرر هنوز به محدوده قیمت توقف تعیین شده نرسیده و غیرفعال است.
* Canceled: سفارش پیش از پر شدن کامل توسط کاربر یا سامانه لغو شده است.
سفارش به چند دلیل می‌تواند توسط سامانه لغو شود:
  * مقدار سفارش کافی در بازار در بازه ۱٪ قیمت تعیین شده برای پر کردن سفارش وجود نداشته است.
  * موجودی کیف پول کاربر از طریق سایر تراکنش‌ها کاهش یافته است و از موجودی لازم برای پر شدن معامله کمتر شده است.


### حالت‌های خطا

> در صورت عدم پذیرش سفارش، پاسخ به این صورت خواهد بود:

```json
{
  "status": "failed",
  "code": "ErrorCode",
  "message": "Human readable error message"
}
```

کد خطا  |  توضیحات
-------- | ---------
NullIdAndClientOrderId |  باید یکی از دو پارامتر `id` و `clientOrderId`  ارسال شود

## فهرست سفارش‌های کاربر


```shell
curl 'https://api.nobitex.ir/market/orders/list?srcCurrency=btc&dstCurrency=usdt&details=2' \
  -H "Authorization: Token yourTOKENhereHEX0000000000"
```

```plaintext
http GET https://api.nobitex.ir/market/orders/list \
  srcCurrency=btc dstCurrency=usdt details=2
```

> در صورت فراخوانی درست، پاسخ به این صورت خواهد بود:

```json
{
  "status": "ok",
  "orders": [
    {
      "id": 173546223,
      "type": "sell",
      "execution": "Limit",
      "status": "Active",
      "srcCurrency": "Bitcoin",
      "dstCurrency": "Tether",
      "price": "9750.01",
      "amount": "0.0123",
      "matchedAmount": "0E-10",
      "averagePrice": "0",
      "fee": "0E-10",
      "clientOrderId": "order1"
    }
  ]
}
```

برای دریافت فهرست سفارش‌های خود، از این درخواست استفاده نمایید.

- **درخواست:** `GET /market/orders/list`
- **محدودیت فراخوانی:** 30 درخواست در دقیقه
- **<a href="/#pagination">صفحه بندی:</a>** دارد (پیش فرض ۱۰۰۰)

### پارامترهای ورودی
پارامتر     | نوع    | پیش‌فرض                   | توضیحات                                                                                 | نمونه
----------- | ----   |---------------------------|-----------------------------------------------------------------------------------------| -----
status | string | `open`                    | وضعیت سفارش                                                                             | `all` یا `open` یا `done` یا `close`
type | string | تمام انواع سفارش          | نوع سفارش‌های مد نظر، خرید یا فروش                                                      | `sell` یا `buy`
execution | string | تمام انواع سفارش گذاری‌ها | لیست سفارشات با نحوه سفارش‌گذاری مشخص                                                   | `limit`, `market`, `stop_limit`, `stop_market`
tradeType | string | تمام انواع سفارش          | نوع سفارش اسپات یا فروش تعهدی                                                           | `spot` یا `margin`
srcCurrency | string | تمام رمزارزها             | رمزارز مبدا                                                                             | `btc` یا `eth` یا `xrp` یا ...
dstCurrency | string | تمام رمزارزها             | رمزارز مقصد                                                                             | `rls` یا `usdt`
details | int | `1`                       | میزان جزئیات پاسخ، اعداد بزرگ‌تر تعداد فیلدهای بیشتری را از وضعیت هر سفارش بازمی‌گرداند | `1` یا `2`
fromId | int | `1`                       | با مشخص کردن این پارامتر سفارشات با شناسه بزرگتر از این عدد لیست خواهند شد              |  `100`

### توضیحات تکمیلی پارامترهای ورودی

* وضعیت سفارش یکی از مقادیر زیر می‌تواند باشد:
  * `all`: سفارش‌های در تمامی وضعیت‌ها در پاسخ بازگردانده می‌شوند.
  * `open`: سفارش‌های باز، شامل سفارش‌های فعال و غیرفعال بازگردانده می‌شوند. منظور از سفارش‌های باز غیرفعال، مثلاً سفارش‌های حد ضرری است که هنوز فعال نشده باشند.
  * `done`: سفارش‌هایی که بخشی یا تمام آن پر شده باشند بازگردانده می‌شوند.
  * `close`: سفارش‌هایی که وضعیت آن‌ها «انجام شده» یا «لغو شده» باشد بازگردانده می‌شوند.
* دو وضعیت `active` و `undone` از موارد قدیمی بوده و دیگر پشتیبانی نمی‌شوند.

### پارامترهای پاسخ
پارامتر | نوع | توضیحات | نمونه
---- | ---- | ---- | ----
orders | list of Order | فهرست سفارش‌های کاربر | `[{...Order...}, ...]`

### شی Order
فیلد | نوع | توضیحات | نمونه
---- | ---- | ---- | ----
type | string | نو ع خرید یا فروش سفارش | `buy` یا `sell`
execution | string | نوع اجرای سفارش | `Limit` یا `Market` یا `StopMarket` یا `StopLimit`
tradeType | string | نوع معامله سفارش         | `Spot` یا `Margin`
srcCurrency | string | رمزارز مبدا سفارش | `Bitcoin` یا `Ethereum` یا `TRON` یا ...
dstCurrency | string | رمزارز مقصد سفارش | `﷼` یا `Tether`
price | monetary | قیمت ثبت شده برای سفارش | `2900000000` یا `market`
amount | monetary | مقدار ثبت شده برای سفارش | `0.023324`
matchedAmount | monetary | مقدار پر شده از سفارش | `0.012001`
param1 | monetary | قیمت توقف در حد ضرر | `2790000000`

همچنین در صورتی که پارامتر `details=2` باشد این فیلدها نیز برای هر سفارش بازگردانده می‌شود:

فیلد | نوع | توضیحات | نمونه
---- | ---- | ---- | ----
id | int | شناسه سفارش | `180258791`
status | string | وضعیت فعلی سفارش | `New` یا `Active` یا `Inactive` یا `Done` یا `Canceled`
fee | monetary | کارمزد سفارش تاکنون | `0.00001`
created_at | datetime | تاریخ ایجاد سفارش | `2020-07-15T11:32:38.326809+00:00`
averagePrice | monetary | میانگین قیمت اجرا شده از سفارش | `2899500000`

### نکات و ملاحظات
1. در پاسخ حداکثر اطلاعات هزار سفارش بازگردانده می‌شود. با استفاده از پارامترهای ورودی می‌توانید تعداد محدودتری از سفارش‌های خود را دریافت کنید. همچنین پیشنهاد می‌شود که در صورتی که تعداد زیادی سفارش باز دارید، شناسه آن‌ها را در زمان ثبت سفارش دریافت و ذخیره نمایید و به صورت مستقل با استفاده از درخواست «مشاهده وضعیت سفارش» اطلاعات هر یک را بنا به نیاز به‌روز کنید. همچنین برای اطلاع از معاملات انجام شده خود می‌توانید از درخواست [فهرست معاملات کاربر](/#1cf6f6c643) استفاده نمایید.
2. منظور از وضعیت Done سفارشی است که به صورت صد در صد اجرا شده باشد. ممکن است سفارش شما به تدریج اجرا شود، و در این حالت وضعیت آن کماکان Active می‌ماند. از فیلد matchedAmount برای تشخیص وضعیت اجرا و پر شدن سفارش استفاده کنید. همچنین ممکن است سفارش شما قبل از اجرای کامل، به دلیل درخواست «لغو سفارش» یا کمبود موجودی یا تغییر شدید قیمت بازار (در سفارش‌های مارکت) لغو شود که در این حالت وضعیت آن Canceled خواهد بود، به این معنی که به صورت صد در صد اجرا نشده است ولی می‌تواند مقدار matchedAmount آن بزرگ‌تر از صفر باشد.
3. این API متناظر مواردی مانند <a href="https://binance-docs.github.io/apidocs/spot/en/#current-open-orders-user_data" rel="nofollow" target="_blank">Current Open Orders</a> و <a href="https://binance-docs.github.io/apidocs/spot/en/#all-orders-user_data" rel="nofollow" target="_blank">All Orders</a> در اکسچنج بایننس است.


## تغییر وضعیت سفارش

```shell
curl 'https://api.nobitex.ir/market/orders/update-status' \
  -X POST \
  -H "Authorization: Token yourTOKENhereHEX0000000000" \
  -H "content-type: application/json" \
  --data '{"order":5684,"status":"canceled"}'
```

```plaintext
http POST https://api.nobitex.ir/market/orders/update-status \
  order=5684 status=canceled
```

> در صورت فراخوانی درست، پاسخ به این صورت خواهد بود:

```json
{
    "status": "ok",
    "updatedStatus": "Canceled"
}
```

برای تغییر وضعیت یک سفارش (لغو یا فعال‌سازی) از این نوع درخواست استفاده نمایید:

- **درخواست:** `POST /market/orders/update-status`
- **محدودیت فراخوانی:** 60 درخواست در دقیقه

###پارامترهای ورودی

پارامتر     | نوع    | پیش‌فرض   |   توضیحات     |         نمونه
-----------   |  -----------  | ------   |   ---------   | -----
order         | int           |  اختیاری  |     شناسه سفارش | `5684`
clientOrderId | string        |  اختیاری  |     شناسه سفارش کاربر (آزمایشی) | `order1`
status        | string        |  الزامی  |    وضعیت جدید   | `canceled`


### نکات و ملاحظات

1. حتما باید حداقل یکی از دو پارامتر ‍`order` و `clientOrderId` ارسال شوند.
2. اگر هر دو پارامتر ‍`order` و `clientOrderId`  ارسال شوند، اولویت با `id` است.
3. `clientOrderId` فقط در میان سفارشات open/active/inactive جستجو میشود.
4. `clientOrderId` .در حالت آزمایشی است و ممکن است در آینده تغییر کند
5. مقدار status میتواند از 'new' به 'active' و یا از 'active'/'inactive' به 'cancel' تغییر کند.
در غیر اینصورت، درخواست رد میشود.
6. در صورتی که سفارش درخواست شده جزئی از یک سفارش OCO انجام نشده باشد، هر دو سفارش مرتبط لغو خواهند شد.

### حالت‌های خطا

> در صورت عدم پذیرش سفارش، پاسخ به این صورت خواهد بود:

```json
{
  "status": "failed",
  "code": "ErrorCode",
  "message": "Human readable error message"
}
```

کد خطا  |  توضیحات
-------- | ---------
NullIdAndClientOrderId |  باید یکی از دو پارامتر `id` و `clientOrderId`  ارسال شود



##لغو جمعی سفارشات

```shell
curl 'https://api.nobitex.ir/market/orders/cancel-old' \
  -X POST \
  -H "Authorization: Token yourTOKENhereHEX0000000000" \
  -H "content-type: application/json" \
  --data '{"execution":"limit","srcCurrency":"btc","dstCurrency":"rls","hours":2.4}'
```

```plaintext
http POST https://api.nobitex.ir/market/orders/cancel-old \
  execution=limit srcCurrency=btc dstCurrency=rls hours=2.4
```

> در صورت فراخوانی درست، پاسخ به این صورت خواهد بود:

```json
{
    "status": "ok"
}
```

برای لغو دسته‌جمعی سفارشات فعال از این نوع درخواست استفاده نمایید:

- **درخواست:** `POST /market/orders/cancel-old`
- **محدودیت فراخوانی:** 10 درخواست در دقیقه

###پارامترهای ورودی

پارامتر     | نوع    | پیش‌فرض  |   توضیحات     | نمونه
----------- | ----   |----------|   ---------   | -----
hours        | float | اختیاری  |    زمان سفارش | 4.2
execution   | string | اختیاری |   نحوه سفارش  | `market` یا `limit` یا `stop_market` یا `stop_limit`
srcCurrency | string | اختیاری  |    ارز مبدا   | `btc`
dstCurrency | string | اختیاری  |    ارز مقصد   | `rls`


### نکات و ملاحظات
1. مقدار hours در واقع مقدار ساعت قبل از زمان ارسال درخواست میباشد. برای مثال اگر مقدار ساعت '2' ارسال شود، سفارش های 2 ساعت قبل لغو خواهند شد.
2. در صورتی که مقدار hours ارسال نشود، تمامی سفارشات فعال مربوط لغو خواهد شد.
3. سفارشات حد ضرر غیرفعال غیر OCO مشمول این نوع لغو نخواهند شد.
4. در بعضی شرایط امکان دارد به شما خطا پاسخ داده شود. این خطاها در فیلد error برگردانده میشوند.


### حالت‌های خطا

> در صورت عدم پذیرش سفارش، پاسخ به این صورت خواهد بود:

```json
{
  "status": "failed",
  "code": "ErrorCode",
  "message": "Human readable error message"
}
```

## فهرست معاملات کاربر


```shell
curl 'https://api.nobitex.ir/market/trades/list?srcCurrency=usdt&dstCurrency=rls' \
  -H "Authorization: Token yourTOKENhereHEX0000000000"
```

```plaintext
http GET https://api.nobitex.ir/market/trades/list?srcCurrency=usdt&dstCurrency=rls
```

> در صورت فراخوانی درست، پاسخ به این صورت خواهد بود:

```json
{
  "status": "ok",
  "trades": [
    {
      "id": 123412,
      "orderId": 1231222,
      "srcCurrency": "Tether",
      "dstCurrency": "﷼",
      "market": "USDT-RLS",
      "timestamp": "2022-07-05T09:57:38.560820+00:00",
      "type": "sell",
      "price": "316800",
      "amount": "57.3605",
      "total": "18171806.4",
      "fee": "27257.7096"
    }
  ],
  "hasNext": false
}
```

برای دریافت فهرست معاملات ۳ روز اخیر خود، از این درخواست استفاده نمایید.

- **درخواست:** `GET /market/trades/list`
- **محدودیت فراخوانی:** 20 درخواست در دقیقه
- **<a href="/#pagination">صفحه بندی:</a>** دارد (پیش فرض ۳۰)



### پارامترهای ورودی
| پارامتر     | نوع    | پیش‌فرض | توضیحات           | نمونه           |
|-------------|--------|---------|-------------------|-----------------|
| srcCurrency | string | اختیاری | رمزارز مبدا بازار | `btc` یا  ...   |
| dstCurrency | string | اختیاری | رمزارز مقصد بازار | `rls` یا `usdt` |
| fromId      | int    | اختیاری |       حداقل شناسه |           10023 |

* در فیلتر بازار هر دو پارامتر رمزارز مبدا و مقصد باید مقدار داشته باشند یا هر دو خالی باشند.
* در صورت اختصاص مقدار به حداقل شناسه تنها معاملاتی که شناسه‌ی آن‌ها بیشتر از یا مساوی با حداقل شناسه است برگردانده می‌شوند.


### پارامترهای پاسخ
| پارامتر | نوع           | توضیحات             | نمونه                  |
|---------|---------------|---------------------|------------------------|
| trades  | list of Trade | فهرست معاملان کاربر | `[{...Trade...}, ...]` |
| hasNext | boolean       | صفحه بعدی دارد؟     | `false`                |

### شی Trade
| فیلد        | نوع      | توضیحات            | نمونه                                    |
|-------------|----------|--------------------|------------------------------------------|
| id          | int      | شناسه‌ی معامله      | 122545                                   |
| orderId     | int      | شناسه‌ی سفارش       | 214534534434                             |
| srcCurrency | string   | رمزارز مبدا معامله | `Bitcoin` یا `Ethereum` یا `TRON` یا ... |
| dstCurrency | string   | ارز مقصد معامله    | `﷼` یا `Tether`                          |
| market      | string   | نماد بازار معامله  | `USDT-RLS`                               |
| timestamp   | string   | زمان انجام معامله  | `2022-07-05T09:57:38.560820+00:00`       |
| type        | string   | نوع خرید یا فروش   | `buy` یا `sell`                          |
| price       | monetary | قیمت انجام معامله  | `316800`                                 |
| amount      | monetary | مقدار معامله شده   | `57.3605`                                |
| total       | monetary | قیمت کل معامله     | `18171806.4`                             |
| fee         | monetary | کارمزد معامله      | `27257.7096`                             |
