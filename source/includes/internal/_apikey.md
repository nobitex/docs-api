# کلید ای پی آی

کلید ای پی آی برای دسترسی امن تر و با مجوز مشخص به ای پی آی‌های نوبیتکس طراحی
شده است. 
کلید ای پی آی به شما اجازه می‌دهد به صورت کنترل شده و از روی آی پی مشخص،
به ای پی آی های نوبیتکس دسترسی داشته باشید و مدت زمان اعتبار کلید را مشخص کنید.


## 1. اهداف و کاربردها

### چرا API Key؟
- امنیت بیشتر (امکان تعریف سطح دسترسی محدود) با سه دسترسی READ, WITHDRAW, TRADE
- پشتیبانی از **IP Whitelist**
- قابلیت تنظیم تاریخ انقضای دلخواه
- قابلیت غیرفعال‌سازی یا حذف بدون تغییر پسورد اصلی
- مناسب برای ربات‌ها و اسکریپت‌های خودکار

### سطوح دسترسی (Permissions)
- **READ** →دریافت اطلاعات بدون تغییر در دیتابیس   
- **TRADE** → عملیات‌های مربوط به معامله و ترید، که منجر به تغییری در دیتابیس می‌شوند.  
- **WITHDRAW** → دسترسی عملیات برداشت 

توجه کنید که برای دسترسی به ای پی آی هایی مانند لیست سفارشات، دسترسی READ الزامی است.
هر کلید می‌تواند یکی یا چند دسترسی داشته باشد.

---

## 2. ایجاد API Key

### آدرس

POST /apikeys/create

### پارامترهای ورودی

| پارامتر                | نوع            | پیش‌فرض     | توضیحات                                                                 | نمونه                                       |
|------------------------|----------------|-------------|--------------------------------------------------------------------------|---------------------------------------------|
| `name`                 | string         | الزامی      | نام کلید برای شناسایی توسط کاربر                                         | `"my-api-key"`                              |
| `description`          | string         | خالی (`''`) | توضیحات دلخواه کاربر                                                     | `"API key for internal services"`           |
| `permissions`          | string (enum)  | الزامی      | مقادیر مجاز: `READ`, `TRADE`, `WITHDRAW` (به صورت رشته و جداشده با کاما) | `"READ,TRADE"`                              |
| `ipAddressesWhitelist` | list           | `[]`        | لیست آدرس‌های IP مجاز (IPv4/IPv6)                                        | `["192.168.1.10", "10.0.0.5"]`              |
| `expirationDate`       | datetime (UTC) | `None`      | تاریخ انقضای کلید (اختیاری)                                             | `"2025-12-31T23:59:59Z"`                    |


### نکات امنیتی
- ارسال **OTP (2FA)** در هدر `X-totp` الزامی است.  
- بعد از ایجاد کلید، یک **ایمیل اطلاع‌رسانی** برای کاربر ارسال می‌شود.  
- رویداد ایجاد کلید در لاگ ثبت می‌شود.  

> نمونه درخواست

```json
{
  "name": "my-api-key",
  "description": "API key for internal services",
  "permissions": "READ,TRADE",
  "ipAddressesWhitelist": [
    "192.168.1.10",
    "10.0.0.5"
  ],
  "expirationDate": "2025-12-31T23:59:59Z"
}
```

> نمونه پاسخ

```json 
{
  "key": {
    "createdAt": "2025-09-02T16:50:29.381869Z",
    "description": "API key for internal services",
    "expirationDate": "2025-12-31T23:59:59Z",
    "ipAddressesWhitelist": ["192.168.1.10", "10.0.0.5"],
    "key": "5XOCQZSPLQM4MiLzuUnZoBuqgYgTKl40W2X5j1pxfIA=",
    "name": "my-api-key",
    "permissions": "READ,TRADE",
    "updatedAt": "2025-09-02T16:50:29.381876Z"
  },
  "privateKey": "S5y19KewZzheCWCO4xqMcwwvtR8vQ-hHjE_cdjz-XxE=",
  "status": "ok"
}
```
⚠️ توجه: کلید خصوصی (privateKey) فقط یک بار در پاسخ نمایش داده می‌شود. حتماً آن را در مکان امن (Secret Manager) ذخیره کنید.

## 2. مدیریت کلیدها

### لیست کلیدها

GET /apikeys/list

خروجی: لیست کلیدهای کاربر + وضعیت و اطلاعات آنها.

### حذف کلید

POST /apikeys/delete/<public_key>

ورودی: public_key در آدرس 
خروجی:
```json
 {
  "status": "ok"
 }
```

کلید عمومی را در یو آر ال قرار دهید. 

### بروزرسانی کلید

POST /apikeys/update/<public_key>

قابل تغییر: name, description, ipAddressesWhitelist
خروجی: شیء کلید به‌روزرسانی‌شده.

> نمونه درخواست

```json
{
  "name": "my-api-key",
  "description": "API key for internal services",
  "ipAddressesWhitelist": [
    "192.168.1.10",
    "10.0.0.5"
  ]
}
```

> نمونه پاسخ

```json 
{
  "key": {
    "createdAt": "2025-09-02T16:50:29.381869Z",
    "description": "API key for internal services",
    "expirationDate": "2025-12-31T23:59:59Z",
    "ipAddressesWhitelist": ["192.168.1.10", "10.0.0.5"],
    "key": "5XOCQZSPLQM4MiLzuUnZoBuqgYgTKl40W2X5j1pxfIA=",
    "name": "my-api-key",
    "permissions": "READ,TRADE",
    "updatedAt": "2025-09-02T16:50:29.381876Z"
  },
  "status": "ok"
}
```

## دسترسی ها

سه دسترسی خواندن، معامله و برداشت تعریف شده است.

### READ 

دسترسی خواندن مخصوص تمام ای پی آی هایی است که تغییری در دیتابیس ایجاد نمی‌کنند.
با ایجاد این دسترسی روی یک کلید، دسترسی به ای پی آی های زیر، ایجاد می‌شود.:

**اطلاعات کاربر**

* `users/preferences`
* `users/profile`
* `users/verification/status`
* `notifications/list`
* `users/limitations`

**مارکت**

* `market/orders/status`
* `market/orders/list`
* `market/trades/list`

**پورتفولیو**

* `users/portfolio/last-week-daily-profit`
* `users/portfolio/last-week-daily-total-profit`
* `users/portfolio/last-month-total-profit`
* `users/portfolio/daily_total_balance`

**واریز شتابی**

* `users/payments/ids-list`

**کیف پول**

* `users/wallets/list`
* `v2/wallets`
* `users/wallets/balance`
* `users/wallets/transactions/list`
* `users/transactions-history`
* `users/wallets/deposits/list`
* `users/wallets/withdraws/list`
* `users/wallets/deposit/bank`
* `users/wallets/deposit/shetab`
* `withdraws/<withdraw_id>`

**معاملات تعهدی**

* `margin/fee-rates`
* `margin/delegation-limit`
* `margin/v2/delegation-limit`
* `positions/list`
* `positions/active-count`
* `positions/<position_id>/status`
* `positions/<position_id>/edit-collateral/options`
* `margin/predict/<category>`


## Trade
کلید با این دسترسی، به ای پی آی هایی که برای ثبت و کنسل سفارشات و در کل کنترل
سفارشات استفاده می‌شوند، دسترسی دارد. 

با اختصاص این مجوز به یک کلید، دسترسی به ای پی آی های زیر به آن کلید داده می‌شود:

**معاملات تعهدی**

* `margin/orders/add`
* `positions/<int:pk>/close`
* `positions/<int:pk>/edit-collateral`

**معاملات بازار اسپات**

* `market/orders/add`
* `market/orders/batch-add`
* `market/orders/update-status`
* `market/orders/cancel-old`
* `market/orders/cancel-batch`
* `users/wallets/convert`

## Withdraw

کلید با این دسترسی، به ای پی آی های برداشت دسترسی دارد. 
پیشنهاد می‌کنیم برای این کلید حتما آی پی مشخص کنید.
با اختصاص این مجوز به یک کلید، دسترسی به این اند پوینت ها باز می‌شود:

* `withdraws/<withdraw_id>/update-status`
* `users/wallets/withdraw`
* `users/wallets/withdraw-confirm`
* `users/wallets/withdraw-cancel`
* 

## استفاده از کلید API

برای استفاده از API باید سه هدر زیر در هر درخواست ارسال شوند:

| Header                | توضیح                                                                 |
|------------------------|----------------------------------------------------------------------|
| `Nobitex-Key`          | کلید عمومی تولید شده توسط کاربر                                      |
| `Nobitex-Signature`    | امضای محاسبه‌شده با الگوریتم `Ed25519`                              |
| `Nobitex-Timestamp`    | زمان جاری به ثانیه (Unix timestamp) در منطقه زمانی UTC               |

### نحوه محاسبه امضا (Signature)

امضا به صورت زیر محاسبه می‌شود:

```shell
   signature = base64(Ed25519(timestamp + method + url + body))
```

- **timestamp**: عدد ثانیه‌ای (Unix time) بر اساس UTC  
- **method**: متد HTTP درخواست (مانند `GET`, `POST`)  
- **url**: مسیر کامل درخواست (endpoint) مانند `/market/orders/list?fromId=123`
- **body**: محتوای خام بدنه درخواست (برای متدهای `POST`، `PUT` و …)  

> توجه: مقدار `Nobitex-Key` همان کلید عمومی شماست و باید به صورت ثابت در هدر ارسال شود.

```bash
curl -X POST "https://apiv2.nobitex.ir/orders/cancel-old" \
  -H "Content-Type: application/json" \
  -H "Nobitex-Key: <Your-Public-Key>" \
  -H "Nobitex-Signature: <Generated-Signature>" \
  -H "Nobitex-Timestamp: <Unix-Timestamp>" \
  -d '{
        "order": 27032,
        "status": "canceled"
      }'
```
