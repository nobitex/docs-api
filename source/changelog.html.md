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
* ایجاد صورت‌حساب واریز (/users/wallets/invoice/generate)
* لیست نوتیفیکیشن‌ها (/notifications/list)


# تغییرات API
## 1400/07
* افزودن کد خطا به endpoint های زیر:

message | code <th>endpoint</th>
------- | ---- 
CoinDepositLimitation | CoinDepositLimitation <td rowspan=2>/users/wallets/invoice/generate</td>
CoinDepositDisabled | CoinDepositDisabled

