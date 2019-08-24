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
درگاه پرداخت نوبیتکس یک درگاه پرداخت رمز ارزی است. به اینصورت که کاربران شما می‌توانند توسط ارزهای رمز پایه مثل بیتکوین،  ریپل،لایت کوین و ... پول خود را پرداخت کنند.
برای کار با این درگاه و اتصال آن به وبسایت و یا اپلیکیشن خود، می‌توانید از این داکیومنت استفاده کنید. داکیومنت پیش رو، تمامی مراحل اتصال، پرداخت و تایید را قدم به قدم به شما توضیح خواهد داد.

در صورت ناقص یا مبهم بودن توضیحات APIها یا هرگونه پیشنهاد دیگر در این خصوص، می‌توانید در [مخزن گیت‌هاب مستندات نوبیتکس API](https://github.com/nobitex/docs-api)
مورد (issue) جدیدی را ایجاد نمایید یا مستقیما روی [این لینک](https://github.com/nobitex/docs-api/issues/new) کلیک کنید و مشکل مد نظرتان را با ما در میان بگذارید.

# احراز هویت
برای استفاده از API‌های درگاه شما نیاز به دو متغیر
`api`
 و
  `api-secret`
   دارید.این دو مقدار داخل پنل نوبیتکس شما قرار داشته و بعد از تایید درخواست شما برای دریافت درگاه پرداخت در اختیار شما قرار خواهد گرفت. در واقع با این دو مقدار نوبیتکس متوجه میشود که درخواست از سمت شما بوده است یا نه. این دو مقدار، بسیار حساس بوده و باید در حفظ و نگه داری آن ها بکوشید.
    زمان ارسال درخواست، مقدار `api` باید در body درخواست موجود باشد. 
      `api-secret` در هیچ درخواستی ارسال نمی‌شود و برای احراز اصالت جواب مورد استفاده قرار می‌گیرد. در واقع برای اینکه شما متوجه شوید که جواب نهایی از سمت نوبیتکس بوده یا نه. این مورد در [بخش دیگر]( #7cb4a935a2) به صورت کامل توضیح داده خواهد شد.
<aside class="warning">
این دو پارامتر نشان‌گر هویت شما در درگاه پرداخت هستند. به هیچ‌عنوان این دو متغییر را برای کسی نفرستید حتی اگر خودش را از طرف نوبیتکس معرفی کرد. نوبیتکس هیچ زمان از شما این مقادیر را نمی‌خواهد.
</aside>
# مراحل اتصال به درگاه
برای اتصال وب‌سایت خود به درگاه رمزارز نوبیتکس، شما بایستی چهار مرحله‌ی زیر را انجام دهید.
## ۱- ارسال درخواست ساخت صورت‌حساب

برای ایجاد صورت‌حساب و توکن پرداخت برای کاربر خود به این صورت پارامتر‌های مربوطه را با متد `POST` ارسال فرمایید:

```shell
curl 'https://api.nobitex.ir/pg/send/' \
  -X POST \
  -H "content-type: application/json" \
  --data '{"api":"DemoApiKey","amount":1000000,"callbackURL":"https://www.nobitex.market/app/callback-gateway/", "currencies": "btc,ltc"}'
```

```python
import requests

url = "https://api.nobitex.ir/pg/send/"

payload = "{\"api\":\"DemoApiKey\",\"amount\":1000000,\"callbackURL\":\"https://www.nobitex.market/app/callback-gateway/\", \"currencies\": \"btc,ltc\"}"
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
  "data": "{\"api\":\"DemoApiKey\",\"amount\":1000000,\"callbackURL\":\"https://www.nobitex.market/app/callback-gateway/\", \"currencies\": \"btc,ltc\"}"
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
request.AddParameter("application/json", "{\"api\":\"DemoApiKey\",\"amount\":1000000,\"callbackURL\":\"https://www.nobitex.market/app/callback-gateway/\", \"currencies\": \"btc,ltc\"}", ParameterType.RequestBody);
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

$request->setBody('{"api":"DemoApiKey","amount":1000000,"callbackURL":"https://www.nobitex.market/app/callback-gateway/", "currencies": "btc,ltc"}');

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
request.body = "{\"api\":\"DemoApiKey\",\"amount\":1000000,\"callbackURL\":\"https://www.nobitex.market/app/callback-gateway/\", \"currencies\": \"btc,ltc\"}"

response = http.request(request)
puts response.read_body
```

```plaintext
POST /pg/send/ HTTP/1.1
Host: api.nobitex.ir
Content-Type: application/json
cache-control: no-cache
{"api":"DemoApiKey","amount":1000000,"callbackURL":"https://www.nobitex.market/app/callback-gateway/", "currencies": "btc,ltc"}
```

> در صورت فراخوانی درست، پاسخ به این صورت خواهد بود:

```json
{
    "status": "success",
    "token": "e9282e56c83f93eb077043e5ad8b6cf5b3ff7568"
}
```
> در صورت رخ‌داد هر گونه خطا، پاسخ به این صورت فرستاده می‌شود:

```json
{
    "status": "failed",
    "code": ERROR_CODE,
    "message": ERROR_MESSAGE
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
`GET https://nobitex.market/app/paygate/{{ token }}`

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
        'status': "success" [string],
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
    "status": "failed",
    "code": ERROR_CODE,
    "message": ERROR_MESSAGE
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
مقدار token نمی‌تواند تکراری باشد. مقدار token را ذخیره نموده و در صورت تکرار آن در تایید‌های آتی آن را قبول نکنید.
</aside>


# تایید صحت پاسخ نوبیتکس

 پس از تایید پرداخت در مرحله 4 بخش قبل، جواب درخواست باید از سمت نوبیتکس باشد. حملاتی تحت عنوان "مرد میانی" یا به اختصار "MIMT" وجود دارد که ممکن است جواب در خواست از سمت دیگری غیر از نوبیتکس برای شما ارسال شود.
 برای جلوگیری از این حملات، و تشخیص تمامی درخواست‌های غیر معتبر دیگر، شما باید مقدار txHash موجود در پاسخ سرور را به این صورت مقایسه کنید:
 <br> 
 <br> 
 مقدار txHash برابر است با (md5(token + str(amount) + api-secret)
 <br>
 <br>
 توجه شود که ترتیب قرارگیری مقادیر مهم می‌باشد.
 <aside class="warning">
 تایید صحت پاسخ، اجباری نمی‌باشد. استفاده از ssl و همچنین گام verify در مرحله قبل، تا بخش زیادی این حملات را خنثی می‌کند. این گام یک مرحله پیشنهادی برای جلوگیری 100 درصدی از حملات مرد میانی است. 
 </aside>
 
<aside class="warning">
 در صورت عدم تطابق، این پاسخ از سمت نوبیتکس نبوده و نباید مورد قبول واقع شود.
</aside>
<aside class="notice">
مقدار txHash نمی‌تواند تکراری باشد. مقدار txHash را ذخیره نموده و در صورت تکرار آن در تایید‌های آتی آن را قبول نکنید.
</aside>


# شبکه اصلی و تست‌نت
به‌منظور فراهم کردن بستر تست برای توسعه‌دهندگان، شبکه تست‌نت درگاه نوبیتکس در کنار شبکه‌ی اصلی طراحی شده‌است که به شبکه‌های تست‌نت رمزارزها متصل است.
اگر می‌خواهید بدون نیاز به انتقال رمزارز یا پول واقعی کد درگاه پرداخت را تست کنید، از شبکه تست‌نت درگاه پرداخت نوبیتکس استفاده کنید.
در واقع شما با استفاده از شبکه تست نت نوبیتکس میتوانید(مثلا اگر درگاه شما بیتکوین میپذیرد) از شبکه تست نت بیتکوین، پرداخت کنید. شبکه تست نت بیتکوین کوین هایی را در اختیار شما قرار میدهد که ارزش پولی نداشته و برای تست به وجود آمده اند.
بدیهی است که درگاه تست نوبیتکس با شبکه های واقعی کار نکرده و فقط با شبکه های تست نت کوین مورد نظر کار خواهد کرد.
###آدرس‌ها در شبکه تست‌نت

<code>API_URL = https://testnetapi.nobitex.net</code>

<code>SITE_URL = https://testnet.nobitex.net</code>
###آدرس‌ها در شبکه اصلی
<code>API_URL = https://api.nobitex.ir</code>

<code>SITE_URL = https://nobitex.market</code>

<aside class="warning">
شما برای استفاده از شبکه تست نت، به جای استفاده از<code>API_URL = https://api.nobitex.ir</code> باید از<code>API_URL = https://testnetapi.nobitex.net</code> و بجای استفاده از <code>SITE_URL = https://nobitex.market</code> باید از <code>SITE_URL = https://nobitex.market</code> استفاده کنید.   
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



#پلاگین‌ها
در این بخش می‌توانید لیست پلاگین‌های نوشته شده درگاه نوبیتکس را مشاهده و مستندات آن را مطالعه بفرمایید.
##وردپرس
###ووکامرس
مستندات درگاه نوبیتکس برای فروشگاه ساز ووکامرس و همچنین لینک دانلود پلاگین از طریق لینک زیر قابل دسترسی می‌باشد.
<a href="https://apidocs.nobitex.market/gateway/wordpress">مستندات ووکامرس</a>

###مبدل قیمت
مبدل قیمت نوبیتکس، یک پلاگین مختص فروشگاه ساز ووکامرس بوده که می‌توانید با استفاده از آن قیمت تمام محصولات خود را به ارزهای دیجیتال تبدیل کنید. 
<a href="https://apidocs.nobitex.market/gateway/price-convertor">مستندات پلاگین مبدل قیمت</a>
