<h1 id="other">سایر</h1>

<h2 id="options">تنظیمات سیستم</h2>

```shell
curl -X POST 'https://api.nobitex.ir/v2/options'
```

```plaintext
http POST https://api.nobitex.ir/v2/options
```

> ساختار کلی پاسخ به صورت زیر خواهد بود. کلیدهای موجود در هر بخش در مستندات توضیح داده شده‌اند.

```json
{
    "status": "ok",
    "coins": [
      {
        "coin": "CoinX",
        ...other CoinOptions...,
        "networkList": {
          "networkX": {...NetworkOptions...},
          ...
        }
      }
    ],
    "nobitex": {
      "allCurrencies": ["btc", "eth", ...],
      ...other NobitexOptions...,
    }
}
```

عملکرد سیستم نوبیتکس بر اساس پارامترهای مختلف تنظیم می‌شود که با استفاده از API «تنظیمات سیستم» می‌توانید مقادیر این پارامترها را دریافت نمایید. مواردی مانند رمزارزهای فعال، حداقل معامله در هر بازار، پله‌های کارمزد، سقف برداشت و بسیاری اطلاعات مفید دیگر از این طریق در دسترس شما قرار خواهد داشت. پاسخ در دو کلید `nobitex` شامل تنظیمات کلی سیستمی، و کلید `coins` شامل تنظیمات مخصوص هر رمزارز بازگردانده می‌شود. همچنین هر رمزارز دارای چندین «شبکه» است که برخی تنظیمات ممکن است فقط در سطح شبکه تعریف شوند یا در سطح رمزارز به صورت عمومی وجود داشته باشند ولی در بعضی شبکه‌های آن رمزارز متفاوت بوده و بازتعریف شوند.

- **درخواست:** `POST /v2/options`
- **محدودیت فراخوانی:** 1 درخواست در دقیقه با امکان burst
- **نیاز به ارسال توکن:** ندارد
- **پارامتر ورودی:** ندارد

### پارامترهای پاسخ - NobitexOptions

کلید | نوع | توضیحات | نمونه
---- | ---- | ---- | ----
allCurrencies | list of str | نماد تمام رمزارزهای موجود در بازارها و صرافی | `['btc', 'eth']`
activeCurrencies | list of str | نماد رمزارزهای اصلی و سطح یک | `['btc', 'eth']`

### پارامترهای پاسخ - CoinOptions

فیلد | نوع | توضیحات | پیش‌فرض | نمونه
---- | ---- | ---- | ---- | ----
coin | str | نماد یکتای رمزارز، معمولاً با حروف کوچک | ضروری | `rls` یا `btc` یا `eth` یا …
name | str | نام انگلیسی رمزارز | ضروری | `Bitcoin` یا `TRON` یا `Dogecoin` یا …
default_network | str | شبکه پیش‌فرض رمزارز، یکی از کلیدهای NetworkOptions آن رمزارز | ضروری | `FIAT_MONEY` یا `BTC` یا `BSC` یا …
network_list | dict | یک دیکشنری از شبکه‌های مختلف این رمزارز، با کلیدهای نام انگلیسی هر شبکه و مقادیر از نوع NetworkOptions | ضروری |

### پارامترهای پاسخ - NetworkOptions

فیلد | نوع | توضیحات | پیش‌فرض | نمونه
---- | ---- | ---- | ---- | ----
network | str | نماد یکتای شبکه، معمولاً با حروف بزرگ | ضروری | `FIAT_MONEY` یا `BTC` یا `BSC` یا …
name | str | نام انگلیسی خوانای شبکه | ضروری | `BTC` یا `ERC20` یا …
isDefault | boolean | آیا این شبکه پیش‌فرض برای این رمزارز در نوبیتکس است؟ | `false` | `true` یا `false`
beta | boolean | آیا این شبکه هنوز در حالت آزمایشی است؟ | `false` | `true` یا `false`
addressRegex | str | الگوی آدرس‌ها در این شبکه | ضروری | `^0x[0-9A-Fa-f]{40}$`
memoRequired | boolean | آیا تراکنش روی این شبکه نیازمند ممو است؟ | `false` | `true` یا `false`
memoRegex | str | در صورت وجود، ممو باید چه الگویی داشته باشد؟ | `''` | `^[0-9A-Za-z]{1,28}$`
depositEnable | boolean | آیا واریز رمزارز روی این شبکه فعال است؟ | `true` | `true` یا `false`
minConfirm | int | حداقل تعداد کانفیرم شبکه برای تایید اولیه واریز | `1` | `12`
unlockConfirm | int | حداقل تعداد کانفیرم شبکه برای تایید نهایی واریز | `minConfirm` | `12`
deposit_info | dict | فهرست پارامترهای واریز به تفکیک نوع آدرس واریز | `{}` | `{"standard": {"depositMin": "0.01"}}`
deposit_info.type.depositFee | monetary | کارمزد واریز این رمزارز روی شبکه و نوع آدرس | `0` | `0.1`
deposit_info.type.depositMin | monetary | حداقل مقدار واریز این رمزارز روی شبکه و نوع آدرس | `0` | `10`
deposit_info.type.depositMax | monetary | حداکثر مقدار واریز این رمزارز روی شبکه و نوع آدرس | `~20bIRT` | `1000`
withdrawEnable | boolean | آیا برداشت رمزارز روی این شبکه فعال است؟ | `true` | `true` یا `false`
withdrawIntegerMultiple | monetary | حداقل مقدار تغییر مقدار قابل برداشت | `'1e-8'` | `0.000001`
withdrawFee | monetary | کارمزد برداشت | `0` | `0.1`
withdrawMin | monetary | حداقل مقدار قابل برداشت | `withdrawFee` | `0.1`
withdrawMax | monetary | حداکثر مقدار قابل برداشت | `~20bIRT` | `1000`
