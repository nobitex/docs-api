---
title: مستندات API داخلی نوبیتکس
lang: fa
language_tabs:
  - shell
  - javascript
  - java
  - swift
  - plaintext
includes:
  - internal/notifications
toc_footers:
  - <a href='https://nobitex.ir/'>سایت نوبیتکس</a>
---

# مستندات API داخلی نوبیتکس

> جهت استفاده از نمونه کدهای مستند ابتدا تنظیمات زیر را استفاده نمایید.

```shell
sudo apt install curl
```

```javascript
const axios = require("axios");

const api = axios.create({baseURL: "https://api.nobitex.ir"});
```

```java
import com.google.gson.JsonObject;
import retrofit2.Call;
import retrofit2.http.GET;
import retrofit2.http.POST;
import retrofit2.converter.gson.GsonConverterFactory;

Retrofit retrofit = new Retrofit.Builder()
  .baseUrl('https://api.nobitex.ir')
  .addConverterFactory(GsonConverterFactory.create())
  .build();
```

```swift
// Contact us
```

مستندات این بخش، سایر APIهای نوبیتکس را که عموما با بازار نوبیتکس ارتباطی نداشته و بیشتر ناظر به نیازهای ارتباطی و عملکردی سایت و اپلیکیشن نوبیتکس می‌باشد، توضیح می‌دهد.

توجه داشته باشید بعضی از APIها نیاز به احراز هویت و دریافت توکن دارد که میتوانید از [مستندات احراز هویت](/index.html#login) نحوه عملکرد آن را مطالعه کنید.
