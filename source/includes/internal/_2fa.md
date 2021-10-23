# شناسایی دوعاملی
شناسایی دوعاملی جهت افزایش امنیت حساب و دارایی کاربر در زمان ورود، علاوه بر گذرواژه، یک کد شش رقمی تقاضا خواهد نمود که از [احرازگر گوگل](https://play.google.com/store/apps/details?id=com.google.android.apps.authenticator2 "Google Authenticator") دریافت می‌شود.

<aside class="notice">
فعالسازی شناسایی دو عاملی برای کاربران سطح دو نوبیتکس اجباری است.
</aside>

<aside class="notice">
احراز هویت در API های این مجموعه الزامی است.
</aside>

##فعال‌سازی شناسایی دوعاملی

>نمونه درخواست:

```shell
curl 'https://api.nobitex.ir/users/tfa/request' \
  -H 'Authorization: Token yourTOKENhereHEX0000000000'
```

```javascript
api.get('/users/tfa/request', {
  headers: {Authorization: "Token yourTOKENhereHEX0000000000"},
}).then((response) => {
  console.log(response);
});
```

```java
public interface APIService {
  @Headers({"Authorization: Token yourTOKENhereHEX0000000000"})
  @GET("/users/tfa/request")
  Call<JsonObject> request2FA();
}

APIService api = retrofit.create(APIService.class);

Call<JsonObject> call = api.request2FA();
```

```swift
// Contact us
```

```plaintext
GET /users/tfa/request HTTP/1.1
Host: api.nobitex.ir
Authorization: Token yourTOKENhereHEX0000000000
```

> در صورت فراخوانی درست، پاسخ به این صورت خواهد بود:

```json
{
  "status": "ok",
  "device": {
    "id": 1,
    "name": "App",
    "confirmed": false,
    "configUrl": "otpauth://totp/Nobitex%3Atest%40nobitex.net?secret=FXZJ28P2V3U0F4W3U7707EYIKNBJAKR6&algorithm=SHA1&digits=6&period=30&issuer=Nobitex"
  }
}
```

برای فعال‌سازی شناسایی دوعاملی از این نوع درخواست استفاده نمایید:

* آدرس: `GET /users/tfa/request`

<aside class="notice">
کاربر درخواست دهنده بایستی شماره تماس و ایمیل تایید شده در نوبیتکس داشته باشد.
</aside>

* پارامترهای پاسخ:

پارامتر | نوع | توضیحات | نمونه
------- | ---- | --------- | ---------
status | string | وضعیت پاسخ | ok
device | TOTPDevice | اطلاعات تنظیم دستگاه | {"id": 1, ...}

###شی TOTPDevice

پارامتر | نوع | توضیحات | نمونه
------- | ---- | --------- | ---------
id | integer | شناسه دستگاه | 1
name | string | نام دستگاه | "App"
confirmed | boolean | تایید شده با پیامک | false
configUrl | string | آدرس تنظیم شناسایی دوعاملی در احرازگر گوگل | <span class="long">"otpauth://totp/Nobitex%3Atest%40nobitex.net?secret=FXZJ28P2V3U0F4W3U7707EYIKNBJAKR6&algorithm=SHA1&digits=6&period=30&issuer=Nobitex"</span>


<aside class="notice">
محدودیت فراخوانی : 3 درخواست در 10 دقیقه / 10 درخواست در ساعت
</aside>

<aside class="notice">
پس از ثبت درخواست، پیامکی حاوی کد شش رقمی جهت تایید دستگاه به شماره همراه کاربر ارسال می‌شود که ظرف مدت 30 دقیقه منقضی خواهد شد.
</aside>

* حالت‌های خطا

کد خطا | توضیحات
---- | ----
UnverifiedMobile | کاربر شماره تماس یا ایمیل تایید شده ندارد.

کاربر با خروجی این API می‌تواند برنامه احرازگر گوگل را فعال نماید. این برنامه هر 30 ثانیه یک بار کد جدیدی تولید می‌کند که تا دو دقیقه قابل استفاده است.
در صورت تنظیم درست احرازگر گوگل می‌توانید برای تایید دستگاه (device) و تکمیل درخواست خود اقدام کنید.
