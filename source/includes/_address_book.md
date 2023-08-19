# دفتر آدرس و حالت برداشت امن

دفتر آدرس (address book) و حالت برداشت امن (whitelist mode)
به منظور ارتقاء امنیت و سرعت برداشت رمزارز کاربران پیاده سازی می شود و امکان تعریف آدرس‌های برداشت از پیش تعیین
و تأیید شده را در دفتر آدرس برای کاربر فراهم می آورد. برداشت به آدرس‌های امن دفتر آدرس به رمز دوعاملی یا کد تایید
یکبار مصرف نیازی ندارد.

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
  "data": [
    {
      "id": 3,
      "title": "TetherBinance",
      "network": "BSC",
      "address": "000000xxxxxxx111111111zzzzzzz",
      "createdAt": "2023-08-09T10:12:37+00:00"
    },
    {
      "id": 4,
      "title": "BinanceCoinOKX",
      "network": "BNB",
      "address": "000000xxxxxxx222222222zzzzzzz",
      "tag": "test17280992",
      "createdAt": "2023-08-09T10:26:12+00:00"
    }
  ]
}
```

برای دریافت دفتر آدرس از این درخواست استفاده نمایید.

- **درخواست:**: `GET /address_book`
- **محدودیت فراخوانی:** 20 درخواست در هر دقیقه

### پارامترهای ورودی

| پارامتر | نوع    | پیش‌فرض     | توضیحات    | نمونه |
|---------|--------|-------------|------------|-------|
| network | string | همه شبکه‌ها | فیلتر شبکه | `BSC` |

## اضافه کردن آدرس جدید به دفتر آدرس

```shell
curl -X POST 'https://api.nobitex.ir/address_book' \
  -H "Authorization: Token yourTOKENhereHEX0000000000" \
  -H "content-type: application/json" \
  --data '{"title": "test", "network": "BSC", "address": "000000xxxxxxx111111111zzzzzzz",
    "otpCode": "123456", "tfaCode": "654321"}'
  
```

```plaintext
http POST https://api.nobitex.ir/address_book
```

> در صورت فراخوانی درست، پاسخ به این صورت خواهد بود:

```json
{
  "status": "ok",
  "data": {
    "id": 5,
    "title": "test",
    "network": "BSC",
    "address": "000000xxxxxxx111111111zzzzzzz",
    "createdAt": "2023-08-09T10:22:37+00:00"
  }
}
```


> برای دریافت رمزیکبارمصرف otpCode از درخواست زیر استفاده نمایید:

```shell
curl -X POST 'https://api.nobitex.ir/otp/request' \
  -H 'Authorization: Token yourTOKENhereHEX0000000000' \
  --data '{"type": "email", "usage": "address_book"}'
```


- **درخواست:**: `POST /address_book`
- **محدودیت فراخوانی:** 6 درخواست در هر دقیقه

### پارامترهای ورودی

| پارامتر | نوع    | پیش‌فرض                      | توضیحات                | نمونه                           |
|---------|--------|------------------------------|------------------------|---------------------------------|
| title   | string | الزامی                       | عنوان آدرس             | `test`                          |
| network | string | الزامی                       | شبکه                   | `BSC`                           |
| address | string | الزامی                       | آدرس                   | `000000xxxxxxx111111111zzzzzzz` |
| tag     | string | الزامی در شبکه‌های تگ‌اجباری | تگ                     | `test17280992`                  |
| otpCode | string | الزامی                       | کد تأیید ایمیل و پیامک | `123456`                        |
| tfaCode | string | الزامی                       | کد تأیید دوعاملی       | `654321`                        |

### نکات و ملاحظات

1. مقدار آدرس در شبکه‌های بدون تگ نمی‌تواند تکراری باشد.
2. در شبکه‌های <span class="tag-required-networks"></span> تگ اجباری است.
3. مقدار تگ‌های یک آدرس در شبکه‌های تگ‌اجباری نمی‌تواند تکراری باشد. (زوج آدرس و تگ باید یکتا باشد.)
4. برای دریافت کد تایید از طریق ایمیل (otpCode) از درخواست روبرو استفاده نمایید.

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
| InvalidAddress    | آدرس مربوط به شبکه مشخص شده نمی‌باشد.                          |
| DuplicatedAddress | آدرس قبلا ثبت شده و تکراری می باشد.                            |
| InvalidTag        | فرمت تگ مطابق شبکه مشخص شده نمی‌باشد.                          |


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
در صورتی که حالت برداشت امن فعال باشد مقصدهای برداشت رمزارزی به آدرس‌های موجود در دفتر آدرس محدود خواهد شد 
و به استثنای برداشت در شبکه لایتنینگ، امکان برداشت رمزارزی به آدرس‌های غیر وجود نخواهد داشت.

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
با غیر فعال کردن برداشت امن، به جهت حفظ امنیت حساب امکان برداشت به مدت ۲۴ ساعت روی حساب کاربر محدود خواهد شد.

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
