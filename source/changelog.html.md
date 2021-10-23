---
title: مستندات تغییرات API نوبیتکس
lang: fa
toc_footers:
  - <a href='https://nobitex.ir/'>سایت نوبیتکس</a>
---

#مستندات تغییرات API نوبیتکس
در این مستند تغییرات هر نسخه از API ها به صورت فهرست‌وار ثبت می‌شود. برای اطلاع از مشروح تغییرات به مستندات متناظر مراجعه نمایید.

# مستندات جدید
## 1400/07
* تایید شناسایی دوعاملی (/users/tfa/confirm)
* فعال‌سازی شناسایی دوعاملی (/users/tfa/request)
* تفسیر صورت‌حساب (/users/wallets/invoice/decode)
* ایجاد صورت‌حساب واریز (/users/wallets/invoice/generate)
* لیست نوتیفیکیشن‌ها (/notifications/list)


# تغییرات API
## 1400/07
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

