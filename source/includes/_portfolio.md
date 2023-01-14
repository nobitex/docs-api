<h1 id="portfolio">سود و زیان</h1>

«پرتفو» یا «پنل سود و زیان» کاربر، گزارشی است که با توجه به معاملات یا افزایش و کاهش قیمت رمزارزها در مارکت میزان سود یا ضرر بدست آمده و درصدهای آنها را نسبت به قیمت خریداری شده (موجودی) نمایش میدهد.

در حال حاضر این اطلاعات در پرتفو هر کاربر ارائه می‌شود:

* سود و زیان روزانه هفته گذشته
* سود زیان کل به صورت روزانه در هفته گذشته
* سود و زیان کل ماه گذشته


<aside class="warning"> توجه: این ویژگی به صورت بتا عرضه شده است</aside>

<h2 id="last-week-daily-profit">سود و زیان روزانه هفته گذشته</h2>

```shell
curl -X POST 'https://api.nobitex.ir/users/portfolio/last-week-daily-profit' \
  -H 'Authorization: Token yourTOKENhereHEX0000000000'
```

```plaintext
http POST https://api.nobitex.ir/users/portfolio/last-week-daily-profit \
Authorization: Token yourTOKENhereHEX0000000000
```

> در صورت فراخوانی درست، پاسخ به این صورت خواهد بود:

```json
{
    "status": "ok",
    "data": [
        {
            "report_date": "2021-06-30",
            "total_profit": 0,
            "total_profit_percentage": 0,
            "total_balance": 0
        },
        {
            "report_date": "2021-07-01",
            "total_profit": 0,
            "total_profit_percentage": 0,
            "total_balance": 0
        },
        {
            "report_date": "2021-07-02",
            "total_profit": 0,
            "total_profit_percentage": 0,
            "total_balance": 0
        },
        {
            "report_date": "2021-07-03",
            "total_profit": 0,
            "total_profit_percentage": 0,
            "total_balance": 0
        },
        {
            "report_date": "2021-07-04",
            "total_profit": 0,
            "total_profit_percentage": 0,
            "total_balance": 0
        },
        {
            "report_date": "2021-07-05",
            "total_profit": "0E-10",
            "total_profit_percentage": "0E-10",
            "total_balance": "4516559.9205900000"
        },
        {
            "report_date": "2021-07-06",
            "total_profit": "152570.1426800000",
            "total_profit_percentage": "3.3780165737",
            "total_balance": "4669130.0632700000"
        }
    ]
}
```

> در صورتی که این ویژگی برای کاربر فعال نباشد با این جواب روبرو خواهند شد

```json
{
    "status": "failed",
    "code": "PortfolioDisabled",
    "message": "Portfolio feature is not available for your user."
}
```

> در صورتی که اطلاعاتی از سود و زیان کاربر وجود نداشته باشد

```json
{
    "status": "failed",
    "code": "LastWeekDailyProfitFail",
    "message": "اطلاعاتی جهت نمایش وجود ندارد"
}
```

برای دریافت اطلاعات سود و زیان روزانه هفته گذشته از این درخواست استفاده نمایید:

* **درخواست:** `POST users/portfolio/last-week-daily-profit`
* **محدودیت فراخوانی:** 10 درخواست در 3 دقیقه

### نکات و ملاحظات: 
این API به صورت پیش فرض اطلاعات 7 روز گذشته را ارائه می دهد. برای دریافت اطلاعات ماهانه یا ۳۰ روز گذشته کافیست پارامتر monthly با مقدار true را به همراه این درخواست ارسال نمایید.

<h2 id="last-week-daily-total-profit">سود زیان کل به صورت روزانه در هفته گذشته</h2>

```shell
curl -X POST 'https://api.nobitex.ir/users/portfolio/last-week-daily-total-profit' \
  -H 'Authorization: Token yourTOKENhereHEX0000000000'
```

```plaintext
http POST https://api.nobitex.ir/users/portfolio/last-week-daily-total-profit \
Authorization: Token yourTOKENhereHEX0000000000
```

> در صورت فراخوانی درست، پاسخ به این صورت خواهد بود:

```json
{
    "status": "ok",
    "data": [
        {
            "report_date": "2021-06-27",
            "total_profit": 0,
            "total_profit_percentage": 0
        },
        {
            "report_date": "2021-06-28",
            "total_profit": 0,
            "total_profit_percentage": 0
        },
        {
            "report_date": "2021-06-29",
            "total_profit": "4507274.2415300000",
            "total_profit_percentage": "197.3669039200"
        },
        {
            "report_date": "2021-06-30",
            "total_profit": "9020935.7092505000",
            "total_profit_percentage": "-307.6135237294"
        },
        {
            "report_date": "2021-07-01",
            "total_profit": "-5373087.9340195000",
            "total_profit_percentage": "1302.7642741973"
        },
        {
            "report_date": "2021-07-02",
            "total_profit": "313580813.4306171358",
            "total_profit_percentage": "-899.0991999052"
        },
        {
            "report_date": "2021-07-03",
            "total_profit": "313580813.4306171358",
            "total_profit_percentage": "-899.0991999052"
        }
    ]
}
```

> در صورتی که این ویژگی برای کاربر فعال نباشد با این جواب روبرو خواهند شد

```json
{
    "status": "failed",
    "code": "PortfolioDisabled",
    "message": "Portfolio feature is not available for your user."
}
```

> در صورتی که اطلاعاتی از سود و زیان کاربر وجود نداشته باشد

```json
{
    "status": "failed",
    "code": "LastWeekDailyProfitFail",
    "message": "اطلاعاتی جهت نمایش وجود ندارد"
}
```

برای دریافت اطلاعات سود و زیان روزانه هفته گذشته از این درخواست استفاده نمایید:

* **درخواست:** `POST users/portfolio/last-week-daily-total-profit`
* **محدودیت فراخوانی:** 10 درخواست در 3 دقیقه



<h2 id="last-month-total-profit">سود و زیان کل ماه گذشته</h2>

```shell
curl -X POST 'https://api.nobitex.ir/users/portfolio/last-month-total-profit' \
  -H 'Authorization: Token yourTOKENhereHEX0000000000'
```

```plaintext
http POST https://api.nobitex.ir/users/portfolio/last-month-total-profit \
Authorization: Token yourTOKENhereHEX0000000000
```

> در صورت فراخوانی درست، پاسخ به این صورت خواهد بود:

```json
{
    "status": "ok",
    "data": {
        "total_profit": "8987787000.0000000000",
        "total_profit_percentage": "83.60700983438201160181729556"
    }
}
```

> در صورتی که این ویژگی برای کاربر فعال نباشد با این جواب روبرو خواهند شد

```json
{
    "status": "failed",
    "code": "PortfolioDisabled",
    "message": "Portfolio feature is not available for your user."
}
```

> در صورتی که اطلاعاتی از سود و زیان کاربر وجود نداشته باشد

```json
{
    "status": "failed",
    "code": "LastWeekDailyProfitFail",
    "message": "اطلاعاتی جهت نمایش وجود ندارد"
}
```

برای دریافت اطلاعات سود و زیان روزانه هفته گذشته از این درخواست استفاده نمایید:

* **درخواست:** `POST users/portfolio/last-month-total-profit`
* **محدودیت فراخوانی:** 10 درخواست در 3 دقیقه



