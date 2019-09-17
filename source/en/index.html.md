---
title: مستندات API نوبیتکس
lang: en

# see: https://github.com/lord/slate/wiki/Custom-Slate-Themes
# see: https://developer.tradegecko.com/

language_tabs: # must be one of https://git.io/vQNgJ
  - shell
  - plaintext

toc_footers:
  - <a href='https://nobitex.market/'>سایت نوبیتکس</a>

---

#Nobitex
Your security is our utmost priority. We apply latest security protocols and routinely perform penetration tests to ensure highest security level for your trades. We also facilitate “cold storage” of your cryptocurrencies for the enhanced security of your wallets.
In Nobitex , we assign you a secure digital wallet (unique personal block-chain address) to safely manage your cryptocurrencies. The private keys are stored in an offline system which will make it safe again hacking attacks.
In Nobitex, you can trade popular cryptocurrencies (Bitcoin, Ethereum and Ripple) with IRR. We also provide you a competitive service to trade your cryptocurrencies paired with USD Tether cryptocurrency at lower fees.
Create an Account-> Open account

[Read More](https://nobitex.market/about/)

Nobitex is coined by combination of three words “No (Persian expression for new), bitcoin and exchange. Nobitex is the first exchange platform in Iran for trading common cryptocurrencies i.e. Bitcoin, Ethereum, Ripple, Litecoin and USD Tether with IRR.
Nobitex was born in 2017 to answer the needs of Iranian users to trade cryptocurrencies. Since then, we have extended our team by joining experts from different areas and with their hard work we continuously improve our product.


##Our Goals and Values
Our Goals:
-	Development of nobitex exchange platform for a maximum coverage of authenticated cryptocurrencies
-	Collaboration with startups and other companies for establishing cryptocurrency-based payment portals for international transactions
-	Collaboration with Iranian ICOs and to secure funding
-	Expanding to Middle East countries

Our Values
-	Freedom in Trade is a right for everyone
-	We respect and protect with our soul the trust of our customers
-	Continuous Improvement of ourselves and our products


#API
Nobitex is developed based on API and our valued customers have this option to manage all their actions in Nobitex automatically by developing their own codes. Here we describe main features of API in Nobitex.
For a quick access to your desired API, you can search its title or its url or simply browse to the menu on the left side of page. For most of API commands, you can view the sample code in the grey area of the right side of the page. You can also pick your coding program from top left of screen to view API codes in that format.
Please send your suggestions or report any unambiguous API glitches by creating a new issue on our Nobitex API github or directly contact our team to remediate your concerns ASAP.

#Authentication
There is no need to provide a password or a token to access public APIs, but you should request for a token to access private APIs and authenticate your self with that token for you’re the following requests.

##Login
> Request:

```shell
curl 'https://api.nobitex.ir/auth/login/' \
  -X POST \
  -H "Content-Type: application/json" \
  --data $'{"username":"name@example.com","password":"secret-password-1234"}'
```

```plaintext
http POST https://api.nobitex.ir/auth/login/ \
  username=name@example.com password=secret-password-1234
```

> Response:

```json
{
    "key": "e9282e56c83f93eb077043e5ad8b6cf5b3ff7568"
}
```
Token can be obtained automatically by sending a request to auth/login/  . For your own security, tokens will be expired after 4 hours and you should acquire a new one by sending login request. If you need long-term tokens you can set a “r” parameter in remember=yes to receive a token with 30-days active token.

Parameter|	Type|	Mandatory (Y/N)|	Description	Example
---------|------|------------------|------------------------
username|	string|	Y|	User email|	`name@example.com`
password|	string|	Y|	User password|	`secret-password-1234`
remember|	string|	N|	30-day Token issuance|	`Yes or No`

<aside class="notice">
Tokens generated from this method last 4h or 30 days. If you need tokens with a longer active spans and keeping in mind its security considerations, please contact Nobitex Support team.
</aside>


#Market information (Public)
##orderbook
> Request:

```shell
curl 'https://api.nobitex.ir/market/orders/list' \
  -X POST \
  -H "content-type: application/json" \
  --data '{"order":"-price","type":"sell","dstCurrency":"usdt"}'
```

```plaintext
http POST https://api.nobitex.ir/market/orders/list \
  order=-price type=sell dstCurrency=usdt
```

> Response:

```json
{
    "status": "ok",
    "orders": [
        {
            "unmatchedAmount": "0.1416000000",
            "amount": "0.1416000000",
            "srcCurrency": "Bitcoin",
            "dstCurrency": "Tether(omni)",
            "matchedAmount": "0E-10",
            "isMyOrder": false,
            "price": "5787.0000000000",
            "type": "sell",
            "totalPrice": "819.43920000000000000000"
        },
        ...

    ]
}
```

To receive the list of orders (orderbook):

Address: POST /market/orders/list

Parameters:

Parameter|	Type|	Default| Description|Example
---------|------|----------|------------|-------
order|string|price|Order|`price or price`
type|string|Optional|Transaction type|`Sell or buy`
srcCurrency|string|Optional|Source Currency|`btc`
dstCurrency|string|Optional|Destination Currency|`rls`


<aside ckass = "notice">
Price displays ascending and -price descending price lists.
</aside>

##Trades List
> Request:

```shell
curl 'https://api.nobitex.ir/market/trades/list' \
  -X POST \
  -H "content-type: application/json" \
  --data '{"srcCurrency":"btc","dstCurrency":"rls"}'
```

```plaintext
http POST https://api.nobitex.ir/market/trades/list \
  srcCurrency=btc dstCurrency=rls
```

> Response:

```json
{
    "trades": [
        {
            "market": "Bitcoin-﷼",
            "total": "99949293.63720000000000000000",
            "price": "750032220.0000000000",
            "amount": "0.1332600000",
            "type": "buy",
            "timestamp": "2018-11-18T11:56:07.798845+00:00"
        },
        ...
    ],
    "status": "ok"
}
```
To receive the list of recent trades:

Address: POST /market/trades/list

Parameters:

Parameter|	Type|	Default| Description|Example
---------|------|----------|------------|-------
srcCurrency|string|Mandatory|Source Currency|`btc`
dstCurrency|string|Mandatory|Destination Currency|`rls`

<aside ckass = "notice">
Applied limitation: No more than 15 requests per minute
</aside>

##Nobitex Public Market Data
> Request:

```shell
curl 'https://api.nobitex.ir/market/stats' \
  -X POST \
  -H "content-type: application/json" \
  --data '{"srcCurrency":"btc","dstCurrency":"rls"}'
```

```plaintext
http POST https://api.nobitex.ir/market/stats \
  srcCurrency=btc dstCurrency=rls
```

> Response:

```json
{
    "stats": {
        "btc-rls": {
            "bestSell": "749976360.0000000000",
            "isClosed": false,
            "dayOpen": "686021860.0000000000",
            "dayHigh": "750350000.0000000000",
            "bestBuy": "733059600.0000000000",
            "volumeSrc": "0.2929480000",
            "dayLow": "686021860.0000000000",
            "latest": "750350000.0000000000",
            "volumeDst": "212724856.0678640000",
            "dayChange": "9.38",
            "dayClose": "750350000.0000000000"
        },
    },
    "status": "ok"
}
```


To receive the latest Nobitex market statistics:

Address: POST /market/stats


Parameters:

Parameter|	Type|	Default| Description|Example
---------|------|----------|------------|-------
srcCurrency|string|Mandatory|Source Currency|`btc, usdt`
dstCurrency|string|Mandatory|Destination Currency|`rls`

<aside ckass = "notice">
Rate Limit: No more than 1000 requests in 10 minutes
</aside>


##Global Market Statistics
> Request:
```shell
curl 'https://api.nobitex.ir/market/global-stats' \
  -X POST

```

```plaintext
http POST https://api.nobitex.ir/market/global-stats
```

> Response:


```json
{
    "ltc": {
        "kraken": {
            "price": "41.69"
        }
    },
    "btc": {
        "kraken": {
            "price": "5517.2"
        }
    },
    ...

    "status": "ok"
}
```
To get the latest global market statistics:

Address: POST /market/global-stats


<aside ckass = "notice">
Rate Limit: No more than 1000 requests in 10 minutes. Stats are extracted from Kraken and Binance.
</aside>

#User information
##Profile

```shell
curl 'https://api.nobitex.ir/users/profile' \
  -H "Authorization: Token e9282e56c83f93eb077043e5ad8b6cf5b3ff7568"
```

```plaintext
http POST https://api.nobitex.ir/users/profile \
```

> Response:

```json
{
  "status": "ok",
  "profile": {
    "firstName": "مهدی",
    "lastName": "رضایی",
    "nationalCode": "011122333",
    "email": "name@example.com",
    "username": "name@example.com",
    "phone": "02142719000-9012",
    "mobile": "09151111111",
    "city": "مشهد",
    "bankCards": [
      {
        "number": "6037-9900-0000-0000",
        "bank": "ملی",
        "owner": "مهدی رضایی",
        "confirmed": true,
        "status": "confirmed"
      }
    ],
    "bankAccounts": [
      {
        "id": 1999,
        "number": "0346666666666",
        "shaba": "IR460170000000346666666666",
        "bank": "ملی",
        "owner": "مهدی رضایی",
        "confirmed": true,
        "status": "confirmed"
      }
    ],
    "verifications": {
      "email": true,
      "phone": true,
      "mobile": true,
      "identity": true,
      "selfie": false,
      "bankAccount": true,
      "bankCard": true,
      "address": true,
      "city": true
    },
    "pendingVerifications": {
      "email": false,
      "phone": false,
      "mobile": false,
      "identity": false,
      "selfie": false,
      "bankAccount": false,
      "bankCard": false
    },
    "options": {
      "fee": "0.35",
      "feeUsdt": "0.2",
      "isManualFee": false,
      "tfa": false,
      "socialLoginEnabled": false
    },
    "withdrawEligible": true
  },
  "tradeStats": {
    "monthTradesTotal": "10867181.5365000000",
    "monthTradesCount": 3
  }
}
```
To receive your profile information:

Address: GET/users/login-attempts

##Login Attempts

```shell
curl 'https://api.nobitex.ir/users/login-attempts' \
  -H "Authorization: Token e9282e56c83f93eb077043e5ad8b6cf5b3ff7568"
```

```plaintext
http POST https://api.nobitex.ir/users/login-attempts \
```

> Response:

```json
{
    "status": "ok",
    "attempts": [
        {
            "ip": "46.209.130.106",
            "username": "name@example.com",
            "status": "Successful",
            "createdAt": "2018-11-28T14:16:08.264308+00:00"
        },
        ...
    ]
}
```
To receive your login attempts:

Address: GET/users/login-attempts

##Referral Code

```shell
curl 'https://api.nobitex.ir/users/get-referral-code' \
  -H "Authorization: Token e9282e56c83f93eb077043e5ad8b6cf5b3ff7568"
```

```plaintext
http POST https://api.nobitex.ir/users/get-referral-code \
```

> در صورت فراخوانی درست، پاسخ به این صورت خواهد بود:

```json
{
    "status": "ok",
    "referredUsersCount": 0,
    "referralCode": "84440",
    "referralFeeTotalCount": 0,
    "referralFeeTotal": 0
}
```


To receive your referral code:

Address: GET/users/get-referral-code

##Adding a Debit Card

```shell
curl 'https://api.nobitex.ir/users/cards-add' \
  -X POST \
  -H "Authorization: Token e9282e56c83f93eb077043e5ad8b6cf5b3ff7568" \
  -H "content-type: application/json" \
  --data '{"number":"5041721011111111","bank":"رسالت"}'
```

```plaintext
http POST https://api.nobitex.ir/users/cards-add \
  number=5041721011111111 bank=رسالت
```

> Response:

```json
{
    "status": "ok"
}
```
To add your debit card information:

Address: POST/users/cards-add

#Users Wallet
##Users Wallets List
```shell
curl 'https://api.nobitex.ir/users/wallets/list' \
  -X POST \
  --header "Authorization: Token e9282e56c83f93eb077043e5ad8b6cf5b3ff7568"
```

```plaintext
http POST https://api.nobitex.ir/users/wallets/list \
  Authorization=Token e9282e56c83f93eb077043e5ad8b6cf5b3ff7568
```

> Response:

```json
{
    "status": "ok",
    "wallets": [
        {
            "activeBalance": "10.2649975000",
            "blockedBalance": "0",
            "user": "name@example.com",
            "currency": "ltc",
            "id": 4159,
            "balance": "10.2649975000",
            "rialBalance": 51322935,
            "rialBalanceSell": 52507310,
            "depositAddress": null
        },
        ...
    ]
}
```
To receive a list of your active wallets:

Address: POST /users/wallets/list

##Balance
```shell
curl 'https://api.nobitex.ir/users/wallets/balance' \
  -X POST \
  --header "Authorization: Token e9282e56c83f93eb077043e5ad8b6cf5b3ff7568" \
  --data '{"currency":"ltc"}'
```

```plaintext
http POST https://api.nobitex.ir/users/wallets/balance \
  currency=ltc
```

> Response:

```json
{
    "balance": "10.2649975000",
    "status": "ok"
}
```

To retrieve your current balance:

Address: POST /users/wallets/balance

Parameters:

Parameter|	Type|	Default| Description|Example
---------|------|----------|------------|-------
currency|string|Mandatory|Your wallet type|`ltc`

#Important Notices
##Troubleshooting Guide
-	Pay attention to the type of your requests, sometimes your request belongs to HTTP POST but you used GET commands instead.
-	Please carefully review the API address and check if  “/” is included in the address or not.
##Two-factor Authentication
If you activate two-factor Authentication for your account, to use some APIs , especially to collect login token, you should provide your single-use password in the header of your request.

##Limitations on API recalling
Some of Nobitex API have predefined quota in number of calling for a definite time span. General users shouldn’t worry to reach these limits. These limitations are evaluated case by case based on the content of APIs. Typically, limitations are applied based on the IP of the requester or a token. If you reach the limit to using APIs in a certain time, you will receive 403 error from API with its detailed information about this limitation.
If you face any problem or glitches when you are executing your code, you can wait (between 1 hour to 24 hours) to remediate the problem and your access to your API will be restored. If you face a recurring limitation in an API and you think it is better to reconsider the limitation rules for that API, please consult us by opening a new thread in github.

##Error Descriptions
HTTP Errors|Description
-----------|-----------
400|Bad Request- Your request parameters are invalid/insufficient
403|Forbidden- Performing such an action is prohibited.
404|Not Found- url address or object doesn’t exist
500|Internal server error- temporary error in Nobitex server (Don’t worry!)

##Fees
[Read More](https://nobitex.market/pricing/)

Our goal is to provide a transparent platform for your transactions. To do so it is our responsibility to clearly present our rate policies for our respected costumers. Registration and using Nobitex is completely free of charge and based on disruption provided here, we apply small amount of service fees for transactions.

##Transaction Fees
Transaction fees are calculated based on percentage of the total transaction value which will be presented here. Applying transaction fees prevents fallacious and repeated transactions and provide more convenient conditions for all the users.
-	Transaction fees are charged on both sides of transaction.
-	Rates are applied based on your trading volume. For instance, as a seller if you want to exchange bitcoin with Rials, fees are applied in Rials and as a buyer, if you want to buy bitcoin with Rials , fees are applied in bitcoins.
-	Upon submission of your transaction in Nobitex system, the exact service rate will be displayed for you.
-	Based on the trading volumes, transaction fees are applied as follows:


Trading Volumes in 30 days|Transaction Fees
--------------------------|----------------
کمتر از 10 میلیون تومان% |  0.35
بین 10 تا 50 میلیون تومان% | 0.3
بین 50 تا 100 میلیون تومان% | 0.25
بیشتر از 100 میلیون تومان% | 0.2


<aside class="notice">
Transactions in designated Nobitex markets (Exchange into tether like bitcoin to tether) are independent of trading volume with special rate of 0.2%.
</aside>

##Service Fees for deposit and withdrawal
-	Service fee for deposit is zero. Service fee for withdrawal are applied because of banking and portal fees and it is calculated based on 1% percent of your withdrawal (Maximum fee of 4000 IRR). For instance, for a withdrawal of 100000IRR , 10000IRR will be deduced and 99000IRR will be deposited in your bank account. For transactions higher than 400000IRR , same transaction fee of 4000IRR will be applied.
-	Service fee or deposition of cryptocurrencies in Nobitex is free.
-	Withdrawal fees of cryptocurrencies from your account are calculated based on the type of cryptocurrency as follows:


Trading Volumes in 30 days|Transaction Fees
-----------|-----------
Bitcoin|0.00025 BTC
Etherium|0.002 ETH
Lightcoin|0.001 LTC
Ripel|0.02 XRP
Tether|1-3 USDT*
*  This is an estimated value and depends on the bitcoin price

-	Rial withdrawal …..
-	Withdrawal requests of the users who bought cryptocurrencies for the first time will be processed after 24 hours of their payment to their Rials account. Obviously for future requests, it will be approved normally and in a short time.

##Contact us
[Read More](https://nobitex.market/contact-us/)


We are very happy to help you thorough our communication channels if you encounter any issue, glitches and required any assistance. Users can also contact our first-line support team directly online through the violet circle at the bottom of the page. Users can also consult our FAQ section if they acquire more information.
Address: Second Floor, No.7 Balavar Street, Enghelab Square, Tehran, Iran
Phone: +98 (021) 66966013
Email: support@nobitex.ir
