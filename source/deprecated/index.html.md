---
title: موارد قدیمی API
lang: fa
toc_footers:
  - <a href='/'>مستندات API نوبیتکس</a>
  - <a href='/changelog/'>سابقه تغییرات API</a>
  - <a href='/terms/'>شرایط استفاده از API</a>
  - <a href='https://nobitex.ir/'>سایت نوبیتکس</a>
---

# موارد قدیمی API
برخی از APIها به دلیل تغییرات ساختاری یا کارکردی، قدیمی و deprecated محسوب می‌شوند و نباید دیگر از آن‌ها استفاده شود. این موارد صرفاً جهت ثبت در ادامه خواهند آمد، ولی ممکن است در حال حاضر یا هر یک از نسخه‌های آتی نوبیتکس این APIها غیرفعال شوند یا دیگر پاسخگو نباشند.

##  کد دعوت پیش‌فرض

```shell
curl 'https://apiv2.nobitex.ir/users/get-referral-code' \
  -H "Authorization: Token yourTOKENhereHEX0000000000"
```

```plaintext
http POST https://apiv2.nobitex.ir/users/get-referral-code \
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
