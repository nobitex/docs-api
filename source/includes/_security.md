# امنیت

##  سابقه ورود

```shell
curl 'https://api.nobitex.ir/users/login-attempts' \
  -H "Authorization: Token yourTOKENhereHEX0000000000"
```

```plaintext
http POST https://api.nobitex.ir/users/login-attempts \
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
curl 'https://api.nobitex.ir/security/emergency-cancel/activate' \
  -X GET \
  -H "Authorization: Token e9282e56c83f93eb077043e5ad8b6cf5b3ff7568"
```

```plaintext
http GET https://api.nobitex.ir/security/emergency-cancel/activate \
  Authorization: Token 4928f7a7d00b3sc1efaa8dda2fc7a9tf905cc69
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
