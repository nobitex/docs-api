<h1 id="cobank-withdraw">برداشت کوبنک</h1>

<h2 id="cobank-withdraw-request">ثبت درخواست برداشت کوبنک</h2>

```shell
curl -X POST 'https://apiv2.nobitex.ir/cobank/withdraw' \
  -H 'Authorization: Token yourTOKENhereHEX0000000000' \
  -H 'Content-Type: application/json' \
  --data '{"destinationBankAccountId": 13568, "amount": "2500000000"}'
```

```plaintext
http POST https://apiv2.nobitex.ir/cobank/withdraw \
  destinationBankAccountId=13568 amount=2500000000
```

> در صورت فراخوانی درست، پاسخ به این صورت خواهد بود:

```json
{
  "status": "ok",
  "result": {
    "id": "CW430542",
    "createdAt": "2021-12-11T10:13:42.957103+00:00",
    "status": "New",
    "amount": "2500000000",
    "fee": "500000",
    "fulfilledAmount": "499500000",
    "bankAccountId": 13568,
    "bankAccountInfo": "صادرات: IR670190123456789001234567",
    "records": [
      {
        "amount": "1000000000",
        "bankReferenceNumber": null,
        "status": "Pending",
        "estimatedSettleAt": null,
        "providerUpdatedAt": "2021-12-11T10:13:42.957103+00:00",
        "transferType": "normal"
      },
      {
        "amount": "1000000000",
        "bankReferenceNumber": "35413545",
        "status": "Failed",
        "estimatedSettleAt": "2021-12-11T10:13:42.957103+00:00",
        "providerUpdatedAt": "2021-12-11T10:13:42.957103+00:00",
        "transferType": "paya"
      },
      {
        "amount": "499500000",
        "bankReferenceNumber": "35415784546",
        "status": "Transferred",
        "estimatedSettleAt": "2021-12-11T10:13:42.957103+00:00",
        "providerUpdatedAt": "2021-12-11T10:13:42.957103+00:00",
        "transferType": "satna"
      }
    ]
  }
}
```


> در صورتی که درخواست با خطا مواجه شود، پاسخ به این شکل خواهد بود

```json
{
  "status": "failed",
  "code": "WithdrawUnavailable",
  "message": "WithdrawUnavailable"
}
```


برای ثبت درخواست برداشت کوبنک از این نوع درخواست استفاده نمایید:

* **درخواست:** `POST /users/cobank/withdraw`
* **<a href="/#ratelimit">محدودیت فراخوانی:</a>** 10 درخواست در 3 دقیقه
* **این ویژگی باید ابتدا برای شما فعال شده باشد**

### پارامترهای ورودی

| پارامتر                 | نوع      | پیش‌فرض  | توضیحات                  | نمونه                               |
|-------------------------|----------|---------|-------------------------|--------------------------------------|
| destinationBankAccountId| int      | الزامی  | شناسه حساب‌بانکی کاربر   | 13568                                |
| amount                  | monetary | الزامی  | مقدار                   | 2500000000                           |


### پارامترهای خروجی

| پارامتر                 | نوع      | توضیحات                 | نمونه                               |
|-------------------------|----------|-------------------------|--------------------------------------|
| id                      | int      |شناسه درخواست برداشت ریالی که یک رشته خواهد بود و با WJ یا CW آغاز میشود و به دنبال آن عدد خواهد آمد. حرف WJ برای درخواست برداشت در   فلوی قدیمی و CW برای درخواست برداشت در فلوی کوبنک خواهد بود   | CW13568 |
| createdAt               | string   | زمان ایجاد درخواست برداشت                                                          | 2021-12-11T10:13:42.957103+00:00  |
| status                  | string   | وضعیت درخواست برداشت                                                               | New                               |
| amount                  | string   | مقدار درخواست برداشت (ریال)                                                        | 2500000000                        |
| fee                     | string   | مقدار کارمزد درخواست برداشت (ریال)                                                 | 20000                             |
| fulfilledAmount         | monetary | مقدار برداشت انجام شده. (در ابتدا صفر است)                                         | 1500000000                        |
| bankAccountId           | int      | شناسه حساب‌بانکی کاربر                                                              | 13568                             |
| bankAccountInfo         | string   | اطلاعات حساب‌بانکی شامل نام بانک و شماره حساب                                        | صادرات: IR670190123456789001234567 |
| records                 | array    | لیست رکوردهای صفحه جزییات. این لیست برای برداشت‌های ریالی فلوی قدیمی خالی خواهد بود  | |

### پارامترهای فیلد records

| پارامتر                 | نوع       | توضیحات                                         | نمونه                             |
|-------------------------|-----------|-------------------------------------------------|-----------------------------------|
| amount                  | monetary  | مقدار درخواست برداشت ارسال شده به بانک (ریال)   | 1000000000                        |
| bankReferenceNumber     | string    | کد پیگیری بانک                                  | 123f345345g34634                  |
| status                  | string    | وضعیت ریز تراکنش‌ها                              | Pending, Failed, Transferred      |
| estimatedSettleAt       | string    | زمان تخمینی واریز وجه به حساب کاربر             | 2021-12-11T10:13:42.957103+00:00  |
| providerUpdatedAt       | string    | زمان بروزرسانی وضعیت رکورد از سمت پروایدر       | 2021-12-11T10:13:42.957103+00:00  |
| transferType            | string    | نوع انتقال وجه                                  | normal, paya, satana              |


### حالت‌های خطا

در صورتی که درخواست برداشت معتبر نباشد، ممکن است یکی از این خطاها برگردانده شود. در صورت دریافت هر یک از این خطاها، درخواست شما ثبت نشده است و در صورت تمایل باید درخواست را دوباره ارسال کنید.

کد خطا  |  توضیحات
-------- | ---------
UnAcceptedDisclaimerError | کاربر دیسکلایمر کیف‌پول اسپات را تایید نکرده
FeatureUnavailable | کاربر هیچ‌کدام از فیچرفلگ‌های مربوط به این اندپوینت را ندارد
ParseError | ورودی‌ها مشکل دارند
BankAccountNotFound | حساب‌بانکی پیدا نشد، ممکن است حساب مربوط به این کاربر نباشد یا حذف شده باشد
TooManyRequests | درخواست بیش از محدودیت
WithdrawUnavailable | برداشت کاربر محدود شده است
WithdrawAmountLimitation | کاربر درخواست برداشت بیش‌ از سقف قابل برداشت را دارد
InsufficientBalance | موجودی کاربر برای برداشت کافی نیست
AmountTooLow | مبلغ درخواستی کاربر از حداقل مبلغ کمتر است
InsufficientBalanceOrInactiveWallet | کیف پول کاربر غیرفعال است
WithdrawLimitReached | در فلوی قدیمی کاربر روی تعداد درخواست روزانه محدودیت داشته. این خطا مربوط به این قضیه است
AmountTooHigh | در فلوی قدیمی یک محدودیت سقف هم داریم که اجازه برداشت بیشتر از آن به کاربر داده نمی‌شود
ShabaWithdrawCannotProceed | در فلوی قدیمی روی هر شبا محدودیت برداشت ۲۰۰ میلیون تومان داریم و اگر کسی بیش از این مقدار برداشت کرده باشد، این خطا را دریافت میکند


### نکات و ملاحظات
۱. برای استفاده از این ویژگی لازم است که ابتدا برای شما فعال شده باشد. در صورتی که درخواست برداشت کوبنک برای شما فعال نباشد، درخواست ارسالی از فلوی قدیمی برداشت ریالی پردازش خواهد شد

۲. مقدار estimatedSettleAt و bankReferenceNumber در ابتدای ثبت درخواست خالی می‌باشد و پس از محاسبه و تخمین این فیلدها مقداردهی خواهد شد





<h2 id="cobank-withdraw-details">جزئیات درخواست برداشت</h2>

```shell
curl -X GET 'https://apiv2.nobitex.ir/cobank/withdraw/<id>' \
  -H 'Authorization: Token yourTOKENhereHEX0000000000' \
  -H 'Content-Type: application/json' \
```

```plaintext
http GET https://apiv2.nobitex.ir/cobank/withdraw/<id> 
```

> در صورت فراخوانی درست، پاسخ به این صورت خواهد بود:

```json
{
  "status": "ok",
  "result": {
    "id": "CW430542",
    "createdAt": "2021-12-11T10:13:42.957103+00:00",
    "status": "New",
    "amount": "2500000000",
    "fee": "500000",
    "fulfilledAmount": "499500000",
    "bankAccountId": 13568,
    "bankAccountInfo": "صادرات: IR670190123456789001234567",
    "records": [
      {
        "amount": "1000000000",
        "bankReferenceNumber": null,
        "status": "Pending",
        "estimatedSettleAt": null,
        "providerUpdatedAt": "2021-12-11T10:13:42.957103+00:00",
        "transferType": "normal"
      },
      {
        "amount": "1000000000",
        "bankReferenceNumber": "35413545",
        "status": "Failed",
        "estimatedSettleAt": "2021-12-11T10:13:42.957103+00:00",
        "providerUpdatedAt": "2021-12-11T10:13:42.957103+00:00",
        "transferType": "paya"
      },
      {
        "amount": "499500000",
        "bankReferenceNumber": "35415784546",
        "status": "Transferred",
        "estimatedSettleAt": "2021-12-11T10:13:42.957103+00:00",
        "providerUpdatedAt": "2021-12-11T10:13:42.957103+00:00",
        "transferType": "satna"
      }
    ]
  }
}
```


> در صورت مواجه با خطا چنین پاسخی خواهید داشت


```json
{
  "status": "failed",
  "code": "WithdrawRequestNotFound",
  "message": "Withdraw Request Not Found"
}
```

برای مشاهده جزئیات درخواست برداشت از این نوع درخواست استفاده نمایید:

* **درخواست:** `POST /cobank/withdraw/<id>`
* **<a href="/#ratelimit">محدودیت فراخوانی:</a>** 60 درخواست در 2 دقیقه

### پارامترهای ورودی

| پارامتر  | نوع    | پیش‌فرض                    | توضیحات                 | نمونه       |
|----------|-----   |-------------------------- |-------------------------|--------     |
| id       | string | الزامی                    | شناسه درخواست برداشت    | CW256854    |


### نکات و ملاحظات
در صورتی که شناسه درخواست برداشت شما با WJ شروع شده باشد به این معنی است که این درخواست از فلوی قدیمی درخواست برداشت ریالی پردازش شده است. پیشوند درخواست برداشت کوبنک CW است


### حالت‌های خطا

کد خطا  |  توضیحات
-------- | ---------
WithdrawRequestNotFound | درخواست برداشت پیدا نشد، ممکن است درخواست مربوط به این کاربر نباشد
UnAcceptedDisclaimerError | کاربر دیسکلایمر کیف‌پول اسپات را تایید نکرده






<h2 id="cobank-withdraw-cancel">لغو درخواست برداشت</h2>

```shell
curl -X POST 'https://apiv2.nobitex.ir/cobank/withdraw/<id>/cancel' \
  -H 'Authorization: Token yourTOKENhereHEX0000000000' \
  -H 'Content-Type: application/json' \
```

```plaintext
http POST https://apiv2.nobitex.ir/cobank/withdraw/<id>/cancel 
```

> در صورت فراخوانی درست، پاسخ به این صورت خواهد بود:

```json
{
  "status": "ok",
  "result": {
    "id": "CW430542",
    "createdAt": "2021-12-11T10:13:42.957103+00:00",
    "status": "Canceled",
    "amount": "2500000000",
    "fee": "500000",
    "fulfilledAmount": "499500000",
    "bankAccountId": 13568,
    "bankAccountInfo": "صادرات: IR670190123456789001234567",
    "records": [
      {
        "amount": "1000000000",
        "bankReferenceNumber": null,
        "status": "Pending",
        "estimatedSettleAt": null,
        "providerUpdatedAt": "2021-12-11T10:13:42.957103+00:00",
        "transferType": "normal"
      },
      {
        "amount": "1000000000",
        "bankReferenceNumber": "35413545",
        "status": "Failed",
        "estimatedSettleAt": "2021-12-11T10:13:42.957103+00:00",
        "providerUpdatedAt": "2021-12-11T10:13:42.957103+00:00",
        "transferType": "paya"
      },
      {
        "amount": "499500000",
        "bankReferenceNumber": "35415784546",
        "status": "Transferred",
        "estimatedSettleAt": "2021-12-11T10:13:42.957103+00:00",
        "providerUpdatedAt": "2021-12-11T10:13:42.957103+00:00",
        "transferType": "satna"
      }
    ]
  }
}
```


> در صورت مواجه با خطا چنین پاسخی خواهید داشت


```json
{
  "status": "failed",
  "code": "WithdrawRequestNotFound",
  "message": "Withdraw Request Not Found"
}
```

برای لغو درخواست برداشت از این نوع درخواست استفاده نمایید:

* **درخواست:** `POST /cobank/withdraw/<id>/cancel`
* **<a href="/#ratelimit">محدودیت فراخوانی:</a>** 60 درخواست در 1 ساعت
* **<a href="/#ratelimit">محدودیت فراخوانی:</a>** 10 درخواست در 1 دقیقه

### پارامترهای ورودی

| پارامتر  | نوع    | پیش‌فرض                    | توضیحات                 | نمونه       |
|----------|-----   |-------------------------- |-------------------------|--------     |
| id       | string | الزامی                    | شناسه درخواست برداشت    | CW256854    |


### نکات و ملاحظات
امکان لغو درخواست برداشت تا زمانی ممکن است که وضعیت درخواست در حالت New باشد

### حالت‌های خطا

کد خطا  |  توضیحات
-------- | ---------
WithdrawRequestNotFound | درخواست برداشت پیدا نشد، ممکن است درخواست مربوط به این کاربر نباشد
UnAcceptedDisclaimerError | کاربر دیسکلایمر کیف‌پول اسپات را تایید نکرده
CancellationFailed | عملیات لغو ناموفق بوده است
NotCancellable | امکان لغو درخواست برداشت وجود ندارد







<h2 id="cobank-withdraw-history">تاریخچه درخواست‌های برداشت</h2>

سوابق برداشت کوبنک را میتوانید در <a href="/#withdraw-list">لیست درخواست برداشت ها</a> مشاهده کنید.

