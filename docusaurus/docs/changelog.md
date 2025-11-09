---
title: سابقه تغییرات API
sidebar_position: 1
---

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

## تغییرات خرداد ۱۴۰۴

* تغییر آدرس پایه api ها
* منسوخ شدن نسخه قدیمی اردربوک
* افزودن اطلاعات تکمیلی برای محدودیت فراخوانی

## تغییرات شهریور ۱۴۰۳

* افزودن اندپوینت اردربوک ورژن ۳ و deprecate کردن ورژن ۲
* اضافه نمودن وب‌سوکت
* اضافه کردن کانال «لیست سفارش‌ها: اردربوک» به وب‌سوکت

## تغییرات مرداد ۱۴۰۳

* قابلیت دریافت سفارشات به ترتیب زمان ثبت، شناسه و قیمت به صورت صعودی و نزولی در لیست سفارشات

## تغییرات مهر ۱۴۰۲

* افزودن معاملات خرید تعهدی

## تغییرات مرداد ۱۴۰۲

* افزودن ضریب به فروش تعهدی

## تغییرات اردیبهشت ۱۴۰۲

* افزودن انواع سفارش بازار، حد ضرر و OCO به فروش تعهدی

## تغییرات بهمن ۱۴۰۱

* افزودن معاملات فروش تعهدی

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


<table>
<thead>
<tr>
<th>message</th>
<th>code</th>
<th>endpoint</th>
</tr>
</thead>
<tbody>
<tr>
<td>msgUnfilledForm</td>
<td>ValidationError</td>
<td rowSpan="3">/users/wallets/deposit/bank</td>
</tr>
<tr>
<td>msgBankAmountLow</td>
<td>AmountTooLow</td>
</tr>
<tr>
<td>msgBankAmountHigh</td>
<td>AmountTooHigh</td>
</tr>
<tr>
<td>CoinDepositLimitation</td>
<td>CoinDepositLimitation</td>
<td rowSpan="1">/users/wallets/generate-address</td>
</tr>
<tr>
<td>ExchangeRequiredTag</td>
<td>ExchangeRequiredTag</td>
<td rowSpan="7">/users/wallets/withdraw</td>
</tr>
<tr>
<td>msgInvalid2FA</td>
<td>Invalid2FA</td>
</tr>
<tr>
<td>WithdrawAmountLimitation</td>
<td>WithdrawAmountLimitation</td>
</tr>
<tr>
<td>Insufficient Balance</td>
<td>InsufficientBalance</td>
</tr>
<tr>
<td>msgWithdrawLimitReached</td>
<td>WithdrawLimitReached</td>
</tr>
<tr>
<td>msgAmountTooLow</td>
<td>AmountTooLow</td>
</tr>
<tr>
<td>msgAmountTooHigh</td>
<td>AmountTooHigh</td>
</tr>
<tr>
<td>WithdrawAmountLimitation</td>
<td>WithdrawAmountLimitation</td>
<td rowSpan="2">/users/wallets/withdraw-confirm</td>
</tr>
<tr>
<td>Insufficient Balance</td>
<td>InsufficientBalance</td>
</tr>
<tr>
<td>Withdraw is not cancelable</td>
<td>NotCancelable</td>
<td rowSpan="1">/users/wallets/withdraw-cancel</td>
</tr>
<tr>
<td>CoinDepositLimitation</td>
<td>CoinDepositLimitation</td>
<td rowSpan="2">/users/wallets/invoice/generate</td>
</tr>
<tr>
<td>CoinDepositDisabled</td>
<td>CoinDepositDisabled</td>
</tr>
</tbody>
</table>


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


## تغییرات مهر ۱۴۰۳

* حذف پارامتر availableBalance از پاسخ endpoint های زیر:
  - /liquidity-pools/list