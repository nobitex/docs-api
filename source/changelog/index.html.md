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

## تغییرات آبان ۱۴۰۰

* از تاریخ ۱ آذر ۱۴۰۰ مواردی که در مستندات به عنوان «قدیمی» مشخص شده‌اند یا در مستندات ذکر نشده‌اند، دیگر مورد پشتیبانی نخواهند بود و باید کدهای استفاده کننده از این موارد تا این تاریخ به‌روزرسانی شوند.
* دریافت اطلاعات اردربوک از تاریخ ۱ آذر ۱۴۰۰ تنها با روش جدید موجود در مستندات ممکن است. روش قدیمی که با متد POST مورد استفاده قرار می‌گرفت از این تاریخ دیگر در دسترس نخواهد بود.


# سایر تغییرات API

## تغییرات آبان ۱۴۰۰

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

## مستندات جدید آبان ۱۴۰۰

* غیرفعال‌سازی شناسایی دوعاملی (/users/tfa/disable)
* تایید شناسایی دوعاملی (/users/tfa/confirm)
* فعال‌سازی شناسایی دوعاملی (/users/tfa/request)
* تفسیر صورت‌حساب (/users/wallets/invoice/decode)
* ایجاد صورت‌حساب واریز (/users/wallets/invoice/generate)
* لیست نوتیفیکیشن‌ها (/notifications/list)
