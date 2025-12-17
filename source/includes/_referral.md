# طرح معرفی دوستان

نوبیتکس طرحی به نام معرفی دوستان در نظر گرفته است که از طریق آن هم به گسترش نوبیتکس کمک می‌کنید و هم از مزایای آن بهره‌مند می‌شوید. براساس این طرح شما می‌توانید دوستان خود را با لینک اختصاصی خود به نوبیتکس دعوت کنید و درصدی از کارمزد معاملات آن‌ها را به عنوان پاداش دریافت نمایید. برای اطلاعات بیشتر به [صفحه قوانین طرح معرفی دوستان](https://nobitex.ir/policies/referral/) مراجعه کنید.

معرفی دوستان با استفاده از ایجاد «کد دعوت» انجام می‌شود. هر کاربر نوبیتکس می‌تواند برای خود یک یا چند کد دعوت بسازد. کدهای دعوت معمولاً شامل شش رقم هستند ولی می‌توانند طول متفاوتی داشته باشند یا حتی رشته‌های دلخواه باشند. در زمان ساخت هر کد دعوت می‌توان سهم کاربر معرف و کاربر دعوت شده از کارمزد اهدایی را مشخص نمود.

با استفاده از «فهرست کدهای دعوت» می‌توانید فهرستی از کدهای دعوت فعلی خود را دریافت نمایید. به همراه این فهرست، میزان سود شما و برخی دیگر از آمار مربوط به کاربران ثبت‌نامی با آن کد دعوت ارسال می‌شود. اگر هنوز کد دعوتی ندارید، برای شروع استفاده از طرح معرفی دوستان می‌توانید با استفاده از «ایجاد کد دعوت»، یک کد دعوت بسازید.

<aside class="notice">
برای ساخت پیوند از روی کد دعوت، آن را در این آدرس قرار دهید:
<br><code>https://nobitex.ir/signup/?refcode=CODE</code>
</aside>


## فهرست کدهای دعوت

```shell
curl -X GET 'https://apiv2.nobitex.ir/users/referral/links-list' \
  --Navbar 'Authorization: Token yourTOKENhereHEX0000000000'
```

```plaintext
http --follow --timeout 3600 GET https://apiv2.nobitex.ir/users/referral/links-list \
 Authorization:'Token yourTOKENhereHEX0000000000'
```

* **درخواست:** `POST /users/referral/links-list`
* **<a href="/#ratelimit">محدودیت فراخوانی:</a>** ۵۰ درخواست در هر ۱۰ دقیقه

### پارامترهای پاسخ
پارامتر | نوع | توضیحات | نمونه
---- | ---- | ---- | ----
links | list of ReferralLink | فهرست کدهای دعوت این کاربر | `[{...ReferralLink...}, ...]`

### شی ReferralLink
فیلد | نوع | توضیحات | نمونه
---- | ---- | ---- | ----
id | int | شناسه یکتای لینک | `1001`
referralCode | string | کد دعوت | `40404`
createdAt | datetime | تاریخ ایجاد کد | `2020-07-15T11:32:38.326809+00:00`
userShare | int | سهم کاربر معرف از کارمزد معاملات کاربر دعوت شده | `20`
friendShare | int | سهم کاربر دعوت شده از کارمزد معاملات خود | `10`
description | string | توضیحات اختیاری کاربر برای این کد | `Shared on Instagram page X`
statsRegisters | int | آمار: کاربران ثبت‌نام کرده با این کد | `20`
statsTrades | int | آمار: مجموع تعداد معاملات کاربران ثبت‌نام کرده با این کد | `240`
statsProfit | monetary: IRR | آمار: مجموع ریالی درآمد کاربر از این کد دعوت | `3200000`


## ایجاد کد دعوت

```shell
curl -X GET 'https://apiv2.nobitex.ir/users/get-referral-code' \
--Navbar 'Authorization: Token yourTOKENhereHEX0000000000'
```

```plaintext
http --follow --timeout 3600 GET https://apiv2.nobitex.ir/users/get-referral-code \
 Authorization:'Token yourTOKENhereHEX0000000000'
```
برای ایجاد یک کد دعوت جدید برای کاربر، از «ایجاد کد دعوت» استفاده نمایید.

* **درخواست:** `POST /users/referral/links-add`
* **<a href="/#ratelimit">محدودیت فراخوانی:</a>** ۵ درخواست در هر دقیقه

### پارامترهای ورودی
پارامتر | نوع | پیش‌فرض | توضیحات | نمونه
------- | ---- | --------- | --------- | -----
friendShare | int | `0` | سهم کارمزد اهدایی به دوست دعوت شده با این کد | `10`

### حالت‌های خطا
کد خطا | توضیحات
---- | ----
InvalidGivebackShare | سهم کارمزد دوست قابل قبول نیست. پارامتر friendShare را بررسی کنید.
TooManyReferralLinks |  سهمیه ۳۰ تایی کدهای دعوت قابل ساخت برای هر کاربر به پایان رسیده است.
ReferralCodeUnavailable | امکان ایجاد کد دعوت در حال حاضر وجود ندارد.
ReferralCodeExists | خطایی در ثبت کد دعوت رخ داده است.


## وضعیت دعوت کاربر


```shell
curl -X GET 'https://apiv2.nobitex.ir/users/referral/referral-status' \
--Navbar 'Authorization: Token yourTOKENhereHEX0000000000'
```

```plaintext
http --follow --timeout 3600 GET https://apiv2.nobitex.ir/users/referral/referral-status \
 Authorization:'Token yourTOKENhereHEX0000000000'
```

برای اطلاع از این که کاربر فعلی توسط کاربر دیگری به نوبیتکس دعوت شده است یا خیر، از «وضعیت دعوت کاربر» استفاده نمایید.

* **درخواست:** `POST /users/referral/referral-status`
* **<a href="/#ratelimit">محدودیت فراخوانی:</a>** ۵۰ درخواست در هر ۱۰ دقیقه

### پارامترهای پاسخ
پارامتر | نوع | توضیحات | نمونه
---- | ---- | ---- | ----
hasReferrer | boolean | آیا کاربر توسط کاربر دیگری دعوت شده است؟ | `true`


## ثبت معرف کاربر

```shell
curl -X GET 'https://apiv2.nobitex.ir/users/referral/set-referrer' \
  --Navbar 'Authorization: Token yourTOKENhereHEX0000000000'
```

```plaintext
http --follow --timeout 3600 GET https://apiv2.nobitex.ir/users/referral/set-referrer \
 Authorization:'Token yourTOKENhereHEX0000000000'
```

کد دعوت باید در زمان ثبت‌نام توسط کاربر وارد شده یا با استفاده از پیوند دعوت به صورت خودکار پر شود. با این حال تا ۲۴ ساعت
پس از ثبت‌نام نیز امکان ثبت معرف توسط کاربر با استفاده از این API وجود دارد. منظور از کاربر معرف، کاربری است که کاربر فعلی
را دعوت نموده است.

* **درخواست:** `POST /users/referral/set-referrer`
* **<a href="/#ratelimit">محدودیت فراخوانی:</a>** ۵۰ درخواست در هر ۱۰ دقیقه

### پارامترهای ورودی
پارامتر | نوع | پیش‌فرض | توضیحات | نمونه
------- | ---- | --------- | --------- | -----
referrerCode | string | الزامی | کد دعوت کاربر دعوت کننده | `40404`

### حالت‌های خطا
کد خطا | توضیحات
---- | ----
ReferrerChangeUnavailable | بیش از ۲۴ ساعت از ثبت‌نام کاربر گذشته است و تعریف معرف دیگر ممکن نیست.
