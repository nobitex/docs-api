# امنیت

##  سابقه ورود

```shell
curl 'https://apiv2.nobitex.ir/users/login-attempts' \
  -H "Authorization: Token yourTOKENhereHEX0000000000"
```

```plaintext
http POST https://apiv2.nobitex.ir/users/login-attempts \
```

> در صورت فراخوانی درست، پاسخ به این صورت خواهد بود:

```json
{
    "status": "ok",
    "attempts": [
        {
            "ip": "46.209.130.106",
            "username": "name@example.com",
            "status": "Successful",
            "createdAt": "2018-11-28T14:16:08.264308+00:00"
        },
        ...
    ]
}
```

برای دریافت سابقه ورود از این نوع درخواست استفاده نمایید:

- **درخواست:** `GET /users/login-attempts`


## فعالسازی لغو اضطراری

```shell
curl 'https://apiv2.nobitex.ir/security/emergency-cancel/activate' \
  -X GET \
  -H "Authorization: Token yourTOKENhereHEX0000000000"
```

```plaintext
http GET https://apiv2.nobitex.ir/security/emergency-cancel/activate \
  Authorization: Token yourTOKENhereHEX0000000000
```

> در صورت فراخوانی درست، پاسخ به این صورت خواهد بود:

```json
{
    "status": "ok",
    "cancelCode": {
        "code": "seJlef35L3"
    }
}
```


جهت فعالسازی امکان لغو اضطراریِ درخواست های برداشت از این درخواست استفاده نمائید.
پس از فعالسازی این امکان، پیامک و ایمیل ارسالی پس از ثبت درخواست برداشت،
حاوی لینکی خواهد بود که شما میتوانید با استفاده از آن در صورتی که درخواست برداشت توسط شما ثبت نشده است، در کمترین زمان ممکن و بدون نیاز به لاگین، درخواست های برداشت خود را لغو نمایید.

- **درخواست:** `GET /security/emergency-cancel/activate`


### نکات و ملاحظات
توجه داشته باشید: در صورتی که درخواست برداشت شما توسط این امکان لغو گردد، امکان ثبت درخواست برداشت تا ۷۲ ساعت برای شما غیرفعال خواهد شد.
</aside>


## آنتی فیشینگ

جهت امنیت حساب کاربری و همچنین اعتماد بیشتر کاربران به ایمیل هایی که از سمت توبیتکس ارسال میشود نیاز هست که کاربر بتواند کد یونیک برای حساب کاربری خود انتخاب کند که تمامی ایمیل هایی که از سمت نوبیتکس به صورت اتوماتیک ارسال میشود حاوی این کد باشد.
.این کد به کاربر این اطمینان را میدهد که این ایمیل قطعا از نوبیتکس ارسال شده است.


### ایجاد کد آنتی فیشینگ

>نمونه درخواست:

```shell
curl --location --request POST 'https://apiv2.nobitex.ir/security/anti-phishing' \
--Navbar 'Authorization: Token yourTOKENhereHEX0000000000' \
--form 'code="sample_anti_phishing"' \
--form 'otpCode="123456"'
```


> در صورت فراخوانی درست، پاسخ به این صورت خواهد بود:

```json
{
    "status": "ok"
}
```

> برای دریافت رمزیکبارمصرف otpCode باید از API زیر با پارامترهای مشخص شده استفاده نمایید:

```shell
curl -X POST 'https://apiv2.nobitex.ir/v2/otp/request' \
  -H 'Authorization: Token yourTOKENhereHEX0000000000' \
  --data '{"type": "email", "usage": "anti_phishing_code"}'
```

> **حالت های خطا**

> در صورتی که پارامتر کدیکبارمصرف یا آنتی فیشینگ را ارسال نکرده باشید با این خطا روبرو خواهید شد.

```json
{
    "status": "failed",
    "code": "ParseError",
    "message": "Missing string value"
}
```


> در صورتی که کدیکبار مصرف ارسال شده، نامعتبر باشد با این خطا روبرو خواهید بود.

```json
{
  "status": "failed",
  "code": "InvalidOTPCode",
  "message": "Please use otp/request endpoint"
}
```

> در صورتی که طول عبارت ارسالی نامناسب باشد با این خطا مواجه خواهید شد

```json
{
    "status": "failed",
    "code": "InvalidCodeLength",
    "message": "Code length must be between 4 and 15 characters"
}
```


* **درخواست:** `POST /security/anti-phishing`
* **<a href="/#ratelimit">محدودیت فراخوانی:</a>** ۱۰ درخواست در هر دقیقه


* پارامترهای ورودی

پارامتر | نوع    | پیش‌فرض | توضیحات                                      | نمونه
------- |--------|---------|----------------------------------------------| ---------
code | string | الزامی  | کد آنتی فیشینگ تعیین شده توسط کاربر          | sample_anti_phishing
otpCode | number | الزامی  | کد یکبار مصرف ارسال شده به شماره همراه کاربر | 12345




### دریافت کد آنتی فیشینگ

* **درخواست:** `GET /security/anti-phishing`
* **<a href="/#ratelimit">محدودیت فراخوانی:</a>** ۱۰ درخواست در هر دقیقه


>نمونه درخواست:

```shell
curl --location --request GET 'https://apiv2.nobitex.ir/security/anti-phishing' \
--Navbar 'Authorization: Token yourTOKENhereHEX0000000000' 
```


> در صورت فراخوانی درست، پاسخ به این صورت خواهد بود:

```json
{
   "status": "ok",
   "antiPhishingCode": "s*********g"
}
```

> در صورتی که آنتی‌فیشینگ کد برای کاربر فعال نشده باشد با این پاسخ مواجه خواهید شد

```json
{
    "status": "failed",
    "code": "NotFound",
    "message": "AntiPhishingCode is not declared for this user"
}
```
