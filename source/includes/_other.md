<h1 id="other">سایر</h1>

<h2 id="options">تنظیمات سیستم</h2>

```shell
curl 'https://api.nobitex.ir/v2/options'
```

```plaintext
http GET https://api.nobitex.ir/v2/options
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

> برای نمونه یک پاسخ کامل شامل دو رمزارز فعال به صورت زیر خواهد بود:

```json
{
  "status": "ok",
  "coins": [
    {
      "coin": "btc",
      "defaultNetwork": "BTC",
      "name": "Bitcoin",
      "networkList": {
        "BTC": {
          "addressRegex": "^[13][a-km-zA-HJ-NP-Z1-9]{25,34}$|^(bc1)[0-9A-Za-z]{39,59}$",
          "depositInfo": {
            "segwit": {
              "depositMin": "0.00040000"
            },
            "standard": {
              "depositMin": "0.00040000"
            }
          },
          "isDefault": true,
          "minConfirm": 2,
          "name": "BTC",
          "network": "BTC",
          "withdrawFee": "0.0003500000",
          "withdrawIntegerMultiple": "0.00000001",
          "withdrawMin": "0.00100000"
        },
        "BTCLN": {
          "addressRegex": "",
          "depositEnable": false,
          "depositInfo": {
            "standard": {
              "depositMax": "0.00100000",
              "depositMin": "0.00000100"
            }
          },
          "minConfirm": 1,
          "name": "Lightning",
          "network": "BTCLN",
          "withdrawFee": "0.00000010",
          "withdrawIntegerMultiple": "0.00000001",
          "withdrawMax": "0.20000000",
          "withdrawMin": "0.00000100"
        }
      }
    },
    {
      "coin": "eth",
      "defaultNetwork": "ETH",
      "name": "Ethereum",
      "networkList": {
        "BSC": {
          "addressRegex": "^(0x)[0-9A-Fa-f]{40}$",
          "minConfirm": 15,
          "name": "BEP20 (BSC)",
          "network": "BSC",
          "withdrawFee": "0.00050000",
          "withdrawIntegerMultiple": "0.00000001",
          "withdrawMin": "0.00200000"
        },
        "ETH": {
          "addressRegex": "^0x[0-9A-Fa-f]{40}$",
          "depositInfo": {
            "standard": {
              "depositMin": "0.00100000"
            }
          },
          "isDefault": true,
          "minConfirm": 12,
          "name": "ERC20",
          "network": "ETH",
          "withdrawEnable": false,
          "withdrawFee": "0.00300000",
          "withdrawIntegerMultiple": "0.00000001",
          "withdrawMin": "0.0100000"
        }
      }
    },
  ],
  "nobitex": {
    "allCurrencies": ["btc", "eth"],
    "activeCurrencies": ["btc", "eth"]
  }
}
```

عملکرد سیستم نوبیتکس بر اساس پارامترهای مختلف تنظیم می‌شود که با استفاده از API «تنظیمات سیستم» می‌توانید مقادیر این پارامترها را دریافت نمایید. مواردی مانند رمزارزهای فعال، حداقل معامله در هر بازار، پله‌های کارمزد، سقف برداشت و بسیاری اطلاعات مفید دیگر از این طریق در دسترس شما قرار خواهد داشت. پاسخ در دو کلید `nobitex` شامل تنظیمات کلی سیستمی، و کلید `coins` شامل تنظیمات مخصوص هر رمزارز بازگردانده می‌شود. همچنین هر رمزارز دارای چندین «شبکه» است که برخی تنظیمات ممکن است فقط در سطح شبکه تعریف شوند یا در سطح رمزارز به صورت عمومی وجود داشته باشند ولی در بعضی شبکه‌های آن رمزارز متفاوت بوده و بازتعریف شوند.

- **درخواست:** `GET /v2/options`
- **محدودیت فراخوانی:** 1 درخواست در دقیقه با امکان burst
- **نیاز به ارسال توکن:** ندارد
- **پارامتر ورودی:** ندارد

### پارامترهای پاسخ - NobitexOptions

کلید | نوع | توضیحات | نمونه
---- | ---- | ---- | ----
allCurrencies | list of str | نماد تمام رمزارزهای موجود در بازارها و صرافی | `['btc', 'eth']`
activeCurrencies | list of str | نماد رمزارزهای اصلی و سطح یک | `['btc', 'eth']`
amountPrecisions | dict | دقت اعشار مقدار در بازارهای مختلف | `{"BTCIRT": "0.000001",…}`
pricePrecisions | dict | دقت اعشار قیمت در بازارهای مختلف | `{"BTCUSDT": "0.01",…}`

### پارامترهای پاسخ - CoinOptions

فیلد | نوع | توضیحات | پیش‌فرض | نمونه
---- | ---- | ---- | ---- | ----
coin | str | نماد یکتای رمزارز، معمولاً با حروف کوچک | ضروری | `rls` یا `btc` یا `eth` یا …
name | str | نام انگلیسی رمزارز | ضروری | `Bitcoin` یا `TRON` یا `Dogecoin` یا …
default_network | str | شبکه پیش‌فرض رمزارز، یکی از کلیدهای NetworkOptions آن رمزارز | ضروری | `FIAT_MONEY` یا `BTC` یا `BSC` یا …
network_list | dict | یک دیکشنری از شبکه‌های مختلف این رمزارز، با کلیدهای نام انگلیسی هر شبکه و مقادیر از نوع NetworkOptions | ضروری |
displayPrecision | str | دقت اعشار پیش‌فرض نمایش مقادیر این رمزارز | `0.00000001` | `0.0001` یا `0.1` یا `1`

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
depositInfo | dict | فهرست پارامترهای واریز به تفکیک نوع آدرس واریز | `{}` | `{"standard": {"depositMin": "0.01"}}`
depositInfo.type.depositFee | monetary | کارمزد واریز این رمزارز روی شبکه و نوع آدرس | `0` | `0.1`
depositInfo.type.depositMin | monetary | حداقل مقدار واریز این رمزارز روی شبکه و نوع آدرس | `0` | `10`
depositInfo.type.depositMax | monetary | حداکثر مقدار واریز این رمزارز روی شبکه و نوع آدرس | `~20bIRT` | `1000`
withdrawEnable | boolean | آیا برداشت رمزارز روی این شبکه فعال است؟ | `true` | `true` یا `false`
withdrawIntegerMultiple | monetary | حداقل مقدار تغییر مقدار قابل برداشت | `'1e-8'` | `0.000001`
withdrawFee | monetary | کارمزد برداشت | `0` | `0.1`
withdrawMin | monetary | حداقل مقدار قابل برداشت | `withdrawFee` | `0.1`
withdrawMax | monetary | حداکثر مقدار قابل برداشت | `~20bIRT` | `1000`
