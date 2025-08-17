# معامله در بازار

## تعداد سفارش‌های باز کاربر


```shell
curl 'https://apiv2.nobitex.ir/market/orders/open-count?tradeType=margin' \
  -H "Authorization: Token yourTOKENhereHEX0000000000"
```

```plaintext
http GET https://apiv2.nobitex.ir/market/orders/open-count?tradeType=margin
```

> در صورت فراخوانی درست، پاسخ به این صورت خواهد بود:

```json
{
  "status": "ok",
  "count": 2
}
```

برای دریافت تعداد سفارش‌های باز خود، از این درخواست استفاده نمایید.

- **درخواست:** `GET /market/orders/open-count`
- **<a href="/#ratelimit">محدودیت فراخوانی:</a>** 15 درخواست در دقیقه

### پارامترهای ورودی
| پارامتر   | نوع    | پیش‌فرض          | توضیحات                       | نمونه              |
|-----------|--------|------------------|-------------------------------|--------------------|
| tradeType | string | تمام انواع سفارش | نوع سفارش اسپات یا فروش تعهدی | `spot` یا `margin` |

### پارامترهای پاسخ
| پارامتر | نوع     | توضیحات                 | نمونه |
|---------|---------|-------------------------|-------|
| count   | integer | تعداد سفارشات باز کاربر | 2     |
