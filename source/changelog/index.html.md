---
title: سابقه تغییرات API نوبیتکس
lang: fa
toc_footers:
  - <a href='/'>مستندات API نوبیتکس</a>
  - <a href='/terms/'>شرایط استفاده از API</a>
  - <a href='https://nobitex.ir/'>سایت نوبیتکس</a>
---

# سابقه تغییرات API نوبیتکس
در این مستند تغییرات هر نسخه از API ها به صورت فهرست‌وار ثبت می‌شود. برای اطلاع از مشروح تغییرات به مستندات متناظر مراجعه نمایید.

# تغییرات مهم API

## تغییرات مرداد ۱۴۰۱

* افزودن کندل دقیقه‌ای به OHLC

## تغییرات فروردین ۱۴۰۱

* پشتیبانی از سفارش‌های OCO

## تغییرات اسفند ۱۴۰۰

* پشتیبانی از سفارش‌های حد ضرر (Stop Loss)
* قابلیت ارسال کارت هدیه

## تغییرات آذر ۱۴۰۰

* **آخرین اعلام برای APIهای قدیمی:** از تاریخ ۱۵ آذر ۱۴۰۰ مواردی که در مستندات به عنوان «قدیمی» مشخص شده‌اند یا در مستندات ذکر نشده‌اند، دیگر مورد پشتیبانی نخواهند بود و باید کدهای استفاده کننده از این موارد تا این تاریخ به‌روزرسانی شوند.
* **حذف متد POST برای دریافت اردربوک:** دریافت اطلاعات اردربوک از تاریخ ۱۵ آذر ۱۴۰۰ تنها با روش جدید موجود در مستندات ممکن است. روش قدیمی که با متد POST مورد استفاده قرار می‌گرفت از این تاریخ دیگر در دسترس نخواهد بود.
* **بهبود خروجی اردربوک:** تعداد سفارش‌های بازگردانده شده در هر سمت اردربوک از ۱۶ به ۲۴ سفارش افزایش یافته است. همین طور امکان استفاده از نماد `all` برای دریافت یکجای تمامی اردربوک‌ها فراهم شده است. به طور کلی نیز سرعت به‌روزرسانی اردربوک بهبود یافته است.

# سایر تغییرات API
## تغییرات آذر 1401 

* افزودن امکان فیلتر لیست سفارشات با یک آی دی مبدا
* افزودن امکان جستجوی نماد روی چارت UDF
* افزودن امکان ثبت و دریافت لیست [بازارهای مورد علاقه](/#favorite_market)

## تغییرات آبان 1401 

* افزوده شدن کارمزد واریز شناسه دار جیبیت به پاسخ endpoint تنظیمات: [v2/options](/#options)

## تغییرات مهر 1401 

* افزوده شدن امکان ثبت و دریافت آنتی‌فیشینگ کد

## تغییرات بهمن ۱۴۰۰

* ایجاد دیرهنگام کیف پول در زمان استفاده کاربر
* افزودن زمان آخرین به‌روزرسانی به لیست سفارش‌ها (اوردربوک)

## تغییرات آبان ۱۴۰۰

* افزودن پارامتر hasNext به پاسخ endpoint های زیر:
  - /users/transactions-history

* افزودن کد خطا به endpoint های زیر:

message | code <th>endpoint
------- | ----
msgUnfilledForm | ValidationError <td rowspan=3>/users/wallets/deposit/bank
msgBankAmountLow | AmountTooLow
msgBankAmountHigh | AmountTooHigh
CoinDepositLimitation | CoinDepositLimitation <td rowspan=1>/users/wallets/generate-address
ExchangeRequiredTag | ExchangeRequiredTag <td rowspan=7>/users/wallets/withdraw
msgInvalid2FA | Invalid2FA
WithdrawAmountLimitation | WithdrawAmountLimitation
Insufficient Balance | InsufficientBalance
msgWithdrawLimitReached | WithdrawLimitReached
msgAmountTooLow | AmountTooLow
msgAmountTooHigh | AmountTooHigh
WithdrawAmountLimitation | WithdrawAmountLimitation <td rowspan=2>/users/wallets/withdraw-confirm
Insufficient Balance | InsufficientBalance
Withdraw is not cancelable | NotCancelable <td rowspan=1>/users/wallets/withdraw-cancel
CoinDepositLimitation | CoinDepositLimitation <td rowspan=2>/users/wallets/invoice/generate
CoinDepositDisabled | CoinDepositDisabled


# مستندات جدید

## مستندات جدید تیر ۱۴۰۱

* فهرست معاملات کاربر (/market/trades/list)

## مستندات جدید آذر ۱۴۰۰

* ثبت درخواست برداشت (/users/wallets/withdraw)
* تایید درخواست برداشت (/users/wallets/withdraw-confirm)
* لیست برداشت‌ها (/users/wallets/withdraws/list)
* مشاهده برداشت (/withdraws/`ID`)

## مستندات جدید آبان ۱۴۰۰

* لیست سفارشات همه بازارها (/v2/orderbook/all)
* تاریخچه تراکنش‌های مالی کاربر (/users/transactions-history)
* لیست معاملات صرافی (/exchange/trades-list)
* ثبت معامله در صرافی (/exchange/create-trade)
* دریافت قیمت از صرافی (/exchange/estimate)
* CRUD اعلان قیمت (/v2/price-alerts)
* غیرفعال‌سازی شناسایی دوعاملی (/users/tfa/disable)
* تایید شناسایی دوعاملی (/users/tfa/confirm)
* فعال‌سازی شناسایی دوعاملی (/users/tfa/request)
* تفسیر صورت‌حساب (/users/wallets/invoice/decode)
* ایجاد صورت‌حساب واریز (/users/wallets/invoice/generate)
* لیست نوتیفیکیشن‌ها (/notifications/list)
