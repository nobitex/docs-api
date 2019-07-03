---
title: مستندات API درگاه پرداخت نوبیتکس

# see: https://github.com/lord/slate/wiki/Custom-Slate-Themes
# see: https://developer.tradegecko.com/

language_tabs: # must be one of https://git.io/vQNgJ
  - shell
  - python
  - javascript
  - php
  - ruby
  - csharp
  - plaintext


toc_footers:
  - <a href='https://nobitex.market/'>سایت نوبیتکس</a>

---

# مستندات API درگاه پرداخت نوبیتکس

این بخش به منظور فهم بیش‌تر API‌های ارائه شده در درگاه نوبیتکس فراهم شده‌است.

در صورت ناقص یا مبهم بودن توضیحات APIها یا هرگونه پیشنهاد دیگر در این خصوص، می‌توانید در [مخزن گیت‌هاب مستندات نوبیتکس API](https://github.com/nobitex/docs-api)
مورد (issue) جدیدی را ایجاد نمایید یا مستقیما روی [این لینک](https://github.com/nobitex/docs-api/issues/new) کلیک کنید و مشکل مد نظرتان را با ما در میان بگذارید.

<aside class="warning">
مستندات API در حال توسعه می باشد و ممکن است فرمت درخواست‌ها و پاسخ‌ها دچار تغییر شوند .لطفا در موارد حساس ملاحظات لازم را در نظر بگیرید. 
</aside>

# احراز هویت
برای استفاده از API‌های درگاه شما نیاز به دو متغیر
`api-key`
 و
  `api-secret`
   دارید. پارامتر `api-key` در قسمت data درخواست با متد POST ارسال می‌شود. `api-secret` در هیچ درخواستی ارسال نمی‌شود و برای احراز اصالت جواب مورد استفاده قرار می‌گیرد.
<aside class="warning">
این دو پارامتر نشان‌گر هویت شما در درگاه پرداخت هستند. به هیچ‌عنوان این دو متغییر را برای کسی نفرستید حتی اگر خودش را از طرف نوبیتکس معرفی کرد.
</aside>

# شبکه اصلی و تست‌نت
به‌منظور فراهم کردن بستر تست برای توسعه‌دهندگان، شبکه تست‌نت درگاه نوبیتکس در کنار شبکه‌ی اصلی طراحی شده‌است که به شبکه‌های تست‌نت رمزارزها متصل است.
###آدرس‌ها در شبکه تست‌نت
<code>API_URL = https://testnetapi.nobitex.net</code>

<code>SITE_URL = https://testnet.nobitex.net</code>
###آدرس‌ها در شبکه اصلی
<code>API_URL = https://api.nobitex.ir</code>

<code>SITE_URL = https://nobitex.market</code>
# مراحل اتصال به درگاه
برای اتصال وب‌سایت خود به درگاه رمزارز نوبیتکس، شما بایستی چهار مرحله‌ی زیر را انجام دهید.
## ۱- ارسال درخواست ساخت صورت‌حساب

برای ایجاد صورت‌حساب و توکن پرداخت برای کاربر خود به این صورت پارامتر‌های مربوطه را با متد `POST` ارسال فرمایید:

```shell
curl 'https://api.nobitex.ir/pg/send/' \
  -X POST \
  -H "content-type: application/json" \
  --data '{"api":"DemoApiKey","amount":1000000,"redirect":"https://www.nobitex.market/app/callback-gateway/", "currencies": "btc,ltc"}'
```

```python
import requests

url = "https://api.nobitex.ir/pg/send/"

payload = "{\"api\":\"DemoApiKey\",\"amount\":1000000,\"redirect\":\"https://www.nobitex.market/app/callback-gateway/\", \"currencies\": \"btc,ltc\"}"
headers = {
    'content-type': "application/json",
    'cache-control': "no-cache",
    }

response = requests.request("POST", url, data=payload, headers=headers)

print(response.text)
```

```javascript
var settings = {
  "async": true,
  "crossDomain": true,
  "url": "https://api.nobitex.ir/pg/send/",
  "method": "POST",
  "headers": {
    "content-type": "application/json",
    "cache-control": "no-cache",
  },
  "data": "{\"api\":\"DemoApiKey\",\"amount\":1000000,\"redirect\":\"https://www.nobitex.market/app/callback-gateway/\", \"currencies\": \"btc,ltc\"}"
}

$.ajax(settings).done(function (response) {
  console.log(response);
});
```

```csharp
var client = new RestClient("https://api.nobitex.ir/pg/send/");
var request = new RestRequest(Method.POST);
request.AddHeader("cache-control", "no-cache");
request.AddHeader("content-type", "application/json");
request.AddParameter("application/json", "{\"api\":\"DemoApiKey\",\"amount\":1000000,\"redirect\":\"https://www.nobitex.market/app/callback-gateway/\", \"currencies\": \"btc,ltc\"}", ParameterType.RequestBody);
IRestResponse response = client.Execute(request);
```
```php
<?php

$request = new HttpRequest();
$request->setUrl('https://api.nobitex.ir/pg/send/');
$request->setMethod(HTTP_METH_POST);

$request->setHeaders(array(
  'cache-control' => 'no-cache',
  'content-type' => 'application/json'
));

$request->setBody('{"api":"DemoApiKey","amount":1000000,"redirect":"https://www.nobitex.market/app/callback-gateway/", "currencies": "btc,ltc"}');

try {
  $response = $request->send();

  echo $response->getBody();
} catch (HttpException $ex) {
  echo $ex;
}
```

```ruby
require 'uri'
require 'net/http'

url = URI("https://api.nobitex.ir/pg/send/")

http = Net::HTTP.new(url.host, url.port)

request = Net::HTTP::Post.new(url)
request["content-type"] = 'application/json'
request["cache-control"] = 'no-cache'
request.body = "{\"api\":\"DemoApiKey\",\"amount\":1000000,\"redirect\":\"https://www.nobitex.market/app/callback-gateway/\", \"currencies\": \"btc,ltc\"}"

response = http.request(request)
puts response.read_body
```

```plaintext
POST /pg/send/ HTTP/1.1
Host: api.nobitex.ir
Content-Type: application/json
cache-control: no-cache
{"api":"DemoApiKey","amount":1000000,"redirect":"https://www.nobitex.market/app/callback-gateway/", "currencies": "btc,ltc"}
```

> در صورت فراخوانی درست، پاسخ به این صورت خواهد بود:

```json
{
    "status": 1,
    "token": "e9282e56c83f93eb077043e5ad8b6cf5b3ff7568"
}
```
> در صورت رخ‌داد هر گونه خطا، پاسخ به این صورت فرستاده می‌شود:

```json
{
    "status": 0,
    "errorCode": ERROR_CODE,
    "errorMessage": ERROR_MESSAGE
}
```
> برای اطلاعات بیش‌تر به بخش خطاها مراجعه کنید.

### آدرس

`POST API_URL/pg/send`

### پارامتر‌ها
پارامتر | نوع | پیش‌فرض | توضیحات | نمونه
------- | ---- | --------- | --------- | -----
api | string | الزامی | API key | `DemoApiKey`
amount | integer | الزامی | مقدار ریالی صورت‌حساب حداقل ۱۰۰۰۰ ریال | `1000000`
callbackURL | string | الزامی | لینک برگشت بعد از پرداخت(حتما schema url  آورده شود)  باید با آدرس تایید شده بر روی یک دامنه باشد. | `https://Your_Callback_URL`
factorNumber | string | اختیاری | شماره فاکتور برای نشان‌دادن به مشتری | `Nobitex1234`
mobile | string | اختیاری | شماره‌ی همراه مشتری | `09123456789`
description | string | توضیحات(حداکثر ۲۵۵ کاراکتر) | اختیاری | `Test Payment with Nobitex`
currencies | string | `btc,ltc` | لیست رمز‌ارزهای مورد قبول برای پرداخت. آپشن‌های مورد قبول: `btc` و `ltc`. برای انتخاب چند روش پرداخت انتخاب‌ها را با ویرگول جدا نمایید.| `btc`

<aside class="notice">
توکن‌های دریافت شده از این روش، بعد از اتمام زمان اعتبار (چهار ساعت یا سی روز) منقضی می‌شوند. در صورت نیاز به توکن‌های با تاریخ انقضای
طولانی‌تر و آگاهی از ملاحظات امنیتی لازم، با پشتیبانی نوبیتکس تماس بگیرید.
</aside>

## ۲- انتقال به درگاه
در صورت موفقیت‌آمیز بودن مرحله‌ی قبل، به شما یک `{{ token }}` داده می‌شود و شما بایستی کاربر را به درگاه ریدایرکت کنید.
 برای این کار توکن دریافت شده `{{ token }}` را همانند زیر در انتهای URL قرار داده و کاربر را به این آدرس ریدایرکت فرمایید.

### آدرس
`GET SITE_URL/app/paygate/{{ token }}`

## ۳- بازگشت از درگاه
 کاربر در زمان بازگشت از درگاه، به پارامتر callbackURL
 در مرحله‌ی اول به‌صورت زیر ریدارکت می‌شود. اگر مقدار status برابر با 1 بود، تراکنش موفقیت‌آمیز بوده است.

### آدرس
`GET https://Your-Callback_URL?status={transaction_status}&token={token}`

<aside class="warning">
ارسال این درخواست به هیچ عنوان آخرین مرحله احراز نیست و ممکن است که هر کسی این درخواست را برای شما ارسال کند. بنابراین حتما مرحله‌ی ۴ را انجام دهید.
</aside>
<aside class="notice">
به‌طور معمول این درخواست توسط کاربر ارسال خواهد شد. اما ممکن است به خاطر بسته شدن صفحه‌ی درگاه این درخواست برای شما ارسال نشود. در صورت عدم تایید توکن مورد نظر بعد از ۱۵ دقیقه، در صورت پرداخت موفق از طرف نوبیتکس این درخواست به صورت خودکار ارسال خواهد شد.
</aside>


## ۴- تایید پرداخت
در صورت بازگشت کاربر با status
مساوی `۱‍` بایستی احراز اصالت این پرداخت صورت بگیرد. برای تایید پرداخت کاربر، شما بایستی درخواست خود را با آدرس و پارامتر‌های زیر ارسال فرمایید:



```shell
curl 'https://api.nobitex.ir/pg/verify/' \
  -X POST \
  -H "content-type: application/json" \
  --data '{"api":"DemoApiKey","token":"e9282e56c83f93eb077043e5ad8b6cf5b3ff7568"}'
```

```python
import requests

url = "https://api.nobitex.ir/pg/verify/"

payload = "{\"api\":\"DemoApiKey\",\"token\":\"e9282e56c83f93eb077043e5ad8b6cf5b3ff7568\"}"
headers = {
    'content-type': "application/json",
    'cache-control': "no-cache",
    }

response = requests.request("POST", url, data=payload, headers=headers)

print(response.text)
```

```javascript
var settings = {
  "async": true,
  "crossDomain": true,
  "url": "https://api.nobitex.ir/pg/verify/",
  "method": "POST",
  "headers": {
    "content-type": "application/json",
    "cache-control": "no-cache",
  },
  "data": "{\"api\":\"DemoApiKey\",\"token\":\"e9282e56c83f93eb077043e5ad8b6cf5b3ff7568\"}"
}

$.ajax(settings).done(function (response) {
  console.log(response);
});
```

```csharp
var client = new RestClient("https://api.nobitex.ir/pg/verify/");
var request = new RestRequest(Method.POST);
request.AddHeader("cache-control", "no-cache");
request.AddHeader("content-type", "application/json");
request.AddParameter("application/json", "{\"api\":\"DemoApiKey\",\"token\":\"e9282e56c83f93eb077043e5ad8b6cf5b3ff7568\"}", ParameterType.RequestBody);
IRestResponse response = client.Execute(request);
```
```php
<?php

$request = new HttpRequest();
$request->setUrl('https://api.nobitex.ir/pg/verify/');
$request->setMethod(HTTP_METH_POST);

$request->setHeaders(array(
  'cache-control' => 'no-cache',
  'content-type' => 'application/json'
));

$request->setBody('{"api":"DemoApiKey","token":"e9282e56c83f93eb077043e5ad8b6cf5b3ff7568"}');

try {
  $response = $request->send();

  echo $response->getBody();
} catch (HttpException $ex) {
  echo $ex;
}
```

```ruby
require 'uri'
require 'net/http'

url = URI("https://api.nobitex.ir/pg/verify/")

http = Net::HTTP.new(url.host, url.port)

request = Net::HTTP::Post.new(url)
request["content-type"] = 'application/json'
request["cache-control"] = 'no-cache'
request.body = "{\"api\":\"DemoApiKey\",\"token\":\"e9282e56c83f93eb077043e5ad8b6cf5b3ff7568\"}"

response = http.request(request)
puts response.read_body
```

```plaintext
POST /pg/verify/ HTTP/1.1
Host: api.nobitex.ir
content-type: application/json
cache-control: no-cache
{"api":"DemoApiKey","token":"e9282e56c83f93eb077043e5ad8b6cf5b3ff7568"
```

> در صورت فراخوانی درست، پاسخ به این صورت خواهد بود:

```json
{
    {
        'status': 1 [integer],
        'amount': Amount in rial [integer],
        'cryptoAmount': Exchanged amount in crypto [float],
        'txHash': Hash of (token, amount, api-secret) [string],
        'factorNumber': Factor number (optional) [string],
        'mobile': Mobile number (optional) [string],
        'description': Description (optional) [string],
    }
}
```
> در صورت رخ‌داد هر گونه خطا، پاسخ به این صورت فرستاده می‌شود:

```json
{
    "status": 0,
    "errorCode": ERROR_CODE,
    "errorMessage": ERROR_MESSAGE
}
```

> برای اطلاعات بیش‌تر به بخش خطاها مراجعه کنید.

### آدرس
`POST API_URL/pg/verify/`

### پارامترها

پارامتر     | نوع    | پیش‌فرض   |  توضیحات   | نمونه
----------- | ----   | ------   | ---------  | -----
api | string |   الزامی | API key | `DemoApiKey`
token | string |   الزامی | Token   | `e9282e56c83f93eb077043e5ad8b6cf5b3ff7568`


<aside class="notice">
 مقدار
  <code>txHash</code>
 برابر است با
 <code>
 md5(token + str(amount) + api-secret)
 </code>.
</aside>
<aside class="warning">
 درخواست ارسالی بایستی از طرف نوبیتکس باشد و برای احراز اصالت و جلوگیری از حمله‌ی مرد میانی (MITM)، شما بایستی مقدار md5 پارامتر‌
  <code>token</code>
  به همراه
  <code>amount</code>(از جواب بازگشتی)
 و هم‌چنین
 <code>api-secret</code>
داده‌شده در هنگام عضویت
 را به همان ترتیب نشان داده شده در بالا محاسبه کنید و با پارامتر
 <code>txHash</code>
 مقایسه کنید. در صورت عدم تطابق، این درخواست نبایستی مورد قبول واقع و محصول به کاربر تحویل داده شود.

</aside>
<aside class="notice">
 مقدار txHash را ذخیره نموده و در صورت تکرار آن در تایید‌های آتی آن را قبول نکنید.
</aside>


# توضیح پیام‌های خطا
کد خطا | متن خطا | توضیحات
--------- | ---------- | -------
<code>1-</code> | API parameter is required | پارامتر api ارسال نشده است
<code>2-</code> | API not found  | کاربری با مشخصات شما یافت نشده است.
<code>3-</code> | API is restricted  | شما در سیستم محدود شده‌اید.
<code>4-</code> | API is invalid  | پارامتر API با فرمت نادرستی ارسال شده‌است.
<code>5-</code> | Amount parameter is required | پارامتر amount ارسال نشده است
<code>6-</code> | Amount must be integer | پارامتر amount باید int باشد
<code>7-</code> | Amount min value is 10000 rls  | پارامتر amount باید از ۱۰۰۰۰ بیش‌تر باشد
<code>8-</code> | callbackURL parameter is required  | پارامتر callbackURL ارسال نشده است
<code>9-</code> | callbackURL CORPS error  | پارامتر callbackURL با دامنه ثبت شده برای شما مطابقت ندارد.
<code>10-</code> | callbackURL format is invalid. Please use this format: https://domain.com/path/to/redirect  | پارامتر callbackURL با فرمت درستی ارسال نشده‌است
<code>11-</code> | Description must be less than 255 character  | پارامتر description بایستی کم‌تر از ۲۵۵ کاراکتر باشد
<code>21-</code> | Invalid token | توکن فرستاده شده، اشتباه است
<code>22-</code> | Token not found | توکن فرستاده شده یافت نمی‌شود
<code>23-</code> | Token is required | پارامتر token نیاز است.
<code>31-</code> | Unverified | پرداخت معتبر نیست
<code>32-</code> | Verified before | پرداخت قبلا تایید شده‌است
<code>41-</code> | Invalid currency | رمزارز فرستاده‌شده معتبر نیست





