#اعلان‌های کاربر
این اعلانات برای اطلاع‌رسانی به کاربر از سوی نوبیتکس ارسال می‌شود و در بخش اعلانات سایت و اپلیکیشن به نمایش در می‌آید.

<aside class="notice">
احراز هویت در API های این مجموعه الزامی است.
</aside>

##لیست اعلانات

>نمونه درخواست: 

```shell
curl 'https://api.nobitex.ir/notifications/list' \
  -H 'Authorization: Token yourTOKENhereHEX0000000000'
```

```javascript
api.get('/notifications/list', {
  headers: {Authorization: 'Token yourTOKENhereHEX0000000000'},
}).then((response) => {
  console.log(response);
});
```

```java
public interface APIService {
  @Headers({"Authorization: Token yourTOKENhereHEX0000000000"})
  @GET("/notifications/list")
  Call<JsonObject> listNotifications();
}

APIService api = retrofit.create(APIService.class);

Call<JsonObject> call = api.listNotifications();
```

```swift
// Contact us
```

```plaintext
GET /notifications/list HTTP/1.1
Host: api.nobitex.ir
Authorization: Token yourTOKENhereHEX0000000000
```

> در صورت فراخوانی درست، پاسخ به این صورت خواهد بود:

```json
{
  "status": "ok",
  "notifications": [
    {
      "id": 1,
      "message": "به نوبیتکس خوش آمدید!",
      "createdAt": "2021-10-04T13:19:46.103353+00:00",
      "read": false
    }
  ]
}
```

برای دریافت اعلانات کاربر از این نوع درخواست استفاده نمایید:

* آدرس: `GET /notifications/list`

* پارامترهای پاسخ:

پارامتر | نوع | توضیحات | نمونه
------- | ---- | --------- | ---------
status | string | وضعیت پاسخ | ok
notifications | list of Notification | لیستی از اعلان‌ها | []

شی Notification

پارامتر | نوع | توضیحات | نمونه
------- | ---- | --------- | ---------
id | integer | شناسه اعلان | 1
message | string | متن پیام | "به نوبیتکس خوش آمدید!"
createdAt | iso-string | زمان ایجاد | "2021-10-04T13:19:46.103353+00:00"
read | boolean | خوانده شده | false
