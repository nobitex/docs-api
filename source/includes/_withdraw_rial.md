<h1 id="cobank-withdraw">برداشت ریالی</h1>

این سرویس‌ها فقط برای انجام برداشت‌های ریالی طراحی و پیاده‌سازی شده است. این فرایند امکان انتقال وجه ریالی میان حساب‌های بانکی کاربر و حساب کاربری او را فراهم می‌کند و تمامی کنترل‌ها، محدودیت‌ها و الزامات مربوط به عملیات ریالی در آن لحاظ شده است.


<h2 id="cobank-withdraw-request">ثبت درخواست برداشت ریالی</h2>

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


برای ثبت درخواست برداشت ریالی از این نوع درخواست استفاده نمایید:

* **درخواست:** `POST /cobank/withdraw`
* **<a href="/#ratelimit">محدودیت فراخوانی:</a>** 10 درخواست در 3 دقیقه

### پارامترهای ورودی

| پارامتر                 | نوع      | پیش‌فرض  | توضیحات                  | نمونه                               |
|-------------------------|----------|---------|-------------------------|--------------------------------------|
| destinationBankAccountId| int      | الزامی  | شناسه حساب‌بانکی کاربر   | 13568                                |
| amount                  | monetary | الزامی  | مقدار                   | 2500000000                           |

* **destinationBankAccountId**: [شناسه حساب بانکی](/#88cb25e727 "دریافت از پروفایل") تایید شده کاربر جهت دریافت وجه 


### پارامترهای خروجی

| پارامتر                 | نوع      | توضیحات                 | نمونه                               |
|-------------------------|----------|-------------------------|--------------------------------------|
| id                      | int      |شناسه درخواست برداشت ریالی که یک رشته خواهد بود و با WJ یا CW آغاز میشود و به دنبال آن عدد خواهد آمد.   | CW13568                            |
| createdAt               | string   | زمان ایجاد درخواست برداشت                                                                              | 2021-12-11T10:13:42.957103+00:00   |
| status                  | string   | وضعیت درخواست برداشت                                                                                   | New                                |
| amount                  | monetary | مقدار درخواست برداشت (ریال)                                                                            | 2500000000                         |
| fee                     | monetary | مقدار کارمزد درخواست برداشت (ریال)                                                                     | 20000                              |
| fulfilledAmount         | monetary | مقدار برداشت انجام شده. (در ابتدا صفر است)                                                             | 1500000000                         |
| bankAccountId           | int      | شناسه حساب‌بانکی کاربر                                                                                  | 13568                              |
| bankAccountInfo         | string   | اطلاعات حساب‌بانکی شامل نام بانک و شماره حساب                                                            | صادرات: IR670190123456789001234567 |
| records                 | array    | لیست رکوردهای صفحه جزییات.                           |                                    |

### پارامترهای فیلد records

| پارامتر                 | نوع       | توضیحات                                         | نمونه                             |
|-------------------------|-----------|-------------------------------------------------|-----------------------------------|
| amount                  | monetary  | مقدار درخواست برداشت ارسال شده به بانک (ریال)   | 1000000000                        |
| bankReferenceNumber     | string    | کد پیگیری بانک                                  | 123f345345g34634                  |
| status                  | string    | وضعیت ریز تراکنش‌ها                              | Pending, Failed, Transferred      |
| estimatedSettleAt       | string    | زمان تخمینی واریز وجه به حساب کاربر             | 2021-12-11T10:13:42.957103+00:00  |
| providerUpdatedAt       | string    | زمان بروزرسانی وضعیت رکورد از سمت پروایدر       | 2021-12-11T10:13:42.957103+00:00  |
| transferType            | string    | نوع انتقال وجه                                  | normal, paya, satana              |


###  وضعیت‌های درخواست برداشت

| وضعیت                | توضیحات                                         |
|----------------------|-------------------------------------------------|
| New                  | ثبت درخواست توسط کاربر                          | 
| Sent                 | ارسال درخواست به پروایدر                        | 
| Bank processing      | پردازش درخواست توسط بانک                        | 
| Partially Done       | بخشی از درخواست موفق                            |
| Done                 | درخواست کاملا موفق                               | 
| Failed               | درخواست کاملا ناموفق                             | 
| Rejected             | رد درخواست (توسط نوبیتکس، پروایدر یا بانک)      | 
| Canceled             | لغو درخواست توسط کاربر                          | 


### حالت‌های خطا

در صورتی که درخواست برداشت معتبر نباشد، ممکن است یکی از این خطاها برگردانده شود. در صورت دریافت هر یک از این خطاها، درخواست شما ثبت نشده است و در صورت تمایل باید درخواست را دوباره ارسال کنید.

کد خطا  |                                                                                             توضیحات
----------------------------------------------------------------------------------------------------| ---------
UnAcceptedDisclaimerError |                                            برای برداشت، لازم است موجودی کیف اسپات خود را تایید کنید.
FeatureUnavailable |                                                                    این امکان فعلا در دسترس شما نیست.
ParseError |                                                                   مشکلی در پارامتر ورودی وجود دارد.
BankAccountNotFound |                                                                       حساب بانکی مورد نظر پیدا نشد.
TooManyRequests |                                                             قبلا درخواست داده‌اید، لطفا کمی صبر کنید.
WithdrawUnavailable |                                                                برداشت تومان برای شما محدود شده است.
WithdrawAmountLimitation |                                          مقدار برداشت نباید از حداکثر مقدار قابل برداشت بیشتر باشد.
InsufficientBalance |                                                                                   موجودی کافی نیست.
AmountTooLow |                                            مقدار برداشت نباید از حداقل مقدار قابل برداشت کمتر باشد.
InsufficientBalanceOrInactiveWallet |                                                                                   موجودی کافی نیست.
WithdrawLimitReached |                                در هر ۲۴ ساعت فقط ۳ برداشت تومانی و ۱۰ برداشت رمزارزی امکان‌پذیر است.
AmountTooHigh |                                          مقدار برداشت نباید از حداکثر مقدار قابل برداشت بیشتر باشد.
ShabaWithdrawCannotProceed | سقف واریز به هر شماره شبا ۲۰۰ میلیون تومان است. می‌توانید مبلغ را به دو یا چند شماره شبا واریز کنید.



### نکات و ملاحظات
مقدار estimatedSettleAt و bankReferenceNumber در ابتدای ثبت درخواست خالی می‌باشد و پس از محاسبه و تخمین این فیلدها مقداردهی خواهد شد.




<h2 id="cobank-withdraw-cancel">لغو درخواست برداشت ریالی</h2>

```shell
curl -X POST 'https://apiv2.nobitex.ir/cobank/withdraw/<id>/cancel' \
  -H 'Authorization: Token yourTOKENhereHEX0000000000' \
  -H 'Content-Type: application/json'
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

برای لغو درخواست برداشت ریالی از این نوع درخواست استفاده نمایید:

* **درخواست:** `POST /cobank/withdraw/<id>/cancel`
* **<a href="/#ratelimit">محدودیت فراخوانی:</a>** 60 درخواست در 1 ساعت
* **<a href="/#ratelimit">محدودیت فراخوانی:</a>** 10 درخواست در 1 دقیقه

### پارامترهای ورودی

| پارامتر  | نوع    | پیش‌فرض                    | توضیحات                 | نمونه       |
|----------|--------|-------------------------- |-------------------------|-------------|
| id       | string | الزامی                    | شناسه درخواست برداشت    | CW256854    |


### نکات و ملاحظات
امکان لغو درخواست برداشت تا زمانی ممکن است که وضعیت درخواست در حالت New باشد و بیش از ۳ دقیقه از زمان ثبت آن نگذشته باشد.


### حالت‌های خطا

کد خطا  |                                                   توضیحات
--------------------------------------------------------- | ---------
WithdrawRequestNotFound |                                  درخواست برداشت پیدا نشد.
UnAcceptedDisclaimerError |  برای برداشت، لازم است موجودی کیف اسپات خود را تایید کنید.
CancellationFailed |                             لغو درخواست برداشت ناموفق شد.
NotCancellable |                        لغو درخواست برداشت امکان‌پذیر نیست.







<h2 id="cobank-withdraw-details">جزئیات برداشت ریالی</h2>

```shell
curl -X GET 'https://apiv2.nobitex.ir/cobank/withdraw/<id>' \
  -H 'Authorization: Token yourTOKENhereHEX0000000000' \
  -H 'Content-Type: application/json'
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

برای مشاهده جزئیات درخواست برداشت ریالی از این نوع درخواست استفاده نمایید:

* **درخواست:** `POST /cobank/withdraw/<id>`
* **<a href="/#ratelimit">محدودیت فراخوانی:</a>** 60 درخواست در 2 دقیقه

### پارامترهای ورودی

| پارامتر  | نوع    | پیش‌فرض                    | توضیحات                 | نمونه       |
|----------|--------|-------------------------- |-------------------------|-------------|
| id       | string | الزامی                    | شناسه درخواست برداشت    | CW256854    |


### نکات و ملاحظات
در صورتی که شناسه درخواست برداشت شما با WJ شروع شده باشد به این معنی است که این درخواست از فلوی قدیمی درخواست برداشت ریالی پردازش شده است. پیشوند درخواست برداشت ریالی CW است.


### حالت‌های خطا

کد خطا  |                                                   توضیحات
--------------------------------------------------------- | ---------
WithdrawRequestNotFound |                                  درخواست برداشت پیدا نشد.
UnAcceptedDisclaimerError |  برای برداشت، لازم است موجودی کیف اسپات خود را تایید کنید.


