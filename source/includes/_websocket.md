<h1 id="websocket">وب‌سوکت (آزمایشی)</h1>


نوبیتکس برای ارائه اطلاعات لحظه‌ای به کاربران، از وب‌سوکت استفاده می‌کند. این سرویس با استفاده از سرور **Centrifugo** پیاده‌سازی شده است که برای زبان‌های مختلف، **SDK**های متنوعی ارائه می‌دهد تا بتوانید به راحتی در کلاینت‌های خود به وب‌سوکت متصل شوید.

لیست SDKهای قابل استفاده برای اتصال به وب‌سوکت نوبیتکس:


| ماژول SDK                                                             | مورد استفاده                                                  |
|-----------------------------------------------------------------------|---------------------------------------------------------------|
| [centrifuge-js](https://github.com/centrifugal/centrifuge-js)         | برای مرورگر، NodeJS و ReactNative                             |
| [centrifuge-python](https://github.com/centrifugal/centrifuge-python) | برای استفاده در پایتون و قدرت گرفته از asyncio                |
| [centrifuge-java](https://github.com/centrifugal/centrifuge-java)     | استفاده در جاوا و اپلیکیشن‌های Android                         |
| [centrifuge-go](https://github.com/centrifugal/centrifuge-go)         | برای Golang                                                   |
| [centrifuge-swift](https://github.com/centrifugal/centrifuge-swift)   | استفاده از اپلیکشن‌های iOS                                     |
| [centrifuge-dart](https://github.com/centrifugal/centrifuge-dart)     | برای Dart و Flutter و استفاده در توسعه‌ی موبایل و وب با آن‌ها   |


لیست SDKهای غیر رسمی:

* [centrifuge-csharp](https://github.com/charmy/centrifuge-csharp) - برای <span dir="ltr">C#</span> و <span dir="ltr">.NET</span> و <span dir="ltr">Unity 2022.3+</span>


<h2 id="websocket-connection">اتصال به وب‌سوکت</h2>

>نصب پکیج SDK با npm: 

```bash
npm install centrifuge
```

> اتصال به وب‌سوکت از طریق SDK:

```javascript
import { Centrifuge } from 'centrifuge';

const client = new Centrifuge('wss://wss.nobitex.ir/connection/websocket', {});
client.on('connected', (ctx) => {
    console.log('connected', ctx);
});
client.connect();
```

> در صورتی که از این SDK استفاده نمی‌کنید، برای اتصال به وب‌سوکت پیام زیر را ارسال نمایید:

```json
{
  "connect": {},
  "id": 1
}
```

> استفاده مستقیم در HTML؛ در انتهای body این اسکریپت را قرار دهید:

```html
<script src="https://unpkg.com/centrifuge@5.2.2/dist/centrifuge.js"></script>
```


برای اتصال به وب‌سوکت نوبیتکس، از آدرس زیر استفاده کنید:

* **آدرس وب‌سوکت:** `wss://wss.nobitex.ir/connection/websocket`
* **محدودیت نرخ:** حداکثر 100 اتصال همزمان برای هر IP
* **نیاز به ارسال توکن:** ندارد

پس از اتصال، سرور Centrifugo به صورت دوره‌ای پیام‌های `ping` ارسال می‌کند. اگر از SDKهای رسمی استفاده می‌کنید، این ابزارها به صورت خودکار به پیام‌های `ping` پاسخ `pong` می‌دهند. توجه داشته باشید که اگر در زمان ۲۵ ثانیه به پیام‌های `ping` پاسخ داده نشود، سرور به منظور مدیریت بهینه منابع، اتصال را قطع می‌کند. بنابراین اگر از SDK رسمی استفاده نمی‌کنید، از ارسال پیام `PONG` قبل از این زمان اطمینان حاصل کنید.

در صورتی‌که از SDK رسمی استفاده می‌کنید نیاز به اقدامی برای مدیریت این مکانیزم ندارید.

<aside class="notice">
مکانیزم پینگ‌پنگ به این شکل است که پیام خالی با محتوای <code>{}</code> به کلاینت ارسال شده و پیام پنگ نیز باید با همان محتوای <code>{}</code> باشد.
</aside>

### اتصال به چند کانال همزمان

برای اتصال به چند کانال به‌صورت همزمان نیاز به کلاینت‌های مجزا نیست؛ بلکه می‌توانید با استفاده از یک کلاینت به چند کانال همزمان متصل شوید.

* **محدودیت subscription به کانال‌ها:** حداکثر 300 کانال برای هر connection

> اتصال به چند کانال با استفاده از یک کلاینت:

```javascript
const channels = ['public:orderbook-BTCIRT', 'public:orderbook-USDTIRT', 'public:orderbook-FTMIRT']
const subs = channels.map(channel => {
  const sub = client.newSubscription(channel, { delta: 'fossil' })
  sub.subscribe()
  sub.on('publication', (ctx) => {
    console.log(channel, ctx.data);
  })
  return sub
});
```


### توجه: اتصال به وب‌سوکت با استفاده از SDK زبان‌های دیگر

برای مطالعه‌ی جزئیات و چگونگی اتصال به وب‌سوکت نوبیتکس با استفاده از SDK زبان‌های دیگر، لطفاً به مستنداتی که در ابتدای بخش قرار دادیم مراجعه فرمایید. در SDK ها و محیط‌های مختلف، تفاوت‌های جزئی وجود دارد. به‌طور مثال در **node.js**، نیاز به نصب و پاس دادن مستقیم ماژول `websocket` به کلاینت در هنگام اتصال می‌باشیم که در [مستندات آن SDK](https://github.com/centrifugal/centrifuge-js?tab=readme-ov-file#using-with-nodejs) به این موضوع اشاره شده.


<h2 id="websocket-token">دریافت توکن</h2>



```shell
curl 'https://apiv2.nobitex.ir/auth/ws/token/' \
  -H "Authorization: Token yourTOKENhereHEX0000000000"
```


> در صورت فراخوانی درست، پاسخ به این صورت خواهد بود:

```json
{
  "token": "yJhbGciOiJFUzUxMiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxNjMiLCJleHAiOjE3MzE5Mzk0NDIsImlhdCI6MTczMTkzODI0MiwibWV0YSI6e319.AFZjNC0ugUcfchUKjjunNDl1kfemJkA0Y5IYRi1c0mSvIa_XxzQIeVeqg6qnTBzE-HG6zEqXXyCENJtAz7xc7wqcABWbpcHdH0fPtjG4pwDZco9O065RcXacXo7qpCN-IuC0te0qG2_2bAhc-aR7vWgHsTm6GXfrQQh_6uwVHShSarU7",
  "status": "ok"
}
```


دریافت توکن وبسوکت با ارسال درخواست `GET` به `auth/ws/token/` صورت می‌گیرد. 

- **درخواست:** `GET /auth/ws/token`

<aside class="notice">
برای سابسکرایب کردن و دریافت اطلاعات از کانال های که با پشوند <code dir="ltr">private:</code> آغاز می شوند نیاز به ارائه توکن قبل از سابسکرایب کردن می باشد.
</aside>


<h2 id="websocket-auth">احراز هویت</h2>

```javascript
const centrifuge = new Centrifuge('wss://wss.nobitex.ir/connection/websocket', {
    token: '<CONNECTION_TOKEN>'
});
```

> برای احراز هویت به صورت خودکار می توان از قطعه کد زیر استفاده کرد.

```javascript
import { Centrifuge, UnauthorizedError } from 'centrifuge';

async function getToken() {
    if (!loggedIn) {
        return "";
    }
    const res = await fetch('https://apiv2.nobitex.ir/auth/ws/token/', {
    method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ApiToken`
      }
    });
    if (!res.ok) {
        if (res.status === 403) {
            // Return special error to not proceed with token refreshes, client will be disconnected.
            throw new UnauthorizedError();
        }
        // Any other error thrown will result into token refresh re-attempts.
        throw new Error(`Unexpected status code ${res.status}`);
    }
    const data = await res.json();
    return data.token;
}

const client = new Centrifuge(
    'wss://wss.nobitex.ir/connection/websocket',
    {
        token: '<CONNECTION_TOKEN>',
        getToken: getToken
    }
);

client.on('connected', (ctx) => {
    console.log('connected', ctx);
});
client.connect();
```

> در صورتی که از این SDK استفاده نمی‌کنید، برای اتصال به وب‌سوکت پیام زیر را ارسال نمایید:

```json
{
  "connect": {"token": "<CONNECTION_TOKEN>"},
  "id": 1
}
```

کانال‌هایی که با پیشوند <code dir="ltr">private:</code> آغاز میشوند حاوی اطلاعات اختصاصی برای هر کاربر هستند و دسترسی به آن‌ها مستلزم احراز هویت با استفاده از توکن و پارامتر `{websocket_auth_token}` است.

**انواع کانال ها:**

| نوع کانال | الگو                                         | توضیحات                                                                                                                                                          | نمونه                                           |
|-----------|----------------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------|-------------------------------------------------|
| **عمومی** | `public:channelName`                         | کانال‌های عمومی حاوی اطلاعاتی هستند که برای همه کاربران قابل دسترسی‌اند و نیازی به احراز هویت ندارند.                                                            | `public:orderbook-BTCIRT`                         |
| **خصوصی** | `private:channelName#{websocketAuthParam}` | کانال‌های خصوصی شامل اطلاعات مرتبط با کاربر خاص هستند و دسترسی به آن‌ها نیازمند احراز هویت با استفاده از پارامتر <code>{websocketAuthParam}</code> و توکن است. | `private:trades#1987577cdf7c7422dee369e188e276ee` |



پارامتر <code>{websocketAuthParam}</code> را میبایست از بخش [پروفایل](#user-profile) دریافت کنید.

**مثال:** کاربر با `websocketAuthParam=1987577cdf7c7422dee369e188e276ee`برای دریافت آخرین معاملاتش میبایست به کانال `private:trades#1987577cdf7c7422dee369e188e276ee` سابسکرایب کند.
 


<aside class="notice">
پارامتر <code dir="ltr">{websocketAuthParam}</code> یک مقدار ثابت و منحصر به فرد برای هر کاربر است که در طول زمان تغییر نمی‌کند. بنابراین، نیازی به به‌روزرسانی و رفرش کردن ندارد.
</aside>


<h2 id="websocket-orderbook">استریم لیست سفارش‌ها: اردربوک</h2>


کانال‌هایی با پیشوند زیر شامل اطلاعات **اردربوک** هستند و با هر تغییری در اردربوک، به مشترکین پیام ارسال می‌کنند:

**الگوی کانال‌های اردربوک:** <code dir="ltr">public:orderbook-*</code>



<aside class="notice">
به‌جای <code>*</code> باید سمبل بازار مربوطه را به‌شکل UPPERCASE (حروف بزرگ) قرار دهید. مثلاً <code>BTCIRT</code> و یا <code>ETHUSDT</code> و ...
</aside>


```javascript
const sub = client.newSubscription('public:orderbook-BTCIRT', { delta: 'fossil' });
sub.on('subscribed', (ctx) => {
    console.log('subscribed');
});
sub.on('publication', (ctx) => {
    console.log(ctx.data);
});
sub.subscribe();
```

> در صورتی که از SDK استفاده نمی‌کنید پیام زیر را ارسال نمایید:

```json
{
  "id": 2,
  "subscribe": {
    "channel": "public:orderbook-BTCIRT"
  }
}
```

> که در کنسول، پیامی که `console.log` نموده‌اید به شکل زیر خواهد بود که همان مقدار `data` می‌باشد:

```json
{
  "asks": [
    ["35077909990", "0.009433"],
    ["35078000000", "0.000274"],
    ["35078009660", "0.00057"]
  ],
  "bids": [
    ["35020080080", "0.185784"], 
    ["35020070060", "0.086916"],
    ["35020030010", "0.000071"]
  ],
  "lastTradePrice": "35077909990",
  "lastUpdate": 1726581829816
}
```

> همچنین اگر از SDK رسمی استفاده نمی‌کنید، در صورت اتصال و اشتراک صحیح، پیام‌های دریافتی از کانال به شکل زیر خواهد بود:

```json
{
  "push": {
    "channel": "public:orderbook-BTCIRT",
    "pub": {
      "data": "{\"asks\": [[\"35077909990\", \"0.009433\"], [\"35078000000\", \"0.000274\"], [\"35078009660\", \"0.00057\"]], \"bids\": [[\"35020080080\", \"0.185784\"], [\"35020070060\", \"0.086916\"], [\"35020030010\", \"0.000071\"]], \"lastTradePrice\": \"35077909990\", \"lastUpdate\": 1726581829816}",
      "offset": 989153
    }
  }
}
```


**مثال:** برای دریافت تغییرات اردربوک بیت‌کوین به ریال، کافیست به کانال `public:orderbook-BTCIRT` متصل شوید.







**نکته مهم:** این کانال‌ها تنها در صورت وقوع تغییر در اردربوک پیام ارسال می‌کنند. بنابراین، در بازارهایی با حجم معاملات کم، ممکن است مدت زمان زیادی بین پیام‌ها فاصله باشد. به‌منظور رفع این مشکل توصیه می‌شود قبل از اشتراک در کانال‌های وب‌سوکت، یک بار اطلاعات اولیه اردربوک را از طریق [API اردربوک ورژن ۳](#orderbook-v3) دریافت کنید.


**توجه:** استفاده از فلگ <code dir="ltr">{ delta: 'fossil' }</code> در تابع `newSubscription` اختیاری است. با استفاده از این فلگ، اطلاعات اردربوک به صورت diff به کلاینت ارسال می‌شود. اگر از کلاینت‌های رسمی Centrifugo استفاده می‌کنید، متوجه تغییری نخواهید شد و صرفاً استفاده از پهنای باند شبکه‌ی شما کاهش چشم‌گیری در حدود ۶۰٪ خواهد کرد. اما در صورتی که از کلاینت رسمی استفاده نمی‌کنید، یا باید از استفاده از این فلگ خودداری کنید و یا باید حتماً الگوریتم بازیابی داده‌ها از حالت فشرده شده به حالت اصلی را پیاده‌سازی کنید. برای این کار از [الگوریتم فسیل](https://fossil-scm.org/) استفاده کرده‌ایم.

### پارامترهای پاسخ

 پیام‌های وب‌سوکت شامل دو آرایه `asks` و `bids` بوده که در هر یک قیمت و مقدار سفارش‌های بازار وجود دارد. سفارش‌های **خرید** در **`bids`** و سفارش‌های **فروش** در **`asks`** بازگردانده می‌شوند. هر یک از این آرایه‌ها شامل دوتایی‌های «قیمت، مقدار» هستند.


| پارامتر پاسخ       | نوع    | توضیحات                                               | نمونه                                                     |
|--------------------|--------|-------------------------------------------------------|-----------------------------------------------------------|
| `asks`             | array  | حاوی دوتایی‌های «قیمت، مقدار» از سفارش‌های **فروش**     | <code dir="ltr">[["1231", "0.1"],["1243", "1.02"]]</code> |
| `bids`             | array  | حاوی دوتایی‌های «قیمت، مقدار» از سفارش‌های **خرید**     | <code dir="ltr">[["1243", "1"],["1231", "2"]]</code>      |
| `lastTradePrice`   | string | مبلغ آخرین معامله                                     | <code dir="ltr">"35602702700"</code>                      |
| `lastUpdate`       | int    | زمان آخرین به‌روزرسانی به فرمت یونیکس                  | <code dir="ltr">1726651067347</code>                      |



<h2 id="websocket-candle">استریم آمار OHLC بازار نوبیتکس</h2>

برای توضیحات بیشتر در مورد  OHLC به [این لینک](https://en.wikipedia.org/wiki/Open-high-low-close_chart) مراجعه کنید.<br><br>

کانال‌هایی با الگوی زیر شامل اطلاعات کندل بازار مورد نظر است.


**الگوی کانال‌های کندل ohlc:** <code dir="ltr">public:candle-{marketSymbol}-{resolution}</code>


<aside class="notice">
اطلاعات کندل ها به صورت دوره‌ای (حدودا هر ۱۰ ثانیه) پابلیش میشوند.
</aside>

<aside class="notice">
به‌جای <code>{marketSymbol}</code> باید سمبل بازار مربوطه را به‌شکل UPPERCASE (حروف بزرگ) قرار دهید. مثلاً <code>BTCIRT</code> و یا <code>ETHUSDT</code> و ...
</aside>

<aside class="notice">
به‌جای <code>{resolution}</code> باید رزولوشن مورد نظر را از جدول ذیل قرار دهید. مثلاً <code>5</code> و یا <code>2D</code> و ...
</aside>



* پارامتر {resolution} بازه زمانی  کندل‌های خروجی می‌باشد و مقدار آن می‌تواند یکی از مقادیر زیر باشد:

| دقیقه‌ای | توضیح     | ساعتی | توضیح       | روزانه | توضیح  |
|----------|-----------|-------|-------------|--------|--------|
| `1`      | یک دقیقه  | `60`  | یک ساعت     | `D`    | یک روز |
| `5`      | پنج دقیقه | `180` | سه ساعت     | `2D`   | دو روز |
| `15`     | یک ربع    | `240` | چهار ساعت   | `3D`   | سه روز |
| `30`     | نیم ساعت  | `360` | شش ساعت     |        |        |
|          |           | `720` | دوازده ساعت |        |        |

```javascript
const sub = client.newSubscription('public:candle-BTCIRT-15', { delta: 'fossil' });
sub.on('subscribed', (ctx) => {
    console.log('subscribed');
});
sub.on('publication', (ctx) => {
    console.log(ctx.data);
});
sub.subscribe();
```

> در صورتی که از SDK استفاده نمی‌کنید پیام زیر را ارسال نمایید:

```json
{
  "id": 2,
  "subscribe": {
    "channel": "public:candle-BTCIRT-15"
  }
}
```

> که در کنسول، پیامی که `console.log` نموده‌اید به شکل زیر خواهد بود که همان مقدار `data` می‌باشد:

```json
{
  "t": 1731852900,
  "o": 6240000001.0,
  "h": 6250000000.0,
  "l": 6238000000.0,
  "c": 6238031033.0,
  "v": 1.26
}
```

> همچنین اگر از SDK رسمی استفاده نمی‌کنید، در صورت اتصال و اشتراک صحیح، پیام‌های دریافتی از کانال به شکل زیر خواهد بود:

```json
{
  "push": {
    "channel": "public:candle-BTCUSDT-15",
    "pub": {
      "data": "{\"t\":1731852900,\"o\":6240000001.0,\"h\":6250000000.0,\"l\":6238000000.0,\"c\":6238031033.0,\"v\":1.26}",
      "offset": 34575
    }
  }
}
```


**مثال:** برای دریافت کندل های 15 دقیقه ای بازار بیت‌کوین تومان، کافیست به کانال `public:candle-BTCIRT-15` متصل شوید.



**توجه:** استفاده از فلگ <code dir="ltr">{ delta: 'fossil' }</code> در تابع `newSubscription` اختیاری است. با استفاده از این فلگ، اطلاعات اردربوک به صورت diff به کلاینت ارسال می‌شود. اگر از کلاینت‌های رسمی Centrifugo استفاده می‌کنید، متوجه تغییری نخواهید شد و صرفاً استفاده از پهنای باند شبکه‌ی شما کاهش چشم‌گیری در حدود ۶۰٪ خواهد کرد. اما در صورتی که از کلاینت رسمی استفاده نمی‌کنید، یا باید از استفاده از این فلگ خودداری کنید و یا باید حتماً الگوریتم بازیابی داده‌ها از حالت فشرده شده به حالت اصلی را پیاده‌سازی کنید. برای این کار از [الگوریتم فسیل](https://fossil-scm.org/) استفاده کرده‌ایم.

### پارامترهای پاسخ

ساختار پیام‌های وبسوکت این کانال به این صورت می باشد.

| پارامتر پاسخ | نوع   | توضیحات      | نمونه                               |
|--------------|-------|--------------|-------------------------------------|
| `t`          | int   | شروع زمان    | <code dir="ltr">1731852900</code>   |
| `o`          | float | قیمت شروع    | <code dir="ltr">6240000001.0</code> |
| `h`          | float | بیشترین قیمت | <code dir="ltr">6250000000.0</code> |
| `l`          | float | کمترین قیمت  | <code dir="ltr">6238000000.0</code> |
| `c`          | float | قیمت پایانی  | <code dir="ltr">6238031033.0</code> |
| `v`          | float | حجم معاملات  | <code dir="ltr">1.26</code>         |


<h2 id="private-trades">معاملات کاربر</h2>


الگوی کانال معاملات کاربر به این صورت می باشد.

**الگوی کانال معاملات کاربر:** <code dir="ltr">private:trades#{websocketAuthParam}</code>

به محض انجام شدن هر معامله‌ای برای کاربر، اطلاعات معامله در این کانال برای کاربر پابلیش می شود.


**توجه:پارامتر
<code>{websocketAuthParam}</code>
را می توانید از بخش [پروفایل](#user-profile) دریافت کنید.**



<aside class="notice">
پارامتر <code>{websocketAuthParam}</code> مقداری ثابت است و در طول زمان تغییر نمی کند، نیازی بروز رسانی و رفرش کردن آن نیست.
</aside>

<aside class="notice">
سابسکرایب کردن به این کانال نیاز به احراز هویت از طریق token دارد.
</aside>



```javascript
const sub = client.newSubscription('private:trades#1987577cdf7c7422dee369e188e276ee',  { delta: 'fossil' });
sub.on('subscribed', (ctx) => {
    console.log('subscribed');
});
sub.on('publication', (ctx) => {
    console.log(ctx.data);
});
sub.subscribe();
```

> در صورتی که از SDK استفاده نمی‌کنید پیام زیر را ارسال نمایید:

```json
{
  "id": 2,
  "subscribe": {
    "channel": "private:trades#1987577cdf7c7422dee369e188e276ee"
  }
}
```

> که در کنسول، پیامی که `console.log` نموده‌اید به شکل زیر خواهد بود که همان مقدار `data` می‌باشد:

```json
{
    "srcCurrency": "btc",
    "dstCurrency": "rls",
    "timestamp": "2024-11-23T11:31:27.833332+00:00",
    "price": "66683959340",
    "amount": "0.000404",
    "total": "26940319.57336",
    "type": "sell",
    "fee": "47150.7989334",
    "id": 12942226,
    "orderId": 520305923
}
```

> همچنین اگر از SDK رسمی استفاده نمی‌کنید، در صورت اتصال و اشتراک صحیح، پیام‌های دریافتی از کانال به شکل زیر خواهد بود:

```json
{
  "push": {
    "channel": "private:trades#1987577cdf7c7422dee369e188e276ee",
    "pub": {
      "data": "{\"srcCurrency\":\"btc\",\"dstCurrency\":\"rls\", \"timestamp\":\"2024-11-23T11:31:27.833332+00:00\", \"price\":\"66683959340\",\"amount\":\"0.000404\",\"total\":\"26940319.57336\",\"type\":\"sell\",\"fee\":\"47150.7989334\",\"id\":12942226,\"orderId\":520305923}",
      "offset": 34575
    }
  }
}
```

### پارامتر پیام

| فیلد        | نوع      | توضیحات            | نمونه                              |
|-------------|----------|--------------------|------------------------------------|
| id          | int      | شناسه‌ی معامله     | 12942226                           |
| orderId     | int      | شناسه‌ی سفارش      | 520305923                          |
| srcCurrency | string   | رمزارز مبدا معامله | `btc` یا `eth` یا `xrp` یا ...     |
| dstCurrency | string   | ارز مقصد معامله    | `rls` یا `usdt`                    |
| timestamp   | string   | زمان انجام معامله  | `2024-11-23T11:31:27.833332+00:00` |
| type        | string   | نوع خرید یا فروش   | `buy` یا `sell`                    |
| price       | monetary | قیمت انجام معامله  | `66683959340`                      |
| amount      | monetary | مقدار معامله شده   | `0.000404`                         |
| total       | monetary | قیمت کل معامله     | `26940319.57336`                   |
| fee         | monetary | کارمزد معامله      | `47150.7989334`                    |
