# آنتی فیشینگ

جهت امنیت حساب کاربری و همچنین اعتماد بیشتر کاربران به ایمیل هایی که از سمت توبیتکس ارسال میشود نیاز هست که کاربر بتواند کد یونیک برای حساب کاربری خود انتخاب کند که تمامی ایمیل هایی که از سمت نوبیتکس به صورت اتوماتیک ارسال میشود حاوی این کد باشد.
.این کد به کاربر این اطمینان را میدهد که این ایمیل قطعا از نوبیتکس ارسال شده است.

##ایجاد کد آنتی فیشینگ

>نمونه درخواست:

```shell
curl --location --request POST 'https://api.nobitex.ir/security/anti-phishing' \
--header 'Authorization: Token 312616c62a1b5f81a7f1049051fda3382cf41941' \
--form 'code="sample_anti_phishing"' \
--form 'otpCode="123456"'
```


> در صورت فراخوانی درست، پاسخ به این صورت خواهد بود:

```json
{
    "status": "ok"
}
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
* **محدودیت فراخوانی:** ۵ درخواست در هر دقیقه


### پارامترهای ورودی:

پارامتر | نوع    | پیش‌فرض | توضیحات                                      | نمونه
------- |--------|---------|----------------------------------------------| ---------
code | string | الزامی  | کد آنتی فیشینگ تعیین شده توسط کاربر          | sample_anti_phishing
otpCode | number | الزامی  | کد یکبار مصرف ارسال شده به شماره همراه کاربر | 12345




##دریافت کد آنتی فیشینگ

* **درخواست:** `GET /security/anti-phishing`
* **محدودیت فراخوانی:** ۱۰ درخواست در هر دقیقه

<aside class="notice"> توجه فرمائید محدودیت فراخوانی ۱۰ درخواست در هر دقیقه برای هردوحالت دریافت و ثبت کد آنتی فیشینگ است.</aside>

>نمونه درخواست:

```shell
curl --location --request GET 'https://api.nobitex.ir/security/anti-phishing' \
--header 'Authorization: Token 312616c62a1b5f81a7f1049051fda3382cf41941' 
```


> در صورت فراخوانی درست، پاسخ به این صورت خواهد بود:

```json
{
   "status": "ok",
   "antiPhishingCode": "s*********g"
}
```
در صورتی که کد آنتی فیشینگ موجود نباشد، رشته‌ی خالی برمیگردد. 
