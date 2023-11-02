<h1 id="security_devices">امنیت</h1>
از این سرویس‌ها برای مشاهده و کنترل دستگاه‌های فعال شما مورد استفاده قرار می‌گیرد.


## دریافت لیست دستگاه‌ها 


* **درخواست:** `GET /security/devices`
* **محدودیت فراخوانی:** 60 درخواست در ساعت

>نمونه درخواست:

```shell
curl GET 'https://api.nobitex.ir/security/devices' \
-H 'Authorization: Token yourTOKENhereHEX0000000000'
```


> در صورت فراخوانی درست، پاسخ به این صورت خواهد بود:

```json
{
    "status": "ok",
    "devices": [
        {
            "device": "a2dKd13K0",
            "user_agent": "Android/4.3.1 (SM-A736B)",
            "login_attempts": [
                {
                    "ip": "31.57.102.203",
                    "ip_country": "IR",
                    "created_at": "2022-10-12T12:24:00.327796+00:00"
                }
            ]
        },
        {
            "device": "o9HreIgft",
            "user_agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/104.0.0.0 Safari/537.36",
            "login_attempts": [
                {
                    "ip": "31.57.98.55",
                    "ip_country": "IR",
                    "created_at": "2022-09-21T13:11:45.037143+00:00"
                },
                {
                    "ip": "31.57.98.55",
                    "ip_country": "IR",
                    "created_at": "2022-09-21T09:01:41.498483+00:00"
                },
                {
                    "ip": "31.57.106.80",
                    "ip_country": null,
                    "created_at": "2022-08-24T05:30:29.462668+00:00"
                }
            ]
        },
        {
            "device": "k9fEuGQMq",
            "user_agent": "PostmanRuntime/7.28.4",
            "login_attempts": [
                {
                    "ip": "151.243.54.151",
                    "ip_country": "IR",
                    "created_at": "2022-08-27T13:52:40.596705+00:00"
                }
            ]
        }
    ]
}
```


## حذف دستگاه فعال 


* **درخواست:** `GET /security/devices/delete`
* **محدودیت فراخوانی:** 60 درخواست در ساعت

>نمونه درخواست:

```shell
curl GET 'https://api.nobitex.ir/security/devices/delete?device=dhHJklmh' \
-H 'Authorization: Token yourTOKENhereHEX0000000000'
```


> در صورت فراخوانی درست، پاسخ به این صورت خواهد بود:

```json
{
    "status": "ok"
}
```

> در صورتی که شناسه دستگاه ارسال نشود:

```json
{
    "message": "No KnownDevice matches the given query.",
    "error": "NotFound"
}
```


### پارامترهای ورودی

   پارامتر|   نوع  |   پیش‌فرض | توضیحات       | نمونه
--------- |--------|----------|---------------| ---------
device    | string | الزامی   | شناسه دستگاه  | `o9HrIdgft`



## حذف همه دستگاه‌های فعال 


* **درخواست:** `GET /security/devices/delete-all`
* **محدودیت فراخوانی:** 60 درخواست در ساعت

>نمونه درخواست:

```shell
curl GET 'https://api.nobitex.ir/security/devices/delete-all' \
-H 'Authorization: Token yourTOKENhereHEX0000000000'
```


> در صورت فراخوانی درست، پاسخ به این صورت خواهد بود:

```json
{
    "status": "ok"
}
```
