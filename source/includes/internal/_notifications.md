# اعلان‌های کاربر
این اعلانات برای اطلاع‌رسانی به کاربر از سوی نوبیتکس ارسال می‌شود و در بخش اعلانات سایت و اپلیکیشن به نمایش در می‌آید.

احراز هویت در API های این مجموعه الزامی است.

## گرفتن لیست اعلانات

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

```plaintext
GET /notifications/list HTTP/1.1
Host: api.nobitex.ir
Authorization: Token yourTOKENhereHEX0000000000
```

> در صورت فراخوانی درست، پاسخ شامل حداکثر ۱۰ اعلان اخیر کاربر به ترتیب معکوس زمانی و به این صورت خواهد بود:

```json
{
  "status": "ok",
  "notifications": [
    {
      "id": 345,
      "message": "پیغام۳",
      "createdAt": "2021-10-05T13:39:46.103353+00:00",
      "read": false
    },
    {
      "id": 234,
      "message": "پیغام۲",
      "createdAt": "2021-10-04T15:29:46.103353+00:00",
      "read": false
    },
    {
      "id": 123,
      "message": "به نوبیتکس خوش آمدید!",
      "createdAt": "2021-10-04T13:19:46.103353+00:00",
      "read": true
    }
  ]
}
```

برای دریافت اعلانات کاربر از این نوع درخواست استفاده نمایید:

* **درخواست:** `GET /notifications/list`

### پارامترهای پاسخ

پارامتر       | نوع                  | توضیحات           | نمونه
------------- |----------------------|-------------------| ---------
status        | string               | وضعیت پاسخ        | ok
notifications | list of Notification | لیستی از اعلان‌ها | []

شی Notification:

پارامتر | نوع | توضیحات | نمونه
------- | ---- | --------- | ---------
id | integer | شناسه اعلان | 1
message | string | متن پیام | "به نوبیتکس خوش آمدید!"
createdAt | iso-string | زمان ایجاد | "2021-10-04T13:19:46.103353+00:00"
read | boolean | خوانده شده | false



## تغییر وضعیت اعلان یا اعلان‌ها به خوانده‌شده

>نمونه درخواست:

```shell
curl --location 'https://api.nobitex.ir/notifications/read' \
--header 'Authorization: Token yourTOKENhereHEX0000000000' \
--data '{"id":"234,345"}'
```

```javascript
api.get('notifications/read', {id: '234,345'}, {
  headers: {Authorization: 'Token yourTOKENhereHEX0000000000'},
}).then((response) => {
  console.log(response);
});
```

```java
public interface APIService {
  @Headers({"Authorization: Token yourTOKENhereHEX0000000000"})
  @FormUrlEncoded
  @POST("/notifications/read")
  Call<JsonObject> readNotifications(@Field("id") String notificationIds);
}

APIService api = retrofit.create(APIService.class);

Call<JsonObject> call = api.readNotifications("234,345");
```

```plaintext
POST /notifications/read HTTP/1.1
Host: api.nobitex.ir
Authorization: Token yourTOKENhereHEX0000000000
Content-Type: application/json
{"id": "234,345"}
```

> در صورت فراخوانی درست، پاسخ به این صورت خواهد بود:

```json
{
  "status": "ok",
  "processed": 2
}
```

برای تغییر وضعیت اعلانات کاربر از نخوانده به خوانده‌شده، از این نوع درخواست استفاده نمایید:

* **درخواست:** `POST /notifications/read`
- **محدودیت فراخوانی:** ۱۰ درخواست در دقیقه یا ۶۰ بار در ساعت

### پارامترهای ورودی

پارامتر | نوع     | پیش‌فرض  | توضیحات                                                                                                                                                      | نمونه
------- |---------|---------|--------------------------------------------------------------------------------------------------------------------------------------------------------------| ---------
id      | string  | اختیاری | رشته‌ای از شناسه‌های اعلان‌های درخواستی برای تغییر وضعیت به خوانده‌شده که با کاما از هم جدا شده‌اند. در صورت فرستادن رشته‌ی خالی، هیچ اعلانی خوانده نمی‌شود. | "234,345"


### پارامترهای پاسخ

پارامتر       | نوع    | توضیحات                 | نمونه
------------- |--------|-------------------------| ---------
status        | string | وضعیت پاسخ              | ok
processed     | int    | تعداد اعلان‌های خوانده‌شده | 2
