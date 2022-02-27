# گیفت کارت

کارت هدیه‌ی نوبیتکس، امکان ارسال هدیه‌ به صورت فیزیکی و مجازی را به شخص دیگری فراهم می‌کند. فرایند دریافت هدیه نیز
می‌تواند به صورت داخلی و یا از نوع lightning باشد.

<aside class="notice">
از آنجایی در حالت دریافت lightning دریافت کننده می‌تواند کاربر نوبیتکس نباشد برای بعضی از APIهای این مجموعه احراز هویت الزامی نیست.
</aside>

##ایجاد هدیه

>نمونه درخواست:

```shell
curl -X POST 'https://api.nobitex.ir/gift/create-gift' \
-H 'Authorization: Token yourTOKENhereHEX0000000000' \
-H 'X-TOTP: 2568148' \
-H 'Content-Type: application/json' \
--data '{
    "amount": 0.02,
    "currency": "bnb",
    "gift_type": "digital",
    "package_type": "new",
    "mobile": "09127759318",
    "gift_sentence": "تقدیم به شما",
    "receiver_address": "iran-tehran",
    "receiver_postal_code": "3348-8841",
    "card_design": "default",
    "password": "testpass123",
    "redeem_type": "internal",
    "redeem_date": "2023-11-12",
    "receiver_full_name": "ali karimi"
}'
```


> در صورت فراخوانی درست، پاسخ به این صورت خواهد بود:

```json
{
    "status": "created",
    "gift_withdraw_id": 158,
    "gift_id": 22,
    "cost": "100"
}
```

برای ایجاد هدیه‌ی باید از درخواست با مشخصات زیر استفاده نمایید:

* آدرس: `POST /gift/create-gift`

* پارامترهای ورودی:

پارامتر | نوع      | پیش‌فرض          | توضیحات                   | نمونه
------- |----------|------------------|---------------------------| ---------
amount | monetary | الزامی           | مقدار رمزارز              | "0.02"
currency | string   | الزامی           | رمزارز                    | "BTC"
mobile | string   | اختیاری          | همراه گیرنده              | "9127774565"
email | string   | اختیاری          | ایمیل گیرنده              | "test@gmail.com"
gift_type | string   | الزامی           | نوع هدیه                  | "pyshical"
gift_sentence | string   | الزامی           | جمله برای گیرنده          | "تقدیم به شما"
package_type | string   | اختیاری          | نوع پکیج                  | "default"
receiver_address | string   | اختیاری          | آدرس گیرنده               | "iran-tehran"
receiver_postal_code | string   | اختیاری          | کد پستی گیرنده            | "3354-7721"
receiver_full_name | string   | الزامی           | نام و نام خانوادگی گیرنده | "masoud mohamadi"
card_design | string   | الزامی           | طرح کارت                  | "default"
redeeem_date | iso-string   | اختیاری          | تاریخ دریافت              | "2022-09-17"
redeem_type | string   | الزامی           | نوع دریافت                | "lightning"
password | string   | الزامی           | گذرواژه‌ی گیرنده          | "testpass123"

* پارامترهای پاسخ:

پارامتر | نوع      | توضیحات       | نمونه
------- |----------|---------------| ---------
status | string   | وضعیت پاسخ    | created
gift_withdraw_id | integer  | شناسه‌ی برداشت | 159
gift_id | integer  | شناسه‌ی هدیه‌ | 36
cost | monetary | شناسه‌ی هدیه‌ | "100"

<aside class="notice">
محدودیت فراخوانی : 10 درخواست در دقیقه
</aside>


##تایید برداشت هدیه

>نمونه درخواست:

```shell
curl -X POST 'https://api.nobitex.ir/gift/confirm-gift-withdraw' \
-H 'Authorization: Token yourTOKENhereHEX0000000000' \
-H 'Content-Type: application/json' \
--data '{
    "gift_withdraw_id": 155,
    "gift_id": 36,
    "otp": "040515"
}'
```

> در صورت فراخوانی درست، پاسخ به این صورت خواهد بود:

```json
{
    "status": "ok"
}
```

برای تکمیل پروسه‌ی ایجاد هدیه‌ باید کاربر تایید برداشت را به‌صورت دوعاملی انجام دهد.

* آدرس: `POST /gift/gift/confirm-gift-withdraw`

* پارامترهای ورودی:

پارامتر | نوع     | پیش‌فرض | توضیحات                       | نمونه
------- |---------|---------|-------------------------------| ---------
gift_withdraw_id | integer | الزامی  | شناسه‌ی برداشت هدیه           | 159
gift_id | integer | الزامی  | شناسه‌ی هدیه                  | 36
otp | string  | الزامی  | کد دوعاملی ارسال شده به کاربر | "040515"

* پارامترهای پاسخ:

پارامتر | نوع     | توضیحات       | نمونه
------- |---------|---------------| ---------
status | string  | وضعیت پاسخ    | ok

<aside class="notice">
محدودیت فراخوانی : 30 درخواست در ساعت
</aside>



##لندینگ هدیه
کاربر بعد از اسکن کد هدیه‌ی خود به این صفحه انتقال داده می‌شود. که در انتهای مسیر این API کد هدیه‌ی کاربر قرار دارد.
لازم به ذکر است در صورتی که کاربر فرستنده، شماره موبایل کاربر گیرنده را وارد کرده باشد رمز یکبار مصرف در این مرحله برای کاربر فرستاده خواهد شد.

* آدرس: `GET /gift/<redeem-code>`


* پارامترهای پاسخ:

پارامتر | نوع      | توضیحات                                              | نمونه
------- |----------|------------------------------------------------------| ---------
redeem_code | string   | کد هدیه‌ي کاربر                                      | "FB57379C"
card_design | string   | طرح کارت                                             | "default"
currency | string   | رمزارز                                               | "bnb"
amount | monetary | مقدار رمزارز                                         | "0.02"
mobile_provided | boolean  | اینکه فرستنده شماره همراه گیرنده را ارسال کرده یا خیر | true
sentence | string   | جمله‌ی هدیه                                          | "تقدیم به شما"
redeem_type | string   | نوع دریافت هدیه                                      | "lightning"

<aside class="notice">
محدودیت فراخوانی : 3 درخواست در 3 دقیقه
</aside>

##دریافت هدیه‌ برای کاربران عضو

>نمونه درخواست:

```shell
curl -X POST 'https://api.nobitex.ir/gift/redeem' \
-H 'Authorization: Token yourTOKENhereHEX0000000000' \
-H 'Content-Type: application/json' \
--data '{
    "redeem_code": "30BBBBCA",
    "password": "testpass123",
    "otp": "813846"
}'
```

> در صورت فراخوانی درست، پاسخ برای حالتی که دریافت دوعاملی باشد، این صورت خواهد بود:

```json
{
    "status": "ok",
    "message": "OTP sent to user.",
    "gift_id": 22
}
```

> در صورت فراخوانی درست، پاسخ به حالتی که دریافت به صورت lightning این صورت خواهد بود:

```json
{
    "status": "ok",
    "lnUrl": "lnurlZX6N..."
}
```

> در صورت فراخوانی درست، پاسخ به حالتی که دریافت داخلی باشد، این صورت خواهد بود:

```json
{
    "status": "ok"
}
```

برای دریافت هدیه‌ی کاربری که عضو نوبیتکس است، فارق از نوع دریافت این API فراخوانی شود.

* آدرس: `POST /gift/redeem`

* پارامترهای ورودی:

پارامتر | نوع    | پیش‌فرض | توضیحات                          | نمونه
------- |--------|---------|----------------------------------| ---------
redeem_code | string | الزامی  | کد هدیه                          | "FB57379C"
password | string | الزامی  | گذرواژه‌ی هدیه                   | "testpass123"
otp | string | اختیاری | رمزیکبار مصرف ارسال شده به کاربر | "564785"

<aside class="notice">
در صورتی که کاربر ایجاده کننده‌ی هدیه شماره همراه کاربر گیرنده را وارد کرده باشد،‌ به این معناست که نحوه‌ی دریافت هدیه به‌صورت دوعاملی هست. 
</aside>

* پارامترهای پاسخ:

<aside class="notice">
در حالتی که نوع برداشت داخلی باشد و دریافت به صورت دوعاملی نباشد:
</aside>

پارامتر | نوع      | توضیحات    | نمونه
------- |----------|------------| ---------
status | string   | وضعیت پاسخ | "ok"

<aside class="notice">
در حالتی که نوع برداشت lightning باشد و دریافت به صورت دوعاملی نباشد:
</aside>

پارامتر | نوع      | توضیحات    | نمونه
------- |----------|------------| ---------
status | string   | وضعیت پاسخ | "ok"
lnUrl | string   | هدیه lnurl | "lnurlZX6N..."

<aside class="notice">
در حالتی که شماره همراه گیرنده مشخص شده باشد: 
</aside>

پارامتر | نوع     | توضیحات      | نمونه
------- |---------|--------------| ---------
status | string  | وضعیت پاسخ   | "ok"
message | string  | پیام پاسخ    | "OTP sent to user."
gift_id | integer | شناسه‌ی هدیه | 36

<aside class="notice">
محدودیت فراخوانی : 5 درخواست در ۱ ساعت
</aside>

<aside class="notice">
در صورتی که موبایل گیرنده از طرف کاربر گیرنده ارسال شده باشد مقدار otp باید وارد شود.
</aside>


##دریافت هدیه‌ی lightning برای کاربران غیر عضو

>نمونه درخواست:

```shell
curl -X POST 'https://api.nobitex.ir/gift/redeem-lightning' \
-H 'Content-Type: application/json' \
--data '{
    "redeem_code": "8AFA1DF3",
    "password": "testpass123",
    "otp": "158354"
}'
```


> در صورت فراخوانی درست، پاسخ در حالتی که نیاز به دوعاملی باشد برای دریافت، این صورت خواهد بود:

```json
{
    "status": "ok",
    "message": "OTP sent to user.",
    "gift_id": 34
}
```

> در صورت فراخوانی درست، پاسخ در حالت کلی، این صورت خواهد بود:

```json
{
  "status": "ok",
  "lnUrl": "lnurlPURQEQ..."
}
```

در صورتی که کاربری عضو نوبیتکس نباشد و نوع هدیه نیز lightning باشد باید از این API برای دریافت هدیه استفاده شود.

* آدرس: `POST /gift/redeem-lightning`

* پارامترهای ورودی:

پارامتر | نوع    | پیش‌فرض | توضیحات                          | نمونه
------- |--------|---------|----------------------------------| ---------
redeem_code | string | الزامی  | کد هدیه                          | "FB57379C"
password | string | الزامی  | گذرواژه‌ی هدیه                   | "testpass123"
otp | string | اختیاری | رمزیکبار مصرف ارسال شده به کاربر | "9127774565"

* پارامترهای پاسخ:

<aside class="notice">
در حالتی که شماره همراه گیرنده مشخص شده باشد: 
</aside>

پارامتر | نوع     | توضیحات      | نمونه
------- |---------|--------------| ---------
status | string  | وضعیت پاسخ   | "ok"
message | string  | پیام پاسخ    | "OTP sent to user."
gift_id | integer | شناسه‌ی هدیه | 36

<aside class="notice">
در حالت کلی: 
</aside>

پارامتر | نوع      | توضیحات    | نمونه
------- |----------|------------| ---------
status | string   | وضعیت پاسخ | "ok"
lnUrl | string   | هدیه lnurl | "lnurlZX6N..."

<aside class="notice">
محدودیت فراخوانی : 5 درخواست در ۱ ساعت
</aside>
<aside class="notice">
در این api نیاز به توکن وجود ندازد.
</aside>

<aside class="notice">
در صورتی که موبایل گیرنده از طرف کاربر گیرنده ارسال شده باشد مقدار otp باید وارد شود.
</aside>


##لیست کارت‌های هدیه‌ی کاربر

> در صورت فراخوانی درست، پاسخ به این صورت خواهد بود:

```json
{
    "status": "ok",
    "sent_gift_cards": [
        {
            "id": 32,
            "full_name": "masoud mohamadi",
            "address": "iran-tehran",
            "mobile": "09127842542",
            "postal_code": "3579-4123",
            "package_type": "New",
            "redeem_code": "EF9472B7",
            "gift_sentence": "تقدیم به شما",
            "amount": "0.02",
            "sender": {
                "username": "test@gmail.com",
                "name": ""
            },
            "receiver": null,
            "currency": "bnb",
            "gift_type": "Digital",
            "gift_status": "Redeemed",
            "card_design": "Default",
            "created_at": "2022-02-13T11:42:27.338380+00:00",
            "redeem_date": "2023-11-11T20:30:00+00:00"
        }
    ],
    "received_gift_cards": [
        {
            "id": 21,
            "full_name": "mohsen amini",
            "address": "iran-tehran",
            "mobile": "09125412335",
            "postal_code": "8568-9982",
            "package_type": "New",
            "redeem_code": "D758A8A2",
            "gift_sentence": "جمله‌ی تست هدیه",
            "amount": "0.05",
            "sender": {
                "username": "test@gmail.com",
                "name": ""
            },
            "receiver": {
                "username": "new_user@gmail.com",
                "name": ""
            },
            "currency": "bnb",
            "gift_type": "Digital",
            "gift_status": "Redeemed",
            "card_design": "Default",
            "created_at": "2022-02-10T12:33:08.226370+00:00",
            "redeem_date": "2023-11-11T20:30:00+00:00"
        }
    ]
}
```


برای نمایش تمامی هدایای فرستاده شده و یا دریافت شده‌ی کاربر استفاده می‌شود.

* آدرس: `GET /gift/user-gifts`

* پارامترهای پاسخ:

پارامتر | نوع                         | توضیحات                         | نمونه
------- |-----------------------------|---------------------------------| ---------
status | string                      | وضعیت پاسخ                      | "ok"
sent_gift_cards | list of user sent gifts     | لیست هدایای فرستاده شده‌ی کاربر | []
received_gift_cards | list of user received gifts | لیست هدایای گرفته شده‌ی کاربر   | []

<aside class="notice">
محدودیت فراخوانی : 60 درخواست در دقیقه
</aside>

##ایجاد درخواست تعداد بالای هدیه
در صورتی که کاربری درخواست برای تعداد بالای هدیه داشته باشد باید این api فراخوانی شود که درخواست کاربر ثبت شود.
برای این درخواست نیاز به ارسال پارامتر ورودی نیست و فقط کاربر درخواست کننده باید لاگین باشد.

* آدرس: `POST /gift/create-gift-batch`

* پارامترهای پاسخ:

پارامتر | نوع                         | توضیحات                         | نمونه
------- |-----------------------------|---------------------------------| ---------
status | string                      | وضعیت پاسخ                      | "created"


<aside class="notice">
محدودیت فراخوانی : 10 درخواست در ساعت
</aside>
