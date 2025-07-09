# تیکتینگ
از این سرویس برای ارتباط مشتریان با پشتیبانان استفاده می‌شود.

## فهرست تمام تاپیک‌ها
برای دریافت لیست تاپیک‌ها از این درخواست استفاده نمایید.
دقت نمایید که این لیست فقط شامل تاپیک‌هایی می‌باشد که از سمت ادمین، مقدار show_to_users برایشان برابر با True قرار داده شده باشد.

خروجی براساس فیلد اولویت و سپس نام مرتب شده است.  

* **درخواست:** `GET /ticketing/topics`
* **محدودیت فراخوانی:** ۳۰ درخواست در دقیقه

>نمونه درخواست:

```shell
curl GET 'https://apiv2.nobitex.ir/ticketing/topics' \
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
curl GET 'https://apiv2.nobitex.ir/ticketing/tickets' \
-H 'Authorization: Token yourTOKENhereHEX0000000000'
```


> در صورت فراخوانی درست، پاسخ به این صورت خواهد بود:

```json
{
    "status": "ok",
    "data": {
        "tickets": [
            {
                "id": 1000249,
                "topic": {
                    "id": 2,
                    "title": "احراز"
                },
                "state": "sent",
                "stateName": "ارسال‌شده",
                "createdAt": "2022-11-07T14:25:46.606120+00:00",
                "content": "سلام\\n\\nلطفا موارد زیر را بررسی بفرمایید:\\n* مشکل یک\\n* مشکل دو\\n* مشکل سه\\n* مشکل چهار\\n\\n**لطفا** مشکلات بنده را در اسرع وقت بررسی بفرمایید",
                "rating": null
            },
            {
                "id": 1000248,
                "topic": {
                    "id": 2,
                    "title": "احراز"
                },
                "state": "sent",
                "stateName": "ارسال‌شده",
                "createdAt": "2022-11-07T14:21:56.244413+00:00",
                "content": "سلام\\n\\n\\\\r\\\\n\\n\\nکاربر گرامی\\n\\n\\\\r\\\\n\\n\\nاین چه تیکتیه زدی؟! چته؟! چی میگی؟!\\n\\n\\\\r\\\\n\\n\\nخدافظظظ",
                "rating": null
            }
        ]
    }
}
```

> همان‌طور که در نمونه خروجی بالا نیز مشخص است، محتوای تیکت با فرمت Markdown ذخیره شده است. این مسئله در مورد محتوای کامنت نیز صدق می‌کند. در واقع به‌منظور داشتن قابلیت استایل دادن به محتوای تیکت و کامنت‌ها، از این فرمت استفاده شده است. دقت کنید که مقدار seenAt ممکن است null باشد.

## جزئیات تیکت (شامل کامنت‌ها و فایل‌های مربوطه)
برای دریافت جزئیات تیکت موردنظرتان از این درخواست استفاده نمایید.

* **درخواست:** `GET /ticketing/tickets/ticket_id`
* **محدودیت فراخوانی:** ۶۰ درخواست در دقیقه

توجه فرمایید ticket_id در url درخواست از نوع int می باشد.

>نمونه درخواست:

```shell
curl GET 'https://apiv2.nobitex.ir/ticketing/tickets/2546' \
-H 'Authorization: Token yourTOKENhereHEX0000000000'
```


> در صورت فراخوانی درست، پاسخ به این صورت خواهد بود:

```json
{
    "status": "ok",
    "data": {
        "ticket": {
            "id": 1000249,
            "topic": {
                "id": 2,
                "title": "احراز"
            },
            "state": "sent",
            "stateName": "ارسال‌شده",
            "createdAt": "2022-11-07T14:25:46.606120+00:00",
            "content": "سلام\\n\\nلطفا موارد زیر را بررسی بفرمایید:\\n* مشکل یک\\n* مشکل دو\\n* مشکل سه\\n* مشکل چهار\\n\\n**لطفا** مشکلات بنده را در اسرع وقت بررسی بفرمایید",
            "rating": null,
            "filesUrls": [
                "/ticketing/attachments/c11bfe26-5998-4708-b404-cf406cad744a"
            ],
            "comments": [
                {
                    "actorName": "tabvar@nobitex.ir",
                    "content": "آقای فلانی لطفا موارد زیر را **سریعا** بررسی فرمایید",
                    "filesUrls": [],
                    "createdAt": "2022-11-07T14:38:33.493510+00:00",
                    "seenAt": null
                }
            ],
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
  "message": "ticket does not exist."
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
curl POST 'https://apiv2.nobitex.ir/ticketing/tickets/create' \
-H 'Authorization: Token yourTOKENhereHEX0000000000'
```

### پارامترهای ورودی

پارامتر | نوع        | پیش‌فرض | توضیحات                      | نمونه
------- |------------|---------|------------------------------| ---------
content | string     | الزامی  | محتوای تیکت با فرمت markdown | hello world
topic | number     | الزامی  | شناسه‌ی موضوع (تاپیک) تیکت   | 2
files | list[file] | اختیاری | عکس‌های پیوست                | [photo.jpg]


> در صورت فراخوانی درست، پاسخ مشابه پاسخ جزئیات تیکت خواهد بود:

```json
{
    "status": "ok",
    "data": {
        "ticket": {
            "id": 1000249,
            "topic": {
                "id": 2,
                "title": "احراز"
            },
            "state": "sent",
            "stateName": "ارسال‌شده",
            "createdAt": "2022-11-07T14:25:46.606120+00:00",
            "content": "سلام\\n\\nلطفا موارد زیر را بررسی بفرمایید:\\n* مشکل یک\\n* مشکل دو\\n* مشکل سه\\n* مشکل چهار\\n\\n**لطفا** مشکلات بنده را در اسرع وقت بررسی بفرمایید",
            "rating": null,
            "filesUrls": [
                "/ticketing/attachments/c11bfe26-5998-4708-b404-cf406cad744a"
            ],
            "comments": [],
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
  "code": "InvalidMimeType",
  "message": "Incorrect mime type."
}
```


> در صورتی که تعداد ضمیمه‌ها مجاز نباشد، پاسخ به این صورت خواهد بود:

```json
{
  "status": "failed",
  "code": "TooManyFiles",
  "message": "A maximum of 10 files is allowed."
}
```

> در صورتی که خطای اعتبارسنجی اطلاعات ارسالی رخ دهد، پاسخ به این صورت خواهد بود:

```json
{
  "status": "failed",
  "code": "ValidationError",
  "message": {"content": ["این فیلد اجباری است"]}
}
```

## ایجاد کامنت
برای ایجاد کامنت روی یک تیکت از این درخواست استفاده نمایید.

* **درخواست:** `POST /ticketing/comments/create`
* **محدودیت فراخوانی:** ۳۰ درخواست در دقیقه
* **حداکثر تعداد عکس:** ۱۰ عدد
* **حداکثر حجم هر عکس:** یک مگابایت
* **فرمت‌های قابل قبول:** PNG/JPEG/GIF


>نمونه درخواست:

```shell
curl POST 'https://apiv2.nobitex.ir/ticketing/comments/create' \
-H 'Authorization: Token yourTOKENhereHEX0000000000'
```

### پارامترهای ورودی

پارامتر | نوع        | پیش‌فرض | توضیحات                       | نمونه
------- |------------|---------|-------------------------------| ---------
content | string     | الزامی  | محتوای کامنت با فرمت markdown | hello world
ticket | number     | الزامی  | شناسه‌ی تیکت                  | 2
files | list[file] | اختیاری | عکسهای پیوست                  | [photo.jpg]



> در صورت فراخوانی درست، پاسخ مشابه پاسخ جزئیات تیکت خواهد بود:

```json
{
    "status": "ok",
    "data": {
        "ticket": {
            "id": 1000249,
            "topic": {
                "id": 2,
                "title": "احراز"
            },
            "state": "sent",
            "stateName": "ارسال‌شده",
            "createdAt": "2022-11-07T14:25:46.606120+00:00",
            "content": "سلام\\n\\nلطفا موارد زیر را بررسی بفرمایید:\\n* مشکل یک\\n* مشکل دو\\n* مشکل سه\\n* مشکل چهار\\n\\n**لطفا** مشکلات بنده را در اسرع وقت بررسی بفرمایید",
            "rating": null,
            "filesUrls": [
                "/ticketing/attachments/c11bfe26-5998-4708-b404-cf406cad744a"
            ],
            "comments": [
                {
                    "actorName": "tabvar@nobitex.ir",
                    "content": "آقای فلانی لطفا موارد زیر را **سریعا** بررسی فرمایید",
                    "filesUrls": [],
                    "createdAt": "2022-11-07T14:38:33.493510+00:00",
                    "seenAt": null
                }
            ],
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

> در صورتی که تیکت در وضعیت بسته باشد، پاسخ به این صورت خواهد بود:

```json
{
  "status": "failed",
  "code": "ValidationError",
  "message": {"ticket": ["comment on spam or closed tickets is impossible."]}
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
  "code": "InvalidMimeType",
  "message": "Incorrect mime type."
}
```

> در صورتی که تعداد ضمیمه‌ها مجاز نباشد، پاسخ به این صورت خواهد بود:

```json
{
  "status": "failed",
  "code": "TooManyFiles",
  "message": "A maximum of 10 files is allowed."
}
```

> در صورتی که خطای اعتبارسنجی اطلاعات ارسالی رخ دهد، پاسخ به این صورت خواهد بود:

```json
{
  "status": "failed",
  "code": "ValidationError",
  "message": {"content": ["این فیلد اجباری است"]}
}
```


## بستن تیکت
برای بستن یک تیکت از درخواست زیر استفاده نمایید:

* **درخواست:** `POST /ticketing/tickets/ticket_id/close`
* **محدودیت فراخوانی:** ۲۰ درخواست در دقیقه

توجه فرمایید ticket_id در url درخواست از نوع int می باشد.

>نمونه درخواست:

```shell
curl POST 'https://apiv2.nobitex.ir/ticketing/tickets/<id:int>/close' \
-H 'Authorization: Token yourTOKENhereHEX0000000000'
```

### پارامترهای ورودی
نیاز نیست.


> در صورت فراخوانی درست، پاسخ مشابه پاسخ جزئیات تیکت خواهد بود:

```json
{
    "status": "ok",
    "data": {
        "ticket": {
            "id": 1000249,
            "topic": {
                "id": 2,
                "title": "احراز"
            },
            "state": "closed",
            "stateName": "بسته",
            "createdAt": "2022-11-07T14:25:46.606120+00:00",
            "content": "سلام\\n\\nلطفا موارد زیر را بررسی بفرمایید:\\n* مشکل یک\\n* مشکل دو\\n* مشکل سه\\n* مشکل چهار\\n\\n**لطفا** مشکلات بنده را در اسرع وقت بررسی بفرمایید",
            "rating": null,
            "filesUrls": [
                "/ticketing/attachments/c11bfe26-5998-4708-b404-cf406cad744a"
            ],
            "comments": [
                {
                    "actorName": "tabvar@nobitex.ir",
                    "content": "آقای فلانی لطفا موارد زیر را **سریعا** بررسی فرمایید",
                    "filesUrls": [],
                    "createdAt": "2022-11-07T14:38:33.493510+00:00",
                    "seenAt": null
                }
            ],
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


## نظرسنجی روی تیکت
برای نظردهی به یک تیکت از درخواست زیر استفاده نمایید:

* **درخواست:** `POST /ticketing/tickets/ticket_id/rate`
* **محدودیت فراخوانی:** ۲۰ درخواست در دقیقه

توجه فرمایید ticket_id در url درخواست از نوع int می باشد.

>نمونه درخواست:

```shell
curl POST 'https://apiv2.nobitex.ir/ticketing/tickets/<id:int>/rate' \
-H 'Authorization: Token yourTOKENhereHEX0000000000'
```

### پارامترهای ورودی

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
            "id": 1000249,
            "topic": {
                "id": 2,
                "title": "احراز"
            },
            "state": "closed",
            "stateName": "بسته",
            "createdAt": "2022-11-07T14:25:46.606120+00:00",
            "content": "سلام\\n\\nلطفا موارد زیر را بررسی بفرمایید:\\n* مشکل یک\\n* مشکل دو\\n* مشکل سه\\n* مشکل چهار\\n\\n**لطفا** مشکلات بنده را در اسرع وقت بررسی بفرمایید",
            "rating": 5,
            "filesUrls": [
                "/ticketing/attachments/c11bfe26-5998-4708-b404-cf406cad744a"
            ],
            "comments": [
                {
                    "actorName": "tabvar@nobitex.ir",
                    "content": "آقای فلانی لطفا موارد زیر را **سریعا** بررسی فرمایید",
                    "filesUrls": [],
                    "createdAt": "2022-11-07T14:38:33.493510+00:00",
                    "seenAt": null
                }
            ],
            "ratingNote": "خیلی ممنون. مشکلاتم خیلی سریع حل شد"
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


> در صورتی که تیکت هنوز بسته نشده باشد، پاسخ به این صورت خواهد بود:

```json
{
  "status": "failed",
  "code": "UnclosedTicket",
  "message": "Ticket is not closed yet."
}
```

> در صورتی که تیکت قبلا نظرسنجی شده باشد، پاسخ به این صورت خواهد بود:

```json
{
  "status": "failed",
  "code": "AlreadyRated",
  "message": "Ticket is already rated."
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

## دانلود ضمیمه‌ها
برای دانلود ضمیمه‌ها از این درخواست استفاده نمایید.

* **درخواست:** `GET /ticketing/attachments/file_hash`
* **محدودیت فراخوانی:** ۱۰ درخواست در دقیقه

توجه فرمایید file_hash در url درخواست از نوع str می باشد.

>نمونه درخواست:

```shell
curl GET 'https://apiv2.nobitex.ir/ticketing/attachments/8a9759e4cedc49bda0856204499fd3de' \
-H 'Authorization: Token yourTOKENhereHEX0000000000'
```
> در صورت فراخوانی درست، پاسخ به این صورت خواهد بود:

```shell
b'\x89PNG\r\n\x1a\n\x00\x00\x00\rIHDR\x00\x00\n\x00\x00\x00\x06@\x08\x02\x00\x00\x00:\xce\x8c\x97\x0
```

> در صورتی که نام فایل نامعتبر باشد، پاسخ به این صورت خواهد بود:

```json
{
  "status": "failed",
  "code": "InvalidFilename",
  "message": "Invalid ticket attachment filename."
}
```

> در صورتی که فایل وجود نداشته باشد، پاسخ به این صورت خواهد بود:

```json
{
  "status": "failed",
  "code": "NotFound",
  "message": "Ticket attachment does not exist."
}
```

> در صورتی که فایل از نوع ضمیمه‌ی تیکت نباشد، پاسخ به این صورت خواهد بود:

```json
{
  "status": "failed",
  "code": "InvalidFileType",
  "message": "The file type is not a ticket attachment."
}
```
