# موارد قدیمی
برخی از APIها به دلیل تغییرات ساختاری یا کارکردی، قدیمی و deprecated محسوب می‌شوند و نباید دیگر از آن‌ها استفاده شود.
این موارد صرفاً جهت ثبت در ادامه خواهند آمد، ولی ممکن است در هر یک از نسخه‌های آتی نوبیتکس این APIها غیرفعال شوند
یا دیگر پاسخگو نباشند.

##  کد دعوت پیش‌فرض

```shell
curl 'https://api.nobitex.ir/users/get-referral-code' \
  -H "Authorization: Token e9282e56c83f93eb077043e5ad8b6cf5b3ff7568"
```

```plaintext
http POST https://api.nobitex.ir/users/get-referral-code \
```

> در صورت فراخوانی درست، پاسخ به این صورت خواهد بود:

```json
{
    "status": "ok",
    "referredUsersCount": 0,
    "referralCode": "84440",
    "referralFeeTotalCount": 0,
    "referralFeeTotal": 0
}
```

برای دریافت کد دعوت پیش‌فرض از این نوع درخواست استفاده نمایید:

- آدرس : `GET /users/get-referral-code`
