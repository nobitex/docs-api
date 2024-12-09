#درخواست‌های دسته‌ای
از درخواست‌های دسته‌ای در کاهش تاخیر شبکه استفاده می‌شود.
این دسته از API ها برای بات‌ها معاملاتی ارائه شده و در مرحله **آزمایش بتا** قرار دارد.
در صورت استفاده، احتمال تغییر یا توقف در ارائه API های این بخش را در نظر بگیرید.

احراز هویت در API های این مجموعه مشابه نسخه تکی هر درخواست است.

## ثبت سفارش دسته‌ای

> نمونه درخواست:

```shell
curl -X POST 'https://api.nobitex.ir/market/orders/batch-add' \
  -H 'Authorization: Token yourTOKENhereHEX0000000000' \
  -H 'Content-Type: application/json' \
  --data @- << EOF
  {"data": [
    {"type":"buy","srcCurrency":"btc","dstCurrency":"rls","amount":"0.6","price":520000000},
    {"type":"sell","srcCurrency":"doge","dstCurrency":"rls","amount":"64","execution":"stop_market","stopPrice":47500},
    {"type":"buy","srcCurrency":"btc","dstCurrency":"usdt","amount":"0.01","mode":"oco","price":42390,"stopPrice":42700,"stopLimitPrice":42715}
  ]}
EOF
```

```javascript
api.post('/market/orders/batch-add', {
  data: [
    {
      type: 'buy',
      srcCurrency: 'btc',
      dstCurrency: 'rls',
      amount: '0.6',
      price: 520000000
    },
    {
      type: 'sell',
      srcCurrency: 'doge',
      dstCurrency: 'rls',
      amount: '64',
      execution: 'stop_market',
      stopPrice: 47500
    },
    {
      type: 'buy',
      srcCurrency: 'btc',
      dstCurrency: 'usdt',
      amount: '0.01',
      mode: 'oco',
      price: 42390,
      stopPrice: 42700,
      stopLimitPrice: 42715
    }
  ]
}, {
  headers: {Authorization: 'Token yourTOKENhereHEX0000000000', 'Content-Type': 'application/json'},
}).then((response) => {
  console.log(response);
});
```

```plaintext
POST /market/orders/batch-add HTTP/1.1
Host: api.nobitex.ir
Authorization: Token yourTOKENhereHEX0000000000
Content-Type: application/json
{
  "data": [
    {"type":"buy","srcCurrency":"btc","dstCurrency":"rls","amount":"0.6","price":520000000},
    {"type":"sell","srcCurrency":"doge","dstCurrency":"rls","amount":"64","execution":"stop_market","stopPrice":47500, "clientOrderId": "order2"},
    {"type":"buy","srcCurrency":"btc","dstCurrency":"usdt","amount":"0.01","mode":"oco","price":42390,"stopPrice":42700,"stopLimitPrice":42715}
  ]
}
```

> در صورت فراخوانی درست، پاسخ به این صورت خواهد بود:

```json
{
  "status": "ok",
  "results": [
    {
      "status": "ok",
      "order": {
        "type": "buy",
        "execution": "Limit",
        "market": "BTC-RLS",
        "srcCurrency": "Bitcoin",
        "dstCurrency": "ریال",
        "price": "520000000",
        "amount": "0.6",
        "totalPrice": "0",
        "totalOrderPrice": "312000000",
        "matchedAmount": 0,
        "unmatchedAmount": "0.6",
        "id": 25,
        "status": "Active",
        "partial": false,
        "fee": 0,
        "created_at": "2018-11-28T11:36:13.592827+00:00",
        "clientOrderId": null
      }
    },
    {
      "status": "failed",
      "code": "OverValueOrder",
      "message": "Order validation failed",
      "clientOrderId": "order2"
    },
    {
      "status": "ok",
      "orders": [
        {
          "id": 26,
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
          "pairId": 27,
          "clientOrderId": null
        },
        {
          "id": 27,
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
          "pairId": 26,
          "clientOrderId": null
        }
      ]
    }
  ]
}
```

برای [ثبت سفارش](/#e12b63a512) به صورت دسته‌ای از این نوع درخواست استفاده نمایید:

* **درخواست:** `POST /market/orders/batch-add`
* **محدودیت فراخوانی:** 300 درخواست در 10 دقیقه
  <br/>300 سفارش در 10 دقیقه ([مشترک با ثبت سفارش تکی](/#order_ratelimit))

### پارامترهای ورودی

| پارامتر | نوع  | پیش‌فرض | توضیحات                      | نمونه                  |
|---------|------|---------|------------------------------|------------------------|
| data    | list | الزامی  | لیست ورودی‌های ثبت سفارش تکی | [{"amount": ...}, ...] |

### پارامترهای پاسخ

| پارامتر | نوع    | توضیحات                      | نمونه |
|---------|--------|------------------------------|-------|
| status  | string | وضعیت پاسخ                   | ok    |
| results | list   | لیست پاسخ‌های هر درخواست تکی | []    |

بسته به نوع درخواست از نظر معمولی یا oco بودن و یا مواجهه با خطا، قالب پاسخ متفاوت خواهد بود:

#### پاسخ موفق حالت معمولی

| پارامتر | نوع    | توضیحات    | نمونه           |
|---------|--------|------------|-----------------|
| status  | string | وضعیت پاسخ | ok              |
| order   | Order  | شی سفارش   | {"id": 25, ...} |

#### پاسخ موفق حالت oco

| پارامتر | نوع        | توضیحات           | نمونه                              |
|---------|------------|-------------------|------------------------------------|
| status  | string     | وضعیت پاسخ        | ok                                 |
| orders  | Order list | لیست دو سفارش oco | [{"id": 26, ...}, {"id": 27, ...}] |

#### پاسخ ناموفق

| پارامتر | نوع    | توضیحات                      | نمونه                                                                                |
|---------|--------|------------------------------|--------------------------------------------------------------------------------------|
| status  | string | وضعیت پاسخ                   | ok                                                                                   |
| results | list   | لیست پاسخ‌های هر درخواست تکی | [{"status": "failed", "code":"OverValueOrder", "clientOrderId": "order2", ...}, ...] |

### حالت‌های خطا به به ازای هر سفارش
حالت های خطا همانند درخواست سفارش تکی است.
این خطاها برای هر سفارش به صورت جداگانه ایجاد می‌شوند و مانع اجرای کل درخواست نخواهند شد و هر سفارش به صورت جداگانه اعتبارسنجی می‌شود.


| کد خطا            | توضیحات                                                  |
|-------------------|----------------------------------------------------------|
| ParseError        | ورودی‌های الزامی ارسال نشده است.                         |
| InvalidOrderPrice | در سفارش با قیمت ضروری، قیمت نزدیک به صفر ارسال شده است. |
| InvalidMarketPair | بازاری برای زوج‌ارز درخواست وجود ندارد.                  |
| MarketClosed      | بازار بسته است.                                          |
| TradeLimitation   | کاربر محدودیت سفارش‌گذاری دارد.                          |
| DuplicateOrder    | سفارش تکراری است.                                        |



### نکات و ملاحظات
1. **حالت Pro:** امکان فعال‌سازی [حالت Pro](/#pro) و مجاز کردن سفارش تکراری در کمتر از ۱۰ ثانیه، برای کل درخواست وجود دارد.
2. **محدودیت درخواست مشترک:** در صورتی که یک درخواست دسته‌ای، در میانه پردازش سفارش‌ها از محدودیت مشترک ایجاد سفارش را عبور کند،
ادامه ثبت سفارش متوقف شده و سفارش‌های ایجاد شده تا قبل از آن باز می‌گردند. در این حالت تعداد سفارش‌های باز گردانده شده کمتر از تعداد درخواست شده خواهد بود.
3. **قالب درخواست:** تنها فرمت مورد پذیرش درخواست برای ثبت سفارش دسته‌ای، application/json می‌باشد.

## لغو سفارش دسته‌ای

با استفاده از این api می‌توان سفارش‌های فعال کاربر را لغو کرد. برای این هدف می‌توان مقدار رمزارز مبدا یا رمزارز مقصد را مشخص کرد که هم می‌توان همزمان آن دو را ارسال کرد و هم به صورت تکی، که در صورت ارسال هر کدام از این مقادیر تمامی ‌سفارش‌های کاربر با ارز مبدا و یا ارز مقصد لغو خواهند شد.

>نمونه درخواست:

```shell
curl -X POST 'https://api.nobitex.ir/market/orders/cancel-batch' \
  -H 'Authorization: Token yourTOKENhereHEX0000000000' \
  -H 'Content-Type: application/json' \
  --data '{"orderIds":[1,2]}'
```

```plaintext
POST /market/orders/cancel-batch HTTP/1.1
Host: api.nobitex.ir
Authorization: Token yourTOKENhereHEX0000000000
Content-Type: application/json
{
  "orderIds":[1,2]
}
```

> در صورت فراخوانی درست، پاسخ به این صورت خواهد بود:

```json
{
  "status": "ok",
  "message": "",
  "orders": {
    "1": {
      "status": "failed",
      "message": "Systematically placed orders are immutable"
    },
    "2": {
      "status": "ok"
    }
  }
}
```

* **درخواست:** `POST /market/orders/cancel-batch`
* **محدودیت فراخوانی:** 10 درخواست در هر دقیقه
* حداکثر 20 سفارش در هر درخواست

### پارامترهای ورودی

| پارامتر        | نوع     | پیش‌فرض | توضیحات             | نمونه  |
|----------------|---------|---------|---------------------|--------|
| orderIds       | list    | الزامی  | شناسه‌های سفارشات   | [1,2]  |

### پارامترهای پاسخ

| پارامتر | نوع    | توضیحات             | نمونه |
|---------|--------|---------------------|-------|
| status  | string | وضعیت پاسخ          | ok    |
| message | string | علت عدم لغو درخواست |     |

### حالت‌های خطا


| متن خطا                                      | توضیحات                                                  |
|----------------------------------------------|----------------------------------------------------------|
| The maximum number of orderIds should be 20  | اگر تعداد آیدی ‌سفارشات ارسال شده به API بیشتر از ۲۰ عدد باشد. |
| Order_ids list is empty                      | اگر لیست آیدی سفارشات ارسال شده، خالی باشد |
| Invalid integer value: "{{incorrect value}}" | اگر لیست ارسال شده حاوی مقادیر نادرست باشد |
| Orders are queued to be cancelled            | اگر سفارشات ارسال شده به صورت async حذف گردد. |

### نکات و ملاحظات
1. با استفاده از این api می‌توان سفارش‌های فعال کاربر را لغو کرد. برای این هدف می‌توان مقدار رمزارز مبدا یا رمزارز مقصد را مشخص کرد که هم می‌توان همزمان آن دو را ارسال کرد و هم به صورت تکی، که در صورت ارسال هر کدام از این مقادیر تمامی ‌سفارش‌های کاربر با ارز مبدا و یا ارز مقصد لغو خواهند شد.
2. برای استفاده از این api می‌توان دو پارامتر دیگر به عنوان‌های hour و execution_type اشاره کرد که پارامترهای اختیاری هستند.
3. پارامتر hour که باید به صورت عدد صحیح وارد شود به این معناست که سفارش‌های فعال کاربر در چند ساعت اخیر کنسل شوند، برای مثال اگر مقدار ۳ برای این پارامتر ارسال شود سفارش‌های فعال سه ساعت اخیر کاربر غیرفعال می‌شوند.
4. پارامتر execution_type را می‌توان ارسال کرد که مقدار این پارامتر مشخص کننده‌ی نوع سفارشاتی است که نیاز به لغو شدند دارند. برای مثال اگر این پارامتر مقدار market داشته باشد‌، سفارشات از نوع market لغو خواهند شد.
