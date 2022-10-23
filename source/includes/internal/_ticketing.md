# تیکتینگ
از این سرویس برای ارتباط مشتریان با پشتیبانان استفاده می‌شود.

## فهرست تمام تاپیک‌ها
برای دریافت لیست تاپیک‌ها از این درخواست استفاده نمایید.

* **درخواست:** `GET /ticketing/topics`
* **محدودیت فراخوانی:** ۳۰ درخواست در دقیقه

>نمونه درخواست:

```shell
curl GET 'https://api.nobitex.ir/v2/ticketing/topics' \
-H 'Authorization: Token yourTOKENhereHEX0000000000'
```


> در صورت فراخوانی درست، پاسخ به این صورت خواهد بود:

```json
{
    "status": "ok",
    "data": {
        "topics": [
            {
                "id": 1,
                "title": "مشکل در معاملات"
            },
            {
                "id": 3,
                "title": "مشکل در تراکنش"
            }
        ]
    }
}
```

## فهرست تیکت‌های کاربر
برای دریافت لیست تیکت‌هایتان از این درخواست استفاده نمایید.

* **درخواست:** `GET /ticketing/tickets`
* **محدودیت فراخوانی:** ۳۰ درخواست در دقیقه

>نمونه درخواست:

```shell
curl GET 'https://api.nobitex.ir/v2/ticketing/tickets' \
-H 'Authorization: Token yourTOKENhereHEX0000000000'
```


> در صورت فراخوانی درست، پاسخ به این صورت خواهد بود:

```json
{
    "status": "ok",
    "data": {
        "tickets": [
            {
                "id": 1000003,
                "topic": {
                    "id": 4,
                    "title": "مشکل در معاملات"
                },
                "state": "spam",
                "stateName": "هرزنامه",
                "createdAt": "2022-02-09T16:00:22.090278+03:30",
                "content": "<p>محتوای تک پاراگرفی</p>",
                "rating": null           
            },
            {
                "id": 1000005,
                "topic": {
                    "id": 4,
                    "title": "مشکل در تراکنش"
                },
                "state": "resolved",
                "stateName": "پاسخ‌داده‌شده",
                "createdAt": "2022-02-07T22:32:22.245872+03:30",
                "content": "<p>محتوای تک پاراگرفی</p>",
                "rating": 2         
            }
        ]
    }
}
```

> همان‌طور که در نمونه خروجی بالا نیز مشخص است، محتوای تیکت با فرمت HTML ذخیره شده است. این مسئله در مورد محتوای کامنت نیز صدق می‌کند. در واقع به‌منظور داشتن قابلیت استایل دادن به محتوای تیکت و کامنت‌ها، از این فرمت استفاده شده است. دقت کنید که مقدار seenAt ممکن است null باشد.

## جزئیات تیکت (شامل کامنت‌ها و فایل‌های مربوطه)
برای دریافت جزئیات تیکت موردنظرتان از این درخواست استفاده نمایید.

* **درخواست:** `GET /ticketing/tickets/ticket_id`
* **محدودیت فراخوانی:** ۶۰ درخواست در دقیقه

توجه فرمایید ticket_id در url درخواست از نوع int می باشد.

>نمونه درخواست:

```shell
curl GET 'https://api.nobitex.ir/v2/ticketing/tickets/2546' \
-H 'Authorization: Token yourTOKENhereHEX0000000000'
```


> در صورت فراخوانی درست، پاسخ به این صورت خواهد بود:

```json
{
    "status": "ok",
    "data": {
        "ticket": {
            "id": 1000001,
            "topic": {
                "id": 4,
                "title": "مشکل در معاملات"
            },
            "state": "closed",
            "stateName": "بسته",
            "createdAt": "2022-02-06T15:33:43.573529+03:30",
            "content": "<p>سلام</p>\r\n<p style=\"text-align: right;\">کاربر گرامی</p>\r\n<p style=\"text-align: right;\">این چه تیکتیه زدی؟! چته؟! چی می&zwnj;گی؟!</p>\r\n<p style=\"text-align: right;\">خدافظظظ</p>",
            "filesUrls": [
                "/media/uploads/ticketing_attachments/ef2bd46b9ad94920b2dbf4896b17f5a8",
                "/media/uploads/ticketing_attachments/8a461f1da3ad4ad9a752d13641acf172"
            ],
            "comments": [
                {
                    "actorName": "حمیدرضا احمدی",
                    "content": "<p>یک پاسخ با سه تا فایل!</p>",
                    "filesUrls": [],
                    "createdAt": "2022-02-06T15:17:48.311145+03:30",
                    "seenAt": "2022-08-15T13:05:33.298386+00:00",
                },
                {
                    "actorName": "حمیدرضا احمدی",
                    "content": "<p>این یکی سه تا داره!</p>",
                    "filesUrls": [],
                    "createdAt": "2022-02-06T15:29:53.241361+03:30",
                    "seenAt": null
                }
            ],
            "rating": null,
            "ratingNote": ""
        }
    }
}
```

> در نظر داشته باشید که با فراخوانی این سرویس توسط کاربر مربوط به این تیکت، فیلد seenAt در کامنت‌هایی که توسط ادمین مسئول ایجاد شده و مقدار قبلی نداشته‌اند، تاریخ و ساعت اکنون در آنها ثبت می‌گردد.

> در صورتی که تیکت وجود نداشته باشد، پاسخ به این صورت خواهد بود:

```json
{
  "status": "failed",
  "code": "NotFound",
  "error": "ticket does not exist."
}
```

## ایجاد تیکت
برای ایجاد تیکت از این درخواست استفاده نمایید.

* **درخواست:** `POST /ticketing/tickets/create`
* **محدودیت فراخوانی:** ۱۰ درخواست در دقیقه
* **حداکثر تعداد عکس:** ۱۰ عدد
* **حداکثر حجم هر عکس:** یک مگابایت
* **فرمت‌های قابل قبول:** PNG/JPEG/GIF

>نمونه درخواست:

```shell
curl POST 'https://api.nobitex.ir/v2/ticketing/tickets/create' \
-H 'Authorization: Token yourTOKENhereHEX0000000000'
```

### پارامترهای ورودی:

پارامتر | نوع        | پیش‌فرض | توضیحات                    | نمونه
------- |------------|---------|----------------------------| ---------
content | string     | الزامی  | محتوای تیکت                | <p>hello world</p>
topic | number     | الزامی  | شناسه‌ی موضوع (تاپیک) تیکت | 2
files | list[file] | اختیاری | عکس‌های پیوست              | [photo.jpg]


> در صورت فراخوانی درست، پاسخ مشابه پاسخ جزئیات تیکت خواهد بود:

```json
{
    "status": "ok",
    "data": {
        "ticket": {
            "id": 1000001,
            "topic": {
                "id": 4,
                "title": "مشکل در معاملات"
            },
            "state": "sent",
            "stateName": "ارسال شده",
            "createdAt": "2022-02-06T15:33:43.573529+03:30",
            "content": "<p>hello world</p>",
            "fielsUrls": [
                "/media/uploads/ticketing_attachments/ef2bd46b9ad94920b2dbf4896b17f5a8",
                "/media/uploads/ticketing_attachments/8a461f1da3ad4ad9a752d13641acf172"
            ],
            "comments": [],
            "rating": null,
            "ratingNote": ""
        }
    }
}
```


> در صورتی که حجم برخی از ضمیمه‌ها بیشتر از مقدار تعیین شده باشد، پاسخ به این صورت خواهد بود:

```json
{
  "status": "failed",
  "code": "TooLargeFile",
  "message": "Some uploaded files are too large."
}
```

> در صورتی که فرمت برخی از ضمیمه‌ها مجاز نباشد، پاسخ به این صورت خواهد بود:

```json
{
  "status": "failed",
  "code": "ValidationError",
  "message": "Incorrect mime type."
}
```

> در صورتی که خطای اعتبارسنجی اطلاعات ارسالی رخ دهد، پاسخ به این صورت خواهد بود:

```json
{
  "status": "failed",
  "code": "ValidationError",
  "message": [{"content": "این فیلد اجباری است"}]
}
```

## ایجاد کامنت
برای ایجاد کامنت روی یک تیکت از این درخواست استفاده نمایید.

* **درخواست:** `POST /ticketing/tickets/comments/create`
* **محدودیت فراخوانی:** ۳۰ درخواست در دقیقه
* **حداکثر تعداد عکس:** ۱۰ عدد
* **حداکثر حجم هر عکس:** یک مگابایت
* **فرمت‌های قابل قبول:** PNG/JPEG/GIF


>نمونه درخواست:

```shell
curl POST 'https://api.nobitex.ir/v2/ticketing/comments/create' \
-H 'Authorization: Token yourTOKENhereHEX0000000000'
```

### پارامترهای ورودی:

پارامتر | نوع        | پیش‌فرض | توضیحات      | نمونه
------- |------------|---------|--------------| ---------
content | string     | الزامی  | محتوای کامنت | <p>hello world</p>
ticket | number     | الزامی  | شناسه‌ی تیکت | 2
files | list[file] | اختیاری | عکسهای پیوست | [photo.jpg]



> در صورت فراخوانی درست، پاسخ مشابه پاسخ جزئیات تیکت خواهد بود:

```json
{
    "status": "ok",
    "data": {
        "ticket": {
            "id": 1000001,
            "topic": {
                "id": 4,
                "title": "مشکل در معاملات"
            },
            "state": "sent",
            "stateName": "ارسال شده",
            "createdAt": "2022-02-06T15:33:43.573529+03:30",
            "content": "<p>hello world</p>",
            "filesUrls": [
                "/media/uploads/ticketing_attachments/ef2bd46b9ad94920b2dbf4896b17f5a8",
                "/media/uploads/ticketing_attachments/8a461f1da3ad4ad9a752d13641acf172"
            ],
            "comments": [
                {
                    "actorName": "حمیدرضا احمدی",
                    "content": "<p>لطفا تصاویر پنل خود را ارسال کنید</p>",
                    "filesUrls": [],
                    "createdAt": "2022-02-08T17:54:42.311891+03:30",
                    "seenAt": "2022-08-15T13:05:33.298386+00:00"
                },
                {
                    "actorName": "اشا منوچهری",
                    "content": "<p>comment from api!</p>",
                    "filesUrls": [
                        "/media/uploads/ticketing_attachments/8a9759e4cedc49bda0856204499fd3de",
                        "/media/uploads/ticketing_attachments/efe4b6b28cb5457ea2ec95ce0ce32af1"
                    ],
                    "createdAt": "2022-02-13T18:35:12.606787+03:30",
                    "seenAt": null
                }
            ],
            "rating": null,
            "ratingNote": ""
        }
    }
}
```

> در صورتی که تیکت وجود نداشته باشد، پاسخ به این صورت خواهد بود:

```json
{
  "status": "failed",
  "code": "NotFound",
  "message": "ticket does not exist."
}
```


> در صورتی که حجم برخی از ضمیمه‌ها بیشتر از مقدار تعیین شده باشد، پاسخ به این صورت خواهد بود:

```json
{
  "status": "failed",
  "code": "TooLargeFile",
  "message": "Some uploaded files are too large."
}
```

> در صورتی که فرمت برخی از ضمیمه‌ها مجاز نباشد، پاسخ به این صورت خواهد بود:

```json
{
  "status": "failed",
  "code": "ValidationError",
  "message": "Incorrect mime type."
}
```

> در صورتی که خطای اعتبارسنجی اطلاعات ارسالی رخ دهد، پاسخ به این صورت خواهد بود:

```json
{
  "status": "failed",
  "code": "ValidationError",
  "message": [{"content": "این فیلد اجباری است"}]
}
```


## بستن تیکت
برای بستن یک تیکت از درخواست زیر استفاده نمایید:

* **درخواست:** `POST /ticketing/tickets/ticket_id/close`
* **محدودیت فراخوانی:** ۲۰ درخواست در دقیقه

توجه فرمایید ticket_id در url درخواست از نوع int می باشد.

>نمونه درخواست:

```shell
curl POST 'https://api.nobitex.ir/v2/ticketing/tickets/<id:int>/close' \
-H 'Authorization: Token yourTOKENhereHEX0000000000'
```

### پارامترهای ورودی:
نیاز نیست.


> در صورت فراخوانی درست، پاسخ مشابه پاسخ جزئیات تیکت خواهد بود:

```json
{
    "status": "ok",
    "data": {
        "ticket": {
            "id": 1000001,
            "topic": {
                "id": 4,
                "title": "مشکل در معاملات"
            },
            "state": "closed",
            "stateName": "بسته",
            "createdAt": "2022-02-06T15:33:43.573529+03:30",
            "content": "<p>hello world</p>",
            "filesUrls": [
                "/media/uploads/ticketing_attachments/ef2bd46b9ad94920b2dbf4896b17f5a8",
                "/media/uploads/ticketing_attachments/8a461f1da3ad4ad9a752d13641acf172"
            ],
            "comments": [
                {
                    "actorName": "حمیدرضا احمدی",
                    "content": "<p>لطفا تصاویر پنل خود را ارسال کنید</p>",
                    "filesUrls": [],
                    "createdAt": "2022-02-08T17:54:42.311891+03:30",
                    "seenAt": "2022-08-15T13:05:33.298386+00:00"
                },
                {
                    "actorName": "اشا منوچهری",
                    "content": "<p>comment from api!</p>",
                    "filesUrls": [
                        "/media/uploads/ticketing_attachments/8a9759e4cedc49bda0856204499fd3de",
                        "/media/uploads/ticketing_attachments/efe4b6b28cb5457ea2ec95ce0ce32af1"
                    ],
                    "createdAt": "2022-02-13T18:35:12.606787+03:30",
                    "seenAt": null
                }
            ],
            "rating": null,
            "ratingNote": ""
        }
    }
}
```

> در صورتی که تیکت وجود نداشته باشد، پاسخ به این صورت خواهد بود:

```json
{
  "status": "failed",
  "code": "NotFound",
  "message": "ticket does not exist."
}
```


> در صورتی که تیکت در وضعیت پاسح‌داده‌شده نبوده باشد، پاسخ به این صورت خواهد بود:

```json
{
  "status": "failed",
  "code": "ValidationError",
  "message": "Ticket is not resolved yet."
}
```


## نظرسنجی روی تیکت
برای نظردهی به یک تیکت از درخواست زیر استفاده نمایید:

* **درخواست:** `POST /ticketing/tickets/ticket_id/rate`
* **محدودیت فراخوانی:** ۲۰ درخواست در دقیقه

توجه فرمایید ticket_id در url درخواست از نوع int می باشد.

>نمونه درخواست:

```shell
curl POST 'https://api.nobitex.ir/v2/ticketing/tickets/<id:int>/rate' \
-H 'Authorization: Token yourTOKENhereHEX0000000000'
```

### پارامترهای ورودی:

پارامتر | نوع        | پیش‌فرض | توضیحات       | نمونه
------- |------------|---------|---------------| ---------
ratingNote | string     | اختیاری | توضیح بیشتر   | The response was excellent
rating | number     | الزامی  | امتیاز ۱ تا ۵ | 5


> در صورت فراخوانی درست، پاسخ مشابه پاسخ جزئیات تیکت خواهد بود:

```json
{
    "status": "ok",
    "data": {
        "ticket": {
            "id": 1000001,
            "topic": {
                "id": 4,
                "title": "مشکل در معاملات"
            },
            "state": "closed",
            "stateName": "بسته",
            "createdAt": "2022-02-06T15:33:43.573529+03:30",
            "content": "<p>hello world</p>",
            "filesUrls": [
                "/media/uploads/ticketing_attachments/ef2bd46b9ad94920b2dbf4896b17f5a8",
                "/media/uploads/ticketing_attachments/8a461f1da3ad4ad9a752d13641acf172"
            ],
            "comments": [
                {
                    "actorName": "حمیدرضا احمدی",
                    "content": "<p>لطفا تصاویر پنل خود را ارسال کنید</p>",
                    "filesUrls": [],
                    "createdAt": "2022-02-08T17:54:42.311891+03:30",
                    "seenAt": "2022-08-15T13:05:33.298386+00:00"
                },
                {
                    "actorName": "اشا منوچهری",
                    "content": "<p>comment from api!</p>",
                    "filesUrls": [
                        "/media/uploads/ticketing_attachments/8a9759e4cedc49bda0856204499fd3de",
                        "/media/uploads/ticketing_attachments/efe4b6b28cb5457ea2ec95ce0ce32af1"
                    ],
                    "createdAt": "2022-02-13T18:35:12.606787+03:30",
                    "seenAt": null
                }
            ],
            "rating": 5,
            "ratingNote": "The response was excellent"
        }
    }
}
```

> در صورتی که تیکت وجود نداشته باشد، پاسخ به این صورت خواهد بود:

```json
{
  "status": "failed",
  "code": "NotFound",
  "message": "ticket does not exist."
}
```


> در صورتی که تیکت هنوز بسته نشده باشد و یا قبلا نظرسنجی شده باشد، پاسخ به این صورت خواهد بود:

```json
{
  "status": "failed",
  "code": "ValidationError",
  "message": "Ticket is not closed yet, or it has already been rated."
}
```

> در صورتی که خطای اعتبارسنجی اطلاعات ارسالی رخ دهد، پاسخ به این صورت خواهد بود:

```json
{
  "status": "failed",
  "code": "ValidationError",
  "message": [{"rating": "این فیلد اجباری است"}]
}
```
