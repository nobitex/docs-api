# دفتر آدرس و حالت برداشت امن

دفتر آدرس (address book) و حالت برداشت امن (whitelist mode)
به منظور ارتقاء امنیت و سرعت برداشت رمزارز کاربران پیاده سازی می شود و امکان تعریف آدرس های برداشت از پیش تعیین
و تأیید شده را در آدرس بوک برای کاربر فراهم می آورد. در صورتی که وایت لیست فعال باشد امکان برداشت به آدرس های غیر وجود
نخواهد داشت.

## مشاهده لیست دفتر آدرس ها

```shell
curl 'https://api.nobitex.ir/address_book' \
  -H "Authorization: Token yourTOKENhereHEX0000000000"
```

```plaintext
https GET https://api.nobitex.ir/address_book
```

> در صورت فراخوانی درست، پاسخ به این صورت خواهد بود:

```json
{
  "status": "ok",
  "result": [
    {
      "title": "TetherBinance",
      "address": "000000xxxxxxx111111111zzzzzzz",
      "created_at": "2023-02-15T10:32:56+0000"
    },
    {
      "title": "BinanceCoinOKX",
      "address": "000000xxxxxxx222222222zzzzzzz",
      "created_at": "2023-02-15T10:33:56+0000"
    }
  ]
}
```

برای دریافت دفتر آدرس از این درخواست استفاده نمایید.

- **درخواست:**: `GET /address_book`
- **محدودیت فراخوانی:** 20 درخواست در هر دقیقه

## اضافه کردن یک دفتر آدرس جدید

```shell
curl -X POST 'https://api.nobitex.ir/address_book/add' \
  -H "Authorization: Token yourTOKENhereHEX0000000000" \
  -H "content-type: application/json" \
  --data '{"address": "", "title": "", "otp": "", "totp": ""}'
  
```

```plaintext
http POST https://api.nobitex.ir/address_book/add
```

> در صورت فراخوانی درست، پاسخ به این صورت خواهد بود:

```json
{
  "status": "ok",
  "data": {
    "title": "test",
    "address": "test",
    "created_at": "2023-03-04T15:34:44.629248+03:30"
  }
}
```

- **درخواست:**: `POST /address_book/add`
- **محدودیت فراخوانی:** 6 درخواست در هر دقیقه

### پارامترهای ورودی

| پارامتر | نوع    | پیش‌فرض | توضیحات                | نمونه             |
|---------|--------|---------|------------------------|-------------------|
| title   | string | الزامی  | عنوان آدرس             | `test`            |
| address | string | الزامی  | آدرس                   | `www.tma.com/bit` |
| otpCode | string | الزامی  | کد تأیید ایمیل و پیامک | `1235`            |
| tfaCode | string | الزامی  | کد تأیید دوعاملی       | `1234`            |

### نکات و ملاحظات

1. مقدار آدرس نمی تواند تکراری باشد.

### حالت‌ های خطا

> در صورت عدم پذیرش درخواست، پاسخ به این صورت خواهد بود:

```json
{
  "status": "failed",
  "code": "ErrorCode",
  "message": "Human readable error message"
}
```

| کد خطا             | توضیحات                                                        |
|--------------------|----------------------------------------------------------------|
| ParseError         | نوع یا شرط الزامی بودن یکی از پارامترهای ورودی رعایت نشده است. |
| TFAValidationError | مقدار tfa وارد شده نادرست است.                                 |
| OTPValidationError | مقدار otp وارد شده نادرست است.                                 |
| ValidationError    | tfa فعال نیست                                                  |

## حذف یک دفتر آدرس

```shell
curl 'https://api.nobitex.ir/address_b
  -H "Authorization: Token yourTOKENhereHEX000000ook/<address_id>/delete' \0000" 
  
```

```plaintext
https DELETE /address_book/<address_id>/delete
```

> در صورت فراخوانی درست، پاسخ به این صورت خواهد بود:

```json
{
  "status": "ok"
}
```

- **درخواست:**: `DELETE /address_book/<address_id>/delete`
- **محدودیت فراخوانی:** 6 درخواست در هر دقیقه

### حالت‌های خطا

> در صورت عدم پذیرش درخواست، پاسخ به این صورت خواهد بود:

```json
{
  "status": "failed",
  "code": "ErrorCode",
  "message": "Human readable error message"
}
```

| کد خطا   | توضیحات                         |
|----------|---------------------------------|
| NotFound | آدرس بوکی با این id وجود ندارد. |

## فعال کردن برداشت امن

```shell
curl -X POST 'https://api.nobitex.ir/address_book/whitelist/activate' \
  -H "Authorization: Token yourTOKENhereHEX0000000000"
```

```plaintext
https POST https://api.nobitex.ir/address_book/whitelist/activate
```

> در صورت فراخوانی درست، پاسخ به این صورت خواهد بود:

```json
{
  "status": "ok"
}
```

- **درخواست:**: `POST /address_book/address_book/whitelist/activate`
- **محدودیت فراخوانی:** 6 درخواست در هر دقیقه

## غیرفعال کردن برداشت امن

```shell
curl 'https://api.nobitex.ir/address_book/whitelist/deactivate' \
  -H "Authorization: Token yourTOKENhereHEX0000000000" 
  -H "content-type: application/json" \
  --data '{"otpCode": "", "tfaCode": ""}'
```

```plaintext
https POST https://api.nobitex.ir/address_book/whitelist/deactivate
```

> در صورت فراخوانی درست، پاسخ به این صورت خواهد بود:

```json
{
  "status": "ok"
}
```

- **درخواست:**: `POST /address_book/address_book/whitelist/deactivate`
- **محدودیت فراخوانی:** 6 درخواست در هر دقیقه

### پارامترهای ورودی

| پارامتر | نوع    | توضیحات                |
|---------|--------|------------------------|
| otpCode | string | کد تأیید ایمیل و پیامک |
| tfaCode | string | کد تأیید دوعاملی       |

### حالت‌های خطا

> در صورت عدم پذیرش درخواست، پاسخ به این صورت خواهد بود:

```json
{
  "status": "failed",
  "code": "ErrorCode",
  "message": "Human readable error message"
}
```

| کد خطا             | توضیحات                                                        |
|--------------------|----------------------------------------------------------------|
| ParseError         | نوع یا شرط الزامی بودن یکی از پارامترهای ورودی رعایت نشده است. |
| TFAValidationError | مقدار tfa وارد شده نادرست است.                                 |
| OTPValidationError | مقدار otp وارد شده نادرست است.                                 |
| ValidationError    | tfa فعال نیست                                                  |
