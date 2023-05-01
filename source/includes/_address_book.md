# دفتر آدرس و حالت برداشت امن

دفتر آدرس (address book) و حالت برداشت امن (whitelist mode)
به منظور ارتقاء امنیت و سرعت برداشت رمزارز کاربران پیاده سازی می شود و امکان تعریف آدرس‌های برداشت از پیش تعیین
و تأیید شده را در دفتر آدرس برای کاربر فراهم می آورد. در صورتی که حالت برداشت امن فعال باشد امکان برداشت به آدرس‌های غیر
وجود
نخواهد داشت.

## مشاهده لیست آدرس‌های دفتر آدرس

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
      "address": "000000xxxxxxx111111111zzzzzzz"
    },
    {
      "title": "BinanceCoinOKX",
      "address": "000000xxxxxxx222222222zzzzzzz"
    }
  ]
}
```

برای دریافت دفتر آدرس از این درخواست استفاده نمایید.

- **درخواست:**: `GET /address_book`
- **محدودیت فراخوانی:** 20 درخواست در هر دقیقه

## اضافه کردن آدرس جدید به دفتر آدرس

```shell
curl -X POST 'https://api.nobitex.ir/address_book' \
  -H "Authorization: Token yourTOKENhereHEX0000000000" \
  -H "content-type: application/json" \
  --data '{"address": "000000xxxxxxx111111111zzzzzzz", "title": "test", "otpCode": "1234",
   "tfaCode": "123"}'
  
```

```plaintext
http POST https://api.nobitex.ir/address_book
```

> در صورت فراخوانی درست، پاسخ به این صورت خواهد بود:

```json
{
  "status": "ok",
  "data": {
    "title": "test",
    "address": "000000xxxxxxx111111111zzzzzzz"
  }
}
```

- **درخواست:**: `POST /address_book`
- **محدودیت فراخوانی:** 6 درخواست در هر دقیقه

### پارامترهای ورودی

| پارامتر | نوع    | پیش‌فرض | توضیحات                | نمونه                           |
|---------|--------|---------|------------------------|---------------------------------|
| title   | string | الزامی  | عنوان آدرس             | `test`                          |
| address | string | الزامی  | آدرس                   | `000000xxxxxxx111111111zzzzzzz` |
| otpCode | string | الزامی  | کد تأیید ایمیل و پیامک | `1234`                          |
| tfaCode | string | الزامی  | کد تأیید دوعاملی       | `123`                           |

### نکات و ملاحظات

1. مقدار آدرس نمی تواند تکراری باشد.

### حالت‌های خطا

> در صورت عدم پذیرش درخواست، پاسخ به این صورت خواهد بود:

```json
{
  "status": "failed",
  "code": "ErrorCode",
  "message": "Human readable error message"
}
```

| کد خطا            | توضیحات                                                        |
|-------------------|----------------------------------------------------------------|
| ParseError        | نوع یا شرط الزامی بودن یکی از پارامترهای ورودی رعایت نشده است. |
| InvalidOTP        | مقدار tfa وارد شده نادرست است.                                 |
| Invalid2FA        | مقدار otp وارد شده نادرست است.                                 |
| Inactive2FA       | tfa فعال نیست                                                  |
| DuplicatedAddress | آدرس قبلا ثبت شده و تکراری می باشد.                            |


## حذف یک دفتر آدرس

```shell
curl 'https://api.nobitex.ir/address_book/<address_id>/delete
  -H "Authorization: Token yourTOKENhereHEX000000ook'" 
  
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

| کد خطا   | توضیحات                        |
|----------|--------------------------------|
| NotFound | آدرسی با این شناسه وجود ندارد. |

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
  --data '{"otpCode": "1234", "tfaCode": "12345"}'
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

| پارامتر | نوع    | پیش‌فرض | توضیحات                | نمونه   |
|---------|--------|---------|------------------------|---------|
| otpCode | string | الزامی  | کد تأیید ایمیل و پیامک | `1234`  |
| tfaCode | string | الزامی  | کد تأیید دوعاملی       | `12345` |

### حالت‌های خطا

> در صورت عدم پذیرش درخواست، پاسخ به این صورت خواهد بود:

```json
{
  "status": "failed",
  "code": "ErrorCode",
  "message": "Human readable error message"
}
```

| کد خطا      | توضیحات                                                        |
|-------------|----------------------------------------------------------------|
| ParseError  | نوع یا شرط الزامی بودن یکی از پارامترهای ورودی رعایت نشده است. |
| InvalidOTP  | مقدار tfa وارد شده نادرست است.                                 |
| Invalid2FA  | مقدار otp وارد شده نادرست است.                                 |
| Inactive2FA | tfa فعال نیست                                                  |
