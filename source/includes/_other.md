<h1 id="other">سایر</h1>

<h2 id="options">تنظیمات سیستم</h2>

```shell
curl 'https://apiv2.nobitex.ir/v2/options'
```

```plaintext
http GET https://apiv2.nobitex.ir/v2/options
```

> ساختار کلی پاسخ به صورت زیر خواهد بود. کلیدهای موجود در هر بخش در مستندات توضیح داده شده‌اند.

```json
{
    "status": "ok",
    "features": {
        "fcmEnabled": true,
        "chat": "livechat",
        "walletsToNet": false,
        "autoKYC": true,
        "enabledFeatures": [
            "PriceAlert",
            "StopLoss",
            "GiftCard",
            "OCO"
        ],
        "betaFeatures": []
    },
    "coins": [
        {
            "coin": "rls",
            "name": "Rial",
            "defaultNetwork": "FIAT_MONEY",
            "displayPrecision": "10",
            "networkList": {
                "FIATMONEY": {
                    "addressRegex": "",
                    "coin": "rls",
                    "depositEnable": true,
                    "isDefault": true,
                    "minConfirm": 0,
                    "name": "FIAT",
                    "network": "FIAT_MONEY",
                    "withdrawEnable": true,
                    "withdrawFee": "4_000_0.00000000",
                    "withdrawIntegerMultiple": "0.10000000",
                    "withdrawMax": "500_000_000_0.00000000",
                    "withdrawMin": "15_000_0.00000000"
                }
            },
            "stdName": "﷼"
        },
        ... Other Coins Options
    ],
    "nobitex": {
        "allCurrencies": [
            "rls",
            "btc",
            ... Other currencies
        ],
        "activeCurrencies": [
            "rls",
            "btc",
            "eth",
            "ltc",
            ... Other active currencies
        ],
        "xchangeCurrencies": [],
        "topCurrencies": [
            "btc",
            "eth",
            "usdt",
            "doge",
            "shib",
            "trx",
            "ada",
            "ltc",
            "xrp"
        ],
        "testingCurrencies": [
            "hbar"
        ],
        "withdrawLimits": {
            "normal": {
                "dailyCoin": "0",
                "dailyRial": "0",
                "dailySummation": "0",
                "monthlySummation": "0"
            },
            "level0": {
                "dailyCoin": "0",
                "dailyRial": "0",
                "dailySummation": "0",
                "monthlySummation": "0"
            },
            "44": {
                "dailyCoin": "1000000000",
                "dailyRial": "200000000",
                "dailySummation": "1000000000",
                "monthlySummation": "15000000000"
            },
            ... Other withdraw options
        },
        "minOrders": {
            "rls": "3000000",
            "usdt": "11",
            "2": "3000000",
            "13": "11"
        },
        "amountPrecisions": {
            "BTCIRT": "0.000001",
            "BTCUSDT": "0.000001",
            "ETHIRT": "0.00001",
            ... Other amount precisions
        },
        "pricePrecisions": {
            "BTCIRT": "10",
            "BTCUSDT": "0.01",
            "ETHIRT": "10",
            ... Other market precisions
        },
        "giftCard": {
            "physicalFee": "360000"
        }
    }
}
```

عملکرد سیستم نوبیتکس بر اساس پارامترهای مختلف تنظیم می‌شود که با استفاده از API «تنظیمات سیستم» می‌توانید مقادیر این پارامترها را دریافت نمایید. مواردی مانند رمزارزهای فعال، حداقل معامله در هر بازار، پله‌های کارمزد، سقف برداشت و بسیاری اطلاعات مفید دیگر از این طریق در دسترس شما قرار خواهد داشت. پاسخ در دو کلید `nobitex` شامل تنظیمات کلی سیستمی، و کلید `coins` شامل تنظیمات مخصوص هر رمزارز بازگردانده می‌شود. همچنین هر رمزارز دارای چندین «شبکه» است که برخی تنظیمات ممکن است فقط در سطح شبکه تعریف شوند یا در سطح رمزارز به صورت عمومی وجود داشته باشند ولی در بعضی شبکه‌های آن رمزارز متفاوت بوده و بازتعریف شوند.

- **درخواست:** `GET /v2/options`
- **نیاز به ارسال توکن:** ندارد
- **پارامتر ورودی:** ندارد

<aside class="info">
رمزارز بیبی‌دوج به خاطر رعایت برخی از نکات فنی در اپلیکیشن‌های قدیمی در خروجی‌های این API لیست نمیشود.
</aside>


### پارامترهای پاسخ - features

کلید | نوع         | توضیحات
---- |-------------| ----
fcmEnabled | bool        | وضعیت فعال بودن FCM 
autoKYC | bool        | وضعیت فعال بودن احراز خودکار
enabledFeatures | list of str | لیست Featureهای فعال
betaFeatures | list of str | لیست featureهای بتا 


### پارامترهای پاسخ - nobitex

کلید | نوع         | توضیحات
---- |-------------| ----
allCurrencies | list of str | نماد تمام رمزارزهای موجود در بازارها 
activeCurrencies | list of str | نماد رمزارزهای اصلی و سطح یک 
xchangeCurrencies | list of str | نماد رمزارزهای صرافی
topCurrencies | list of str | رمزارزهای برتر بازار
testingCurrencies | list of str | رمزارزهای در حال توسعه و آزمایش 
withdrawLimits | dict        | محدودیت های روزانه و ماهانه در سطوح مختلف 
minOrders | dict        | حداقل مبلغ سفارش ریالی و تتری 
amountPrecisions | dict        | دقت اعشار مقدار در بازارهای مختلف 
pricePrecisions | dict        | دقت اعشار قیمت در بازارهای مختلف 
giftCard | dict        | هزینه چاپ گیفت کارتهای فیزیکی


### پارامترهای پاسخ - Coins

فیلد | نوع | توضیحات                                                                                                |  نمونه
---- |--------------------------------------------------------------------------------------------------------| ---- | ----
coin | str | نماد یکتای رمزارز، معمولاً با حروف کوچک                                                                | `rls` یا `btc` یا `eth` یا …
name | str | نام انگلیسی رمزارز                                                                                     |  `Bitcoin` یا `TRON` یا `Dogecoin` یا …
default_network | str | شبکه پیش‌فرض رمزارز، یکی از کلیدهای NetworkOptions آن رمزارز                                           | `FIAT_MONEY` یا `BTC` یا `BSC` یا …
network_list | dict | یک دیکشنری از شبکه‌های مختلف این رمزارز، با کلیدهای نام انگلیسی هر شبکه و مقادیر از نوع NetworkOptions | 
displayPrecision | str | دقت اعشار پیش‌فرض نمایش مقادیر این رمزارز | `0.0001` یا `0.1` یا `1`
stdName | str | عنوان رمز ارز | `ریال`


### پارامترهای پاسخ - Network

فیلد | نوع | توضیحات | نمونه
---- | ---- | ---- | ----
network | str | نماد یکتای شبکه، معمولاً با حروف بزرگ | `FIAT_MONEY` یا `BTC` یا `BSC` یا …
name | str | نام انگلیسی خوانای شبکه | `BTC` یا `ERC20` یا …
isDefault | boolean | آیا این شبکه پیش‌فرض برای این رمزارز در نوبیتکس است؟ | `false`
beta | boolean | آیا این شبکه هنوز در حالت آزمایشی است؟ | `false`
addressRegex | str | الگوی آدرس‌ها در این شبکه | `^0x[0-9A-Fa-f]{40}$`
memoRequired | boolean | آیا تراکنش روی این شبکه نیازمند ممو است؟ | `false`
memoRegex | str | در صورت وجود، ممو باید چه الگویی داشته باشد؟ | `^[0-9A-Za-z]{1,28}$`
depositEnable | boolean | آیا واریز رمزارز روی این شبکه فعال است؟ | `true`
minConfirm | int | حداقل تعداد کانفیرم شبکه برای تایید اولیه واریز | `1` 
depositInfo | dict | فهرست پارامترهای واریز | `{"standard": {"depositMin": "0.01"}}`
depositInfo.standard.depositMin | monetary | حداقل مقدار واریز این رمزارز روی شبکه | `0`
depositInfo.standard.depositMax | monetary | حداکثر مقدار واریز این رمزارز روی شبکه | `1000`
withdrawEnable | boolean | آیا برداشت رمزارز روی این شبکه فعال است؟ | `false`
withdrawIntegerMultiple | monetary | حداقل مقدار تغییر مقدار قابل برداشت | `0.000001`
withdrawFee | monetary | کارمزد برداشت | `0.1`
withdrawMin | monetary | حداقل مقدار قابل برداشت | `0.1`
withdrawMax | monetary | حداکثر مقدار قابل برداشت | `1000`
